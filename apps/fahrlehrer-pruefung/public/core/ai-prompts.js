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
    'Werte eine Angabe nur dann als Fehler, wenn sie der Musterantwort widerspricht oder sicher falsch ist. Genauere Details, die über die Musterantwort hinausgehen (z. B. Einzelheiten aus Gesetzen und Verordnungen), sind kein Fehler, wenn du sie nicht sicher widerlegen kannst.',
    'Antworte in einfachem, freundlichem Deutsch. Sprich den Prüfling mit „Sie“ an.',
    'score: 0 = nichts Relevantes, 0.5 = etwa die Hälfte der Kernpunkte korrekt, 1 = vollständig und fehlerfrei. Fachliche Fehler senken den Score deutlich.',
    'covered: was richtig war (Bezeichnungen der Kernpunkte). missing: was fehlte. errors: konkrete fachliche Fehler oder Verwechslungen in der Antwort, jeweils mit kurzer Richtigstellung (leer, wenn keine).',
    'feedback: 2–4 Sätze zur Antwort. tip: ein konkreter Lerntipp.'
  ].join('\n');

  const EVALUATION_FORMAT = 'Antworte ausschließlich mit einem JSON-Objekt dieser Form: {"score": 0.0-1.0, "covered": [string], "missing": [string], "errors": [string], "feedback": string, "tip": string}';

  const EXAMINER_SYSTEM = [
    'Du bist Mitglied des Prüfungsausschusses in einer mündlichen Fachkundeprüfung für Fahrlehreranwärter (Klasse BE) in Deutschland.',
    'Der Prüfungsplan nennt dein Prüfungsgebiet und deine Rolle (Rechtler, Pädagoge oder Techniker) und wie viele Minuten du hast. Prüfe nur dein Gebiet.',
    'Führe eine realistische, faire mündliche Prüfung auf Deutsch. Sprich den Prüfling mit „Sie“ an. Antworten können per Spracherkennung entstanden sein.',
    'Ablauf: Stelle die vorgegebenen Prüfungsfragen nacheinander in der angegebenen Reihenfolge – es müssen nicht alle drankommen, die Prüfungszeit begrenzt das Gespräch. Hake nach jeder Antwort ein- bis zweimal gezielt nach,',
    'wenn Kernpunkte fehlen, etwas unklar oder falsch ist oder um Praxistransfer zu prüfen (z. B. „Wie würden Sie das einem Fahrschüler erklären?“).',
    'Stelle nie mehrere Fragen auf einmal: Hat eine Prüfungsfrage mehrere Teilaufgaben (a, b, c … oder A, B), stelle zuerst nur die erste Teilaufgabe, warte die Antwort ab und stelle dann die nächste – aufbauend, in eigenen Worten, kurz. Jede deiner Nachrichten enthält höchstens eine Frage.',
    'Verrate keine Musterlösung während der Prüfung. Gib höchstens einen kleinen Denkanstoß, wenn der Prüfling feststeckt.',
    'Werte eine Angabe nur dann als Fehler, wenn sie der Musterantwort widerspricht oder sicher falsch ist. Genauere richtige Details aus Gesetzen und Verordnungen, die über die Musterantwort hinausgehen, sind kein Fehler.',
    'Ist eine Frage ein Verkehrszeichen, sieht der Prüfling nur die Grafik: Nenne den Namen des Zeichens nicht, frage z. B. „Was bedeutet dieses Zeichen?“.',
    'Eine Prüfungsfrage ist erst abgeschlossen, wenn alle ihre Teilaufgaben gestellt und beantwortet sind (oder die Zeit abgelaufen ist). Wenn eine Frage abgeschlossen ist, setze assessment.completed = true, trage die questionId ein und bewerte die Gesamtleistung zu dieser Frage (score 0..1, fehlende Kernpunkte, kurzer Kommentar inkl. fachlicher Fehler).',
    'Leite dann in message direkt zur nächsten Frage über. Andernfalls assessment.completed = false, questionId = "", score = 0, missing = [], comment = "".',
    'Nach der letzten Frage oder wenn dir mitgeteilt wird, dass die Zeit abgelaufen ist: finished = true und summary mit einer ehrlichen Einschätzung zu deinem Prüfungsgebiet (Stärken, Lücken, Empfehlung). Sonst finished = false, summary = "".',
    'Halte deine Beiträge kurz wie in einer echten Prüfung (1–4 Sätze).'
  ].join('\n');

  const EXAMINER_FORMAT = 'Antworte ausschließlich mit einem JSON-Objekt dieser Form: {"message": string, "assessment": {"completed": boolean, "questionId": string, "score": 0.0-1.0, "missing": [string], "comment": string}, "finished": boolean, "summary": string}';

  const SEARCH_SYSTEM = [
    'Du beantwortest Suchanfragen in einer Lern-App für die Fahrlehrerprüfung (Fahrlehrerlaubnisklasse BE) in Deutschland.',
    'Antworte AUSSCHLIESSLICH mit Informationen aus den mitgelieferten Auszügen (geprüfte Musterantworten der App). Nutze kein eigenes Wissen und ergänze keine Zahlen, Fristen, Paragrafen oder Beispiele, die nicht in den Auszügen stehen.',
    'Beantworte die Frage direkt – so, wie ein Fachmann sie mündlich beantworten würde: 1–4 kurze Sätze oder eine kurze Aufzählung mit „– “, höchstens etwa 90 Wörter. Kein Markdown, keine Einleitung wie „Laut den Auszügen“. Wiederhole die Frage nicht.',
    'Hat die Frage mehrere Teile (z. B. „wie lange … und für wen …“), beantworte jeden Teil.',
    'laws: die einschlägigen Paragrafen, Anlagen oder Verkehrszeichen (z. B. „§ 2a StVG“), nur wenn sie in den Auszügen genannt sind; sonst leer.',
    'sources: die IDs der Auszüge, auf die sich die Antwort stützt.',
    'Beantworten die Auszüge die Frage nicht, setze found = false, answer = "", laws = [], sources = []. Widersprechen sich Auszüge, nimm die Angabe aus der ausführlicheren Musterantwort und erfinde nichts.'
  ].join('\n');

  const SEARCH_FORMAT = 'Antworte ausschließlich mit einem JSON-Objekt dieser Form: {"found": boolean, "answer": string, "laws": [string], "sources": [string]}';
  const MAX_SEARCH_SOURCE_CHARS = 3000;
  const MAX_SEARCH_QUERY_CHARS = 300;

  function clampText(text, max) {
    const value = String(text || '');
    return value.length > max ? value.slice(0, max) : value;
  }

  function questionBrief(q) {
    const lines = [
      `Frage-ID: ${q.id}`,
      `Thema: ${q.topic}`,
      q.signLabel ? `Verkehrszeichen: ${q.signLabel} „${q.name}“${q.imageSrc && q.imageSrc.length ? ' (der Prüfling sieht nur die Originalabbildung)' : ''}` : null,
      q.signLabel && q.category ? `Zeichenart: ${q.category}` : null,
      q.official && q.official.length ? `Amtlicher Text (StVO): ${q.official.map(part => part.text).join(' ')}` : null,
      q.signLabel ? 'Bewertungshinweis: Bei Verkehrszeichen werden keine Paragrafen- oder Anlagenangaben erwartet – fehlende Paragrafen nicht als Mangel werten.' : null,
      q.signLabel && q.category && !/^Zusatzzeichen/.test(q.category) ? `Zeichenart bewerten: Die richtige Zeichenart (${q.category.split(',')[0]}) zählt als Kernpunkt. Ordnet der Prüfling das Zeichen einer falschen Zeichenart zu (z. B. Gefahrzeichen statt Vorschriftzeichen oder Vorrangzeichen statt Vorschriftzeichen), ist das ein Fehler: unter „errors“ nennen und die Bewertung deutlich senken. Erwähnungen anderer Zeichenarten im Zusammenhang (z. B. „zusammen mit einem Gefahrzeichen“) sind kein Fehler.` : null,
      q.collection === 'karteikarten' && !q.cardLabel ? `Karteikarte (${q.deckName}): Die Musterantwort ist die Rückseite der Lernkarte. Bewerte, ob der Prüfling deren Inhalte sinngemäß nennt; wörtliche Wiedergabe ist nicht nötig.` : null,
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

  /**
   * options (Prüferrolle): { examiner: 'Rechtler', name: 'Recht', minutes: 10, first: true|false }
   */
  function examinerPlan(questions, options) {
    const o = options || {};
    const plan = questions.map((q, i) => `### Prüfungsfrage ${i + 1}\n${questionBrief(q)}`).join('\n\n');
    const role = o.examiner
      ? `Deine Rolle: ${o.examiner} – du prüfst das Gebiet ${o.name || o.examiner}${o.minutes ? ` und hast dafür ${o.minutes} Minuten` : ''}. ${o.first === false ? 'Ein anderer Prüfer hat vor dir geprüft; stelle dich kurz vor.' : 'Du eröffnest die Prüfung.'}\n\n`
      : '';
    return `${role}Prüfungsplan (nur für dich als Prüfer sichtbar):\n\n${plan}\n\nBeginne jetzt mit einer kurzen Begrüßung und der ersten Frage.`;
  }

  const TIME_UP_NOTE = '(Hinweis an den Prüfer, für den Prüfling unsichtbar: Die Prüfungszeit ist abgelaufen. Stelle keine weitere Frage und keine Nachfrage. Hat der Prüfling auf die laufende Frage geantwortet, bewerte sie jetzt abschließend (assessment.completed = true); hat er noch nicht geantwortet, setze assessment.completed = false. Verabschiede dich in message mit einem kurzen Satz und setze finished = true mit summary.)';

  /**
   * Baut abwechselnde Nachrichten (user/assistant) aus dem Gesprächsverlauf.
   * history: [{ role: 'examiner' | 'candidate', text }]
   * Die Liste beginnt und endet immer mit einer user-Nachricht.
   */
  function examinerMessages(questions, history, leadText, options) {
    const turns = (history || []).slice(-MAX_TURNS);
    const messages = [{ role: 'user', content: leadText || examinerPlan(questions, options) }];
    for (const turn of turns) {
      const role = turn.role === 'candidate' ? 'user' : 'assistant';
      const content = role === 'user'
        ? `<pruefling>${clampText(turn.text, MAX_ANSWER_CHARS)}</pruefling>`
        : clampText(turn.text, MAX_ANSWER_CHARS);
      const prev = messages[messages.length - 1];
      if (prev.role === role) prev.content += `\n\n${content}`;
      else messages.push({ role, content });
    }
    const timeUp = Boolean(options && options.timeUp);
    if (messages[messages.length - 1].role === 'assistant') {
      messages.push({ role: 'user', content: timeUp ? TIME_UP_NOTE : '(Der Prüfling wartet auf Ihre nächste Frage.)' });
    } else if (timeUp) {
      messages[messages.length - 1].content += `\n\n${TIME_UP_NOTE}`;
    }
    return messages;
  }

  // ------------------------------------------------------------------ Schriftliche Prüfung

  const MAX_WRITTEN_TASK_CHARS = 2500;

  /** Notenstufen nach § 19 FahrlPrüfV. */
  const GRADES = [
    { grade: 1, label: 'sehr gut', text: 'eine Leistung, die den Anforderungen in besonderem Maße entspricht' },
    { grade: 2, label: 'gut', text: 'eine Leistung, die den Anforderungen voll entspricht' },
    { grade: 3, label: 'befriedigend', text: 'eine Leistung, die im Allgemeinen den Anforderungen entspricht' },
    { grade: 4, label: 'ausreichend', text: 'eine Leistung, die zwar Mängel aufweist, aber im Ganzen den Anforderungen noch entspricht' },
    { grade: 5, label: 'mangelhaft', text: 'eine Leistung, die den Anforderungen nicht entspricht, jedoch erkennen lässt, dass die notwendigen Grundkenntnisse vorhanden sind und die Mängel in absehbarer Zeit behoben werden können' },
    { grade: 6, label: 'ungenügend', text: 'eine Leistung, die den Anforderungen nicht entspricht und bei der selbst die Grundkenntnisse so lückenhaft sind, dass die Mängel in absehbarer Zeit nicht behoben werden können' }
  ];

  const WRITTEN_SYSTEM = [
    'Du bist Mitglied eines Prüfungsausschusses für die Fahrlehrerprüfung (Fahrlehrerlaubnisklasse BE) in Deutschland und korrigierst den schriftlichen Teil der Fachkundeprüfung.',
    'Die Bilder zeigen die handschriftlichen Antwortblätter des Prüflings (kariertes A4-Papier, in Reihenfolge Seite 1, 2, …). Lies die Handschrift sorgfältig, ordne die Antworten über Nummern, Überschriften und Inhalt den Aufgaben zu.',
    'Bewerte jeden Prüfungsteil (Fach) einzeln, fachlich korrekt nach aktuellem deutschem Recht (StVO, StVG, FeV, FahrlG, FahrschAusbO, FahrlPrüfV, StVZO) und Fachwissen für Fahrlehrer. Gleichwertige Formulierungen und Stichpunkte zählen, Rechtschreibung nicht. Fehlende oder unleserliche Antworten zählen nicht als richtig.',
    `Noten nach § 19 FahrlPrüfV: ${GRADES.map(g => `${g.grade} = ${g.label} (${g.text})`).join('; ')}.`,
    'Richtwert für die Note aus dem Anteil der erreichten Leistung (percent): ab 92 % = 1, ab 81 % = 2, ab 67 % = 3, ab 50 % = 4, ab 30 % = 5, darunter 6. Ganze Noten vergeben.',
    'Für jede Aufgabe: found = ob eine Antwort zu finden ist, score 0 bis 1, comment = 1–2 Sätze (was richtig war, was fehlt oder falsch ist, mit kurzer Richtigstellung).',
    'Je Fach: summary (2–3 Sätze), strengths und gaps (kurze Stichpunkte). Gesamt: summary mit ehrlicher Einschätzung und den wichtigsten Lernempfehlungen.',
    'readability: kurzer Hinweis, falls Stellen nicht lesbar waren (sonst leer). Schreibe auf Deutsch und sprich den Prüfling mit „Sie“ an.'
  ].join('\n');

  const WRITTEN_FORMAT = 'Antworte ausschließlich mit einem JSON-Objekt dieser Form: {"parts": [{"name": string, "percent": 0-100, "grade": 1-6, "summary": string, "strengths": [string], "gaps": [string], "tasks": [{"label": string, "found": boolean, "score": 0.0-1.0, "comment": string}]}], "summary": string, "readability": string}. Die Teile in derselben Reihenfolge und mit genau denselben Namen wie in der Prüfung.';

  /** Aufgabentext der schriftlichen Prüfung für die Korrektur (ohne Bilder der Aufgaben). */
  function writtenExamText(exam, pageCount) {
    const parts = exam.parts.map((part, i) => {
      const tasks = part.tasks.map(task => {
        const label = task.label ? `${task.label} ` : '';
        const figures = task.figures && task.figures.length ? ` [Abbildung: ${task.figures.map(f => f.alt || 'Abbildung').join('; ')}]` : '';
        return `- ${label}${clampText(task.text, MAX_WRITTEN_TASK_CHARS)}${figures}`;
      }).join('\n');
      return `## Teil ${i + 1}: ${part.name}\n${part.intro ? `${clampText(part.intro, MAX_WRITTEN_TASK_CHARS)}\n` : ''}${tasks}`;
    }).join('\n\n');
    return `Prüfung: ${exam.name || exam.title}\n\n${parts}\n\nDer Prüfling hat ${pageCount} Antwortblatt/-blätter abgegeben (Bilder in dieser Reihenfolge). Bewerte jetzt.`;
  }

  /** Ein einziger Prompt für Umgebungen ohne System-Prompt (claude.ai). */
  function writtenGradingPrompt(exam, pageCount) {
    return `${WRITTEN_SYSTEM}\n\n${writtenExamText(exam, pageCount)}\n\n${WRITTEN_FORMAT}`;
  }

  function gradeLabel(grade) {
    const g = GRADES.find(x => x.grade === Math.round(grade));
    return g ? g.label : '';
  }

  /**
   * Bewertung der KI auf die Teile der Prüfung abbilden. Noten werden auf 1–6
   * begrenzt; die Gesamtnote ist der Durchschnitt der Fächer (eine Nachkommastelle).
   */
  function normalizeWrittenGrading(data, exam) {
    const d = data && typeof data === 'object' ? data : {};
    const raw = Array.isArray(d.parts) ? d.parts : [];
    const parts = exam.parts.map((part, i) => {
      const match = raw.find(p => p && String(p.name || '').trim() === part.name) || raw[i] || {};
      const percent = Math.round(Math.min(100, Math.max(0, Number(match.percent) || 0)));
      const rawGrade = Number(match.grade);
      const grade = Number.isFinite(rawGrade) ? Math.round(Math.min(6, Math.max(1, rawGrade))) : 6;
      return {
        name: part.name,
        percent,
        grade,
        label: gradeLabel(grade),
        summary: String(match.summary || ''),
        strengths: strings(match.strengths),
        gaps: strings(match.gaps),
        tasks: (Array.isArray(match.tasks) ? match.tasks : []).filter(t => t && typeof t === 'object').map(t => ({
          label: String(t.label || ''),
          found: Boolean(t.found),
          score: normalizeScore(t.score),
          comment: String(t.comment || '')
        }))
      };
    });
    const average = parts.length ? Math.round((parts.reduce((sum, p) => sum + p.grade, 0) / parts.length) * 10) / 10 : 6;
    return {
      parts,
      average,
      averageLabel: gradeLabel(average),
      // Orientierung: jedes Fach mindestens „ausreichend“.
      passed: parts.length > 0 && parts.every(p => p.grade <= 4),
      summary: String(d.summary || ''),
      readability: String(d.readability || '')
    };
  }

  function normalizeScore(value) {
    const n = Number(value);
    if (!Number.isFinite(n)) return 0;
    return Math.round(Math.min(1, Math.max(0, n)) * 100) / 100;
  }

  function strings(list) {
    return Array.isArray(list) ? list.map(item => String(item)).filter(Boolean) : [];
  }

  /** Auszüge (beste Suchtreffer) und Suchanfrage für die Kurzantwort. */
  function searchAnswerText(query, sources) {
    const parts = sources.map(q => {
      const official = (q.official || []).map(p => p.text).join(' ');
      return [
        `<auszug id="${q.id}">`,
        `Frage: ${q.signLabel ? `${q.signLabel} – ${q.name}` : q.question}`,
        `Musterantwort: ${clampText(q.modelAnswer, MAX_SEARCH_SOURCE_CHARS)}`,
        official ? `Amtlicher Text (StVO): ${clampText(official, 1500)}` : null,
        q.note ? `Hinweis: ${q.note}` : null,
        '</auszug>'
      ].filter(Boolean).join('\n');
    });
    return `${parts.join('\n\n')}\n\nSuchanfrage des Nutzers:\n<suchanfrage>${clampText(query, MAX_SEARCH_QUERY_CHARS)}</suchanfrage>`;
  }

  function searchAnswerPrompt(query, sources) {
    return `${SEARCH_SYSTEM}\n\n${searchAnswerText(query, sources)}\n\n${SEARCH_FORMAT}`;
  }

  /** Nur Quellen-IDs aus den mitgeschickten Auszügen; ohne Antworttext gilt "nicht gefunden". */
  function normalizeSearchAnswer(data, sourceIds) {
    const d = data && typeof data === 'object' ? data : {};
    const answer = String(d.answer || '').trim();
    const allowed = new Set(sourceIds || []);
    const found = Boolean(d.found) && answer.length > 0;
    return {
      found,
      answer: found ? answer : '',
      laws: found ? strings(d.laws).slice(0, 6) : [],
      sources: found ? strings(d.sources).filter(id => allowed.has(id)) : []
    };
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
    normalizeExaminerTurn,
    GRADES,
    WRITTEN_SYSTEM,
    WRITTEN_FORMAT,
    writtenExamText,
    writtenGradingPrompt,
    gradeLabel,
    normalizeWrittenGrading,
    SEARCH_SYSTEM,
    SEARCH_FORMAT,
    searchAnswerText,
    searchAnswerPrompt,
    normalizeSearchAnswer
  };
});
