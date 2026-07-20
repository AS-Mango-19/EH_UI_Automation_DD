/** results.json — the machine-readable run record (an HTML file can't gate CI). */
import fs from 'node:fs';
import path from 'node:path';
import type { RunSummary } from '../model/types.js';
import { runReportsDir, ensureDir } from '../utils/paths.js';

export function writeResultsJson(summary: RunSummary): string {
  const dir = ensureDir(runReportsDir(summary.runId));
  const file = path.join(dir, 'results.json');
  fs.writeFileSync(file, JSON.stringify(summary, null, 2) + '\n', 'utf8');
  return file;
}
