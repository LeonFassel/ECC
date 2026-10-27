/**
 * Schriftliche Prüfung: Timer und Handschrift-Striche als reine Funktionen
 * (ohne DOM), damit sie im Browser und in Node-Tests gleich funktionieren.
 *
 * Koordinaten der Striche sind Blatt-Einheiten, nicht Bildschirm-Pixel:
 * A4-Blatt = 210 x 297 (Millimeter), Fragenblatt = feste Breite in px.
 * So bleiben Striche beim Drehen oder Verschieben der Trennlinie an ihrem Platz.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FLWritten = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const DURATION_MS = 5 * 60 * 60 * 1000;
  const WARNINGS = [
    { id: 'min30', label: 'Noch 30 Minuten', below: 30 * 60 * 1000 },
    { id: 'min5', label: 'Noch 5 Minuten', below: 5 * 60 * 1000 }
  ];

  // ------------------------------------------------------------------ Timer

  /** Gespeichert werden Zeitpunkte, nicht hochgezählte Sekunden – so stimmt die Zeit auch nach Neuladen. */
  function createTimer(durationMs) {
    return { duration: durationMs || DURATION_MS, startedAt: null, pausedAt: null, pausedMs: 0 };
  }

  function normalizeTimer(raw) {
    const base = createTimer();
    if (!raw || typeof raw !== 'object') return base;
    const num = value => (typeof value === 'number' && Number.isFinite(value) ? value : null);
    return {
      duration: num(raw.duration) && raw.duration > 0 ? raw.duration : base.duration,
      startedAt: num(raw.startedAt),
      pausedAt: num(raw.startedAt) === null ? null : num(raw.pausedAt),
      pausedMs: Math.max(0, num(raw.pausedMs) || 0)
    };
  }

  function startTimer(timer, now) {
    if (timer.startedAt !== null) return resumeTimer(timer, now);
    return Object.assign({}, timer, { startedAt: now, pausedAt: null, pausedMs: 0 });
  }

  function pauseTimer(timer, now) {
    if (timer.startedAt === null || timer.pausedAt !== null) return timer;
    return Object.assign({}, timer, { pausedAt: now });
  }

  function resumeTimer(timer, now) {
    if (timer.startedAt === null || timer.pausedAt === null) return timer;
    return Object.assign({}, timer, { pausedAt: null, pausedMs: timer.pausedMs + Math.max(0, now - timer.pausedAt) });
  }

  function elapsedMs(timer, now) {
    if (timer.startedAt === null) return 0;
    const end = timer.pausedAt !== null ? timer.pausedAt : now;
    return Math.max(0, end - timer.startedAt - timer.pausedMs);
  }

  function remainingMs(timer, now) {
    return Math.max(0, timer.duration - elapsedMs(timer, now));
  }

  function timerStatus(timer, now) {
    if (timer.startedAt === null) return 'idle';
    if (remainingMs(timer, now) === 0) return 'finished';
    return timer.pausedAt !== null ? 'paused' : 'running';
  }

  /** Letzter erreichter Hinweis (30 bzw. 5 Minuten) oder null. */
  function timerWarning(timer, now) {
    if (timer.startedAt === null) return null;
    const left = remainingMs(timer, now);
    if (left === 0) return null;
    let current = null;
    for (const warning of WARNINGS) {
      if (left <= warning.below) current = warning;
    }
    return current;
  }

  function formatClock(ms) {
    const total = Math.ceil(Math.max(0, ms) / 1000);
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  // ------------------------------------------------------------------ Striche

  const TOOLS = ['pen', 'marker'];
  const MAX_POINTS = 4000;

  const round1 = n => Math.round(n * 10) / 10;

  /** Prüft einen Strich aus dem Speicher; ungültige Striche werden verworfen (null). */
  function normalizeStroke(raw) {
    if (!raw || typeof raw !== 'object' || !TOOLS.includes(raw.tool)) return null;
    if (typeof raw.color !== 'string' || !/^#[0-9a-f]{6}$/i.test(raw.color)) return null;
    const width = Number(raw.width);
    if (!Number.isFinite(width) || width <= 0 || width > 60) return null;
    const points = (Array.isArray(raw.points) ? raw.points : [])
      .filter(p => Array.isArray(p) && Number.isFinite(p[0]) && Number.isFinite(p[1]))
      .slice(0, MAX_POINTS)
      .map(p => [round1(p[0]), round1(p[1]), Number.isFinite(p[2]) ? Math.round(Math.min(Math.max(p[2], 0), 1) * 100) / 100 : 0.5]);
    if (points.length === 0) return null;
    return { tool: raw.tool, color: raw.color.toLowerCase(), width: round1(width), points };
  }

  /** Strichbreite eines Punkts: Kugelschreiber reagiert auf den Andruck, Textmarker nicht. */
  function pointWidth(stroke, pressure) {
    if (stroke.tool === 'marker') return stroke.width;
    const p = Number.isFinite(pressure) ? pressure : 0.5;
    return stroke.width * (0.55 + 0.9 * p);
  }

  function distanceToSegment(px, py, ax, ay, bx, by) {
    const dx = bx - ax;
    const dy = by - ay;
    const len2 = dx * dx + dy * dy;
    const t = len2 === 0 ? 0 : Math.min(1, Math.max(0, ((px - ax) * dx + (py - ay) * dy) / len2));
    const cx = ax + t * dx;
    const cy = ay + t * dy;
    return Math.hypot(px - cx, py - cy);
  }

  /** Trifft der Radierer (Kreis um x/y) den Strich? */
  function strokeHit(stroke, x, y, radius) {
    const pts = stroke.points;
    const reach = radius + stroke.width / 2;
    if (pts.length === 1) return Math.hypot(pts[0][0] - x, pts[0][1] - y) <= reach;
    for (let i = 1; i < pts.length; i++) {
      if (distanceToSegment(x, y, pts[i - 1][0], pts[i - 1][1], pts[i][0], pts[i][1]) <= reach) return true;
    }
    return false;
  }

  /** Indizes der Striche, die der Radierer trifft (ganze Striche werden gelöscht). */
  function eraseHits(strokes, x, y, radius) {
    const hits = [];
    strokes.forEach((stroke, index) => {
      if (strokeHit(stroke, x, y, radius)) hits.push(index);
    });
    return hits;
  }

  // ------------------------------------------------------------------ Verlauf (Rückgängig/Wiederholen)

  /**
   * Ein Arbeitsstand besteht aus Ebenen (z. B. "questions", "page-0", "page-1"),
   * jede Ebene ist eine Liste von Strichen. Änderungen laufen über Aktionen, damit
   * Rückgängig und Wiederholen über alle Ebenen hinweg funktionieren.
   */
  function applyAction(layers, action) {
    const next = Object.assign({}, layers);
    const list = (next[action.layer] || []).slice();
    if (action.type === 'add') {
      list.push(action.stroke);
    } else if (action.type === 'erase') {
      const remove = new Set(action.removed.map(r => r.index));
      next[action.layer] = list.filter((_, i) => !remove.has(i));
      return next;
    } else if (action.type === 'clear') {
      next[action.layer] = [];
      return next;
    }
    next[action.layer] = list;
    return next;
  }

  function revertAction(layers, action) {
    const next = Object.assign({}, layers);
    const list = (next[action.layer] || []).slice();
    if (action.type === 'add') {
      list.pop();
      next[action.layer] = list;
    } else if (action.type === 'erase') {
      // Gelöschte Striche an ihrer alten Stelle wieder einsetzen (aufsteigend).
      const restored = list.slice();
      action.removed.slice().sort((a, b) => a.index - b.index).forEach(r => restored.splice(r.index, 0, r.stroke));
      next[action.layer] = restored;
    } else if (action.type === 'clear') {
      next[action.layer] = action.removed.map(r => r.stroke);
    }
    return next;
  }

  function createHistory() {
    return { undo: [], redo: [] };
  }

  function record(history, action, limit) {
    const undo = history.undo.concat(action);
    return { undo: undo.slice(-(limit || 200)), redo: [] };
  }

  function undo(history, layers) {
    if (history.undo.length === 0) return { history, layers, action: null };
    const action = history.undo[history.undo.length - 1];
    return {
      history: { undo: history.undo.slice(0, -1), redo: history.redo.concat(action) },
      layers: revertAction(layers, action),
      action
    };
  }

  function redo(history, layers) {
    if (history.redo.length === 0) return { history, layers, action: null };
    const action = history.redo[history.redo.length - 1];
    return {
      history: { undo: history.undo.concat(action), redo: history.redo.slice(0, -1) },
      layers: applyAction(layers, action),
      action
    };
  }

  // ------------------------------------------------------------------ Gespeicherter Arbeitsstand

  const LAYER_KEY = /^(?:q|page)-(\d{1,2})$/;

  /**
   * Arbeitsstand einer Prüfung aus dem Speicher laden; Unbekanntes wird verworfen.
   * Ebenen: "q-<Teil>" (Markierungen auf den Fragen eines Prüfungsteils) und
   * "page-<n>" (karierte Blätter).
   */
  function normalizeDoc(raw, examId) {
    const doc = { examId, pageCount: 1, layers: { 'page-0': [] } };
    if (!raw || typeof raw !== 'object') return doc;
    doc.pageCount = Math.min(60, Math.max(1, Math.floor(Number(raw.pageCount) || 1)));
    const layers = raw.layers && typeof raw.layers === 'object' ? raw.layers : {};
    for (const key of Object.keys(layers)) {
      const match = LAYER_KEY.exec(key);
      if (!match || (key.startsWith('page-') && Number(match[1]) >= doc.pageCount)) continue;
      doc.layers[key] = (Array.isArray(layers[key]) ? layers[key] : []).map(normalizeStroke).filter(Boolean);
    }
    for (let i = 0; i < doc.pageCount; i++) {
      if (!doc.layers[`page-${i}`]) doc.layers[`page-${i}`] = [];
    }
    return doc;
  }

  return {
    DURATION_MS,
    WARNINGS,
    createTimer,
    normalizeTimer,
    startTimer,
    pauseTimer,
    resumeTimer,
    elapsedMs,
    remainingMs,
    timerStatus,
    timerWarning,
    formatClock,
    normalizeStroke,
    pointWidth,
    strokeHit,
    eraseHits,
    applyAction,
    revertAction,
    createHistory,
    record,
    undo,
    redo,
    normalizeDoc
  };
});
