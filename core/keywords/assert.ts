/**
 * Assertion keywords and their soft* variants. A hard assert throws (fails the
 * step/test); a soft assert records the failure on ctx.soft and continues, so a
 * run surfaces every problem at once.
 */
import type { Locator } from 'playwright';
import type { RunContext } from '../runner/context.js';
import type { KeywordHandler, ResolvedStep } from './types.js';
import { targetLocator } from './util.js';
import { FrameworkError } from '../utils/errors.js';
import { logger } from '../utils/logger.js';

function report(ctx: RunContext, step: ResolvedStep, ok: boolean, message: string): void {
  if (ok) return;
  if (step.action.startsWith('soft')) {
    ctx.soft.push({ stepId: step.stepId, message });
    return;
  }
  throw new FrameworkError(`Assertion failed: ${message}`, { stepId: step.stepId });
}

/**
 * For an OPTIONAL value/text assert, do NOT burn the locator timeout (Playwright's
 * 30s default on inputValue/textContent) waiting for an element that may not exist
 * — e.g. a greyed field that never rendered for this iteration. The tester marked
 * it Optional, so a missing target is a heads-up, not a failure: probe existence
 * with NO wait and, if absent, log a warning and tell the caller to skip the read
 * and move to the next step. A non-optional assert returns false here and keeps its
 * full wait, so a genuinely slow element still gets its chance.
 */
async function optionalTargetAbsent(step: ResolvedStep, loc: Locator): Promise<boolean> {
  if (!step.raw.Optional) return false;
  const present = (await loc.count().catch(() => 0)) > 0;
  if (!present) {
    logger.warn(`OPTIONAL ${step.action} ${step.objectName}: target not present — skipping without waiting (warning only).`);
  }
  return !present;
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
  if (await optionalTargetAbsent(step, loc)) return;
  const actual = (await loc.textContent())?.trim() ?? '';
  report(ctx, step, actual === step.expected, `${step.objectName} text "${actual}" !== "${step.expected}"`);
};

export const assertContains: KeywordHandler = async (_p, ctx, step) => {
  const loc = (await targetLocator(ctx, step)).first();
  if (await optionalTargetAbsent(step, loc)) return;
  const actual = (await loc.textContent())?.trim() ?? '';
  report(ctx, step, actual.includes(step.expected), `${step.objectName} text "${actual}" does not contain "${step.expected}"`);
};

export const assertValue: KeywordHandler = async (_p, ctx, step) => {
  const loc = (await targetLocator(ctx, step)).first();
  if (await optionalTargetAbsent(step, loc)) return;
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
