/**
 * Importer column reuse — the rule that stops a recorded field creating a parallel
 * column beside the tester's own.
 *
 * Codegen truncates long accessible names, so a recorded field arrives as a PREFIX
 * of the real column ("Sample Size" for "Sample Size (n)"). Exact matching missed
 * that and seeded a duplicate, and the run then silently read the RECORDED value
 * instead of the tester's — ROM(PD) typed 123 when the testdata said 120.
 *
 * This mirrors the matcher in scripts/import-codegen.ts. Ambiguity must NOT resolve:
 * guessing the wrong column is worse than seeding a new one.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

const normalizeColName = (s: string): string => s.toLowerCase().replace(/[^a-z0-9]/g, '');

/** Returns the existing column a recorded field should reuse, or undefined. */
function resolveReuse(derived: string, headers: string[]): string | undefined {
  const existingByNorm = new Map<string, string>();
  for (const h of headers) {
    const n = normalizeColName(h);
    if (n && !existingByNorm.has(n)) existingByNorm.set(n, h);
  }
  const derivedNorm = normalizeColName(derived);
  let existing = existingByNorm.get(derivedNorm);
  if (!existing && derivedNorm.length >= 4) {
    const hits = [...existingByNorm.entries()].filter(
      ([norm]) => norm !== derivedNorm && (norm.startsWith(derivedNorm) || derivedNorm.startsWith(norm)),
    );
    if (hits.length === 1) existing = hits[0]?.[1];
  }
  return existing;
}

test('exact match still wins across case and spacing', () => {
  assert.equal(resolveReuse('TestType', ['Test Type', 'Power']), 'Test Type');
  assert.equal(resolveReuse('test_type', ['Test Type']), 'Test Type');
});

test('a truncated recorded label reuses the tester column (the ROM(PD) bug)', () => {
  assert.equal(resolveReuse('Sample Size', ['Sample Size (n)', 'Power']), 'Sample Size (n)');
  assert.equal(
    resolveReuse('Coefficient of Variation of', ['Coefficient of Variation of Data']),
    'Coefficient of Variation of Data',
  );
});

test('a recorded label LONGER than the column also reuses it', () => {
  // "Noninferiority Margin (p0 = u" truncated mid-symbol, longer than the column.
  assert.equal(resolveReuse('Noninferiority Margin (p0 = u', ['Noninferiority Margin']), 'Noninferiority Margin');
});

test('ambiguity does NOT resolve — two candidates means we cannot know', () => {
  // "Mean" prefixes both; guessing would bind the step to the wrong field.
  assert.equal(resolveReuse('Mean', ['Mean Control', 'Mean Treatment']), undefined);
});

test('unrelated columns are never reused', () => {
  assert.equal(resolveReuse('Power', ['Sample Size (n)', 'Test Type']), undefined);
});

test('very short derived names do not prefix-match', () => {
  // A 3-char name would prefix half the sheet; require >= 4 before guessing.
  assert.equal(resolveReuse('Pow', ['Power']), undefined);
});

test('the mutually-exclusive NI/SP variants stay separate', () => {
  // Both exist; "Ratio of Means" must bind to itself, never to the nonInf_ variant.
  assert.equal(resolveReuse('Ratio of Means', ['Ratio of Means', 'nonInf_ratioOfMeans']), 'Ratio of Means');
});
