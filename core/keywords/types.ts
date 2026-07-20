/**
 * Keyword handler contract. Every keyword is (page, ctx, step) => Promise<void|string>.
 * A returned string is stored under the step's StoreAs by the executor.
 *
 * The executor pre-resolves ${...} in InputValue/ExpectedValue so handlers never
 * touch the resolver directly and the resolved (masked) values are logged once.
 */
import type { Page } from 'playwright';
import type { RunContext } from '../runner/context.js';
import type { MetadataStep } from '../schema/metadata.schema.js';

export interface ResolvedStep {
  raw: MetadataStep;
  stepId: number;
  stepGroup: string;
  page: string;
  action: string;
  /** Raw ObjectName, may be "object|attribute" for storeAttribute. */
  objectName: string;
  /** Resolved InputValue. */
  input: string;
  /** Resolved ExpectedValue. */
  expected: string;
  assertType: string;
  waitCondition: string;
  timeout: number;
  storeAs: string;
  /** Dynamic locator args parsed from the resolved input (split on '|'). */
  dynamicArgs: string[];
}

export type KeywordReturn = void | string;
export type KeywordHandler = (page: Page, ctx: RunContext, step: ResolvedStep) => Promise<KeywordReturn>;
