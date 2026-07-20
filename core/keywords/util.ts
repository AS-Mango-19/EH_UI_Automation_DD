/**
 * Shared helpers for keyword handlers: locator resolution against the current
 * DOM root (page or switched frame) and ObjectName|attribute splitting.
 */
import type { Locator } from 'playwright';
import type { RunContext } from '../runner/context.js';
import type { ResolvedStep } from './types.js';
import { resolveLocator } from '../locators/resolver.js';

/** Split "object|attribute" into its parts (attribute optional). */
export function objectAndAttr(objectName: string): { object: string; attr?: string } {
  const [object, attr] = objectName.split('|');
  return { object: (object ?? '').trim(), attr: attr?.trim() };
}

/** Resolve the step's target object to a Locator (with fallback + dynamic args). */
export async function targetLocator(ctx: RunContext, step: ResolvedStep, objectOverride?: string): Promise<Locator> {
  const object = objectOverride ?? objectAndAttr(step.objectName).object;
  return resolveLocator(ctx.root(), ctx.feature.selectorIndex, step.page, object, {
    dynamicArgs: step.dynamicArgs,
  });
}
