/**
 * Run identity. `runId` is a compact, sortable, run-unique token appended to
 * every entity the tests create (${runId}) so parallel workers and repeat runs
 * never collide on the app's duplicate-name validation (§2.8).
 */
import { DateTime } from 'luxon';

export interface RunIdentity {
  /** e.g. 20260714T183012_ab12cd — timestamp + short random. */
  runId: string;
  /** ISO timestamp for reports/sidecars. */
  timestamp: string;
  /** The instant the run started (used as the base for ${today}). */
  startedAt: DateTime;
}

function shortRandom(): string {
  // 6 hex chars from crypto — collision-safe enough for parallel workers.
  const bytes = new Uint8Array(3);
  // Node & browser both expose global crypto in Node 20.
  globalThis.crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

export function createRunIdentity(now: DateTime = DateTime.now()): RunIdentity {
  const runId = `${now.toFormat("yyyyLLdd'T'HHmmss")}_${shortRandom()}`;
  return { runId, timestamp: now.toISO() ?? now.toString(), startedAt: now };
}
