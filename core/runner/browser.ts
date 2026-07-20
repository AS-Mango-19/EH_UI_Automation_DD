/**
 * Browser & context lifecycle. Wraps the `playwright` library (not the test
 * runner) so the orchestrator has full control over dynamic, CSV-driven
 * execution, tracing, video and storageState reuse.
 */
import fs from 'node:fs';
import path from 'node:path';
import { chromium, firefox, webkit, request, type Browser, type BrowserContext, type APIRequestContext } from 'playwright';
import type { EnvConfig } from '../../config/environments.js';
import { ensureDir } from '../utils/paths.js';
import { FrameworkError } from '../utils/errors.js';

export type BrowserName = 'chromium' | 'firefox' | 'webkit';

export async function launchBrowser(name: BrowserName, headless: boolean): Promise<Browser> {
  const engine = name === 'firefox' ? firefox : name === 'webkit' ? webkit : chromium;
  return engine.launch({
    headless,
    args: headless ? [] : ['--start-maximized'],
  });
}

export interface ContextOptions {
  storageStatePath?: string;
  recordVideoDir?: string;
  baseURL?: string;
}

export async function createContext(browser: Browser, opts: ContextOptions): Promise<BrowserContext> {
  const storageState = opts.storageStatePath && fs.existsSync(opts.storageStatePath) ? opts.storageStatePath : undefined;
  const context = await browser.newContext({
    storageState,
    baseURL: opts.baseURL,
    recordVideo: opts.recordVideoDir ? { dir: ensureDir(opts.recordVideoDir) } : undefined,
    viewport: null,
    ignoreHTTPSErrors: true,
  });
  return context;
}

/** API context, seeded with the same storageState (cookies) so authed calls work. */
export async function createApiContext(env: EnvConfig, storageStatePath?: string): Promise<APIRequestContext> {
  const storageState = storageStatePath && fs.existsSync(storageStatePath) ? storageStatePath : undefined;
  return request.newContext({
    baseURL: env.apiBaseUrl,
    storageState,
    ignoreHTTPSErrors: true,
    extraHTTPHeaders: env.raw['API_TOKEN'] ? { Authorization: `Bearer ${env.raw['API_TOKEN']}` } : undefined,
  });
}

export async function startTracing(context: BrowserContext): Promise<void> {
  await context.tracing.start({ screenshots: true, snapshots: true, sources: true });
}

export async function stopTracing(context: BrowserContext, tracePath: string): Promise<string | undefined> {
  try {
    ensureDir(path.dirname(tracePath));
    await context.tracing.stop({ path: tracePath });
    return tracePath;
  } catch (e) {
    throw new FrameworkError(`Failed to save trace: ${(e as Error).message}`);
  }
}
