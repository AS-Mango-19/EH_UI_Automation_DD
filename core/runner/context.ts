/**
 * RunContext — the runtime object threaded through every keyword handler as
 * `ctx`. It carries the variable store (StoreAs), the resolved scope, the loaded
 * feature (selectors, compare config, paths), run identity, and per-iteration
 * state (the created project id, the last extraction, soft-assert failures).
 */
import type { Page, APIRequestContext, FrameLocator } from 'playwright';
import type { DateTime } from 'luxon';
import type { EnvConfig } from '../../config/environments.js';
import type { MasterRow } from '../schema/master.schema.js';
import type { LoadedFeature } from '../loaders/featureLoader.js';
import type { CompareReport } from '../comparator/types.js';
import type { TestStatus, StepResult } from '../model/types.js';
import type { BaselineMode } from '../../config/framework.config.js';
import { resolveExpression, type ResolverScope } from './resolver.js';
import type { ErrorLocation } from '../utils/errors.js';

export interface SoftFailure {
  stepId: number | string;
  message: string;
}

export interface RunContextInit {
  runId: string;
  timestamp: string;
  startedAt: DateTime;
  env: EnvConfig;
  master: MasterRow;
  feature: LoadedFeature;
  tcId: string;
  iterationId: string;
  browser: string;
  artifactsDir: string;
}

export class RunContext {
  readonly runId: string;
  readonly timestamp: string;
  readonly startedAt: DateTime;
  readonly env: EnvConfig;
  readonly master: MasterRow;
  readonly feature: LoadedFeature;
  readonly tcId: string;
  readonly iterationId: string;
  readonly browser: string;
  readonly artifactsDir: string;

  /** Assigned by the executor before steps run. */
  page!: Page;
  apiRequest!: APIRequestContext;
  /** Current frame context, set by switchFrame; null => operate on the page. */
  frame: FrameLocator | null = null;

  readonly runtime = new Map<string, string>();
  readonly soft: SoftFailure[] = [];
  /** Every step's outcome, accumulated for the reporters. */
  readonly stepResults: StepResult[] = [];
  /** Monotonic counter for unique screenshot filenames. */
  screenshotSeq = 0;

  /** Baseline handling for this iteration (master.BaselineMode; CLI can force 'update'). */
  baselineMode: BaselineMode = 'compare';
  /** True when --update-baseline was passed; forces baseline approval. */
  updateBaseline = false;

  /** Set when THIS run created a project (=> eligible for cleanup). */
  createdProjectId?: string;
  /** Populated by extractTable for compareWithBaseline to consume. */
  lastActualRows?: Record<string, string>[];
  lastActualPath?: string;
  compareReport?: CompareReport;
  /** Relative paths to comparison artifacts, set by compareWithBaseline. */
  diffCsvPath?: string;
  diffJsonPath?: string;
  baselinePathRel?: string;
  finalStatus: TestStatus = 'PASS';

  constructor(init: RunContextInit) {
    this.runId = init.runId;
    this.timestamp = init.timestamp;
    this.startedAt = init.startedAt;
    this.env = init.env;
    this.master = init.master;
    this.feature = init.feature;
    this.tcId = init.tcId;
    this.iterationId = init.iterationId;
    this.browser = init.browser;
    this.artifactsDir = init.artifactsDir;
  }

  /** The DOM root operations should target (frame if switched, else page). */
  root(): Page | FrameLocator {
    return this.frame ?? this.page;
  }

  private scope(): ResolverScope {
    return {
      env: this.env,
      masterRow: this.master as unknown as Record<string, string>,
      runtime: this.runtime,
      testData: this.feature.testData,
      featureConfig: this.feature.config,
      tcId: this.tcId,
      iterationId: this.iterationId,
      runId: this.runId,
      timestamp: this.timestamp,
      startedAt: this.startedAt,
    };
  }

  resolve(raw: string, loc: ErrorLocation = {}): string {
    return resolveExpression(this.scope(), raw, { tcId: this.tcId, iterationId: this.iterationId, ...loc });
  }

  setVar(name: string, value: string): void {
    this.runtime.set(name, value);
  }

  getVar(name: string): string | undefined {
    return this.runtime.get(name);
  }
}
