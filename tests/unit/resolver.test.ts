/**
 * Resolver unit tests (§13.6): env/data/master/runtime/date/faker/config tokens,
 * literal concatenation, and the hard "unresolvable => throw" rule.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DateTime } from 'luxon';
import { resolveExpression, type ResolverScope } from '../../core/runner/resolver.js';
import { TestDataStore } from '../../core/runner/testDataStore.js';
import { parseCsvString } from '../../core/csv/reader.js';
import type { EnvConfig } from '../../config/environments.js';
import type { FeatureConfig } from '../../core/schema/featureConfig.schema.js';

function makeScope(over: Partial<ResolverScope> = {}): ResolverScope {
  const design = parseCsvString('TC_ID,IterationID,Power\nTC_01,ITER_01,0.88\n', 'design.csv');
  const testdata = parseCsvString('InputSetname,SelectTest\nSet1,Simon\'s Two Stage\n', 'testdata.csv');
  const store = new TestDataStore(new Map([['design', design], ['testdata', testdata]]));
  const env = {
    env: 'qa',
    baseUrl: 'https://app.test',
    apiBaseUrl: 'https://app.test/api',
    username: 'u',
    password: 'p',
    headless: true,
    workers: 1,
    defaultTimeoutMs: 30000,
    raw: { BASE_URL: 'https://app.test', APP_USERNAME: 'qa_user' },
  } as EnvConfig;
  const featureConfig = { simulation: { maxWaitMs: 900000 } } as unknown as FeatureConfig;
  return {
    env,
    masterRow: { ProjectID: '19080', TC_ID: 'TC_01' },
    runtime: new Map<string, string>(),
    testData: store,
    featureConfig,
    tcId: 'TC_01',
    iterationId: 'ITER_01',
    runId: 'RUN123',
    timestamp: '2026-07-14T00:00:00.000Z',
    startedAt: DateTime.fromISO('2026-07-14T00:00:00.000Z', { zone: 'utc' }),
    ...over,
  };
}

test('resolves env, data, master and literal concatenation', () => {
  const s = makeScope();
  assert.equal(resolveExpression(s, '${env.BASE_URL}/login'), 'https://app.test/login');
  assert.equal(resolveExpression(s, '${data.design.Power}'), '0.88');
  assert.equal(resolveExpression(s, '${master.ProjectID}'), '19080');
  assert.equal(resolveExpression(s, '${data.testdata.InputSetname}_${runId}'), 'Set1_RUN123');
});

test('date tokens resolve against startedAt', () => {
  const s = makeScope();
  assert.equal(resolveExpression(s, '${today}'), '2026-07-14');
  assert.equal(resolveExpression(s, '${today+30d}'), '2026-08-13');
  assert.equal(resolveExpression(s, '${today-7d}'), '2026-07-07');
});

test('config dotted path resolves', () => {
  const s = makeScope();
  assert.equal(resolveExpression(s, '${config.simulation.maxWaitMs}'), '900000');
});

test('runtime variable resolves after being set', () => {
  const s = makeScope();
  s.runtime.set('projectId', '55555');
  assert.equal(resolveExpression(s, '${runtime.projectId}'), '55555');
});

test('unresolvable expressions throw (never blank)', () => {
  const s = makeScope();
  assert.throws(() => resolveExpression(s, '${runtime.missing}'), /Unresolvable/);
  assert.throws(() => resolveExpression(s, '${env.NOPE}'), /Unresolvable/);
  assert.throws(() => resolveExpression(s, '${data.design.NoSuchCol}'), /Unknown column/);
  assert.throws(() => resolveExpression(s, '${bogus.thing}'), /Unresolvable/);
});

test('empty input passes through untouched', () => {
  const s = makeScope();
  assert.equal(resolveExpression(s, ''), '');
});
