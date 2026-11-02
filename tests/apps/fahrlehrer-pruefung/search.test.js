/**
 * Tests for apps/fahrlehrer-pruefung/public/core/search-core.js
 *
 * Run with: node tests/apps/fahrlehrer-pruefung/search.test.js
 */

const assert = require('assert');

const Search = require('../../../apps/fahrlehrer-pruefung/public/core/search-core');

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

const data = {
  subjects: [{ id: 'recht', name: 'Recht' }, { id: 'paedagogik', name: 'Pädagogik' }, { id: 'zeichen', name: 'Verkehrszeichen' }, { id: 'karteikarten', name: 'Karteikarten' }],
  questions: [
    {
      id: 'r-1', subject: 'recht', topic: 'Abmessungen', question: 'Welche maximalen Abmessungen gelten für Pkw und Anhänger?',
      modelAnswer: 'Rechtsgrundlage: § 32 StVZO.\n– Länge: Einzelfahrzeug höchstens 12,00 m.\n– Fahrzeugkombination: Kfz mit Anhänger höchstens 18,00 m.\n– Breite: Pkw höchstens 2,50 m.',
      keyPoints: [{ label: 'Kombination 18 m' }]
    },
    {
      id: 'r-2', subject: 'recht', topic: 'Kindersitze', question: 'Was ist bei der Mitnahme von Kindern zu beachten?',
      modelAnswer: 'Kinder bis 12 Jahre und kleiner als 150 cm brauchen einen Kindersitz (§ 21 Abs. 1a StVO).\nLängeres rückwärtsgerichtetes Fahren ist sicherer.',
      keyPoints: [{ label: 'Kindersitz' }]
    },
    {
      id: 'p-1', subject: 'paedagogik', topic: 'Kommunikation', question: 'Erklären Sie das Vier-Ohren-Modell!',
      modelAnswer: 'Das Kommunikationsquadrat nach Schulz von Thun unterscheidet Sachebene, Beziehungsebene, Selbstkundgabe und Appell.',
      keyPoints: [{ label: 'Vier Seiten einer Nachricht' }]
    },
    {
      id: 'kk-p-1', subject: 'karteikarten', collection: 'karteikarten', deckName: 'Pädagogik', topic: 'Kommunikation', question: 'Erklären Sie das Vier-Ohren-Modell!',
      modelAnswer: 'Sachebene, Beziehungsebene, Selbstkundgabe, Appell.'
    },
    {
      id: 'vz-205', subject: 'zeichen', sign: '205', signLabel: 'Zeichen 205', name: 'Vorfahrt gewähren', topic: 'Zeichen 205 – Vorfahrt gewähren',
      question: 'Welches Verkehrszeichen ist das?', modelAnswer: 'Wer ein Fahrzeug führt, muss Vorfahrt gewähren.', official: [{ type: 'gebot', text: 'Vorfahrt gewähren.' }]
    },
    {
      id: 'vz-1012', subject: 'zeichen', sign: '1012-31', signLabel: 'Zusatzzeichen 1012-31', name: 'Abknickende Vorfahrt (zu Zeichen 205)', topic: 'Zusatzzeichen',
      question: 'Was bedeutet dieses Zusatzzeichen?', modelAnswer: 'Zusammen mit Zeichen 205 zeigt es den Verlauf der Vorfahrtstraße.'
    }
  ]
};

function runTests() {
  console.log('\n=== Testing fahrlehrer-pruefung search-core ===\n');
  const results = [];
  const index = Search.createIndex(data);

  results.push(test('query words: filler words dropped, adjectives mapped to answer terms', () => {
    const groups = Search.queryTerms('Wie lang darf eine Fahrzeugkombination sein?');
    assert.deepStrictEqual(groups.map(g => g.word), ['lang', 'fahrzeugkombination']);
    assert.ok(groups[0].variants.includes('laeng'), 'Wortstamm von Länge');
    assert.strictEqual(Search.normalize('Länge Größe §32'), 'laenge groesse § 32');
  }));

  results.push(test('natural question finds the answer with the paragraph', () => {
    const found = Search.search(index, 'Wie lang darf eine Fahrzeugkombination sein?');
    assert.strictEqual(found.results[0].id, 'r-1');
    assert.ok(found.results[0].laws.includes('§ 32 StVZO'));
    assert.ok(found.results[0].complete);
    const lines = Search.answerLines(found.results[0].question.modelAnswer, found.terms, 3);
    assert.ok(lines.some(l => l.includes('18,00 m')), 'answer line with the length');
    // "lang" darf nicht als Wortteil von "Längeres" in einer fremden Antwort zählen.
    assert.ok(!found.results.some(r => r.id === 'r-2' && r.complete));
  }));

  results.push(test('duplicate flashcard of a subject question appears once', () => {
    const found = Search.search(index, 'Vier-Ohren-Modell');
    assert.deepStrictEqual(found.results.map(r => r.id), ['p-1']);
  }));

  results.push(test('sign number ranks the sign itself first', () => {
    const found = Search.search(index, 'Zeichen 205');
    assert.strictEqual(found.results[0].id, 'vz-205');
    assert.strictEqual(found.results[1].id, 'vz-1012');
  }));

  results.push(test('subject names and empty queries', () => {
    assert.ok(Search.search(index, 'Pädagogik').results.some(r => r.id === 'p-1'));
    assert.deepStrictEqual(Search.search(index, 'wie ist das').results, []);
    assert.deepStrictEqual(Search.search(index, '').results, []);
    assert.deepStrictEqual(Search.search(index, 'Quantenphysik').results, []);
  }));

  results.push(test('law references and highlighting', () => {
    assert.deepStrictEqual(Search.lawReferences('Nach § 2a Abs. 1 StVG und Anlage 12 FeV sowie Zeichen 205.'), ['§ 2a Abs. 1 StVG', 'Anlage 12 FeV', 'Zeichen 205']);
    const parts = Search.highlight('Die Fahrzeugkombination darf 18 m lang sein.', Search.queryTerms('Fahrzeugkombination lang').map(g => g.variants));
    assert.deepStrictEqual(parts.filter(p => p.mark).map(p => p.text), ['Fahrzeugkombination', 'lang']);
    assert.strictEqual(parts.map(p => p.text).join(''), 'Die Fahrzeugkombination darf 18 m lang sein.');
  }));

  const passed = results.filter(Boolean).length;
  const failed = results.length - passed;
  console.log(`\nResults: Passed: ${passed}, Failed: ${failed}`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests();
