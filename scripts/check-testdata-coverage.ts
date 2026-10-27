/**
 * check-testdata-coverage.ts
 *
 * Per-iteration testdata coverage gate. Answers, for every non-N/A cell in every
 * testdata CSV of a feature: "does ANY metadata step (main flow or a reusable
 * flows/*.csv it calls) reference this field, anywhere?" — and reports exactly
 * which TC_ID/IterationID/file/column/value is at risk when the answer is no.
 *
 * Why this exists: `core/cli/index.ts validate` already flags "column X has a
 * value but no step enters it" and "period table X has values that no step
 * enters" — but only as non-fatal WARNs, feature-wide (it doesn't say WHICH
 * iteration), and it does not walk into flows/*.csv to see the real per-field
 * wiring used by loopPeriods/loopChildRows. This script is a stricter,
 * iteration-scoped, flow-aware version of the same idea, meant to be run as a
 * hard gate (non-zero exit on any gap) before declaring an iteration "done" —
 * not something that depends on a human/agent remembering to read warnings.
 *
 * Scope/limitation (stated, not hidden): this is a STATIC reference check — it
 * confirms the field name is mentioned SOMEWHERE a step could read it, not that
 * every step's SkipIf is correctly gated for every iteration (i.e. it catches
 * "never wired at all", not "wired but this one iteration's SkipIf wrongly
 * excludes it"). It is a floor, not a substitute for live verification.
 *
 * Usage:
 *   npx tsx scripts/check-testdata-coverage.ts <TC_ID> [IterationID]
 *   npx tsx scripts/check-testdata-coverage.ts TC_45
 *   npx tsx scripts/check-testdata-coverage.ts TC_45 ITER_01
 *
 * Exit code: 0 if no gaps found, 1 if any gap found (or on a hard error).
 */
import fs from 'node:fs';
import path from 'node:path';
import { readCsv } from '../core/csv/reader.js';

// Fields genuinely covered but NOT via a literal ${data.*}/${runtime.period.*} token in
// a metadata cell — read internally by a custom step's own TypeScript logic instead, so a
// static scan of the CSVs can never see the reference. Kept as a small, VISIBLE allowlist
// (not a silent blind spot) — add an entry only with a comment pointing at the real source.
const KNOWN_NON_TOKEN_COVERAGE: Array<{ file: string; column: string; reason: string }> = [
  {
    file: 'project.csv',
    column: 'Start Date',
    reason: 'read by custom/_shared/customSteps.ts resolveDateValue() via ctx.resolve("${data.project.Start Date}") built at runtime, not present as a literal token in any metadata cell',
  },
];

const KEY_COLUMNS = new Set(['TC_ID', 'IterationID', 'Run']);
// Index/key columns on CHILD tables — never "wired" as a fillable field themselves.
const CHILD_KEY_COLUMNS = new Set(['TC_ID', 'IterationID', 'PeriodIndex', 'StratumIndex']);

function isNaCell(v: string | undefined): boolean {
  const t = (v ?? '').trim();
  return t === '' || /^(n\/a|not applicable)$/i.test(t);
}

function findMasterRow(tcId: string): { module: string; feature: string } {
  const master = readCsv(path.resolve('master.csv'));
  const row = master.records.find((r) => r.data['TC_ID'] === tcId);
  if (!row) throw new Error(`TC_ID "${tcId}" not found in master.csv`);
  return { module: row.data['Module']!, feature: row.data['Feature']! };
}

/** Every `${data.<path>}` and `${runtime.period.<field>}` token in a single cell. */
function extractTokens(cell: string): { dataPaths: string[]; periodFields: string[] } {
  const dataPaths: string[] = [];
  const periodFields: string[] = [];
  const re = /\$\{([^}]+)\}/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(cell))) {
    const inner = m[1]!.trim();
    if (inner.startsWith('data.')) dataPaths.push(inner.slice('data.'.length));
    else if (inner.startsWith('runtime.period.')) periodFields.push(inner.slice('runtime.period.'.length));
  }
  return { dataPaths, periodFields };
}

interface Coverage {
  /** "file.column" for simple top-level references, e.g. "design.effParam". */
  topLevel: Set<string>;
  /** bare column names referenced via a folded `<prefix>.<n>.<field>` path OR
   *  a `${runtime.period.<field>}` token — matched against ANY child table. */
  childFields: Set<string>;
  /** flows/*.csv paths discovered via InputValue, so we know what we scanned. */
  scannedFlows: Set<string>;
}

function scanMetadataRows(rows: Record<string, string>[], featureDir: string, cov: Coverage, seenFlows: Set<string>): void {
  for (const row of rows) {
    for (const col of ['InputValue', 'ObjectName', 'ExpectedValue', 'SkipIf', 'DynamicArgs']) {
      const cell = row[col];
      if (!cell) continue;
      const { dataPaths, periodFields } = extractTokens(cell);
      for (const p of dataPaths) {
        const segs = p.split('.');
        const file = segs[0]!;
        const rest = segs.slice(1);
        // <prefix>.<n>.<field...> => folded child-table reference (n is numeric)
        if (rest.length >= 3 && /^\d+$/.test(rest[1]!)) {
          cov.childFields.add(rest.slice(2).join('.'));
        } else if (rest.length >= 1) {
          cov.topLevel.add(`${file}.${rest.join('.')}`);
        }
      }
      for (const f of periodFields) cov.childFields.add(f);
    }
    // fillCompactIndexedCells (custom/_shared/customSteps.ts) config is
    // "<file>|<field1,field2,...>|<containerSel>|<cellObject>|<editorObject>" - the field
    // list is plain comma-separated text, not a ${data.*} token, so the generic scan above
    // never sees it. Recognize this one custom step's config shape specifically.
    if ((row['InputValue'] || '').trim() === 'fillCompactIndexedCells') {
      const parts = (row['ExpectedValue'] || '').split('|').map((s) => s.trim());
      const [file, fieldsCsv] = parts;
      if (file && fieldsCsv) {
        for (const f of fieldsCsv.split(',').map((s) => s.trim())) if (f) cov.topLevel.add(`${file}.${f}`);
      }
    }
    // reconcilePeriodTable / loopPeriods / loopChildRows config strings carry the
    // countField/table name pipe-delimited in ExpectedValue — pull those too, and
    // follow InputValue when it points at a reusable flows/*.csv (loopPeriods puts
    // the flow path in InputValue directly; loopChildRows puts it in ExpectedValue
    // after the child-file name, since callCustom consumes InputValue as the
    // function-dispatch key).
    for (const col of ['InputValue', 'ExpectedValue']) {
      const cell = row[col];
      if (!cell) continue;
      for (const part of cell.split('|')) {
        const t = part.trim();
        if (/^flows\/.+\.csv$/.test(t)) seenFlows.add(t);
      }
      if (/^flows\/.+\.csv$/.test(cell.trim())) seenFlows.add(cell.trim());
    }
  }
}

function main(): void {
  const [tcId, iterationFilter] = process.argv.slice(2);
  if (!tcId) {
    console.error('Usage: npx tsx scripts/check-testdata-coverage.ts <TC_ID> [IterationID]');
    process.exit(1);
  }
  const { module, feature } = findMasterRow(tcId);
  const featureDir = path.resolve(module, `feature_${feature}`);
  const testDataDir = path.join(featureDir, '01_testdata');
  const metaDir = path.join(featureDir, '03_metadata');

  const cov: Coverage = { topLevel: new Set(), childFields: new Set(), scannedFlows: new Set() };
  const seenFlows = new Set<string>();

  for (const mf of ['metadata.csv', 'sim_metadata.csv']) {
    const p = path.join(metaDir, mf);
    if (!fs.existsSync(p)) continue;
    const parsed = readCsv(p);
    scanMetadataRows(parsed.records.map((r) => r.data), featureDir, cov, seenFlows);
  }
  // Follow referenced flow files (one level of recursion covers every flow this
  // repo's convention uses — a flow calling another flow is not a pattern in use).
  const queue = [...seenFlows];
  while (queue.length) {
    const rel = queue.pop()!;
    if (cov.scannedFlows.has(rel)) continue;
    cov.scannedFlows.add(rel);
    const abs = path.resolve(rel);
    if (!fs.existsSync(abs)) continue;
    const parsed = readCsv(abs);
    const nested = new Set<string>();
    scanMetadataRows(parsed.records.map((r) => r.data), featureDir, cov, nested);
    for (const f of nested) if (!cov.scannedFlows.has(f)) queue.push(f);
  }

  // ---- testdata scan --------------------------------------------------------
  const csvFiles = fs.readdirSync(testDataDir).filter((f) => f.toLowerCase().endsWith('.csv'));
  const topLevelNames = new Set(['design.csv', 'project.csv', 'simulation.csv', 'inputset.csv']);

  type Gap = { file: string; iteration: string; column: string; value: string };
  const gaps: Gap[] = [];

  for (const fname of csvFiles) {
    const parsed = readCsv(path.join(testDataDir, fname));
    const baseKey = path.basename(fname, '.csv'); // e.g. "design", "simulation_strata"
    const isTopLevel = topLevelNames.has(fname);
    for (const rec of parsed.records) {
      const iter = rec.data['IterationID'] ?? '';
      if (iterationFilter && iter !== iterationFilter) continue;
      if (!iter) continue; // template/blank rows
      for (const col of parsed.headers) {
        if (isTopLevel ? KEY_COLUMNS.has(col) : CHILD_KEY_COLUMNS.has(col)) continue;
        const val = rec.data[col];
        if (isNaCell(val)) continue;
        const covered =
          (isTopLevel ? cov.topLevel.has(`${baseKey}.${col}`) : cov.childFields.has(col)) ||
          KNOWN_NON_TOKEN_COVERAGE.some((k) => k.file === fname && k.column === col);
        if (!covered) gaps.push({ file: fname, iteration: iter, column: col, value: val! });
      }
    }
  }

  // ---- report -----------------------------------------------------------
  console.log(`check-testdata-coverage: ${tcId} (${module}/${feature})`);
  console.log(`  scanned ${csvFiles.length} testdata file(s), ${cov.scannedFlows.size} flow file(s)`);
  if (gaps.length === 0) {
    console.log(`  PASS — every non-N/A cell${iterationFilter ? ` for ${iterationFilter}` : ''} is referenced by at least one step.`);
    process.exit(0);
  }
  const byIteration = new Map<string, Gap[]>();
  for (const g of gaps) {
    if (!byIteration.has(g.iteration)) byIteration.set(g.iteration, []);
    byIteration.get(g.iteration)!.push(g);
  }
  console.log(`  FAIL — ${gaps.length} gap(s) across ${byIteration.size} iteration(s):\n`);
  for (const [iter, list] of [...byIteration.entries()].sort()) {
    console.log(`  ${iter}:`);
    for (const g of list) console.log(`    ${g.file} | ${g.column} = "${g.value}"  <- no step references this field`);
  }
  process.exit(1);
}

main();
