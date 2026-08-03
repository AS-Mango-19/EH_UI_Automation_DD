/**
 * Environment resolution. `Environment` in master.csv (or --env) selects both
 * the .env.<env> file AND the baseline scope (06_baseline/<env>/). The password
 * is registered as a secret the instant it is read, so it is masked everywhere.
 */
import fs from 'node:fs';
import dotenv from 'dotenv';
import { abs } from '../core/utils/paths.js';
import { registerSecret } from '../core/utils/logger.js';
import { FrameworkError } from '../core/utils/errors.js';

export interface EnvConfig {
  env: string;
  baseUrl: string;
  apiBaseUrl: string;
  username: string;
  password: string;
  headless: boolean;
  workers: number;
  defaultTimeoutMs: number;
  /** Everything else from the .env, so ${env.ANYTHING} resolves. */
  raw: Record<string, string>;
}

const cache = new Map<string, EnvConfig>();

/**
 * Load env for a given environment name. Tries `.env.<env>` then `.env`.
 * Values already present in process.env win (so CI can inject secrets).
 */
export function loadEnv(envName: string): EnvConfig {
  const key = envName || 'qa';
  const cached = cache.get(key);
  if (cached) return cached;

  const raw: Record<string, string> = {};
  const candidates = [abs(`.env.${key}`), abs('.env')];
  for (const file of candidates) {
    if (fs.existsSync(file)) {
      const parsed = dotenv.parse(fs.readFileSync(file));
      for (const [k, v] of Object.entries(parsed)) {
        if (!(k in raw)) raw[k] = v;
      }
    }
  }
  // process.env overrides file values (CI secret injection).
  for (const [k, v] of Object.entries(process.env)) {
    if (v !== undefined) raw[k] = v;
  }

  const get = (name: string, fallback?: string): string => {
    const v = raw[name];
    if (v === undefined || v === '') {
      if (fallback !== undefined) return fallback;
      throw new FrameworkError(`Missing required env var ${name} for environment "${key}"`, {
        file: `.env.${key}`,
      });
    }
    return v;
  };

  const password = get('APP_PASSWORD', 'change_me');
  registerSecret(password);

  const config: EnvConfig = {
    env: key,
    baseUrl: get('BASE_URL', 'https://your-app.example.com'),
    apiBaseUrl: get('API_BASE_URL', 'https://your-app.example.com/api'),
    username: get('APP_USERNAME', 'qa_user'),
    password,
    headless: get('HEADLESS', 'true').toLowerCase() !== 'false',
    workers: Number(get('WORKERS', '4')) || 4,
    defaultTimeoutMs: Number(get('DEFAULT_TIMEOUT_MS', '60000')) || 60000,
    raw,
  };
  cache.set(key, config);
  return config;
}
