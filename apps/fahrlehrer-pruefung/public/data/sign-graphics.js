/**
 * Vektorgrafiken der Verkehrszeichen (vereinfachte Nachzeichnungen der
 * amtlichen Zeichen nach StVO Anlage 1 bis 3). Jede Grafik nutzt viewBox 0 0 200 200.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FLSignGraphics = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const RED = '#c8161d';
  const BLUE = '#0b5fa5';
  const YELLOW = '#f4c300';
  const BLACK = '#111111';
  const WHITE = '#ffffff';
  const ORANGE = '#f28c00';
  const GREEN = '#1f9d3a';
  const FONT = 'font-family="Arial, Helvetica, sans-serif" font-weight="700"';

  function svg(body, label) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" role="img" aria-label="${label}">${body}</svg>`;
  }

  // ---------------------------------------------------------------- Grundformen

  function warning(content) {
    return `<path d="M100 14 L188 168 Q190 176 182 176 L18 176 Q10 176 12 168 Z" fill="${RED}"/>
      <path d="M100 42 L163 154 L37 154 Z" fill="${WHITE}"/>${content}`;
  }

  function prohibition(content, inner) {
    return `<circle cx="100" cy="100" r="92" fill="${RED}"/>
      <circle cx="100" cy="100" r="74" fill="${inner || WHITE}"/>${content}`;
  }

  function blueRound(content) {
    return `<circle cx="100" cy="100" r="92" fill="${WHITE}"/><circle cx="100" cy="100" r="86" fill="${BLUE}"/>${content}`;
  }

  function blueSquare(content) {
    return `<rect x="10" y="10" width="180" height="180" rx="14" fill="${WHITE}"/>
      <rect x="16" y="16" width="168" height="168" rx="10" fill="${BLUE}"/>${content}`;
  }

  // ---------------------------------------------------------------- Sinnbilder

  function car(x, y, s, color) {
    const c = color || BLACK;
    return `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}">
      <path d="M2 34 L8 22 L30 18 L44 4 Q46 2 50 2 L84 2 Q88 2 90 5 L102 18 L116 21 Q120 22 120 27 L120 36 Q120 40 116 40 L4 40 Q0 40 2 34 Z"/>
      <path d="M50 8 L84 8 L94 18 L42 18 Z" fill="${WHITE}"/>
      <circle cx="28" cy="40" r="11"/><circle cx="94" cy="40" r="11"/>
      <circle cx="28" cy="40" r="4" fill="${WHITE}"/><circle cx="94" cy="40" r="4" fill="${WHITE}"/></g>`;
  }

  function truck(x, y, s, color) {
    const c = color || BLACK;
    return `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}">
      <rect x="34" y="0" width="86" height="40" rx="2"/>
      <path d="M2 40 L2 20 L10 8 L30 8 L30 40 Z"/>
      <path d="M8 22 L13 12 L25 12 L25 22 Z" fill="${WHITE}"/>
      <rect x="0" y="38" width="120" height="6"/>
      <circle cx="18" cy="46" r="9"/><circle cx="84" cy="46" r="9"/><circle cx="104" cy="46" r="9"/>
      <circle cx="18" cy="46" r="3" fill="${WHITE}"/><circle cx="84" cy="46" r="3" fill="${WHITE}"/><circle cx="104" cy="46" r="3" fill="${WHITE}"/></g>`;
  }

  function motorcycle(x, y, s) {
    return `<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${BLACK}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="36" r="13"/><circle cx="88" cy="36" r="13"/>
      <path d="M16 36 L40 20 L66 20 L88 36"/><path d="M40 20 L52 36 L66 20"/>
      <path d="M76 8 L82 14 L88 36"/>
      <path d="M38 14 L64 14" stroke-width="9"/>
      <path d="M52 2 Q60 0 62 8 L58 14" stroke-width="7"/></g>`;
  }

  function bus(x, y, s, color) {
    const c = color || WHITE;
    const hole = color === WHITE || !color ? BLUE : WHITE;
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <rect x="0" y="0" width="120" height="44" rx="6" fill="${c}"/>
      <rect x="8" y="7" width="18" height="15" fill="${hole}"/><rect x="32" y="7" width="18" height="15" fill="${hole}"/>
      <rect x="56" y="7" width="18" height="15" fill="${hole}"/><rect x="80" y="7" width="18" height="15" fill="${hole}"/>
      <rect x="104" y="7" width="12" height="26" fill="${hole}"/>
      <circle cx="24" cy="46" r="9" fill="${c}"/><circle cx="94" cy="46" r="9" fill="${c}"/>
      <circle cx="24" cy="46" r="3.5" fill="${hole}"/><circle cx="94" cy="46" r="3.5" fill="${hole}"/></g>`;
  }

  function bicycle(x, y, s, color) {
    const c = color || WHITE;
    return `<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${c}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="18" cy="40" r="17"/><circle cx="96" cy="40" r="17"/>
      <path d="M18 40 L44 14 L80 14 L96 40"/><path d="M44 14 L58 40 L80 14"/><path d="M18 40 L58 40"/>
      <path d="M36 6 L52 6" stroke-width="7"/><path d="M76 2 L82 2 L80 14"/></g>`;
  }

  function arrowUp(x, y, w, h, color) {
    const hw = w / 2;
    return `<path d="M${x} ${y} L${x + hw} ${y + h * 0.42} L${x + hw * 0.36} ${y + h * 0.42} L${x + hw * 0.36} ${y + h} L${x - hw * 0.36} ${y + h} L${x - hw * 0.36} ${y + h * 0.42} L${x - hw} ${y + h * 0.42} Z" fill="${color}"/>`;
  }

  function arrowDown(x, y, w, h, color) {
    return `<g transform="rotate(180 ${x} ${y + h / 2})">${arrowUp(x, y, w, h, color)}</g>`;
  }

  // ---------------------------------------------------------------- Zeichen

  const graphics = {
    101: svg(warning(`<rect x="92" y="72" width="16" height="50" rx="4" fill="${BLACK}"/><circle cx="100" cy="137" r="9" fill="${BLACK}"/>`), 'Zeichen 101 Gefahrstelle'),

    102: svg(warning(`<rect x="91" y="68" width="18" height="78" fill="${BLACK}"/><rect x="62" y="100" width="76" height="13" fill="${BLACK}"/>`), 'Zeichen 102 Kreuzung oder Einmündung mit Vorfahrt von rechts'),

    108: svg(warning(`<text x="100" y="98" ${FONT} font-size="24" text-anchor="middle" fill="${BLACK}">10%</text><path d="M54 110 L146 146 L54 146 Z" fill="${BLACK}"/>`), 'Zeichen 108 Gefälle'),

    110: svg(warning(`<text x="100" y="98" ${FONT} font-size="24" text-anchor="middle" fill="${BLACK}">10%</text><path d="M54 146 L146 110 L146 146 Z" fill="${BLACK}"/>`), 'Zeichen 110 Steigung'),

    112: svg(warning(`<path d="M50 146 L50 130 Q62 130 68 116 Q76 98 86 116 Q92 130 100 130 Q108 130 114 116 Q124 98 132 116 Q138 130 150 130 L150 146 Z" fill="${BLACK}"/>`), 'Zeichen 112 Unebene Fahrbahn'),

    205: svg(`<path d="M100 188 L12 32 Q10 24 18 24 L182 24 Q190 24 188 32 Z" fill="${RED}"/>
      <path d="M100 152 L42 46 L158 46 Z" fill="${WHITE}"/>`, 'Zeichen 205 Vorfahrt gewähren'),

    206: svg(`<polygon points="59,6 141,6 194,59 194,141 141,194 59,194 6,141 6,59" fill="${WHITE}"/>
      <polygon points="62,13 138,13 187,62 187,138 138,187 62,187 13,138 13,62" fill="${RED}"/>
      <text x="100" y="118" ${FONT} font-size="54" text-anchor="middle" fill="${WHITE}">STOP</text>`, 'Zeichen 206 Halt. Vorfahrt gewähren.'),

    215: svg(blueRound(`<g fill="none" stroke="${WHITE}" stroke-width="13" stroke-linecap="butt">
        <path d="M78 62 A44 44 0 0 1 140 92"/><path d="M146 116 A44 44 0 0 1 96 145"/><path d="M70 136 A44 44 0 0 1 62 78"/></g>
      <path d="M140 72 L156 100 L124 100 Z" fill="${WHITE}" transform="rotate(10 140 92)"/>
      <path d="M100 160 L74 148 L102 130 Z" fill="${WHITE}"/>
      <path d="M50 70 L80 58 L72 88 Z" fill="${WHITE}"/>`), 'Zeichen 215 Kreisverkehr'),

    244.1: svg(`<rect x="22" y="8" width="156" height="184" rx="10" fill="${BLACK}"/><rect x="26" y="12" width="148" height="176" rx="8" fill="${WHITE}"/>
      <circle cx="100" cy="82" r="58" fill="${BLUE}"/>${bicycle(43, 58, 1, WHITE)}
      <text x="100" y="170" ${FONT} font-size="21" text-anchor="middle" fill="${BLACK}">Fahrradstraße</text>`, 'Zeichen 244.1 Beginn einer Fahrradstraße'),

    245: svg(blueSquare(`${bus(40, 52, 1, WHITE)}<text x="100" y="160" ${FONT} font-size="40" text-anchor="middle" fill="${WHITE}">BUS</text>`), 'Zeichen 245 Bussonderfahrstreifen'),

    250: svg(prohibition(''), 'Zeichen 250 Verbot für Fahrzeuge aller Art'),

    251: svg(prohibition(car(40, 76, 1)), 'Zeichen 251 Verbot für Kraftwagen und sonstige mehrspurige Kraftfahrzeuge'),

    253: svg(prohibition(truck(40, 74, 1)), 'Zeichen 253 Verbot für Kraftfahrzeuge über 3,5 t'),

    260: svg(prohibition(`${motorcycle(58, 44, 0.82)}${car(52, 108, 0.8)}`), 'Zeichen 260 Verbot für Kraftfahrzeuge'),

    261: svg(prohibition(`<rect x="52" y="74" width="96" height="52" fill="${ORANGE}" stroke="${BLACK}" stroke-width="6"/>`), 'Zeichen 261 Verbot für kennzeichnungspflichtige Kraftfahrzeuge mit gefährlichen Gütern'),

    264: svg(prohibition(`<path d="M30 100 L62 80 L62 120 Z" fill="${BLACK}"/><path d="M170 100 L138 80 L138 120 Z" fill="${BLACK}"/>
      <text x="100" y="114" ${FONT} font-size="40" text-anchor="middle" fill="${BLACK}">2m</text>`), 'Zeichen 264 Verbot für Fahrzeuge über angegebener tatsächlicher Breite'),

    266: svg(prohibition(`<path d="M34 128 L34 148 M166 128 L166 148 M40 138 L160 138" stroke="${BLACK}" stroke-width="5" fill="none"/>
      <path d="M36 138 L52 130 L52 146 Z M164 138 L148 130 L148 146 Z" fill="${BLACK}"/>
      ${truck(52, 66, 0.8)}<text x="100" y="64" ${FONT} font-size="30" text-anchor="middle" fill="${BLACK}">10m</text>`), 'Zeichen 266 Verbot für Fahrzeuge über angegebener tatsächlicher Länge'),

    268: svg(blueRound(`<circle cx="100" cy="100" r="50" fill="none" stroke="${WHITE}" stroke-width="20"/>
      <circle cx="100" cy="100" r="22" fill="${WHITE}"/>
      <g stroke="${BLUE}" stroke-width="5">${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<path d="M100 44 L100 62" transform="rotate(${a} 100 100)"/>`).join('')}</g>
      <circle cx="100" cy="100" r="62" fill="none" stroke="${WHITE}" stroke-width="4" stroke-dasharray="10 7"/>`), 'Zeichen 268 Schneeketten vorgeschrieben'),

    273: svg(prohibition(`${truck(30, 62, 0.62)}${truck(108, 62, 0.62)}
      <text x="100" y="140" ${FONT} font-size="34" text-anchor="middle" fill="${BLACK}">50m</text>`), 'Zeichen 273 Verbot des Unterschreitens des angegebenen Mindestabstandes'),

    274: svg(prohibition(`<text x="100" y="124" ${FONT} font-size="72" text-anchor="middle" fill="${BLACK}">70</text>`), 'Zeichen 274 Zulässige Höchstgeschwindigkeit'),

    283: svg(`<circle cx="100" cy="100" r="92" fill="${RED}"/><circle cx="100" cy="100" r="74" fill="${BLUE}"/>
      <path d="M48 48 L152 152 M152 48 L48 152" stroke="${RED}" stroke-width="18"/>`, 'Zeichen 283 Absolutes Haltverbot'),

    286: svg(`<circle cx="100" cy="100" r="92" fill="${RED}"/><circle cx="100" cy="100" r="74" fill="${BLUE}"/>
      <path d="M48 48 L152 152" stroke="${RED}" stroke-width="18"/>`, 'Zeichen 286 Eingeschränktes Haltverbot'),

    294: svg(`<rect x="0" y="0" width="200" height="200" rx="14" fill="#5d6470"/>
      <path d="M100 6 L100 92" stroke="${WHITE}" stroke-width="5" stroke-dasharray="18 14"/>
      <rect x="104" y="96" width="90" height="16" fill="${WHITE}"/>
      ${arrowUp(150, 128, 34, 62, WHITE)}`, 'Zeichen 294 Haltlinie'),

    301: svg(warning(`<rect x="89" y="66" width="22" height="82" fill="${BLACK}"/><rect x="66" y="98" width="68" height="8" fill="${BLACK}"/>`), 'Zeichen 301 Vorfahrt'),

    306: svg(`<path d="M100 6 L194 100 L100 194 L6 100 Z" fill="${WHITE}" stroke="#9aa0a6" stroke-width="2"/>
      <path d="M100 38 L162 100 L100 162 L38 100 Z" fill="${YELLOW}"/>`, 'Zeichen 306 Vorfahrtstraße'),

    307: svg(`<defs><clipPath id="vz307"><path d="M100 38 L162 100 L100 162 L38 100 Z"/></clipPath></defs>
      <path d="M100 6 L194 100 L100 194 L6 100 Z" fill="${WHITE}" stroke="#9aa0a6" stroke-width="2"/>
      <path d="M100 38 L162 100 L100 162 L38 100 Z" fill="${YELLOW}"/>
      <g clip-path="url(#vz307)" stroke="${BLACK}" stroke-width="7">${[-36, -18, 0, 18, 36].map(o => `<path d="M${30 + o} ${170 + o} L${170 + o} ${30 + o}"/>`).join('')}</g>`, 'Zeichen 307 Ende der Vorfahrtstraße'),

    308: svg(blueSquare(`${arrowUp(76, 42, 58, 118, WHITE)}${arrowDown(132, 70, 38, 90, RED)}`), 'Zeichen 308 Vorrang vor dem Gegenverkehr'),

    310: svg(`<rect x="4" y="38" width="192" height="124" rx="10" fill="${BLACK}"/><rect x="10" y="44" width="180" height="112" rx="7" fill="${YELLOW}"/>
      <text x="100" y="104" ${FONT} font-size="26" text-anchor="middle" fill="${BLACK}">Musterstadt</text>
      <text x="100" y="138" font-family="Arial, Helvetica, sans-serif" font-size="18" text-anchor="middle" fill="${BLACK}">Kreis Beispiel</text>`, 'Zeichen 310 Ortstafel Vorderseite'),

    314: svg(blueSquare(`<text x="100" y="146" ${FONT} font-size="130" text-anchor="middle" fill="${WHITE}">P</text>`), 'Zeichen 314 Parken'),

    330.1: svg(blueSquare(`<path d="M30 168 L84 70 L94 70 L66 168 Z M170 168 L116 70 L106 70 L134 168 Z" fill="${WHITE}"/>
      <path d="M98 168 L98 150 M100 136 L100 120 M100 108 L100 96 M100 86 L100 78" stroke="${WHITE}" stroke-width="5"/>
      <path d="M30 58 Q100 22 170 58 L170 76 Q100 42 30 76 Z" fill="${WHITE}"/>`), 'Zeichen 330.1 Autobahn'),

    341: svg(`<rect x="0" y="0" width="200" height="200" rx="14" fill="#5d6470"/>
      <path d="M100 6 L100 92" stroke="${WHITE}" stroke-width="5" stroke-dasharray="18 14"/>
      <path d="M106 104 L194 104" stroke="${WHITE}" stroke-width="12" stroke-dasharray="14 9"/>
      ${arrowUp(150, 128, 34, 62, WHITE)}`, 'Zeichen 341 Wartelinie'),

    625: svg(`<rect x="6" y="56" width="188" height="88" rx="6" fill="${RED}"/>
      <g fill="${WHITE}">${[0, 1, 2].map(i => `<path d="M${46 + i * 52} 66 L${74 + i * 52} 66 L${44 + i * 52} 100 L${74 + i * 52} 134 L${46 + i * 52} 134 L${16 + i * 52} 100 Z"/>`).join('')}</g>`, 'Zeichen 625 Richtungstafel in Kurven'),

    720: svg(`<rect x="26" y="52" width="148" height="96" rx="8" fill="${BLACK}"/>
      <path d="M48 92 L118 92 L118 72 L154 100 L118 128 L118 108 L48 108 Z" fill="${GREEN}"/>`, 'Zeichen 720 Grünpfeil')
  };

  // Überholverbot: rotes Auto links, schwarzes Auto rechts (Ansicht von hinten).
  function carRear(x, y, color) {
    return `<g transform="translate(${x} ${y})" fill="${color}">
      <path d="M12 0 L44 0 Q48 0 50 4 L56 20 L0 20 L6 4 Q8 0 12 0 Z"/>
      <rect x="-4" y="18" width="64" height="26" rx="5"/>
      <rect x="0" y="40" width="13" height="14" rx="3"/><rect x="43" y="40" width="13" height="14" rx="3"/>
      <rect x="2" y="24" width="10" height="7" rx="2" fill="${WHITE}"/><rect x="44" y="24" width="10" height="7" rx="2" fill="${WHITE}"/></g>`;
  }
  graphics[276] = svg(prohibition(`${carRear(34, 74, RED)}${carRear(110, 74, BLACK)}`), 'Zeichen 276 Überholverbot für Kraftfahrzeuge aller Art');

  // Kraftfahrstraße: weißes Auto auf blauem Grund.
  graphics[331.1] = svg(blueSquare(`<g transform="translate(36 78) scale(1.07)" fill="${WHITE}">
      <path d="M2 34 L8 22 L30 18 L44 4 Q46 2 50 2 L84 2 Q88 2 90 5 L102 18 L116 21 Q120 22 120 27 L120 36 Q120 40 116 40 L4 40 Q0 40 2 34 Z"/>
      <path d="M50 8 L84 8 L94 18 L42 18 Z" fill="${BLUE}"/>
      <circle cx="28" cy="40" r="11"/><circle cx="94" cy="40" r="11"/>
      <circle cx="28" cy="40" r="4" fill="${BLUE}"/><circle cx="94" cy="40" r="4" fill="${BLUE}"/></g>`),
  'Zeichen 331.1 Kraftfahrstraße');

  // Verkehrsberuhigter Bereich: Haus, Erwachsener, Kind mit Ball, Auto.
  graphics[325.1] = svg(`<rect x="4" y="30" width="192" height="140" rx="12" fill="${WHITE}"/><rect x="10" y="36" width="180" height="128" rx="8" fill="${BLUE}"/>
    <path d="M20 98 L50 70 L80 98 L80 152 L20 152 Z" fill="none" stroke="${WHITE}" stroke-width="5"/>
    <rect x="42" y="120" width="16" height="32" fill="${WHITE}"/>
    <g fill="${WHITE}">
      <circle cx="102" cy="74" r="8"/><path d="M96 84 L110 84 L112 116 L116 152 L108 152 L103 122 L99 152 L91 152 L94 116 Z"/>
      <circle cx="132" cy="106" r="6"/><path d="M127 114 L138 114 L139 134 L142 152 L135 152 L132 136 L129 152 L123 152 L126 134 Z"/>
      <circle cx="156" cy="146" r="6"/>
      <g transform="translate(130 54) scale(0.42)"><path d="M2 34 L8 22 L30 18 L44 4 Q46 2 50 2 L84 2 Q88 2 90 5 L102 18 L116 21 Q120 22 120 27 L120 36 Q120 40 116 40 L4 40 Q0 40 2 34 Z"/>
      <circle cx="28" cy="40" r="11"/><circle cx="94" cy="40" r="11"/></g>
    </g>`, 'Zeichen 325.1 Beginn eines verkehrsberuhigten Bereichs');

  return { graphics };
});
