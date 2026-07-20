/**
 * Framework error types. Every error that originates from a CSV or a step
 * carries enough location context (file, row, column) to fix it without a
 * debugger — per CODING STANDARDS §14.
 */

export interface ErrorLocation {
  file?: string;
  /** 1-based row number as a human would count it in a spreadsheet (incl. header). */
  row?: number;
  column?: string;
  tcId?: string;
  iterationId?: string;
  stepId?: number | string;
}

export class FrameworkError extends Error {
  readonly location: ErrorLocation;
  constructor(message: string, location: ErrorLocation = {}) {
    super(FrameworkError.format(message, location));
    this.name = 'FrameworkError';
    this.location = location;
  }

  static format(message: string, loc: ErrorLocation): string {
    const parts: string[] = [];
    if (loc.file) parts.push(`file=${loc.file}`);
    if (loc.row !== undefined) parts.push(`row=${loc.row}`);
    if (loc.column) parts.push(`column=${loc.column}`);
    if (loc.tcId) parts.push(`tc=${loc.tcId}`);
    if (loc.iterationId) parts.push(`iter=${loc.iterationId}`);
    if (loc.stepId !== undefined) parts.push(`step=${loc.stepId}`);
    const suffix = parts.length ? `  [${parts.join(' ')}]` : '';
    return `${message}${suffix}`;
  }
}

/** A collection of validation problems, reported all at once ("fail at validation time"). */
export class ValidationError extends FrameworkError {
  readonly issues: string[];
  constructor(issues: string[]) {
    super(`Validation failed with ${issues.length} issue(s).`);
    this.name = 'ValidationError';
    this.issues = issues;
  }
}

/** Raised by waitForSimulation when the app never reached a terminal state. */
export class SimulationTimeoutError extends FrameworkError {
  constructor(message: string, location: ErrorLocation = {}) {
    super(message, location);
    this.name = 'SimulationTimeoutError';
  }
}

/** Raised by waitForSimulation when the app reported an explicit failure state. */
export class SimulationFailedError extends FrameworkError {
  constructor(message: string, location: ErrorLocation = {}) {
    super(message, location);
    this.name = 'SimulationFailedError';
  }
}
