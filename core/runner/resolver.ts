/**
 * ${...} expression resolution (§8). Resolves against, in order of namespace:
 *   env.*, data.<file>.<col>, master.*, runtime.*, runId, timestamp,
 *   today / today±Nd, faker.*, config.<dotted.path>.
 *
 * HARD RULE: an unresolvable expression THROWS with file/row/column — it is
 * never silently replaced with '' (a blank form field costs a day to debug).
 */
import { faker } from '@faker-js/faker';
import type { DateTime } from 'luxon';
import type { EnvConfig } from '../../config/environments.js';
import type { FeatureConfig } from '../schema/featureConfig.schema.js';
import type { TestDataStore } from './testDataStore.js';
import { resolveDateToken, isDateToken } from '../utils/dates.js';
import { FrameworkError, type ErrorLocation } from '../utils/errors.js';

export interface ResolverScope {
  env: EnvConfig;
  masterRow: Record<string, string>;
  runtime: Map<string, string>;
  testData: TestDataStore;
  featureConfig: FeatureConfig;
  tcId: string;
  iterationId: string;
  runId: string;
  timestamp: string;
  startedAt: DateTime;
}

const TOKEN_RE = /\$\{([^}]+)\}/g;

/** Resolve every ${...} in `raw`. Literal text between tokens is preserved. */
export function resolveExpression(scope: ResolverScope, raw: string, loc: ErrorLocation = {}): string {
  if (raw == null || raw === '') return raw;
  return raw.replace(TOKEN_RE, (_m, exprRaw: string) => {
    const expr = exprRaw.trim();
    const value = resolveToken(scope, expr, loc);
    return value;
  });
}

function resolveToken(scope: ResolverScope, expr: string, loc: ErrorLocation): string {
  // env.X
  if (expr.startsWith('env.')) {
    const key = expr.slice(4);
    const v = scope.env.raw[key];
    if (v === undefined) throw unresolvable(`env var "${key}" is not set`, loc, expr);
    return v;
  }
  // data.<file>.<col>
  if (expr.startsWith('data.')) {
    const rest = expr.slice(5);
    const dot = rest.indexOf('.');
    if (dot === -1) throw unresolvable(`malformed data reference (need data.<file>.<col>)`, loc, expr);
    const file = rest.slice(0, dot);
    const col = rest.slice(dot + 1);
    return scope.testData.get(file, col, scope.tcId, scope.iterationId);
  }
  // master.X
  if (expr.startsWith('master.')) {
    const key = expr.slice(7);
    if (!(key in scope.masterRow)) throw unresolvable(`master column "${key}" does not exist`, loc, expr);
    return scope.masterRow[key] ?? '';
  }
  // runtime.X
  if (expr.startsWith('runtime.')) {
    const key = expr.slice(8);
    const v = scope.runtime.get(key);
    if (v === undefined) {
      throw unresolvable(`runtime variable "${key}" was never captured (check an earlier StoreAs)`, loc, expr);
    }
    return v;
  }
  // config.<dotted.path>
  if (expr.startsWith('config.')) {
    return resolveConfigPath(scope.featureConfig, expr.slice(7), loc, expr);
  }
  // faker.*
  if (expr.startsWith('faker.')) {
    return resolveFaker(expr.slice(6), loc, expr);
  }
  // runId / timestamp
  if (expr === 'runId') return scope.runId;
  if (expr === 'timestamp') return scope.timestamp;
  // date tokens: today, today+30d, today-7d, Now
  if (isDateToken(expr)) return resolveDateToken(expr, scope.startedAt);

  throw unresolvable(`unknown expression namespace`, loc, expr);
}

function resolveConfigPath(config: FeatureConfig, dotted: string, loc: ErrorLocation, expr: string): string {
  let cur: unknown = config;
  for (const part of dotted.split('.')) {
    if (cur && typeof cur === 'object' && part in (cur as Record<string, unknown>)) {
      cur = (cur as Record<string, unknown>)[part];
    } else {
      throw unresolvable(`config path "${dotted}" not found`, loc, expr);
    }
  }
  if (cur == null || typeof cur === 'object') {
    throw unresolvable(`config path "${dotted}" is not a scalar`, loc, expr);
  }
  return String(cur);
}

function resolveFaker(method: string, loc: ErrorLocation, expr: string): string {
  switch (method) {
    case 'uuid':
      return faker.string.uuid();
    case 'company':
      return faker.company.name();
    case 'firstName':
      return faker.person.firstName();
    case 'lastName':
      return faker.person.lastName();
    case 'email':
      return faker.internet.email();
    case 'word':
      return faker.lorem.word();
    case 'number':
      return String(faker.number.int({ min: 1, max: 1_000_000 }));
    default:
      throw unresolvable(`unsupported faker method "${method}"`, loc, expr);
  }
}

function unresolvable(reason: string, loc: ErrorLocation, expr: string): FrameworkError {
  return new FrameworkError(`Unresolvable expression \${${expr}}: ${reason}`, loc);
}
