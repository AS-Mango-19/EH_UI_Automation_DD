/**
 * Importer selector disambiguation. Every DISTINCT recorded DOM id must get its own
 * selectors.csv row + step, even when controls share a visible label (label-first
 * clicks make objectNameFromRef collide). Regression for the DOP(PD) case where the
 * three hypothesis blocks all click "Proportion under Control (πc)" for distinct ids
 * `#proportionUnderControl_SP/_SS/_NI` — the _SS/_NI selectors + steps used to vanish.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseCodegen } from '../../scripts/import-codegen.js';

test('distinct DOM ids sharing a visible label each get their own selector + step', () => {
  const lines = [
    "await page.getByText('Proportion under Control (πc)').click();",
    "await page.locator('#proportionUnderControl_SP').click();",
    "await page.locator('#proportionUnderControl_SP').fill('0.11');",
    "await page.getByText('Proportion under Control (πc)').click();",
    "await page.locator('#proportionUnderControl_SS').click();",
    "await page.locator('#proportionUnderControl_SS').fill('0.1');",
    "await page.getByText('Proportion under Control (πc)').click();",
    "await page.locator('#proportionUnderControl_NI').click();",
    "await page.locator('#proportionUnderControl_NI').fill('0.4');",
  ];
  const { selectors, steps } = parseCodegen(lines, {});

  const pc = selectors.filter((s) => s.selectorValue.includes('proportionUnderControl'));
  assert.deepEqual(
    pc.map((s) => s.selectorValue).sort(),
    ['#proportionUnderControl_NI', '#proportionUnderControl_SP', '#proportionUnderControl_SS'],
    'all three distinct ids must have a selector row',
  );
  assert.equal(new Set(pc.map((s) => s.objectName)).size, 3, 'each distinct id needs a distinct objectName');

  // every one of those selectors is referenced by a fill step
  const fillNames = steps.filter((s) => String(s.Action) === 'fill').map((s) => String(s.ObjectName));
  for (const s of pc) assert.ok(fillNames.includes(s.objectName), `no fill step references ${s.objectName}`);
});

test('the SAME control recorded twice (superset toggle) still collapses to one selector', () => {
  const lines = [
    "await page.getByText('Sample Size (n)').click();",
    "await page.locator('#sampleSize').click();",
    "await page.locator('#sampleSize').fill('100');",
    "await page.getByText('Sample Size (n)').click();",
    "await page.locator('#sampleSize').fill('200');",
  ];
  const { selectors } = parseCodegen(lines, {});
  assert.equal(selectors.filter((s) => s.selectorValue.includes('sampleSize')).length, 1);
});
