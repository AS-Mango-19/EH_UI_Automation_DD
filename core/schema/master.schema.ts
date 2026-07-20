/**
 * master.csv schema — adapted to the ATTACHED format:
 *   TC_ID,Module,Tags,StudyObjective,Feature,ProjectID,Browser,TestDataFile,MetadataFile,Execute
 * Extra spec columns (Environment, BaselineMode, Priority, DependsOn, ...) are
 * accepted when present but never required. `Execute` may be blank (=> FALSE).
 */
import { z } from 'zod';
import { boolField, strField, strWithDefault } from './common.js';

export const BROWSERS = ['chromium', 'firefox', 'webkit'] as const;
export const BASELINE_MODES = ['compare', 'create', 'update'] as const;

const browserField = z.preprocess((v) => {
  const s = String(v ?? '').trim().toLowerCase();
  return s === '' ? 'chromium' : s;
}, z.enum(BROWSERS));

const baselineModeField = z.preprocess((v) => {
  const s = String(v ?? '').trim().toLowerCase();
  return s === '' ? 'compare' : s;
}, z.enum(BASELINE_MODES));

export const MasterRowSchema = z
  .object({
    TC_ID: strField.pipe(z.string().min(1, 'TC_ID is required')),
    Module: strField.pipe(z.string().min(1, 'Module is required')),
    Feature: strField.pipe(z.string().min(1, 'Feature is required')),
    // Optional / defaulted columns:
    TestName: strWithDefault(''),
    Tags: strWithDefault(''),
    Execute: boolField.default(false),
    Priority: strWithDefault(''),
    StudyObjective: strWithDefault(''),
    ProjectID: strWithDefault(''),
    Browser: browserField.default('chromium'),
    Environment: strWithDefault(''),
    BaselineMode: baselineModeField.default('compare'),
    IterationID: strWithDefault(''),
    TestDataDir: strWithDefault(''),
    TestDataFile: strWithDefault(''),
    MetadataFile: strWithDefault(''),
    DependsOn: strWithDefault(''),
    Owner: strWithDefault(''),
    Description: strWithDefault(''),
  })
  .passthrough();

export type MasterRow = z.infer<typeof MasterRowSchema>;
