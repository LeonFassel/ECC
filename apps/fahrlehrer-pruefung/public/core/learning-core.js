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

  /**
   * Lokale, regelbasierte Bewertung einer frei formulierten Antwort.
   * Ein Kernpunkt gilt als genannt, wenn eines seiner Schlüsselwörter vorkommt.
   * Typische Fehler (wrongClaims) werden erkannt, sofern sie nicht verneint sind.
   */
  function evaluateAnswer(question, answerText) {
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
    let score = covered.length / total;
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
    if (score >= 0.6) return `Gute Antwort. Ergänzen Sie noch: ${missing.slice(0, 2).join(', ')}.${wrongNote}`;
    if (score >= 0.3) return `Teilweise richtig. Es fehlen wichtige Punkte, z. B. ${missing.slice(0, 3).join(', ')}.${wrongNote}`;
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

  /** Welcher Prüfer eine Frage stellt (null = nicht in der mündlichen Prüfung, z. B. Karteikarten). */
  function examPanelFor(q) {
    if (!q || q.collection === 'karteikarten' || q.subject === 'karteikarten') return null;
    if (q.subject === 'technik') return 'technik';
    if (q.subject === 'paedagogik' || q.subject === 'praxis') return 'paedagogik';
    if (q.subject === 'recht' || q.subject === 'verhalten') return TEACHING_TOPIC.test(q.topic || '') ? 'paedagogik' : 'recht';
    if (q.subject === 'zeichen') return 'recht';
    return null;
  }

  /**
   * Fragen je Prüfer, schwächere und neue Themen zuerst (mit Zufall). Beim Rechtler
   * ist etwa jede dritte Frage ein Verkehrszeichen. perSection: Vorrat je Prüfer
   * (mehr Fragen, als in die Zeit passen – die Zeit begrenzt die Prüfung).
   */
  function buildExamPanel(data, state, now, perSection) {
    const ts = typeof now === 'number' ? now : Date.now();
    const rand = seededRandom(`panel-${ts}`);
    const size = perSection || 12;
    const rank = list => list.map(q => {
      const m = questionMastery(state.attempts[q.id], ts);
      return { q, key: (m === null ? 0.4 : m) + rand() * 0.3 };
    }).sort((a, b) => a.key - b.key).map(x => x.q);
    return EXAM_PANEL.map(section => {
      const pool = data.questions.filter(q => examPanelFor(q) === section.id);
      let ids;
      if (section.id === 'recht') {
        const signs = rank(pool.filter(q => q.subject === 'zeichen'));
        const law = rank(pool.filter(q => q.subject !== 'zeichen'));
        ids = [];
        while (ids.length < size && (signs.length || law.length)) {
          const takeSign = signs.length && (!law.length || ids.length % 3 === 1);
          ids.push((takeSign ? signs : law).shift().id);
        }
      } else {
        ids = rank(pool).slice(0, size).map(q => q.id);
      }
      return Object.assign({}, section, { ids });
    }).filter(section => section.ids.length > 0);
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

  /** Nachfrage des lokalen Prüfers – greift fehlende Punkte auf. */
  function examinerFollowUp(question, evaluation, round) {
    if (evaluation.score >= 0.85 && round === 0) {
      return question.followUps[0] || null;
    }
    if (evaluation.missing.length > round && evaluation.score < 0.5) {
      // Jede Nachfrage greift einen anderen fehlenden Punkt auf – nie zweimal dieselbe.
      const point = evaluation.missing[round];
      return `${round === 0 ? 'Das reicht mir noch nicht ganz.' : 'Noch ein Punkt:'} Gehen Sie bitte genauer auf folgenden Aspekt ein: ${point}.`;
    }
    return question.followUps[round % question.followUps.length] || null;
  }

  /** Kombiniert die Antworten auf Hauptfrage und Nachfragen zu einer Bewertung. */
  function evaluateExamAnswers(question, answers) {
    return evaluateAnswer(question, answers.join(' \n '));
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
    buildExamPanel,
    splitQuestionParts,
    examinerFollowUp,
    evaluateExamAnswers,
    examVerdict
  };
});
