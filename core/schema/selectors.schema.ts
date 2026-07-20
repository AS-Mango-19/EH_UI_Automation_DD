/**
 * selectors.csv schema (§5.4).
 * ObjectName, Page, SelectorType, SelectorValue, RoleName, FallbackSelector, Dynamic, Description, Exact
 */
import { z } from 'zod';
import { boolField, strField, strWithDefault } from './common.js';

export const SELECTOR_TYPES = ['testid', 'role', 'label', 'placeholder', 'text', 'css', 'xpath'] as const;

/** Resolution priority — lower index is preferred; the validator warns on xpath. */
export const SELECTOR_PRIORITY: readonly string[] = ['testid', 'role', 'label', 'text', 'css', 'xpath'];

const selectorTypeField = z.preprocess(
  (v) => String(v ?? '').trim().toLowerCase(),
  z.enum(SELECTOR_TYPES),
);

export const SelectorRowSchema = z.object({
  ObjectName: strField.pipe(z.string().min(1, 'ObjectName is required')),
  Page: strField.pipe(z.string().min(1, 'Page is required')),
  SelectorType: selectorTypeField,
  SelectorValue: strField.pipe(z.string().min(1, 'SelectorValue is required')),
  RoleName: strWithDefault(''),
  FallbackSelector: strWithDefault(''),
  Dynamic: boolField.default(false),
  Description: strWithDefault(''),
  /**
   * Accessible-name matching for role/label/text/placeholder. Playwright matches
   * these by SUBSTRING by default, so "Two Arm Confirmatory" also matches
   * "Two Arm Confirmatory - Multiple Endpoints" and throws a strict-mode
   * violation. Set TRUE to require an exact match. Blank/missing => FALSE, which
   * is Playwright's default, so existing selectors.csv files are unaffected.
   */
  Exact: boolField.default(false),
});

export type SelectorRow = z.infer<typeof SelectorRowSchema>;
