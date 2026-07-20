/**
 * Comparator result model. The four failure classes (§9) are reported SEPARATELY
 * so triage is possible — a single "mismatch" bucket is useless.
 */
export type FailureClass =
  | 'SCHEMA_MISMATCH'
  | 'ROW_COUNT_MISMATCH'
  | 'MISSING_ROW'
  | 'EXTRA_ROW'
  | 'VALUE_MISMATCH';

export type CompareOutcome = 'PASS' | 'FAIL' | 'BASELINE_CREATED';

export interface SchemaMismatch {
  addedColumns: string[]; // present in actual, not in baseline
  removedColumns: string[]; // present in baseline, not in actual
}

export interface RowCountMismatch {
  baselineRows: number;
  actualRows: number;
}

export interface ValueMismatch {
  column: string;
  rowKey: string;
  expected: string;
  actual: string;
  delta: string;
  /** Which tolerance decided the comparison, e.g. "abs<=0.0005 OR rel<=0.01". */
  toleranceApplied: string;
  toleranceBreached: boolean;
}

export interface CompareReport {
  outcome: CompareOutcome;
  failureClasses: FailureClass[];
  keyColumns: string[];
  comparedColumns: string[];
  schemaMismatch?: SchemaMismatch;
  rowCountMismatch?: RowCountMismatch;
  /** Row keys present in baseline but missing from actual. */
  missingRows: string[];
  /** Row keys present in actual but not in baseline. */
  extraRows: string[];
  valueMismatches: ValueMismatch[];
  totalCellsCompared: number;
  /** One-line human summary for reports. */
  summary: string;
}
