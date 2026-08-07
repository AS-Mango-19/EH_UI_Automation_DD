/**
 * CLI entry (§11). Commands: validate | generate | test | cleanup:orphans.
 * Heavy commands are dynamically imported so `validate` opens no browser and
 * pulls in no Playwright.
 */
import { parseArgs } from './args.js';
import { validateAll } from '../schema/validator.js';
import { logger } from '../utils/logger.js';

function printValidation(opts: { feature?: string; testcase?: string; skipDisabled?: boolean } = {}): number {
  const report = validateAll(opts);
  for (const w of report.warnings) logger.warn(w);
  if (report.issues.length === 0) {
    // A scope filter that matched no master row is a mistyped name, not a pass.
    if ((opts.feature || opts.testcase) && report.featuresValidated === 0) {
      const scope = opts.feature ? `--feature "${opts.feature}"` : `--testcase "${opts.testcase}"`;
      logger.error(`[FAIL] No feature matched ${scope}. Check the name against master.csv (Feature column).`);
      return 1;
    }
    logger.info(
      `[PASS] Validation passed: ${report.testCases} test case(s), ${report.featuresValidated} feature(s), ${report.warnings.length} warning(s).`,
    );
    return 0;
  }
  logger.error(`[FAIL] Validation FAILED with ${report.issues.length} issue(s):`);
  for (const issue of report.issues) logger.error(`  - ${issue}`);
  return 1;
}

function printHelp(): void {
  logger.info(
    [
      'Usage: npm run <command> -- [flags]',
      '',
      'Commands:',
      '  validate                 Schema-check every CSV. Opens no browser.',
      '                           Scope to one feature: validate --feature <Feature>.',
      '  generate                 Generate POM + spec files only.',
      '  test                     Run selected test cases.',
      '  cleanup:orphans          Delete projects left by crashed runs.',
      '',
      'Flags:',
      '  --tags "<expr>"          Tag expression (OR "," AND "+" NOT "~").',
      '  --feature <Feature>      Restrict to one feature.',
      '  --testcase <TC_ID>       Run one test case (the only flag that runs an Execute=FALSE row).',
      '  --all                    Run all ENABLED features (Execute=TRUE); disabled rows are skipped.',
      '  --env <env>              Override environment (.env.<env> + baseline scope).',
      '  --update-baseline        Approve current actuals as the new baseline.',
      '  --headed                 Run with a visible browser.',
      '  --workers <n>            Parallel worker count.',
    ].join('\n'),
  );
}

async function main(): Promise<number> {
  let parsed;
  try {
    parsed = parseArgs(process.argv.slice(2));
  } catch (e) {
    logger.error((e as Error).message);
    return 2;
  }
  const { command, filters } = parsed;

  switch (command) {
    case 'validate':
      // --feature / --testcase scope validation to one feature or case; omit for all.
      return printValidation({ feature: filters.feature, testcase: filters.testcase });
    case 'generate': {
      const { generateCommand } = await import('../runner/orchestrator.js');
      return generateCommand(filters);
    }
    case 'test': {
      // Validate ONLY what this run will execute, before a browser opens (§2.6).
      // A targeted run (--feature/--testcase) validates just that target; any other
      // run validates only the ENABLED (Execute=TRUE) features. This way a broken or
      // disabled OTHER feature never blocks running the feature(s) you asked for.
      const scope =
        filters.feature || filters.testcase
          ? { feature: filters.feature, testcase: filters.testcase }
          : { skipDisabled: true };
      const code = printValidation(scope);
      if (code !== 0) {
        logger.error('Aborting: fix the validation issue(s) in the feature(s) selected to run (other features are unaffected).');
        return code;
      }
      const { testCommand } = await import('../runner/orchestrator.js');
      return testCommand(filters);
    }
    case 'cleanup:orphans': {
      const { cleanupOrphansCommand } = await import('../runner/orphanSweeper.js');
      return cleanupOrphansCommand(filters);
    }
    case 'help':
    default:
      printHelp();
      return command === 'help' ? 0 : 2;
  }
}

main()
  .then((code) => process.exit(code))
  .catch((err) => {
    logger.error(`Fatal: ${(err as Error).stack ?? String(err)}`);
    process.exit(1);
  });
