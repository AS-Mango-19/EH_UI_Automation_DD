/**
 * Framework-wide defaults and constants. NOT app-specific — no selectors, URLs,
 * credentials or per-feature timeouts here (§14). Per-feature values live in
 * feature.config.json; per-step values live in metadata.csv.
 */
export const FRAMEWORK_CONFIG = {
  /** Fallback step timeout when a metadata row leaves Timeout blank. */
  defaultStepTimeoutMs: 30_000,
  /** Default backoff between retries for the metadata `Retry` column. */
  retryDelayMs: 750,
  /** Default worker count when WORKERS is unset. */
  defaultWorkers: 4,
  /** Default browser when master.csv Browser is blank. */
  defaultBrowser: 'chromium' as const,
  /** Default baseline mode when master.csv has no BaselineMode column. */
  defaultBaselineMode: 'compare' as const,
  /** Default metadata file, relative to the feature dir, when master leaves it blank. */
  defaultMetadataFile: '03_metadata/metadata.csv',
  /** Default testdata directory, relative to the feature dir. */
  defaultTestDataDir: '01_testdata',
  /** Volatile columns never used as comparison keys even if present. */
  reservedVolatileColumns: ['RunID', 'Timestamp', 'ProjectID'],
  /** Simulation polling defaults (overridden by feature.config.json.simulation). */
  simulation: {
    pollIntervalMs: 5_000,
    maxWaitMs: 900_000,
    successText: 'Completed',
    failureText: 'Failed',
  },
} as const;

export type BrowserName = 'chromium' | 'firefox' | 'webkit';
export type BaselineMode = 'compare' | 'create' | 'update';
