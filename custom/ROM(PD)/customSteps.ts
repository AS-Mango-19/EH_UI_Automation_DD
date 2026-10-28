/**
 * Feature-local escape hatches for ROM(PD).
 */
import { DateTime } from 'luxon';
import type { Locator, Page } from 'playwright';
import type { KeywordHandler } from '../../core/keywords/types.js';
import { logger } from '../../core/utils/logger.js';
import { targetLocator } from '../../core/keywords/util.js';

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

/**
 * The picker opens on the CURRENT month; a target in another month (e.g. LAST
 * month) is not rendered until we page there. react-datepicker shows the visible
 * month in .react-datepicker__current-month ("August 2026") with Prev/Next nav
 * buttons. Safe for other widgets: bails if the header isn't a readable month.
 */
async function navigateCalendarToMonth(page: Page, target: DateTime, timeout: number): Promise<void> {
  const goal = target.startOf('month');
  const header = page.locator('.react-datepicker__current-month').first();
  const prev = page.locator('button[aria-label="Previous Month"], .react-datepicker__navigation--previous').first();
  const next = page.locator('button[aria-label="Next Month"], .react-datepicker__navigation--next').first();
  for (let i = 0; i < 60; i++) {
    const shownTxt = ((await header.textContent().catch(() => '')) ?? '').replace(/\s+/g, ' ').trim();
    const shown = DateTime.fromFormat(shownTxt, 'MMMM yyyy');
    if (!shown.isValid) return; // not a react-datepicker header — let the day-click try as-is
    if (shown.hasSame(goal, 'month') && shown.hasSame(goal, 'year')) return;
    const btn = shown.toMillis() > goal.toMillis() ? prev : next;
    if (!(await btn.count().catch(() => 0))) return; // no nav control — bail to the day-click
    await btn.click({ timeout }).catch(() => undefined);
    await page.waitForTimeout(120);
  }
}

export const selectStartDate: KeywordHandler = async (page, ctx, step) => {
  const resolved = ctx.resolve('${data.project.Start Date}', { stepId: step.stepId, column: 'InputValue' });
  const date = parseStartDate(resolved);
  const optionLabels = calendarLabelCandidates(date);
  const textbox = page.getByRole('textbox', { name: 'MM/dd/yyyy' });
  const selectButton = page.getByRole('button', { name: 'Select' });

  logger.info(`selectStartDate -> ${resolved} (${optionLabels[0]})`);

  await textbox.click({ timeout: step.timeout });
  await navigateCalendarToMonth(page, date, step.timeout);
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

export const selectInputSetTaskAndTest: KeywordHandler = async (page, ctx, step) => {
  const resolvedTask = ctx.resolve('${data.inputset.SelectTask}', { stepId: step.stepId, column: 'InputValue' });
  const resolvedTest = ctx.resolve('${data.inputset.SelectTest}', { stepId: step.stepId, column: 'InputValue' });

  logger.info(`selectInputSetTaskAndTest -> task=${resolvedTask} test=${resolvedTest}`);

  // Data-driven task button (SelectTask, e.g. "Design") with a substring match, falling
  // back to the proven hardcoded name if the data-driven lookup ever misses - every
  // current row's SelectTask value is a substring of the hardcoded label, so behavior is
  // unchanged in practice while the column is now genuinely consulted (was previously
  // flagged by validate as an unentered testdata value).
  const taskButton = page.getByRole('button', { name: resolvedTask, exact: false });
  if (await taskButton.count().catch(() => 0)) {
    await taskButton.first().click({ timeout: step.timeout });
  } else {
    await page.getByRole('button', { name: 'Design Compute or simulate a' }).click({ timeout: step.timeout });
  }
  await page.getByRole('heading', { name: 'Select Test' }).click({ timeout: step.timeout }).catch(() => undefined);

  const testContainer = page.locator('.react-select__input-container').last();
  if (await testContainer.count().catch(() => 0)) {
    await testContainer.click({ timeout: step.timeout, force: true }).catch(() => undefined);
  }

  const optionCandidates = [
    () => page.getByRole('option', { name: resolvedTest, exact: true }).click({ timeout: step.timeout }),
    () => page.getByText(resolvedTest, { exact: true }).click({ timeout: step.timeout }),
    () => page.locator('#testId-14').click({ timeout: step.timeout }),
  ];

  for (const candidate of optionCandidates) {
    try {
      await candidate();
      return;
    } catch {
      // Try the next candidate.
    }
  }

  throw new Error(`selectInputSetTaskAndTest: unable to resolve input-set test "${resolvedTest}"`);
};

/* completeResultsAndSave was removed: it hid six app interactions inside
 * TypeScript, where the testdata cannot reach them - no per-iteration N/A skip,
 * no read-back verification, no per-step screenshot. They are now ordinary
 * metadata steps 422-434. Keep app interactions in metadata.csv. */

/**
 * Confirm the "Name your result before simulating" modal (Save & Simulate).
 *
 * The button is `#credit-alert-primary` inside `<div class="modal … show"
 * id="credit-alert" aria-hidden="true">`. Two things defeated a plain click:
 *  - the design phase leaves an earlier `#credit-alert-primary` in the DOM, so a
 *    `.first()` match hit the wrong (stale) one — we take the LAST shown modal;
 *  - a synthetic pointer click can be swallowed by the `.modal-backdrop`, so we
 *    fire a native DOM click that triggers the React onClick directly.
 * This actually starts the run, which then navigates to the Results list.
 */
export const confirmSimulateModal: KeywordHandler = async (page, _ctx, step) => {
  const btns = page.locator('.modal.show #credit-alert-primary');
  const n = await btns.count().catch(() => 0);
  logger.info(`confirmSimulateModal: ${n} shown-modal Simulate button(s); clicking the last.`);
  if (n === 0) throw new Error('confirmSimulateModal: no #credit-alert-primary in a shown modal.');
  const btn = btns.last();
  await btn.waitFor({ state: 'attached', timeout: step.timeout }).catch(() => undefined);
  await btn.evaluate((el: HTMLElement) => el.click());
};

/**
 * reconcileSimEnrollment: click "Add Period" on the sim Enrollment table until its live
 * row count matches the iteration's simulation_enrollmentTable.csv period count. Must run
 * BEFORE the per-period loopPeriods fill. Feature-agnostic (copied from feature_DOM(PD),
 * confirmed live there) - reused verbatim since ROM(PD)'s sim enrollment table shares the
 * same enrollmentTable.<n>.<field> id pattern (confirmed live via screenshot 2026-10-28,
 * ITER_06's 6-period table; Add Period button id=addButton).
 */
export const reconcileSimEnrollment: KeywordHandler = async (page, ctx, step) => {
  const timeout = step.timeout;
  const parsed = ctx.feature.testDataParsed.get('simulation');
  const row = parsed?.records.find(
    (r) => r.data['TC_ID'] === ctx.tcId && r.data['IterationID'] === ctx.iterationId,
  )?.data;
  if (!parsed || !row) return;
  const re = /^enrollmentTable\.(\d+)\./;
  const periods = new Set<string>();
  for (const h of parsed.headers) {
    const m = re.exec(h);
    if (m && row[h] !== undefined && !/^(n\/a|not applicable|)$/i.test(row[h]!.trim())) periods.add(m[1]);
  }
  const target = periods.size;
  const liveCount = async (): Promise<number> =>
    page
      .locator('[id^="enrollmentTable."][id$=".avgSubjectsEnrolled"], [name^="enrollmentTable."][name$=".avgSubjectsEnrolled"]')
      .count()
      .catch(() => 0);
  let current = await liveCount();
  logger.info(`reconcileSimEnrollment: live ${current} row(s), sim testdata wants ${target}`);
  if (target <= current) return;
  let guard = 0;
  while (current < target && guard++ < target + 5) {
    const anchor = page.locator('[id^="enrollmentTable."], [name^="enrollmentTable."]').last();
    const addBtn = anchor
      .locator('xpath=following::button[contains(normalize-space(), "Add Period")][1]')
      .first();
    if (!(await addBtn.count().catch(() => 0))) {
      throw new Error(`reconcileSimEnrollment: no "Add Period" button after the enrollment table (current=${current}, target=${target})`);
    }
    await addBtn.click({ timeout }).catch(async () => {
      await addBtn.click({ timeout, force: true }).catch(() => undefined);
    });
    await page.waitForTimeout(400);
    const next = await liveCount();
    if (next <= current) {
      throw new Error(`reconcileSimEnrollment: "Add Period" did not add a row (still ${next}, target ${target})`);
    }
    current = next;
  }
  logger.info(`reconcileSimEnrollment: now ${current} period(s)`);
};

/**
 * waitAndInspectSaveSimulate: poll the "Save & Simulate" button (#save-compute) until it
 * re-enables after Save, and INSPECT the page state if it never does. Copied verbatim from
 * feature_DOM(PD) (feature-agnostic, uses only the #save-compute id) - confirmed live needed
 * here too: ITER_04 (IncludeEnrollment=uncheck) left Save & Simulate disabled long enough
 * that the plain click's short auto-wait force-clicked through before the app had actually
 * re-enabled it, leaving the next step (naming the sim result) unable to find its field
 * because the Save & Simulate dialog never genuinely opened.
 */
export const waitAndInspectSaveSimulate: KeywordHandler = async (page, _ctx, step) => {
  const btn = page.locator('#save-compute');
  const start = Date.now();
  const deadline = start + step.timeout;
  let enabled = false;
  while (Date.now() < deadline) {
    const present = await btn.count().catch(() => 0);
    const isEnabled = present > 0 ? await btn.isEnabled().catch(() => false) : false;
    if (isEnabled) { enabled = true; break; }
    await page.waitForTimeout(1000);
  }
  const waited = Date.now() - start;
  if (enabled) {
    logger.info(`waitAndInspectSaveSimulate: Save & Simulate enabled after ~${waited}ms`);
    return;
  }
  const grab = async (loc: Locator): Promise<string[]> =>
    (await loc.allInnerTexts().catch(() => [])).map((t) => t.trim()).filter(Boolean);
  const buttonHtml = await btn.evaluate((el) => el.outerHTML).catch(() => '(button not found)');
  const toasts = await grab(page.locator('[class*="toast"], [role="alert"], [class*="notification"]'));
  const alerts = await grab(page.locator('[class*="alert"], [class*="Alert"]'));
  const invalids = await grab(page.locator('[aria-invalid="true"], [class*="invalid"], [class*="error"], [class*="Error"]'));
  const spinnerCount = await page.locator('[class*="spinner"], [class*="Spinner"], [class*="loading"]').count().catch(() => 0);
  const notSaved = await page.getByText('Not Saved', { exact: false }).count().catch(() => 0);
  logger.error(
    `waitAndInspectSaveSimulate: Save & Simulate STILL DISABLED after ${waited}ms — inspect:\n` +
      `  button   = ${buttonHtml}\n` +
      `  toasts   = ${JSON.stringify(toasts)}\n` +
      `  alerts   = ${JSON.stringify(alerts)}\n` +
      `  invalids = ${JSON.stringify(invalids.slice(0, 20))}\n` +
      `  spinners = ${spinnerCount}\n` +
      `  notSavedIndicators = ${notSaved}`,
  );
  throw new Error(`waitAndInspectSaveSimulate: #save-compute never enabled within ${step.timeout}ms (see inspect log)`);
};

/* ------------------------------------------------------------------ *
 * Result-page capture lives in custom/_shared/customSteps.ts.
 *
 * This file used to carry its OWN copy of extractAllResultTables. The two
 * copies drifted, so every fix (AG Grid wrapper de-duplication, scrolling
 * past row virtualization, capturing the narrative "Summary" panel, dropping
 * the uncomparable Timestamp column) landed on only one of them. callCustom
 * falls back to _shared when a feature does not export a handler, so ROM(PD)
 * now inherits the single maintained implementation.
 * ------------------------------------------------------------------ */

export default selectStartDate;