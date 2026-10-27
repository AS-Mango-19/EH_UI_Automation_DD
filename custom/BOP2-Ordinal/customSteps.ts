import path from 'node:path';
import type { Locator, Page } from 'playwright';
import type { KeywordHandler } from '../../core/keywords/types.js';
import { writeCsv } from '../../core/csv/writer.js';
import { ensureDir } from '../../core/utils/paths.js';
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
  throw new Error('BOP2-Ordinal: too many delete attempts while clearing rows.');
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
  throw new Error(`BOP2-Ordinal: unable to add enough ${buttonName} rows (target=${target}).`);
}

async function fillInputs(inputs: Locator, values: string[], timeout: number): Promise<void> {
  for (let index = 0; index < values.length; index += 1) {
    const input = inputs.nth(index);
    await input.fill(values[index], { timeout });
    const actual = (await input.inputValue().catch(() => '')).trim();
    if (actual !== values[index].trim()) {
      throw new Error(`BOP2-Ordinal: row ${index} read back "${actual}" instead of "${values[index]}".`);
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
  if (values.length === 0) throw new Error('BOP2-Ordinal: no sample-size values found.');

  await clearRows(page, step.timeout);
  const inputs = page.locator('[id^="sampleSizeInterimTable."][id$=".sampleSize"]');
  await addRows(page, inputs, values.length, 'Add Interim', step.timeout);
  await fillInputs(inputs, values, step.timeout);
  logger.info(`configureInterimSampleSizes: configured ${values.length} row(s).`);
};

export const configureOtherScenarios: KeywordHandler = async (page, ctx, step) => {
  const pr1Values = readIndexedValues(ctx, step.stepId, 'otherScenariosTable', 'pr1_other');
  const pr2Values = readIndexedValues(ctx, step.stepId, 'otherScenariosTable', 'pr2_other');
  const rowCount = Math.max(pr1Values.length, pr2Values.length);
  if (rowCount === 0) return;

  await clearRows(page, step.timeout);
  const pr1Inputs = page.locator('[id^="otherScenariosTable."][id$=".pr1_other"]');
  const pr2Inputs = page.locator('[id^="otherScenariosTable."][id$=".pr2_other"]');
  await addRows(page, pr1Inputs, rowCount, 'Add Scenario', step.timeout);
  await fillInputs(pr1Inputs, pr1Values, step.timeout);
  await fillInputs(pr2Inputs, pr2Values, step.timeout);
  logger.info(`configureOtherScenarios: configured ${rowCount} row(s).`);
};

function normalizeResultPrefix(raw: string): string {
  return raw.trim().replace(/\s+$/g, '');
}

async function listResultLinks(page: Page, prefix: string): Promise<string[]> {
  const resultNames = new Set<string>();
  const links = page.getByRole('link');
  const viewports = page.locator('.ag-body-viewport');
  const viewportCount = await viewports.count().catch(() => 0);

  for (let pass = 0; pass < 40; pass += 1) {
    const count = await links.count().catch(() => 0);
    for (let index = 0; index < count; index += 1) {
      const text = ((await links.nth(index).textContent().catch(() => '')) ?? '').trim();
      if (text.startsWith(`${prefix}-`)) resultNames.add(text);
    }

    let moved = false;
    for (let index = 0; index < viewportCount; index += 1) {
      const didMove = await viewports.nth(index).evaluate((element) => {
        const before = element.scrollTop;
        element.scrollTop = before + Math.max(element.clientHeight * 0.8, 80);
        return element.scrollTop !== before;
      }).catch(() => false);
      moved = moved || didMove;
    }
    if (!moved) break;
    await page.waitForTimeout(120);
  }

  for (let index = 0; index < viewportCount; index += 1) {
    await viewports.nth(index).evaluate((element) => { element.scrollTop = 0; }).catch(() => undefined);
  }
  return [...resultNames];
}

async function isCompletedResult(page: Page, resultName: string): Promise<boolean> {
  const link = page.getByRole('link', { name: resultName, exact: true }).first();
  if (!(await link.count().catch(() => 0))) return false;
  const row = link.locator('xpath=ancestor::*[contains(@class,"ag-row") or @role="row"][1]');
  if ((await row.count().catch(() => 0)) === 0) return true;
  const rowText = (((await row.textContent().catch(() => '')) ?? '').trim()).toLowerCase();
  if (rowText.includes('failed') || rowText.includes('error')) return false;
  return rowText === '' || rowText.includes('completed');
}

async function closeResultTab(page: Page, timeout: number): Promise<void> {
  const closeButtons = page.locator('#close-tab-0, [id^="close-tab-"]');
  const count = await closeButtons.count().catch(() => 0);
  for (let index = 0; index < count; index += 1) {
    const closeButton = closeButtons.nth(index);
    if (!(await closeButton.isVisible().catch(() => false))) continue;
    await closeButton.click({ timeout });
    await page.waitForTimeout(300);
    logger.info('extractAllResultTables: closed the current result.');
    return;
  }
  logger.info('extractAllResultTables: no visible result close button; result view was already closed.');
}

async function expandResultTree(page: Page, timeout: number): Promise<void> {
  const expandIcons = page.locator('.ag-icon.ag-icon-tree-closed');
  const count = await expandIcons.count().catch(() => 0);
  for (let index = 0; index < count; index += 1) {
    const expandIcon = expandIcons.nth(index);
    if (!(await expandIcon.isVisible().catch(() => false))) continue;
    await expandIcon.click({ timeout });
    await page.waitForTimeout(500);
    logger.info('extractAllResultTables: expanded the results tree.');
    return;
  }
  logger.info('extractAllResultTables: results tree is already expanded.');
}

export const extractAllResultTables: KeywordHandler = async (page, ctx, step) => {
  let prefix = '';
  try {
    prefix = normalizeResultPrefix(ctx.resolve('${data.design.Result Name}', { stepId: step.stepId, column: 'InputValue' }));
  } catch {
    prefix = '';
  }
  if (!prefix) {
    throw new Error('extractAllResultTables: Result Name prefix is empty; set design.csv "Result Name".');
  }

  const shared = await import('../_shared/customSteps.ts');
  const sharedFn = (shared.extractAllResultTables ?? shared.default) as KeywordHandler;
  const deadline = Date.now() + step.timeout;
  let completedNames: string[] = [];

  while (Date.now() < deadline) {
    await expandResultTree(page, step.timeout);
    const allNames = await listResultLinks(page, prefix);
    completedNames = [];
    for (const resultName of allNames) {
      if (await isCompletedResult(page, resultName)) completedNames.push(resultName);
    }
    logger.info(
      `extractAllResultTables: expanded results -> ${allNames.length} matching result(s), ${completedNames.length} completed: ${completedNames.join(' | ')}`,
    );
    if (completedNames.length > 0) break;
    await page.waitForTimeout(1500);
  }

  if (completedNames.length === 0) {
    throw new Error(`extractAllResultTables: no Completed results found for prefix "${prefix}" within ${step.timeout}ms`);
  }

  const allRows: Record<string, string>[] = [];
  for (let index = 0; index < completedNames.length; index += 1) {
    const resultName = completedNames[index];
    logger.info(`extractAllResultTables: opening completed result ${index + 1}/${completedNames.length}: "${resultName}"`);
    await page.getByRole('link', { name: resultName, exact: true }).first().click({ timeout: step.timeout });

    const oldPrefix = (ctx as { resultPrefix?: string }).resultPrefix;
    (ctx as { resultPrefix?: string }).resultPrefix = `res${index + 1}_`;
    await sharedFn(page, ctx, step);
    (ctx as { resultPrefix?: string }).resultPrefix = oldPrefix;

    const rows = Array.isArray(ctx.lastActualRows) ? ctx.lastActualRows : [];
    for (const row of rows) {
      allRows.push({ ...row, TableName: `${resultName} | ${row['TableName'] ?? ''}` });
    }

    await closeResultTab(page, step.timeout);
    if (index < completedNames.length - 1) await expandResultTree(page, step.timeout);
  }

  if (allRows.length === 0) {
    throw new Error('extractAllResultTables: completed results opened, but no table rows were extracted.');
  }

  allRows.sort(
    (left, right) =>
      String(left['TableName'] ?? '').localeCompare(String(right['TableName'] ?? '')) ||
      String(left['RowLabel'] ?? '').localeCompare(String(right['RowLabel'] ?? '')) ||
      String(left['ColumnName'] ?? '').localeCompare(String(right['ColumnName'] ?? '')),
  );

  const columns = ['TableName', 'RowLabel', 'ColumnName', 'Value', 'RunID', 'ProjectID'];
  ensureDir(ctx.feature.paths.actualResults);
  const outputPath = path.join(ctx.feature.paths.actualResults, `results_${ctx.tcId}_${ctx.iterationId}.csv`);
  writeCsv(outputPath, allRows, columns);
  ctx.lastActualRows = allRows;
  ctx.lastActualPath = outputPath;
  logger.info(`extractAllResultTables: combined ${completedNames.length} completed result(s) -> ${allRows.length} cell(s).`);
  return outputPath;
};