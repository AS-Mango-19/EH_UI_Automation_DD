/**
 * Reporter façade — writes all four artifacts for a run: per-feature HTML,
 * combined HTML, results.json and junit.xml.
 */
import type { RunSummary } from '../model/types.js';
import { writeFeatureReport } from './featureHtml.js';
import { writeCombinedReport } from './combinedHtml.js';
import { writeResultsJson } from './json.js';
import { writeJUnit } from './junit.js';
import { logger } from '../utils/logger.js';
import path from 'node:path';

export interface ReportPaths {
  featureReports: string[];
  combined: string;
  json: string;
  junit: string;
}

export function writeReports(summary: RunSummary): ReportPaths {
  // Per-feature reports (group iterations by module/feature).
  const byFeature = new Map<string, typeof summary.iterations>();
  for (const it of summary.iterations) {
    const key = `${it.module}/${it.feature}`;
    const arr = byFeature.get(key) ?? [];
    arr.push(it);
    byFeature.set(key, arr);
  }
  const featureReports: string[] = [];
  for (const [key, iterations] of byFeature) {
    const [module = '', feature = ''] = key.split('/');
    featureReports.push(writeFeatureReport(module, feature, summary.runId, summary.env, iterations));
  }

  const combined = writeCombinedReport(summary);
  const json = writeResultsJson(summary);
  const junit = writeJUnit(summary);

  logger.info(`Reports written:`);
  logger.info(`  combined: ${path.relative(process.cwd(), combined)}`);
  logger.info(`  json:     ${path.relative(process.cwd(), json)}`);
  logger.info(`  junit:    ${path.relative(process.cwd(), junit)}`);
  for (const f of featureReports) logger.info(`  feature:  ${path.relative(process.cwd(), f)}`);
  return { featureReports, combined, json, junit };
}
