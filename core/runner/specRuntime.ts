/**
 * Runtime bridge that the generated *.spec.ts files call. It registers one
 * Playwright-test `test()` per (TC_ID, IterationID) and drives the SAME engine
 * used by the CLI orchestrator — so `npx playwright test` and `npm run test`
 * share one code path. The generated spec stays a single thin call.
 */
import { test, expect } from '@playwright/test';
import { DateTime } from 'luxon';
import { loadEnv } from '../../config/environments.js';
import { loadMaster } from '../loaders/masterLoader.js';
import { loadFeature } from '../loaders/featureLoader.js';
import { createRunIdentity } from '../utils/uniqueId.js';
import { RunContext } from './context.js';
import { executeSteps } from './executeSteps.js';
import type { BaselineMode } from '../../config/framework.config.js';
import { runArtifactsDir, ensureDir } from '../utils/paths.js';
import path from 'node:path';

export interface GeneratedSpecOptions {
  module: string;
  feature: string;
  metadataFileRel: string;
  testDataDirRel: string;
}

export function runGeneratedSpec(opts: GeneratedSpecOptions): void {
  const envName = process.env.ENV || 'qa';
  const env = loadEnv(envName);
  const identity = createRunIdentity(DateTime.now());

  const feature = loadFeature({
    module: opts.module,
    feature: opts.feature,
    metadataFileRel: opts.metadataFileRel,
    testDataDirRel: opts.testDataDirRel,
  });

  const master = loadMaster();
  const entries = master.entries.filter(
    (e) => e.row.Feature === opts.feature && (e.row.Execute || process.env.RUN_ALL === '1'),
  );

  test.describe(`${opts.module}/${opts.feature}`, () => {
    if (feature.config.serial) test.describe.configure({ mode: 'serial' });
    for (const entry of entries) {
      const iterations = feature.testData.iterationsFor(entry.row.TC_ID);
      for (const iterationId of iterations) {
        test(`${entry.row.TC_ID} ${iterationId} — ${entry.row.TestName || entry.row.Description}`, async ({ page, request }) => {
          test.setTimeout(feature.config.simulation.maxWaitMs + 120_000);
          const artifactsDir = ensureDir(
            path.join(runArtifactsDir(identity.runId), `${entry.row.TC_ID}_${iterationId}`),
          );
          const ctx = new RunContext({
            runId: identity.runId,
            timestamp: identity.timestamp,
            startedAt: identity.startedAt,
            env,
            master: entry.row,
            feature,
            tcId: entry.row.TC_ID,
            iterationId,
            browser: 'chromium',
            artifactsDir,
          });
          ctx.page = page;
          ctx.apiRequest = request;
          ctx.baselineMode = entry.row.BaselineMode as BaselineMode;
          ctx.updateBaseline = process.env.UPDATE_BASELINE === '1';

          // Generated specs run login via metadata (no storageState drop here).
          const { status, reason } = await executeSteps(ctx, feature, { dropLogin: false });
          expect(status, reason ?? status).not.toBe('FAIL');
          expect(status, reason ?? status).not.toBe('ERROR');
          expect(status, reason ?? status).not.toBe('SIMULATION_TIMEOUT');
        });
      }
    }
  });
}
