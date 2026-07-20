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
};

type StepRow = Record<string, string | number | boolean>;

const STEP_HEADER = 'StepID,StepGroup,Page,Action,ObjectName,InputValue,StoreAs,AssertType,ExpectedValue,WaitCondition,Timeout,Optional,Retry,Screenshot,SkipIf,Description';
const SELECTOR_HEADER = 'ObjectName,Page,SelectorType,SelectorValue,RoleName,FallbackSelector,Dynamic,Description';
const RESULT_NAME_COLUMN = 'Result Name';

function usage(): void {
  console.log([
    'Usage: npm run import-codegen -- <Module> <Feature> <recording.ts|txt> [--page LoginPage]',
    '',
    'Example:',
    '  npm run import-codegen -- ProductDesign ROM(PD) new-recording.ts',
  ].join('\n'));
}

function parseArgs(argv: string[]): ParsedArgs {
  const positionals: string[] = [];
  let page: string | undefined;
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
    positionals.push(arg);
  }
  const [module, feature, inputFile] = positionals;
  if (!module || !feature || !inputFile) return { help: true };
  return { args: { module, feature, inputFile, page } };
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
    };
  }

  const roleCall = /getByRole\((['"])(.*?)\1,\s*\{\s*name:\s*(['"])(.*?)\3(?:,\s*exact:\s*true)?\s*\}\)(?:\.(click|fill|check|selectOption))?\((.*?)\);?$/.exec(trimmed);
  if (roleCall) {
    return {
      lineNo,
      kind: 'role',
      selectorType: 'role',
      selectorValue: roleCall[2] ?? '',
      roleType: roleCall[2] ?? '',
      roleName: roleCall[4] ?? '',
      action: roleCall[5] ?? 'click',
      args: roleCall[6] ?? '',
      ref: roleCall[4] ?? roleCall[2] ?? '',
      raw: trimmed,
    };
  }

  const labelCall = /getByLabel\((['"])(.*?)\1\)(?:\.(click|fill|check|selectOption))?\((.*?)\);?$/.exec(trimmed);
  if (labelCall) {
    return {
      lineNo,
      kind: 'label',
      selectorType: 'label',
      selectorValue: labelCall[2] ?? '',
      roleType: '',
      roleName: '',
      action: labelCall[3] ?? 'click',
      args: labelCall[4] ?? '',
      ref: labelCall[2] ?? '',
      raw: trimmed,
    };
  }

  const textCall = /getByText\((['"])(.*?)\1\)(?:\.(click|fill|check|selectOption))?\((.*?)\);?$/.exec(trimmed);
  if (textCall) {
    return {
      lineNo,
      kind: 'text',
      selectorType: 'text',
      selectorValue: textCall[2] ?? '',
      roleType: '',
      roleName: '',
      action: textCall[3] ?? 'click',
      args: textCall[4] ?? '',
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
    };
  }

  return null;
}

function buildDataToken(file: string, column: string): string {
  return `${'${'}data.${file}.${column}}`;
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
  const keys = ['StepID', 'StepGroup', 'Page', 'Action', 'ObjectName', 'InputValue', 'StoreAs', 'AssertType', 'ExpectedValue', 'WaitCondition', 'Timeout', 'Optional', 'Retry', 'Screenshot', 'SkipIf', 'Description'];
  return keys.map((k) => csvEscape(String(row[k] ?? ''))).join(',');
}

function parseCodegen(lines: string[]): { selectors: LocatorRef[]; steps: StepRow[]; dataColumns: Map<string, Set<string>> } {
  const selectors: LocatorRef[] = [];
  const seenSelectors = new Set<string>();
  const steps: StepRow[] = [];
  const dataColumns = new Map<string, Set<string>>();
  const events = lines.map((line, lineNo) => parseCodegenEvent(line, lineNo)).filter((event): event is ParsedEvent => event !== null);

  let stepId = 10;
  let currentPage = 'Page';
  let inLogin = false;
  let pendingLabel = '';
  let lastEmitted: EmittedStep | undefined;
  let activeFlow = '';

  const registerDataColumn = (file: string, col: string): void => {
    const set = dataColumns.get(file) ?? new Set<string>();
    set.add(col);
    dataColumns.set(file, set);
  };

  const addSelector = (ref: LocatorRef): void => {
    const key = `${ref.page}|${ref.objectName}`;
    if (seenSelectors.has(key)) return;
    seenSelectors.add(key);
    selectors.push(ref);
  };

  const addStep = (step: StepRow): void => {
    steps.push(step);
    stepId += 10;
  };

  const emitStep = (step: StepRow, selectorInfo: EmittedStep): void => {
    addStep(step);
    lastEmitted = selectorInfo;
  };

  for (let index = 0; index < events.length; index++) {
    const event = events[index];
    if (!event) continue;
    const nextEvent = events[index + 1];

    if (event.kind === 'goto') {
      const url = event.args;
      if (/okta/i.test(url)) {
        inLogin = true;
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
          WaitCondition: 'networkidle',
          Timeout: 30000,
          Optional: 'FALSE',
          Retry: 0,
          Screenshot: 'never',
          SkipIf: '',
          Description: 'Navigate to app page',
        },
        { page: 'ProjectsPage', stepGroup: 'OpenProject', action: 'navigate', objectName: '', selectorType: 'goto', selectorValue: url, roleName: '' },
      );
      continue;
    }

    if (isNoiseContextEvent(event)) {
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

    if (event.action === 'fill' || (event.kind === 'role' && event.roleType === 'textbox') || isTextboxLike(event)) {
      const nextIsFillOnSameTarget = nextEvent && nextEvent.action === 'fill' && nextEvent.selectorType === event.selectorType && nextEvent.selectorValue === event.selectorValue;
      if (nextIsFillOnSameTarget && event.action === 'click') {
        pendingLabel = pendingLabel;
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
      });
      registerDataColumn(dataFile, columnName);
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
        dynamic: true,
        description: 'result link from codegen',
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

    if (targetAction === 'selectOption') {
      addSelector({
        page: pageName,
        objectName,
        selectorType: event.selectorType,
        selectorValue: event.selectorValue,
        roleName: event.roleName,
        fieldType: 'dropdown',
        fallbackSelector: '',
        dynamic: false,
        description: 'dropdown from codegen',
      });
      registerDataColumn(dataFile, columnName);
      emitStep(
        {
          StepID: stepId,
          StepGroup: stepGroup,
          Page: pageName,
          Action: 'select',
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
          Description: `select ${columnName}`,
        },
        { page: pageName, stepGroup, action: 'select', objectName, selectorType: event.selectorType, selectorValue: event.selectorValue, roleName: event.roleName },
      );
      pendingLabel = '';
      currentPage = nextPageForAction(ref, 'select', currentPage);
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
      });
      registerDataColumn(dataFile, columnName);
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

  return { selectors, steps, dataColumns };
}

function buildFeatureConfig(feature: string): string {
  const cfg = {
    feature,
    module: 'ProductDesign',
    serial: false,
    reuseAuthState: true,
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
  if (!fs.existsSync(targetRoot)) {
    console.error(`Feature folder not found: ${targetRoot}. Scaffold it first with npm run scaffold-feature.`);
    return 1;
  }

  const lines = readLines(inputFile);
  const { selectors, steps, dataColumns } = parseCodegen(lines);

  const selectorPath = path.join(targetRoot, '03_selectors_repo', 'selectors.csv');
  const metadataPath = path.join(targetRoot, '02_metadata', 'metadata.csv');
  const featureConfigPath = path.join(targetRoot, '00_config', 'feature.config.json');

  const existingSelectors = readSelectorRows(selectorPath);
  const mergedSelectors = mergeSelectorRows(existingSelectors, selectors);
  const selectorCsv = `${SELECTOR_HEADER}\n${mergedSelectors.map(selectorRowToCsv).join('\n')}${mergedSelectors.length ? '\n' : ''}`;
  const metadataCsv = `${STEP_HEADER}\n${steps.map(stepRowToCsv).join('\n')}${steps.length ? '\n' : ''}`;

  fs.writeFileSync(selectorPath, selectorCsv, 'utf8');
  fs.writeFileSync(metadataPath, metadataCsv, 'utf8');
  fs.writeFileSync(featureConfigPath, buildFeatureConfig(parsed.args.feature.replace(/^feature_/, '')), 'utf8');

  const inputsetCols = [...(dataColumns.get('inputset') ?? new Set<string>())];
  const inputsetHeader = ['TC_ID', 'IterationID', ...inputsetCols.filter((c) => c && c !== 'TC_ID' && c !== 'IterationID')].join(',');
  const inputsetPath = path.join(targetRoot, '01_testdata', 'inputset.csv');
  if (!fs.existsSync(inputsetPath) || fs.readFileSync(inputsetPath, 'utf8').trim() === '') {
    fs.writeFileSync(inputsetPath, `${inputsetHeader}\n`, 'utf8');
  }

  const projectPath = path.join(targetRoot, '01_testdata', 'project.csv');
  if (!fs.existsSync(projectPath) || fs.readFileSync(projectPath, 'utf8').trim() === '') {
    fs.writeFileSync(projectPath, 'TC_ID,IterationID\n', 'utf8');
  }
  const designPath = path.join(targetRoot, '01_testdata', 'design.csv');
  if (!fs.existsSync(designPath) || fs.readFileSync(designPath, 'utf8').trim() === '') {
    fs.writeFileSync(designPath, 'TC_ID,IterationID\n', 'utf8');
  }

  console.log(`Imported codegen -> ${path.join(parsed.args.module, featureName)}`);
  return 0;
}

process.exit(main());