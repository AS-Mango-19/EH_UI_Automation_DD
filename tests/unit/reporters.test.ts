/**
 * Reporter smoke test (§13.6 spirit, §10): writeReports emits a self-contained
 * combined HTML, a per-feature HTML with the breached cell highlighted, a
 * parseable results.json and a junit.xml that carries the failure.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { writeReports } from '../../core/reporters/index.js';
import { emptyCounts, type RunSummary, type IterationResult } from '../../core/model/types.js';
import type { CompareReport } from '../../core/comparator/types.js';

function failCompare(): CompareReport {
  return {
    outcome: 'FAIL',
    failureClasses: ['VALUE_MISMATCH'],
    keyColumns: ['DesignType'],
    comparedColumns: ['Attained_Power'],
    missingRows: [],
    extraRows: [],
    valueMismatches: [
      {
        column: 'Attained_Power',
        rowKey: 'Optimal',
        expected: '0.80120',
        actual: '0.90120',
        delta: '0.1',
        toleranceApplied: 'abs<=0.0005 OR rel<=0.01',
        toleranceBreached: true,
      },
    ],
    totalCellsCompared: 1,
    summary: 'FAIL — VALUE_MISMATCH; 1 value mismatch(es), 0 missing, 0 extra row(s).',
  };
}

function summary(): RunSummary {
  const counts = emptyCounts();
  counts.PASS = 1;
  counts.FAIL = 1;
  const pass: IterationResult = {
    tcId: 'TC_02', iterationId: 'ITER_01', module: 'ProductDesign', feature: 'Simon2Stage',
    testName: 'pass case', env: 'qa', browser: 'chromium', status: 'PASS',
    startedAt: '2026-07-14T00:00:00.000Z', durationMs: 1200, steps: [],
  };
  const fail: IterationResult = {
    tcId: 'TC_01', iterationId: 'ITER_01', module: 'ProductDesign', feature: 'Simon2Stage',
    testName: 'fail case', env: 'qa', browser: 'chromium', status: 'FAIL',
    startedAt: '2026-07-14T00:00:00.000Z', durationMs: 3400,
    steps: [
      { stepId: 420, stepGroup: 'ConfigureDesign', action: 'fill', page: 'DesignPage', objectName: 'txt_Power', resolvedInput: '0.89', description: 'power', status: 'passed', durationMs: 30 },
    ],
    compare: failCompare(),
    failureReason: 'Attained_Power moved',
  };
  return {
    runId: 'RUN_REPORT_TEST', env: 'qa', baseUrl: 'https://qa.example.test', startedAt: '2026-07-14T00:00:00.000Z',
    durationMs: 4600, trigger: 'local', counts, total: 2, iterations: [pass, fail],
  };
}

test('writeReports emits combined html, feature html, json and junit with the failure', () => {
  const paths = writeReports(summary());
  const combined = fs.readFileSync(paths.combined, 'utf8');
  assert.match(combined, /Regression run RUN_REPORT_TEST/);
  assert.match(combined, /Feature × TC matrix/);
  assert.ok(!/https?:\/\/(cdn|unpkg|jsdelivr)/i.test(combined), 'combined report must be self-contained (no CDN)');

  const feat = fs.readFileSync(paths.featureReports[0] as string, 'utf8');
  assert.match(feat, /Attained_Power/);
  assert.match(feat, /breach/); // breached cell styling applied

  const json = JSON.parse(fs.readFileSync(paths.json, 'utf8')) as RunSummary;
  assert.equal(json.total, 2);
  assert.equal(json.counts.FAIL, 1);

  const junit = fs.readFileSync(paths.junit, 'utf8');
  assert.match(junit, /<failure/);
  assert.match(junit, /tests="2"/);
});
