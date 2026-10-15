/**
 * Tests for apps/fahrlehrer-pruefung/build-standalone.js
 *
 * Run with: node tests/apps/fahrlehrer-pruefung/build-standalone.test.js
 */

const assert = require('assert');

const { build } = require('../../../apps/fahrlehrer-pruefung/build-standalone');

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    return true;
  } catch (err) {
    console.log(`  ✗ ${name}`);
    console.log(`    Error: ${err.message}`);
    return false;
  }
}

function runTests() {
  console.log('\n=== Testing fahrlehrer-pruefung build-standalone ===\n');
  const results = [];

  results.push(test('full build is a complete document with all scripts inlined', () => {
    const html = build();
    assert.ok(html.startsWith('<!doctype html>'));
    assert.ok(html.includes('<title>Fahrlehrer-Prüfungstrainer</title>'));
    assert.ok(html.includes('root.FLData = factory('));
    assert.ok(html.includes('root.FLCore = factory()'));
    assert.ok(html.includes('root.FLPrompts = factory()'));
    assert.ok(html.includes('root.FLSigns = factory()'));
    assert.ok(html.includes('id="app"'));
    assert.ok(!/<script src=/.test(html), 'no external script references');
    assert.ok(!html.includes('href="styles.css"'), 'stylesheet inlined');
    assert.ok(!html.includes('src="icon.svg"'), 'icon inlined');
  }));

  results.push(test('fragment build omits the document skeleton', () => {
    const html = build({ fragment: true });
    assert.ok(html.startsWith('<title>'));
    assert.ok(!html.includes('<body>'));
    assert.ok(!html.includes('<html'));
    assert.ok(html.includes('claude:viewport-fit-sides'));
  }));

  results.push(test('inlined scripts cannot close their script tag early', () => {
    const html = build();
    const scriptBodies = html.split('<script>').slice(1).map(part => part.split('</script>')[0]);
    assert.strictEqual(scriptBodies.length, 10);
  }));

  const passed = results.filter(Boolean).length;
  const failed = results.length - passed;
  console.log(`\nResults: Passed: ${passed}, Failed: ${failed}`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests();
