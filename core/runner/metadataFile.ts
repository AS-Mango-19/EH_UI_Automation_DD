/**
 * Parse an arbitrary metadata CSV (a feature's metadata.csv OR a reusable flow
 * like flows/login.csv) into typed, sorted steps. Shared by the loader, the
 * validator and callReusable so all three agree on the schema.
 */
import fs from 'node:fs';
import { readCsv } from '../csv/reader.js';
import { MetadataStepSchema, type MetadataStep } from '../schema/metadata.schema.js';
import { FrameworkError } from '../utils/errors.js';

export function parseMetadataFile(file: string): MetadataStep[] {
  if (!fs.existsSync(file)) throw new FrameworkError('Metadata/flow file not found', { file });
  const parsed = readCsv(file);
  const steps: MetadataStep[] = [];
  for (const rec of parsed.records) {
    const result = MetadataStepSchema.safeParse(rec.data);
    if (!result.success) {
      const first = result.error.issues[0];
      throw new FrameworkError(`Invalid step: ${first?.path.join('.') ?? ''} ${first?.message ?? 'schema error'}`, {
        file,
        row: rec.line,
      });
    }
    steps.push(result.data);
  }
  return steps.sort((a, b) => a.StepID - b.StepID);
}
