import path from 'node:path';
import type { KeywordHandler } from '../../core/keywords/types.js';
import { writeCsv } from '../../core/csv/writer.js';
import { ensureDir } from '../../core/utils/paths.js';
import { logger } from '../../core/utils/logger.js';

function looksMissing(value: string): boolean {
  const normalized = value.trim().toLowerCase();
  return normalized === '' || normalized === 'n/a' || normalized === 'na';
}

function readSampleSizes(ctx: Parameters<KeywordHandler>[1], stepId: number): string[] {
  const values: string[] = [];
  let missingColumnsInARow = 0;

  for (let i = 0; i < 40; i += 1) {
    const token = `\${data.design.sampleSizeInterimTable.${i}.sampleSize}`;
    let resolved = '';
    try {
      resolved = ctx.resolve(token, { stepId, column: 'InputValue' });
      missingColumnsInARow = 0;
    } catch {
      missingColumnsInARow += 1;
      if (missingColumnsInARow >= 3) break;
      continue;
    }

    if (!looksMissing(resolved)) {
      values.push(resolved.trim());
    }
  }

  return values;
}

async function clearAllInterimRows(page: Parameters<KeywordHandler>[0], timeout: number): Promise<void> {
  for (let attempts = 0; attempts < 30; attempts += 1) {
    const deleteButtons = page.locator('#btn-delete');
    const count = await deleteButtons.count().catch(() => 0);
    if (count === 0) return;
    await deleteButtons.first().click({ timeout });
    await page.waitForTimeout(120);
  }

  throw new Error('configureInterimSampleSizes: too many delete attempts while clearing IA rows.');
}

async function ensureRowExists(page: Parameters<KeywordHandler>[0], rowIndex: number, timeout: number): Promise<void> {
  const rowInput = page.locator(`[id="sampleSizeInterimTable.${rowIndex}.sampleSize"]`).first();
  if (await rowInput.count().catch(() => 0)) return;

  const addButton = page.getByRole('button', { name: 'Add Interim' }).first();
  for (let attempts = 0; attempts < 30; attempts += 1) {
    await addButton.click({ timeout });
    if (await rowInput.count().catch(() => 0)) return;
    await page.waitForTimeout(120);
  }

  throw new Error(`configureInterimSampleSizes: row ${rowIndex} was not added.`);
}

export const configureInterimSampleSizes: KeywordHandler = async (page, ctx, step) => {
  const values = readSampleSizes(ctx, step.stepId);
  if (values.length === 0) {
    throw new Error('configureInterimSampleSizes: no sample size values found in design.csv for this iteration.');
  }

  logger.info(`configureInterimSampleSizes: preparing ${values.length} row(s).`);
  await clearAllInterimRows(page, step.timeout);

  // Add rows until the rendered inputs count matches desired values.length
  const addButton = page.getByRole('button', { name: 'Add Interim' }).first();
  const inputsLocator = page.locator('[id^="sampleSizeInterimTable."][id$=".sampleSize"]');

  for (let attempts = 0; attempts < 60; attempts += 1) {
    const count = await inputsLocator.count().catch(() => 0);
    if (count >= values.length) break;
    try { await addButton.click({ timeout: step.timeout }); } catch {}
    await page.waitForTimeout(150);
  }

  const finalCount = await inputsLocator.count().catch(() => 0);
  if (finalCount < values.length) {
    throw new Error(`configureInterimSampleSizes: after adding rows only ${finalCount} inputs rendered; expected ${values.length}`);
  }

  // Fill rendered inputs in DOM order to avoid id-index mismatches
  for (let i = 0; i < values.length; i += 1) {
    const input = inputsLocator.nth(i);
    await input.waitFor({ state: 'visible', timeout: step.timeout }).catch(() => undefined);

    // debug: log outerHTML for diagnostics
    try {
      const outer = (await input.evaluate((el) => (el as HTMLElement).outerHTML).catch(() => '')) || '';
      logger.info(`configureInterimSampleSizes: filling rendered input #${i} outerHTML=${outer.slice(0,200)}`);
    } catch {}

    let success = false;
    for (let attempt = 0; attempt < 4 && !success; attempt += 1) {
      try { await input.click({ timeout: step.timeout, force: true }); } catch {}
      try { await input.fill('', { timeout: step.timeout }); } catch {}
      try { await input.type(values[i].toString(), { delay: 50, timeout: step.timeout }); } catch {}

      try {
        await input.evaluate((el, val) => {
          (el as HTMLInputElement).focus();
          (el as HTMLInputElement).value = String(val);
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }, values[i]);
      } catch {}

      try { await input.press('Tab', { timeout: step.timeout }); } catch {}
      try { await input.press('Enter', { timeout: step.timeout }); } catch {}

      const actual = (await input.inputValue().catch(() => '')) ?? '';
      logger.info(`configureInterimSampleSizes: rendered input #${i} attempt ${attempt + 1} -> readback="${actual}"`);
      if (actual.trim() === values[i].trim()) {
        success = true;
        break;
      }
      await page.waitForTimeout(200);
    }
    if (!success) {
      throw new Error(`configureInterimSampleSizes: failed to populate rendered input #${i} with "${values[i]}" (readback mismatch)`);
    }
  }
};

export default configureInterimSampleSizes;

import type { Page } from 'playwright';

function normalizeResultPrefix(raw: string): string {
  return raw.trim().replace(/\s+$/g, '');
}

async function listResultLinks(page: Page, prefix: string): Promise<string[]> {
  const links = page.getByRole('link').filter({ hasText: prefix });
  const count = await links.count().catch(() => 0);
  const out: string[] = [];
  for (let i = 0; i < count; i += 1) {
    const text = ((await links.nth(i).textContent().catch(() => '')) ?? '').trim();
    if (!text) continue;
    if (!text.includes(prefix)) continue;
    out.push(text);
  }
  return [...new Set(out)];
}

async function isCompletedResult(page: Page, resultName: string): Promise<boolean> {
  const link = page.getByRole('link', { name: resultName, exact: true }).first();
  if (!(await link.count().catch(() => 0))) return false;
  const row = link.locator('xpath=ancestor::*[@role="row"][1]');
  const rowText = (((await row.textContent().catch(() => '')) ?? '').trim()).toLowerCase();
  // If the row explicitly says failed or error, never treat as completed.
  if (rowText.includes('failed') || rowText.includes('error')) {
    logger.info(`isCompletedResult: skipping "${resultName}" because row text contains failed/error`);
    return false;
  }
  const isCompleted = rowText.includes('completed');
  logger.info(`isCompletedResult: "${resultName}" -> rowTextSummary="${rowText.slice(0,120)}" -> completed=${isCompleted}`);
  return isCompleted;
}

async function closeResultTab(page: Page, timeout: number): Promise<void> {
  const closeBtn = page.locator('#close-tab-0, [id^="close-tab-"]').first();
  if (await closeBtn.count().catch(() => 0)) {
    await closeBtn.click({ timeout }).catch(() => undefined);
  }
}

async function expandResultTree(page: Page, timeout: number): Promise<void> {
  const expandIcon = page.locator('.ag-icon.ag-icon-tree-closed').first();
  if (await expandIcon.count().catch(() => 0)) {
    await expandIcon.click({ timeout }).catch(() => undefined);
    await page.waitForTimeout(300);
  }
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

  // Wait until at least one matching result becomes Completed.
  const deadline = Date.now() + step.timeout;
  let completedNames: string[] = [];
  while (Date.now() < deadline) {
    const allNames = await listResultLinks(page, prefix);
    completedNames = [];
    for (const name of allNames) {
      if (await isCompletedResult(page, name)) completedNames.push(name);
    }
    logger.info(`extractAllResultTables: prefix="${prefix}" -> ${allNames.length} result(s), ${completedNames.length} completed.`);
    if (completedNames.length > 0) break;
    await page.waitForTimeout(1500);
  }
  if (completedNames.length === 0) {
    throw new Error(`extractAllResultTables: no Completed results found for prefix "${prefix}" within ${step.timeout}ms`);
  }

  const allRows: Record<string, string>[] = [];
  for (let i = 0; i < completedNames.length; i += 1) {
    const resultName = completedNames[i];
    logger.info(`extractAllResultTables: opening completed result ${i + 1}/${completedNames.length}: "${resultName}"`);

    await page.getByRole('link', { name: resultName, exact: true }).first().click({ timeout: step.timeout });

    const oldPrefix = (ctx as { resultPrefix?: string }).resultPrefix;
    (ctx as { resultPrefix?: string }).resultPrefix = `res${i + 1}_`;
    await sharedFn(page, ctx, step);
    (ctx as { resultPrefix?: string }).resultPrefix = oldPrefix;

    const rows = Array.isArray(ctx.lastActualRows) ? ctx.lastActualRows : [];
    for (const row of rows) {
      allRows.push({
        ...row,
        TableName: `${resultName} | ${row['TableName'] ?? ''}`,
      });
    }

    if (i < completedNames.length - 1) {
      await closeResultTab(page, step.timeout);
      await expandResultTree(page, step.timeout);
    }
  }

  if (allRows.length === 0) {
    throw new Error('extractAllResultTables: completed results opened, but no table rows were extracted.');
  }

  allRows.sort(
    (a, b) =>
      String(a['TableName'] ?? '').localeCompare(String(b['TableName'] ?? '')) ||
      String(a['RowLabel'] ?? '').localeCompare(String(b['RowLabel'] ?? '')) ||
      String(a['ColumnName'] ?? '').localeCompare(String(b['ColumnName'] ?? '')),
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
