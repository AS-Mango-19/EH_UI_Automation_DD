/**
 * The orchestrator (§6). Reads master.csv, applies selection precedence, generates
 * POM+spec (hash-skipped), resolves iterations, establishes auth state, runs
 * iterations (parallel when safe, serial when DependsOn/serial requires it), then
 * writes all reports. Returns a process exit code.
 */
import { DateTime } from 'luxon';
import type { Browser } from 'playwright';
import type { CliFilters } from '../cli/args.js';
import { loadEnv, type EnvConfig } from '../../config/environments.js';
import { loadMaster, type MasterEntry } from '../loaders/masterLoader.js';
import { loadFeature, loadSelectors, type LoadedFeature } from '../loaders/featureLoader.js';
import { generatePom } from '../generators/pom.generator.js';
import { generateSpec } from '../generators/spec.generator.js';
import { selectEntries, orderByDependsOn } from './select.js';
import { runIteration } from './iterationRunner.js';
import { launchBrowser, type BrowserName } from './browser.js';
import { ensureAuthState } from '../hooks/auth.js';
import { pMapLimit } from '../utils/concurrency.js';
import { createRunIdentity, type RunIdentity } from '../utils/uniqueId.js';
import { runArtifactsDir, ensureDir } from '../utils/paths.js';
import { FRAMEWORK_CONFIG } from '../../config/framework.config.js';
import { logger } from '../utils/logger.js';
import { emptyCounts, type IterationResult, type RunSummary } from '../model/types.js';
import { writeReports } from '../reporters/index.js';
import path from 'node:path';

interface Task {
  entry: MasterEntry;
  feature: LoadedFeature;
  iterationId: string;
  env: EnvConfig;
  browserName: BrowserName;
}

function metadataFileRelFor(entry: MasterEntry): string {
  return entry.row.MetadataFile.trim() || FRAMEWORK_CONFIG.defaultMetadataFile;
}
function testDataDirRelFor(entry: MasterEntry): string {
  if (entry.row.TestDataDir.trim()) return entry.row.TestDataDir.trim();
  if (entry.row.TestDataFile.trim()) return path.dirname(entry.row.TestDataFile.trim());
  return FRAMEWORK_CONFIG.defaultTestDataDir;
}
function envNameFor(entry: MasterEntry, filters: CliFilters): string {
  return filters.env || entry.row.Environment || process.env.ENV || 'qa';
}

// ---- generate command ---------------------------------------------------------

export async function generateCommand(filters: CliFilters): Promise<number> {
  const master = loadMaster();
  if (master.issues.length) {
    for (const i of master.issues) logger.error(i);
    return 1;
  }
  const entries = hasAnyFilter(filters) ? selectEntries(master.entries, filters) : master.entries;
  const done = new Set<string>();
  for (const entry of entries) {
    const key = `${entry.row.Module}/${entry.row.Feature}`;
    if (done.has(key)) continue;
    done.add(key);
    const sel = loadSelectors(entry.row.Module, entry.row.Feature);
    if (sel.issues.length) {
      for (const i of sel.issues) logger.error(i);
      return 1;
    }
    generatePom(entry.row.Module, entry.row.Feature, sel.value);
    generateSpec(entry.row.Module, entry.row.Feature, metadataFileRelFor(entry), testDataDirRelFor(entry));
  }
  logger.info(`Generated artifacts for ${done.size} feature(s).`);
  return 0;
}

function hasAnyFilter(f: CliFilters): boolean {
  return Boolean(f.tags || f.feature || f.testcase || f.all);
}

// ---- test command -------------------------------------------------------------

export async function testCommand(filters: CliFilters): Promise<number> {
  const identity: RunIdentity = createRunIdentity(DateTime.now());
  ensureDir(runArtifactsDir(identity.runId));
  logger.attachFile(path.join(runArtifactsDir(identity.runId), 'logs.jsonl'));
  logger.info(`Run ${identity.runId} starting…`);

  const master = loadMaster();
  if (master.issues.length) {
    for (const i of master.issues) logger.error(i);
    return 1;
  }

  const selected = orderByDependsOn(selectEntries(master.entries, filters));
  if (selected.length === 0) {
    logger.warn('No test cases selected. Check --tags/--feature/--testcase or Execute flags.');
    return 0;
  }
  logger.info(`Selected ${selected.length} test case(s): ${selected.map((e) => e.row.TC_ID).join(', ')}`);

  // Load features + generate artifacts, build task list.
  const tasks: Task[] = [];
  const loadedByFeature = new Map<string, LoadedFeature>();
  let anySerial = false;
  const anyDeps = selected.some((e) => e.row.DependsOn.trim() !== '');

  for (const entry of selected) {
    const module = entry.row.Module;
    const feature = entry.row.Feature;
    const fkey = `${module}/${feature}`;
    let loaded = loadedByFeature.get(fkey);
    if (!loaded) {
      loaded = loadFeature({
        module,
        feature,
        metadataFileRel: metadataFileRelFor(entry),
        testDataDirRel: testDataDirRelFor(entry),
      });
      loadedByFeature.set(fkey, loaded);
      // Generate POM + spec (idempotent).
      const sel = loadSelectors(module, feature);
      generatePom(module, feature, sel.value);
      generateSpec(module, feature, metadataFileRelFor(entry), testDataDirRelFor(entry));
    }
    if (loaded.config.serial) anySerial = true;
    const env = loadEnv(envNameFor(entry, filters));
    for (const iterationId of loaded.testData.iterationsFor(entry.row.TC_ID)) {
      tasks.push({ entry, feature: loaded, iterationId, env, browserName: entry.row.Browser as BrowserName });
    }
  }

  const headless = filters.headed ? false : undefined; // undefined => use env.headless per task
  const browsers = new Map<string, Browser>();
  const getBrowser = async (name: BrowserName, env: EnvConfig): Promise<Browser> => {
    const useHeadless = headless === undefined ? env.headless : headless;
    const key = `${name}:${useHeadless}`;
    let b = browsers.get(key);
    if (!b) {
      b = await launchBrowser(name, useHeadless);
      browsers.set(key, b);
    }
    return b;
  };

  // Refresh auth state once per (feature, env, browser) on every run so reruns
  // do not inherit a stale session.
  const authDone = new Set<string>();
  for (const t of tasks) {
    if (!t.feature.config.reuseAuthState) continue;
    const akey = `${t.feature.feature}:${t.env.env}:${t.browserName}`;
    if (authDone.has(akey)) continue;
    authDone.add(akey);
    try {
      await ensureAuthState({
        feature: t.feature,
        env: t.env,
        browser: t.browserName,
        headless: headless === undefined ? t.env.headless : headless,
        runId: identity.runId,
        timestamp: identity.timestamp,
        startedAt: identity.startedAt,
        artifactsDir: ensureDir(path.join(runArtifactsDir(identity.runId), 'auth')),
        force: true,
      });
    } catch (e) {
      logger.warn(`Auth setup failed for ${akey}: ${(e as Error).message}. Iterations will run login via metadata.`);
    }
  }

  const workers = filters.workers ?? (Number(process.env.WORKERS) || FRAMEWORK_CONFIG.defaultWorkers);
  const serialRun = anySerial || anyDeps;
  logger.info(`Executing ${tasks.length} iteration(s) with ${serialRun ? 1 : workers} worker(s)${serialRun ? ' (serial: deps/serial feature)' : ''}.`);

  const runTask = async (t: Task): Promise<IterationResult> => {
    const browser = await getBrowser(t.browserName, t.env);
    return runIteration({
      entry: t.entry,
      feature: t.feature,
      iterationId: t.iterationId,
      env: t.env,
      browser,
      browserName: t.browserName,
      runId: identity.runId,
      timestamp: identity.timestamp,
      startedAt: identity.startedAt,
      reuseAuthState: t.feature.config.reuseAuthState,
      updateBaseline: filters.updateBaseline,
    });
  };

  let results: IterationResult[];
  if (serialRun) {
    results = await runSerialWithGating(tasks, runTask);
  } else {
    results = await pMapLimit(tasks, workers, (t) => runTask(t));
  }

  for (const b of browsers.values()) await b.close();

  const summary = buildSummary(identity, results, filters);
  writeReports(summary);

  const bad = summary.counts.FAIL + summary.counts.ERROR + summary.counts.SIMULATION_TIMEOUT;
  logger.info(
    `Run ${identity.runId} done in ${(summary.durationMs / 1000).toFixed(1)}s — ` +
      `PASS ${summary.counts.PASS}, FAIL ${summary.counts.FAIL}, TIMEOUT ${summary.counts.SIMULATION_TIMEOUT}, ` +
      `BASELINE_CREATED ${summary.counts.BASELINE_CREATED}, ERROR ${summary.counts.ERROR}.`,
  );
  return bad > 0 ? 1 : 0;
}

/** Serial execution honouring DependsOn: gate a TC when its dependency didn't pass. */
async function runSerialWithGating(
  tasks: Task[],
  runTask: (t: Task) => Promise<IterationResult>,
): Promise<IterationResult[]> {
  const results: IterationResult[] = [];
  const passedTc = new Set<string>();
  const seenTc = new Set<string>();
  for (const t of tasks) {
    const dep = t.entry.row.DependsOn.trim();
    if (dep && seenTc.has(dep) && !passedTc.has(dep)) {
      logger.warn(`Skipping ${t.entry.row.TC_ID}/${t.iterationId}: dependency ${dep} did not pass.`);
      results.push(skippedResult(t, `DependsOn ${dep} did not pass`));
      continue;
    }
    const res = await runTask(t);
    results.push(res);
    seenTc.add(t.entry.row.TC_ID);
    if (res.status === 'PASS' || res.status === 'BASELINE_CREATED') passedTc.add(t.entry.row.TC_ID);
  }
  return results;
}

function skippedResult(t: Task, reason: string): IterationResult {
  return {
    tcId: t.entry.row.TC_ID,
    iterationId: t.iterationId,
    module: t.feature.module,
    feature: t.feature.feature,
    testName: t.entry.row.TestName || t.entry.row.Description || t.entry.row.TC_ID,
    env: t.env.env,
    browser: t.browserName,
    status: 'SKIPPED',
    startedAt: DateTime.now().toISO() ?? '',
    durationMs: 0,
    steps: [],
    failureReason: reason,
  };
}

function buildSummary(identity: RunIdentity, results: IterationResult[], filters: CliFilters): RunSummary {
  const counts = emptyCounts();
  const safeResults = results.filter((r): r is IterationResult => Boolean(r));
  for (const r of safeResults) counts[r.status]++;
  // Report the env the iterations actually resolved. envNameFor also consults
  // master.csv's Environment column, which this filters/process.env fallback
  // cannot see — without this the header claims "qa" for a run that ran as AD.
  const ranEnvs = [...new Set(safeResults.map((r) => r.env).filter(Boolean))];
  return {
    runId: identity.runId,
    env: ranEnvs.join(', ') || filters.env || process.env.ENV || 'qa',
    startedAt: identity.timestamp,
    durationMs: Date.now() - identity.startedAt.toMillis(),
    trigger: filters.trigger || (process.env.CI ? 'ci' : 'local'),
    counts,
    total: safeResults.length,
    iterations: safeResults,
  };
}
