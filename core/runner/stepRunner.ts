/**
 * The step executor — the interpreter at the heart of the framework (§12 Phase 2).
 * For each step it: evaluates SkipIf, resolves ${...} in Input/Expected (masked
 * into the log), dispatches to the keyword handler with retry, applies the
 * screenshot policy, and stores the return value under StoreAs.
 *
 * Optional=TRUE  => a failure is a WARNING, not a test failure.
 * A hard failure records the step, captures an onFailure screenshot, and throws
 * so the caller can stop the main sequence (cleanup still runs separately).
 */
import path from 'node:path';
import type { RunContext } from './context.js';
import type { MetadataStep } from '../schema/metadata.schema.js';
import type { ResolvedStep, KeywordReturn } from '../keywords/types.js';
import type { StepResult, StepStatus } from '../model/types.js';
import { getKeyword } from '../keywords/registry.js';
import { evaluateSkipIf } from './skipIf.js';
import { withRetry } from '../utils/retry.js';
import { ensureDir } from '../utils/paths.js';
import { logger, mask } from '../utils/logger.js';
import { FrameworkError } from '../utils/errors.js';

export interface RunStepsOptions {
  /** Continue after a hard failure (used for cleanup steps). */
  continueOnError?: boolean;
  /** Label for logs (e.g. "flows/login.csv"). */
  source?: string;
}

/** Keywords that enter a testdata value — a blank/N/A value skips them (see below). */
const VALUE_ENTERING_ACTIONS = new Set(['fill', 'type', 'select', 'check']);

/** A testdata value meaning "this field is not applicable to this iteration". */
function isNotApplicable(value: string): boolean {
  const t = value.trim();
  return t === '' || /^(n\/a|not applicable)$/i.test(t);
}

function resolveStep(ctx: RunContext, step: MetadataStep): ResolvedStep {
  const loc = { stepId: step.StepID };
  const input = ctx.resolve(step.InputValue, { ...loc, column: 'InputValue' });
  const expected = ctx.resolve(step.ExpectedValue, { ...loc, column: 'ExpectedValue' });
  return {
    raw: step,
    stepId: step.StepID,
    stepGroup: step.StepGroup,
    page: step.Page,
    action: step.Action,
    objectName: step.ObjectName,
    input,
    expected,
    assertType: step.AssertType,
    waitCondition: step.WaitCondition,
    timeout: step.Timeout,
    storeAs: step.StoreAs,
    dynamicArgs: input ? input.split('|').map((s) => s.trim()) : [],
  };
}

async function screenshot(ctx: RunContext, step: MetadataStep, phase: 'ok' | 'fail'): Promise<string | undefined> {
  if (!ctx.page) return undefined;
  ensureDir(ctx.artifactsDir);
  const file = path.join(ctx.artifactsDir, `step_${step.StepID}_${phase}_${ctx.screenshotSeq++}.png`);
  try {
    await ctx.page.screenshot({ path: file, fullPage: false });
    return file;
  } catch {
    return undefined;
  }
}

export async function runStep(ctx: RunContext, step: MetadataStep): Promise<StepResult> {
  const started = Date.now();
  const base = {
    stepId: step.StepID,
    stepGroup: step.StepGroup,
    action: step.Action,
    page: step.Page,
    objectName: step.ObjectName,
    description: step.Description,
  };

  // --- SkipIf (evaluated before resolving inputs) ---
  if (step.SkipIf.trim()) {
    let skip = false;
    try {
      skip = evaluateSkipIf(ctx, step.SkipIf, { stepId: step.StepID });
    } catch (e) {
      const result: StepResult = { ...base, resolvedInput: '', status: 'failed', durationMs: 0, error: (e as Error).message };
      ctx.stepResults.push(result);
      throw e;
    }
    if (skip) {
      const result: StepResult = { ...base, resolvedInput: '', status: 'skipped', durationMs: Date.now() - started };
      ctx.stepResults.push(result);
      logger.info(`SKIP  [${step.StepID}] ${step.Action} — SkipIf: ${step.SkipIf}`);
      return result;
    }
  }

  const optional = step.Optional;
  let resolved: ResolvedStep;
  try {
    resolved = resolveStep(ctx, step);
  } catch (e) {
    return handleFailure(ctx, step, base, started, e as Error, optional, '');
  }

  // --- Not-applicable skip ---
  // A value-entering step whose testdata value resolved to blank or "N/A" is
  // SKIPPED: the field is not applicable to THIS iteration (it may not even exist
  // on the page for this data combination — e.g. a Non-Inferiority margin on a
  // Superiority design). The same step still runs for iterations whose row
  // supplies a value, so ONE metadata serves every data combination — no
  // per-iteration metadata. Guarded by "InputValue references ${data.*}" so a
  // static action with a deliberately empty InputValue is never skipped.
  if (
    VALUE_ENTERING_ACTIONS.has(step.Action) &&
    /\$\{data\./.test(step.InputValue) &&
    isNotApplicable(resolved.input)
  ) {
    const result: StepResult = { ...base, resolvedInput: '', status: 'skipped', durationMs: Date.now() - started };
    ctx.stepResults.push(result);
    logger.info(`SKIP  [${step.StepID}] ${step.Action} ${step.ObjectName} — testdata value blank/N/A (field not applicable to this iteration).`);
    return result;
  }

  const maskedInput = mask(resolved.input);
  const contextSnapshot = { input: maskedInput, expected: mask(resolved.expected), storeAs: step.StoreAs };
  logger.info(`STEP  [${step.StepID}] ${step.StepGroup}/${step.Action} ${step.ObjectName} ${maskedInput ? `= "${maskedInput}"` : ''}`.trim(), contextSnapshot);

  const handler = getKeyword(step.Action);

  try {
    const ret: KeywordReturn = await withRetry(() => handler(ctx.page, ctx, resolved), {
      retries: step.Retry,
      label: `step ${step.StepID} ${step.Action}`,
    });
    if (typeof ret === 'string' && step.StoreAs) {
      ctx.setVar(step.StoreAs, ret);
      // Track a project we created so teardown can delete only ours (§5.1).
      if (step.StoreAs === 'projectId' && (ctx.master.ProjectID ?? '') === '') {
        ctx.createdProjectId = ret;
      }
      logger.debug(`STORE ${step.StoreAs} = "${mask(ret)}"`);
    }
    const shot = await screenshot(ctx, step, 'ok');
    const result: StepResult = {
      ...base,
      resolvedInput: maskedInput,
      status: 'passed',
      durationMs: Date.now() - started,
      screenshotPath: shot,
      context: contextSnapshot,
    };
    ctx.stepResults.push(result);
    return result;
  } catch (e) {
    return handleFailure(ctx, step, base, started, e as Error, optional, maskedInput);
  }
}

async function handleFailure(
  ctx: RunContext,
  step: MetadataStep,
  base: Omit<StepResult, 'resolvedInput' | 'status' | 'durationMs'>,
  started: number,
  err: Error,
  optional: boolean,
  maskedInput: string,
): Promise<StepResult> {
  const shot = await screenshot(ctx, step, 'fail');
  const status: StepStatus = optional ? 'warned' : 'failed';
  const result: StepResult = {
    ...base,
    resolvedInput: maskedInput,
    status,
    durationMs: Date.now() - started,
    error: mask(err.message),
    screenshotPath: shot,
  };
  ctx.stepResults.push(result);
  if (optional) {
    logger.warn(`OPTIONAL step ${step.StepID} (${step.Action}) failed — continuing: ${mask(err.message)}`);
    return result;
  }
  logger.error(`FAIL  [${step.StepID}] ${step.Action}: ${mask(err.message)}`);
  throw err instanceof FrameworkError ? err : new FrameworkError(err.message, { stepId: step.StepID });
}

export async function runSteps(ctx: RunContext, steps: MetadataStep[], opts: RunStepsOptions = {}): Promise<StepResult[]> {
  const results: StepResult[] = [];
  for (const step of steps) {
    try {
      results.push(await runStep(ctx, step));
    } catch (e) {
      if (opts.continueOnError) {
        logger.warn(`Continuing after failure in ${opts.source ?? 'steps'}: ${(e as Error).message}`);
        continue;
      }
      throw e;
    }
  }
  return results;
}
