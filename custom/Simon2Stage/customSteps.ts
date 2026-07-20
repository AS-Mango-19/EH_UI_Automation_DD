/**
 * Hand-written escape hatch for Feature "Simon2Stage" (§2.7). NEVER generated.
 * Invoke a named export from metadata with:
 *   Action=callCustom, InputValue=<exportName>
 *
 * Each export is a normal keyword handler: (page, ctx, step) => Promise<void|string>.
 * A returned string is stored under the step's StoreAs, exactly like a built-in.
 */
import type { KeywordHandler } from '../../core/keywords/types.js';
import { logger } from '../../core/utils/logger.js';

/**
 * Example: some apps render the generated project id only inside a toast that
 * disappears. This custom step reads it defensively and returns it so a
 * StoreAs=projectId can capture it. Adapt the selector to the real app.
 */
export const captureProjectIdFromToast: KeywordHandler = async (page, ctx, step) => {
  // ASSUMPTION: a toast with [data-testid="project-created-toast"] carries data-id.
  const toast = page.getByTestId('project-created-toast');
  const id = (await toast.getAttribute('data-id').catch(() => null)) ?? '';
  logger.info(`captureProjectIdFromToast -> "${id}" (tc=${ctx.tcId}, step=${step.stepId})`);
  return id;
};

/** Example no-op custom hook, safe to reference from a smoke metadata row. */
export const noop: KeywordHandler = async () => {
  return;
};

export default noop;
