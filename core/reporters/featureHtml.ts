/**
 * Per-feature HTML report -> 09_html_report/index.html (§10). Self-contained
 * (inline CSS, no CDN): step timeline with masked resolved values and
 * screenshots, baseline-vs-actual diff with breached tolerances highlighted, and
 * links to the Playwright trace/video.
 */
import fs from 'node:fs';
import path from 'node:path';
import type { IterationResult } from '../model/types.js';
import type { CompareReport } from '../comparator/types.js';
import { featurePaths, ensureDir } from '../utils/paths.js';
import { escapeHtml, fmtDuration, STATUS_COLORS } from './util.js';

/** Exported so the shareable single-file report renders identically (shareableHtml.ts). */
export const REPORT_STYLE = `
:root{color-scheme:light dark}
*{box-sizing:border-box}
body{font:14px/1.5 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;margin:0;padding:24px;background:#f6f8fa;color:#1f2328}
@media(prefers-color-scheme:dark){body{background:#0d1117;color:#e6edf3}.card,.tl{background:#161b22;border-color:#30363d}th{background:#21262d}}
h1{font-size:22px;margin:0 0 4px}h2{font-size:16px;margin:20px 0 8px}
.muted{color:#6e7781}
.badge{display:inline-block;padding:2px 8px;border-radius:12px;color:#fff;font-weight:600;font-size:12px}
.card{background:#fff;border:1px solid #d0d7de;border-radius:8px;padding:16px;margin:14px 0}
table{border-collapse:collapse;width:100%;font-size:13px;overflow-x:auto;display:block}
.tl{display:table;width:100%}
th,td{border:1px solid #d0d7de;padding:6px 8px;text-align:left;vertical-align:top}
th{background:#eaeef2}
.st-passed{color:#1a7f37}.st-failed{color:#cf222e;font-weight:700}.st-skipped{color:#6e7781}.st-warned{color:#bf8700}
.breach{background:#ffebe9}.breach td{color:#cf222e}
@media(prefers-color-scheme:dark){.breach{background:#3c1618}.breach td{color:#ff7b72}}
code{background:rgba(175,184,193,.2);padding:1px 4px;border-radius:4px}
a{color:#0969da}
.shot{width:240px;height:auto;display:block;border:1px solid #d0d7de;border-radius:4px}
.shot:hover{outline:2px solid #0969da}
@media(prefers-color-scheme:dark){.shot{border-color:#30363d}}
/* Descriptions are full sentences; cap the width or they starve every other column. */
.desc{min-width:220px;max-width:340px;color:#57606a;font-size:12px}
@media(prefers-color-scheme:dark){.desc{color:#8b949e}}
`;

function badge(status: string): string {
  const c = STATUS_COLORS[status] ?? '#6e7781';
  return `<span class="badge" style="background:${c}">${escapeHtml(status)}</span>`;
}

/**
 * How a report treats screenshots. This is three-way on purpose:
 *
 *  - `linked` — relative <a>/<img> into artifacts/. The on-disk report; ~20KB.
 *    Only works while artifacts/ sits next to it.
 *  - `inline` — embed as data: URIs. Self-contained and sendable; ~1.35x the PNG
 *    bytes (base64 overhead).
 *  - `omit`   — no screenshots at all. For a small sendable file. NOT the same as
 *    `linked`: linking in a file that travels alone renders 60 broken images,
 *    which is worse than showing none.
 */
export type ShotMode = 'linked' | 'inline' | 'omit';

function shotSrc(it: IterationResult, target: string, mode: ShotMode): string {
  if (mode === 'linked') return relFrom(it, target);
  try {
    const abs = path.resolve(process.cwd(), target);
    return `data:image/png;base64,${fs.readFileSync(abs).toString('base64')}`;
  } catch {
    // The artifact was pruned. Fall back to the link so the row still renders.
    return relFrom(it, target);
  }
}

/**
 * Seq is the render-time index, NOT metadata.csv's Seq column: `it.steps` also
 * contains the steps a callReusable flow inlined (flows/login.csv), which have no
 * metadata row to carry one. Numbering here is the only way every rendered row
 * gets a contiguous 1..n. StepID stays alongside it as the authored identifier.
 */
function stepRows(it: IterationResult, mode: ShotMode = 'linked'): string {
  return it.steps
    .map((s, i) => {
      const src = s.screenshotPath && mode !== 'omit' ? shotSrc(it, s.screenshotPath, mode) : '';
      return `<tr>
      <td>${i + 1}</td>
      <td>${escapeHtml(String(s.stepId))}</td>
      <td>${escapeHtml(s.stepGroup)}</td>
      <td><code>${escapeHtml(s.action)}</code></td>
      <td>${escapeHtml(s.objectName)}</td>
      <td>${escapeHtml(s.resolvedInput)}</td>
      <td class="st-${s.status}">${escapeHtml(s.status)}</td>
      <td>${fmtDuration(s.durationMs)}</td>
      <td class="desc">${escapeHtml(s.description)}</td>
      ${
        mode === 'omit'
          ? ''
          : `<td>${
              !s.screenshotPath
                ? ''
                : mode === 'inline'
                  // Inlined: the <img> alone. Wrapping it in <a href="<same data
                  // URI>"> would emit every screenshot TWICE and double the file
                  // size — the exact thing this mode exists to keep down.
                  ? `<img class="shot" src="${escapeHtml(src)}" loading="lazy" alt="step ${escapeHtml(String(s.stepId))} screenshot">`
                  : `<a href="${escapeHtml(src)}" target="_blank"><img class="shot" src="${escapeHtml(src)}" loading="lazy" alt="step ${escapeHtml(String(s.stepId))} screenshot"></a>`
            }</td>`
      }
      <td>${s.error ? `<div class="st-failed">${escapeHtml(s.error)}</div>` : ''}</td>
    </tr>`;
    })
    .join('\n');
}

function relFrom(it: IterationResult, target?: string): string {
  if (!target) return '';
  // Report lives in <feature>/09_html_report/; make artifact paths relative to it.
  const reportDir = path.join(process.cwd(), it.module, it.feature, '09_html_report');
  return path.relative(reportDir, path.resolve(process.cwd(), target)).replace(/\\/g, '/');
}

function compareTable(report: CompareReport): string {
  const parts: string[] = [];
  parts.push(`<p class="muted">${escapeHtml(report.summary)}</p>`);
  if (report.failureClasses.length) {
    parts.push(`<p><strong>Failure classes:</strong> ${report.failureClasses.map(escapeHtml).join(', ')}</p>`);
  }
  if (report.schemaMismatch) {
    parts.push(
      `<p><strong>Schema mismatch</strong> — added: [${report.schemaMismatch.addedColumns.map(escapeHtml).join(', ')}], removed: [${report.schemaMismatch.removedColumns.map(escapeHtml).join(', ')}]</p>`,
    );
  }
  if (report.rowCountMismatch) {
    parts.push(
      `<p><strong>Row count</strong> — baseline ${report.rowCountMismatch.baselineRows} vs actual ${report.rowCountMismatch.actualRows}</p>`,
    );
  }
  if (report.missingRows.length) parts.push(`<p><strong>Missing rows:</strong> ${report.missingRows.map(escapeHtml).join(' ; ')}</p>`);
  if (report.extraRows.length) parts.push(`<p><strong>Extra rows:</strong> ${report.extraRows.map(escapeHtml).join(' ; ')}</p>`);
  if (report.valueMismatches.length) {
    const rows = report.valueMismatches
      .map(
        (m) => `<tr class="breach">
        <td>${escapeHtml(m.column)}</td><td>${escapeHtml(m.rowKey)}</td>
        <td>${escapeHtml(m.expected)}</td><td>${escapeHtml(m.actual)}</td>
        <td>${escapeHtml(m.delta)}</td><td>${escapeHtml(m.toleranceApplied)}</td></tr>`,
      )
      .join('\n');
    parts.push(
      `<table><thead><tr><th>Column</th><th>Row key</th><th>Expected</th><th>Actual</th><th>Delta</th><th>Tolerance breached</th></tr></thead><tbody>${rows}</tbody></table>`,
    );
  } else if (report.outcome === 'PASS') {
    parts.push(`<p class="st-passed">All compared cells within tolerance.</p>`);
  }
  return parts.join('\n');
}

export function iterationCard(it: IterationResult, mode: ShotMode = 'linked'): string {
  const links: string[] = [];
  // Only the on-disk report may link trace/video/csv. A file that travels alone
  // must not point at paths that will not travel with it.
  if (mode === 'linked') {
    if (it.tracePath) links.push(`<a href="${escapeHtml(relFrom(it, it.tracePath))}">trace.zip</a>`);
    if (it.videoPath) links.push(`<a href="${escapeHtml(relFrom(it, it.videoPath))}">video</a>`);
    if (it.actualResultsPath) links.push(`<a href="${escapeHtml(relFrom(it, it.actualResultsPath))}">actual.csv</a>`);
    if (it.diffCsvPath) links.push(`<a href="${escapeHtml(relFrom(it, it.diffCsvPath))}">diff.csv</a>`);
  }
  return `<div class="card">
    <h2>${escapeHtml(it.tcId)} / ${escapeHtml(it.iterationId)} ${badge(it.status)}
      <span class="muted">${fmtDuration(it.durationMs)} · ${escapeHtml(it.browser)} · ${escapeHtml(it.env)}</span></h2>
    ${it.failureReason ? `<p class="st-failed">${escapeHtml(it.failureReason)}</p>` : ''}
    ${links.length ? `<p>${links.join(' · ')}</p>` : ''}
    <h3>Steps</h3>
    <table class="tl"><thead><tr><th>Seq</th><th>StepID</th><th>Group</th><th>Action</th><th>Object</th><th>Resolved input (masked)</th><th>Status</th><th>Time</th><th>Description</th>${
      mode === 'omit' ? '' : '<th>Shot</th>'
    }<th>Notes</th></tr></thead>
    <tbody>${stepRows(it, mode)}</tbody></table>
    ${it.compare ? `<h3>Baseline vs actual</h3>${compareTable(it.compare)}` : ''}
  </div>`;
}

/** Render the per-feature report. See ShotMode for what `mode` does to screenshots. */
export function renderFeatureReport(
  module: string,
  feature: string,
  runId: string,
  env: string,
  iterations: IterationResult[],
  mode: ShotMode = 'linked',
): string {
  const body =
    `<h1>${escapeHtml(feature)} <span class="muted">/ ${escapeHtml(module)}</span></h1>` +
    `<p class="muted">Run ${escapeHtml(runId)} · env ${escapeHtml(env)} · ${iterations.length} iteration(s)${
      mode === 'inline' ? ' · self-contained (screenshots embedded)' : ''
    }</p>` +
    iterations.map((it) => iterationCard(it, mode)).join('\n');
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(feature)} report</title><style>${REPORT_STYLE}</style></head><body>${body}</body></html>`;
}

export function writeFeatureReport(
  module: string,
  feature: string,
  runId: string,
  env: string,
  iterations: IterationResult[],
): string {
  const p = featurePaths(module, feature);
  ensureDir(p.htmlReport);
  const file = path.join(p.htmlReport, 'index.html');
  // Linked, not inlined: this runs on EVERY test run, and embedding would turn a
  // ~20KB write into ~13MB. `npm run report:share` produces the shareable copy.
  fs.writeFileSync(file, renderFeatureReport(module, feature, runId, env, iterations, 'linked'), 'utf8');
  return file;
}
