/**
 * Reads and zod-parses master.csv into typed rows, preserving line numbers for
 * error reporting.
 */
import { z } from 'zod';
import { readCsv } from '../csv/reader.js';
import { masterCsvPath } from '../utils/paths.js';
import { MasterRowSchema, type MasterRow } from '../schema/master.schema.js';
import { FrameworkError } from '../utils/errors.js';

export interface MasterEntry {
  row: MasterRow;
  line: number;
}

export interface MasterLoadResult {
  entries: MasterEntry[];
  issues: string[];
}

export function loadMaster(file = masterCsvPath()): MasterLoadResult {
  const parsed = readCsv(file);
  const entries: MasterEntry[] = [];
  const issues: string[] = [];
  const seenIds = new Map<string, number>();

  for (const rec of parsed.records) {
    const result = MasterRowSchema.safeParse(rec.data);
    if (!result.success) {
      for (const issue of result.error.issues) {
        issues.push(
          FrameworkError.format(`master.csv ${issue.path.join('.') || '(row)'}: ${issue.message}`, {
            file,
            row: rec.line,
          }),
        );
      }
      continue;
    }
    const row = result.data;
    const prev = seenIds.get(row.TC_ID);
    if (prev !== undefined) {
      issues.push(
        FrameworkError.format(`Duplicate TC_ID "${row.TC_ID}" (first seen at line ${prev})`, {
          file,
          row: rec.line,
          column: 'TC_ID',
        }),
      );
    }
    seenIds.set(row.TC_ID, rec.line);
    entries.push({ row, line: rec.line });
  }
  return { entries, issues };
}

/** Parse a single in-memory row (used by unit tests). */
export function parseMasterRow(data: Record<string, string>): MasterRow {
  return MasterRowSchema.parse(data) as z.infer<typeof MasterRowSchema>;
}
