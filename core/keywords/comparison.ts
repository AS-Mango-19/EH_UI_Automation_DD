/**
 * Comparison keyword: compareWithBaseline. Delegates to the comparator, which
 * writes the baseline (first run) or the diff artifacts (subsequent runs) and
 * sets ctx.finalStatus to PASS / FAIL / BASELINE_CREATED.
 */
import type { KeywordHandler } from './types.js';
import { runComparison } from '../comparator/runCompare.js';

export const compareWithBaseline: KeywordHandler = async (_page, ctx, _step) => {
  const result = runComparison(ctx);
  ctx.diffCsvPath = result.diffCsvPath;
  ctx.diffJsonPath = result.diffJsonPath;
  ctx.baselinePathRel = result.baselinePath;
  return result.report.summary;
};
