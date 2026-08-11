/**
 * GADAR(PD) feature-specific custom steps.
 *
 * The SIMULATION inherits the design's piecewise tables (survival / dropout /
 * enrollment). The sim may then legitimately CHANGE the method and the NUMBER of
 * periods (a real East Horizon feature). Because the INHERITED period count varies
 * per iteration and is only known at runtime, static metadata cannot decide how
 * many "Add Period" clicks are needed (see the design↔sim mismatch analysis). These
 * handlers reconcile the LIVE table to the period count the SIM testdata specifies;
 * the ordinary metadata `fill` steps then populate each row.
 *
 * Period count is read from id/name="<prefix>.<n>.<field>" on the inputs, so it is
 * method-agnostic (Hazard Rates / Cum % Survival / Median / Probability all carry
 * the same <prefix>.<n>. index in their field ids).
 */
import type { Page } from 'playwright';
import type { KeywordHandler } from '../../core/keywords/types.js';
import type { RunContext } from '../../core/runner/context.js';
import { logger } from '../../core/utils/logger.js';

const isNA = (v: string | undefined): boolean => {
  const t = (v ?? '').trim();
  return t === '' || /^(n\/a|not applicable)$/i.test(t);
};

/** How many periods the SIM testdata specifies for a table prefix (e.g. inputMethodTable). */
function targetPeriodCount(ctx: RunContext, prefix: string): number {
  const parsed = ctx.feature.testDataParsed.get('simulation');
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
    if (/^\d+$/.test(idx)) periods.add(idx);
  }
  return periods.size;
}

/**
 * Add "Add Period" rows to a piecewise table until it matches the SIM's target
 * period count. The Add-Period button is located RELATIVE to the table's own
 * inputs (the first "Add Period" button FOLLOWING the last id/name="<prefix>.*"
 * input), so it is unambiguous even though the Response tab renders survival +
 * dropout + enrollment (and all their Add-Period buttons) on one page. Each add is
 * verified by re-counting, so a mis-located button fails loudly instead of looping.
 */
async function reconcilePeriods(page: Page, ctx: RunContext, prefix: string, timeout: number): Promise<void> {
  const target = targetPeriodCount(ctx, prefix);
  let current = await currentPeriodCount(page, prefix);
  logger.info(`reconcile ${prefix}: inherited ${current} period(s), sim wants ${target}`);
  if (target <= current) {
    if (target < current) {
      logger.warn(
        `reconcile ${prefix}: sim wants FEWER periods (${target}) than inherited (${current}) — row deletion not implemented; relying on the method select (e.g. "None") to clear the table.`,
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
      .catch(async () => { await addBtn.click({ timeout, force: true }).catch(() => undefined); });
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
export const reconcileEnrollmentPeriods: KeywordHandler = async (page, ctx, step) => {
  await reconcilePeriods(page, ctx, 'enrollmentTable', step.timeout);
};

/** Read a value from the current iteration's simulation testdata row ('' if absent). */
function simValue(ctx: RunContext, col: string): string {
  const parsed = ctx.feature.testDataParsed.get('simulation');
  const row = parsed?.records.find(
    (r) => r.data['TC_ID'] === ctx.tcId && r.data['IterationID'] === ctx.iterationId,
  )?.data;
  return row ? (row[col] ?? '') : '';
}

async function priorTooExtreme(page: Page): Promise<boolean> {
  return page
    .getByText('Prior parameters are too extreme', { exact: false })
    .first()
    .isVisible()
    .catch(() => false);
}

/** Read a <select>'s currently-SELECTED OPTION TEXT ('∅' if absent). */
async function selText(page: Page, sel: string): Promise<string> {
  const loc = page.locator(sel).first();
  if (!(await loc.count().catch(() => 0))) return '∅';
  return (await loc
    .evaluate((el) => {
      const s = el as HTMLSelectElement;
      return s.options && s.selectedIndex >= 0 ? s.options[s.selectedIndex].text : String(s.value);
    })
    .catch(() => '∅')) as string;
}

/** Design-header <select>s above the boundary grid, paired with their sim column. */
const HEADER_SELECT_FIELDS: ReadonlyArray<readonly [string, string]> = [
  ['#fixAtEachAnalysis', 'fixAtEachAnalysis'],
  ['#randomizationMethodSelect', 'randomizationMethodSelect'],
  ['#testStatistic', 'testStatistic'],
];

/** Design-header text inputs above the boundary grid, paired with their sim column. */
const HEADER_TEXT_FIELDS: ReadonlyArray<readonly [string, string]> = [
  ['#sampleSize', 'sampleSize'],
  ['#numberOfEvents', 'numberOfEvents'],
  ['#studyDuration', 'studyDuration'],
  ['#allocationRatio', 'allocationRatio'],
  ['#harringtonFlemP', 'harringtonFlemP'],
  ['#harringtonFlemQ', 'harringtonFlemQ'],
  ['#margin_NI', 'margin_NI'],
  ['#margin_SS', 'margin_SS'],
];

/**
 * Wait for the sim's Design tab to be FULLY rendered before its header is touched. The tab
 * mounts asynchronously after it is opened; if enterDesignHeader edits Sample Size / Events
 * while the interdependent selects and the boundary grid are still binding, the
 * group-sequential model is left half-initialized and the later Recalculate reports "Prior
 * parameters are too extreme" — for a header a human enters by hand with no trouble. The tell
 * that we acted too early is the three header selects logging "not rendered — skip". Gate on
 * the Recalculate button + those selects + the interim futility-HR grid, then let any compute
 * spinner clear, so we edit a fully-bound model exactly as a human does.
 */
async function waitForDesignTabReady(page: Page, maxMs = 25000): Promise<void> {
  const deadline = Date.now() + maxMs;
  const remaining = (): number => Math.max(1000, deadline - Date.now());
  await page
    .getByRole('button', { name: 'Recalculate' })
    .first()
    .waitFor({ state: 'visible', timeout: remaining() })
    .catch(() => undefined);
  for (const [sel] of HEADER_SELECT_FIELDS) {
    await page.locator(sel).first().waitFor({ state: 'visible', timeout: remaining() }).catch(() => undefined);
  }
  await page
    .locator('[id^="boundarySim."][id$=".futilityHR"]')
    .first()
    .waitFor({ state: 'attached', timeout: remaining() })
    .catch(() => undefined);
  await page.locator('#spinner').first().waitFor({ state: 'hidden', timeout: 5000 }).catch(() => undefined);
  await page.waitForTimeout(400);
  const missing: string[] = [];
  for (const [sel, col] of HEADER_SELECT_FIELDS) {
    if (!(await page.locator(sel).first().count().catch(() => 0))) missing.push(col);
  }
  if (missing.length) {
    logger.warn(`enterDesignHeader: Design tab still missing select(s) after readiness wait: ${missing.join(', ')}`);
  } else {
    logger.info('enterDesignHeader: Design tab ready (selects + boundary grid rendered).');
  }
}

/**
 * Wait for the app's auto-recompute to fully settle after a header field commits. Tabbing
 * out of an interdependent header field (Sample Size / Number of Events) fires an immediate
 * background recompute behind the `#spinner` overlay. Editing the NEXT field — or clicking
 * Recalculate — while that recompute is still in flight lands on a half-updated
 * group-sequential model and the solve reports "Prior parameters are too extreme" (proven:
 * the SAME 500/88 header computes fine by hand, where each edit settles before the next).
 * A human implicitly waits for the grid to stop spinning; mirror that between every edit.
 */
async function settleAfterEdit(page: Page): Promise<void> {
  await page.waitForTimeout(300);
  // Let the spinner APPEAR (if it's going to) then fully clear, so we don't race past a
  // recompute that hasn't started yet.
  await page.locator('#spinner').first().waitFor({ state: 'visible', timeout: 1500 }).catch(() => undefined);
  await page.locator('#spinner').first().waitFor({ state: 'hidden', timeout: 20000 }).catch(() => undefined);
  await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => undefined);
  await page.waitForTimeout(600);
}

/**
 * Mount the Response tab into the app model before the Design-tab Recalculate. PROVEN by
 * diffing the automated vs. manual `/engine/boundary` request payloads: the sim's Recalculate
 * payload builds `testParams` — the EFFECT SIZE (control/treatment hazard rates) — from the
 * Response tab's model, but that model is only populated once the Response tab has been
 * MOUNTED. The sim configures the Design header and Recalculates BEFORE ever visiting
 * Response, so the automated payload omits `testParams` entirely and the solver returns
 * "prior parameters too extreme" (returnValue -10001) — while a human, whose Response model
 * was already loaded, gets a clean solve. Visiting Response (so its inputs bind) then
 * returning to Design makes the automated payload carry the hazard rates like the manual one.
 * Called at the START of enterDesignHeader (before the header edits) so the round-trip can't
 * disturb the Sample Size / Events overrides.
 */
async function loadResponseTabIntoModel(page: Page): Promise<void> {
  const response = page.getByRole('button', { name: 'Response' }).first();
  if (!(await response.count().catch(() => 0))) {
    logger.warn('enterDesignHeader: Response tab not found — cannot preload testParams (hazard rates).');
    return;
  }
  await response.click({ timeout: 8000 }).catch(() => undefined);
  // Wait for a Response-tab input to render so its values bind into the model.
  await page
    .locator('[id^="inputMethodTable."], [id*="hazardRate"], #accrualInfoInputMethod')
    .first()
    .waitFor({ state: 'visible', timeout: 12000 })
    .catch(() => undefined);
  await page.waitForTimeout(800);
  // Return to the Design tab and wait for it to be ready again.
  await page.locator('[id="leftPanel.designs"]').first().click({ timeout: 8000 }).catch(() => undefined);
  await page
    .getByRole('button', { name: 'Recalculate' })
    .first()
    .waitFor({ state: 'visible', timeout: 12000 })
    .catch(() => undefined);
  await page.waitForTimeout(500);
  logger.info('enterDesignHeader: preloaded Response tab into the model (testParams / hazard rates).');
}

/**
 * Enter the sim's design-header overrides, only TOUCHING a field whose live value
 * DIFFERS from the target. Two reasons this is a custom step and not plain fill/select:
 *
 *  1) Re-selecting/re-filling an ALREADY-CORRECT interdependent header field (Sample
 *     Size / Number of Events / Fix at Each Analysis / Test Statistic) marks it
 *     "user-modified" and over-constrains the group-sequential solver, so the later
 *     Recalculate reports "Prior parameters are too extreme" and never computes the
 *     Final row. Leaving correct fields untouched (as a human does) keeps the inherited
 *     design valid. Plain fill/select metadata steps re-touch every field every run —
 *     verified: raw re-entry reproduces the "too extreme" failure, this does not.
 *
 *  2) SELECTS run BEFORE the text fields, because some text inputs only RENDER after a
 *     select is set — notably Harrington-Fleming's p and q, which exist only once the
 *     Test Statistic is Harrington-Fleming. Filling p/q before selecting the statistic
 *     would silently skip them (fields not on the page yet).
 *
 * N/A values and not-rendered fields are skipped. Real per-key typing + Tab commits the
 * value the way the app's reactive handlers expect.
 */
export const enterDesignHeader: KeywordHandler = async (page, ctx, step) => {
  let changed = 0;
  let kept = 0;
  // Do not touch the header until the Design tab has fully bound — editing a half-rendered
  // model is what triggers the later "prior too extreme" (see waitForDesignTabReady).
  await waitForDesignTabReady(page);
  // Preload the Response tab so the Recalculate payload carries the effect size (hazard
  // rates → testParams). Without this the solver gets no treatment effect and returns
  // "prior too extreme" (-10001). Done BEFORE the header edits so it can't disturb them.
  await loadResponseTabIntoModel(page);
  await waitForDesignTabReady(page);
  // SELECTS FIRST — a select may reveal dependent text inputs (e.g. Harrington-Fleming p/q).
  for (const [sel, col] of HEADER_SELECT_FIELDS) {
    const want = simValue(ctx, col);
    if (isNA(want)) continue;
    const loc = page.locator(sel).first();
    if (!(await loc.count().catch(() => 0))) {
      logger.info(`enterDesignHeader: ${col} not rendered — skip`);
      continue;
    }
    const curVal = (await loc.inputValue().catch(() => '')).trim();
    const curText = (await selText(page, sel)).trim();
    const w = want.trim();
    if (curVal.toLowerCase() === w.toLowerCase() || curText.toLowerCase() === w.toLowerCase()) {
      kept++;
      logger.info(`enterDesignHeader: ${col} already "${curText}" — leave untouched`);
      continue;
    }
    logger.info(`enterDesignHeader: ${col} "${curText}" -> "${want}" (select)`);
    await loc.selectOption({ label: want }).catch(async () => {
      await loc
        .selectOption(want)
        .catch(() => logger.warn(`enterDesignHeader: could not select "${want}" for ${col}`));
    });
    changed++;
  }
  // THEN text fields — p/q etc. are now rendered if their governing select was just set.
  for (const [sel, col] of HEADER_TEXT_FIELDS) {
    const want = simValue(ctx, col);
    if (isNA(want)) continue;
    const loc = page.locator(sel).first();
    if (!(await loc.count().catch(() => 0))) {
      // A non-N/A target means the field SHOULD exist; it may be conditionally rendered
      // by a select we just set (Harrington-Fleming's p/q appear only after Test
      // Statistic = Harrington-Fleming) and lag a beat behind the select. Wait briefly
      // before giving up so we don't silently skip p/q on a design that wasn't already HF.
      await loc.waitFor({ state: 'visible', timeout: 6000 }).catch(() => undefined);
    }
    if (!(await loc.count().catch(() => 0))) {
      logger.info(`enterDesignHeader: ${col} not rendered — skip`);
      continue;
    }
    const cur = (await loc.inputValue().catch(() => '')).trim();
    if (cur === want.trim()) {
      kept++;
      logger.info(`enterDesignHeader: ${col} already "${cur}" — leave untouched`);
      continue;
    }
    logger.info(`enterDesignHeader: ${col} "${cur || '∅'}" -> "${want}" (type)`);
    await loc.click({ timeout: step.timeout }).catch(() => undefined);
    await loc.press('Control+a').catch(() => undefined);
    await loc.press('Delete').catch(() => undefined);
    await loc.pressSequentially(want, { delay: 60 });
    await loc.press('Tab').catch(() => undefined);
    // Wait for THIS edit's auto-recompute to finish before touching the next field — the
    // fix for "prior too extreme" (a second edit landing mid-recompute corrupts the model).
    await settleAfterEdit(page);
    changed++;
  }
  logger.info(`enterDesignHeader: done — ${changed} field(s) changed, ${kept} already-correct left untouched.`);
};

/**
 * Enter the sim's BOUNDARY-TABLE overrides on the Design tab, AFTER the header and BEFORE
 * Recalculate (flow: header → boundary table → Recalculate). Data-driven: fills every
 * `boundarySim.<n>.<field>` column the sim testdata provides a non-N/A value for — analysis
 * spacing, cum-alpha, efficacy (Z / p-value / upper / lower), futility HR — so new columns
 * added for future iterations are picked up automatically. The boundary cell's DOM id equals
 * the testdata column name (e.g. `boundarySim.0.analysisSpacingInfo`), verified against the
 * live locators. Same discipline as the header: fill-if-changed (re-typing an already-correct
 * cell over-constrains the solver), settle after each edit (a second edit mid-recompute is
 * what produced "prior too extreme"), and skip N/A / not-rendered / app-computed (readonly)
 * cells. Rows are processed top-down (index 0,1,2,…) so spacing stays monotonic as it commits.
 */
export const enterBoundaryTable: KeywordHandler = async (page, ctx, step) => {
  const parsed = ctx.feature.testDataParsed.get('simulation');
  const row = parsed?.records.find(
    (r) => r.data['TC_ID'] === ctx.tcId && r.data['IterationID'] === ctx.iterationId,
  )?.data;
  if (!parsed || !row) {
    logger.info('enterBoundaryTable: no simulation testdata row — nothing to enter.');
    return;
  }
  const cols = parsed.headers
    .filter((h) => /^boundarySim\.\d+\./.test(h))
    .sort((a, b) => Number(a.split('.')[1]) - Number(b.split('.')[1]) || a.localeCompare(b));
  let changed = 0;
  let skipped = 0;
  for (const col of cols) {
    const want = row[col];
    if (isNA(want)) {
      skipped++;
      continue;
    }
    const loc = page.locator(`[id="${col}"]`).first();
    if (!(await loc.count().catch(() => 0))) {
      await loc.waitFor({ state: 'visible', timeout: 4000 }).catch(() => undefined);
    }
    if (!(await loc.count().catch(() => 0))) {
      logger.info(`enterBoundaryTable: ${col} not rendered — skip`);
      continue;
    }
    if (!(await loc.isEditable().catch(() => false))) {
      logger.info(`enterBoundaryTable: ${col} not editable (app-computed) — skip`);
      continue;
    }
    const cur = (await loc.inputValue().catch(() => '')).trim();
    if (cur === want.trim()) {
      logger.info(`enterBoundaryTable: ${col} already "${cur}" — leave untouched`);
      continue;
    }
    logger.info(`enterBoundaryTable: ${col} "${cur || '∅'}" -> "${want}"`);
    await loc.click({ timeout: step.timeout }).catch(() => undefined);
    await loc.press('Control+a').catch(() => undefined);
    await loc.press('Delete').catch(() => undefined);
    await loc.pressSequentially(want, { delay: 60 });
    await loc.press('Tab').catch(() => undefined);
    await settleAfterEdit(page);
    changed++;
  }
  logger.info(`enterBoundaryTable: done — ${changed} cell(s) changed, ${skipped} N/A skipped.`);
};

/**
 * Has the boundary FINAL row's Futility HR repopulated? The tester's own "recompute
 * finished" signal. The Final row is the HIGHEST-indexed boundarySim.<n>.futilityHR
 * cell (interims 0..n-1 keep their inherited values even mid-recompute; the Final
 * cell is cleared on header re-entry and refills only when the recompute completes).
 */
async function finalFutilityFilled(page: Page): Promise<boolean> {
  return page
    .locator('[id^="boundarySim."][id$=".futilityHR"]')
    .evaluateAll((els) => {
      let maxIdx = -1;
      let maxVal = '';
      for (const e of els) {
        const m = /boundarySim\.(\d+)\.futilityHR/.exec((e as HTMLElement).id);
        if (m && Number(m[1]) > maxIdx) {
          maxIdx = Number(m[1]);
          maxVal = (e as HTMLInputElement).value ?? '';
        }
      }
      return maxIdx >= 0 && maxVal.trim() !== '';
    })
    .catch(() => false);
}

/** Does this design have a futility boundary at all? (No `boundarySim.*.futilityHR` cells =
 * futBoundaryFam=None, e.g. ITER_02/03 — there is no Final Futility HR to solve or wait for.) */
async function hasFutilityBoundary(page: Page): Promise<boolean> {
  return (
    (await page.locator('[id^="boundarySim."][id$=".futilityHR"]').count().catch(() => 0)) > 0
  );
}

/** Dismiss the "Prior parameters are too extreme" toast so a stale one doesn't linger. */
async function dismissExtremeToast(page: Page): Promise<void> {
  const toast = page.getByText('Prior parameters are too extreme', { exact: false }).first();
  if (!(await toast.isVisible().catch(() => false))) return;
  const container = toast.locator('xpath=ancestor::*[self::div][1]');
  const close = container.locator('button, [aria-label="Close"], .btn-close, .close').first();
  await close.click({ timeout: 3000 }).catch(() => undefined);
}

/**
 * Re-enable Recalculate after a failed "too extreme" compute. That failure clears the
 * design's dirty flag and DISABLES Recalculate while the Final row is still empty. Re-typing
 * a field to its SAME committed value does NOT re-dirty it (the app sees no net change) — that
 * is why earlier "retries" were silent no-ops and never landed a real second attempt. Nudge
 * Sample Size to a DIFFERENT value and back to the target so a genuine change event fires and
 * Recalculate re-enables, ending on the correct value.
 */
async function reNudgeSampleSize(page: Page, ctx: RunContext, timeout: number): Promise<void> {
  const want = simValue(ctx, 'sampleSize');
  if (isNA(want)) return;
  const loc = page.locator('#sampleSize').first();
  if (!(await loc.count().catch(() => 0))) return;
  const target = want.trim();
  const bump = /^\d+(\.\d+)?$/.test(target) ? String(Number(target) + 1) : `${target}0`;
  for (const v of [bump, target]) {
    await loc.click({ timeout }).catch(() => undefined);
    await loc.press('Control+a').catch(() => undefined);
    await loc.press('Delete').catch(() => undefined);
    await loc.pressSequentially(v, { delay: 40 });
    await loc.press('Tab').catch(() => undefined);
    await settleAfterEdit(page);
  }
}

/**
 * Wait for the boundary recompute to finish: Final Futility HR populated, no "too
 * extreme", and — for adaptation iterations — #adaptationMethod usable. Returns true on
 * success; returns false FAST once "too extreme" has persisted a few seconds, so the
 * caller can dismiss the toast and retry a fresh recompute.
 */
async function waitForRecompute(page: Page, needsAdaptation: boolean, maxMs: number): Promise<boolean> {
  // Designs with futBoundaryFam=None (e.g. ITER_02/03) have NO Final Futility HR to fill, so
  // finalFutilityFilled can never be the "done" signal for them — the recompute is done once
  // the spinner clears with no "too extreme". Detect which kind of design this is up front.
  const hasFutility = await hasFutilityBoundary(page);
  const deadline = Date.now() + maxMs;
  const start = Date.now();
  let extremeSince = 0;
  while (Date.now() < deadline) {
    const extreme = await priorTooExtreme(page);
    const adaptOk = !needsAdaptation || (await page.locator('#adaptationMethod').isEnabled().catch(() => false));
    let done: boolean;
    if (hasFutility) {
      done = await finalFutilityFilled(page);
    } else {
      // No futility boundary: done once the compute spinner has cleared, after a short grace
      // so we don't pass before it even starts.
      const spinner = await page.locator('#spinner').first().isVisible().catch(() => false);
      done = !spinner && Date.now() - start > 2500;
    }
    if (done && !extreme && adaptOk) return true;
    if (extreme) {
      if (extremeSince === 0) extremeSince = Date.now();
      else if (Date.now() - extremeSince > 4000) return false;
    } else {
      extremeSince = 0;
    }
    await page.waitForTimeout(500);
  }
  return false;
}

/**
 * Click "Recalculate" and wait for the boundary recompute to finish. Prerequisite for the
 * solve to succeed: the Recalculate payload must carry the effect size — `enterDesignHeader`
 * mounts the Response tab first (`loadResponseTabIntoModel`) so the hazard rates are in the
 * model; without them the solver returns "Prior parameters are too extreme" (the real root
 * cause, see GADAR_SIM_NOTES.md §1). If a header/boundary edit left the design invalid the
 * button can stay disabled with an empty Final — re-nudge Sample Size (reNudgeSampleSize
 * genuinely re-dirties) and take another real attempt. A design with no futility boundary
 * (futBoundaryFam=None) has no Final Futility HR to fill, so "disabled + no error" is done.
 */
export const clickRecalculate: KeywordHandler = async (page, ctx, step) => {
  await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => undefined);
  // Ensure the header edits' auto-recompute has fully settled before we click Recalculate —
  // clicking over an in-flight recompute is what produced "prior too extreme".
  await page.locator('#spinner').first().waitFor({ state: 'hidden', timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(500);

  const btn = page.getByRole('button', { name: 'Recalculate' }).first();
  const appeared = await btn
    .waitFor({ state: 'visible', timeout: Math.min(step.timeout, 10000) })
    .then(() => true)
    .catch(() => false);
  if (!appeared) {
    logger.info('clickRecalculate: no Recalculate button present — skipping');
    return;
  }

  const needsAdaptation = !isNA(simValue(ctx, 'adaptationMethod'));
  // Each retry is a genuine fresh attempt — reNudgeSampleSize really re-dirties the design so
  // Recalculate re-enables (a plain re-type of the same value would not).
  const MAX_ATTEMPTS = 3;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    // Recalculate enables asynchronously after the header edit. If it stays disabled,
    // the design was already valid (or nothing changed) — proceed.
    const enDeadline = Date.now() + 15000;
    let enabled = false;
    while (Date.now() < enDeadline) {
      if (await btn.isEnabled().catch(() => false)) { enabled = true; break; }
      await page.waitForTimeout(300);
    }
    if (!enabled) {
      if (await finalFutilityFilled(page)) {
        logger.info('clickRecalculate: Recalculate disabled and Final Futility HR already populated — design valid, proceeding.');
        return;
      }
      // Recalculate is DISABLED and the Final row is EMPTY. Two very different states:
      //  (a) NO "too extreme" toast → the design is simply valid — either the header edit
      //      auto-recomputed everything, or this design has NO futility boundary to solve
      //      (futBoundaryFam=None, e.g. ITER_02/03 Cumulative % Survival), so there is no
      //      Final Futility HR to fill. Nothing to click; proceed.
      //  (b) "too extreme" IS showing → a failed compute cleared the dirty flag; a bare
      //      re-click is impossible, so re-dirty the header to re-enable Recalculate & retry.
      // Only treat "disabled + empty Final" as VALID when this design has no futility
      // boundary to solve (futBoundaryFam=None). A design that DOES have a futility boundary
      // but shows an empty Final is NOT done — its solve was blocked (e.g. an invalid
      // boundary cell left the field in error and Recalculate can't fire), so re-nudge and
      // retry rather than silently proceeding into a misleading downstream failure.
      if (!(await hasFutilityBoundary(page)) && !(await priorTooExtreme(page))) {
        logger.info('clickRecalculate: Recalculate disabled, empty Final, no futility boundary and no "too extreme" — design valid; proceeding.');
        return;
      }
      logger.warn(`clickRecalculate: attempt ${attempt}/${MAX_ATTEMPTS}: Recalculate disabled with an empty Final (futility design or "too extreme") — re-nudging Sample Size to re-enable it.`);
      await dismissExtremeToast(page);
      await reNudgeSampleSize(page, ctx, step.timeout);
      const reDeadline = Date.now() + 12000;
      while (Date.now() < reDeadline) {
        if (await btn.isEnabled().catch(() => false)) { enabled = true; break; }
        await page.waitForTimeout(300);
      }
      if (!enabled) {
        if (await finalFutilityFilled(page)) {
          logger.info('clickRecalculate: Final Futility HR populated after re-nudge — proceeding.');
          return;
        }
        logger.warn(`clickRecalculate: attempt ${attempt}: could not re-enable Recalculate after re-nudge — retrying.`);
        continue;
      }
    }

    await btn.click({ timeout: step.timeout });
    logger.info(`clickRecalculate: attempt ${attempt}/${MAX_ATTEMPTS} clicked Recalculate; waiting for the recompute${needsAdaptation ? ' (Adaptation Method must re-enable)' : ''}…`);

    if (await waitForRecompute(page, needsAdaptation, 25000)) {
      logger.info(`clickRecalculate: recompute complete on attempt ${attempt} (Final Futility HR populated${needsAdaptation ? ', Adaptation Method enabled' : ''}).`);
      return;
    }

    logger.warn(`clickRecalculate: attempt ${attempt}/${MAX_ATTEMPTS} hit "Prior parameters are too extreme" (Final row empty) — dismissing the toast and retrying a fresh recompute.`);
    await dismissExtremeToast(page);
    await page.waitForTimeout(1500);
  }

  throw new Error(
    `clickRecalculate: boundary recompute did not complete after ${MAX_ATTEMPTS} attempts — the Final Futility HR is still empty / "Prior parameters are too extreme" persists. The design is not valid for the following steps.`,
  );
};

export default reconcileSurvivalPeriods;
