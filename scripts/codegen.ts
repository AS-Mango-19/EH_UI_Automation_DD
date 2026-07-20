import { spawn } from 'node:child_process';
import path from 'node:path';
import { loadEnv } from '../config/environments.js';

function parseArgs(argv: string[]): { envName: string; url?: string; passthrough: string[] } {
  let envName = process.env.ENV || 'qa';
  let url: string | undefined;
  const passthrough: string[] = [];

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg) continue;
    if (arg === '--env') {
      const next = argv[++i];
      if (!next || next.startsWith('--')) throw new Error('--env expects a value');
      envName = next;
      continue;
    }
    if (arg === '--url') {
      const next = argv[++i];
      if (!next || next.startsWith('--')) throw new Error('--url expects a value');
      url = next;
      continue;
    }
    if (!url && /^https?:\/\//i.test(arg)) {
      url = arg;
      continue;
    }
    passthrough.push(arg);
  }

  return { envName, url, passthrough };
}

async function main(): Promise<number> {
  const { envName, url, passthrough } = parseArgs(process.argv.slice(2));
  const env = loadEnv(envName);
  const targetUrl = url || env.baseUrl;
  const playwrightCli = path.resolve('node_modules', 'playwright', 'cli.js');

  const child = spawn(process.execPath, [playwrightCli, 'codegen', targetUrl, ...passthrough], {
    stdio: 'inherit',
    env: {
      ...process.env,
      ENV: envName,
      BASE_URL: targetUrl,
    },
  });

  return await new Promise<number>((resolve, reject) => {
    child.on('error', reject);
    child.on('exit', (code) => resolve(code ?? 1));
  });
}

main()
  .then((code) => process.exit(code))
  .catch((err) => {
    console.error((err as Error).message);
    process.exit(1);
  });