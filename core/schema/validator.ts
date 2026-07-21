/**
 * The validate engine (§2.6, §12 Phase 0). Accumulates EVERY problem across
 * master.csv and every referenced feature, then reports them together so the
 * whole suite can be fixed in one pass — before a browser ever opens.
 *
 * Errors => non-zero exit. Warnings => surfaced but non-fatal (UI-drift smells:
 * xpath without justification, sleep usage, unused fallback, columnMap gaps).
 */
import fs from 'node:fs';
import path from 'node:path';
import { loadMaster } from '../loaders/masterLoader.js';
import { loadFeatureAll, selectorKey } from '../loaders/featureLoader.js';
import { featureDir, abs } from '../utils/paths.js';
import { getKeywordSpec } from '../keywords/catalog.js';
import { FRAMEWORK_CONFIG } from '../../config/framework.config.js';
import type { MasterRow } from './master.schema.js';

export interface ValidationReport {
  issues: string[];
  warnings: string[];
  featuresValidated: number;
  testCases: number;
}

const TOKEN_RE = /\$\{([^}]+)\}/g;

function metadataFileRelFor(row: MasterRow): string {
  return row.MetadataFile.trim() || FRAMEWORK_CONFIG.defaultMetadataFile;
}
function testDataDirRelFor(row: MasterRow): string {
  if (row.TestDataDir.trim()) return row.TestDataDir.trim();
  const file = row.TestDataFile.trim();
  // TestDataFile may hold either the testdata folder (e.g. "01_testdata") or a
  // specific CSV in it (e.g. "01_testdata/inputset.csv"). A value with a file
  // extension contributes only its directory; a bare folder is used as-is — the
  // whole folder is loaded either way, so both forms resolve to the same dir.
  if (file) return path.extname(file) ? path.dirname(file) : file;
  return FRAMEWORK_CONFIG.defaultTestDataDir;
}

export function validateAll(opts: { master?: string } = {}): ValidationReport {
  const issues: string[] = [];
  const warnings: string[] = [];
  const seenCombos = new Set<string>();
  let featuresValidated = 0;

  const master = loadMaster(opts.master);
  issues.push(...master.issues);

  for (const { row, line } of master.entries) {
    const { Module: module, Feature: feature } = row;

    // Feature folder must exist (folder name === master.Feature).
    const dir = featureDir(module, feature);
    if (!fs.existsSync(dir)) {
      issues.push(
        `master.csv line ${line}: feature folder not found for Module="${module}" Feature="${feature}" (expected ${dir}). Feature must equal the folder name.`,
      );
      continue;
    }

    const metadataFileRel = metadataFileRelFor(row);
    const testDataDirRel = testDataDirRelFor(row);
    const combo = `${module}|${feature}|${metadataFileRel}|${testDataDirRel}`;
    if (seenCombos.has(combo)) continue;
    seenCombos.add(combo);
    featuresValidated++;

    const loaded = loadFeatureAll({ module, feature, metadataFileRel, testDataDirRel });
    // Prefix feature context onto loader issues.
    for (const i of loaded.issues) issues.push(`[${feature}] ${i}`);
    const f = loaded.value;
    if (!f) continue;

    validateMetadata(f, issues, warnings);
    validateTestDataCoverage(f, warnings);
    validateIterationCompleteness(f, issues);
    validateSelectors(f, warnings);
    validateCompareConfig(f, issues, warnings);
    validateColumnMap(f, warnings);
  }

  return { issues, warnings, featuresValidated, testCases: master.entries.length };
}

function validateMetadata(
  f: NonNullable<ReturnType<typeof loadFeatureAll>['value']>,
  issues: string[],
  warnings: string[],
): void {
  const label = `[${f.feature}] metadata`;
  const availableData = new Map<string, Set<string>>();
  for (const [key, parsed] of f.testDataParsed) availableData.set(key, new Set(parsed.headers));

  for (const step of f.steps) {
    const where = `${label} StepID=${step.StepID}`;
    const spec = getKeywordSpec(step.Action);
    if (!spec) {
      issues.push(`${where}: unknown Action "${step.Action}". See core/keywords/catalog.ts for the legal set.`);
      continue;
    }

    // Required columns present & non-blank.
    for (const col of spec.requiredColumns) {
      const val = String((step as unknown as Record<string, unknown>)[col] ?? '').trim();
      if (val === '') {
        issues.push(`${where}: action "${step.Action}" requires a non-blank ${col}.`);
      }
    }

    // Locator resolution for actions that target a UI object.
    if (spec.needsLocator) {
      const objectName = step.ObjectName.split('|')[0]?.trim() ?? '';
      if (objectName === '') {
        issues.push(`${where}: action "${step.Action}" needs an ObjectName.`);
      } else if (step.Page === '-' || step.Page === '') {
        issues.push(`${where}: action "${step.Action}" needs a Page to resolve locator "${objectName}".`);
      } else if (!f.selectorIndex.has(selectorKey(step.Page, objectName))) {
        issues.push(
          `${where}: locator "${objectName}" not found in selectors.csv for Page "${step.Page}".`,
        );
      }
    }

    // Path-bearing inputs (callReusable / ifExists / loopOverData / upload).
    if (spec.inputIsPath && step.InputValue && !step.InputValue.includes('${')) {
      const p = abs(step.InputValue.trim());
      if (!fs.existsSync(p)) {
        issues.push(`${where}: action "${step.Action}" references missing file "${step.InputValue}".`);
      }
    }

    // Warnings (sleep, etc.)
    if (spec.warn) warnings.push(`${where}: ${spec.warn}`);

    // SkipIf syntax.
    if (step.SkipIf.trim()) validateSkipIf(step.SkipIf.trim(), where, issues);

    // ${data.<file>.<col>} references must exist.
    for (const cell of [step.InputValue, step.ExpectedValue, step.ObjectName]) {
      for (const token of extractTokens(cell)) {
        const m = /^data\.([^.]+)\.(.+)$/.exec(token);
        if (!m) continue;
        const file = m[1] ?? '';
        const col = m[2] ?? '';
        const cols = availableData.get(file);
        if (!cols) {
          issues.push(`${where}: \${data.${file}.${col}} refers to unknown testdata file "${file}".`);
        } else if (!cols.has(col)) {
          issues.push(`${where}: \${data.${file}.${col}} refers to unknown column "${col}" in ${file}.csv.`);
        }
      }
    }
  }
}

/**
 * Coverage: a value that sits in the testdata but is never entered during a run is
 * a silent gap (e.g. design.csv Power=0.88 with no fill step — the app default is
 * used instead). Warn about every testdata column that HOLDS a value yet is not
 * referenced by any metadata token. A warning (not an error) because a column can
 * be legitimately unused. Columns consumed by a callCustom step (which resolves
 * them at runtime, leaving no metadata token) are suppressed by matching the
 * column name against the feature's / shared custom-step source.
 */
function validateTestDataCoverage(
  f: NonNullable<ReturnType<typeof loadFeatureAll>['value']>,
  warnings: string[],
): void {
  const referenced = new Map<string, Set<string>>();
  for (const step of f.steps) {
    for (const cell of [step.InputValue, step.ExpectedValue, step.ObjectName]) {
      for (const token of extractTokens(cell)) {
        const m = /^data\.([^.]+)\.(.+)$/.exec(token);
        if (!m) continue;
        const file = m[1] ?? '';
        const col = m[2] ?? '';
        if (!referenced.has(file)) referenced.set(file, new Set());
        referenced.get(file)!.add(col);
      }
    }
  }
  // A callCustom step consumes columns at runtime with no metadata token. Treat a
  // column as used if its name appears literally in the feature's or shared
  // custom-step source (e.g. selectStartDate reads "Start Date").
  let customSrc = '';
  for (const rel of [path.join('custom', f.feature, 'customSteps.ts'), path.join('custom', '_shared', 'customSteps.ts')]) {
    try {
      customSrc += fs.readFileSync(abs(rel), 'utf8');
    } catch {
      /* no custom module for this feature */
    }
  }
  const CONTROL = new Set(['TC_ID', 'IterationID', 'Run']);
  for (const [file, parsed] of f.testDataParsed) {
    const ref = referenced.get(file) ?? new Set<string>();
    for (const col of parsed.headers) {
      if (CONTROL.has(col) || ref.has(col) || customSrc.includes(col)) continue;
      const hasValue = parsed.records.some((r) => (r.data[col] ?? '').trim() !== '');
      if (hasValue) {
        warnings.push(
          `[${f.feature}] testdata: column "${col}" in ${file}.csv has a value but no step enters it — add a step to apply it or remove the column.`,
        );
      }
    }
  }
}

/**
 * Iteration completeness: iterations are the union of (TC_ID, IterationID) rows
 * across the testdata files. If one referenced file has a row for an iteration
 * that another lacks, the run fails at that step with "No testdata row". Catch it
 * here (an ERROR — it is a guaranteed runtime failure) so a half-authored
 * multi-iteration testdata set is fixed before a browser opens.
 */
function validateIterationCompleteness(
  f: NonNullable<ReturnType<typeof loadFeatureAll>['value']>,
  issues: string[],
): void {
  const referencedFiles = new Set<string>();
  for (const step of f.steps) {
    for (const cell of [step.InputValue, step.ExpectedValue, step.ObjectName]) {
      for (const token of extractTokens(cell)) {
        const m = /^data\.([^.]+)\./.exec(token);
        if (m && m[1]) referencedFiles.add(m[1]);
      }
    }
  }
  const pairsByFile = new Map<string, Set<string>>();
  const allPairs = new Set<string>();
  for (const file of referencedFiles) {
    const parsed = f.testDataParsed.get(file);
    if (!parsed) continue; // unknown file is reported by validateMetadata
    // Only files KEYED by TC_ID + IterationID are matched per-iteration. A file
    // without those columns uses a first-row fallback for every iteration (e.g.
    // an inputset with just InputSetname/SelectTest), so it can't be "missing a
    // row" — skip it to avoid false positives.
    if (!parsed.headers.includes('TC_ID') || !parsed.headers.includes('IterationID')) continue;
    const pairs = new Set<string>();
    for (const rec of parsed.records) {
      const tc = (rec.data.TC_ID ?? '').trim();
      const iter = (rec.data.IterationID ?? '').trim();
      if (tc || iter) {
        const key = `${tc}|${iter}`;
        pairs.add(key);
        allPairs.add(key);
      }
    }
    pairsByFile.set(file, pairs);
  }
  for (const [file, pairs] of pairsByFile) {
    for (const pair of allPairs) {
      if (!pairs.has(pair)) {
        const [tc, iter] = pair.split('|');
        issues.push(
          `[${f.feature}] testdata: ${file}.csv has no row for ${tc}/${iter}, but another referenced testdata file does — the run will fail with "No testdata row". Add the row or align the IterationIDs.`,
        );
      }
    }
  }
}

function validateSkipIf(expr: string, where: string, issues: string[]): void {
  // Supported: <lhs> == <rhs> | <lhs> != <rhs>, where rhs may be the literal EMPTY.
  const m = /^(.*?)(==|!=)(.*)$/.exec(expr);
  if (!m) {
    issues.push(`${where}: malformed SkipIf "${expr}" (expected LHS ==|!= RHS).`);
  }
}

function extractTokens(cell: string): string[] {
  const out: string[] = [];
  let m: RegExpExecArray | null;
  TOKEN_RE.lastIndex = 0;
  while ((m = TOKEN_RE.exec(cell)) !== null) out.push((m[1] ?? '').trim());
  return out;
}

function validateSelectors(
  f: NonNullable<ReturnType<typeof loadFeatureAll>['value']>,
  warnings: string[],
): void {
  for (const s of f.selectors) {
    if (s.SelectorType === 'xpath' && s.Description.trim().length < 8) {
      warnings.push(
        `[${f.feature}] selectors: xpath selector "${s.ObjectName}" has no justification in Description. Prefer testid/role/label; justify xpath.`,
      );
    }
    // RoleName counts too: buildLocator (locators/resolver.ts) interpolates
    // dynamicArgs into BOTH SelectorValue and RoleName, so `role` selectors
    // legitimately carry {0} in RoleName only (e.g. getByRole('link', {name:'{0}'})).
    // Checking SelectorValue alone flagged every such row as broken.
    if (s.Dynamic && !/\{\d+\}/.test(s.SelectorValue) && !/\{\d+\}/.test(s.RoleName)) {
      warnings.push(
        `[${f.feature}] selectors: "${s.ObjectName}" is Dynamic=TRUE but neither SelectorValue nor RoleName has a {0} placeholder.`,
      );
    }
  }
}

function validateCompareConfig(
  f: NonNullable<ReturnType<typeof loadFeatureAll>['value']>,
  issues: string[],
  warnings: string[],
): void {
  if (f.compareColumns.length === 0) {
    warnings.push(`[${f.feature}] compare.config.csv has no columns — comparison will be a no-op.`);
    return;
  }
  const keys = f.compareColumns.filter((c) => c.IsKey);
  if (keys.length === 0) {
    issues.push(
      `[${f.feature}] compare.config.csv has no IsKey=TRUE column. Key-based row matching is impossible; add at least one key column.`,
    );
  }
}

function validateColumnMap(
  f: NonNullable<ReturnType<typeof loadFeatureAll>['value']>,
  warnings: string[],
): void {
  const compareCols = new Set(f.compareColumns.map((c) => c.ColumnName));
  if (compareCols.size === 0) return;
  const mapped = Object.values(f.config.resultsExtraction.columnMap);
  for (const target of mapped) {
    if (!compareCols.has(target)) {
      warnings.push(
        `[${f.feature}] feature.config columnMap maps to "${target}", which is not a column in compare.config.csv. The comparator will ignore it.`,
      );
    }
  }
  for (const sortCol of f.config.resultsExtraction.sortBy) {
    if (!compareCols.has(sortCol)) {
      warnings.push(`[${f.feature}] feature.config sortBy references "${sortCol}" not in compare.config.csv.`);
    }
  }
}
