/**
 * Structured, secret-masking logger. Secrets registered here (e.g. APP_PASSWORD)
 * are redacted from EVERY log line, JSON payload, report annotation and error
 * string the framework emits (§5.7, §14). Registration happens once at env load.
 */
import fs from 'node:fs';
import path from 'node:path';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LEVEL_ORDER: Record<LogLevel, number> = { debug: 10, info: 20, warn: 30, error: 40 };
const MASK = '***MASKED***';

const secrets = new Set<string>();

/** Register a secret value to be redacted everywhere. No-ops on empty/short values. */
export function registerSecret(value: string | undefined): void {
  if (value && value.trim().length >= 3) secrets.add(value);
}

/** Redact every registered secret from any string. */
export function mask(input: string): string {
  let out = input;
  for (const s of secrets) {
    if (!s) continue;
    out = out.split(s).join(MASK);
  }
  return out;
}

/** Deep-mask an arbitrary value (used for the resolved-variable context per step). */
export function maskDeep<T>(value: T): T {
  if (value == null) return value;
  if (typeof value === 'string') return mask(value) as unknown as T;
  if (Array.isArray(value)) return value.map((v) => maskDeep(v)) as unknown as T;
  if (typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      // Redact by key name too, in case a secret is stored under an obvious key.
      out[k] = /password|secret|token|apikey|api_key/i.test(k) ? MASK : maskDeep(v);
    }
    return out as unknown as T;
  }
  return value;
}

export interface LogRecord {
  ts: string;
  level: LogLevel;
  msg: string;
  [key: string]: unknown;
}

export class Logger {
  private minLevel: LogLevel = 'info';
  private jsonlPath: string | null = null;
  private buffer: LogRecord[] = [];

  setLevel(level: LogLevel): void {
    this.minLevel = level;
  }

  /** Point structured JSON logs at artifacts/<runId>/logs.jsonl */
  attachFile(filePath: string): void {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    this.jsonlPath = filePath;
    // flush anything buffered before the file was attached
    for (const rec of this.buffer) this.writeFile(rec);
    this.buffer = [];
  }

  private write(level: LogLevel, msg: string, fields: Record<string, unknown> = {}): void {
    if (LEVEL_ORDER[level] < LEVEL_ORDER[this.minLevel]) return;
    // ts is injected by the caller-free clock via a monotonic counter would break
    // determinism; use ISO from Date is acceptable for logs (not for run identity).
    const rec: LogRecord = {
      ts: new Date().toISOString(),
      level,
      msg: mask(msg),
      ...(maskDeep(fields) as Record<string, unknown>),
    };
    const line = `${rec.ts} ${level.toUpperCase().padEnd(5)} ${rec.msg}`;
    const consoleFn = level === 'error' ? console.error : level === 'warn' ? console.warn : console.log;
    consoleFn(line);
    if (this.jsonlPath) this.writeFile(rec);
    else this.buffer.push(rec);
  }

  private writeFile(rec: LogRecord): void {
    if (!this.jsonlPath) return;
    fs.appendFileSync(this.jsonlPath, JSON.stringify(rec) + '\n', 'utf8');
  }

  debug(msg: string, fields?: Record<string, unknown>): void {
    this.write('debug', msg, fields);
  }
  info(msg: string, fields?: Record<string, unknown>): void {
    this.write('info', msg, fields);
  }
  warn(msg: string, fields?: Record<string, unknown>): void {
    this.write('warn', msg, fields);
  }
  error(msg: string, fields?: Record<string, unknown>): void {
    this.write('error', msg, fields);
  }
}

export const logger = new Logger();
