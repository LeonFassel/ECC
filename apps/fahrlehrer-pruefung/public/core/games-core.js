/**
 * Lernspiele zu den Karteikarten (ohne DOM): Runden zusammenstellen, Aussagen
 * für "Richtig oder falsch?" aus den geprüften Ankreuzfragen ableiten, Paare für
 * Memory und Zuordnen auswählen, Sterne vergeben.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FLGamesCore = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const GAMES = [
    { id: 'mix', name: 'Lern-Mix', text: 'Gemischte Runden: Ankreuzen, Richtig/Falsch, Zuordnen, Reihenfolge und Karten aufdecken.' },
    { id: 'memory', name: 'Memory', text: 'Finden Sie die Paare aus Begriff und Antwort.' },
    { id: 'blitz', name: 'Blitzrunde', text: '60 Sekunden: Stimmt die Aussage oder nicht?' },
    { id: 'match', name: 'Zuordnen', text: 'Ordnen Sie jedem Begriff die richtige Antwort zu.' },
    { id: 'order', name: 'Reihenfolge', text: 'Bringen Sie die Schritte eines Ablaufs in die richtige Reihenfolge.' }
  ];

  /** Zufallszahlen mit Startwert (für Tests reproduzierbar). */
  function seeded(seed) {
    let h = 2166136261;
    for (const ch of String(seed)) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
    return function () {
      h += 0x6d2b79f5;
      let t = h;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffle(list, rand) {
    const copy = list.slice();
    const r = rand || Math.random;
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  const norm = text => String(text || '').toLowerCase().replace(/\s+/g, ' ').trim();

  /** Schlüssel, unter denen sich die Spiele merken, was zuletzt dran war. */
  const keyOf = {
    card: card => `c:${card.id}`,
    pair: pair => `p:${pair.cardId}|${pair.left}`,
    statement: s => `s:${s.key}`,
    sequence: seq => `q:${seq.cardId}|${seq.title}`
  };

  /**
   * Zufällige Reihenfolge, in der zuletzt gespielte Einträge (recent) hinten stehen –
   * so kommen bei jeder Runde möglichst andere Fragen dran.
   */
  function freshFirst(list, key, recent, rand) {
    const mixed = shuffle(list, rand);
    if (!recent || !recent.size) return mixed;
    return mixed.filter(x => !recent.has(key(x))).concat(mixed.filter(x => recent.has(key(x))));
  }

  /** Karten und Spieldaten eines Stapels ("alle" = alle Stapel). */
  function pool(data, deck) {
    const inDeck = item => deck === 'alle' || item.deck === deck;
    const cards = (data.questions || []).filter(q => q.collection === 'karteikarten' && inDeck(q));
    const games = data.games || {};
    return {
      cards,
      mcCards: cards.filter(q => q.mc && Array.isArray(q.mc.options) && q.mc.options.length),
      pairs: (games.pairs || []).filter(inDeck),
      sequences: (games.sequences || []).filter(inDeck)
    };
  }

  /** Jede Antwortmöglichkeit einer geprüften Ankreuzfrage wird zu einer Aussage. */
  function statements(mcCards) {
    const list = [];
    for (const card of mcCards) {
      card.mc.options.forEach((option, index) => {
        list.push({ cardId: card.id, key: `${card.id}#${index}`, prompt: card.mc.prompt, text: option.text, correct: Boolean(option.correct) });
      });
    }
    return list;
  }

  /** Ausgewogene Mischung: etwa gleich viele richtige und falsche Aussagen. */
  function pickStatements(all, count, rand, recent) {
    const right = freshFirst(all.filter(s => s.correct), keyOf.statement, recent, rand);
    const wrong = freshFirst(all.filter(s => !s.correct), keyOf.statement, recent, rand);
    const out = [];
    while (out.length < count && (right.length || wrong.length)) {
      const takeRight = right.length && (!wrong.length || (rand || Math.random)() < 0.5);
      out.push(takeRight ? right.shift() : wrong.shift());
    }
    return out;
  }

  /**
   * Paare für Memory/Zuordnen: höchstens ein Paar je Karte und keine doppelten
   * Texte, damit jede Antwort eindeutig zu genau einem Begriff passt.
   */
  function pickPairs(pairs, count, rand, recent) {
    const out = [];
    const cards = new Set();
    const texts = new Set();
    for (const pair of freshFirst(pairs, keyOf.pair, recent, rand)) {
      if (out.length >= count) break;
      const l = norm(pair.left);
      const r = norm(pair.right);
      if (!l || !r || cards.has(pair.cardId) || texts.has(l) || texts.has(r)) continue;
      out.push(pair);
      cards.add(pair.cardId);
      texts.add(l);
      texts.add(r);
    }
    return out;
  }

  /** Memory-Karten: je Paar eine Begriffs- und eine Antwortkarte, gemischt. */
  function memoryTiles(pairs, rand) {
    const tiles = [];
    pairs.forEach((pair, i) => {
      tiles.push({ id: `${i}-l`, pair: i, side: 'left', text: pair.left });
      tiles.push({ id: `${i}-r`, pair: i, side: 'right', text: pair.right });
    });
    return shuffle(tiles, rand);
  }

  /** Sterne nach Anteil richtig (0..1). */
  function stars(fraction) {
    if (fraction >= 0.9) return 3;
    if (fraction >= 0.7) return 2;
    if (fraction >= 0.4) return 1;
    return 0;
  }

  /** Memory: Anteil aus Zügen – bestes Ergebnis = so viele Züge wie Paare. */
  function memoryFraction(pairCount, moves) {
    if (!moves) return 0;
    return Math.max(0, Math.min(1, 1 - (moves - pairCount) / (pairCount * 2)));
  }

  /** Anteil richtig, wenn Fehlversuche abgezogen werden (Zuordnen, Reihenfolge). */
  function mistakeFraction(items, mistakes) {
    if (!items) return 0;
    return Math.max(0, (items - mistakes) / items);
  }

  /**
   * Lern-Mix: Runden verschiedener Art, nie zweimal dieselbe Art hintereinander.
   * Arten ohne passende Daten im Stapel entfallen.
   */
  function buildMix(p, count, rand, recent) {
    const r = rand || Math.random;
    const truths = statements(p.mcCards);
    const freeCards = p.cards.filter(q => !q.mc);
    const kinds = [
      { type: 'mc', weight: 3, ok: p.mcCards.length > 0 },
      { type: 'truth', weight: 2, ok: truths.length >= 3 },
      { type: 'match', weight: 2, ok: pickPairs(p.pairs, 4, r).length >= 4 },
      { type: 'order', weight: 1, ok: p.sequences.length > 0 },
      { type: 'flip', weight: 2, ok: freeCards.length > 0 }
    ].filter(k => k.ok);
    if (!kinds.length) return [];
    const usedCards = new Set();
    const rounds = [];
    let last = null;
    for (let n = 0; n < count; n++) {
      const options = kinds.length > 1 ? kinds.filter(k => k.type !== last) : kinds;
      const total = options.reduce((sum, k) => sum + k.weight, 0);
      let pick = r() * total;
      const kind = options.find(k => (pick -= k.weight) < 0) || options[0];
      last = kind.type;
      rounds.push(makeRound(kind.type, { p, truths, freeCards, used: usedCards, rand: r, recent }));
    }
    return rounds;
  }

  function freshCard(list, used, rand, recent) {
    const unused = list.filter(q => !used.has(q.id));
    const card = freshFirst(unused.length ? unused : list, keyOf.card, recent, rand)[0];
    used.add(card.id);
    return card;
  }

  function makeRound(type, { p, truths, freeCards, used, rand, recent }) {
    if (type === 'mc') return { type, cardId: freshCard(p.mcCards, used, rand, recent).id };
    if (type === 'flip') return { type, cardId: freshCard(freeCards, used, rand, recent).id };
    if (type === 'truth') return { type, items: pickStatements(truths, 3, rand, recent) };
    if (type === 'match') return { type, pairs: pickPairs(p.pairs, 4, rand, recent) };
    return { type: 'order', sequence: freshFirst(p.sequences, keyOf.sequence, recent, rand)[0] };
  }

  /** Schlüssel aller Einträge, die ein Spiel benutzt (für "zuletzt gespielt"). */
  function usedKeys(game) {
    const keys = [];
    const add = (list, key) => (list || []).forEach(x => x && keys.push(key(x)));
    add(game.pairs, keyOf.pair);
    add(game.items, keyOf.statement);
    if (game.sequence) keys.push(keyOf.sequence(game.sequence));
    for (const round of game.rounds || []) {
      if (round.cardId) keys.push(`c:${round.cardId}`);
      add(round.items, keyOf.statement);
      add(round.pairs, keyOf.pair);
      if (round.sequence) keys.push(keyOf.sequence(round.sequence));
    }
    return keys;
  }

  /** Neue Schlüssel vorne anfügen, ohne Dubletten, höchstens limit Einträge. */
  function rememberKeys(list, keys, limit) {
    const fresh = Array.from(new Set(keys));
    const seen = new Set(fresh);
    return fresh.concat((list || []).filter(k => !seen.has(k))).slice(0, limit);
  }

  return {
    GAMES,
    seeded,
    shuffle,
    pool,
    statements,
    pickStatements,
    pickPairs,
    memoryTiles,
    stars,
    memoryFraction,
    mistakeFraction,
    buildMix,
    keyOf,
    freshFirst,
    usedKeys,
    rememberKeys
  };
});
