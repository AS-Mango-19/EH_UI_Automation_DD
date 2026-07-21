/**
 * Input keywords: click, doubleClick, rightClick, fill, type, clear, select,
 * check, uncheck, upload, hover, press, dragAndDrop.
 */
import type { KeywordHandler } from './types.js';
import { targetLocator } from './util.js';
import { selectorKey } from '../loaders/featureLoader.js';
import { resolveLocator, type LocatorRoot } from '../locators/resolver.js';
import { logger, mask } from '../utils/logger.js';
import { FrameworkError } from '../utils/errors.js';

function buildFallbackLocator(root: Parameters<typeof targetLocator>[0]['root'] extends (...args: never[]) => infer R ? R : never, fallback: string) {
  return root.locator(fallback.startsWith('//') || fallback.startsWith('xpath=') ? fallback : fallback);
}

function parseGroupedOptionLabel(input: string): { label: string; category?: string } {
  const trimmed = input.trim();
  const match = /^(.*)\s+\(([^()]+)\)$/.exec(trimmed);
  if (!match) {
    return { label: trimmed };
  }
  return { label: match[1].trim(), category: match[2].trim() };
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
  const target = locCount > 0 ? loc : labelFallback ?? loc;
  if (step.objectName === 'btn_New_Project') {
    try {
      await target.evaluate((element) => (element as HTMLElement).click());
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
  const initial = await loc.inputValue().then((v) => ({ readable: true, v: v.trim() })).catch(() => ({ readable: false, v: '' }));
  if (initial.readable) {
    let got = initial.v;
    if (got !== want.trim()) {
      await _page.waitForTimeout(200).catch(() => undefined); // allow an async commit/reformat
      got = (await loc.inputValue().catch(() => '')).trim();
    }
    if (got !== want.trim()) {
      throw new FrameworkError(`fill: field "${step.objectName}" did not accept the value — expected "${mask(want)}", field shows "${mask(got)}"`, { stepId: step.stepId });
    }
  }
};

export const type: KeywordHandler = async (_page, ctx, step) => {
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

  try {
    await loc.selectOption({ label: step.input }, { timeout: step.timeout });
  } catch {
    logger.warn(`select: label "${step.input}" not matched on ${step.objectName}; retrying by value.`);
    try {
      await loc.selectOption(step.input, { timeout: step.timeout });
    } catch {
      logger.warn(`select: treating ${step.objectName} as a custom combobox and typing option "${step.input}".`);
      try {
        await loc.click({ timeout: step.timeout });
        await _page.keyboard.type(step.input, { delay: 25 });
        await _page.keyboard.press('Enter');
      } catch {
        logger.warn(`select: typing into ${step.objectName} failed; retrying option click for "${step.input}".`);
        await loc.click({ timeout: step.timeout });
        await ctx.root().getByRole('option', { name: step.input }).first().click({ timeout: step.timeout });
      }
    }
  }
};

export const check: KeywordHandler = async (_page, ctx, step) => {
  await (await targetLocator(ctx, step)).check({ timeout: step.timeout });
};

export const uncheck: KeywordHandler = async (_page, ctx, step) => {
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
