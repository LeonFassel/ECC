# Fahrlehrer-Prüfungstrainer

Lern-App für die **mündliche Fachkundeprüfung** zur Fahrlehrerlaubnis
(Klasse BE). Läuft auf Smartphone, Tablet und Computer. Für die Grundversion
braucht es kein Framework, keinen Build-Schritt und keine externen Abhängigkeiten.

## Funktionen

| Bereich | Was die App bietet |
| --- | --- |
| Suche | Suchleiste oben auf jeder Seite (X löscht die Eingabe): Frage oder Begriff eingeben (z. B. „Wie lange dauert die Probezeit und für wen gilt sie?“, „Stützlast“, „Zeichen 205“). Oben steht die direkte Antwort – mit KI von Claude ausschließlich aus den Musterantworten der App formuliert, ohne KI die passendsten Stellen der besten Antwort – mit den genannten Paragrafen; darunter alle Treffer aus Fächern, Karteikarten und Verkehrszeichen |
| Übersicht | Lernfortschritt, Wissensstand und Prüfungsreife getrennt, Tagesziel, Lernserie, Fortschrittsbalken pro Fach |
| Fächer | Verkehrszeichen, Pädagogik, Recht, Technik, Verkehrsverhalten, Berufspraxis – insgesamt 171 Fragen, darunter 38 mündliche Prüfungsfragen (Verkehrsverhalten/Recht) und gut 40 Technikfragen |
| Mündliche Fragensammlung | Fragen aus der „Sammlung von mündlichen Prüfungsfragen“ (Stand Januar 2023) mit recherchierten Musterantworten – im passenden Fach (Knopf „Mündliche Sammlung“) und als Karteikarte im passenden Stapel; Fragen, die schon in der App stehen, sind nicht doppelt aufgenommen (im Repository nur Platzhalter) |
| Verkehrszeichen-Training | Alle 217 Zeichen aus StVO Anlage 1 bis 4 (216 mit Originalabbildung, nach Gruppen trainierbar): Zeichen sehen, Antwort einsprechen oder tippen, Rückmeldung zu „richtig erwähnt“, „falsch“ und „hat gefehlt“ |
| Üben | Frage erst frei beantworten (tippen oder einsprechen), danach Schnellbewertung, Erklärung in einfacher Sprache, Praxisbeispiel, Musterantwort und mögliche Nachfragen |
| Heute | Tagesplan aus fälligen Wiederholungen (Leitner-System), Schwächen und neuen Themen |
| Prüfung | Mündliche Prüfung wie in echt: drei Prüfer nacheinander – Rechtler (Verkehrszeichen, Recht, Verkehrsverhalten), Pädagoge (Pädagogik, Fahrlehrerwesen), Techniker – mit je 10 Minuten (Uhr oben rechts, wahlweise 5 Minuten als Kurztraining). Ist die Zeit um, kommt keine neue Frage mehr; die laufende Frage darf noch zu Ende beantwortet werden (das Eingabefeld bleibt dabei unberührt). Danach verabschiedet sich der Prüfer („Passt, danke – wir sind fertig“) und kündigt den nächsten Prüfer an; nach dem letzten Prüfer geht es über „Zur Auswertung“ zu den Noten. Mehrteilige Fragen stellt der Prüfer wie im Gespräch nacheinander – immer nur eine Frage auf einmal. Am Ende gibt es eine Note je Fach (1–6, Stufen wie bei der schriftlichen Prüfung), die Gesamtnote als Durchschnitt und die Prozentwerte. Noten sind farbig: 1–2 grün, 3–4 orange, 5–6 rot (auch bei der schriftlichen Prüfung). Wahlweise Trainings-Prüfer (offline) oder KI-Prüfer mit eigener Rolle und Einschätzung je Prüfer. Jede beendete Prüfung landet im *Archiv* (Noten, Ergebnisse je Frage, Gesprächsverlauf; nach links wischen zum Löschen) mit „Ihr Stand“: je Fach der Durchschnitt der letzten bis zu drei Noten. Prüfungen von vor dem Archiv werden aus den gespeicherten Einzelergebnissen rekonstruiert (ohne Gesprächsverlauf) |
| Schriftliche Prüfung | Original-Prüfungen zum Auswählen: 5-Stunden-Timer zum selbst Starten, links die Aufgaben, rechts kariertes A4-Papier; Schreiben und Markieren mit Apple Pencil (Kugelschreiber, Textmarker, Radierer, Rückgängig), Zwei-Finger-Zoom, Abgabe mit Noten je Fach durch Claude |
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

## Passwortgeschützte Website (z. B. für Safari mit Mikrofon)

```bash
FL_SITE_PASSWORD='…' node apps/fahrlehrer-pruefung/build-site.js
```

Das schreibt nach `docs/fahrlehrer/` eine kleine Startseite (`index.html`) und
die komplette App verschlüsselt (`app.bin`, AES-GCM, Schlüssel per PBKDF2 aus
dem Passwort). Im Repository stehen damit keine lesbaren Fragen; erst nach
Eingabe des Passworts entschlüsselt der Browser die App. Das Passwort wird nie
in eine Datei geschrieben. Mit GitHub Pages (Quelle: Branch, Ordner `/docs`)
ist die App dann unter `https://<nutzer>.github.io/<repo>/fahrlehrer/`
erreichbar; dort darf sie das Mikrofon direkt nutzen.

### KI-Bewertung auf der Website (eigener API-Schlüssel)

Für KI-Bewertung und KI-Prüfer auf der Website wird das offizielle
Anthropic-SDK als Browser-Bundle in die verschlüsselte App eingebaut:

```bash
cd apps/fahrlehrer-pruefung && npm install && cd ../..
npx esbuild@0.25.10 apps/fahrlehrer-pruefung/tools/sdk-entry.mjs --bundle \
  --format=iife --platform=browser --target=safari15,chrome100 --minify \
  --legal-comments=inline --outfile=/tmp/anthropic-sdk.browser.js
FL_SITE_PASSWORD='…' FL_SDK_BUNDLE=/tmp/anthropic-sdk.browser.js \
  node apps/fahrlehrer-pruefung/build-site.js
```

Unter *Einstellungen → Eigener API-Schlüssel* trägt man dann einen Schlüssel
aus der Anthropic Console ein. Er bleibt nur im Browser des Geräts; Anfragen
gehen direkt an die Claude API und werden über das eigene Anthropic-Konto
abgerechnet. Request-Aufbau und Auswertung (`public/core/ai-requests.js`) sind
dieselben wie beim Server.

## Spracheingabe

„Antwort einsprechen“ nutzt die eingebaute Spracherkennung des Browsers
(Web Speech API, Deutsch). Sie funktioniert z. B. in Chrome, Edge und Safari,
wenn die Seite über `localhost` oder HTTPS geöffnet wird. Auf dem iPhone muss
dafür die Diktierfunktion eingeschaltet sein; Safari fragt beim ersten Mal nach
der Mikrofon-Erlaubnis. Wo die Seite keinen
Mikrofonzugriff bekommt (etwa als eingebettete Seite), diktieren Sie über die
Mikrofon-Taste der Handy-Tastatur direkt ins Antwortfeld.

Browser beenden die Spracherkennung nach einer Sprechpause von selbst. Die App
hört dann automatisch weiter, bis Sie auf „Aufnahme beenden“ oder auf
„Antwort prüfen“ tippen – das Mikrofon geht also nicht mehr zwischendurch aus.

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

## Lernspiele zu den Karteikarten

In der *Spielecke* (Karteikarten und jeder Stapel) gibt es fünf Spiele:
*Lern-Mix* (gemischte Runden aus Ankreuzen, Richtig/Falsch, Zuordnen,
Reihenfolge und Karte aufdecken), *Memory* (Begriff und Antwort als Paar),
*Blitzrunde* (60 Sekunden: Stimmt die Antwort?), *Zuordnen* und *Reihenfolge*.
Richtig/Falsch nutzt die geprüften Ankreuzfragen; Paare und Abläufe stehen in
den Spieldaten der Karteikarten. Ankreuz- und Aufdeck-Runden zählen für den
Lernstand, Bestwerte bleiben im Browser gespeichert.

## Schriftliche Prüfung mit dem Apple Pencil

Unter *Prüfung → Schriftliche Prüfung* wählen Sie eine Prüfung. Der Timer
(5:00:00) läuft erst, wenn Sie auf *Start* tippen, und zählt auch nach dem
Neuladen richtig weiter. Links stehen die Aufgaben, rechts karierte A4-Blätter
(*Neue Seite* fügt weitere hinzu); die Trennlinie lässt sich verschieben, auf
schmalen Bildschirmen schalten Sie zwischen *Fragen*, *Geteilt* und *Blatt* um.

Der Stift schreibt, der Finger scrollt. Mit *Finger* zeichnet auch der Finger.
Kugelschreiber (3 Farben, 3 Stärken, reagiert auf den Andruck), Textmarker
(3 Farben) und Radierer funktionieren auf dem Papier und direkt auf den Fragen.
Striche werden in Blatt-Koordinaten in IndexedDB gespeichert, Timer und
Einstellungen im `localStorage`.

Mit dem Werkzeug *Textfeld* (T) tippen Sie auf das Blatt und schreiben mit der
Tastatur; Textfelder lassen sich verschieben und löschen und stehen auch auf
den Blättern, die bewertet werden. Mit zwei Fingern zoomen Sie in das karierte
Blatt und in die Fragen; *100 %* setzt den Zoom zurück.

*Beenden* gibt die Prüfung ab: Die beschriebenen Blätter gehen als Bilder an
Claude, das die Handschrift liest und jedes Fach nach § 19 FahrlPrüfV benotet
(1 bis 6, mit Begründung je Aufgabe). Die Bewertung dient der Orientierung.
Die Abgabe landet im *Archiv* (Noten, Kommentare und Antwortblätter, erneut
bewertbar), und die Prüfung steht wieder unbearbeitet in der Auswahl. Im Archiv
zeigt *Geschriebene Prüfung ansehen* die Aufgaben mit den eigenen Markierungen
neben den abgegebenen Blättern; ein Eintrag lässt sich nach links wischen und
über den Mülleimer löschen.
Die KI-Bewertung läuft über den eigenen Server (`/api/written-grade`), auf der
Website mit eigenem API-Schlüssel oder auf claude.ai (dort mit Freigabe für
Bilder).

## Aufbau

```text
apps/fahrlehrer-pruefung/
  server.js                 Statischer Server + KI-Endpunkte
  build-standalone.js       Baut die App als eine einzige HTML-Datei
  build-site.js             Baut die passwortgeschützte Website (docs/fahrlehrer)
  lib/ai-examiner.js        Claude-Client für den Server (nutzt public/core/ai-requests.js)
  public/index.html         App-Hülle mit Navigation
  public/app.js             Oberfläche (Views, Übung, Prüfung, Analyse)
  public/core/learning-core.js  Lernlogik: Bewertung, Fortschritt, Wiederholung, Analyse
  public/core/ai-prompts.js     Anweisungen für KI-Bewertung und KI-Prüfer (Server und claude.ai)
  public/core/ai-requests.js    Claude-Requests, JSON-Schemas, Auswertung (Server und Website)
  public/core/written-exam.js   Schriftliche Prüfung: Timer, Striche, Rückgängig (ohne DOM, getestet)
  public/ink.js                 Zeichenfläche für Apple Pencil, Finger und Maus
  public/written-ui.js          Schriftliche Prüfung: Auswahl und Arbeitsplatz
  public/core/games-core.js     Lernspiele: Runden, Aussagen, Paare, Sterne (ohne DOM, getestet)
  public/core/search-core.js    Suche über alle Fragen und Antworten: Wortstämme, Paragrafen (ohne DOM, getestet)
  public/games.js               Lernspiele: Spielecke und Spiele
  public/data/questions.js      Fächer, Grundfragen und Zusammenführung aller Fragen
  public/data/questions-muendlich.js  Mündliche Prüfungsfragen Verkehrsverhalten/Recht
  public/data/questions-technik.js    Technikfragen
  public/data/questions-schriftlich.js  Schriftliche Prüfungen (im Repository nur Platzhalter)
  public/data/questions-msammlung.js    Mündliche Fragensammlung 2023 (im Repository nur Platzhalter)
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
