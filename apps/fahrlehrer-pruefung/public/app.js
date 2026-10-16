/* Oberfläche der Fahrlehrer-Prüfungs-App (ohne Framework, ohne Build-Schritt). */
(function () {
  'use strict';

  const Core = window.FLCore;
  const Prompts = window.FLPrompts;
  const { subjects, questions, signs } = window.FLData;
  const STORAGE_KEY = 'fl-pruefung-state-v1';
  const questionById = new Map(questions.map(q => [q.id, q]));
  const subjectById = new Map(subjects.map(s => [s.id, s]));
  const app = document.getElementById('app');

  let state = loadState();
  let aiStatus = { ai: false, mode: null, model: null };
  let sampleFn = null;
  let practice = null;
  let exam = null;
  let lastRoute = '';
  let currentHash = window.location.hash;
  let pendingConfirm = null;
  let backupCode = null;

  // ------------------------------------------------------------------ Speicher

  function loadState() {
    try {
      return Core.migrateState(JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null'));
    } catch (_err) {
      return Core.createState();
    }
  }

  function saveState() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (_err) {
      toast('Fortschritt konnte nicht gespeichert werden (privater Modus?).');
    }
  }

  // ------------------------------------------------------------------ Helfer

  function esc(value) {
    return String(value === null || value === undefined ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function pct(value) {
    return value === null || value === undefined ? '–' : `${Math.round(value * 100)} %`;
  }

  function tone(value) {
    if (value === null || value === undefined) return '';
    if (value < 0.5) return 'bad';
    if (value < 0.75) return 'warn';
    return 'good';
  }

  function bar(value, cls) {
    const width = Math.round((value || 0) * 100);
    return `<div class="bar ${cls || ''}" role="presentation"><span style="width:${width}%"></span></div>`;
  }

  function metricRow(label, value, cls) {
    return `<div class="metric-row"><span>${esc(label)}</span>${bar(value, `thin ${cls || ''}`)}<strong>${pct(value)}</strong></div>`;
  }

  function levelChip(mastery) {
    const level = Core.masteryLevel(mastery);
    return `<span class="chip ${level.id}">${esc(level.label)}</span>`;
  }

  function subjectChip(subjectId) {
    const s = subjectById.get(subjectId);
    return `<span class="chip subject">${esc(s ? s.name : subjectId)}</span>`;
  }

  function now() {
    return Date.now();
  }

  let toastTimer = null;
  function toast(message) {
    let el = document.querySelector('.toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'toast';
      el.setAttribute('role', 'status');
      document.body.appendChild(el);
    }
    el.textContent = message;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.remove(), 3200);
  }

  async function postJson(url, body) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json.error || `Fehler ${res.status}`);
    return json;
  }

  // ------------------------------------------------------------------ KI-Anbindung
  // Zwei Wege: der eigene Server (Claude API mit Schlüssel) oder – als gehostete
  // Seite auf claude.ai – Claude über das Konto der Person, die die Seite öffnet.

  async function checkAi() {
    try {
      const res = await fetch('api/status', { cache: 'no-store' });
      if (res.ok) {
        const status = await res.json();
        if (status.ai) aiStatus = { ai: true, mode: 'server', model: status.model };
      }
    } catch (_err) {
      // Kein Server erreichbar – Grundversion oder gehostete Seite.
    }
    if (!aiStatus.ai && window.claude && typeof window.claude.use === 'function') {
      try {
        sampleFn = await window.claude.use('sample');
        if (sampleFn) aiStatus = { ai: true, mode: 'sample', model: null };
      } catch (_err) {
        sampleFn = null;
      }
    }
    render();
  }

  function sampleErrorMessage(err) {
    const code = err && err.code;
    if (['not_granted', 'sampling_disabled', 'not_declared', 'capability_disabled', 'capability_removed'].includes(code)) {
      aiStatus = { ai: false, mode: null, model: null, declined: true };
      return 'Die KI wurde für diese Seite nicht freigegeben. Die Schnellbewertung funktioniert weiterhin.';
    }
    if (code === 'rate_limited') return 'Gerade zu viele KI-Anfragen. Bitte in einem Moment erneut versuchen.';
    if (code === 'session_expired') return 'Bitte melden Sie sich erneut bei Claude an, um die KI zu nutzen.';
    if (code === 'invalid_json' || code === 'empty_completion') return 'Die KI-Antwort war unvollständig. Bitte erneut versuchen.';
    if (code === 'refused') return 'Die KI hat diese Anfrage abgelehnt. Formulieren Sie die Antwort bitte anders.';
    return 'Die KI ist gerade nicht erreichbar. Bitte erneut versuchen.';
  }

  async function aiEvaluate(question, answer) {
    if (aiStatus.mode === 'server') return postJson('api/evaluate', { questionId: question.id, answer });
    try {
      return Prompts.normalizeEvaluation(await sampleFn.json(Prompts.evaluationPrompt(question, answer)));
    } catch (err) {
      throw new Error(sampleErrorMessage(err));
    }
  }

  async function aiExamine(ids, history) {
    if (aiStatus.mode === 'server') return postJson('api/examiner', { questionIds: ids, history });
    const list = ids.map(id => questionById.get(id)).filter(Boolean);
    const lead = `${Prompts.EXAMINER_SYSTEM}\n\n${Prompts.EXAMINER_FORMAT}\n\n${Prompts.examinerPlan(list)}`;
    try {
      return Prompts.normalizeExaminerTurn(await sampleFn.json(Prompts.examinerMessages(list, history, lead), { cache: false }));
    } catch (err) {
      throw new Error(sampleErrorMessage(err));
    }
  }

  // ------------------------------------------------------------------ Spracheingabe

  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition || null;
  let dictation = null;
  // Ohne Mikrofonfreigabe (z. B. eingebettet auf claude.ai) startet die Browser-Spracherkennung nicht.
  // Dann wird die Diktierfunktion der Handy-Tastatur genutzt.
  let micBlocked = !SpeechRec || !microphoneAllowedByPolicy();
  const START_TIMEOUT_MS = 2500;
  const STOP_TIMEOUT_MS = 1200;
  const KEYBOARD_HINT = 'Spracheingabe per Tastatur: Tippen Sie ins Antwortfeld und dann auf das Mikrofon-Symbol Ihrer Handy-Tastatur.';

  function microphoneAllowedByPolicy() {
    const policy = document.permissionsPolicy || document.featurePolicy;
    try {
      return !policy || typeof policy.allowsFeature !== 'function' || policy.allowsFeature('microphone');
    } catch (_err) {
      return true;
    }
  }

  const MIC_ERRORS = {
    'not-allowed': 'Kein Zugriff aufs Mikrofon. Tippen Sie stattdessen auf das Mikrofon Ihrer Handy-Tastatur, um zu diktieren.',
    'service-not-allowed': 'Spracheingabe ist hier nicht erlaubt. Nutzen Sie das Mikrofon Ihrer Handy-Tastatur.',
    'audio-capture': 'Kein Mikrofon gefunden.',
    'no-speech': 'Nichts gehört – bitte noch einmal versuchen.',
    network: 'Die Spracherkennung braucht eine Internetverbindung.'
  };

  function draftOf(target) {
    if (target === 'exam') return exam ? exam.draft : '';
    return practice ? practice.answer : '';
  }

  function setDraft(target, text) {
    if (target === 'exam' && exam) exam.draft = text;
    if (target === 'practice' && practice) practice.answer = text;
    const el = document.getElementById(target === 'exam' ? 'exam-answer' : 'answer');
    if (el) el.value = text;
  }

  function micButton(target) {
    const active = Boolean(dictation && dictation.target === target && !dictation.stopping);
    return `<button type="button" class="btn mic ${active ? 'recording' : ''}" data-action="mic" data-target="${target}" aria-pressed="${active}">
      <svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>
      <span>${active ? 'Aufnahme beenden' : 'Antwort einsprechen'}</span></button>`;
  }

  function answerField(target) {
    return document.getElementById(target === 'exam' ? 'exam-answer' : 'answer');
  }

  /** Fallback: Antwortfeld fokussieren, damit die Tastatur mit Diktierfunktion erscheint. */
  function useKeyboardDictation(target, message) {
    micBlocked = true;
    const el = answerField(target);
    if (el) {
      el.focus();
      const end = el.value.length;
      if (typeof el.setSelectionRange === 'function') el.setSelectionRange(end, end);
    }
    const hint = document.querySelector('.mic-keyboard-hint');
    if (hint) hint.hidden = false;
    toast(message || KEYBOARD_HINT);
  }

  /** Beendet eine Aufnahme genau einmal – egal ob über onend, Fehler oder Zeitüberschreitung. */
  function finishDictation(session) {
    if (session.done) return;
    session.done = true;
    clearTimeout(session.startTimer);
    clearTimeout(session.stopTimer);
    if (dictation === session) dictation = null;
    refreshMicButtons();
    if (session.then) {
      const then = session.then;
      session.then = null;
      then();
    }
  }

  function refreshMicButtons() {
    document.querySelectorAll('[data-action="mic"]').forEach(btn => {
      btn.outerHTML = micButton(btn.dataset.target);
    });
    const hint = document.querySelector('.mic-status');
    if (hint) hint.hidden = !(dictation && !dictation.stopping);
  }

  function startDictation(target) {
    if (micBlocked) {
      useKeyboardDictation(target);
      return;
    }
    stopDictation();
    let recognition;
    try {
      recognition = new SpeechRec();
    } catch (_err) {
      useKeyboardDictation(target);
      return;
    }
    recognition.lang = 'de-DE';
    recognition.continuous = true;
    recognition.interimResults = true;
    const session = { target, recognition, base: draftOf(target).trim(), finalText: '', stopping: false, started: false, done: false, then: null };
    dictation = session;

    const markStarted = () => {
      session.started = true;
      clearTimeout(session.startTimer);
    };
    recognition.onstart = markStarted;
    recognition.onaudiostart = markStarted;
    // Startet die Erkennung nicht (kein Mikrofonzugriff), nicht hängen bleiben: auf Tastatur-Diktat umschalten.
    session.startTimer = setTimeout(() => {
      if (session.started || session.done) return;
      try { recognition.abort(); } catch (_err) { /* bereits beendet */ }
      finishDictation(session);
      useKeyboardDictation(target, 'Das Mikrofon ist hier nicht freigegeben. ' + KEYBOARD_HINT);
    }, START_TIMEOUT_MS);

    recognition.onresult = event => {
      markStarted();
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) session.finalText += `${result[0].transcript} `;
        else interim += result[0].transcript;
      }
      setDraft(target, [session.base, session.finalText.trim(), interim.trim()].filter(Boolean).join(' '));
    };
    recognition.onerror = event => {
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed' || event.error === 'audio-capture') {
        finishDictation(session);
        useKeyboardDictation(target, MIC_ERRORS[event.error]);
        return;
      }
      if (MIC_ERRORS[event.error]) toast(MIC_ERRORS[event.error]);
    };
    recognition.onend = () => finishDictation(session);
    try {
      recognition.start();
    } catch (_err) {
      finishDictation(session);
      useKeyboardDictation(target, MIC_ERRORS['not-allowed']);
      return;
    }
    refreshMicButtons();
  }

  /** Beendet die Aufnahme; erkannte Wörter werden noch übernommen, dann folgt optional `then`. */
  function stopDictation(then) {
    if (!dictation) {
      if (then) then();
      return;
    }
    const session = dictation;
    session.stopping = true;
    session.then = then || null;
    // Nicht gestartete Aufnahme sofort beenden; sonst kurz auf die letzten Wörter warten, aber nie hängen bleiben.
    if (!session.started) {
      try { session.recognition.abort(); } catch (_err) { /* bereits beendet */ }
      finishDictation(session);
      return;
    }
    session.stopTimer = setTimeout(() => finishDictation(session), STOP_TIMEOUT_MS);
    try {
      session.recognition.stop();
    } catch (_err) {
      finishDictation(session);
      return;
    }
    refreshMicButtons();
  }

  function answerTools(target, submitAction, submitLabel) {
    return `<div class="btn-row">
        ${micButton(target)}
        <button class="btn primary" data-action="${submitAction}">${submitLabel}</button>
      </div>
      <p class="small muted mic-status" ${dictation && !dictation.stopping ? '' : 'hidden'}>Sprechen Sie jetzt – der Text erscheint im Feld. Mit „${submitLabel}“ wird die Aufnahme beendet und ausgewertet.</p>
      <p class="small muted mic-keyboard-hint" ${micBlocked ? '' : 'hidden'}>${esc(KEYBOARD_HINT)}</p>`;
  }

  function isSignCard(q) {
    return Boolean(q && Array.isArray(q.imageSrc) && q.imageSrc.length > 0);
  }

  // Originalabbildungen aus der StVO; der Alt-Text verrät die Bedeutung bewusst nicht.
  function signImages(q, alt) {
    return q.imageSrc.map(src => `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async">`).join('');
  }

  function signStage(q) {
    return isSignCard(q) ? `<div class="sign-stage">${signImages(q, 'Abbildung des Verkehrszeichens')}</div>` : '';
  }

  // Abbildungen aus der Prüfungsfragen-Sammlung (z. B. Verkehrszeichen a–f, Motorraum-Skizze).
  function figureStage(q) {
    if (!q || !Array.isArray(q.figures) || q.figures.length === 0) return '';
    return `<div class="figure-grid">${q.figures.map(f => `<figure><img src="${esc(f.src)}" alt="${esc(f.alt || 'Abbildung zur Frage')}" loading="lazy" decoding="async">${f.label ? `<figcaption>${esc(f.label)}</figcaption>` : ''}</figure>`).join('')}</div>`;
  }

  function questionStage(q) {
    return signStage(q) + figureStage(q);
  }

  const SIGN_GROUPS = [
    { id: 'gefahr', label: 'Gefahrzeichen', match: c => c.startsWith('Gefahrzeichen') },
    { id: 'vorschrift', label: 'Vorschriftzeichen', match: c => c.startsWith('Vorschriftzeichen') },
    { id: 'richt', label: 'Richtzeichen', match: c => c.startsWith('Richtzeichen') || c.startsWith('Sinnbild') },
    { id: 'zusatz', label: 'Zusatzzeichen', match: c => c.startsWith('Zusatzzeichen') },
    { id: 'einrichtung', label: 'Verkehrseinrichtungen', match: c => c.startsWith('Verkehrseinrichtung') }
  ];

  function signGroup(q) {
    return SIGN_GROUPS.find(group => group.match(q.category || '')) || null;
  }

  const OFFICIAL_LABELS = { gebot: 'Ge- oder Verbot', erlaeuterung: 'Erläuterung', allgemein: 'Allgemein' };

  function renderOfficialText(q) {
    if (!Array.isArray(q.official) || q.official.length === 0) return '';
    return `<details class="disclosure" open><summary>Amtlicher Text (StVO, Anlage ${esc(q.anlage)})</summary>
      ${q.official.map(part => `<p><strong class="small">${esc(OFFICIAL_LABELS[part.type] || '')}:</strong> ${esc(part.text)}</p>`).join('')}
    </details>`;
  }

  // ------------------------------------------------------------------ Routing

  function route() {
    const hash = currentHash.replace(/^#\/?/, '');
    const [name, param] = hash.split('/');
    return { name: name || 'dashboard', param: param ? decodeURIComponent(param) : null };
  }

  // Die Route wird im Speicher gehalten und nur zusätzlich in die Adresszeile
  // geschrieben – so funktioniert die App auch eingebettet (z. B. als gehostete Seite).
  function go(hash) {
    if (hash !== currentHash) {
      currentHash = hash;
      try {
        window.history.pushState(null, '', hash);
      } catch (_err) {
        // Adresszeile nicht beschreibbar – Navigation läuft trotzdem.
      }
    }
    render();
  }

  function render() {
    const r = route();
    const key = `${r.name}/${r.param || ''}`;
    document.querySelectorAll('[data-nav]').forEach(a => {
      const active = a.dataset.nav === r.name || (a.dataset.nav === 'faecher' && (r.name === 'fach' || r.name === 'sammlung'));
      a.classList.toggle('active', active);
      if (active) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });

    const views = {
      dashboard: renderDashboard,
      heute: renderToday,
      faecher: renderSubjects,
      fach: () => renderSubject(r.param),
      sammlung: renderCollection,
      frage: () => renderSingleQuestion(r.param),
      ueben: renderPractice,
      pruefung: renderExam,
      analyse: renderAnalysis,
      einstellungen: renderSettings
    };
    pendingConfirm = null;
    if (key !== lastRoute && dictation) stopDictation();
    app.innerHTML = (views[r.name] || renderDashboard)();
    if (key !== lastRoute) {
      window.scrollTo(0, 0);
      lastRoute = key;
    }
  }

  // ------------------------------------------------------------------ Übersicht

  function subjectCard(stat) {
    const s = stat.subject;
    return `
      <a class="card subject-card" href="#/fach/${esc(s.id)}" style="--subject:${esc(s.color)}">
        <h3><span>${esc(s.name)}</span>${stat.due ? `<span class="chip mittel">${stat.due} fällig</span>` : ''}</h3>
        <p class="muted small">${stat.worked} von ${stat.total} Fragen bearbeitet</p>
        ${metricRow('Lernfortschritt', stat.learningProgress)}
        ${metricRow('Wissensstand', stat.knowledge, tone(stat.knowledge))}
      </a>`;
  }

  function renderDashboard() {
    const ts = now();
    const overall = Core.overallStats(window.FLData, state, ts);
    const plan = Core.dailyPlan(window.FLData, state, ts);
    const streak = Core.streak(state, ts);
    const stats = Core.subjectStats(window.FLData, state, ts);
    const goalProgress = Math.min(1, plan.done / plan.goal);

    return `
      <header class="page-head">
        <h1>Ihr Lernstand</h1>
        <p>Mündliche Fachkundeprüfung – Fahrlehrerlaubnis Klasse BE</p>
      </header>

      <div class="grid grid-3">
        <div class="card">
          <div class="kpi-label">Lernfortschritt</div>
          <div class="kpi-value">${pct(overall.learningProgress)}</div>
          ${bar(overall.learningProgress)}
          <p class="kpi-hint">${overall.worked} von ${overall.total} Fragen bearbeitet</p>
        </div>
        <div class="card">
          <div class="kpi-label">Wissensstand</div>
          <div class="kpi-value">${pct(overall.knowledge)}</div>
          ${bar(overall.knowledge, tone(overall.knowledge))}
          <p class="kpi-hint">Wie sicher die bearbeiteten Fragen sitzen</p>
        </div>
        <div class="card">
          <div class="kpi-label">Prüfungsreife</div>
          <div class="kpi-value">${pct(overall.readiness)}</div>
          ${bar(overall.readiness, tone(overall.readiness))}
          <p class="kpi-hint">Wissensstand bezogen auf den gesamten Stoff</p>
        </div>
      </div>

      <div class="card section">
        <div class="section-title" style="margin-top:0">
          <h2>Heutiges Lernziel</h2>
          <span class="chip">${streak} ${streak === 1 ? 'Tag' : 'Tage'} in Folge</span>
        </div>
        <p class="muted">${plan.done} von ${plan.goal} Fragen beantwortet${plan.done >= plan.goal ? ' – Tagesziel erreicht!' : ''}</p>
        ${bar(goalProgress, goalProgress >= 1 ? 'good' : '')}
        <div class="btn-row">
          <button class="btn primary" data-action="start-daily">Tagesplan starten</button>
          <a class="btn" href="#/pruefung">Prüfung simulieren</a>
          <a class="btn" href="#/analyse">Schwächen ansehen</a>
        </div>
      </div>

      <div class="card section sign-teaser">
        <div class="sign-strip" aria-hidden="true">${['206', '205', '306', '274', '325.1', '101'].map(n => {
          const item = signs.find(x => x.sign === n);
          return item ? `<span>${signImages(item, '')}</span>` : '';
        }).join('')}</div>
        <div>
          <h2>Verkehrszeichen-Training</h2>
          <p class="muted">${signs.length} Zeichen als Bild: Sehen, mündlich erklären, Rückmeldung erhalten, was richtig und was falsch war.</p>
          <div class="btn-row"><button class="btn primary" data-action="practice-signs">Zeichen-Training starten (alle ${signs.length})</button></div>
        </div>
      </div>

      <div class="section-title"><h2>Fächer</h2><a href="#/faecher" class="small">Alle Fächer</a></div>
      <div class="grid grid-2">${stats.map(subjectCard).join('')}</div>
    `;
  }

  // ------------------------------------------------------------------ Heute

  function renderToday() {
    const ts = now();
    const plan = Core.dailyPlan(window.FLData, state, ts);
    const analysis = Core.weaknessAnalysis(window.FLData, state, ts);
    const focus = analysis.weakTopics.slice(0, 3);

    const items = plan.items.map(item => {
      const q = questionById.get(item.questionId);
      return `<li>
        <div><a href="#/frage/${esc(q.id)}">${esc(q.topic)}</a><div class="small muted">${esc(item.reason)}</div></div>
        ${subjectChip(q.subject)}
      </li>`;
    }).join('');

    return `
      <header class="page-head">
        <h1>Heute lernen</h1>
        <p>Ihre persönliche Tagesempfehlung – aus fälligen Wiederholungen, Schwächen und neuen Themen.</p>
      </header>
      <div class="card">
        <div class="progress-meta"><span>Tagesziel</span><span>${plan.done} / ${plan.goal}</span></div>
        ${bar(Math.min(1, plan.done / plan.goal), plan.done >= plan.goal ? 'good' : '')}
        <ul class="list" style="margin-top:12px">${items || '<li class="muted">Keine Empfehlungen.</li>'}</ul>
        <div class="btn-row"><button class="btn primary" data-action="start-daily">Jetzt starten</button></div>
      </div>
      ${focus.length ? `
        <div class="section-title"><h2>Fokus-Themen</h2></div>
        <div class="card">
          <ul class="list">${focus.map(t => `<li>
            <div><strong>${esc(t.topic)}</strong><div class="small muted">${esc(subjectById.get(t.subject).name)} · Wissensstand ${pct(t.mastery)}</div></div>
            <button class="btn" data-action="practice-topic" data-subject="${esc(t.subject)}" data-topic="${esc(t.topic)}">Üben</button>
          </li>`).join('')}</ul>
        </div>` : ''}
    `;
  }

  // ------------------------------------------------------------------ Fächer

  function renderSubjects() {
    const stats = Core.subjectStats(window.FLData, state, now());
    return `
      <header class="page-head">
        <h1>Fächer</h1>
        <p>Wählen Sie ein Fach, um Fragen zu üben oder Ihren Stand im Detail zu sehen.</p>
      </header>
      <div class="grid grid-2">${stats.map(stat => subjectCard(stat).replace('</h3>', `</h3><p class="small">${esc(stat.subject.description)}</p>`)).join('')}</div>
      ${renderCollectionTeaser()}
    `;
  }

  function renderCollectionTeaser() {
    const count = questions.filter(q => q.collection === 'sammlung').length;
    if (!count) return '';
    return `<div class="card section"><h2>Prüfungsfragen-Sammlung</h2>
      <p class="muted">${count} schriftliche Prüfungsfragen (Verkehrspädagogik, Verkehrsverhaltenslehre, Technik) in der Nummerierung der Vorlage – mit recherchierten Musterantworten.</p>
      <div class="btn-row"><a class="btn primary" href="#/sammlung">Sammlung öffnen</a></div></div>`;
  }

  function renderSubject(id) {
    const subject = subjectById.get(id);
    if (!subject) return '<div class="card empty">Fach nicht gefunden.</div>';
    const ts = now();
    const stat = Core.subjectStats(window.FLData, state, ts).find(s => s.subject.id === id);
    const list = questions.filter(q => q.subject === id);
    const collection = list.filter(q => q.collection === 'sammlung');

    return `
      <header class="page-head">
        <p><a href="#/faecher">Fächer</a></p>
        <h1>${esc(subject.name)}</h1>
        <p>${esc(subject.description)}</p>
      </header>
      <div class="grid grid-2">
        <div class="card">
          <h2>Ihr Stand</h2>
          ${metricRow('Lernfortschritt', stat.learningProgress)}
          ${metricRow('Wissensstand', stat.knowledge, tone(stat.knowledge))}
          ${metricRow('Prüfungsreife', stat.readiness, tone(stat.readiness))}
          <p class="small muted" style="margin-top:10px">
            Sicher: ${stat.levels.sicher} · Ausbaufähig: ${stat.levels.mittel} · Schwach: ${stat.levels.schwach} · Offen: ${stat.levels.offen}
          </p>
        </div>
        <div class="card">
          <h2>Üben</h2>
          <p class="muted small">Beantworten Sie die Fragen zuerst frei – danach sehen Sie Bewertung, Erklärung und Musterantwort.</p>
          <div class="btn-row">
            ${id === 'zeichen' ? `<button class="btn primary" data-action="practice-signs">Zeichen-Training mit Bildern (alle ${signs.length})</button>` : ''}
            <button class="btn ${id === 'zeichen' ? '' : 'primary'}" data-action="practice-subject" data-subject="${esc(id)}">Alle Fragen üben</button>
            <button class="btn" data-action="practice-subject-weak" data-subject="${esc(id)}" ${stat.levels.schwach + stat.levels.mittel === 0 ? 'disabled' : ''}>Nur Schwächen</button>
            ${collection.length ? `<button class="btn" data-action="practice-ids" data-title="${esc(subject.name)} – Prüfungsfragen-Sammlung" data-ids="${esc(collection.map(q => q.id).join(','))}">Sammlungsfragen (${collection.length})</button>` : ''}
          </div>
        </div>
      </div>
      ${id === 'zeichen' ? renderSignCatalog(ts) : ''}
      <div class="section-title"><h2>Fragen</h2></div>
      <div class="card">
        <ul class="list">${list.filter(q => !isSignCard(q)).map(q => questionListItem(q, ts)).join('')}</ul>
      </div>
    `;
  }

  function renderSignCatalog(ts) {
    const groups = SIGN_GROUPS.map(group => ({ group, items: signs.filter(item => signGroup(item) === group) }))
      .filter(entry => entry.items.length > 0);
    return `<div class="section-title"><h2>Zeichen-Training nach Gruppe</h2></div>
      <div class="card"><div class="btn-row">
        <button class="btn primary" data-action="practice-signs">Gemischt (${signs.length})</button>
        ${groups.map(({ group, items }) => `<button class="btn" data-action="practice-signs" data-group="${esc(group.id)}">${esc(group.label)} (${items.length})</button>`).join('')}
      </div></div>
      ${groups.map(({ group, items }) => `
      <div class="section-title"><h2>${esc(group.label)}</h2><span class="small muted">${items.length} Zeichen · Tippen zum Üben</span></div>
      <div class="sign-grid">${items.map(item => {
        const level = Core.masteryLevel(Core.questionMastery(state.attempts[item.id], ts));
        const label = item.sign ? item.sign : (item.kind || 'Zeichen');
        return `<a href="#/frage/${esc(item.id)}" class="sign-tile ${level.id}" title="${esc(item.signLabel || label)}">${signImages(item, '')}<span>${esc(label)}</span></a>`;
      }).join('')}</div>`).join('')}`;
  }

  function questionListItem(q, ts) {
    const mastery = Core.questionMastery(state.attempts[q.id], ts);
    const firstLine = q.question.split('\n')[0];
    const preview = firstLine.length > 180 ? `${firstLine.slice(0, 177)} …` : firstLine;
    const badge = q.collection === 'sammlung' ? `<span class="chip">${esc(q.sectionName)} Nr. ${esc(q.numbers.join(', '))}</span> ` : '';
    return `<li><div><a href="#/frage/${esc(q.id)}">${esc(q.topic)}</a><div class="small muted">${badge}${esc(preview)}</div></div>${levelChip(mastery)}</li>`;
  }

  // Frage der Sammlung, die bereits als eigene Frage in der App steht: Verweis statt Dublette.
  function coveredListItem(entry) {
    const firstLine = entry.question.split('\n')[0];
    const preview = firstLine.length > 180 ? `${firstLine.slice(0, 177)} …` : firstLine;
    const links = entry.coveredBy.filter(id => questionById.has(id))
      .map(id => `<a href="#/frage/${esc(id)}">${esc(questionById.get(id).topic)}</a>`).join(' · ');
    return `<li><div><span class="small muted"><span class="chip">${esc(entry.sectionName)} Nr. ${esc(entry.numbers.join(', '))}</span> ${esc(preview)}</span>
      <div class="small">Bereits enthalten: ${links}</div></div></li>`;
  }

  // Prüfungsfragen-Sammlung in der Gliederung und Nummerierung der Vorlage.
  function renderCollection() {
    const ts = now();
    const items = questions.filter(q => q.collection === 'sammlung');
    const covered = window.FLData.collectionCovered || [];
    const order = ['Verkehrspädagogik', 'Verkehrsverhaltenslehre', 'Technik'];
    const sections = order.map(name => ({
      name,
      items: items.filter(q => q.sectionName === name),
      entries: items.filter(q => q.sectionName === name).concat(covered.filter(c => c.sectionName === name))
        .sort((a, b) => a.numbers[0] - b.numbers[0])
    })).filter(s => s.entries.length > 0);
    return `
      <header class="page-head">
        <p><a href="#/faecher">Fächer</a></p>
        <h1>Prüfungsfragen-Sammlung</h1>
        <p>Schriftliche Prüfungsfragen für den Fahrlehrerlehrgang BE – Fragen unverändert aus der Vorlage, Musterantworten recherchiert. Gleichlautende Fragen sind zusammengefasst; Fragen, die schon in der App stehen, sind verlinkt statt doppelt aufgenommen.</p>
      </header>
      <div class="card"><div class="btn-row">
        ${sections.map(s => `<button class="btn" data-action="practice-ids" data-title="${esc(s.name)}" data-ids="${esc(s.items.map(q => q.id).join(','))}">${esc(s.name)} üben (${s.items.length})</button>`).join('')}
      </div></div>
      ${sections.map(s => `
      <div class="section-title"><h2>${esc(s.name)}</h2><span class="small muted">${s.items.length} Fragen</span></div>
      <div class="card"><ul class="list">${s.entries.map(q => (q.coveredBy ? coveredListItem(q) : questionListItem(q, ts))).join('')}</ul></div>`).join('')}
    `;
  }

  // ------------------------------------------------------------------ Üben

  function startPractice(ids, title) {
    const queue = ids.filter(id => questionById.has(id));
    if (queue.length === 0) {
      toast('Keine passenden Fragen gefunden.');
      return;
    }
    practice = { queue, index: 0, title, phase: 'answer', answer: '', auto: null, ai: null, aiLoading: false, aiError: null, results: [] };
    go('#/ueben');
  }

  function renderSingleQuestion(id) {
    if (!questionById.has(id)) return '<div class="card empty">Frage nicht gefunden.</div>';
    if (!practice || practice.queue.length !== 1 || practice.queue[0] !== id) {
      practice = { queue: [id], index: 0, title: 'Einzelfrage', phase: 'answer', answer: '', auto: null, ai: null, aiLoading: false, aiError: null, results: [] };
    }
    return renderPractice();
  }

  function renderPractice() {
    if (!practice) {
      return `<div class="card empty"><p>Keine Übung aktiv.</p><div class="btn-row" style="justify-content:center">
        <button class="btn primary" data-action="start-daily">Tagesplan starten</button><a class="btn" href="#/faecher">Fach wählen</a></div></div>`;
    }
    if (practice.index >= practice.queue.length) return renderPracticeSummary();

    const q = questionById.get(practice.queue[practice.index]);
    const reviewing = practice.phase !== 'answer';
    // Bei Verkehrszeichen und Sammlungsfragen bleibt das Thema verborgen, bis die Antwort abgegeben ist
    // (der Thementitel kann sonst die Lösung verraten).
    const topicChip = (isSignCard(q) || q.collection === 'sammlung') && !reviewing ? '' : `<span class="chip">${esc(q.topic)}</span>`;
    const head = `
      <div class="progress-meta"><span>${esc(practice.title)}</span><span>Frage ${practice.index + 1} von ${practice.queue.length}</span></div>
      ${bar(practice.index / practice.queue.length, 'thin')}
      <div class="card section">
        <div style="display:flex;gap:8px;flex-wrap:wrap">${subjectChip(q.subject)}${topicChip}<span class="chip">Schwierigkeit ${'●'.repeat(q.difficulty)}${'○'.repeat(3 - q.difficulty)}</span></div>
        ${questionStage(q)}
        <p class="question-text${q.question.length > 160 ? ' long' : ''}">${esc(q.question)}</p>`;

    if (!reviewing) {
      return `${head}
        <label for="answer" class="kpi-label">Ihre Antwort – tippen oder einsprechen</label>
        <textarea id="answer" data-input="answer" placeholder="Formulieren Sie Ihre Antwort in ganzen Sätzen …">${esc(practice.answer)}</textarea>
        ${answerTools('practice', 'submit-answer', 'Antwort prüfen')}
        <div class="btn-row" style="margin-top:6px"><button class="btn" data-action="reveal">Weiß ich nicht – Lösung zeigen</button></div>
        ${practiceNav()}
      </div>`;
    }

    return `${head}
        ${q.signLabel ? `<div class="panel info"><h3>${esc(q.signLabel)} – ${esc(q.name)}</h3><p class="small muted">${esc(q.category || '')}</p></div>` : ''}
        ${practice.answer ? `<details class="disclosure"><summary>Ihre Antwort</summary><p style="white-space:pre-wrap">${esc(practice.answer)}</p></details>` : ''}
        ${renderAutoEvaluation(practice.auto)}
        ${renderAiEvaluation()}
        ${renderOfficialText(q)}
        ${q.explanation ? `<div class="panel info"><h3>Einfach erklärt</h3><p>${esc(q.explanation)}</p></div>` : ''}
        ${q.example ? `<div class="panel"><h3>Praxisbeispiel</h3><p>${esc(q.example)}</p></div>` : ''}
        ${q.note ? `<div class="panel warn"><h3>Hinweis</h3><p>${esc(q.note)}</p></div>` : ''}
        <details class="disclosure" open><summary>Musterantwort</summary><p class="pre-line">${esc(q.modelAnswer)}</p>
          <p class="small muted">Kernpunkte: ${q.keyPoints.map(p => esc(p.label)).join(' · ')}</p>
          ${q.source ? `<p class="small muted">Quelle der Frage: ${esc(q.source)}</p>` : ''}
          ${renderAnswerSources(q)}</details>
        <details class="disclosure"><summary>Mögliche Nachfragen des Prüfers</summary><ul>${q.followUps.map(f => `<li>${esc(f)}</li>`).join('')}</ul></details>
        <h3 style="margin-top:18px">Wie gut wussten Sie es?</h3>
        <div class="btn-row">
          <button class="btn good" data-action="rate" data-score="1">Gewusst</button>
          <button class="btn warn" data-action="rate" data-score="0.5">Teilweise</button>
          <button class="btn bad" data-action="rate" data-score="0">Nicht gewusst</button>
        </div>
        ${practiceNav()}
      </div>`;
  }

  // Zurück zur vorigen Frage oder diese Frage ohne Bewertung überspringen.
  function practiceNav() {
    const multi = practice.queue.length > 1;
    if (!multi) return '';
    const isLast = practice.index >= practice.queue.length - 1;
    return `<div class="btn-row practice-nav">
        <button class="btn" data-action="practice-prev" ${practice.index === 0 ? 'disabled' : ''}>‹ Zurück</button>
        <button class="btn" data-action="practice-skip">${isLast ? 'Überspringen und beenden' : 'Überspringen ›'}</button>
      </div>`;
  }

  function resetPracticeAnswer() {
    practice.phase = 'answer';
    practice.answer = '';
    practice.auto = null;
    practice.ai = null;
    practice.aiError = null;
    practice.aiLoading = false;
  }

  function moveInPractice(step) {
    stopDictation();
    const target = practice.index + step;
    if (target < 0) return;
    if (step < 0) {
      // Die vorige Frage wird neu beantwortet; ihr Rundenergebnis zählt dann neu.
      const id = practice.queue[target];
      practice.results = practice.results.filter(r => r.questionId !== id);
    }
    practice.index = Math.min(target, practice.queue.length);
    resetPracticeAnswer();
    render();
    window.scrollTo(0, 0);
  }

  // Belege der Musterantwort; nur http(s)-Links werden verlinkt.
  function renderAnswerSources(q) {
    if (!Array.isArray(q.sources) || q.sources.length === 0) return '';
    return `<p class="small muted">Belege der Musterantwort:</p><ul class="small muted sources">${q.sources.map(src => {
      const safe = /^https?:\/\//i.test(src.url || '') ? src.url : '';
      return `<li>${safe ? `<a href="${esc(safe)}" target="_blank" rel="noopener noreferrer">${esc(src.title || safe)}</a>` : esc(src.title || '')}</li>`;
    }).join('')}</ul>`;
  }

  function renderAutoEvaluation(auto) {
    if (!auto) return '';
    const cls = tone(auto.score);
    const wrong = auto.wrong || [];
    return `<div class="panel ${cls}">
      <h3>Schnellbewertung: ${pct(auto.score)}</h3>
      <p>${esc(auto.feedback)}</p>
      ${auto.covered.length ? `<p class="points-title">Richtig erwähnt</p><ul class="points">${auto.covered.map(l => `<li><span class="ok" aria-hidden="true">✓</span>${esc(l)}</li>`).join('')}</ul>` : ''}
      ${wrong.length ? `<p class="points-title">Das war falsch</p><ul class="points">${wrong.map(l => `<li class="wrong"><span class="no" aria-hidden="true">!</span>${esc(l)}</li>`).join('')}</ul>` : ''}
      ${auto.missing.length ? `<p class="points-title">Hat gefehlt</p><ul class="points">${auto.missing.map(l => `<li><span class="miss" aria-hidden="true">–</span>${esc(l)}</li>`).join('')}</ul>` : ''}
      <p class="small muted" style="margin-top:8px">Automatischer Abgleich mit Schlüsselbegriffen – gleichwertige Formulierungen werden evtl. nicht erkannt.</p>
    </div>`;
  }

  function renderAiEvaluation() {
    if (!aiStatus.ai || !practice.answer) return '';
    if (practice.aiLoading) {
      return `<div class="panel"><h3 style="display:flex;gap:8px;align-items:center"><span class="spinner"></span>KI-Prüfer bewertet Ihre Antwort …</h3>
        ${aiStatus.mode === 'sample' ? '<p class="small muted">Beim ersten Mal fragt Claude, ob diese Seite die KI nutzen darf.</p>' : ''}</div>`;
    }
    if (practice.aiError) {
      return `<div class="panel bad"><h3>KI-Bewertung nicht möglich</h3><p>${esc(practice.aiError)}</p>
        <button class="btn" data-action="ai-evaluate">Erneut versuchen</button></div>`;
    }
    if (!practice.ai) {
      return '<div class="panel"><button class="btn" data-action="ai-evaluate">KI-Bewertung anfordern</button></div>';
    }
    const ai = practice.ai;
    return `<div class="panel ${tone(ai.score)}">
      <h3>KI-Bewertung: ${pct(ai.score)}</h3>
      <p>${esc(ai.feedback)}</p>
      ${ai.covered && ai.covered.length ? `<p class="points-title">Richtig</p><ul class="points">${ai.covered.map(e => `<li><span class="ok" aria-hidden="true">✓</span>${esc(e)}</li>`).join('')}</ul>` : ''}
      ${ai.errors.length ? `<p class="points-title">Falsch</p><ul class="points">${ai.errors.map(e => `<li class="wrong"><span class="no" aria-hidden="true">!</span>${esc(e)}</li>`).join('')}</ul>` : ''}
      ${ai.missing.length ? `<p class="points-title">Hat gefehlt</p><ul class="points">${ai.missing.map(e => `<li><span class="miss" aria-hidden="true">–</span>${esc(e)}</li>`).join('')}</ul>` : ''}
      ${ai.tip ? `<p><strong>Lerntipp:</strong> ${esc(ai.tip)}</p>` : ''}
    </div>`;
  }

  function renderPracticeSummary() {
    const results = practice.results;
    const avg = results.length ? results.reduce((a, r) => a + r.score, 0) / results.length : 0;
    const weak = results.filter(r => r.score < 0.6).map(r => r.questionId);
    const answered = new Set(results.map(r => r.questionId));
    const skipped = practice.queue.filter(id => !answered.has(id));
    return `
      <header class="page-head"><h1>Übung abgeschlossen</h1><p>${esc(practice.title)}</p></header>
      <div class="card">
        ${results.length ? `<div class="kpi-label">Durchschnitt dieser Runde</div>
        <div class="kpi-value">${pct(avg)}</div>
        ${bar(avg, tone(avg))}` : '<p class="muted">In dieser Runde wurde keine Frage bewertet.</p>'}
        ${skipped.length ? `<p class="small muted" style="margin-top:10px">Übersprungen: ${skipped.length} ${skipped.length === 1 ? 'Frage' : 'Fragen'}</p>` : ''}
        <ul class="list" style="margin-top:12px">${results.map(r => {
          const q = questionById.get(r.questionId);
          return `<li><div><a href="#/frage/${esc(q.id)}">${esc(q.topic)}</a><div class="small muted">${esc(subjectById.get(q.subject).name)}</div></div><span class="chip ${tone(r.score) === 'good' ? 'sicher' : tone(r.score) === 'warn' ? 'mittel' : 'schwach'}">${pct(r.score)}</span></li>`;
        }).join('')}</ul>
        <div class="btn-row">
          ${weak.length ? `<button class="btn primary" data-action="practice-ids" data-ids="${esc(weak.join(','))}">Schwache Fragen wiederholen</button>` : ''}
          ${skipped.length ? `<button class="btn ${weak.length ? '' : 'primary'}" data-action="practice-ids" data-title="Übersprungene Fragen" data-ids="${esc(skipped.join(','))}">Übersprungene Fragen üben</button>` : ''}
          <a class="btn" href="#/">Zur Übersicht</a>
          <a class="btn" href="#/analyse">Analyse ansehen</a>
        </div>
      </div>`;
  }

  async function requestAiEvaluation() {
    const q = questionById.get(practice.queue[practice.index]);
    const current = practice;
    current.aiLoading = true;
    current.aiError = null;
    render();
    try {
      current.ai = await aiEvaluate(q, current.answer);
    } catch (err) {
      current.aiError = err.message;
    } finally {
      current.aiLoading = false;
      if (practice === current) render();
    }
  }

  function submitAnswer(reveal) {
    const q = questionById.get(practice.queue[practice.index]);
    if (!reveal && !practice.answer.trim()) {
      toast('Bitte zuerst eine Antwort formulieren – oder „Lösung zeigen“ wählen.');
      return;
    }
    if (reveal) practice.answer = practice.answer.trim();
    practice.auto = practice.answer ? Core.evaluateAnswer(q, practice.answer) : null;
    practice.phase = 'review';
    state = Core.markSeen(state, q.id, now());
    saveState();
    if (aiStatus.ai && practice.answer) requestAiEvaluation();
    else render();
  }

  function rate(selfScore) {
    const q = questionById.get(practice.queue[practice.index]);
    const auto = practice.auto;
    const ai = practice.ai;
    const score = Core.combineScores({
      self: selfScore,
      auto: auto ? auto.score : undefined,
      ai: ai ? ai.score : undefined
    });
    const missed = ai && ai.missing.length ? ai.missing : auto ? auto.missing : q.keyPoints.map(p => p.label);
    const source = ai ? 'ai' : auto ? 'auto' : 'self';
    state = Core.recordAttempt(state, q.id, { score, source, missed: selfScore >= 1 && !auto ? [] : missed }, now());
    saveState();
    practice.results = practice.results.filter(r => r.questionId !== q.id);
    practice.results.push({ questionId: q.id, score });
    practice.index += 1;
    resetPracticeAnswer();
    render();
    app.focus();
  }

  // ------------------------------------------------------------------ Prüfungssimulation

  function renderExam() {
    if (!exam) return renderExamIntro();
    if (exam.finished) return renderExamResult();

    const total = exam.ids.length;
    const done = exam.results.length;
    return `
      <header class="page-head">
        <h1>Mündliche Prüfung</h1>
        <p>${exam.mode === 'ai' ? 'KI-Prüfer' : 'Trainings-Prüfer (offline)'} · Frage ${Math.min(done + 1, total)} von ${total}</p>
      </header>
      ${bar(done / total, 'thin')}
      <div class="card section">
        <div class="chat" aria-live="polite">
          ${exam.transcript.map(t => `<div class="bubble ${t.role}"><span class="who">${t.role === 'examiner' ? 'Prüfer' : 'Sie'}</span>${esc(t.text)}</div>`).join('')}
          ${exam.loading ? '<div class="bubble examiner"><span class="spinner" aria-label="Prüfer denkt nach"></span></div>' : ''}
        </div>
        ${exam.error ? `<div class="panel bad"><p>${esc(exam.error)}</p><button class="btn" data-action="exam-retry">Erneut versuchen</button></div>` : ''}
        ${questionStage(currentExamQuestion())}
        <label for="exam-answer" class="kpi-label">Ihre Antwort – tippen oder einsprechen</label>
        <textarea id="exam-answer" data-input="exam-answer" placeholder="Antworten Sie so, wie Sie es in der Prüfung sagen würden …" ${exam.loading ? 'disabled' : ''}>${esc(exam.draft)}</textarea>
        ${answerTools('exam', 'exam-send', 'Antwort abgeben')}
        <div class="btn-row" style="margin-top:6px">
          <button class="btn" data-action="exam-abort" ${exam.results.length ? 'data-confirm="Jetzt beenden und auswerten? Nochmal tippen"' : ''}>Prüfung beenden</button>
        </div>
      </div>`;
  }

  function currentExamQuestion() {
    if (!exam || exam.loading || exam.transcript.length === 0) return null;
    const index = exam.mode === 'local' ? exam.index : exam.results.length;
    return questionById.get(exam.ids[Math.min(index, exam.ids.length - 1)]);
  }

  function renderExamIntro() {
    return `
      <header class="page-head">
        <h1>Prüfungssimulation</h1>
        <p>Der Prüfer stellt Fragen aus allen Fächern und hakt nach – wie in der echten mündlichen Prüfung.</p>
      </header>
      <div class="card">
        <h2>Prüfer wählen</h2>
        <label class="option"><input type="radio" name="exam-mode" value="local" ${aiStatus.ai ? '' : 'checked'}>
          <span><strong>Trainings-Prüfer</strong><br><span class="small muted">Funktioniert offline. Nachfragen orientieren sich an fehlenden Kernpunkten.</span></span></label>
        <label class="option"><input type="radio" name="exam-mode" value="ai" ${aiStatus.ai ? 'checked' : 'disabled'}>
          <span><strong>KI-Prüfer</strong><br><span class="small muted">${aiStatus.ai
            ? 'Realistisches Prüfungsgespräch mit individuellen Nachfragen und ausführlicher Auswertung.'
            : 'Nicht verfügbar – siehe Einstellungen.'}</span></span></label>
        <h2 style="margin-top:18px">Anzahl Fragen</h2>
        <select id="exam-count" aria-label="Anzahl Fragen">
          <option value="3">3 Fragen (Kurztest, ca. 10 Min.)</option>
          <option value="6" selected>6 Fragen – ein Fach je Frage (ca. 25 Min.)</option>
        </select>
        <div class="btn-row"><button class="btn primary" data-action="exam-start">Prüfung starten</button></div>
        <p class="small muted" style="margin-top:12px">Tipp: Antworten Sie strukturiert – erst die Kernaussage, dann Rechtsgrundlage, dann ein Praxisbeispiel.</p>
      </div>`;
  }

  function renderExamResult() {
    const verdict = Core.examVerdict(exam.results.map(r => r.score));
    const weak = exam.results.filter(r => r.score < 0.6).map(r => r.questionId);
    return `
      <header class="page-head"><h1>Auswertung</h1><p>${exam.mode === 'ai' ? 'KI-Prüfer' : 'Trainings-Prüfer'}</p></header>
      <div class="card">
        <div class="kpi-label">Gesamtergebnis</div>
        <div class="kpi-value">${pct(verdict.avg)}</div>
        ${bar(verdict.avg, verdict.passed ? 'good' : 'bad')}
        <p style="margin-top:10px"><strong>${esc(verdict.label)}</strong></p>
        ${exam.summary ? `<div class="panel info"><h3>Einschätzung des Prüfers</h3><p style="white-space:pre-wrap">${esc(exam.summary)}</p></div>` : ''}
      </div>
      <div class="card section table-wrap">
        <table>
          <thead><tr><th>Fach</th><th>Thema</th><th>Ergebnis</th><th>Lücken</th></tr></thead>
          <tbody>${exam.results.map(r => {
            const q = questionById.get(r.questionId);
            return `<tr><td>${esc(subjectById.get(q.subject).name)}</td><td><a href="#/frage/${esc(q.id)}">${esc(q.topic)}</a></td>
              <td>${pct(r.score)}</td><td class="small">${esc((r.missing || []).slice(0, 3).join(', ') || '–')}${r.comment ? `<br><span class="muted">${esc(r.comment)}</span>` : ''}</td></tr>`;
          }).join('')}</tbody>
        </table>
      </div>
      <div class="btn-row">
        ${weak.length ? `<button class="btn primary" data-action="practice-ids" data-ids="${esc(weak.join(','))}">Lücken jetzt üben</button>` : ''}
        <button class="btn" data-action="exam-new">Neue Prüfung</button>
        <details class="disclosure" style="width:100%"><summary>Gesprächsverlauf</summary>
          <div class="chat">${exam.transcript.map(t => `<div class="bubble ${t.role}"><span class="who">${t.role === 'examiner' ? 'Prüfer' : 'Sie'}</span>${esc(t.text)}</div>`).join('')}</div>
        </details>
      </div>`;
  }

  function startExam() {
    const modeInput = document.querySelector('input[name="exam-mode"]:checked');
    const countInput = document.getElementById('exam-count');
    const mode = modeInput && modeInput.value === 'ai' && aiStatus.ai ? 'ai' : 'local';
    const count = Number(countInput ? countInput.value : 6);
    const ids = Core.pickExamQuestions(window.FLData, state, now(), count);
    exam = { mode, ids, index: 0, round: 0, answers: [], transcript: [], results: [], draft: '', loading: false, error: null, finished: false, summary: '' };

    if (mode === 'local') {
      const first = questionById.get(ids[0]);
      exam.transcript.push({ role: 'examiner', text: `Guten Tag, nehmen Sie bitte Platz. Wir beginnen mit dem Fach ${subjectById.get(first.subject).name}.\n\n${first.question}` });
      render();
    } else {
      aiExamTurn();
    }
  }

  function finishExamQuestion(questionId, score, missing, comment) {
    exam.results.push({ questionId, score, missing, comment: comment || '' });
    state = Core.recordAttempt(state, questionId, { score, source: 'exam', missed: missing }, now());
    saveState();
  }

  function localExamTurn(answer) {
    const q = questionById.get(exam.ids[exam.index]);
    exam.answers.push(answer);
    const evaluation = Core.evaluateExamAnswers(q, exam.answers);
    const maxRounds = evaluation.score < 0.6 ? 2 : 1;

    if (exam.round < maxRounds) {
      const follow = Core.examinerFollowUp(q, evaluation, exam.round);
      exam.round += 1;
      if (follow) {
        exam.transcript.push({ role: 'examiner', text: follow });
        return;
      }
    }

    finishExamQuestion(q.id, evaluation.score, evaluation.missing);
    exam.index += 1;
    exam.round = 0;
    exam.answers = [];

    if (exam.index >= exam.ids.length) {
      exam.finished = true;
      exam.transcript.push({ role: 'examiner', text: 'Vielen Dank, damit sind wir am Ende der Prüfung.' });
      return;
    }
    const next = questionById.get(exam.ids[exam.index]);
    exam.transcript.push({ role: 'examiner', text: `Danke. Kommen wir zum Fach ${subjectById.get(next.subject).name}.\n\n${next.question}` });
  }

  async function aiExamTurn() {
    const current = exam;
    current.loading = true;
    current.error = null;
    render();
    try {
      const reply = await aiExamine(current.ids, current.transcript);
      if (reply.assessment) {
        const qid = current.ids.includes(reply.assessment.questionId)
          ? reply.assessment.questionId
          : current.ids[Math.min(current.results.length, current.ids.length - 1)];
        if (!current.results.some(r => r.questionId === qid)) {
          finishExamQuestion(qid, reply.assessment.score, reply.assessment.missing, reply.assessment.comment);
        }
      }
      if (reply.message) current.transcript.push({ role: 'examiner', text: reply.message });
      if (reply.finished) {
        current.finished = true;
        current.summary = reply.summary;
      }
    } catch (err) {
      current.error = err.message;
    } finally {
      current.loading = false;
      if (exam === current) render();
    }
  }

  function sendExamAnswer() {
    const answer = exam.draft.trim();
    if (!answer) {
      toast('Bitte geben Sie eine Antwort ein.');
      return;
    }
    exam.transcript.push({ role: 'candidate', text: answer });
    exam.draft = '';
    if (exam.mode === 'ai') {
      aiExamTurn();
    } else {
      localExamTurn(answer);
      render();
    }
  }

  // ------------------------------------------------------------------ Analyse

  function renderAnalysis() {
    const ts = now();
    const analysis = Core.weaknessAnalysis(window.FLData, state, ts);
    const overall = Core.overallStats(window.FLData, state, ts);
    if (overall.worked === 0) {
      return `<header class="page-head"><h1>Schwächenanalyse</h1></header>
        <div class="card empty"><p>Noch keine Daten. Beantworten Sie ein paar Fragen – danach sehen Sie hier, wo Sie gezielt üben sollten.</p>
        <button class="btn primary" data-action="start-daily">Tagesplan starten</button></div>`;
    }
    const trend = analysis.trend;
    const trendText = {
      steigend: 'Ihre Ergebnisse verbessern sich – weiter so!',
      fallend: 'Ihre Ergebnisse sind zuletzt gesunken. Planen Sie mehr Wiederholungen ein.',
      stabil: 'Ihre Ergebnisse sind stabil.',
      unbekannt: 'Für einen Trend braucht es Ergebnisse aus zwei Wochen.'
    }[trend.direction];

    return `
      <header class="page-head">
        <h1>Schwächenanalyse</h1>
        <p>Wo Sie stehen und was Sie als Nächstes üben sollten.</p>
      </header>

      <div class="card">
        <h2>Empfehlungen</h2>
        <ul>${analysis.advice.map(a => `<li>${esc(a)}</li>`).join('')}</ul>
      </div>

      <div class="grid grid-2 section">
        <div class="card">
          <h2>Fächer im Vergleich</h2>
          <p class="small muted">Sortiert nach Prüfungsreife (schwächstes zuerst)</p>
          ${analysis.subjects.map(s => `<div style="margin-top:12px"><strong>${esc(s.name)}</strong>
            ${metricRow('Lernfortschritt', s.learningProgress)}
            ${metricRow('Wissensstand', s.knowledge, tone(s.knowledge))}</div>`).join('')}
        </div>
        <div class="card">
          <h2>Entwicklung</h2>
          <p>${esc(trendText)}</p>
          ${metricRow('Letzte 7 Tage', trend.current.avg, tone(trend.current.avg))}
          ${metricRow('Vorwoche', trend.previous.avg, tone(trend.previous.avg))}
          <p class="small muted" style="margin-top:8px">${trend.current.n} Antworten in den letzten 7 Tagen</p>
          <h2 style="margin-top:18px">Verteilung</h2>
          ${metricRow('Sicher', overall.levels.sicher / overall.total, 'good')}
          ${metricRow('Ausbaufähig', overall.levels.mittel / overall.total, 'warn')}
          ${metricRow('Schwach', overall.levels.schwach / overall.total, 'bad')}
          ${metricRow('Offen', overall.levels.offen / overall.total)}
        </div>
      </div>

      <div class="section-title"><h2>Schwache Themen</h2></div>
      <div class="card">
        ${analysis.weakTopics.length ? `<ul class="list">${analysis.weakTopics.map(t => `<li>
          <div><strong>${esc(t.topic)}</strong><div class="small muted">${esc(subjectById.get(t.subject).name)} · ${t.attempts} Versuche</div></div>
          <span style="display:flex;gap:8px;align-items:center">${levelChip(t.mastery)}
          <button class="btn" data-action="practice-topic" data-subject="${esc(t.subject)}" data-topic="${esc(t.topic)}">Üben</button></span>
        </li>`).join('')}</ul>` : '<p class="muted">Keine schwachen Themen – sehr gut!</p>'}
      </div>

      <div class="section-title"><h2>Häufig vergessene Kernpunkte</h2></div>
      <div class="card">
        ${analysis.missedPoints.length ? `<ul class="list">${analysis.missedPoints.map(m => `<li>
          <div><strong>${esc(m.label)}</strong><div class="small muted">${esc(questionById.get(m.questionId).topic)}</div></div>
          <a class="btn" href="#/frage/${esc(m.questionId)}">Wiederholen</a></li>`).join('')}</ul>` : '<p class="muted">Bisher keine wiederkehrenden Lücken.</p>'}
      </div>

      ${analysis.openTopics.length ? `<div class="section-title"><h2>Noch nicht bearbeitet</h2><span class="muted small">${analysis.openTopics.length} Themen</span></div>
      <div class="card"><p>${analysis.openTopics.map(t => `<a href="#/frage/${esc(t.questionIds[0])}" class="chip" style="margin:3px;text-decoration:none">${esc(t.topic)}</a>`).join('')}</p></div>` : ''}
    `;
  }

  // ------------------------------------------------------------------ Einstellungen

  function renderSettings() {
    return `
      <header class="page-head"><h1>Einstellungen</h1></header>
      <div class="card">
        <h2>KI-Funktionen</h2>
        ${aiStatus.ai
          ? `<div class="panel good"><p><strong>Aktiv${aiStatus.mode === 'sample' ? ' über Ihr Claude-Konto' : ''}.</strong> Antworten werden zusätzlich von der KI bewertet, und der KI-Prüfer steht zur Verfügung.</p></div>`
          : `<div class="panel warn"><p><strong>Nicht aktiv.</strong> Die App läuft in der Grundversion mit lokaler Bewertung.
              ${aiStatus.declined ? 'Die KI wurde für diese Seite nicht freigegeben; beim nächsten Öffnen fragt Claude erneut.' : 'Öffnen Sie die App über claude.ai oder starten Sie den Server mit einem <code>ANTHROPIC_API_KEY</code> (siehe README).'}</p></div>`}
        <p class="small muted">${aiStatus.mode === 'sample'
          ? 'Für die KI-Bewertung werden Ihre Antworttexte an Claude gesendet und zählen zu Ihrer Claude-Nutzung.'
          : 'Für die KI-Bewertung werden Ihre Antworttexte an den Server und von dort an die Claude API übermittelt.'}</p>
      </div>
      <div class="card">
        <h2>Spracheingabe</h2>
        <p class="small muted">${SpeechRec
          ? 'Mit „Antwort einsprechen“ diktieren Sie Ihre Antwort. Die Spracherkennung übernimmt Ihr Browser; je nach Browser wird die Aufnahme dafür an dessen Spracherkennungsdienst übertragen. Klappt der Zugriff aufs Mikrofon nicht, nutzen Sie die Mikrofon-Taste Ihrer Handy-Tastatur.'
          : 'Dieser Browser bietet keine eingebaute Spracherkennung. Nutzen Sie die Mikrofon-Taste Ihrer Handy-Tastatur, um Antworten zu diktieren.'}</p>
      </div>
      <div class="card">
        <h2>Tagesziel</h2>
        <label for="goal" class="small muted">Fragen pro Tag</label>
        <input id="goal" type="number" min="3" max="40" value="${esc(state.settings.dailyGoal)}" data-input="goal">
      </div>
      <div class="card">
        <h2>Daten</h2>
        <p class="small muted">Ihr Fortschritt wird nur lokal in diesem Browser gespeichert. Sichern Sie ihn, um ihn auf ein anderes Gerät zu übertragen.</p>
        <div class="btn-row">
          <button class="btn" data-action="export">Sicherungscode anzeigen</button>
          <label class="btn" for="import-file">Sicherungsdatei laden</label>
          <input id="import-file" type="file" accept="application/json,text/plain" hidden data-input="import">
          <button class="btn bad" data-action="reset" data-confirm="Wirklich alles löschen? Nochmal tippen">Fortschritt zurücksetzen</button>
        </div>
        ${backupCode !== null ? `
          <label for="backup-code" class="small muted" style="display:block;margin-top:14px">Sicherungscode – kopieren und auf dem anderen Gerät unten einfügen</label>
          <textarea id="backup-code" readonly style="min-height:110px;font-family:ui-monospace,monospace;font-size:.8rem">${esc(backupCode)}</textarea>
          <div class="btn-row"><button class="btn primary" data-action="copy-backup">Code kopieren</button></div>` : ''}
        <label for="restore-code" class="small muted" style="display:block;margin-top:14px">Sicherungscode einfügen</label>
        <textarea id="restore-code" data-input="restore" style="min-height:80px" placeholder="Code von einem anderen Gerät hier einfügen …"></textarea>
        <div class="btn-row"><button class="btn" data-action="restore">Sicherung übernehmen</button></div>
      </div>
      <p class="small muted" style="margin-top:16px">Inhalte ohne Gewähr – bitte stets mit den aktuellen Fassungen von StVO, StVG, FeV, FahrlG, FahrlPrüfV und FahrschAusbO abgleichen.</p>
    `;
  }

  function showBackup() {
    backupCode = JSON.stringify(state);
    render();
    const field = document.getElementById('backup-code');
    if (field) field.focus();
  }

  function copyBackup() {
    const field = document.getElementById('backup-code');
    const select = () => {
      if (field) field.select();
      toast('Code markiert – jetzt kopieren.');
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(backupCode).then(() => toast('Sicherungscode kopiert.'), select);
    } else {
      select();
    }
  }

  function restoreFromText(text) {
    try {
      const parsed = JSON.parse(String(text).trim());
      if (!parsed || typeof parsed !== 'object' || !parsed.attempts) throw new Error('invalid');
      state = Core.migrateState(parsed);
      saveState();
      backupCode = null;
      toast('Fortschritt übernommen.');
      render();
    } catch (_err) {
      toast('Der Code ist ungültig. Bitte vollständig kopieren und erneut einfügen.');
    }
  }

  function importData(file) {
    const reader = new FileReader();
    reader.onload = () => restoreFromText(reader.result);
    reader.readAsText(file);
  }

  // ------------------------------------------------------------------ Ereignisse

  const actions = {
    'start-daily': () => {
      const plan = Core.dailyPlan(window.FLData, state, now());
      startPractice(plan.items.map(i => i.questionId), 'Tagesplan');
    },
    'practice-subject': el => {
      startPractice(questions.filter(q => q.subject === el.dataset.subject).map(q => q.id), subjectById.get(el.dataset.subject).name);
    },
    'practice-subject-weak': el => {
      const ts = now();
      const ids = questions
        .filter(q => q.subject === el.dataset.subject)
        .filter(q => {
          const m = Core.questionMastery(state.attempts[q.id], ts);
          return m !== null && m < 0.75;
        })
        .map(q => q.id);
      startPractice(ids, `${subjectById.get(el.dataset.subject).name} – Schwächen`);
    },
    'practice-topic': el => {
      const ids = questions.filter(q => q.subject === el.dataset.subject && q.topic === el.dataset.topic).map(q => q.id);
      startPractice(ids, el.dataset.topic);
    },
    'practice-ids': el => startPractice(el.dataset.ids.split(','), el.dataset.title || 'Wiederholung'),
    'practice-signs': el => {
      const ts = now();
      const group = SIGN_GROUPS.find(g => g.id === el.dataset.group) || null;
      const pool = group ? signs.filter(item => signGroup(item) === group) : signs;
      // Erst mischen, dann stabil nach Wissensstand sortieren: Schwächste zuerst, Gleichstand in Zufallsreihenfolge.
      const shuffled = pool.slice();
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      const level = item => {
        const m = Core.questionMastery(state.attempts[item.id], ts);
        return m === null ? 0.4 : m;
      };
      const ordered = shuffled.sort((a, b) => level(a) - level(b));
      // Alle Zeichen der Auswahl (schwächste zuerst); mit „Überspringen“/„Zurück“ frei navigierbar.
      startPractice(ordered.map(item => item.id), group ? `Zeichen-Training – ${group.label}` : 'Verkehrszeichen-Training');
    },
    mic: el => {
      if (dictation && dictation.target === el.dataset.target && !dictation.stopping) stopDictation();
      else startDictation(el.dataset.target);
    },
    'submit-answer': () => stopDictation(() => submitAnswer(false)),
    reveal: () => stopDictation(() => submitAnswer(true)),
    'practice-prev': () => moveInPractice(-1),
    'practice-skip': () => moveInPractice(1),
    'ai-evaluate': () => requestAiEvaluation(),
    rate: el => rate(Number(el.dataset.score)),
    'exam-start': startExam,
    'exam-send': () => stopDictation(sendExamAnswer),
    'exam-retry': () => aiExamTurn(),
    'exam-abort': () => {
      if (exam.results.length === 0) exam = null;
      else exam.finished = true;
      render();
    },
    'exam-new': () => {
      exam = null;
      render();
    },
    export: showBackup,
    'copy-backup': copyBackup,
    restore: () => {
      const field = document.getElementById('restore-code');
      if (!field || !field.value.trim()) {
        toast('Bitte zuerst einen Sicherungscode einfügen.');
        return;
      }
      restoreFromText(field.value);
    },
    reset: () => {
      state = Core.createState();
      saveState();
      practice = null;
      exam = null;
      backupCode = null;
      toast('Fortschritt zurückgesetzt.');
      render();
    }
  };

  // Zweistufige Bestätigung direkt im Button (Browser-Dialoge sind nicht überall erlaubt).
  function needsConfirmation(el) {
    if (!el.dataset.confirm || pendingConfirm === el) return false;
    pendingConfirm = el;
    el.dataset.label = el.textContent;
    el.textContent = el.dataset.confirm;
    setTimeout(() => {
      if (pendingConfirm === el) {
        pendingConfirm = null;
        el.textContent = el.dataset.label;
      }
    }, 4000);
    return true;
  }

  app.addEventListener('click', event => {
    const el = event.target.closest('[data-action]');
    if (!el || el.disabled) return;
    const handler = actions[el.dataset.action];
    if (handler) {
      event.preventDefault();
      if (needsConfirmation(el)) return;
      pendingConfirm = null;
      handler(el);
    }
  });

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.defaultPrevented || event.ctrlKey || event.metaKey) return;
    event.preventDefault();
    go(link.getAttribute('href'));
  });

  app.addEventListener('input', event => {
    const el = event.target;
    if (el.dataset.input === 'answer' && practice) practice.answer = el.value;
    if (el.dataset.input === 'exam-answer' && exam) exam.draft = el.value;
    if (el.dataset.input === 'goal') {
      const goal = Math.round(Number(el.value));
      if (goal >= 3 && goal <= 40) {
        state = Object.assign({}, state, { settings: Object.assign({}, state.settings, { dailyGoal: goal }) });
        saveState();
      }
    }
  });

  app.addEventListener('change', event => {
    const el = event.target;
    if (el.dataset.input === 'import' && el.files && el.files[0]) importData(el.files[0]);
  });

  app.addEventListener('keydown', event => {
    // Strg/Cmd + Enter sendet die Antwort ab.
    if (event.key !== 'Enter' || !(event.ctrlKey || event.metaKey)) return;
    if (event.target.dataset.input === 'answer') stopDictation(() => submitAnswer(false));
    if (event.target.dataset.input === 'exam-answer' && !exam.loading) stopDictation(sendExamAnswer);
  });

  const syncFromLocation = () => {
    currentHash = window.location.hash;
    render();
  };
  window.addEventListener('hashchange', syncFromLocation);
  window.addEventListener('popstate', syncFromLocation);
  window.addEventListener('storage', event => {
    if (event.key === STORAGE_KEY) {
      state = loadState();
      render();
    }
  });

  render();
  checkAi();
})();
