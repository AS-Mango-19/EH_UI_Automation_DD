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
