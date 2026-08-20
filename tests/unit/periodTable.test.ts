/**
 * loopPeriods period reconstruction — the count-agnostic FILL half of a period table.
 * Verifies reconstructPeriods rebuilds folded `<prefix>.<n>.<field>` columns into the
 * present periods, gated by the countField, so ONE looped template row replaces the
 * N-per-period enumeration for any N.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { reconstructPeriods, isNaCell } from '../../core/keywords/periodTable.js';

const HEADERS = [
  'TC_ID',
  'IterationID',
  'boundary.0.analysisSpacingInfo',
  'boundary.0.efficacyCheck',
  'boundary.0.futilityCheck',
  'boundary.1.analysisSpacingInfo',
  'boundary.1.efficacyCheck',
  'boundary.1.futilityCheck',
  'boundary.2.analysisSpacingInfo',
  'boundary.2.efficacyCheck',
  'boundary.2.futilityCheck',
  'boundary.3.analysisSpacingInfo',
  'boundary.3.efficacyCheck',
  'boundary.3.futilityCheck',
  // a DIFFERENT folded table on the same row must be ignored by prefix "boundary"
  'boundarySim.0.analysisSpacingInfo',
  'enrollmentTable.0.avgSubjectsEnrolled',
];

test('present periods = countField non-N/A, in ascending index order', () => {
  const row: Record<string, string> = {
    'boundary.0.analysisSpacingInfo': '30',
    'boundary.1.analysisSpacingInfo': '55',
    'boundary.2.analysisSpacingInfo': '80',
    'boundary.3.analysisSpacingInfo': 'N/A',
    'boundarySim.0.analysisSpacingInfo': '10',
    'enrollmentTable.0.avgSubjectsEnrolled': '12',
  };
  const periods = reconstructPeriods(HEADERS, row, 'boundary', 'analysisSpacingInfo');
  assert.deepEqual(periods.map((p) => p.n), [0, 1, 2]); // period 3 excluded (N/A spacing)
});

test('countField gates presence — other fields being N/A does NOT drop the period', () => {
  const row: Record<string, string> = {
    'boundary.0.analysisSpacingInfo': '30',
    'boundary.0.efficacyCheck': 'check',
    'boundary.0.futilityCheck': 'N/A',
    'boundary.1.analysisSpacingInfo': '55',
    'boundary.1.efficacyCheck': '', // blank, still present via spacing
    'boundary.1.futilityCheck': 'uncheck',
  };
  const periods = reconstructPeriods(HEADERS, row, 'boundary', 'analysisSpacingInfo');
  assert.deepEqual(periods.map((p) => p.n), [0, 1]);
  assert.equal(periods[0]!.fields['efficacyCheck'], 'check');
  assert.equal(periods[0]!.fields['futilityCheck'], 'N/A'); // preserved verbatim for the template's SkipIf
  assert.equal(periods[1]!.fields['efficacyCheck'], '');
});

test('non-contiguous periods keep their real index (loops [0,1,3], not [0,1,2])', () => {
  const row: Record<string, string> = {
    'boundary.0.analysisSpacingInfo': '25',
    'boundary.1.analysisSpacingInfo': '50',
    'boundary.2.analysisSpacingInfo': 'N/A',
    'boundary.3.analysisSpacingInfo': '90',
  };
  const periods = reconstructPeriods(HEADERS, row, 'boundary', 'analysisSpacingInfo');
  assert.deepEqual(periods.map((p) => p.n), [0, 1, 3]);
});

test('the "boundary" prefix does not capture "boundarySim" columns', () => {
  const row: Record<string, string> = {
    'boundary.0.analysisSpacingInfo': '30',
    'boundarySim.0.analysisSpacingInfo': '99',
    'boundarySim.1.analysisSpacingInfo': '98',
  };
  const periods = reconstructPeriods(HEADERS, row, 'boundary', 'analysisSpacingInfo');
  assert.deepEqual(periods.map((p) => p.n), [0]);
  assert.equal(periods[0]!.fields['analysisSpacingInfo'], '30');
});

test('no matching columns -> no periods (fixed design)', () => {
  const periods = reconstructPeriods(['TC_ID', 'IterationID', 'power'], { power: '0.9' }, 'boundary', 'analysisSpacingInfo');
  assert.deepEqual(periods, []);
});

test('isNaCell treats blank and N/A spellings as not-applicable', () => {
  for (const v of ['', '  ', 'N/A', 'n/a', 'Not Applicable']) assert.equal(isNaCell(v), true, `"${v}" should be N/A`);
  for (const v of ['0', '30', 'check', 'uncheck']) assert.equal(isNaCell(v), false, `"${v}" should NOT be N/A`);
});
