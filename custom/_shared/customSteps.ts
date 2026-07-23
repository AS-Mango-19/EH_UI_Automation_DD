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

/** Merge every currently-RENDERED row of a grid into `byRow`, keyed by row-index. */
async function collectRenderedRows(grid: Locator, byRow: Map<string, Map<string, string>>): Promise<void> {
  const rowEls = grid.locator('[role="row"][row-index]');
  const rowCount = await rowEls.count().catch(() => 0);
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
      const text = squash((await cell.textContent().catch(() => '')) ?? '');
      if (text !== '' || !bucket.has(id)) bucket.set(id, text);
    }
  }
}

async function readAgGrids(page: Page): Promise<Record<string, string>[]> {
  const out: Record<string, string>[] = [];
  const allGrids = page.locator('div.ag-root');
  const total = await allGrids.count().catch(() => 0);

  // Keep only LEAF grids. AG Grid wraps a nested .ag-root for grouped / master-detail
  // views, so capturing every .ag-root recorded the same data twice — once flat and
  // once through the wrapper, whose blank first column produced `row_1`-style
  // placeholder keys. Only the innermost grid holds the real rows.
  const leaf: number[] = [];
  for (let g = 0; g < total; g++) {
    const nested = await allGrids.nth(g).locator('div.ag-root').count().catch(() => 0);
    if (nested === 0) leaf.push(g);
  }
  if (total !== leaf.length) {
    logger.info(`extractAllResultTables: ${total} grid container(s), ${leaf.length} leaf grid(s) — skipped ${total - leaf.length} wrapper(s).`);
  }

  const rawNames: string[] = [];
  for (let k = 0; k < leaf.length; k++) rawNames.push(await gridLabel(allGrids.nth(leaf[k]), k));
  const names = disambiguate(rawNames);

  for (let k = 0; k < leaf.length; k++) {
    const grid = allGrids.nth(leaf[k]);
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

    const tableName = names[k];
    const byRow = new Map<string, Map<string, string>>();

    // Defeat virtualization: AG Grid only keeps VISIBLE rows in the DOM, so a tall
    // grid silently truncates. Scroll the body viewport in steps and merge the rows
    // rendered at each position until we have every row the grid claims
    // (aria-rowcount - 1 header) or scrolling stops making progress.
    const claimed = Number((await grid.getAttribute('aria-rowcount').catch(() => null)) ?? '0');
    const target = claimed > 1 ? claimed - 1 : 0;
    const viewport = grid.locator('.ag-body-viewport').first();
    const canScroll = (await viewport.count().catch(() => 0)) > 0;
    let lastSeen = -1;
    for (let pass = 0; pass < 40; pass++) {
      await collectRenderedRows(grid, byRow);
      if (target > 0 && byRow.size >= target) break;
      if (pass > 0 && byRow.size === lastSeen) break; // no new rows appeared
      lastSeen = byRow.size;
      if (!canScroll) break;
      const moved = await viewport
        .evaluate((el) => {
          const before = el.scrollTop;
          el.scrollTop = before + Math.max(el.clientHeight * 0.8, 40);
          return el.scrollTop !== before;
        })
        .catch(() => false);
      if (!moved) break;
      await page.waitForTimeout(120);
    }
    if (canScroll) await viewport.evaluate((el) => { el.scrollTop = 0; }).catch(() => undefined);

    if (target > 0 && byRow.size < target) {
      logger.warn(
        `extractAllResultTables: "${tableName}" reports ${target} data row(s) but only ${byRow.size} could be rendered even after scrolling.`,
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
 * A container's text with interactive chrome removed. Buttons, links, tabs and
 * icons are controls, not results: without this a toolbar reads as the "content"
 * of its panel (e.g. "RenameDeleteHomeDetails") and lands in the baseline.
 */
async function panelText(node: Locator): Promise<string> {
  return node
    .evaluate((el) => {
      const clone = el.cloneNode(true) as HTMLElement;
      clone
        .querySelectorAll('button, a, svg, input, select, textarea, [role="button"], [role="tab"], [role="menuitem"]')
        .forEach((n) => n.remove());
      return clone.textContent ?? '';
    })
    .catch(() => '');
}

/**
 * Capture the non-tabular result INFORMATION — narrative panels such as "Summary",
 * which carry headline numbers ("a total of 571 pairs", "power of 88.02%") in prose
 * and are invisible to a table reader. A panel qualifies when it is visible, has a
 * heading, and owns no grid/table of its own (those are captured cell-by-cell).
 */
async function readInfoPanels(page: Page): Promise<Record<string, string>[]> {
  const MAX_TEXT = 4000;
  const headings = page.locator('h1,h2,h3,h4,h5,h6');
  const count = await headings.count().catch(() => 0);
  const titles: string[] = [];
  const bodies: string[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < count; i++) {
    const heading = headings.nth(i);

    // Skip anything not on screen. A single-page app keeps hidden dialogs mounted
    // (the "Sign Out" confirmation, collapsed panels); their prose is not a result.
    if (!(await heading.isVisible().catch(() => false))) continue;

    const title = squash((await heading.textContent().catch(() => '')) ?? '');
    if (!title) continue;

    // Walk out from the heading and take the FIRST (deepest, therefore tightest)
    // container that adds text beyond the title. Bail out as soon as a container
    // owns a grid/table — past that we are swallowing the whole page.
    let node = heading.locator('xpath=..');
    let body = '';
    for (let up = 0; up < 4; up++) {
      if ((await node.locator('div.ag-root, table').count().catch(() => 0)) > 0) break;
      const full = squash(await panelText(node));
      const candidate = squash(full.startsWith(title) ? full.slice(title.length) : full);
      if (candidate) {
        body = candidate;
        break;
      }
      node = node.locator('xpath=..');
    }

    if (!body || body.length > MAX_TEXT || seen.has(body)) continue;
    seen.add(body);
    titles.push(title);
    bodies.push(body);
  }

  const names = disambiguate(titles);
  const out = names.map((name, i) => ({
    TableName: name,
    RowLabel: 'Narrative',
    ColumnName: 'Text',
    Value: bodies[i],
  }));
  for (const row of out) {
    logger.info(`extractAllResultTables: info panel "${row['TableName']}" -> ${row['Value'].length} char(s)`);
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
  const rows = [
    ...(await readAgGrids(page)),
    ...(await readNativeTables(page)),
    ...(await readInfoPanels(page)),
  ];

  if (rows.length === 0) {
    throw new Error('extractAllResultTables: no tables found on the result page — check that the result detail view actually opened.');
  }

  // No Timestamp: it changes every run, so it can never be compared and only adds
  // noise to the captured CSV. RunID/ProjectID stay as non-compared provenance.
  for (const row of rows) {
    row['RunID'] = ctx.runId;
    row['ProjectID'] = ctx.createdProjectId ?? ctx.master.ProjectID ?? '';
  }

  rows.sort(
    (a, b) =>
      a['TableName'].localeCompare(b['TableName']) ||
      a['RowLabel'].localeCompare(b['RowLabel']) ||
      a['ColumnName'].localeCompare(b['ColumnName']),
  );

  const columns = ['TableName', 'RowLabel', 'ColumnName', 'Value', 'RunID', 'ProjectID'];
  ensureDir(ctx.feature.paths.actualResults);
  const prefix = (ctx as { resultPrefix?: string }).resultPrefix ?? '';
  const outputPath = path.join(ctx.feature.paths.actualResults, `${prefix}results_${ctx.tcId}_${ctx.iterationId}.csv`);
  writeCsv(outputPath, rows, columns);

  const tables = new Set(rows.map((r) => r['TableName']));
  logger.info(`extractAllResultTables: captured ${tables.size} table(s) / ${rows.length} cell(s) -> ${path.relative(process.cwd(), outputPath)}`);

  ctx.lastActualRows = rows;
  ctx.lastActualPath = outputPath;
  return outputPath;
};

export default extractAllResultTables;
