/**
 * Loads a feature's on-disk assets into typed, validated objects: feature.config.json,
 * metadata.csv (steps), selectors.csv, compare.config.csv and the testdata CSVs.
 *
 * Each loader returns { value, issues } so the validator can accumulate every
 * problem before a browser opens (§2.6). The runtime path calls `loadFeature`,
 * which throws on the first issue.
 */
import fs from 'node:fs';
import path from 'node:path';
import { readCsv, type ParsedCsv } from '../csv/reader.js';
import { featurePaths } from '../utils/paths.js';
import { FrameworkError } from '../utils/errors.js';
import { MetadataStepSchema, type MetadataStep } from '../schema/metadata.schema.js';
import { SelectorRowSchema, type SelectorRow } from '../schema/selectors.schema.js';
import { CompareColumnSchema, numericToleranceIssue, type CompareColumn } from '../schema/compareConfig.schema.js';
import { FeatureConfigSchema, type FeatureConfig } from '../schema/featureConfig.schema.js';
import { validateTestDataStructure } from '../schema/testdata.schema.js';
import { TestDataStore } from '../runner/testDataStore.js';
import { FRAMEWORK_CONFIG } from '../../config/framework.config.js';

export interface Loaded<T> {
  value: T;
  issues: string[];
}

export function selectorKey(page: string, objectName: string): string {
  return `${page}::${objectName}`;
}

export interface LoadedFeature {
  module: string;
  feature: string;
  paths: ReturnType<typeof featurePaths>;
  config: FeatureConfig;
  steps: MetadataStep[];
  selectors: SelectorRow[];
  selectorIndex: Map<string, SelectorRow>;
  compareColumns: CompareColumn[];
  testData: TestDataStore;
  testDataParsed: Map<string, ParsedCsv>;
  metadataFileRel: string;
}

// ---- feature.config.json ------------------------------------------------------

export function loadFeatureConfig(module: string, feature: string): Loaded<FeatureConfig | null> {
  const p = featurePaths(module, feature);
  if (!fs.existsSync(p.featureConfig)) {
    return { value: null, issues: [`Missing feature.config.json at ${p.featureConfig}`] };
  }
  let json: unknown;
  try {
    json = JSON.parse(fs.readFileSync(p.featureConfig, 'utf8'));
  } catch (e) {
    return { value: null, issues: [`feature.config.json is not valid JSON: ${(e as Error).message}`] };
  }
  const result = FeatureConfigSchema.safeParse(json);
  if (!result.success) {
    return {
      value: null,
      issues: result.error.issues.map(
        (i) => `feature.config.json ${i.path.join('.')}: ${i.message}`,
      ),
    };
  }
  return { value: result.data, issues: [] };
}

// ---- metadata.csv -------------------------------------------------------------

export function loadMetadata(
  module: string,
  feature: string,
  metadataFileRel: string,
): Loaded<MetadataStep[]> {
  const p = featurePaths(module, feature);
  const file = path.join(p.root, metadataFileRel);
  if (!fs.existsSync(file)) {
    return { value: [], issues: [`Missing metadata file at ${file}`] };
  }
  const parsed = readCsv(file);
  const steps: MetadataStep[] = [];
  const issues: string[] = [];
  const seenStepIds = new Map<number, number>();
  for (const rec of parsed.records) {
    const result = MetadataStepSchema.safeParse(rec.data);
    if (!result.success) {
      for (const i of result.error.issues) {
        issues.push(
          FrameworkError.format(`metadata ${i.path.join('.') || '(row)'}: ${i.message}`, {
            file,
            row: rec.line,
          }),
        );
      }
      continue;
    }
    const step = result.data;
    const prev = seenStepIds.get(step.StepID);
    if (prev !== undefined) {
      issues.push(
        FrameworkError.format(`Duplicate StepID ${step.StepID} (first at line ${prev})`, {
          file,
          row: rec.line,
          column: 'StepID',
        }),
      );
    }
    seenStepIds.set(step.StepID, rec.line);
    steps.push(step);
  }
  steps.sort((a, b) => a.StepID - b.StepID);
  return { value: steps, issues };
}

// ---- selectors.csv ------------------------------------------------------------

export function loadSelectors(module: string, feature: string): Loaded<SelectorRow[]> {
  const p = featurePaths(module, feature);
  if (!fs.existsSync(p.selectors)) {
    return { value: [], issues: [`Missing selectors.csv at ${p.selectors}`] };
  }
  const parsed = readCsv(p.selectors);
  const rows: SelectorRow[] = [];
  const issues: string[] = [];
  const seen = new Map<string, number>();
  for (const rec of parsed.records) {
    const result = SelectorRowSchema.safeParse(rec.data);
    if (!result.success) {
      for (const i of result.error.issues) {
        issues.push(
          FrameworkError.format(`selectors ${i.path.join('.') || '(row)'}: ${i.message}`, {
            file: p.selectors,
            row: rec.line,
          }),
        );
      }
      continue;
    }
    const row = result.data;
    const key = selectorKey(row.Page, row.ObjectName);
    const prev = seen.get(key);
    if (prev !== undefined) {
      issues.push(
        FrameworkError.format(`Duplicate selector ${row.Page}/${row.ObjectName} (first at line ${prev})`, {
          file: p.selectors,
          row: rec.line,
        }),
      );
    }
    seen.set(key, rec.line);
    rows.push(row);
  }
  return { value: rows, issues };
}

// ---- compare.config.csv -------------------------------------------------------

export function loadCompareConfig(module: string, feature: string): Loaded<CompareColumn[]> {
  const p = featurePaths(module, feature);
  if (!fs.existsSync(p.compareConfig)) {
    return { value: [], issues: [`Missing compare.config.csv at ${p.compareConfig}`] };
  }
  const parsed = readCsv(p.compareConfig);
  const cols: CompareColumn[] = [];
  const issues: string[] = [];
  const seen = new Map<string, number>();
  for (const rec of parsed.records) {
    const result = CompareColumnSchema.safeParse(rec.data);
    if (!result.success) {
      for (const i of result.error.issues) {
        issues.push(
          FrameworkError.format(`compare.config ${i.path.join('.') || '(row)'}: ${i.message}`, {
            file: p.compareConfig,
            row: rec.line,
          }),
        );
      }
      continue;
    }
    const col = result.data;
    const prev = seen.get(col.ColumnName);
    if (prev !== undefined) {
      issues.push(
        FrameworkError.format(`Duplicate compare column "${col.ColumnName}" (first at line ${prev})`, {
          file: p.compareConfig,
          row: rec.line,
        }),
      );
    }
    seen.set(col.ColumnName, rec.line);

    // THE hard rule: numeric + Compare + no tolerance => validation error (§5.5, §2.4).
    const tolIssue = numericToleranceIssue(col);
    if (tolIssue) {
      issues.push(FrameworkError.format(tolIssue, { file: p.compareConfig, row: rec.line, column: col.ColumnName }));
    }
    cols.push(col);
  }
  return { value: cols, issues };
}

// ---- testdata CSVs ------------------------------------------------------------

/**
 * Fold normalized child-table CSVs back into their parent record.
 *
 * A feature may split a wide, multi-period table out of design.csv / simulation.csv
 * into a normalized child file `<parent>_<tableName>.csv` — one row per analysis
 * period, keyed (TC_ID, IterationID, PeriodIndex). This reconstructs the wide inline
 * model the rest of the framework already runs on: each child cell (PeriodIndex=n,
 * field=v) becomes a synthetic column `<tableName>.<n>.<field>` = v on the parent's
 * (TC_ID, IterationID) row — exactly as if it had been authored inline. The child
 * file is then dropped from the map so the store and validators see only the merged
 * parent (one row per iteration, wide columns); nothing downstream needs a per-period
 * concept, and `${data.design.inputMethodTable.0.hazardRateControl}` resolves as before.
 *
 * Generic across phases: a file is a foldable child iff the part of its basename
 * before the first underscore is itself a loaded parent file (e.g. `design`,
 * `simulation`) AND it carries a `PeriodIndex` column. Rows whose PeriodIndex is
 * blank / N/A are "table absent this iteration" placeholders and are skipped, which
 * matches the wide format's all-N/A-period convention (the fill is simply omitted).
 * Field values are copied verbatim (N/A, blank, Computed included) so the runtime
 * N/A / Computed skip logic behaves identically to an inline design.csv. If the
 * parent already carries the same column inline (a half-migrated feature), the inline
 * value is kept and the collision is flagged rather than silently clobbered.
 */
export function foldChildTables(parsedMap: Map<string, ParsedCsv>): void {
  const RESERVED = new Set(['TC_ID', 'IterationID', 'PeriodIndex']);
  const isNa = (v: string): boolean => {
    const t = v.trim();
    return t === '' || /^(n\/a|not applicable)$/i.test(t);
  };
  for (const childKey of [...parsedMap.keys()]) {
    const us = childKey.indexOf('_');
    if (us <= 0) continue; // not a `<parent>_<table>` name
    const parentKey = childKey.slice(0, us);
    const tableName = childKey.slice(us + 1);
    const parent = parsedMap.get(parentKey);
    if (!parent) continue; // prefix isn't a loaded parent -> ordinary sibling file, leave as-is
    const child = parsedMap.get(childKey)!;
    if (!child.headers.includes('PeriodIndex')) continue; // not a period-keyed child table

    const fieldCols = child.headers.filter((h) => h && !RESERVED.has(h));
    const parentRowByKey = new Map<string, Record<string, string>>();
    for (const rec of parent.records) {
      parentRowByKey.set(`${rec.data.TC_ID ?? ''}|${rec.data.IterationID ?? ''}`, rec.data);
    }
    const inlineHeaders = new Set(parent.headers); // snapshot BEFORE folding
    const added = new Set<string>();
    for (const rec of child.records) {
      const period = (rec.data.PeriodIndex ?? '').trim();
      if (isNa(period)) continue; // placeholder row for a table this iteration doesn't use
      const joinKey = `${rec.data.TC_ID ?? ''}|${rec.data.IterationID ?? ''}`;
      const target = parentRowByKey.get(joinKey);
      // Orphan row (no parent for this TC/iteration): skip it — the period simply
      // isn't folded, so a reference resolves to '' and the fill is skipped. This is
      // reported (non-fatally) by validateChildTables, not thrown here, so a
      // half-authored feature still loads instead of crashing the runtime.
      if (!target) continue;
      for (const field of fieldCols) {
        const col = `${tableName}.${period}.${field}`;
        // If the parent already carries this column inline (a half-migrated feature),
        // keep the inline value — validateChildTables flags the collision as a warning.
        if (inlineHeaders.has(col)) continue;
        target[col] = rec.data[field] ?? '';
        if (!added.has(col)) {
          parent.headers.push(col);
          added.add(col);
        }
      }
    }
    parsedMap.delete(childKey); // fully folded -> hide the child from the store & validators
  }
}

export function loadTestData(
  module: string,
  feature: string,
  testDataDirRel: string,
): Loaded<{ store: TestDataStore; parsed: Map<string, ParsedCsv> }> {
  const p = featurePaths(module, feature);
  const dir = path.join(p.root, testDataDirRel || FRAMEWORK_CONFIG.defaultTestDataDir);
  const issues: string[] = [];
  const parsedMap = new Map<string, ParsedCsv>();
  if (!fs.existsSync(dir)) {
    return {
      value: { store: new TestDataStore(parsedMap), parsed: parsedMap },
      issues: [`Missing testdata directory at ${dir}`],
    };
  }
  const csvFiles = fs.readdirSync(dir).filter((f) => f.toLowerCase().endsWith('.csv'));
  if (csvFiles.length === 0) issues.push(`No testdata CSVs found in ${dir}`);
  for (const f of csvFiles) {
    const full = path.join(dir, f);
    const parsed = readCsv(full);
    for (const s of validateTestDataStructure(parsed)) {
      issues.push(FrameworkError.format(`testdata ${f}: ${s.message}`, { file: full, row: s.line }));
    }
    const key = path.basename(f, '.csv');
    parsedMap.set(key, parsed);
  }
  // Fold any `<parent>_<table>.csv` period child files into their parent's wide model
  // BEFORE building the store, so both the store and the parsed map (used by the
  // validators) see only the merged parents. Advisory problems (orphan rows, inline
  // collisions, non-contiguous periods) are reported non-fatally by the validator's
  // validateChildTables, never here — the loader must not break the runtime.
  foldChildTables(parsedMap);
  return { value: { store: new TestDataStore(parsedMap), parsed: parsedMap }, issues };
}

// ---- combined -----------------------------------------------------------------

export interface FeatureLoadInput {
  module: string;
  feature: string;
  metadataFileRel: string;
  testDataDirRel: string;
}

export function loadFeatureAll(input: FeatureLoadInput): Loaded<LoadedFeature | null> {
  const { module, feature, metadataFileRel, testDataDirRel } = input;
  const issues: string[] = [];
  const cfg = loadFeatureConfig(module, feature);
  issues.push(...cfg.issues);
  const md = loadMetadata(module, feature, metadataFileRel);
  issues.push(...md.issues);
  const sel = loadSelectors(module, feature);
  issues.push(...sel.issues);
  const cmp = loadCompareConfig(module, feature);
  issues.push(...cmp.issues);
  const td = loadTestData(module, feature, testDataDirRel);
  issues.push(...td.issues);

  if (!cfg.value) return { value: null, issues };

  const selectorIndex = new Map<string, SelectorRow>();
  for (const s of sel.value) selectorIndex.set(selectorKey(s.Page, s.ObjectName), s);

  const loaded: LoadedFeature = {
    module,
    feature,
    paths: featurePaths(module, feature),
    config: cfg.value,
    steps: md.value,
    selectors: sel.value,
    selectorIndex,
    compareColumns: cmp.value,
    testData: td.value.store,
    testDataParsed: td.value.parsed,
    metadataFileRel,
  };
  return { value: loaded, issues };
}

/** Runtime variant: throws on the first issue instead of accumulating. */
export function loadFeature(input: FeatureLoadInput): LoadedFeature {
  const { value, issues } = loadFeatureAll(input);
  if (!value || issues.length) {
    throw new FrameworkError(`Feature "${input.feature}" failed to load:\n  - ${issues.join('\n  - ')}`);
  }
  return value;
}

/** Convention: the chained simulation flow's steps live here, beside metadata.csv. */
export const SIM_METADATA_REL = path.join('03_metadata', 'sim_metadata.csv');

/**
 * A sim VIEW of an already-loaded feature: identical selectors, testdata, compare
 * config, paths and config — only the steps differ (from sim_metadata.csv). Reusing
 * the design compare columns is deliberate (the sim results share the same tidy
 * shape and the user opted to reuse the design rules). Throws on any load issue so
 * a broken sim aborts before a browser opens, same as loadFeature.
 */
export function loadSimSteps(design: LoadedFeature): LoadedFeature {
  const md = loadMetadata(design.module, design.feature, SIM_METADATA_REL);
  if (md.issues.length) {
    throw new FrameworkError(
      `Feature "${design.feature}" has Simulation=YES but its ${SIM_METADATA_REL} failed to load:\n  - ${md.issues.join('\n  - ')}`,
    );
  }
  return { ...design, steps: md.value, metadataFileRel: SIM_METADATA_REL };
}
