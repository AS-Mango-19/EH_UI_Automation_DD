/**
 * GADSD(PD) design-flow custom steps.
 *
 * The DESIGN recording is a superset: it toggled the Input Method (Median Survival
 * Times / Hazard Rates / Cumulative % Survival) and the Null/Alt/NI variants to
 * reveal every field, so its raw "Add Period" clicks are entangled and over-count
 * (it also captured one period DEEPER than any scenario uses). Static metadata
 * therefore cannot decide how many "Add Period" clicks each iteration needs. These
 * handlers reconcile each live piecewise table (survival / dropout / enrollment) to
 * the period count the DESIGN testdata specifies for the current iteration; the
 * ordinary metadata `fill` steps then populate each row (a blank/N/A cell auto-skips).
 *
 * Period count is read from id/name="<prefix>.<n>.<field>" on the inputs, so it is
 * method-agnostic (Hazard Rates / Cum % Survival / Median all carry the same
 * <prefix>.<n>. index). Mirrors GADAR's proven reconcile, but reads the DESIGN
 * testdata (design.csv — including the columns folded in from design_<table>.csv).
 *
 * ENROLLMENT quirk: in the Enrollment table ONLY, "Add Period" inserts the new blank
 * row at the TOP and shifts existing rows down (the final 100%-accrued row ends up
 * last). reconcile only needs the COUNT to match — it counts distinct <n>, which is
 * position-independent — and the metadata fills then target each row by its DOM id.
 * If a run shows the enrollment values landing in the wrong rows, the id numbering
 * does not follow the intended period order and the enrollment fills must be reversed.
 */
import type { Page } from 'playwright';
import type { KeywordHandler } from '../../core/keywords/types.js';
import type { RunContext } from '../../core/runner/context.js';
import { logger } from '../../core/utils/logger.js';

const isNA = (v: string | undefined): boolean => {
  const t = (v ?? '').trim();
  return t === '' || /^(n\/a|not applicable)$/i.test(t);
};

/** How many periods the DESIGN testdata specifies for a table prefix (e.g. inputMethodTable). */
function targetPeriodCount(ctx: RunContext, prefix: string): number {
  const parsed = ctx.feature.testDataParsed.get('design');
  if (!parsed) return 0;
  const row = parsed.records.find(
    (r) => r.data['TC_ID'] === ctx.tcId && r.data['IterationID'] === ctx.iterationId,
  )?.data;
  if (!row) return 0;
  const re = new RegExp(`^${prefix}\\.(\\d+)\\.`);
  const periods = new Set<string>();
  for (const h of parsed.headers) {
    const m = re.exec(h);
    if (m && !isNA(row[h])) periods.add(m[1]);
  }
  return periods.size;
}

/** How many period rows the live table currently shows (distinct <n> in id/name="<prefix>.<n>.field"). */
async function currentPeriodCount(page: Page, prefix: string): Promise<number> {
  const keys = await page
    .locator(`[id^="${prefix}."], [name^="${prefix}."]`)
    .evaluateAll((els) => els.map((e) => (e as HTMLElement).id || e.getAttribute('name') || ''));
  const periods = new Set<string>();
  for (const k of keys) {
    const idx = k.split('.')[1];
    if (idx !== undefined && /^\d+$/.test(idx)) periods.add(idx);
  }
  return periods.size;
}

/**
 * Add "Add Period" rows to a piecewise table until it matches the DESIGN testdata's
 * target period count. The Add-Period button is located RELATIVE to the table's own
 * inputs (the first "Add Period" button FOLLOWING the last id/name="<prefix>.*"
 * input), so it is unambiguous even though survival + dropout + enrollment (and all
 * their Add-Period buttons) render on one page. Each add is verified by re-counting,
 * so a mis-located button fails loudly instead of looping.
 */
async function reconcilePeriods(page: Page, ctx: RunContext, prefix: string, timeout: number): Promise<void> {
  const target = targetPeriodCount(ctx, prefix);
  let current = await currentPeriodCount(page, prefix);
  logger.info(`reconcile ${prefix}: live ${current} period(s), design testdata wants ${target}`);
  if (target <= current) {
    if (target < current) {
      logger.warn(
        `reconcile ${prefix}: testdata wants FEWER periods (${target}) than present (${current}) — row deletion not implemented; the extra rows are left for the method select / N/A fills to leave blank.`,
      );
    }
    return;
  }
  let guard = 0;
  while (current < target && guard++ < target + 5) {
    const anchor = page.locator(`[id^="${prefix}."], [name^="${prefix}."]`).last();
    const addBtn = anchor
      .locator('xpath=following::button[contains(normalize-space(), "Add Period")][1]')
      .first();
    if (!(await addBtn.count().catch(() => 0))) {
      throw new Error(`reconcile ${prefix}: no "Add Period" button found after the table (current=${current}, target=${target})`);
    }
    await addBtn
      .click({ timeout })
      .catch(async () => {
        await addBtn.click({ timeout, force: true }).catch(() => undefined);
      });
    await page.waitForTimeout(400);
    const next = await currentPeriodCount(page, prefix);
    if (next <= current) {
      throw new Error(`reconcile ${prefix}: "Add Period" click did not add a row (still ${next}, target ${target}) — check the button locator`);
    }
    current = next;
  }
  if (current !== target) {
    throw new Error(`reconcile ${prefix}: ended with ${current} period(s), expected ${target}`);
  }
  logger.info(`reconcile ${prefix}: now ${current} period(s)`);
}

export const reconcileSurvivalPeriods: KeywordHandler = async (page, ctx, step) => {
  await reconcilePeriods(page, ctx, 'inputMethodTable', step.timeout);
};
export const reconcileDropoutPeriods: KeywordHandler = async (page, ctx, step) => {
  await reconcilePeriods(page, ctx, 'dropoutTable', step.timeout);
};
/**
 * ENROLLMENT is the EXCEPTIONAL table (the reason it gets its own handler instead of
 * the standard reconcile). Two app behaviours make it different from survival/dropout:
 *
 *  1. "Add Period" inserts the new EDITABLE row at the TOP (all other tables append at
 *     the bottom), shifting existing rows DOWN.
 *  2. A DISABLED, app-computed FINAL row (By Time = Accrual Duration, Cum % = 100) is
 *     always present and stays at the BOTTOM.
 *
 * DOM ids are assigned by VISUAL position (verified at runtime: after one Add, the new
 * top row is `enrollmentTable.0` and the old final shifts to `.1`). So the robust order
 * is: add ALL N editable rows first (each inserts on top of the auto final), THEN fill
 * by id — once every row exists the positions are stable and ascending from the top
 * (`enrollmentTable.0` = top = earliest By Time), so testdata period n maps directly to
 * `enrollmentTable.n`. The bottom row (highest id) is the disabled final and is left
 * untouched. This is data-driven: N = the enrollment periods the design testdata declares.
 */
export const enterEnrollmentTable: KeywordHandler = async (page, ctx, step) => {
  const timeout = step.timeout;
  const parsed = ctx.feature.testDataParsed.get('design');
  const dataRow = parsed?.records.find(
    (r) => r.data['TC_ID'] === ctx.tcId && r.data['IterationID'] === ctx.iterationId,
  )?.data;
  if (!parsed || !dataRow) {
    throw new Error(`enterEnrollmentTable: no design testdata row for ${ctx.tcId}/${ctx.iterationId}`);
  }
  const indices = [
    ...new Set(
      parsed.headers
        .map((h) => /^enrollmentTable\.(\d+)\./.exec(h)?.[1])
        .filter((x): x is string => x !== undefined),
    ),
  ]
    .map(Number)
    .sort((a, b) => a - b);
  const periods = indices
    .map((n) => ({
      n,
      byTime: dataRow[`enrollmentTable.${n}.byTime`] ?? '',
      cum: dataRow[`enrollmentTable.${n}.cumPercAccrued`] ?? '',
    }))
    .filter((p) => !isNA(p.byTime) || !isNA(p.cum));

  logger.info(
    `enterEnrollmentTable: ${periods.length} intermediate accrual period(s) — Add Period inserts at TOP; the disabled final row stays at the bottom`,
  );
  if (periods.length === 0) return; // no intermediate periods: only the auto final row

  // 1) Add one editable row per declared period (each "Add Period" inserts at the top).
  for (let i = 0; i < periods.length; i++) {
    const anchor = page.locator('[id^="enrollmentTable."], [name^="enrollmentTable."]').last();
    const addBtn = anchor
      .locator('xpath=following::button[contains(normalize-space(), "Add Period")][1]')
      .first();
    if (!(await addBtn.count().catch(() => 0))) {
      throw new Error('enterEnrollmentTable: no "Add Period" button found after the enrollment table');
    }
    await addBtn.click({ timeout }).catch(async () => {
      await addBtn.click({ timeout, force: true }).catch(() => undefined);
    });
    await page.waitForTimeout(400);
  }

  // 2) Fill by DOM id now that all rows exist and positions are stable (top = id 0).
  const fillCell = async (id: string, value: string): Promise<void> => {
    const loc = page.locator(`[id="${id}"]`);
    await loc.waitFor({ state: 'visible', timeout });
    if (!(await loc.isEditable().catch(() => false))) {
      throw new Error(`enterEnrollmentTable: "${id}" is not editable — the enrollment row layout does not match the testdata period count`);
    }
    await loc.click({ timeout });
    await loc.press('Control+a');
    await loc.press('Delete');
    await loc.pressSequentially(String(value), { delay: 40 });
    await loc.press('Tab');
  };
  for (const p of periods) {
    if (!isNA(p.byTime)) await fillCell(`enrollmentTable.${p.n}.byTime`, p.byTime);
    if (!isNA(p.cum)) await fillCell(`enrollmentTable.${p.n}.cumPercAccrued`, p.cum);
  }
  logger.info(`enterEnrollmentTable: entered ${periods.length} period(s)`);
};

export default { reconcileSurvivalPeriods, reconcileDropoutPeriods, enterEnrollmentTable };
