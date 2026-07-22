/**
 * KEYWORD CATALOG — pure, dependency-free declaration of every action (§7).
 *
 * This is the single source of truth for BOTH:
 *   - the validator (unknown action? required column missing? needs a locator?),
 *   - the runtime registry (which asserts a handler exists for every entry).
 *
 * It imports nothing runtime (no Page, no ctx) so the validator stays fast and
 * browser-free.
 */
export type KeywordGroup =
  | 'navigation'
  | 'input'
  | 'wait'
  | 'capture'
  | 'assert'
  | 'flow'
  | 'api'
  | 'comparison';

export type MetadataColumn =
  | 'ObjectName'
  | 'InputValue'
  | 'StoreAs'
  | 'ExpectedValue'
  | 'AssertType'
  | 'WaitCondition';

export interface KeywordSpec {
  name: string;
  group: KeywordGroup;
  /** Columns that MUST be non-blank for this action; validator rejects otherwise. */
  requiredColumns: MetadataColumn[];
  /** Action targets a UI object => ObjectName must resolve in selectors.csv. */
  needsLocator: boolean;
  /** InputValue is a path (relative to repo root) that must exist. */
  inputIsPath?: boolean;
  /** Emit this validator warning on every use (e.g. sleep). */
  warn?: string;
  /** Soft assert: record failure and continue rather than throw. */
  soft?: boolean;
}

function spec(
  name: string,
  group: KeywordGroup,
  requiredColumns: MetadataColumn[],
  needsLocator: boolean,
  extra: Partial<KeywordSpec> = {},
): KeywordSpec {
  return { name, group, requiredColumns, needsLocator, ...extra };
}

const list: KeywordSpec[] = [
  // Navigation
  spec('navigate', 'navigation', ['InputValue'], false),
  spec('goBack', 'navigation', [], false),
  spec('reload', 'navigation', [], false),
  spec('switchTab', 'navigation', ['InputValue'], false),
  spec('switchFrame', 'navigation', ['ObjectName'], true),

  // Input
  spec('click', 'input', ['ObjectName'], true),
  spec('doubleClick', 'input', ['ObjectName'], true),
  spec('rightClick', 'input', ['ObjectName'], true),
  spec('fill', 'input', ['ObjectName', 'InputValue'], true),
  spec('type', 'input', ['ObjectName', 'InputValue'], true),
  spec('clear', 'input', ['ObjectName'], true),
  spec('select', 'input', ['ObjectName', 'InputValue'], true),
  // check/uncheck REQUIRE an InputValue even though the handler only calls
  // .check(): the value parameterizes the selector's {0}, so it is what picks
  // WHICH radio in the group. A blank InputValue is a blind click that re-asserts
  // whatever the recording happened to select — it can never be right for every
  // iteration, and it silently overrode a data-driven choice made earlier in the
  // run. Give it a ${data.*} token (blank/N/A then skips the step per iteration).
  spec('check', 'input', ['ObjectName', 'InputValue'], true),
  spec('uncheck', 'input', ['ObjectName', 'InputValue'], true),
  spec('upload', 'input', ['ObjectName', 'InputValue'], true, { inputIsPath: true }),
  spec('hover', 'input', ['ObjectName'], true),
  spec('press', 'input', ['ObjectName', 'InputValue'], true),
  spec('dragAndDrop', 'input', ['ObjectName', 'InputValue'], true),

  // Wait
  spec('waitForSelector', 'wait', ['ObjectName'], true),
  spec('waitForText', 'wait', ['ObjectName', 'ExpectedValue'], true),
  spec('waitForNetworkIdle', 'wait', [], false),
  spec('waitForDownload', 'wait', [], false),
  spec('waitForSimulation', 'wait', ['ObjectName'], true),
  spec('sleep', 'wait', ['InputValue'], false, {
    warn: 'sleep is a last resort — poll a condition instead. Every use is flagged.',
  }),

  // Capture
  spec('storeText', 'capture', ['ObjectName', 'StoreAs'], true),
  spec('storeAttribute', 'capture', ['ObjectName', 'StoreAs'], true), // ObjectName = "object|attr"
  spec('storeValue', 'capture', ['ObjectName', 'StoreAs'], true),
  spec('storeUrl', 'capture', ['StoreAs'], false),
  spec('extractTable', 'capture', ['ObjectName'], true),
  spec('downloadFile', 'capture', ['ObjectName'], true),

  // Assert (+ soft variants)
  spec('assertVisible', 'assert', ['ObjectName'], true),
  spec('assertHidden', 'assert', ['ObjectName'], true),
  spec('assertText', 'assert', ['ObjectName', 'ExpectedValue'], true),
  spec('assertContains', 'assert', ['ObjectName', 'ExpectedValue'], true),
  spec('assertValue', 'assert', ['ObjectName', 'ExpectedValue'], true),
  spec('assertCount', 'assert', ['ObjectName', 'ExpectedValue'], true),
  spec('assertEnabled', 'assert', ['ObjectName'], true),
  spec('assertUrl', 'assert', ['ExpectedValue'], false),
  spec('softAssertVisible', 'assert', ['ObjectName'], true, { soft: true }),
  spec('softAssertHidden', 'assert', ['ObjectName'], true, { soft: true }),
  spec('softAssertText', 'assert', ['ObjectName', 'ExpectedValue'], true, { soft: true }),
  spec('softAssertContains', 'assert', ['ObjectName', 'ExpectedValue'], true, { soft: true }),
  spec('softAssertValue', 'assert', ['ObjectName', 'ExpectedValue'], true, { soft: true }),
  spec('softAssertCount', 'assert', ['ObjectName', 'ExpectedValue'], true, { soft: true }),
  spec('softAssertEnabled', 'assert', ['ObjectName'], true, { soft: true }),
  spec('softAssertUrl', 'assert', ['ExpectedValue'], false, { soft: true }),

  // Flow
  spec('callReusable', 'flow', ['InputValue'], false, { inputIsPath: true }),
  spec('callCustom', 'flow', ['InputValue'], false),
  spec('ifExists', 'flow', ['ObjectName', 'InputValue'], true, { inputIsPath: true }),
  spec('loopOverData', 'flow', ['ObjectName', 'InputValue'], false, { inputIsPath: true }),

  // API
  spec('apiRequest', 'api', ['InputValue'], false),

  // Comparison
  spec('compareWithBaseline', 'comparison', [], false),
];

export const KEYWORD_CATALOG: ReadonlyMap<string, KeywordSpec> = new Map(list.map((s) => [s.name, s]));

export const ACTION_NAMES: readonly string[] = list.map((s) => s.name);

export function getKeywordSpec(name: string): KeywordSpec | undefined {
  return KEYWORD_CATALOG.get(name);
}
