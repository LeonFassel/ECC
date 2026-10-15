# Fahrlehrer-Prüfungstrainer

Lern-App für die **mündliche Fachkundeprüfung** zur Fahrlehrerlaubnis
(Klasse BE). Läuft auf Smartphone, Tablet und Computer. Für die Grundversion
braucht es kein Framework, keinen Build-Schritt und keine externen Abhängigkeiten.

## Funktionen

| Bereich | Was die App bietet |
| --- | --- |
| Übersicht | Lernfortschritt, Wissensstand und Prüfungsreife getrennt, Tagesziel, Lernserie, Fortschrittsbalken pro Fach |
| Fächer | Verkehrszeichen, Pädagogik, Recht, Technik, Verkehrsverhalten, Berufspraxis (je 7 prüfungsnahe Fragen) |
| Üben | Frage erst frei beantworten, danach Schnellbewertung, Erklärung in einfacher Sprache, Praxisbeispiel, Musterantwort und mögliche Nachfragen |
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
*Einstellungen* können Sie ihn exportieren und importieren.

Für Smartphone oder Tablet im selben Netzwerk starten Sie den Server mit
`HOST=0.0.0.0`.

## KI-Bewertung und KI-Prüfer aktivieren

Die KI-Funktionen nutzen die Claude API über das offizielle SDK
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
  lib/ai-examiner.js        Claude-Requests (Bewertung, Prüfer), Antwortprüfung
  public/index.html         App-Hülle mit Navigation
  public/app.js             Oberfläche (Views, Übung, Prüfung, Analyse)
  public/core/learning-core.js  Lernlogik: Bewertung, Fortschritt, Wiederholung, Analyse
  public/data/questions.js  Fragenkatalog (Fächer, Fragen, Musterantworten, Kernpunkte)
```

Weitere Fragen ergänzen Sie in `public/data/questions.js`. Jede Frage braucht
Erklärung, Praxisbeispiel, Musterantwort, Kernpunkte mit Schlüsselwörtern und
mindestens eine Nachfrage. Die Tests prüfen, dass jede Musterantwort ihre
eigenen Kernpunkte erfüllt.

## Tests

```bash
node tests/apps/fahrlehrer-pruefung/learning-core.test.js
node tests/apps/fahrlehrer-pruefung/server.test.js
```

## Hinweis

Inhalte ohne Gewähr. Gleichen Sie Rechtsfragen stets mit den aktuellen
Fassungen von StVO, StVG, FeV, FahrlG, FahrlPrüfV und FahrschAusbO ab.
