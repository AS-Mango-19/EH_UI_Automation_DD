/**
 * Feature-local escape hatches for ROM(PD).
 */
import { DateTime } from 'luxon';
import type { Locator } from 'playwright';
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

export const selectInputSetTaskAndTest: KeywordHandler = async (page, ctx, step) => {
  const resolvedTest = ctx.resolve('${data.inputset.SelectTest}', { stepId: step.stepId, column: 'InputValue' });

  logger.info(`selectInputSetTaskAndTest -> ${resolvedTest}`);

  await page.getByRole('button', { name: 'Design Compute or simulate a' }).click({ timeout: step.timeout });
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