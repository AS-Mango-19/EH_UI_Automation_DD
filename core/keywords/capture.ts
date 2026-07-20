/**
 * Capture keywords: storeText, storeAttribute, storeValue, storeUrl,
 * extractTable, downloadFile. Capture keywords return a string which the
 * executor stores under the step's StoreAs.
 */
import path from 'node:path';
import type { KeywordHandler } from './types.js';
import { targetLocator, objectAndAttr } from './util.js';
import { extractResults } from '../extractors/tableExtractor.js';
import { ensureDir } from '../utils/paths.js';
import { FrameworkError } from '../utils/errors.js';
import { logger } from '../utils/logger.js';

export const storeText: KeywordHandler = async (_page, ctx, step) => {
  const loc = (await targetLocator(ctx, step)).first();
  const text = (await loc.textContent())?.trim() ?? '';
  return text;
};

/** storeAttribute: ObjectName is "object|attribute". Returns the attribute value. */
export const storeAttribute: KeywordHandler = async (_page, ctx, step) => {
  const { object, attr } = objectAndAttr(step.objectName);
  if (!attr) throw new FrameworkError(`storeAttribute needs ObjectName="object|attribute", got "${step.objectName}"`, { stepId: step.stepId });
  const loc = (await targetLocator(ctx, step, object)).first();
  const value = await loc.getAttribute(attr);
  if (value === null) {
    throw new FrameworkError(`storeAttribute: element "${object}" has no attribute "${attr}"`, { stepId: step.stepId });
  }
  return value;
};

export const storeValue: KeywordHandler = async (_page, ctx, step) => {
  const loc = (await targetLocator(ctx, step)).first();
  return loc.inputValue();
};

export const storeUrl: KeywordHandler = async (_page, ctx) => {
  return ctx.page.url();
};

/** extractTable: grid -> normalized actual-results CSV; caches rows for compareWithBaseline. */
export const extractTable: KeywordHandler = async (_page, ctx, step) => {
  const { rows, outputPath } = await extractResults(ctx, step);
  ctx.lastActualRows = rows;
  ctx.lastActualPath = outputPath;
  return outputPath;
};

/** downloadFile: click the trigger (ObjectName) and save the resulting download. */
export const downloadFile: KeywordHandler = async (page, ctx, step) => {
  const trigger = await targetLocator(ctx, step);
  const [download] = await Promise.all([
    page.waitForEvent('download', { timeout: step.timeout }),
    trigger.click({ timeout: step.timeout }),
  ]);
  ensureDir(ctx.artifactsDir);
  const dest = path.join(ctx.artifactsDir, download.suggestedFilename());
  await download.saveAs(dest);
  logger.info(`Downloaded ${download.suggestedFilename()} -> ${path.relative(process.cwd(), dest)}`);
  return dest;
};
