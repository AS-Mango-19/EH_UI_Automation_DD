import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toTypeScriptMethodName } from '../../core/generators/pom.generator.js';

test('sanitizes selector names into valid TypeScript method names', () => {
  assert.equal(toTypeScriptMethodName('txt_Dose_Name-0'), 'txt_Dose_Name_0');
  assert.equal(toTypeScriptMethodName('field name'), 'field_name');
  assert.equal(toTypeScriptMethodName('0-field'), '_0_field');
  assert.equal(toTypeScriptMethodName('constructor'), 'selector_constructor');
});