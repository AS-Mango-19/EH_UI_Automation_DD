/**
 * Source hashing for idempotent generation. A generated file carries the sha of
 * its source; regeneration is skipped when the hash is unchanged (§14, Phase 1).
 */
import crypto from 'node:crypto';
import fs from 'node:fs';

export function sha256(text: string): string {
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
}

export function sha256File(file: string): string {
  return sha256(fs.readFileSync(file, 'utf8'));
}

export function sha256Files(files: string[]): string {
  const h = crypto.createHash('sha256');
  for (const f of files) {
    h.update(f);
    h.update('\0');
    h.update(fs.readFileSync(f));
    h.update('\0');
  }
  return h.digest('hex');
}

const HEADER_HASH_RE = /hash:\s*([a-f0-9]{64})/i;

/** Read the embedded source hash from a generated file's header, if present. */
export function readHeaderHash(file: string): string | null {
  if (!fs.existsSync(file)) return null;
  const firstChunk = fs.readFileSync(file, 'utf8').slice(0, 400);
  const m = HEADER_HASH_RE.exec(firstChunk);
  return m?.[1] ?? null;
}

export function generatedHeader(sourcePath: string, hash: string): string {
  return `// AUTO-GENERATED — DO NOT EDIT. Source: ${sourcePath} (hash: ${hash})`;
}
