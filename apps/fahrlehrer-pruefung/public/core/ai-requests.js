/**
 * Claude-Requests für KI-Bewertung und KI-Prüfer – gemeinsam genutzt vom Server
 * (lib/ai-examiner.js) und von der Website mit eigenem API-Schlüssel im Browser.
 * Der Client (Anthropic-SDK) wird von außen übergeben.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./ai-prompts.js'));
  } else {
    root.FLAiRequests = factory(root.FLPrompts);
  }
})(typeof self !== 'undefined' ? self : this, function (Prompts) {
  'use strict';

  const DEFAULT_MODEL = 'claude-opus-5-5';
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

  const WRITTEN_SCHEMA = {
    type: 'object',
    properties: {
      parts: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            percent: { type: 'number' },
            grade: { type: 'integer' },
            summary: { type: 'string' },
            strengths: { type: 'array', items: { type: 'string' } },
            gaps: { type: 'array', items: { type: 'string' } },
            tasks: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  label: { type: 'string' },
                  found: { type: 'boolean' },
                  score: { type: 'number' },
                  comment: { type: 'string' }
                },
                required: ['label', 'found', 'score', 'comment'],
                additionalProperties: false
              }
            }
          },
          required: ['name', 'percent', 'grade', 'summary', 'strengths', 'gaps', 'tasks'],
          additionalProperties: false
        }
      },
      summary: { type: 'string' },
      readability: { type: 'string' }
    },
    required: ['parts', 'summary', 'readability'],
    additionalProperties: false
  };

  function baseParams(model) {
    return {
      model: model || DEFAULT_MODEL,
      max_tokens: 16000,
      betas: [FALLBACK_BETA],
      fallbacks: 'default'
    };
  }

  function buildEvaluationRequest(question, answer, model) {
    return Object.assign(baseParams(model), {
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
  function buildExaminerRequest(questions, history, model) {
    return Object.assign(baseParams(model), {
      system: Prompts.EXAMINER_SYSTEM,
      output_config: {
        effort: 'low',
        format: { type: 'json_schema', schema: EXAMINER_SCHEMA }
      },
      messages: Prompts.examinerMessages(questions, history)
    });
  }

  /**
   * Korrektur der schriftlichen Prüfung: Aufgabentext plus Bilder der
   * Antwortblätter. images: [{ mediaType: 'image/jpeg', data: <base64> }]
   */
  function buildWrittenGradingRequest(exam, images, model) {
    return Object.assign(baseParams(model), {
      max_tokens: 32000,
      system: Prompts.WRITTEN_SYSTEM,
      output_config: {
        effort: 'high',
        format: { type: 'json_schema', schema: WRITTEN_SCHEMA }
      },
      messages: [{
        role: 'user',
        content: images.map(img => ({ type: 'image', source: { type: 'base64', media_type: img.mediaType, data: img.data } }))
          .concat({ type: 'text', text: Prompts.writtenExamText(exam, images.length) })
      }]
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

  function createAiService(client, model) {
    return {
      async evaluate(question, answer) {
        const response = await client.beta.messages.create(buildEvaluationRequest(question, answer, model));
        return Object.assign(Prompts.normalizeEvaluation(parseStructured(response)), { model: response.model });
      },

      async examine(questions, history) {
        const response = await client.beta.messages.create(buildExaminerRequest(questions, history, model));
        return Prompts.normalizeExaminerTurn(parseStructured(response));
      },

      async gradeWritten(exam, images) {
        const response = await client.beta.messages.create(buildWrittenGradingRequest(exam, images, model));
        return Object.assign(Prompts.normalizeWrittenGrading(parseStructured(response), exam), { model: response.model });
      }
    };
  }

  return {
    DEFAULT_MODEL,
    EVALUATION_SCHEMA,
    EXAMINER_SCHEMA,
    WRITTEN_SCHEMA,
    AiResponseError,
    buildEvaluationRequest,
    buildExaminerRequest,
    buildWrittenGradingRequest,
    parseStructured,
    createAiService
  };
});
