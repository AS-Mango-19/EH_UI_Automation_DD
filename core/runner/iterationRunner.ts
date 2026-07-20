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
import type { IterationResult } from '../model/types.js';
import type { BrowserName } from './browser.js';
import { RunContext } from './context.js';
import { executeSteps } from './executeSteps.js';
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

  const { status, reason: failureReason } = await executeSteps(ctx, feature, { dropLogin });

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
    status,
    startedAt: startedAtIso,
    durationMs: Date.now() - iterationStart,
    steps: ctx.stepResults,
    actualResultsPath: rel(ctx.lastActualPath),
    baselinePath: ctx.baselinePathRel,
    diffCsvPath: ctx.diffCsvPath,
    diffJsonPath: ctx.diffJsonPath,
    tracePath: rel(tracePath),
    videoPath: rel(videoPath),
    compare: ctx.compareReport,
    failureReason,
    createdProjectId: ctx.createdProjectId,
  };
}

function rel(p?: string): string | undefined {
  return p ? path.relative(process.cwd(), p) : undefined;
}
