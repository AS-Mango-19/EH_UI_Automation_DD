/**
 * Navigation keywords: navigate, goBack, reload, switchTab, switchFrame.
 */
import type { Page } from 'playwright';
import type { KeywordHandler } from './types.js';
import { objectAndAttr } from './util.js';
import { FrameworkError } from '../utils/errors.js';

type GotoWait = 'load' | 'domcontentloaded' | 'networkidle' | 'commit';
function gotoWait(cond: string): GotoWait {
  switch (cond.trim().toLowerCase()) {
    case 'networkidle':
      return 'networkidle';
    case 'domcontentloaded':
      return 'domcontentloaded';
    case 'commit':
      return 'commit';
    default:
      return 'load';
  }
}

export const navigate: KeywordHandler = async (page, ctx, step) => {
  ctx.frame = null;
  await page.goto(step.input, { waitUntil: gotoWait(step.waitCondition), timeout: step.timeout });
};

export const goBack: KeywordHandler = async (page, ctx, step) => {
  ctx.frame = null;
  await page.goBack({ waitUntil: gotoWait(step.waitCondition), timeout: step.timeout });
};

export const reload: KeywordHandler = async (page, ctx, step) => {
  await page.reload({ waitUntil: gotoWait(step.waitCondition), timeout: step.timeout });
};

/** switchTab: InputValue is a 0-based index or a page-title substring. */
export const switchTab: KeywordHandler = async (page, ctx, step) => {
  const pages = page.context().pages();
  let target: Page | undefined;
  const asIndex = Number(step.input);
  if (Number.isInteger(asIndex) && String(asIndex) === step.input.trim()) {
    target = pages[asIndex];
  } else {
    for (const p of pages) {
      if ((await p.title()).includes(step.input)) {
        target = p;
        break;
      }
    }
  }
  if (!target) throw new FrameworkError(`switchTab: no tab matched "${step.input}"`, { stepId: step.stepId });
  await target.bringToFront();
  ctx.page = target;
  ctx.frame = null;
};

/** switchFrame: enter the iframe identified by ObjectName (css/xpath/testid selector). */
export const switchFrame: KeywordHandler = async (page, ctx, step) => {
  const { object } = objectAndAttr(step.objectName);
  const sel = ctx.feature.selectorIndex.get(`${step.page}::${object}`);
  if (!sel) throw new FrameworkError(`switchFrame: unknown object "${object}"`, { stepId: step.stepId });
  let selectorString: string;
  switch (sel.SelectorType) {
    case 'css':
      selectorString = sel.SelectorValue;
      break;
    case 'xpath':
      selectorString = sel.SelectorValue.startsWith('//') ? `xpath=${sel.SelectorValue}` : sel.SelectorValue;
      break;
    case 'testid':
      // ASSUMPTION: default data-testid attribute for frame selection.
      selectorString = `[data-testid="${sel.SelectorValue}"]`;
      break;
    default:
      throw new FrameworkError(
        `switchFrame supports css/xpath/testid selectors only; "${object}" is ${sel.SelectorType}.`,
        { stepId: step.stepId },
      );
  }
  ctx.frame = page.frameLocator(selectorString);
};
