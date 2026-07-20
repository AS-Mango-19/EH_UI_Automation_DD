/**
 * The diff engine (§9). Key-based row matching (NEVER positional — grids reorder),
 * per-column tolerances, integers compared exactly, floats within tolerance, and
 * the four failure classes reported SEPARATELY.
 *
 * A cell passes when |actual-expected| <= AbsTolerance OR |actual-expected|/|expected|
 * <= RelTolerance (relative term skipped when expected == 0 to guard div-by-zero).
 */
import type { CompareColumn } from '../schema/compareConfig.schema.js';
import type { CompareReport, FailureClass, ValueMismatch } from './types.js';

export function normalizeValue(value: string, op: string): string {
  let v = value ?? '';
  switch (op.trim().toLowerCase()) {
    case 'trim':
      return v.trim();
    case 'lower':
      return v.toLowerCase();
    case 'upper':
      return v.toUpperCase();
    case 'trimlower':
      return v.trim().toLowerCase();
    case 'collapsews':
      return v.replace(/\s+/g, ' ').trim();
    default:
      return v;
  }
}

function roundTo(n: number, decimals: number | undefined): number {
  if (decimals === undefined) return n;
  const f = Math.pow(10, decimals);
  return Math.round((n + Number.EPSILON) * f) / f;
}

function keyOf(row: Record<string, string>, keyCols: CompareColumn[]): string {
  return keyCols.map((c) => normalizeValue(row[c.ColumnName] ?? '', c.Normalize)).join(' | ');
}

interface CellResult {
  pass: boolean;
  delta: string;
  toleranceApplied: string;
}

function compareCell(expectedRaw: string, actualRaw: string, col: CompareColumn): CellResult {
  const expected = normalizeValue(expectedRaw ?? '', col.Normalize);
  const actual = normalizeValue(actualRaw ?? '', col.Normalize);

  if (col.DataType === 'numeric' || col.DataType === 'integer') {
    const e = Number(expected);
    const a = Number(actual);
    if (!Number.isFinite(e) || !Number.isFinite(a)) {
      return { pass: false, delta: 'NaN', toleranceApplied: 'numeric-parse' };
    }
    const er = roundTo(e, col.RoundTo);
    const ar = roundTo(a, col.RoundTo);
    const delta = Math.abs(ar - er);
    const absOk = col.AbsTolerance !== undefined && delta <= col.AbsTolerance;
    const relOk =
      col.RelTolerance !== undefined && er !== 0 && Math.abs(delta / Math.abs(er)) <= col.RelTolerance;
    const terms: string[] = [];
    if (col.AbsTolerance !== undefined) terms.push(`abs<=${col.AbsTolerance}`);
    if (col.RelTolerance !== undefined) terms.push(`rel<=${col.RelTolerance}`);
    return {
      pass: absOk || relOk,
      delta: String(delta),
      toleranceApplied: terms.join(' OR ') || 'none',
    };
  }

  // string / date / bool => exact after normalize.
  return { pass: expected === actual, delta: expected === actual ? '0' : 'differs', toleranceApplied: 'exact' };
}

export function compareRows(
  baseline: Record<string, string>[],
  actual: Record<string, string>[],
  columns: CompareColumn[],
): CompareReport {
  const keyCols = columns.filter((c) => c.IsKey);
  const valueCols = columns.filter((c) => c.Compare && !c.IsKey);
  const comparedNames = [...keyCols, ...valueCols].map((c) => c.ColumnName);

  const failureClasses = new Set<FailureClass>();

  // --- schema mismatch (over the columns we intend to compare) ---
  const baselineHeaders = new Set(baseline.flatMap((r) => Object.keys(r)));
  const actualHeaders = new Set(actual.flatMap((r) => Object.keys(r)));
  const addedColumns = comparedNames.filter((c) => actualHeaders.has(c) && !baselineHeaders.has(c));
  const removedColumns = comparedNames.filter((c) => !actualHeaders.has(c));
  if (addedColumns.length || removedColumns.length) failureClasses.add('SCHEMA_MISMATCH');

  // --- row count ---
  const rowCountMismatch =
    baseline.length !== actual.length ? { baselineRows: baseline.length, actualRows: actual.length } : undefined;
  if (rowCountMismatch) failureClasses.add('ROW_COUNT_MISMATCH');

  // --- key-based matching ---
  const baselineByKey = new Map<string, Record<string, string>>();
  for (const r of baseline) baselineByKey.set(keyOf(r, keyCols), r);
  const actualByKey = new Map<string, Record<string, string>>();
  for (const r of actual) actualByKey.set(keyOf(r, keyCols), r);

  const missingRows = [...baselineByKey.keys()].filter((k) => !actualByKey.has(k));
  const extraRows = [...actualByKey.keys()].filter((k) => !baselineByKey.has(k));
  if (missingRows.length) failureClasses.add('MISSING_ROW');
  if (extraRows.length) failureClasses.add('EXTRA_ROW');

  // --- value comparison over matched keys ---
  const valueMismatches: ValueMismatch[] = [];
  let totalCellsCompared = 0;
  for (const [key, baseRow] of baselineByKey) {
    const actRow = actualByKey.get(key);
    if (!actRow) continue;
    for (const col of valueCols) {
      if (removedColumns.includes(col.ColumnName)) continue; // can't compare a missing column cell-wise
      totalCellsCompared++;
      const res = compareCell(baseRow[col.ColumnName] ?? '', actRow[col.ColumnName] ?? '', col);
      if (!res.pass) {
        failureClasses.add('VALUE_MISMATCH');
        valueMismatches.push({
          column: col.ColumnName,
          rowKey: key,
          expected: baseRow[col.ColumnName] ?? '',
          actual: actRow[col.ColumnName] ?? '',
          delta: res.delta,
          toleranceApplied: res.toleranceApplied,
          toleranceBreached: true,
        });
      }
    }
  }

  const classes = [...failureClasses];
  const outcome = classes.length === 0 ? 'PASS' : 'FAIL';
  const summary =
    outcome === 'PASS'
      ? `PASS — ${actual.length} row(s), ${totalCellsCompared} cell(s) within tolerance.`
      : `FAIL — ${classes.join(', ')}; ${valueMismatches.length} value mismatch(es), ${missingRows.length} missing, ${extraRows.length} extra row(s).`;

  return {
    outcome,
    failureClasses: classes,
    keyColumns: keyCols.map((c) => c.ColumnName),
    comparedColumns: valueCols.map((c) => c.ColumnName),
    schemaMismatch: addedColumns.length || removedColumns.length ? { addedColumns, removedColumns } : undefined,
    rowCountMismatch,
    missingRows,
    extraRows,
    valueMismatches,
    totalCellsCompared,
    summary,
  };
}
