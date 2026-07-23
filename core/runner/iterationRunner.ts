/**
 * Runs ONE (TC_ID, IterationID) end-to-end and returns its IterationResult.
 * Owns the browser context, tracing, video, the main/cleanup split, status
 * mapping (SIMULATION_TIMEOUT is distinct from FAIL), and best-effort teardown.
 */
import path from 'node:path';
import fs from 'node:fs';
import type { DateTime } from 'luxon';
import type { Browser } from 'playwright';
import type { EnvConfig } from '../../config/environments.js';
import type { LoadedFeature } from '../loaders/featureLoader.js';
import type { MasterEntry } from '../loaders/masterLoader.js';
import type { IterationResult, SimPhaseResult, TestStatus } from '../model/types.js';
import type { BrowserName } from './browser.js';
import { RunContext } from './context.js';
import { executeMain, runCleanup } from './executeSteps.js';
import { logger } from '../utils/logger.js';
import { createContext, createApiContext, startTracing, stopTracing } from './browser.js';
import { authStatePath } from '../hooks/auth.js';
import { runArtifactsDir, ensureDir } from '../utils/paths.js';
import type { BaselineMode } from '../../config/framework.config.js';

export interface IterationInput {
  entry: MasterEntry;
  feature: LoadedFeature;
  iterationId: string;
  env: EnvConfig;
  browser: Browser;
  browserName: BrowserName;
  runId: string;
  timestamp: string;
  startedAt: DateTime;
  reuseAuthState: boolean;
  updateBaseline: boolean;
  /**
   * Present only when master Simulation=YES. A second view of the SAME feature
   * whose `steps` come from sim_metadata.csv; everything else (selectors, testdata,
   * compare config, paths, config) is shared with the design feature. Runs on the
   * same page after a green design phase.
   */
  simFeature?: LoadedFeature;
}

/** Lower rank = worse. Used to fold the design + sim phase statuses into one. */
const STATUS_RANK: Record<TestStatus, number> = {
  ERROR: 0,
  FAIL: 1,
  SIMULATION_TIMEOUT: 2,
  BASELINE_CREATED: 3,
  PASS: 4,
} as unknown as Record<TestStatus, number>;

function worstStatus(a: TestStatus, b: TestStatus): TestStatus {
  return (STATUS_RANK[a] ?? 9) <= (STATUS_RANK[b] ?? 9) ? a : b;
}

/** A green design phase (reached and completed the comparison) may chain the sim. */
function designIsGreen(status: TestStatus): boolean {
  return status === 'PASS' || status === 'BASELINE_CREATED';
}

/**
 * Honour simulation.csv's own Run column per iteration: sim runs for this
 * iteration only when its row exists and Run is truthy (blank => on, as elsewhere).
 * A missing row means sim steps could not resolve `${data.simulation.*}` anyway.
 */
function simEnabledForIteration(feature: LoadedFeature, tcId: string, iterationId: string): { on: boolean; reason?: string } {
  const parsed = feature.testDataParsed.get('simulation');
  if (!parsed) return { on: true }; // no simulation.csv keying => let it run and surface any resolve error
  const hasKeys = parsed.headers.includes('TC_ID') && parsed.headers.includes('IterationID');
  if (!hasKeys) return { on: true };
  const row = parsed.records.find((r) => r.data['TC_ID'] === tcId && r.data['IterationID'] === iterationId);
  if (!row) return { on: false, reason: `no simulation.csv row for ${tcId}/${iterationId}` };
  const run = String(row.data['Run'] ?? '').trim().toUpperCase();
  const on = run === '' || run === 'TRUE' || run === '1' || run === 'YES' || run === 'Y';
  return on ? { on: true } : { on: false, reason: `simulation.csv Run=${row.data['Run']} for ${tcId}/${iterationId}` };
}

export async function runIteration(input: IterationInput): Promise<IterationResult> {
  const { entry, feature, iterationId, env } = input;
  const tcId = entry.row.TC_ID;
  const iterationStart = Date.now();
  const startedAtIso = input.startedAt.toISO() ?? input.timestamp;

  const artifactsDir = ensureDir(path.join(runArtifactsDir(input.runId), `${tcId}_${iterationId}`));
  const statePath = authStatePath(env.env);
  const haveAuthState = input.reuseAuthState && fs.existsSync(statePath);
  const storageState = haveAuthState ? statePath : undefined;
  const dropLogin = haveAuthState;

  const context = await createContext(input.browser, {
    storageStatePath: storageState,
    recordVideoDir: artifactsDir,
    baseURL: env.baseUrl,
  });
  const page = await context.newPage();
  // Land on the app root: iterations that reuse auth state drop the Login step
  // group, which owns the first navigate. Keep this goto. Feature-specific
  // routing, selectors and waits belong in metadata.csv / selectors.csv (§14).
  //
  // domcontentloaded, NOT networkidle: an SPA with continuous telemetry beacons
  // may never go network-idle, and this goto is OUTSIDE executeSteps' try/catch —
  // a timeout here is a Fatal that kills the run and writes no report. The first
  // metadata step does its own navigate with its own readiness wait anyway.
  await page.goto(env.baseUrl, { waitUntil: 'domcontentloaded' });
  const apiRequest = await createApiContext(env, storageState);
  await startTracing(context);

  const ctx = new RunContext({
    runId: input.runId,
    timestamp: input.timestamp,
    startedAt: input.startedAt,
    env,
    master: entry.row,
    feature,
    tcId,
    iterationId,
    browser: input.browserName,
    artifactsDir,
  });
  ctx.page = page;
  ctx.apiRequest = apiRequest;
  ctx.baselineMode = entry.row.BaselineMode as BaselineMode;
  ctx.updateBaseline = input.updateBaseline;

  // --- Design phase (main steps only; cleanup is deferred until after sim). ---
  const design = await executeMain(ctx, feature, { dropLogin });
  const designArtifacts = {
    actualResultsPath: rel(ctx.lastActualPath),
    baselinePath: ctx.baselinePathRel,
    diffCsvPath: ctx.diffCsvPath,
    diffJsonPath: ctx.diffJsonPath,
    compare: ctx.compareReport,
  };

  // --- Simulation phase: same page, only when design is green (user's choice). ---
  let overallStatus: TestStatus = design.status;
  let failureReason = design.reason;
  let sim: SimPhaseResult | undefined;

  if (input.simFeature) {
    if (!designIsGreen(design.status)) {
      sim = { status: 'PASS', skippedReason: `design phase ${design.status} — sim runs only when design is green` };
      logger.info(`SIM   [${tcId}/${iterationId}] skipped — ${sim.skippedReason}.`);
    } else {
      const gate = simEnabledForIteration(feature, tcId, iterationId);
      if (!gate.on) {
        sim = { status: 'PASS', skippedReason: gate.reason };
        logger.info(`SIM   [${tcId}/${iterationId}] skipped — ${gate.reason}.`);
      } else {
        logger.info(`SIM   [${tcId}/${iterationId}] design green — chaining simulation on the same page.`);
        // Reset per-phase context so the sim extract/compare are fresh and land
        // under the sim_ prefix instead of overwriting the design artifacts.
        ctx.resultPrefix = 'sim_';
        ctx.lastActualRows = undefined;
        ctx.lastActualPath = undefined;
        ctx.compareReport = undefined;
        ctx.diffCsvPath = undefined;
        ctx.diffJsonPath = undefined;
        ctx.baselinePathRel = undefined;

        const simOutcome = await executeMain(ctx, input.simFeature, { dropLogin: true });
        sim = {
          status: simOutcome.status,
          actualResultsPath: rel(ctx.lastActualPath),
          baselinePath: ctx.baselinePathRel,
          diffCsvPath: ctx.diffCsvPath,
          diffJsonPath: ctx.diffJsonPath,
          compare: ctx.compareReport,
          failureReason: simOutcome.reason,
        };
        overallStatus = worstStatus(design.status, simOutcome.status);
        if (simOutcome.status !== 'PASS' && simOutcome.status !== 'BASELINE_CREATED') {
          failureReason = `sim: ${simOutcome.reason ?? simOutcome.status}${failureReason ? ` | design: ${failureReason}` : ''}`;
        }
      }
    }
  }

  // --- Cleanup once, at the very end (the design phase owns the project). ---
  await runCleanup(ctx, feature);

  // Trace + video.
  const tracePath = path.join(artifactsDir, 'trace.zip');
  await stopTracing(context, tracePath).catch(() => undefined);
  const video = page.video();
  await context.close();
  await apiRequest.dispose();
  const videoPath = video ? await video.path().catch(() => undefined) : undefined;

  return {
    tcId,
    iterationId,
    module: feature.module,
    feature: feature.feature,
    testName: entry.row.TestName || entry.row.Description || `${feature.feature} ${tcId}`,
    env: env.env,
    browser: input.browserName,
    status: overallStatus,
    startedAt: startedAtIso,
    durationMs: Date.now() - iterationStart,
    steps: ctx.stepResults,
    actualResultsPath: designArtifacts.actualResultsPath,
    baselinePath: designArtifacts.baselinePath,
    diffCsvPath: designArtifacts.diffCsvPath,
    diffJsonPath: designArtifacts.diffJsonPath,
    tracePath: rel(tracePath),
    videoPath: rel(videoPath),
    compare: designArtifacts.compare,
    failureReason,
    createdProjectId: ctx.createdProjectId,
    sim,
  };
}

function rel(p?: string): string | undefined {
  return p ? path.relative(process.cwd(), p) : undefined;
}
