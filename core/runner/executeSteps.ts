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

export async function executeSteps(
  ctx: RunContext,
  feature: LoadedFeature,
  opts: { dropLogin: boolean },
): Promise<ExecuteOutcome> {
  const { main, cleanup } = partitionSteps(feature.steps, opts.dropLogin);
  let status: TestStatus = 'PASS';
  let reason: string | undefined;

  try {
    await runSteps(ctx, main, { source: `${ctx.tcId}/${ctx.iterationId}` });
    status = ctx.finalStatus;
    if (ctx.soft.length > 0 && status === 'PASS') {
      status = 'FAIL';
      reason = `${ctx.soft.length} soft assertion(s) failed: ${ctx.soft.map((s) => s.message).join('; ')}`;
    }
  } catch (err) {
    const mapped = mapErrorToStatus(err);
    status = mapped.status;
    reason = mapped.reason;
    logger.error(`Iteration ${ctx.tcId}/${ctx.iterationId} -> ${status}: ${mask(mapped.reason)}`);
  }

  if (cleanup.length) {
    await runSteps(ctx, cleanup, { continueOnError: true, source: `${ctx.tcId}/${ctx.iterationId}:cleanup` });
  } else if (ctx.createdProjectId && feature.config.cleanup.deleteCreatedProjects) {
    await safetyNetDelete(ctx);
  }

  return { status, reason };
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
