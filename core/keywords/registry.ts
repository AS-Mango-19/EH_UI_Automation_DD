/**
 * The action registry: Map<ActionName, KeywordHandler> (§7). Built from the
 * handler modules and cross-checked against the pure catalog — a mismatch
 * (handler without a catalog entry, or a catalog entry without a handler) throws
 * at import time, so the two can never silently drift.
 */
import type { KeywordHandler } from './types.js';
import { ACTION_NAMES } from './catalog.js';
import { FrameworkError } from '../utils/errors.js';

import * as nav from './navigation.js';
import * as input from './input.js';
import * as wait from './wait.js';
import * as capture from './capture.js';
import * as assertions from './assert.js';
import * as flow from './flow.js';
import { apiRequest } from './api.js';
import { compareWithBaseline } from './comparison.js';

const REGISTRY = new Map<string, KeywordHandler>();

function register(name: string, handler: KeywordHandler): void {
  REGISTRY.set(name, handler);
}

// Navigation
register('navigate', nav.navigate);
register('goBack', nav.goBack);
register('reload', nav.reload);
register('switchTab', nav.switchTab);
register('switchFrame', nav.switchFrame);

// Input
register('click', input.click);
register('doubleClick', input.doubleClick);
register('rightClick', input.rightClick);
register('fill', input.fill);
register('type', input.type);
register('clear', input.clear);
register('select', input.select);
register('check', input.check);
register('uncheck', input.uncheck);
register('upload', input.upload);
register('hover', input.hover);
register('press', input.press);
register('dragAndDrop', input.dragAndDrop);

// Wait
register('waitForSelector', wait.waitForSelector);
register('waitForText', wait.waitForText);
register('waitForNetworkIdle', wait.waitForNetworkIdle);
register('waitForDownload', wait.waitForDownload);
register('waitForSimulation', wait.waitForSimulation);
register('sleep', wait.sleep);

// Capture
register('storeText', capture.storeText);
register('storeAttribute', capture.storeAttribute);
register('storeValue', capture.storeValue);
register('storeUrl', capture.storeUrl);
register('extractTable', capture.extractTable);
register('downloadFile', capture.downloadFile);

// Assert (+ soft)
register('assertVisible', assertions.assertVisible);
register('assertHidden', assertions.assertHidden);
register('assertText', assertions.assertText);
register('assertContains', assertions.assertContains);
register('assertValue', assertions.assertValue);
register('assertCount', assertions.assertCount);
register('assertEnabled', assertions.assertEnabled);
register('assertUrl', assertions.assertUrl);
register('softAssertVisible', assertions.softAssertVisible);
register('softAssertHidden', assertions.softAssertHidden);
register('softAssertText', assertions.softAssertText);
register('softAssertContains', assertions.softAssertContains);
register('softAssertValue', assertions.softAssertValue);
register('softAssertCount', assertions.softAssertCount);
register('softAssertEnabled', assertions.softAssertEnabled);
register('softAssertUrl', assertions.softAssertUrl);

// Flow
register('callReusable', flow.callReusable);
register('callCustom', flow.callCustom);
register('ifExists', flow.ifExists);
register('loopOverData', flow.loopOverData);

// API
register('apiRequest', apiRequest);

// Comparison
register('compareWithBaseline', compareWithBaseline);

// --- self-check: registry <-> catalog must be in perfect sync ---
(() => {
  const missingHandlers = ACTION_NAMES.filter((n) => !REGISTRY.has(n));
  const extraHandlers = [...REGISTRY.keys()].filter((n) => !ACTION_NAMES.includes(n));
  if (missingHandlers.length || extraHandlers.length) {
    throw new FrameworkError(
      `Keyword registry/catalog mismatch. Missing handlers: [${missingHandlers.join(', ')}]. ` +
        `Handlers with no catalog entry: [${extraHandlers.join(', ')}].`,
    );
  }
})();

export function getKeyword(name: string): KeywordHandler {
  const handler = REGISTRY.get(name);
  if (!handler) throw new FrameworkError(`No keyword handler registered for action "${name}"`);
  return handler;
}

export function hasKeyword(name: string): boolean {
  return REGISTRY.has(name);
}
