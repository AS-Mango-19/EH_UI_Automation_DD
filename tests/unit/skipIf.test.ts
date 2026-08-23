/**
 * SkipIf isNaCell semantics for the N/A RHS. In the child-table fold an ABSENT period
 * yields '' while an unused field yields the literal 'N/A' — both mean "not applicable",
 * so `==N/A` must match BOTH (isNaCell), while `==EMPTY` stays a strict empty check.
 * Regression for GADAR's mutually-exclusive Add-Period gates.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { evaluateSkipIf } from '../../core/runner/skipIf.js';
import type { RunContext } from '../../core/runner/context.js';

function ctx(vars: Record<string, string>): RunContext {
  return {
    resolve(side: string): string {
      const m = /^\$\{(.+)\}$/.exec(side.trim());
      return m ? (vars[m[1]!] ?? '') : side;
    },
  } as unknown as RunContext;
}

test('==N/A matches empty OR any N/A spelling (isNaCell), not a literal compare', () => {
  const c = ctx({ 'data.x': '', 'data.y': 'N/A', 'data.z': '5', 'data.w': 'Not Applicable' });
  assert.equal(evaluateSkipIf(c, '${data.x}==N/A'), true, 'empty => skip');
  assert.equal(evaluateSkipIf(c, '${data.y}==N/A'), true, 'N/A => skip');
  assert.equal(evaluateSkipIf(c, '${data.w}==N/A'), true, '"Not Applicable" => skip');
  assert.equal(evaluateSkipIf(c, '${data.z}==N/A'), false, 'a real value => do NOT skip');
});

test('!=N/A is the negation — skip only when a real value is present', () => {
  const c = ctx({ 'data.x': '', 'data.y': 'N/A', 'data.z': '5' });
  assert.equal(evaluateSkipIf(c, '${data.x}!=N/A'), false, 'empty => not applicable => do not skip');
  assert.equal(evaluateSkipIf(c, '${data.y}!=N/A'), false, 'N/A => do not skip');
  assert.equal(evaluateSkipIf(c, '${data.z}!=N/A'), true, 'a real value => skip');
});

test('==EMPTY stays a strict empty-string check (N/A is NOT empty)', () => {
  const c = ctx({ 'data.x': '', 'data.y': 'N/A' });
  assert.equal(evaluateSkipIf(c, '${data.x}==EMPTY'), true, 'empty => skip');
  assert.equal(evaluateSkipIf(c, '${data.y}==EMPTY'), false, 'N/A is not the empty string');
});
