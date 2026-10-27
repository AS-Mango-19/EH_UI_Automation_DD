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
import { targetLocator } from '../../core/keywords/util.js';
import { parseMetadataFile } from '../../core/runner/metadataFile.js';
import { runSteps } from '../../core/runner/stepRunner.js';
import { abs } from '../../core/utils/paths.js';
import { resolveLocator } from '../../core/locators/resolver.js';

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
 * The picker opens on the CURRENT month, so a target in another month (e.g. LAST
 * month) is simply not rendered and the day-cell search fails. This pages the
 * react-datepicker Prev/Next until the visible month matches the target. Safe for
 * non-react-datepicker widgets: if the ".react-datepicker__current-month" header
 * isn't readable it returns immediately and the day-click runs as before.
 */
async function navigateCalendarToMonth(page: Page, target: DateTime, timeout: number): Promise<void> {
  const goal = target.startOf('month');
  const header = page.locator('.react-datepicker__current-month').first();
  const prev = page.locator('button[aria-label="Previous Month"], .react-datepicker__navigation--previous').first();
  const next = page.locator('button[aria-label="Next Month"], .react-datepicker__navigation--next').first();
  for (let i = 0; i < 60; i++) {
    const shownTxt = squash((await header.textContent().catch(() => '')) ?? '');
    const shown = DateTime.fromFormat(shownTxt, 'MMMM yyyy');
    if (!shown.isValid) return; // not a react-datepicker header — let the day-click try as-is
    if (shown.hasSame(goal, 'month') && shown.hasSame(goal, 'year')) return;
    const btn = shown.toMillis() > goal.toMillis() ? prev : next;
    if (!(await btn.count().catch(() => 0))) return; // no nav control — bail to the day-click
    await btn.click({ timeout }).catch(() => undefined);
    await page.waitForTimeout(120);
  }
}

/**
 * Pick a date in a calendar-style date picker (the field cannot be typed).
 * Opens the MM/dd/yyyy field, pages to the target month, clicks the matching day
 * cell, confirms with Select.
 */
export const selectStartDate: KeywordHandler = async (page, ctx, step) => {
  const raw = resolveDateValue(ctx, step.stepId);
  const date = parseDate(raw);
  const optionLabels = calendarLabelCandidates(date);
  logger.info(`selectStartDate -> ${raw} (${optionLabels[0]})`);

  await page.getByRole('textbox', { name: 'MM/dd/yyyy' }).click({ timeout: step.timeout });
  await navigateCalendarToMonth(page, date, step.timeout);
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

// ---------------------------------------------------------------------------
// Generic period-table Add-count reconciler — reconcilePeriodTable
// ---------------------------------------------------------------------------

const isNaCell = (v: string | undefined): boolean => {
  const t = (v ?? '').trim();
  return t === '' || /^(n\/a|not applicable)$/i.test(t);
};

/**
 * Make a multi-period table's LIVE editable row count match the count the testdata
 * declares for the CURRENT iteration, by clicking its "Add" button — so a feature no
 * longer needs one gated Add-click PER period; the count is data-driven, for any N.
 *
 * Config comes from the step's ExpectedValue column, pipe-delimited:
 *   <testDataFile>|<prefix>|<countField>|<addButtonLabel>[|<excludeDisabled>]
 *     design|boundary|analysisSpacingInfo|Add Interim|true
 *     simulation|enrollmentTable|avgSubjectsEnrolled|Add Period
 *
 * TARGET = distinct "<prefix>.<n>.<countField>" folded columns holding a non-N/A value
 * on the current (TC_ID, IterationID) row. LIVE = inputs whose id OR name is
 * "<prefix>.<n>.<countField>" (excludeDisabled=true drops the app-computed disabled
 * Final row, matching the East-Horizon GSD boundary table). Clicks the Add button
 * (located RELATIVE to the table's own inputs, so it is unambiguous on a busy page)
 * until LIVE == TARGET, verifying each add. Can only ADD, never delete — warns if the
 * app already renders more rows than declared. The ordinary metadata `fill` steps then
 * populate each row (a blank/N/A cell auto-skips).
 *
 * Centralizes the reconcile logic that was copied per-feature (DOM/GADAR/GADSD) and ORs
 * id AND name so it also works on tables whose cells carry only `name=` (unlike GADSD's
 * id-only copy, which silently under-counts a name= boundary row).
 */
export const reconcilePeriodTable: KeywordHandler = async (page, ctx, step) => {
  const cfg = (step.expected || '').split('|').map((s) => s.trim());
  const [file, prefix, countField, addLabel, excludeFlag] = cfg;
  if (!file || !prefix || !countField || !addLabel) {
    throw new Error(
      `reconcilePeriodTable: ExpectedValue must be "<file>|<prefix>|<countField>|<addLabel>[|excludeDisabled]" — got "${step.expected}"`,
    );
  }
  const excludeDisabled = /^(true|1|yes)$/i.test(excludeFlag ?? '');
  const timeout = step.timeout;

  // TARGET — distinct <prefix>.<n>.<countField> folded columns with a non-N/A value.
  const parsed = ctx.feature.testDataParsed.get(file);
  const row = parsed?.records.find(
    (r) => r.data['TC_ID'] === ctx.tcId && r.data['IterationID'] === ctx.iterationId,
  )?.data;
  const re = new RegExp(`^${prefix}\\.(\\d+)\\.${countField}$`);
  const periods = new Set<string>();
  if (parsed && row) {
    for (const h of parsed.headers) {
      const m = re.exec(h);
      if (m && !isNaCell(row[h])) periods.add(m[1]!);
    }
  }
  const target = periods.size;

  // LIVE — inputs addressed by id OR name (codegen emits either).
  const sel = `[id^="${prefix}."][id$=".${countField}"], [name^="${prefix}."][name$=".${countField}"]`;
  const liveCount = async (): Promise<number> =>
    page
      .locator(sel)
      .evaluateAll((els, exclude) => els.filter((e) => !(exclude && (e as HTMLInputElement).disabled)).length, excludeDisabled)
      .catch(() => 0);

  let current = await liveCount();
  logger.info(`reconcilePeriodTable[${prefix}]: live ${current} row(s), testdata wants ${target}`);
  if (target <= current) {
    if (target < current) {
      logger.warn(
        `reconcilePeriodTable[${prefix}]: testdata wants FEWER rows (${target}) than present (${current}) — row deletion not implemented; extra rows left at their computed default.`,
      );
    }
    return;
  }
  let guard = 0;
  while (current < target && guard++ < target + 5) {
    const anchor = page.locator(`[id^="${prefix}."], [name^="${prefix}."]`).last();
    const addBtn = anchor
      .locator(`xpath=following::button[contains(normalize-space(), ${JSON.stringify(addLabel)})][1]`)
      .first();
    if (!(await addBtn.count().catch(() => 0))) {
      throw new Error(
        `reconcilePeriodTable[${prefix}]: no "${addLabel}" button found after the table (current=${current}, target=${target})`,
      );
    }
    await addBtn.click({ timeout }).catch(async () => {
      await addBtn.click({ timeout, force: true }).catch(() => undefined);
    });
    await page.waitForTimeout(400);
    const next = await liveCount();
    if (next <= current) {
      throw new Error(
        `reconcilePeriodTable[${prefix}]: "${addLabel}" click did not add a row (still ${next}, target ${target}) — check the button label/locator`,
      );
    }
    current = next;
  }
  if (current !== target) {
    throw new Error(`reconcilePeriodTable[${prefix}]: ended with ${current} row(s), expected ${target}`);
  }
  logger.info(`reconcilePeriodTable[${prefix}]: now ${current} row(s)`);
};

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

/**
 * loopChildRows — like core's loopPeriods, but for a child testdata CSV that has NO
 * PeriodIndex column (so featureLoader.foldChildTables never merges it into the parent's
 * wide model, and loopPeriods' fold-based reconstruction can't see it — e.g. a per-stratum
 * weights table keyed only by StratumIndex, with no time dimension at all). Reads the
 * child file DIRECTLY from ctx.feature.testDataParsed (it stays a separate, unfolded
 * table in that map), filters to the current (TC_ID, IterationID), and runs the reusable
 * flow CSV in InputValue once per matching row, exposing that row's fields as
 * ${runtime.period.<field>} — the SAME var namespace core's loopPeriods uses, so an
 * existing per-field flow file/selector convention works unchanged either way.
 *
 * Config comes from ExpectedValue (InputValue is already consumed by callCustom as the
 * function-name dispatch key, matching reconcilePeriodTable's established convention):
 *   ExpectedValue = "<childTestdataFile>|<flowFilePath>"
 *     simulation_weights|flows/stratgadar_weights_period.csv
 */
export const loopChildRows: KeywordHandler = async (_page, ctx, step) => {
  const [childFile, flowFile] = (step.expected || '').split('|').map((s) => s.trim());
  if (!childFile || !flowFile) {
    throw new Error(`loopChildRows: ExpectedValue must be "<childTestdataFile>|<flowFilePath>" — got "${step.expected}"`);
  }
  const parsed = ctx.feature.testDataParsed.get(childFile);
  if (!parsed) {
    throw new Error(`loopChildRows: unknown testdata file "${childFile}"`);
  }
  const hasTc = parsed.headers.includes('TC_ID');
  const hasIter = parsed.headers.includes('IterationID');
  const rows = parsed.records
    .map((r) => r.data)
    .filter((d) => (!hasTc || d['TC_ID'] === ctx.tcId) && (!hasIter || d['IterationID'] === ctx.iterationId));
  const steps = parseMetadataFile(abs(flowFile));
  logger.info(`loopChildRows[${childFile}]: ${rows.length} row(s) -> ${flowFile}`);
  for (let n = 0; n < rows.length; n++) {
    ctx.setVar('period.n', String(n));
    ctx.setVar('period.index', String(n));
    for (const [field, val] of Object.entries(rows[n]!)) ctx.setVar(`period.${field}`, val);
    await runSteps(ctx, steps, { source: `${flowFile}[row ${n}]` });
  }
};

/**
 * dumpGridDiagnostic — ONE-OFF debugging aid: logs every [row-index]/[col-id]
 * element found inside a given container, so a live DOM structure question can be
 * answered from the test log instead of a static screenshot. ExpectedValue is
 * "<containerCssSelector>[|<col-id filter>]" (matches reconcilePeriodTable's
 * pipe-delimited-config-via-ExpectedValue convention, since InputValue is already
 * consumed by callCustom as the function-name dispatch key).
 */
export const dumpGridDiagnostic: KeywordHandler = async (page, ctx, step) => {
  const [containerSel, colIdFilter = ''] = (step.expected || '').split('|').map((s) => s.trim());
  if (!containerSel) {
    throw new Error(`dumpGridDiagnostic: ExpectedValue must be "<containerCssSelector>[|<col-id filter>]" — got "${step.expected}"`);
  }

  const snapshot = async () =>
    page.evaluate(
      ({ containerSel, colIdFilter }) => {
        const container = document.querySelector(containerSel);
        if (!container) return { found: false, containerHtmlLen: 0, ariaRowCount: null as number | null, rows: [] as unknown[] };
        // Walk every [col-id] cell and find its NEAREST ANCESTOR [row-index] (col-id often
        // lives on a nested cell div, not the row-index element itself - a compound selector
        // [row-index][col-id] silently matches nothing in that layout). This reports one entry
        // PER (row, column) pair instead of one garbled concatenated-text blob per row.
        const colCells = Array.from(container.querySelectorAll('[col-id]'));
        const rows = colCells
          .filter((el) => !colIdFilter || el.getAttribute('col-id') === colIdFilter)
          .map((el) => {
            const rowEl = el.closest('[row-index]');
            return {
              rowIndex: rowEl ? rowEl.getAttribute('row-index') : null,
              rowId: rowEl ? rowEl.getAttribute('row-id') : null,
              colId: el.getAttribute('col-id'),
              text: (el.textContent || '').trim().slice(0, 40),
              visible: (el as HTMLElement).offsetParent !== null,
              rect: (() => {
                const r = (el as HTMLElement).getBoundingClientRect();
                return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
              })(),
            };
          });
        // AG-Grid roots are `role="grid"` OR `role="treegrid"` (row-grouped grids like the
        // Treatment/Factor tree use treegrid) - only checking "grid" silently missed the count
        // on a treegrid, making ariaRowCount always null and short-circuiting the scroll loop
        // below before it ever scrolled past the first render.
        const gridRoot = container.querySelector('[role="grid"], [role="treegrid"]');
        const ariaRowCount = Number(gridRoot?.getAttribute('aria-rowcount') ?? container.getAttribute('aria-rowcount') ?? '0') || null;
        return { found: true, containerHtmlLen: container.innerHTML.length, ariaRowCount, gridRole: gridRoot?.getAttribute('role') ?? null, rows };
      },
      { containerSel, colIdFilter },
    );

  // Defeat AG-Grid row virtualization (same technique as extractAllResultTables): scroll
  // the container's .ag-body-viewport in steps, merging every row-index seen at each
  // position, until no new rows appear or the aria-rowcount target is reached.
  const matchCount = await page.evaluate((containerSel) => document.querySelectorAll(containerSel).length, containerSel).catch(() => -1);
  if (matchCount > 1) {
    logger.info(`dumpGridDiagnostic[${containerSel}]: WARNING - ${matchCount} elements match this selector (duplicate id?); querySelector only inspects the FIRST one.`);
  }
  const merged = new Map<string, { rowIndex: string; rowId: string | null; colId: string | null; text: string; visible: boolean; rect: unknown }>();
  let ariaRowCount: number | null = null;
  let lastSize = -1;
  const viewportInfo = await page
    .evaluate((containerSel) => {
      const container = document.querySelector(containerSel);
      const viewport = container?.querySelector('.ag-body-viewport') as HTMLElement | null;
      if (!viewport) return { found: false };
      return { found: true, scrollHeight: viewport.scrollHeight, clientHeight: viewport.clientHeight, scrollTop: viewport.scrollTop };
    }, containerSel)
    .catch(() => ({ found: false }));
  logger.info(`dumpGridDiagnostic[${containerSel}]: .ag-body-viewport ${JSON.stringify(viewportInfo)}`);
  for (let pass = 0; pass < 40; pass++) {
    const snap = await snapshot();
    if (!snap.found) {
      logger.info(`dumpGridDiagnostic[${containerSel}]: found=false (container not in DOM)`);
      return snap;
    }
    ariaRowCount = snap.ariaRowCount;
    if (pass === 0) logger.info(`dumpGridDiagnostic[${containerSel}]: gridRole=${(snap as { gridRole?: string | null }).gridRole ?? null} ariaRowCount=${ariaRowCount}`);
    for (const r of snap.rows as Array<{ rowIndex: string; rowId: string | null; colId: string | null; text: string; visible: boolean; rect: unknown }>) {
      const key = `${r.rowIndex}|${r.colId ?? ''}`;
      if (!merged.has(key) || r.text) merged.set(key, r);
    }
    const target = ariaRowCount && ariaRowCount > 1 ? ariaRowCount - 1 : 0;
    if (target > 0 && new Set([...merged.values()].map((r) => r.rowIndex)).size >= target) break;
    if (pass > 0 && merged.size === lastSize) break;
    lastSize = merged.size;
    const moved = await page
      .evaluate((containerSel) => {
        const container = document.querySelector(containerSel);
        const viewport = container?.querySelector('.ag-body-viewport') as HTMLElement | null;
        if (!viewport) return false;
        const before = viewport.scrollTop;
        viewport.scrollTop = before + Math.max(viewport.clientHeight * 0.8, 40);
        return viewport.scrollTop !== before;
      }, containerSel)
      .catch(() => false);
    if (!moved) break;
    await page.waitForTimeout(120);
  }
  await page
    .evaluate((containerSel) => {
      const container = document.querySelector(containerSel);
      const viewport = container?.querySelector('.ag-body-viewport') as HTMLElement | null;
      if (viewport) viewport.scrollTop = 0;
    }, containerSel)
    .catch(() => undefined);

  const rows = [...merged.values()].sort((a, b) => Number(a.rowIndex) - Number(b.rowIndex) || String(a.colId).localeCompare(String(b.colId)));
  const distinctRowIndexes = new Set(rows.map((r) => r.rowIndex)).size;
  const distinctColIds = [...new Set(rows.map((r) => r.colId))];
  logger.info(
    `dumpGridDiagnostic[${containerSel}]: found=true ariaRowCount=${ariaRowCount} distinctRowIndexes=${distinctRowIndexes} distinctColIds=${JSON.stringify(distinctColIds)} matchingCells=${rows.length} (scrolled to defeat virtualization)`,
  );
  for (const r of rows.slice(0, 100)) {
    logger.info(`  row-index=${r.rowIndex} row-id=${r.rowId} col-id=${r.colId} visible=${r.visible} rect=${JSON.stringify(r.rect)} text="${r.text}"`);
  }
  return { found: true, ariaRowCount, rows };
};

/**
 * dumpTextMatches — ONE-OFF debugging aid: finds every element on the page whose OWN text
 * (not its descendants') contains a keyword (case-insensitive), so a "what control handles
 * this?" question can be answered from the test log instead of a live screenshot. ExpectedValue
 * is "<keyword>[|<max results, default 40>]". Filters to leaf-ish text nodes (an element is
 * reported only when none of its children also match) to avoid drowning in wrapper duplicates.
 */
export const dumpTextMatches: KeywordHandler = async (page, ctx, step) => {
  const [keyword, maxStr] = (step.expected || '').split('|').map((s) => s.trim());
  if (!keyword) {
    throw new Error(`dumpTextMatches: ExpectedValue must be "<keyword>[|<max results>]" — got "${step.expected}"`);
  }
  const max = Number(maxStr) || 40;
  const matches = await page.evaluate(
    ({ keyword, max }) => {
      const kw = keyword.toLowerCase();
      const all = Array.from(document.querySelectorAll('body *'));
      const out: Array<{
        tag: string; id: string; cls: string; text: string; visible: boolean;
        ancestorIds: string[]; nearestGridId: string; nearestGridRowCount: number; nearestGridDistance: number;
      }> = [];
      for (const el of all) {
        if (!(el.textContent || '').toLowerCase().includes(kw)) continue;
        let childMatches = false;
        for (const c of Array.from(el.children)) {
          if ((c.textContent || '').toLowerCase().includes(kw)) { childMatches = true; break; }
        }
        if (childMatches) continue; // keep only the innermost matching element

        // Walk up the ancestor chain: collect every id seen, and find the nearest ancestor
        // (or the element itself) that contains an AG-Grid, to answer "which table does this
        // caption/button belong to" without guessing at a shared/reused container id.
        const ancestorIds: string[] = [];
        let nearestGridId = '';
        let nearestGridRowCount = 0;
        let nearestGridDistance = -1;
        let cur: Element | null = el;
        let depth = 0;
        while (cur && depth < 8) {
          const id = (cur as HTMLElement).id;
          if (id) ancestorIds.push(id);
          if (nearestGridDistance === -1) {
            const grid = cur.querySelector('.ag-root, [row-index]');
            if (grid) {
              const gridRoot = (grid.closest('[id]') as HTMLElement) || (cur as HTMLElement);
              nearestGridId = gridRoot.id || '(no id)';
              nearestGridRowCount = cur.querySelectorAll('[row-index]').length;
              nearestGridDistance = depth;
            }
          }
          cur = cur.parentElement;
          depth++;
        }

        out.push({
          tag: el.tagName.toLowerCase(),
          id: (el as HTMLElement).id || '',
          cls: (el.getAttribute('class') || '').slice(0, 60),
          text: (el.textContent || '').trim().slice(0, 80),
          visible: (el as HTMLElement).offsetParent !== null,
          ancestorIds,
          nearestGridId,
          nearestGridRowCount,
          nearestGridDistance,
        });
        if (out.length >= max) break;
      }
      return out;
    },
    { keyword, max },
  );
  logger.info(`dumpTextMatches["${keyword}"]: ${matches.length} match(es)`);
  for (const m of matches) {
    logger.info(
      `  <${m.tag} id="${m.id}" class="${m.cls}"> visible=${m.visible} text="${m.text}" ancestorIds=${JSON.stringify(m.ancestorIds)} nearestGrid(id=${m.nearestGridId}, rows=${m.nearestGridRowCount}, distance=${m.nearestGridDistance})`,
    );
  }
  return matches;
};

/**
 * dumpSubtree — ONE-OFF debugging aid: lists every element inside a container (or inside the
 * Nth ancestor of a container, via `upLevels`), one line each with tag/id/class/own-text, so a
 * whole panel's structure (siblings, buttons, tabs the container itself doesn't reveal) can be
 * read from the test log in one shot instead of many narrow keyword searches. ExpectedValue is
 * "<containerCssSelector>[|<upLevels, default 0>][|<max, default 150>]".
 */
export const dumpSubtree: KeywordHandler = async (page, ctx, step) => {
  const [containerSel, upStr, maxStr] = (step.expected || '').split('|').map((s) => s.trim());
  if (!containerSel) {
    throw new Error(`dumpSubtree: ExpectedValue must be "<containerCssSelector>[|<upLevels>][|<max>]" — got "${step.expected}"`);
  }
  const upLevels = Number(upStr) || 0;
  const max = Number(maxStr) || 150;
  const info = await page.evaluate(
    ({ containerSel, upLevels, max }) => {
      let root: Element | null = document.querySelector(containerSel);
      if (!root) return { found: false, rootTag: '', rootId: '', lines: [] as string[] };
      for (let i = 0; i < upLevels && root.parentElement; i++) root = root.parentElement;
      const lines: string[] = [];
      const all = Array.from(root.querySelectorAll('*'));
      for (const el of all) {
        const ownText = Array.from(el.childNodes)
          .filter((n) => n.nodeType === 3)
          .map((n) => (n.textContent || '').trim())
          .join(' ')
          .trim();
        const id = (el as HTMLElement).id;
        const cls = (el.getAttribute('class') || '').slice(0, 50);
        if (!id && !cls && !ownText) continue; // skip pure structural noise
        lines.push(
          `${el.tagName.toLowerCase()}${id ? '#' + id : ''}${cls ? '.' + cls.replace(/\s+/g, '.') : ''}${ownText ? ` "${ownText.slice(0, 50)}"` : ''}`,
        );
        if (lines.length >= max) break;
      }
      return { found: true, rootTag: root.tagName.toLowerCase(), rootId: (root as HTMLElement).id || '', lines };
    },
    { containerSel, upLevels, max },
  );
  logger.info(`dumpSubtree[${containerSel}, up=${upLevels}]: root=<${info.rootTag}#${info.rootId}> found=${info.found} ${info.lines.length} element(s) with id/class/text`);
  for (const l of info.lines) logger.info(`  ${l}`);
  return info;
};

/**
 * scrollGridIntoView — defeats AG-Grid row virtualization by scrolling a container's
 * .ag-body-viewport down in steps until a target CSS selector is found in the DOM (or a
 * pass limit is hit), then scrolls it back to top. Needed wherever a row's cell must be
 * interacted with (double-click, etc.) but the row hasn't been rendered yet because it's
 * off-screen in a virtualized grid - a plain waitFor/click never sees it since the element
 * genuinely doesn't exist in the DOM until scrolled near it, unlike extractAllResultTables
 * (which reads every row across scroll positions) or dumpGridDiagnostic (which is read-only) -
 * this one leaves the target scrolled INTO view for the next step to interact with.
 *
 * Config comes from ExpectedValue (InputValue is already consumed by callCustom as the
 * function-name dispatch key, matching reconcilePeriodTable's convention):
 *   ExpectedValue = "<containerCssSelector>|<targetCssSelector>"
 */
export const scrollGridIntoView: KeywordHandler = async (page, ctx, step) => {
  const [containerSel, targetSel] = (step.expected || '').split('|').map((s) => s.trim());
  if (!containerSel || !targetSel) {
    throw new Error(`scrollGridIntoView: ExpectedValue must be "<containerCssSelector>|<targetCssSelector>" — got "${step.expected}"`);
  }
  for (let pass = 0; pass < 40; pass++) {
    const found = await page.evaluate(
      ({ containerSel, targetSel }) => !!document.querySelector(containerSel)?.querySelector(targetSel),
      { containerSel, targetSel },
    );
    if (found) {
      logger.info(`scrollGridIntoView[${containerSel}]: "${targetSel}" found after ${pass} scroll pass(es)`);
      return;
    }
    const moved = await page
      .evaluate(({ containerSel }) => {
        const viewport = document.querySelector(containerSel)?.querySelector('.ag-body-viewport') as HTMLElement | null;
        if (!viewport) return false;
        const before = viewport.scrollTop;
        viewport.scrollTop = before + Math.max(viewport.clientHeight * 0.7, 40);
        return viewport.scrollTop !== before;
      }, { containerSel })
      .catch(() => false);
    if (!moved) break;
    await page.waitForTimeout(120);
  }
  logger.warn(`scrollGridIntoView[${containerSel}]: "${targetSel}" not found after scrolling - the next step will likely fail with a clearer error`);
};

/**
 * fillGridCell — writes ONE value into an AG-Grid cell addressed purely by its structural
 * coordinates (`row-index` + `col-id`), for the case recording/codegen CANNOT capture a
 * usable per-cell selector: AG-Grid cells are typically plain `<div>`s until double-clicked
 * into edit mode, so a codegen session that doesn't happen to double-click every cell leaves
 * most of the grid with no recorded selector at all, even though the grid's structure (and
 * therefore every cell's row-index/col-id) is fully knowable live via `dumpGridDiagnostic`.
 * This is the WRITE counterpart to that READ-only diagnostic: find the addresses with
 * `dumpGridDiagnostic` first, then drive them with this.
 *
 * Also handles the companion problem of a target row not existing yet: if `addButtonLabel`
 * is configured, it clicks that button (located RELATIVE to the grid container, same
 * technique as `reconcilePeriodTable`) until the row renders, and — if the grid requires an
 * explicit sequence number typed into its own "index"/"Sr. No." column rather than
 * auto-numbering new rows — fills that column too via `indexColId`, defaulting to the
 * 1-based row position (`rowIndex + 1`). This default is a REASONABLE GUESS, not a confirmed
 * convention for every grid — screenshot-verify a newly-added row's index cell on first use
 * and pass a different `indexColId`/value scheme if the app numbers differently (e.g. 0-based,
 * or a non-sequential id).
 *
 * Config comes from ExpectedValue (InputValue is already consumed by callCustom as the
 * function-name dispatch key, matching reconcilePeriodTable's convention); the PER-CALL
 * row-index and value come from DynamicArgs so the same config works standalone (literal
 * DynamicArgs) or looped per-row inside a `loopPeriods` flow file (`${runtime.period.n}` +
 * a resolved field token) — DynamicArgs is already `${...}`-resolved and scanned by
 * `check-testdata-coverage.ts` like any other column, so no extra coverage-tool wiring is
 * needed for the value token:
 *   ExpectedValue  = "<gridContainerCssSelector>|<colId>|<editorObjectName>[|<addButtonLabel>[|<indexColId>]]"
 *   DynamicArgs    = "<rowIndex>|<value>"
 *     e.g. ExpectedValue = "#singlePieceStratTable|hazardRatio|txt_Input_Editor|Add Stratum|srNo"
 *          DynamicArgs   = "${runtime.period.n}|${runtime.period.hazardRatio}"
 * `editorObjectName` is a selectors.csv OBJECT NAME (not raw CSS) for the grid's inline cell
 * editor, matching `fillCompactIndexedCells`'s convention — AG-Grid typically reuses ONE
 * editor element for whichever cell is being edited, and that element's selector is usually
 * already confirmed/recorded per feature (e.g. `txt_Input_Editor`). `addButtonLabel`/
 * `indexColId` are optional — omit both for a grid whose rows are never short of the target
 * (fails loudly instead of silently if the row still doesn't exist and no add button is given).
 *
 * Row-index/col-id are on DIFFERENT elements (the row `<div>` vs a nested cell `<div>`), so
 * the cell locator uses a DESCENDANT combinator — `[row-index="N"] [col-id="X"]` — never a
 * compound `[row-index="N"][col-id="X"]`, which silently matches nothing (confirmed live via
 * `dumpGridDiagnostic` on more than one feature's grid).
 */
const AG_GRID_CELL_FILL_MAX_SCROLL_PASSES = 40;

async function scrollAndFillAgGridCell(
  page: Page,
  containerSel: string,
  cellLoc: Locator,
  editorLoc: Locator,
  value: string,
  timeout: number,
  label: string,
): Promise<void> {
  for (let pass = 0; pass < AG_GRID_CELL_FILL_MAX_SCROLL_PASSES; pass++) {
    if (await cellLoc.count().catch(() => 0)) break;
    const moved = await page
      .evaluate((containerSel) => {
        const viewport = document.querySelector(containerSel)?.querySelector('.ag-body-viewport') as HTMLElement | null;
        if (!viewport) return false;
        const before = viewport.scrollTop;
        viewport.scrollTop = before + Math.max(viewport.clientHeight * 0.7, 40);
        return viewport.scrollTop !== before;
      }, containerSel)
      .catch(() => false);
    if (!moved) break;
    await page.waitForTimeout(120);
  }
  await cellLoc.dblclick({ timeout });
  await editorLoc.first().waitFor({ state: 'visible', timeout });
  await editorLoc.first().fill(value, { timeout });
  // Explicit Enter commit — AG-Grid's React cell editor may only save to its data model on
  // blur/Enter, not on fill()'s input/change events alone (same finding as fillCompactIndexedCells).
  await editorLoc.first().press('Enter', { timeout }).catch(() => undefined);
  logger.info(`fillGridCell[${label}]: filled "${value}"`);
  await page.waitForTimeout(300);
}

export const fillGridCell: KeywordHandler = async (page, ctx, step) => {
  const [containerSel, colId, editorObject, addButtonLabel, indexColId] = (step.expected || '')
    .split('|')
    .map((s) => s.trim());
  if (!containerSel || !colId || !editorObject) {
    throw new Error(
      `fillGridCell: ExpectedValue must be "<gridContainerCssSelector>|<colId>|<editorObjectName>[|<addButtonLabel>[|<indexColId>]]" — got "${step.expected}"`,
    );
  }
  const [rowIndex, rawValue] = step.dynamicArgs;
  if (rowIndex === undefined || rawValue === undefined) {
    throw new Error(`fillGridCell: DynamicArgs must resolve to "<rowIndex>|<value>" — got "${step.dynamicArgs.join('|')}"`);
  }
  const isNa = (v: string) => v.trim() === '' || /^(n\/a|not applicable)$/i.test(v.trim());
  if (isNa(rowIndex) || isNa(rawValue)) {
    logger.info(`fillGridCell[${containerSel} row=${rowIndex} col=${colId}]: testdata value blank/N/A — skipping.`);
    return;
  }
  const timeout = step.timeout;
  const label = `${containerSel} row=${rowIndex} col=${colId}`;
  const targetCell = () => page.locator(containerSel).locator(`[row-index="${rowIndex}"] [col-id="${colId}"]`);
  const editorLoc = await resolveLocator(ctx.root(), ctx.feature.selectorIndex, step.page, editorObject);

  // First pass: is the row already rendered (possibly just off-screen in the virtualized grid)?
  for (let pass = 0; pass < AG_GRID_CELL_FILL_MAX_SCROLL_PASSES; pass++) {
    if (await targetCell().count().catch(() => 0)) break;
    const moved = await page
      .evaluate((containerSel) => {
        const viewport = document.querySelector(containerSel)?.querySelector('.ag-body-viewport') as HTMLElement | null;
        if (!viewport) return false;
        const before = viewport.scrollTop;
        viewport.scrollTop = before + Math.max(viewport.clientHeight * 0.7, 40);
        return viewport.scrollTop !== before;
      }, containerSel)
      .catch(() => false);
    if (!moved) break;
    await page.waitForTimeout(120);
  }

  let rowWasAdded = false;
  if (!(await targetCell().count().catch(() => 0))) {
    if (!addButtonLabel) {
      throw new Error(`fillGridCell[${label}]: row not found and no addButtonLabel configured — cannot create it`);
    }
    const addBtn = page
      .locator(containerSel)
      .locator(`xpath=following::button[contains(normalize-space(), ${JSON.stringify(addButtonLabel)})][1]`)
      .first();
    let guard = 0;
    while (!(await targetCell().count().catch(() => 0)) && guard++ < Number(rowIndex) + 10) {
      if (!(await addBtn.count().catch(() => 0))) {
        throw new Error(`fillGridCell[${label}]: no "${addButtonLabel}" button found after the grid (attempt ${guard})`);
      }
      await addBtn.click({ timeout }).catch(async () => {
        await addBtn.click({ timeout, force: true }).catch(() => undefined);
      });
      await page.waitForTimeout(400);
      rowWasAdded = true;
      // Re-scroll in case the new row rendered off-screen too.
      for (let pass = 0; pass < AG_GRID_CELL_FILL_MAX_SCROLL_PASSES; pass++) {
        if (await targetCell().count().catch(() => 0)) break;
        const moved = await page
          .evaluate((containerSel) => {
            const viewport = document.querySelector(containerSel)?.querySelector('.ag-body-viewport') as HTMLElement | null;
            if (!viewport) return false;
            const before = viewport.scrollTop;
            viewport.scrollTop = before + Math.max(viewport.clientHeight * 0.7, 40);
            return viewport.scrollTop !== before;
          }, containerSel)
          .catch(() => false);
        if (!moved) break;
        await page.waitForTimeout(120);
      }
    }
    if (!(await targetCell().count().catch(() => 0))) {
      throw new Error(`fillGridCell[${label}]: row still not found after ${guard} "${addButtonLabel}" click(s)`);
    }
    logger.info(`fillGridCell[${label}]: row did not exist — added via "${addButtonLabel}" (${guard} click(s))`);
  }

  if (rowWasAdded && indexColId) {
    const indexCell = page.locator(containerSel).locator(`[row-index="${rowIndex}"] [col-id="${indexColId}"]`);
    const indexValue = String(Number(rowIndex) + 1); // 1-based default — verify live, see doc comment above.
    await scrollAndFillAgGridCell(page, containerSel, indexCell, editorLoc, indexValue, timeout, `${label} (index col=${indexColId})`);
  }

  await scrollAndFillAgGridCell(page, containerSel, targetCell(), editorLoc, rawValue, timeout, label);
};

/**
 * clickCheckboxIfNeeded — a state-aware alternative to `click` for checkboxes that open a
 * confirmation dialog on toggle (which makes Playwright's own `check`/`uncheck` throw,
 * since their built-in post-click state verification races the dialog). Plain `click` is
 * NOT idempotent — it blindly toggles regardless of current state, so a checkbox whose
 * live default differs from what the tester assumed gets flipped to the WRONG state. This
 * reads the current checked state first and only clicks when it differs from the desired
 * one, so it is safe to call unconditionally regardless of the checkbox's actual default.
 * ExpectedValue is "check" or "uncheck" (the desired end state) - InputValue is already
 * consumed by callCustom as the function-name dispatch key, so config goes in
 * ExpectedValue, matching reconcilePeriodTable's convention.
 */
export const clickCheckboxIfNeeded: KeywordHandler = async (_page, ctx, step) => {
  const desired = (step.expected || '').trim().toLowerCase();
  if (desired !== 'check' && desired !== 'uncheck') {
    throw new Error(`clickCheckboxIfNeeded: ExpectedValue must be "check" or "uncheck", got "${step.expected}"`);
  }
  const loc = (await targetLocator(ctx, step)).first();
  const isChecked = await loc.isChecked();
  const wantChecked = desired === 'check';
  if (isChecked === wantChecked) {
    logger.info(`clickCheckboxIfNeeded[${step.objectName}]: already ${desired} — no-op`);
    return;
  }
  await loc.click({ timeout: step.timeout });
  logger.info(`clickCheckboxIfNeeded[${step.objectName}]: was ${isChecked ? 'checked' : 'unchecked'}, clicked to ${desired}`);
};

/**
 * fillCompactIndexedCells — fills a fixed-size, virtualized grid of N "slots" (rows 2..N,
 * since row 1 is typically a non-editable baseline) with however many non-N/A values a list
 * of testdata fields holds, PACKING them into the available slots in order rather than
 * mapping field K to slot K rigidly. Needed wherever a UI table's row count is capped by a
 * SEPARATE "how many pieces/rows" setting (so an early field being N/A does not mean "leave
 * this slot blank" - it means "the next real value moves up to fill it", exactly the way a
 * spreadsheet's own row count, not the field's position, determines how many rows exist).
 * Confirmed needed live (StratGADAR ITER_05's Bulk-Edit-Starting-At-Times modal): the modal
 * has exactly `hRNumOfPieces` rows total, and a rigid startingAtTimeN -> row-N mapping either
 * leaves a real value nowhere to go (more real values than slots after a gap) or leaves a
 * required cell empty (an early N/A field skipped instead of the next value taking its slot).
 *
 * Config comes from ExpectedValue (InputValue is already consumed by callCustom as the
 * function-name dispatch key, matching reconcilePeriodTable's convention):
 *   ExpectedValue = "<testDataFile>|<field1,field2,...>|<containerCssSelector>|<cellObjectName>|<editorObjectName>"
 *     simulation|startingAtTime1,startingAtTime2,startingAtTime3,startingAtTime4,startingAtTime5|#modalGrid|sel_bulkEdit_piece_time|txt_Input_Editor
 * cellObjectName must be a Dynamic (parametric, "{0}") selector taking the 1-based nth-child
 * position of the slot (slot k, k=1.., renders at nth-child(k+1) when row 1/nth-child(1) is a
 * fixed non-editable baseline row - matching this app's Bulk Edit modal structure).
 */
export const fillCompactIndexedCells: KeywordHandler = async (page, ctx, step) => {
  const [file, fieldsCsv, containerSel, cellObject, editorObject] = (step.expected || '').split('|').map((s) => s.trim());
  if (!file || !fieldsCsv || !containerSel || !cellObject || !editorObject) {
    throw new Error(
      `fillCompactIndexedCells: ExpectedValue must be "<testDataFile>|<field1,field2,...>|<containerCssSelector>|<cellObjectName>|<editorObjectName>" — got "${step.expected}"`,
    );
  }
  const parsed = ctx.feature.testDataParsed.get(file);
  const row = parsed?.records.find((r) => r.data['TC_ID'] === ctx.tcId && r.data['IterationID'] === ctx.iterationId)?.data;
  const isNaCell = (v: string | undefined): boolean => {
    const t = (v ?? '').trim();
    return t === '' || /^(n\/a|not applicable)$/i.test(t);
  };
  const fields = fieldsCsv.split(',').map((s) => s.trim());
  const values = fields.map((f) => row?.[f]).filter((v) => !isNaCell(v)) as string[];
  logger.info(`fillCompactIndexedCells[${containerSel}]: ${values.length} of ${fields.length} field(s) have real values -> filling slots 1..${values.length}`);
  for (let k = 1; k <= values.length; k++) {
    const nthChild = String(k + 1); // slot k renders at nth-child(k+1); nth-child(1) is the fixed baseline row
    // Defeat AG-Grid virtualization: scroll the container's .ag-body-viewport until this
    // slot's cell exists in the DOM (same technique as scrollGridIntoView).
    for (let pass = 0; pass < 40; pass++) {
      const cellLoc = await resolveLocator(ctx.root(), ctx.feature.selectorIndex, step.page, cellObject, { dynamicArgs: [nthChild] });
      if (await cellLoc.count().catch(() => 0)) break;
      const moved = await page
        .evaluate((containerSel) => {
          const viewport = document.querySelector(containerSel)?.querySelector('.ag-body-viewport') as HTMLElement | null;
          if (!viewport) return false;
          const before = viewport.scrollTop;
          viewport.scrollTop = before + Math.max(viewport.clientHeight * 0.7, 40);
          return viewport.scrollTop !== before;
        }, containerSel)
        .catch(() => false);
      if (!moved) break;
      await page.waitForTimeout(120);
    }
    const cellLoc = await resolveLocator(ctx.root(), ctx.feature.selectorIndex, step.page, cellObject, { dynamicArgs: [nthChild] });
    await cellLoc.dblclick({ timeout: step.timeout });
    const editorLoc = await resolveLocator(ctx.root(), ctx.feature.selectorIndex, step.page, editorObject);
    await editorLoc.first().waitFor({ state: 'visible', timeout: step.timeout });
    await editorLoc.first().fill(values[k - 1]!, { timeout: step.timeout });
    // Explicitly commit with Enter - AG-Grid's React cell editor may only save the value
    // into its data model on blur/Enter, not on fill()'s input/change events alone. The
    // original per-piece steps relied on the NEXT step's doubleClick to implicitly blur;
    // this tight loop does the same doubleClick but apparently too fast for that implicit
    // blur to register (confirmed live: slot 1 fills fine, slot 2's editor never appears).
    await editorLoc.first().press('Enter', { timeout: step.timeout }).catch(() => undefined);
    logger.info(`fillCompactIndexedCells[${containerSel}]: slot ${k} (nth-child(${nthChild})) = "${values[k - 1]}"`);
    await page.waitForTimeout(400);
  }
};

export default extractAllResultTables;
