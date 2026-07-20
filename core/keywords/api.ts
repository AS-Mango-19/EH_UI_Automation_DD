/**
 * API keyword: apiRequest. InputValue is "METHOD /path" (e.g. "DELETE /api/projects/123").
 * Used for setup/teardown because creating/deleting projects via API is far
 * faster and less flaky than clicking through the wizard (§7).
 */
import type { KeywordHandler } from './types.js';
import { FrameworkError } from '../utils/errors.js';
import { logger } from '../utils/logger.js';

export const apiRequest: KeywordHandler = async (_page, ctx, step) => {
  const raw = step.input.trim();
  const spaceIdx = raw.indexOf(' ');
  if (spaceIdx === -1) {
    throw new FrameworkError(`apiRequest expects "METHOD /path", got "${raw}"`, { stepId: step.stepId });
  }
  const method = raw.slice(0, spaceIdx).trim().toUpperCase();
  const pathPart = raw.slice(spaceIdx + 1).trim();
  const url = pathPart.startsWith('http')
    ? pathPart
    : `${ctx.env.apiBaseUrl.replace(/\/$/, '')}/${pathPart.replace(/^\/?(api\/)?/, '')}`;

  const response = await ctx.apiRequest.fetch(url, { method, timeout: step.timeout });
  const status = response.status();
  logger.info(`apiRequest ${method} ${url} -> ${status}`);

  // DELETE of an already-absent resource is acceptable (idempotent cleanup).
  const acceptable = response.ok() || (method === 'DELETE' && status === 404);
  if (!acceptable) {
    const body = await response.text().catch(() => '');
    throw new FrameworkError(`apiRequest ${method} ${url} failed with ${status}: ${body.slice(0, 300)}`, {
      stepId: step.stepId,
    });
  }
  return `${status}`;
};
