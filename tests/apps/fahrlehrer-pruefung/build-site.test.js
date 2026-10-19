/**
 * Tests for apps/fahrlehrer-pruefung/build-site.js
 *
 * Run with: node tests/apps/fahrlehrer-pruefung/build-site.test.js
 */

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { webcrypto } = require('crypto');

const { encrypt, decrypt, buildSite, loaderHtml } = require('../../../apps/fahrlehrer-pruefung/build-site');

async function test(name, fn) {
  try {
    await fn();
    console.log(`  ✓ ${name}`);
    return true;
  } catch (err) {
    console.log(`  ✗ ${name}`);
    console.log(`    Error: ${err.message}`);
    return false;
  }
}

/** Same steps as the loader page in the browser (WebCrypto). */
async function browserDecrypt(payload, password) {
  const data = new Uint8Array(payload);
  const iterations = new DataView(data.buffer, data.byteOffset).getUint32(4);
  const base = await webcrypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
  const key = await webcrypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: data.slice(8, 24), iterations, hash: 'SHA-256' },
    base,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );
  const plain = await webcrypto.subtle.decrypt({ name: 'AES-GCM', iv: data.slice(24, 36) }, key, data.slice(36));
  return new TextDecoder().decode(plain);
}

async function runTests() {
  console.log('\n=== Testing fahrlehrer-pruefung build-site ===\n');
  const results = [];
  const text = 'Prüfungsfrage: Was bedeutet Zeichen 206? – Umlaute äöüß';

  results.push(await test('encrypt and decrypt round-trip, wrong password fails', async () => {
    const payload = encrypt(text, 'richtiges-passwort', { iterations: 1000 });
    assert.strictEqual(payload.subarray(0, 4).toString(), 'FLE1');
    assert.ok(!payload.toString('utf8').includes('Zeichen 206'), 'payload must not contain plaintext');
    assert.strictEqual(decrypt(payload, 'richtiges-passwort'), text);
    assert.throws(() => decrypt(payload, 'falsches-passwort'));
  }));

  results.push(await test('browser WebCrypto path decrypts what node encrypted', async () => {
    const payload = encrypt(text, 'richtiges-passwort', { iterations: 1000 });
    assert.strictEqual(await browserDecrypt(payload, 'richtiges-passwort'), text);
    await assert.rejects(() => browserDecrypt(payload, 'falsches-passwort'));
  }));

  results.push(await test('built site contains only the loader and the encrypted app', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fl-site-'));
    try {
      const password = 'testpasswort-1234';
      const { version } = buildSite(dir, password);
      const index = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
      const payload = fs.readFileSync(path.join(dir, 'app.bin'));
      assert.ok(index.includes(`app.bin?v=${version}`));
      assert.ok(!index.includes(password), 'password must not be written to the site');
      assert.ok(!index.includes('FLData') && !index.includes('modelAnswer'), 'loader must not contain app data');
      const html = await browserDecrypt(payload, password);
      assert.ok(html.startsWith('<!doctype html>'));
      assert.ok(html.includes('root.FLData = factory('));
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  }));

  results.push(await test('optional SDK bundle is placed before the app scripts', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fl-site-'));
    try {
      const password = 'testpasswort-1234';
      const sdkBundle = '(function(){ window.FLAnthropic = function FakeSdk() {}; })();';
      buildSite(dir, password, { sdkBundle });
      const html = await browserDecrypt(fs.readFileSync(path.join(dir, 'app.bin')), password);
      const sdkAt = html.indexOf('window.FLAnthropic = function FakeSdk');
      assert.ok(sdkAt > 0, 'bundle missing');
      assert.ok(sdkAt < html.indexOf('root.FLData = factory('), 'bundle must load before the app');
      assert.throws(() => buildSite(dir, password, { sdkBundle: 'console.log(1)' }), /FL_SDK_BUNDLE/);
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  }));

  results.push(await test('refuses to build without a sufficiently long password', async () => {
    assert.throws(() => buildSite(os.tmpdir(), ''), /FL_SITE_PASSWORD/);
    assert.throws(() => buildSite(os.tmpdir(), 'kurz'), /FL_SITE_PASSWORD/);
  }));

  results.push(await test('loader asks for the password and never stores it in the page', async () => {
    const html = loaderHtml('abc123');
    assert.ok(html.includes('type="password"'));
    assert.ok(html.includes('noindex'));
    assert.ok(html.includes("var FILE = 'app.bin?v=abc123'"));
  }));

  const passed = results.filter(Boolean).length;
  const failed = results.length - passed;
  console.log(`\nResults: Passed: ${passed}, Failed: ${failed}`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests();
