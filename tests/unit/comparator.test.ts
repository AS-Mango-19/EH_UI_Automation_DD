/**
 * Comparator unit tests (§13.6): tolerance edge cases — zero expected value,
 * integer-vs-float, missing key, reordered rows, abs vs rel, and the
 * missing-tolerance validation rule.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { compareRows } from '../../core/comparator/comparator.js';
import { numericToleranceIssue, CompareColumnSchema, type CompareColumn } from '../../core/schema/compareConfig.schema.js';

function col(over: Partial<CompareColumn> & { ColumnName: string }): CompareColumn {
  return CompareColumnSchema.parse({
    ColumnName: over.ColumnName,
    IsKey: over.IsKey ?? false,
    Compare: over.Compare ?? true,
    DataType: over.DataType ?? 'numeric',
    AbsTolerance: over.AbsTolerance ?? '',
    RelTolerance: over.RelTolerance ?? '',
    RoundTo: over.RoundTo ?? '',
    Normalize: over.Normalize ?? '',
    Notes: '',
  }) as CompareColumn;
}

const KEY = col({ ColumnName: 'DesignType', IsKey: true, DataType: 'string' });

test('integers compared exactly pass when equal, fail when off by one', () => {
  const n = col({ ColumnName: 'n', DataType: 'numeric', AbsTolerance: 0, RoundTo: 0 });
  const cols = [KEY, n];
  const ok = compareRows([{ DesignType: 'Optimal', n: '95' }], [{ DesignType: 'Optimal', n: '95' }], cols);
  assert.equal(ok.outcome, 'PASS');
  const bad = compareRows([{ DesignType: 'Optimal', n: '95' }], [{ DesignType: 'Optimal', n: '96' }], cols);
  assert.equal(bad.outcome, 'FAIL');
  assert.deepEqual(bad.failureClasses, ['VALUE_MISMATCH']);
  assert.equal(bad.valueMismatches[0]?.column, 'n');
});

test('float within abs tolerance passes; outside fails', () => {
  const p = col({ ColumnName: 'PET', DataType: 'numeric', AbsTolerance: 0.0005, RoundTo: 4 });
  const cols = [KEY, p];
  const ok = compareRows([{ DesignType: 'Optimal', PET: '0.5000' }], [{ DesignType: 'Optimal', PET: '0.50003' }], cols);
  assert.equal(ok.outcome, 'PASS');
  const bad = compareRows([{ DesignType: 'Optimal', PET: '0.5000' }], [{ DesignType: 'Optimal', PET: '0.5010' }], cols);
  assert.equal(bad.outcome, 'FAIL');
});

test('relative tolerance passes when abs would fail', () => {
  const en = col({ ColumnName: 'EN', DataType: 'numeric', AbsTolerance: 0.01, RelTolerance: 0.001, RoundTo: 3 });
  const cols = [KEY, en];
  // expected 100, actual 100.05: abs delta 0.05 > 0.01, but rel 0.0005 <= 0.001 => PASS
  const r = compareRows([{ DesignType: 'Optimal', EN: '100.000' }], [{ DesignType: 'Optimal', EN: '100.050' }], cols);
  assert.equal(r.outcome, 'PASS');
});

test('zero expected value does not divide by zero (rel skipped, abs decides)', () => {
  const c = col({ ColumnName: 'x', DataType: 'numeric', AbsTolerance: 0.001, RelTolerance: 0.01 });
  const cols = [KEY, c];
  const ok = compareRows([{ DesignType: 'A', x: '0' }], [{ DesignType: 'A', x: '0.0005' }], cols);
  assert.equal(ok.outcome, 'PASS'); // abs 0.0005 <= 0.001
  const bad = compareRows([{ DesignType: 'A', x: '0' }], [{ DesignType: 'A', x: '0.5' }], cols);
  assert.equal(bad.outcome, 'FAIL'); // abs fails, rel undefined (div by zero guarded)
});

test('reordered rows still match by key (not positional)', () => {
  const n = col({ ColumnName: 'n', DataType: 'numeric', AbsTolerance: 0, RoundTo: 0 });
  const cols = [KEY, n];
  const baseline = [
    { DesignType: 'Optimal', n: '95' },
    { DesignType: 'Minimax', n: '80' },
  ];
  const actualReordered = [
    { DesignType: 'Minimax', n: '80' },
    { DesignType: 'Optimal', n: '95' },
  ];
  const r = compareRows(baseline, actualReordered, cols);
  assert.equal(r.outcome, 'PASS', r.summary);
});

test('missing and extra rows are reported by key, separately', () => {
  const n = col({ ColumnName: 'n', DataType: 'numeric', AbsTolerance: 0, RoundTo: 0 });
  const cols = [KEY, n];
  const baseline = [{ DesignType: 'Optimal', n: '95' }];
  const actual = [{ DesignType: 'Minimax', n: '80' }];
  const r = compareRows(baseline, actual, cols);
  assert.equal(r.outcome, 'FAIL');
  assert.ok(r.failureClasses.includes('MISSING_ROW'));
  assert.ok(r.failureClasses.includes('EXTRA_ROW'));
  assert.deepEqual(r.missingRows, ['Optimal']);
  assert.deepEqual(r.extraRows, ['Minimax']);
});

test('numeric column without any tolerance is a validation error', () => {
  const bad = col({ ColumnName: 'n', DataType: 'numeric', AbsTolerance: '' as unknown as number, RelTolerance: '' as unknown as number });
  assert.ok(numericToleranceIssue(bad));
  const good = col({ ColumnName: 'n', DataType: 'numeric', AbsTolerance: 0 });
  assert.equal(numericToleranceIssue(good), null);
  const stringCol = col({ ColumnName: 's', DataType: 'string' });
  assert.equal(numericToleranceIssue(stringCol), null);
});

test('integer-vs-float: 95 vs 95.0 with exact integer tolerance passes', () => {
  const n = col({ ColumnName: 'n', DataType: 'numeric', AbsTolerance: 0, RoundTo: 0 });
  const cols = [KEY, n];
  const r = compareRows([{ DesignType: 'A', n: '95' }], [{ DesignType: 'A', n: '95.0' }], cols);
  assert.equal(r.outcome, 'PASS');
});
