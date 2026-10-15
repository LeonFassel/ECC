/**
 * Gemeinsame Anweisungen für die KI-Bewertung und den KI-Prüfer.
 * Genutzt vom Server (Claude API) und von der gehosteten Seite (Claude über den Viewer).
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FLPrompts = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const MAX_ANSWER_CHARS = 6000;
  const MAX_TURNS = 40;

  const EVALUATION_SYSTEM = [
    'Du bist erfahrenes Mitglied eines Prüfungsausschusses für die Fahrlehrerprüfung (Fahrlehrerlaubnisklasse BE) in Deutschland.',
    'Du bewertest die frei formulierte, oft mündlich eingesprochene Antwort eines Prüflings auf eine Frage aus der mündlichen Fachkundeprüfung.',
    'Die Antwort kann Tipp- oder Spracherkennungsfehler enthalten – bewerte den Inhalt, nicht die Rechtschreibung.',
    'Grundlage sind die Musterantwort und die Kernpunkte. Gleichwertige Formulierungen und zusätzliche richtige Inhalte zählen positiv; fachliche Fehler zählen negativ.',
    'Antworte in einfachem, freundlichem Deutsch. Sprich den Prüfling mit „Sie“ an.',
    'score: 0 = nichts Relevantes, 0.5 = etwa die Hälfte der Kernpunkte korrekt, 1 = vollständig und fehlerfrei. Fachliche Fehler senken den Score deutlich.',
    'covered: was richtig war (Bezeichnungen der Kernpunkte). missing: was fehlte. errors: konkrete fachliche Fehler oder Verwechslungen in der Antwort, jeweils mit kurzer Richtigstellung (leer, wenn keine).',
    'feedback: 2–4 Sätze zur Antwort. tip: ein konkreter Lerntipp.'
  ].join('\n');

  const EVALUATION_FORMAT = 'Antworte ausschließlich mit einem JSON-Objekt dieser Form: {"score": 0.0-1.0, "covered": [string], "missing": [string], "errors": [string], "feedback": string, "tip": string}';

  const EXAMINER_SYSTEM = [
    'Du bist Vorsitzende/r des Prüfungsausschusses in einer mündlichen Fachkundeprüfung für Fahrlehreranwärter (Klasse BE) in Deutschland.',
    'Führe eine realistische, faire mündliche Prüfung auf Deutsch. Sprich den Prüfling mit „Sie“ an. Antworten können per Spracherkennung entstanden sein.',
    'Ablauf: Stelle die vorgegebenen Prüfungsfragen nacheinander in der angegebenen Reihenfolge. Hake nach jeder Antwort ein- bis zweimal gezielt nach,',
    'wenn Kernpunkte fehlen, etwas unklar oder falsch ist oder um Praxistransfer zu prüfen (z. B. „Wie würden Sie das einem Fahrschüler erklären?“).',
    'Verrate keine Musterlösung während der Prüfung. Gib höchstens einen kleinen Denkanstoß, wenn der Prüfling feststeckt.',
    'Ist eine Frage ein Verkehrszeichen, sieht der Prüfling nur die Grafik: Nenne den Namen des Zeichens nicht, frage z. B. „Was bedeutet dieses Zeichen?“.',
    'Wenn eine Frage abgeschlossen ist, setze assessment.completed = true, trage die questionId ein und bewerte die Gesamtleistung zu dieser Frage (score 0..1, fehlende Kernpunkte, kurzer Kommentar inkl. fachlicher Fehler).',
    'Leite dann in message direkt zur nächsten Frage über. Andernfalls assessment.completed = false, questionId = "", score = 0, missing = [], comment = "".',
    'Nach der letzten Frage: finished = true und summary mit einer ehrlichen Gesamteinschätzung (Stärken, Lücken, Empfehlung). Sonst finished = false, summary = "".',
    'Halte deine Beiträge kurz wie in einer echten Prüfung (1–4 Sätze).'
  ].join('\n');

  const EXAMINER_FORMAT = 'Antworte ausschließlich mit einem JSON-Objekt dieser Form: {"message": string, "assessment": {"completed": boolean, "questionId": string, "score": 0.0-1.0, "missing": [string], "comment": string}, "finished": boolean, "summary": string}';

  function clampText(text, max) {
    const value = String(text || '');
    return value.length > max ? value.slice(0, max) : value;
  }

  function questionBrief(q) {
    const lines = [
      `Frage-ID: ${q.id}`,
      `Thema: ${q.topic}`,
      q.signLabel ? `Verkehrszeichen: ${q.signLabel} „${q.name}“${q.imageSrc && q.imageSrc.length ? ' (der Prüfling sieht nur die Originalabbildung)' : ''}` : null,
      q.official && q.official.length ? `Amtlicher Text (StVO): ${q.official.map(part => part.text).join(' ')}` : null,
      `Frage: ${q.question}`,
      `Musterantwort: ${q.modelAnswer}`,
      `Kernpunkte: ${q.keyPoints.map(p => p.label).join('; ')}`,
      q.wrongClaims && q.wrongClaims.length ? `Typische Fehler: ${q.wrongClaims.map(c => c.label).join('; ')}` : null,
      `Mögliche Nachfragen: ${(q.followUps || []).join(' | ')}`
    ];
    return lines.filter(Boolean).join('\n');
  }

  function evaluationUserText(question, answer) {
    return [
      questionBrief(question),
      '',
      'Antwort des Prüflings:',
      '<antwort>',
      clampText(answer, MAX_ANSWER_CHARS),
      '</antwort>'
    ].join('\n');
  }

  /** Ein einziger Prompt für Umgebungen ohne System-Prompt. */
  function evaluationPrompt(question, answer) {
    return `${EVALUATION_SYSTEM}\n\n${evaluationUserText(question, answer)}\n\n${EVALUATION_FORMAT}`;
  }

  function examinerPlan(questions) {
    const plan = questions.map((q, i) => `### Prüfungsfrage ${i + 1}\n${questionBrief(q)}`).join('\n\n');
    return `Prüfungsplan (nur für dich als Prüfer sichtbar):\n\n${plan}\n\nBeginne jetzt die Prüfung mit einer kurzen Begrüßung und der ersten Frage.`;
  }

  /**
   * Baut abwechselnde Nachrichten (user/assistant) aus dem Gesprächsverlauf.
   * history: [{ role: 'examiner' | 'candidate', text }]
   * Die Liste beginnt und endet immer mit einer user-Nachricht.
   */
  function examinerMessages(questions, history, leadText) {
    const turns = (history || []).slice(-MAX_TURNS);
    const messages = [{ role: 'user', content: leadText || examinerPlan(questions) }];
    for (const turn of turns) {
      const role = turn.role === 'candidate' ? 'user' : 'assistant';
      const content = role === 'user'
        ? `<pruefling>${clampText(turn.text, MAX_ANSWER_CHARS)}</pruefling>`
        : clampText(turn.text, MAX_ANSWER_CHARS);
      const prev = messages[messages.length - 1];
      if (prev.role === role) prev.content += `\n\n${content}`;
      else messages.push({ role, content });
    }
    if (messages[messages.length - 1].role === 'assistant') {
      messages.push({ role: 'user', content: '(Der Prüfling wartet auf Ihre nächste Frage.)' });
    }
    return messages;
  }

  function normalizeScore(value) {
    const n = Number(value);
    if (!Number.isFinite(n)) return 0;
    return Math.round(Math.min(1, Math.max(0, n)) * 100) / 100;
  }

  function strings(list) {
    return Array.isArray(list) ? list.map(item => String(item)).filter(Boolean) : [];
  }

  function normalizeEvaluation(data) {
    const d = data && typeof data === 'object' ? data : {};
    return {
      score: normalizeScore(d.score),
      covered: strings(d.covered),
      missing: strings(d.missing),
      errors: strings(d.errors),
      feedback: String(d.feedback || ''),
      tip: String(d.tip || '')
    };
  }

  function normalizeExaminerTurn(data) {
    const d = data && typeof data === 'object' ? data : {};
    const a = d.assessment && typeof d.assessment === 'object' ? d.assessment : null;
    return {
      message: String(d.message || ''),
      assessment: a && a.completed
        ? { questionId: String(a.questionId || ''), score: normalizeScore(a.score), missing: strings(a.missing), comment: String(a.comment || '') }
        : null,
      finished: Boolean(d.finished),
      summary: String(d.summary || '')
    };
  }

  return {
    MAX_ANSWER_CHARS,
    EVALUATION_SYSTEM,
    EVALUATION_FORMAT,
    EXAMINER_SYSTEM,
    EXAMINER_FORMAT,
    questionBrief,
    evaluationUserText,
    evaluationPrompt,
    examinerPlan,
    examinerMessages,
    normalizeEvaluation,
    normalizeExaminerTurn
  };
});
