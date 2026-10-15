/* Oberfläche der Fahrlehrer-Prüfungs-App (ohne Framework, ohne Build-Schritt). */
(function () {
  'use strict';

  const Core = window.FLCore;
  const { subjects, questions } = window.FLData;
  const STORAGE_KEY = 'fl-pruefung-state-v1';
  const questionById = new Map(questions.map(q => [q.id, q]));
  const subjectById = new Map(subjects.map(s => [s.id, s]));
  const app = document.getElementById('app');

  let state = loadState();
  let aiStatus = { ai: false, model: null };
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

  async function checkAi() {
    try {
      const res = await fetch('api/status', { cache: 'no-store' });
      if (res.ok) aiStatus = await res.json();
    } catch (_err) {
      aiStatus = { ai: false, model: null };
    }
    render();
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
      const active = a.dataset.nav === r.name || (a.dataset.nav === 'faecher' && r.name === 'fach');
      a.classList.toggle('active', active);
      if (active) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });

    const views = {
      dashboard: renderDashboard,
      heute: renderToday,
      faecher: renderSubjects,
      fach: () => renderSubject(r.param),
      frage: () => renderSingleQuestion(r.param),
      ueben: renderPractice,
      pruefung: renderExam,
      analyse: renderAnalysis,
      einstellungen: renderSettings
    };
    pendingConfirm = null;
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
    `;
  }

  function renderSubject(id) {
    const subject = subjectById.get(id);
    if (!subject) return '<div class="card empty">Fach nicht gefunden.</div>';
    const ts = now();
    const stat = Core.subjectStats(window.FLData, state, ts).find(s => s.subject.id === id);
    const list = questions.filter(q => q.subject === id);

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
            <button class="btn primary" data-action="practice-subject" data-subject="${esc(id)}">Alle Fragen üben</button>
            <button class="btn" data-action="practice-subject-weak" data-subject="${esc(id)}" ${stat.levels.schwach + stat.levels.mittel === 0 ? 'disabled' : ''}>Nur Schwächen</button>
          </div>
        </div>
      </div>
      <div class="section-title"><h2>Fragen</h2></div>
      <div class="card">
        <ul class="list">${list.map(q => {
          const mastery = Core.questionMastery(state.attempts[q.id], ts);
          return `<li><div><a href="#/frage/${esc(q.id)}">${esc(q.topic)}</a><div class="small muted">${esc(q.question)}</div></div>${levelChip(mastery)}</li>`;
        }).join('')}</ul>
      </div>
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
    const head = `
      <div class="progress-meta"><span>${esc(practice.title)}</span><span>Frage ${practice.index + 1} von ${practice.queue.length}</span></div>
      ${bar(practice.index / practice.queue.length, 'thin')}
      <div class="card section">
        <div style="display:flex;gap:8px;flex-wrap:wrap">${subjectChip(q.subject)}<span class="chip">${esc(q.topic)}</span><span class="chip">Schwierigkeit ${'●'.repeat(q.difficulty)}${'○'.repeat(3 - q.difficulty)}</span></div>
        <p class="question-text">${esc(q.question)}</p>`;

    if (practice.phase === 'answer') {
      return `${head}
        <label for="answer" class="kpi-label">Ihre Antwort (frei formulieren, wie in der mündlichen Prüfung)</label>
        <textarea id="answer" data-input="answer" placeholder="Formulieren Sie Ihre Antwort in ganzen Sätzen …">${esc(practice.answer)}</textarea>
        <div class="btn-row">
          <button class="btn primary" data-action="submit-answer">Antwort prüfen</button>
          <button class="btn" data-action="reveal">Weiß ich nicht – Lösung zeigen</button>
        </div>
      </div>`;
    }

    return `${head}
        ${practice.answer ? `<details class="disclosure"><summary>Ihre Antwort</summary><p style="white-space:pre-wrap">${esc(practice.answer)}</p></details>` : ''}
        ${renderAutoEvaluation(practice.auto)}
        ${renderAiEvaluation()}
        <div class="panel info"><h3>Einfach erklärt</h3><p>${esc(q.explanation)}</p></div>
        <div class="panel"><h3>Praxisbeispiel</h3><p>${esc(q.example)}</p></div>
        <details class="disclosure" open><summary>Musterantwort</summary><p>${esc(q.modelAnswer)}</p>
          <p class="small muted">Kernpunkte: ${q.keyPoints.map(p => esc(p.label)).join(' · ')}</p></details>
        <details class="disclosure"><summary>Mögliche Nachfragen des Prüfers</summary><ul>${q.followUps.map(f => `<li>${esc(f)}</li>`).join('')}</ul></details>
        <h3 style="margin-top:18px">Wie gut wussten Sie es?</h3>
        <div class="btn-row">
          <button class="btn good" data-action="rate" data-score="1">Gewusst</button>
          <button class="btn warn" data-action="rate" data-score="0.5">Teilweise</button>
          <button class="btn bad" data-action="rate" data-score="0">Nicht gewusst</button>
        </div>
      </div>`;
  }

  function renderAutoEvaluation(auto) {
    if (!auto) return '';
    const cls = tone(auto.score);
    return `<div class="panel ${cls}">
      <h3>Schnellbewertung: ${pct(auto.score)} der Kernpunkte</h3>
      <p>${esc(auto.feedback)}</p>
      <ul class="points">
        ${auto.covered.map(l => `<li><span class="ok" aria-label="genannt">✓</span>${esc(l)}</li>`).join('')}
        ${auto.missing.map(l => `<li><span class="no" aria-label="fehlt">✗</span>${esc(l)}</li>`).join('')}
      </ul>
      <p class="small muted" style="margin-top:8px">Automatischer Abgleich mit Schlüsselbegriffen – gleichwertige Formulierungen werden evtl. nicht erkannt.</p>
    </div>`;
  }

  function renderAiEvaluation() {
    if (!aiStatus.ai || !practice.answer) return '';
    if (practice.aiLoading) {
      return '<div class="panel"><h3 style="display:flex;gap:8px;align-items:center"><span class="spinner"></span>KI-Prüfer bewertet Ihre Antwort …</h3></div>';
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
      ${ai.errors.length ? `<p><strong>Fachliche Fehler:</strong></p><ul>${ai.errors.map(e => `<li>${esc(e)}</li>`).join('')}</ul>` : ''}
      ${ai.missing.length ? `<p><strong>Es fehlt noch:</strong> ${ai.missing.map(esc).join(', ')}</p>` : ''}
      ${ai.tip ? `<p><strong>Lerntipp:</strong> ${esc(ai.tip)}</p>` : ''}
    </div>`;
  }

  function renderPracticeSummary() {
    const results = practice.results;
    const avg = results.length ? results.reduce((a, r) => a + r.score, 0) / results.length : 0;
    const weak = results.filter(r => r.score < 0.6).map(r => r.questionId);
    return `
      <header class="page-head"><h1>Übung abgeschlossen</h1><p>${esc(practice.title)}</p></header>
      <div class="card">
        <div class="kpi-label">Durchschnitt dieser Runde</div>
        <div class="kpi-value">${pct(avg)}</div>
        ${bar(avg, tone(avg))}
        <ul class="list" style="margin-top:12px">${results.map(r => {
          const q = questionById.get(r.questionId);
          return `<li><div><a href="#/frage/${esc(q.id)}">${esc(q.topic)}</a><div class="small muted">${esc(subjectById.get(q.subject).name)}</div></div><span class="chip ${tone(r.score) === 'good' ? 'sicher' : tone(r.score) === 'warn' ? 'mittel' : 'schwach'}">${pct(r.score)}</span></li>`;
        }).join('')}</ul>
        <div class="btn-row">
          ${weak.length ? `<button class="btn primary" data-action="practice-ids" data-ids="${esc(weak.join(','))}">Schwache Fragen wiederholen</button>` : ''}
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
      current.ai = await postJson('api/evaluate', { questionId: q.id, answer: current.answer });
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
    practice.results.push({ questionId: q.id, score });
    practice.index += 1;
    practice.phase = 'answer';
    practice.answer = '';
    practice.auto = null;
    practice.ai = null;
    practice.aiError = null;
    practice.aiLoading = false;
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
        <label for="exam-answer" class="kpi-label">Ihre Antwort</label>
        <textarea id="exam-answer" data-input="exam-answer" placeholder="Antworten Sie so, wie Sie es in der Prüfung sagen würden …" ${exam.loading ? 'disabled' : ''}>${esc(exam.draft)}</textarea>
        <div class="btn-row">
          <button class="btn primary" data-action="exam-send" ${exam.loading ? 'disabled' : ''}>Antwort abgeben</button>
          <button class="btn" data-action="exam-abort" ${exam.results.length ? 'data-confirm="Jetzt beenden und auswerten? Nochmal tippen"' : ''}>Prüfung beenden</button>
        </div>
      </div>`;
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
            : 'Nicht verfügbar – der Server läuft ohne KI-Zugang (siehe Einstellungen).'}</span></span></label>
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
      const reply = await postJson('api/examiner', { questionIds: current.ids, history: current.transcript });
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
          ? `<div class="panel good"><p><strong>Aktiv.</strong> Antworten werden zusätzlich von der KI bewertet, und der KI-Prüfer steht zur Verfügung.</p></div>`
          : `<div class="panel warn"><p><strong>Nicht aktiv.</strong> Die App läuft in der Grundversion mit lokaler Bewertung.
              Starten Sie den Server mit einem <code>ANTHROPIC_API_KEY</code>, um KI-Bewertung und KI-Prüfer zu nutzen (siehe README).</p></div>`}
        <p class="small muted">Für die KI-Bewertung werden Ihre Antworttexte an den Server und von dort an die Claude API übermittelt.</p>
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
    'practice-ids': el => startPractice(el.dataset.ids.split(','), 'Wiederholung'),
    'submit-answer': () => submitAnswer(false),
    reveal: () => submitAnswer(true),
    'ai-evaluate': () => requestAiEvaluation(),
    rate: el => rate(Number(el.dataset.score)),
    'exam-start': startExam,
    'exam-send': sendExamAnswer,
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
    if (event.target.dataset.input === 'answer') submitAnswer(false);
    if (event.target.dataset.input === 'exam-answer' && !exam.loading) sendExamAnswer();
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
