/**
 * SkipIf evaluation (§5.3). A step is SKIPPED when its SkipIf condition is TRUE.
 * Grammar: <lhs> (==|!=) <rhs>, where either side may be the literal EMPTY
 * (which stands for the empty string) and ${...} tokens are resolved first.
 *
 *   ${master.ProjectID}!=EMPTY   => skip when a ProjectID is present (reuse case)
 *   ${master.ProjectID}==EMPTY   => skip when creating a new project
 *
 * N/A on the RHS is special: it means "not applicable" and matches the empty string
 * OR any N/A spelling (isNaCell), so `${data.design.dropoutTable.1.x}==N/A` skips both
 * when the field is the literal N/A (an unused method within a present period) AND when
 * the period is ABSENT — a child-table fold yields '' for an absent period but the
 * literal 'N/A' for an unused field, and both mean "not applicable". `==EMPTY` stays a
 * strict empty-string check (used by loopPeriods count-field gates), so the two differ.
 */
import type { RunContext } from './context.js';
import { FrameworkError } from '../utils/errors.js';

const EMPTY_LITERAL = 'EMPTY';
const NA_RE = /^(n\/a|not applicable)$/i;

/** A "not applicable" cell — blank or an N/A spelling (mirrors the runtime skip rule). */
function isNaCell(v: string): boolean {
  const t = (v ?? '').trim();
  return t === '' || NA_RE.test(t);
}

export function evaluateSkipIf(ctx: RunContext, expr: string, loc: { stepId?: number | string } = {}): boolean {
  const trimmed = expr.trim();
  if (trimmed === '') return false;
  const m = /^(.*?)(==|!=)(.*)$/.exec(trimmed);
  if (!m) {
    throw new FrameworkError(`Malformed SkipIf "${expr}" (expected LHS ==|!= RHS)`, loc);
  }
  const [, lhsRaw = '', op, rhsRaw = ''] = m;
  const lhs = sideValue(ctx, lhsRaw.trim(), loc);
  const rhsTrim = rhsRaw.trim();
  // RHS N/A => isNaCell comparison (empty OR any N/A spelling), NOT a literal compare.
  if (NA_RE.test(rhsTrim)) {
    const na = isNaCell(lhs);
    return op === '==' ? na : !na;
  }
  const rhs = sideValue(ctx, rhsTrim, loc);
  const equal = lhs === rhs;
  return op === '==' ? equal : !equal;
}

function sideValue(ctx: RunContext, side: string, loc: { stepId?: number | string }): string {
  if (side.toUpperCase() === EMPTY_LITERAL) return '';
  return ctx.resolve(side, loc);
}
