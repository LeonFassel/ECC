/**
 * Tests for apps/fahrlehrer-pruefung/public/core/learning-core.js
 * and the question bank in apps/fahrlehrer-pruefung/public/data/questions.js
 *
 * Run with: node tests/apps/fahrlehrer-pruefung/learning-core.test.js
 */

const assert = require('assert');

const Core = require('../../../apps/fahrlehrer-pruefung/public/core/learning-core');
const data = require('../../../apps/fahrlehrer-pruefung/public/data/questions');

const DAY = 24 * 60 * 60 * 1000;
const NOW = new Date(2026, 9, 15, 12, 0, 0).getTime();

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

function q(id) {
  return data.questions.find(x => x.id === id);
}

function runTests() {
  console.log('\n=== Testing fahrlehrer-pruefung learning-core ===\n');
  const results = [];

  // --- question bank ---

  results.push(test('question bank covers all six subjects', () => {
    const ids = data.subjects.map(s => s.id).sort();
    assert.deepStrictEqual(ids, ['paedagogik', 'praxis', 'recht', 'technik', 'verhalten', 'zeichen']);
    for (const s of data.subjects) {
      assert.ok(data.questions.filter(x => x.subject === s.id).length >= 5, `too few questions for ${s.id}`);
    }
  }));

  results.push(test('every question has the required learning content', () => {
    const seen = new Set();
    for (const item of data.questions) {
      assert.ok(!seen.has(item.id), `duplicate id ${item.id}`);
      seen.add(item.id);
      // StVO-Zeichenkarten bringen den amtlichen Text mit; Erklärung und Beispiel sind dort optional.
      const fields = item.signLabel ? ['question', 'modelAnswer'] : ['question', 'explanation', 'example', 'modelAnswer'];
      for (const field of fields) {
        assert.ok(typeof item[field] === 'string' && item[field].length > 10, `${item.id}.${field}`);
      }
      assert.ok(item.topic && item.topic.length >= 3, `${item.id}.topic`);
      assert.ok(item.keyPoints.length >= (item.signLabel ? 1 : 3), `${item.id} keyPoints`);
      assert.ok(item.followUps.length >= 1, `${item.id} followUps`);
      assert.ok([1, 2, 3].includes(item.difficulty), `${item.id} difficulty`);
      for (const p of item.keyPoints) {
        assert.ok(p.label && p.keywords.length > 0, `${item.id} keyPoint ${p.label}`);
      }
    }
  }));

  results.push(test('each model answer scores well against its own key points', () => {
    for (const item of data.questions) {
      const ev = Core.evaluateAnswer(item, item.modelAnswer);
      assert.ok(ev.score >= 0.6, `${item.id} model answer only scores ${ev.score} (missing: ${ev.missing.join(', ')})`);
    }
  }));

  results.push(test('every sign has an original image and no model answer triggers its own wrong claims', () => {
    assert.ok(data.signs.length >= 216, `expected all StVO signs, got ${data.signs.length}`);
    for (const item of data.signs) {
      assert.ok(item.imageSrc.length > 0, `${item.id} has no image`);
      for (const src of item.imageSrc) assert.ok(src.startsWith('data:image/webp;base64,'), `${item.id} image format`);
      assert.ok(item.name && item.signLabel, `${item.id} name/label`);
      assert.ok(Array.isArray(item.official), `${item.id} official text`);
    }
    for (const id of ['vz-101', 'vz-206', 'vz-205', 'vz-274', 'vz-306', 'vz-325-1', 'vz-z2-2-1']) {
      assert.ok(data.signs.some(item => item.id === id), `${id} missing`);
    }
    const stvo = require('../../../apps/fahrlehrer-pruefung/public/data/signs-stvo.js');
    const curated = require('../../../apps/fahrlehrer-pruefung/public/data/signs.js');
    const stvoIds = new Set(stvo.signs.map(item => item.id));
    for (const item of curated.signs) assert.ok(stvoIds.has(item.id), `curated ${item.id} has no StVO card`);
    const ids = data.questions.map(item => item.id);
    assert.strictEqual(new Set(ids).size, ids.length, 'question ids are unique');
    for (const item of data.questions) {
      const ev = Core.evaluateAnswer(item, item.modelAnswer);
      assert.deepStrictEqual(ev.wrong, [], `${item.id} model answer flagged as wrong: ${ev.wrong.join(', ')}`);
    }
  }));

  results.push(test('question bank includes the uploaded exam and technology questions', () => {
    assert.strictEqual(data.questions.filter(x => x.id.startsWith('mp-')).length, 38);
    assert.ok(data.questions.filter(x => x.id.startsWith('tk-')).length >= 35);
  }));

  // --- evaluation ---

  results.push(test('short keywords and numbers only match whole words', () => {
    const item = q('vz-274');
    assert.ok(!Core.evaluateAnswer(item, 'Das Zeichen 2740 gibt es nicht').covered.includes('Name: Zulässige Höchstgeschwindigkeit'));
    assert.ok(Core.evaluateAnswer(item, 'Zeichen 274, Tempolimit').covered.includes('Name: Zulässige Höchstgeschwindigkeit'));
    const classes = q('mp-02');
    assert.ok(!Core.evaluateAnswer(classes, 'beim Anhänger bei Bedarf').covered.includes('BE'));
    assert.ok(Core.evaluateAnswer(classes, 'Klasse BE für Anhänger').covered.includes('BE'));
  }));

  results.push(test('signs need no paragraph references and wait signs are Vorschriftzeichen', () => {
    for (const item of data.signs) {
      for (const point of item.keyPoints) {
        assert.ok(!/^(?:\d+\.\s*)?§/.test(point.label), `${item.id} key point is a paragraph reference`);
        assert.ok(point.keywords.every(word => !word.includes('§')), `${item.id} expects a paragraph`);
      }
      assert.ok(!/\(Anlage \d\)|§ 40 Absatz/.test(item.category), `${item.id} category still cites the law`);
    }
    for (const id of ['vz-205', 'vz-206', 'vz-208']) {
      const sign = data.questions.find(x => x.id === id);
      assert.ok(sign.category.startsWith('Vorschriftzeichen'), `${id} category`);
      const wrong = Core.evaluateAnswer(sign, 'Das ist ein Vorrangzeichen.').wrong;
      assert.ok(wrong.some(label => label.includes('Vorschriftzeichen')), `${id} flags Vorrangzeichen`);
      assert.deepStrictEqual(Core.evaluateAnswer(sign, 'Ein Vorschriftzeichen, kein Vorrangzeichen.').wrong, []);
    }
  }));

  results.push(test('sign kind counts: right kind is a key point, a wrong kind is an error', () => {
    const KINDS = { Gefahrzeichen: 'gefahrzeichen', Vorschriftzeichen: 'vorschriftzeichen', Richtzeichen: 'richtzeichen', Verkehrseinrichtung: 'verkehrseinrichtung' };
    const examples = { Gefahrzeichen: 'vz-101', Vorschriftzeichen: 'vz-205', Richtzeichen: 'vz-306', Verkehrseinrichtung: 'vz-605' };
    for (const [kind, id] of Object.entries(examples)) {
      const sign = data.questions.find(x => x.id === id);
      const right = Core.evaluateAnswer(sign, `Das ist ein ${kind}.`);
      assert.ok(right.covered.includes(`Zeichenart: ${kind}`), `${id} right kind not counted`);
      assert.deepStrictEqual(right.wrong, [], `${id} right kind flagged`);
      for (const other of Object.keys(KINDS).filter(k => k !== kind)) {
        const result = Core.evaluateAnswer(sign, `Das ist ein ${other}.`);
        assert.ok(result.wrong.some(label => label.startsWith('Falsche Zeichenart')), `${id} as ${other} not flagged`);
        assert.ok(result.score < right.score, `${id} wrong kind must lower the score`);
        assert.deepStrictEqual(Core.evaluateAnswer(sign, `Das ist kein ${other}.`).wrong, [], `${id} negation`);
      }
    }
    const sign274 = data.questions.find(x => x.id === 'vz-274');
    assert.deepStrictEqual(Core.evaluateAnswer(sign274, 'Vorschriftzeichen; endet zusammen mit einem Gefahrzeichen nach der Gefahrstelle.').wrong, []);
    assert.ok(Core.evaluateAnswer(sign274, 'Endet mit einem Gefahrzeichen. Das ist ein Gefahrzeichen.').wrong.length > 0, 'later assertion after a context mention');
    for (const item of data.signs.filter(x => !x.category.startsWith('Zusatzzeichen'))) {
      assert.ok(item.keyPoints.some(point => point.label.startsWith('Zeichenart: ')), `${item.id} has no kind key point`);
    }
  }));

  results.push(test('wrong claims are detected unless negated', () => {
    const stop = q('vz-206');
    const wrong = Core.evaluateAnswer(stop, 'Stoppschild, Vorfahrt gewähren, langsames Durchrollen reicht.');
    assert.strictEqual(wrong.wrong.length, 1);
    const right = Core.evaluateAnswer(stop, 'Stoppschild: immer anhalten, nicht durchrollen, Vorfahrt gewähren.');
    assert.deepStrictEqual(right.wrong, []);
    assert.ok(right.score > wrong.score);
    const slope = q('vz-108');
    assert.deepStrictEqual(Core.evaluateAnswer(slope, 'Gefälle, nicht zu verwechseln mit Steigung').wrong, []);
    assert.strictEqual(Core.evaluateAnswer(slope, 'Das ist eine Steigung').wrong.length, 1);
  }));

  results.push(test('evaluateAnswer detects covered and missing key points', () => {
    const ev = Core.evaluateAnswer(q('technik-01'), 'Der Anhalteweg ist Reaktionsweg plus Bremsweg. Bei einer Gefahrbremsung halbiert sich der Bremsweg.');
    assert.ok(ev.covered.includes('Reaktionsweg + Bremsweg'));
    assert.ok(ev.covered.includes('Gefahrbremsung: halbieren'));
    assert.ok(ev.missing.includes('Einflussfaktoren'));
    assert.ok(ev.score > 0 && ev.score < 1);
  }));

  results.push(test('evaluateAnswer handles umlauts and empty answers', () => {
    assert.strictEqual(Core.normalize('Überholen Straße'), 'ueberholen strasse');
    const ev = Core.evaluateAnswer(q('verhalten-01'), '');
    assert.strictEqual(ev.score, 0);
    assert.strictEqual(ev.covered.length, 0);
  }));

  results.push(test('combineScores prefers AI and falls back to average', () => {
    assert.strictEqual(Core.combineScores({ ai: 0.8, self: 1, auto: 0 }), 0.84);
    assert.strictEqual(Core.combineScores({ self: 1, auto: 0.5 }), 0.75);
    assert.strictEqual(Core.combineScores({ self: 0 }), 0);
  }));

  // --- state, mastery, spaced repetition ---

  results.push(test('recordAttempt is immutable and tracks daily activity', () => {
    const s0 = Core.createState();
    const s1 = Core.recordAttempt(s0, 'recht-02', { score: 0.8, source: 'auto', missed: ['x'] }, NOW);
    assert.deepStrictEqual(s0.attempts, {});
    assert.strictEqual(s1.attempts['recht-02'].length, 1);
    assert.strictEqual(s1.daily[Core.dateKey(NOW)].answered, 1);
    assert.strictEqual(s1.seen['recht-02'], NOW);
  }));

  results.push(test('questionMastery weights recent attempts and decays slowly', () => {
    assert.strictEqual(Core.questionMastery([], NOW), null);
    const attempts = [{ ts: NOW - DAY, score: 0 }, { ts: NOW, score: 1 }];
    assert.strictEqual(Core.questionMastery(attempts, NOW), 0.67);
    const old = [{ ts: NOW - 60 * DAY, score: 1 }];
    assert.ok(Core.questionMastery(old, NOW) < 1);
    assert.ok(Core.questionMastery(old, NOW) >= 0.7);
  }));

  results.push(test('leitnerBox and isDue follow the review intervals', () => {
    const good = [{ ts: NOW, score: 1 }, { ts: NOW, score: 1 }];
    assert.strictEqual(Core.leitnerBox(good), 3);
    assert.strictEqual(Core.isDue(good, NOW + 3 * DAY), false);
    assert.strictEqual(Core.isDue(good, NOW + 4 * DAY), true);
    assert.strictEqual(Core.isDue([{ ts: NOW, score: 0.2 }], NOW + 1000), false);
    assert.strictEqual(Core.leitnerBox(good.concat({ ts: NOW, score: 0.2 })), 1);
  }));

  // --- progress separation ---

  results.push(test('learning progress and knowledge are reported separately', () => {
    let s = Core.createState();
    s = Core.recordAttempt(s, 'zeichen-01', { score: 1 }, NOW);
    const stats = Core.subjectStats(data, s, NOW).find(x => x.subject.id === 'zeichen');
    const total = data.questions.filter(x => x.subject === 'zeichen').length;
    assert.strictEqual(stats.worked, 1);
    assert.strictEqual(stats.learningProgress, Math.round((1 / total) * 100) / 100);
    assert.strictEqual(stats.knowledge, 1);
    assert.ok(stats.readiness < stats.knowledge);
    const empty = Core.subjectStats(data, s, NOW).find(x => x.subject.id === 'recht');
    assert.strictEqual(empty.knowledge, null);
    assert.strictEqual(empty.learningProgress, 0);
  }));

  // --- weakness analysis & daily plan ---

  results.push(test('weaknessAnalysis lists weak topics and missed points', () => {
    let s = Core.createState();
    s = Core.recordAttempt(s, 'recht-02', { score: 0.2, missed: ['Aufbauseminar'] }, NOW);
    s = Core.recordAttempt(s, 'technik-01', { score: 0.9, missed: [] }, NOW);
    const a = Core.weaknessAnalysis(data, s, NOW);
    assert.strictEqual(a.weakTopics[0].topic, 'Probezeit');
    assert.strictEqual(a.missedPoints[0].label, 'Aufbauseminar');
    assert.ok(a.advice.length >= 1);
    assert.ok(a.openTopics.length > 0);
  }));

  results.push(test('dailyPlan prioritises due weak questions and is stable per day', () => {
    let s = Core.createState();
    s = Core.recordAttempt(s, 'recht-03', { score: 0.1 }, NOW - 2 * DAY);
    const plan = Core.dailyPlan(data, s, NOW, 6);
    assert.strictEqual(plan.items.length, 6);
    assert.strictEqual(plan.items[0].questionId, 'recht-03');
    assert.strictEqual(new Set(plan.items.map(i => i.questionId)).size, 6);
    const again = Core.dailyPlan(data, s, NOW + 1000, 6);
    assert.deepStrictEqual(again.items, plan.items);
  }));

  results.push(test('streak counts consecutive learning days', () => {
    let s = Core.createState();
    s = Core.recordAttempt(s, 'zeichen-01', { score: 1 }, NOW - 2 * DAY);
    s = Core.recordAttempt(s, 'zeichen-02', { score: 1 }, NOW - DAY);
    assert.strictEqual(Core.streak(s, NOW), 2);
    s = Core.recordAttempt(s, 'zeichen-03', { score: 1 }, NOW);
    assert.strictEqual(Core.streak(s, NOW), 3);
  }));

  // --- exam simulation ---

  results.push(test('pickExamQuestions picks one question per subject', () => {
    const ids = Core.pickExamQuestions(data, Core.createState(), NOW, 6);
    const subjects = new Set(ids.map(id => q(id).subject));
    assert.strictEqual(ids.length, 6);
    assert.strictEqual(subjects.size, 6);
    const noSigns = Core.pickExamQuestions(data, Core.createState(), NOW, 6, { excludeSigns: true });
    assert.ok(noSigns.every(id => !q(id).sign));
  }));

  results.push(test('examinerFollowUp probes missing points on weak answers', () => {
    const item = q('verhalten-02');
    const weak = Core.evaluateAnswer(item, 'Man fährt zur Seite.');
    assert.ok(Core.examinerFollowUp(item, weak, 0).includes(weak.missing[0]));
    const strong = Core.evaluateAnswer(item, item.modelAnswer);
    assert.strictEqual(Core.examinerFollowUp(item, strong, 0), item.followUps[0]);
  }));

  results.push(test('examVerdict grades the simulation', () => {
    assert.strictEqual(Core.examVerdict([0.9, 0.8, 0.85]).passed, true);
    assert.strictEqual(Core.examVerdict([0.2, 0.3, 0.9]).passed, false);
    assert.strictEqual(Core.examVerdict([]).passed, false);
  }));

  results.push(test('migrateState repairs invalid stored data', () => {
    const s = Core.migrateState({ attempts: [], settings: { dailyGoal: 12 } });
    assert.deepStrictEqual(s.attempts, {});
    assert.strictEqual(s.settings.dailyGoal, 12);
    assert.deepStrictEqual(Core.migrateState(null), Core.createState());
  }));

  const passed = results.filter(Boolean).length;
  const failed = results.length - passed;
  console.log(`\nResults: Passed: ${passed}, Failed: ${failed}`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests();
