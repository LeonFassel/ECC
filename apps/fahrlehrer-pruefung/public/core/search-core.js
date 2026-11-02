/**
 * Volltextsuche über alle Fragen, Karteikarten und Verkehrszeichen (ohne DOM).
 * Findet Antworten auf frei formulierte Fragen ("Wie lang darf eine
 * Fahrzeugkombination sein?"): Füllwörter fallen weg, Wortstämme werden auch
 * in zusammengesetzten Wörtern gefunden, seltene Begriffe zählen mehr.
 * Liefert Treffer mit passender Textstelle und genannten Paragrafen.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FLSearch = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const STOPWORDS = new Set((
    'a ab aber alle allem allen aller alles also am an ander andere anderen auch auf aus bei beim bin bis bitte bzw ' +
    'da dabei damit dann darf darfst das dass dem den denen denn der des dessen die dies diese diesem diesen dieser ' +
    'dieses doch dort du durch duerfen ein eine einem einen einer eines einige er erklaeren erlaeutern es etwa etwas ' +
    'euch fuer gibt gilt habe haben hat hier ich ihm ihn ihr ihre im immer in ins ist ja jede jeder jedes kann kein ' +
    'keine koennen man mehr mein mich mir mit muss muessen nach nein nennen nicht noch nur ob oder ohne sein seine ' +
    'sich sie sind so soll sollen sowie ueber um und uns unter viel vom von vor wann war warum was weil welche ' +
    'welchem welchen welcher welches wem wen wenn wer werden wessen wie wieso wieviel wir wird wo wodurch womit worauf zu zum zur ' +
    'zwischen sagen sage beschreiben bedeutet bedeutung'
  ).split(/\s+/));

  // Eigenschaftswörter aus Fragen ("wie lang …") auf die Begriffe der Antworten abbilden.
  // "=wort" passt nur auf das ganze Wort (sonst fände "lang" auch "langsam" und "verlangen").
  const SYNONYMS = {
    lang: ['laenge', 'abmessung', '=lang', '=lange'],
    breit: ['breite', 'abmessung', '=breit'],
    hoch: ['hoehe', 'abmessung', '=hoch'],
    schwer: ['masse', 'gewicht', '=schwer'],
    schnell: ['geschwindigkeit', 'km/h', '=schnell'],
    alt: ['alter', '=alt'],
    teuer: ['bussgeld', 'euro'],
    strafe: ['bussgeld', 'strafe', 'punkt'],
    kosten: ['bussgeld', 'euro', 'kosten'],
    paragraf: ['§'],
    paragraph: ['§']
  };

  const LAW_RE = /(?:§§?\s*\d+[a-z]?(?:\s*(?:Abs\.?|Absatz)\s*\d+[a-z]?)?(?:\s*(?:S\.|Satz)\s*\d+)?(?:\s*Nr\.?\s*\d+[a-z]?)?\s+(?:StVO|StVG|StVZO|FeV|FZV|FahrlG|FahrschAusbO|FahrlAusbV|FahrlPrüfV|StGB|OWiG|BKatV|PflVG|VVG|BGB|HGB|GG|FPersV|ArbZG|KraftStG|DV-FahrlG|BImSchV|36\. BImSchV))|(?:Anlage\s+\d+[a-z]?(?:\s+(?:Nr\.|Abschnitt)\s*[\dA-Z.]+)?\s+(?:FeV|StVO|StVZO|FahrschAusbO|FahrlAusbV|DV-FahrlG|FZV))|(?:Zeichen\s+\d{3,4}(?:[.-]\d+)?)/g;

  function normalize(text) {
    return String(text || '')
      .toLowerCase()
      .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
      .replace(/§/g, ' § ')
      .replace(/[^a-z0-9§/,.\s]/g, ' ')
      .replace(/(\d)[.,](\d)/g, '$1,$2')
      .replace(/[.]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /** Leichter Wortstamm: häufige deutsche Endungen ab, damit "Kombinationen" = "Kombination". */
  function stem(word) {
    if (word.length <= 5 || /\d/.test(word) || word.startsWith('=')) return word;
    for (const suffix of ['ungen', 'innen', 'en', 'er', 'es', 'em', 'e', 'n', 's']) {
      if (word.endsWith(suffix) && word.length - suffix.length >= 4) return word.slice(0, -suffix.length);
    }
    return word;
  }

  /** Suchbegriffe einer Anfrage: je Begriff eine Gruppe gleichwertiger Varianten. */
  function queryTerms(query) {
    const words = normalize(query).split(' ').map(w => w.replace(/^[,/]+|[,/]+$/g, '')).filter(Boolean);
    const groups = [];
    const seen = new Set();
    for (const word of words) {
      if (STOPWORDS.has(word) || seen.has(word)) continue;
      seen.add(word);
      const variants = (SYNONYMS[word] || [word]).map(stem);
      groups.push({ word, variants: Array.from(new Set(variants)) });
    }
    return groups;
  }

  /** Kurze Begriffe (Zahlen, Kürzel) nur als ganzes Wort, längere auch als Wortteil. */
  function variantMatcher(variant) {
    const exact = variant.startsWith('=');
    const word = exact ? variant.slice(1) : variant;
    if (!exact && word.length >= 4 && !/^\d+$/.test(word)) return text => text.includes(word);
    const re = new RegExp(`(^|[^a-z0-9])${word.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')}($|[^a-z0-9])`);
    return text => re.test(text);
  }

  function documentText(q, subjectName) {
    const keyPoints = (q.keyPoints || []).map(k => k.label).join(' · ');
    const official = (q.official || []).map(p => p.text).join(' ');
    const sign = q.signLabel ? `${q.signLabel} ${q.name || ''} ${q.category || ''}` : '';
    const body = [q.modelAnswer, official, q.explanation, q.note].filter(Boolean).join('\n');
    return {
      title: q.signLabel ? `${sign} – ${q.question}` : q.question,
      topic: [q.topic, sign].filter(Boolean).join(' '),
      points: keyPoints,
      body,
      category: [subjectName, q.deckName].filter(Boolean).join(' ')
    };
  }

  const WEIGHTS = { title: 4, topic: 3, points: 2, body: 1, category: 1 };

  /**
   * Suchindex aus den App-Daten. Doppelte Fragen (gleicher Fragetext, z. B. eine
   * Frage im Fach und als Karteikarte) erscheinen nur einmal.
   */
  function createIndex(data) {
    const subjects = new Map((data.subjects || []).map(s => [s.id, s.name]));
    const docs = [];
    const byQuestion = new Map();
    for (const q of data.questions || []) {
      if (!q || !q.question) continue;
      const text = documentText(q, subjects.get(q.subject) || '');
      const norm = {};
      for (const field of Object.keys(WEIGHTS)) norm[field] = ` ${normalize(text[field])} `;
      const key = q.signLabel ? q.id : norm.title;
      // Lange Aufgabentexte (mehrteilige Prüfungsaufgaben) enthalten viele Nebenbegriffe:
      // ein Treffer im Titel zählt dort weniger.
      const titleWeight = WEIGHTS.title * Math.min(1, 30 / Math.max(1, norm.title.split(' ').length));
      const doc = { id: q.id, question: q, text, norm, titleWeight: Math.max(WEIGHTS.topic, titleWeight) };
      const existing = byQuestion.get(key);
      // Fach-Frage vor Karteikarte, weil sie die ausführlichere Musterantwort hat.
      if (existing && !(existing.question.collection === 'karteikarten' && q.collection !== 'karteikarten')) continue;
      if (existing) docs.splice(docs.indexOf(existing), 1, doc);
      else docs.push(doc);
      byQuestion.set(key, doc);
    }
    return { docs };
  }

  function search(index, query, limit) {
    const groups = queryTerms(query);
    if (!groups.length) return { terms: [], total: 0, results: [] };
    const terms = groups.map(g => g.variants);
    const matchers = terms.map(vs => vs.map(variantMatcher));
    const n = index.docs.length;
    const hitsPerGroup = matchers.map(ms => index.docs.map(doc => {
      const fields = {};
      for (const field of Object.keys(WEIGHTS)) fields[field] = ms.some(m => m(doc.norm[field]));
      return fields;
    }));
    const idf = hitsPerGroup.map(hits => {
      const df = hits.filter(f => Object.values(f).some(Boolean)).length;
      return Math.log(1 + n / (1 + df));
    });
    const ctx = { groups, terms, idf, hitsPerGroup, phrase: groups.length > 1 ? ` ${groups.map(g => g.word).join(' ')} ` : '' };
    const scored = [];
    index.docs.forEach((doc, i) => {
      const hit = scoreDoc(doc, i, ctx);
      if (hit) scored.push(hit);
    });
    // Feinschliff für die besten Kandidaten: alle Begriffe in derselben Antwortzeile zählen mehr.
    scored.sort((a, b) => b.score - a.score);
    for (const hit of scored.slice(0, 80)) {
      hit.snippet = bestSnippet(hit.doc.text.body, terms);
      if (groups.length > 1 && hit.snippet.coverage === groups.length) hit.score *= 1.5;
    }
    scored.sort((a, b) => b.score - a.score || a.doc.id.localeCompare(b.doc.id));
    return {
      terms,
      total: scored.length,
      results: scored.slice(0, limit || 25).map(hit => ({
        id: hit.doc.id,
        question: hit.doc.question,
        score: hit.score,
        complete: hit.matched === groups.length,
        snippet: (hit.snippet || bestSnippet(hit.doc.text.body, terms)).text,
        laws: lawReferences(`${hit.doc.text.body}\n${hit.doc.text.title}`)
      }))
    };
  }

  function scoreDoc(doc, i, ctx) {
    let score = 0;
    let matched = 0;
    ctx.groups.forEach((_, g) => {
      const fields = ctx.hitsPerGroup[g][i];
      const weights = Object.keys(WEIGHTS).filter(f => fields[f]).map(f => (f === 'title' ? doc.titleWeight : WEIGHTS[f]));
      if (!weights.length) return;
      matched++;
      score += ctx.idf[g] * (Math.max(...weights) + 0.25 * (weights.length - 1));
    });
    if (!matched) return null;
    score *= Math.pow(matched / ctx.groups.length, 2);
    if (ctx.phrase && (doc.norm.title.includes(ctx.phrase) || doc.norm.topic.includes(ctx.phrase) || doc.norm.body.includes(ctx.phrase))) score *= 1.3;
    // "Zeichen 205": das Zeichen selbst vor Zusatzzeichen, die es nur erwähnen.
    const sign = doc.question.sign;
    if (sign && ctx.groups.some(g => g.word === normalize(sign))) score *= 2;
    return { doc, score, matched };
  }

  /**
   * Textabschnitt der Antwort, der die meisten Suchbegriffe enthält. Ist die Zeile
   * nur eine Überschrift ("b) Aquaplaning"), kommen die folgenden Zeilen dazu.
   */
  function bestSnippet(body, terms) {
    const lines = String(body || '').split('\n').map(l => l.trim()).filter(l => l.length > 2);
    if (!lines.length) return { text: '', coverage: 0 };
    const matchers = terms.map(vs => vs.map(variantMatcher));
    let bestIndex = 0;
    let bestScore = -1;
    lines.forEach((line, i) => {
      const norm = ` ${normalize(line)} `;
      const score = matchers.filter(ms => ms.some(m => m(norm))).length - i * 0.001;
      if (score > bestScore) {
        bestIndex = i;
        bestScore = score;
      }
    });
    let text = lines[bestIndex];
    for (let i = bestIndex + 1; text.length < 120 && i < lines.length; i++) text += ` ${lines[i]}`;
    return { text: text.length > 380 ? `${text.slice(0, 377)} …` : text, coverage: Math.round(bestScore) };
  }

  /**
   * Die Zeilen der Antwort, die Suchbegriffe enthalten (höchstens max, in der
   * Reihenfolge der Antwort) – für die Antwortbox des besten Treffers.
   */
  function answerLines(body, terms, max) {
    const matchers = terms.map(vs => vs.map(variantMatcher));
    const lines = String(body || '').split('\n').map(l => l.trim()).filter(l => l.length > 2);
    const ranked = lines.map((line, i) => {
      const norm = ` ${normalize(line)} `;
      return { line, i, hits: matchers.filter(ms => ms.some(m => m(norm))).length };
    }).filter(x => x.hits > 0 && x.line.length > 12);
    ranked.sort((a, b) => b.hits - a.hits || a.i - b.i);
    return ranked.slice(0, max || 3).sort((a, b) => a.i - b.i).map(x => x.line);
  }

  /** Genannte Paragrafen, Anlagen und Zeichennummern (ohne Dubletten, höchstens 6). */
  function lawReferences(text) {
    const found = [];
    for (const m of String(text || '').matchAll(LAW_RE)) {
      const ref = m[0].replace(/\s+/g, ' ').trim();
      if (!found.includes(ref)) found.push(ref);
      if (found.length >= 6) break;
    }
    return found;
  }

  /**
   * Text in Abschnitte zerlegen, damit die Oberfläche Suchbegriffe hervorheben kann:
   * [{ text, mark }]. Markiert werden ganze Wörter, die einen Suchbegriff enthalten.
   */
  function highlight(text, terms) {
    const parts = [];
    const re = /[\p{L}\p{N}§/]+/gu;
    let last = 0;
    const matchers = (terms || []).flat().map(variantMatcher);
    for (const m of String(text || '').matchAll(re)) {
      const norm = ` ${normalize(m[0])} `;
      if (!matchers.some(fn => fn(norm))) continue;
      if (m.index > last) parts.push({ text: text.slice(last, m.index), mark: false });
      parts.push({ text: m[0], mark: true });
      last = m.index + m[0].length;
    }
    if (last < String(text || '').length) parts.push({ text: String(text).slice(last), mark: false });
    return parts;
  }

  return { normalize, stem, queryTerms, createIndex, search, bestSnippet, answerLines, lawReferences, highlight };
});
