/**
 * Single-file shareable run report -> reports/<runId>/run_<runId>_shareable.html
 *
 * WHY THIS EXISTS: neither shipped report can be sent on its own.
 *   - 09_html_report/index.html links screenshots relatively into artifacts/.
 *   - combined_report.html's Drill-down links climb OUT of reports/ into the
 *     feature folder.
 * Send either one alone and the recipient gets broken images or a 404.
 *
 * This composes the run summary, the Feature x TC matrix and every iteration's
 * full step table into ONE document, with drill-down as an in-page anchor rather
 * than a file link. Screenshots are embedded as data: URIs unless `lite`.
 *
 * It reuses iterationCard/REPORT_STYLE from featureHtml so the shared copy always
 * looks like the report people already know, and cannot drift from it.
 */
import type { RunSummary } from '../model/types.js';
import { ALL_STATUSES } from '../model/types.js';
import { iterationCard, REPORT_STYLE } from './featureHtml.js';
import { escapeHtml, fmtDuration, STATUS_COLORS } from './util.js';

const EXTRA_STYLE = `
.tiles{display:flex;flex-wrap:wrap;gap:12px;margin:12px 0}
.tile{background:#fff;border:1px solid #d0d7de;border-radius:8px;padding:12px 16px;min-width:110px}
.tile .n{font-size:26px;font-weight:700}
.meta td,.meta th{font-size:13px}
.banner{background:#ddf4ff;border:1px solid #54aeff;border-radius:8px;padding:10px 14px;margin:12px 0;font-size:13px}
@media(prefers-color-scheme:dark){.tile{background:#161b22;border-color:#30363d}.banner{background:#0c2d6b;border-color:#1f6feb}}
`;

/** Stable in-page anchor for an iteration — the matrix links to this, not a file. */
function anchorFor(tcId: string, iterationId: string): string {
  return `it-${`${tcId}-${iterationId}`.replace(/[^\w-]+/g, '_')}`;
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

function matrix(summary: RunSummary): string {
  const rows = summary.iterations
    .map(
      (it) => `<tr>
      <td>${escapeHtml(it.feature)}</td>
      <td>${escapeHtml(it.tcId)}</td>
      <td>${escapeHtml(it.iterationId)}</td>
      <td><span class="badge" style="background:${STATUS_COLORS[it.status] ?? '#6e7781'}">${escapeHtml(it.status)}</span></td>
      <td>${fmtDuration(it.durationMs)}</td>
      <td>${escapeHtml(it.failureReason ?? it.compare?.summary ?? '')}</td>
      <td><a href="#${anchorFor(it.tcId, it.iterationId)}">steps &darr;</a></td>
    </tr>`,
    )
    .join('\n');
  return `<table class="tl"><thead><tr><th>Feature</th><th>TC</th><th>Iteration</th><th>Status</th><th>Duration</th><th>Detail</th><th>Drill-down</th></tr></thead><tbody>${rows}</tbody></table>`;
}

export interface ShareableOptions {
  /** Omit screenshots: ~40KB instead of ~13MB. The step tables stay complete. */
  lite?: boolean;
}

export function renderShareableRunReport(summary: RunSummary, opts: ShareableOptions = {}): string {
  const lite = opts.lite === true;
  const iterations = (summary.iterations ?? []).filter(Boolean);
  const baseUrl = /^https?:\/\//i.test(summary.baseUrl ?? '')
    ? `<a href="${escapeHtml(summary.baseUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(summary.baseUrl)}</a>`
    : 'Unavailable';
  const meta = `<table class="meta tl">
    <tr><th>Run ID</th><td>${escapeHtml(summary.runId)}</td><th>Base URL</th><td>${baseUrl}</td></tr>
    <tr><th>Started</th><td>${escapeHtml(summary.startedAt)}</td><th>Duration</th><td>${fmtDuration(summary.durationMs)}</td></tr>
    <tr><th>Trigger</th><td>${escapeHtml(summary.trigger)}</td><th>Total</th><td>${summary.total}</td></tr>
  </table>`;

  // 'omit', never 'linked', for lite: this file travels alone, so LINKING the
  // screenshots would render 60 broken images rather than none.
  const cards = iterations
    .map(
      (it) =>
        `<div id="${anchorFor(it.tcId, it.iterationId)}">${iterationCard(it, lite ? 'omit' : 'inline')}</div>`,
    )
    .join('\n');

  const body =
    `<h1>Regression run <span class="muted">${escapeHtml(summary.runId)}</span></h1>` +
    `<p class="muted">env ${escapeHtml(summary.env)} · ${iterations.length} iteration(s) · self-contained${
      lite ? ' (no screenshots)' : ' (screenshots embedded)'
    }</p>` +
    tiles(summary) +
    `<div class="card"><h2>Run metadata</h2>${meta}</div>` +
    `<div class="card"><h2>Feature × TC matrix</h2>${matrix(summary)}</div>` +
    (lite
      ? `<div class="banner">Screenshots were omitted to keep this file small. Every step, its description and the baseline comparison are below. For screenshots, ask for the full version (<code>npm run report:share</code>).</div>`
      : '') +
    `<h2>Steps</h2>` +
    cards;

  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Run ${escapeHtml(summary.runId)} — shareable report</title><style>${REPORT_STYLE}${EXTRA_STYLE}</style></head><body>${body}</body></html>`;
}
