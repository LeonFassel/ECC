/**
 * Schriftliche Prüfung: Auswahl der Prüfungen und Arbeitsplatz mit Timer,
 * Fragen links (mit Markierungen) und kariertem A4-Papier rechts.
 * Wird von app.js eingebunden (Ansichten, Aktionen, Ein-/Aushängen).
 */
(function (root) {
  'use strict';

  const W = root.FLWritten;
  const Ink = root.FLInk;
  const exams = ((root.FLQuestionsSchriftlich && root.FLQuestionsSchriftlich.exams) || [])
    .slice()
    .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')) || String(a.name || a.title).localeCompare(String(b.name || b.title)));
  const examById = new Map(exams.map(exam => [exam.id, exam]));

  const META_KEY = 'fl-written-v1';
  const DB_NAME = 'fl-written';
  // docs: aktueller Arbeitsstand je Prüfung; archive: abgegebene Prüfungen (Blätter + Bewertung).
  const STORES = { docs: 'examId', archive: 'id' };
  const MAX_ARCHIVE = 50;
  const TEXT_MM = 4.2; // Schriftgröße im Textfeld (passt in eine Karo-Zeile)
  const LINE_MM = 5; // Zeilenhöhe = ein Karo
  const SHEET_WIDTH = 560; // Breite des Fragenblatts in Blatt-Einheiten (px bei 100 %)
  const Q_UNIT = SHEET_WIDTH / 210; // 1 mm auf dem Fragenblatt
  const PAGE_WIDTH = 210; // A4 in mm

  const PEN_COLORS = [
    { id: '#111827', label: 'Schwarz' },
    { id: '#1d4ed8', label: 'Blau' },
    { id: '#dc2626', label: 'Rot' }
  ];
  const PEN_WIDTHS = [
    { id: 'fein', mm: 0.35, label: 'Fein' },
    { id: 'mittel', mm: 0.55, label: 'Mittel' },
    { id: 'dick', mm: 0.9, label: 'Dick' }
  ];
  const MARKER_COLORS = [
    { id: '#facc15', label: 'Gelb' },
    { id: '#4ade80', label: 'Grün' },
    { id: '#f472b6', label: 'Pink' }
  ];
  const MARKER_MM = 6;

  let ctx = null;
  const meta = loadMeta();
  let session = null;

  // ------------------------------------------------------------------ Speicher

  function loadMeta() {
    const empty = { exams: {}, settings: {}, archive: [] };
    try {
      const raw = JSON.parse(root.localStorage.getItem(META_KEY) || 'null');
      if (!raw || typeof raw !== 'object') return empty;
      return {
        exams: raw.exams && typeof raw.exams === 'object' ? raw.exams : {},
        settings: raw.settings && typeof raw.settings === 'object' ? raw.settings : {},
        archive: Array.isArray(raw.archive) ? raw.archive.filter(a => a && typeof a.id === 'string') : []
      };
    } catch (_err) {
      return empty;
    }
  }

  function saveMeta() {
    try {
      root.localStorage.setItem(META_KEY, JSON.stringify(meta));
    } catch (_err) {
      // Privater Modus: Timer und Einstellungen gelten dann nur bis zum Neuladen.
    }
  }

  function examMeta(id) {
    if (!meta.exams[id] || typeof meta.exams[id] !== 'object') meta.exams[id] = {};
    const entry = meta.exams[id];
    entry.timer = W.normalizeTimer(entry.timer);
    if (!Array.isArray(entry.warned)) entry.warned = [];
    return entry;
  }

  function settings() {
    const s = meta.settings;
    if (!['pen', 'marker', 'eraser', 'text'].includes(s.tool)) s.tool = 'pen';
    if (!PEN_COLORS.some(c => c.id === s.penColor)) s.penColor = PEN_COLORS[0].id;
    if (!PEN_WIDTHS.some(w => w.id === s.penWidth)) s.penWidth = 'mittel';
    if (!MARKER_COLORS.some(c => c.id === s.markerColor)) s.markerColor = MARKER_COLORS[0].id;
    if (typeof s.split !== 'number' || s.split < 0.25 || s.split > 0.75) s.split = 0.5;
    s.fingerDraws = Boolean(s.fingerDraws);
    s.paperZoom = clampNumber(s.paperZoom, 1, 3, 1);
    s.questionZoom = clampNumber(s.questionZoom, 0.6, 2.5, 1);
    return s;
  }

  function clampNumber(value, min, max, fallback) {
    const n = Number(value);
    return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
  }

  // Handschrift liegt in IndexedDB (localStorage wäre für viele Striche zu klein).
  const memory = { docs: new Map(), archive: new Map() };
  let dbPromise = null;

  function openDb() {
    if (!dbPromise) {
      dbPromise = new Promise(resolve => {
        try {
          const request = root.indexedDB.open(DB_NAME, 2);
          request.onupgradeneeded = () => {
            const db = request.result;
            for (const [name, keyPath] of Object.entries(STORES)) {
              if (!db.objectStoreNames.contains(name)) db.createObjectStore(name, { keyPath });
            }
          };
          request.onsuccess = () => resolve(request.result);
          request.onerror = () => resolve(null);
          request.onblocked = () => resolve(null);
        } catch (_err) {
          resolve(null);
        }
      });
    }
    return dbPromise;
  }

  async function getRecord(store, key) {
    const db = await openDb();
    const fallback = memory[store].get(key) || null;
    if (!db) return fallback;
    return new Promise(resolve => {
      try {
        const request = db.transaction(store, 'readonly').objectStore(store).get(key);
        request.onsuccess = () => resolve(request.result || fallback);
        request.onerror = () => resolve(fallback);
      } catch (_err) {
        resolve(fallback);
      }
    });
  }

  async function writeRecord(store, run) {
    const db = await openDb();
    if (!db) return false;
    return new Promise(resolve => {
      try {
        const tx = db.transaction(store, 'readwrite');
        run(tx.objectStore(store));
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
        tx.onabort = () => resolve(false);
      } catch (_err) {
        resolve(false);
      }
    });
  }

  function putRecord(store, value) {
    memory[store].set(value[STORES[store]], value);
    return writeRecord(store, os => os.put(value));
  }

  function deleteRecord(store, key) {
    memory[store].delete(key);
    return writeRecord(store, os => os.delete(key));
  }

  const loadDoc = examId => getRecord('docs', examId);
  const storeDoc = doc => putRecord('docs', doc);

  // ------------------------------------------------------------------ Hilfen

  function esc(value) {
    return ctx.esc(value);
  }

  function now() {
    return Date.now();
  }

  function taskCount(exam) {
    return exam.parts.reduce((sum, part) => sum + part.tasks.filter(t => t.label || t.text).length, 0);
  }

  function examTitle(exam) {
    return exam.name || (exam.dateLabel ? `Prüfung vom ${exam.dateLabel}` : exam.title);
  }

  function formatGrade(value) {
    return Number(value).toFixed(1).replace('.', ',');
  }

  function statusText(id) {
    const entry = meta.exams[id];
    if (!entry || !entry.timer) return { label: 'Noch nicht begonnen', tone: '' };
    const timer = W.normalizeTimer(entry.timer);
    const status = W.timerStatus(timer, now());
    const left = W.formatClock(W.remainingMs(timer, now()));
    if (status === 'running') return { label: `Timer läuft – noch ${left}`, tone: 'mittel' };
    if (status === 'paused') return { label: `Pausiert – noch ${left}`, tone: 'mittel' };
    if (status === 'finished') return { label: 'Zeit abgelaufen', tone: 'schwach' };
    return { label: entry.updatedAt ? 'Angefangen' : 'Noch nicht begonnen', tone: entry.updatedAt ? 'mittel' : '' };
  }

  const ICONS = {
    back: '<path d="M15 5l-7 7 7 7"/>',
    pen: '<path d="M4 20l4-1L19 8l-3-3L5 16z"/><path d="M14 7l3 3"/>',
    marker: '<path d="M9 14l-4 6h6l1-2"/><path d="M9 14l7-9 4 3-7 9z"/>',
    eraser: '<path d="M8 20h12"/><path d="M5 15l8-9a2 2 0 0 1 3 0l3 3a2 2 0 0 1 0 3l-7 8H8z"/>',
    undo: '<path d="M9 14L4 9l5-5"/><path d="M4 9h11a5 5 0 0 1 0 10h-3"/>',
    redo: '<path d="M15 14l5-5-5-5"/><path d="M20 9H9a5 5 0 0 0 0 10h3"/>',
    finger: '<path d="M9 11V5a2 2 0 0 1 4 0v6"/><path d="M13 10a2 2 0 0 1 4 0v3a7 7 0 0 1-7 7 6 6 0 0 1-5-3l-2-4a2 2 0 0 1 3-2l2 2"/>',
    play: '<path d="M7 5l12 7-12 7z"/>',
    pause: '<path d="M7 5v14M17 5v14"/>',
    reset: '<path d="M4 12a8 8 0 1 0 3-6"/><path d="M4 4v4h4"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    text: '<path d="M5 7V5h14v2"/><path d="M12 5v14"/><path d="M9 19h6"/>',
    move: '<path d="M12 3v18M3 12h18"/><path d="M9 6l3-3 3 3M9 18l3 3 3-3M6 9l-3 3 3 3M18 9l3 3-3 3"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    trash: '<path d="M4 7h16"/><path d="M10 11v6M14 11v6"/><path d="M6 7l1 13h10l1-13"/><path d="M9 7V4h6v3"/>',
    eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'
  };

  function icon(name) {
    return `<svg class="ws-icon" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]}</svg>`;
  }

  // ------------------------------------------------------------------ Ansichten

  /** Umschalter oben auf der Prüfungsseite: mündlich / schriftlich. */
  function examTabs(active) {
    if (exams.length === 0) return '';
    return `<div class="segmented" role="tablist" aria-label="Prüfungsart">
      <a href="#/pruefung" role="tab" aria-selected="${active === 'muendlich'}" class="${active === 'muendlich' ? 'active' : ''}">Mündliche Prüfung</a>
      <a href="#/schriftlich" role="tab" aria-selected="${active === 'schriftlich'}" class="${active === 'schriftlich' ? 'active' : ''}">Schriftliche Prüfung</a>
    </div>`;
  }

  function renderList() {
    if (exams.length === 0) {
      return `${examTabs('schriftlich')}<div class="card empty">Es sind noch keine schriftlichen Prüfungen eingebaut.</div>`;
    }
    return `
      <header class="page-head">
        <h1>Prüfungssimulation</h1>
        <p>Wählen Sie eine schriftliche Prüfung. Links stehen die Aufgaben, rechts schreiben Sie auf kariertem A4-Papier – mit dem Apple Pencil, dem Finger oder der Maus. Den 5-Stunden-Timer starten Sie selbst.</p>
      </header>
      <div class="written-top">${examTabs('schriftlich')}<a class="btn" href="#/archiv">Archiv${archiveList().length ? ` (${archiveList().length})` : ''}</a></div>
      <div class="grid grid-2">${exams.map(exam => {
        const status = statusText(exam.id);
        return `<div class="card written-card">
          <h3><span>${esc(examTitle(exam))}</span>${status.tone ? `<span class="chip ${esc(status.tone)}">${esc(status.label)}</span>` : ''}</h3>
          <p class="small muted">${esc(exam.parts.map(p => p.name).join(' · '))}</p>
          <p class="small muted">${taskCount(exam)} Aufgaben${status.tone ? '' : ` · ${esc(status.label)}`}</p>
          <div class="btn-row"><a class="btn ${status.tone ? '' : 'primary'}" href="#/schriftlich/${esc(exam.id)}">${status.tone ? 'Fortsetzen' : 'Prüfung öffnen'}</a></div>
        </div>`;
      }).join('')}</div>`;
  }

  function figureHtml(figure) {
    return `<figure class="ws-figure"><img src="${esc(figure.src)}" alt="${esc(figure.alt || 'Abbildung zur Aufgabe')}" decoding="async"></figure>`;
  }

  function partSheet(exam, part, index) {
    const head = index === 0
      ? `<div class="ws-exam-head"><strong>${esc(exam.title)}</strong>${exam.dateLabel ? `<span>${esc(exam.dateLabel)}</span>` : ''}</div>
         ${exam.notes ? `<p class="ws-pre ws-notes">${esc(exam.notes)}</p>` : ''}`
      : '';
    return `<article class="ws-qsheet" id="ws-part-${index}" data-ink-layer="q-${index}">
      <div class="ws-qsheet-inner" style="width:${SHEET_WIDTH}px">
        ${head}
        <h2 class="ws-part-title">${esc(part.name)}</h2>
        ${part.intro ? `<p class="ws-pre">${esc(part.intro)}</p>` : ''}
        ${part.tasks.map(task => `<section class="ws-task">
          ${task.label || task.points ? `<h3>${esc(task.label || '')}${task.points ? ` <span class="ws-points">(${esc(task.points)} ${Number(task.points) === 1 ? 'Punkt' : 'Punkte'})</span>` : ''}</h3>` : ''}
          ${task.text ? `<p class="ws-pre">${esc(task.text)}</p>` : ''}
          ${(task.figures || []).map(figureHtml).join('')}
        </section>`).join('')}
      </div>
    </article>`;
  }

  function pageHtml(index) {
    return `<div class="ws-page-wrap">
      <div class="ws-page" data-ink-layer="page-${index}" aria-label="Kariertes Blatt ${index + 1}"><div class="ws-textlayer" data-page="${index}"></div></div>
      <div class="ws-page-foot"><span>Seite ${index + 1}</span>
        <button class="linklike" data-action="ws-clear" data-layer="page-${index}" data-confirm="Seite ${index + 1} wirklich leeren? Nochmal tippen">Seite leeren</button></div>
    </div>`;
  }

  function toolButton(tool, label, extra) {
    return `<button type="button" class="ws-btn" data-action="ws-tool" data-tool="${tool}" aria-pressed="false" title="${label}" aria-label="${label}">${icon(tool)}${extra || ''}</button>`;
  }

  function renderWorkspace(id) {
    const exam = examById.get(id);
    if (!exam) return '<div class="card empty">Prüfung nicht gefunden. <a href="#/schriftlich">Zur Auswahl</a></div>';
    const s = settings();
    const pages = session && session.examId === id ? session.doc.pageCount : Math.max(1, Number(examMeta(id).pageCount) || 1);
    return `<div class="ws" data-view="split" style="--ws-split:${s.split}">
      <header class="ws-bar">
        <a class="ws-btn ws-back" href="#/schriftlich" aria-label="Zurück zur Auswahl" title="Zurück zur Auswahl">${icon('back')}</a>
        <div class="ws-title"><strong>${esc(examTitle(exam))}</strong><span class="small muted">Wird automatisch gespeichert</span></div>
        <button type="button" class="ws-btn ws-submit" data-action="ws-submit" data-confirm="Prüfung jetzt beenden und von Claude bewerten lassen? Nochmal tippen" title="Prüfung beenden und abgeben">Beenden</button>
        <div class="ws-timer" data-status="idle">
          <span class="ws-clock" role="timer" aria-live="off">5:00:00</span>
          <button type="button" class="ws-btn ws-timer-main" data-action="ws-timer">${icon('play')}<span>Start</span></button>
          <button type="button" class="ws-btn" data-action="ws-timer-reset" data-confirm="Timer wirklich auf 5:00:00 zurücksetzen? Nochmal tippen" aria-label="Timer zurücksetzen" title="Timer zurücksetzen">${icon('reset')}</button>
        </div>
      </header>
      <div class="ws-toolbar" role="toolbar" aria-label="Werkzeuge">
        <div class="ws-group">
          ${toolButton('pen', 'Kugelschreiber')}
          ${PEN_COLORS.map(c => `<button type="button" class="ws-swatch" data-action="ws-pen-color" data-color="${c.id}" style="--swatch:${c.id}" aria-label="Kugelschreiber ${c.label}" title="${c.label}" aria-pressed="false"></button>`).join('')}
          ${PEN_WIDTHS.map(w => `<button type="button" class="ws-btn ws-width" data-action="ws-pen-width" data-width="${w.id}" aria-label="Strichstärke ${w.label}" title="${w.label}" aria-pressed="false"><span style="--w:${Math.round(w.mm * 6)}px"></span></button>`).join('')}
        </div>
        <div class="ws-group">
          ${toolButton('marker', 'Textmarker')}
          ${MARKER_COLORS.map(c => `<button type="button" class="ws-swatch marker" data-action="ws-marker-color" data-color="${c.id}" style="--swatch:${c.id}" aria-label="Textmarker ${c.label}" title="${c.label}" aria-pressed="false"></button>`).join('')}
        </div>
        <div class="ws-group">
          ${toolButton('eraser', 'Radierer')}
          ${toolButton('text', 'Textfeld – mit der Tastatur schreiben')}
          <button type="button" class="ws-btn" data-action="ws-undo" aria-label="Rückgängig" title="Rückgängig">${icon('undo')}</button>
          <button type="button" class="ws-btn" data-action="ws-redo" aria-label="Wiederholen" title="Wiederholen">${icon('redo')}</button>
          <button type="button" class="ws-btn" data-action="ws-finger" aria-pressed="false" title="Mit dem Finger zeichnen (sonst scrollt der Finger und nur der Stift schreibt)">${icon('finger')}<span>Finger</span></button>
        </div>
        <div class="ws-group ws-views" role="group" aria-label="Ansicht">
          <button type="button" class="ws-btn" data-action="ws-view" data-view="questions" aria-pressed="false">Fragen</button>
          <button type="button" class="ws-btn" data-action="ws-view" data-view="split" aria-pressed="false">Geteilt</button>
          <button type="button" class="ws-btn" data-action="ws-view" data-view="paper" aria-pressed="false">Blatt</button>
          <button type="button" class="ws-btn ws-zoom" data-action="ws-zoom-reset" title="Zoom zurücksetzen (mit zwei Fingern zoomen)">100 %</button>
        </div>
      </div>
      <div class="ws-body">
        <section class="ws-pane ws-questions" aria-label="Aufgaben">
          <nav class="ws-jump" aria-label="Prüfungsteile">${exam.parts.map((part, i) => `<button type="button" class="chip" data-action="ws-jump" data-part="${i}">${esc(part.name)}</button>`).join('')}</nav>
          <div class="ws-qsheets">${exam.parts.map((part, i) => partSheet(exam, part, i)).join('')}</div>
          <p class="small muted ws-pane-foot"><button class="linklike" data-action="ws-clear-questions" data-confirm="Alle Markierungen auf den Fragen löschen? Nochmal tippen">Alle Markierungen auf den Fragen löschen</button></p>
        </section>
        <div class="ws-divider" role="separator" aria-orientation="vertical" aria-label="Trennlinie verschieben" tabindex="0"><span></span></div>
        <section class="ws-pane ws-paper" aria-label="Kariertes Papier">
          <div class="ws-pages">${Array.from({ length: pages }, (_, i) => pageHtml(i)).join('')}</div>
          <button type="button" class="btn ws-add-page" data-action="ws-add-page">${icon('plus')} Neue Seite</button>
        </section>
      </div>
    </div>`;
  }

  // ------------------------------------------------------------------ Arbeitsplatz

  function currentTool(layerKey) {
    const s = settings();
    const unit = layerKey.startsWith('q-') ? Q_UNIT : 1;
    if (s.tool === 'marker') return { tool: 'marker', color: s.markerColor, width: MARKER_MM * unit };
    if (s.tool === 'eraser') return { tool: 'eraser' };
    if (s.tool === 'text') return { tool: layerKey.startsWith('page-') ? 'text' : 'none' };
    const width = PEN_WIDTHS.find(w => w.id === s.penWidth).mm;
    return { tool: 'pen', color: s.penColor, width: width * unit };
  }

  function layerStrokes(key) {
    return (session && session.doc.layers[key]) || [];
  }

  function commit(action) {
    session.doc.layers = W.applyAction(session.doc.layers, action);
    session.history = W.record(session.history, action);
    scheduleSave();
    syncToolbar();
  }

  function mountSurface(el) {
    const key = el.dataset.inkLayer;
    const isQuestion = key.startsWith('q-');
    const surface = Ink.createSurface({
      host: el,
      logicalWidth: isQuestion ? SHEET_WIDTH : PAGE_WIDTH,
      eraserRadius: isQuestion ? 3 * Q_UNIT : 3,
      getStrokes: () => layerStrokes(key),
      getTool: () => currentTool(key),
      fingerDraws: () => settings().fingerDraws,
      onStroke: stroke => {
        commit({ type: 'add', layer: key, stroke });
        surface.appendStroke(stroke);
      },
      onErase: indices => {
        const strokes = layerStrokes(key);
        commit({ type: 'erase', layer: key, removed: indices.map(index => ({ index, stroke: strokes[index] })) });
        surface.redraw();
      },
      onActivity: () => {},
      onTap: point => {
        if (key.startsWith('page-')) addTextbox(Number(key.slice(5)), point);
      }
    });
    surface.setFingerMode(settings().fingerDraws);
    session.surfaces.set(key, surface);
  }

  function mountSurfaces() {
    for (const surface of session.surfaces.values()) surface.destroy();
    session.surfaces.clear();
    document.querySelectorAll('[data-ink-layer]').forEach(mountSurface);
  }

  function redrawAll() {
    for (const surface of session.surfaces.values()) surface.redraw();
  }

  /** Fragenblatt in fester Breite setzen und passend skalieren – so bleiben Markierungen am Text. */
  function layoutQuestions() {
    const pane = document.querySelector('.ws-questions');
    if (!pane) return;
    const available = pane.clientWidth - 24;
    const fit = Math.max(0.3, Math.min(1.5, available / SHEET_WIDTH));
    const zoom = fit * settings().questionZoom;
    pane.querySelectorAll('.ws-qsheet').forEach(sheet => {
      const inner = sheet.querySelector('.ws-qsheet-inner');
      inner.style.transform = `scale(${zoom})`;
      sheet.style.width = `${Math.round(SHEET_WIDTH * zoom)}px`;
      sheet.style.height = `${Math.ceil(inner.offsetHeight * zoom)}px`;
    });
  }

  // ------------------------------------------------------------------ Zoom (zwei Finger)

  function applyPaperZoom() {
    const paper = document.querySelector('.ws-paper');
    if (paper) paper.style.setProperty('--paper-zoom', String(settings().paperZoom));
    syncZoomButton();
  }

  function syncZoomButton() {
    const button = document.querySelector('[data-action="ws-zoom-reset"]');
    if (!button) return;
    const s = settings();
    const ws = document.querySelector('.ws');
    const view = ws ? ws.dataset.view : 'split';
    const zoom = view === 'questions' ? s.questionZoom : s.paperZoom;
    button.textContent = `${Math.round(zoom * 100)} %`;
    button.setAttribute('aria-pressed', String(s.paperZoom !== 1 || s.questionZoom !== 1));
  }

  /**
   * Zwei-Finger-Zoom in einem Bereich: während der Geste wird nur per CSS
   * skaliert (flüssig), beim Loslassen wird die neue Größe gesetzt und die
   * Striche werden scharf neu gezeichnet. Stift-Berührungen zählen nicht.
   */
  function attachPinch(pane, getTarget, getZoom, setZoom, min, max) {
    let pinch = null;
    const fingers = event => Array.from(event.touches).filter(t => t.touchType !== 'stylus');
    const distance = (a, b) => Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
    pane.addEventListener('touchstart', event => {
      const f = fingers(event);
      if (f.length !== 2) return;
      event.preventDefault();
      for (const surface of activeSurfaces()) surface.cancel();
      const target = getTarget();
      const rect = target.getBoundingClientRect();
      const paneRect = pane.getBoundingClientRect();
      const cx = (f[0].clientX + f[1].clientX) / 2;
      const cy = (f[0].clientY + f[1].clientY) / 2;
      target.style.transformOrigin = `${cx - rect.left}px ${cy - rect.top}px`;
      pinch = { target, d0: Math.max(1, distance(f[0], f[1])), z0: getZoom(), ratio: 1, px: cx - paneRect.left, py: cy - paneRect.top, sx: pane.scrollLeft, sy: pane.scrollTop };
    }, { passive: false });
    pane.addEventListener('touchmove', event => {
      if (!pinch) return;
      const f = fingers(event);
      if (f.length < 2) return;
      event.preventDefault();
      const zoom = Math.min(max, Math.max(min, pinch.z0 * distance(f[0], f[1]) / pinch.d0));
      pinch.ratio = zoom / pinch.z0;
      pinch.target.style.transform = `scale(${pinch.ratio})`;
    }, { passive: false });
    const end = event => {
      if (!pinch || fingers(event).length >= 2) return;
      const done = pinch;
      pinch = null;
      done.target.style.transform = '';
      if (Math.abs(done.ratio - 1) < 0.02) return;
      setZoom(done.z0 * done.ratio);
      pane.scrollLeft = (done.sx + done.px) * done.ratio - done.px;
      pane.scrollTop = (done.sy + done.py) * done.ratio - done.py;
    };
    pane.addEventListener('touchend', end);
    pane.addEventListener('touchcancel', end);
    // Safari: kein Zoom der ganzen Seite, solange im Arbeitsbereich gezoomt wird.
    pane.addEventListener('gesturestart', event => event.preventDefault());
  }

  function setPaperZoom(zoom) {
    settings().paperZoom = clampNumber(zoom, 1, 3, 1);
    saveMeta();
    applyPaperZoom();
  }

  function setQuestionZoom(zoom) {
    settings().questionZoom = clampNumber(zoom, 0.6, 2.5, 1);
    saveMeta();
    layoutQuestions();
    syncZoomButton();
  }

  // ------------------------------------------------------------------ Textfelder (Tastatur)

  function textboxes(index) {
    const key = `page-${index}`;
    if (!session.doc.textboxes) session.doc.textboxes = {};
    if (!session.doc.textboxes[key]) session.doc.textboxes[key] = [];
    return session.doc.textboxes[key];
  }

  function textboxHtml(box) {
    return `<div class="ws-textbox" data-id="${esc(box.id)}" style="--x:${box.x};--y:${box.y};--w:${box.w}">
      <div class="ws-textbox-tools">
        <button type="button" class="ws-textbox-btn" data-tb-move aria-label="Textfeld verschieben" title="Verschieben">${icon('move')}</button>
        <button type="button" class="ws-textbox-btn" data-tb-delete aria-label="Textfeld löschen" title="Löschen">${icon('close')}</button>
      </div>
      <textarea rows="1" spellcheck="true" aria-label="Textfeld auf Seite">${esc(box.text)}</textarea>
    </div>`;
  }

  function autosize(area) {
    area.style.height = 'auto';
    area.style.height = `${area.scrollHeight}px`;
  }

  function renderTextboxes(index) {
    const layer = document.querySelector(`.ws-textlayer[data-page="${index}"]`);
    if (!layer || !session) return;
    layer.innerHTML = textboxes(index).map(textboxHtml).join('');
    layer.querySelectorAll('textarea').forEach(autosize);
  }

  function renderAllTextboxes() {
    for (let i = 0; i < session.doc.pageCount; i++) renderTextboxes(i);
  }

  function addTextbox(index, point) {
    const box = W.createTextbox(`tb-${now().toString(36)}${Math.floor(Math.random() * 1000)}`, point[0], point[1]);
    if (!box) return;
    textboxes(index).push(box);
    renderTextboxes(index);
    const area = document.querySelector(`.ws-textlayer[data-page="${index}"] [data-id="${box.id}"] textarea`);
    if (area) area.focus();
    scheduleSave();
  }

  function removeTextbox(index, id) {
    const list = textboxes(index);
    const at = list.findIndex(box => box.id === id);
    if (at >= 0) list.splice(at, 1);
    renderTextboxes(index);
    scheduleSave();
  }

  /** Eingaben, Löschen und Verschieben der Textfelder einer Seite (Ereignis-Delegation). */
  function wireTextLayer(layer) {
    const index = Number(layer.dataset.page);
    const boxOf = el => {
      const node = el.closest('.ws-textbox');
      return node ? { node, box: textboxes(index).find(b => b.id === node.dataset.id) } : null;
    };
    layer.addEventListener('input', event => {
      const hit = boxOf(event.target);
      if (!hit || !hit.box) return;
      hit.box.text = event.target.value;
      autosize(event.target);
      scheduleSave();
    });
    layer.addEventListener('focusout', event => {
      const hit = boxOf(event.target);
      if (hit && hit.box && event.target.tagName === 'TEXTAREA' && !hit.box.text.trim()) {
        // Leere Textfelder verschwinden wieder, sobald man woanders hintippt.
        setTimeout(() => {
          if (session && document.activeElement !== event.target) removeTextbox(index, hit.box.id);
        }, 150);
      }
    });
    layer.addEventListener('click', event => {
      const del = event.target.closest('[data-tb-delete]');
      const hit = del && boxOf(del);
      if (hit && hit.box) removeTextbox(index, hit.box.id);
    });
    layer.addEventListener('pointerdown', event => {
      const handle = event.target.closest('[data-tb-move]');
      const hit = handle && boxOf(handle);
      if (!hit || !hit.box) return;
      event.preventDefault();
      const page = layer.parentElement;
      const mm = page.clientWidth / PAGE_WIDTH;
      const start = { x: event.clientX, y: event.clientY, bx: hit.box.x, by: hit.box.y };
      try {
        handle.setPointerCapture(event.pointerId);
      } catch (_err) {
        // ohne Capture
      }
      const move = ev => {
        hit.node.style.setProperty('--x', String(Math.max(0, Math.min(200 - 20, start.bx + (ev.clientX - start.x) / mm))));
        hit.node.style.setProperty('--y', String(Math.max(0, Math.min(290, start.by + (ev.clientY - start.y) / mm))));
      };
      const up = ev => {
        handle.removeEventListener('pointermove', move);
        handle.removeEventListener('pointerup', up);
        handle.removeEventListener('pointercancel', up);
        const moved = W.normalizeTextbox(Object.assign({}, hit.box, {
          x: Math.round((start.bx + (ev.clientX - start.x) / mm) / 5) * 5,
          y: Math.round((start.by + (ev.clientY - start.y) / mm) / 5) * 5,
          w: hit.box.w
        }));
        if (moved) Object.assign(hit.box, moved);
        renderTextboxes(index);
        scheduleSave();
      };
      handle.addEventListener('pointermove', move);
      handle.addEventListener('pointerup', up);
      handle.addEventListener('pointercancel', up);
    });
  }

  /** Text zeilenweise umbrechen (für die Bilder an die KI). */
  function wrapText(c, text, maxWidth) {
    const lines = [];
    for (const paragraph of String(text).split('\n')) {
      let line = '';
      for (const word of paragraph.split(/\s+/).filter(Boolean)) {
        const candidate = line ? `${line} ${word}` : word;
        if (c.measureText(candidate).width <= maxWidth || !line) {
          line = candidate;
        } else {
          lines.push(line);
          line = word;
        }
      }
      lines.push(line);
    }
    return lines;
  }

  function drawTextboxes(c, boxes, scale) {
    c.save();
    c.fillStyle = '#111827';
    c.font = `${TEXT_MM * scale}px -apple-system, "Helvetica Neue", Arial, sans-serif`;
    for (const box of boxes) {
      const lines = wrapText(c, box.text, (box.w - 2) * scale);
      lines.forEach((line, i) => c.fillText(line, (box.x + 1) * scale, (box.y + i * LINE_MM + 3.9) * scale));
    }
    c.restore();
  }

  // ------------------------------------------------------------------ Abgabe, Bewertung, Archiv

  const gradingJobs = new Map();
  const archiveCache = new Map();
  const sheetCache = new Map();
  let currentRoute = { name: '', param: null };

  function archiveList() {
    if (!Array.isArray(meta.archive)) meta.archive = [];
    return meta.archive;
  }

  function archiveSummary(id) {
    return archiveList().find(a => a.id === id) || null;
  }

  async function loadArchive(id) {
    if (archiveCache.has(id)) return archiveCache.get(id);
    const record = await getRecord('archive', id);
    if (record) archiveCache.set(id, record);
    return record;
  }

  /** Antwortblätter als JPEG (A4, ca. 150 dpi) mit Karos, Handschrift und Textfeldern; leere Seiten entfallen. */
  async function renderAnswerImages(doc, maxImages) {
    const pages = [];
    for (let i = 0; i < doc.pageCount; i++) {
      if (W.pageHasContent(doc, i)) pages.push({ strokes: doc.layers[`page-${i}`] || [], boxes: (doc.textboxes && doc.textboxes[`page-${i}`]) || [] });
    }
    // Mehr Blätter als erlaubt: je zwei nebeneinander auf ein Bild.
    const perImage = pages.length > maxImages ? 2 : 1;
    const width = 1240;
    const height = Math.round(width * 297 / 210);
    const scale = width / PAGE_WIDTH;
    const blobs = [];
    for (let i = 0; i < pages.length; i += perImage) {
      const group = pages.slice(i, i + perImage);
      const canvas = document.createElement('canvas');
      canvas.width = width * group.length;
      canvas.height = height;
      const c = canvas.getContext('2d');
      c.fillStyle = '#ffffff';
      c.fillRect(0, 0, canvas.width, canvas.height);
      group.forEach((page, g) => {
        c.save();
        c.translate(g * width, 0);
        c.strokeStyle = '#dde4ee';
        c.lineWidth = 1;
        c.beginPath();
        for (let x = 0; x <= PAGE_WIDTH; x += 5) { c.moveTo(x * scale, 0); c.lineTo(x * scale, height); }
        for (let y = 0; y <= 297; y += 5) { c.moveTo(0, y * scale); c.lineTo(width, y * scale); }
        c.stroke();
        if (g > 0) {
          c.strokeStyle = '#64748b';
          c.lineWidth = 4;
          c.beginPath(); c.moveTo(0, 0); c.lineTo(0, height); c.stroke();
        }
        for (const stroke of page.strokes) Ink.drawStroke(c, stroke, scale);
        drawTextboxes(c, page.boxes, scale);
        c.restore();
      });
      blobs.push(await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.85)));
    }
    return blobs.filter(Boolean).slice(0, maxImages);
  }

  function rerenderIfShowing(id) {
    if (currentRoute.name === 'archiv' && (!currentRoute.param || currentRoute.param === id)) ctx.rerender();
  }

  async function startGrading(archiveId) {
    const summary = archiveSummary(archiveId);
    if (!summary || gradingJobs.has(archiveId)) return;
    const exam = examById.get(summary.examId);
    if (!ctx.ai.available()) {
      summary.status = 'no-ai';
      saveMeta();
      rerenderIfShowing(archiveId);
      return;
    }
    summary.status = 'grading';
    summary.error = null;
    saveMeta();
    const job = (async () => {
      if (!exam) throw new Error('Diese Prüfung ist in der App nicht mehr enthalten.');
      const record = await loadArchive(archiveId);
      if (!record) throw new Error('Die Antwortblätter sind auf diesem Gerät nicht mehr gespeichert.');
      const blobs = await renderAnswerImages(W.normalizeDoc(record.doc, summary.examId), await ctx.ai.maxImages());
      if (!blobs.length) throw new Error('Auf den Blättern steht nichts – es gibt nichts zu bewerten.');
      const result = await ctx.ai.grade(exam, blobs);
      record.result = result;
      record.gradedAt = now();
      await putRecord('archive', record);
      return result;
    })();
    gradingJobs.set(archiveId, job);
    rerenderIfShowing(archiveId);
    try {
      const result = await job;
      Object.assign(summary, { status: 'done', average: result.average, averageLabel: result.averageLabel, passed: result.passed });
    } catch (err) {
      summary.status = 'error';
      summary.error = ctx.ai.errorText(err);
    } finally {
      gradingJobs.delete(archiveId);
      saveMeta();
      rerenderIfShowing(archiveId);
    }
  }

  function snapshotDoc(doc) {
    const pages = {};
    const boxes = {};
    for (let i = 0; i < doc.pageCount; i++) {
      pages[`page-${i}`] = doc.layers[`page-${i}`] || [];
      if (doc.textboxes && doc.textboxes[`page-${i}`]) boxes[`page-${i}`] = doc.textboxes[`page-${i}`].filter(b => b.text.trim());
    }
    // Markierungen auf den Fragen gehören zur Abgabe dazu (Ansicht im Archiv).
    for (const key of Object.keys(doc.layers)) {
      if (key.startsWith('q-') && doc.layers[key].length) pages[key] = doc.layers[key];
    }
    return JSON.parse(JSON.stringify({ pageCount: doc.pageCount, layers: pages, textboxes: boxes }));
  }

  async function addToArchive(examId, doc, info) {
    const at = info.at || now();
    const id = `arch-${at.toString(36)}-${Math.floor(Math.random() * 1296).toString(36)}`;
    const exam = examById.get(examId);
    const record = { id, examId, at, elapsedMs: info.elapsedMs || 0, doc: snapshotDoc(doc), result: info.result || null };
    let pages = 0;
    for (let i = 0; i < doc.pageCount; i++) if (W.pageHasContent(doc, i)) pages += 1;
    archiveCache.set(id, record);
    await putRecord('archive', record);
    const list = archiveList();
    list.push({
      id,
      examId,
      name: exam ? examTitle(exam) : examId,
      at,
      elapsedMs: record.elapsedMs,
      pages,
      status: info.result ? 'done' : 'pending',
      error: null,
      average: info.result ? info.result.average : null,
      averageLabel: info.result ? info.result.averageLabel : '',
      passed: info.result ? info.result.passed : null
    });
    // Ältere Einträge über der Höchstzahl samt Blättern entfernen.
    while (list.length > MAX_ARCHIVE) {
      const old = list.shift();
      archiveCache.delete(old.id);
      deleteRecord('archive', old.id);
    }
    saveMeta();
    return id;
  }

  async function resetExam(examId) {
    await storeDoc({ examId, pageCount: 1, layers: { 'page-0': [] }, textboxes: {}, savedAt: now() });
    meta.exams[examId] = {};
    saveMeta();
  }

  async function submitExam() {
    if (!session) return;
    const id = session.examId;
    const doc = session.doc;
    const hasContent = Array.from({ length: doc.pageCount }, (_, i) => W.pageHasContent(doc, i)).some(Boolean);
    if (!hasContent) {
      ctx.toast('Auf den karierten Blättern steht noch nichts. Schreiben Sie Ihre Antworten zuerst auf das Papier.');
      return;
    }
    const entry = examMeta(id);
    const t = now();
    const elapsedMs = W.elapsedMs(entry.timer, t);
    // Abgabe ins Archiv, danach steht die Prüfung wieder frisch in der Auswahl.
    clearTimeout(session.saveTimer);
    session.loaded = false;
    const archiveId = await addToArchive(id, doc, { at: t, elapsedMs });
    await resetExam(id);
    unmount();
    startGrading(archiveId);
    ctx.go(`#/archiv/${archiveId}`);
  }

  /** Frühere Fassung: Ergebnis stand an der Prüfung – jetzt ins Archiv übernehmen. */
  async function migrateExamEntry(examId, entry) {
    const known = new Set();
    if (entry.submission || entry.result) {
      const sub = entry.submission || {};
      const doc = W.normalizeDoc(await loadDoc(examId), examId);
      const at = sub.at || (entry.result && entry.result.at) || now();
      known.add(at);
      await addToArchive(examId, doc, { at, elapsedMs: sub.elapsedMs || 0, result: entry.result || null });
      if (!entry.result) Object.assign(archiveList()[archiveList().length - 1], { status: 'error', error: 'Die Bewertung wurde nicht abgeschlossen.' });
      await resetExam(examId);
    }
    const exam = examById.get(examId);
    for (const old of Array.isArray(entry.history) ? entry.history : []) {
      if (!old || known.has(old.at)) continue;
      archiveList().push({ id: `arch-${Number(old.at).toString(36)}-alt`, examId, name: exam ? examTitle(exam) : examId, at: old.at, elapsedMs: 0, pages: 0, status: 'done', error: null, average: old.average, averageLabel: '', passed: old.passed, detailsMissing: true });
    }
    delete entry.history;
    delete entry.submission;
    delete entry.result;
  }

  async function migrateLegacyResults() {
    const legacy = Object.entries(meta.exams).filter(([, entry]) => entry && typeof entry === 'object' && (entry.history || entry.submission || entry.result));
    if (!legacy.length) return;
    for (const [examId, entry] of legacy) await migrateExamEntry(examId, entry);
    archiveList().sort((a, b) => a.at - b.at);
    saveMeta();
    if ((currentRoute.name === 'schriftlich' && !currentRoute.param) || currentRoute.name === 'archiv') ctx.rerender();
  }

  function durationLabel(ms) {
    const minutes = Math.round((ms || 0) / 60000);
    return `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, '0')} h`;
  }

  function dateLabel(ts) {
    return new Date(ts).toLocaleString('de-DE', { dateStyle: 'medium', timeStyle: 'short' });
  }

  function renderGradingState(summary) {
    if (summary.status === 'grading' || summary.status === 'pending') {
      return `<div class="card section ws-grading"><span class="spinner" aria-hidden="true"></span>
        <div><h2>Claude bewertet Ihre Antwortblätter …</h2><p class="muted">Die Handschrift wird gelesen und jedes Fach benotet. Das dauert meist 1 bis 3 Minuten. Sie können die Seite offen lassen.</p></div></div>`;
    }
    if (summary.status === 'no-ai') {
      return `<div class="panel warn"><h3>KI-Bewertung nicht verfügbar</h3>
        <p>Die Bewertung braucht Claude. Auf der Website tragen Sie dafür unter <a href="#/einstellungen">Einstellungen</a> einen eigenen API-Schlüssel ein; in der App auf claude.ai fragt Claude beim ersten Mal, ob die Seite die KI (mit Bildern) nutzen darf. Die Blätter bleiben im Archiv gespeichert.</p>
        <div class="btn-row"><button class="btn primary" data-action="ws-regrade" data-id="${esc(summary.id)}">Jetzt bewerten</button></div></div>`;
    }
    return `<div class="panel bad"><h3>Bewertung fehlgeschlagen</h3><p>${esc(summary.error || 'Unbekannter Fehler.')}</p>
      <div class="btn-row"><button class="btn primary" data-action="ws-regrade" data-id="${esc(summary.id)}">Erneut versuchen</button></div></div>`;
  }

  function renderGrades(result) {
    return `
      <div class="card section ws-result-head">
        <div class="ws-grade-big ${result.passed ? 'good' : 'bad'}"><span>Ø ${esc(formatGrade(result.average))}</span><small>${esc(result.averageLabel)}</small></div>
        <div>
          <p><span class="chip ${result.passed ? 'sicher' : 'schwach'}">${result.passed ? 'Bestanden (Orientierung)' : 'Noch nicht bestanden (Orientierung)'}</span></p>
          ${result.summary ? `<p>${esc(result.summary)}</p>` : ''}
          ${result.readability ? `<p class="small muted">Lesbarkeit: ${esc(result.readability)}</p>` : ''}
        </div>
      </div>
      <div class="card section">
        <h2>Noten je Fach</h2>
        <ul class="list ws-grade-list">${result.parts.map(part => `<li>
          <div><strong>${esc(part.name)}</strong><div class="small muted">${esc(part.percent)} % der Leistung</div></div>
          <span class="ws-grade ${part.grade <= 4 ? 'good' : 'bad'}">${esc(part.grade)} <small>${esc(part.label)}</small></span></li>`).join('')}</ul>
      </div>
      ${result.parts.map(part => `<details class="disclosure ws-part-detail"><summary>${esc(part.name)} – Note ${esc(part.grade)} (${esc(part.label)})</summary>
        ${part.summary ? `<p>${esc(part.summary)}</p>` : ''}
        ${part.strengths.length ? `<div class="panel good"><h3>Das war gut</h3><ul>${part.strengths.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>` : ''}
        ${part.gaps.length ? `<div class="panel warn"><h3>Das fehlte oder war falsch</h3><ul>${part.gaps.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>` : ''}
        ${part.tasks.length ? `<ul class="list">${part.tasks.map(task => `<li><div><strong>${esc(task.label || 'Aufgabe')}</strong><div class="small">${esc(task.comment)}</div></div>
          <span class="chip ${!task.found ? 'offen' : task.score >= 0.75 ? 'sicher' : task.score >= 0.4 ? 'mittel' : 'schwach'}">${task.found ? `${Math.round(task.score * 100)} %` : 'keine Antwort'}</span></li>`).join('')}</ul>` : ''}
      </details>`).join('')}
      <p class="small muted">Bewertung durch Claude zur Orientierung, Noten nach § 19 FahrlPrüfV. Maßgeblich ist der Prüfungsausschuss.</p>`;
  }

  function archiveChip(summary) {
    if (summary.status === 'done' && summary.average !== null && summary.average !== undefined) {
      return `<span class="chip ${summary.passed ? 'sicher' : 'schwach'}">Ø ${esc(formatGrade(summary.average))}</span>`;
    }
    if (summary.status === 'grading' || summary.status === 'pending') return '<span class="chip mittel">Wird bewertet</span>';
    return '<span class="chip offen">Nicht bewertet</span>';
  }

  function archiveHead(title, text) {
    return `<header class="page-head">
        <div class="page-head-nav"><a class="back-arrow" href="#/schriftlich" aria-label="Zurück zur Prüfungsauswahl" title="Zurück zur Prüfungsauswahl"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></a><a href="#/schriftlich" class="small">Schriftliche Prüfung</a>${title !== 'Archiv' ? ' · <a href="#/archiv" class="small">Archiv</a>' : ''}</div>
        <h1>${esc(title)}</h1>
        ${text ? `<p>${text}</p>` : ''}
      </header>`;
  }

  function renderArchiveList() {
    const list = archiveList().slice().sort((a, b) => b.at - a.at);
    return `${archiveHead('Archiv', 'Ihre abgegebenen schriftlichen Prüfungen mit Bewertung – die neueste zuerst.')}
      ${list.length ? `<p class="small muted">Tipp: Eintrag nach links wischen, um ihn zu löschen.</p>
        <div class="card swipe-list"><ul class="list">${list.map(item => `<li class="swipe-row" data-id="${esc(item.id)}">
        <div class="swipe-content">
          <div><a href="#/archiv/${esc(item.id)}">${esc(item.name)}</a>
            <div class="small muted">Abgegeben am ${esc(dateLabel(item.at))}${item.elapsedMs ? ` · ${esc(durationLabel(item.elapsedMs))}` : ''}${item.pages ? ` · ${esc(item.pages)} ${item.pages === 1 ? 'Blatt' : 'Blätter'}` : ''}</div></div>
          ${archiveChip(item)}
        </div>
        <button type="button" class="swipe-delete" data-action="ws-archive-remove" data-id="${esc(item.id)}" aria-label="${esc(item.name)} aus dem Archiv löschen" title="Löschen" tabindex="-1">${icon('trash')}</button>
      </li>`).join('')}</ul></div>`
        : '<div class="card empty">Noch keine abgegebene Prüfung. Mit „Beenden“ im Prüfungsbildschirm geben Sie eine Prüfung ab.</div>'}`;
  }

  async function prepareSheets(id) {
    const record = await loadArchive(id);
    if (!record) return;
    const blobs = await renderAnswerImages(W.normalizeDoc(record.doc, record.examId), 99);
    sheetCache.set(id, blobs.map(blob => URL.createObjectURL(blob)));
    rerenderIfShowing(id);
  }

  function archiveBody(summary, record) {
    if (summary.status !== 'done') return renderGradingState(summary);
    if (record && record.result) return renderGrades(record.result);
    if (summary.detailsMissing) {
      return `<div class="card section"><p>Note: <strong>Ø ${esc(formatGrade(summary.average))}</strong>. Die Einzelheiten dieser älteren Bewertung sind nicht gespeichert.</p></div>`;
    }
    return '<div class="card section"><p class="muted">Bewertung wird geladen …</p></div>';
  }

  function renderArchiveEntry(id) {
    const summary = archiveSummary(id);
    if (!summary) return `${archiveHead('Archiv', '')}<div class="card empty">Dieser Eintrag ist nicht im Archiv. <a href="#/archiv">Zum Archiv</a></div>`;
    // Nach dem Neuladen läuft keine Bewertung mehr – dann neu anbieten.
    if ((summary.status === 'grading' || summary.status === 'pending') && !gradingJobs.has(id)) {
      summary.status = 'error';
      summary.error = 'Die Bewertung wurde unterbrochen (Seite neu geladen).';
      saveMeta();
    }
    const record = archiveCache.get(id);
    if (!record && !summary.detailsMissing) {
      loadArchive(id).then(found => {
        if (found) rerenderIfShowing(id);
      });
    }
    if (record && !sheetCache.has(id)) {
      sheetCache.set(id, null);
      prepareSheets(id);
    }
    const sheets = sheetCache.get(id);
    const body = archiveBody(summary, record);
    const canView = !summary.detailsMissing && examById.has(summary.examId);
    return `${archiveHead(summary.name, `Abgegeben am ${esc(dateLabel(summary.at))}${summary.elapsedMs ? ` · Bearbeitungszeit ${esc(durationLabel(summary.elapsedMs))}` : ''}`)}
      ${canView ? `<div class="btn-row ws-view-entry"><a class="btn primary" href="#/archivansicht/${esc(id)}">${icon('eye')} Geschriebene Prüfung ansehen</a></div>` : ''}
      ${body}
      ${sheets && sheets.length ? `<div class="section-title"><h2>Ihre Antwortblätter</h2></div>
        <div class="ws-sheets">${sheets.map((url, i) => `<figure><a class="figure-zoom" href="#/archivansicht/${esc(id)}" aria-label="Blatt ${i + 1} in der Prüfungsansicht öffnen"><img src="${esc(url)}" alt="Antwortblatt ${i + 1}" loading="lazy"></a><figcaption>Blatt ${i + 1}</figcaption></figure>`).join('')}</div>` : ''}
      <div class="btn-row">
        ${summary.status === 'done' && !summary.detailsMissing ? `<button class="btn" data-action="ws-regrade" data-id="${esc(id)}">Erneut bewerten</button>` : ''}
        ${examById.has(summary.examId) ? `<a class="btn primary" href="#/schriftlich/${esc(summary.examId)}">Prüfung neu schreiben</a>` : ''}
        <button class="btn" data-action="ws-archive-delete" data-id="${esc(id)}" data-confirm="Diesen Eintrag samt Blättern aus dem Archiv löschen? Nochmal tippen">Aus dem Archiv löschen</button>
        <a class="btn" href="#/archiv">Zum Archiv</a>
      </div>`;
  }

  function renderArchive(param) {
    return param ? renderArchiveEntry(param) : renderArchiveList();
  }

  async function deleteArchiveEntry(id, stay) {
    meta.archive = archiveList().filter(a => a.id !== id);
    saveMeta();
    archiveCache.delete(id);
    const urls = sheetCache.get(id);
    if (urls) urls.forEach(url => URL.revokeObjectURL(url));
    sheetCache.delete(id);
    await deleteRecord('archive', id);
    if (stay) ctx.rerender();
    else ctx.go('#/archiv');
  }

  // ------------------------------------------------------------------ Archiv: nach links wischen zum Löschen

  const SWIPE_OPEN = 84;

  function closeSwipes(except) {
    document.querySelectorAll('.swipe-row.open').forEach(row => {
      if (row === except) return;
      row.classList.remove('open');
      row.querySelector('.swipe-content').style.transform = '';
      row.querySelector('.swipe-delete').tabIndex = -1;
    });
  }

  function wireSwipeRows() {
    document.querySelectorAll('.swipe-row').forEach(row => {
      const content = row.querySelector('.swipe-content');
      let drag = null;
      let suppressClick = false;
      content.addEventListener('pointerdown', event => {
        if (event.button !== undefined && event.button > 0) return;
        drag = { x: event.clientX, y: event.clientY, base: row.classList.contains('open') ? -SWIPE_OPEN : 0, active: false, id: event.pointerId };
        suppressClick = false;
      });
      content.addEventListener('pointermove', event => {
        if (!drag || event.pointerId !== drag.id) return;
        const dx = event.clientX - drag.x;
        const dy = event.clientY - drag.y;
        if (!drag.active) {
          if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(dy)) return;
          drag.active = true;
          closeSwipes(row);
          row.classList.add('dragging');
          try {
            content.setPointerCapture(event.pointerId);
          } catch (_err) {
            // ohne Capture
          }
        }
        const offset = Math.max(-SWIPE_OPEN * 1.4, Math.min(0, drag.base + dx));
        content.style.transform = `translateX(${offset}px)`;
      });
      const end = event => {
        if (!drag || event.pointerId !== drag.id) return;
        const wasActive = drag.active;
        const dx = event.clientX - drag.x;
        const open = wasActive ? drag.base + dx < -SWIPE_OPEN / 2 : row.classList.contains('open');
        drag = null;
        row.classList.remove('dragging');
        if (!wasActive) return;
        suppressClick = true;
        row.classList.toggle('open', open);
        content.style.transform = open ? `translateX(${-SWIPE_OPEN}px)` : '';
        row.querySelector('.swipe-delete').tabIndex = open ? 0 : -1;
      };
      content.addEventListener('pointerup', end);
      content.addEventListener('pointercancel', end);
      // Mit der Maus würde der Browser sonst den Link "mitnehmen" statt zu wischen.
      content.addEventListener('dragstart', event => event.preventDefault());
      // Nach dem Wischen keinen Link öffnen; bei offener Zeile schließt ein Tippen sie wieder.
      content.addEventListener('click', event => {
        if (!suppressClick && !row.classList.contains('open')) return;
        event.preventDefault();
        event.stopPropagation();
        // Der Klick direkt nach dem Wischen zählt nicht; sonst schließt ein Tippen die offene Zeile.
        if (suppressClick) suppressClick = false;
        else closeSwipes();
      }, true);
    });
  }

  // ------------------------------------------------------------------ Archiv: geschriebene Prüfung ansehen

  let viewer = null;

  function staticTextboxHtml(box) {
    return `<div class="ws-textbox static" style="--x:${box.x};--y:${box.y};--w:${box.w}"><div class="ws-textbox-text">${esc(box.text)}</div></div>`;
  }

  function renderViewer(id) {
    const summary = archiveSummary(id);
    const exam = summary && examById.get(summary.examId);
    if (!summary || !exam || summary.detailsMissing) {
      return `${archiveHead('Archiv', '')}<div class="card empty">Diese Abgabe kann nicht angezeigt werden. <a href="#/archiv">Zum Archiv</a></div>`;
    }
    const record = archiveCache.get(id);
    if (!record) {
      loadArchive(id).then(found => {
        if (found && currentRoute.name === 'archivansicht' && currentRoute.param === id) ctx.rerender();
      });
      return `${archiveHead(summary.name, '')}<div class="card section"><p class="muted">Die Abgabe wird geladen …</p></div>`;
    }
    const doc = W.normalizeDoc(record.doc, summary.examId);
    const s = settings();
    const grade = summary.status === 'done' && summary.average !== null && summary.average !== undefined ? ` · Ø ${formatGrade(summary.average)}` : '';
    return `<div class="ws ws-viewer" data-view="split" style="--ws-split:${s.split}">
      <header class="ws-bar">
        <a class="ws-btn ws-back" href="#/archiv/${esc(id)}" aria-label="Zurück zum Ergebnis" title="Zurück zum Ergebnis">${icon('back')}</a>
        <div class="ws-title"><strong>${esc(summary.name)}</strong><span class="small muted">Abgabe vom ${esc(dateLabel(summary.at))}${esc(grade)} · nur ansehen</span></div>
        <div class="ws-group ws-views" role="group" aria-label="Ansicht">
          <button type="button" class="ws-btn" data-action="ws-view" data-view="questions" aria-pressed="false">Fragen</button>
          <button type="button" class="ws-btn" data-action="ws-view" data-view="split" aria-pressed="true">Geteilt</button>
          <button type="button" class="ws-btn" data-action="ws-view" data-view="paper" aria-pressed="false">Blatt</button>
          <button type="button" class="ws-btn ws-zoom" data-action="ws-zoom-reset" title="Zoom zurücksetzen (mit zwei Fingern zoomen)">100 %</button>
        </div>
      </header>
      <div class="ws-body">
        <section class="ws-pane ws-questions" aria-label="Aufgaben">
          <nav class="ws-jump" aria-label="Prüfungsteile">${exam.parts.map((part, i) => `<button type="button" class="chip" data-action="ws-jump" data-part="${i}">${esc(part.name)}</button>`).join('')}</nav>
          <div class="ws-qsheets">${exam.parts.map((part, i) => partSheet(exam, part, i)).join('')}</div>
        </section>
        <div class="ws-divider" role="separator" aria-orientation="vertical" aria-label="Trennlinie verschieben" tabindex="0"><span></span></div>
        <section class="ws-pane ws-paper" aria-label="Ihre Antwortblätter">
          <div class="ws-pages">${Array.from({ length: doc.pageCount }, (_, i) => i).filter(i => W.pageHasContent(doc, i)).map((i, n) => `<div class="ws-page-wrap">
            <div class="ws-page" data-ink-layer="page-${i}" aria-label="Antwortblatt ${n + 1}"><div class="ws-textlayer">${((doc.textboxes || {})[`page-${i}`] || []).map(staticTextboxHtml).join('')}</div></div>
            <div class="ws-page-foot"><span>Blatt ${n + 1}</span></div></div>`).join('')}</div>
        </section>
      </div>
    </div>`;
  }

  function mountViewer(id) {
    const record = archiveCache.get(id);
    const ws = document.querySelector('.ws-viewer');
    unmountViewer();
    if (!record || !ws) return;
    const doc = W.normalizeDoc(record.doc, record.examId);
    document.body.classList.add('ws-active');
    viewer = { id, surfaces: [], observer: null, view: window.innerWidth < 760 ? 'paper' : 'split' };
    ws.dataset.view = viewer.view;
    applyPaperZoom();
    ws.querySelectorAll('[data-ink-layer]').forEach(el => {
      const key = el.dataset.inkLayer;
      const isQuestion = key.startsWith('q-');
      viewer.surfaces.push(Ink.createSurface({
        host: el,
        readOnly: true,
        logicalWidth: isQuestion ? SHEET_WIDTH : PAGE_WIDTH,
        getStrokes: () => doc.layers[key] || [],
        getTool: () => ({ tool: 'none' }),
        fingerDraws: () => false,
        onStroke: () => {},
        onErase: () => {},
        onActivity: () => {}
      }));
    });
    layoutQuestions();
    ws.querySelectorAll('.ws-figure img').forEach(img => img.addEventListener('load', layoutQuestions, { once: true }));
    ws.querySelector('.ws-divider').addEventListener('pointerdown', startDivider);
    attachPinch(ws.querySelector('.ws-paper'), () => ws.querySelector('.ws-pages'), () => settings().paperZoom, setPaperZoom, 1, 3);
    attachPinch(ws.querySelector('.ws-questions'), () => ws.querySelector('.ws-qsheets'), () => settings().questionZoom, setQuestionZoom, 0.6, 2.5);
    if (typeof ResizeObserver === 'function') {
      viewer.observer = new ResizeObserver(() => layoutQuestions());
      viewer.observer.observe(ws.querySelector('.ws-questions'));
    }
    setView(viewer.view);
  }

  function unmountViewer() {
    if (!viewer) return;
    for (const surface of viewer.surfaces) surface.destroy();
    if (viewer.observer) viewer.observer.disconnect();
    viewer = null;
  }

  function scheduleSave() {
    if (!session) return;
    const entry = examMeta(session.examId);
    entry.updatedAt = now();
    entry.pageCount = session.doc.pageCount;
    saveMeta();
    clearTimeout(session.saveTimer);
    session.saveTimer = setTimeout(flushSave, 500);
  }

  function flushSave() {
    if (!session || !session.loaded) return;
    clearTimeout(session.saveTimer);
    session.saveTimer = null;
    storeDoc({ examId: session.examId, pageCount: session.doc.pageCount, layers: session.doc.layers, textboxes: session.doc.textboxes || {}, savedAt: now() });
  }

  function syncToolbar() {
    const s = settings();
    const bar = document.querySelector('.ws-toolbar');
    if (!bar) return;
    bar.querySelectorAll('[data-action="ws-tool"]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.tool === s.tool)));
    bar.querySelectorAll('[data-action="ws-pen-color"]').forEach(b => b.setAttribute('aria-pressed', String(s.tool === 'pen' && b.dataset.color === s.penColor)));
    bar.querySelectorAll('[data-action="ws-pen-width"]').forEach(b => b.setAttribute('aria-pressed', String(s.tool === 'pen' && b.dataset.width === s.penWidth)));
    bar.querySelectorAll('[data-action="ws-marker-color"]').forEach(b => b.setAttribute('aria-pressed', String(s.tool === 'marker' && b.dataset.color === s.markerColor)));
    bar.querySelector('[data-action="ws-finger"]').setAttribute('aria-pressed', String(s.fingerDraws));
    bar.querySelector('[data-action="ws-undo"]').disabled = !session || session.history.undo.length === 0;
    bar.querySelector('[data-action="ws-redo"]').disabled = !session || session.history.redo.length === 0;
    const ws = document.querySelector('.ws');
    ws.dataset.tool = s.tool;
    bar.querySelectorAll('[data-action="ws-view"]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.view === ws.dataset.view)));
  }

  function tick() {
    if (!session) return;
    const el = document.querySelector('.ws-timer');
    if (!el) return;
    const entry = examMeta(session.examId);
    const timer = entry.timer;
    const t = now();
    const status = W.timerStatus(timer, t);
    el.dataset.status = status;
    el.querySelector('.ws-clock').textContent = W.formatClock(W.remainingMs(timer, t));
    const main = el.querySelector('.ws-timer-main');
    const label = { idle: ['play', 'Start'], running: ['pause', 'Pause'], paused: ['play', 'Weiter'], finished: ['play', 'Vorbei'] }[status];
    const html = `${icon(label[0])}<span>${label[1]}</span>`;
    if (main.dataset.state !== status) {
      main.innerHTML = html;
      main.dataset.state = status;
      main.disabled = status === 'finished';
    }
    const warning = W.timerWarning(timer, t);
    el.dataset.warning = warning ? warning.id : status === 'finished' ? 'over' : '';
    if (warning && !entry.warned.includes(warning.id)) {
      entry.warned.push(warning.id);
      saveMeta();
      ctx.toast(`${warning.label} Bearbeitungszeit.`);
    }
    if (status === 'finished' && !entry.warned.includes('over')) {
      entry.warned.push('over');
      saveMeta();
      ctx.toast('Die Bearbeitungszeit ist abgelaufen. Sie können trotzdem weiterschreiben.');
    }
  }

  function setView(view) {
    const ws = document.querySelector('.ws');
    if (!ws) return;
    ws.dataset.view = view;
    if (session) session.view = view;
    if (viewer) viewer.view = view;
    if (session) syncToolbar();
    ws.querySelectorAll('[data-action="ws-view"]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.view === view)));
    syncZoomButton();
    requestAnimationFrame(() => {
      layoutQuestions();
      for (const surface of activeSurfaces()) surface.resize();
    });
  }

  function activeSurfaces() {
    if (session) return Array.from(session.surfaces.values());
    if (viewer) return viewer.surfaces;
    return [];
  }

  function startDivider(event) {
    const divider = event.currentTarget;
    const body = divider.parentElement;
    const ws = document.querySelector('.ws');
    event.preventDefault();
    try {
      divider.setPointerCapture(event.pointerId);
    } catch (_err) {
      // ohne Capture
    }
    const move = ev => {
      const rect = body.getBoundingClientRect();
      const split = Math.max(0.25, Math.min(0.75, (ev.clientX - rect.left) / rect.width));
      settings().split = split;
      ws.style.setProperty('--ws-split', String(split));
    };
    const up = () => {
      divider.removeEventListener('pointermove', move);
      divider.removeEventListener('pointerup', up);
      divider.removeEventListener('pointercancel', up);
      saveMeta();
    };
    divider.addEventListener('pointermove', move);
    divider.addEventListener('pointerup', up);
    divider.addEventListener('pointercancel', up);
  }

  function onKey(event) {
    const mod = event.metaKey || event.ctrlKey;
    if (!mod || event.key.toLowerCase() !== 'z') return;
    if (event.target && /^(INPUT|TEXTAREA)$/.test(event.target.tagName)) return;
    event.preventDefault();
    if (event.shiftKey) actions['ws-redo']();
    else actions['ws-undo']();
  }

  function onHide() {
    if (document.visibilityState === 'hidden') flushSave();
  }

  function mount(id) {
    const exam = examById.get(id);
    if (!exam) return;
    if (!session || session.examId !== id) {
      if (session) unmount();
      session = {
        examId: id,
        doc: W.normalizeDoc({ pageCount: examMeta(id).pageCount }, id),
        history: W.createHistory(),
        surfaces: new Map(),
        loaded: false,
        view: window.innerWidth < 760 ? 'questions' : 'split',
        saveTimer: null,
        interval: null,
        listeners: null
      };
      loadDoc(id).then(raw => {
        if (!session || session.examId !== id) return;
        const stored = W.normalizeDoc(raw, id);
        // Striche, die während des Ladens schon entstanden sind, bleiben erhalten.
        for (const [key, strokes] of Object.entries(session.doc.layers)) {
          if (strokes.length) stored.layers[key] = (stored.layers[key] || []).concat(strokes);
        }
        stored.pageCount = Math.max(stored.pageCount, session.doc.pageCount);
        for (let i = 0; i < stored.pageCount; i++) stored.layers[`page-${i}`] = stored.layers[`page-${i}`] || [];
        for (const [key, boxes] of Object.entries(session.doc.textboxes || {})) {
          if (boxes.length) stored.textboxes[key] = (stored.textboxes[key] || []).concat(boxes);
        }
        const rebuild = stored.pageCount !== document.querySelectorAll('.ws-page').length;
        session.doc = stored;
        session.loaded = true;
        if (rebuild) {
          document.querySelector('.ws-pages').innerHTML = Array.from({ length: stored.pageCount }, (_, i) => pageHtml(i)).join('');
          mountSurfaces();
          document.querySelectorAll('.ws-textlayer').forEach(wireTextLayer);
        } else {
          redrawAll();
        }
        renderAllTextboxes();
      });
    }
    document.body.classList.add('ws-active');
    const ws = document.querySelector('.ws');
    ws.dataset.view = session.view;
    applyPaperZoom();
    mountSurfaces();
    ws.querySelectorAll('.ws-textlayer').forEach(wireTextLayer);
    if (session.loaded) renderAllTextboxes();
    layoutQuestions();
    attachPinch(ws.querySelector('.ws-paper'), () => ws.querySelector('.ws-pages'), () => settings().paperZoom, setPaperZoom, 1, 3);
    attachPinch(ws.querySelector('.ws-questions'), () => ws.querySelector('.ws-qsheets'), () => settings().questionZoom, setQuestionZoom, 0.6, 2.5);
    ws.querySelectorAll('.ws-figure img').forEach(img => img.addEventListener('load', layoutQuestions, { once: true }));
    ws.querySelector('.ws-divider').addEventListener('pointerdown', startDivider);
    if (!session.listeners) {
      const pane = ws.querySelector('.ws-questions');
      const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(() => layoutQuestions()) : null;
      if (observer) observer.observe(pane);
      document.addEventListener('keydown', onKey);
      document.addEventListener('visibilitychange', onHide);
      window.addEventListener('pagehide', flushSave);
      session.listeners = { observer };
    } else if (session.listeners.observer) {
      session.listeners.observer.disconnect();
      session.listeners.observer.observe(ws.querySelector('.ws-questions'));
    }
    clearInterval(session.interval);
    session.interval = setInterval(tick, 1000);
    tick();
    syncToolbar();
  }

  function unmount() {
    document.body.classList.remove('ws-active');
    if (!session) return;
    flushSave();
    clearInterval(session.interval);
    for (const surface of session.surfaces.values()) surface.destroy();
    if (session.listeners) {
      if (session.listeners.observer) session.listeners.observer.disconnect();
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('visibilitychange', onHide);
      window.removeEventListener('pagehide', flushSave);
    }
    session = null;
  }

  // ------------------------------------------------------------------ Aktionen

  const actions = {
    'ws-tool': el => {
      settings().tool = el.dataset.tool;
      saveMeta();
      syncToolbar();
    },
    'ws-pen-color': el => {
      Object.assign(settings(), { tool: 'pen', penColor: el.dataset.color });
      saveMeta();
      syncToolbar();
    },
    'ws-pen-width': el => {
      Object.assign(settings(), { tool: 'pen', penWidth: el.dataset.width });
      saveMeta();
      syncToolbar();
    },
    'ws-marker-color': el => {
      Object.assign(settings(), { tool: 'marker', markerColor: el.dataset.color });
      saveMeta();
      syncToolbar();
    },
    'ws-finger': () => {
      const s = settings();
      s.fingerDraws = !s.fingerDraws;
      saveMeta();
      for (const surface of session.surfaces.values()) surface.setFingerMode(s.fingerDraws);
      syncToolbar();
      ctx.toast(s.fingerDraws ? 'Der Finger zeichnet jetzt. Zum Scrollen die Leiste am Rand nutzen oder wieder ausschalten.' : 'Der Finger scrollt wieder, nur der Stift schreibt.');
    },
    'ws-undo': () => {
      if (!session) return;
      const step = W.undo(session.history, session.doc.layers);
      if (!step.action) return;
      session.history = step.history;
      session.doc.layers = step.layers;
      const surface = session.surfaces.get(step.action.layer);
      if (surface) surface.redraw();
      scheduleSave();
      syncToolbar();
    },
    'ws-redo': () => {
      if (!session) return;
      const step = W.redo(session.history, session.doc.layers);
      if (!step.action) return;
      session.history = step.history;
      session.doc.layers = step.layers;
      const surface = session.surfaces.get(step.action.layer);
      if (surface) surface.redraw();
      scheduleSave();
      syncToolbar();
    },
    'ws-clear': el => {
      const key = el.dataset.layer;
      const strokes = layerStrokes(key);
      if (session.doc.textboxes && session.doc.textboxes[key] && session.doc.textboxes[key].length) {
        session.doc.textboxes[key] = [];
        renderTextboxes(Number(key.slice(5)));
        scheduleSave();
      }
      if (!strokes.length) return;
      commit({ type: 'clear', layer: key, removed: strokes.map((stroke, index) => ({ index, stroke })) });
      const surface = session.surfaces.get(key);
      if (surface) surface.redraw();
    },
    'ws-clear-questions': () => {
      for (const key of Object.keys(session.doc.layers).filter(k => k.startsWith('q-'))) {
        const strokes = layerStrokes(key);
        if (!strokes.length) continue;
        commit({ type: 'clear', layer: key, removed: strokes.map((stroke, index) => ({ index, stroke })) });
        const surface = session.surfaces.get(key);
        if (surface) surface.redraw();
      }
    },
    'ws-add-page': () => {
      const index = session.doc.pageCount;
      session.doc.pageCount += 1;
      session.doc.layers[`page-${index}`] = [];
      const wrap = document.createElement('div');
      wrap.innerHTML = pageHtml(index);
      const page = wrap.firstElementChild;
      document.querySelector('.ws-pages').appendChild(page);
      mountSurface(page.querySelector('[data-ink-layer]'));
      wireTextLayer(page.querySelector('.ws-textlayer'));
      scheduleSave();
      page.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    'ws-view': el => setView(el.dataset.view),
    'ws-zoom-reset': () => {
      setPaperZoom(1);
      setQuestionZoom(1);
    },
    'ws-submit': () => submitExam(),
    'ws-regrade': el => startGrading(el.dataset.id),
    'ws-archive-delete': el => deleteArchiveEntry(el.dataset.id),
    'ws-archive-remove': el => {
      const row = el.closest('.swipe-row');
      if (row) row.classList.add('removing');
      setTimeout(() => deleteArchiveEntry(el.dataset.id, true), 180);
    },
    'ws-jump': el => {
      const target = document.getElementById(`ws-part-${el.dataset.part}`);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    'ws-timer': () => {
      const entry = examMeta(session.examId);
      const status = W.timerStatus(entry.timer, now());
      entry.timer = status === 'running' ? W.pauseTimer(entry.timer, now()) : W.startTimer(entry.timer, now());
      saveMeta();
      tick();
    },
    'ws-timer-reset': () => {
      const entry = examMeta(session.examId);
      entry.timer = W.createTimer();
      entry.warned = [];
      saveMeta();
      tick();
    }
  };

  // ------------------------------------------------------------------ Einbindung in app.js

  function init(context) {
    ctx = context;
    migrateLegacyResults();
    return actions;
  }

  /** Nach jedem Rendern: Arbeitsplatz ein- bzw. aushängen. */
  function afterRender(route) {
    currentRoute = route;
    if (route.name === 'schriftlich' && route.param && examById.has(route.param)) mount(route.param);
    else unmount();
    if (route.name === 'archivansicht' && route.param) mountViewer(route.param);
    else unmountViewer();
    if (route.name === 'archiv' && !route.param) wireSwipeRows();
  }

  function render(param) {
    return param ? renderWorkspace(param) : renderList();
  }

  root.FLWrittenUI = { init, render, renderArchive, renderViewer, afterRender, examTabs, hasExams: () => exams.length > 0 };
})(typeof self !== 'undefined' ? self : this);
