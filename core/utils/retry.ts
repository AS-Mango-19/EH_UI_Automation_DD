/**
 * Generic retry with fixed backoff. Used by the step executor for the metadata
 * `Retry` column. Retries the whole operation N extra times (Retry=1 => 2 tries).
 */
import { logger } from './logger.js';

export interface RetryOptions {
  retries: number;
  delayMs?: number;
  label?: string;
}

export async function withRetry<T>(fn: () => Promise<T>, opts: RetryOptions): Promise<T> {
  const total = Math.max(0, opts.retries);
  let lastErr: unknown;
  for (let attempt = 0; attempt <= total; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (attempt < total) {
        const delay = opts.delayMs ?? 500;
        logger.warn(
          `Retry ${attempt + 1}/${total}${opts.label ? ` for ${opts.label}` : ''}: ${(err as Error).message}`,
        );
        await sleep(delay);
      }
    }
  }
  throw lastErr;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
