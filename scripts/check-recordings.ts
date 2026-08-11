/**
 * check-recordings — credential guard for committed Playwright recordings.
 *
 * Recording files (`**​/02_selectors_repo/*recording*.txt`) ARE committed so the
 * codegen source that drives `import-codegen` is reviewable in version control.
 * But raw codegen captures the LOGIN steps verbatim, including the typed password,
 * so a freshly-recorded file holds real credentials. This guard blocks any commit
 * whose recordings still contain an un-scrubbed credential; the fix is to replace
 * the login value with the placeholder (`<<USERNAME>>` / `<<PASSWORD>>`) — login is
 * a shared reusable flow, so the literal value is never used by the framework.
 *
 * Wired as a pre-commit hook (.githooks/pre-commit) and runnable via
 * `npm run check-recordings`. Reports file:line + a rule label only — it never
 * prints the offending value, so the secret is not echoed into a terminal or CI log.
 *
 * Exit 0 = clean, exit 1 = credential found (or a scan error).
 */
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

const PRUNE = new Set([
  'node_modules',
  '.git',
  'artifacts',
  'reports',
  'test-results',
  'playwright-report',
]);

/** A committed recording is any *recording*.txt inside a 02_selectors_repo folder. */
function isRecording(fileAbs: string): boolean {
  const base = path.basename(fileAbs).toLowerCase();
  return (
    base.endsWith('.txt') &&
    base.includes('recording') &&
    path.basename(path.dirname(fileAbs)) === '02_selectors_repo'
  );
}

function walk(dir: string, out: string[]): void {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    if (e.isDirectory()) {
      if (PRUNE.has(e.name)) continue;
      walk(path.join(dir, e.name), out);
    } else if (e.isFile()) {
      const abs = path.join(dir, e.name);
      if (isRecording(abs)) out.push(abs);
    }
  }
}

/**
 * Each rule flags a line that carries a real login credential. The `.fill` rules
 * use a negative lookahead so a properly-scrubbed placeholder passes; the identity
 * rule catches the known test account appearing anywhere (belt-and-suspenders).
 */
const RULES: { re: RegExp; label: string }[] = [
  {
    re: /\{\s*name:\s*'Password'\s*\}\)\.fill\('(?!<<PASSWORD>>)[^']+'\)/i,
    label: 'un-scrubbed password fill',
  },
  {
    re: /\{\s*name:\s*'(?:Username|Email|E-mail)'\s*\}\)\.fill\('(?!<<USERNAME>>)[^']+'\)/i,
    label: 'un-scrubbed username/email fill',
  },
  {
    re: /solara\.testuser|@cytel\.cloud|@cyteldev\.local/i,
    label: 'known test-account identity',
  },
];

const root = process.cwd();
const recordings: string[] = [];
walk(root, recordings);

type Finding = { file: string; line: number; label: string };
const findings: Finding[] = [];

for (const abs of recordings) {
  let text: string;
  try {
    text = readFileSync(abs, 'utf8');
  } catch {
    continue;
  }
  const lines = text.split(/\r?\n/);
  lines.forEach((ln, i) => {
    for (const { re, label } of RULES) {
      if (re.test(ln)) findings.push({ file: path.relative(root, abs), line: i + 1, label });
    }
  });
}

if (findings.length === 0) {
  console.log(`check-recordings: OK — ${recordings.length} recording file(s) scanned, no credentials found.`);
  process.exit(0);
}

console.error('check-recordings: BLOCKED — login credentials found in recording file(s):\n');
for (const f of findings) {
  console.error(`  ${f.file}:${f.line}  —  ${f.label}`);
}
console.error(
  '\nRecordings are committed but MUST be credential-free. Replace the login value with a\n' +
    "placeholder (<<USERNAME>> / <<PASSWORD>>) — login runs through the shared flows/login.csv\n" +
    'reusable, so the literal value is never used. Then re-stage and commit.',
);
process.exit(1);
