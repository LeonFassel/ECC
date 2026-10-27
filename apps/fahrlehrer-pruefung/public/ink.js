/**
 * Zeichenfläche für Handschrift mit dem Apple Pencil (oder Maus/Finger).
 * Eine Fläche liegt als zwei Canvas-Ebenen über einem Element: unten die fertigen
 * Striche, oben der Strich, der gerade gezeichnet wird. Koordinaten sind
 * Blatt-Einheiten (logicalWidth breit), damit Striche beim Ändern der Größe an
 * ihrem Platz bleiben.
 *
 * Stift zeichnet, Finger scrollt (außer "Mit Finger zeichnen" ist an).
 */
(function (root) {
  'use strict';

  const W = root.FLWritten;
  // iPad Safari begrenzt die Fläche eines Canvas; darüber bleibt er leer.
  const MAX_CANVAS_PIXELS = 12 * 1000 * 1000;
  const ERASER_RADIUS = 3;

  function drawStroke(ctx, stroke, scale) {
    const pts = stroke.points;
    if (pts.length === 0) return;
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = stroke.color;
    ctx.fillStyle = stroke.color;
    if (stroke.tool === 'marker') {
      // Textmarker als ein einziger Pfad, damit Überlappungen nicht dunkler werden.
      ctx.globalAlpha = 0.38;
      ctx.lineCap = 'butt';
      ctx.lineWidth = stroke.width * scale;
      ctx.beginPath();
      ctx.moveTo(pts[0][0] * scale, pts[0][1] * scale);
      if (pts.length === 1) ctx.lineTo(pts[0][0] * scale + 0.5, pts[0][1] * scale);
      for (let i = 1; i < pts.length; i++) {
        const end = i < pts.length - 1 ? midpoint(pts[i], pts[i + 1]) : pts[i];
        ctx.quadraticCurveTo(pts[i][0] * scale, pts[i][1] * scale, end[0] * scale, end[1] * scale);
      }
      ctx.stroke();
      ctx.restore();
      return;
    }
    if (pts.length === 1) {
      ctx.beginPath();
      ctx.arc(pts[0][0] * scale, pts[0][1] * scale, (W.pointWidth(stroke, pts[0][2]) * scale) / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      return;
    }
    // Kugelschreiber: Segmente mit eigener Breite (Andruck), über Mittelpunkte geglättet.
    let start = pts[0];
    for (let i = 1; i < pts.length; i++) {
      const end = i < pts.length - 1 ? midpoint(pts[i], pts[i + 1]) : pts[i];
      ctx.beginPath();
      ctx.lineWidth = W.pointWidth(stroke, pts[i][2]) * scale;
      ctx.moveTo(start[0] * scale, start[1] * scale);
      ctx.quadraticCurveTo(pts[i][0] * scale, pts[i][1] * scale, end[0] * scale, end[1] * scale);
      ctx.stroke();
      start = end;
    }
    ctx.restore();
  }

  function midpoint(a, b) {
    return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  }

  function makeCanvas(className) {
    const canvas = document.createElement('canvas');
    canvas.className = className;
    canvas.setAttribute('aria-hidden', 'true');
    return canvas;
  }

  /**
   * options:
   *  host          Element, über dem gezeichnet wird (position: relative)
   *  logicalWidth  Breite in Blatt-Einheiten (A4: 210, Fragenblatt: Pixelbreite des Inhalts)
   *  getStrokes()  aktuelle Striche dieser Ebene
   *  getTool()     { tool: 'pen'|'marker'|'eraser', color, width }
   *  fingerDraws() true, wenn auch der Finger zeichnen soll
   *  onStroke(stroke), onErase(indices), onActivity()
   */
  function createSurface(options) {
    const host = options.host;
    const base = makeCanvas('ink-base');
    const live = makeCanvas('ink-live');
    host.appendChild(base);
    host.appendChild(live);
    const baseCtx = base.getContext('2d');
    const liveCtx = live.getContext('2d');

    let scale = 1;
    let ratio = 1;
    let current = null;
    let frame = 0;

    function size() {
      const width = host.clientWidth;
      const height = host.clientHeight;
      scale = width / options.logicalWidth;
      const dpr = window.devicePixelRatio || 1;
      ratio = Math.min(dpr, Math.sqrt(MAX_CANVAS_PIXELS / Math.max(1, width * height)));
      for (const canvas of [base, live]) {
        canvas.width = Math.max(1, Math.round(width * ratio));
        canvas.height = Math.max(1, Math.round(height * ratio));
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }
      redraw();
    }

    function prepare(ctx) {
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function redraw() {
      prepare(baseCtx);
      baseCtx.clearRect(0, 0, base.width, base.height);
      for (const stroke of options.getStrokes()) drawStroke(baseCtx, stroke, scale);
    }

    function appendStroke(stroke) {
      prepare(baseCtx);
      drawStroke(baseCtx, stroke, scale);
    }

    function drawLive() {
      frame = 0;
      prepare(liveCtx);
      liveCtx.clearRect(0, 0, live.width, live.height);
      if (current && current.stroke) drawStroke(liveCtx, current.stroke, scale);
    }

    function scheduleLive() {
      if (!frame) frame = window.requestAnimationFrame(drawLive);
    }

    function accepts(event) {
      if (event.pointerType === 'pen') return true;
      if (event.pointerType === 'touch') return options.fingerDraws();
      return event.button === 0;
    }

    function point(event) {
      const rect = live.getBoundingClientRect();
      const pressure = event.pointerType === 'pen' && event.pressure > 0 ? event.pressure : 0.5;
      return [(event.clientX - rect.left) / scale, (event.clientY - rect.top) / scale, pressure];
    }

    function eraseAt(p) {
      const hits = W.eraseHits(options.getStrokes(), p[0], p[1], ERASER_RADIUS);
      if (hits.length) options.onErase(hits);
    }

    function onDown(event) {
      if (current || !accepts(event)) return;
      event.preventDefault();
      try {
        live.setPointerCapture(event.pointerId);
      } catch (_err) {
        // Ohne Capture zeichnet die Fläche trotzdem, solange der Stift darauf bleibt.
      }
      const tool = options.getTool();
      const p = point(event);
      current = { id: event.pointerId, eraser: tool.tool === 'eraser', stroke: null };
      if (current.eraser) {
        eraseAt(p);
      } else {
        current.stroke = { tool: tool.tool, color: tool.color, width: tool.width, points: [p] };
        scheduleLive();
      }
      options.onActivity();
    }

    function onMove(event) {
      if (!current || event.pointerId !== current.id) return;
      event.preventDefault();
      const events = typeof event.getCoalescedEvents === 'function' ? event.getCoalescedEvents() : [];
      for (const ev of events.length ? events : [event]) {
        const p = point(ev);
        if (current.eraser) {
          eraseAt(p);
          continue;
        }
        const pts = current.stroke.points;
        const last = pts[pts.length - 1];
        if (Math.hypot(p[0] - last[0], p[1] - last[1]) * scale >= 0.75) pts.push(p);
      }
      if (!current.eraser) scheduleLive();
    }

    function onUp(event) {
      if (!current || event.pointerId !== current.id) return;
      const done = current;
      current = null;
      drawLive();
      if (!done.eraser && done.stroke) {
        const stroke = W.normalizeStroke(done.stroke);
        if (stroke) options.onStroke(stroke);
      }
    }

    // iPad: Der Pencil würde sonst die Seite scrollen. Nur Stift-Berührungen (und
    // Finger im Zeichenmodus) blockieren – normale Finger scrollen weiter.
    function onTouch(event) {
      const stylus = Array.from(event.touches || []).some(t => t.touchType === 'stylus');
      if (stylus || options.fingerDraws()) event.preventDefault();
    }

    live.addEventListener('pointerdown', onDown);
    live.addEventListener('pointermove', onMove);
    live.addEventListener('pointerup', onUp);
    live.addEventListener('pointercancel', onUp);
    live.addEventListener('touchstart', onTouch, { passive: false });
    live.addEventListener('touchmove', onTouch, { passive: false });
    live.addEventListener('contextmenu', event => event.preventDefault());

    const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(() => size()) : null;
    if (observer) observer.observe(host);
    size();

    return {
      host,
      redraw,
      appendStroke,
      resize: size,
      setFingerMode(on) {
        live.style.touchAction = on ? 'none' : 'pan-x pan-y';
      },
      destroy() {
        if (observer) observer.disconnect();
        if (frame) window.cancelAnimationFrame(frame);
        base.remove();
        live.remove();
      }
    };
  }

  root.FLInk = { createSurface, drawStroke };
})(typeof self !== 'undefined' ? self : this);
