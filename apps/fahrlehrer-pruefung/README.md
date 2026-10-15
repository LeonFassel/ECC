# Fahrlehrer-Prüfungstrainer

Lern-App für die **mündliche Fachkundeprüfung** zur Fahrlehrerlaubnis
(Klasse BE). Läuft auf Smartphone, Tablet und Computer. Für die Grundversion
braucht es kein Framework, keinen Build-Schritt und keine externen Abhängigkeiten.

## Funktionen

| Bereich | Was die App bietet |
| --- | --- |
| Übersicht | Lernfortschritt, Wissensstand und Prüfungsreife getrennt, Tagesziel, Lernserie, Fortschrittsbalken pro Fach |
| Fächer | Verkehrszeichen, Pädagogik, Recht, Technik, Verkehrsverhalten, Berufspraxis – insgesamt 171 Fragen, darunter 38 mündliche Prüfungsfragen (Verkehrsverhalten/Recht) und gut 40 Technikfragen |
| Verkehrszeichen-Training | Alle 217 Zeichen aus StVO Anlage 1 bis 4 (216 mit Originalabbildung, nach Gruppen trainierbar): Zeichen sehen, Antwort einsprechen oder tippen, Rückmeldung zu „richtig erwähnt“, „falsch“ und „hat gefehlt“ |
| Üben | Frage erst frei beantworten (tippen oder einsprechen), danach Schnellbewertung, Erklärung in einfacher Sprache, Praxisbeispiel, Musterantwort und mögliche Nachfragen |
| Heute | Tagesplan aus fälligen Wiederholungen (Leitner-System), Schwächen und neuen Themen |
| Prüfung | Simulation der mündlichen Prüfung mit Nachfragen, wahlweise mit Trainings-Prüfer (offline) oder KI-Prüfer |
| Analyse | Schwache Themen, häufig vergessene Kernpunkte, Fächervergleich, Trend und konkrete Empfehlungen |

### Lernfortschritt und Wissensstand

- **Lernfortschritt**: Anteil der Fragen, die Sie schon bearbeitet haben.
- **Wissensstand**: Wie sicher die bearbeiteten Fragen sitzen. Neuere Versuche
  zählen stärker, und lange nicht geübtes Wissen verblasst leicht.
- **Prüfungsreife**: Wissensstand bezogen auf den gesamten Stoff.

## Starten

```bash
# Grundversion (lokale Bewertung, ohne KI)
node apps/fahrlehrer-pruefung/server.js
# -> http://127.0.0.1:4173
```

Der Fortschritt bleibt im `localStorage` des Browsers gespeichert. Unter
*Einstellungen* können Sie ihn als Sicherungscode exportieren und importieren.

Für Smartphone oder Tablet im selben Netzwerk starten Sie den Server mit
`HOST=0.0.0.0`.

## Als einzelne Datei (z. B. für QR-Code oder Hosting)

```bash
node apps/fahrlehrer-pruefung/build-standalone.js fahrlehrer-pruefungstrainer.html
```

Das erzeugt eine einzige HTML-Datei, die ohne Server läuft. Sie können sie auf
einen beliebigen statischen Webspace laden, z. B. GitHub Pages, und die Adresse
als QR-Code teilen. In dieser Variante sind die KI-Funktionen aus. Mit
`--fragment` entsteht eine Variante ohne `<html>`/`<head>`/`<body>` für Hoster,
die das Grundgerüst selbst ergänzen.

Den Fortschritt übertragen Sie zwischen Geräten über *Einstellungen →
Sicherungscode anzeigen* und *Sicherungscode einfügen*.

## Spracheingabe

„Antwort einsprechen“ nutzt die eingebaute Spracherkennung des Browsers
(Web Speech API, Deutsch). Sie funktioniert z. B. in Chrome, Edge und Safari,
wenn die Seite über `localhost` oder HTTPS geöffnet wird. Wo die Seite keinen
Mikrofonzugriff bekommt (etwa als eingebettete Seite), diktieren Sie über die
Mikrofon-Taste der Handy-Tastatur direkt ins Antwortfeld.

Die lokale Bewertung erkennt neben fehlenden Kernpunkten auch typische
Fehler, z. B. „beim Stoppschild reicht langsames Durchrollen“. Verneinungen wie
„nicht durchrollen“ werden dabei berücksichtigt.

## KI-Bewertung und KI-Prüfer aktivieren

Es gibt zwei Wege:

1. **Als gehostete Seite auf claude.ai:** Hier nutzt die App Claude über das
   Konto der Person, die die Seite öffnet. Beim ersten Einsatz fragt Claude, ob
   die Seite die KI nutzen darf.
2. **Mit dem eigenen Server** und einem API-Schlüssel, über das offizielle SDK
   `@anthropic-ai/sdk`:

```bash
cd apps/fahrlehrer-pruefung
npm install                     # installiert das SDK (optional dependency)
ANTHROPIC_API_KEY=... npm start
```

Mit KI-Zugang bewertet die KI Ihre freien Antworten zusätzlich. Sie erkennt
gleichwertige Formulierungen und fachliche Fehler und gibt einen Lerntipp.
Der KI-Prüfer führt eine realistische mündliche Prüfung mit individuellen
Nachfragen und schließt mit einer Gesamteinschätzung.

| Variable | Bedeutung |
| --- | --- |
| `ANTHROPIC_API_KEY` | Zugang zur Claude API (aktiviert die KI-Funktionen) |
| `FL_CLAUDE_MODEL` | Modell überschreiben (Standard: `claude-opus-5-5`) |
| `FL_AI_DISABLED=1` | KI trotz vorhandenem Schlüssel abschalten |
| `PORT`, `HOST` | Adresse des Servers (Standard `127.0.0.1:4173`) |

Der API-Schlüssel bleibt auf dem Server. Der Browser spricht nur mit
`/api/evaluate` und `/api/examiner`. Ohne Schlüssel läuft die App vollständig
in der Grundversion.

## Aufbau

```text
apps/fahrlehrer-pruefung/
  server.js                 Statischer Server + KI-Endpunkte
  build-standalone.js       Baut die App als eine einzige HTML-Datei
  lib/ai-examiner.js        Claude-Requests (Bewertung, Prüfer), Antwortprüfung
  public/index.html         App-Hülle mit Navigation
  public/app.js             Oberfläche (Views, Übung, Prüfung, Analyse)
  public/core/learning-core.js  Lernlogik: Bewertung, Fortschritt, Wiederholung, Analyse
  public/core/ai-prompts.js     Anweisungen für KI-Bewertung und KI-Prüfer (Server und claude.ai)
  public/data/questions.js      Fächer, Grundfragen und Zusammenführung aller Fragen
  public/data/questions-muendlich.js  Mündliche Prüfungsfragen Verkehrsverhalten/Recht
  public/data/questions-technik.js    Technikfragen
  public/data/signs-stvo.js     Alle Verkehrszeichen der StVO: Bezeichnung, amtlicher Text, Kernpunkte (generiert)
  public/data/sign-images.js    Originalabbildungen der Verkehrszeichen aus der StVO (generiert)
  public/data/signs.js          Ergänzungen zu wichtigen Zeichen: Erklärung, Beispiel, typische Fehler
  tools/extract-stvo-signs.py   Erzeugt signs-stvo.js und sign-images.js aus dem StVO-PDF
```

Die Verkehrszeichen werden nicht nachgezeichnet: Bilder und Texte stammen
unverändert aus dem PDF der StVO (Anlagen 1 bis 4). Neu erzeugen mit
`python3 tools/extract-stvo-signs.py <StVO.pdf>` (benötigt PyMuPDF und Pillow).

Weitere Fragen ergänzen Sie in `public/data/questions.js`. Jede Frage braucht
Erklärung, Praxisbeispiel, Musterantwort, Kernpunkte mit Schlüsselwörtern und
mindestens eine Nachfrage. Die Tests prüfen, dass jede Musterantwort ihre
eigenen Kernpunkte erfüllt.

## Tests

```bash
node tests/run-all.js apps/fahrlehrer-pruefung
```

## Hinweis

Inhalte ohne Gewähr. Gleichen Sie Rechtsfragen stets mit den aktuellen
Fassungen von StVO, StVG, FeV, FahrlG, FahrlPrüfV und FahrschAusbO ab.
