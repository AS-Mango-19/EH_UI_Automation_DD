/**
 * selectors.csv -> Playwright Locator, honouring the resolution priority
 * (testid → role → label → text → css → xpath), Dynamic {0}/{1} interpolation,
 * and the FallbackSelector early-warning system for UI drift (§5.4).
 *
 * The primary selector is tried first; if it matches ZERO elements and a
 * FallbackSelector exists, we fall back and log a WARNING — that warning is the
 * signal that the app's markup has drifted and selectors.csv needs attention.
 */
import type { Page, Locator, FrameLocator } from 'playwright';
import type { SelectorRow } from '../schema/selectors.schema.js';
import { selectorKey } from '../loaders/featureLoader.js';
import { FrameworkError } from '../utils/errors.js';
import { logger } from '../utils/logger.js';

export type LocatorRoot = Page | FrameLocator;

export interface ResolveOptions {
  dynamicArgs?: string[];
}

function interpolate(template: string, args: string[]): string {
  return template.replace(/\{(\d+)\}/g, (_m, idx) => {
    const i = Number(idx);
    return args[i] ?? `{${idx}}`;
  });
}

/** Build a Locator from a single selector row (no fallback logic). */
export function buildLocator(root: LocatorRoot, sel: SelectorRow, dynamicArgs: string[] = []): Locator {
  const value = sel.Dynamic ? interpolate(sel.SelectorValue, dynamicArgs) : sel.SelectorValue;
  const roleName = sel.Dynamic ? interpolate(sel.RoleName, dynamicArgs) : sel.RoleName;
  // Playwright matches accessible names by substring unless told otherwise, so
  // "Two Arm Confirmatory" also matches "Two Arm Confirmatory - Multiple
  // Endpoints". Exact=TRUE in selectors.csv opts a row into exact matching.
  const exact = sel.Exact;
  switch (sel.SelectorType) {
    case 'testid':
      return root.getByTestId(value);
    case 'role':
      return root.getByRole(value as Parameters<LocatorRoot['getByRole']>[0], roleName ? { name: roleName, exact } : undefined);
    case 'label':
      return root.getByLabel(value, { exact });
    case 'placeholder':
      return root.getByPlaceholder(value, { exact });
    case 'text':
      return root.getByText(value, { exact });
    case 'css':
      return root.locator(value);
    case 'xpath':
      return root.locator(value.startsWith('//') || value.startsWith('xpath=') ? value : `xpath=${value}`);
    default: {
      // Exhaustiveness guard.
      const never: never = sel.SelectorType;
      throw new FrameworkError(`Unsupported SelectorType "${String(never)}" for ${sel.ObjectName}`);
    }
  }
}

/** Build a Locator from a raw fallback selector string (treated as css unless xpath-like). */
function buildFallback(root: LocatorRoot, fallback: string): Locator {
  return root.locator(fallback.startsWith('//') || fallback.startsWith('xpath=') ? fallback : fallback);
}

/**
 * Resolve an object to a Locator. If the primary matches 0 elements and a
 * fallback exists, use the fallback and warn. Throws if the object is unknown.
 */
export async function resolveLocator(
  root: LocatorRoot,
  selectorIndex: Map<string, SelectorRow>,
  pageName: string,
  objectName: string,
  opts: ResolveOptions = {},
): Promise<Locator> {
  const sel = selectorIndex.get(selectorKey(pageName, objectName));
  if (!sel) {
    throw new FrameworkError(`Locator not found: Page="${pageName}" ObjectName="${objectName}" (check selectors.csv)`);
  }
  const primary = buildLocator(root, sel, opts.dynamicArgs ?? []);
  if (sel.FallbackSelector) {
    let count = 0;
    try {
      count = await primary.count();
    } catch {
      count = 0;
    }
    if (count === 0) {
      logger.warn(
        `UI-DRIFT: primary selector for ${pageName}/${objectName} matched 0 elements; using FallbackSelector "${sel.FallbackSelector}". Update selectors.csv.`,
      );
      return buildFallback(root, sel.FallbackSelector);
    }
  }
  return primary;
}

/** Synchronous resolve without the fallback count-check (used where a lazy Locator is fine). */
export function resolveLocatorSync(
  root: LocatorRoot,
  selectorIndex: Map<string, SelectorRow>,
  pageName: string,
  objectName: string,
  opts: ResolveOptions = {},
): Locator {
  const sel = selectorIndex.get(selectorKey(pageName, objectName));
  if (!sel) {
    throw new FrameworkError(`Locator not found: Page="${pageName}" ObjectName="${objectName}" (check selectors.csv)`);
  }
  return buildLocator(root, sel, opts.dynamicArgs ?? []);
}
