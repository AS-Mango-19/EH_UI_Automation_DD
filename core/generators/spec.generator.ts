/**
 * Spec generator (Phase 3). metadata.csv -> a THIN <feature>.spec.ts that makes a
 * single call into the engine (runGeneratedSpec). No business logic leaks into
 * generated specs, so a bug fix is one edit in core/ — never N regenerated files
 * (§2.2, §15.7). Idempotent via embedded source hash.
 */
import fs from 'node:fs';
import path from 'node:path';
import { featurePaths, ensureDir } from '../utils/paths.js';
import { sha256Files, readHeaderHash, generatedHeader } from './hash.js';
import { logger } from '../utils/logger.js';

const CORE = '../../../core';

export interface SpecGenResult {
  file: string;
  generated: boolean;
}

export function generateSpec(
  module: string,
  feature: string,
  metadataFileRel: string,
  testDataDirRel: string,
): SpecGenResult {
  const p = featurePaths(module, feature);
  ensureDir(p.generatedScripts);
  const metadataFile = path.join(p.root, metadataFileRel);
  const sourceFiles = [metadataFile, p.selectors, p.featureConfig].filter((f) => fs.existsSync(f));
  const sourceHash = sha256Files(sourceFiles);
  const header = generatedHeader(metadataFileRel, sourceHash);
  const file = path.join(p.generatedScripts, `${feature}.spec.ts`);

  if (readHeaderHash(file) === sourceHash) {
    logger.info(`Spec ${feature}: unchanged.`);
    return { file, generated: false };
  }

  const content =
    `${header}\n` +
    `import { runGeneratedSpec } from '${CORE}/runner/specRuntime.js';\n\n` +
    `runGeneratedSpec({\n` +
    `  module: ${JSON.stringify(module)},\n` +
    `  feature: ${JSON.stringify(feature)},\n` +
    `  metadataFileRel: ${JSON.stringify(metadataFileRel)},\n` +
    `  testDataDirRel: ${JSON.stringify(testDataDirRel)},\n` +
    `});\n`;
  fs.writeFileSync(file, content, 'utf8');
  logger.info(`Spec ${feature}: generated ${path.relative(process.cwd(), file)}`);
  return { file, generated: true };
}
