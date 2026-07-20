/**
 * Shared zod coercions. Every CSV cell arrives as a trimmed string; these turn
 * them into typed values with CSV-friendly leniency (blank => sensible default).
 */
import { z } from 'zod';

/** TRUE/1/YES/Y => true; FALSE/0/NO/N/'' => false; anything else => issue. */
export const boolField = z.preprocess((v) => {
  if (typeof v === 'boolean') return v;
  const s = String(v ?? '').trim().toUpperCase();
  if (s === '' || s === 'FALSE' || s === '0' || s === 'NO' || s === 'N') return false;
  if (s === 'TRUE' || s === '1' || s === 'YES' || s === 'Y') return true;
  return s; // let z.boolean() reject it with a clear message
}, z.boolean());

/** Optional number: blank => undefined; otherwise must parse. */
export const optionalNumber = z.preprocess((v) => {
  const s = String(v ?? '').trim();
  if (s === '') return undefined;
  const n = Number(s);
  return Number.isFinite(n) ? n : s; // non-number string falls through to z.number() error
}, z.number().optional());

/** Number with a default when blank. */
export const numberWithDefault = (def: number) =>
  z.preprocess((v) => {
    const s = String(v ?? '').trim();
    if (s === '') return def;
    const n = Number(s);
    return Number.isFinite(n) ? n : s;
  }, z.number());

/** Trimmed string; blank stays ''. */
export const strField = z.preprocess((v) => String(v ?? '').trim(), z.string());

/** Trimmed string with default. */
export const strWithDefault = (def: string) =>
  z.preprocess((v) => {
    const s = String(v ?? '').trim();
    return s === '' ? def : s;
  }, z.string());

/** Split a pipe-separated list, dropping blanks. */
export const splitPipe = (value: string): string[] =>
  value
    .split('|')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
