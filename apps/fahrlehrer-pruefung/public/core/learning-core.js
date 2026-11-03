/**
 * Lernlogik der Fahrlehrer-Prüfungs-App (ohne DOM, im Browser und in Node nutzbar).
 *
 * Begriffe:
 *  - Lernfortschritt: Wie viel des Stoffs wurde bereits bearbeitet (Abdeckung)?
 *  - Wissensstand:    Wie gut sitzen die bearbeiteten Fragen (Beherrschung)?
 *  - Prüfungsreife:   Kombination aus beidem über den gesamten Stoff.
 *
 * Alle Funktionen sind rein: Sie verändern den übergebenen Zustand nicht,
 * sondern liefern einen neuen zurück.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FLCore = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const DAY_MS = 24 * 60 * 60 * 1000;
  const STATE_VERSION = 1;
  // Wiederholungsabstände in Tagen je Leitner-Fach (Index = Fach 1..5).
  const REVIEW_INTERVALS = [0, 1, 2, 4, 8, 16];
  const MAX_BOX = 5;
  const MASTERY_WINDOW = 5;

  function createState() {
    return {
      version: STATE_VERSION,
      attempts: {},
      seen: {},
      lastSeen: {},
      daily: {},
      settings: { dailyGoal: 8 }
    };
  }

  function migrateState(raw) {
    const base = createState();
    if (!raw || typeof raw !== 'object') return base;
    return {
      version: STATE_VERSION,
      attempts: isPlainObject(raw.attempts) ? raw.attempts : {},
      seen: isPlainObject(raw.seen) ? raw.seen : {},
      lastSeen: isPlainObject(raw.lastSeen) ? raw.lastSeen : {},
      daily: isPlainObject(raw.daily) ? raw.daily : {},
      settings: Object.assign({}, base.settings, isPlainObject(raw.settings) ? raw.settings : {})
    };
  }

  function isPlainObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function dateKey(ts) {
    const d = new Date(ts);
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${m}-${day}`;
  }

  function normalize(text) {
    return String(text || '')
      .toLowerCase()
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss')
      .replace(/[„“”"']/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // ------------------------------------------------------------------ Bewertung

  function escapeRegex(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * Sucht ein Schlüsselwort in der (normalisierten) Antwort.
   * Zahlen und kurze Kürzel („BE“, „50“) zählen nur als ganzes Wort,
   * längere Begriffe auch als Wortteil („schmier“ findet „Schmierung“).
   */
  function findKeyword(answer, keyword) {
    const k = normalize(keyword);
    if (!k) return -1;
    if (!/[a-z0-9]/.test(k)) return answer.indexOf(k);
    const startsDigit = /^[0-9]/.test(k);
    const endsDigit = /[0-9]$/.test(k);
    if (!startsDigit && !endsDigit && k.length > 3) return answer.indexOf(k);
    const before = startsDigit ? '(?<![0-9]|[0-9],)' : (/^[a-z0-9]/.test(k) ? '(?<![a-z0-9])' : '');
    const after = endsDigit ? '(?![0-9]|,[0-9])' : (/[a-z0-9]$/.test(k) ? '(?![a-z0-9])' : '');
    const match = new RegExp(before + escapeRegex(k) + after).exec(answer);
    return match ? match.index : -1;
  }

  const NEGATION = /(?:^|\s)(nicht|kein|keine|keinen|keiner|nie|niemals|ohne|verwechseln|verwechselt|unterschied|gegensatz|anders als)(?=\s|$)/;

  /** Alle Fundstellen eines Schlüsselworts (für längere Begriffe; sonst nur die erste). */
  function findAllKeywords(answer, keyword) {
    const first = findKeyword(answer, keyword);
    if (first < 0) return [];
    const k = normalize(keyword);
    if (/^[0-9]|[0-9]$/.test(k) || k.length <= 3) return [first];
    const hits = [];
    for (let i = answer.indexOf(k); i >= 0; i = answer.indexOf(k, i + 1)) hits.push(i);
    return hits;
  }

  /**
   * Erwähnung im Zusammenhang statt Behauptung, z. B. „zusammen mit einem Gefahrzeichen“:
   * eines der zwei Wörter davor steht in `exceptAfter`.
   */
  function isContextMention(answer, index, exceptAfter) {
    if (!exceptAfter || exceptAfter.length === 0) return false;
    const before = answer.slice(0, index).trim().split(' ').slice(-2);
    const words = exceptAfter.map(normalize);
    return before.some(word => words.includes(word));
  }

  /** Prüft, ob vor der Fundstelle eine Verneinung oder Abgrenzung steht. */
  function isNegated(answer, index) {
    const words = answer.slice(0, index).split(' ').slice(-6).join(' ');
    return NEGATION.test(words);
  }

  const HUMAN_FULL = 0.85;

  /**
   * Lokale, regelbasierte Bewertung einer frei formulierten Antwort.
   * Ein Kernpunkt gilt als genannt, wenn eines seiner Schlüsselwörter vorkommt.
   * Typische Fehler (wrongClaims) werden erkannt, sofern sie nicht verneint sind.
   */
  function evaluateAnswer(question, answerText, options) {
    const answer = normalize(answerText);
    const words = answer ? answer.split(' ').length : 0;
    const covered = [];
    const missing = [];
    const wrong = [];

    for (const point of question.keyPoints) {
      const hit = answer && point.keywords.some(k => findKeyword(answer, k) >= 0);
      (hit ? covered : missing).push(point.label);
    }

    for (const claim of question.wrongClaims || []) {
      const hit = answer && claim.keywords.some(k => findAllKeywords(answer, k)
        .some(index => !isNegated(answer, index) && !isContextMention(answer, index, claim.exceptAfter)));
      if (hit) wrong.push(claim.label);
    }

    const total = question.keyPoints.length || 1;
    // Wie ein menschlicher Prüfer: Wer fast alles nennt, ist voll richtig. Die volle Punktzahl
    // gibt es ab HUMAN_FULL der Kernpunkte; der Rest wird anteilig hochgerechnet
    // (4 von 5 Punkten = 0.94, 3 von 4 = 0.88, 2 von 3 = 0.78, 1 von 2 = 0.59).
    // share < 1: nur ein Teil der Frage wurde gestellt, die Kernpunkte ließen sich aber nicht
    // den Teilen zuordnen – dann reicht entsprechend weniger für die volle Punktzahl.
    const share = options && options.share > 0 && options.share < 1 ? options.share : 1;
    let score = Math.min(1, covered.length / total / (HUMAN_FULL * share));
    // Sehr kurze Antworten können Schlüsselwörter zufällig enthalten – leicht abwerten.
    if (words > 0 && words < 8) score *= 0.8;
    score -= Math.min(0.45, wrong.length * 0.15);
    score = Math.round(clamp(score, 0, 1) * 100) / 100;

    return { score, covered, missing, wrong, words, feedback: buildFeedback(score, missing, wrong) };
  }

  /**
   * Multiple Choice (Karteikarten): selected sind die Indizes der angekreuzten Optionen
   * in question.mc.options. Volle Punktzahl nur, wenn genau die richtigen angekreuzt sind;
   * sonst Anteil der erkannten richtigen Optionen abzüglich falsch angekreuzter.
   */
  function evaluateChoice(question, selected) {
    const options = (question.mc && question.mc.options) || [];
    const chosen = new Set((selected || []).filter(i => Number.isInteger(i) && i >= 0 && i < options.length));
    const correct = options.map((o, i) => (o.correct ? i : -1)).filter(i => i >= 0);
    const hits = correct.filter(i => chosen.has(i));
    const wrong = Array.from(chosen).filter(i => !options[i].correct).sort((a, b) => a - b);
    const missed = correct.filter(i => !chosen.has(i));
    const exact = wrong.length === 0 && missed.length === 0;
    const partial = correct.length ? (hits.length - wrong.length) / correct.length : 0;
    const score = exact ? 1 : round2(clamp(Math.min(partial, 0.9), 0, 1));
    return {
      score,
      exact,
      hits,
      wrong,
      missed,
      missedLabels: missed.map(i => options[i].text),
      feedback: exact
        ? 'Alles richtig angekreuzt.'
        : `${hits.length} von ${correct.length} richtigen Antworten erkannt${wrong.length ? `, ${wrong.length} falsch angekreuzt` : ''}.`
    };
  }

  function buildFeedback(score, missing, wrong) {
    const wrongNote = wrong && wrong.length ? ' Achtung: Ein Teil Ihrer Aussage ist fachlich falsch – siehe unten.' : '';
    if (score >= 0.85) return `Sehr gut – Sie haben die wesentlichen Punkte genannt.${wrongNote}`;
    if (score >= 0.6) return missing.length ? `Gute Antwort. Ergänzen Sie noch: ${missing.slice(0, 2).join(', ')}.${wrongNote}` : `Gute Antwort – einzelne Punkte fehlen noch.${wrongNote}`;
    if (score >= 0.3) return missing.length ? `Teilweise richtig. Es fehlen wichtige Punkte, z. B. ${missing.slice(0, 3).join(', ')}.${wrongNote}` : `Teilweise richtig – wichtige Punkte fehlen noch.${wrongNote}`;
    return `Hier fehlt noch viel. Lesen Sie die Erklärung und die Musterantwort in Ruhe durch.${wrongNote}`;
  }

  /** Verbindet automatische Bewertung und Selbsteinschätzung zu einem Ergebnis. */
  function combineScores(parts) {
    const values = [parts.ai, parts.auto, parts.self].filter(v => typeof v === 'number');
    if (typeof parts.ai === 'number') {
      // Die KI-Bewertung ist am aussagekräftigsten, Selbsteinschätzung korrigiert leicht.
      return round2(typeof parts.self === 'number' ? parts.ai * 0.8 + parts.self * 0.2 : parts.ai);
    }
    if (values.length === 0) return 0;
    return round2(values.reduce((a, b) => a + b, 0) / values.length);
  }

  function round2(n) {
    return Math.round(n * 100) / 100;
  }

  // ------------------------------------------------------------------ Zustand ändern

  function recordAttempt(state, questionId, result, now) {
    const ts = typeof now === 'number' ? now : Date.now();
    const attempt = {
      ts,
      score: round2(clamp(Number(result.score) || 0, 0, 1)),
      source: result.source || 'self',
      missed: Array.isArray(result.missed) ? result.missed.slice(0, 12) : []
    };
    const attempts = Object.assign({}, state.attempts);
    attempts[questionId] = (attempts[questionId] || []).concat(attempt).slice(-20);

    const key = dateKey(ts);
    const daily = Object.assign({}, state.daily);
    const today = Object.assign({ answered: 0, scoreSum: 0 }, daily[key]);
    today.answered += 1;
    today.scoreSum = round2(today.scoreSum + attempt.score);
    daily[key] = today;

    const seen = Object.assign({}, state.seen);
    if (!seen[questionId]) seen[questionId] = ts;
    const lastSeen = Object.assign({}, state.lastSeen, { [questionId]: ts });

    return Object.assign({}, state, { attempts, daily, seen, lastSeen });
  }

  function markSeen(state, questionId, now) {
    const ts = typeof now === 'number' ? now : Date.now();
    const lastSeen = Object.assign({}, state.lastSeen, { [questionId]: ts });
    if (state.seen[questionId]) return Object.assign({}, state, { lastSeen });
    const seen = Object.assign({}, state.seen, { [questionId]: ts });
    return Object.assign({}, state, { seen, lastSeen });
  }

  /** Merkt, wann eine Frage zuletzt gezeigt wurde (auch wenn sie übersprungen wird). */
  function markShown(state, questionId, now) {
    const ts = typeof now === 'number' ? now : Date.now();
    return Object.assign({}, state, { lastSeen: Object.assign({}, state.lastSeen, { [questionId]: ts }) });
  }

  /** Zeitpunkt, zu dem die Frage zuletzt gezeigt oder beantwortet wurde (0 = noch nie). */
  function lastSeenAt(state, questionId) {
    const attempts = state.attempts[questionId] || [];
    const answered = attempts.length ? attempts[attempts.length - 1].ts : 0;
    return Math.max(Number((state.lastSeen || {})[questionId]) || 0, answered);
  }

  /**
   * Reihenfolge für eine Übungsrunde: Noch nie gezeigte Fragen zuerst (zufällig),
   * danach die übrigen – was am längsten her ist, kommt eher dran. Die Reihenfolge
   * der gezeigten Fragen ist nur grob sortiert und zusätzlich gemischt, damit sie
   * nicht jedes Mal gleich ist.
   */
  function freshOrder(ids, state, rand) {
    const r = rand || Math.random;
    const fresh = [];
    const shown = [];
    for (const id of ids) {
      const at = lastSeenAt(state, id);
      if (at) shown.push({ id, at });
      else fresh.push(id);
    }
    const spread = Math.max(4, Math.round(shown.length * 0.25));
    const ranked = shown.sort((a, b) => a.at - b.at).map((x, i) => ({ id: x.id, key: i + r() * spread }));
    return shuffle(fresh, r).concat(ranked.sort((a, b) => a.key - b.key).map(x => x.id));
  }

  // ------------------------------------------------------------------ Kennzahlen je Frage

  /**
   * Beherrschung einer Frage (0..1) oder null, wenn noch nie beantwortet.
   * Neuere Versuche zählen stärker; lange nicht geübtes Wissen verblasst leicht.
   */
  function questionMastery(attempts, now) {
    if (!attempts || attempts.length === 0) return null;
    const recent = attempts.slice(-MASTERY_WINDOW);
    let weighted = 0;
    let weights = 0;
    recent.forEach((a, i) => {
      const w = i + 1;
      weighted += a.score * w;
      weights += w;
    });
    const last = recent[recent.length - 1];
    const days = Math.max(0, ((typeof now === 'number' ? now : Date.now()) - last.ts) / DAY_MS);
    const retention = clamp(1 - days / 120, 0.7, 1);
    return round2((weighted / weights) * retention);
  }

  function leitnerBox(attempts) {
    let box = 1;
    for (const a of attempts || []) {
      if (a.score >= 0.8) box = Math.min(MAX_BOX, box + 1);
      else if (a.score < 0.5) box = 1;
    }
    return box;
  }

  function isDue(attempts, now) {
    if (!attempts || attempts.length === 0) return false;
    const last = attempts[attempts.length - 1];
    const interval = REVIEW_INTERVALS[leitnerBox(attempts)] * DAY_MS;
    return (typeof now === 'number' ? now : Date.now()) - last.ts >= interval;
  }

  function masteryLevel(mastery) {
    if (mastery === null || mastery === undefined) return { id: 'offen', label: 'Noch offen' };
    if (mastery < 0.5) return { id: 'schwach', label: 'Schwach' };
    if (mastery < 0.75) return { id: 'mittel', label: 'Ausbaufähig' };
    return { id: 'sicher', label: 'Sicher' };
  }

  // ------------------------------------------------------------------ Kennzahlen je Fach

  function aggregate(questions, state, now) {
    let worked = 0;
    let seenOnly = 0;
    let masterySum = 0;
    let due = 0;
    const levels = { offen: 0, schwach: 0, mittel: 0, sicher: 0 };

    for (const q of questions) {
      const attempts = state.attempts[q.id];
      const mastery = questionMastery(attempts, now);
      levels[masteryLevel(mastery).id] += 1;
      if (mastery === null) {
        if (state.seen[q.id]) seenOnly += 1;
        continue;
      }
      worked += 1;
      masterySum += mastery;
      if (isDue(attempts, now)) due += 1;
    }

    const total = questions.length;
    return {
      total,
      worked,
      seenOnly,
      due,
      levels,
      // Lernfortschritt: Anteil bearbeiteter Fragen.
      learningProgress: total ? round2(worked / total) : 0,
      // Wissensstand: durchschnittliche Beherrschung der bearbeiteten Fragen.
      knowledge: worked ? round2(masterySum / worked) : null,
      // Prüfungsreife: Beherrschung bezogen auf den gesamten Stoff.
      readiness: total ? round2(masterySum / total) : 0
    };
  }

  function subjectStats(data, state, now) {
    return data.subjects.map(subject => {
      const questions = data.questions.filter(q => q.subject === subject.id);
      return Object.assign({ subject }, aggregate(questions, state, now));
    });
  }

  function overallStats(data, state, now) {
    return aggregate(data.questions, state, now);
  }

  // ------------------------------------------------------------------ Schwächenanalyse

  function weaknessAnalysis(data, state, now) {
    const topicMap = new Map();
    const missedCount = new Map();

    for (const q of data.questions) {
      const key = `${q.subject}::${q.topic}`;
      if (!topicMap.has(key)) {
        topicMap.set(key, { subject: q.subject, topic: q.topic, questionIds: [], masterySum: 0, worked: 0, attempts: 0 });
      }
      const entry = topicMap.get(key);
      entry.questionIds.push(q.id);
      const attempts = state.attempts[q.id] || [];
      entry.attempts += attempts.length;
      const mastery = questionMastery(attempts, now);
      if (mastery !== null) {
        entry.masterySum += mastery;
        entry.worked += 1;
      }
      // Nur die letzten beiden Versuche zählen für „häufig vergessene Punkte“.
      for (const a of attempts.slice(-2)) {
        for (const label of a.missed || []) {
          const mk = `${q.id}::${label}`;
          const prev = missedCount.get(mk) || { questionId: q.id, subject: q.subject, label, count: 0 };
          prev.count += 1;
          missedCount.set(mk, prev);
        }
      }
    }

    const topics = Array.from(topicMap.values()).map(t => {
      const mastery = t.worked ? round2(t.masterySum / t.worked) : null;
      return {
        subject: t.subject,
        topic: t.topic,
        questionIds: t.questionIds,
        attempts: t.attempts,
        mastery,
        level: masteryLevel(mastery)
      };
    });

    const weakTopics = topics
      .filter(t => t.mastery !== null && t.mastery < 0.75)
      .sort((a, b) => a.mastery - b.mastery);

    const openTopics = topics.filter(t => t.mastery === null);

    const missedPoints = Array.from(missedCount.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    const subjects = subjectStats(data, state, now)
      .map(s => ({ id: s.subject.id, name: s.subject.name, knowledge: s.knowledge, learningProgress: s.learningProgress, readiness: s.readiness }))
      .sort((a, b) => a.readiness - b.readiness);

    return {
      topics,
      weakTopics,
      openTopics,
      missedPoints,
      subjects,
      trend: scoreTrend(state, now),
      advice: buildAdvice(weakTopics, openTopics, subjects, data)
    };
  }

  function scoreTrend(state, now) {
    const ts = typeof now === 'number' ? now : Date.now();
    const windows = [{ from: 7, to: 0 }, { from: 14, to: 7 }].map(w => {
      let sum = 0;
      let n = 0;
      for (const list of Object.values(state.attempts)) {
        for (const a of list) {
          const age = (ts - a.ts) / DAY_MS;
          if (age >= w.to && age < w.from) {
            sum += a.score;
            n += 1;
          }
        }
      }
      return n ? { avg: round2(sum / n), n } : { avg: null, n: 0 };
    });
    const [current, previous] = windows;
    let direction = 'unbekannt';
    if (current.avg !== null && previous.avg !== null) {
      const diff = current.avg - previous.avg;
      direction = diff > 0.05 ? 'steigend' : diff < -0.05 ? 'fallend' : 'stabil';
    }
    return { current, previous, direction };
  }

  function buildAdvice(weakTopics, openTopics, subjects, data) {
    const advice = [];
    const nameOf = id => (data.subjects.find(s => s.id === id) || {}).name || id;
    if (weakTopics.length > 0) {
      const t = weakTopics[0];
      advice.push(`Ihr schwächstes Thema ist „${t.topic}“ (${nameOf(t.subject)}). Wiederholen Sie hier zuerst Erklärung und Musterantwort.`);
    }
    const untouched = subjects.filter(s => s.learningProgress === 0);
    if (untouched.length > 0) {
      advice.push(`Noch nicht begonnen: ${untouched.map(s => s.name).join(', ')}. In der mündlichen Prüfung kann jedes Fach drankommen.`);
    } else if (openTopics.length > 0) {
      advice.push(`${openTopics.length} Themen sind noch offen. Bearbeiten Sie pro Tag mindestens ein neues Thema.`);
    }
    const lowest = subjects[0];
    if (lowest && lowest.knowledge !== null && lowest.knowledge < 0.6) {
      advice.push(`Im Fach ${lowest.name} liegt Ihr Wissensstand bei ${Math.round(lowest.knowledge * 100)} %. Simulieren Sie hier gezielt eine Prüfung mit Nachfragen.`);
    }
    if (advice.length === 0) {
      advice.push('Sehr gute Basis! Halten Sie das Niveau mit täglichen Wiederholungen und einer Prüfungssimulation pro Woche.');
    }
    return advice;
  }

  // ------------------------------------------------------------------ Tagesplan

  function seededRandom(seedText) {
    let h = 2166136261;
    for (let i = 0; i < seedText.length; i++) {
      h ^= seedText.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return function next() {
      h += 0x6d2b79f5;
      let t = h;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffle(list, rand) {
    const copy = list.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  /**
   * Tagesempfehlung: fällige Wiederholungen, dann Schwächen, dann neue Fragen
   * aus dem Fach mit dem geringsten Lernfortschritt. Für einen Tag stabil.
   */
  function dailyPlan(data, state, now, goal) {
    const ts = typeof now === 'number' ? now : Date.now();
    const limit = goal || state.settings.dailyGoal || 8;
    const rand = seededRandom(dateKey(ts));
    const plan = [];
    const used = new Set();
    const add = (q, reason) => {
      if (plan.length >= limit || used.has(q.id)) return;
      used.add(q.id);
      plan.push({ questionId: q.id, subject: q.subject, topic: q.topic, reason });
    };

    const withMastery = data.questions.map(q => ({ q, attempts: state.attempts[q.id], mastery: questionMastery(state.attempts[q.id], ts) }));

    withMastery
      .filter(x => x.mastery !== null && isDue(x.attempts, ts) && x.mastery < 0.9)
      .sort((a, b) => a.mastery - b.mastery)
      .slice(0, Math.ceil(limit / 2))
      .forEach(x => add(x.q, 'Wiederholung fällig'));

    withMastery
      .filter(x => x.mastery !== null && x.mastery < 0.6)
      .sort((a, b) => a.mastery - b.mastery)
      .forEach(x => add(x.q, 'Schwäche festigen'));

    const coverage = subjectStats(data, state, ts).sort((a, b) => a.learningProgress - b.learningProgress);
    const fresh = withMastery.filter(x => x.mastery === null);
    for (const s of coverage) {
      const candidates = shuffle(fresh.filter(x => x.q.subject === s.subject.id), rand)
        .sort((a, b) => a.q.difficulty - b.q.difficulty);
      candidates.slice(0, 2).forEach(x => add(x.q, `Neues Thema in ${s.subject.name}`));
    }

    shuffle(withMastery.filter(x => x.mastery !== null), rand)
      .sort((a, b) => a.mastery - b.mastery)
      .forEach(x => add(x.q, 'Wissen auffrischen'));

    const done = (state.daily[dateKey(ts)] || {}).answered || 0;
    return { date: dateKey(ts), goal: limit, done, items: plan };
  }

  function streak(state, now) {
    let count = 0;
    let ts = typeof now === 'number' ? now : Date.now();
    if (!((state.daily[dateKey(ts)] || {}).answered > 0)) ts -= DAY_MS;
    while ((state.daily[dateKey(ts)] || {}).answered > 0) {
      count += 1;
      ts -= DAY_MS;
    }
    return count;
  }

  // ------------------------------------------------------------------ Prüfungssimulation (lokal)

  /** Wählt je Fach eine Frage; schwächere und unbekannte Fragen werden bevorzugt. */
  function pickExamQuestions(data, state, now, count, options) {
    const ts = typeof now === 'number' ? now : Date.now();
    const rand = seededRandom(`exam-${ts}`);
    const n = count || data.subjects.length;
    const withSigns = !(options && options.excludeSigns);
    const picked = [];
    for (const subject of shuffle(data.subjects, rand)) {
      const pool = data.questions.filter(q => q.subject === subject.id && (withSigns || !q.signLabel));
      const ranked = shuffle(pool, rand).sort((a, b) => {
        const ma = questionMastery(state.attempts[a.id], ts);
        const mb = questionMastery(state.attempts[b.id], ts);
        return (ma === null ? 0.4 : ma) - (mb === null ? 0.4 : mb);
      });
      if (ranked[0]) picked.push(ranked[0].id);
      if (picked.length >= n) break;
    }
    return picked;
  }

  /**
   * Mündliche Prüfung wie in echt: drei Prüfer nacheinander, jeder mit eigener
   * Prüfungszeit. Der Rechtler fragt Verkehrszeichen, Recht und Verkehrsverhalten,
   * der Pädagoge Pädagogik und Fahrlehrerwesen, der Techniker Technik.
   */
  const EXAM_PANEL = [
    { id: 'recht', name: 'Recht', examiner: 'Rechtler', genitive: 'Rechtlers', topics: 'Verkehrszeichen, Verkehrsrecht und Verkehrsverhalten', intro: 'Ich prüfe Sie in Recht – Verkehrszeichen, Verkehrsrecht und Verkehrsverhalten.' },
    { id: 'paedagogik', name: 'Pädagogik', examiner: 'Pädagoge', genitive: 'Pädagogen', topics: 'Pädagogik und Fahrlehrerwesen', intro: 'Ich prüfe Sie in Pädagogik und im Fahrlehrerwesen.' },
    { id: 'technik', name: 'Technik', examiner: 'Techniker', genitive: 'Technikers', topics: 'Fahrzeugtechnik', intro: 'Ich prüfe Sie in Fahrzeugtechnik.' }
  ];

  const TEACHING_TOPIC = /Fahrlehrer(?!register)|Fahrschul|FahrlG|FahrschAusbO|FahrlAusbV|Ausbildungsnachweis|Ausbildungsplan|Tagesnachweis|Diagrammkarte/i;

  // Karteikarten mit einer echten Frage („Was ist …?“, „Nennen Sie …!“) – Stichwortkarten wie
  // „§ 8 Vorfahrt“ eignen sich nicht als Prüfungsfrage.
  const CARD_TECH = /Fliehkraft|Reifen(?!pflicht)|Fahrzeugwartung|am Motor/i;
  const CARD_TEACHING = /^(?:Praktische|Theoretische) Ausbildung$/;
  const CARD_ASKS = /\?|!\s*$|\b(?:nennen|erklären|erläutern|beschreiben|benennen|definieren|schildern|zählen)\b/i;

  /**
   * Welcher Prüfer eine Frage stellt (null = nicht in der mündlichen Prüfung). Karteikarten
   * zählen nach ihrem Stapel; Karten aus der mündlichen Sammlung (cardLabel) sind dort
   * schon als eigene Fragen enthalten.
   */
  function cardPanel(q) {
    if (q.cardLabel || !CARD_ASKS.test(q.question || '')) return null;
    // Der Stapel Verkehrsverhalten enthält auch Technik- und Ausbildungskarten.
    if (q.deck === 'verhalten' && CARD_TECH.test(q.question || '')) return 'technik';
    if (q.deck === 'verhalten' && CARD_TEACHING.test(q.topic || '')) return 'paedagogik';
    return subjectPanel(q.deck, q.topic);
  }

  function subjectPanel(subject, topic) {
    if (subject === 'technik') return 'technik';
    if (subject === 'paedagogik' || subject === 'praxis') return 'paedagogik';
    if (subject === 'recht' || subject === 'verhalten') return TEACHING_TOPIC.test(topic || '') ? 'paedagogik' : 'recht';
    if (subject === 'zeichen') return 'recht';
    return null;
  }

  function examPanelFor(q) {
    if (!q) return null;
    if (q.collection === 'karteikarten' || q.subject === 'karteikarten') return cardPanel(q);
    return subjectPanel(q.subject, q.topic);
  }

  // ------------------------------------------------------------------ Ähnliche Fragen

  // Füllwörter und typische Frageformeln zählen beim Vergleich nicht.
  const SIM_STOP = new Set(('der die das und oder ein eine einer eines einem einen zu im in an auf mit von bei fuer sie was wie welche welcher welches '
    + 'welchen sind ist den dem des nach aus vor als auch nicht es man wird werden kann koennen muss muessen erklaeren erlaeutern nennen '
    + 'beschreiben benennen geben hinweise sowie dabei diese dieser dieses ihre ihren ihrem fahrschueler fahrschuelern fahrlehrer beispiel '
    + 'beispiele wann warum wozu durch ueber unter zwischen beim zum zur jeweils bitte dann wenn welchem diesem diesen haben gibt frage fragen '
    + 'thema themen grundlagen').split(' '));
  const simCache = new WeakMap();
  // Allgemeine Begriffe taugen nicht als Kernbegriff eines Themas.
  const SIM_GENERIC = new Set(['fahrerlaubnis', 'ausbildung', 'unterricht', 'theorieunterricht', 'strassenverkehr', 'fahrzeug', 'fahrzeuge',
    'fahrzeugen', 'pruefung', 'verhalten', 'praktische', 'praktischen', 'besondere', 'allgemeine', 'rechtliche', 'technische', 'grundlagen',
    'begriffe', 'vorschriften', 'pflicht', 'pflichten', 'fahrschule', 'fahrschueler', 'fahrlehrer', 'beispiel', 'beispielen', 'situationen',
    'methoden', 'zeichen', 'verkehrszeichen', 'verbotszeichen', 'gefahrzeichen', 'richtzeichen', 'vorschriftzeichen', 'regelungen', 'unterschied', 'unterschiede', 'aufgaben', 'bedeutung', 'anforderungen',
    'klasse', 'klassen', 'regeln', 'fehler', 'praxis', 'gefahr', 'gefahren', 'rechte', 'arten', 'einsatz', 'umgang', 'ablauf', 'planung',
    'fahrlehrers', 'fahrschuelers', 'verbot', 'verbote', 'fahren', 'strasse', 'strassen']);

  function simWords(text) {
    return normalize(text).replace(/[^a-z0-9 ]/g, ' ').split(' ').filter(w => w.length > 3 && !SIM_STOP.has(w)).map(w => w.slice(0, 7));
  }

  // Karteikarten haben nur Sammelthemen („Motor“, „StVO“) – dort zählt allein der Fragetext.
  function simTokens(q) {
    let t = simCache.get(q);
    if (!t) {
      const card = q.collection === 'karteikarten';
      const head = card ? '' : normalize(q.topic || '').split(/[^a-z0-9]+/).find(w => w.length >= 6 && !SIM_GENERIC.has(w)) || '';
      t = { all: new Set(simWords(`${card ? '' : q.topic || ''} ${q.question || ''}`)), topic: new Set(card ? [] : simWords(q.topic || '')), head, words: card ? [] : normalize(q.topic || '').split(/[^a-z0-9]+/).filter(w => w.length >= 6) };
      simCache.set(q, t);
    }
    return t;
  }

  function overlap(a, b) {
    let shared = 0;
    for (const w of a) if (b.has(w)) shared += 1;
    return { shared, ratio: shared / ((a.size + b.size - shared) || 1) };
  }

  /** Fragen zum selben Thema, z. B. „Bremsbereitschaft“ aus zwei Sammlungen. Verkehrszeichen zählen nie als ähnlich. */
  function similarQuestions(a, b) {
    if (!a || !b) return false;
    if (a === b || a.id === b.id) return true;
    if (a.signLabel || b.signLabel) return false;
    const ta = simTokens(a);
    const tb = simTokens(b);
    const all = overlap(ta.all, tb.all);
    if (all.ratio >= 0.4 && all.shared >= 3) return true;
    const topic = overlap(ta.topic, tb.topic);
    if (topic.shared >= 2 && topic.ratio >= 0.6) return true;
    // Gleicher Kernbegriff im Thema („Bremsbereitschaft“ – „Bremsbereitschaft erklären und schulen“,
    // „Abstand halten“ – „Sicherheitsabstand“: zusammengesetzte Wörter enden auf den Kernbegriff).
    const sameHead = (x, y) => Boolean(x.head) && y.words.some(w => w.endsWith(x.head));
    return sameHead(ta, tb) || sameHead(tb, ta);
  }

  // Verkehrszeichen in der mündlichen Prüfung: nur Zeichen bis 357 (Sackgasse) –
  // keine Zusatzzeichen, Sinnbilder, Markierungen ohne Zeichennummer und keine Zeichen ab 358.
  const ORAL_SIGN_MAX = 357;
  const EXAM_REPEAT_DAYS = 21;

  /** Kommt die Frage in der mündlichen Prüfung dran? Allgemeine Fragen zu Zeichen bleiben. */
  function inOralExam(q) {
    if (!q || q.subject !== 'zeichen' || !q.signLabel) return Boolean(q);
    const m = /^(\d+)(?:\.\d+)?$/.exec(String(q.sign || ''));
    return Boolean(m) && /^Zeichen\s/.test(q.signLabel) && Number(m[1]) <= ORAL_SIGN_MAX;
  }

  /**
   * Fragen je Prüfer, zufällig gemischt; kürzlich in einer Prüfung gefragte zuletzt. Beim Rechtler
   * ist etwa jede dritte Frage ein Verkehrszeichen. perSection: Vorrat je Prüfer
   * (mehr Fragen, als in die Zeit passen – die Zeit begrenzt die Prüfung).
   */
  function buildExamPanel(data, state, now, perSection) {
    const ts = typeof now === 'number' ? now : Date.now();
    const rand = seededRandom(`panel-${ts}`);
    const size = perSection || 12;
    // Fragen aus den Prüfungen der letzten drei Wochen kommen erst dran, wenn alle anderen durch
    // sind (die zuletzt gefragten ganz hinten), ähnliche Fragen dazu ebenfalls erst später.
    const repeatWindow = EXAM_REPEAT_DAYS * DAY_MS;
    const byId = new Map(data.questions.map(q => [q.id, q]));
    // In den letzten drei Wochen in einer Prüfung gefragt: die Frage selbst und ähnliche Fragen.
    const recent = [];
    for (const [id, attempts] of Object.entries(state.attempts || {})) {
      const last = (attempts || []).reduce((t, a) => (a && a.source === 'exam' && a.ts > t ? a.ts : t), 0);
      if (last && ts - last < repeatWindow && byId.has(id)) recent.push({ q: byId.get(id), fresh: (repeatWindow - (ts - last)) / repeatWindow });
    }
    const recency = q => {
      let penalty = 0;
      for (const r of recent) {
        if (r.q.id === q.id) penalty = Math.max(penalty, 2 + r.fresh);
        else if (similarQuestions(r.q, q)) penalty = Math.max(penalty, 1 + r.fresh);
      }
      return penalty;
    };
    // Vor allem Zufall, schwächere Themen nur leicht bevorzugt.
    const rank = list => list.map(q => {
      const m = questionMastery(state.attempts[q.id] || [], ts);
      return { q, key: rand() + (m === null ? 0.5 : m) * 0.25 + recency(q) };
    }).sort((a, b) => a.key - b.key).map(x => x.q);
    // Nächste Frage aus der Liste, die keiner schon gewählten Frage ähnelt (sonst die nächstbeste).
    const takeVaried = (list, chosen) => {
      const i = list.findIndex(q => !chosen.some(c => similarQuestions(c, q)));
      return list.splice(i < 0 ? 0 : i, 1)[0];
    };
    return EXAM_PANEL.map(section => {
      const pool = data.questions.filter(q => examPanelFor(q) === section.id && inOralExam(q));
      const chosen = [];
      if (section.id === 'recht') {
        const signs = rank(pool.filter(q => q.subject === 'zeichen'));
        const law = rank(pool.filter(q => q.subject !== 'zeichen'));
        while (chosen.length < size && (signs.length || law.length)) {
          const takeSign = signs.length && (!law.length || chosen.length % 3 === 1);
          chosen.push(takeVaried(takeSign ? signs : law, chosen));
        }
      } else {
        const ranked = rank(pool);
        while (chosen.length < size && ranked.length) chosen.push(takeVaried(ranked, chosen));
      }
      const ids = chosen.map(q => q.id);
      return Object.assign({}, section, { ids });
    }).filter(section => section.ids.length > 0);
  }

  /**
   * Note 1–6 aus dem Anteil der Leistung (0..1) – gleiche Stufen wie bei der
   * schriftlichen Prüfung: ab 92 % = 1, ab 81 % = 2, ab 67 % = 3, ab 50 % = 4, ab 30 % = 5.
   */
  function gradeFromScore(score) {
    const percent = Math.round(clamp(Number(score) || 0, 0, 1) * 100);
    if (percent >= 92) return 1;
    if (percent >= 81) return 2;
    if (percent >= 67) return 3;
    if (percent >= 50) return 4;
    if (percent >= 30) return 5;
    return 6;
  }

  /**
   * Noten der mündlichen Prüfung: je Prüfer aus dem Durchschnitt seiner Fragen,
   * insgesamt der Durchschnitt der Fachnoten. Ein erreichter Prüfer ohne beantwortete
   * Frage bekommt eine 6; nicht mehr erreichte Prüfer (abgebrochen) bleiben ohne Note.
   * passed (Orientierung): alle Prüfer erreicht und jede Fachnote mindestens 4.
   */
  function oralExamGrades(sections) {
    const parts = (sections || []).map(s => {
      const scores = (s.results || []).map(r => r.score);
      const avg = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
      const reached = Boolean(s.startedAt);
      return {
        id: s.id,
        name: s.name,
        examiner: s.examiner,
        reached,
        questions: scores.length,
        percent: Math.round(avg * 100),
        grade: reached ? gradeFromScore(avg) : null
      };
    });
    const graded = parts.filter(p => p.grade !== null);
    const average = graded.length ? Math.round((graded.reduce((sum, p) => sum + p.grade, 0) / graded.length) * 10) / 10 : null;
    const answered = parts.reduce((sum, p) => sum + p.questions, 0);
    const percent = answered
      ? Math.round(parts.reduce((sum, p) => sum + p.percent * p.questions, 0) / answered)
      : 0;
    return {
      parts,
      average,
      percent,
      complete: graded.length === parts.length,
      passed: graded.length === parts.length && parts.length > 0 && graded.every(p => p.grade <= 4)
    };
  }

  const ORAL_GAP_MS = 30 * 60000;

  /**
   * Frühere mündliche Prüfungen aus den gespeicherten Einzelergebnissen (source "exam")
   * zurückgewinnen. Eine neue Prüfung beginnt nach mehr als 30 Minuten Pause oder wenn
   * wieder ein früherer Prüfer fragt (Reihenfolge Rechtler, Pädagoge, Techniker).
   * Die Antworten werden nach Prüfer sortiert, auch wenn sie gemischt gefragt wurden.
   * panelOf(questionId) liefert den Prüfer; covered: Zeiträume [von, bis] bereits
   * archivierter Prüfungen – deren Ergebnisse werden nicht doppelt gezählt.
   */
  function reconstructOralExams(attempts, panelOf, covered, gapMs) {
    const gap = gapMs || ORAL_GAP_MS;
    const ranges = covered || [];
    const order = new Map(EXAM_PANEL.map((p, i) => [p.id, i]));
    const items = [];
    Object.keys(attempts || {}).forEach(questionId => {
      const panel = panelOf(questionId);
      if (!order.has(panel)) return;
      (attempts[questionId] || []).forEach(a => {
        if (a && a.source === 'exam' && typeof a.ts === 'number' && !ranges.some(r => a.ts >= r[0] && a.ts <= r[1])) {
          items.push({ questionId, panel, ts: a.ts, score: Number(a.score) || 0, missing: Array.isArray(a.missed) ? a.missed : [] });
        }
      });
    });
    items.sort((a, b) => a.ts - b.ts);
    const byTime = [];
    items.forEach((item, i) => {
      if (i === 0 || item.ts - items[i - 1].ts > gap) byTime.push([]);
      byTime[byTime.length - 1].push(item);
    });
    // Ältere Prüfungen fragten die Fächer gemischt – dann nur trennen, wenn jedes
    // Stück eine echte Prüfung sein kann (mindestens drei Antworten).
    const groups = byTime.flatMap(group => {
      const parts = [[]];
      group.forEach((item, i) => {
        if (i > 0 && order.get(item.panel) < order.get(group[i - 1].panel)) parts.push([]);
        parts[parts.length - 1].push(item);
      });
      return parts.every(part => part.length >= 3) ? parts : [group];
    });
    return groups.map(group => ({
      id: `rek-${group[0].ts.toString(36)}`,
      reconstructed: true,
      at: group[group.length - 1].ts,
      from: group[0].ts,
      to: group[group.length - 1].ts,
      sections: EXAM_PANEL.map(p => {
        const own = group.filter(item => item.panel === p.id);
        return Object.assign({}, p, {
          startedAt: own.length ? own[0].ts : 0,
          endedAt: own.length ? own[own.length - 1].ts : 0,
          summary: '',
          results: own.map(item => ({ questionId: item.questionId, score: item.score, missing: item.missing, comment: '' }))
        });
      })
    }));
  }

  // ------------------------------------------------------------------ Teilfragen

  const LETTERS = 'abcdefgh';

  /** "a) … b) … c) …" in einer Zeile auf eigene Zeilen verteilen (nur in richtiger Reihenfolge). */
  function splitInlineLetters(line) {
    if (!/(^|\s)a\)\s/.test(line)) return [line];
    const out = [];
    let rest = line;
    for (let i = 1; i < LETTERS.length; i++) {
      const m = rest.match(new RegExp(`\\s${LETTERS[i]}\\)\\s`));
      if (!m) break;
      out.push(rest.slice(0, m.index).trim());
      rest = rest.slice(m.index).trim();
    }
    out.push(rest);
    return out.filter(Boolean);
  }

  /**
   * Mehrteilige Prüfungsfragen in einzelne Fragen zerlegen, damit der Prüfer
   * wie in echt eine nach der anderen stellt. Erkennt Blöcke ("A)", "B:",
   * "1.", "2.") und Teilaufgaben ("a)", "b)"). Der Einleitungstext kommt zur
   * ersten Teilfrage. Einteilige Fragen bleiben unverändert.
   */
  function splitQuestionParts(text) {
    const raw = String(text || '').trim();
    const lines = raw.split('\n').map(l => l.trim()).filter(Boolean).flatMap(splitInlineLetters);
    const blockRe = /^(?:([A-D])[):]|(\d)\.)\s+/;
    const partRe = /^([a-h])\)\s+/;
    const blockCount = lines.filter(l => blockRe.test(l)).length;
    const partCount = lines.filter(l => partRe.test(l)).length;
    if (blockCount < 2 && partCount < 2) return [raw];
    const blocks = [];
    const intro = [];
    let block = null;
    for (const line of lines) {
      if (blockCount >= 2 && blockRe.test(line)) {
        block = { head: [line], parts: [] };
        blocks.push(block);
      } else if (partRe.test(line)) {
        if (!block) {
          block = { head: [], parts: [] };
          blocks.push(block);
        }
        block.parts.push([line]);
      } else if (block && block.parts.length) {
        block.parts[block.parts.length - 1].push(line);
      } else if (block) {
        block.head.push(line);
      } else {
        intro.push(line);
      }
    }
    const parts = [];
    for (const b of blocks) {
      const head = b.head.join('\n');
      if (!b.parts.length) {
        parts.push(head);
        continue;
      }
      b.parts.forEach((p, i) => parts.push([i === 0 ? head : '', p.join('\n')].filter(Boolean).join('\n')));
    }
    if (!parts.length) return [raw];
    if (intro.length) parts[0] = `${intro.join('\n')}\n${parts[0]}`;
    return parts;
  }

  /**
   * Nachfrage des lokalen Prüfers – wie in echt sparsam: nur nach einer schwachen Antwort,
   * einmal, und nur zu einem fehlenden Punkt der gestellten Teilaufgaben. Lieber mehr
   * verschiedene Fragen als eine Frage erschöpfend.
   */
  function examinerFollowUp(question, evaluation, round) {
    if (round > 0 || evaluation.score >= 0.6 || !evaluation.missing.length) return null;
    return `Das reicht mir noch nicht ganz. Gehen Sie bitte genauer auf folgenden Aspekt ein: ${evaluation.missing[0]}.`;
  }

  // ------------------------------------------------------------------ Teilaufgaben in der mündlichen Prüfung

  const BLOCK_LINE = /^\s*([A-D])[):]\s/;
  const PART_LINE = /^\s*(?:([A-D])\s+)?([a-h])\)\s/;
  const NUMBER_LINE = /^\s*(\d)\.\s/;

  /** Kennung je Teilaufgabe: „a“, „Ab“ (Block A, Teil b), „B“ oder „2“; null, wenn keine erkennbar. */
  function partLabels(parts) {
    let block = '';
    return parts.map(text => {
      let letter = '';
      let number = '';
      for (const line of text.split('\n').flatMap(splitInlineLetters)) {
        const p = PART_LINE.exec(line);
        const b = !p && BLOCK_LINE.exec(line);
        const n = !p && !b && NUMBER_LINE.exec(line);
        if (p) {
          if (p[1]) block = p[1];
          letter = p[2];
        } else if (b) {
          block = b[1];
          letter = '';
        } else if (n && !letter && !number) {
          number = n[1];
        }
      }
      return letter ? block + letter : (block || number || null);
    });
  }

  /** Abschnitte der Musterantwort nach denselben Kennungen („a)“, „A b)“, „B:“). */
  function answerSections(modelAnswer) {
    const sections = {};
    let block = '';
    let key = null;
    for (const line of String(modelAnswer || '').split('\n').flatMap(splitInlineLetters)) {
      const p = PART_LINE.exec(line);
      const b = !p && BLOCK_LINE.exec(line);
      if (p) {
        if (p[1]) block = p[1];
        key = block + p[2];
      } else if (b) {
        block = b[1];
        key = block;
      }
      if (key) sections[key] = sections[key] ? `${sections[key]}\n${line}` : line;
    }
    return sections;
  }

  /** Teilaufgaben einer Frage samt zugehörigem Abschnitt der Musterantwort (sections null: nicht zuordenbar). */
  function examPartMap(q) {
    const parts = splitQuestionParts(q.question);
    const labels = partLabels(parts);
    const found = answerSections(q.modelAnswer);
    const mapped = parts.length > 1 && new Set(labels).size === labels.length && labels.every(l => l && found[l]);
    return { parts, labels, sections: mapped ? labels.map(l => found[l]) : null };
  }

  // Teilaufgaben aus einem anderen Prüfungsgebiet (z. B. Bremsanlagen in einer Rechtsfrage) möglichst nicht stellen.
  const OFF_TOPIC = {
    recht: /Bremsanlage|Bremskraft|Motor|Getriebe|Kupplung|Lenkung|Fahrwerk|Stoßdämpfer|Batterie|Zündung|Einspritz|Abgasanlage|Katalysator|Turbo|Hydraulik|Druckluft/i,
    paedagogik: /Bremsanlage|Bremskraft|Motor|Getriebe|Kupplung|Lenkung|Fahrwerk|Stoßdämpfer|Batterie|Zündung|Einspritz|Abgasanlage|Katalysator|Turbo|Hydraulik|Druckluft/i
  };

  /**
   * Welche Teilaufgaben der Prüfer stellt: bei mehr als zwei Teilen nur ein oder zwei
   * aufeinanderfolgende, jedes Mal andere (mal a und b, mal c und d). Teile aus einem
   * fremden Fach werden ausgelassen, solange es andere gibt.
   */
  function pickExamParts(q, rand, panel) {
    const count = splitQuestionParts(q.question).length;
    if (count <= 2) return Array.from({ length: count }, (_, i) => i);
    const parts = splitQuestionParts(q.question);
    const take = rand() < 0.3 ? 1 : 2;
    const offTopic = OFF_TOPIC[panel || examPanelFor(q)];
    const windows = [];
    for (let start = 0; start + take <= count; start++) windows.push(Array.from({ length: take }, (_, i) => start + i));
    const fitting = windows.filter(w => (!offTopic || w.every(i => !offTopic.test(parts[i]))) && !dependsOnPrevious(parts[w[0]], w[0]));
    const pool = fitting.length ? fitting : windows;
    return pool[Math.floor(rand() * pool.length)];
  }

  const DEPENDENT = /\b(?:diese[nmrs]?|dies|dabei|dazu|hierzu|hierbei|davon|deren|dessen|ebenfalls|außerdem|weitere[nmrs]?)\b|^(?:nennen|geben)\s+sie\s+(?:\d+|ein|zwei|drei)\s+beispiel|^(?:begründen|erläutern)\s+sie\s+(?:das|ihre)\b/i;

  /** Baut eine Teilaufgabe auf die vorige auf („Wie erreichen Sie diese Ziele?“, „Nennen Sie 2 Beispiele!“)? */
  function dependsOnPrevious(text, index) {
    if (index === 0) return false;
    const own = String(text).split('\n').filter(line => PART_LINE.test(line) || NUMBER_LINE.test(line)).join(' ')
      .replace(/^\s*(?:[A-D]\s+)?(?:[a-h]\)|\d\.)\s*/, '').trim();
    return own.length < 30 || DEPENDENT.test(own);
  }

  /** Gültige Auswahl von Teilaufgaben oder null (= ganze Frage). */
  function validParts(q, indices) {
    const count = splitQuestionParts(q.question).length;
    if (!Array.isArray(indices) || !indices.length || indices.length >= count) return null;
    const list = Array.from(new Set(indices)).filter(i => Number.isInteger(i) && i >= 0 && i < count).sort((a, b) => a - b);
    return list.length && list.length < count ? list.slice(0, 2) : null;
  }

  /** Einleitung bzw. Blocküberschrift, die zur Teilaufgabe gehört, aber nur beim ersten Teil steht. */
  function partContext(parts, labels, index) {
    const block = labels[index] && /^[A-D]/.test(labels[index]) ? labels[index][0] : '';
    let first = 0;
    if (block) first = labels.findIndex(l => l && l[0] === block);
    if (first < 0 || first === index) return '';
    const lines = parts[first].split('\n');
    const end = lines.findIndex(line => PART_LINE.test(line) || NUMBER_LINE.test(line));
    const context = (end < 0 ? [] : lines.slice(0, end)).join('\n').trim();
    // Nur echte Einleitungen („Straßenbenutzung:“ oder ein Fallbeispiel) – eine kurze
    // Überschrift ohne Doppelpunkt gehört meist nur zur ersten Teilaufgabe („Haltverbote“).
    return /:$/.test(context) || context.length > 80 ? context : '';
  }

  /** Texte der gestellten Teilaufgaben; der erste bekommt den nötigen Zusammenhang (Einleitung). */
  function examPartTexts(q, indices) {
    const parts = splitQuestionParts(q.question);
    const chosen = validParts(q, indices);
    if (!chosen) return parts;
    const labels = partLabels(parts);
    const context = partContext(parts, labels, chosen[0]);
    return chosen.map((i, n) => (n === 0 && context ? `${context}\n${parts[i]}` : parts[i]));
  }

  /** Kernpunkte der gestellten Teilaufgaben – null, wenn die Teile nicht zuordenbar sind. */
  function keyPointsForParts(q, indices) {
    const chosen = validParts(q, indices);
    if (!chosen) return null;
    const map = examPartMap(q);
    if (!map.sections) return null;
    const texts = map.sections.map(normalize);
    const set = new Set(chosen);
    const picked = q.keyPoints.filter(point => {
      const hits = texts.map(t => point.keywords.filter(k => findKeyword(t, k) >= 0).length);
      const best = Math.max(...hits);
      return best > 0 && hits.some((h, i) => h === best && set.has(i));
    });
    return picked.length ? picked : null;
  }

  /**
   * Die Frage so, wie sie in der Prüfung gestellt wird: nur die gewählten Teilaufgaben,
   * dazu passende Kernpunkte und – wenn zuordenbar – nur der passende Teil der Musterantwort.
   */
  function examQuestion(q, indices) {
    const chosen = validParts(q, indices);
    if (!chosen) return q;
    const map = examPartMap(q);
    const points = keyPointsForParts(q, chosen);
    return Object.assign({}, q, {
      question: examPartTexts(q, chosen).join('\n'),
      modelAnswer: map.sections ? chosen.map(i => map.sections[i]).join('\n\n') : q.modelAnswer,
      keyPoints: points || q.keyPoints,
      followUps: [],
      partNote: map.sections
        ? 'In der Prüfung werden von dieser Frage nur die genannten Teilaufgaben gestellt. Bewerte nur diese.'
        : `In der Prüfung werden von dieser Frage nur die genannten Teilaufgaben gestellt (${chosen.length} von ${map.parts.length}). Die Musterantwort deckt die ganze Frage ab – bewerte nur, was zu den gestellten Teilen gehört.`
    });
  }

  /** Bewertung der Antworten auf die gestellten Teilaufgaben (Hauptfrage und Nachfrage zusammen). */
  function evaluateExamAnswers(question, answers, indices) {
    const text = answers.join(' \n ');
    const chosen = validParts(question, indices);
    if (!chosen) return evaluateAnswer(question, text);
    const points = keyPointsForParts(question, chosen);
    if (points) return evaluateAnswer(Object.assign({}, question, { keyPoints: points }), text);
    // Nicht zuordenbar: am Anteil der gestellten Teile messen; fehlende Punkte könnten aus
    // nicht gestellten Teilen stammen und werden daher nicht als Nachfrage verwendet.
    const share = chosen.length / splitQuestionParts(question.question).length;
    const result = evaluateAnswer(question, text, { share });
    return Object.assign(result, { missing: [], feedback: buildFeedback(result.score, [], result.wrong) });
  }

  // ------------------------------------------------------------------ Zeichennamen statt Nummern

  const SIGN_NUM = '\\d{3}(?:\\.\\d{1,2})?';
  const SIGN_REF = new RegExp(
    `(\\b(?:Verkehrszeichen|Zeichen)\\s|\\b(?:VZ|Z\\.?)\\s?)(${SIGN_NUM}(?:\\s?(?:,|\\/|und|oder|bzw\\.)\\s?(?:Z\\.?\\s?)?${SIGN_NUM})*)(?![\\d.,]?\\d|\\s?[–-]\\s?\\d)(\\s\\([^()\\n]{1,60}\\))?`,
    'g'
  );
  const DROP = '\u0000';
  const DASH = '\u0001';

  const STOP_WORDS = new Set(['fuer', 'mit', 'und', 'oder', 'bei', 'der', 'die', 'das', 'des', 'dem', 'den', 'ein', 'eine', 'einer', 'eines', 'ueber', 'unter', 'vor', 'nach', 'auf', 'aus', 'von', 'zum', 'zur', 'nur', 'auch', 'wird', 'ist']);

  /** Wortstamm zum Vergleichen (erste fünf Buchstaben); Füllwörter zählen nicht. */
  function stem(word) {
    const w = normalize(word).replace(/[^a-z0-9]/g, '');
    return STOP_WORDS.has(w) ? '' : w.slice(0, 5);
  }

  /** Steht der Name direkt vor der Nummer („Leitlinie (Z 340)“, „Ortstafel Z 310“, „„Kinder“ (Zeichen 136)“)? */
  function namedBefore(before, name) {
    if (normalize(before).replace(/[\s(„“"]+$/, '').endsWith(normalize(name))) return true;
    const m = /([^\s;:,.()–-]+)\s\($/.exec(before) || /([^\s;:,.()–-]+)\s$/.exec(before);
    return Boolean(m) && namesSign(m[1].replace(/[„“"]/g, ''), name);
  }

  /** Steht der Zeichenname schon im Text („Leitlinie“, „(Bahnübergang)“, „„Tunnel““, „– den Grünpfeil …“)? */
  function namesSign(text, name) {
    const words = String(text).trim().split(/\s+/);
    if (/^„/.test(words[0] || '')) return true;
    // Gedankenstrich und Artikel überspringen („Z 721 – den Grünpfeil …“), höchstens zwei Wörter.
    let i = 0;
    while (i < 2 && i < words.length - 1 && (/^[–-]$/.test(words[i]) || (!stem(words[i]) && /^[a-zäöü]+$/i.test(words[i])))) i += 1;
    const key = stem(words[i] || '');
    return key.length >= 4 && normalize(name).split(/[\s-]+/).some(w => w.length >= 4 && stem(w) === key);
  }

  /**
   * Zeichennummern durch Namen ersetzen: „Z 205“ → „„Vorfahrt gewähren““, „Zeichen 268“ →
   * „Zeichen „Schneeketten vorgeschrieben““. Steht der Name schon daneben, fällt nur die Nummer weg.
   * names: Map Nummer → Name. Unbekannte Nummern, Bereiche („278–282“) und „Zeichen 136 bedeutet …“
   * (die Nummer ist dort der Inhalt) bleiben unverändert.
   */
  function signNamesInText(text, names) {
    const source = String(text || '');
    let changed = false;
    const out = source.replace(SIGN_REF, (match, prefix, list, paren, offset) => {
      const numbers = list.match(new RegExp(SIGN_NUM, 'g'));
      const found = numbers.map(n => names.get(n));
      if (found.some(n => !n)) return match;
      const after = source.slice(offset + match.length);
      const before = source.slice(Math.max(0, offset - 80), offset);
      const word = /zeichen/i.test(prefix) ? 'Zeichen ' : '';
      changed = true;
      if (numbers.length > 1) {
        if (new Set(found).size === 1) return `${word}„${found[0]}“${paren || ''}`;
        const seps = list.split(new RegExp(`(?:Z\\.?\\s?)?${SIGN_NUM}`)).slice(1, -1).map(sep => (sep.trim() === '/' ? ' bzw. ' : sep));
        return word + found.map((n, i) => `„${n}“${i < seps.length ? seps[i] : ''}`).join('') + (paren || '');
      }
      const name = found[0];
      if (!paren && /^\s+(?:bedeutet|heißt)\s+„/.test(after)) {
        changed = false;
        return match;
      }
      if (namedBefore(before, name)) return before.endsWith('(') && after.startsWith(')') && !paren ? DROP : (paren || '');
      if (paren) {
        const inner = paren.trim().slice(1, -1);
        return namesSign(inner, name) ? `${word}„${inner}“` : `${word}„${name}“${paren}`;
      }
      if (namesSign(after, name)) return /^\s[–-]\s/.test(after) ? DASH : word.trim();
      return `${word}„${name}“`;
    });
    if (!changed) return source;
    return out
      .replace(new RegExp(`\\s?\\(${DROP}\\)`, 'g'), '')
      .split(DROP).join('')
      .replace(new RegExp(`${DASH}\\s[–-]\\s`, 'g'), '')
      .split(DASH).join('')
      .replace(/[ \t]{2,}/g, ' ')
      .replace(/^[ \t]+|[ \t]+$/gm, '')
      .replace(/\(\s*,?\s*/g, '(')
      .replace(/ ([),.;:])/g, '$1');
  }

  /** Karteikarte mit Zeichennamen statt Nummern (Vorder-, Rückseite, Ankreuz-Frage und -Antworten, Kernpunkte). */
  function withSignNames(q, names) {
    const fix = text => (typeof text === 'string' ? signNamesInText(text, names) : text);
    q.question = fix(q.question);
    q.modelAnswer = fix(q.modelAnswer);
    q.explanation = fix(q.explanation);
    q.example = fix(q.example);
    if (q.mc) {
      q.mc.prompt = fix(q.mc.prompt);
      if (Array.isArray(q.mc.options)) q.mc.options.forEach(o => { o.text = fix(o.text); });
    }
    // Bezeichnungen der Kernpunkte erscheinen in der Rückmeldung („Ergänzen Sie noch: …“).
    (q.keyPoints || []).concat(q.wrongClaims || []).forEach(p => { p.label = fix(p.label); });
    return q;
  }

  function examVerdict(scores) {
    if (!scores.length) return { avg: 0, label: 'Keine Bewertung', passed: false };
    const avg = round2(scores.reduce((a, b) => a + b, 0) / scores.length);
    const weakCount = scores.filter(s => s < 0.4).length;
    if (avg >= 0.75 && weakCount === 0) return { avg, label: 'Sehr sicher – so können Sie in die Prüfung gehen.', passed: true };
    if (avg >= 0.55 && weakCount <= 1) return { avg, label: 'Voraussichtlich bestanden – einzelne Lücken schließen.', passed: true };
    return { avg, label: 'Noch nicht prüfungsreif – üben Sie die schwachen Fächer gezielt.', passed: false };
  }

  return {
    STATE_VERSION,
    createState,
    migrateState,
    dateKey,
    normalize,
    evaluateAnswer,
    evaluateChoice,
    combineScores,
    recordAttempt,
    markSeen,
    markShown,
    lastSeenAt,
    freshOrder,
    questionMastery,
    leitnerBox,
    isDue,
    masteryLevel,
    subjectStats,
    overallStats,
    weaknessAnalysis,
    dailyPlan,
    streak,
    pickExamQuestions,
    EXAM_PANEL,
    examPanelFor,
    similarQuestions,
    inOralExam,
    buildExamPanel,
    gradeFromScore,
    oralExamGrades,
    reconstructOralExams,
    splitQuestionParts,
    examinerFollowUp,
    evaluateExamAnswers,
    partLabels,
    answerSections,
    pickExamParts,
    examPartTexts,
    keyPointsForParts,
    examQuestion,
    signNamesInText,
    withSignNames,
    examVerdict
  };
});
