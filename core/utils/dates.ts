/**
 * Date-token resolution for the ${today}, ${today+30d}, ${today-7d} family and
 * the testdata literal `Now` (StartDate=Now maps to ${today}). Uses luxon.
 *
 * A fixed base instant is injected per run so every ${today} in a single run is
 * identical (determinism) and so tests can pin "now".
 */
import { DateTime } from 'luxon';

export type DateOffsetUnit = 'd' | 'w' | 'm' | 'y';

const UNIT_MAP: Record<DateOffsetUnit, 'days' | 'weeks' | 'months' | 'years'> = {
  d: 'days',
  w: 'weeks',
  m: 'months',
  y: 'years',
};

/** Default format the app expects in date inputs. Override per feature if needed. */
export const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd';

const TOKEN_RE = /^today(?:\s*([+-])\s*(\d+)\s*([dwmy]))?$/i;

/**
 * Resolve a date token like `today`, `today+30d`, `today-7d`, or the literal
 * `Now` against a base instant. Returns a formatted date string.
 * Throws for anything that isn't a recognised date token.
 */
export function resolveDateToken(token: string, base: DateTime, format = DEFAULT_DATE_FORMAT): string {
  const normalized = token.trim().toLowerCase() === 'now' ? 'today' : token.trim();
  const m = TOKEN_RE.exec(normalized);
  if (!m) {
    throw new Error(`Not a valid date token: "${token}" (expected today | today+30d | today-7d | Now)`);
  }
  let dt = base;
  if (m[1] && m[2] && m[3]) {
    const sign = m[1] === '-' ? -1 : 1;
    const amount = sign * Number(m[2]);
    const unit = UNIT_MAP[m[3].toLowerCase() as DateOffsetUnit];
    dt = base.plus({ [unit]: amount });
  }
  return dt.toFormat(format);
}

export function isDateToken(token: string): boolean {
  const normalized = token.trim().toLowerCase() === 'now' ? 'today' : token.trim();
  return TOKEN_RE.test(normalized);
}
