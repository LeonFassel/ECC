#!/usr/bin/env node
'use strict';

/**
 * Kleiner Webserver für die Fahrlehrer-Prüfungs-App.
 *
 *  - liefert die statische App aus public/ aus
 *  - stellt optional KI-Endpunkte bereit (Claude API), wenn Zugangsdaten vorhanden sind
 *
 * Start: node apps/fahrlehrer-pruefung/server.js  (Port über PORT, Standard 4173)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const data = require('./public/data/questions.js');
const written = require('./public/data/questions-schriftlich.js');
const { createAiService, loadDefaultClient, AiResponseError, MODEL } = require('./lib/ai-examiner');

const PUBLIC_DIR = path.join(__dirname, 'public');
const MAX_BODY_BYTES = 64 * 1024;
// Korrektur der schriftlichen Prüfung: Fotos der Antwortblätter (JPEG, base64).
const MAX_WRITTEN_BODY_BYTES = 40 * 1024 * 1024;
const MAX_WRITTEN_PAGES = 40;
const MAX_EXAM_QUESTIONS = 8;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webmanifest': 'application/manifest+json'
};

const questionById = new Map(data.questions.map(q => [q.id, q]));
const writtenById = new Map(((written && written.exams) || []).map(exam => [exam.id, exam]));

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Content-Length': Buffer.byteLength(body)
  });
  res.end(body);
}

function readJsonBody(req, limit) {
  const maxBytes = limit || MAX_BODY_BYTES;
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', chunk => {
      size += chunk.length;
      if (size > maxBytes) {
        reject(Object.assign(new Error('Anfrage zu groß.'), { status: 413 }));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      try {
        resolve(chunks.length ? JSON.parse(Buffer.concat(chunks).toString('utf8')) : {});
      } catch (_err) {
        reject(Object.assign(new Error('Ungültiges JSON.'), { status: 400 }));
      }
    });
    req.on('error', reject);
  });
}

function serveStatic(req, res) {
  const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const relative = urlPath === '/' ? 'index.html' : urlPath.replace(/^\/+/, '');
  const filePath = path.normalize(path.join(PUBLIC_DIR, relative));
  if (!filePath.startsWith(PUBLIC_DIR + path.sep)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Nicht gefunden');
      return;
    }
    res.writeHead(200, {
      'Content-Type': MIME_TYPES[path.extname(filePath)] || 'application/octet-stream',
      'X-Content-Type-Options': 'nosniff'
    });
    res.end(content);
  });
}

function aiErrorResponse(err) {
  if (err instanceof AiResponseError) return { status: 502, message: err.message };
  const status = Number(err && err.status);
  if (status === 401 || status === 403) return { status: 502, message: 'KI-Zugang ungültig. Bitte API-Schlüssel prüfen.' };
  if (status === 429) return { status: 503, message: 'Die KI ist gerade ausgelastet. Bitte gleich noch einmal versuchen.' };
  if (status >= 500) return { status: 503, message: 'Die KI ist vorübergehend nicht erreichbar.' };
  return { status: 500, message: 'Die KI-Anfrage ist fehlgeschlagen.' };
}

function createAppServer(options) {
  const opts = options || {};
  const ai = opts.aiService !== undefined
    ? opts.aiService
    : (client => (client ? createAiService(client) : null))(loadDefaultClient());

  async function handleApi(req, res, pathname) {
    if (pathname === '/api/status' && req.method === 'GET') {
      sendJson(res, 200, { ai: Boolean(ai), model: ai ? MODEL : null, questions: data.questions.length });
      return;
    }
    if (req.method !== 'POST') {
      sendJson(res, 405, { error: 'Methode nicht erlaubt.' });
      return;
    }
    if (!ai) {
      sendJson(res, 503, { error: 'KI-Funktionen sind nicht aktiviert. Starten Sie den Server mit ANTHROPIC_API_KEY.' });
      return;
    }

    const body = await readJsonBody(req, pathname === '/api/written-grade' ? MAX_WRITTEN_BODY_BYTES : MAX_BODY_BYTES);

    if (pathname === '/api/evaluate') {
      const question = questionById.get(body.questionId);
      const answer = typeof body.answer === 'string' ? body.answer.trim() : '';
      if (!question || !answer) {
        sendJson(res, 400, { error: 'questionId und answer sind erforderlich.' });
        return;
      }
      sendJson(res, 200, await ai.evaluate(question, answer));
      return;
    }

    if (pathname === '/api/examiner') {
      const ids = Array.isArray(body.questionIds) ? body.questionIds.slice(0, MAX_EXAM_QUESTIONS) : [];
      const questions = ids.map(id => questionById.get(id)).filter(Boolean);
      const history = Array.isArray(body.history)
        ? body.history.filter(t => t && typeof t.text === 'string' && (t.role === 'examiner' || t.role === 'candidate'))
        : [];
      if (questions.length === 0) {
        sendJson(res, 400, { error: 'Keine gültigen Prüfungsfragen übergeben.' });
        return;
      }
      sendJson(res, 200, await ai.examine(questions, history));
      return;
    }

    if (pathname === '/api/written-grade') {
      const exam = writtenById.get(body.examId);
      const images = Array.isArray(body.images)
        ? body.images.filter(img => img && /^image\/(jpeg|png)$/.test(img.mediaType) && typeof img.data === 'string' && /^[A-Za-z0-9+/=]+$/.test(img.data))
        : [];
      if (!exam || images.length === 0 || images.length > MAX_WRITTEN_PAGES) {
        sendJson(res, 400, { error: `examId und 1 bis ${MAX_WRITTEN_PAGES} Antwortblätter sind erforderlich.` });
        return;
      }
      sendJson(res, 200, await ai.gradeWritten(exam, images.map(img => ({ mediaType: img.mediaType, data: img.data }))));
      return;
    }

    sendJson(res, 404, { error: 'Unbekannter Endpunkt.' });
  }

  return http.createServer((req, res) => {
    const pathname = new URL(req.url, 'http://localhost').pathname;
    if (!pathname.startsWith('/api/')) {
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        res.writeHead(405);
        res.end();
        return;
      }
      serveStatic(req, res);
      return;
    }
    handleApi(req, res, pathname).catch(err => {
      if (err && (err.status === 400 || err.status === 413)) {
        sendJson(res, err.status, { error: err.message });
        return;
      }
      const mapped = aiErrorResponse(err);
      console.error(`[FahrlehrerApp] ${err && err.message}`);
      sendJson(res, mapped.status, { error: mapped.message });
    });
  });
}

if (require.main === module) {
  const port = Number(process.env.PORT) || 4173;
  const host = process.env.HOST || '127.0.0.1';
  const server = createAppServer();
  server.listen(port, host, () => {
    const status = loadDefaultClient() ? `KI aktiv (${MODEL})` : 'KI inaktiv – Grundversion mit lokaler Bewertung';
    console.log(`Fahrlehrer-Prüfungstrainer läuft auf http://${host}:${port}  [${status}]`);
  });
}

module.exports = { createAppServer };
