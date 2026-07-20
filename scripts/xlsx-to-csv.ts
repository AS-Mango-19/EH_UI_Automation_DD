/**
 * One-off authoring convenience (§3, §13.4). Authors may write test data in Excel;
 * this converts each sheet of an .xlsx into a committed .csv that the ENGINE then
 * consumes. The engine itself NEVER reads .xlsx (§15.8) — binary files can't be
 * code-reviewed, and reviewing why a number changed is the whole point.
 *
 * Usage:
 *   npm run xlsx-to-csv -- <input.xlsx> [outDir]
 *   - Each sheet becomes <outDir>/<SheetName>.csv (sheet name lower-cased,
 *     spaces -> underscores) so ${data.<sheet>.<Column>} lines up.
 */
import fs from 'node:fs';
import path from 'node:path';
import * as XLSX from 'xlsx';

function main(): number {
  const [input, outDirArg] = process.argv.slice(2);
  if (!input) {
    console.error('Usage: npm run xlsx-to-csv -- <input.xlsx> [outDir]');
    return 2;
  }
  if (!fs.existsSync(input)) {
    console.error(`Input not found: ${input}`);
    return 1;
  }
  const outDir = outDirArg ?? path.dirname(input);
  fs.mkdirSync(outDir, { recursive: true });

  const wb = XLSX.readFile(input);
  let written = 0;
  for (const sheetName of wb.SheetNames) {
    const sheet = wb.Sheets[sheetName];
    if (!sheet) continue;
    const csv = XLSX.utils.sheet_to_csv(sheet, { blankrows: false });
    const safe = sheetName.trim().toLowerCase().replace(/\s+/g, '_');
    const out = path.join(outDir, `${safe}.csv`);
    fs.writeFileSync(out, csv.endsWith('\n') ? csv : csv + '\n', 'utf8');
    console.log(`Wrote ${out} (${csv.split('\n').length - 1} rows)`);
    written++;
  }
  console.log(`Converted ${written} sheet(s) from ${input}.`);
  return 0;
}

process.exit(main());
