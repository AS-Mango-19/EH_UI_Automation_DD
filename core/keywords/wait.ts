/**
 * Wait keywords: waitForSelector, waitForText, waitForNetworkIdle,
 * waitForDownload, waitForSimulation, sleep.
 *
 * waitForSimulation POLLS (never sleeps blindly): it reads the status object every
 * pollIntervalMs until successText; aborts immediately on failureText; and aborts
 * at the ceiling with a DISTINCT SIMULATION_TIMEOUT status so "app is slow" is
 * distinguishable from "app is broken" (§7).
 */
import path from 'node:path';
import type { KeywordHandler } from './types.js';
import { targetLocator } from './util.js';
import { resolveLocator } from '../locators/resolver.js';
import { sleep as sleepMs } from '../utils/retry.js';
import { ensureDir } from '../utils/paths.js';
import { logger } from '../utils/logger.js';
import { SimulationFailedError, SimulationTimeoutError } from '../utils/errors.js';

type WaitState = 'attached' | 'detached' | 'visible' | 'hidden';
function waitState(cond: string): WaitState {
  switch (cond.trim().toLowerCase()) {
    case 'attached':
      return 'attached';
    case 'detached':
      return 'detached';
    case 'hidden':
      return 'hidden';
    default:
      return 'visible';
  }
}

function contains(haystack: string, needle: string): boolean {
  return haystack.toLowerCase().includes(needle.toLowerCase());
}

export const waitForSelector: KeywordHandler = async (_page, ctx, step) => {
  await (await targetLocator(ctx, step)).first().waitFor({ state: waitState(step.waitCondition), timeout: step.timeout });
};

export const waitForText: KeywordHandler = async (_page, ctx, step) => {
  const loc = (await targetLocator(ctx, step)).first();
  const deadline = Date.now() + step.timeout;
  while (Date.now() < deadline) {
    const text = (await loc.textContent().catch(() => ''))?.trim() ?? '';
    if (contains(text, step.expected)) return;
    await sleepMs(250);
  }
  throw new Error(`waitForText: "${step.objectName}" never contained "${step.expected}" within ${step.timeout}ms`);
};

export const waitForNetworkIdle: KeywordHandler = async (page, _ctx, step) => {
  await page.waitForLoadState('networkidle', { timeout: step.timeout });
};

export const waitForDownload: KeywordHandler = async (page, ctx, step) => {
  const download = await page.waitForEvent('download', { timeout: step.timeout });
  ensureDir(ctx.artifactsDir);
  const dest = path.join(ctx.artifactsDir, download.suggestedFilename());
  await download.saveAs(dest);
  logger.info(`Downloaded ${download.suggestedFilename()} -> ${path.relative(process.cwd(), dest)}`);
  return dest;
};

export const sleep: KeywordHandler = async (_page, _ctx, step) => {
  const ms = Number(step.input) || 0;
  logger.warn(`sleep(${ms}ms) — prefer polling a condition.`);
  await sleepMs(ms);
};

export const waitForSimulation: KeywordHandler = async (_page, ctx, step) => {
  const sim = ctx.feature.config.simulation;
  const pollObject = step.objectName || sim.pollObject;
  const successText = step.expected || sim.successText;
  const failureText = sim.failureText;
  const interval = sim.pollIntervalMs;
  const ceiling = step.timeout || sim.maxWaitMs;

  const loc = (await resolveLocator(ctx.root(), ctx.feature.selectorIndex, step.page, pollObject)).first();
  const start = Date.now();
  let polls = 0;
  while (Date.now() - start < ceiling) {
    const text = (await loc.textContent().catch(() => ''))?.trim() ?? '';
    polls++;
    if (successText && contains(text, successText)) {
      logger.info(`Simulation completed after ${polls} poll(s) / ${Date.now() - start}ms (status="${text}").`);
      return text;
    }
    if (failureText && contains(text, failureText)) {
      throw new SimulationFailedError(`Simulation reported failure status "${text}"`, { stepId: step.stepId });
    }
    await sleepMs(interval);
  }
  throw new SimulationTimeoutError(
    `Simulation did not reach "${successText}" within ${ceiling}ms (last poll #${polls}).`,
    { stepId: step.stepId },
  );
};
