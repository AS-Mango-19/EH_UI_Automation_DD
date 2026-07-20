/**
 * Assertion keywords and their soft* variants. A hard assert throws (fails the
 * step/test); a soft assert records the failure on ctx.soft and continues, so a
 * run surfaces every problem at once.
 */
import type { RunContext } from '../runner/context.js';
import type { KeywordHandler, ResolvedStep } from './types.js';
import { targetLocator } from './util.js';
import { FrameworkError } from '../utils/errors.js';

function report(ctx: RunContext, step: ResolvedStep, ok: boolean, message: string): void {
  if (ok) return;
  if (step.action.startsWith('soft')) {
    ctx.soft.push({ stepId: step.stepId, message });
    return;
  }
  throw new FrameworkError(`Assertion failed: ${message}`, { stepId: step.stepId });
}

export const assertVisible: KeywordHandler = async (_p, ctx, step) => {
  const loc = (await targetLocator(ctx, step)).first();
  let ok = false;
  try {
    await loc.waitFor({ state: 'visible', timeout: step.timeout });
    ok = true;
  } catch {
    ok = false;
  }
  report(ctx, step, ok, `${step.objectName} expected visible`);
};

export const assertHidden: KeywordHandler = async (_p, ctx, step) => {
  const loc = (await targetLocator(ctx, step)).first();
  let ok = false;
  try {
    await loc.waitFor({ state: 'hidden', timeout: step.timeout });
    ok = true;
  } catch {
    ok = false;
  }
  report(ctx, step, ok, `${step.objectName} expected hidden`);
};

export const assertText: KeywordHandler = async (_p, ctx, step) => {
  const loc = (await targetLocator(ctx, step)).first();
  const actual = (await loc.textContent())?.trim() ?? '';
  report(ctx, step, actual === step.expected, `${step.objectName} text "${actual}" !== "${step.expected}"`);
};

export const assertContains: KeywordHandler = async (_p, ctx, step) => {
  const loc = (await targetLocator(ctx, step)).first();
  const actual = (await loc.textContent())?.trim() ?? '';
  report(ctx, step, actual.includes(step.expected), `${step.objectName} text "${actual}" does not contain "${step.expected}"`);
};

export const assertValue: KeywordHandler = async (_p, ctx, step) => {
  const loc = (await targetLocator(ctx, step)).first();
  const actual = await loc.inputValue();
  report(ctx, step, actual === step.expected, `${step.objectName} value "${actual}" !== "${step.expected}"`);
};

export const assertCount: KeywordHandler = async (_p, ctx, step) => {
  const loc = await targetLocator(ctx, step);
  const actual = await loc.count();
  const expected = Number(step.expected);
  report(ctx, step, actual === expected, `${step.objectName} count ${actual} !== ${expected}`);
};

export const assertEnabled: KeywordHandler = async (_p, ctx, step) => {
  const loc = (await targetLocator(ctx, step)).first();
  let ok = false;
  try {
    await loc.waitFor({ state: 'visible', timeout: step.timeout });
    ok = await loc.isEnabled();
  } catch {
    ok = false;
  }
  report(ctx, step, ok, `${step.objectName} expected enabled`);
};

export const assertUrl: KeywordHandler = async (_p, ctx, step) => {
  const actual = ctx.page.url();
  const ok = actual === step.expected || actual.includes(step.expected);
  report(ctx, step, ok, `URL "${actual}" does not match "${step.expected}"`);
};

// Soft variants reuse the same logic (report() branches on the "soft" prefix).
export const softAssertVisible = assertVisible;
export const softAssertHidden = assertHidden;
export const softAssertText = assertText;
export const softAssertContains = assertContains;
export const softAssertValue = assertValue;
export const softAssertCount = assertCount;
export const softAssertEnabled = assertEnabled;
export const softAssertUrl = assertUrl;
