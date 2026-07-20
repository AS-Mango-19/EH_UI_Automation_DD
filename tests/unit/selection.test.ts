/**
 * Selection unit tests (§13.6): tag expression grammar (OR ',', AND '+', NOT '~')
 * and schema coercions.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { evaluateTagExpr } from '../../core/runner/select.js';
import { MasterRowSchema } from '../../core/schema/master.schema.js';

const tags = (s: string) => new Set(s.split(',').map((t) => t.trim().toLowerCase()));

test('OR matches any term', () => {
  assert.equal(evaluateTagExpr('smoke,regression', tags('regression')), true);
  assert.equal(evaluateTagExpr('smoke,regression', tags('nightly')), false);
});

test('AND requires all terms', () => {
  assert.equal(evaluateTagExpr('smoke+p1', tags('smoke,p1')), true);
  assert.equal(evaluateTagExpr('smoke+p1', tags('smoke')), false);
});

test('NOT excludes', () => {
  assert.equal(evaluateTagExpr('regression+~wip', tags('regression')), true);
  assert.equal(evaluateTagExpr('regression+~wip', tags('regression,wip')), false);
});

test('master row: blank Execute coerces to false, chromium default', () => {
  const row = MasterRowSchema.parse({
    TC_ID: 'TC_01',
    Module: 'ProductDesign',
    Feature: 'Simon2Stage',
    Execute: '',
    Browser: '',
    ProjectID: '19080',
  });
  assert.equal(row.Execute, false);
  assert.equal(row.Browser, 'chromium');
  assert.equal(row.BaselineMode, 'compare');
});

test('master row: TRUE variants coerce to true', () => {
  for (const v of ['TRUE', 'true', '1', 'Yes']) {
    const row = MasterRowSchema.parse({ TC_ID: 'X', Module: 'M', Feature: 'F', Execute: v });
    assert.equal(row.Execute, true, `for ${v}`);
  }
});
