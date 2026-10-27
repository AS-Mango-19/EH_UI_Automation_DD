/**
 * Input keywords: click, doubleClick, rightClick, fill, type, clear, select,
 * check, uncheck, upload, hover, press, dragAndDrop.
 */
import type { Page } from 'playwright';
import type { KeywordHandler } from './types.js';
import { targetLocator } from './util.js';
import { selectorKey } from '../loaders/featureLoader.js';
import { resolveLocator, type LocatorRoot } from '../locators/resolver.js';
import { logger, mask } from '../utils/logger.js';
import { FrameworkError } from '../utils/errors.js';
import { sleep as sleepMs } from '../utils/retry.js';

/**
 * Best-effort wait for the app's global loading overlay (#spinner) to clear BEFORE a
 * value-entering action. That overlay both intercepts pointer events and gates when the
 * target field mounts, so on a slow tab/page transition fill/check/select/type — which,
 * unlike `click`, do NOT force-retry/DOM-dispatch through it — otherwise race the
 * still-loading page and throw a "not found"/timeout for a field that simply had not
 * rendered yet. NO-OP when the overlay is absent or already hidden (waitFor 'hidden'
 * resolves instantly, including when #spinner is detached), and bounded so a genuinely
 * stuck spinner never hangs the step — we then proceed and let the action's own timeout
 * surface the real error. Gives value-entering keywords the transition-resilience that
 * `click` already has. Cheap on a settled page; only actually waits mid-transition.
 */
async function settleLoadingOverlay(page: Page): Promise<void> {
  await page.locator('#spinner').first().waitFor({ state: 'hidden', timeout: 60000 }).catch(() => undefined);
}

function buildFallbackLocator(root: Parameters<typeof targetLocator>[0]['root'] extends (...args: never[]) => infer R ? R : never, fallback: string) {
  return root.locator(fallback.startsWith('//') || fallback.startsWith('xpath=') ? fallback : fallback);
}

function parseGroupedOptionLabel(input: string): { label: string; category?: string } {
  const trimmed = input.trim();
  const match = /^(.*)\s+\(([^()]+)\)$/.exec(trimmed);
  if (!match) {
    return { label: trimmed };
  }
  return { label: match[1]!.trim(), category: match[2]!.trim() };
}

/**
 * Click a menu choice by visible name, covering every role a custom dropdown may
 * render its options with — option (ARIA listbox), link (Bootstrap dropdown-item),
 * menuitem — exact first, then SUBSTRING. Substring is essential: Playwright
 * codegen frequently truncates a long option's accessible name (e.g. records
 * "One Arm Exploratory /" for "One Arm Exploratory / Confirmatory"), and an exact
 * match on the truncated string never lands. Returns false when NO real choice
 * matched, so the caller can escalate instead of a silent no-op success.
 */
async function clickMenuChoice(page: LocatorRoot, label: string, timeout: number): Promise<boolean> {
  const attempts: Array<() => ReturnType<LocatorRoot['getByText']>> = [
    () => page.getByRole('option', { name: label, exact: true }).first(),
    () => page.getByRole('link', { name: label, exact: true }).first(),
    () => page.getByRole('menuitem', { name: label, exact: true }).first(),
    () => page.getByText(label, { exact: true }).first(),
    () => page.getByRole('option', { name: label }).first(),
    () => page.getByRole('link', { name: label }).first(),
    () => page.getByRole('menuitem', { name: label }).first(),
  ];
  // The menu was JUST opened by the trigger click; its options often animate in a
  // beat later. A bare count() the instant after opening races that render and
  // finds zero — the bug that made link menus fall through to a no-op keyboard
  // "success". So first WAIT (briefly) for any matching choice to become visible,
  // then click. Race resolves the moment the first candidate appears, or after
  // the short timeout if nothing matches (then we return false and the caller
  // escalates honestly).
  await Promise.race(
    attempts.map((make) => make().waitFor({ state: 'visible', timeout: 3000 }).then(() => true).catch(() => false)),
  ).catch(() => undefined);
  for (const make of attempts) {
    const loc = make();
    if (await loc.count().catch(() => 0)) {
      await loc.click({ timeout });
      return true;
    }
  }
  return false;
}

/**
 * Click `label` inside the option group headed by `category`.
 *
 * Grouped custom dropdowns render a heading followed by its options:
 *   <div class="...__group">
 *     <div class="...__group-heading">Parallel Design</div>
 *     <div class="...__option" role="option">Ratio of Means</div>
 *   </div>
 * The SAME option name repeats across groups — "Ratio of Means" exists under
 * both "Parallel Design" and "Crossover Design" — so an option is only
 * identified by (group, label). Matching on the label alone and taking .first()
 * silently picks whichever group renders first, which is a wrong-value PASS
 * rather than a failure. Testdata carries the combined form the control
 * displays: "Ratio of Means (Parallel Design)".
 */
async function clickOptionInGroup(
  page: LocatorRoot,
  label: string,
  category: string,
  timeout: number,
): Promise<boolean> {
  const heading = page
    .locator('[class*="group-heading"]')
    .filter({ hasText: new RegExp(`^\\s*${category.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`) })
    .first();
  if (!(await heading.count().catch(() => 0))) return false;
  // The options are siblings of the heading, under the shared group container.
  const group = heading.locator('xpath=..');
  for (const option of [
    group.getByRole('option', { name: label, exact: true }).first(),
    group.getByText(label, { exact: true }).first(),
  ]) {
    if (await option.count().catch(() => 0)) {
      await option.click({ timeout });
      return true;
    }
  }
  return false;
}

/**
 * Controls a `label`-typed selector may point at, in the app's own markup.
 * `button` and `select` are element selectors on purpose: `[role="button"]` only
 * matches an EXPLICIT role attribute, so a plain <button> — which is how every
 * Bootstrap-style dropdown here is built — would otherwise be missed and the
 * label walk would silently fall through to a non-interactive element.
 */
const INTERACTIVE_CONTROL =
  'input, textarea, select, button, [role="combobox"], [role="button"], [role="listbox"], [aria-haspopup="listbox"], [aria-haspopup="true"]';

async function resolveLabelInteractiveTarget(ctx: Parameters<typeof targetLocator>[0], step: Parameters<typeof targetLocator>[1]): Promise<Awaited<ReturnType<typeof targetLocator>>> {
  const selector = ctx.feature.selectorIndex.get(selectorKey(step.page, step.objectName));
  const direct = await targetLocator(ctx, step);
  if (!selector || selector.SelectorType !== 'label') {
    return direct;
  }

  const labelText = selector.SelectorValue;
  const label = ctx.root().getByText(labelText, { exact: true }).first();
  const candidates = [
    label.locator('xpath=following-sibling::*[1]').locator(INTERACTIVE_CONTROL).first(),
    label.locator('xpath=..').locator(INTERACTIVE_CONTROL).first(),
    direct,
  ];

  for (const candidate of candidates) {
    if (await candidate.count().catch(() => 0)) {
      return candidate;
    }
  }

  return direct;
}

export const click: KeywordHandler = async (_page, ctx, step) => {
  const selector = ctx.feature.selectorIndex.get(selectorKey(step.page, step.objectName));
  const loc = await resolveLabelInteractiveTarget(ctx, step);
  const fallbackLoc = selector?.FallbackSelector ? buildFallbackLocator(ctx.root(), selector.FallbackSelector) : null;
  const locCount = await loc.count().catch(() => 0);
  const labelFallback = selector?.SelectorType === 'label'
    ? ctx.root().getByText(selector.SelectorValue, { exact: true }).first()
    : null;
  // An OPTIONAL click on an absent target is a no-op, not a failure — e.g. dismissing
  // a toast/banner that may or may not be showing. Probe with NO wait and skip if gone.
  if (step.raw.Optional && !labelFallback && locCount === 0) {
    logger.warn(`OPTIONAL click ${step.objectName}: target not present — skipping (warning only).`);
    return;
  }
  const target = locCount > 0 ? loc : labelFallback ?? loc;
  // Some buttons are permanently overlapped by a fixed toast/banner (e.g. GADAR's
  // "Please click Calculate" info bar sits on top of the Calculate button). A normal
  // or even force click lands on the banner, so the button's handler never fires — a
  // direct DOM .click() dispatches straight to the element and actually triggers it.
  if (step.objectName === 'btn_New_Project' || step.objectName === 'btn_Calculate') {
    // The direct-DOM bypass below defeats Playwright's actionability checks entirely
    // (that's the point, to get past the banner) — but that also means a NATIVE
    // disabled `<button>`'s `.click()` silently no-ops in the browser: no exception,
    // no warning, the step just reports success having done nothing. Confirmed live
    // (GADAR(PD) Enrollment's Accrual `#accrualCalculate`, 2026-10-16): the click was
    // "passing" every run while the button sat disabled the whole time. Two explicit
    // checks close that gap: NOT FOUND must fail loudly (never silently skip a
    // required control); FOUND-BUT-DISABLED must not silently no-op either — it may
    // be a legitimate data-driven state (e.g. a Calculate that only enables once a
    // specific optional field is filled) or a real missing-data bug, so it goes on
    // ctx.soft (the same mechanism softAssertValue/softAssertText already use) —
    // execution continues, but the iteration's final status becomes FAIL with this
    // exact reason, so it can never pass unreviewed.
    const count = await loc.count().catch(() => 0);
    if (count === 0) {
      throw new FrameworkError(
        `click: "${step.objectName}" was not found on the page — the control may be missing, mis-selected, or not yet rendered`,
        { stepId: step.stepId },
      );
    }
    // Calculate is SUPPOSED to go disabled again once it has successfully computed —
    // that's its normal end state, not a problem (user confirmed, 2026-10-19). Several
    // features (StratGADAR, StratGADSD) click this same button 2-3 times across a
    // multi-stage boundary form as each stage reveals more fields. A re-click only means
    // something if NEW data was entered since THIS button's own last successful click —
    // otherwise it is still correctly showing the first click's own success, and treating
    // that as noteworthy produced false soft-fails on 9/10 StratGADSD iterations whose
    // compareWithBaseline all genuinely passed. Skip silently (no poll, no soft-fail) when
    // nothing changed since the last successful click of this exact button.
    // A soft-failed (disabled, no-op) click still reports stepResults status 'passed' — the
    // handler returned normally instead of throwing, so "didn't error" and "actually fired"
    // are NOT the same thing here. Confirmed live (StratGADAR ITER_05, 2026-10-19): a
    // disabled 2nd click was wrongly counted as the "last successful click", which hid a
    // real fill that happened afterward and caused the 3rd (final) click to be wrongly
    // skipped while the page was genuinely still unsaved — cross-check ctx.soft (which a
    // soft-fail DOES always append to, independent of stepResults) to find a click's true
    // outcome, not just whether it threw.
    const disabledPrefix = `click ${step.objectName}: button is DISABLED`;
    const softFailedStepIds = new Set(
      ctx.soft.filter((s) => s.message.startsWith(disabledPrefix)).map((s) => s.stepId),
    );
    const lastSuccessIdx = (() => {
      for (let i = ctx.stepResults.length - 1; i >= 0; i--) {
        const r = ctx.stepResults[i]!;
        if (
          r.action === 'click' &&
          r.objectName === step.objectName &&
          r.status === 'passed' &&
          !softFailedStepIds.has(r.stepId)
        ) {
          return i;
        }
      }
      return -1;
    })();
    if (lastSuccessIdx >= 0) {
      // 'check'/'uncheck' deliberately excluded: this codebase's boundary-table flows use a
      // dedicated loopPeriods pass (e.g. StratGADAR/StratGADSD's "RE-APPLY the boundary
      // efficacyCheck/futilityCheck" step) specifically to re-assert checkbox state a prior
      // Calculate may have silently reset — by its own documented purpose that's a defensive
      // re-affirmation, not new data entry. Counting it as "new" caused a confirmed false
      // soft-fail (StratGADSD ITER_02, 2026-10-19): the boundary table was already fully
      // computed, re-asserting checkboxes is all that ran before the next Calculate, and that
      // got misread as "something changed, re-verify" when nothing actually had.
      const enteredSince = ctx.stepResults
        .slice(lastSuccessIdx + 1)
        .some((r) => ['fill', 'select'].includes(r.action) && r.status === 'passed');
      if (!enteredSince) {
        logger.info(
          `click ${step.objectName}: skipped — already computed successfully and nothing new entered since; a disabled state here is expected, not reviewed as a failure.`,
        );
        return;
      }
    }
    // A disabled Calculate right after the preceding fills isn't necessarily final: GADAR/
    // StratGADAR/StratGADSD enable it off the page's OWN change (table edit, inputParameter
    // select, a multi-period boundary table), and automation can outrun the app's post-fill
    // validation by the time this step runs. Confirmed live (2026-10-16 GADAR(PD), 2026-10-19
    // StratGADSD): real data entered, Calculate still read disabled on a quick check — and
    // WHICH of a multi-stage form's 2-3 Calculate clicks lags is inconsistent per iteration
    // (StratGADSD ITER_02 lagged on the 3rd click, ITER_06 on the 1st and 2nd), so a fixed
    // short poll or a hand-placed settle sleep before one specific click both missed it. Poll
    // for the step's own configured Timeout instead of a short hardcoded window — it already
    // varies per Calculate step (10-15s across these features) and self-adapts to whichever
    // click turns out to be slow. This still correctly falls through to the soft-fail below for
    // a GENUINE data-gated disable (e.g. StratGADAR's inputParameter=None, nothing to
    // calculate), it just stops mistaking "hasn't caught up yet" for that.
    const enableDeadline = Date.now() + step.timeout;
    let isDisabled = await target.isDisabled().catch(() => true);
    while (isDisabled && Date.now() < enableDeadline) {
      await sleepMs(250);
      isDisabled = await target.isDisabled().catch(() => true);
    }
    if (isDisabled) {
      const message = `click ${step.objectName}: button is DISABLED, click skipped — this may be expected for this iteration's data combination, or may indicate a missing/unfilled required field upstream. Review this iteration's screenshots/data before trusting its result.`;
      logger.warn(message);
      ctx.soft.push({ stepId: step.stepId, message });
      return;
    }
    try {
      await target.evaluate((element) => (element as HTMLElement).click());
      // This click succeeded — if an EARLIER click of this exact button was soft-failed as
      // disabled, that was premature-but-expected friction in a multi-stage reveal form, not
      // a real problem. Confirmed live (StratGADSD ITER_06, 2026-10-19): a 3-click boundary
      // Calculate sequence found the first two attempts disabled (later-stage fields genuinely
      // not filled yet — by design), soft-failed each as intended, then the third attempt
      // succeeded once everything was in, with a fully correct result (compareWithBaseline
      // passed). Only the LAST attempt of a given button reflects its real final state, so
      // clear any earlier soft-fails logged against this exact objectName this iteration — a
      // later success proves they were transient, not genuine. A button that never recovers
      // (e.g. StratGADAR's inputParameter=None) never reaches this line, so its soft-fail
      // correctly stands.
      const disabledPrefix = `click ${step.objectName}: button is DISABLED`;
      for (let i = ctx.soft.length - 1; i >= 0; i--) {
        if (ctx.soft[i]!.message.startsWith(disabledPrefix)) ctx.soft.splice(i, 1);
      }
      return;
    } catch (err) {
      logger.warn(`click: DOM click for ${step.objectName} failed after ${(err as Error).message}`);
    }
  }
  try {
    await target.click({ timeout: step.timeout });
  } catch (err) {
    logger.warn(`click: retrying ${step.objectName} with force=true after ${(err as Error).message}`);
    try {
      await target.click({ timeout: step.timeout, force: true });
    } catch {
      if (fallbackLoc) {
        logger.warn(`click: using fallback selector for ${step.objectName}`);
        await fallbackLoc.click({ timeout: step.timeout });
        return;
      }
      logger.warn(`click: dispatching DOM click for ${step.objectName}`);
      await target.dispatchEvent('click');
    }
  }
};

export const doubleClick: KeywordHandler = async (_page, ctx, step) => {
  await (await targetLocator(ctx, step)).dblclick({ timeout: step.timeout });
};

export const rightClick: KeywordHandler = async (_page, ctx, step) => {
  await (await targetLocator(ctx, step)).click({ button: 'right', timeout: step.timeout });
};

export const fill: KeywordHandler = async (_page, ctx, step) => {
  const want = step.input;
  // Rule: a testdata value of "Computed" marks the computed-OUTPUT field — the app
  // greys it out (disabled) and it must NOT be edited. This is the ONLY case a fill
  // is skipped. Every other testdata value is REQUIRED: it must be entered and then
  // verified below, so a value present in the testdata can never be silently dropped.
  if (/^computed$/i.test(want.trim())) {
    logger.info(`fill: "${step.objectName}" = "Computed" — computed-output field (disabled by the app), skipping.`);
    return;
  }
  await settleLoadingOverlay(_page);
  const loc = (await targetLocator(ctx, step)).first();
  // The field must be present. A missing field is a hard failure (clear message,
  // not a generic fill timeout) — the required value could not be entered.
  const found = await loc.waitFor({ state: 'attached', timeout: step.timeout }).then(() => true).catch(() => false);
  if (!found) {
    throw new FrameworkError(`fill: field "${step.objectName}" not found — required value could not be entered`, { stepId: step.stepId });
  }
  // The field must be editable. A required value cannot land in a disabled field,
  // so this fails rather than passing silently.
  if (await loc.isDisabled().catch(() => false)) {
    throw new FrameworkError(`fill: field "${step.objectName}" is disabled but testdata requires a value — "${mask(want)}" was not entered`, { stepId: step.stepId });
  }
  await loc.fill(want, { timeout: step.timeout });
  // "Must be entered" means verified: read the value back and confirm it took.
  // Only for standard inputs we can read (skip contenteditable/custom to stay stable).
  const readable = await loc.inputValue().then(() => true).catch(() => false);
  if (readable) {
    const settle = async (): Promise<string> => {
      await _page.waitForTimeout(200).catch(() => undefined); // allow an async commit/reformat
      return (await loc.inputValue().catch(() => '')).trim();
    };
    let got = (await loc.inputValue().catch(() => '')).trim();
    if (got !== want.trim()) got = await settle();
    if (got !== want.trim()) {
      // A one-shot fill() reverts on some grid cells — they commit only on
      // per-keystroke input + blur, so a bulk fill is discarded and the cell
      // snaps back to its model value ("Endpoint 1"). Escalate: focus,
      // select-all, type the value key-by-key, and commit with Tab. Only reached
      // when the plain fill did NOT hold, so normal fields are never affected.
      logger.warn(`fill: "${step.objectName}" did not hold after a plain fill (showed "${mask(got)}") — retrying key-by-key + commit.`);
      await loc.click({ timeout: step.timeout }).catch(() => undefined);
      await loc.press('Control+a').catch(() => undefined);
      await loc.pressSequentially(want, { delay: 30, timeout: step.timeout }).catch(() => undefined);
      await loc.press('Tab').catch(() => undefined);
      got = await settle();
    }
    if (got !== want.trim()) {
      throw new FrameworkError(`fill: field "${step.objectName}" did not accept the value — expected "${mask(want)}", field shows "${mask(got)}"`, { stepId: step.stepId });
    }
  }
  // Tab out of the field to fire its blur/change handler. Some controls only commit
  // (and only enable dependent buttons — e.g. the Enrollment "Calculate", disabled
  // until you tab out of the committed value) on blur, not on programmatic fill().
  await loc.press('Tab').catch(() => undefined);
};

export const type: KeywordHandler = async (page, ctx, step) => {
  await settleLoadingOverlay(page);
  await (await targetLocator(ctx, step)).pressSequentially(step.input, { timeout: step.timeout });
};

export const clear: KeywordHandler = async (_page, ctx, step) => {
  await (await targetLocator(ctx, step)).clear({ timeout: step.timeout });
};

/**
 * select: choose an <option> by visible label first (our testdata uses labels
 * like "Week", "Optimal"), falling back to value. ASSUMPTION: native <select>.
 * For a custom combobox, click the label-targeted control and commit the option.
 */
export const select: KeywordHandler = async (_page, ctx, step) => {
  await settleLoadingOverlay(_page);
  const selector = ctx.feature.selectorIndex.get(selectorKey(step.page, step.objectName));
  const loc = await resolveLabelInteractiveTarget(ctx, step);
  const fallbackLoc = selector?.FallbackSelector ? buildFallbackLocator(ctx.root(), selector.FallbackSelector) : null;
  // The previous step often triggers a re-render (e.g. clicking Continue mounts
  // the design form a beat later). Sampling count() instantly then races that
  // render, sees 0, and misclassifies a native <select> as a custom combobox —
  // which throws "unable to resolve". Only when the target is initially absent,
  // wait for it to attach and re-count; a present target pays no penalty.
  let locCount = await loc.count().catch(() => 0);
  if (locCount === 0) {
    await loc.first().waitFor({ state: 'attached', timeout: step.timeout }).catch(() => undefined);
    locCount = await loc.count().catch(() => 0);
  }
  const labelFallback = selector?.SelectorType === 'label'
    ? ctx.root().getByText(selector.SelectorValue, { exact: true }).first()
    : null;
  const target = locCount > 0 ? loc : labelFallback ?? loc;
  const isNativeSelect = locCount > 0
    ? await target.evaluate((element) => element.tagName.toLowerCase() === 'select').catch(() => false)
    : false;

  // A disabled control is fixed by another field (e.g. Test Type is forced to
  // "1-Sided" for Non-Inferiority; Input Method is fixed to "Ratio of Means" when
  // the ratio is the computed parameter). If it ALREADY shows the intended value
  // the intent is met — skip. If it shows something else, the app is in a state
  // the testdata disagrees with — fail. Mirrors `fill`'s disabled handling.
  if (locCount > 0 && (await target.isDisabled().catch(() => false))) {
    const want = step.input.trim();
    const shown: string[] = await target
      .evaluate((el) => {
        const sel = el as HTMLSelectElement;
        if (sel.options && typeof sel.selectedIndex === 'number' && sel.selectedIndex >= 0) {
          const opt = sel.options[sel.selectedIndex];
          return [opt?.text ?? '', opt?.value ?? '', sel.value ?? ''];
        }
        return [(el as HTMLInputElement).value ?? '', el.textContent ?? ''];
      })
      .catch(() => [] as string[]);
    if (shown.some((s) => String(s).trim() === want)) {
      logger.info(`select: "${step.objectName}" is disabled and already shows "${want}" — fixed by another field, skipping.`);
      return;
    }
    throw new FrameworkError(
      `select: field "${step.objectName}" is disabled and shows "${mask(String(shown[0] ?? ''))}", not the required "${mask(want)}"`,
      { stepId: step.stepId },
    );
  }

  if (!isNativeSelect) {
    logger.info(`select: using label-targeted combobox handling for ${step.objectName}.`);
    const grouped = parseGroupedOptionLabel(step.input);
    try {
      // Open the menu.
      await target.click({ timeout: step.timeout });
      // Grouped menus first: option names repeat across groups, so (group,label)
      // is the only unique identity. Must precede every name-only match below —
      // those would take .first() across all groups and pick the wrong one.
      if (grouped.category && (await clickOptionInGroup(ctx.root(), grouped.label, grouped.category, step.timeout))) {
        return;
      }
      // Click the actual option element — option / link / menuitem / exact text,
      // then substring (codegen truncates long option names). This is what makes
      // a link-based custom dropdown (trigger says "Select", options are <a>)
      // actually commit instead of silently no-op'ing on the keyboard fallback.
      if (await clickMenuChoice(ctx.root(), step.input, step.timeout)) {
        return;
      }
      // Ungrouped menu whose option text simply happens to contain parentheses.
      if (grouped.category && grouped.label !== step.input && (await clickMenuChoice(ctx.root(), grouped.label, step.timeout))) {
        return;
      }
      // Last resort: a searchable combobox that filters as you type. Only reached
      // when no option element matched — flagged loudly because, unlike a real
      // option click, this cannot confirm the value was actually selected.
      logger.warn(
        `select: no option element matched "${step.input}" for ${step.objectName}; using type+Enter fallback (a non-searchable menu will NOT select — check the value against the live options).`,
      );
      await _page.keyboard.type(step.input, { delay: 25 });
      await _page.keyboard.press('Enter');
      return;
    } catch {
      logger.warn(`select: primary path failed for ${step.objectName}; reopening and retrying option click for "${step.input}".`);
      try {
        await target.click({ timeout: step.timeout });
        if (await clickMenuChoice(ctx.root(), step.input, step.timeout)) {
          return;
        }
        if (grouped.category && grouped.label !== step.input && (await clickMenuChoice(ctx.root(), grouped.label, step.timeout))) {
          return;
        }
        if (fallbackLoc) {
          logger.warn(`select: using fallback selector for ${step.objectName}`);
          await fallbackLoc.click({ timeout: step.timeout });
          if (await clickMenuChoice(ctx.root(), step.input, step.timeout)) {
            return;
          }
          await _page.keyboard.type(step.input, { delay: 25 });
          await _page.keyboard.press('Enter');
          return;
        }
        throw new Error(`select: unable to resolve ${step.objectName}`);
      } catch {
        if (fallbackLoc) {
          logger.warn(`select: using fallback selector for ${step.objectName}`);
          await fallbackLoc.click({ timeout: step.timeout });
          await _page.keyboard.type(step.input, { delay: 25 });
          await _page.keyboard.press('Enter');
          return;
        }
        throw new Error(`select: unable to resolve ${step.objectName}`);
      }
    }
  }

  // Native <select>: read its real options and select by the matching option's VALUE.
  // Playwright's selectOption(string) matches value|label, but some React-controlled
  // selects reject a bare label/value match at automation speed; resolving the option
  // ourselves (value, then exact text, then substring) and committing by value is
  // reliable. Typing into a <select> never selects anything, so on no-match we fail
  // loudly WITH the option list instead of silently pretending to type.
  const want = step.input.trim();
  const opts: Array<{ value: string; text: string }> = await loc
    .first()
    .evaluate((el) => Array.from((el as HTMLSelectElement).options).map((o) => ({ value: o.value, text: (o.text || '').trim() })))
    .catch(() => []);
  const norm = (s: string): string => s.trim().toLowerCase();
  const hit =
    opts.find((o) => o.value === want) ||
    opts.find((o) => norm(o.text) === norm(want)) ||
    opts.find((o) => norm(o.text).includes(norm(want)) && norm(want).length >= 2);
  if (hit) {
    await loc.selectOption({ value: hit.value }, { timeout: step.timeout });
    // React-controlled <select>: the PREVIOUS field's change often re-mounts THIS
    // dropdown (e.g. choosing Distribution=Beta re-renders the Input Method select).
    // A selectOption that lands mid-re-render is silently discarded and the control
    // snaps back to its default — no error, wrong value, and the dependent fields
    // (percentile inputs) never appear. Mirror `fill`'s read-back: confirm the value
    // stuck; if it reverted, let the render settle and re-select once. A no-op on the
    // normal path (value already correct), so other features are unaffected.
    const current = async (): Promise<string> =>
      (await loc.first().evaluate((el) => (el as HTMLSelectElement).value).catch(() => '')).trim();
    if ((await current()) !== hit.value) {
      await _page.waitForTimeout(300).catch(() => undefined);
      await loc.selectOption({ value: hit.value }, { timeout: step.timeout }).catch(() => undefined);
      if ((await current()) !== hit.value) {
        logger.warn(`select: "${step.objectName}" did not hold value "${hit.value}" after re-select — the control may be re-rendering; proceeding with best effort.`);
      }
    }
    return;
  }
  // No option matched our own scan — try Playwright's matcher once more, then fail clearly.
  try {
    await loc.selectOption(want, { timeout: step.timeout });
    return;
  } catch {
    throw new FrameworkError(
      `select: native <select> "${step.objectName}" has no option matching "${mask(want)}". Options: [${opts.map((o) => `${o.value}=${o.text}`).join(' | ')}]`,
      { stepId: step.stepId },
    );
  }
};

export const check: KeywordHandler = async (page, ctx, step) => {
  await settleLoadingOverlay(page);
  await (await targetLocator(ctx, step)).check({ timeout: step.timeout });
};

export const uncheck: KeywordHandler = async (page, ctx, step) => {
  await settleLoadingOverlay(page);
  await (await targetLocator(ctx, step)).uncheck({ timeout: step.timeout });
};

/** upload: InputValue is a file path (may be pipe-separated for multiple files). */
export const upload: KeywordHandler = async (_page, ctx, step) => {
  const files = step.input.split('|').map((f) => f.trim()).filter(Boolean);
  await (await targetLocator(ctx, step)).setInputFiles(files, { timeout: step.timeout });
};

export const hover: KeywordHandler = async (_page, ctx, step) => {
  await (await targetLocator(ctx, step)).hover({ timeout: step.timeout });
};

/** press: InputValue is a key or chord, e.g. "Enter" or "Control+A". */
export const press: KeywordHandler = async (_page, ctx, step) => {
  await (await targetLocator(ctx, step)).press(step.input, { timeout: step.timeout });
};

/** dragAndDrop: ObjectName is the source; InputValue is the TARGET object name. */
export const dragAndDrop: KeywordHandler = async (_page, ctx, step) => {
  const source = await targetLocator(ctx, step);
  const target = await resolveLocator(ctx.root(), ctx.feature.selectorIndex, step.page, step.input);
  await source.dragTo(target, { timeout: step.timeout });
};
