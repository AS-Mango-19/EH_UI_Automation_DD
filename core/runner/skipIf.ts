/**
 * SkipIf evaluation (§5.3). A step is SKIPPED when its SkipIf condition is TRUE.
 * Grammar: <lhs> (==|!=) <rhs>, where either side may be the literal EMPTY
 * (which stands for the empty string) and ${...} tokens are resolved first.
 *
 *   ${master.ProjectID}!=EMPTY   => skip when a ProjectID is present (reuse case)
 *   ${master.ProjectID}==EMPTY   => skip when creating a new project
 */
import type { RunContext } from './context.js';
import { FrameworkError } from '../utils/errors.js';

const EMPTY_LITERAL = 'EMPTY';

export function evaluateSkipIf(ctx: RunContext, expr: string, loc: { stepId?: number | string } = {}): boolean {
  const trimmed = expr.trim();
  if (trimmed === '') return false;
  const m = /^(.*?)(==|!=)(.*)$/.exec(trimmed);
  if (!m) {
    throw new FrameworkError(`Malformed SkipIf "${expr}" (expected LHS ==|!= RHS)`, loc);
  }
  const [, lhsRaw = '', op, rhsRaw = ''] = m;
  const lhs = sideValue(ctx, lhsRaw.trim(), loc);
  const rhs = sideValue(ctx, rhsRaw.trim(), loc);
  const equal = lhs === rhs;
  return op === '==' ? equal : !equal;
}

function sideValue(ctx: RunContext, side: string, loc: { stepId?: number | string }): string {
  if (side.toUpperCase() === EMPTY_LITERAL) return '';
  return ctx.resolve(side, loc);
}
