/**
 * Results grid -> normalized actual-results CSV (Phase 4).
 *
 * Steps: read the grid (native <table> or ARIA grid), map UI headers to canonical
 * column names via feature.config.columnMap, attach volatile provenance columns,
 * order columns by compare.config, and SORT deterministically. Determinism is the
 * whole game — the same design run twice MUST yield identical CSVs (ignoring
 * volatile columns), or every downstream diff is a lie.
 */
import path from 'node:path';
import type { Locator } from 'playwright';
import type { RunContext } from '../runner/context.js';
import type { ResolvedStep } from '../keywords/types.js';
import { targetLocator } from '../keywords/util.js';
import { writeCsv } from '../csv/writer.js';
import { ensureDir } from '../utils/paths.js';
import { logger } from '../utils/logger.js';
import { FRAMEWORK_CONFIG } from '../../config/framework.config.js';

export interface ExtractionResult {
  rows: Record<string, string>[];
  outputPath: string;
  columns: string[];
}

interface RawTable {
  headers: string[];
  rows: string[][];
}

const clean = (s: string): string => s.replace(/\s+/g, ' ').trim();

/**
 * Read a grid into headers + row cells using Playwright LOCATORS (not evaluate),
 * tolerant of native <table> vs ARIA grid. Locator queries are used deliberately:
 * a serialized evaluate() closure breaks under bundlers that inject name helpers.
 */
async function readGrid(loc: Locator): Promise<RawTable> {
  const hasDescendantTable = (await loc.locator('table').count()) > 0;
  const tableRoot = hasDescendantTable ? loc.locator('table').first() : loc;

  // Native table path.
  let headers = (await tableRoot.locator('thead th').allTextContents()).map(clean);
  if (headers.length === 0) {
    headers = (await tableRoot.locator('tr').first().locator('th,td').allTextContents()).map(clean);
  }
  const bodyRows = tableRoot.locator('tbody tr');
  let count = await bodyRows.count();
  if (count > 0) {
    const rows: string[][] = [];
    for (let i = 0; i < count; i++) {
      rows.push((await bodyRows.nth(i).locator('td,th').allTextContents()).map(clean));
    }
    if (headers.length) return { headers, rows };
  } else {
    // No tbody: rows are all <tr> after the header row.
    const allTr = tableRoot.locator('tr');
    const total = await allTr.count();
    if (headers.length && total > 1) {
      const rows: string[][] = [];
      for (let i = 1; i < total; i++) {
        rows.push((await allTr.nth(i).locator('td,th').allTextContents()).map(clean));
      }
      return { headers, rows };
    }
  }

  // ARIA grid fallback (custom data grids).
  const rowEls = loc.locator('[role="row"]');
  const n = await rowEls.count();
  if (n > 0) {
    const ariaHeaders = (
      await rowEls.nth(0).locator('[role="columnheader"],[role="cell"],[role="gridcell"]').allTextContents()
    ).map(clean);
    const rows: string[][] = [];
    for (let i = 1; i < n; i++) {
      rows.push((await rowEls.nth(i).locator('[role="cell"],[role="gridcell"]').allTextContents()).map(clean));
    }
    return { headers: ariaHeaders, rows };
  }
  return { headers, rows: [] };
}

export async function extractResults(ctx: RunContext, step: ResolvedStep): Promise<ExtractionResult> {
  const cfg = ctx.feature.config.resultsExtraction;
  const loc = await targetLocator(ctx, step);
  await loc.first().waitFor({ state: 'visible', timeout: step.timeout });

  const raw = await readGrid(loc);
  if (raw.headers.length === 0) {
    throw new Error(`extractTable: grid "${step.objectName}" produced no headers — check the selector/mode.`);
  }

  // Map UI headers -> canonical names (unmapped headers pass through unchanged).
  const canonicalHeaders = raw.headers.map((h) => cfg.columnMap[h] ?? h);

  const mapped: Record<string, string>[] = raw.rows
    .filter((cells) => cells.some((c) => c !== ''))
    .map((cells) => {
      const obj: Record<string, string> = {};
      canonicalHeaders.forEach((h, i) => {
        obj[h] = cells[i] ?? '';
      });
      return obj;
    });

  // Attach volatile provenance columns (Compare=FALSE in compare.config).
  const projectId = ctx.createdProjectId ?? ctx.master.ProjectID ?? '';
  for (const row of mapped) {
    if (!('RunID' in row)) row['RunID'] = ctx.runId;
    if (!('Timestamp' in row)) row['Timestamp'] = ctx.timestamp;
    if (!('ProjectID' in row)) row['ProjectID'] = projectId;
  }

  // Deterministic sort.
  const sortBy: string[] = cfg.sortBy.length
    ? cfg.sortBy
    : canonicalHeaders[0]
      ? [canonicalHeaders[0]]
      : [];
  mapped.sort((a, b) => {
    for (const key of sortBy) {
      const cmp = String(a[key] ?? '').localeCompare(String(b[key] ?? ''));
      if (cmp !== 0) return cmp;
    }
    return 0;
  });

  // Column order: compare.config order first, then any extras (stable).
  const columns = orderColumns(ctx, canonicalHeaders);

  // Resolve output filename tokens (${TC_ID}, ${IterationID}).
  const fileName = cfg.outputFileName
    .replace(/\$\{TC_ID\}/g, ctx.tcId)
    .replace(/\$\{IterationID\}/g, ctx.iterationId);
  ensureDir(ctx.feature.paths.actualResults);
  const outputPath = path.join(ctx.feature.paths.actualResults, fileName);
  writeCsv(outputPath, mapped, columns);
  logger.info(`Extracted ${mapped.length} result row(s) -> ${path.relative(process.cwd(), outputPath)}`);

  return { rows: mapped, outputPath, columns };
}

function orderColumns(ctx: RunContext, headers: string[]): string[] {
  const compareOrder = ctx.feature.compareColumns.map((c) => c.ColumnName);
  const present = new Set(headers);
  const ordered: string[] = [];
  for (const c of compareOrder) if (present.has(c) && !ordered.includes(c)) ordered.push(c);
  for (const h of headers) if (!ordered.includes(h)) ordered.push(h);
  // Ensure volatile columns are present at the end if configured but not in headers.
  for (const v of FRAMEWORK_CONFIG.reservedVolatileColumns) if (!ordered.includes(v)) ordered.push(v);
  return ordered;
}
