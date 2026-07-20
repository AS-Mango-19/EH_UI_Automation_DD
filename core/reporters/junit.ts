/**
 * junit.xml — for CI gating. Status mapping:
 *   PASS -> passed, FAIL -> failure, ERROR/SIMULATION_TIMEOUT -> error,
 *   SKIPPED/BASELINE_CREATED -> skipped (BASELINE_CREATED verified nothing).
 */
import fs from 'node:fs';
import path from 'node:path';
import type { RunSummary, IterationResult } from '../model/types.js';
import { runReportsDir, ensureDir } from '../utils/paths.js';
import { escapeXml } from './util.js';

function caseXml(it: IterationResult): string {
  const name = escapeXml(`${it.tcId} ${it.iterationId} ${it.testName}`);
  const classname = escapeXml(`${it.module}.${it.feature}`);
  const time = (it.durationMs / 1000).toFixed(3);
  const open = `    <testcase name="${name}" classname="${classname}" time="${time}">`;
  const reason = escapeXml(it.failureReason ?? it.compare?.summary ?? it.status);
  switch (it.status) {
    case 'FAIL':
      return `${open}\n      <failure message="${reason}" type="ValueMismatch"/>\n    </testcase>`;
    case 'ERROR':
    case 'SIMULATION_TIMEOUT':
      return `${open}\n      <error message="${reason}" type="${it.status}"/>\n    </testcase>`;
    case 'SKIPPED':
    case 'BASELINE_CREATED':
      return `${open}\n      <skipped message="${escapeXml(it.status)}"/>\n    </testcase>`;
    default:
      return `${open}\n    </testcase>`;
  }
}

export function writeJUnit(summary: RunSummary): string {
  const dir = ensureDir(runReportsDir(summary.runId));
  const file = path.join(dir, 'junit.xml');
  const failures = summary.counts.FAIL;
  const errors = summary.counts.ERROR + summary.counts.SIMULATION_TIMEOUT;
  const skipped = summary.counts.SKIPPED + summary.counts.BASELINE_CREATED;
  const time = (summary.durationMs / 1000).toFixed(3);
  const cases = summary.iterations.map(caseXml).join('\n');
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<testsuites name="EH_UI_Automation" tests="${summary.total}" failures="${failures}" errors="${errors}" skipped="${skipped}" time="${time}">\n` +
    `  <testsuite name="regression" tests="${summary.total}" failures="${failures}" errors="${errors}" skipped="${skipped}" time="${time}" timestamp="${escapeXml(summary.startedAt)}">\n` +
    `${cases}\n` +
    `  </testsuite>\n` +
    `</testsuites>\n`;
  fs.writeFileSync(file, xml, 'utf8');
  return file;
}
