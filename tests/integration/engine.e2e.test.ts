/**
 * End-to-end engine proof against a MOCK app (no real AUT). Demonstrates:
 *   - Phase 2: a hand-written metadata sequence drives fill/click/select/wait via
 *     the interpreter with NO generated code.
 *   - waitForSimulation polls a status that flips to "Completed".
 *   - Phase 4: extractTable is DETERMINISTIC — the same run twice yields identical
 *     result rows (ignoring volatile columns).
 *   - Phase 5: the comparator creates a baseline, then flags a nudged value.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';
import { DateTime } from 'luxon';
import type { Browser } from 'playwright';
import { launchBrowser } from '../../core/runner/browser.js';
import { RunContext } from '../../core/runner/context.js';
import { runStep } from '../../core/runner/stepRunner.js';
import { compareRows } from '../../core/comparator/comparator.js';
import { TestDataStore } from '../../core/runner/testDataStore.js';
import { parseMasterRow } from '../../core/loaders/masterLoader.js';
import { MetadataStepSchema, type MetadataStep } from '../../core/schema/metadata.schema.js';
import { SelectorRowSchema, type SelectorRow } from '../../core/schema/selectors.schema.js';
import { CompareColumnSchema, type CompareColumn } from '../../core/schema/compareConfig.schema.js';
import { FeatureConfigSchema } from '../../core/schema/featureConfig.schema.js';
import { selectorKey, type LoadedFeature } from '../../core/loaders/featureLoader.js';
import type { EnvConfig } from '../../config/environments.js';
import { readCsvRows } from '../../core/csv/reader.js';

const MOCK_HTML = `<!doctype html><html><body>
  <section id="login">
    <input data-testid="login-username"/>
    <input data-testid="login-password" type="password"/>
    <button data-testid="login-submit">Sign in</button>
  </section>
  <section id="design" style="display:none">
    <label>Power <input data-testid="power"/></label>
    <button data-testid="compute">Compute</button>
    <span data-testid="run-status">Idle</span>
    <div data-testid="results-grid" style="display:none"></div>
  </section>
  <script>
    const $ = (t)=>document.querySelector('[data-testid="'+t+'"]');
    $('login-submit').onclick=()=>{document.getElementById('design').style.display='block';};
    $('compute').onclick=()=>{
      $('run-status').textContent='Running';
      setTimeout(()=>{
        $('run-status').textContent='Completed';
        const g=$('results-grid');
        g.style.display='block';
        g.innerHTML='<table><thead><tr>'+
          ['Design','n1','r1','n','r','PET(p0)','EN(p0)','Alpha','Power'].map(h=>'<th>'+h+'</th>').join('')+
          '</tr></thead><tbody><tr>'+
          ['Optimal','19','4','54','15','0.5375','31.234','0.04980','0.80120'].map(c=>'<td>'+c+'</td>').join('')+
          '</tr></tbody></table>';
      },200);
    };
  </script>
</body></html>`;

function sel(o: Partial<SelectorRow> & { ObjectName: string; SelectorType: SelectorRow['SelectorType']; SelectorValue: string }): SelectorRow {
  return SelectorRowSchema.parse({ Page: 'Mock', RoleName: '', FallbackSelector: '', Dynamic: 'FALSE', Description: '', ...o });
}
function step(o: Record<string, string>): MetadataStep {
  return MetadataStepSchema.parse({
    StepID: '0', StepGroup: 'ConfigureDesign', Page: 'Mock', Action: '', ObjectName: '', InputValue: '',
    StoreAs: '', AssertType: '', ExpectedValue: '', WaitCondition: '', Timeout: '15000', Optional: 'FALSE',
    Retry: '0', Screenshot: 'never', SkipIf: '', Description: '', ...o,
  });
}
function ccol(o: Partial<CompareColumn> & { ColumnName: string }): CompareColumn {
  return CompareColumnSchema.parse({
    IsKey: 'FALSE', Compare: 'TRUE', DataType: 'numeric', AbsTolerance: '', RelTolerance: '',
    RoundTo: '', Normalize: '', Notes: '', ...o,
  }) as CompareColumn;
}

function buildFeature(tmp: string): LoadedFeature {
  const selectors: SelectorRow[] = [
    sel({ ObjectName: 'txt_Username', SelectorType: 'testid', SelectorValue: 'login-username' }),
    sel({ ObjectName: 'txt_Password', SelectorType: 'testid', SelectorValue: 'login-password' }),
    sel({ ObjectName: 'btn_Login', SelectorType: 'testid', SelectorValue: 'login-submit' }),
    sel({ ObjectName: 'txt_Power', SelectorType: 'label', SelectorValue: 'Power' }),
    sel({ ObjectName: 'btn_Compute', SelectorType: 'testid', SelectorValue: 'compute' }),
    sel({ ObjectName: 'lbl_RunStatus', SelectorType: 'testid', SelectorValue: 'run-status' }),
    sel({ ObjectName: 'tbl_Results', SelectorType: 'testid', SelectorValue: 'results-grid' }),
  ];
  const selectorIndex = new Map<string, SelectorRow>();
  for (const s of selectors) selectorIndex.set(selectorKey(s.Page, s.ObjectName), s);

  const compareColumns: CompareColumn[] = [
    ccol({ ColumnName: 'DesignType', IsKey: 'TRUE' as unknown as boolean, DataType: 'string', Normalize: 'trim' }),
    ccol({ ColumnName: 'Stage1_SampleSize_n1', AbsTolerance: 0, RoundTo: 0 }),
    ccol({ ColumnName: 'Total_SampleSize_n', AbsTolerance: 0, RoundTo: 0 }),
    ccol({ ColumnName: 'PET_p0', AbsTolerance: 0.0005, RelTolerance: 0.001, RoundTo: 4 }),
    ccol({ ColumnName: 'Attained_Power', AbsTolerance: 0.0005, RelTolerance: 0.01, RoundTo: 5 }),
  ];

  const config = FeatureConfigSchema.parse({
    feature: 'MockDemo', module: 'MockProduct', serial: false, reuseAuthState: false,
    testdata: { format: 'csv', files: {}, joinKey: ['TC_ID', 'IterationID'] },
    simulation: { pollObject: 'lbl_RunStatus', successText: 'Completed', failureText: 'Failed', pollIntervalMs: 100, maxWaitMs: 15000 },
    resultsExtraction: {
      mode: 'domTable', domTableObject: 'tbl_Results', downloadTrigger: '',
      outputFileName: 'results_${TC_ID}_${IterationID}.csv',
      columnMap: { Design: 'DesignType', n1: 'Stage1_SampleSize_n1', r1: 'Stage1_Responses_r1', n: 'Total_SampleSize_n', r: 'Total_Responses_r', 'PET(p0)': 'PET_p0', 'EN(p0)': 'EN_p0', Alpha: 'Attained_Alpha', Power: 'Attained_Power' },
      sortBy: ['DesignType'],
    },
    cleanup: { deleteCreatedProjects: false },
  });

  const paths = {
    root: tmp,
    config: path.join(tmp, '00'),
    featureConfig: path.join(tmp, '00', 'feature.config.json'),
    testdata: path.join(tmp, '01'),
    metadata: path.join(tmp, '02'),
    selectors: path.join(tmp, '03', 'selectors.csv'),
    generatedPom: path.join(tmp, '04'),
    generatedScripts: path.join(tmp, '05'),
    baseline: path.join(tmp, '06'),
    compareConfig: path.join(tmp, '06', 'compare.config.csv'),
    baselineEnvDir: (env: string) => path.join(tmp, '06', env),
    actualResults: path.join(tmp, '07'),
    diffs: path.join(tmp, '08'),
    htmlReport: path.join(tmp, '09'),
  };

  return {
    module: 'MockProduct', feature: 'MockDemo', paths, config,
    steps: [], selectors, selectorIndex, compareColumns,
    testData: new TestDataStore(new Map()), testDataParsed: new Map(), metadataFileRel: '02/metadata.csv',
  };
}

function mockEnv(): EnvConfig {
  return {
    env: 'qa', baseUrl: 'http://mock', apiBaseUrl: 'http://mock/api', username: 'qa_user', password: 'secret',
    headless: true, workers: 1, defaultTimeoutMs: 30000, raw: { APP_USERNAME: 'qa_user', APP_PASSWORD: 'secret' },
  } as EnvConfig;
}

function makeCtx(feature: LoadedFeature, env: EnvConfig): RunContext {
  const ctx = new RunContext({
    runId: 'RUN_ITEST', timestamp: '2026-07-14T00:00:00.000Z', startedAt: DateTime.fromISO('2026-07-14T00:00:00Z', { zone: 'utc' }),
    env, master: parseMasterRow({ TC_ID: 'TC_01', Module: 'MockProduct', Feature: 'MockDemo', ProjectID: '' }),
    feature, tcId: 'TC_01', iterationId: 'ITER_01', browser: 'chromium', artifactsDir: path.join(feature.paths.root, 'artifacts'),
  });
  return ctx;
}

const FLOW: MetadataStep[] = [
  step({ StepID: '10', Action: 'fill', ObjectName: 'txt_Username', InputValue: '${env.APP_USERNAME}' }),
  step({ StepID: '20', Action: 'fill', ObjectName: 'txt_Password', InputValue: '${env.APP_PASSWORD}' }),
  step({ StepID: '30', Action: 'click', ObjectName: 'btn_Login' }),
  step({ StepID: '40', Action: 'fill', ObjectName: 'txt_Power', InputValue: '0.88' }),
  step({ StepID: '50', Action: 'click', ObjectName: 'btn_Compute' }),
  step({ StepID: '60', Action: 'waitForSimulation', ObjectName: 'lbl_RunStatus', ExpectedValue: 'Completed', Timeout: '15000' }),
  step({ StepID: '70', Action: 'extractTable', ObjectName: 'tbl_Results', Timeout: '15000', Screenshot: 'never' }),
];

async function driveOnce(browser: Browser, tmp: string): Promise<Record<string, string>[]> {
  const feature = buildFeature(tmp);
  const env = mockEnv();
  const ctx = makeCtx(feature, env);
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.setContent(MOCK_HTML);
  ctx.page = page;
  for (const s of FLOW) await runStep(ctx, s);
  await context.close();
  assert.ok(ctx.lastActualRows, 'extractTable should populate lastActualRows');
  return ctx.lastActualRows as Record<string, string>[];
}

function stripVolatile(rows: Record<string, string>[]): Record<string, string>[] {
  return rows.map((r) => {
    const { RunID, Timestamp, ProjectID, ...rest } = r;
    void RunID; void Timestamp; void ProjectID;
    return rest;
  });
}

test('engine e2e: interpreter drives mock, extraction is deterministic, comparator detects a nudge', async () => {
  const browser = await launchBrowser('chromium', true);
  const tmpA = fs.mkdtempSync(path.join(os.tmpdir(), 'ehmock-a-'));
  const tmpB = fs.mkdtempSync(path.join(os.tmpdir(), 'ehmock-b-'));
  try {
    const run1 = await driveOnce(browser, tmpA);
    const run2 = await driveOnce(browser, tmpB);

    // Phase 4: identical ignoring volatile columns.
    assert.deepEqual(stripVolatile(run1), stripVolatile(run2), 'two runs must produce identical result rows');

    // The extractor also wrote the CSV to 07_actual_results.
    const csvPath = path.join(tmpA, '07', 'results_TC_01_ITER_01.csv');
    assert.ok(fs.existsSync(csvPath), 'actual-results CSV should exist');
    const fromDisk = readCsvRows(csvPath);
    assert.equal(fromDisk[0]?.['DesignType'], 'Optimal');

    // Phase 5: baseline (=run1) vs actual (=run2) => PASS; then nudge Power => FAIL.
    const feature = buildFeature(tmpA);
    const pass = compareRows(run1, run2, feature.compareColumns);
    assert.equal(pass.outcome, 'PASS', pass.summary);

    const nudged = run2.map((r) => ({ ...r, Attained_Power: '0.90120' }));
    const fail = compareRows(run1, nudged, feature.compareColumns);
    assert.equal(fail.outcome, 'FAIL');
    assert.equal(fail.valueMismatches[0]?.column, 'Attained_Power');
    assert.equal(fail.valueMismatches[0]?.rowKey, 'Optimal');
  } finally {
    await browser.close();
    fs.rmSync(tmpA, { recursive: true, force: true });
    fs.rmSync(tmpB, { recursive: true, force: true });
  }
});
