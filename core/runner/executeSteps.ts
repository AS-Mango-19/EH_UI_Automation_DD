/**
 * Shared main/cleanup execution + status mapping, used by BOTH the CLI
 * orchestrator (library-driven) and the generated Playwright specs. Keeps the
 * "how a test is decided PASS/FAIL/SIMULATION_TIMEOUT" logic in exactly one place.
 */
import type { RunContext } from './context.js';
import type { LoadedFeature } from '../loaders/featureLoader.js';
import type { MetadataStep } from '../schema/metadata.schema.js';
import type { TestStatus } from '../model/types.js';
import { runSteps } from './stepRunner.js';
import { logger, mask } from '../utils/logger.js';
import { SimulationTimeoutError, SimulationFailedError } from '../utils/errors.js';

export function partitionSteps(
  steps: MetadataStep[],
  dropLogin: boolean,
): { main: MetadataStep[]; cleanup: MetadataStep[] } {
  const main: MetadataStep[] = [];
  const cleanup: MetadataStep[] = [];
  for (const s of steps) {
    if (dropLogin && s.StepGroup === 'Login') continue;
    if (s.StepGroup === 'Cleanup') cleanup.push(s);
    else main.push(s);
  }
  return { main, cleanup };
}

export function mapErrorToStatus(err: unknown): { status: TestStatus; reason: string } {
  if (err instanceof SimulationTimeoutError) return { status: 'SIMULATION_TIMEOUT', reason: err.message };
  if (err instanceof SimulationFailedError) return { status: 'FAIL', reason: err.message };
  return { status: 'FAIL', reason: (err as Error).message };
}

export interface ExecuteOutcome {
  status: TestStatus;
  reason?: string;
}

/**
 * Run a feature's MAIN steps (no cleanup) and map the outcome. Split out from
 * executeSteps so the iteration can run several phases on the same page — design,
 * then the chained simulation — before cleanup fires exactly once at the end.
 *
 * Phase-scoped: soft-assertion failures are attributed to THIS phase only (those
 * added since it started), and finalStatus is reset so a later phase starts clean.
 */
export async function executeMain(
  ctx: RunContext,
  feature: LoadedFeature,
  opts: { dropLogin: boolean },
): Promise<ExecuteOutcome> {
  const { main } = partitionSteps(feature.steps, opts.dropLogin);
  const softBefore = ctx.soft.length;
  ctx.finalStatus = 'PASS';
  let status: TestStatus = 'PASS';
  let reason: string | undefined;

  try {
    await runSteps(ctx, main, { source: `${ctx.tcId}/${ctx.iterationId}` });
    status = ctx.finalStatus;
    const softNow = ctx.soft.slice(softBefore);
    if (softNow.length > 0 && status === 'PASS') {
      status = 'FAIL';
      reason = `${softNow.length} soft assertion(s) failed: ${softNow.map((s) => s.message).join('; ')}`;
    }
  } catch (err) {
    const mapped = mapErrorToStatus(err);
    status = mapped.status;
    reason = mapped.reason;
    logger.error(`Iteration ${ctx.tcId}/${ctx.iterationId} -> ${status}: ${mask(mapped.reason)}`);
  }

  return { status, reason };
}

/** Run the Cleanup step group, or the API safety-net delete when there is none. */
export async function runCleanup(ctx: RunContext, feature: LoadedFeature): Promise<void> {
  const { cleanup } = partitionSteps(feature.steps, false);
  if (cleanup.length) {
    await runSteps(ctx, cleanup, { continueOnError: true, source: `${ctx.tcId}/${ctx.iterationId}:cleanup` });
  } else if (ctx.createdProjectId && feature.config.cleanup.deleteCreatedProjects) {
    await safetyNetDelete(ctx);
  }
}

/**
 * Single-phase execution (design only) for the generated Playwright specs, which
 * do not chain a simulation. Preserves the original main-then-cleanup behaviour.
 */
export async function executeSteps(
  ctx: RunContext,
  feature: LoadedFeature,
  opts: { dropLogin: boolean },
): Promise<ExecuteOutcome> {
  const outcome = await executeMain(ctx, feature, opts);
  await runCleanup(ctx, feature);
  return outcome;
}

async function safetyNetDelete(ctx: RunContext): Promise<void> {
  try {
    const url = `${ctx.env.apiBaseUrl.replace(/\/$/, '')}/projects/${ctx.createdProjectId}`;
    const res = await ctx.apiRequest.fetch(url, { method: 'DELETE' });
    logger.info(`Safety-net cleanup DELETE ${url} -> ${res.status()}`);
  } catch (e) {
    logger.warn(`Safety-net cleanup failed: ${(e as Error).message}`);
  }
}
