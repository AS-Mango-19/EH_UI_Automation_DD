/**
 * DOM(PD) design-flow custom steps.
 *
 * Two-arm Difference-of-Means (continuous endpoint). The DESIGN recording is a
 * superset that toggled Hypothesis / Input Method / boundary families to reveal every
 * field, so its raw "Add Interim" clicks are entangled and fixed at the recorded
 * count. The boundary (group-sequential) interim table, however, varies WIDELY per
 * iteration in this feature — from 0 interims (fixed designs: ITER_03/04/08) to 8
 * (ITER_10) — so static metadata cannot decide how many "Add Interim" clicks each
 * iteration needs. `reconcileBoundaryInterims` makes the live interim table match the
 * period count the DESIGN testdata declares for the current iteration; the ordinary
 * metadata `fill` steps then populate each row (a blank/N/A cell auto-skips).
 *
 * This mirrors GADSD's proven survival/dropout reconcile (custom/GADSD(PD)/customSteps.ts),
 * but drives the boundary table's "Add Interim" button and counts the boundary spacing
 * inputs. The generic result tail (extractAllResultTables) and the date picker
 * (selectStartDate) are inherited from custom/_shared/customSteps.ts — callCustom falls
 * back to _shared per keyword, so they are intentionally NOT redefined here.
 *
 * Boundary period model (verified on GADSD, same East-Horizon GSD table): the interim
 * analyses are editable rows carrying id/name="boundary.<n>.analysisSpacingInfo"; the
 * FINAL analysis is an always-present, app-computed row whose spacing is DISABLED (100%).
 * So the interim count == the number of ENABLED analysisSpacingInfo inputs, and the
 * testdata declares exactly the interims (design_boundary.csv rows; the final is auto).
 */
import type { Page } from 'playwright';
import type { KeywordHandler } from '../../core/keywords/types.js';
import type { RunContext } from '../../core/runner/context.js';
import { logger } from '../../core/utils/logger.js';

const isNA = (v: string | undefined): boolean => {
  const t = (v ?? '').trim();
  return t === '' || /^(n\/a|not applicable)$/i.test(t);
};

/** How many interim analyses the DESIGN testdata declares (distinct boundary.<n> with a non-N/A analysisSpacingInfo). */
function targetInterimCount(ctx: RunContext): number {
  const parsed = ctx.feature.testDataParsed.get('design');
  if (!parsed) return 0;
  const row = parsed.records.find(
    (r) => r.data['TC_ID'] === ctx.tcId && r.data['IterationID'] === ctx.iterationId,
  )?.data;
  if (!row) return 0;
  const re = /^boundary\.(\d+)\.analysisSpacingInfo$/;
  const periods = new Set<string>();
  for (const h of parsed.headers) {
    const m = re.exec(h);
    if (m && !isNA(row[h])) periods.add(m[1]);
  }
  return periods.size;
}

/**
 * How many EDITABLE interim rows the live boundary table shows — the count of ENABLED
 * boundary.*.analysisSpacingInfo inputs. The disabled final (100%) row is excluded, so
 * this equals the number of interims the app currently renders.
 */
async function liveInterimCount(page: Page): Promise<number> {
  return page
    .locator('[id^="boundary."][id$=".analysisSpacingInfo"], [name^="boundary."][name$=".analysisSpacingInfo"]')
    .evaluateAll((els) => els.filter((e) => !(e as HTMLInputElement).disabled).length);
}

/**
 * Click "Add Interim" until the live editable-interim count matches the testdata's
 * declared interim count. The button is located RELATIVE to the boundary table's own
 * inputs (the first "Add Interim" button FOLLOWING the last boundary.* input), so it is
 * unambiguous on a page full of other Add buttons. Each add is verified by re-counting,
 * so a mis-located button fails loudly instead of looping. Fixed designs (target 0) and
 * iterations already at the right count are no-ops.
 */
export const reconcileBoundaryInterims: KeywordHandler = async (page, ctx, step) => {
  const timeout = step.timeout;
  const target = targetInterimCount(ctx);
  let current = await liveInterimCount(page);
  logger.info(`reconcileBoundaryInterims: live ${current} interim(s), design testdata wants ${target}`);
  if (target <= current) {
    if (target < current) {
      logger.warn(
        `reconcileBoundaryInterims: testdata wants FEWER interims (${target}) than present (${current}) — row deletion not implemented; extra rows are left for the N/A fills to leave at their computed default.`,
      );
    }
    return;
  }
  let guard = 0;
  while (current < target && guard++ < target + 5) {
    const anchor = page
      .locator('[id^="boundary."][id$=".analysisSpacingInfo"], [name^="boundary."][name$=".analysisSpacingInfo"]')
      .last();
    const addBtn = anchor
      .locator('xpath=following::button[contains(normalize-space(), "Add Interim")][1]')
      .first();
    if (!(await addBtn.count().catch(() => 0))) {
      throw new Error(
        `reconcileBoundaryInterims: no "Add Interim" button found after the boundary table (current=${current}, target=${target})`,
      );
    }
    await addBtn.click({ timeout }).catch(async () => {
      await addBtn.click({ timeout, force: true }).catch(() => undefined);
    });
    await page.waitForTimeout(400);
    const next = await liveInterimCount(page);
    if (next <= current) {
      throw new Error(
        `reconcileBoundaryInterims: "Add Interim" click did not add a row (still ${next}, target ${target}) — check the button locator`,
      );
    }
    current = next;
  }
  if (current !== target) {
    throw new Error(`reconcileBoundaryInterims: ended with ${current} interim(s), expected ${target}`);
  }
  logger.info(`reconcileBoundaryInterims: now ${current} interim(s)`);
};

/**
 * Reconcile the SIMULATION Enrollment (accrual) table to the sim testdata's period count.
 * After the Enrollment tab's Include toggle is ON the table shows ONE row; multi-period
 * iterations need "Add Period" clicks to match (analogous to GADAR's sim reconcileEnrollmentPeriods).
 * Counts distinct `enrollmentTable.<n>` periods the SIMULATION testdata declares (non-N/A), counts
 * the live rows, and clicks the enrollment "Add Period" button (located after the table's own inputs)
 * until they match. The ordinary metadata fills then populate each row by its DOM id. Runs AFTER the
 * Include toggle and BEFORE the per-period fills.
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
    if (m && !isNA(row[h])) periods.add(m[1]);
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
 * Wait for the "Save & Simulate" button (#save-compute) to become ENABLED after Save, and
 * INSPECT the page state if it never re-enables.
 *
 * Adaptive (CHW/CDL) sims re-validate the design after Save; while that runs the button carries
 * the `disabled` attribute. The plain click auto-waits only briefly and then force-clicks, which
 * cannot actuate a disabled button — so a design left in an INVALID state (e.g. the CHW Promising
 * Zone hitting "Unable to convert values. Reverting to defaults" when the SSR dropdowns are driven
 * faster than the app recomputes) shows up only as a bare "element is not enabled".
 *
 * This polls the button's enabled state up to the step timeout. When it enables, it returns and the
 * following click step actuates it. When it does NOT, it dumps a diagnostic — the button's own HTML,
 * any visible toast/alert text, spinner presence, elements flagged invalid, and the "Not Saved"
 * indicator — then throws so the real reason is visible instead of a generic timeout. The per-step
 * screenshot (Screenshot=always) captures the same moment visually.
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
  // Never re-enabled — inspect and report WHY.
  const grab = async (loc: ReturnType<Page['locator']>): Promise<string[]> =>
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

export default { reconcileBoundaryInterims, reconcileSimEnrollment, waitAndInspectSaveSimulate };
