/**
 * Testdata CSVs vary per feature/stage, so there is no single fixed column set.
 * We validate structure (non-empty, unique headers) and expose the optional
 * join columns. Your attached testdata.csv (InputSetname,SelectTask,SelectTest)
 * has NO join key — that's allowed: such a file is treated as a single implicit
 * row applying to every iteration (see TestDataStore).
 */
import type { ParsedCsv } from '../csv/reader.js';

export const JOIN_KEYS = ['TC_ID', 'IterationID'] as const;
export const RUN_COLUMN = 'Run';

export interface TestDataStructureIssue {
  message: string;
  line?: number;
}

export function validateTestDataStructure(parsed: ParsedCsv): TestDataStructureIssue[] {
  const issues: TestDataStructureIssue[] = [];
  if (parsed.headers.length === 0) {
    issues.push({ message: 'Testdata file has no header row / is empty.' });
    return issues;
  }
  const seen = new Set<string>();
  for (const h of parsed.headers) {
    if (h === '') continue;
    if (seen.has(h)) issues.push({ message: `Duplicate testdata column header: "${h}"` });
    seen.add(h);
  }
  return issues;
}

export function hasJoinKey(parsed: ParsedCsv): boolean {
  return parsed.headers.includes('TC_ID');
}
