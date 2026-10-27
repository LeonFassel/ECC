/**
 * Tests for apps/fahrlehrer-pruefung/public/core/games-core.js
 *
 * Run with: node tests/apps/fahrlehrer-pruefung/games.test.js
 */

const assert = require('assert');

const G = require('../../../apps/fahrlehrer-pruefung/public/core/games-core');

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

function card(id, deck, mc) {
  return { id, deck, collection: 'karteikarten', question: `Frage ${id}?`, modelAnswer: 'Antwort', mc };
}

const mc = { prompt: 'Welche?', options: [{ text: 'A', correct: true }, { text: 'B', correct: false }, { text: 'C', correct: true }, { text: 'D', correct: false }] };
const data = {
  questions: [
    card('kk-p-002', 'paedagogik', mc),
    card('kk-p-003', 'paedagogik', null),
    card('kk-r-002', 'recht', mc),
    card('kk-r-003', 'recht', null),
    { id: 'mp-01', subject: 'recht', question: 'x' }
  ],
  games: {
    pairs: [
      { deck: 'paedagogik', cardId: 'kk-p-002', left: 'Sachebene', right: 'Inhalt der Nachricht' },
      { deck: 'paedagogik', cardId: 'kk-p-002', left: 'Appellebene', right: 'Was soll der Empfänger tun' },
      { deck: 'paedagogik', cardId: 'kk-p-003', left: 'Lernziel', right: 'Angestrebtes Verhalten' },
      { deck: 'recht', cardId: 'kk-r-002', left: 'Probezeit', right: '2 Jahre' },
      { deck: 'recht', cardId: 'kk-r-003', left: 'Mindestalter Fahrlehrer', right: '21 Jahre' },
      { deck: 'recht', cardId: 'kk-r-004', left: 'Begleitperson BF17', right: '30 Jahre' },
      { deck: 'recht', cardId: 'kk-r-005', left: 'Doppelt', right: '2 jahre' }
    ],
    sequences: [{ deck: 'paedagogik', cardId: 'kk-p-003', title: 'Stufen', steps: ['Eins', 'Zwei', 'Drei'] }]
  }
};

function runTests() {
  console.log('\n=== Testing fahrlehrer-pruefung games-core ===\n');
  const results = [];

  results.push(test('pool keeps only flashcards and game data of the deck', () => {
    const p = G.pool(data, 'paedagogik');
    assert.deepStrictEqual(p.cards.map(c => c.id), ['kk-p-002', 'kk-p-003']);
    assert.deepStrictEqual(p.mcCards.map(c => c.id), ['kk-p-002']);
    assert.strictEqual(p.pairs.length, 3);
    assert.strictEqual(p.sequences.length, 1);
    assert.strictEqual(G.pool(data, 'alle').cards.length, 4);
  }));

  results.push(test('statements come from checked multiple choice options', () => {
    const list = G.statements(G.pool(data, 'paedagogik').mcCards);
    assert.deepStrictEqual(list.map(s => [s.text, s.correct]), [['A', true], ['B', false], ['C', true], ['D', false]]);
    const picked = G.pickStatements(list, 4, G.seeded('x'));
    assert.strictEqual(picked.length, 4);
    assert.strictEqual(new Set(picked.map(s => s.key)).size, 4);
  }));

  results.push(test('pairs are unambiguous: one per card and no duplicate texts', () => {
    const picked = G.pickPairs(data.games.pairs.filter(p => p.deck === 'recht'), 10, G.seeded('y'));
    const rights = picked.map(p => p.right.toLowerCase());
    assert.strictEqual(new Set(rights).size, rights.length, 'no duplicate answers');
    assert.ok(!(rights.includes('2 jahre') && picked.length === 4), 'duplicate "2 Jahre" is skipped');
    const per = G.pickPairs(data.games.pairs.filter(p => p.deck === 'paedagogik'), 10, G.seeded('z'));
    assert.strictEqual(new Set(per.map(p => p.cardId)).size, per.length, 'one pair per card');
  }));

  results.push(test('memory tiles contain both sides of every pair', () => {
    const pairs = G.pickPairs(data.games.pairs, 3, G.seeded('m'));
    const tiles = G.memoryTiles(pairs, G.seeded('m'));
    assert.strictEqual(tiles.length, pairs.length * 2);
    for (let i = 0; i < pairs.length; i++) {
      assert.deepStrictEqual(tiles.filter(t => t.pair === i).map(t => t.side).sort(), ['left', 'right']);
    }
  }));

  results.push(test('stars and fractions', () => {
    assert.strictEqual(G.stars(1), 3);
    assert.strictEqual(G.stars(0.75), 2);
    assert.strictEqual(G.stars(0.5), 1);
    assert.strictEqual(G.stars(0.1), 0);
    assert.strictEqual(G.memoryFraction(6, 6), 1);
    assert.ok(G.memoryFraction(6, 12) < G.memoryFraction(6, 8));
    assert.strictEqual(G.memoryFraction(6, 0), 0);
    assert.strictEqual(G.mistakeFraction(5, 0), 1);
    assert.strictEqual(G.mistakeFraction(5, 9), 0);
  }));

  results.push(test('mix never repeats a round type back to back and skips missing data', () => {
    const rounds = G.buildMix(G.pool(data, 'paedagogik'), 12, G.seeded('mix'));
    assert.strictEqual(rounds.length, 12);
    for (let i = 1; i < rounds.length; i++) assert.notStrictEqual(rounds[i].type, rounds[i - 1].type);
    assert.ok(!rounds.some(r => r.type === 'match'), 'not enough pairs for a match round');
    for (const round of rounds) {
      if (round.type === 'mc') assert.strictEqual(round.cardId, 'kk-p-002');
      if (round.type === 'flip') assert.strictEqual(round.cardId, 'kk-p-003');
      if (round.type === 'truth') assert.strictEqual(round.items.length, 3);
      if (round.type === 'order') assert.strictEqual(round.sequence.title, 'Stufen');
    }
    assert.deepStrictEqual(G.buildMix({ cards: [], mcCards: [], pairs: [], sequences: [] }, 5), []);
  }));

  const passed = results.filter(Boolean).length;
  const failed = results.length - passed;
  console.log(`\nResults: Passed: ${passed}, Failed: ${failed}`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests();
