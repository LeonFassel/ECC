#!/usr/bin/env node
'use strict';

/**
 * Baut die App als passwortgeschützte statische Website (z. B. für GitHub Pages).
 * Die komplette App wird mit AES-GCM verschlüsselt (Schlüssel per PBKDF2 aus dem
 * Passwort); im Repository liegt nur der verschlüsselte Inhalt und eine kleine
 * Startseite, die nach Eingabe des Passworts im Browser entschlüsselt.
 *
 *   FL_SITE_PASSWORD='…' node apps/fahrlehrer-pruefung/build-site.js [zielordner]
 *
 * Standard-Ziel: docs/fahrlehrer (dazu docs/.nojekyll, damit GitHub Pages die
 * Dateien unverändert ausliefert). Das Passwort wird nie in eine Datei geschrieben.
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { build } = require('./build-standalone');

const MAGIC = Buffer.from('FLE1');
const ITERATIONS = 600000;
const MIN_PASSWORD_LENGTH = 12;
const TITLE = 'Fahrlehrer-Prüfungstrainer';

/** Format: "FLE1" | Iterationen (uint32 BE) | Salt (16) | IV (12) | Chiffretext + GCM-Tag (16). */
function encrypt(plaintext, password, options) {
  const opts = options || {};
  const iterations = opts.iterations || ITERATIONS;
  const salt = opts.salt || crypto.randomBytes(16);
  const iv = opts.iv || crypto.randomBytes(12);
  const key = crypto.pbkdf2Sync(Buffer.from(password, 'utf8'), salt, iterations, 32, 'sha256');
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const body = Buffer.concat([cipher.update(Buffer.from(plaintext, 'utf8')), cipher.final(), cipher.getAuthTag()]);
  const header = Buffer.alloc(4);
  header.writeUInt32BE(iterations, 0);
  return Buffer.concat([MAGIC, header, salt, iv, body]);
}

/** Gegenstück zur Entschlüsselung im Browser (für Tests und zur Kontrolle nach dem Bauen). */
function decrypt(payload, password) {
  if (!payload.subarray(0, 4).equals(MAGIC)) throw new Error('Unbekanntes Dateiformat');
  const iterations = payload.readUInt32BE(4);
  const salt = payload.subarray(8, 24);
  const iv = payload.subarray(24, 36);
  const body = payload.subarray(36);
  const key = crypto.pbkdf2Sync(Buffer.from(password, 'utf8'), salt, iterations, 32, 'sha256');
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(body.subarray(body.length - 16));
  return Buffer.concat([decipher.update(body.subarray(0, body.length - 16)), decipher.final()]).toString('utf8');
}

function loaderHtml(version) {
  const icon = `data:image/svg+xml;base64,${Buffer.from(fs.readFileSync(path.join(__dirname, 'public', 'icon.svg'))).toString('base64')}`;
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Prüfungstrainer">
<title>${TITLE}</title>
<link rel="icon" href="${icon}">
<link rel="apple-touch-icon" href="${icon}">
<style>
:root { --bg: #f4f6fb; --surface: #ffffff; --text: #0f172a; --muted: #5b6475; --border: #dfe4ee; --primary: #1d4ed8; --bad: #b42318; color-scheme: light dark; }
@media (prefers-color-scheme: dark) { :root { --bg: #0d1220; --surface: #151c2e; --text: #e7ebf4; --muted: #9aa4b8; --border: #273249; --primary: #7aa2ff; --bad: #ff8a80; } }
* { box-sizing: border-box; }
body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 16px; background: var(--bg); color: var(--text); font: 16px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
main { width: 100%; max-width: 380px; background: var(--surface); border: 1px solid var(--border); border-radius: 18px; padding: 24px; }
h1 { font-size: 1.3rem; margin: 0 0 6px; }
p { margin: 0 0 16px; color: var(--muted); }
label { display: block; font-weight: 600; margin-bottom: 6px; }
input[type=password] { width: 100%; font: inherit; padding: 12px 14px; border-radius: 12px; border: 1px solid var(--border); background: var(--bg); color: var(--text); }
.remember { display: flex; gap: 8px; align-items: center; font-weight: 400; margin: 12px 0 16px; color: var(--muted); }
button { width: 100%; font: inherit; font-weight: 700; padding: 12px; border: 0; border-radius: 12px; background: var(--primary); color: #fff; cursor: pointer; }
button:disabled { opacity: .6; cursor: wait; }
#msg { min-height: 1.5em; margin: 12px 0 0; color: var(--bad); }
</style>
</head>
<body>
<main>
  <h1>${TITLE}</h1>
  <p>Bitte das Passwort eingeben, um die App zu öffnen.</p>
  <form id="unlock">
    <label for="pw">Passwort</label>
    <input type="password" id="pw" autocomplete="current-password" required>
    <label class="remember"><input type="checkbox" id="remember" checked> Auf diesem Gerät merken</label>
    <button type="submit" id="go">Öffnen</button>
    <p id="msg" role="status"></p>
  </form>
</main>
<script>
(function () {
  'use strict';
  var FILE = 'app.bin?v=${version}';
  var STORE = 'fl-site-password';
  var form = document.getElementById('unlock');
  var input = document.getElementById('pw');
  var remember = document.getElementById('remember');
  var button = document.getElementById('go');
  var msg = document.getElementById('msg');

  function readStored() {
    try { return localStorage.getItem(STORE); } catch (e) { return null; }
  }
  function writeStored(value) {
    try { if (value) localStorage.setItem(STORE, value); else localStorage.removeItem(STORE); } catch (e) { /* privater Modus */ }
  }

  async function decrypt(password) {
    var response = await fetch(FILE);
    if (!response.ok) throw new Error('download');
    var data = new Uint8Array(await response.arrayBuffer());
    var magic = String.fromCharCode(data[0], data[1], data[2], data[3]);
    if (magic !== 'FLE1') throw new Error('format');
    var iterations = new DataView(data.buffer).getUint32(4);
    var salt = data.slice(8, 24);
    var iv = data.slice(24, 36);
    var body = data.slice(36);
    var base = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
    var key = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt: salt, iterations: iterations, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
    var plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, key, body);
    return new TextDecoder().decode(plain);
  }

  async function unlock(password, keep) {
    button.disabled = true;
    msg.textContent = '';
    button.textContent = 'Wird geöffnet …';
    try {
      var html = await decrypt(password);
      writeStored(keep ? password : null);
      document.open();
      document.write(html);
      document.close();
    } catch (err) {
      writeStored(null);
      button.disabled = false;
      button.textContent = 'Öffnen';
      msg.textContent = err && err.message === 'download'
        ? 'Die App konnte nicht geladen werden. Bitte Internetverbindung prüfen.'
        : 'Das Passwort stimmt nicht.';
      input.focus();
    }
  }

  if (!window.crypto || !crypto.subtle) {
    msg.textContent = 'Dieser Browser unterstützt die Entschlüsselung nicht. Bitte Safari oder Chrome in aktueller Version verwenden.';
    button.disabled = true;
    return;
  }
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    unlock(input.value, remember.checked);
  });
  var saved = readStored();
  if (saved) unlock(saved, true);
})();
</script>
</body>
</html>
`;
}

function buildSite(targetDir, password) {
  if (!password || password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(`FL_SITE_PASSWORD fehlt oder ist kürzer als ${MIN_PASSWORD_LENGTH} Zeichen.`);
  }
  const html = build();
  const payload = encrypt(html, password);
  if (decrypt(payload, password) !== html) throw new Error('Kontrolle der Verschlüsselung fehlgeschlagen.');
  const version = crypto.createHash('sha256').update(payload).digest('hex').slice(0, 12);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'app.bin'), payload);
  fs.writeFileSync(path.join(targetDir, 'index.html'), loaderHtml(version));
  return { version, bytes: payload.length };
}

if (require.main === module) {
  const target = path.resolve(process.argv[2] || path.join(__dirname, '..', '..', 'docs', 'fahrlehrer'));
  try {
    const result = buildSite(target, process.env.FL_SITE_PASSWORD);
    const nojekyll = path.join(path.dirname(target), '.nojekyll');
    if (!fs.existsSync(nojekyll)) fs.writeFileSync(nojekyll, '');
    console.log(`Geschrieben: ${target} (app.bin ${Math.round(result.bytes / 1024)} KB, Version ${result.version})`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

module.exports = { encrypt, decrypt, loaderHtml, buildSite, ITERATIONS };
