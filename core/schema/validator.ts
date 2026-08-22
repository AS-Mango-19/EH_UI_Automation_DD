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
import { loadFeatureAll, selectorKey, SIM_METADATA_REL } from '../loaders/featureLoader.js';
import { isNaCell } from '../keywords/periodTable.js';
import { readCsv } from '../csv/reader.js';
import { featureDir, abs } from '../utils/paths.js';
import { getKeywordSpec } from '../keywords/catalog.js';
import { FRAMEWORK_CONFIG } from '../../config/framework.config.js';
import type { MasterRow } from './master.schema.js';
import { JOIN_KEYS, RUN_COLUMN } from './testdata.schema.js';

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

/** Match a master Feature against a --feature value, tolerant of case and a leading feature_ prefix. */
function featureFilterMatches(rowFeature: string, want: string): boolean {
  const norm = (s: string): string => s.trim().toLowerCase().replace(/^feature_/, '');
  return norm(rowFeature) === norm(want);
}

export function validateAll(
  opts: { master?: string; feature?: string; testcase?: string; skipDisabled?: boolean } = {},
): ValidationReport {
  const issues: string[] = [];
  const warnings: string[] = [];
  const seenCombos = new Set<string>();
  let featuresValidated = 0;
  let testCasesValidated = 0;

  const master = loadMaster(opts.master);
  issues.push(...master.issues);

  for (const { row, line } of master.entries) {
    const { Module: module, Feature: feature } = row;

    // Optional scope: validate only the named feature and/or test case. A master
    // row that matches neither is skipped entirely (not counted), so a filter that
    // matches nothing yields featuresValidated === 0 — the CLI treats that as an
    // error rather than a spurious pass.
    if (opts.feature && !featureFilterMatches(feature, opts.feature)) continue;
    if (opts.testcase && row.TC_ID.trim() !== opts.testcase.trim()) continue;
    // For the test-run pre-check: a disabled (Execute=FALSE) feature is not going to
    // run, so its problems must never block the run. Standalone `validate` omits this
    // flag and still checks the whole suite.
    if (opts.skipDisabled && !row.Execute) continue;
    testCasesValidated++;

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

    // Load the sim metadata (Simulation=YES) BEFORE coverage so its steps can be
    // credited there — simulation.csv columns are entered by sim_metadata.csv steps,
    // which are absent from the design metadata.
    let simLoaded: ReturnType<typeof loadFeatureAll> | undefined;
    let simMetadataMissing = false;
    if (row.Simulation) {
      if (fs.existsSync(path.join(dir, SIM_METADATA_REL))) {
        simLoaded = loadFeatureAll({ module, feature, metadataFileRel: SIM_METADATA_REL, testDataDirRel });
      } else {
        simMetadataMissing = true;
      }
    }

    validateMetadata(f, issues, warnings);
    validateTestDataCoverage(f, warnings, simLoaded?.value?.steps ?? []);
    validateIterationCompleteness(f, issues);
    validateChildTables(f, path.join(dir, testDataDirRel), warnings);
    validateSelectors(f, warnings);
    validateCompareConfig(f, issues, warnings);
    validateColumnMap(f, warnings);

    // Simulation=YES chains sim_metadata.csv in the same browser after a green
    // design run. Validate its steps too, so a broken sim aborts before a browser
    // opens — same guarantee as the design flow. It shares selectors + testdata,
    // so a sim view (same feature, sim steps) runs the same metadata checks.
    if (row.Simulation) {
      if (simMetadataMissing) {
        issues.push(
          `[${feature}] master.csv line ${line}: Simulation=YES but ${SIM_METADATA_REL} is missing. Import it with:  npm run import-codegen -- ${module} ${feature} --tc ${row.TC_ID} --sim`,
        );
      } else if (simLoaded) {
        for (const i of simLoaded.issues) issues.push(`[${feature}] sim: ${i}`);
        if (simLoaded.value) {
          validateMetadata(simLoaded.value, issues, warnings);
          validateSelectors(simLoaded.value, warnings);
        }
      }
    }
  }

  return { issues, warnings, featuresValidated, testCases: testCasesValidated };
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

    // check/uncheck on a {0}-parameterised selector (a radio GROUP) needs an
    // InputValue — the value picks WHICH option. Blank there is the blind-click bug
    // that silently re-asserts whatever was recorded. A fixed-selector checkbox
    // toggle has no {0} and needs no value, so this is selector-aware, not blanket.
    if (step.Action === 'check' || step.Action === 'uncheck') {
      const objectName = step.ObjectName.split('|')[0]?.trim() ?? '';
      const sel = f.selectorIndex.get(selectorKey(step.Page, objectName));
      const parameterised = sel ? /\{0\}/.test(`${sel.RoleName} ${sel.SelectorValue} ${sel.FallbackSelector}`) : false;
      if (parameterised && step.InputValue.trim() === '') {
        issues.push(
          `${where}: "${step.Action} ${objectName}" targets a {0}-parameterised selector (a radio group) but has a blank InputValue — the value picks which option. Give it a \${data.*} token.`,
        );
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

    // ${data.<file>.<col>} references must exist. SkipIf is scanned too: a
    // data-driven gate (e.g. ${data.project.Variable}!=check) names a real column,
    // and a ${master.*}/${env.*} token in SkipIf is ignored by the data-only regex.
    for (const cell of [step.InputValue, step.ExpectedValue, step.ObjectName, step.SkipIf]) {
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
 * column name against the feature's / shared custom-step source. SkipIf tokens
 * count as a use too: a column that only drives a data-driven gate (e.g.
 * ${data.project.Variable}!=check on a check/uncheck step) IS applied at runtime.
 */
function validateTestDataCoverage(
  f: NonNullable<ReturnType<typeof loadFeatureAll>['value']>,
  warnings: string[],
  // Steps from a chained flow (the feature's sim_metadata.csv) that also enter this
  // feature's testdata. Coverage loads the WHOLE testdata dir (design + simulation
  // files), but the design metadata never references ${data.simulation.*} — so
  // without crediting the sim steps here, every populated simulation.csv column is
  // falsely flagged "no step enters it". Passing them unions their tokens in.
  extraSteps: NonNullable<ReturnType<typeof loadFeatureAll>['value']>['steps'] = [],
): void {
  const allSteps = [...f.steps, ...extraSteps];
  const referenced = new Map<string, Set<string>>();
  for (const step of allSteps) {
    for (const cell of [step.InputValue, step.ExpectedValue, step.ObjectName, step.SkipIf]) {
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
  // A file consumed by a loopOverData step is driven row-by-row through a reusable
  // sub-flow via ${runtime.loop.<Column>} tokens — which live in that sub-flow, not
  // in this metadata. Its columns therefore never appear as ${data.*} tokens here,
  // so the coverage check would flag every populated column as an unused-value gap.
  // Skip those files entirely; their columns ARE applied, just through the loop.
  const loopFiles = new Set<string>();
  // A loopPeriods step drives a folded period table's `<prefix>.<n>.<field>` columns
  // through its per-field template via ${runtime.period.<field>} tokens — which live in
  // that template, not here. Collect (file -> prefixes) so those wide columns are not
  // flagged as unused-value gaps (the non-period columns of the same file still are).
  const periodPrefixByFile = new Map<string, string[]>();
  for (const step of allSteps) {
    if (step.Action === 'loopOverData') loopFiles.add(step.ObjectName.trim());
    if (step.Action === 'loopPeriods') {
      const file = step.ObjectName.trim();
      const prefix = (step.ExpectedValue.split('|')[0] ?? '').trim();
      if (file && prefix) {
        if (!periodPrefixByFile.has(file)) periodPrefixByFile.set(file, []);
        periodPrefixByFile.get(file)!.push(prefix);
      }
    }
  }
  const CONTROL = new Set<string>([...JOIN_KEYS, RUN_COLUMN]);
  // A folded child-table cell: `<prefix>.<n>.<field>` (boundary.1.efficacyPValue,
  // enrollmentTable.3.startingAtTime). Scalar columns never match.
  const PERIOD_COL = /^(.+)\.(\d+)\.(.+)$/;
  for (const [file, parsed] of f.testDataParsed) {
    if (loopFiles.has(file)) continue;
    const ref = referenced.get(file) ?? new Set<string>();
    const periodPrefixes = periodPrefixByFile.get(file) ?? [];
    const isLoopedPeriodCol = (col: string): boolean =>
      periodPrefixes.some((p) => new RegExp(`^${p}\\.\\d+\\.`).test(col));
    // Unentered period cells are collected per table and reported as ONE consolidated
    // warning, not one-per-cell: an enumerated period table wired for period 0 only
    // would otherwise emit a flood of near-identical warnings that bury the real
    // signal (the table is under-wired — wire the later periods, adopt loopPeriods,
    // or N/A the unused ones). prefix -> field -> [periods].
    const periodGaps = new Map<string, Map<string, number[]>>();
    for (const col of parsed.headers) {
      if (CONTROL.has(col) || ref.has(col) || customSrc.includes(col) || isLoopedPeriodCol(col)) continue;
      // A cell counts as "must be entered by a step" only if it holds a REAL value.
      // blank / N/A / Computed are SKIPPED at runtime (stepRunner isNotApplicable /
      // isAppComputed), so a column that is entirely N/A or Computed is never applied
      // and must NOT be flagged as an unentered-value gap. This also stops filling
      // blank table cells with N/A from paradoxically ADDING coverage warnings.
      const hasValue = parsed.records.some((r) => {
        const v = (r.data[col] ?? '').trim();
        return !isNaCell(v) && !/^computed$/i.test(v);
      });
      if (!hasValue) continue;
      const pm = PERIOD_COL.exec(col);
      if (pm) {
        const prefix = pm[1] ?? '';
        const field = pm[3] ?? '';
        if (!periodGaps.has(prefix)) periodGaps.set(prefix, new Map());
        const byField = periodGaps.get(prefix)!;
        if (!byField.has(field)) byField.set(field, []);
        byField.get(field)!.push(Number(pm[2]));
        continue;
      }
      warnings.push(
        `[${f.feature}] testdata: column "${col}" in ${file}.csv has a value but no step enters it — add a step to apply it or remove the column.`,
      );
    }
    for (const [prefix, byField] of periodGaps) {
      const parts = [...byField.entries()]
        .map(([field, periods]) => `${field}[periods ${[...new Set(periods)].sort((a, b) => a - b).join(',')}]`)
        .sort();
      warnings.push(
        `[${f.feature}] testdata: period table "${prefix}" in ${file}.csv has values that no step enters — ${parts.join('; ')}. Wire those periods, switch the table to loopPeriods, or N/A the unused periods.`,
      );
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
    for (const cell of [step.InputValue, step.ExpectedValue, step.ObjectName, step.SkipIf]) {
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

/**
 * Child-table structure (warnings only). The loader's foldChildTables has already
 * merged every `<parent>_<table>.csv` period file into its parent and dropped it, so
 * a malformed child can't crash the runtime. This re-reads them from disk to surface
 * authoring problems at validate time: non-integer / non-contiguous / duplicate
 * PeriodIndex, orphan rows (no parent), blank cells (use N/A), and a table authored
 * both inline in the parent AND in a child file.
 */
function validateChildTables(
  f: NonNullable<ReturnType<typeof loadFeatureAll>['value']>,
  testDataDir: string,
  warnings: string[],
): void {
  let files: string[];
  try {
    files = fs.readdirSync(testDataDir).filter((x) => x.toLowerCase().endsWith('.csv'));
  } catch {
    return;
  }
  const isNa = (v: string): boolean => {
    const t = v.trim();
    return t === '' || /^(n\/a|not applicable)$/i.test(t);
  };
  const parentHeaderCache = new Map<string, Set<string>>();
  const parentRawHeaders = (base: string): Set<string> => {
    let cached = parentHeaderCache.get(base);
    if (!cached) {
      try {
        cached = new Set(readCsv(path.join(testDataDir, `${base}.csv`)).headers);
      } catch {
        cached = new Set<string>();
      }
      parentHeaderCache.set(base, cached);
    }
    return cached;
  };

  for (const file of files) {
    const base = file.slice(0, -4);
    const us = base.indexOf('_');
    if (us <= 0) continue;
    const parentBase = base.slice(0, us);
    const tableName = base.slice(us + 1);
    if (!f.testDataParsed.has(parentBase)) continue; // prefix isn't a loaded parent -> ordinary file
    const parsed = readCsv(path.join(testDataDir, file));
    if (!parsed.headers.includes('PeriodIndex')) continue; // not a period-keyed child table

    const where = `[${f.feature}] ${file}`;
    const fieldCols = parsed.headers.filter((h) => h && !JOIN_KEYS.includes(h as (typeof JOIN_KEYS)[number]) && h !== 'PeriodIndex');
    const inline = parentRawHeaders(parentBase);
    const parentPairs = new Set<string>();
    const parentParsed = f.testDataParsed.get(parentBase);
    if (parentParsed) {
      for (const r of parentParsed.records) parentPairs.add(`${r.data.TC_ID ?? ''}|${r.data.IterationID ?? ''}`);
    }

    const periodsByIter = new Map<string, number[]>();
    let blankCells = 0;
    let collisionFlagged = false;
    for (const rec of parsed.records) {
      const tc = (rec.data.TC_ID ?? '').trim();
      const iter = (rec.data.IterationID ?? '').trim();
      const pair = `${tc}|${iter}`;
      if (!parentPairs.has(pair)) {
        warnings.push(
          `${where}: row ${tc}/${iter} has no matching ${parentBase}.csv row — it will not be folded (add the parent row or align the IterationIDs).`,
        );
      }
      const pk = (rec.data.PeriodIndex ?? '').trim();
      if (!isNa(pk)) {
        const n = Number(pk);
        if (!Number.isInteger(n) || n < 0) {
          warnings.push(`${where}: PeriodIndex "${pk}" for ${tc}/${iter} is not a 0-based integer.`);
        } else {
          const arr = periodsByIter.get(pair) ?? [];
          arr.push(n);
          periodsByIter.set(pair, arr);
        }
        if (!collisionFlagged && fieldCols.some((field) => inline.has(`${tableName}.${pk}.${field}`))) {
          collisionFlagged = true;
          warnings.push(
            `${where}: ${parentBase}.csv also carries inline "${tableName}.*" columns — keep this table in ONE place (the child file OR inline), not both.`,
          );
        }
      }
      for (const field of fieldCols) {
        if ((rec.data[field] ?? '') === '') blankCells++;
      }
    }
    for (const [pair, periods] of periodsByIter) {
      const sorted = [...periods].sort((a, b) => a - b);
      const label = pair.replace('|', '/');
      if (sorted.some((v, i) => i > 0 && v === sorted[i - 1])) {
        warnings.push(`${where}: duplicate PeriodIndex for ${label} (${sorted.join(',')}).`);
      }
      for (let i = 0; i < sorted.length; i++) {
        if (sorted[i] !== i) {
          warnings.push(
            `${where}: PeriodIndex for ${label} is not contiguous from 0 (${sorted.join(',')}) — periods must be 0,1,2,…`,
          );
          break;
        }
      }
    }
    if (blankCells > 0) {
      warnings.push(
        `${where}: ${blankCells} blank cell(s) — use N/A for not-applicable table cells (a blank can slip past a SkipIf ==N/A Add-Period gate and add an empty period row).`,
      );
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
