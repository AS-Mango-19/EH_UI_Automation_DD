/**
 * TestDataStore — resolves ${data.<file>.<Column>} against the testdata CSVs of
 * a feature, keyed on the current TC_ID + IterationID.
 *
 * Tolerant of your attached format: a file WITHOUT TC_ID/IterationID (e.g.
 * testdata.csv) is treated as a single implicit row that applies to the current
 * test case & every iteration. Files WITH those columns join normally, and
 * iterations are discovered from Run=TRUE rows.
 */
import type { ParsedCsv } from '../csv/reader.js';
import { FrameworkError } from '../utils/errors.js';

const DEFAULT_ITERATION = 'ITER_01';

function truthy(v: string | undefined): boolean {
  const s = String(v ?? '').trim().toUpperCase();
  return s === 'TRUE' || s === '1' || s === 'YES' || s === 'Y' || s === '';
  // NOTE: blank Run defaults to TRUE — a testdata row is "on" unless explicitly FALSE.
}

export class TestDataStore {
  /** fileKey (filename without .csv, e.g. "design") -> parsed CSV. */
  private readonly files: Map<string, ParsedCsv>;

  constructor(files: Map<string, ParsedCsv>) {
    this.files = files;
  }

  fileKeys(): string[] {
    return [...this.files.keys()];
  }

  /** Distinct iterations to run for a test case, from Run=TRUE rows across files. */
  iterationsFor(tcId: string): string[] {
    const iterations = new Set<string>();
    for (const parsed of this.files.values()) {
      if (!parsed.headers.includes('IterationID')) continue;
      const hasTc = parsed.headers.includes('TC_ID');
      const hasRun = parsed.headers.includes('Run');
      for (const rec of parsed.records) {
        if (hasTc && rec.data['TC_ID'] !== tcId) continue;
        if (hasRun && !truthy(rec.data['Run'])) continue;
        const iter = rec.data['IterationID'];
        if (iter) iterations.add(iter);
      }
    }
    if (iterations.size === 0) return [DEFAULT_ITERATION];
    return [...iterations].sort();
  }

  /** Resolve one cell. Throws (never returns '') if the file/column/row is missing. */
  get(fileKey: string, column: string, tcId: string, iterationId: string): string {
    const parsed = this.files.get(fileKey);
    if (!parsed) {
      throw new FrameworkError(
        `Unknown testdata file "${fileKey}" in \${data.${fileKey}.${column}}. Available: ${this.fileKeys().join(', ') || '(none)'}`,
        { tcId, iterationId },
      );
    }
    if (!parsed.headers.includes(column)) {
      throw new FrameworkError(
        `Unknown column "${column}" in testdata file "${fileKey}". Columns: ${parsed.headers.join(', ')}`,
        { file: parsed.file, tcId, iterationId, column },
      );
    }
    const row = this.findRow(parsed, tcId, iterationId);
    if (!row) {
      throw new FrameworkError(
        `No testdata row in "${fileKey}" for TC_ID=${tcId} IterationID=${iterationId}`,
        { file: parsed.file, tcId, iterationId },
      );
    }
    return row[column] ?? '';
  }

  private findRow(
    parsed: ParsedCsv,
    tcId: string,
    iterationId: string,
  ): Record<string, string> | undefined {
    const hasTc = parsed.headers.includes('TC_ID');
    const hasIter = parsed.headers.includes('IterationID');
    let candidates = parsed.records.map((r) => r.data);
    if (hasTc) candidates = candidates.filter((d) => d['TC_ID'] === tcId);
    if (hasIter) {
      const exact = candidates.filter((d) => d['IterationID'] === iterationId);
      if (exact.length) return exact[0];
      // A keyed file that has no row for this iteration => genuinely missing.
      return undefined;
    }
    // Keyless (or TC-only) file: single implicit row.
    return candidates[0];
  }
}
