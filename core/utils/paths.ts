/**
 * Central path resolution. Repo root is the process CWD (the CLI is always
 * invoked from the repo root via npm scripts). All framework paths derive from
 * here so nothing hard-codes absolute locations.
 */
import path from 'node:path';
import fs from 'node:fs';

export const repoRoot = (): string => process.cwd();

export const abs = (...segments: string[]): string => path.resolve(repoRoot(), ...segments);

export const masterCsvPath = (): string => abs('master.csv');

/** A feature lives at <repoRoot>/<Module>/feature_<Feature>/ so folder names are stable and explicit. */
export const featureDir = (module: string, feature: string): string => abs(module, `feature_${feature}`);

export const featurePaths = (module: string, feature: string) => {
  const root = featureDir(module, feature);
  return {
    root,
    config: path.join(root, '00_config'),
    featureConfig: path.join(root, '00_config', 'feature.config.json'),
    testdata: path.join(root, '01_testdata'),
    metadata: path.join(root, '03_metadata'),
    selectors: path.join(root, '02_selectors_repo', 'selectors.csv'),
    generatedPom: path.join(root, '04_generated_pom'),
    generatedScripts: path.join(root, '05_generated_scripts'),
    baseline: path.join(root, '06_baseline'),
    compareConfig: path.join(root, '06_baseline', 'compare.config.csv'),
    baselineEnvDir: (env: string) => path.join(root, '06_baseline', env),
    actualResults: path.join(root, '07_actual_results'),
    diffs: path.join(root, '08_diffs'),
    htmlReport: path.join(root, '09_html_report'),
  };
};

export const runArtifactsDir = (runId: string): string => abs('artifacts', runId);
export const runReportsDir = (runId: string): string => abs('reports', runId);
export const authStateDir = (): string => abs('.auth');

export const ensureDir = (dir: string): string => {
  fs.mkdirSync(dir, { recursive: true });
  return dir;
};

export const exists = (p: string): boolean => fs.existsSync(p);

export const flowsDir = (): string => abs('flows');
export const customDir = (): string => abs('custom');
