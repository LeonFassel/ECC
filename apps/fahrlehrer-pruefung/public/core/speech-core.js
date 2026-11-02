/**
 * Vorlesen der Prüfer in der mündlichen Prüfung (Sprachausgabe des Browsers).
 * Ohne DOM: Text aufbereiten, in kurze Abschnitte teilen, Stimmen den Prüfern zuordnen
 * und eine Warteschlange über speechSynthesis steuern (synth und Utterance werden übergeben).
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FLSpeech = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // Abkürzungen so, wie ein Prüfer sie ausspricht.
  const SPOKEN = [
    [/§§\s*/g, 'Paragrafen '],
    [/§\s*/g, 'Paragraf '],
    [/\bAbs\.\s*/g, 'Absatz '],
    [/\bNr\.\s*/g, 'Nummer '],
    [/\bz\.\s?B\./g, 'zum Beispiel'],
    [/\bd\.\s?h\./g, 'das heißt'],
    [/\bu\.\s?a\./g, 'unter anderem'],
    [/\bbzw\./g, 'beziehungsweise'],
    [/\bggf\./g, 'gegebenenfalls'],
    [/\busw\./g, 'und so weiter'],
    [/\bca\./g, 'circa'],
    [/\bvgl\./g, 'vergleiche'],
    [/\binsb\./g, 'insbesondere'],
    [/\bkm\/h\b/g, 'Kilometer pro Stunde']
  ];

  /** Text für die Sprachausgabe: Abkürzungen ausschreiben, Zeichen ohne Klang entfernen. */
  function speechText(text) {
    let s = String(text || '');
    for (const [pattern, spoken] of SPOKEN) s = s.replace(pattern, spoken);
    return s
      // Aufzählungszeichen wie „a)“, „ii)“ oder „2)“ liest ein Prüfer nicht vor.
      .replace(/(^|\s)(?:[a-h]|[ivx]{1,4}|\d{1,2})\)\s+/gi, '$1')
      .replace(/[*#_`]+/g, '')
      .replace(/[„“”"«»]/g, '')
      .replace(/…/g, '.')
      .replace(/\s+[–—]\s+/g, ', ')
      .replace(/\s+\/\s+/g, ' oder ')
      .split(/\n+/)
      .map(line => line.replace(/^\s*[-•]\s+/, '').trim())
      .filter(Boolean)
      .map(line => (/[.!?:;,]$/.test(line) ? line : `${line}.`))
      .join(' ')
      .replace(/\s+/g, ' ')
      .replace(/\s+([.,!?:;])/g, '$1')
      .replace(/([.!?])\.+/g, '$1')
      .trim();
  }

  /**
   * In Abschnitte von höchstens `max` Zeichen teilen, möglichst an Satzenden. Lange
   * Einzeläußerungen bricht Chrome sonst nach etwa 15 Sekunden ab.
   */
  function speechChunks(text, max) {
    const limit = max || 200;
    const pieces = [];
    // Ohne Lookbehind: ältere Safari-Versionen können ihn nicht.
    for (const sentence of String(text || '').replace(/([.!?:;])\s+/g, '$1\n').split('\n')) {
      if (sentence.length <= limit) {
        pieces.push(sentence);
        continue;
      }
      let rest = sentence;
      while (rest.length > limit) {
        const cut = Math.max(rest.lastIndexOf(', ', limit), rest.lastIndexOf(' ', limit));
        const at = cut > limit / 3 ? cut + 1 : limit;
        pieces.push(rest.slice(0, at).trim());
        rest = rest.slice(at).trim();
      }
      if (rest) pieces.push(rest);
    }
    const chunks = [];
    for (const piece of pieces.filter(Boolean)) {
      const last = chunks[chunks.length - 1];
      if (last && last.length + 1 + piece.length <= limit) chunks[chunks.length - 1] = `${last} ${piece}`;
      else chunks.push(piece);
    }
    return chunks;
  }

  // Spaß- und Effektstimmen (z. B. auf iPad und Mac) passen nicht in eine Prüfung.
  const NOVELTY = /grandpa|grandma|opa|oma|eddy|flo\b|reed|rocko|sandy|shelley|bahh|bells|boing|bubbles|cellos|jester|organ|superstar|trinoids|whisper|wobble|zarvox|good news|bad news/i;
  const MALE = /markus|martin|yannick|viktor|stefan|conrad|killian|florian|ralf|jonas|hans|bernd|christoph|klaus|male/i;

  function voiceRank(v) {
    const id = `${v.name || ''} ${v.voiceURI || ''}`;
    let rank = 0;
    if (/premium/i.test(id)) rank += 4;
    if (/enhanced|erweitert|natural|neural/i.test(id)) rank += 3;
    if (MALE.test(v.name || '')) rank += 2;
    if (/^de[-_]DE$/i.test(v.lang || '')) rank += 1;
    if (v.localService) rank += 0.5;
    return rank;
  }

  /** Deutsche Stimmen, beste zuerst; gleichnamige Stimmen (kompakt/erweitert) nur einmal. */
  function germanVoices(voices) {
    const seen = new Set();
    return (voices || [])
      .filter(v => v && /^de(?:[-_]|$)/i.test(v.lang || '') && !NOVELTY.test(v.name || ''))
      .map((v, i) => ({ v, i, rank: voiceRank(v) }))
      .sort((a, b) => b.rank - a.rank || a.i - b.i)
      .map(x => x.v)
      .filter(v => {
        const key = String(v.name || '').toLowerCase().replace(/\s*\(.*\)\s*$/, '');
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
  }

  const PITCHES = [1, 0.88, 1.12];
  const CANCEL_GAP_MS = 250;

  /**
   * Jeder Prüfer bekommt eine eigene Stimme, solange es genug deutsche Stimmen gibt;
   * sonst dieselbe Stimme mit anderer Tonhöhe, damit man die Prüfer unterscheiden kann.
   */
  function assignVoices(voices, ids) {
    const german = germanVoices(voices);
    const profiles = {};
    (ids || []).forEach((id, i) => {
      const own = german[i];
      profiles[id] = {
        voice: own || german[0] || null,
        pitch: own ? 1 : PITCHES[i % PITCHES.length],
        rate: 1
      };
    });
    return profiles;
  }

  /**
   * Warteschlange für die Sprachausgabe. env: { synth, Utterance, ids, onChange(speaking) }.
   * Die Äußerungen bleiben referenziert, sonst feuert Safari kein onend.
   */
  function createSpeaker(env) {
    const e = env || {};
    const synth = e.synth;
    const Utterance = e.Utterance;
    const supported = Boolean(synth && typeof synth.speak === 'function' && typeof Utterance === 'function');
    const alive = new Set();
    let profiles = {};
    let unlocked = false;
    let lastSpeaking = false;
    let cancelledAt = 0;
    let waiting = [];
    let waitTimer = 0;

    function notify() {
      const speaking = alive.size > 0;
      if (speaking !== lastSpeaking) {
        lastSpeaking = speaking;
        if (typeof e.onChange === 'function') e.onChange(speaking);
      }
    }

    function refreshVoices() {
      if (!supported) return;
      let list = [];
      try { list = synth.getVoices() || []; } catch (_err) { list = []; }
      profiles = assignVoices(list, e.ids || []);
    }

    function utterance(text, profile) {
      const u = new Utterance(text);
      u.lang = profile && profile.voice && profile.voice.lang ? profile.voice.lang : 'de-DE';
      if (profile && profile.voice) u.voice = profile.voice;
      u.pitch = profile ? profile.pitch : 1;
      u.rate = profile ? profile.rate : 1;
      return u;
    }

    function send(u) {
      try {
        if (synth.paused && typeof synth.resume === 'function') synth.resume();
        synth.speak(u);
      } catch (_err) {
        alive.delete(u);
      }
    }

    function flushWaiting() {
      waitTimer = 0;
      const list = waiting;
      waiting = [];
      list.forEach(send);
      notify();
    }

    /** Liest `text` mit der Stimme des Prüfers `who` vor (hinten in der Warteschlange). */
    function speak(text, who) {
      if (!supported) return 0;
      if (!Object.keys(profiles).length) refreshVoices();
      const chunks = speechChunks(speechText(text));
      const profile = profiles[who] || null;
      // Safari verschluckt eine Ausgabe direkt nach cancel(): kurz warten.
      const pause = CANCEL_GAP_MS - (Date.now() - cancelledAt);
      for (const chunk of chunks) {
        const u = utterance(chunk, profile);
        const done = () => {
          alive.delete(u);
          notify();
        };
        u.onend = done;
        u.onerror = done;
        alive.add(u);
        if (pause > 0 || waiting.length) waiting.push(u);
        else send(u);
      }
      if (waiting.length && !waitTimer) waitTimer = setTimeout(flushWaiting, Math.max(0, pause));
      notify();
      return chunks.length;
    }

    /** Alles abbrechen; nur aufrufen, wenn wirklich etwas läuft (Safari verschluckt sonst Folgendes). */
    function stop() {
      if (!supported) return;
      const busy = alive.size > 0 || synth.speaking || synth.pending;
      alive.clear();
      waiting = [];
      if (waitTimer) clearTimeout(waitTimer);
      waitTimer = 0;
      if (busy) {
        cancelledAt = Date.now();
        try { synth.cancel(); } catch (_err) { /* nichts zu tun */ }
      }
      notify();
    }

    /** iPad/iPhone: Die erste Ausgabe muss aus einem Tippen kommen – danach geht es auch später. */
    function unlock() {
      if (!supported || unlocked) return;
      unlocked = true;
      try {
        const u = new Utterance(' ');
        u.volume = 0;
        u.lang = 'de-DE';
        synth.speak(u);
      } catch (_err) {
        unlocked = false;
      }
    }

    /**
     * Probe aus einem Tippen heraus: meldet über report(status, detail), ob die Ausgabe startet.
     * status: 'unsupported' | 'started' | 'error' (detail = Fehlercode) | 'silent' (keine Rückmeldung).
     */
    function test(text, who, report, waitMs) {
      if (!supported) {
        report('unsupported');
        return;
      }
      stop();
      refreshVoices();
      const profile = profiles[who] || null;
      const u = utterance(speechText(text), profile);
      let settled = false;
      const settle = (status, detail) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        report(status, detail);
      };
      const timer = setTimeout(() => settle('silent'), waitMs || 3000);
      u.onstart = () => settle('started', profile && profile.voice ? profile.voice.name : '');
      u.onend = () => {
        alive.delete(u);
        notify();
        settle('started', profile && profile.voice ? profile.voice.name : '');
      };
      u.onerror = event => {
        alive.delete(u);
        notify();
        settle('error', event && event.error ? String(event.error) : 'unbekannt');
      };
      alive.add(u);
      unlocked = true;
      send(u);
      notify();
    }

    if (supported && typeof synth.addEventListener === 'function') {
      try { synth.addEventListener('voiceschanged', refreshVoices); } catch (_err) { /* älterer Browser */ }
    }

    return {
      supported,
      speak,
      stop,
      unlock,
      test,
      refreshVoices,
      isSpeaking: () => alive.size > 0,
      profiles: () => profiles
    };
  }

  return { speechText, speechChunks, germanVoices, assignVoices, createSpeaker };
});
