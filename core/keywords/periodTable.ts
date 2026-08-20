/**
 * Pure period-table reconstruction for the `loopPeriods` keyword — kept import-free so
 * it can be unit-tested in isolation (no page/ctx/runtime). Rebuilds a folded child
 * table's `<prefix>.<n>.<field>` wide columns (see featureLoader.foldChildTables) from
 * ONE testdata row back into per-period field maps, keeping only the periods whose
 * `<countField>` cell holds a real value (a period is "present" iff its key column is
 * non-N/A — the same rule the reconcile uses to decide how many rows to Add).
 */

export interface PeriodRow {
  /** 0-based period index parsed from the column name. */
  n: number;
  /** field -> raw cell value for this period (every folded field, N/A included). */
  fields: Record<string, string>;
}

/** A testdata cell meaning "not applicable" — blank or an N/A spelling. */
export function isNaCell(v: string | undefined): boolean {
  const t = (v ?? '').trim();
  return t === '' || /^(n\/a|not applicable)$/i.test(t);
}

/**
 * Group `<prefix>.<n>.<field>` columns of `row` by period index and return the present
 * periods (countField non-N/A) in ascending index order. Non-matching headers are
 * ignored; gaps are preserved (periods stay keyed by their real index, so a design with
 * periods 0,1,3 loops [0,1,3], NOT [0,1,2]).
 */
export function reconstructPeriods(
  headers: string[],
  row: Record<string, string>,
  prefix: string,
  countField: string,
): PeriodRow[] {
  const re = new RegExp(`^${prefix}\\.(\\d+)\\.(.+)$`);
  const byPeriod = new Map<number, Record<string, string>>();
  for (const h of headers) {
    const m = re.exec(h);
    if (!m) continue;
    const n = Number(m[1]);
    if (!byPeriod.has(n)) byPeriod.set(n, {});
    byPeriod.get(n)![m[2]!] = row[h] ?? '';
  }
  return [...byPeriod.keys()]
    .filter((n) => !isNaCell(byPeriod.get(n)![countField]))
    .sort((a, b) => a - b)
    .map((n) => ({ n, fields: byPeriod.get(n)! }));
}
