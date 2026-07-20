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
  inputFile: string;
  page?: string;
  /** TC_ID to seed testdata rows with, and to print in the master.csv hint. */
  tcId?: string;
};

type ParsedArgs =
  | { help: true }
  | {
      args: ArgSet;
    };

type ControlKind = 'button' | 'textbox' | 'radio button' | 'checkbox' | 'dropdown' | 'link' | 'option' | 'date picker' | 'unknown';

type ParsedEvent = {
  lineNo: number;
  kind: 'goto' | 'role' | 'label' | 'text' | 'locator';
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

/** The app cold-starts slowly and never goes network-idle, so readiness is polled, never slept on. */
const READINESS_TIMEOUT_MS = 220000;
const LOGIN_FLOW = 'flows/login.csv';

function usage(): void {
  console.log([
    'Usage: npm run import-codegen -- <Module> <Feature> <recording.ts|txt> [--tc TC_05] [--page LoginPage]',
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
    '',
    'Example:',
    '  npm run import-codegen -- ProductDesign ROM(PD) recording.ts --tc TC_05',
  ].join('\n'));
}

function parseArgs(argv: string[]): ParsedArgs {
  const positionals: string[] = [];
  let page: string | undefined;
  let tcId: string | undefined;
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '-h' || arg === '--help') return { help: true };
    if (arg === undefined) continue;
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
  if (!module || !feature || !inputFile) return { help: true };
  return { args: { module, feature, inputFile, page, tcId } };
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
  const merged = new Map<string, LocatorRef>();
  for (const row of existingRows) merged.set(row.objectName, row);
  for (const row of generatedRows) merged.set(row.objectName, row);
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

function dataFileFor(pageName: string, stepGroup: string): string {
  if (pageName === 'ProjectPage' || stepGroup === 'CreateProject' || stepGroup === 'OpenProject') return 'project';
  if (pageName === 'DesignPage' || stepGroup === 'ConfigureDesign' || stepGroup === 'Simulate' || stepGroup === 'ExtractResults') return 'design';
  if (pageName === 'InputSetPage' || stepGroup === 'CreateInputSet') return 'inputset';
  return 'inputset';
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

function isTextboxLike(event: ParsedEvent): boolean {
  return event.roleType === 'textbox' || event.selectorValue.includes('input') || event.selectorValue.startsWith('#');
}

function isDropdownOpener(event: ParsedEvent): boolean {
  if (event.action !== 'click') return false;
  if (event.roleType === 'button' || event.roleType === 'combobox') return true;
  return /select|dropdown|creatable/i.test(`${event.selectorValue} ${event.roleName} ${event.ref}`);
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
  if (event.roleType === 'option') return true;
  return event.kind === 'text' && event.exact;
}

function isResultNameField(event: ParsedEvent): boolean {
  return /#inputid$/i.test(event.selectorValue) || /inputid/i.test(event.ref) || /result name/i.test(event.ref) || /result name/i.test(event.selectorValue);
}

function isResultLink(event: ParsedEvent): boolean {
  return event.action === 'click' && event.roleType === 'link' && /result/i.test(event.roleName);
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
  const roleCall = /getByRole\((['"])(.*?)\1,\s*\{\s*name:\s*(['"])(.*?)\3(\s*,\s*exact:\s*true)?\s*\}\)(?:\.(click|fill|check|selectOption))?\((.*?)\);?$/.exec(trimmed);
  if (roleCall) {
    return {
      lineNo,
      kind: 'role',
      selectorType: 'role',
      selectorValue: roleCall[2] ?? '',
      roleType: roleCall[2] ?? '',
      roleName: roleCall[4] ?? '',
      action: roleCall[6] ?? 'click',
      args: roleCall[7] ?? '',
      ref: roleCall[4] ?? roleCall[2] ?? '',
      raw: trimmed,
      exact: Boolean(roleCall[5]),
    };
  }

  // The `(\s*,\s*\{[^}]*\})?` tail is REQUIRED, not cosmetic: codegen routinely
  // emits `getByLabel('X', { exact: true })`, and without it the line matches
  // nothing and the step is silently dropped from the import.
  const labelCall = /getByLabel\((['"])(.*?)\1(\s*,\s*\{[^}]*\})?\)(?:\.(click|fill|check|selectOption))?\((.*?)\);?$/.exec(trimmed);
  if (labelCall) {
    return {
      lineNo,
      kind: 'label',
      selectorType: 'label',
      selectorValue: labelCall[2] ?? '',
      exact: /exact:\s*true/.test(labelCall[3] ?? ''),
      roleType: '',
      roleName: '',
      action: labelCall[4] ?? 'click',
      args: labelCall[5] ?? '',
      ref: labelCall[2] ?? '',
      raw: trimmed,
    };
  }

  const textCall = /getByText\((['"])(.*?)\1(\s*,\s*\{[^}]*\})?\)(?:\.(click|fill|check|selectOption))?\((.*?)\);?$/.exec(trimmed);
  if (textCall) {
    return {
      lineNo,
      kind: 'text',
      selectorType: 'text',
      selectorValue: textCall[2] ?? '',
      exact: /exact:\s*true/.test(textCall[3] ?? ''),
      roleType: '',
      roleName: '',
      action: textCall[4] ?? 'click',
      args: textCall[5] ?? '',
      ref: textCall[2] ?? '',
      raw: trimmed,
    };
  }

  const locatorCall = /locator\((['"])(.*?)\1\)(?:\.(click|fill|check|selectOption|select\w*))?\((.*?)\);?$/.exec(trimmed);
  if (locatorCall) {
    const selectorValue = locatorCall[2] ?? '';
    return {
      lineNo,
      kind: 'locator',
      selectorType: selectorValue.startsWith('#') || selectorValue.startsWith('.') || selectorValue.startsWith('[') ? 'css' : 'xpath',
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

/** Codegen args arrive as source text (`'Week'`); unwrap to the literal value. */
function stripQuotes(value: string): string {
  const trimmed = (value ?? '').trim();
  const match = /^(['"`])([\s\S]*)\1$/.exec(trimmed);
  return match ? (match[2] ?? '') : trimmed;
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

function parseCodegen(lines: string[]): {
  selectors: LocatorRef[];
  steps: StepRow[];
  dataColumns: Map<string, Set<string>>;
  /** "<file>|<Column>" -> the value actually recorded, used to seed testdata so the first run is runnable. */
  dataValues: Map<string, string>;
  sawLogin: boolean;
} {
  const selectors: LocatorRef[] = [];
  const seenSelectors = new Set<string>();
  const steps: StepRow[] = [];
  const dataColumns = new Map<string, Set<string>>();
  const dataValues = new Map<string, string>();
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

  // Login is decided up front so the callReusable step lands FIRST, before any
  // navigate. flows/login.csv does its own goto, so a recorded pre-login landing
  // navigate is redundant and is skipped below.
  const isIdpUrl = (url: string): boolean => /okta|login|signin|sign-in|auth0|microsoftonline/i.test(url);
  const sawLogin = events.some((e) => e.kind === 'goto' && isIdpUrl(e.args));

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
  }

  for (let index = 0; index < events.length; index++) {
    const event = events[index];
    if (!event) continue;
    const nextEvent = events[index + 1];

    if (event.kind === 'goto') {
      const url = event.args;
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
      pendingLabel = labelToColumnName(event.ref);
      continue;
    }

    if (inLogin) {
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
    const dataFile = dataFileFor(pageName, stepGroup);
    const isResultName = isResultNameField(event);
    const columnName = isResultName ? RESULT_NAME_COLUMN : deriveColumnName(event, pendingLabel, event.ref);
    const targetAction = event.action || 'click';
    const ref = pendingLabel || event.ref || event.selectorValue;
    const fieldType = isResultName ? 'textbox' : inferControlKind(ref, event.selectorType, event.roleName, event.roleType);
    const objectName = isResultName ? 'txt_ResultName' : objectNameFromRef(ref || event.roleName || event.selectorValue, fieldType);
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
    if (event.action === 'click' && nextEvent && isOptionChoice(nextEvent) && !isResultLink(nextEvent)) {
      const optionText = nextEvent.roleName || nextEvent.selectorValue || nextEvent.ref;
      // A text/label opener carries the real field label, so strip straight from
      // it: labelToColumnName turns "Phase (Optional)" into "Phase". Going via
      // columnName would not — deriveColumnName normalises punctuation away
      // FIRST, leaving "Phase Optional" with no parens left to strip.
      // For a css opener there is no label, so fall back to the normalised ref
      // ('#type-0' -> 'type 0'); the tester renames it to a business name.
      const ddlColumn = event.kind === 'text' || event.kind === 'label'
        ? labelToColumnName(event.selectorValue)
        : columnName;
      // ObjectName drops the "(Optional)" suffix (ddl_Phase, not
      // ddl_Phase_Optional) while SelectorValue below keeps the raw text, which
      // is what actually has to match the label in the DOM.
      const ddlObject = objectNameFromRef(ddlColumn || event.roleName || event.selectorValue, 'dropdown');
      // A text-click opener becomes a `label` selector, not `text`: the select
      // keyword special-cases SelectorType==='label' and walks from the label to
      // the adjacent interactive control. A raw `text` selector would click the
      // label element itself, which does not open the menu.
      const ddlType = event.kind === 'text' ? 'label' : event.selectorType;
      addSelector({
        page: pageName,
        objectName: ddlObject,
        selectorType: ddlType,
        selectorValue: event.selectorValue,
        roleName: event.roleName,
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
        { page: pageName, stepGroup, action: 'select', objectName: ddlObject, selectorType: ddlType, selectorValue: event.selectorValue, roleName: event.roleName },
      );
      pendingLabel = '';
      index++; // consume the option click; it is part of this select step
      currentPage = nextPageForAction(ref, 'select', currentPage);
      continue;
    }

    // MUST precede the textbox branch: isTextboxLike() matches anything whose
    // selector starts with '#', so a native <select> recorded as
    // locator('#testtype').selectOption(...) would otherwise be imported as a
    // `fill` and never reach this branch at all.
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

    if (event.action === 'fill' || (event.kind === 'role' && event.roleType === 'textbox') || isTextboxLike(event)) {
      const nextIsFillOnSameTarget = nextEvent && nextEvent.action === 'fill' && nextEvent.selectorType === event.selectorType && nextEvent.selectorValue === event.selectorValue;
      if (nextIsFillOnSameTarget && event.action === 'click') {
        // A click that only focuses a field the next event fills — drop it.
        continue;
      }
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
      emitStep(
        {
          StepID: stepId,
          StepGroup: stepGroup,
          Page: pageName,
          Action: 'fill',
          ObjectName: objectName,
          InputValue: buildDataToken(dataFile, columnName),
          StoreAs: '',
          AssertType: '',
          ExpectedValue: '',
          WaitCondition: '',
          Timeout: 10000,
          Optional: 'FALSE',
          Retry: 0,
          Screenshot: 'never',
          SkipIf: '',
          Description: `fill ${columnName}`,
        },
        { page: pageName, stepGroup, action: 'fill', objectName, selectorType: event.selectorType, selectorValue: event.selectorValue, roleName: event.roleName },
      );
      pendingLabel = '';
      currentPage = nextPageForAction(ref, 'fill', currentPage);
      continue;
    }

    if (isResultLink(event)) {
      addSelector({
        page: pageName,
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
        exact: true,
      });
      registerDataColumn(dataFile, RESULT_NAME_COLUMN);
      emitStep(
        {
          StepID: stepId,
          StepGroup: stepGroup,
          Page: pageName,
          Action: 'click',
          ObjectName: 'lnk_ResultName',
          InputValue: buildDataToken(dataFile, RESULT_NAME_COLUMN),
          StoreAs: '',
          AssertType: '',
          ExpectedValue: '',
          WaitCondition: 'visible',
          Timeout: 10000,
          Optional: 'FALSE',
          Retry: 0,
          Screenshot: 'never',
          SkipIf: '',
          Description: 'open result by name',
        },
        { page: pageName, stepGroup, action: 'click', objectName: 'lnk_ResultName', selectorType: 'role', selectorValue: 'link', roleName: '{0}' },
      );
      pendingLabel = '';
      currentPage = nextPageForAction(ref, 'click', currentPage);
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
        description: 'choice from codegen',
        exact: true,
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
      emitStep(
        {
          StepID: stepId,
          StepGroup: stepGroup,
          Page: pageName,
          Action: 'check',
          ObjectName: objectName,
          InputValue: '',
          StoreAs: '',
          AssertType: '',
          ExpectedValue: '',
          WaitCondition: '',
          Timeout: 10000,
          Optional: 'FALSE',
          Retry: 0,
          Screenshot: 'never',
          SkipIf: '',
          Description: `check ${columnName}`,
        },
        { page: pageName, stepGroup, action: 'check', objectName, selectorType: event.selectorType, selectorValue: event.selectorValue, roleName: event.roleName },
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
  if (steps.some((s) => /compute|simulate/i.test(String(s.Description ?? '')) || String(s.ObjectName ?? '') === 'lnk_ResultName')) {
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

  return { selectors, steps, dataColumns, dataValues, sawLogin };
}

function buildFeatureConfig(feature: string, module: string): string {
  const cfg = {
    feature,
    module,
    serial: false,
    // false => one browser: the iteration logs in inline via the callReusable
    // login step. true spins up a SEPARATE browser to save storageState, closes
    // it, then reopens — which for a single iteration saves nothing and shows
    // two windows. Flip to true only when running many iterations across workers.
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
  const inputFile = path.resolve(process.cwd(), parsed.args.inputFile);

  if (!fs.existsSync(inputFile)) {
    console.error(`Codegen file not found: ${inputFile}`);
    return 1;
  }
  // Scaffold on demand: the tester should only need testdata + a recording, so
  // a missing feature folder is created rather than being a hard stop.
  for (const dir of ['00_config', '01_testdata', '02_selectors_repo', '03_metadata', '04_generated_pom', '05_generated_scripts', '06_baseline', '07_actual_results', '08_diffs', '09_html_report']) {
    ensureDir(path.join(targetRoot, dir));
  }
  const compareConfigPath = path.join(targetRoot, '06_baseline', 'compare.config.csv');
  if (!fs.existsSync(compareConfigPath)) {
    fs.writeFileSync(
      compareConfigPath,
      ['ColumnName,IsKey,Compare,DataType,AbsTolerance,RelTolerance,RoundTo,Normalize,Notes',
        'TableName,TRUE,FALSE,string,,,,trim,Row identity',
        'RowLabel,TRUE,FALSE,string,,,,trim,Row identity',
        'ColumnName,TRUE,FALSE,string,,,,trim,Row identity',
        'Value,FALSE,TRUE,string,,,,trim,The compared cell',
        'RunID,FALSE,FALSE,string,,,,,Volatile',
        'Timestamp,FALSE,FALSE,string,,,,,Volatile',
        'ProjectID,FALSE,FALSE,string,,,,,Volatile',
        ''].join('\n'),
      'utf8',
    );
  }

  const lines = readLines(inputFile);
  const { selectors, steps, dataColumns, dataValues, sawLogin } = parseCodegen(lines);

  const selectorPath = path.join(targetRoot, '02_selectors_repo', 'selectors.csv');
  const metadataPath = path.join(targetRoot, '03_metadata', 'metadata.csv');
  const featureConfigPath = path.join(targetRoot, '00_config', 'feature.config.json');

  const existingSelectors = readSelectorRows(selectorPath);
  const mergedSelectors = mergeSelectorRows(existingSelectors, selectors);
  const selectorCsv = `${SELECTOR_HEADER}\n${mergedSelectors.map(selectorRowToCsv).join('\n')}${mergedSelectors.length ? '\n' : ''}`;
  const metadataCsv = `${STEP_HEADER}\n${steps.map(stepRowToCsv).join('\n')}${steps.length ? '\n' : ''}`;

  fs.writeFileSync(selectorPath, selectorCsv, 'utf8');
  fs.writeFileSync(metadataPath, metadataCsv, 'utf8');
  fs.writeFileSync(featureConfigPath, buildFeatureConfig(parsed.args.feature.replace(/^feature_/, ''), parsed.args.module), 'utf8');

  // Testdata is seeded with the values the recording actually used, so the
  // import is runnable as-is instead of being an empty header the tester must
  // decode. Never overwrite a file that already has data — the tester's own
  // testdata always wins.
  const tcId = parsed.args.tcId ?? 'TC_01';
  const writtenData: string[] = [];
  for (const file of ['inputset', 'project', 'design']) {
    const cols = [...(dataColumns.get(file) ?? new Set<string>())].filter((c) => c && c !== 'TC_ID' && c !== 'IterationID');
    const dataPath = path.join(targetRoot, '01_testdata', `${file}.csv`);
    const existing = fs.existsSync(dataPath) ? fs.readFileSync(dataPath, 'utf8').trim() : '';
    if (existing !== '' && existing.split(/\r?\n/).length > 1) continue; // tester already has data
    const header = ['TC_ID', 'IterationID', ...cols].join(',');
    const row = [tcId, 'ITER_01', ...cols.map((c) => dataValues.get(`${file}|${c}`) ?? '')].map((v) => csvEscape(String(v))).join(',');
    fs.writeFileSync(dataPath, cols.length ? `${header}\n${row}\n` : `${header}\n`, 'utf8');
    if (cols.length) writtenData.push(`${file}.csv (${cols.length} column(s) seeded from the recording)`);
  }

  const rel = path.join(parsed.args.module, featureName);
  console.log(`Imported codegen -> ${rel}`);
  console.log(`  ${steps.length} step(s) -> 03_metadata/metadata.csv`);
  console.log(`  ${mergedSelectors.length} selector(s) -> 02_selectors_repo/selectors.csv`);
  for (const d of writtenData) console.log(`  ${d}`);
  console.log('');
  console.log('NEXT STEPS (the importer cannot infer these):');
  if (sawLogin) console.log('  - Login was recorded and replaced with callReusable flows/login.csv. Confirm flows/login.csv matches your IdP.');
  console.log(`  - Add a master.csv row:  ${parsed.args.tcId ?? '<TC_ID>'},${parsed.args.module},regression,,${parsed.args.feature.replace(/^feature_/, '')},,chromium,01_testdata/inputset.csv,03_metadata/metadata.csv,TRUE,AD`);
  console.log('  - Review 01_testdata/*.csv: seeded values come from the recording; make names unique with ${runId} if the app rejects duplicates.');
  console.log('  - Date pickers cannot be filled — the import clicks the recorded day cell, which is pinned to the recorded month. Data-drive it if the date must move.');
  console.log('  - If a result tail was emitted, export extractAllResultTables from custom/<Feature>/customSteps.ts and verify lbl_RunStatus col-id.');
  console.log(`  - Then:  npm run validate   &&   npm run test -- --testcase ${parsed.args.tcId ?? '<TC_ID>'}`);
  return 0;
}

process.exit(main());