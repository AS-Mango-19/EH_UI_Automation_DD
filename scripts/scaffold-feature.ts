/**
 * Scaffolds a new feature folder using the repo's convention:
 *   <Module>/feature_<Feature>/
 *
 * Usage:
 *   npm run scaffold-feature -- <Module> <Feature> [--template feature_<ExistingFeature>]
 *
 * The scaffold creates the folder tree and starter files only. Fill in the CSV
 * contents before running validate/generate/test.
 */
import fs from 'node:fs';
import path from 'node:path';

type ScaffoldArgs = {
  module: string;
  feature: string;
  template?: string;
};

type ParsedArgs =
  | { help: true }
  | {
      help?: false;
      args: ScaffoldArgs;
    };

const STARTER_FILES: Record<string, string> = {
  '00_config/feature.config.json': '',
  '01_testdata/inputset.csv': 'InputSetname,SelectTask,SelectTest\n',
  '01_testdata/project.csv': 'TC_ID,IterationID\n',
  '01_testdata/design.csv': 'TC_ID,IterationID\n',
  '03_metadata/metadata.csv':
    'Seq,StepID,StepGroup,Page,Action,ObjectName,InputValue,StoreAs,AssertType,ExpectedValue,WaitCondition,Timeout,Optional,Retry,Screenshot,SkipIf,Description\n',
  '02_selectors_repo/selectors.csv':
    'ObjectName,Page,SelectorType,SelectorValue,RoleName,FallbackSelector,Dynamic,Description,Exact\n',
  '06_baseline/compare.config.csv':
    'ColumnName,IsKey,Compare,DataType,AbsTolerance,RelTolerance,RoundTo,Normalize,Notes\n',
};

function usage(): void {
  console.log([
    'Usage: npm run scaffold-feature -- <Module> <Feature> [--template feature_<ExistingFeature>]',
    '',
    'Example:',
    '  npm run scaffold-feature -- ProductDesign Simon2Stage',
  ].join('\n'));
}

function parseArgs(argv: string[]): ParsedArgs {
  const positionals: string[] = [];
  let template: string | undefined;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]!;
    if (arg === '-h' || arg === '--help') return { help: true };
    if (arg === '--template' || arg === '-t') {
      template = argv[++i];
      continue;
    }
    if (arg.startsWith('--template=')) {
      template = arg.slice('--template='.length);
      continue;
    }
    positionals.push(arg);
  }

  const [module, feature] = positionals;
  if (!module || !feature) return { help: true };
  return { args: { module, feature, template } };
}

function featureFolderName(feature: string): string {
  return feature.startsWith('feature_') ? feature : `feature_${feature}`;
}

function ensureDir(dir: string): void {
  fs.mkdirSync(dir, { recursive: true });
}

function writeIfMissing(file: string, content: string): void {
  if (!fs.existsSync(file)) fs.writeFileSync(file, content, 'utf8');
}

function scaffoldFromTemplate(sourceRoot: string, targetRoot: string): void {
  const entries = fs.readdirSync(sourceRoot, { withFileTypes: true });
  for (const entry of entries) {
    const sourcePath = path.join(sourceRoot, entry.name);
    const targetPath = path.join(targetRoot, entry.name);
    if (entry.isDirectory()) {
      ensureDir(targetPath);
      scaffoldFromTemplate(sourcePath, targetPath);
      continue;
    }
    fs.copyFileSync(sourcePath, targetPath);
  }
}

function main(): number {
  const parsed = parseArgs(process.argv.slice(2));
  if ('help' in parsed) {
    usage();
    return 0;
  }

  const args = parsed.args;

  const moduleRoot = path.resolve(process.cwd(), args.module);
  const featureName = featureFolderName(args.feature);
  const targetRoot = path.join(moduleRoot, featureName);
  if (fs.existsSync(targetRoot)) {
    console.error(`Feature folder already exists: ${targetRoot}`);
    return 1;
  }

  ensureDir(targetRoot);

  const templateRoot = args.template
    ? path.join(moduleRoot, featureFolderName(args.template.replace(/^feature_/, '')))
    : undefined;

  if (templateRoot) {
    if (!fs.existsSync(templateRoot)) {
      console.error(`Template folder not found: ${templateRoot}`);
      return 1;
    }
    scaffoldFromTemplate(templateRoot, targetRoot);
    const featureConfig = path.join(targetRoot, '00_config', 'feature.config.json');
    if (fs.existsSync(featureConfig)) {
      const parsed = JSON.parse(fs.readFileSync(featureConfig, 'utf8')) as Record<string, unknown>;
      parsed.feature = args.feature.replace(/^feature_/, '');
      parsed.module = args.module;
      fs.writeFileSync(featureConfig, `${JSON.stringify(parsed, null, 2)}\n`, 'utf8');
    }
  } else {
    for (const relDir of [
      '00_config',
      '01_testdata',
      '03_metadata',
      '02_selectors_repo',
      '04_generated_pom',
      '05_generated_scripts',
      '06_baseline',
      '07_actual_results',
      '08_diffs',
      '09_html_report',
    ]) {
      ensureDir(path.join(targetRoot, relDir));
    }

    const featureConfig = {
      feature: args.feature.replace(/^feature_/, ''),
      module: args.module,
      serial: false,
      reuseAuthState: true,
      testdata: {
        format: 'csv' as const,
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
        mode: 'domTable' as const,
        domTableObject: 'tbl_Results',
        downloadTrigger: 'btn_ExportResults',
        outputFileName: 'results_${TC_ID}_${IterationID}.csv',
        columnMap: {},
        sortBy: [],
      },
      cleanup: { deleteCreatedProjects: true },
    };

    fs.writeFileSync(path.join(targetRoot, '00_config', 'feature.config.json'), `${JSON.stringify(featureConfig, null, 2)}\n`, 'utf8');
    for (const [relPath, content] of Object.entries(STARTER_FILES)) {
      writeIfMissing(path.join(targetRoot, relPath), content);
    }
  }

  console.log(`Scaffolded ${path.join(args.module, featureName)}`);
  return 0;
}

process.exit(main());