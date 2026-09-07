/**
 * Combined run report -> reports/<runId>/combined_report.html (§10).
 * Self-contained. Run metadata, status counts, a feature×TC matrix, top failure
 * reasons, a trend across the last N runs, and drill-down links into each
 * per-feature report. Opens fine from a CI artifact zip with no network.
 */
import fs from 'node:fs';
import path from 'node:path';
import type { RunSummary, IterationResult, TestStatus } from '../model/types.js';
import { ALL_STATUSES } from '../model/types.js';
import { runReportsDir, ensureDir, abs, featurePaths } from '../utils/paths.js';
import { escapeHtml, fmtDuration, STATUS_COLORS } from './util.js';

const STYLE = `
:root{color-scheme:light dark}*{box-sizing:border-box}
body{font:14px/1.5 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;margin:0;padding:24px;background:#f6f8fa;color:#1f2328}
@media(prefers-color-scheme:dark){body{background:#0d1117;color:#e6edf3}th{background:#21262d}.tile,.panel{background:#161b22;border-color:#30363d}}
h1{font-size:24px;margin:0 0 4px}h2{font-size:16px;margin:22px 0 8px}
.muted{color:#6e7781}
.tiles{display:flex;flex-wrap:wrap;gap:12px;margin:12px 0}
.tile{background:#fff;border:1px solid #d0d7de;border-radius:8px;padding:12px 16px;min-width:120px}
.tile .n{font-size:26px;font-weight:700}
.badge{display:inline-block;padding:2px 8px;border-radius:12px;color:#fff;font-weight:600;font-size:12px}
table{border-collapse:collapse;width:100%;font-size:13px}
th,td{border:1px solid #d0d7de;padding:6px 8px;text-align:left}th{background:#eaeef2}
.panel{background:#fff;border:1px solid #d0d7de;border-radius:8px;padding:16px;margin:12px 0}
a{color:#0969da}
.bar{height:8px;border-radius:4px;background:#eaeef2;overflow:hidden;display:flex}
summary{cursor:pointer;user-select:none}
summary:hover{color:#0969da}
details[open] summary{margin-bottom:10px}
/* The step table is wide; scroll IT, never the page body. */
.scroll{overflow-x:auto}
/* Descriptions are full sentences; cap the width or they starve every other column. */
.desc{min-width:220px;max-width:340px;color:#57606a;font-size:12px}
@media(prefers-color-scheme:dark){.desc{color:#8b949e}}
`;

function badge(status: string): string {
  return `<span class="badge" style="background:${STATUS_COLORS[status] ?? '#6e7781'}">${escapeHtml(status)}</span>`;
}

function tiles(summary: RunSummary): string {
  return (
    `<div class="tiles">` +
    ALL_STATUSES.map(
      (s) =>
        `<div class="tile"><div class="n" style="color:${STATUS_COLORS[s]}">${summary.counts[s]}</div><div class="muted">${s}</div></div>`,
    ).join('') +
    `<div class="tile"><div class="n">${summary.total}</div><div class="muted">TOTAL</div></div>` +
    `</div>`
  );
}

function featureReportLink(it: IterationResult): string {
  const reportsDir = runReportsDir(it2runId(it));
  const target = path.join(featurePaths(it.module, it.feature).htmlReport, 'index.html');
  return path.relative(reportsDir, target).replace(/\\/g, '/');
}
// The report link is relative to reports/<runId>/; runId is the same for all iterations.
let CURRENT_RUN_ID = '';
function it2runId(_it: IterationResult): string {
  return CURRENT_RUN_ID;
}

/** A small "+SIM" chip on the status cell when a simulation phase ran or was skipped. */
function simTag(it: RunSummary['iterations'][number]): string {
  if (!it.sim) return '';
  if (it.sim.skippedReason) return ` <span class="badge" style="background:#8250df" title="${escapeHtml(it.sim.skippedReason)}">SIM skipped</span>`;
  return ` <span class="badge" style="background:${STATUS_COLORS[it.sim.status] ?? '#6e7781'}" title="simulation phase">+SIM ${escapeHtml(it.sim.status)}</span>`;
}

/** Sim compare summary appended to the detail cell. */
function simDetail(it: RunSummary['iterations'][number]): string {
  if (!it.sim || it.sim.skippedReason) return '';
  const txt = it.sim.failureReason ?? it.sim.compare?.summary ?? '';
  return txt ? `<br><small style="color:#8250df">sim: ${escapeHtml(txt)}</small>` : '';
}

function matrix(summary: RunSummary): string {
  const rows = summary.iterations
    .map(
      (it) => `<tr>
      <td>${escapeHtml(it.feature)}</td>
      <td>${escapeHtml(it.tcId)}</td>
      <td>${escapeHtml(it.iterationId)}</td>
      <td>${badge(it.status)}${simTag(it)}</td>
      <td>${fmtDuration(it.durationMs)}</td>
      <td>${escapeHtml(it.failureReason ?? it.compare?.summary ?? '')}${simDetail(it)}</td>
      <td><a href="${escapeHtml(featureReportLink(it))}">report</a></td>
    </tr>`,
    )
    .join('\n');
  return `<table><thead><tr><th>Feature</th><th>TC</th><th>Iteration</th><th>Status</th><th>Duration</th><th>Detail</th><th>Drill-down</th></tr></thead><tbody>${rows}</tbody></table>`;
}

/**
 * Per-iteration step list with the authored Description.
 *
 * Text only — no screenshots. Those live in the per-feature report, and embedding
 * them here would turn a ~6KB summary into megabytes. Collapsed by default so the
 * run summary stays a summary; open one iteration to read what each step did.
 *
 * Seq is the render-time index, matching the per-feature report: steps inlined
 * from a callReusable flow have no metadata row of their own to carry one.
 */
function stepDetail(summary: RunSummary): string {
  return summary.iterations
    .map((it) => {
      const rows = it.steps
        .map(
          (s, i) => `<tr>
        <td>${i + 1}</td>
        <td>${escapeHtml(String(s.stepId))}</td>
        <td>${escapeHtml(s.stepGroup)}</td>
        <td><code>${escapeHtml(s.action)}</code></td>
        <td>${escapeHtml(s.objectName)}</td>
        <td>${escapeHtml(s.resolvedInput)}</td>
        <td style="color:${s.status === 'failed' ? '#cf222e' : s.status === 'passed' ? '#1a7f37' : '#6e7781'}">${escapeHtml(s.status)}</td>
        <td>${fmtDuration(s.durationMs)}</td>
        <td class="desc">${escapeHtml(s.description)}</td>
        <td>${s.error ? `<span style="color:#cf222e">${escapeHtml(s.error)}</span>` : ''}</td>
      </tr>`,
        )
        .join('\n');
      return `<details class="panel">
      <summary><strong>${escapeHtml(it.tcId)} / ${escapeHtml(it.iterationId)}</strong> ${badge(it.status)}
        <span class="muted">${escapeHtml(it.feature)} · ${it.steps.length} step(s)</span></summary>
      <div class="scroll">
      <table><thead><tr><th>Seq</th><th>StepID</th><th>Group</th><th>Action</th><th>Object</th><th>Resolved input (masked)</th><th>Status</th><th>Time</th><th>Description</th><th>Notes</th></tr></thead>
      <tbody>${rows}</tbody></table>
      </div>
    </details>`;
    })
    .join('\n');
}

function topFailures(summary: RunSummary): string {
  const counts = new Map<string, number>();
  for (const it of summary.iterations) {
    if (it.status === 'PASS' || it.status === 'BASELINE_CREATED') continue;
    const reason = (it.failureReason ?? it.compare?.summary ?? it.status).slice(0, 160);
    counts.set(reason, (counts.get(reason) ?? 0) + 1);
  }
  if (counts.size === 0) return `<p class="muted">No failures. 🎉</p>`;
  const rows = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([r, n]) => `<tr><td>${n}</td><td>${escapeHtml(r)}</td></tr>`)
    .join('\n');
  return `<table><thead><tr><th>Count</th><th>Reason</th></tr></thead><tbody>${rows}</tbody></table>`;
}

interface PriorRun {
  runId: string;
  startedAt: string;
  counts: Record<TestStatus, number>;
  total: number;
}

function trend(summary: RunSummary): string {
  const reportsRoot = abs('reports');
  const runs: PriorRun[] = [];
  if (fs.existsSync(reportsRoot)) {
    for (const dir of fs.readdirSync(reportsRoot)) {
      const jsonPath = path.join(reportsRoot, dir, 'results.json');
      if (!fs.existsSync(jsonPath)) continue;
      try {
        const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8')) as RunSummary;
        runs.push({ runId: data.runId, startedAt: data.startedAt, counts: data.counts, total: data.total });
      } catch {
        /* ignore unreadable prior run */
      }
    }
  }
  if (!runs.some((r) => r.runId === summary.runId)) {
    runs.push({ runId: summary.runId, startedAt: summary.startedAt, counts: summary.counts, total: summary.total });
  }
  runs.sort((a, b) => a.startedAt.localeCompare(b.startedAt));
  const lastN = runs.slice(-10);
  const rows = lastN
    .map(
      (r) => `<tr>
      <td>${escapeHtml(r.runId)}</td><td class="muted">${escapeHtml(r.startedAt)}</td>
      <td style="color:${STATUS_COLORS.PASS}">${r.counts.PASS}</td>
      <td style="color:${STATUS_COLORS.FAIL}">${r.counts.FAIL}</td>
      <td style="color:${STATUS_COLORS.SIMULATION_TIMEOUT}">${r.counts.SIMULATION_TIMEOUT}</td>
      <td style="color:${STATUS_COLORS.BASELINE_CREATED}">${r.counts.BASELINE_CREATED}</td>
      <td>${r.total}</td></tr>`,
    )
    .join('\n');
  return `<table><thead><tr><th>Run</th><th>Started</th><th>PASS</th><th>FAIL</th><th>TIMEOUT</th><th>BASELINE</th><th>Total</th></tr></thead><tbody>${rows}</tbody></table>`;
}

export function writeCombinedReport(summary: RunSummary): string {
  CURRENT_RUN_ID = summary.runId;
  const dir = ensureDir(runReportsDir(summary.runId));
  const file = path.join(dir, 'combined_report.html');
  const baseUrl = /^https?:\/\//i.test(summary.baseUrl ?? '')
    ? `<a href="${escapeHtml(summary.baseUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(summary.baseUrl)}</a>`
    : 'Unavailable';
  const meta = `<table>
    <tr><th>Run ID</th><td>${escapeHtml(summary.runId)}</td><th>Base URL</th><td>${baseUrl}</td></tr>
    <tr><th>Started</th><td>${escapeHtml(summary.startedAt)}</td><th>Duration</th><td>${fmtDuration(summary.durationMs)}</td></tr>
    <tr><th>Trigger</th><td>${escapeHtml(summary.trigger)}</td><th>Total</th><td>${summary.total}</td></tr>
  </table>`;
  const body =
    `<h1>Regression run ${escapeHtml(summary.runId)}</h1>` +
    tiles(summary) +
    `<div class="panel"><h2>Run metadata</h2>${meta}</div>` +
    `<div class="panel"><h2>Feature × TC matrix</h2>${matrix(summary)}</div>` +
    `<h2>Steps</h2><p class="muted">Open an iteration to see every step and what it does. Screenshots are in the per-feature report (Drill-down above).</p>` +
    stepDetail(summary) +
    `<div class="panel"><h2>Top failure reasons</h2>${topFailures(summary)}</div>` +
    `<div class="panel"><h2>Trend (last 10 runs)</h2>${trend(summary)}</div>`;
  const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Combined report ${escapeHtml(summary.runId)}</title><style>${STYLE}</style></head><body>${body}</body></html>`;
  fs.writeFileSync(file, html, 'utf8');
  return file;
}
