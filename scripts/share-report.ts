/**
 * Build ONE self-contained HTML report you can send to anyone.
 *
 * Neither shipped report survives being sent on its own:
 *   - 09_html_report/index.html links screenshots relatively into artifacts/.
 *   - combined_report.html's Drill-down links climb out of reports/.
 * The recipient gets broken images or a 404.
 *
 * This writes a single file containing the run summary, the Feature x TC matrix
 * (drill-down as in-page anchors), and every iteration's full step table with
 * descriptions and the baseline comparison. Screenshots are embedded unless --lite.
 *
 * It re-renders from reports/<runId>/results.json, so it works on any run that
 * already happened; nothing is re-executed.
 *
 * Usage:
 *   npm run report:share                 # newest run, screenshots embedded
 *   npm run report:share -- --lite       # no screenshots (~40KB, emailable)
 *   npm run report:share -- <runId>      # a specific run
 *   npm run report:share -- --list       # show available runs
 */
import fs from 'node:fs';
import path from 'node:path';
import type { RunSummary } from '../core/model/types.js';
import { renderShareableRunReport } from '../core/reporters/shareableHtml.js';
import { abs, ensureDir } from '../core/utils/paths.js';

function usage(): void {
  console.log([
    'Usage: npm run report:share [-- <runId>] [--lite] [--list]',
    '',
    'Writes reports/<runId>/run_<runId>_shareable.html — ONE self-contained file:',
    'run summary + every step with its description + baseline comparison.',
    'Send just that file; no artifacts/ folder, no other links to follow.',
    '',
    '  (no args)   newest run, screenshots embedded (~13MB)',
    '  --lite      omit screenshots (~40KB) — still every step + description',
    '  <runId>     a specific run, e.g. 20260717T123816_de4b97',
    '  --list      list the runs available to share',
  ].join('\n'));
}

const runsDir = (): string => abs('reports');

/**
 * Runs that have a results.json, newest first.
 *
 * Sorted by mtime, NOT by name: run ids are timestamps but test fixtures are not
 * (e.g. "RUN_REPORT_TEST"), and an alphabetical sort ranks those above every real
 * run — so the default pick would silently be a fixture.
 */
function availableRuns(): string[] {
  const dir = runsDir();
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((r) => fs.existsSync(path.join(dir, r, 'results.json')))
    .map((r) => ({ r, t: fs.statSync(path.join(dir, r, 'results.json')).mtimeMs }))
    .sort((a, b) => b.t - a.t)
    .map((x) => x.r);
}

function fmtBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

function main(): number {
  const argv = process.argv.slice(2);
  if (argv.includes('-h') || argv.includes('--help')) {
    usage();
    return 0;
  }

  const runs = availableRuns();
  if (argv.includes('--list')) {
    if (!runs.length) {
      console.log('No runs found in reports/. Run a test first.');
      return 0;
    }
    console.log(`${runs.length} run(s) available:`);
    for (const r of runs.slice(0, 20)) console.log(`  ${r}`);
    return 0;
  }

  const lite = argv.includes('--lite');
  const runId = argv.find((a) => !a.startsWith('--')) ?? runs[0];
  if (!runId) {
    console.error('No runs found in reports/. Run a test first.');
    return 1;
  }

  const resultsPath = path.join(runsDir(), runId, 'results.json');
  if (!fs.existsSync(resultsPath)) {
    console.error(`No results.json for run "${runId}". Try: npm run report:share -- --list`);
    return 1;
  }

  const summary = JSON.parse(fs.readFileSync(resultsPath, 'utf8')) as RunSummary;
  const iterations = (summary.iterations ?? []).filter(Boolean);
  if (!iterations.length) {
    console.error(`Run "${runId}" has no iterations to report.`);
    return 1;
  }

  const shots = iterations.reduce((n, it) => n + it.steps.filter((s) => s.screenshotPath).length, 0);
  const missing = lite
    ? 0
    : iterations.reduce(
        (n, it) =>
          n +
          it.steps.filter(
            (s) => s.screenshotPath && !fs.existsSync(path.resolve(process.cwd(), s.screenshotPath)),
          ).length,
        0,
      );

  const html = renderShareableRunReport(summary, { lite });
  const outDir = ensureDir(path.join(runsDir(), runId));
  const file = path.join(outDir, `run_${runId}_shareable${lite ? '_lite' : ''}.html`);
  fs.writeFileSync(file, html, 'utf8');

  const steps = iterations.reduce((n, it) => n + it.steps.length, 0);
  console.log(`Run ${runId} — env ${summary.env} — ${iterations.length} iteration(s), ${steps} step(s)`);
  console.log('');
  console.log(`  ${path.relative(process.cwd(), file)}`);
  console.log(`    ${fmtBytes(Buffer.byteLength(html))}`);
  console.log(
    lite
      ? `    every step + description, no screenshots`
      : `    every step + description · ${shots - missing}/${shots} screenshot(s) embedded`,
  );
  if (missing) {
    console.log(`    WARNING: ${missing} screenshot(s) missing from artifacts/ (pruned) and left as dead links.`);
    console.log(`             Use --lite for a clean file without them, or re-run the test.`);
  }
  console.log('');
  console.log('Self-contained: send just that file. Drill-down links jump within the page.');
  return 0;
}

process.exitCode = main();
