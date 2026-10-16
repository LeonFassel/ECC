'use strict';

/**
 * KI-Bewertung und KI-Prüfer auf Basis der Claude API.
 *
 * Die Funktionen bauen die Requests auf und werten die Antworten aus. Der
 * Client wird von außen übergeben, damit sich alles ohne Netzwerk testen lässt.
 */

const Prompts = require('../public/core/ai-prompts.js');

const MODEL = process.env.FL_CLAUDE_MODEL || 'claude-opus-5-5';
const FALLBACK_BETA = 'server-side-fallback-2026-07-01';

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
    system: Prompts.EVALUATION_SYSTEM,
    output_config: {
      effort: 'medium',
      format: { type: 'json_schema', schema: EVALUATION_SCHEMA }
    },
    messages: [{ role: 'user', content: Prompts.evaluationUserText(question, answer) }]
  });
}

/**
 * history: [{ role: 'examiner' | 'candidate', text }]
 * Die Prüfung startet mit einer leeren Historie; der Prüfer eröffnet dann.
 */
function buildExaminerRequest(questions, history) {
  return Object.assign(baseParams(), {
    system: Prompts.EXAMINER_SYSTEM,
    output_config: {
      effort: 'low',
      format: { type: 'json_schema', schema: EXAMINER_SCHEMA }
    },
    messages: Prompts.examinerMessages(questions, history)
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

function createAiService(client) {
  return {
    async evaluate(question, answer) {
      const response = await client.beta.messages.create(buildEvaluationRequest(question, answer));
      return Object.assign(Prompts.normalizeEvaluation(parseStructured(response)), { model: response.model });
    },

    async examine(questions, history) {
      const response = await client.beta.messages.create(buildExaminerRequest(questions, history));
      return Prompts.normalizeExaminerTurn(parseStructured(response));
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
