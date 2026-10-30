/**
 * Tests for apps/fahrlehrer-pruefung/public/core/learning-core.js
 * and the question bank in apps/fahrlehrer-pruefung/public/data/questions.js
 *
 * Run with: node tests/apps/fahrlehrer-pruefung/learning-core.test.js
 */

const assert = require('assert');
const path = require('path');

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
    // Das Fach "Karteikarten" erscheint nur, wenn Karten eingebaut sind (siehe eigener Test).
    const ids = data.subjects.map(s => s.id).filter(id => id !== 'karteikarten').sort();
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
      // Karteikarten geben Vorder- und Rückseite der Karte wieder, ebenfalls ohne eigene Erklärung.
      const compact = item.signLabel || item.collection === 'karteikarten';
      const fields = compact ? ['question', 'modelAnswer'] : ['question', 'explanation', 'example', 'modelAnswer'];
      for (const field of fields) {
        assert.ok(typeof item[field] === 'string' && item[field].length > 10, `${item.id}.${field}`);
      }
      assert.ok(item.topic && item.topic.length >= 3, `${item.id}.topic`);
      assert.ok(item.keyPoints.length >= (compact ? 1 : 3), `${item.id} keyPoints`);
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

  results.push(test('flashcards form their own subject with decks as subcategories', () => {
    const dataDir = path.join(__dirname, '../../../apps/fahrlehrer-pruefung/public/data');
    const deckFile = require.resolve(path.join(dataDir, 'questions-karteikarten.js'));
    const oralFile = require.resolve(path.join(dataDir, 'questions-msammlung.js'));
    const bankFile = require.resolve(path.join(dataDir, 'questions.js'));
    const saved = { deck: require.cache[deckFile], oral: require.cache[oralFile], bank: require.cache[bankFile] };
    const card = (id, deck, topic) => ({
      id, collection: 'karteikarten', subject: 'karteikarten', deck, deckName: deck, card: 2, cardOf: 3, topic,
      question: 'Frage der Vorderseite?', modelAnswer: 'Antwort der Rückseite.',
      keyPoints: [{ label: 'Rückseite', keywords: ['rückseite'] }], followUps: ['Nachfrage?'], difficulty: 1
    });
    try {
      require.cache[deckFile] = { id: deckFile, filename: deckFile, loaded: true, exports: {
        decks: [{ id: 'paedagogik', name: 'Pädagogik' }, { id: 'recht', name: 'Recht' }, { id: 'technik', name: 'Technik' }],
        questions: [card('kk-p-002', 'paedagogik', 'Kommunikation'), card('kk-p-003', 'paedagogik', 'Kommunikation')]
      } };
      // Mündliche Sammlung: neue Frage im Fach und als Karte im passenden Stapel.
      const oralCard = Object.assign(card('kk-ms-001', 'recht', 'Mündliche Sammlung: FeV'), { cardLabel: 'Mündliche Sammlung Nr. 1' });
      const oralQuestion = Object.assign({}, oralCard, { id: 'ms-001', collection: 'msammlung', subject: 'recht', topic: 'Fahrerlaubnis' });
      require.cache[oralFile] = { id: oralFile, filename: oralFile, loaded: true, exports: { questions: [oralQuestion], flashcards: [oralCard] } };
      delete require.cache[bankFile];
      const withCards = require(bankFile);
      const subject = withCards.subjects.find(s => s.id === 'karteikarten');
      assert.ok(subject, 'subject missing');
      assert.ok(subject.description.includes('Pädagogik') && subject.description.includes('Recht') && !subject.description.includes('Technik'), 'empty decks are hidden');
      assert.deepStrictEqual(withCards.decks.map(d => d.id), ['paedagogik', 'recht']);
      assert.strictEqual(withCards.questions.filter(x => x.subject === 'karteikarten').length, 3);
      assert.strictEqual(withCards.questions.find(x => x.id === 'ms-001').subject, 'recht');
    } finally {
      if (saved.deck) require.cache[deckFile] = saved.deck; else delete require.cache[deckFile];
      if (saved.oral) require.cache[oralFile] = saved.oral; else delete require.cache[oralFile];
      if (saved.bank) require.cache[bankFile] = saved.bank; else delete require.cache[bankFile];
    }
    const placeholder = require(deckFile);
    if (placeholder.questions.length === 0) {
      assert.ok(!data.subjects.some(s => s.id === 'karteikarten'), 'no subject without cards');
    }
  }));

  results.push(test('multiple choice scores exact answers fully and penalises wrong ticks', () => {
    const item = { mc: { prompt: 'Welche?', options: [
      { text: 'A', correct: true }, { text: 'B', correct: false }, { text: 'C', correct: true }, { text: 'D', correct: false }
    ] } };
    const exact = Core.evaluateChoice(item, [2, 0]);
    assert.strictEqual(exact.score, 1);
    assert.ok(exact.exact);
    const half = Core.evaluateChoice(item, [0]);
    assert.strictEqual(half.score, 0.5);
    assert.deepStrictEqual(half.missedLabels, ['C']);
    const mixed = Core.evaluateChoice(item, [0, 2, 1]);
    assert.ok(!mixed.exact && mixed.score < 1, 'a wrong tick is never full marks');
    assert.deepStrictEqual(mixed.wrong, [1]);
    assert.strictEqual(Core.evaluateChoice(item, []).score, 0);
    assert.strictEqual(Core.evaluateChoice(item, [1, 3]).score, 0);
    assert.strictEqual(Core.evaluateChoice(item, [9, -1]).score, 0, 'invalid indices are ignored');
  }));

  results.push(test('multiple choice cards have a prompt, right and wrong options', () => {
    for (const item of data.questions.filter(x => x.mc)) {
      assert.strictEqual(item.collection, 'karteikarten', `${item.id} multiple choice only for flashcards`);
      assert.ok(/\?$/.test(item.mc.prompt), `${item.id} prompt`);
      const options = item.mc.options;
      assert.ok(options.length >= 4 && options.length <= 8, `${item.id} option count`);
      assert.ok(options.filter(o => o.correct).length >= 1, `${item.id} needs a right option`);
      assert.ok(options.filter(o => !o.correct).length >= 2, `${item.id} needs wrong options`);
      const texts = options.map(o => o.text.toLowerCase());
      assert.strictEqual(new Set(texts).size, texts.length, `${item.id} duplicate options`);
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

  results.push(test('freshOrder puts unseen questions first and recently seen ones last', () => {
    let s = Core.createState();
    s = Core.recordAttempt(s, 'q-old', { score: 1 }, NOW - 30 * DAY);
    s = Core.markShown(s, 'q-recent', NOW);
    s = Core.markSeen(s, 'q-mid', NOW - 5 * DAY);
    assert.strictEqual(Core.lastSeenAt(s, 'q-recent'), NOW);
    assert.strictEqual(Core.lastSeenAt(s, 'q-new'), 0);
    const ids = ['q-recent', 'q-mid', 'q-old', 'q-new', 'q-new2'];
    for (let i = 0; i < 20; i++) {
      const order = Core.freshOrder(ids, s);
      assert.deepStrictEqual(order.slice().sort(), ids.slice().sort());
      assert.deepStrictEqual(order.slice(0, 2).sort(), ['q-new', 'q-new2']);
    }
    // Viele gesehene Fragen: die zuletzt gezeigten landen fast immer in der hinteren Hälfte.
    let many = Core.createState();
    const seenIds = Array.from({ length: 40 }, (_, i) => `s-${i}`);
    seenIds.forEach((id, i) => { many = Core.markShown(many, id, NOW - (40 - i) * 1000); });
    const order = Core.freshOrder(seenIds, many);
    assert.ok(order.indexOf('s-39') >= 20 && order.indexOf('s-0') < 20, 'stale first, recent last');
    const again = Core.freshOrder(seenIds, many);
    assert.notDeepStrictEqual(order, again, 'not the same order every time');
    assert.deepStrictEqual(Core.migrateState({ lastSeen: { a: 1 } }).lastSeen, { a: 1 });
    assert.deepStrictEqual(Core.migrateState({ lastSeen: [] }).lastSeen, {});
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

  results.push(test('exam panel: three examiners with their own subjects', () => {
    assert.deepStrictEqual(Core.EXAM_PANEL.map(s => s.examiner), ['Rechtler', 'Pädagoge', 'Techniker']);
    assert.strictEqual(Core.examPanelFor({ subject: 'zeichen' }), 'recht');
    assert.strictEqual(Core.examPanelFor({ subject: 'verhalten', topic: 'Abstand' }), 'recht');
    assert.strictEqual(Core.examPanelFor({ subject: 'recht', topic: 'Pflichten des Fahrlehrers' }), 'paedagogik');
    assert.strictEqual(Core.examPanelFor({ subject: 'recht', topic: 'Fahrlehrerregister' }), 'recht');
    assert.strictEqual(Core.examPanelFor({ subject: 'praxis', topic: 'Sonderfahrten' }), 'paedagogik');
    assert.strictEqual(Core.examPanelFor({ subject: 'technik' }), 'technik');
    assert.strictEqual(Core.examPanelFor({ subject: 'karteikarten', collection: 'karteikarten' }), null);
    const panel = Core.buildExamPanel(data, Core.createState(), NOW, 6);
    assert.deepStrictEqual(panel.map(s => s.id), ['recht', 'paedagogik', 'technik']);
    for (const section of panel) {
      assert.ok(section.ids.length > 0 && section.ids.length <= 6);
      assert.strictEqual(new Set(section.ids).size, section.ids.length);
      assert.ok(section.ids.every(id => Core.examPanelFor(q(id)) === section.id), `${section.id} only asks its own subjects`);
    }
    const recht = panel[0].ids.map(id => q(id));
    if (recht.some(x => x.subject === 'zeichen')) assert.ok(recht[0].subject !== 'zeichen', 'starts with a law question');
  }));

  results.push(test('oral exam grades per examiner and overall', () => {
    assert.deepStrictEqual([0.92, 0.915, 0.81, 0.67, 0.5, 0.3, 0.29, 0].map(Core.gradeFromScore), [1, 1, 2, 3, 4, 5, 6, 6]);
    const sections = [
      { id: 'recht', name: 'Recht', examiner: 'Rechtler', startedAt: 1, results: [{ score: 1 }, { score: 0.8 }] },
      { id: 'paedagogik', name: 'Pädagogik', examiner: 'Pädagoge', startedAt: 2, results: [{ score: 0.6 }] },
      { id: 'technik', name: 'Technik', examiner: 'Techniker', startedAt: 3, results: [] }
    ];
    const g = Core.oralExamGrades(sections);
    assert.deepStrictEqual(g.parts.map(p => [p.percent, p.grade]), [[90, 2], [60, 4], [0, 6]]);
    assert.strictEqual(g.average, 4);
    assert.strictEqual(g.percent, 80);
    assert.strictEqual(g.passed, false, 'Technik 6');
    assert.strictEqual(g.complete, true);
    const aborted = Core.oralExamGrades([sections[0], Object.assign({}, sections[2], { startedAt: 0 })]);
    assert.strictEqual(aborted.parts[1].grade, null);
    assert.strictEqual(aborted.average, 2);
    assert.strictEqual(aborted.complete, false);
    assert.strictEqual(aborted.passed, false);
    const good = Core.oralExamGrades([sections[0], Object.assign({}, sections[1], { results: [{ score: 0.7 }] })]);
    assert.strictEqual(good.average, 2.5);
    assert.strictEqual(good.passed, true);
  }));

  results.push(test('multi-part questions are asked one part at a time', () => {
    assert.deepStrictEqual(Core.splitQuestionParts('Was ist Aquaplaning?'), ['Was ist Aquaplaning?']);
    assert.deepStrictEqual(Core.splitQuestionParts('Einleitung.\na) Erste Frage?\nb) Zweite Frage?\nmit Zusatz'),
      ['Einleitung.\na) Erste Frage?', 'b) Zweite Frage?\nmit Zusatz']);
    assert.deepStrictEqual(Core.splitQuestionParts('a) Wann? b) Wie? c) Warum?'), ['a) Wann?', 'b) Wie?', 'c) Warum?']);
    assert.deepStrictEqual(Core.splitQuestionParts('A: Block eins?\nB: Block zwei\na) Teil?\nb) Teil zwei?'),
      ['A: Block eins?', 'B: Block zwei\na) Teil?', 'b) Teil zwei?']);
    assert.deepStrictEqual(Core.splitQuestionParts('1. Erstens?\n2. Zweitens?'), ['1. Erstens?', '2. Zweitens?']);
    // Ein einzelnes "a)" oder eine Zahl im Satz ist keine Gliederung.
    assert.deepStrictEqual(Core.splitQuestionParts('Nennen Sie a) ein Beispiel.'), ['Nennen Sie a) ein Beispiel.']);
    for (const item of data.questions) {
      const parts = Core.splitQuestionParts(item.question);
      assert.strictEqual(parts.join(' ').replace(/\s+/g, ''), item.question.replace(/\s+/g, ''), `${item.id}: no text lost`);
    }
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
