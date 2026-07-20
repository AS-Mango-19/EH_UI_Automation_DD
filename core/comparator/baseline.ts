/**
 * Baseline file management (§9). Baselines live under 06_baseline/<env>/ and are
 * COMMITTED. Each baseline_<TC>_<ITER>.csv has a .meta.json sidecar recording
 * who approved it and against what input data. Actuals NEVER land here.
 */
import fs from 'node:fs';
import path from 'node:path';
import type { RunContext } from '../runner/context.js';
import { readCsvRows } from '../csv/reader.js';
import { writeCsv } from '../csv/writer.js';
import { ensureDir } from '../utils/paths.js';
import { sha256Files } from '../generators/hash.js';

export interface BaselineMeta {
  runId: string;
  appVersion: string;
  env: string;
  timestamp: string;
  approver: string;
  sourceDataHash: string;
  tcId: string;
  iterationId: string;
}

export function baselineCsvPath(ctx: RunContext): string {
  const dir = ctx.feature.paths.baselineEnvDir(ctx.env.env);
  return path.join(dir, `baseline_${ctx.tcId}_${ctx.iterationId}.csv`);
}

export function baselineMetaPath(ctx: RunContext): string {
  return `${baselineCsvPath(ctx)}.meta.json`;
}

export function baselineExists(ctx: RunContext): boolean {
  return fs.existsSync(baselineCsvPath(ctx));
}

export function readBaseline(ctx: RunContext): Record<string, string>[] {
  return readCsvRows(baselineCsvPath(ctx));
}

/** Hash the testdata that produced this baseline, so drift is detectable. */
function sourceDataHash(ctx: RunContext): string {
  const dir = ctx.feature.paths.testdata;
  if (!fs.existsSync(dir)) return '';
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.toLowerCase().endsWith('.csv'))
    .sort()
    .map((f) => path.join(dir, f));
  return files.length ? sha256Files(files) : '';
}

function approver(ctx: RunContext): string {
  return (
    ctx.env.raw['APPROVER'] ||
    process.env.USER ||
    process.env.USERNAME ||
    (ctx.updateBaseline ? 'update-baseline-flag' : 'auto-first-run')
  );
}

export function writeBaseline(ctx: RunContext, rows: Record<string, string>[], columns: string[]): void {
  const csvPath = baselineCsvPath(ctx);
  ensureDir(path.dirname(csvPath));
  writeCsv(csvPath, rows, columns);
  const meta: BaselineMeta = {
    runId: ctx.runId,
    appVersion: ctx.env.raw['APP_VERSION'] ?? 'unknown',
    env: ctx.env.env,
    timestamp: ctx.timestamp,
    approver: approver(ctx),
    sourceDataHash: sourceDataHash(ctx),
    tcId: ctx.tcId,
    iterationId: ctx.iterationId,
  };
  fs.writeFileSync(baselineMetaPath(ctx), JSON.stringify(meta, null, 2) + '\n', 'utf8');
}
