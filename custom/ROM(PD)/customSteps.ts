/**
 * Feature-local escape hatches for ROM(PD).
 */
import path from 'node:path';
import { DateTime } from 'luxon';
import type { Locator, Page } from 'playwright';
import type { KeywordHandler } from '../../core/keywords/types.js';
import { logger } from '../../core/utils/logger.js';
import { targetLocator } from '../../core/keywords/util.js';
import { writeCsv } from '../../core/csv/writer.js';
import { ensureDir } from '../../core/utils/paths.js';

function ordinal(day: number): string {
  const rem100 = day % 100;
  if (rem100 >= 11 && rem100 <= 13) return `${day}th`;
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}

function parseStartDate(raw: string): DateTime {
  const trimmed = raw.trim();
  const formats = ['M/d/yyyy', 'MM/dd/yyyy', 'yyyy-MM-dd', 'M/d/yy', 'MM/dd/yy'];
  for (const format of formats) {
    const parsed = DateTime.fromFormat(trimmed, format);
    if (parsed.isValid) return parsed;
  }
  const iso = DateTime.fromISO(trimmed);
  if (iso.isValid) return iso;
  throw new Error(`selectStartDate: unsupported Start Date value "${raw}"`);
}

function calendarLabelCandidates(date: DateTime): string[] {
  const weekday = date.toFormat('EEEE');
  const month = date.toFormat('MMMM');
  const day = ordinal(date.day);
  const year = date.toFormat('yyyy');

  return [
    `Choose ${weekday}, ${month} ${day},`,
    `Choose ${weekday}, ${month} ${day}, ${year}`,
    `${weekday}, ${month} ${day},`,
    `${weekday}, ${month} ${day}, ${year}`,
    `${weekday} ${month} ${day}`,
  ];
}

async function clickFirstAvailable(candidates: Array<() => Promise<void>>): Promise<void> {
  for (const candidate of candidates) {
    try {
      await candidate();
      return;
    } catch {
      // Try the next candidate.
    }
  }
  throw new Error('selectStartDate: calendar option not exposed for any known label variant');
}

export const selectStartDate: KeywordHandler = async (page, ctx, step) => {
  const resolved = ctx.resolve('${data.project.Start Date}', { stepId: step.stepId, column: 'InputValue' });
  const date = parseStartDate(resolved);
  const optionLabels = calendarLabelCandidates(date);
  const textbox = page.getByRole('textbox', { name: 'MM/dd/yyyy' });
  const selectButton = page.getByRole('button', { name: 'Select' });

  logger.info(`selectStartDate -> ${resolved} (${optionLabels[0]})`);

  await textbox.click({ timeout: step.timeout });
  await clickFirstAvailable([
    ...optionLabels.map((label) => () => page.getByRole('option', { name: label, exact: true }).click({ timeout: step.timeout })),
    ...optionLabels.map((label) => () => page.getByRole('button', { name: label, exact: true }).click({ timeout: step.timeout })),
    ...optionLabels.map((label) => () => page.getByRole('gridcell', { name: label, exact: true }).click({ timeout: step.timeout })),
    ...optionLabels.map((label) => () => page.getByText(label, { exact: true }).click({ timeout: step.timeout })),
  ]);
  await selectButton.click({ timeout: step.timeout });
};

export const uniqueProjectName: KeywordHandler = async (_page, ctx, step) => {
  const projectName = `AutoProj_ROM_${ctx.runId}`;
  const locator = await targetLocator(ctx, step);

  logger.info(`uniqueProjectName -> ${projectName}`);
  await locator.fill(projectName, { timeout: step.timeout });
};

function parseGroupedOptionLabel(input: string): { label: string; group?: string } {
  const trimmed = input.trim();
  const match = /^(.*)\s+\(([^()]+)\)$/.exec(trimmed);
  if (!match) {
    return { label: trimmed };
  }
  return { label: match[1].trim(), group: match[2].trim() };
}

function parseTestIndexPath(raw: string): { groupIndex: number; valueIndex: number } {
  const trimmed = raw.trim();
  const grouped = /^(\d+)\s*[-:,/]\s*(\d+)$/.exec(trimmed);

  if (grouped) {
    return {
      groupIndex: Number.parseInt(grouped[1], 10),
      valueIndex: Number.parseInt(grouped[2], 10),
    };
  }

  const valueIndex = Number.parseInt(trimmed, 10);
  return {
    groupIndex: 0,
    valueIndex,
  };
}

async function clickOptionByIndex(root: Locator, indexes: number[], timeout: number): Promise<boolean> {
  const options = root.getByRole('option');
  const optionCount = await options.count().catch(() => 0);

  for (const index of indexes) {
    if (index < 0 || index >= optionCount) {
      continue;
    }

    const option = options.nth(index);
    if (await option.count().catch(() => 0)) {
      await option.click({ timeout });
      return true;
    }
  }

  return false;
}

async function clickGroupedOptionByIndex(root: Locator, group: string, indexes: number[], timeout: number): Promise<boolean> {
  const groupHeading = root.locator('li').filter({ hasText: group }).first();
  if (!(await groupHeading.count().catch(() => 0))) {
    return false;
  }

  const groupItem = groupHeading.locator('xpath=ancestor::li[1]');
  const optionsAfterGroup = groupItem.locator('xpath=following-sibling::li').locator('a, button, [role="link"]');
  const optionCount = await optionsAfterGroup.count().catch(() => 0);

  for (const index of indexes) {
    if (index < 0 || index >= optionCount) {
      continue;
    }

    const option = optionsAfterGroup.nth(index);
    if (await option.count().catch(() => 0)) {
      await option.click({ timeout });
      return true;
    }
  }

  return false;
}

export const selectTestOption: KeywordHandler = async (page, ctx, step) => {
  const resolved = ctx.resolve('${data.inputset.SelectTest}', { stepId: step.stepId, column: 'InputValue' });
  const testIndexRaw = ctx.resolve('${data.inputset.TestIndex}', { stepId: step.stepId, column: 'InputValue' });
  const opener = await targetLocator(ctx, step, 'ddl_SelectTest');
  const { groupIndex, valueIndex } = parseTestIndexPath(testIndexRaw);

  if (Number.isNaN(groupIndex) || Number.isNaN(valueIndex)) {
    throw new Error(`selectTestOption: invalid TestIndex "${testIndexRaw}"`);
  }

  logger.info(`selectTestOption -> ${resolved} [TestIndex=${groupIndex}-${valueIndex}]`);

  await opener.click({ timeout: step.timeout });
  const optionId = `react-select-2-option-${groupIndex}-${valueIndex}`;
  const combobox = page.locator('input[aria-autocomplete="list"], input[role="combobox"]').last();

  if (await combobox.count().catch(() => 0)) {
    await combobox.click({ timeout: step.timeout, force: true });
    for (let attempt = 0; attempt < 6; attempt += 1) {
      const activeDescendant = await combobox.getAttribute('aria-activedescendant').catch(() => null);
      if (activeDescendant === optionId) {
        await combobox.press('Enter', { timeout: step.timeout });
        return;
      }
      await combobox.press('ArrowDown', { timeout: step.timeout });
    }
  }

  const option = page.locator(`#${optionId}`).first();
  if (await option.count().catch(() => 0)) {
    await option.click({ timeout: step.timeout, force: true });
    return;
  }

  const codegenOption = page.locator('#testId-14').first();
  if (await codegenOption.count().catch(() => 0)) {
    await codegenOption.click({ timeout: step.timeout });
    return;
  }

  throw new Error(`selectTestOption: unable to resolve dropdown index ${groupIndex}-${valueIndex} for "${resolved}"`);
};

/* ------------------------------------------------------------------ *
 * Result-page capture: every table, whatever the feature renders.
 * ------------------------------------------------------------------ */

const squash = (s: string): string => s.replace(/\s+/g, ' ').trim();

/**
 * Why this exists instead of `extractTable`:
 *
 * 1. extractTable captures ONE grid. ctx.lastActualRows is a single field that
 *    each call overwrites and outputFileName has no per-table dimension, so N
 *    extract steps baseline only the LAST table. The result page renders a
 *    DIFFERENT NUMBER of tables per feature, so a fixed set of steps cannot work.
 * 2. Pointing extractTable at a wrapper is worse than useless: readGrid unions
 *    every [role=row] beneath it and binds later tables' cells to the FIRST
 *    table's headers POSITIONALLY — silent garbage, never an error.
 * 3. Positional binding also breaks on pinned columns: AG Grid emits one
 *    [role=row] per pinned container per record. Here we key cells by col-id and
 *    rows by row-index, so pinned/split rows re-join correctly.
 *
 * Output is TIDY — one cell per row — so any table shape reduces to a stable
 * 4-column schema that compare.config.csv can describe once:
 *     TableName | RowLabel | ColumnName | Value
 */
async function readAgGrids(page: Page): Promise<Record<string, string>[]> {
  const out: Record<string, string>[] = [];
  const grids = page.locator('div.ag-root');
  const gridCount = await grids.count().catch(() => 0);

  // Pass 1: name every grid, then make the names unique before any is used as a key.
  const rawNames: string[] = [];
  for (let g = 0; g < gridCount; g++) rawNames.push(await gridLabel(grids.nth(g), g));
  const names = disambiguate(rawNames);

  for (let g = 0; g < gridCount; g++) {
    const grid = grids.nth(g);

    // Column identity: col-id -> header text. Header cells carry col-id too,
    // which is exactly why bare [col-id] selectors hit the header first.
    const headerCells = grid.locator('.ag-header-cell[col-id]');
    const headerCount = await headerCells.count().catch(() => 0);
    const colOrder: string[] = [];
    const colLabel = new Map<string, string>();
    for (let i = 0; i < headerCount; i++) {
      const cell = headerCells.nth(i);
      const id = (await cell.getAttribute('col-id').catch(() => null)) ?? `col_${i}`;
      if (colLabel.has(id)) continue;
      colLabel.set(id, squash((await cell.textContent().catch(() => '')) ?? '') || id);
      colOrder.push(id);
    }
    if (colOrder.length === 0) continue; // not a real grid

    const tableName = names[g];

    // Re-join rows across pinned containers by row-index.
    const rowEls = grid.locator('[role="row"][row-index]');
    const rowCount = await rowEls.count().catch(() => 0);
    const byRow = new Map<string, Map<string, string>>();
    for (let r = 0; r < rowCount; r++) {
      const row = rowEls.nth(r);
      const idx = (await row.getAttribute('row-index').catch(() => null)) ?? String(r);
      const cells = row.locator('[role="gridcell"][col-id]');
      const cellCount = await cells.count().catch(() => 0);
      let bucket = byRow.get(idx);
      if (!bucket) {
        bucket = new Map<string, string>();
        byRow.set(idx, bucket);
      }
      for (let c = 0; c < cellCount; c++) {
        const cell = cells.nth(c);
        const id = await cell.getAttribute('col-id').catch(() => null);
        if (!id) continue;
        bucket.set(id, squash((await cell.textContent().catch(() => '')) ?? ''));
      }
    }

    // Virtualization guard: AG Grid renders only visible rows. A silently short
    // benchmark is worse than a loud failure, so shout if the DOM has fewer rows
    // than the grid claims.
    const claimed = Number((await grid.getAttribute('aria-rowcount').catch(() => null)) ?? '0');
    if (claimed > 0 && claimed - 1 > byRow.size) {
      logger.warn(
        `extractAllResultTables: "${tableName}" reports ${claimed - 1} data row(s) but only ${byRow.size} are rendered — AG Grid virtualization is truncating the capture.`,
      );
    }

    const ordered = [...byRow.entries()].sort((a, b) => Number(a[0]) - Number(b[0]));
    for (const [idx, cells] of ordered) {
      const rowLabel = cells.get(colOrder[0]) || `row_${idx}`;
      for (const id of colOrder) {
        out.push({
          TableName: tableName,
          RowLabel: rowLabel,
          ColumnName: colLabel.get(id) ?? id,
          Value: cells.get(id) ?? '',
        });
      }
    }
    logger.info(`extractAllResultTables: AG grid "${tableName}" -> ${colOrder.length} column(s) x ${byRow.size} row(s)`);
  }
  return out;
}

async function readNativeTables(page: Page): Promise<Record<string, string>[]> {
  const out: Record<string, string>[] = [];
  const tables = page.locator('table');
  const count = await tables.count().catch(() => 0);

  const rawNames: string[] = [];
  for (let t = 0; t < count; t++) rawNames.push(await gridLabel(tables.nth(t), t, 'Table'));
  const names = disambiguate(rawNames);

  for (let t = 0; t < count; t++) {
    const table = tables.nth(t);
    let headers = (await table.locator('thead th').allTextContents().catch(() => [])).map(squash);
    if (headers.length === 0) {
      headers = (await table.locator('tr').first().locator('th,td').allTextContents().catch(() => [])).map(squash);
    }
    if (headers.length === 0) continue;

    const tableName = names[t];
    const bodyRows = table.locator('tbody tr');
    const rowCount = await bodyRows.count().catch(() => 0);
    for (let r = 0; r < rowCount; r++) {
      const cells = (await bodyRows.nth(r).locator('td,th').allTextContents().catch(() => [])).map(squash);
      if (!cells.some((c) => c !== '')) continue;
      const rowLabel = cells[0] || `row_${r}`;
      headers.forEach((h, i) => {
        out.push({ TableName: tableName, RowLabel: rowLabel, ColumnName: h || `col_${i}`, Value: cells[i] ?? '' });
      });
    }
    logger.info(`extractAllResultTables: native table "${tableName}" -> ${headers.length} column(s) x ${rowCount} row(s)`);
  }
  return out;
}

/**
 * The result opens as a TAB inside /landingpage/results — the app is a tabbed SPA
 * and the URL never changes, so there is no navigation to await. Clicking the
 * result also tears down and re-renders the grid, so an immediate read sees zero
 * tables. Poll until the table count is non-zero AND has stopped changing.
 */
async function waitForTablesToSettle(page: Page, timeout: number): Promise<void> {
  const deadline = Date.now() + Math.max(timeout, 10_000);
  let last = -1;
  let stableFor = 0;
  while (Date.now() < deadline) {
    const count = await page.locator('div.ag-root, table').count().catch(() => 0);
    if (count > 0 && count === last) {
      stableFor++;
      if (stableFor >= 3) {
        logger.info(`extractAllResultTables: ${count} table container(s) settled.`);
        return;
      }
    } else {
      stableFor = 0;
      last = count;
    }
    await page.waitForTimeout(400);
  }
  logger.warn(`extractAllResultTables: table count never settled within ${timeout}ms (last saw ${last}) — capturing anyway.`);
}

/**
 * Name a table by its own nearest preceding heading, else aria-label, else an index.
 * `preceding::` on a reverse axis gives the CLOSEST heading above the grid in
 * document order — walking to an ancestor first would grab the section heading
 * and hand every grid in that section the same name.
 */
async function gridLabel(el: Locator, index: number, prefix = 'Grid'): Promise<string> {
  const aria = await el.getAttribute('aria-label').catch(() => null);
  if (aria && aria.trim()) return squash(aria);
  const heading = el.locator(
    'xpath=preceding::*[self::h1 or self::h2 or self::h3 or self::h4 or self::h5 or self::h6][1]',
  );
  const text = await heading.first().textContent().catch(() => null);
  if (text && text.trim()) return squash(text);
  return `${prefix}_${index + 1}`;
}

/**
 * TableName is a KEY column, so duplicates are not cosmetic: two grids sharing a
 * name collide on (TableName, RowLabel, ColumnName) and the comparator silently
 * matches the wrong rows. Sections here really do hold several grids under one
 * heading, so suffix repeats with their DOM-order occurrence. Unique names are
 * left untouched to keep the baseline readable.
 */
function disambiguate(names: string[]): string[] {
  const total = new Map<string, number>();
  for (const n of names) total.set(n, (total.get(n) ?? 0) + 1);
  const seen = new Map<string, number>();
  return names.map((n) => {
    if ((total.get(n) ?? 0) < 2) return n;
    const i = (seen.get(n) ?? 0) + 1;
    seen.set(n, i);
    return `${n} #${i}`;
  });
}

/**
 * Capture EVERY table on the result page into one tidy row-set and hand it to
 * compareWithBaseline. Table count is discovered, never assumed.
 */
export const extractAllResultTables: KeywordHandler = async (page, ctx, step) => {
  await waitForTablesToSettle(page, step.timeout);
  const rows = [...(await readAgGrids(page)), ...(await readNativeTables(page))];

  if (rows.length === 0) {
    throw new Error(
      'extractAllResultTables: no tables found on the result page — check that step 470 actually opened the result detail view.',
    );
  }

  // Provenance, mirroring tableExtractor: these are Compare=FALSE in compare.config.
  for (const row of rows) {
    row['RunID'] = ctx.runId;
    row['Timestamp'] = ctx.timestamp;
    row['ProjectID'] = ctx.createdProjectId ?? ctx.master.ProjectID ?? '';
  }

  // Deterministic order — the same design run twice must yield identical CSVs.
  rows.sort(
    (a, b) =>
      a['TableName'].localeCompare(b['TableName']) ||
      a['RowLabel'].localeCompare(b['RowLabel']) ||
      a['ColumnName'].localeCompare(b['ColumnName']),
  );

  const columns = ['TableName', 'RowLabel', 'ColumnName', 'Value', 'RunID', 'Timestamp', 'ProjectID'];
  ensureDir(ctx.feature.paths.actualResults);
  const outputPath = path.join(ctx.feature.paths.actualResults, `results_${ctx.tcId}_${ctx.iterationId}.csv`);
  writeCsv(outputPath, rows, columns);

  const tables = new Set(rows.map((r) => r['TableName']));
  logger.info(
    `extractAllResultTables: captured ${tables.size} table(s) / ${rows.length} cell(s) -> ${path.relative(process.cwd(), outputPath)}`,
  );

  ctx.lastActualRows = rows;
  ctx.lastActualPath = outputPath;
  return outputPath;
};

export default selectStartDate;