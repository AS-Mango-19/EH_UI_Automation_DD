/**
 * Runtime result model shared by the executor, comparator and reporters.
 * Statuses are deliberately distinct — BASELINE_CREATED is never PASS (§2.5),
 * SIMULATION_TIMEOUT is never a generic FAIL (§7) — because triage depends on it.
 */
import type { CompareReport } from '../comparator/types.js';

export type TestStatus =
  | 'PASS'
  | 'FAIL'
  | 'SKIPPED'
  | 'BASELINE_CREATED'
  | 'SIMULATION_TIMEOUT'
  | 'ERROR';

export type StepStatus = 'passed' | 'failed' | 'skipped' | 'warned';

export interface StepResult {
  stepId: number | string;
  stepGroup: string;
  action: string;
  page: string;
  objectName: string;
  /** Resolved input value, already secret-masked. */
  resolvedInput: string;
  description: string;
  status: StepStatus;
  durationMs: number;
  error?: string;
  screenshotPath?: string;
  /** Masked resolved-variable context captured for this step. */
  context?: Record<string, unknown>;
}

export interface IterationResult {
  tcId: string;
  iterationId: string;
  module: string;
  feature: string;
  testName: string;
  env: string;
  browser: string;
  status: TestStatus;
  startedAt: string;
  durationMs: number;
  steps: StepResult[];
  /** Path to the extracted actual-results CSV, if produced. */
  actualResultsPath?: string;
  baselinePath?: string;
  diffCsvPath?: string;
  diffJsonPath?: string;
  tracePath?: string;
  videoPath?: string;
  /** Comparator output when a comparison ran. */
  compare?: CompareReport;
  /** Human-readable top failure reason for the combined report. */
  failureReason?: string;
  /** True when this run created the project (=> eligible for cleanup). */
  createdProjectId?: string;
}

export interface RunSummary {
  runId: string;
  env: string;
  startedAt: string;
  durationMs: number;
  trigger: string;
  counts: Record<TestStatus, number>;
  total: number;
  iterations: IterationResult[];
}

export const ALL_STATUSES: TestStatus[] = [
  'PASS',
  'FAIL',
  'SKIPPED',
  'BASELINE_CREATED',
  'SIMULATION_TIMEOUT',
  'ERROR',
];

export function emptyCounts(): Record<TestStatus, number> {
  return { PASS: 0, FAIL: 0, SKIPPED: 0, BASELINE_CREATED: 0, SIMULATION_TIMEOUT: 0, ERROR: 0 };
}
