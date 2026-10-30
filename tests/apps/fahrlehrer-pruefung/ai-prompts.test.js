/**
 * Tests for apps/fahrlehrer-pruefung/public/core/ai-prompts.js
 *
 * Run with: node tests/apps/fahrlehrer-pruefung/ai-prompts.test.js
 */

const assert = require('assert');

const Prompts = require('../../../apps/fahrlehrer-pruefung/public/core/ai-prompts');
const data = require('../../../apps/fahrlehrer-pruefung/public/data/questions');

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
  console.log('\n=== Testing fahrlehrer-pruefung ai-prompts ===\n');
  const results = [];
  const sign = data.questions.find(q => q.id === 'vz-206');
  const plain = data.questions.find(q => q.id === 'mp-04');

  results.push(test('sign briefs tell the examiner the sign but hide it from the candidate', () => {
    const brief = Prompts.questionBrief(sign);
    assert.ok(brief.includes('Zeichen 206'));
    assert.ok(brief.includes('Amtlicher Text (StVO)'));
    assert.ok(brief.includes('Zeichenart: Vorschriftzeichen'));
    assert.ok(brief.includes('keine Paragrafen'));
    assert.ok(brief.includes('Zeichenart bewerten'));
    assert.ok(brief.includes('sieht nur die Originalabbildung'));
    assert.ok(brief.includes('Typische Fehler'));
  }));

  results.push(test('flashcard briefs grade against the back of the card', () => {
    const card = Object.assign({}, plain, { id: 'kk-p-002', collection: 'karteikarten', deckName: 'Pädagogik' });
    assert.ok(Prompts.questionBrief(card).includes('Rückseite der Lernkarte'));
    assert.ok(!Prompts.questionBrief(plain).includes('Rückseite der Lernkarte'));
  }));

  results.push(test('evaluation prompt contains instructions, answer and JSON format', () => {
    const prompt = Prompts.evaluationPrompt(plain, 'Antwort <b>');
    assert.ok(prompt.includes(Prompts.EVALUATION_SYSTEM));
    assert.ok(prompt.includes('<antwort>\nAntwort <b>\n</antwort>'));
    assert.ok(prompt.trim().endsWith(Prompts.EVALUATION_FORMAT));
  }));

  results.push(test('examiner messages start and end with a user turn and merge same roles', () => {
    const msgs = Prompts.examinerMessages([plain], [
      { role: 'examiner', text: 'Frage' },
      { role: 'candidate', text: 'A' },
      { role: 'candidate', text: 'B' },
      { role: 'examiner', text: 'Nachfrage' }
    ], 'LEAD');
    assert.strictEqual(msgs[0].content, 'LEAD');
    assert.deepStrictEqual(msgs.map(m => m.role), ['user', 'assistant', 'user', 'assistant', 'user']);
    assert.ok(msgs[2].content.includes('A') && msgs[2].content.includes('B'));
  }));

  results.push(test('examiner asks one question at a time and does not punish correct details', () => {
    assert.ok(Prompts.EXAMINER_SYSTEM.includes('höchstens eine Frage'));
    assert.ok(Prompts.EXAMINER_SYSTEM.includes('kein Fehler'));
    assert.ok(Prompts.EVALUATION_SYSTEM.includes('sicher falsch'));
  }));

  results.push(test('examiner role and time-up note for the three-examiner exam', () => {
    const role = { examiner: 'Techniker', name: 'Technik', minutes: 10, first: false };
    const plan = Prompts.examinerPlan([plain], role);
    assert.ok(plan.includes('Deine Rolle: Techniker') && plan.includes('10 Minuten') && plan.includes('stelle dich kurz vor'));
    const asked = Prompts.examinerMessages([plain], [{ role: 'examiner', text: 'Frage' }], 'LEAD', Object.assign({ timeUp: true }, role));
    assert.ok(asked[asked.length - 1].content.includes('Prüfungszeit ist abgelaufen'));
    const answered = Prompts.examinerMessages([plain], [{ role: 'examiner', text: 'Frage' }, { role: 'candidate', text: 'Antwort' }], 'LEAD', { timeUp: true });
    assert.strictEqual(answered[answered.length - 1].role, 'user');
    assert.ok(answered[answered.length - 1].content.includes('<pruefling>Antwort</pruefling>') && answered[answered.length - 1].content.includes('Prüfungszeit ist abgelaufen'));
    const normal = Prompts.examinerMessages([plain], [{ role: 'examiner', text: 'Frage' }, { role: 'candidate', text: 'Antwort' }], 'LEAD');
    assert.ok(!normal[normal.length - 1].content.includes('abgelaufen'));
  }));

  results.push(test('normalizers clamp scores and drop malformed fields', () => {
    const ev = Prompts.normalizeEvaluation({ score: '1.4', covered: ['x', 3], errors: 'nope' });
    assert.strictEqual(ev.score, 1);
    assert.deepStrictEqual(ev.covered, ['x', '3']);
    assert.deepStrictEqual(ev.errors, []);
    const turn = Prompts.normalizeExaminerTurn({ message: 'Hallo', assessment: { completed: false }, finished: 0 });
    assert.strictEqual(turn.assessment, null);
    assert.strictEqual(turn.finished, false);
    assert.deepStrictEqual(Prompts.normalizeExaminerTurn(null).message, '');
  }));

  const passed = results.filter(Boolean).length;
  const failed = results.length - passed;
  console.log(`\nResults: Passed: ${passed}, Failed: ${failed}`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests();
