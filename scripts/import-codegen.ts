/**
 * Imports a Playwright codegen recording into this framework.
 *
 * The goal is a feature-ready starter:
 *   - selectors.csv from recorded locators
 *   - metadata.csv with framework actions and data tokens
 *   - inputset.csv / project.csv / design.csv skeletons
 *   - feature.config.json skeleton with a configurable results shape
 *
 * Usage:
 *   npm run import-codegen -- <Module> <Feature> <recording.ts|txt> [--page LoginPage]
 */
import fs from 'node:fs';
import path from 'node:path';
import Papa from 'papaparse';

type ArgSet = {
  module: string;
  feature: string;
  /** Path to the codegen recording. Optional: when omitted, resolved from the feature's 02_selectors_repo/. */
  inputFile?: string;
  page?: string;
  /** TC_ID to seed testdata rows with, and to print in the master.csv hint. */
  tcId?: string;
  /**
   * Simulation flow. Imports sim_recording.txt -> 03_metadata/sim_metadata.csv,
   * tokens bound to simulation.csv, NO login/navigate (the flow starts mid-app on
   * the results page at the Simulate click), selectors merged into the shared
   * selectors.csv, and the design compare.config.csv reused.
   */
  sim?: boolean;
};

type ParsedArgs =
  | { help: true }
  | {
      args: ArgSet;
    };

type ControlKind = 'button' | 'textbox' | 'radio button' | 'checkbox' | 'dropdown' | 'link' | 'option' | 'date picker' | 'unknown';

type ParsedEvent = {
  lineNo: number;
  kind: 'goto' | 'role' | 'label' | 'text' | 'testid' | 'locator';
  selectorType: string;
  selectorValue: string;
  roleType: string;
  roleName: string;
  action: string;
  args: string;
  ref: string;
  raw: string;
  /** Codegen emitted `exact: true` for this locator's accessible name. */
  exact: boolean;
};

type EmittedStep = {
  page: string;
  stepGroup: string;
  action: string;
  objectName: string;
  selectorType: string;
  selectorValue: string;
  roleName: string;
};

type LocatorRef = {
  page: string;
  objectName: string;
  selectorType: string;
  selectorValue: string;
  roleName: string;
  fieldType: ControlKind;
  fallbackSelector: string;
  dynamic: boolean;
  description: string;
  /** Force exact accessible-name matching (selectors.csv `Exact` column). */
  exact: boolean;
};

type StepRow = Record<string, string | number | boolean>;

/** Seq is the human-facing 1..N order; StepID keeps the gapped 10,20,30 numbering so steps can be inserted without renumbering. */
const STEP_HEADER = 'Seq,StepID,StepGroup,Page,Action,ObjectName,InputValue,StoreAs,AssertType,ExpectedValue,WaitCondition,Timeout,Optional,Retry,Screenshot,SkipIf,Description';
const SELECTOR_HEADER = 'ObjectName,Page,SelectorType,SelectorValue,RoleName,FallbackSelector,Dynamic,Description,Exact';
const RESULT_NAME_COLUMN = 'Result Name';

/**
 * compare.config for the extractAllResultTables output shape. That handler always
 * emits a tidy TableName/RowLabel/ColumnName/Value row-set (+ volatile provenance),
 * so a feature that uses it MUST compare on exactly these columns. A feature that
 * carried an older, differently-shaped compare.config would otherwise SCHEMA_MISMATCH
 * on every run. The four identity/value columns are the compatibility fingerprint.
 */
const GENERIC_COMPARE_COLUMNS = ['TableName', 'RowLabel', 'ColumnName', 'Value'];
const GENERIC_COMPARE_CONFIG = [
  'ColumnName,IsKey,Compare,DataType,AbsTolerance,RelTolerance,RoundTo,Normalize,Notes',
  'TableName,TRUE,FALSE,string,,,,trim,Row identity',
  'RowLabel,TRUE,FALSE,string,,,,trim,Row identity',
  'ColumnName,TRUE,FALSE,string,,,,trim,Row identity',
  'Value,FALSE,TRUE,string,,,,trim,The compared cell',
  'RunID,FALSE,FALSE,string,,,,,Volatile',
  'Timestamp,FALSE,FALSE,string,,,,,Volatile',
  'ProjectID,FALSE,FALSE,string,,,,,Volatile',
  '',
].join('\n');

/** The app cold-starts slowly and never goes network-idle, so readiness is polled, never slept on. */
const READINESS_TIMEOUT_MS = 220000;
const LOGIN_FLOW = 'flows/login.csv';

/**
 * The objects flows/login.csv drives, injected into every imported feature.
 *
 * The importer skips recorded identity-provider steps (login is shared, one
 * callReusable), so it never derives these from the recording. Without them a
 * feature's selectors.csv either lacks the login objects or keeps stale
 * placeholders, and callReusable login fails on the first fill. These are the
 * proven-good definitions from the reference feature; they OVERRIDE any existing
 * rows of the same name on merge, so a re-import repairs bad login selectors.
 * If your login page differs, edit these here (they are the shared contract with
 * flows/login.csv), not per feature.
 */
const LOGIN_SELECTORS: LocatorRef[] = [
  { page: 'LoginPage', objectName: 'txt_Username', selectorType: 'role', selectorValue: 'textbox', roleName: 'Username', fieldType: 'textbox', fallbackSelector: '', dynamic: false, description: 'Username field (login flow)', exact: false },
  { page: 'LoginPage', objectName: 'btn_Next', selectorType: 'role', selectorValue: 'button', roleName: 'Next', fieldType: 'button', fallbackSelector: '', dynamic: false, description: 'Next button (login flow)', exact: false },
  { page: 'LoginPage', objectName: 'txt_Password', selectorType: 'role', selectorValue: 'textbox', roleName: 'Password', fieldType: 'textbox', fallbackSelector: '', dynamic: false, description: 'Password field (login flow)', exact: false },
  { page: 'LoginPage', objectName: 'btn_Login', selectorType: 'role', selectorValue: 'button', roleName: 'Sign In', fieldType: 'button', fallbackSelector: '', dynamic: false, description: 'Sign in button (login flow)', exact: false },
  { page: 'ProjectsPage', objectName: 'btn_New_Project', selectorType: 'role', selectorValue: 'button', roleName: 'New Project', fieldType: 'button', fallbackSelector: '', dynamic: false, description: 'New Project button (login flow landing)', exact: false },
  { page: 'ProjectsPage', objectName: 'div_Spinner', selectorType: 'css', selectorValue: '#spinner', roleName: '', fieldType: 'unknown', fallbackSelector: '', dynamic: false, description: 'loading overlay (login flow landing)', exact: false },
];

function usage(): void {
  console.log([
    'Usage: npm run import-codegen -- <Module> <Feature> [recording.ts|txt] [--tc TC_05] [--page LoginPage]',
    '',
    'The recording is optional: if omitted, it is auto-discovered from the',
    "feature's 02_selectors_repo/ folder (save it there as recording.ts).",
    '',
    'Creates (or refreshes) a feature from a Playwright codegen recording:',
    '  00_config/feature.config.json     skeleton config',
    '  01_testdata/*.csv                 columns + values seeded from the recording',
    '  02_selectors_repo/selectors.csv   locators (merged with any existing rows)',
    '  03_metadata/metadata.csv          the ordered steps',
    '  06_baseline/compare.config.csv    compare rules skeleton',
    '',
    'The feature folder is created if missing — no separate scaffold step needed.',
    '',
    'Options:',
    '  --tc TC_05    TC_ID used to seed testdata rows and the printed master.csv row.',
    '  --page NAME   Starting page name for the first steps.',
    '  --sim         Import the SIMULATION flow: sim_recording.txt -> 03_metadata/sim_metadata.csv,',
    '                tokens bound to simulation.csv, no login/navigate (starts on the results page),',
    '                selectors merged into the shared selectors.csv, design compare.config reused.',
    '',
    'Examples:',
    '  npm run import-codegen -- ProductDesign ROM(PD) --tc TC_05            (design flow)',
    '  npm run import-codegen -- ProductDesign ROM(PD) --tc TC_05 --sim      (simulation flow)',
  ].join('\n'));
}

function parseArgs(argv: string[]): ParsedArgs {
  const positionals: string[] = [];
  let page: string | undefined;
  let tcId: string | undefined;
  let sim = false;
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '-h' || arg === '--help') return { help: true };
    if (arg === undefined) continue;
    if (arg === '--sim') {
      sim = true;
      continue;
    }
    if (arg === '--page') {
      const nextArg = argv[++i];
      if (nextArg !== undefined) page = nextArg;
      continue;
    }
    if (arg.startsWith('--page=')) {
      page = arg.slice('--page='.length);
      continue;
    }
    if (arg === '--tc') {
      const nextArg = argv[++i];
      if (nextArg !== undefined) tcId = nextArg;
      continue;
    }
    if (arg.startsWith('--tc=')) {
      tcId = arg.slice('--tc='.length);
      continue;
    }
    positionals.push(arg);
  }
  const [module, feature, inputFile] = positionals;
  // inputFile is optional: when omitted, main() looks for a recording inside the
  // feature's 02_selectors_repo/ folder (recordings live WITH the feature, not
  // scattered in the repo root).
  if (!module || !feature) return { help: true };
  return { args: { module, feature, inputFile, page, tcId, sim } };
}

function featureFolderName(feature: string): string {
  return feature.startsWith('feature_') ? feature : `feature_${feature}`;
}

function ensureDir(dir: string): void {
  fs.mkdirSync(dir, { recursive: true });
}

function readLines(file: string): string[] {
  return fs.readFileSync(file, 'utf8').split(/\r?\n/);
}

/**
 * Read a CSV into its header and row-objects (keyed by column name). Uses the
 * same parser as the rest of the tool so quoted commas survive. Missing/empty
 * file => empty header and no rows.
 */
function readCsvGrid(filePath: string): { header: string[]; rows: Record<string, string>[] } {
  if (!fs.existsSync(filePath)) return { header: [], rows: [] };
  const content = fs.readFileSync(filePath, 'utf8').trim();
  if (!content) return { header: [], rows: [] };
  const parsed = Papa.parse<Record<string, string>>(content, { header: true, skipEmptyLines: true });
  const header = (parsed.meta.fields ?? []).map((f) => f.trim());
  const rows = (parsed.data ?? []).filter(Boolean);
  return { header, rows };
}

/**
 * Find a codegen recording inside a feature's 02_selectors_repo/ folder.
 *
 * Prefers the conventional names, then falls back to ANY .ts/.txt whose content
 * looks like codegen (`await page.`). Deliberately skips selectors.csv and the
 * locators.json / stray note files that also live in that folder.
 */
function findRecording(dir: string, sim = false): string | undefined {
  if (!fs.existsSync(dir)) return undefined;
  const preferred = sim
    ? ['sim_recording.ts', 'sim_recording.txt', 'sim_codegen.ts', 'sim_codegen.txt']
    : ['recording.ts', 'recording.txt', 'codegen.ts', 'codegen.txt'];
  for (const name of preferred) {
    const p = path.join(dir, name);
    // Case-insensitive: the file on disk may be "Sim_recording.txt".
    const hit = fs.readdirSync(dir).find((f) => f.toLowerCase() === name);
    if (hit) return path.join(dir, hit);
    if (fs.existsSync(p)) return p;
  }
  const candidates = fs
    .readdirSync(dir)
    .filter((f) => /\.(ts|txt)$/i.test(f) && f.toLowerCase() !== 'selectors.csv')
    // In sim mode take only sim-named recordings; in design mode SKIP them, so a
    // sim recording sitting in the same folder never gets imported as the design.
    .filter((f) => (sim ? /^sim[_-]/i.test(f) : !/^sim[_-]/i.test(f)))
    .map((f) => path.join(dir, f))
    .filter((p) => {
      try {
        return /await\s+page\./.test(fs.readFileSync(p, 'utf8'));
      } catch {
        return false;
      }
    });
  return candidates[0];
}

function inferControlKind(objectName: string, locatorType: string, roleName: string, roleType = ''): ControlKind {
  const name = `${objectName} ${roleName} ${roleType}`.toLowerCase();
  if (roleType === 'radio' || name.includes('radio')) return 'radio button';
  if (roleType === 'checkbox' || name.includes('checkbox')) return 'checkbox';
  if (roleType === 'option' || name.includes('option')) return 'option';
  if (roleType === 'link' || name.includes('link')) return 'link';
  if (roleType === 'button' || name.includes('button')) return 'button';
  if (roleType === 'textbox' || name.includes('textbox')) return 'textbox';
  if (name.includes('dropdown') || name.includes('select') || locatorType === 'select' || locatorType === 'combobox') return 'dropdown';
  if (name.includes('date') || name.includes('calendar')) return 'date picker';
  if (locatorType === 'text') return 'textbox';
  return 'textbox';
}

function objectNameFromRef(ref: string, fieldType: ControlKind): string {
  const clean = ref
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/(^_|_$)/g, '')
    .replace(/([a-z])([A-Z])/g, '$1_$2');
  const prefix = {
    'button': 'btn_',
    'textbox': 'txt_',
    'radio button': 'radio_',
    'checkbox': 'chk_',
    'dropdown': 'ddl_',
    'link': 'lnk_',
    'option': 'opt_',
    'date picker': 'dtp_',
    'unknown': 'obj_',
  }[fieldType];
  return `${prefix}${clean}`.replace(/_+/g, '_');
}

function csvEscape(value: string): string {
  if (/[",\n\r]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

function selectorRowToCsv(row: LocatorRef): string {
  return [
    row.objectName,
    row.page,
    row.selectorType,
    row.selectorValue,
    row.roleName,
    row.fallbackSelector,
    row.dynamic ? 'TRUE' : 'FALSE',
    row.description,
    row.exact ? 'TRUE' : 'FALSE',
  ].map((v) => csvEscape(String(v))).join(',');
}

function readSelectorRows(filePath: string): LocatorRef[] {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf8').trim();
  if (!content) return [];
  const parsed = Papa.parse<Record<string, string>>(content, {
    header: true,
    skipEmptyLines: true,
  });
  if (parsed.errors.length > 0) return [];
  return (parsed.data ?? []).filter(Boolean).map((row) => ({
    objectName: row.ObjectName ?? '',
    page: row.Page ?? '',
    selectorType: row.SelectorType ?? '',
    selectorValue: row.SelectorValue ?? '',
    roleName: row.RoleName ?? '',
    fallbackSelector: row.FallbackSelector ?? '',
    dynamic: String(row.Dynamic ?? '').toUpperCase() === 'TRUE',
    description: row.Description ?? '',
    exact: String(row.Exact ?? '').toUpperCase() === 'TRUE',
    fieldType: inferControlKind(row.ObjectName ?? '', row.SelectorType ?? '', row.RoleName ?? '', ''),
  }));
}

function mergeSelectorRows(existingRows: LocatorRef[], generatedRows: LocatorRef[]): LocatorRef[] {
  // Key by PAGE + objectName, the same composite identity the loader uses. Keying
  // by objectName alone collapsed selectors that share a name across pages
  // (txt_Follow_up_Time_Week exists on both ProjectPage and ResultsPage) — a sim
  // import would then overwrite one page's row and the design step lost its
  // selector. A new row for the same (page,object) still updates in place.
  const merged = new Map<string, LocatorRef>();
  const key = (r: LocatorRef): string => `${r.page}::${r.objectName}`;
  for (const row of existingRows) merged.set(key(row), row);
  for (const row of generatedRows) merged.set(key(row), row);
  return [...merged.values()];
}

function stripOptionalSuffix(value: string): string {
  return value.replace(/\s*\((?:optional|month|day|year|date|time)\)\s*$/i, '').replace(/\s*\([^)]*\)\s*$/g, '').trim();
}

function labelToColumnName(value: string): string {
  return stripOptionalSuffix(value).replace(/\s+/g, ' ').trim();
}

function normalizeFallbackRef(value: string): string {
  return value
    .replace(/^[#.[(]+/, '')
    .replace(/[\]"'`]+/g, ' ')
    .replace(/[^A-Za-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Pull a clean field id out of a css selector so an indexed/dotted table cell keeps
 * its EXACT id as the testdata column (our convention: column === DOM id). Handles:
 *   #foo                    -> foo
 *   [id="foo.bar.baz"]      -> foo.bar.baz
 *   input[name="foo.bar"]   -> foo.bar
 *   [name="foo.bar"]        -> foo.bar
 * Returns undefined for non-id/name selectors (role/label/text keep their readable
 * column). Callers only override the column when the id is DOTTED — so a plain
 * #projectName still gets its "Project Name" label column, while
 * [id="boundary.0.analysisSpacingInfo"] becomes that exact dotted column.
 */
function extractFieldId(selectorValue: string): string | undefined {
  const hash = /^#([A-Za-z_][\w:-]*)$/.exec(selectorValue.trim());
  if (hash) return hash[1];
  const attr = /\[\s*(?:id|name)\s*=\s*["']([^"']+)["']\s*\]/.exec(selectorValue);
  if (attr) return attr[1];
  return undefined;
}

function dataFileFor(pageName: string, stepGroup: string): string {
  if (pageName === 'ProjectPage' || stepGroup === 'CreateProject' || stepGroup === 'OpenProject') return 'project';
  if (pageName === 'DesignPage' || stepGroup === 'ConfigureDesign' || stepGroup === 'Simulate' || stepGroup === 'ExtractResults') return 'design';
  if (pageName === 'InputSetPage' || stepGroup === 'CreateInputSet') return 'inputset';
  return 'inputset';
}

/**
 * Map a page to its design-flow testdata file, for steps SYNTHESISED outside the
 * main dispatch (the clicked-but-not-filled placeholder) where no step group is
 * available. ResultsPage/DesignPage design params live in design.csv.
 */
function dataFileForPage(page: string): string {
  if (page === 'ProjectPage') return 'project';
  if (page === 'InputSetPage') return 'inputset';
  return 'design';
}

/** Best-effort StepGroup for a synthesised step, keyed off the page. */
function stepGroupForPage(page: string): string {
  if (page === 'ProjectPage') return 'ConfigureDesign';
  if (page === 'InputSetPage') return 'CreateInputSet';
  return 'ExtractResults';
}

function nextPageForAction(ref: string, action: string, currentPage: string): string {
  if (/New Project/i.test(ref)) return 'ProjectPage';
  if (/New Input Set/i.test(ref)) return 'InputSetPage';
  if (/Continue/i.test(ref) || /Design Compute or simulate/i.test(ref)) return 'DesignPage';
  if (/Save & Compute/i.test(ref) || /Compute/i.test(ref) || /result/i.test(ref)) return 'ResultsPage';
  if (/Results|Export/i.test(ref)) return 'ResultsPage';
  if (action === 'navigate' && currentPage === 'ProjectsPage') return 'ProjectsPage';
  return currentPage;
}

function isNoiseContextEvent(event: ParsedEvent): boolean {
  if (event.kind === 'text' && event.action === 'click' && !event.args) return true;
  if (event.kind === 'role' && ['heading', 'paragraph'].includes(event.roleType) && event.action === 'click' && !event.args) return true;
  return false;
}

function isDropdownOpener(event: ParsedEvent): boolean {
  if (event.action !== 'click') return false;
  if (event.roleType === 'button' || event.roleType === 'combobox') return true;
  return /select|dropdown|creatable/i.test(`${event.selectorValue} ${event.roleName} ${event.ref}`);
}

/**
 * A click that specifically OPENS a combobox/react-select — used to recognise the
 * user's consistent "label -> open -> option" recording pattern and collapse the
 * open+option pair into one select even when the option is a plain getByText with
 * no exact flag. Deliberately NARROWER than isDropdownOpener: it must NOT match a
 * generic nav button (Continue, Save), or the next unrelated click would be
 * swallowed as a bogus option. So: an explicit combobox role, a select/dropdown/
 * combobox/creatable container, or a placeholder-value trigger ("Select"/"Choose").
 */
function isComboboxOpener(event: ParsedEvent): boolean {
  if (event.action !== 'click') return false;
  if (event.roleType === 'combobox') return true;
  return /select|dropdown|combobox|creatable/i.test(`${event.selectorValue} ${event.roleName}`);
}

/**
 * An event that picks a value out of an ALREADY-OPEN menu.
 *
 * Identified by evidence codegen actually emits, not by guessing at the opener:
 *   - `role=option` — an ARIA listbox row.
 *   - a text click carrying `exact: true` — codegen adds exact when the visible
 *     text is ambiguous, which is what an option row in an open menu looks like.
 * Whatever click precedes one of these IS the opener, whatever it looks like —
 * that is the only reliable way to spot `locator('#type-0').click()` as a
 * dropdown rather than a textbox.
 */
function isOptionChoice(event: ParsedEvent): boolean {
  if (event.action !== 'click') return false;
  // ONLY the semantic menu roles are reliable option signals: role=option (ARIA
  // listbox) and role=link/menuitem (Bootstrap-style <a> dropdown-items). Result
  // links are excluded separately via !isResultLink at the collapse site.
  //
  // A plain getByText(..., exact:true) is deliberately NOT treated as an option:
  // in real recordings its sole occurrence was a stray label click on a results
  // panel, which then mis-collapsed into a bogus dropdown step. Genuine plain-text
  // options (e.g. a react-select showing getByText('Simon\'s Two Stage')) are
  // caught instead by the isComboboxOpener path — a real open-trigger immediately
  // precedes them — which is the user's consistent label -> open -> option shape.
  return event.roleType === 'option' || event.roleType === 'link' || event.roleType === 'menuitem';
}

function isResultNameField(event: ParsedEvent): boolean {
  return /#inputid$/i.test(event.selectorValue) || /inputid/i.test(event.ref) || /result name/i.test(event.ref) || /result name/i.test(event.selectorValue);
}

function isResultLink(event: ParsedEvent): boolean {
  return event.action === 'click' && event.roleType === 'link' && /result/i.test(event.roleName);
}

/**
 * A manual "watch the run status" click — the human clicking the Status column and
 * "Completed" while waiting. These are NOT test steps: the result tail's
 * waitForSimulation polls the status properly, and importing the raw clicks both
 * duplicates that and breaks (getByText('Completed') is ambiguous once the grid
 * shows it in more than one place). Dropped.
 */
function isStatusWatch(event: ParsedEvent): boolean {
  if (event.action !== 'click') return false;
  const text = (event.selectorValue || event.roleName || event.ref || '').trim();
  return /^(status|completed|in[ -]?progress|running|failed|queued|pending|processing|not started)$/i.test(text);
}

/** A date picker, not a dropdown: the field cannot be typed and its options are calendar day cells. */
function isDateField(event: ParsedEvent, label: string): boolean {
  const hay = `${label} ${event.roleName} ${event.selectorValue} ${event.ref}`.toLowerCase();
  return /\bdate\b/.test(hay) || /mm.?dd.?yyyy|dd.?mm.?yyyy|yyyy.?mm.?dd/.test(hay);
}

/** A project-name field: its value is made unique per run so re-runs are not rejected as duplicates. */
function looksLikeProjectName(objectName: string, column: string): boolean {
  return /project.?name/i.test(`${objectName} ${column}`);
}

/** Best-effort date from a recorded calendar option like "Choose Monday, July 20th, 2026" -> "7/20/2026". */
function dateFromCalendarOption(optionText: string): string {
  const cleaned = optionText.replace(/^choose\s+/i, '');
  const m = /([A-Za-z]+)\s+(\d{1,2})(?:st|nd|rd|th)?(?:,?\s*(\d{4}))?/.exec(cleaned);
  if (!m || !m[1] || !m[2]) return '';
  const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
  const month = months.indexOf(m[1].toLowerCase()) + 1;
  if (!month) return '';
  const year = m[3] ? Number(m[3]) : new Date().getFullYear();
  return `${month}/${Number(m[2])}/${year}`;
}

function isChoiceEvent(event: ParsedEvent): boolean {
  return event.action === 'click' && ['option', 'link'].includes(event.roleType);
}

function isLikelyChoiceAfterOpener(previous: EmittedStep | undefined): boolean {
  if (!previous) return false;
  if (previous.action !== 'click') return false;
  if (previous.selectorType === 'css' || previous.selectorType === 'xpath') return true;
  if (previous.objectName.startsWith('ddl_') || previous.objectName.startsWith('btn_')) return true;
  return /select|dropdown|creatable/i.test(`${previous.objectName} ${previous.selectorValue} ${previous.roleName}`);
}

function parseCodegenEvent(line: string, lineNo: number): ParsedEvent | null {
  const trimmed = line.trim();
  if (!trimmed.startsWith('await page.')) return null;

  const gotoMatch = /^await page\.goto\((['"])(.*?)\1\);$/.exec(trimmed);
  if (gotoMatch) {
    return {
      lineNo,
      kind: 'goto',
      selectorType: '',
      selectorValue: '',
      roleType: '',
      roleName: '',
      action: 'goto',
      args: gotoMatch[2] ?? '',
      ref: gotoMatch[2] ?? '',
      raw: trimmed,
      exact: false,
    };
  }

  // `exact: true` is CAPTURED, not discarded: Playwright matches accessible names
  // by substring, so a recorded exact match is the only evidence that the name is
  // ambiguous (e.g. "Save" would otherwise also match "Save & Compute"). It maps
  // straight onto the selectors.csv `Exact` column.
  const roleCall = /getByRole\((['"])(.*?)\1,\s*\{\s*name:\s*(['"])(.*?)\3(\s*,\s*exact:\s*true)?\s*\}\)(?:\.(click|fill|check|uncheck|selectOption))?\((.*?)\);?$/.exec(trimmed);
  if (roleCall) {
    return {
      lineNo,
      kind: 'role',
      selectorType: 'role',
      selectorValue: roleCall[2] ?? '',
      roleType: roleCall[2] ?? '',
      roleName: unescapeJsString(roleCall[4] ?? ''),
      action: roleCall[6] ?? 'click',
      args: roleCall[7] ?? '',
      ref: unescapeJsString(roleCall[4] ?? roleCall[2] ?? ''),
      raw: trimmed,
      exact: Boolean(roleCall[5]),
    };
  }

  // The `(\s*,\s*\{[^}]*\})?` tail is REQUIRED, not cosmetic: codegen routinely
  // emits `getByLabel('X', { exact: true })`, and without it the line matches
  // nothing and the step is silently dropped from the import.
  const labelCall = /getByLabel\((['"])(.*?)\1(\s*,\s*\{[^}]*\})?\)(?:\.(click|fill|check|uncheck|selectOption))?\((.*?)\);?$/.exec(trimmed);
  if (labelCall) {
    return {
      lineNo,
      kind: 'label',
      selectorType: 'label',
      selectorValue: unescapeJsString(labelCall[2] ?? ''),
      exact: /exact:\s*true/.test(labelCall[3] ?? ''),
      roleType: '',
      roleName: '',
      action: labelCall[4] ?? 'click',
      args: labelCall[5] ?? '',
      ref: unescapeJsString(labelCall[2] ?? ''),
      raw: trimmed,
    };
  }

  // Tolerate .nth(N)/.first()/.last() between getByText(...) and the action:
  // codegen adds .nth(1) when a label's text appears more than once on the page
  // (e.g. "Power" is both a radio and a field label). Without this the whole label
  // click is dropped and the following field is named after its id (`power`)
  // instead of the label ("Power").
  const textCall = /getByText\((['"])(.*?)\1(\s*,\s*\{[^}]*\})?\)(?:\.(?:nth\(\d+\)|first\(\)|last\(\)))*(?:\.(click|fill|check|uncheck|selectOption))?\((.*?)\);?$/.exec(trimmed);
  if (textCall) {
    return {
      lineNo,
      kind: 'text',
      selectorType: 'text',
      selectorValue: unescapeJsString(textCall[2] ?? ''),
      exact: /exact:\s*true/.test(textCall[3] ?? ''),
      roleType: '',
      roleName: '',
      action: textCall[4] ?? 'click',
      args: textCall[5] ?? '',
      ref: unescapeJsString(textCall[2] ?? ''),
      raw: trimmed,
    };
  }

  // getByTestId('x') — a data-testid locator. Some controls (checkbox toggles such
  // as Variable / includeAssurance) are ONLY reachable this way; without this rule
  // the line matches nothing (parseCodegenEvent returns null) and the control is
  // silently dropped from the import. The resolver already supports `testid`.
  const testIdCall = /getByTestId\((['"])(.*?)\1\)(?:\.(click|fill|check|uncheck|selectOption))?\((.*?)\);?$/.exec(trimmed);
  if (testIdCall) {
    return {
      lineNo,
      kind: 'testid',
      selectorType: 'testid',
      selectorValue: unescapeJsString(testIdCall[2] ?? ''),
      roleType: '',
      roleName: '',
      action: testIdCall[3] ?? 'click',
      args: testIdCall[4] ?? '',
      ref: unescapeJsString(testIdCall[2] ?? ''),
      raw: trimmed,
      exact: false,
    };
  }

  const locatorCall = /locator\((['"])(.*?)\1\)(?:\.(click|fill|check|uncheck|selectOption|select\w*))?\((.*?)\);?$/.exec(trimmed);
  if (locatorCall) {
    const selectorValue = locatorCall[2] ?? '';
    return {
      lineNo,
      kind: 'locator',
      // css unless it is an explicit XPath (//… or xpath=…). The old test only
      // accepted #/./[ as css, so `input[name="x"]`, `div > span`, etc. were
      // mislabelled xpath and then broke at runtime (`xpath=input[name=…]`).
      selectorType: selectorValue.startsWith('//') || selectorValue.startsWith('xpath=') ? 'xpath' : 'css',
      selectorValue,
      roleType: '',
      roleName: '',
      action: locatorCall[3] ?? 'click',
      args: locatorCall[4] ?? '',
      ref: selectorValue,
      raw: trimmed,
      exact: false,
    };
  }

  return null;
}

function buildDataToken(file: string, column: string): string {
  return `${'${'}data.${file}.${column}}`;
}

/**
 * Turn a JS string-literal body back into the real text it represents.
 * Codegen writes `Simon\'s Two Stage` for the on-screen text `Simon's Two Stage`;
 * without this the escaping backslash leaks into selector names and data columns.
 */
function unescapeJsString(value: string): string {
  return value.replace(/\\(['"`\\/])/g, '$1').replace(/\\[nt]/g, ' ');
}

/** Codegen args arrive as source text (`'Week'`); unwrap AND unescape to the literal value. */
function stripQuotes(value: string): string {
  const trimmed = (value ?? '').trim();
  const match = /^(['"`])([\s\S]*)\1$/.exec(trimmed);
  return unescapeJsString(match ? (match[2] ?? '') : trimmed);
}

function deriveColumnName(event: ParsedEvent, pendingLabel: string, fallbackRef: string): string {
  const label = stripOptionalSuffix(pendingLabel || '');
  if (label) return labelToColumnName(label);
  const fallback = normalizeFallbackRef(fallbackRef || event.ref || event.selectorValue || '');
  return labelToColumnName(fallback || fallbackRef || event.ref || event.selectorValue || '');
}

function inferStepGroup(page: string, event: ParsedEvent, ref: string): { stepGroup: string; pageName: string } {
  let stepGroup = 'ConfigureDesign';
  let pageName = page;
  if (/New Project/i.test(ref)) {
    stepGroup = 'CreateProject';
    pageName = 'ProjectsPage';
  } else if (/input set/i.test(ref) || /collection/i.test(ref)) {
    stepGroup = 'CreateInputSet';
    pageName = 'InputSetPage';
  } else if (/compute|simulate/i.test(ref)) {
    stepGroup = 'Simulate';
    pageName = 'DesignPage';
  } else if (/result|results|export/i.test(ref)) {
    stepGroup = 'ExtractResults';
    pageName = 'ResultsPage';
  }
  if (event.kind === 'goto') {
    stepGroup = 'OpenProject';
    pageName = 'ProjectsPage';
  }
  return { stepGroup, pageName };
}

function stepRowToCsv(row: StepRow): string {
  const keys = ['Seq', 'StepID', 'StepGroup', 'Page', 'Action', 'ObjectName', 'InputValue', 'StoreAs', 'AssertType', 'ExpectedValue', 'WaitCondition', 'Timeout', 'Optional', 'Retry', 'Screenshot', 'SkipIf', 'Description'];
  return keys.map((k) => csvEscape(String(row[k] ?? ''))).join(',');
}

function parseCodegen(lines: string[], opts: { sim?: boolean } = {}): {
  selectors: LocatorRef[];
  steps: StepRow[];
  dataColumns: Map<string, Set<string>>;
  /** "<file>|<Column>" -> the value actually recorded, used to seed testdata so the first run is runnable. */
  dataValues: Map<string, string>;
  sawLogin: boolean;
  /** Radios recorded without a label: no data-driven step could be built (see below). */
  blindChoiceWarnings: string[];
  /** "<file>|<Column>" ids minted by the collision split — exact-reuse only, never prefix-collapsed. */
  splitColumns: Set<string>;
} {
  const selectors: LocatorRef[] = [];
  const seenSelectors = new Set<string>();
  const steps: StepRow[] = [];
  const dataColumns = new Map<string, Set<string>>();
  const dataValues = new Map<string, string>();
  const blindChoiceWarnings: string[] = [];
  const events = lines.map((line, lineNo) => parseCodegenEvent(line, lineNo)).filter((event): event is ParsedEvent => event !== null);

  let stepId = 10;
  let currentPage = 'Page';
  let inLogin = false;
  let pendingLabel = '';
  let lastEmitted: EmittedStep | undefined;
  let activeFlow = '';
  let seq = 0;
  let emittedReadiness = false;
  let seenIdp = false;
  let sawResultLink = false;
  // The simulation flow's data all lives in simulation.csv; the design flow splits
  // across inputset/project/design. This is the file the tail's result-name token
  // and every field token bind to.
  const sim = opts.sim === true;
  const resultDataFile = sim ? 'simulation' : 'design';

  // Login is decided up front so the callReusable step lands FIRST, before any
  // navigate. flows/login.csv does its own goto, so a recorded pre-login landing
  // navigate is redundant and is skipped below.
  //
  // The SIM flow never logs in: it starts on the results page, already
  // authenticated by the design phase, so login synthesis is forced off.
  const isIdpUrl = (url: string): boolean => /okta|login|signin|sign-in|auth0|microsoftonline/i.test(url);
  const sawLogin = !sim && events.some((e) => e.kind === 'goto' && isIdpUrl(e.args));

  const registerDataColumn = (file: string, col: string): void => {
    const set = dataColumns.get(file) ?? new Set<string>();
    set.add(col);
    dataColumns.set(file, set);
  };

  const registerDataValue = (file: string, col: string, value: string): void => {
    registerDataColumn(file, col);
    if (value && !dataValues.has(`${file}|${col}`)) dataValues.set(`${file}|${col}`, value);
  };

  const addSelector = (ref: LocatorRef): void => {
    const key = `${ref.page}|${ref.objectName}`;
    if (seenSelectors.has(key)) return;
    seenSelectors.add(key);
    selectors.push(ref);
  };

  const addStep = (step: StepRow): void => {
    step.Seq = ++seq;
    steps.push(step);
    stepId += 10;
  };

  const emitStep = (step: StepRow, selectorInfo: EmittedStep): void => {
    addStep(step);
    lastEmitted = selectorInfo;
  };

  /**
   * Landing readiness, emitted once after the first navigate.
   *
   * Recordings carry no waits — the human paused, Playwright did not record it.
   * Without this the first interaction races the app's cold start. It POLLS the
   * first real target instead of sleeping, and deliberately does NOT use
   * networkidle: this SPA streams telemetry beacons and never goes idle.
   */
  const emitReadiness = (page: string, objectName: string): void => {
    if (emittedReadiness || !objectName) return;
    emittedReadiness = true;
    addStep({
      StepID: stepId,
      StepGroup: 'OpenProject',
      Page: page,
      Action: 'waitForSelector',
      ObjectName: objectName,
      InputValue: '',
      StoreAs: '',
      AssertType: '',
      ExpectedValue: '',
      WaitCondition: 'visible',
      Timeout: READINESS_TIMEOUT_MS,
      Optional: 'FALSE',
      Retry: 0,
      Screenshot: 'always',
      SkipIf: '',
      Description: 'Wait for the landing page to finish loading. Polls instead of sleeping; the app cold-starts slowly and never goes network-idle',
    });
  };

  /**
   * A label the tester CLICKED but never filled — a computed/greyed output (e.g.
   * "Rate for Treatment", whose value the app derives) or a field left at its
   * default (e.g. "Priority"). The old importer dropped these silently. Instead,
   * emit a placeholder `assertValue` bound to a data column so the field is never
   * lost: the tester sets the expected value (or the reuse pass binds it to an
   * existing testdata column) and, if needed, switches the action or the selector.
   *
   * Optional=TRUE and a label-based selector keep it inert until the tester
   * completes it — a wrong guess warns instead of failing the run. Deliberately
   * only fires for a label with NO recorded locator (a bare getByText click); a
   * field clicked via its #id already produces a click step.
   */
  const emitClickedNotFilled = (rawLabel: string): void => {
    const label = rawLabel.replace(/\s+/g, ' ').trim();
    const column = labelToColumnName(label);
    if (!column) return;
    const page = currentPage;
    const file = sim ? 'simulation' : dataFileForPage(page);
    const objectName = objectNameFromRef(label || column, 'unknown');
    addSelector({
      page,
      objectName,
      selectorType: 'label',
      selectorValue: label,
      roleName: '',
      fieldType: 'unknown',
      fallbackSelector: '',
      dynamic: false,
      description: 'clicked but not filled during recording - VERIFY selector (set a real id if this is a computed/greyed field)',
      exact: false,
    });
    registerDataColumn(file, column);
    addStep({
      StepID: stepId,
      StepGroup: stepGroupForPage(page),
      Page: page,
      Action: 'assertValue',
      ObjectName: objectName,
      InputValue: '',
      StoreAs: '',
      AssertType: '',
      ExpectedValue: buildDataToken(file, column),
      WaitCondition: '',
      Timeout: 10000,
      Optional: 'TRUE',
      Retry: 0,
      Screenshot: 'always',
      SkipIf: '',
      Description: `clicked but not filled during recording - defaulted to assertValue (Optional). Set the expected value in ${file}.csv; fix the selector and flip Optional=FALSE to enforce, or change the action`,
    });
  };

  // Login first, before any navigate. The recorded identity-provider steps are
  // deliberately NOT imported: login is shared infrastructure, so it collapses
  // to one callReusable pointing at flows/login.csv.
  if (sawLogin) {
    addStep({
      StepID: stepId,
      StepGroup: 'Login',
      Page: '-',
      Action: 'callReusable',
      ObjectName: '',
      InputValue: LOGIN_FLOW,
      StoreAs: '',
      AssertType: '',
      ExpectedValue: '',
      WaitCondition: '',
      Timeout: 300000,
      Optional: 'FALSE',
      Retry: 0,
      Screenshot: 'always',
      SkipIf: '',
      Description: 'Log in via the shared login flow. Recorded identity-provider steps are intentionally not imported - login is shared, not per-feature',
    });
    // callReusable login references these objects; the recording never provides
    // them (login events are skipped), so inject the shared, proven definitions.
    for (const sel of LOGIN_SELECTORS) addSelector(sel);
  }

  for (let index = 0; index < events.length; index++) {
    const event = events[index];
    if (!event) continue;
    const nextEvent = events[index + 1];

    if (event.kind === 'goto') {
      const url = event.args;
      // Sim flow starts mid-app on the results page: every recorded navigation
      // (the leading okta goto included) is dropped, and login mode is never
      // entered — otherwise the leading IDP goto would flag inLogin and swallow
      // every sim step that follows.
      if (sim) continue;
      if (isIdpUrl(url)) {
        seenIdp = true;
        inLogin = true;
        continue;
      }
      // Everything before the identity provider belongs to login (flows/login.csv
      // navigates on its own), so only the first POST-login navigate is imported.
      if (sawLogin && !seenIdp) {
        continue;
      }
      if (inLogin) {
        inLogin = false;
      }
      currentPage = 'ProjectsPage';
      const pathPart = url.replace(/^https?:\/\/[^/]+/i, '');
      emitStep(
        {
          StepID: stepId,
          StepGroup: 'OpenProject',
          Page: 'ProjectsPage',
          Action: 'navigate',
          ObjectName: '',
          InputValue: pathPart || url,
          StoreAs: '',
          AssertType: '',
          ExpectedValue: '',
          // domcontentloaded, NOT networkidle: this SPA streams telemetry beacons
          // and never goes network-idle, so networkidle here is a guaranteed
          // fatal timeout. Readiness is polled by the waitForSelector that follows.
          WaitCondition: 'domcontentloaded',
          Timeout: 60000,
          Optional: 'FALSE',
          Retry: 0,
          Screenshot: 'always',
          SkipIf: '',
          Description: 'Navigate to app page',
        },
        { page: 'ProjectsPage', stepGroup: 'OpenProject', action: 'navigate', objectName: '', selectorType: 'goto', selectorValue: url, roleName: '' },
      );
      // The next real interaction tells us what "loaded" means — wait for it.
      const nextTarget = events.slice(index + 1).find((e) => e && !isNoiseContextEvent(e) && e.kind !== 'goto' && e.action !== 'fill');
      if (nextTarget) {
        const kind = inferControlKind(nextTarget.ref, nextTarget.selectorType, nextTarget.roleName, nextTarget.roleType);
        emitReadiness('ProjectsPage', objectNameFromRef(nextTarget.ref || nextTarget.roleName || nextTarget.selectorValue, kind));
      }
      continue;
    }

    // A text click is only noise (a stray heading click codegen recorded) when it
    // is NOT opening a menu. `getByText('Time Unit').click()` followed by an
    // option choice is the whole dropdown interaction — treating it as noise
    // silently deletes the step.
    if (isNoiseContextEvent(event) && !(nextEvent && isOptionChoice(nextEvent))) {
      const newLabel = event.ref.replace(/\s+/g, ' ').trim();
      // pendingLabel is set ONLY here and cleared the moment a fill/select/option/
      // check consumes it. So if it is STILL set when the next label arrives,
      // nothing consumed the previous one — the tester clicked a field and never
      // filled it. Rescue it as a placeholder instead of dropping it silently.
      if (pendingLabel && pendingLabel !== newLabel) {
        emitClickedNotFilled(pendingLabel);
      }
      // Keep the RAW label ("Phase (Optional)"), not the column-normalised form
      // ("Phase"). A `select` scoped to this label must match the on-screen text
      // exactly; consumers that want the column name (deriveColumnName, the
      // dropdown collapse) strip the suffix themselves.
      pendingLabel = newLabel;
      continue;
    }

    if (inLogin) {
      continue;
    }

    // Drop manual status-watch clicks (Status / Completed / In progress ...): the
    // result tail's waitForSimulation handles this properly.
    if (isStatusWatch(event)) {
      continue;
    }

    const page = currentPage;
    const inferred = inferStepGroup(page, event, pendingLabel || event.ref);
    let stepGroup = activeFlow || inferred.stepGroup;
    let pageName = inferred.pageName;
    if (activeFlow === 'CreateProject' || activeFlow === 'CreateInputSet') {
      pageName = 'ProjectPage';
    } else if (activeFlow === 'ConfigureDesign' || activeFlow === 'Simulate') {
      pageName = 'DesignPage';
    } else if (activeFlow === 'ExtractResults') {
      pageName = 'ResultsPage';
    }
    // Sim: every field binds to simulation.csv (its one testdata file). Design:
    // split across inputset/project/design by page/group.
    const dataFile = sim ? 'simulation' : dataFileFor(pageName, stepGroup);
    const isResultName = isResultNameField(event);
    // A DOTTED id (indexed table cell like inputMethodTable.0.hazardRateControl or
    // boundary.0.analysisSpacingInfo) becomes its exact id column — the shared column
    // header would collide across rows, and it keeps codegen's [id=]/[name=] cells
    // aligned with the hand-authored testdata standard. Non-dotted ids keep their
    // readable label column.
    const fieldId = extractFieldId(event.selectorValue);
    const columnName = isResultName
      ? RESULT_NAME_COLUMN
      : fieldId && fieldId.includes('.')
        ? fieldId
        : deriveColumnName(event, pendingLabel, event.ref);
    const targetAction = event.action || 'click';
    const ref = pendingLabel || event.ref || event.selectorValue;
    const fieldType = isResultName ? 'textbox' : inferControlKind(ref, event.selectorType, event.roleName, event.roleType);
    const objectName = isResultName
      ? 'txt_ResultName'
      : fieldId && fieldId.includes('.')
        ? objectNameFromRef(fieldId, fieldType)
        : objectNameFromRef(ref || event.roleName || event.selectorValue, fieldType);
    const isOpener = isDropdownOpener(event);
    const isChoice = isChoiceEvent(event) || (event.kind === 'role' && event.roleType === 'radio' && event.action === 'check');
    const keepLabelForChoice = isOpener && (nextEvent ? isChoiceEvent(nextEvent) || (nextEvent.kind === 'role' && nextEvent.roleType === 'radio' && nextEvent.action === 'check') : false);
    const finishLabel = (keep: boolean): string => {
      const label = pendingLabel;
      if (!keep) pendingLabel = '';
      return label;
    };

    // ---- Custom dropdown: opener click + option click => ONE `select` step ----
    //
    // Codegen records a custom (react-select / Bootstrap) dropdown as two events:
    // a click that opens the menu, then a click on the chosen option. Importing
    // them literally produces two brittle steps — and the second needs a Dynamic
    // selector for an option that only exists while the menu is open.
    //
    // The `select` keyword already does the whole job in one step: it walks a
    // label to the interactive control, detects native <select> vs custom
    // combobox, opens the menu, and commits the option (including grouped menus
    // via the "Option (Group)" syntax). So collapse the pair. The FIELD label
    // becomes the testdata column; the recorded OPTION text becomes its value.
    // Collapse an open+option pair into one select when EITHER the next click is a
    // recognisable menu choice (option/link/menuitem/exact-text), OR this click is
    // a combobox opener and the next is any click — the user's recordings always go
    // label -> open -> option, so a plain getByText option after a react-select
    // opener is still the choice. Result links are excluded (handled separately).
    const nextIsChoice =
      !!nextEvent &&
      !isResultLink(nextEvent) &&
      (isOptionChoice(nextEvent) || (isComboboxOpener(event) && nextEvent.action === 'click'));
    if (event.action === 'click' && nextIsChoice && nextEvent) {
      const optionText = nextEvent.roleName || nextEvent.selectorValue || nextEvent.ref;

      // DATE PICKER, not a dropdown: the field cannot be typed and the "option"
      // is a calendar day cell. `select` would fail to set a real date, so emit
      // a callCustom selectStartDate (shared handler) driven by a Start Date
      // column, seeded best-effort from the recorded day and flagged for review.
      if (isDateField(event, pendingLabel || event.selectorValue)) {
        registerDataValue(dataFile === 'inputset' ? 'project' : dataFile, 'Start Date', dateFromCalendarOption(optionText));
        addStep({
          StepID: stepId,
          StepGroup: stepGroup,
          Page: pageName,
          Action: 'callCustom',
          ObjectName: '',
          InputValue: 'selectStartDate',
          StoreAs: '',
          AssertType: '',
          ExpectedValue: '',
          WaitCondition: '',
          Timeout: 15000,
          Optional: 'FALSE',
          Retry: 0,
          Screenshot: 'always',
          SkipIf: '',
          Description: 'Pick the Start Date in the calendar (shared selectStartDate). REVIEW the Start Date value in testdata - dates cannot be inferred reliably from a recording',
        });
        pendingLabel = '';
        index++; // consume the day-cell click
        currentPage = nextPageForAction(ref, 'select', currentPage);
        continue;
      }
      // The field label: a text/label opener carries it directly; otherwise the
      // preceding dropped label click (e.g. getByText("Study Objective")) left it
      // in pendingLabel. labelToColumnName turns "Phase (Optional)" into "Phase".
      const fieldLabel = event.kind === 'text' || event.kind === 'label' ? event.selectorValue : pendingLabel || '';
      const ddlColumn = fieldLabel ? labelToColumnName(fieldLabel) : columnName;
      const ddlObject = objectNameFromRef(ddlColumn || event.roleName || event.selectorValue, 'dropdown');
      // Choose what to scope the select by:
      //  - A GENERIC placeholder trigger ("Select"/"Choose") does not identify the
      //    field, and is often shared across fields, so scope by the field LABEL
      //    (the select keyword walks the label to its control). e.g. Study Objective.
      //  - A trigger showing a SPECIFIC current value ("Time to Event") DOES
      //    identify the control. This is the table-cell dropdown case, where the
      //    "label" is really a column header with no adjacent control — the
      //    label-walk fails there, so target the value trigger directly. e.g.
      //    Endpoint Type. The data COLUMN still comes from the header text.
      const openerName = (event.roleName || '').trim();
      const isPlaceholderTrigger = !openerName || /^(select|choose|pick|search|--|\.\.\.)/i.test(openerName);
      const useLabel = Boolean(fieldLabel) && (event.kind === 'text' || event.kind === 'label' || isPlaceholderTrigger);
      const ddlType = useLabel ? 'label' : event.selectorType;
      const ddlSelectorValue = useLabel ? fieldLabel : event.selectorValue;
      addSelector({
        page: pageName,
        objectName: ddlObject,
        selectorType: ddlType,
        selectorValue: ddlSelectorValue,
        roleName: useLabel ? '' : event.roleName,
        fieldType: 'dropdown',
        fallbackSelector: '',
        dynamic: false,
        description: 'dropdown (opener+option collapsed into one select step)',
        exact: event.exact,
      });
      registerDataValue(dataFile, ddlColumn, optionText);
      emitStep(
        {
          StepID: stepId,
          StepGroup: stepGroup,
          Page: pageName,
          Action: 'select',
          ObjectName: ddlObject,
          InputValue: buildDataToken(dataFile, ddlColumn),
          StoreAs: '',
          AssertType: '',
          ExpectedValue: '',
          WaitCondition: '',
          Timeout: 15000,
          Optional: 'FALSE',
          Retry: 0,
          Screenshot: 'always',
          SkipIf: '',
          Description: `Select ${ddlColumn}. select opens the menu and commits the option itself - works for native and custom dropdowns`,
        },
        { page: pageName, stepGroup, action: 'select', objectName: ddlObject, selectorType: ddlType, selectorValue: ddlSelectorValue, roleName: useLabel ? '' : event.roleName },
      );
      pendingLabel = '';
      index++; // consume the option click; it is part of this select step
      currentPage = nextPageForAction(ref, 'select', currentPage);
      continue;
    }

    // Native <select> recorded as locator('#testtype').selectOption(...) — emit a
    // `select` step. Kept before the fill branch for clarity, though the fill
    // branch no longer claims arbitrary `#id` selectors.
    if (targetAction === 'selectOption') {
      addSelector({
        page: pageName,
        objectName: objectNameFromRef(ref || event.roleName || event.selectorValue, 'dropdown'),
        selectorType: event.selectorType,
        selectorValue: event.selectorValue,
        roleName: event.roleName,
        fieldType: 'dropdown',
        fallbackSelector: '',
        dynamic: false,
        description: 'native <select> from codegen',
        exact: event.exact,
      });
      registerDataValue(dataFile, columnName, stripQuotes(event.args));
      emitStep(
        {
          StepID: stepId,
          StepGroup: stepGroup,
          Page: pageName,
          Action: 'select',
          ObjectName: objectNameFromRef(ref || event.roleName || event.selectorValue, 'dropdown'),
          InputValue: buildDataToken(dataFile, columnName),
          StoreAs: '',
          AssertType: '',
          ExpectedValue: '',
          WaitCondition: '',
          Timeout: 10000,
          Optional: 'FALSE',
          Retry: 0,
          Screenshot: 'always',
          SkipIf: '',
          Description: `Select ${columnName}. Native <select> - select matches by visible label first`,
        },
        { page: pageName, stepGroup, action: 'select', objectName, selectorType: event.selectorType, selectorValue: event.selectorValue, roleName: event.roleName },
      );
      pendingLabel = '';
      currentPage = nextPageForAction(ref, 'select', currentPage);
      continue;
    }

    // A click that only focuses a field the next event fills is noise — codegen
    // records the focus click and the fill as two events. Drop the focus click so
    // one input does not become a click + fill pair. General (any selector kind),
    // so it must run before the fill/click branches below.
    if (
      event.action === 'click' &&
      nextEvent &&
      nextEvent.action === 'fill' &&
      nextEvent.selectorType === event.selectorType &&
      nextEvent.selectorValue === event.selectorValue
    ) {
      continue;
    }

    // Fill ONLY when the recording actually filled, or the control is a textbox by
    // role. A `.click()` is NOT coerced into a fill just because its selector is a
    // `#id` — that turned button clicks like `#credit-alert-primary` into bogus
    // data-driven fills. A real click falls through to the click branch below.
    if (event.action === 'fill' || (event.kind === 'role' && event.roleType === 'textbox')) {
      addSelector({
        page: pageName,
        objectName,
        selectorType: event.selectorType,
        selectorValue: event.selectorValue,
        roleName: event.roleName,
        fieldType: 'textbox',
        fallbackSelector: '',
        dynamic: false,
        description: 'textbox from codegen',
        exact: event.exact,
      });
      registerDataValue(dataFile, columnName, stripQuotes(event.args));
      // A project name must be globally unique or the app rejects it as a
      // duplicate. runId makes it unique across runs; iterationId makes it unique
      // across the iterations WITHIN a run (they share one runId, so runId alone
      // collides on the 2nd iteration). Everything else fills verbatim.
      const isProjName = looksLikeProjectName(objectName, columnName);
      const fillValue = isProjName ? `${buildDataToken(dataFile, columnName)}_\${runId}_\${iterationId}` : buildDataToken(dataFile, columnName);
      emitStep(
        {
          StepID: stepId,
          StepGroup: stepGroup,
          Page: pageName,
          Action: 'fill',
          ObjectName: objectName,
          InputValue: fillValue,
          StoreAs: '',
          AssertType: '',
          ExpectedValue: '',
          WaitCondition: '',
          Timeout: 10000,
          Optional: 'FALSE',
          Retry: 0,
          Screenshot: 'never',
          SkipIf: '',
          Description: isProjName ? `fill ${columnName} (made unique per run with runId)` : `fill ${columnName}`,
        },
        { page: pageName, stepGroup, action: 'fill', objectName, selectorType: event.selectorType, selectorValue: event.selectorValue, roleName: event.roleName },
      );
      pendingLabel = '';
      currentPage = nextPageForAction(ref, 'fill', currentPage);
      continue;
    }

    if (isResultLink(event)) {
      // Do NOT emit the result-link click HERE — it must run AFTER the status is
      // Completed. Just register the selector/column and flag it; the result tail
      // emits waitForSimulation -> click lnk_ResultName -> extract -> compare in
      // the correct order. Emitting inline puts the open-result click before the
      // status poll (wrong) and duplicates the tail's work.
      addSelector({
        page: 'ResultsPage',
        objectName: 'lnk_ResultName',
        selectorType: 'role',
        selectorValue: 'link',
        roleName: '{0}',
        fieldType: 'link',
        fallbackSelector: '',
        // Dynamic substitutes {0} into BOTH SelectorValue and RoleName
        // (resolver.ts buildLocator), so {0} in RoleName is correct here.
        dynamic: true,
        description: 'result link from codegen',
        exact: false,
      });
      registerDataValue(resultDataFile, RESULT_NAME_COLUMN, event.roleName || event.selectorValue);
      sawResultLink = true;
      pendingLabel = '';
      continue;
    }

    if (isChoice && (pendingLabel || isLikelyChoiceAfterOpener(lastEmitted))) {
      const optionObjectName = objectNameFromRef(ref || event.roleName || event.selectorValue, 'option');
      addSelector({
        page: pageName,
        objectName: optionObjectName,
        selectorType: 'role',
        selectorValue: event.roleType || event.selectorValue,
        roleName: '{0}',
        fieldType: 'option',
        fallbackSelector: '',
        dynamic: true,
        // Honor the recorded exactness, do NOT force exact. Codegen often TRUNCATES
        // a long accessible name (e.g. "One Arm Exploratory /") and records it
        // WITHOUT exact:true; forcing exact then never matches the full link text.
        // If a menu has ambiguous options, codegen emits exact:true and we keep it.
        description: event.exact ? 'choice from codegen (exact)' : 'choice from codegen (substring - recorded name may be truncated; set Exact=TRUE if it matches the wrong option)',
        exact: event.exact,
      });
      registerDataValue(dataFile, columnName, event.roleName || event.selectorValue);
      emitStep(
        {
          StepID: stepId,
          StepGroup: stepGroup,
          Page: pageName,
          Action: event.roleType === 'radio' ? 'check' : 'click',
          ObjectName: optionObjectName,
          InputValue: buildDataToken(dataFile, columnName),
          StoreAs: '',
          AssertType: '',
          ExpectedValue: '',
          WaitCondition: event.roleType === 'radio' ? 'visible' : '',
          Timeout: 10000,
          Optional: 'FALSE',
          Retry: 0,
          Screenshot: 'never',
          SkipIf: '',
          Description: `select ${columnName}`,
        },
        { page: pageName, stepGroup, action: event.roleType === 'radio' ? 'check' : 'click', objectName: optionObjectName, selectorType: 'role', selectorValue: event.roleType || event.selectorValue, roleName: '{0}' },
      );
      pendingLabel = '';
      currentPage = nextPageForAction(ref, event.roleType === 'radio' ? 'check' : 'click', currentPage);
      continue;
    }

    // ---- Checkbox toggle: emit data-driven check + uncheck (do NOT drop) ----
    //
    // Unlike a blind radio (which re-asserts a choice and so is dropped), a
    // checkbox is a genuine per-iteration toggle — e.g. "Variable" swaps which
    // follow-up field is active. There is no single "set checkbox to <bool>"
    // keyword, so emit BOTH a check and an uncheck, each gated by SkipIf on a
    // column named after the checkbox: testdata cell "check" runs the check and
    // skips the uncheck; "uncheck" does the reverse; anything else skips both
    // (left at the app default). The recorded action seeds the column so a first
    // run has a defined direction. Binds to the checkbox's OWN accessible name,
    // never a stray pendingLabel.
    if ((targetAction === 'check' || targetAction === 'uncheck') && event.roleType !== 'radio') {
      // A .check()/.uncheck() that is NOT a radio: a genuine checkbox toggle located
      // by role, data-testid, OR a css locator. (Radios re-assert a choice and are
      // dropped as blind below.) The selector mirrors HOW codegen found it, so a
      // testid checkbox — Variable / includeAssurance — is no longer lost.
      const cbName = fieldId ?? (event.roleName || event.selectorValue || columnName);
      const cbColumn = labelToColumnName(cbName);
      const cbObject = objectNameFromRef(cbName, 'checkbox');
      const cbSelType = event.selectorType === 'role' ? 'role' : event.selectorType;
      const cbSelVal = event.selectorType === 'role' ? 'checkbox' : event.selectorValue;
      const cbSelRole = event.selectorType === 'role' ? event.roleName : '';
      addSelector({
        page: pageName,
        objectName: cbObject,
        selectorType: cbSelType,
        selectorValue: cbSelVal,
        roleName: cbSelRole,
        fieldType: 'checkbox',
        fallbackSelector: '',
        dynamic: false,
        description: 'checkbox from codegen',
        exact: event.exact,
      });
      registerDataValue(dataFile, cbColumn, event.action === 'uncheck' ? 'uncheck' : 'check');
      const cbToken = buildDataToken(dataFile, cbColumn);
      for (const act of ['check', 'uncheck']) {
        emitStep(
          {
            StepID: stepId,
            StepGroup: stepGroup,
            Page: pageName,
            Action: act,
            ObjectName: cbObject,
            InputValue: '',
            StoreAs: '',
            AssertType: '',
            ExpectedValue: '',
            WaitCondition: '',
            Timeout: 10000,
            Optional: 'FALSE',
            Retry: 0,
            Screenshot: 'always',
            SkipIf: `${cbToken}!=${act}`,
            Description: `${act} ${cbColumn} when testdata ${cbColumn}=${act} (SkipIf gates it per iteration)`,
          },
          { page: pageName, stepGroup, action: act, objectName: cbObject, selectorType: cbSelType, selectorValue: cbSelVal, roleName: cbSelRole },
        );
      }
      pendingLabel = '';
      currentPage = nextPageForAction(ref, 'check', currentPage);
      continue;
    }

    addSelector({
      page: pageName,
      objectName,
      selectorType: event.selectorType,
      selectorValue: event.selectorValue,
      roleName: event.roleName,
      fieldType,
      fallbackSelector: '',
      dynamic: false,
      description: `${fieldType} from codegen`,
      exact: event.exact,
    });

    if (targetAction === 'check') {
      // A radio reached here with NO label context, so there is no column to bind
      // it to. Emitting `check <literal radio>` with a blank InputValue is exactly
      // the bug that used to slip through: the step is not driven by the testdata,
      // so it fires on EVERY iteration and blindly re-asserts whatever the
      // recording clicked — silently overriding the data-driven choice made
      // earlier in the run. A superset recording toggles these constantly.
      //
      // Skip it and TELL the tester, rather than emit a step that cannot be
      // correct. The labelled interaction with the same control (recorded by
      // clicking its label) already produces a proper {0}-parameterised,
      // data-driven step.
      blindChoiceWarnings.push(
        `${pageName}: radio "${event.roleName || event.selectorValue}" was recorded without a label, so no data-driven step could be built for it. ` +
          `If this control matters, add a step with a \${data.*} token (and click its LABEL when recording).`,
      );
      pendingLabel = '';
      continue;
    }

    emitStep(
      {
        StepID: stepId,
        StepGroup: stepGroup,
        Page: pageName,
        Action: 'click',
        ObjectName: objectName,
        InputValue: '',
        StoreAs: '',
        AssertType: '',
        ExpectedValue: '',
        WaitCondition: '',
        Timeout: isOpener ? 10000 : 10000,
        Optional: 'FALSE',
        Retry: 0,
        Screenshot: 'never',
        SkipIf: '',
        Description: `${targetAction} ${columnName}`,
      },
      { page: pageName, stepGroup, action: 'click', objectName, selectorType: event.selectorType, selectorValue: event.selectorValue, roleName: event.roleName },
    );
    if (!keepLabelForChoice) pendingLabel = '';
    if (/Save & Compute/i.test(ref) || /Compute/i.test(ref)) {
      activeFlow = 'ExtractResults';
      currentPage = 'ResultsPage';
    }
    currentPage = nextPageForAction(ref, 'click', currentPage);
  }

  // ---- Result tail --------------------------------------------------------
  // A recording stops at the click that opens the result; the human then just
  // LOOKED at the numbers. Capture + compare is the entire point of the test,
  // so synthesise the tail — but only when the recording actually shows a
  // compute/result, never speculatively.
  if (sim || sawResultLink || steps.some((s) => /compute|simulate/i.test(String(s.Description ?? '')))) {
    addSelector({
      page: 'ResultsPage',
      objectName: 'lbl_RunStatus',
      selectorType: 'css',
      // role=gridcell, NOT a bare col-id: the header cell carries the same col-id
      // and .first() would match it, polling the literal word "Status" forever.
      selectorValue: 'div[role=gridcell][col-id=simStatus]',
      roleName: '',
      fieldType: 'unknown',
      fallbackSelector: '',
      dynamic: false,
      description: 'Run status cell. VERIFY col-id against your app and adjust',
      exact: false,
    });
    addStep({
      StepID: stepId,
      StepGroup: 'Simulate',
      Page: 'ResultsPage',
      Action: 'waitForSimulation',
      ObjectName: 'lbl_RunStatus',
      InputValue: '',
      StoreAs: '',
      AssertType: '',
      ExpectedValue: 'Completed',
      WaitCondition: '',
      Timeout: 120000,
      Optional: 'FALSE',
      Retry: 0,
      Screenshot: 'always',
      SkipIf: '',
      Description: 'Poll the run status until Completed before opening the result',
    });
    // Open the result — AFTER the status is Completed. Only when the recording
    // actually clicked a result link.
    if (sawResultLink) {
      addStep({
        StepID: stepId,
        StepGroup: 'ExtractResults',
        Page: 'ResultsPage',
        Action: 'click',
        ObjectName: 'lnk_ResultName',
        InputValue: buildDataToken(resultDataFile, RESULT_NAME_COLUMN),
        StoreAs: '',
        AssertType: '',
        ExpectedValue: '',
        WaitCondition: 'visible',
        Timeout: 180000,
        Optional: 'FALSE',
        Retry: 0,
        Screenshot: 'always',
        SkipIf: '',
        Description: 'Open the computed result by name (only appears once compute finishes)',
      });
    }
    addStep({
      StepID: stepId,
      StepGroup: 'ExtractResults',
      Page: 'ResultsPage',
      Action: 'callCustom',
      ObjectName: '',
      InputValue: 'extractAllResultTables',
      StoreAs: '',
      AssertType: '',
      ExpectedValue: '',
      WaitCondition: '',
      Timeout: 120000,
      Optional: 'FALSE',
      Retry: 0,
      Screenshot: 'always',
      SkipIf: '',
      Description: 'Capture EVERY table on the result page. Requires custom/<Feature>/customSteps.ts to export extractAllResultTables',
    });
    addStep({
      StepID: stepId,
      StepGroup: 'ExtractResults',
      Page: '-',
      Action: 'compareWithBaseline',
      ObjectName: '',
      InputValue: '',
      StoreAs: '',
      AssertType: '',
      ExpectedValue: '',
      WaitCondition: '',
      Timeout: 60000,
      Optional: 'FALSE',
      Retry: 0,
      Screenshot: 'never',
      SkipIf: '',
      Description: 'Compare captured cells against 06_baseline/<env>/. First run writes the baseline and reports BASELINE_CREATED (green but verifies nothing); every later run is a real PASS/FAIL',
    });
  }

  // ---- Null/Alternative (and similar) column-collision split ----
  //
  // A field's testdata column is derived from its LABEL. Some forms show the SAME
  // label under a "Null" and an "Alternative" section — "Hazard Ratio (Null)" and
  // "Hazard Ratio (Alternative)", "Ratio of Medians (Null/Alternative)", "Log Hazard
  // Ratio (Null/Alternative)". Stripping the parenthetical collapses both to one
  // column ("Hazard Ratio"), so two DISTINCT fields (#hazardRatio_Null_SS vs
  // #hazardRatio_Alt_SS) end up bound to the SAME token and always fill the same
  // value — the alternative-hypothesis input silently mirrors the null one.
  //
  // Give each colliding field its own column, keyed by its DOM id, which is unique
  // AND matches the app's real field id (so it lines up with an exported testdata
  // header like hazardRatio_Null_SS). Only fires when two or more DIFFERENT objects
  // share a column; a single object filled twice (a superset re-touch) is collapsed
  // later by the dedup pass and never reaches here as a collision. A field with no
  // usable id keeps its label column but gets a unique suffix from its object name,
  // so distinct fields are never merged. The id-columns it mints are recorded in
  // splitColumns so the reuse pass below won't prefix-collapse them back onto the
  // shorter label they replaced (e.g. hazardRatio_Null_SS -> "Hazard Ratio").
  const splitColumns = new Set<string>();
  {
    const selectorValueByKey = new Map<string, string>();
    for (const s of selectors) selectorValueByKey.set(`${s.page}|${s.objectName}`, s.selectorValue);
    const tokenRe = /\$\{data\.([^.}]+)\.([^}]+)\}/;
    // Group data-driven steps by (file, column). Duplicates (the superset re-touches
    // a field before the later dedup pass collapses them) are grouped by object so a
    // repeat never looks like a second distinct field.
    type ObjInfo = { id: string | undefined; isFill: boolean; steps: StepRow[] };
    const groups = new Map<string, { file: string; col: string; byObject: Map<string, ObjInfo> }>();
    for (const s of steps) {
      const m = tokenRe.exec(String(s.InputValue ?? ''));
      if (!m) continue;
      const [, file, col] = m;
      const key = `${file}|${col}`;
      const grp = groups.get(key) ?? { file: file ?? '', col: col ?? '', byObject: new Map<string, ObjInfo>() };
      const obj = String(s.ObjectName ?? '');
      const info =
        grp.byObject.get(obj) ??
        ({ id: extractFieldId(selectorValueByKey.get(`${String(s.Page ?? '')}|${obj}`) ?? ''), isFill: true, steps: [] } as ObjInfo);
      if (String(s.Action) !== 'fill') info.isFill = false;
      info.steps.push(s);
      grp.byObject.set(obj, info);
      groups.set(key, grp);
    }
    for (const { file, col, byObject } of groups.values()) {
      if (byObject.size < 2) continue; // one field (with repeats) — nothing to disambiguate
      const entries = [...byObject.values()];
      const ids = entries.map((e) => e.id);
      // Split ONLY a genuine set of distinct FILL fields that collapsed onto one
      // label column (Null/Alternative, NI/SP numeric inputs): every object must be a
      // fill with its own DOM id. This deliberately skips (a) a fill that shares its
      // column with a result LINK by design, and (b) redundant SELECT pairs that are
      // the same dropdown recorded two ways. Re-key each to its DOM id, which is
      // unique and matches the app's real field id / an exported testdata header.
      if (!entries.every((e) => e.isFill)) continue;
      if (!ids.every((id): id is string => !!id) || new Set(ids).size !== ids.length || ids.includes(col)) continue;
      for (const e of entries) {
        const newCol = e.id!;
        const oldToken = `\${data.${file}.${col}}`;
        const newToken = `\${data.${file}.${newCol}}`;
        for (const st of e.steps) st.InputValue = String(st.InputValue).split(oldToken).join(newToken);
        registerDataColumn(file, newCol);
        splitColumns.add(`${file}|${newCol}`);
        // Carry the one seeded value to the first field that claims a column; the rest
        // seed blank (their per-field recorded value was dropped at dedup) — blank is a
        // skip, never a wrong fill, and the tester supplies the real value.
        const seeded = dataValues.get(`${file}|${col}`);
        if (seeded && !dataValues.has(`${file}|${newCol}`)) dataValues.set(`${file}|${newCol}`, seeded);
      }
      dataColumns.get(file)?.delete(col);
      dataValues.delete(`${file}|${col}`);
    }
  }

  return { selectors, steps, dataColumns, dataValues, sawLogin, blindChoiceWarnings, splitColumns };
}

function buildFeatureConfig(feature: string, module: string): string {
  const cfg = {
    feature,
    module,
    // serial: true is REQUIRED because the app (East Horizon) allows only ONE
    // active session per user. Running iterations in parallel logs in twice with
    // the same credentials, and the app force-logs-out all but the newest session
    // ("another session started from a different location") — so parallel runs
    // fail with a spurious login/forced-logout. Serial runs iterations one at a
    // time, so each login stands alone. Do not flip to false for this app.
    serial: true,
    // false => the iteration logs in inline via the callReusable login step.
    reuseAuthState: false,
    testdata: {
      format: 'csv',
      files: { inputset: 'inputset.csv', project: 'project.csv', design: 'design.csv' },
      joinKey: ['TC_ID', 'IterationID'],
    },
    simulation: {
      pollObject: 'lbl_RunStatus',
      successText: 'Completed',
      failureText: 'Failed',
      pollIntervalMs: 5000,
      maxWaitMs: 900000,
    },
    resultsExtraction: {
      mode: 'domTable',
      domTableObject: 'tbl_Results',
      downloadTrigger: 'btn_ExportResults',
      outputFileName: 'results_${TC_ID}_${IterationID}.csv',
      columnMap: {},
      sortBy: [],
    },
    cleanup: { deleteCreatedProjects: true },
  };
  return `${JSON.stringify(cfg, null, 2)}\n`;
}

function main(): number {
  const parsed = parseArgs(process.argv.slice(2));
  if ('help' in parsed) {
    usage();
    return 0;
  }

  const moduleRoot = path.resolve(process.cwd(), parsed.args.module);
  const featureName = featureFolderName(parsed.args.feature);
  const targetRoot = path.join(moduleRoot, featureName);

  // Recordings live WITH the feature, in its 02_selectors_repo/ (alongside the
  // selectors they produce), not scattered in the repo root. An explicit path
  // still wins; otherwise auto-discover a recording there.
  const selectorsDir = path.join(targetRoot, '02_selectors_repo');
  let inputFile: string;
  if (parsed.args.inputFile) {
    inputFile = path.resolve(process.cwd(), parsed.args.inputFile);
    if (!fs.existsSync(inputFile)) {
      console.error(`Codegen file not found: ${inputFile}`);
      return 1;
    }
  } else {
    const found = findRecording(selectorsDir, parsed.args.sim);
    if (!found) {
      const want = parsed.args.sim ? 'sim_recording.ts' : 'recording.ts';
      console.error(
        [
          `No ${parsed.args.sim ? 'SIM ' : ''}recording given and none found in ${path.relative(process.cwd(), selectorsDir)}/.`,
          `Record one with:  npm run codegen`,
          `then save it as   ${path.relative(process.cwd(), path.join(selectorsDir, want))}`,
          `or pass an explicit path:  npm run import-codegen -- ${parsed.args.module} ${parsed.args.feature} <${want}>${parsed.args.sim ? ' --sim' : ''}`,
        ].join('\n'),
      );
      return 1;
    }
    inputFile = found;
    console.log(`Using ${parsed.args.sim ? 'SIM ' : ''}recording: ${path.relative(process.cwd(), inputFile)}`);
  }
  // Scaffold on demand: the tester should only need testdata + a recording, so
  // a missing feature folder is created rather than being a hard stop.
  for (const dir of ['00_config', '01_testdata', '02_selectors_repo', '03_metadata', '04_generated_pom', '05_generated_scripts', '06_baseline', '07_actual_results', '08_diffs', '09_html_report']) {
    ensureDir(path.join(targetRoot, dir));
  }
  const compareConfigPath = path.join(targetRoot, '06_baseline', 'compare.config.csv');

  const lines = readLines(inputFile);
  const isSim = parsed.args.sim === true;
  const { selectors, steps, dataColumns, dataValues, sawLogin, blindChoiceWarnings, splitColumns } = parseCodegen(lines, { sim: isSim });
  // Sim testdata lives in one file (simulation.csv); design splits across three.
  const dataFilesForReuse = isSim ? ['simulation'] : ['inputset', 'project', 'design'];

  // Reuse the tester's existing testdata columns instead of adding parallel
  // duplicates. The tester owns the testdata; when a recorded field's derived
  // name matches a column that already exists (comparing on letters+digits only,
  // so "Test Type" == "TestType" == "test_type"), rewrite the generated metadata
  // token to reference the tester's column and DROP the derived one — the run
  // then reads the tester's value and no duplicate column is created. Only a
  // field with no existing column is still seeded (below). First existing
  // occurrence wins, so a tester's canonical column beats a stale importer
  // duplicate from a prior import.
  const reuseLog: string[] = [];
  const normalizeColName = (s: string): string => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  for (const file of dataFilesForReuse) {
    const cols = dataColumns.get(file);
    if (!cols) continue;
    const { header } = readCsvGrid(path.join(targetRoot, '01_testdata', `${file}.csv`));
    const existingByNorm = new Map<string, string>();
    for (const h of header) {
      const n = normalizeColName(h);
      if (n && !existingByNorm.has(n)) existingByNorm.set(n, h);
    }
    for (const derived of [...cols]) {
      if (derived === 'TC_ID' || derived === 'IterationID') continue;
      const derivedNorm = normalizeColName(derived);
      let existing = existingByNorm.get(derivedNorm);

      // Codegen TRUNCATES long accessible names, so the recorded field arrives as a
      // PREFIX of the tester's column: "Sample Size" for "Sample Size (n)",
      // "Coefficient of Variation of" for "Coefficient of Variation of Data",
      // "Noninferiority Margin (p0 = u" for "Noninferiority Margin". Exact matching
      // missed these and seeded a parallel column, so the run silently read the
      // recorded value instead of the tester's. Fall back to a prefix match, but
      // only when it is UNAMBIGUOUS — two candidates mean we cannot know which the
      // tester meant, and guessing wrong is worse than seeding a new column.
      //
      // Dotted table-cell ids (e.g. "enrollmentTable.0.avgSubjectsEnrolled") are the
      // ONE exception: codegen never truncates them, so they must reuse only on an
      // EXACT normalized match (which a testdata header authored as the same dotted
      // id satisfies). Excluding dotted names from BOTH sides of the prefix match
      // stops a short human column ("Enrollment") from being wrongly bound to a table
      // cell just because it is a string prefix of the id — and vice versa. A dotted
      // id with no exact match simply seeds its own column, as the table-cell
      // convention intends. A column minted by the Null/Alternative split is the same
      // case: it IS the app's DOM id (hazardRatio_Null_SS), so exact-match only — a
      // prefix hit would re-collapse it onto the shorter label it just replaced.
      if (!existing && derivedNorm.length >= 4 && !derived.includes('.') && !splitColumns.has(`${file}|${derived}`)) {
        const prefixHits = [...existingByNorm.entries()].filter(
          ([norm, col]) =>
            norm !== derivedNorm && !col.includes('.') && (norm.startsWith(derivedNorm) || derivedNorm.startsWith(norm)),
        );
        if (prefixHits.length === 1) existing = prefixHits[0]?.[1];
      }

      if (!existing || existing === derived) continue;
      const from = buildDataToken(file, derived);
      const to = buildDataToken(file, existing);
      for (const step of steps) {
        if (typeof step.InputValue === 'string' && step.InputValue.includes(from)) {
          step.InputValue = step.InputValue.split(from).join(to);
        }
      }
      cols.delete(derived);
      dataValues.delete(`${file}|${derived}`);
      reuseLog.push(`${file}.csv: reused existing column "${existing}" for recorded field "${derived}"`);
    }
  }

  // Superset-recording dedup. A superset recording toggles the controlling
  // dropdowns/radios (e.g. Input Method 1->2->1, Hypothesis 2->1, Computed
  // Parameter several times) to reveal every conditional field, which emits the
  // SAME value-entering action on the SAME object more than once. Collapse to the
  // FIRST occurrence: the step is data-driven (${data.*}), so the recorded value
  // is irrelevant — the testdata decides it at runtime. Only select/check/fill are
  // deduped (a click may legitimately repeat). A single-path recording has no such
  // duplicates, so this is a NO-OP there and never alters an existing feature.
  {
    const seenValueStep = new Set<string>();
    const deduped: StepRow[] = [];
    let dropped = 0;
    for (const step of steps) {
      const action = String(step.Action ?? '');
      if (action === 'select' || action === 'check' || action === 'fill') {
        const key = `${step.Page}|${step.ObjectName}|${action}`;
        if (seenValueStep.has(key)) {
          dropped++;
          continue;
        }
        seenValueStep.add(key);
      }
      deduped.push(step);
    }
    if (dropped) {
      // Close the gaps the removals leave: Seq 1..N, StepID 10,20,30…
      deduped.forEach((step, i) => {
        step.Seq = i + 1;
        step.StepID = (i + 1) * 10;
      });
      steps.length = 0;
      steps.push(...deduped);
      console.log(`  Collapsed ${dropped} duplicate control/field step(s) from the superset recording.`);
    }
  }

  // compare.config: write/repair only when this import emits the extractAllResultTables
  // tail, because THAT fixes the output schema. Create it if missing; overwrite it
  // if an existing one is incompatible (lacks the TableName/RowLabel/ColumnName/Value
  // fingerprint) — a stale, differently-shaped config would SCHEMA_MISMATCH forever.
  // A config that already has the right columns is left alone so tester tolerances survive.
  const emitsResultTail = steps.some((s) => String(s.InputValue ?? '') === 'extractAllResultTables');
  if (emitsResultTail) {
    const existing = readCsvGrid(compareConfigPath);
    const hasGenericCols = GENERIC_COMPARE_COLUMNS.every((c) => existing.rows.some((r) => (r.ColumnName ?? '').trim() === c));
    if (!existing.header.length || !hasGenericCols) {
      fs.writeFileSync(compareConfigPath, GENERIC_COMPARE_CONFIG, 'utf8');
    }
  }

  const selectorPath = path.join(targetRoot, '02_selectors_repo', 'selectors.csv');
  // Sim steps land in sim_metadata.csv, beside the design metadata.csv.
  const metadataPath = path.join(targetRoot, '03_metadata', isSim ? 'sim_metadata.csv' : 'metadata.csv');
  const featureConfigPath = path.join(targetRoot, '00_config', 'feature.config.json');

  const existingSelectors = readSelectorRows(selectorPath);
  const mergedSelectors = mergeSelectorRows(existingSelectors, selectors);
  const selectorCsv = `${SELECTOR_HEADER}\n${mergedSelectors.map(selectorRowToCsv).join('\n')}${mergedSelectors.length ? '\n' : ''}`;
  const metadataCsv = `${STEP_HEADER}\n${steps.map(stepRowToCsv).join('\n')}${steps.length ? '\n' : ''}`;

  fs.writeFileSync(selectorPath, selectorCsv, 'utf8');
  fs.writeFileSync(metadataPath, metadataCsv, 'utf8');

  // Additive guard (prints only — never edits a generated file): an UNGATED
  // Add-Period / Add-Interim click adds a blank, unfilled row that invalidates the
  // design so it will not compute. Flag every click whose selector is a
  // role=button "Add Period"/"Add Interim" yet carries no SkipIf, so the agent gates
  // it on the new period's data column. The recording can also MIS-NAME such a
  // button (captured role="Add Period", named after a nearby label) — hence we key
  // off the selector's role, not the ObjectName. See AI_IMPORT_AGENT.md §7 / KT Trap 23.
  const selectorByName = new Map(mergedSelectors.map((s) => [s.objectName, s]));
  const ungatedAddClicks = steps.filter((st) => {
    if (String(st.Action) !== 'click' || String(st.SkipIf ?? '').trim()) return false;
    const sel = selectorByName.get(String(st.ObjectName));
    return !!sel && sel.selectorType === 'role' && /^add\s+(period|interim)$/i.test((sel.roleName ?? '').trim());
  });
  if (ungatedAddClicks.length) {
    console.log(
      `  WARNING: ${ungatedAddClicks.length} ungated Add-Period/Add-Interim click(s). Gate each with ` +
        `SkipIf on the new period's data column, or it adds a blank row (AI_IMPORT_AGENT.md §7):`,
    );
    for (const st of ungatedAddClicks) {
      const sel = selectorByName.get(String(st.ObjectName));
      console.log(`    StepID ${st.StepID}  ObjectName "${st.ObjectName}"  (selector: role=button "${sel?.roleName ?? ''}")`);
    }
  }
  // The sim import shares the design feature.config.json — never clobber it (that
  // would reset serial/reuseAuthState the design import already tuned).
  if (!isSim) {
    fs.writeFileSync(featureConfigPath, buildFeatureConfig(parsed.args.feature.replace(/^feature_/, ''), parsed.args.module), 'utf8');
  }

  // Testdata columns are MERGED with the metadata, never left to drift.
  //
  // Each feature has its own fields, so a re-import (or a first import over a
  // pre-existing testdata file) can introduce columns the old testdata lacks.
  // Skipping the file then leaves metadata referencing ${data.x.Y} for a column
  // that does not exist -> a validation failure. So instead: keep every existing
  // column and value the tester authored, and ADD any metadata-referenced column
  // that is missing (seeding its recorded value into that column for every row).
  // Existing columns/values always win; nothing the tester typed is overwritten.
  const tcId = parsed.args.tcId ?? 'TC_01';
  const writtenData: string[] = [];
  for (const file of dataFilesForReuse) {
    const needed = [...(dataColumns.get(file) ?? new Set<string>())].filter((c) => c && c !== 'TC_ID' && c !== 'IterationID');
    const dataPath = path.join(targetRoot, '01_testdata', `${file}.csv`);
    const { header: existingHeader, rows: existingRows } = readCsvGrid(dataPath);

    // Union: TC_ID, IterationID, existing columns (order preserved), then any new
    // metadata columns the testdata does not yet have.
    const base = existingHeader.length ? existingHeader : ['TC_ID', 'IterationID'];
    const finalCols = [...base];
    for (const c of ['TC_ID', 'IterationID']) if (!finalCols.includes(c)) finalCols.unshift(c);
    const added = needed.filter((c) => !finalCols.includes(c));
    finalCols.push(...added);

    const seedFor = (col: string): string =>
      col === 'TC_ID' ? tcId : col === 'IterationID' ? 'ITER_01' : dataValues.get(`${file}|${col}`) ?? '';

    // Preserve every existing column and value; seed the recorded value into the
    // newly-ADDED columns for EVERY row (a brand-new column has no per-row value
    // to preserve, and each TC row must resolve its ${data.x.Y} tokens — seeding
    // only row 0 left TC_02 with blank projectName/Start Date and a failing run).
    const addedSet = new Set(added);
    const outRows = existingRows.length
      ? existingRows.map((r) =>
          finalCols.map((c) => {
            if (addedSet.has(c)) return seedFor(c);
            const existing = r[c] ?? '';
            // Backfill blank identity cells. A row must be findable by TC_ID +
            // IterationID or the runner fails at runtime with "No testdata row"
            // — and validate cannot catch it (the column exists, only the value
            // is missing). Older/partial testdata often left these blank; every
            // real value the tester typed is still preserved.
            if (!existing.trim() && (c === 'TC_ID' || c === 'IterationID')) return seedFor(c);
            return existing;
          }),
        )
      : [finalCols.map(seedFor)];

    // "In sync" = header present and no new columns. Still rewrite if any row has
    // a blank TC_ID/IterationID to backfill, else the run fails with "No testdata row".
    const hasBlankIdentity = existingRows.some(
      (r) => !(r['TC_ID'] ?? '').trim() || !(r['IterationID'] ?? '').trim(),
    );
    if (existingHeader.length && added.length === 0 && !hasBlankIdentity) continue; // already in sync, leave untouched
    const csv = [finalCols.join(','), ...outRows.map((r) => r.map((v) => csvEscape(String(v))).join(','))].join('\n');
    fs.writeFileSync(dataPath, `${csv}\n`, 'utf8');
    if (added.length) writtenData.push(`${file}.csv (+${added.length} column(s): ${added.join(', ')})`);
    else if (!existingHeader.length) writtenData.push(`${file}.csv (${needed.length} column(s) seeded from the recording)`);
    else if (hasBlankIdentity) writtenData.push(`${file}.csv (backfilled blank TC_ID/IterationID)`);
  }

  const rel = path.join(parsed.args.module, featureName);
  const metadataRel = isSim ? '03_metadata/sim_metadata.csv' : '03_metadata/metadata.csv';
  console.log(`Imported ${isSim ? 'SIM ' : ''}codegen -> ${rel}`);
  console.log(`  ${steps.length} step(s) -> ${metadataRel}`);
  console.log(`  ${mergedSelectors.length} selector(s) -> 02_selectors_repo/selectors.csv (shared)`);
  for (const r of reuseLog) console.log(`  ${r}`);
  for (const d of writtenData) console.log(`  ${d}`);
  console.log('');
  if (blindChoiceWarnings.length) {
    console.log(`SKIPPED ${blindChoiceWarnings.length} radio interaction(s) that could NOT be data-driven:`);
    for (const w of blindChoiceWarnings) console.log(`  ! ${w}`);
    console.log('');
  }
  console.log('NEXT STEPS (the importer cannot infer these):');
  if (isSim) {
    console.log('  - The sim flow starts on the results page (no login/navigate). Its FIRST step should be the Simulate click — confirm it is.');
    console.log('  - Turn Simulation ON for this test case in master.csv: set the Simulation column to YES.');
    console.log('    Sim then chains automatically after a GREEN design run — same browser, same iteration.');
    console.log('  - Review 01_testdata/simulation.csv: values are seeded from the sim recording; N/A a field that is hidden for an iteration.');
    console.log('  - sim_metadata is a SUPERSET recording — consolidate it (one data-driven step per control, controls before dependents) exactly like design.');
    console.log(`  - Then:  npm run validate   &&   npm run test -- --testcase ${parsed.args.tcId ?? '<TC_ID>'}`);
    return 0;
  }
  if (sawLogin) console.log('  - Login was recorded and replaced with callReusable flows/login.csv. Confirm flows/login.csv matches your IdP.');
  console.log(`  - Add a master.csv row:  ${parsed.args.tcId ?? '<TC_ID>'},${parsed.args.module},regression,,${parsed.args.feature.replace(/^feature_/, '')},,chromium,01_testdata/inputset.csv,03_metadata/metadata.csv,TRUE,AD`);
  console.log('  - Review 01_testdata/*.csv: seeded values come from the recording; make names unique with ${runId} if the app rejects duplicates.');
  console.log('  - Date pickers cannot be filled — the import clicks the recorded day cell, which is pinned to the recorded month. Data-drive it if the date must move.');
  console.log('  - If a result tail was emitted, export extractAllResultTables from custom/<Feature>/customSteps.ts and verify lbl_RunStatus col-id.');
  console.log('  - Has a Simulation flow? Record it from the results page, save as sim_recording.txt, then:  npm run import-codegen -- ' + parsed.args.module + ' ' + parsed.args.feature + ' --tc ' + (parsed.args.tcId ?? '<TC_ID>') + ' --sim');
  console.log(`  - Then:  npm run validate   &&   npm run test -- --testcase ${parsed.args.tcId ?? '<TC_ID>'}`);
  return 0;
}

process.exit(main());