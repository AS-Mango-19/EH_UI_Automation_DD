/**
 * CLI entry (§11). Commands: validate | generate | test | cleanup:orphans.
 * Heavy commands are dynamically imported so `validate` opens no browser and
 * pulls in no Playwright.
 */
import { parseArgs } from './args.js';
import { validateAll } from '../schema/validator.js';
import { logger } from '../utils/logger.js';

function printValidation(): number {
  const report = validateAll();
  for (const w of report.warnings) logger.warn(w);
  if (report.issues.length === 0) {
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
      '  generate                 Generate POM + spec files only.',
      '  test                     Run selected test cases.',
      '  cleanup:orphans          Delete projects left by crashed runs.',
      '',
      'Flags:',
      '  --tags "<expr>"          Tag expression (OR "," AND "+" NOT "~").',
      '  --feature <Feature>      Restrict to one feature.',
      '  --testcase <TC_ID>       Run one test case (ignores Execute).',
      '  --all                    Run every row regardless of Execute.',
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
      return printValidation();
    case 'generate': {
      const { generateCommand } = await import('../runner/orchestrator.js');
      return generateCommand(filters);
    }
    case 'test': {
      // Validation always runs first — fail before a browser opens (§2.6).
      const code = printValidation();
      if (code !== 0) {
        logger.error('Aborting: fix validation issues before running tests.');
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
