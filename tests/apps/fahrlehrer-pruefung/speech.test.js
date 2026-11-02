/**
 * Tests for apps/fahrlehrer-pruefung/public/core/speech-core.js
 *
 * Run with: node tests/apps/fahrlehrer-pruefung/speech.test.js
 */

const assert = require('assert');

const Speech = require('../../../apps/fahrlehrer-pruefung/public/core/speech-core');

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

function fakeSynth(voices) {
  const synth = {
    spoken: [],
    cancels: 0,
    speaking: false,
    pending: false,
    getVoices: () => voices || [],
    speak: u => synth.spoken.push(u),
    cancel: () => { synth.cancels += 1; },
    resume: () => {}
  };
  return synth;
}

function Utterance(text) {
  this.text = text;
}

const voice = (name, lang, extra) => Object.assign({ name, lang, voiceURI: name }, extra);

async function runTests() {
  console.log('\n=== Testing fahrlehrer-pruefung speech-core ===\n');
  const results = [];

  results.push(await test('speechText spells out abbreviations and drops silent characters', () => {
    assert.strictEqual(
      Speech.speechText('Nennen Sie z. B. § 2a Abs. 1 StVG – und „ggf.“ Nr. 3 …'),
      'Nennen Sie zum Beispiel Paragraf 2a Absatz 1 StVG, und gegebenenfalls Nummer 3.'
    );
    assert.strictEqual(Speech.speechText('Guten Tag.\n\nWas bedeutet dieses Zeichen?'), 'Guten Tag. Was bedeutet dieses Zeichen?');
    assert.strictEqual(Speech.speechText('Frage eins\n- erster Punkt'), 'Frage eins. erster Punkt.');
    assert.strictEqual(Speech.speechText('Höchstens 50 km/h, d. h. langsam.'), 'Höchstens 50 Kilometer pro Stunde, das heißt langsam.');
    assert.strictEqual(Speech.speechText('Fragen: i) Wie lange? ii) Wie weit? b) Warum (kurz)?'), 'Fragen: Wie lange? Wie weit? Warum (kurz)?');
    assert.strictEqual(Speech.speechText('Sozialformen / Methoden'), 'Sozialformen oder Methoden.');
    assert.strictEqual(Speech.speechText(''), '');
  }));

  results.push(await test('speechChunks keeps sentences together and splits long ones', () => {
    assert.deepStrictEqual(Speech.speechChunks('Eins. Zwei! Drei?', 200), ['Eins. Zwei! Drei?']);
    assert.deepStrictEqual(Speech.speechChunks('Erster Satz ist hier. Zweiter Satz ist da.', 25), ['Erster Satz ist hier.', 'Zweiter Satz ist da.']);
    const long = Array.from({ length: 60 }, (_, i) => `Wort${i}`).join(' ');
    const chunks = Speech.speechChunks(long, 100);
    assert.ok(chunks.length > 1);
    assert.ok(chunks.every(c => c.length <= 100));
    assert.strictEqual(chunks.join(' '), long);
    assert.deepStrictEqual(Speech.speechChunks('', 100), []);
  }));

  results.push(await test('german voices: no novelty voices, best first, one per name', () => {
    const list = [
      voice('Samantha', 'en-US'),
      voice('Anna', 'de-DE', { voiceURI: 'com.apple.voice.compact.de-DE.Anna' }),
      voice('Grandpa (Deutsch (Deutschland))', 'de-DE'),
      voice('Anna', 'de-DE', { voiceURI: 'com.apple.voice.enhanced.de-DE.Anna' }),
      voice('Markus', 'de_DE'),
      voice('Helena', 'de-DE')
    ];
    const german = Speech.germanVoices(list);
    assert.deepStrictEqual(german.map(v => v.name), ['Anna', 'Markus', 'Helena']);
    assert.ok(/enhanced/.test(german[0].voiceURI));
  }));

  results.push(await test('each examiner gets an own voice, or the same voice with another pitch', () => {
    const ids = ['recht', 'paedagogik', 'technik'];
    const three = Speech.assignVoices([voice('Anna', 'de-DE'), voice('Markus', 'de-DE'), voice('Helena', 'de-DE')], ids);
    assert.strictEqual(new Set(ids.map(id => three[id].voice.name)).size, 3);
    const one = Speech.assignVoices([voice('Anna', 'de-DE')], ids);
    assert.ok(ids.every(id => one[id].voice.name === 'Anna'));
    assert.strictEqual(new Set(ids.map(id => one[id].pitch)).size, 3);
    const none = Speech.assignVoices([voice('Samantha', 'en-US')], ids);
    assert.strictEqual(none.recht.voice, null);
  }));

  results.push(await test('speaker queues chunks with the examiner voice and reports speaking', () => {
    const synth = fakeSynth([voice('Markus', 'de-DE'), voice('Anna', 'de-DE')]);
    const states = [];
    const speaker = Speech.createSpeaker({ synth, Utterance, ids: ['recht', 'technik'], onChange: s => states.push(s) });
    assert.ok(speaker.supported);
    speaker.speak('Guten Tag. Was regelt § 2a StVG?', 'technik');
    assert.strictEqual(synth.spoken.length, 1);
    assert.strictEqual(synth.spoken[0].text, 'Guten Tag. Was regelt Paragraf 2a StVG?');
    assert.strictEqual(synth.spoken[0].voice.name, 'Anna');
    assert.strictEqual(synth.spoken[0].lang, 'de-DE');
    assert.ok(speaker.isSpeaking());
    synth.spoken[0].onend();
    assert.ok(!speaker.isSpeaking());
    assert.deepStrictEqual(states, [true, false]);
  }));

  results.push(await test('stop cancels only when something runs; speech right after a cancel waits briefly', async () => {
    const synth = fakeSynth([voice('Markus', 'de-DE')]);
    const speaker = Speech.createSpeaker({ synth, Utterance, ids: ['recht'] });
    speaker.stop();
    assert.strictEqual(synth.cancels, 0);
    speaker.speak('Erste Frage.', 'recht');
    speaker.stop();
    assert.strictEqual(synth.cancels, 1);
    assert.ok(!speaker.isSpeaking());
    speaker.speak('Nächste Frage.', 'recht');
    assert.strictEqual(synth.spoken.length, 1, 'not sent directly after cancel');
    assert.ok(speaker.isSpeaking());
    await new Promise(resolve => setTimeout(resolve, 300));
    assert.strictEqual(synth.spoken.length, 2);
    assert.strictEqual(synth.spoken[1].text, 'Nächste Frage.');
  }));

  results.push(await test('unlock speaks one silent utterance; no speech support is harmless', () => {
    const synth = fakeSynth([]);
    const speaker = Speech.createSpeaker({ synth, Utterance, ids: ['recht'] });
    speaker.unlock();
    speaker.unlock();
    assert.strictEqual(synth.spoken.length, 1);
    assert.strictEqual(synth.spoken[0].volume, 0);
    const silent = Speech.createSpeaker({ synth: null, Utterance: undefined, ids: ['recht'] });
    assert.ok(!silent.supported);
    assert.strictEqual(silent.speak('Hallo', 'recht'), 0);
    silent.stop();
    silent.unlock();
  }));

  results.push(await test('voice test reports started, error, silence and missing support', async () => {
    const synth = fakeSynth([voice('Markus', 'de-DE')]);
    const speaker = Speech.createSpeaker({ synth, Utterance, ids: ['recht'] });
    const seen = [];
    speaker.test('Probe', 'recht', (status, detail) => seen.push([status, detail]), 50);
    synth.spoken[0].onstart();
    synth.spoken[0].onend();
    speaker.test('Probe', 'recht', (status, detail) => seen.push([status, detail]), 50);
    synth.spoken[1].onerror({ error: 'not-allowed' });
    speaker.test('Probe', 'recht', (status, detail) => seen.push([status, detail]), 50);
    await new Promise(resolve => setTimeout(resolve, 80));
    Speech.createSpeaker({ synth: null, ids: ['recht'] }).test('Probe', 'recht', status => seen.push([status]));
    assert.deepStrictEqual(seen, [['started', 'Markus'], ['error', 'not-allowed'], ['silent', undefined], ['unsupported']]);
  }));

  const passed = results.filter(Boolean).length;
  const failed = results.length - passed;
  console.log(`\nResults: Passed: ${passed}, Failed: ${failed}`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests();
