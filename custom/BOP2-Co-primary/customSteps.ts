import type { Locator, Page } from 'playwright';
import type { KeywordHandler } from '../../core/keywords/types.js';
import { logger } from '../../core/utils/logger.js';

function isMissing(value: string): boolean {
  const normalized = value.trim().toLowerCase();
  return normalized === '' || normalized === 'n/a' || normalized === 'na';
}

function resolveOptional(ctx: Parameters<KeywordHandler>[1], token: string, stepId: number): string {
  try {
    return ctx.resolve(token, { stepId, column: 'InputValue' }).trim();
  } catch {
    return '';
  }
}

async function clearRows(page: Page, timeout: number): Promise<void> {
  for (let attempts = 0; attempts < 40; attempts += 1) {
    const deleteButtons = page.locator('#btn-delete');
    if ((await deleteButtons.count().catch(() => 0)) === 0) return;
    await deleteButtons.first().click({ timeout });
    await page.waitForTimeout(120);
  }
  throw new Error('BOP2-Co-primary: too many delete attempts while clearing rows.');
}

async function addRows(
  page: Page,
  inputs: Locator,
  target: number,
  buttonName: string,
  timeout: number,
): Promise<void> {
  const addButton = page.getByRole('button', { name: buttonName }).first();
  for (let attempts = 0; attempts < 80; attempts += 1) {
    if ((await inputs.count().catch(() => 0)) >= target) return;
    await addButton.click({ timeout });
    await page.waitForTimeout(150);
  }
  throw new Error(`BOP2-Co-primary: unable to add enough ${buttonName} rows (target=${target}).`);
}

async function fillInputs(inputs: Locator, values: string[], timeout: number): Promise<void> {
  for (let index = 0; index < values.length; index += 1) {
    const input = inputs.nth(index);
    await input.fill(values[index], { timeout });
    const actual = (await input.inputValue().catch(() => '')).trim();
    if (actual !== values[index].trim()) {
      throw new Error(`BOP2-Co-primary: row ${index} read back "${actual}" instead of "${values[index]}".`);
    }
  }
}

function readIndexedValues(
  ctx: Parameters<KeywordHandler>[1],
  stepId: number,
  table: string,
  field: string,
): string[] {
  const values: string[] = [];
  for (let index = 0; index < 40; index += 1) {
    const value = resolveOptional(ctx, `\${data.design.${table}.${index}.${field}}`, stepId);
    if (!isMissing(value)) values.push(value);
  }
  return values;
}

export const configureInterimSampleSizes: KeywordHandler = async (page, ctx, step) => {
  const values = readIndexedValues(ctx, step.stepId, 'sampleSizeInterimTable', 'sampleSize');
  if (values.length === 0) throw new Error('BOP2-Co-primary: no sample-size values found.');

  await clearRows(page, step.timeout);
  const inputs = page.locator('[id^="sampleSizeInterimTable."][id$=".sampleSize"]');
  await addRows(page, inputs, values.length, 'Add Interim', step.timeout);
  await fillInputs(inputs, values, step.timeout);
  logger.info(`configureInterimSampleSizes: configured ${values.length} row(s).`);
};

export const configureOtherScenarios: KeywordHandler = async (page, ctx, step) => {
  const fields = ['pr1_other', 'pr2_other', 'pr3_other'];
  const valuesByField = fields.map((field) => readIndexedValues(ctx, step.stepId, 'otherScenariosTable', field));
  const rowCount = Math.max(...valuesByField.map((values) => values.length));
  if (rowCount === 0) return;

  await clearRows(page, step.timeout);
  const inputsByField = fields.map((field) =>
    page.locator(`[id^="otherScenariosTable."][id$=".${field}"]`),
  );
  await addRows(page, inputsByField[0], rowCount, 'Add Scenario', step.timeout);
  for (let index = 0; index < inputsByField.length; index += 1) {
    await fillInputs(inputsByField[index], valuesByField[index], step.timeout);
  }
  logger.info(`configureOtherScenarios: configured ${rowCount} row(s).`);
};