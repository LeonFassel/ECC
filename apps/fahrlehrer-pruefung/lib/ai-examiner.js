'use strict';

/**
 * KI-Bewertung und KI-Prüfer auf Basis der Claude API.
 *
 * Request-Aufbau und Auswertung stehen in public/core/ai-requests.js (gemeinsam
 * mit der Website). Der Client wird von außen übergeben, damit sich alles ohne
 * Netzwerk testen lässt.
 */

const Requests = require('../public/core/ai-requests.js');

const MODEL = process.env.FL_CLAUDE_MODEL || Requests.DEFAULT_MODEL;
const { EVALUATION_SCHEMA, EXAMINER_SCHEMA, AiResponseError, parseStructured } = Requests;

function buildEvaluationRequest(question, answer) {
  return Requests.buildEvaluationRequest(question, answer, MODEL);
}

function buildExaminerRequest(questions, history, options) {
  return Requests.buildExaminerRequest(questions, history, MODEL, options);
}

function createAiService(client) {
  return Requests.createAiService(client, MODEL);
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
