'use strict';

/**
 * KI-Bewertung und KI-Prüfer auf Basis der Claude API.
 *
 * Die Funktionen bauen die Requests auf und werten die Antworten aus. Der
 * Client wird von außen übergeben, damit sich alles ohne Netzwerk testen lässt.
 */

const MODEL = process.env.FL_CLAUDE_MODEL || 'claude-opus-5-5';
const FALLBACK_BETA = 'server-side-fallback-2026-07-01';
const MAX_ANSWER_CHARS = 6000;
const MAX_TURNS = 40;

const EVALUATION_SCHEMA = {
  type: 'object',
  properties: {
    score: { type: 'number', description: 'Bewertung 0 bis 1' },
    covered: { type: 'array', items: { type: 'string' } },
    missing: { type: 'array', items: { type: 'string' } },
    errors: { type: 'array', items: { type: 'string' } },
    feedback: { type: 'string' },
    tip: { type: 'string' }
  },
  required: ['score', 'covered', 'missing', 'errors', 'feedback', 'tip'],
  additionalProperties: false
};

const EXAMINER_SCHEMA = {
  type: 'object',
  properties: {
    message: { type: 'string' },
    assessment: {
      type: 'object',
      properties: {
        completed: { type: 'boolean' },
        questionId: { type: 'string' },
        score: { type: 'number' },
        missing: { type: 'array', items: { type: 'string' } },
        comment: { type: 'string' }
      },
      required: ['completed', 'questionId', 'score', 'missing', 'comment'],
      additionalProperties: false
    },
    finished: { type: 'boolean' },
    summary: { type: 'string' }
  },
  required: ['message', 'assessment', 'finished', 'summary'],
  additionalProperties: false
};

const EVALUATION_SYSTEM = [
  'Du bist erfahrenes Mitglied eines Prüfungsausschusses für die Fahrlehrerprüfung (Fahrlehrerlaubnisklasse BE) in Deutschland.',
  'Du bewertest die frei formulierte Antwort eines Prüflings auf eine Frage aus der mündlichen Fachkundeprüfung.',
  'Grundlage sind die Musterantwort und die Kernpunkte. Gleichwertige Formulierungen und zusätzliche richtige Inhalte zählen positiv; fachliche Fehler zählen negativ.',
  'Antworte in einfachem, freundlichem Deutsch. Sprich den Prüfling mit „Sie“ an.',
  'score: 0 = nichts Relevantes, 0.5 = etwa die Hälfte der Kernpunkte korrekt, 1 = vollständig und fehlerfrei.',
  'covered/missing: Verwende die Bezeichnungen der Kernpunkte. errors: konkrete fachliche Fehler (leer, wenn keine).',
  'feedback: 2–4 Sätze zur Antwort. tip: ein konkreter Lerntipp.'
].join('\n');

const EXAMINER_SYSTEM = [
  'Du bist Vorsitzende/r des Prüfungsausschusses in einer mündlichen Fachkundeprüfung für Fahrlehreranwärter (Klasse BE) in Deutschland.',
  'Führe eine realistische, faire mündliche Prüfung auf Deutsch. Sprich den Prüfling mit „Sie“ an.',
  'Ablauf: Stelle die vorgegebenen Prüfungsfragen nacheinander in der angegebenen Reihenfolge. Hake nach jeder Antwort ein- bis zweimal gezielt nach,',
  'wenn Kernpunkte fehlen, etwas unklar oder falsch ist oder um Praxistransfer zu prüfen (z. B. „Wie würden Sie das einem Fahrschüler erklären?“).',
  'Verrate keine Musterlösung während der Prüfung. Gib höchstens einen kleinen Denkanstoß, wenn der Prüfling feststeckt.',
  'Wenn eine Frage abgeschlossen ist, setze assessment.completed = true, trage die questionId ein und bewerte die Gesamtleistung zu dieser Frage (score 0..1, fehlende Kernpunkte, kurzer Kommentar).',
  'Leite dann in message direkt zur nächsten Frage über. Andernfalls assessment.completed = false, questionId = "", score = 0, missing = [], comment = "".',
  'Nach der letzten Frage: finished = true und summary mit einer ehrlichen Gesamteinschätzung (Stärken, Lücken, Empfehlung). Sonst finished = false, summary = "".',
  'Halte deine Beiträge kurz wie in einer echten Prüfung (1–4 Sätze).'
].join('\n');

function questionBrief(q) {
  return [
    `Frage-ID: ${q.id}`,
    `Thema: ${q.topic}`,
    `Frage: ${q.question}`,
    `Musterantwort: ${q.modelAnswer}`,
    `Kernpunkte: ${q.keyPoints.map(p => p.label).join('; ')}`,
    `Mögliche Nachfragen: ${q.followUps.join(' | ')}`
  ].join('\n');
}

function clampText(text, max) {
  const value = String(text || '');
  return value.length > max ? value.slice(0, max) : value;
}

function baseParams() {
  return {
    model: MODEL,
    max_tokens: 16000,
    betas: [FALLBACK_BETA],
    fallbacks: 'default'
  };
}

function buildEvaluationRequest(question, answer) {
  return Object.assign(baseParams(), {
    system: EVALUATION_SYSTEM,
    output_config: {
      effort: 'medium',
      format: { type: 'json_schema', schema: EVALUATION_SCHEMA }
    },
    messages: [{
      role: 'user',
      content: [
        questionBrief(question),
        '',
        'Antwort des Prüflings:',
        '<antwort>',
        clampText(answer, MAX_ANSWER_CHARS),
        '</antwort>'
      ].join('\n')
    }]
  });
}

/**
 * history: [{ role: 'examiner' | 'candidate', text }]
 * Die Prüfung startet mit einer leeren Historie; der Prüfer eröffnet dann.
 */
function buildExaminerRequest(questions, history) {
  const plan = questions.map((q, i) => `### Prüfungsfrage ${i + 1}\n${questionBrief(q)}`).join('\n\n');
  const turns = (history || []).slice(-MAX_TURNS);
  const messages = [{
    role: 'user',
    content: `Prüfungsplan (nur für dich als Prüfer sichtbar):\n\n${plan}\n\nBeginne jetzt die Prüfung mit einer kurzen Begrüßung und der ersten Frage.`
  }];
  for (const turn of turns) {
    const role = turn.role === 'candidate' ? 'user' : 'assistant';
    const content = role === 'user' ? `<pruefling>${clampText(turn.text, MAX_ANSWER_CHARS)}</pruefling>` : clampText(turn.text, MAX_ANSWER_CHARS);
    const prev = messages[messages.length - 1];
    if (prev.role === role) {
      prev.content += `\n\n${content}`;
    } else {
      messages.push({ role, content });
    }
  }
  if (messages[messages.length - 1].role === 'assistant') {
    messages.push({ role: 'user', content: '(Der Prüfling wartet auf Ihre nächste Frage.)' });
  }
  return Object.assign(baseParams(), {
    system: EXAMINER_SYSTEM,
    output_config: {
      effort: 'low',
      format: { type: 'json_schema', schema: EXAMINER_SCHEMA }
    },
    messages
  });
}

class AiResponseError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'AiResponseError';
    this.code = code;
  }
}

function parseStructured(response) {
  if (!response || typeof response !== 'object') {
    throw new AiResponseError('Leere Antwort der KI.', 'empty');
  }
  if (response.stop_reason === 'refusal') {
    throw new AiResponseError('Die KI hat die Bewertung abgelehnt. Bitte formulieren Sie die Antwort neu.', 'refusal');
  }
  if (response.stop_reason === 'max_tokens') {
    throw new AiResponseError('Die KI-Antwort wurde abgeschnitten. Bitte erneut versuchen.', 'max_tokens');
  }
  const text = (response.content || [])
    .filter(block => block.type === 'text')
    .map(block => block.text)
    .join('');
  try {
    return JSON.parse(text);
  } catch (_err) {
    throw new AiResponseError('Die KI-Antwort konnte nicht gelesen werden.', 'invalid_json');
  }
}

function normalizeScore(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 0;
  return Math.round(Math.min(1, Math.max(0, n)) * 100) / 100;
}

function createAiService(client) {
  return {
    async evaluate(question, answer) {
      const response = await client.beta.messages.create(buildEvaluationRequest(question, answer));
      const data = parseStructured(response);
      return {
        score: normalizeScore(data.score),
        covered: Array.isArray(data.covered) ? data.covered : [],
        missing: Array.isArray(data.missing) ? data.missing : [],
        errors: Array.isArray(data.errors) ? data.errors : [],
        feedback: String(data.feedback || ''),
        tip: String(data.tip || ''),
        model: response.model
      };
    },

    async examine(questions, history) {
      const response = await client.beta.messages.create(buildExaminerRequest(questions, history));
      const data = parseStructured(response);
      const assessment = data.assessment && data.assessment.completed
        ? {
          questionId: String(data.assessment.questionId || ''),
          score: normalizeScore(data.assessment.score),
          missing: Array.isArray(data.assessment.missing) ? data.assessment.missing : [],
          comment: String(data.assessment.comment || '')
        }
        : null;
      return {
        message: String(data.message || ''),
        assessment,
        finished: Boolean(data.finished),
        summary: String(data.summary || '')
      };
    }
  };
}

/** Lädt das Anthropic-SDK, falls installiert und Zugangsdaten vorhanden sind. */
function loadDefaultClient(env) {
  const vars = env || process.env;
  if (vars.FL_AI_DISABLED === '1') return null;
  if (!vars.ANTHROPIC_API_KEY && !vars.ANTHROPIC_AUTH_TOKEN && vars.FL_AI_ENABLED !== '1') return null;
  try {
    const sdk = require('@anthropic-ai/sdk');
    const Anthropic = sdk.default || sdk.Anthropic || sdk;
    return new Anthropic();
  } catch (_err) {
    return null;
  }
}

module.exports = {
  MODEL,
  EVALUATION_SCHEMA,
  EXAMINER_SCHEMA,
  AiResponseError,
  buildEvaluationRequest,
  buildExaminerRequest,
  parseStructured,
  createAiService,
  loadDefaultClient
};
