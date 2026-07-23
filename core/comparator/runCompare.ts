/**
 * Comparison orchestration invoked by the compareWithBaseline keyword.
 *
 * First run (no baseline) or BaselineMode=create  => write baseline + sidecar,
 *   status BASELINE_CREATED (NEVER PASS — nothing was verified, §2.5).
 * BaselineMode=update / --update-baseline          => approve actuals as the new
 *   baseline (diff vs old is recorded for the report), status BASELINE_CREATED.
 * Otherwise                                        => compare, write diff CSV+JSON,
 *   status PASS or FAIL.
 */
import fs from 'node:fs';
import path from 'node:path';
import type { RunContext } from '../runner/context.js';
import type { CompareReport } from './types.js';
import { compareRows } from './comparator.js';
import { baselineExists, readBaseline, writeBaseline, baselineCsvPath } from './baseline.js';
import { writeCsv } from '../csv/writer.js';
import { ensureDir } from '../utils/paths.js';
import { logger } from '../utils/logger.js';
import { FrameworkError } from '../utils/errors.js';

const DIFF_CSV_COLUMNS = [
  'column',
  'rowKey',
  'expected',
  'actual',
  'delta',
  'toleranceApplied',
  'toleranceBreached',
];

export interface ComparisonResult {
  report: CompareReport;
  status: 'PASS' | 'FAIL' | 'BASELINE_CREATED';
  diffCsvPath?: string;
  diffJsonPath?: string;
  baselinePath?: string;
}

export function runComparison(ctx: RunContext): ComparisonResult {
  const actualRows = ctx.lastActualRows;
  if (!actualRows) {
    throw new FrameworkError('compareWithBaseline: no extracted results found. extractTable must run first.', {
      tcId: ctx.tcId,
      iterationId: ctx.iterationId,
    });
  }
  const columns = ctx.feature.compareColumns;
  const columnOrder = columns.map((c) => c.ColumnName);
  const wantUpdate = ctx.updateBaseline || ctx.baselineMode === 'update';
  const wantCreate = ctx.baselineMode === 'create';
  const exists = baselineExists(ctx);

  // --- create / update paths -> write baseline, status BASELINE_CREATED ---
  if (!exists || wantCreate || wantUpdate) {
    let report: CompareReport;
    if (exists && wantUpdate) {
      // Record what is being approved, for the report, before overwriting.
      report = compareRows(readBaseline(ctx), actualRows, columns);
      report.summary = `BASELINE UPDATED (approved) — previously: ${report.summary}`;
    } else {
      report = synthBaselineReport(ctx, actualRows.length);
    }
    writeBaseline(ctx, actualRows, columnOrder);
    ctx.compareReport = report;
    ctx.finalStatus = 'BASELINE_CREATED';
    logger.info(
      `Baseline ${exists ? 'updated' : 'created'} for ${ctx.tcId}/${ctx.iterationId} (${ctx.env.env}) — status BASELINE_CREATED.`,
    );
    return {
      report,
      status: 'BASELINE_CREATED',
      baselinePath: path.relative(process.cwd(), baselinePathOf(ctx)),
    };
  }

  // --- compare path ---
  const baselineRows = readBaseline(ctx);
  const report = compareRows(baselineRows, actualRows, columns);
  ctx.compareReport = report;

  const { diffCsvPath, diffJsonPath } = writeDiffs(ctx, report);
  ctx.finalStatus = report.outcome === 'PASS' ? 'PASS' : 'FAIL';
  logger.info(`Compare ${ctx.tcId}/${ctx.iterationId}: ${report.summary}`);
  return {
    report,
    status: report.outcome === 'PASS' ? 'PASS' : 'FAIL',
    diffCsvPath: path.relative(process.cwd(), diffCsvPath),
    diffJsonPath: path.relative(process.cwd(), diffJsonPath),
  };
}

function baselinePathOf(ctx: RunContext): string {
  // Single source of truth for the name — honours ctx.resultPrefix (sim_ etc.).
  return baselineCsvPath(ctx);
}

function synthBaselineReport(ctx: RunContext, rowCount: number): CompareReport {
  return {
    outcome: 'BASELINE_CREATED',
    failureClasses: [],
    keyColumns: ctx.feature.compareColumns.filter((c) => c.IsKey).map((c) => c.ColumnName),
    comparedColumns: ctx.feature.compareColumns.filter((c) => c.Compare && !c.IsKey).map((c) => c.ColumnName),
    missingRows: [],
    extraRows: [],
    valueMismatches: [],
    totalCellsCompared: 0,
    summary: `BASELINE_CREATED — captured ${rowCount} row(s); nothing verified yet.`,
  };
}

function writeDiffs(ctx: RunContext, report: CompareReport): { diffCsvPath: string; diffJsonPath: string } {
  ensureDir(ctx.feature.paths.diffs);
  const base = `${ctx.resultPrefix}diff_${ctx.tcId}_${ctx.iterationId}`;
  const diffCsvPath = path.join(ctx.feature.paths.diffs, `${base}.csv`);
  const diffJsonPath = path.join(ctx.feature.paths.diffs, `${base}.json`);

  writeCsv(
    diffCsvPath,
    report.valueMismatches.map((m) => ({
      column: m.column,
      rowKey: m.rowKey,
      expected: m.expected,
      actual: m.actual,
      delta: m.delta,
      toleranceApplied: m.toleranceApplied,
      toleranceBreached: String(m.toleranceBreached),
    })),
    DIFF_CSV_COLUMNS,
  );
  fs.writeFileSync(diffJsonPath, JSON.stringify(report, null, 2) + '\n', 'utf8');
  return { diffCsvPath, diffJsonPath };
}
