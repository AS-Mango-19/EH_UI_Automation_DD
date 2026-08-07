/**
 * POM generator (Phase 1). selectors.csv -> one thin <Page>.page.ts per Page,
 * plus an index barrel. Generated classes contain NO logic — every method
 * delegates to the engine's resolveLocator, so a locator-resolution bug is one
 * edit in core/, never N regenerated files (§2.2).
 *
 * Idempotent: a page file whose embedded source hash matches is left untouched.
 */
import fs from 'node:fs';
import path from 'node:path';
import type { SelectorRow } from '../schema/selectors.schema.js';
import { featurePaths, ensureDir } from '../utils/paths.js';
import { sha256File, readHeaderHash, generatedHeader } from './hash.js';
import { logger } from '../utils/logger.js';

// Depth from <feature>/04_generated_pom/*.ts up to repo root, then into core/.
const CORE = '../../../core';

export interface PomGenResult {
  generated: string[];
  skipped: string[];
  removed: string[];
}

function groupByPage(selectors: SelectorRow[]): Map<string, SelectorRow[]> {
  const byPage = new Map<string, SelectorRow[]>();
  for (const s of selectors) {
    const arr = byPage.get(s.Page) ?? [];
    arr.push(s);
    byPage.set(s.Page, arr);
  }
  return byPage;
}

function renderClass(pageName: string, objects: SelectorRow[], header: string): string {
  const methods = objects
    .map((o) => {
      const desc = o.Description ? `  /** ${o.Description} */\n` : '';
      return (
        `${desc}  ${o.ObjectName}(...dynamicArgs: string[]): Promise<Locator> {\n` +
        `    return resolveLocator(this.page, this.selectors, '${pageName}', '${o.ObjectName}', { dynamicArgs });\n` +
        `  }`
      );
    })
    .join('\n\n');
  return (
    `${header}\n` +
    `import type { Page as PlaywrightPage, Locator } from 'playwright';\n` +
    `import type { SelectorRow } from '${CORE}/schema/selectors.schema.js';\n` +
    `import { resolveLocator } from '${CORE}/locators/resolver.js';\n\n` +
    `export class ${pageName} {\n` +
    `  constructor(\n` +
    `    private readonly page: PlaywrightPage,\n` +
    `    private readonly selectors: Map<string, SelectorRow>,\n` +
    `  ) {}\n\n` +
    `${methods}\n` +
    `}\n`
  );
}

function renderBarrel(pages: string[], header: string): string {
  const imports = pages.map((p) => `import { ${p} } from './${p}.page.js';`).join('\n');
  const reexports = pages.map((p) => `export { ${p} } from './${p}.page.js';`).join('\n');
  const factory = pages.map((p) => `    ${p}: new ${p}(page, selectors),`).join('\n');
  return (
    `${header}\n` +
    `import type { Page as PlaywrightPage } from 'playwright';\n` +
    `import type { SelectorRow } from '${CORE}/schema/selectors.schema.js';\n` +
    `${imports}\n\n` +
    `${reexports}\n\n` +
    `export function createPages(page: PlaywrightPage, selectors: Map<string, SelectorRow>) {\n` +
    `  return {\n${factory}\n  };\n` +
    `}\n` +
    `export type Pages = ReturnType<typeof createPages>;\n`
  );
}

export function generatePom(
  module: string,
  feature: string,
  selectors: SelectorRow[],
): PomGenResult {
  const p = featurePaths(module, feature);
  ensureDir(p.generatedPom);
  const sourceHash = sha256File(p.selectors);
  const header = generatedHeader(path.relative(p.root, p.selectors).replace(/\\/g, '/'), sourceHash);

  const byPage = groupByPage(selectors);
  const result: PomGenResult = { generated: [], skipped: [], removed: [] };
  const wantedFiles = new Set<string>();

  for (const [pageName, objects] of byPage) {
    const file = path.join(p.generatedPom, `${pageName}.page.ts`);
    wantedFiles.add(path.basename(file));
    if (readHeaderHash(file) === sourceHash) {
      result.skipped.push(file);
      continue;
    }
    fs.writeFileSync(file, renderClass(pageName, objects, header), 'utf8');
    result.generated.push(file);
  }

  // Barrel (always rewritten — cheap, keeps exports in sync).
  const barrel = path.join(p.generatedPom, 'index.ts');
  wantedFiles.add('index.ts');
  fs.writeFileSync(barrel, renderBarrel([...byPage.keys()], header), 'utf8');

  // Remove stale generated page files (a Page that vanished from selectors.csv).
  for (const existing of fs.readdirSync(p.generatedPom)) {
    if ((existing.endsWith('.page.ts') || existing === 'index.ts') && !wantedFiles.has(existing)) {
      fs.rmSync(path.join(p.generatedPom, existing));
      result.removed.push(existing);
    }
  }

  logger.info(
    `POM ${feature}: ${result.generated.length} generated, ${result.skipped.length} unchanged, ${result.removed.length} removed.`,
  );
  return result;
}
