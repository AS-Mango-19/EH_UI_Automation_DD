/**
 * Minimal, dependency-free CLI argument parser for the framework commands (§11).
 */
export interface CliFilters {
  tags?: string; // tag expression: OR ',' AND '+' NOT '~'
  feature?: string;
  testcase?: string;
  all: boolean;
  env?: string;
  updateBaseline: boolean;
  headed: boolean;
  workers?: number;
  trigger?: string;
}

export interface ParsedArgs {
  command: string;
  filters: CliFilters;
}

export function parseArgs(argv: string[]): ParsedArgs {
  const [command = 'help', ...rest] = argv;
  const filters: CliFilters = { all: false, updateBaseline: false, headed: false };

  for (let i = 0; i < rest.length; i++) {
    const a = rest[i];
    if (a === undefined) continue;
    const next = (): string => {
      const v = rest[i + 1];
      if (v === undefined || v.startsWith('--')) {
        throw new Error(`Flag ${a} expects a value.`);
      }
      i++;
      return v;
    };
    switch (a) {
      case '--tags':
        filters.tags = next();
        break;
      case '--feature':
        filters.feature = next();
        break;
      case '--testcase':
      case '--tc':
        filters.testcase = next();
        break;
      case '--env':
        filters.env = next();
        break;
      case '--all':
        filters.all = true;
        break;
      case '--update-baseline':
        filters.updateBaseline = true;
        break;
      case '--headed':
        filters.headed = true;
        break;
      case '--workers':
        filters.workers = Number(next());
        break;
      case '--trigger':
        filters.trigger = next();
        break;
      default:
        if (a.startsWith('--')) throw new Error(`Unknown flag: ${a}`);
    }
  }
  return { command, filters };
}
