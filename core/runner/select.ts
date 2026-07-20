/**
 * Test-case selection (§11). Precedence, highest wins:
 *   --testcase  >  --tags (+Execute)  >  Execute  >  --all
 * `--feature` further narrows any of these. DependsOn orders execution and gates
 * a dependent when its dependency did not pass.
 */
import type { MasterEntry } from '../loaders/masterLoader.js';
import type { CliFilters } from '../cli/args.js';
import { splitPipe } from '../schema/common.js';
import { FrameworkError } from '../utils/errors.js';

/** Tags on a row that a tag expression can match: Tags ∪ {Priority}. */
export function matchableTags(entry: MasterEntry): Set<string> {
  const set = new Set<string>();
  for (const t of splitPipe(entry.row.Tags)) set.add(t.toLowerCase());
  if (entry.row.Priority) set.add(entry.row.Priority.toLowerCase());
  return set;
}

/**
 * Evaluate a tag expression: OR ',', AND '+', NOT '~'.
 *   "smoke,regression"  => smoke OR regression
 *   "smoke+P1"          => smoke AND P1
 *   "regression+~wip"   => regression AND NOT wip
 */
export function evaluateTagExpr(expr: string, tags: Set<string>): boolean {
  const orTerms = expr.split(',').map((s) => s.trim()).filter(Boolean);
  if (orTerms.length === 0) return true;
  return orTerms.some((term) =>
    term
      .split('+')
      .map((s) => s.trim())
      .filter(Boolean)
      .every((lit) => {
        if (lit.startsWith('~')) return !tags.has(lit.slice(1).toLowerCase());
        return tags.has(lit.toLowerCase());
      }),
  );
}

export function selectEntries(entries: MasterEntry[], filters: CliFilters): MasterEntry[] {
  let selected: MasterEntry[];

  if (filters.testcase) {
    const found = entries.filter((e) => e.row.TC_ID === filters.testcase);
    if (found.length === 0) throw new FrameworkError(`--testcase ${filters.testcase} not found in master.csv`);
    selected = found; // ignores Execute by design
  } else if (filters.tags) {
    selected = entries.filter(
      (e) => evaluateTagExpr(filters.tags as string, matchableTags(e)) && (filters.all || e.row.Execute),
    );
  } else if (filters.all) {
    selected = [...entries];
  } else {
    selected = entries.filter((e) => e.row.Execute);
  }

  if (filters.feature) {
    selected = selected.filter((e) => e.row.Feature === filters.feature);
  }
  return selected;
}

/**
 * Order selected entries so a DependsOn target runs before its dependent.
 * Returns entries in a safe execution order; unknown/cyclic deps are reported.
 */
export function orderByDependsOn(entries: MasterEntry[]): MasterEntry[] {
  const byId = new Map(entries.map((e) => [e.row.TC_ID, e]));
  const visited = new Set<string>();
  const inStack = new Set<string>();
  const ordered: MasterEntry[] = [];

  const visit = (e: MasterEntry): void => {
    const id = e.row.TC_ID;
    if (visited.has(id)) return;
    if (inStack.has(id)) throw new FrameworkError(`DependsOn cycle detected at TC_ID "${id}"`);
    inStack.add(id);
    const dep = e.row.DependsOn?.trim();
    if (dep && byId.has(dep)) visit(byId.get(dep) as MasterEntry);
    inStack.delete(id);
    visited.add(id);
    ordered.push(e);
  };

  for (const e of entries) visit(e);
  return ordered;
}
