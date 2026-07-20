/**
 * SHARED custom steps — available to EVERY feature via callCustom fallback.
 *
 * callCustom resolves custom/<Feature>/customSteps.ts first; when that file does
 * not export the requested handler, it falls back here (see core/keywords/flow.ts).
 * So an imported feature gets these generic handlers for free — no per-feature
 * copy needed — while a feature can still override any of them in its own file.
 *
 * Everything here MUST be feature-agnostic (§14 in spirit): no app-specific
 * selectors, column names, or values baked in. Anything ROM(PD)-specific stays in
 * custom/ROM(PD)/customSteps.ts.
 */
import path from 'node:path';
import { DateTime } from 'luxon';
import type { Locator, Page } from 'playwright';
import type { KeywordHandler } from '../../core/keywords/types.js';
import { logger } from '../../core/utils/logger.js';
import { writeCsv } from '../../core/csv/writer.js';
import { ensureDir } from '../../core/utils/paths.js';

const squash = (s: string): string => s.replace(/\s+/g, ' ').trim();

// ---------------------------------------------------------------------------
// Date picker — selectStartDate
// ---------------------------------------------------------------------------

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

function parseDate(raw: string): DateTime {
  const trimmed = raw.trim();
  for (const format of ['M/d/yyyy', 'MM/dd/yyyy', 'yyyy-MM-dd', 'M/d/yy', 'MM/dd/yy']) {
    const parsed = DateTime.fromFormat(trimmed, format);
    if (parsed.isValid) return parsed;
  }
  const iso = DateTime.fromISO(trimmed);
  if (iso.isValid) return iso;
  throw new Error(`selectStartDate: unsupported date value "${raw}" (use M/d/yyyy or yyyy-MM-dd)`);
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

/**
 * Resolve the date value from the first data column named like a date. Kept
 * app-agnostic by SEARCHING rather than hardcoding `data.project.Start Date`:
 * a feature just needs a "Start Date" (or "Date"/"StartDate") column somewhere in
 * its testdata. Override in a feature's own customSteps.ts if the source differs.
 */
function resolveDateValue(ctx: Parameters<KeywordHandler>[1], stepId: number | string): string {
  const files = ['project', 'design', 'inputset'];
  const columns = ['Start Date', 'StartDate', 'Date'];
  for (const file of files) {
    for (const col of columns) {
      try {
        const v = ctx.resolve(`\${data.${file}.${col}}`, { stepId, column: 'InputValue' });
        if (v && v.trim() && !v.includes('${')) return v;
      } catch {
        // column absent in this file — keep searching
      }
    }
  }
  throw new Error('selectStartDate: no date column found (add a "Start Date" column to testdata)');
}

/**
 * Pick a date in a calendar-style date picker (the field cannot be typed).
 * Opens the MM/dd/yyyy field, clicks the matching day cell, confirms with Select.
 */
export const selectStartDate: KeywordHandler = async (page, ctx, step) => {
  const raw = resolveDateValue(ctx, step.stepId);
  const date = parseDate(raw);
  const optionLabels = calendarLabelCandidates(date);
  logger.info(`selectStartDate -> ${raw} (${optionLabels[0]})`);

  await page.getByRole('textbox', { name: 'MM/dd/yyyy' }).click({ timeout: step.timeout });
  await clickFirstAvailable([
    ...optionLabels.map((label) => () => page.getByRole('option', { name: label, exact: true }).click({ timeout: step.timeout })),
    ...optionLabels.map((label) => () => page.getByRole('button', { name: label, exact: true }).click({ timeout: step.timeout })),
    ...optionLabels.map((label) => () => page.getByRole('gridcell', { name: label, exact: true }).click({ timeout: step.timeout })),
    ...optionLabels.map((label) => () => page.getByText(label, { exact: true }).click({ timeout: step.timeout })),
  ]);
  // The day-cell click already sets the date. Some calendars ALSO show a "Select"
  // confirm — but click one ONLY inside the date-picker popup. A page-level
  // getByRole('button', { name: 'Select' }) collides with custom-select triggers
  // (Study Objective and friends read "Select" too, class "btn-custom-select"),
  // and clicking one of THOSE opens the wrong dropdown and leaves it toggled open
  // for the next step to mis-handle. Scoped to a datepicker/dialog container, this
  // finds nothing when the calendar already closed on the day click — which is the
  // common case — and is a no-op, exactly as intended.
  const calendarConfirm = page
    .locator('[class*="datepicker"], [class*="react-datepicker"], [class*="calendar"], [role="dialog"]')
    .getByRole('button', { name: 'Select', exact: true })
    .first();
  if (await calendarConfirm.count().catch(() => 0)) {
    await calendarConfirm.click({ timeout: step.timeout }).catch(() => undefined);
  }
};

// ---------------------------------------------------------------------------
// Result capture — extractAllResultTables (feature-agnostic)
// ---------------------------------------------------------------------------

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

async function readAgGrids(page: Page): Promise<Record<string, string>[]> {
  const out: Record<string, string>[] = [];
  const grids = page.locator('div.ag-root');
  const gridCount = await grids.count().catch(() => 0);

  const rawNames: string[] = [];
  for (let g = 0; g < gridCount; g++) rawNames.push(await gridLabel(grids.nth(g), g));
  const names = disambiguate(rawNames);

  for (let g = 0; g < gridCount; g++) {
    const grid = grids.nth(g);
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
    if (colOrder.length === 0) continue;

    const tableName = names[g];
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

    const claimed = Number((await grid.getAttribute('aria-rowcount').catch(() => null)) ?? '0');
    if (claimed > 0 && claimed - 1 > byRow.size) {
      logger.warn(
        `extractAllResultTables: "${tableName}" reports ${claimed - 1} data row(s) but only ${byRow.size} rendered — AG Grid virtualization truncating.`,
      );
    }

    const ordered = [...byRow.entries()].sort((a, b) => Number(a[0]) - Number(b[0]));
    for (const [idx, cells] of ordered) {
      const rowLabel = cells.get(colOrder[0]) || `row_${idx}`;
      for (const id of colOrder) {
        out.push({ TableName: tableName, RowLabel: rowLabel, ColumnName: colLabel.get(id) ?? id, Value: cells.get(id) ?? '' });
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
 * The result opens as a TAB inside a tabbed SPA — the URL never changes and the
 * click tears down/re-renders the grid, so an immediate read sees zero tables.
 * Poll until the table count is non-zero AND has stopped changing.
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
 * Capture EVERY table on the result page into one tidy row-set and hand it to
 * compareWithBaseline. Table count is discovered, never assumed. Feature-agnostic.
 */
export const extractAllResultTables: KeywordHandler = async (page, ctx, step) => {
  await waitForTablesToSettle(page, step.timeout);
  const rows = [...(await readAgGrids(page)), ...(await readNativeTables(page))];

  if (rows.length === 0) {
    throw new Error('extractAllResultTables: no tables found on the result page — check that the result detail view actually opened.');
  }

  for (const row of rows) {
    row['RunID'] = ctx.runId;
    row['Timestamp'] = ctx.timestamp;
    row['ProjectID'] = ctx.createdProjectId ?? ctx.master.ProjectID ?? '';
  }

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
  logger.info(`extractAllResultTables: captured ${tables.size} table(s) / ${rows.length} cell(s) -> ${path.relative(process.cwd(), outputPath)}`);

  ctx.lastActualRows = rows;
  ctx.lastActualPath = outputPath;
  return outputPath;
};

export default extractAllResultTables;
