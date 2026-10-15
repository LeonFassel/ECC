#!/usr/bin/env node
'use strict';

/**
 * Baut die App als eine einzige HTML-Datei (ohne Server nutzbar, z. B. zum
 * Hosten als statische Seite). KI-Funktionen sind in dieser Variante aus.
 *
 *   node apps/fahrlehrer-pruefung/build-standalone.js <ziel.html> [--fragment]
 *
 * --fragment lässt <!doctype>, <html>, <head> und <body> weg – für Hoster, die
 * das Grundgerüst selbst ergänzen.
 */

const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, 'public');
const SCRIPTS = [
  'data/questions-muendlich.js',
  'data/questions-technik.js',
  'data/signs.js',
  'data/sign-graphics.js',
  'data/questions.js',
  'core/learning-core.js',
  'core/ai-prompts.js',
  'app.js'
];
const TITLE = 'Fahrlehrer-Prüfungstrainer';

function read(relative) {
  return fs.readFileSync(path.join(PUBLIC_DIR, relative), 'utf8');
}

function inlineScript(source) {
  return `<script>\n${source.replace(/<\/script/gi, '<\\/script')}\n</script>`;
}

function build(options) {
  const opts = options || {};
  const index = read('index.html');
  const iconUri = `data:image/svg+xml;base64,${Buffer.from(read('icon.svg')).toString('base64')}`;
  const bodyStart = index.indexOf('<body>') + '<body>'.length;
  const bodyEnd = index.indexOf('<script');
  const markup = index.slice(bodyStart, bodyEnd).trim().replace('src="icon.svg"', `src="${iconUri}"`);
  const scripts = SCRIPTS.map(file => inlineScript(read(file))).join('\n');
  const style = `<style>\n${read('styles.css')}</style>`;

  if (opts.fragment) {
    return [
      `<title>${TITLE}</title>`,
      '<meta name="claude:viewport-fit-sides" content="cover">',
      style,
      markup,
      scripts,
      ''
    ].join('\n');
  }

  return [
    '<!doctype html>',
    '<html lang="de">',
    '<head>',
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">',
    `<title>${TITLE}</title>`,
    `<link rel="icon" href="${iconUri}">`,
    style,
    '</head>',
    '<body>',
    markup,
    scripts,
    '</body>',
    '</html>',
    ''
  ].join('\n');
}

if (require.main === module) {
  const target = process.argv[2];
  if (!target) {
    console.error('Aufruf: node build-standalone.js <ziel.html> [--fragment]');
    process.exit(1);
  }
  fs.writeFileSync(target, build({ fragment: process.argv.includes('--fragment') }));
  console.log(`Geschrieben: ${target}`);
}

module.exports = { build };
