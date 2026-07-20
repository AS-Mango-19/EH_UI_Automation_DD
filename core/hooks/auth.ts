/**
 * Auth setup via storageState (§6, Phase 3). Logs in ONCE per environment using
 * the reusable flows/login.csv, saves the storageState, and reuses it for every
 * iteration — so the Login step group can be skipped and tests start authed.
 */
import fs from 'node:fs';
import path from 'node:path';
import type { DateTime } from 'luxon';
import type { EnvConfig } from '../../config/environments.js';
import type { LoadedFeature } from '../loaders/featureLoader.js';
import { RunContext } from '../runner/context.js';
import { parseMasterRow } from '../loaders/masterLoader.js';
import { parseMetadataFile } from '../runner/metadataFile.js';
import { runSteps } from '../runner/stepRunner.js';
import { launchBrowser, createContext, type BrowserName } from '../runner/browser.js';
import { authStateDir, ensureDir, abs, flowsDir } from '../utils/paths.js';
import { logger } from '../utils/logger.js';

export function authStatePath(env: string): string {
  return path.join(authStateDir(), `${env}.json`);
}

export interface EnsureAuthInput {
  feature: LoadedFeature;
  env: EnvConfig;
  browser: BrowserName;
  headless: boolean;
  runId: string;
  timestamp: string;
  startedAt: DateTime;
  artifactsDir: string;
  loginFlow?: string; // default flows/login.csv
  force?: boolean;
}

/** Ensure a storageState file exists; returns its path (or undefined if login flow missing). */
export async function ensureAuthState(input: EnsureAuthInput): Promise<string | undefined> {
  const statePath = authStatePath(input.env.env);
  if (!input.force && fs.existsSync(statePath)) {
    logger.info(`Reusing auth state for env "${input.env.env}" (${path.relative(process.cwd(), statePath)}).`);
    return statePath;
  }
  const flowRel = input.loginFlow ?? path.join('flows', 'login.csv');
  const flowFile = abs(flowRel);
  if (!fs.existsSync(flowFile)) {
    logger.warn(`No login flow at ${flowRel}; skipping storageState setup.`);
    return undefined;
  }

  logger.info(`Establishing auth state for env "${input.env.env}"…`);
  const browser = await launchBrowser(input.browser, input.headless);
  try {
    const context = await createContext(browser, { baseURL: input.env.baseUrl });
    const page = await context.newPage();
    const ctx = new RunContext({
      runId: input.runId,
      timestamp: input.timestamp,
      startedAt: input.startedAt,
      env: input.env,
      master: parseMasterRow({ TC_ID: 'AUTH', Module: input.feature.module, Feature: input.feature.feature }),
      feature: input.feature,
      tcId: 'AUTH',
      iterationId: 'AUTH',
      browser: input.browser,
      artifactsDir: input.artifactsDir,
    });
    ctx.page = page;
    const steps = parseMetadataFile(flowFile);
    await runSteps(ctx, steps, { source: flowRel });
    ensureDir(authStateDir());
    await context.storageState({ path: statePath });
    await context.close();
    logger.info(`Saved auth state -> ${path.relative(process.cwd(), statePath)}`);
    return statePath;
  } finally {
    await browser.close();
  }
}
