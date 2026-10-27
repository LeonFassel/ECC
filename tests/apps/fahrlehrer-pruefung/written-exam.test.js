/**
 * Tests for apps/fahrlehrer-pruefung/public/core/written-exam.js
 *
 * Run with: node tests/apps/fahrlehrer-pruefung/written-exam.test.js
 */

const assert = require('assert');

const W = require('../../../apps/fahrlehrer-pruefung/public/core/written-exam');
const written = require('../../../apps/fahrlehrer-pruefung/public/data/questions-schriftlich');

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

const MIN = 60 * 1000;
const T0 = 1700000000000;

function runTests() {
  console.log('\n=== Testing fahrlehrer-pruefung written-exam ===\n');
  const results = [];

  results.push(test('timer starts only on demand and counts down five hours', () => {
    let t = W.createTimer();
    assert.strictEqual(W.timerStatus(t, T0), 'idle');
    assert.strictEqual(W.formatClock(W.remainingMs(t, T0 + 60 * MIN)), '5:00:00');
    t = W.startTimer(t, T0);
    assert.strictEqual(W.timerStatus(t, T0 + MIN), 'running');
    assert.strictEqual(W.formatClock(W.remainingMs(t, T0 + 90 * MIN + 1000)), '3:29:59');
    assert.strictEqual(W.timerStatus(t, T0 + 300 * MIN), 'finished');
    assert.strictEqual(W.remainingMs(t, T0 + 400 * MIN), 0);
  }));

  results.push(test('pausing freezes the time and resuming continues it', () => {
    let t = W.startTimer(W.createTimer(), T0);
    t = W.pauseTimer(t, T0 + 10 * MIN);
    assert.strictEqual(W.timerStatus(t, T0 + 50 * MIN), 'paused');
    assert.strictEqual(W.elapsedMs(t, T0 + 50 * MIN), 10 * MIN);
    t = W.resumeTimer(t, T0 + 50 * MIN);
    assert.strictEqual(W.elapsedMs(t, T0 + 55 * MIN), 15 * MIN);
    assert.strictEqual(W.startTimer(t, T0 + 60 * MIN), t, 'start while running keeps the timer');
  }));

  results.push(test('timer survives a reload from stored JSON', () => {
    const t = W.pauseTimer(W.startTimer(W.createTimer(), T0), T0 + 30 * MIN);
    const restored = W.normalizeTimer(JSON.parse(JSON.stringify(t)));
    assert.deepStrictEqual(restored, t);
    assert.deepStrictEqual(W.normalizeTimer({ startedAt: 'x', pausedAt: 5, pausedMs: -3 }), W.createTimer());
  }));

  results.push(test('warnings appear at 30 and 5 minutes', () => {
    const t = W.startTimer(W.createTimer(), T0);
    assert.strictEqual(W.timerWarning(t, T0 + 200 * MIN), null);
    assert.strictEqual(W.timerWarning(t, T0 + 271 * MIN).id, 'min30');
    assert.strictEqual(W.timerWarning(t, T0 + 296 * MIN).id, 'min5');
    assert.strictEqual(W.timerWarning(t, T0 + 301 * MIN), null);
  }));

  results.push(test('strokes are validated and rounded', () => {
    const s = W.normalizeStroke({ tool: 'pen', color: '#1F2937', width: 0.6, points: [[1.234, 2.345, 0.777], [3, 4], ['x', 1]] });
    assert.deepStrictEqual(s, { tool: 'pen', color: '#1f2937', width: 0.6, points: [[1.2, 2.3, 0.78], [3, 4, 0.5]] });
    assert.strictEqual(W.normalizeStroke({ tool: 'laser', color: '#000000', width: 1, points: [[0, 0]] }), null);
    assert.strictEqual(W.normalizeStroke({ tool: 'pen', color: 'red', width: 1, points: [[0, 0]] }), null);
    assert.strictEqual(W.normalizeStroke({ tool: 'pen', color: '#000000', width: 1, points: [] }), null);
    assert.ok(W.pointWidth({ tool: 'pen', width: 1 }, 1) > W.pointWidth({ tool: 'pen', width: 1 }, 0));
    assert.strictEqual(W.pointWidth({ tool: 'marker', width: 6 }, 1), 6);
  }));

  results.push(test('eraser removes whole strokes it touches', () => {
    const a = { tool: 'pen', color: '#000000', width: 1, points: [[0, 0, 0.5], [10, 0, 0.5]] };
    const b = { tool: 'pen', color: '#000000', width: 1, points: [[0, 20, 0.5], [10, 20, 0.5]] };
    assert.deepStrictEqual(W.eraseHits([a, b], 5, 1, 1), [0]);
    assert.deepStrictEqual(W.eraseHits([a, b], 5, 10, 1), []);
  }));

  results.push(test('undo and redo work across layers', () => {
    const s1 = { tool: 'pen', color: '#000000', width: 1, points: [[0, 0, 0.5]] };
    const s2 = { tool: 'marker', color: '#fde047', width: 6, points: [[5, 5, 0.5]] };
    let layers = { questions: [], 'page-0': [] };
    let history = W.createHistory();
    const add1 = { type: 'add', layer: 'page-0', stroke: s1 };
    layers = W.applyAction(layers, add1); history = W.record(history, add1);
    const add2 = { type: 'add', layer: 'questions', stroke: s2 };
    layers = W.applyAction(layers, add2); history = W.record(history, add2);
    const erase = { type: 'erase', layer: 'page-0', removed: [{ index: 0, stroke: s1 }] };
    layers = W.applyAction(layers, erase); history = W.record(history, erase);
    assert.deepStrictEqual(layers, { questions: [s2], 'page-0': [] });
    let step = W.undo(history, layers);
    assert.deepStrictEqual(step.layers, { questions: [s2], 'page-0': [s1] });
    step = W.undo(step.history, step.layers);
    assert.deepStrictEqual(step.layers, { questions: [], 'page-0': [s1] });
    step = W.redo(step.history, step.layers);
    assert.deepStrictEqual(step.layers, { questions: [s2], 'page-0': [s1] });
    const clear = { type: 'clear', layer: 'questions', removed: [{ index: 0, stroke: s2 }] };
    const cleared = W.applyAction(step.layers, clear);
    assert.deepStrictEqual(W.revertAction(cleared, clear), step.layers);
    assert.strictEqual(W.undo(W.createHistory(), layers).action, null);
  }));

  results.push(test('stored work is normalised per page', () => {
    const doc = W.normalizeDoc({ pageCount: 2, layers: { 'page-1': [{ tool: 'pen', color: '#000000', width: 1, points: [[1, 1]] }, { bad: true }], 'q-3': [], 'page-5': [], evil: [1] } }, 'se-x');
    assert.strictEqual(doc.pageCount, 2);
    assert.deepStrictEqual(Object.keys(doc.layers).sort(), ['page-0', 'page-1', 'q-3']);
    assert.strictEqual(doc.layers['page-1'].length, 1);
    assert.deepStrictEqual(W.normalizeDoc(null, 'se-x').layers, { 'page-0': [] });
  }));

  results.push(test('written exams have parts with verbatim tasks', () => {
    const ids = new Set();
    for (const exam of written.exams) {
      assert.ok(/^se-[a-z0-9-]+$/.test(exam.id) && !ids.has(exam.id), `${exam.id} id`);
      ids.add(exam.id);
      assert.ok(exam.title && exam.parts.length > 0, `${exam.id} title/parts`);
      for (const part of exam.parts) {
        assert.ok(part.name && part.tasks.length > 0, `${exam.id} part ${part.name}`);
        for (const task of part.tasks) {
          assert.ok(typeof task.text === 'string' && task.text.trim().length > 3, `${exam.id} ${part.name} ${task.label} text`);
          for (const figure of task.figures || []) {
            assert.ok(/^data:image\/(webp|png|jpeg);base64,/.test(figure.src), `${exam.id} figure src`);
          }
        }
      }
    }
  }));

  const passed = results.filter(Boolean).length;
  const failed = results.length - passed;
  console.log(`\nResults: Passed: ${passed}, Failed: ${failed}`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests();
