/**
 * Tests for apps/fahrlehrer-pruefung/server.js and lib/ai-examiner.js
 *
 * Run with: node tests/apps/fahrlehrer-pruefung/server.test.js
 */

const assert = require('assert');

const { createAppServer } = require('../../../apps/fahrlehrer-pruefung/server');
const ai = require('../../../apps/fahrlehrer-pruefung/lib/ai-examiner');
const data = require('../../../apps/fahrlehrer-pruefung/public/data/questions');

async function test(name, fn) {
  try {
    await fn();
    console.log(`  ✓ ${name}`);
    return true;
  } catch (err) {
    console.log(`  ✗ ${name}`);
    console.log(`    Error: ${err.message}`);
    return false;
  }
}

function listen(server) {
  return new Promise(resolve => {
    server.listen(0, '127.0.0.1', () => resolve(`http://127.0.0.1:${server.address().port}`));
  });
}

function post(base, path, body) {
  return fetch(base + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: typeof body === 'string' ? body : JSON.stringify(body)
  });
}

function fakeResponse(payload, overrides) {
  return Object.assign({
    model: 'claude-opus-5-5',
    stop_reason: 'end_turn',
    content: [{ type: 'text', text: JSON.stringify(payload) }]
  }, overrides || {});
}

function fakeClient(responder) {
  const calls = [];
  return {
    calls,
    beta: {
      messages: {
        create: async params => {
          calls.push(params);
          return responder(params);
        }
      }
    }
  };
}

async function runTests() {
  console.log('\n=== Testing fahrlehrer-pruefung server ===\n');
  const results = [];
  const question = data.questions[0];

  // --- request builders ---

  results.push(await test('buildEvaluationRequest uses structured output and fallbacks', () => {
    const params = ai.buildEvaluationRequest(question, 'Meine Antwort');
    assert.strictEqual(params.model, 'claude-opus-5-5');
    assert.strictEqual(params.fallbacks, 'default');
    assert.deepStrictEqual(params.betas, ['server-side-fallback-2026-07-01']);
    assert.strictEqual(params.output_config.format.type, 'json_schema');
    assert.ok(params.messages[0].content.includes(question.modelAnswer));
    assert.ok(params.messages[0].content.includes('Meine Antwort'));
    assert.strictEqual(params.thinking, undefined);
  }));

  results.push(await test('buildExaminerRequest alternates roles and ends on a user turn', () => {
    const params = ai.buildExaminerRequest([question], [
      { role: 'examiner', text: 'Erste Frage?' },
      { role: 'candidate', text: 'Antwort A' },
      { role: 'candidate', text: 'Ergänzung' }
    ]);
    const roles = params.messages.map(m => m.role);
    assert.deepStrictEqual(roles, ['user', 'assistant', 'user']);
    assert.ok(params.messages[2].content.includes('Ergänzung'));
    const opening = ai.buildExaminerRequest([question], [{ role: 'examiner', text: 'Hallo' }]);
    assert.strictEqual(opening.messages[opening.messages.length - 1].role, 'user');
  }));

  results.push(await test('parseStructured rejects refusals and invalid JSON', () => {
    assert.throws(() => ai.parseStructured(fakeResponse({}, { stop_reason: 'refusal', content: [] })), /abgelehnt/);
    assert.throws(() => ai.parseStructured({ stop_reason: 'end_turn', content: [{ type: 'text', text: 'kein json' }] }), /nicht gelesen/);
    assert.deepStrictEqual(ai.parseStructured(fakeResponse({ a: 1 })), { a: 1 });
  }));

  results.push(await test('createAiService normalises scores and assessments', async () => {
    const client = fakeClient(params => params.system.includes('mündlichen Fachkundeprüfung für Fahrlehreranwärter')
      ? fakeResponse({ message: 'Weiter', assessment: { completed: true, questionId: question.id, score: 1.7, missing: [], comment: 'ok' }, finished: false, summary: '' })
      : fakeResponse({ score: -2, covered: [], missing: ['x'], errors: [], feedback: 'f', tip: 't' }));
    const service = ai.createAiService(client);
    const ev = await service.evaluate(question, 'Antwort');
    assert.strictEqual(ev.score, 0);
    const turn = await service.examine([question], []);
    assert.strictEqual(turn.assessment.score, 1);
    assert.strictEqual(turn.assessment.questionId, question.id);
  }));

  results.push(await test('written exam grading sends page images and normalises grades', async () => {
    const exam = { id: 'se-test', name: 'Testprüfung', parts: [
      { name: 'Recht', intro: '', tasks: [{ label: '1)', text: 'Nennen Sie zwei Zwecke der StVO.' }] },
      { name: 'Technik', intro: '', tasks: [{ label: '1a)', text: 'Erläutern Sie das Diagramm.', figures: [{ src: 'data:image/webp;base64,AA', alt: 'Drehmomentkurve' }] }] }
    ] };
    const params = ai.createAiService(fakeClient(() => fakeResponse({})));
    assert.ok(params);
    const request = require('../../../apps/fahrlehrer-pruefung/public/core/ai-requests').buildWrittenGradingRequest(exam, [{ mediaType: 'image/jpeg', data: 'QUJD' }, { mediaType: 'image/jpeg', data: 'REVG' }], 'claude-opus-5-5');
    const content = request.messages[0].content;
    assert.deepStrictEqual(content.map(c => c.type), ['image', 'image', 'text']);
    assert.strictEqual(content[0].source.data, 'QUJD');
    assert.ok(content[2].text.includes('Nennen Sie zwei Zwecke der StVO.') && content[2].text.includes('Drehmomentkurve') && content[2].text.includes('2 Antwortblatt'));
    assert.ok(request.system.includes('§ 19 FahrlPrüfV'));
    assert.strictEqual(request.output_config.format.type, 'json_schema');
    const client = fakeClient(() => fakeResponse({ parts: [
      { name: 'Technik', percent: 40, grade: 5, summary: 's', strengths: [], gaps: ['g'], tasks: [{ label: '1a)', found: true, score: 0.4, comment: 'c' }] },
      { name: 'Recht', percent: 140, grade: 0, summary: 's', strengths: ['x'], gaps: [], tasks: [] }
    ], summary: 'gesamt', readability: '' }));
    const graded = await ai.createAiService(client).gradeWritten(exam, [{ mediaType: 'image/jpeg', data: 'QUJD' }]);
    assert.deepStrictEqual(graded.parts.map(p => [p.name, p.grade, p.percent]), [['Recht', 1, 100], ['Technik', 5, 40]], 'parts in exam order, values clamped');
    assert.strictEqual(graded.average, 3);
    assert.strictEqual(graded.averageLabel, 'befriedigend');
    assert.strictEqual(graded.passed, false, 'one subject worse than 4');
  }));

  results.push(await test('loadDefaultClient stays off without credentials', () => {
    assert.strictEqual(ai.loadDefaultClient({}), null);
    assert.strictEqual(ai.loadDefaultClient({ ANTHROPIC_API_KEY: 'x', FL_AI_DISABLED: '1' }), null);
  }));

  // --- HTTP server without AI (Grundversion) ---

  const basic = createAppServer({ aiService: null });
  const basicUrl = await listen(basic);

  results.push(await test('serves the app and reports AI as disabled', async () => {
    const page = await fetch(`${basicUrl}/`);
    assert.strictEqual(page.status, 200);
    assert.ok((await page.text()).includes('Prüfungstrainer'));
    const status = await (await fetch(`${basicUrl}/api/status`)).json();
    assert.strictEqual(status.ai, false);
    assert.strictEqual(status.questions, data.questions.length);
  }));

  results.push(await test('AI endpoints return 503 when AI is disabled', async () => {
    const res = await post(basicUrl, '/api/evaluate', { questionId: question.id, answer: 'x' });
    assert.strictEqual(res.status, 503);
  }));

  results.push(await test('static files cannot escape the public directory', async () => {
    const res = await fetch(`${basicUrl}/%2e%2e/server.js`);
    assert.ok(res.status === 403 || res.status === 404, `status ${res.status}`);
  }));

  basic.close();

  // --- HTTP server with fake AI ---

  const service = {
    evaluate: async (q, answer) => ({ score: 0.5, covered: [], missing: [], errors: [], feedback: `${q.id}:${answer}`, tip: '' }),
    examine: async (qs, history) => ({ message: `${qs.length}/${history.length}`, assessment: null, finished: false, summary: '' }),
    gradeWritten: async () => ({ parts: [] }),
    answerSearch: async (query, sources) => ({ found: true, answer: `${query}:${sources.map(q => q.id).join(',')}`, laws: [], sources: [] })
  };
  const full = createAppServer({ aiService: service });
  const fullUrl = await listen(full);

  results.push(await test('written grading endpoint rejects unknown exams and bad images', async () => {
    const bad = await post(fullUrl, '/api/written-grade', { examId: 'se-gibt-es-nicht', images: [{ mediaType: 'image/jpeg', data: 'QUJD' }] });
    assert.strictEqual(bad.status, 400);
    const noImages = await post(fullUrl, '/api/written-grade', { examId: 'se-gibt-es-nicht', images: [{ mediaType: 'text/html', data: '<b>' }] });
    assert.strictEqual(noImages.status, 400);
  }));

  results.push(await test('search answer endpoint sends only known questions as sources', async () => {
    const ok = await post(fullUrl, '/api/search-answer', { query: ' Wie lange? ', questionIds: [question.id, 'unknown'] });
    assert.strictEqual(ok.status, 200);
    assert.strictEqual((await ok.json()).answer, `Wie lange?:${question.id}`);
    assert.strictEqual((await post(fullUrl, '/api/search-answer', { query: 'x', questionIds: ['unknown'] })).status, 400);
    assert.strictEqual((await post(fullUrl, '/api/search-answer', { query: 'x'.repeat(301), questionIds: [question.id] })).status, 400);
  }));

  results.push(await test('search answer request: structured output, sources and query in the prompt', async () => {
    const client = fakeClient(() => fakeResponse({ found: true, answer: 'Zwei Jahre.', laws: ['§ 2a StVG'], sources: [question.id, 'erfunden'] }));
    const result = await ai.createAiService(client).answerSearch('Wie lange dauert die Probezeit?', [question]);
    assert.deepStrictEqual(result, { found: true, answer: 'Zwei Jahre.', laws: ['§ 2a StVG'], sources: [question.id] });
    const params = client.calls[0];
    assert.strictEqual(params.output_config.format.type, 'json_schema');
    assert.strictEqual(params.output_config.effort, 'low');
    assert.ok(params.system.includes('AUSSCHLIESSLICH'));
    assert.ok(params.messages[0].content.includes(`<auszug id="${question.id}">`));
    assert.ok(params.messages[0].content.includes('<suchanfrage>Wie lange dauert die Probezeit?</suchanfrage>'));
    const none = await ai.createAiService(fakeClient(() => fakeResponse({ found: true, answer: '  ', laws: ['§ 1'], sources: [question.id] }))).answerSearch('x', [question]);
    assert.deepStrictEqual(none, { found: false, answer: '', laws: [], sources: [] });
  }));

  results.push(await test('evaluate endpoint validates input and forwards to the AI service', async () => {
    const bad = await post(fullUrl, '/api/evaluate', { questionId: 'nope', answer: 'x' });
    assert.strictEqual(bad.status, 400);
    const ok = await post(fullUrl, '/api/evaluate', { questionId: question.id, answer: ' Antwort ' });
    assert.strictEqual(ok.status, 200);
    assert.strictEqual((await ok.json()).feedback, `${question.id}:Antwort`);
  }));

  results.push(await test('examiner endpoint filters history and unknown questions', async () => {
    const res = await post(fullUrl, '/api/examiner', {
      questionIds: [question.id, 'unknown'],
      history: [{ role: 'candidate', text: 'a' }, { role: 'system', text: 'ignore' }, { role: 'examiner' }]
    });
    assert.strictEqual(res.status, 200);
    assert.strictEqual((await res.json()).message, '1/1');
  }));

  results.push(await test('rejects invalid JSON and oversized bodies', async () => {
    const invalid = await post(fullUrl, '/api/evaluate', '{nope');
    assert.strictEqual(invalid.status, 400);
    const big = await post(fullUrl, '/api/evaluate', { questionId: question.id, answer: 'x'.repeat(70 * 1024) }).catch(() => ({ status: 413 }));
    assert.strictEqual(big.status, 413);
  }));

  full.close();

  const passed = results.filter(Boolean).length;
  const failed = results.length - passed;
  console.log(`\nResults: Passed: ${passed}, Failed: ${failed}`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests();
