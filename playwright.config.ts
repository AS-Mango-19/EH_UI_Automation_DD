/**
 * Playwright Test config — powers `npx playwright test` / `npm run pw:test`, which
 * runs the AUTO-GENERATED specs under the 05_generated_scripts folders. The primary
 * CLI (`npm run test`) uses the orchestrator directly; both share the same engine.
 */
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'node:fs';

const envName = process.env.ENV || 'qa';
for (const f of [`.env.${envName}`, '.env']) if (fs.existsSync(f)) dotenv.config({ path: f });

const HEADLESS = (process.env.HEADLESS ?? 'true').toLowerCase() !== 'false';
const WORKERS = Number(process.env.WORKERS ?? '4') || 4;

export default defineConfig({
  testDir: '.',
  testMatch: '**/05_generated_scripts/*.spec.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: WORKERS,
  timeout: 20 * 60 * 1000, // simulations can run ~15 min; give headroom
  expect: { timeout: 30_000 },
  reporter: [
    ['list'],
    ['junit', { outputFile: 'reports/playwright/junit.xml' }],
    ['html', { open: 'never', outputFolder: 'reports/playwright/html' }],
  ],
  use: {
    baseURL: process.env.BASE_URL,
    headless: HEADLESS,
    ignoreHTTPSErrors: true,
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    viewport: { width: 1440, height: 900 },
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
