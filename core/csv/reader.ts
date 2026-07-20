/**
 * CSV reader. BOM-tolerant (your testdata.csv ships a UTF-8 BOM), header-trimming,
 * and — crucially — it preserves the TRUE source line number of every record so
 * validation errors can point at the exact spreadsheet row (§14).
 *
 * We parse without papaparse's header mode so indexing stays reliable even with
 * blank lines, then assemble typed records ourselves.
 */
import fs from 'node:fs';
import Papa from 'papaparse';
import { FrameworkError } from '../utils/errors.js';

export interface CsvRecord {
  /** Column name -> raw cell string (already trimmed of surrounding whitespace). */
  data: Record<string, string>;
  /** 1-based source line number in the file (header is line 1). */
  line: number;
}

export interface ParsedCsv {
  file: string;
  headers: string[];
  records: CsvRecord[];
}

function stripBom(text: string): string {
  return text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
}

export function parseCsvString(text: string, file = '<memory>'): ParsedCsv {
  const clean = stripBom(text);
  const result = Papa.parse<string[]>(clean, {
    header: false,
    skipEmptyLines: false,
    dynamicTyping: false,
    delimiter: ',', // our CSVs are always comma-delimited — skip fragile auto-detect
  });
  const firstErr = result.errors[0];
  if (firstErr) {
    throw new FrameworkError(`CSV parse error: ${firstErr.message}`, {
      file,
      row: (firstErr.row ?? 0) + 1,
    });
  }
  const rows = result.data;
  // Find the first non-empty line — that's the header.
  let headerIdx = -1;
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    if (r && r.some((c) => c != null && String(c).trim() !== '')) {
      headerIdx = i;
      break;
    }
  }
  const headerRow = rows[headerIdx];
  if (headerIdx === -1 || !headerRow) {
    return { file, headers: [], records: [] };
  }
  const headers = headerRow.map((h) => String(h ?? '').trim());
  const records: CsvRecord[] = [];
  for (let i = headerIdx + 1; i < rows.length; i++) {
    const raw = rows[i];
    if (!raw || raw.every((c) => c == null || String(c).trim() === '')) continue; // skip blank lines
    const data: Record<string, string> = {};
    headers.forEach((h, col) => {
      if (h === '') return;
      data[h] = String(raw[col] ?? '').trim();
    });
    records.push({ data, line: i + 1 });
  }
  return { file, headers, records };
}

export function readCsv(file: string): ParsedCsv {
  if (!fs.existsSync(file)) {
    throw new FrameworkError(`CSV file not found`, { file });
  }
  const text = fs.readFileSync(file, 'utf8');
  return parseCsvString(text, file);
}

/** Convenience: plain array of row objects (loses line numbers). */
export function readCsvRows(file: string): Record<string, string>[] {
  return readCsv(file).records.map((r) => r.data);
}
