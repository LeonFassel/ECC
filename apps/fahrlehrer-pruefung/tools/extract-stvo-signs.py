#!/usr/bin/env python3
"""
Erzeugt die Verkehrszeichen-Daten der App aus der StVO-Unterlage (PDF mit den
Anlagen 1 bis 4: Zeichen, Bild, Ge- oder Verbote, Erläuterungen).

    python3 tools/extract-stvo-signs.py <stvo.pdf>

Schreibt:
    public/data/signs-stvo.js    alle Zeichen mit amtlichem Text und Kernpunkten
    public/data/sign-images.js   Original-Abbildungen (verlustfrei als WebP)

Benötigt: PyMuPDF (pip install pymupdf) und Pillow.
Die Bilder werden unverändert übernommen (nur das Dateiformat wird verlustfrei
gewandelt). Texte stammen wörtlich aus der Vorlage; offensichtliche Tippfehler
werden in TEXT_FIXES korrigiert.
"""

import base64
import io
import json
import re
import sys
from pathlib import Path

import pymupdf
from PIL import Image

APP_DIR = Path(__file__).resolve().parent.parent
OUT_SIGNS = APP_DIR / 'public' / 'data' / 'signs-stvo.js'
OUT_IMAGES = APP_DIR / 'public' / 'data' / 'sign-images.js'

NUM = re.compile(r'^\d+(\.\d+)?,?$')
HEADER = {'lfd.', 'Nr.', 'Zeichen und', 'Zusatzzeichen', 'Ge- oder Verbote', 'Erläuterungen'}
DROP_MID = {'Vorschriftzeichen', 'Richtzeichen', 'Verkehrseinrichtungen'}

ANLAGEN = {
    1: 'Gefahrzeichen (Anlage 1)',
    2: 'Vorschriftzeichen (Anlage 2)',
    3: 'Richtzeichen (Anlage 3)',
    4: 'Verkehrseinrichtung (Anlage 4)',
}

# Zwischenüberschriften der Vorlage, die am Ende eines Textes hängen.
TRAILING_HEADINGS = [
    '1. Nummernschilder',
    '2. Wegweiser außerhalb von Autobahnen a) Vorwegweiser',
    'b) Pfeilwegweiser',
    'c) Tabellenwegweiser',
    'd) Ausfahrttafel',
    'e) Straßennamensschilder',
    '3. Wegweiser auf Autobahnen a) Ankündigungstafeln',
    'b) Vorwegweiser',
    'c) Ausfahrttafel',
    'd) Entfernungstafel',
    '1. Umleitung außerhalb von Autobahnen a) Umleitungen für bestimmte Verkehrsarten',
    'b) Temporäre Umleitungen (z. B. infolge von Baumaßnahmen)',
    '2. Bedarfsumleitung für den Autobahnverkehr',
    '1. Umlenkungspfeil',
    '2. Verkehrslenkungstafeln',
    '3. Blockumfahrung',
]

TEXT_FIXES = [
    ('mit mehr als 20 I wassergefährdender', 'mit mehr als 20 l wassergefährdender'),
    ('innerhalb eines Umkreise von 75 km', 'innerhalb eines Umkreises von 75 km'),
    ('hervor.Im Fall', 'hervor. Im Fall'),
]

# Namen für Zeilen, deren Bezeichnung in der Vorlage nur als Überschrift
# oder gar nicht neben dem Bild steht. Schlüssel: (Anlage, laufende Nummer).
NAMES = {
    (2, '2.1'): ('Zusatzzeichen', 'Radverkehr von links und rechts (zu Zeichen 205)'),
    (2, '2.2'): ('Zusatzzeichen', 'Straßenbahn (zu Zeichen 205)'),
    (2, '3.1'): ('Zusatzzeichen', 'Haltgebot in 100 m („STOP 100 m“, zu Zeichen 205)'),
    (2, '3.2'): ('Zusatzzeichen', 'Radverkehr von links und rechts (zu Zeichen 206)'),
    (2, 'Zu 2 und 3'): ('Zusatzzeichen', 'Abknickende Vorfahrt (zu Zeichen 205 oder 206)'),
    (2, '9'): ('Zeichen', 'Einbahnstraße'),
    (2, '9.1'): ('Zusatzzeichen', 'Radverkehr in der Gegenrichtung (zu Zeichen 220)'),
    (2, '11.1'): ('Zusatzzeichen', '„Ende in … m“ (zu Zeichen 223.1)'),
    (2, '25.1'): ('Zusatzzeichen', 'Elektrisch betriebene Fahrzeuge frei (zu Zeichen 245)'),
    (2, '27'): ('Zusatzzeichen', 'Massenangabe „7,5 t“ (zu Verkehrsverboten)'),
    (2, '27.1'): ('Zusatzzeichen', 'Elektrisch betriebene Fahrzeuge frei (zu Verkehrsverboten)'),
    (2, '30.1'): ('Zusatzzeichen', '„Durchgangsverkehr“ mit „7,5 t“ (zu Zeichen 253)'),
    (2, '41.1'): ('Zusatzzeichen', 'Radverkehr frei (zu Zeichen 267)'),
    (2, '44'): ('Zeichen', 'Beginn einer Verkehrsverbotszone zur Verminderung schädlicher Luftverunreinigungen in einer Zone (Umweltzone)'),
    (2, '45'): ('Zeichen', 'Ende einer Verkehrsverbotszone zur Verminderung schädlicher Luftverunreinigungen in einer Zone (Umweltzone)'),
    (2, '46'): ('Zusatzzeichen', 'Freistellung vom Verkehrsverbot nach § 40 Absatz 1 des Bundes-Immissionsschutzgesetzes (Plakette, zu Zeichen 270.1)'),
    (2, '49.1'): ('Zusatzzeichen', '„bei Nässe“ (zu Zeichen 274)'),
    (2, '54.1'): ('Zusatzzeichen', 'Massenangabe „2,8 t“ (zu Zeichen 277)'),
    (2, '54.2'): ('Zusatzzeichen', '„auch“ Kraftomnibusse und Pkw mit Anhänger (zu Zeichen 277)'),
    (2, '54.3'): ('Zusatzzeichen', 'Längenangabe (zu Zeichen 274, 276, 277, 277.1)'),
    (2, '62.1'): ('Zusatzzeichen', 'Haltverbot auch auf dem Seitenstreifen (zu Zeichen 283)'),
    (2, '62.2'): ('Zusatzzeichen', '„auf dem Seitenstreifen“ (zu Zeichen 283)'),
    (2, '63.1'): ('Zusatzzeichen', 'Haltverbot auch auf dem Seitenstreifen (zu Zeichen 286)'),
    (2, '63.2'): ('Zusatzzeichen', '„auf dem Seitenstreifen“ (zu Zeichen 286)'),
    (2, '63.3'): ('Zusatzzeichen', 'Schwerbehinderte mit Parkausweis frei (zu Zeichen 286)'),
    (2, '63.4'): ('Zusatzzeichen', '„Bewohner mit Parkausweis frei“ (zu Zeichen 286)'),
    (2, '63.5'): ('Zusatzzeichen', 'Elektrisch betriebene Fahrzeuge frei (zu Zeichen 286)'),
    (2, '63.6'): ('Zusatzzeichen', 'Carsharingfahrzeuge frei (zu Zeichen 286)'),
    (2, '64.1'): ('Zusatzzeichen', 'Elektrisch betriebene Fahrzeuge frei (zu Zeichen 290.1)'),
    (2, '64.2'): ('Zusatzzeichen', 'Carsharingfahrzeuge frei (zu Zeichen 290.1)'),
    (2, '69'): ('Zeichen', 'Einseitige Fahrstreifenbegrenzung'),
    (2, '74'): ('Markierung', 'Parkflächenmarkierung'),
    (3, '2.1'): ('Zusatzzeichen', 'Abknickende Vorfahrt (zu Zeichen 306)'),
    (3, '11'): ('Bild', 'Parkscheibe'),
    (3, '43'): ('Zeichen', 'Vorwegweiser'),
    (3, '44'): ('Zeichen', 'Vorwegweiser'),
    (3, '45'): ('Zeichen', 'Vorwegweiser'),
    (3, '46'): ('Zeichen', 'Vorwegweiser'),
    (3, '47'): ('Zeichen', 'Pfeilwegweiser auf Bundesstraßen'),
    (3, '48'): ('Zeichen', 'Pfeilwegweiser auf sonstigen Straßen'),
    (3, '49'): ('Zeichen', 'Pfeilwegweiser auf sonstigen Straßen mit geringerer Verkehrsbedeutung'),
    (3, '50'): ('Zeichen', 'Pfeilwegweiser zur Autobahn'),
    (3, '51'): ('Zeichen', 'Pfeilwegweiser zu Zielen mit erheblicher Verkehrsbedeutung'),
    (3, '52'): ('Zeichen', 'Tabellenwegweiser'),
    (3, '53'): ('Zeichen', 'Ausfahrttafel (Kraftfahrstraße oder autobahnähnlich ausgebaute Straße)'),
    (3, '54'): ('Zeichen', 'Straßennamensschild'),
    (3, '55'): ('Zeichen', 'Ankündigungstafel (Autobahnausfahrt, -kreuz oder -dreieck)'),
    (3, '56'): ('Sinnbild', 'Ausfahrt (auf Ankündigungstafeln der Autobahn)'),
    (3, '57'): ('Sinnbild', 'Autobahnkreuz oder Autobahndreieck (auf Ankündigungstafeln)'),
    (3, '58'): ('Zeichen', 'Ankündigung eines Autohofs'),
    (3, '59'): ('Zeichen', 'Vorwegweiser auf Autobahnen'),
    (3, '60'): ('Zeichen', 'Ausfahrttafel auf Autobahnen'),
    (3, '61'): ('Zeichen', 'Entfernungstafel'),
    (3, '62'): ('Zeichen', 'Vorwegweiser für bestimmte Verkehrsarten'),
    (3, '63'): ('Zeichen', 'Pfeilwegweiser für bestimmte Verkehrsarten'),
    (3, '64'): ('Zeichen', 'Wegweiser für bestimmte Verkehrsarten'),
    (3, '66'): ('Zeichen', 'Umleitungswegweiser'),
    (3, '67'): ('Zeichen', 'Fortsetzung der Umleitung'),
    (3, '69'): ('Zeichen', 'Umleitungsankündigung'),
    (3, '72'): ('Zeichen', 'Planskizze (Ankündigung einer Umleitung)'),
    (3, '74'): ('Zeichen', 'Ende der Umleitung'),
    (3, '75'): ('Zeichen', 'Ende der Umleitung'),
    (3, '79'): ('Zeichen', 'Ende einer Streckenempfehlung'),
    (3, '82.1'): ('Zusatzzeichen', '„Reißverschluss erst in … m“ (zu Zeichen 531)'),
    (4, '2'): ('Zeichen', 'Leitbake (Pfeilbake, Schraffenbake)'),
    (4, '3'): ('Zeichen', 'Leitschwelle mit Pfeilbake oder Schraffenbake'),
    (4, '4'): ('Zeichen', 'Leitbord mit Pfeilbake oder Schraffenbake'),
    (4, '11'): ('Zeichen', 'Leitpfosten'),
}

# Zeichennummern, die in der Vorlage nicht neben dem Bild stehen.
NUMBERS = {(2, '54.4'): '277.1'}

# Allgemeine Regeln („zu 36 bis 40“ usw.), die für mehrere Zeichen gelten.
# Schlüssel: (Anlage, Bezeichnung der allgemeinen Zeile) -> laufende Nummern.
GENERAL = {
    (2, 'zu 5 bis 7'): ['5', '6', '7'],
    (2, 'Zu 11 bis 13'): ['11', '12', '13'],
    (2, '26'): ['28', '29', '30', '31', '32', '33', '34', '35'],
    (2, 'zu 36 bis 40'): ['36', '37', '38', '39', '40'],
    (2, 'Zu 53, 54 und 54.4'): ['53', '54', '54.4'],
    (2, '55'): ['49', '53', '54', '54.4', '56', '58', '59', '59.1', '60'],
    (2, '61'): ['62', '63'],
    (3, 'zu 5 und 6'): ['5', '6'],
    (3, 'zu 28 und 29'): ['28', '29'],
    (3, 'zu 31 und 32'): ['31', '32'],
    (3, 'zu 47 bis 49'): ['47', '48', '49'],
    (3, 'zu 55 und 58'): ['55', '58'],
    (3, 'zu 66 und 67'): ['66', '67'],
    (3, '80'): ['81', '82'],
    (4, 'zu 1 bis 7'): ['1', '2', '3', '4', '5', '6', '7'],
}

# Zusammengehörige Satzteile der Umleitungsbeschilderung (Anlage 3, lfd. 65 bis 75).
UMLEITUNG = {
    '66': 'Der Verlauf einer temporären Umleitungsstrecke (z. B. infolge von Baumaßnahmen) kann durch den Umleitungswegweiser (Zeichen 454) oder durch Zeichen 455.1 „Fortsetzung der Umleitung“ gekennzeichnet werden.',
    '67': 'Der Verlauf einer temporären Umleitungsstrecke (z. B. infolge von Baumaßnahmen) kann durch Zeichen 454 oder durch Zeichen 455.1 „Fortsetzung der Umleitung“ gekennzeichnet werden. Die temporäre Umleitung kann auch durch Zeichen 455.1 angekündigt sein, jedoch nur mit Entfernungsangabe auf einem Zusatzzeichen und bei Bedarf mit Zielangabe auf einem zusätzlichen Schild über dem Zeichen.',
    '69': 'Die temporäre Umleitung kann durch die Umleitungsankündigung (Zeichen 457.1) angekündigt sein, jedoch nur mit Entfernungsangabe auf einem Zusatzzeichen und bei Bedarf mit Zielangabe auf einem zusätzlichen Schild über dem Zeichen.',
    '72': 'Die Ankündigung einer temporären Umleitung kann auch durch eine Planskizze (Zeichen 458) erfolgen.',
    '74': 'Das Ende der Umleitung kann durch Zeichen 457.2 oder durch Zeichen 455.2 angezeigt werden.',
    '75': 'Das Ende der Umleitung kann durch Zeichen 457.2 oder durch Zeichen 455.2 angezeigt werden.',
}

STOP = set('''
wer ein eine einer eines einen einem der die das den dem des und oder auch nur nicht darf muss
ist sind wird werden kann können von vom zum zur mit für auf bei bis zu über unter vor nach
in im an am als wie so dass wenn dies diese dieses dieser durch sowie ab hier dabei dann
fahrzeug fahrzeuge fahrzeugen führt zeichen zusatzzeichen gilt angeordnet angegebenen jeweiligen
jeweils gekennzeichneten innerhalb außerhalb ganz teilweise erforderlichenfalls insbesondere
beginn ende einer bestimmte bestimmten sonstige sonstigen andere anderer anderen anderes verbot
dadurch diesem diesen steht stehen stellen zusammen bedeutet bedeutung weist dient angezeigt
nachfolgenden gekennzeichnet einschließlich ausgenommen erlaubt verboten zeigt zeigen links rechts
'''.split())

# Wörter, die in vielen Zeichentexten vorkommen, taugen nicht als Schlüsselwort.
DOC_FREQ = {}
GENERIC_LIMIT = 14


def words_in(text):
    return {w.lower() for w in re.findall(r'[A-Za-zÄÖÜäöüß][A-Za-zÄÖÜäöüß\-]{3,}', text)}


def compute_doc_freq(cards):
    for card in cards:
        text = card['name'] + ' ' + ' '.join(s['text'] for s in card['official'])
        for w in words_in(text):
            DOC_FREQ[w] = DOC_FREQ.get(w, 0) + 1


def fix_text(text):
    for old, new in TEXT_FIXES:
        text = text.replace(old, new)
    return text


def strip_headings(text):
    changed = True
    while changed:
        changed = False
        for heading in TRAILING_HEADINGS:
            if text.endswith(' ' + heading) or text == heading:
                text = text[: len(text) - len(heading)].rstrip()
                changed = True
    return text


def join_lines(lines, caption=False):
    out = ''
    for line in lines:
        line = line.strip()
        if not out:
            out = line
            continue
        first = line.split(' ')[0]
        last = out.split(' ')[-1]
        if out.endswith('-'):
            if first in ('oder', 'und', 'bzw.', 'sowie', 'bis'):
                out += ' ' + line
            elif first[:1].islower() and '-' not in last[:-1]:
                out = out[:-1] + line
            else:
                out += line
        elif caption and first[:1].islower() and len(last) >= 18 and first not in ('zur', 'in', 'von', 'mit', 'für'):
            out += line
        else:
            out += ' ' + line
    return re.sub(r'\s+', ' ', out).strip()


def read_items(doc):
    items = []
    for pno, page in enumerate(doc):
        for img in page.get_image_info(xrefs=True):
            if img['width'] > 1000:
                continue
            x0, y0 = img['bbox'][0], img['bbox'][1]
            items.append({'page': pno, 'y': y0, 'sy': y0 + 8, 'x0': x0, 'kind': 'img', 'xref': img['xref']})
        for block in page.get_text('dict')['blocks']:
            if block.get('type') != 0:
                continue
            for line in block['lines']:
                text = ''.join(s['text'] for s in line['spans']).strip()
                x0, y0 = line['bbox'][0], line['bbox'][1]
                if not text or 'Copyright' in text or y0 > 780:
                    continue
                items.append({'page': pno, 'y': y0, 'sy': y0, 'x0': x0, 'kind': 'txt', 'text': text})
    items.sort(key=lambda i: (i['page'], round(i['sy']), i['x0']))
    return items


def read_rows(items):
    anlage = None
    section = None
    rows = []
    cur = None
    used = set()
    for idx, it in enumerate(items):
        if idx in used:
            continue
        if it['kind'] == 'txt':
            t = it['text']
            m = re.match(r'^Anlage (\d)', t)
            if m and it['x0'] > 100:
                anlage = int(m.group(1))
                continue
            if t.startswith('Abschnitt') and it['x0'] < 300:
                parts = [t]
                for j in range(idx + 1, min(idx + 8, len(items))):
                    nj = items[j]
                    if (nj['kind'] == 'txt' and nj['page'] == it['page'] and abs(nj['x0'] - it['x0']) < 3
                            and 0 < nj['y'] - it['y'] < 40 and not nj['text'].lower().startswith('zu')
                            and not NUM.match(nj['text'])):
                        parts.append(nj['text'])
                        used.add(j)
                section = ' '.join(parts)
                continue
            if t in HEADER and it['y'] < 200 and it['x0'] < 460:
                continue
            if it['x0'] < 100 and (NUM.match(t) or t.lower().startswith('zu')):
                label = [t]
                if t.lower().startswith('zu'):
                    for j in range(idx + 1, min(idx + 40, len(items))):
                        nj = items[j]
                        if nj['kind'] == 'txt' and nj['page'] == it['page'] and nj['x0'] < 100 and 0 < nj['y'] - it['y'] < 60:
                            label.append(nj['text'])
                            used.add(j)
                cur = {'anlage': anlage, 'section': section, 'lfd': ' '.join(label), 'mid': [], 'right': [], 'imgs': []}
                rows.append(cur)
                continue
        if cur is None:
            continue
        if it['kind'] == 'img':
            cur['imgs'].append(it['xref'])
        elif it['x0'] >= 258:
            cur['right'].append(it['text'])
        elif it['x0'] >= 100 and it['text'] not in DROP_MID:
            cur['mid'].append(it['text'])
    return rows


def segments_of(lines):
    segs = []
    cur = None
    for line in lines:
        if re.match(r'^(Ge- oder Verbote?|Erläuterung)$', line):
            cur = {'type': 'gebot' if line.startswith('Ge-') else 'erlaeuterung', 'lines': []}
            segs.append(cur)
        elif line.startswith('Parkflächenmarkierung'):
            continue
        else:
            if cur is None:
                cur = {'type': 'gebot', 'lines': []}
                segs.append(cur)
            cur['lines'].append(line)
    out = []
    for s in segs:
        text = strip_headings(fix_text(join_lines(s['lines'])))
        if text:
            out.append({'type': s['type'], 'text': text})
    return out


def split_items(text):
    """Teilt einen Regeltext in nummerierte Punkte bzw. Sätze."""
    parts = re.split(r'(?:(?<=^)|(?<=[.:;] ))(?=\d+\. (?:[a-z]\) )?[A-ZÄÖÜ„"(§a-z])', text)
    items = []
    for part in parts:
        part = part.strip()
        if not part:
            continue
        sub = re.split(r'(?<=[.;]) (?=[a-z]\) )', part)
        for s in sub:
            s = s.strip()
            if len(s) > 3:
                items.append(s)
    return items


def keywords_of(text, limit=4):
    words = re.findall(r'[A-Za-zÄÖÜäöüß][A-Za-zÄÖÜäöüß\-]{3,}|\d+(?:,\d+)?\s?(?:m|t|km/h|km)\b', text)
    seen = []
    for w in words:
        lw = w.lower().strip('-')
        if lw in STOP or len(lw) < 4 and not re.match(r'\d', lw):
            continue
        if not re.match(r'\d', lw) and DOC_FREQ.get(lw, 0) > GENERIC_LIMIT:
            continue
        if lw not in seen:
            seen.append(lw)
    seen.sort(key=lambda w: (-len(w) if not re.match(r'\d', w) else -100))
    return seen[:limit]


def short(text, n=110):
    return text if len(text) <= n else text[: n - 1].rsplit(' ', 1)[0] + ' …'


def image_data(doc, xref):
    pix = pymupdf.Pixmap(doc, xref)
    smask = doc.extract_image(xref).get('smask', 0)
    if smask:
        pix = pymupdf.Pixmap(pix, pymupdf.Pixmap(doc, smask))
    if pix.colorspace and pix.colorspace.n not in (1, 3):
        pix = pymupdf.Pixmap(pymupdf.csRGB, pix)
    img = Image.open(io.BytesIO(pix.tobytes('png')))
    buf = io.BytesIO()
    img.save(buf, 'WEBP', lossless=True, quality=100, method=6)
    return 'data:image/webp;base64,' + base64.b64encode(buf.getvalue()).decode('ascii'), img.width, img.height


def build(pdf_path):
    doc = pymupdf.open(pdf_path)
    rows = read_rows(read_items(doc))

    general = {}
    for r in rows:
        key = (r['anlage'], r['lfd'])
        if key in GENERAL:
            text = ' '.join(s['text'] for s in segments_of(r['right']) if s['type'] == 'gebot')
            expl = ' '.join(s['text'] for s in segments_of(r['right']) if s['type'] == 'erlaeuterung')
            for target in GENERAL[key]:
                general.setdefault((r['anlage'], target), []).append({'scope': r['lfd'], 'gebot': text, 'erlaeuterung': expl})

    images = {}
    cards = []
    for r in rows:
        key = (r['anlage'], r['lfd'])
        if key in GENERAL or r['anlage'] == 3 and r['lfd'] in ('65', '68', '70', '71', '73'):
            continue
        nums = [m.group(2) for line in r['mid'] for m in [re.match(r'^(Zeichen|Bild) (\d+(?:\.\d+)?)$', line)] if m]
        kind, name = NAMES.get(key, (None, None))
        caption = join_lines([l for l in r['mid'] if not re.match(r'^(Zeichen|Bild) \d', l)], caption=True)
        if not name:
            name = caption.rstrip('.')
            kind = 'Bild' if any(l.startswith('Bild ') for l in r['mid']) else 'Zeichen'
        number = NUMBERS.get(key) or (nums[0] if nums else None)
        if number and kind in (None, 'Zusatzzeichen'):
            kind = 'Zeichen'
        if not number and kind == 'Zeichen':
            kind = 'Zeichen'
        segs = segments_of(r['right'])
        if r['anlage'] == 3 and r['lfd'] in UMLEITUNG:
            segs = [{'type': 'erlaeuterung', 'text': UMLEITUNG[r['lfd']]}]
        for g in general.get(key, []):
            if g['gebot']:
                segs.append({'type': 'allgemein', 'text': g['gebot']})
            if g['erlaeuterung']:
                segs.append({'type': 'allgemein', 'text': g['erlaeuterung']})
        img_keys = []
        for xref in r['imgs']:
            k = f'x{xref}'
            if k not in images:
                images[k] = image_data(doc, xref)
            img_keys.append(k)
        if number:
            ident = 'vz-' + number.replace('.', '-')
        else:
            ident = f"vz-z{r['anlage']}-" + re.sub(r'[^0-9]+', '-', r['lfd']).strip('-')
        cards.append({
            'id': ident,
            'anlage': r['anlage'],
            'lfd': r['lfd'],
            'section': re.sub(r'\s+', ' ', r['section'] or ''),
            'kind': kind,
            'sign': number,
            'name': name,
            'images': img_keys,
            'official': segs,
        })

    ids = [c['id'] for c in cards]
    assert len(ids) == len(set(ids)), 'doppelte IDs'
    return cards, images


def card_to_js(card, images):
    anlage = card['anlage']
    label = f"{'Bild' if card['kind'] == 'Bild' else 'Zeichen'} {card['sign']}" if card['sign'] else card['kind']
    category = ANLAGEN[anlage]
    if card['kind'] in ('Zusatzzeichen', 'Sinnbild') and not card['sign']:
        category = f'{card["kind"]} ({ANLAGEN[anlage].split(" (")[1]}'
    section = re.sub(r'^Abschnitt \d+ ', '', card['section'])

    if card['kind'] == 'Zusatzzeichen':
        question = 'Was bedeutet dieses Zusatzzeichen? Erklären Sie, zu welchem Zeichen es gehört und was es regelt.'
    elif card['kind'] == 'Sinnbild':
        question = 'Was bedeutet dieses Sinnbild auf Wegweisern der Autobahn?'
    elif anlage == 4:
        question = 'Welche Verkehrseinrichtung ist das? Erklären Sie Bedeutung und Verhalten.'
    elif 'Markierung' in card['section']:
        question = 'Welche Markierung ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.'
    else:
        question = 'Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.'

    own = [s for s in card['official'] if s['type'] != 'allgemein']
    general = [s for s in card['official'] if s['type'] == 'allgemein']

    answer = [f'Das ist {label} „{card["name"]}“ – {category}, {section}.']
    if anlage == 1:
        answer.append('Gefahrzeichen mahnen zu erhöhter Aufmerksamkeit, insbesondere zur Verringerung der Geschwindigkeit im Hinblick auf eine Gefahrsituation (§ 40 Absatz 1 StVO). Außerhalb geschlossener Ortschaften stehen sie im Allgemeinen 150 bis 250 m vor der Gefahrstelle (§ 40 Absatz 2 StVO).')
    for s in own + general:
        answer.append(s['text'] if s['text'].endswith(('.', ':')) else s['text'] + '.')

    name_words = keywords_of(card['name'], 3)
    name_kw = [card['name'].lower()] + name_words
    if card['sign']:
        name_kw.append(card['sign'])
    points = [{'label': f'Bezeichnung: {card["name"]}', 'keywords': sorted(set(name_kw), key=len)}]
    if anlage == 1:
        points.append({'label': 'Gefahrzeichen: Aufmerksamkeit, Geschwindigkeit anpassen', 'keywords': ['gefahrzeichen', 'warnt', 'aufmerksam', 'langsam', 'geschwindigkeit', 'vorsicht']})
        if card['sign'] not in ('156', '159', '162'):
            points.append({'label': 'Außerorts 150–250 m vor der Gefahrstelle', 'keywords': ['150', '250', 'außerorts']})
    if card['kind'] == 'Zusatzzeichen':
        ref = re.findall(r'Zeichen (\d+(?:\.\d+)?)', card['name'])
        points.append({'label': 'Zusatzzeichen zum Hauptzeichen', 'keywords': ['zusatzzeichen'] + ref})
    for s in own:
        for item in split_items(s['text']):
            kws = keywords_of(item)
            if kws:
                points.append({'label': short(item), 'keywords': kws})
    for s in general:
        for item in split_items(s['text'])[:2]:
            kws = keywords_of(item)
            if kws:
                points.append({'label': short(item), 'keywords': kws})
    if len(points) > 8:
        points = points[:8]

    if card['kind'] == 'Zusatzzeichen':
        follow = ['Mit welchem Hauptzeichen wird dieses Zusatzzeichen verwendet?', 'Wo steht das Zusatzzeichen?']
    elif anlage == 1:
        follow = ['Wie verhalten Sie sich nach diesem Gefahrzeichen?', 'Wo wird dieses Zeichen innerorts und außerorts aufgestellt?']
    elif anlage == 2:
        follow = ['Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?', 'Wie und wo endet die Anordnung?']
    elif anlage == 3:
        follow = ['Ist dieses Zeichen ein Gebot oder nur ein Hinweis?', 'Wie erklären Sie dieses Zeichen einem Fahrschüler?']
    else:
        follow = ['Was verbietet oder zeigt diese Einrichtung an?', 'Wo wird sie typischerweise verwendet?']

    return {
        'id': card['id'],
        'subject': 'zeichen',
        'sign': card['sign'],
        'signLabel': label,
        'kind': card['kind'],
        'anlage': anlage,
        'lfd': card['lfd'],
        'name': card['name'],
        'category': f'{category}, {section}',
        'topic': f'{label} – {card["name"]}',
        'question': question,
        'difficulty': 1 if anlage == 1 else 2,
        'images': card['images'],
        'official': card['official'],
        'modelAnswer': ' '.join(answer),
        'keyPoints': points,
        'wrongClaims': [],
        'followUps': follow,
        'source': f'StVO Anlage {anlage}, lfd. Nr. {card["lfd"]}',
    }


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    cards, images = build(sys.argv[1])
    compute_doc_freq(cards)
    entries = [card_to_js(c, images) for c in cards]
    header = (
        '/**\n'
        ' * Verkehrszeichen nach StVO Anlage 1 bis 4 – automatisch erzeugt aus der\n'
        ' * Unterlage mit tools/extract-stvo-signs.py. Nicht von Hand bearbeiten;\n'
        ' * Ergänzungen (Erklärungen, Praxisbeispiele, typische Fehler) stehen in signs.js.\n'
        ' */\n'
    )
    OUT_SIGNS.write_text(
        header
        + "(function (root, factory) {\n"
        + "  if (typeof module === 'object' && module.exports) {\n    module.exports = factory();\n  } else {\n    root.FLSignsStvo = factory();\n  }\n"
        + "})(typeof self !== 'undefined' ? self : this, function () {\n  'use strict';\n\n  const signs = "
        + json.dumps(entries, ensure_ascii=False, indent=2).replace('\n', '\n  ')
        + ';\n\n  return { signs };\n});\n',
        encoding='utf-8',
    )
    img_map = {k: v[0] for k, v in images.items()}
    sizes = {k: [v[1], v[2]] for k, v in images.items()}
    OUT_IMAGES.write_text(
        '/** Original-Abbildungen der Verkehrszeichen (StVO Anlage 1 bis 4), verlustfrei als WebP. */\n'
        + "(function (root, factory) {\n"
        + "  if (typeof module === 'object' && module.exports) {\n    module.exports = factory();\n  } else {\n    root.FLSignImages = factory();\n  }\n"
        + "})(typeof self !== 'undefined' ? self : this, function () {\n  'use strict';\n\n"
        + '  const sizes = ' + json.dumps(sizes) + ';\n'
        + '  const images = ' + json.dumps(img_map, indent=2).replace('\n', '\n  ') + ';\n\n'
        + '  return { images, sizes };\n});\n',
        encoding='utf-8',
    )
    print(f'{len(entries)} Zeichen, {len(images)} Bilder')


if __name__ == '__main__':
    main()
