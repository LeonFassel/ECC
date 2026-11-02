/**
 * Lernspiele zu den Karteikarten: Lern-Mix, Memory, Blitzrunde, Zuordnen und
 * Reihenfolge. Logik in core/games-core.js; hier Darstellung und Bedienung.
 * Route: #/spiel/<spiel>-<stapel>  (stapel = "alle" oder eine Stapel-ID)
 */
(function (root) {
  'use strict';

  const G = root.FLGamesCore;
  const STORE = 'fl-games-v1';
  const BLITZ_MS = 60 * 1000;
  const MIX_ROUNDS = 8;
  // So viele zuletzt gespielte Einträge je Stapel kommen erst später wieder dran.
  const RECENT_LIMIT = 150;

  let ctx = null;
  let game = null;
  let timer = null;
  const stored = loadStore();
  const best = stored.best;
  const recent = stored.recent;

  function loadStore() {
    const plain = value => (value && typeof value === 'object' && !Array.isArray(value) ? value : {});
    try {
      const raw = plain(JSON.parse(root.localStorage.getItem(STORE) || 'null'));
      return { best: plain(raw.best), recent: plain(raw.recent) };
    } catch (_err) {
      return { best: {}, recent: {} };
    }
  }

  function saveBest() {
    try {
      root.localStorage.setItem(STORE, JSON.stringify({ best, recent }));
    } catch (_err) {
      // privater Modus: Bestwerte nur bis zum Neuladen
    }
  }

  function recentSet(deck) {
    return new Set(Array.isArray(recent[deck]) ? recent[deck] : []);
  }

  function remember(deck, keys) {
    if (!keys.length) return;
    recent[deck] = G.rememberKeys(recent[deck], keys, RECENT_LIMIT);
    saveBest();
  }

  function esc(value) {
    return ctx.esc(value);
  }

  function deckLabel(deck) {
    if (deck === 'alle') return 'Alle Karteikarten';
    const found = (ctx.data.decks || []).find(d => d.id === deck);
    return found ? `Karteikarten: ${found.name}` : 'Karteikarten';
  }

  function backHref(deck) {
    return deck === 'alle' ? '#/fach/karteikarten' : `#/stapel/${deck}`;
  }

  function points(value) {
    return (Math.round(value * 10) / 10).toLocaleString('de-DE');
  }

  function cardById(id) {
    return ctx.data.questions.find(q => q.id === id);
  }

  function starRow(count) {
    return `<span class="game-stars" aria-label="${count} von 3 Sternen">${[1, 2, 3].map(i => `<svg viewBox="0 0 24 24" class="${i <= count ? 'on' : ''}" aria-hidden="true"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg>`).join('')}</span>`;
  }

  // ------------------------------------------------------------------ Spielecke (Einstieg)

  function hub(deck) {
    const p = G.pool(ctx.data, deck);
    const available = {
      mix: G.buildMix(p, 1).length > 0,
      memory: G.pickPairs(p.pairs, 6).length >= 6,
      blitz: G.statements(p.mcCards).length >= 6,
      match: G.pickPairs(p.pairs, 5).length >= 5,
      order: p.sequences.length > 0
    };
    const games = G.GAMES.filter(g => available[g.id]);
    if (!games.length) return '';
    return `<div class="section-title"><h2>Spielecke</h2><span class="small muted">Lernen mit etwas mehr Spaß</span></div>
      <div class="game-hub">${games.map(g => {
        const record = best[`${g.id}-${deck}`];
        return `<a class="card game-tile game-${g.id}" href="#/spiel/${g.id}-${esc(deck)}">
          <span class="game-tile-icon" aria-hidden="true">${gameIcon(g.id)}</span>
          <strong>${esc(g.name)}</strong>
          <span class="small muted">${esc(g.text)}</span>
          ${record ? `<span class="small game-best">Bestwert: ${esc(bestLabel(g.id, record))}</span>` : ''}
        </a>`;
      }).join('')}</div>`;
  }

  function gameIcon(id) {
    const paths = {
      mix: '<path d="M4 7h3l10 10h3M4 17h3l3-3M14 10l3-3h3M18 4l3 3-3 3M18 14l3 3-3 3"/>',
      memory: '<rect x="3" y="4" width="7" height="9" rx="1.5"/><rect x="14" y="4" width="7" height="9" rx="1.5"/><rect x="3" y="15" width="7" height="5" rx="1.5"/><rect x="14" y="15" width="7" height="5" rx="1.5"/>',
      blitz: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
      match: '<circle cx="6" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.5 6l7 12M8.5 18l7-12"/>',
      order: '<path d="M8 6h12M8 12h12M8 18h12"/><path d="M3 5l1.5-1v4M3 11h2.5L3 14h2.5M3 17h2l-1 1.5 1 1.5H3"/>'
    };
    return `<svg viewBox="0 0 24 24">${paths[id]}</svg>`;
  }

  function bestLabel(id, record) {
    if (id === 'blitz') return `${record.score} richtig`;
    if (id === 'memory') return `${record.moves} Züge`;
    return `${record.stars} ${record.stars === 1 ? 'Stern' : 'Sterne'}`;
  }

  function saveResult(key, entry, better) {
    if (!best[key] || better(entry, best[key])) {
      best[key] = entry;
      saveBest();
      return true;
    }
    return false;
  }

  // ------------------------------------------------------------------ Spiel starten

  function parse(param) {
    const [type, ...rest] = String(param || '').split('-');
    const deck = rest.join('-') || 'alle';
    return { type, deck };
  }

  function newGame(param) {
    stopTimer();
    const { type, deck } = parse(param);
    const created = createGame(type, deck);
    if (!created) return null;
    created.key = param;
    // Blitzrunde: gemerkt wird beim Ende nur, was wirklich dran war.
    if (type !== 'blitz') remember(deck, G.usedKeys(created));
    return created;
  }

  function createGame(type, deck) {
    const p = G.pool(ctx.data, deck);
    const seen = recentSet(deck);
    const base = { type, deck, finished: false, startedAt: Date.now() };
    if (type === 'memory') {
      const pairs = G.pickPairs(p.pairs, 6, undefined, seen);
      return Object.assign(base, { pairs, tiles: G.memoryTiles(pairs), open: [], matched: [], moves: 0, lock: false, just: null });
    }
    if (type === 'blitz') {
      return Object.assign(base, { items: G.pickStatements(G.statements(p.mcCards), 200, undefined, seen), index: 0, score: 0, wrong: 0, started: false, endsAt: 0, feedback: null });
    }
    if (type === 'match') return Object.assign(base, matchState(G.pickPairs(p.pairs, 5, undefined, seen)));
    if (type === 'order') return Object.assign(base, orderState(G.freshFirst(p.sequences, G.keyOf.sequence, seen)[0]));
    if (type === 'mix') {
      const rounds = G.buildMix(p, MIX_ROUNDS, undefined, seen);
      return Object.assign(base, { rounds, index: 0, points: [], round: rounds.length ? roundState(rounds[0]) : null });
    }
    return null;
  }

  function matchState(pairs) {
    return { pairs, rightOrder: G.shuffle(pairs.map((_, i) => i)), selected: null, done: [], mistakes: 0, flash: null };
  }

  function orderState(sequence) {
    return { sequence, shuffled: sequence ? G.shuffle(sequence.steps.map((_, i) => i)) : [], progress: 0, mistakes: 0, flash: null };
  }

  function roundState(round) {
    if (round.type === 'mc') {
      const card = cardById(round.cardId);
      return { kind: 'mc', card, order: G.shuffle(card.mc.options.map((_, i) => i)), selected: [], result: null };
    }
    if (round.type === 'truth') return { kind: 'truth', items: round.items, index: 0, correct: 0, feedback: null };
    if (round.type === 'match') return Object.assign({ kind: 'match' }, matchState(round.pairs));
    if (round.type === 'order') return Object.assign({ kind: 'order' }, orderState(round.sequence));
    return { kind: 'flip', card: cardById(round.cardId), revealed: false };
  }

  function stopTimer() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  // ------------------------------------------------------------------ Darstellung

  function frame(title, bar, body) {
    return `<div class="game" data-game="${esc(game.type)}">
      <header class="page-head">
        <div class="page-head-nav"><a class="back-arrow" href="${esc(backHref(game.deck))}" aria-label="Zurück" title="Zurück"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></a><a href="${esc(backHref(game.deck))}" class="small">${esc(deckLabel(game.deck))}</a></div>
        <h1>${esc(title)}</h1>
      </header>
      ${bar ? `<div class="game-bar">${bar}</div>` : ''}
      <div class="game-area">${body}</div>
    </div>`;
  }

  function finishScreen(fraction, lines, isBest) {
    const count = G.stars(fraction);
    return `<div class="card section game-finish">
      ${starRow(count)}
      <h2>${count === 3 ? 'Super gemacht!' : count === 2 ? 'Gut gemacht!' : count === 1 ? 'Weiter so!' : 'Nochmal versuchen?'}</h2>
      ${lines.map(line => `<p>${line}</p>`).join('')}
      ${isBest ? '<p class="chip sicher">Neuer Bestwert!</p>' : ''}
      <div class="btn-row" style="justify-content:center">
        <button class="btn primary" data-action="game-again">Nochmal spielen</button>
        <a class="btn" href="${esc(backHref(game.deck))}">Andere Spiele</a>
      </div>
    </div>`;
  }

  function renderMemory() {
    const g = game;
    const bar = `<span class="chip">Züge: ${g.moves}</span><span class="chip">Paare: ${g.matched.length / 2} von ${g.pairs.length}</span><span class="chip game-clock" data-since="${g.startedAt}">0:00</span>`;
    if (g.finished) {
      return frame('Memory', bar, finishScreen(G.memoryFraction(g.pairs.length, g.moves), [`Alle ${g.pairs.length} Paare in ${g.moves} Zügen gefunden.`], g.isBest));
    }
    const tiles = g.tiles.map(tile => {
      const shown = g.open.includes(tile.id) || g.matched.includes(tile.id);
      const cls = ['mem-tile', tile.side, shown ? 'shown' : '', g.matched.includes(tile.id) ? 'matched' : '', g.just === tile.id ? 'just' : ''].join(' ');
      return `<button type="button" class="${cls}" data-action="mem-flip" data-id="${esc(tile.id)}" ${shown ? 'aria-pressed="true"' : ''} aria-label="${shown ? esc(tile.text) : 'Verdeckte Karte'}">
        ${shown ? `<span>${esc(tile.text)}</span>` : '<span class="mem-back" aria-hidden="true">?</span>'}</button>`;
    }).join('');
    return frame('Memory', bar, `<p class="muted small">Decken Sie zwei Karten auf: Begriff (blau) und passende Antwort bilden ein Paar.</p><div class="mem-grid">${tiles}</div>`);
  }

  function renderBlitz() {
    const g = game;
    const bar = `<span class="chip">Richtig: ${g.score}</span><span class="chip">Falsch: ${g.wrong}</span><span class="chip game-countdown" data-ends="${g.endsAt}">${g.started ? '' : '1:00'}</span>`;
    if (g.finished) {
      const total = g.score + g.wrong;
      return frame('Blitzrunde', bar, finishScreen(total ? g.score / Math.max(total, 10) : 0, [`${g.score} von ${total} Aussagen richtig eingeschätzt.`], g.isBest));
    }
    if (!g.started) {
      return frame('Blitzrunde', bar, `<div class="card section game-start"><p>Sie haben 60 Sekunden. Zu jeder Frage sehen Sie eine Antwort – stimmt sie oder nicht? Jede richtige Einschätzung zählt.</p>
        <button class="btn primary" data-action="blitz-start">Los geht's</button></div>`);
    }
    const item = g.items[g.index];
    return frame('Blitzrunde', bar, statementCard(item, g.feedback, 'blitz-answer'));
  }

  function statementCard(item, feedback, action) {
    if (!item) return '<div class="card empty">Keine weiteren Aussagen.</div>';
    const fb = feedback
      ? `<div class="truth-feedback ${feedback.ok ? 'good' : 'bad'}">${feedback.ok ? 'Richtig!' : `Falsch – die Antwort ${item.correct ? 'stimmt' : 'stimmt nicht'}.`}</div>`
      : '';
    return `<div class="card section truth-card ${feedback ? (feedback.ok ? 'ok' : 'no') : ''}">
      <p class="small muted">${esc(item.prompt)}</p>
      <p class="truth-text">„${esc(item.text)}“</p>
      ${fb}
      <div class="truth-buttons">
        <button class="btn good" data-action="${action}" data-value="1" ${feedback ? 'disabled' : ''}>Stimmt</button>
        <button class="btn bad" data-action="${action}" data-value="0" ${feedback ? 'disabled' : ''}>Stimmt nicht</button>
      </div>
    </div>`;
  }

  function matchBoard(s, action) {
    const left = s.pairs.map((pair, i) => `<button type="button" class="match-item left ${s.done.includes(i) ? 'done' : ''} ${s.selected && s.selected.side === 'left' && s.selected.index === i ? 'selected' : ''} ${s.flash && s.flash.left === i ? 'shake' : ''}" data-action="${action}" data-side="left" data-index="${i}" ${s.done.includes(i) ? 'disabled' : ''}>${esc(pair.left)}</button>`).join('');
    const right = s.rightOrder.map(i => `<button type="button" class="match-item right ${s.done.includes(i) ? 'done' : ''} ${s.selected && s.selected.side === 'right' && s.selected.index === i ? 'selected' : ''} ${s.flash && s.flash.right === i ? 'shake' : ''}" data-action="${action}" data-side="right" data-index="${i}" ${s.done.includes(i) ? 'disabled' : ''}>${esc(s.pairs[i].right)}</button>`).join('');
    return `<div class="match-board"><div class="match-col">${left}</div><div class="match-col">${right}</div></div>`;
  }

  function renderMatch() {
    const g = game;
    const bar = `<span class="chip">Zugeordnet: ${g.done.length} von ${g.pairs.length}</span><span class="chip">Fehler: ${g.mistakes}</span>`;
    if (g.finished) {
      return frame('Zuordnen', bar, finishScreen(G.mistakeFraction(g.pairs.length, g.mistakes), [`Alle ${g.pairs.length} Paare zugeordnet – mit ${g.mistakes} ${g.mistakes === 1 ? 'Fehler' : 'Fehlern'}.`], g.isBest));
    }
    return frame('Zuordnen', bar, `<p class="muted small">Tippen Sie einen Begriff und dann die passende Antwort an.</p>${matchBoard(g, 'match-pick')}`);
  }

  function orderBoard(s, action) {
    const steps = s.sequence.steps;
    const placed = steps.slice(0, s.progress).map((step, i) => `<li class="order-placed"><span class="order-num">${i + 1}</span>${esc(step)}</li>`).join('');
    const open = s.shuffled.filter(i => i >= s.progress).map(i => `<button type="button" class="order-item ${s.flash === i ? 'shake' : ''}" data-action="${action}" data-index="${i}">${esc(steps[i])}</button>`).join('');
    return `<p class="order-title"><strong>${esc(s.sequence.title)}</strong></p>
      <ol class="order-list">${placed}${s.progress < steps.length ? `<li class="order-next"><span class="order-num">${s.progress + 1}</span>?</li>` : ''}</ol>
      <div class="order-pool">${open}</div>`;
  }

  function renderOrder() {
    const g = game;
    if (!g.sequence) return frame('Reihenfolge', '', '<div class="card empty">Für diesen Stapel gibt es keine Abläufe.</div>');
    const bar = `<span class="chip">Schritt ${Math.min(g.progress + 1, g.sequence.steps.length)} von ${g.sequence.steps.length}</span><span class="chip">Fehler: ${g.mistakes}</span>`;
    if (g.finished) {
      return frame('Reihenfolge', bar, `${finishScreen(G.mistakeFraction(g.sequence.steps.length, g.mistakes), [`„${esc(g.sequence.title)}“ geordnet – mit ${g.mistakes} ${g.mistakes === 1 ? 'Fehler' : 'Fehlern'}.`], g.isBest)}
        <div class="card section"><ol>${g.sequence.steps.map(step => `<li>${esc(step)}</li>`).join('')}</ol></div>`);
    }
    return frame('Reihenfolge', bar, `<p class="muted small">Tippen Sie die Schritte in der richtigen Reihenfolge an.</p>${orderBoard(g, 'order-pick')}`);
  }

  // ------------------------------------------------------------------ Lern-Mix

  const ROUND_NAMES = { mc: 'Ankreuzen', truth: 'Richtig oder falsch?', match: 'Zuordnen', order: 'Reihenfolge', flip: 'Karte aufdecken' };

  function renderMix() {
    const g = game;
    if (!g.rounds.length) return frame('Lern-Mix', '', '<div class="card empty">Für diesen Stapel gibt es noch keine Spielrunden.</div>');
    const total = g.rounds.length;
    if (g.finished) {
      const sum = g.points.reduce((a, b) => a + b, 0);
      const lines = [`${points(sum)} von ${total} Punkten`, `<span class="small muted">${g.rounds.map((r, i) => `${ROUND_NAMES[r.type]}: ${Math.round(g.points[i] * 100)} %`).join(' · ')}</span>`];
      return frame('Lern-Mix', `<span class="chip">Fertig</span>`, finishScreen(sum / total, lines, g.isBest));
    }
    const s = g.round;
    const bar = `<span class="chip">Runde ${g.index + 1} von ${total}</span><span class="chip">${esc(ROUND_NAMES[g.rounds[g.index].type])}</span><span class="chip">Punkte: ${points(g.points.reduce((a, b) => a + b, 0))}</span>`;
    const progress = `<div class="bar thin"><span style="width:${Math.round(g.index / total * 100)}%"></span></div>`;
    return frame('Lern-Mix', bar, progress + mixRound(s));
  }

  function nextButton(label) {
    return `<div class="btn-row"><button class="btn primary" data-action="mix-next">${label || (game.index >= game.rounds.length - 1 ? 'Ergebnis anzeigen' : 'Nächste Runde')}</button></div>`;
  }

  function mixRound(s) {
    if (s.kind === 'mc') return mixMc(s);
    if (s.kind === 'truth') {
      if (s.index >= s.items.length) return `<div class="card section"><p>${s.correct} von ${s.items.length} richtig eingeschätzt.</p>${nextButton()}</div>`;
      return `<p class="small muted">Aussage ${s.index + 1} von ${s.items.length}</p>${statementCard(s.items[s.index], s.feedback, 'mix-truth')}`;
    }
    if (s.kind === 'match') {
      const done = s.done.length === s.pairs.length;
      return `<p class="muted small">Tippen Sie einen Begriff und dann die passende Antwort an.</p>${matchBoard(s, 'mix-match')}${done ? nextButton() : ''}`;
    }
    if (s.kind === 'order') {
      const done = s.progress >= s.sequence.steps.length;
      return `${orderBoard(s, 'mix-order')}${done ? nextButton() : ''}`;
    }
    return mixFlip(s);
  }

  function mixMc(s) {
    const q = s.card;
    const opts = s.order.map(i => {
      const option = q.mc.options[i];
      const ticked = s.selected.includes(i);
      if (!s.result) {
        return `<button type="button" class="mc-option${ticked ? ' checked' : ''}" role="checkbox" aria-checked="${ticked}" data-action="mix-mc-toggle" data-index="${i}"><span class="mc-box">${ticked ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>' : ''}</span><span>${esc(option.text)}</span></button>`;
      }
      const state = option.correct ? (ticked ? 'hit' : 'missed') : (ticked ? 'wrong' : 'ok');
      return `<div class="mc-option result ${state}"><span class="mc-box${ticked ? ' ticked' : ''}">${ticked ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>' : ''}</span><span class="mc-text">${esc(option.text)}<span class="mc-note">${option.correct ? 'richtig' : 'falsch'}</span></span></div>`;
    }).join('');
    return `<div class="card section">
      <p class="small muted">${esc(q.deckName)} · ${esc(q.topic)}</p>
      <p class="mc-prompt">${esc(q.mc.prompt)}</p>
      <div class="mc-list">${opts}</div>
      ${s.result ? `<div class="panel ${s.result.exact ? 'good' : 'warn'}"><p>${esc(s.result.feedback)}</p></div>${nextButton()}` : '<div class="btn-row"><button class="btn primary" data-action="mix-mc-check">Lösung anzeigen</button></div>'}
    </div>`;
  }

  function mixFlip(s) {
    const q = s.card;
    return `<div class="card section flip-card ${s.revealed ? 'revealed' : ''}">
      <p class="small muted">${esc(q.deckName)} · ${esc(q.topic)}</p>
      <p class="question-text${q.question.length > 160 ? ' long' : ''}">${esc(q.question)}</p>
      ${s.revealed
        ? `<div class="flip-answer"><h3>Rückseite der Karte</h3><p class="pre-line">${esc(q.modelAnswer)}</p></div>
           <h3>Wie gut wussten Sie es?</h3>
           <div class="btn-row"><button class="btn good" data-action="mix-flip-rate" data-score="1">Gewusst</button><button class="btn warn" data-action="mix-flip-rate" data-score="0.5">Teilweise</button><button class="btn bad" data-action="mix-flip-rate" data-score="0">Nicht gewusst</button></div>`
        : '<p class="muted small">Überlegen Sie sich die Antwort, dann decken Sie die Karte auf.</p><div class="btn-row"><button class="btn primary" data-action="mix-flip-reveal">Karte umdrehen</button></div>'}
    </div>`;
  }

  // ------------------------------------------------------------------ Aktionen

  function rerender() {
    ctx.rerender();
  }

  function finish(fraction, bestEntry, better) {
    game.finished = true;
    stopTimer();
    if (game.type === 'blitz') remember(game.deck, G.usedKeys({ items: game.items.slice(0, game.index + 1) }));
    game.isBest = saveResult(`${game.type}-${game.deck}`, bestEntry, better);
    rerender();
  }

  function pickMatch(s, el, onDone) {
    const side = el.dataset.side;
    const index = Number(el.dataset.index);
    if (s.done.includes(index) && side) return;
    if (!s.selected || s.selected.side === side) {
      s.selected = { side, index };
      s.flash = null;
      rerender();
      return;
    }
    const left = side === 'left' ? index : s.selected.index;
    const right = side === 'right' ? index : s.selected.index;
    s.selected = null;
    if (left === right) {
      s.done.push(left);
      s.flash = null;
      if (s.done.length === s.pairs.length) onDone();
    } else {
      s.mistakes += 1;
      s.flash = { left, right };
    }
    rerender();
  }

  function pickOrder(s, el, onDone) {
    const index = Number(el.dataset.index);
    if (index === s.progress) {
      s.progress += 1;
      s.flash = null;
      if (s.progress >= s.sequence.steps.length) onDone();
    } else {
      s.mistakes += 1;
      s.flash = index;
    }
    rerender();
  }

  function mixPoint(value) {
    game.points[game.index] = Math.max(0, Math.min(1, value));
  }

  const actions = {
    'game-again': () => {
      game = newGame(game.key);
      rerender();
    },
    'mem-flip': el => {
      const g = game;
      const id = el.dataset.id;
      if (g.lock || g.open.includes(id) || g.matched.includes(id)) return;
      g.open.push(id);
      g.just = id;
      if (g.open.length === 2) {
        g.moves += 1;
        const [a, b] = g.open.map(x => g.tiles.find(t => t.id === x));
        if (a.pair === b.pair) {
          g.matched.push(a.id, b.id);
          g.open = [];
          if (g.matched.length === g.tiles.length) {
            finish(G.memoryFraction(g.pairs.length, g.moves), { moves: g.moves }, (n, o) => n.moves < o.moves);
            return;
          }
        } else {
          g.lock = true;
          setTimeout(() => {
            if (game !== g) return;
            g.open = [];
            g.lock = false;
            g.just = null;
            rerender();
          }, 1100);
        }
      }
      rerender();
    },
    'blitz-start': () => {
      game.started = true;
      game.endsAt = Date.now() + BLITZ_MS;
      startClock();
      rerender();
    },
    'blitz-answer': el => {
      const g = game;
      if (g.feedback || g.finished) return;
      const item = g.items[g.index];
      const ok = (el.dataset.value === '1') === item.correct;
      if (ok) g.score += 1;
      else g.wrong += 1;
      g.feedback = { ok };
      rerender();
      setTimeout(() => {
        if (game !== g || g.finished) return;
        g.feedback = null;
        g.index += 1;
        if (g.index >= g.items.length) {
          finish(g.score / Math.max(1, g.score + g.wrong), { score: g.score }, (n, o) => n.score > o.score);
          return;
        }
        rerender();
      }, ok ? 450 : 1100);
    },
    'match-pick': el => pickMatch(game, el, () => {
      finish(G.mistakeFraction(game.pairs.length, game.mistakes), { stars: G.stars(G.mistakeFraction(game.pairs.length, game.mistakes)) }, (n, o) => n.stars > o.stars);
    }),
    'order-pick': el => pickOrder(game, el, () => {
      const fraction = G.mistakeFraction(game.sequence.steps.length, game.mistakes);
      finish(fraction, { stars: G.stars(fraction) }, (n, o) => n.stars > o.stars);
    }),
    'mix-next': () => {
      const g = game;
      g.index += 1;
      if (g.index >= g.rounds.length) {
        const sum = g.points.reduce((a, b) => a + b, 0) / g.rounds.length;
        finish(sum, { stars: G.stars(sum) }, (n, o) => n.stars > o.stars);
        return;
      }
      g.round = roundState(g.rounds[g.index]);
      rerender();
      window.scrollTo(0, 0);
    },
    'mix-mc-toggle': el => {
      const s = game.round;
      const i = Number(el.dataset.index);
      s.selected = s.selected.includes(i) ? s.selected.filter(x => x !== i) : s.selected.concat(i);
      rerender();
    },
    'mix-mc-check': () => {
      const s = game.round;
      s.result = ctx.Core.evaluateChoice(s.card, s.selected);
      mixPoint(s.result.score);
      ctx.record(s.card.id, s.result.score, s.result.missedLabels);
      rerender();
    },
    'mix-truth': el => {
      const s = game.round;
      if (s.feedback) return;
      const item = s.items[s.index];
      const ok = (el.dataset.value === '1') === item.correct;
      if (ok) s.correct += 1;
      s.feedback = { ok };
      rerender();
      setTimeout(() => {
        if (!game || game.round !== s) return;
        s.feedback = null;
        s.index += 1;
        if (s.index >= s.items.length) mixPoint(s.correct / s.items.length);
        rerender();
      }, ok ? 500 : 1200);
    },
    'mix-match': el => pickMatch(game.round, el, () => mixPoint(G.mistakeFraction(game.round.pairs.length, game.round.mistakes))),
    'mix-order': el => pickOrder(game.round, el, () => mixPoint(G.mistakeFraction(game.round.sequence.steps.length, game.round.mistakes))),
    'mix-flip-reveal': () => {
      game.round.revealed = true;
      rerender();
    },
    'mix-flip-rate': el => {
      const score = Number(el.dataset.score);
      mixPoint(score);
      ctx.record(game.round.card.id, score, []);
      actions['mix-next']();
    }
  };

  // ------------------------------------------------------------------ Uhren

  function startClock() {
    stopTimer();
    timer = setInterval(tick, 250);
  }

  function tick() {
    if (!game) return stopTimer();
    const clock = document.querySelector('.game-clock');
    if (clock && !game.finished) {
      const s = Math.floor((Date.now() - game.startedAt) / 1000);
      clock.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
    }
    const countdown = document.querySelector('.game-countdown');
    if (game.type === 'blitz' && game.started && !game.finished) {
      const left = Math.max(0, game.endsAt - Date.now());
      if (countdown) {
        const s = Math.ceil(left / 1000);
        countdown.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
        countdown.classList.toggle('urgent', left < 10000);
      }
      if (left === 0) finish(game.score / Math.max(10, game.score + game.wrong), { score: game.score }, (n, o) => n.score > o.score);
    }
  }

  // ------------------------------------------------------------------ Einbindung

  function render(param) {
    if (!game || game.key !== param) game = newGame(param);
    if (!game) return '<div class="card empty">Dieses Spiel gibt es nicht. <a href="#/fach/karteikarten">Zu den Karteikarten</a></div>';
    if (game.type === 'memory') return renderMemory();
    if (game.type === 'blitz') return renderBlitz();
    if (game.type === 'match') return renderMatch();
    if (game.type === 'order') return renderOrder();
    return renderMix();
  }

  function afterRender(route) {
    if (route.name !== 'spiel') {
      stopTimer();
      game = null;
      return;
    }
    if (game && !game.finished && (game.type === 'memory' || (game.type === 'blitz' && game.started)) && !timer) startClock();
    tick();
  }

  function init(context) {
    ctx = context;
    return actions;
  }

  root.FLGames = { init, hub, render, afterRender };
})(typeof self !== 'undefined' ? self : this);
