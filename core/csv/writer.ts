/**
 * CSV writer. Deterministic column order, no BOM, LF newlines, quoting handled
 * by papaparse. Used for actual-results, baselines and diffs — all of which get
 * byte-compared or diffed, so stable output matters.
 */
import fs from 'node:fs';
import path from 'node:path';
import Papa from 'papaparse';

export function toCsvString(rows: Record<string, unknown>[], columns?: string[]): string {
  const cols = columns ?? inferColumns(rows);
  return Papa.unparse(
    { fields: cols, data: rows.map((r) => cols.map((c) => normalizeCell(r[c]))) },
    { newline: '\n', quotes: false },
  );
}

function inferColumns(rows: Record<string, unknown>[]): string[] {
  const seen = new Set<string>();
  const cols: string[] = [];
  for (const row of rows) {
    for (const k of Object.keys(row)) {
      if (!seen.has(k)) {
        seen.add(k);
        cols.push(k);
      }
    }
  }
  return cols;
}

function normalizeCell(v: unknown): string {
  if (v == null) return '';
  return String(v);
}

export function writeCsv(file: string, rows: Record<string, unknown>[], columns?: string[]): void {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, toCsvString(rows, columns) + '\n', 'utf8');
}
