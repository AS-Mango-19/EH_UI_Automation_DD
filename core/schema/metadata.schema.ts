/**
 * metadata.csv schema — the steps (§5.3). Columns exact:
 * StepID, StepGroup, Page, Action, ObjectName, InputValue, StoreAs, AssertType,
 * ExpectedValue, WaitCondition, Timeout, Optional, Retry, Screenshot, SkipIf, Description
 *
 * DynamicArgs (optional, trailing): pipe-separated values for a Dynamic selector's
 * {0}/{1} placeholders, resolved for ${...} like any cell. When present it OVERRIDES
 * the legacy default (the selector args come from splitting InputValue on '|'), which
 * lets a step fill one value while addressing a parameterised selector by a DIFFERENT
 * index — e.g. a loopPeriods template row fills ${runtime.period.<field>} into
 * `[id="boundary.{0}.<field>"]` with DynamicArgs=${runtime.period.n}. Absent/blank =
 * legacy behaviour, so every existing metadata.csv is unaffected.
 */
import { z } from 'zod';
import { boolField, numberWithDefault, strField, strWithDefault } from './common.js';
import { FRAMEWORK_CONFIG } from '../../config/framework.config.js';

export const STEP_GROUPS = [
  'Login',
  'CreateProject',
  'OpenProject',
  'CreateInputSet',
  'ConfigureDesign',
  'Simulate',
  'ExtractResults',
  'CompareBaseline',
  'Cleanup',
] as const;

export const SCREENSHOT_POLICIES = ['never', 'onFailure', 'always'] as const;

const screenshotField = z.preprocess((v) => {
  const s = String(v ?? '').trim();
  return s === '' ? 'never' : s;
}, z.enum(SCREENSHOT_POLICIES));

export const MetadataStepSchema = z.object({
  StepID: z.preprocess((v) => {
    const n = Number(String(v ?? '').trim());
    return Number.isFinite(n) ? n : v;
  }, z.number().int('StepID must be an integer')),
  StepGroup: strField.pipe(z.string().min(1, 'StepGroup is required')),
  Page: strWithDefault('-'),
  Action: strField.pipe(z.string().min(1, 'Action is required')),
  ObjectName: strWithDefault(''),
  InputValue: strWithDefault(''),
  StoreAs: strWithDefault(''),
  AssertType: strWithDefault(''),
  ExpectedValue: strWithDefault(''),
  WaitCondition: strWithDefault(''),
  Timeout: numberWithDefault(FRAMEWORK_CONFIG.defaultStepTimeoutMs),
  Optional: boolField.default(false),
  Retry: numberWithDefault(0),
  Screenshot: screenshotField.default('never'),
  SkipIf: strWithDefault(''),
  Description: strWithDefault(''),
  DynamicArgs: strWithDefault(''),
});

export type MetadataStep = z.infer<typeof MetadataStepSchema>;
