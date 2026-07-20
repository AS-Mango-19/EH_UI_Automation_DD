/**
 * compare.config.csv schema (§5.5) — the most important file in the framework.
 * ColumnName, IsKey, Compare, DataType, AbsTolerance, RelTolerance, RoundTo, Normalize, Notes
 *
 * Hard rule (enforced in validator, not here so we can report it with a row #):
 *   a `numeric` column with Compare=TRUE and NO AbsTolerance AND NO RelTolerance
 *   is a VALIDATION ERROR — never a silent exact comparison.
 */
import { z } from 'zod';
import { boolField, optionalNumber, strField, strWithDefault } from './common.js';

export const COMPARE_DATATYPES = ['string', 'numeric', 'integer', 'date', 'bool'] as const;
export const NORMALIZE_OPS = ['', 'trim', 'lower', 'upper', 'trimlower', 'collapsews'] as const;

const dataTypeField = z.preprocess(
  (v) => String(v ?? '').trim().toLowerCase(),
  z.enum(COMPARE_DATATYPES),
);

export const CompareColumnSchema = z.object({
  ColumnName: strField.pipe(z.string().min(1, 'ColumnName is required')),
  IsKey: boolField.default(false),
  Compare: boolField.default(true),
  DataType: dataTypeField,
  AbsTolerance: optionalNumber,
  RelTolerance: optionalNumber,
  RoundTo: optionalNumber,
  Normalize: strWithDefault(''),
  Notes: strWithDefault(''),
});

export type CompareColumn = z.infer<typeof CompareColumnSchema>;

/**
 * The hard rule, as a pure function so it is unit-testable: a numeric column that
 * is compared MUST declare a tolerance. Returns an issue string, or null if ok.
 */
export function numericToleranceIssue(col: CompareColumn): string | null {
  if (col.DataType === 'numeric' && col.Compare && col.AbsTolerance === undefined && col.RelTolerance === undefined) {
    return (
      `Numeric column "${col.ColumnName}" has neither AbsTolerance nor RelTolerance. ` +
      `A numeric comparison with no tolerance is forbidden — set a tolerance (use 0 for exact-integer).`
    );
  }
  return null;
}
