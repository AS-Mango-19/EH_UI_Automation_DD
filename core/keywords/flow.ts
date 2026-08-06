/**
 * Flow keywords: callReusable, callCustom, ifExists, loopOverData.
 * These compose step sequences; they delegate execution back to the step runner
 * (a runtime import cycle that ESM resolves because the call happens lazily).
 */
import { pathToFileURL } from 'node:url';
import type { KeywordHandler } from './types.js';
import { targetLocator } from './util.js';
import { parseMetadataFile } from '../runner/metadataFile.js';
import { runSteps } from '../runner/stepRunner.js';
import { abs } from '../utils/paths.js';
import { FrameworkError } from '../utils/errors.js';
import { logger } from '../utils/logger.js';

/** callReusable: load another metadata CSV (e.g. flows/login.csv) and run it inline. */
export const callReusable: KeywordHandler = async (_page, ctx, step) => {
  const file = abs(step.input.trim());
  const steps = parseMetadataFile(file);
  logger.info(`callReusable -> ${step.input} (${steps.length} steps)`);
  await runSteps(ctx, steps, { source: step.input });
};

/**
 * callCustom: invoke a named export from custom/<Feature>/customSteps.ts, falling
 * back to custom/_shared/customSteps.ts for generic handlers (extractAllResultTables,
 * selectStartDate, ...). The feature's own module always wins, so a feature can
 * override any shared handler; an imported feature that only needs the generic
 * ones does not need a customSteps.ts file at all. Resolution order:
 * feature[fnName] > shared[fnName] > feature.default > shared.default.
 */
const loadCustomModule = async (modulePath: string): Promise<Record<string, unknown> | undefined> => {
  try {
    return (await import(pathToFileURL(modulePath).href)) as Record<string, unknown>;
  } catch {
    return undefined; // file may not exist for this feature — fall back to shared
  }
};

export const callCustom: KeywordHandler = async (page, ctx, step) => {
  const fnName = step.input.trim() || 'default';
  const featurePath = abs('custom', ctx.feature.feature, 'customSteps.ts');
  const sharedPath = abs('custom', '_shared', 'customSteps.ts');
  const featureMod = await loadCustomModule(featurePath);
  const sharedMod = await loadCustomModule(sharedPath);

  const fn = (featureMod?.[fnName] ?? sharedMod?.[fnName] ?? featureMod?.['default'] ?? sharedMod?.['default']) as
    | KeywordHandler
    | undefined;
  if (typeof fn !== 'function') {
    throw new FrameworkError(`callCustom: export "${fnName}" not found in ${featurePath} or ${sharedPath}`, { stepId: step.stepId });
  }
  const source = featureMod?.[fnName] ? ctx.feature.feature : '_shared';
  logger.info(`callCustom -> ${source}/customSteps.${fnName}`);
  return fn(page, ctx, step);
};

/** ifExists: if ObjectName is present, run the reusable CSV in InputValue; else skip. */
export const ifExists: KeywordHandler = async (_page, ctx, step) => {
  const loc = await targetLocator(ctx, step);
  const count = await loc.count().catch(() => 0);
  if (count === 0) {
    logger.info(`ifExists: "${step.objectName}" absent — skipping ${step.input}`);
    return;
  }
  const steps = parseMetadataFile(abs(step.input.trim()));
  logger.info(`ifExists: "${step.objectName}" present — running ${step.input}`);
  await runSteps(ctx, steps, { source: step.input });
};

/**
 * loopOverData: for each row of the testdata file named by ObjectName, expose
 * its columns as ${runtime.loop.<Column>} and run the reusable CSV in InputValue.
 */
export const loopOverData: KeywordHandler = async (_page, ctx, step) => {
  const parsed = ctx.feature.testDataParsed.get(step.objectName);
  if (!parsed) {
    throw new FrameworkError(`loopOverData: unknown testdata file "${step.objectName}"`, { stepId: step.stepId });
  }
  // Scope child rows to the CURRENT iteration, exactly like every other testdata
  // file: match on TC_ID and IterationID whenever those columns are present. A
  // file that lacks either column matches on the one it has (or loops every row
  // if it has neither) — unchanged legacy behaviour, so this is backward-safe.
  const hasTc = parsed.headers.includes('TC_ID');
  const hasIter = parsed.headers.includes('IterationID');
  const rows = parsed.records
    .map((r) => r.data)
    .filter((d) => (!hasTc || d['TC_ID'] === ctx.tcId) && (!hasIter || d['IterationID'] === ctx.iterationId));
  const steps = parseMetadataFile(abs(step.input.trim()));
  logger.info(`loopOverData: ${rows.length} row(s) from ${step.objectName} -> ${step.input}`);
  for (const row of rows) {
    for (const [k, v] of Object.entries(row)) ctx.setVar(`loop.${k}`, v);
    await runSteps(ctx, steps, { source: `${step.input}[loop]` });
  }
};
