/**
 * Masking logger unit tests (§5.7): a registered secret is redacted from strings
 * and from nested objects (by value and by obvious key name).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { registerSecret, mask, maskDeep } from '../../core/utils/logger.js';

test('registered secret is masked in strings', () => {
  registerSecret('Sup3rSecretPw!');
  assert.equal(mask('login with Sup3rSecretPw! now'), 'login with ***MASKED*** now');
});

test('maskDeep redacts by value and by obvious key name', () => {
  registerSecret('Sup3rSecretPw!');
  const out = maskDeep({ user: 'qa', password: 'anything', note: 'token=Sup3rSecretPw!' }) as Record<string, string>;
  assert.equal(out['password'], '***MASKED***'); // by key name
  assert.equal(out['note'], 'token=***MASKED***'); // by value
  assert.equal(out['user'], 'qa');
});

test('short/empty secrets are ignored (no over-masking)', () => {
  registerSecret('');
  registerSecret('ab');
  assert.equal(mask('ab cd'), 'ab cd');
});
