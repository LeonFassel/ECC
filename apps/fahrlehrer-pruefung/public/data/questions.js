/**
 * Fragenkatalog für die mündliche Fachkundeprüfung (Fahrlehrerlaubnis Klasse BE).
 *
 * Jede Frage enthält:
 *  - question:     prüfungsnahe Fragestellung
 *  - explanation:  Erklärung in einfacher Sprache
 *  - example:      Praxisbeispiel aus dem Fahrschulalltag
 *  - modelAnswer:  Musterantwort, wie sie in der Prüfung überzeugen würde
 *  - keyPoints:    Kernpunkte mit Schlüsselwörtern (Grundlage der lokalen Bewertung)
 *  - followUps:    Nachfragen, mit denen der Prüfer nachhakt
 *
 * Hinweis: Rechtsstand bitte immer mit den aktuellen Gesetzestexten
 * (StVO, StVG, FeV, FahrlG, FahrlPrüfV, FahrschAusbO) abgleichen.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(
      require('./questions-muendlich.js'),
      require('./questions-technik.js'),
      require('./questions-sammlung.js'),
      require('./signs.js'),
      require('./signs-stvo.js'),
      require('./sign-images.js')
    );
  } else {
    root.FLData = factory(root.FLQuestionsMuendlich, root.FLQuestionsTechnik, root.FLQuestionsSammlung, root.FLSigns, root.FLSignsStvo, root.FLSignImages);
  }
})(typeof self !== 'undefined' ? self : this, function (muendlich, technik, sammlung, signExtras, stvo, signImages) {
  'use strict';

  const subjects = [
    { id: 'zeichen', name: 'Verkehrszeichen', short: 'Zeichen', color: '#2563eb', description: 'Vorschriftzeichen, Gefahrzeichen, Richtzeichen, Markierungen und ihre Rangfolge.' },
    { id: 'paedagogik', name: 'Pädagogik', short: 'Pädagogik', color: '#9333ea', description: 'Lernpsychologie, Unterrichtsplanung, Methoden, Feedback und Umgang mit Fahrschülern.' },
    { id: 'recht', name: 'Recht', short: 'Recht', color: '#dc2626', description: 'FahrlG, StVG, FeV, Probezeit, Fahreignungsregister und Verantwortung des Fahrlehrers.' },
    { id: 'technik', name: 'Technik', short: 'Technik', color: '#ea580c', description: 'Fahrphysik, Bremsen, Reifen, Fahrerassistenz, Beleuchtung und alternative Antriebe.' },
    { id: 'verhalten', name: 'Verkehrsverhalten', short: 'Verhalten', color: '#059669', description: 'Vorfahrt, Überholen, Abstand, Rettungsgasse, Gefahrenlehre und defensives Fahren.' },
    { id: 'praxis', name: 'Berufspraxis', short: 'Praxis', color: '#0891b2', description: 'Ausbildungsplanung, Sonderfahrten, Fahrschulbetrieb, Prüfungsreife und Qualitätssicherung.' }
  ];

  const questions = [
    // ------------------------------------------------------------------ Verkehrszeichen
    {
      id: 'zeichen-01',
      subject: 'zeichen',
      topic: 'Vorfahrtregelnde Zeichen',
      difficulty: 1,
      question: 'Erklären Sie den Unterschied zwischen Zeichen 205 „Vorfahrt gewähren“ und Zeichen 206 „Halt. Vorfahrt gewähren.“',
      explanation: 'Beide Zeichen verlangen, dass man anderen die Vorfahrt lässt. Beim Stoppschild (206) muss man aber immer vollständig anhalten – auch wenn frei ist. Beim Dreieck (205) darf man weiterfahren, wenn man niemanden behindert oder gefährdet.',
      example: 'Ein Fahrschüler rollt am Stoppschild langsam über die Haltlinie, weil „eh frei“ ist. In der Prüfung wäre das ein erheblicher Fehler – üben Sie daher bewusst das Anhalten mit Stillstand der Räder an der Haltlinie.',
      modelAnswer: 'Beide Zeichen ordnen an, dass der Wartepflichtige Vorfahrt gewähren muss. Zeichen 205 ist ein auf der Spitze stehendes Dreieck; man muss nur anhalten, wenn es die Verkehrslage erfordert. Zeichen 206 ist achteckig und ordnet zusätzlich ein unbedingtes Anhalten an – an der Haltlinie, oder wenn keine vorhanden ist, dort, wo die Kreuzung eingesehen werden kann. Das Stoppschild wird dort aufgestellt, wo die Sicht eingeschränkt oder die Kreuzung besonders gefährlich ist. Durch die besondere Form sind beide Zeichen auch von hinten bzw. bei Verschmutzung erkennbar.',
      keyPoints: [
        { label: 'Beide: Vorfahrt gewähren', keywords: ['vorfahrt gewähren', 'wartepflicht', 'vorfahrt lassen'] },
        { label: '206: unbedingtes Anhalten', keywords: ['anhalten', 'stillstand', 'halten'] },
        { label: 'Haltlinie bzw. Sichtlinie', keywords: ['haltlinie', 'einsehen', 'sichtlinie'] },
        { label: 'Form: Dreieck vs. Achteck', keywords: ['achteck', 'dreieck', 'form'] },
        { label: 'Einsatz bei schlechter Sicht/Gefahr', keywords: ['sicht', 'gefährlich', 'unfallschwerpunkt', 'unübersichtlich'] }
      ],
      followUps: [
        'Wo genau muss angehalten werden, wenn keine Haltlinie vorhanden ist?',
        'Warum haben gerade diese beiden Zeichen eine besondere Form?'
      ]
    },
    {
      id: 'zeichen-02',
      subject: 'zeichen',
      topic: 'Rangfolge der Verkehrsregelung',
      difficulty: 1,
      question: 'In welcher Rangfolge gelten Weisungen von Polizeibeamten, Lichtzeichen, Verkehrszeichen und allgemeine Verkehrsregeln?',
      explanation: 'Je „direkter“ und aktueller eine Regelung ist, desto höher steht sie. Der Polizist sieht die Lage vor Ort, deshalb geht er vor. Danach kommt die Ampel, dann das Schild und zum Schluss die allgemeine Regel wie „rechts vor links“.',
      example: 'An einer Ampelkreuzung regelt ein Polizist den Verkehr, während die Ampel weiter Grün zeigt. Erklären Sie Ihrem Schüler: Die Zeichen des Polizisten gelten – die Ampel ist in diesem Moment bedeutungslos.',
      modelAnswer: 'Nach § 36 und § 37 StVO gilt: Weisungen und Zeichen von Polizeibeamten gehen allen anderen Anordnungen und sonstigen Regeln vor. Danach folgen Lichtzeichen (Wechsellichtzeichen), die Vorrang vor Vorfahrtregeln durch Verkehrszeichen haben. Verkehrszeichen gehen wiederum den allgemeinen Verkehrsregeln vor. Zusätzlich gilt: Gelbe, vorübergehende Markierungen heben weiße Markierungen auf, z. B. in Baustellen.',
      keyPoints: [
        { label: '1. Polizeibeamte', keywords: ['polizei', 'polizeibeamte'] },
        { label: '2. Lichtzeichen/Ampel', keywords: ['lichtzeichen', 'ampel', 'wechsellicht'] },
        { label: '3. Verkehrszeichen', keywords: ['verkehrszeichen', 'schild'] },
        { label: '4. Allgemeine Regeln', keywords: ['allgemeine', 'rechts vor links', 'verkehrsregeln'] },
        { label: 'Gelbe vor weißen Markierungen', keywords: ['gelb', 'baustelle', 'markierung'] }
      ],
      followUps: [
        'Was gilt, wenn in einer Baustelle gelbe und weiße Markierungen gleichzeitig vorhanden sind?',
        'Wie bringen Sie einem Fahrschüler die Polizeizeichen bei einer Verkehrsregelung bei?'
      ]
    },
    {
      id: 'zeichen-03',
      subject: 'zeichen',
      topic: 'Gefahrzeichen',
      difficulty: 2,
      question: 'Wo werden Gefahrzeichen in der Regel aufgestellt und was verlangen sie vom Fahrzeugführer?',
      explanation: 'Gefahrzeichen warnen vor einer Stelle, an der man besonders aufpassen muss. Sie stehen außerorts deutlich vor der Gefahr, damit man Zeit hat, sich vorzubereiten. Innerorts stehen sie kurz davor.',
      example: 'Bei einer Überlandfahrt sehen Sie das Zeichen „Wildwechsel“. Fragen Sie den Schüler, wie weit die Gefahrstelle wohl entfernt ist und wie er sich jetzt verhalten sollte (Geschwindigkeit, Blick in die Seitenräume, Bremsbereitschaft).',
      modelAnswer: 'Gefahrzeichen (Anlage 1 StVO) mahnen zu erhöhter Aufmerksamkeit, insbesondere zur Verringerung der Geschwindigkeit im Hinblick auf eine Gefahrsituation. Außerorts stehen sie im Regelfall etwa 150 bis 250 m vor der Gefahrstelle, innerorts kurz davor. Bei abweichender Entfernung wird diese durch ein Zusatzzeichen angegeben, eine längere Gefahrstrecke ebenfalls per Zusatzzeichen. Gefahrzeichen sind dreieckig mit roter Umrandung, die Spitze zeigt nach oben.',
      keyPoints: [
        { label: 'Erhöhte Aufmerksamkeit / Geschwindigkeit anpassen', keywords: ['aufmerksamkeit', 'geschwindigkeit', 'langsamer', 'vorsicht'] },
        { label: 'Außerorts 150–250 m davor', keywords: ['150', '250'] },
        { label: 'Innerorts kurz davor', keywords: ['innerorts', 'kurz vor'] },
        { label: 'Zusatzzeichen für Entfernung/Länge', keywords: ['zusatzzeichen', 'entfernung', 'länge'] }
      ],
      followUps: [
        'Was bedeutet ein Zusatzzeichen mit Längenangabe unter einem Gefahrzeichen?',
        'Wann endet eine Geschwindigkeitsbeschränkung, die zusammen mit einem Gefahrzeichen steht?'
      ]
    },
    {
      id: 'zeichen-04',
      subject: 'zeichen',
      topic: 'Haltverbote',
      difficulty: 1,
      question: 'Erläutern Sie den Unterschied zwischen dem absoluten Haltverbot (Zeichen 283) und dem eingeschränkten Haltverbot (Zeichen 286).',
      explanation: 'Beim absoluten Haltverbot darf man gar nicht halten – auch nicht kurz. Beim eingeschränkten Haltverbot darf man kurz halten (bis 3 Minuten) oder länger, wenn man nur ein- oder aussteigen lässt bzw. be- oder entlädt.',
      example: 'Ein Schüler will in der Stadt „nur kurz“ jemanden aussteigen lassen. Lassen Sie ihn selbst entscheiden: Unter Zeichen 286 ist das erlaubt, unter Zeichen 283 nicht.',
      modelAnswer: 'Zeichen 283 (absolutes Haltverbot) verbietet jedes Halten auf der Fahrbahn. Zeichen 286 (eingeschränktes Haltverbot) verbietet das Halten länger als drei Minuten, ausgenommen zum Ein- oder Aussteigen sowie zum Be- oder Entladen. Beide gelten nur auf der Straßenseite, auf der sie stehen, und grundsätzlich bis zur nächsten Kreuzung oder Einmündung, sofern Anfang/Ende nicht durch Pfeile oder Zusatzzeichen anders angezeigt werden. Mit Zusatzzeichen können sie auf den Seitenstreifen ausgedehnt werden.',
      keyPoints: [
        { label: '283: jedes Halten verboten', keywords: ['jedes halten', 'gar nicht', 'nicht halten', 'kein halten'] },
        { label: '286: bis 3 Minuten erlaubt', keywords: ['3 minuten', 'drei minuten'] },
        { label: 'Ausnahme Ein-/Aussteigen, Be-/Entladen', keywords: ['aussteigen', 'einsteigen', 'entladen', 'beladen'] },
        { label: 'Geltungsbereich: Straßenseite bis Kreuzung', keywords: ['straßenseite', 'kreuzung', 'einmündung'] }
      ],
      followUps: [
        'Wo endet ein Haltverbot, wenn kein Ende-Pfeil angebracht ist?',
        'Gilt das Haltverbot auch auf dem Seitenstreifen?'
      ]
    },
    {
      id: 'zeichen-05',
      subject: 'zeichen',
      topic: 'Streckenverbote',
      difficulty: 2,
      question: 'Wie und wo enden Streckenverbote wie eine zulässige Höchstgeschwindigkeit (Zeichen 274) oder ein Überholverbot (Zeichen 276)?',
      explanation: 'Ein Streckenverbot gilt ab dem Schild – und zwar so lange, bis es ausdrücklich aufgehoben wird. Es endet nicht automatisch an der nächsten Kreuzung.',
      example: 'Nach einer Kreuzung fragt der Schüler: „Darf ich jetzt wieder 100 fahren?“ Gute Gelegenheit, das Aufhebungszeichen bzw. die Regel zu wiederholen.',
      modelAnswer: 'Streckenverbote gelten ab der Stelle, an der das Zeichen steht. Sie enden durch ein entsprechendes Aufhebungszeichen (z. B. Zeichen 278 „Ende der zulässigen Höchstgeschwindigkeit“, Zeichen 280 „Ende des Überholverbots“) oder durch Zeichen 282 „Ende sämtlicher Streckenverbote“. Ist die Länge der Verbotsstrecke per Zusatzzeichen angegeben, endet das Verbot ohne Aufhebungszeichen. Steht das Streckenverbot zusammen mit einem Gefahrzeichen, endet es, sobald die Gefahrstelle zweifelsfrei zurückgelegt ist. Kreuzungen oder Einmündungen heben ein Streckenverbot nicht auf.',
      keyPoints: [
        { label: 'Aufhebungszeichen (278/280/281)', keywords: ['278', '280', '281', 'aufhebung', 'ende'] },
        { label: 'Ende sämtlicher Streckenverbote (282)', keywords: ['282', 'sämtlicher'] },
        { label: 'Zusatzzeichen mit Länge', keywords: ['zusatzzeichen', 'länge'] },
        { label: 'Mit Gefahrzeichen: Ende der Gefahrstelle', keywords: ['gefahrstelle', 'gefahrzeichen'] },
        { label: 'Kreuzungen heben nicht auf', keywords: ['kreuzung', 'einmündung'] }
      ],
      followUps: [
        'Wie verhalten Sie sich, wenn ein Streckenverbot nach einer Einmündung nicht wiederholt wird?',
        'Was gilt für das Ende eines Streckenverbots, das zusammen mit einem Gefahrzeichen angeordnet ist?'
      ]
    },
    {
      id: 'zeichen-06',
      subject: 'zeichen',
      topic: 'Fahrbahnmarkierungen',
      difficulty: 1,
      question: 'Was bedeuten Fahrstreifenbegrenzung (Zeichen 295) und Leitlinie (Zeichen 340)?',
      explanation: 'Die durchgezogene Linie darf man nicht überfahren – sie trennt den Gegenverkehr oder Fahrstreifen. Die unterbrochene Leitlinie ist eine Orientierungshilfe; sie darf überfahren werden, wenn der Verkehr nicht gefährdet wird.',
      example: 'Beim Überholen eines Radfahrers auf einer Landstraße mit durchgezogener Linie muss Ihr Schüler hinter dem Radfahrer bleiben, wenn der Seitenabstand nur durch Überfahren der Linie einzuhalten wäre.',
      modelAnswer: 'Die Fahrstreifenbegrenzung (Zeichen 295, durchgezogene Linie) darf nicht überfahren werden. Trennt sie den Verkehr in Gegenrichtung, darf links von ihr nicht gefahren werden; außerdem ist das Halten links und das Parken auf der Fahrbahn verboten, wenn zwischen Parkendem und Linie kein Fahrstreifen von mindestens 3 m verbleibt. Die Leitlinie (Zeichen 340, unterbrochene Linie) dient der Orientierung, sie darf überfahren werden, wenn der Verkehr dadurch nicht gefährdet wird. Auf Fahrbahnen mit Leitlinien soll innerhalb der Fahrstreifen gefahren werden.',
      keyPoints: [
        { label: '295 darf nicht überfahren werden', keywords: ['nicht überfahren', 'nicht überqueren', 'darf nicht'] },
        { label: 'Links davon nicht fahren', keywords: ['links'] },
        { label: 'Leitlinie zur Orientierung', keywords: ['orientierung', 'leitlinie', 'unterbrochen'] },
        { label: 'Leitlinie überfahren nur ohne Gefährdung', keywords: ['gefährdung', 'überfahren'] },
        { label: 'Park-/Haltregel (3 m)', keywords: ['3 m', 'drei meter', 'parken'] }
      ],
      followUps: [
        'Was gilt bei einer einseitigen Fahrstreifenbegrenzung (Zeichen 296)?',
        'Wie erklären Sie einem Schüler die Bedeutung einer Sperrfläche?'
      ]
    },
    {
      id: 'zeichen-07',
      subject: 'zeichen',
      topic: 'Radverkehr',
      difficulty: 2,
      question: 'Welche Bedeutung haben die blauen Radwegzeichen (Zeichen 237, 240, 241) für Rad- und Kraftfahrer?',
      explanation: 'Blaue runde Schilder sind Gebote. Für Radfahrer heißt das: Den Radweg muss man benutzen. Für Autofahrer heißt das: Dieser Weg ist tabu.',
      example: 'Beim Rechtsabbiegen über einen benutzungspflichtigen Radweg muss Ihr Schüler einen Schulterblick machen – Radfahrer auf dem Radweg sind geradeaus unterwegs und haben Vorrang.',
      modelAnswer: 'Zeichen 237 (Radweg), 240 (gemeinsamer Geh- und Radweg) und 241 (getrennter Rad- und Gehweg) sind Vorschriftzeichen. Sie begründen eine Radwegbenutzungspflicht in Fahrtrichtung. Andere Verkehrsteilnehmer dürfen diese Wege nicht benutzen. Beim gemeinsamen Geh- und Radweg muss der Radverkehr auf Fußgänger Rücksicht nehmen. Für Kraftfahrer ist wichtig: Beim Abbiegen haben geradeaus fahrende Radfahrer auf dem Radweg Vorrang, deshalb ist ein Schulterblick zwingend.',
      keyPoints: [
        { label: 'Benutzungspflicht für Radfahrer', keywords: ['benutzungspflicht', 'benutzen müssen', 'pflicht'] },
        { label: 'Für andere verboten', keywords: ['verboten', 'andere', 'kraftfahrzeuge'] },
        { label: 'Rücksicht auf Fußgänger (240)', keywords: ['fußgänger', 'rücksicht'] },
        { label: 'Abbiegen: Schulterblick/Vorrang Radverkehr', keywords: ['schulterblick', 'abbiegen', 'vorrang'] }
      ],
      followUps: [
        'Wie trainieren Sie den Schulterblick beim Rechtsabbiegen mit einem Fahranfänger?',
        'Was gilt auf einem Radweg ohne blaues Zeichen?'
      ]
    },

    // ------------------------------------------------------------------ Pädagogik
    {
      id: 'paed-01',
      subject: 'paedagogik',
      topic: 'Lernzielbereiche',
      difficulty: 1,
      question: 'Welche Lernzielbereiche unterscheidet man und wie zeigen sie sich in der Fahrausbildung?',
      explanation: 'Lernen betrifft drei Bereiche: Wissen (Kopf), Einstellung (Herz) und Fertigkeiten (Hand). Ein guter Fahrer braucht alle drei.',
      example: 'Beim Thema Abstand: Der Schüler kennt die Faustformel (kognitiv), er will freiwillig Abstand halten, auch wenn andere drängeln (affektiv), und er kann den Abstand im Verkehr tatsächlich halten (psychomotorisch).',
      modelAnswer: 'Man unterscheidet den kognitiven Lernzielbereich (Wissen, Verstehen, Anwenden – z. B. Vorfahrtregeln), den affektiven Bereich (Einstellungen, Werte, Motive – z. B. Rücksicht, Risikobereitschaft) und den psychomotorischen Bereich (Fertigkeiten, Bewegungsabläufe – z. B. Lenken, Schalten, Bremsen). In der Fahrausbildung müssen alle drei verknüpft werden: Wissen allein reicht nicht, wenn die Einstellung fehlt oder die Handlung nicht automatisiert ist. Gerade der affektive Bereich ist für die Verkehrssicherheit entscheidend und wird z. B. durch Diskussion, Reflexion und Vorbild gefördert.',
      keyPoints: [
        { label: 'Kognitiv (Wissen)', keywords: ['kognitiv', 'wissen'] },
        { label: 'Affektiv (Einstellung)', keywords: ['affektiv', 'einstellung', 'haltung'] },
        { label: 'Psychomotorisch (Fertigkeit)', keywords: ['psychomotorisch', 'fertigkeit', 'motorisch'] },
        { label: 'Verknüpfung in der Ausbildung', keywords: ['verknüpf', 'zusammen', 'alle drei'] },
        { label: 'Bedeutung affektiver Ziele für Sicherheit', keywords: ['sicherheit', 'risiko', 'rücksicht'] }
      ],
      followUps: [
        'Wie können Sie affektive Lernziele im Theorieunterricht konkret fördern?',
        'Nennen Sie ein Beispiel, wie Sie prüfen, ob ein affektives Lernziel erreicht wurde.'
      ]
    },
    {
      id: 'paed-02',
      subject: 'paedagogik',
      topic: 'Unterrichtsplanung',
      difficulty: 2,
      question: 'Wie gliedern Sie eine Unterrichtseinheit im Theorieunterricht? Beschreiben Sie die Phasen.',
      explanation: 'Gute Stunden haben einen roten Faden: Interesse wecken, gemeinsam erarbeiten, sichern, anwenden und zum Schluss prüfen, ob es angekommen ist.',
      example: 'Thema Kreisverkehr: Einstieg mit einem Foto einer chaotischen Kreisverkehr-Situation, Erarbeitung der Regeln im Gespräch, Sicherung an der Tafel, Transfer mit einer neuen Skizze, Abschluss mit Kurzfragen.',
      modelAnswer: 'Eine Unterrichtseinheit gliedere ich in: 1. Einstieg/Motivation – Interesse wecken, an Vorerfahrungen anknüpfen, Ziel transparent machen. 2. Erarbeitung – neue Inhalte schüleraktiv entwickeln, z. B. im Lehrgespräch, mit Medien oder in Gruppenarbeit. 3. Sicherung/Festigung – Ergebnisse zusammenfassen, visualisieren, wiederholen. 4. Transfer/Anwendung – das Gelernte auf neue Verkehrssituationen übertragen. 5. Lernerfolgskontrolle/Abschluss – Verständnis überprüfen, Ausblick geben. Grundlage ist eine Planung mit Lernzielen, Methoden, Medien und Zeit.',
      keyPoints: [
        { label: 'Einstieg/Motivation', keywords: ['einstieg', 'motivation', 'interesse'] },
        { label: 'Erarbeitung', keywords: ['erarbeitung', 'erarbeiten'] },
        { label: 'Sicherung/Festigung', keywords: ['sicherung', 'festigung', 'zusammenfass'] },
        { label: 'Transfer/Anwendung', keywords: ['transfer', 'anwendung', 'übertragen'] },
        { label: 'Lernerfolgskontrolle', keywords: ['kontrolle', 'lernerfolg', 'überprüfen'] },
        { label: 'Planung mit Lernzielen/Methoden/Medien', keywords: ['lernziel', 'methode', 'medien'] }
      ],
      followUps: [
        'Welche Medien setzen Sie in der Erarbeitungsphase ein und warum?',
        'Wie gehen Sie vor, wenn die Lernerfolgskontrolle zeigt, dass viele Teilnehmer das Thema nicht verstanden haben?'
      ]
    },
    {
      id: 'paed-03',
      subject: 'paedagogik',
      topic: 'Lernen am Modell',
      difficulty: 1,
      question: 'Was versteht man unter „Lernen am Modell“ und welche Bedeutung hat es für den Fahrlehrer?',
      explanation: 'Menschen lernen viel durch Zuschauen und Nachmachen. Der Fahrlehrer wird beobachtet – im Auto, aber auch, wie er selbst fährt und spricht. Er ist also immer Vorbild.',
      example: 'Wenn Sie selbst im Fahrschulwagen telefonieren oder auf dem Weg zum Schüler zu schnell fahren, untergraben Sie alles, was Sie im Unterricht über Ablenkung und Geschwindigkeit erzählen.',
      modelAnswer: 'Lernen am Modell (Albert Bandura) beschreibt, dass Menschen Verhalten übernehmen, indem sie andere beobachten. Es läuft in Phasen ab: Aufmerksamkeit, Speichern (Behalten), Nachahmen (Reproduktion) und Motivation/Verstärkung. Für den Fahrlehrer bedeutet das: Er ist ständiges Vorbild – beim Vorführen von Fahraufgaben, im Umgangston und im eigenen Verkehrsverhalten. Auch Eltern und Freunde sind Modelle; ungünstiges Modellverhalten muss im Unterricht angesprochen werden.',
      keyPoints: [
        { label: 'Beobachten und Nachahmen', keywords: ['beobacht', 'nachahm', 'nachmachen'] },
        { label: 'Bandura', keywords: ['bandura'] },
        { label: 'Phasen (Aufmerksamkeit, Behalten, Reproduktion, Motivation)', keywords: ['aufmerksamkeit', 'behalten', 'reproduktion', 'motivation'] },
        { label: 'Fahrlehrer als Vorbild', keywords: ['vorbild'] },
        { label: 'Andere Modelle (Eltern, Freunde)', keywords: ['eltern', 'freunde', 'umfeld'] }
      ],
      followUps: [
        'Wie gehen Sie damit um, wenn ein Schüler sagt: „Mein Vater fährt das aber immer so“?',
        'Wie setzen Sie das Vormachen in der praktischen Ausbildung gezielt ein?'
      ]
    },
    {
      id: 'paed-04',
      subject: 'paedagogik',
      topic: 'Feedback',
      difficulty: 1,
      question: 'Nach welchen Regeln geben Sie Ihren Fahrschülern Rückmeldung?',
      explanation: 'Gutes Feedback hilft dem Schüler, besser zu werden – ohne ihn zu entmutigen. Es ist konkret, kommt zeitnah und beschreibt, was passiert ist, statt die Person zu bewerten.',
      example: 'Statt „Das war wieder nichts!“ sagen Sie nach der Fahrt: „Beim Spurwechsel auf der Hauptstraße hat der Schulterblick gefehlt. Was hätte passieren können? Wie machen wir es beim nächsten Mal?“',
      modelAnswer: 'Feedback sollte zeitnah, konkret und beschreibend statt wertend sein. Ich beginne mit dem, was gelungen ist, benenne dann Verbesserungspunkte und erarbeite gemeinsam mit dem Schüler Lösungen. Ich formuliere in Ich-Botschaften, beziehe mich auf beobachtbares Verhalten und nicht auf die Person und dosiere die Menge, damit der Schüler nicht überfordert wird. Während schwieriger Fahrsituationen gebe ich nur kurze, klare Anweisungen; die ausführliche Besprechung folgt an einer sicheren Stelle oder nach der Fahrt. Wichtig ist auch, den Schüler zur Selbsteinschätzung anzuregen.',
      keyPoints: [
        { label: 'Zeitnah', keywords: ['zeitnah', 'sofort', 'unmittelbar'] },
        { label: 'Konkret/beschreibend', keywords: ['konkret', 'beschreib', 'beobachtbar'] },
        { label: 'Positives zuerst', keywords: ['positiv', 'gelungen', 'lob'] },
        { label: 'Ich-Botschaften', keywords: ['ich-botschaft', 'ich botschaft'] },
        { label: 'Selbsteinschätzung anregen', keywords: ['selbsteinschätzung', 'selbst', 'reflex'] },
        { label: 'Nicht während schwieriger Situationen', keywords: ['sichere stelle', 'nach der fahrt', 'anhalten'] }
      ],
      followUps: [
        'Wie reagieren Sie, wenn ein Schüler auf Kritik gereizt oder verletzt reagiert?',
        'Warum ist die Selbsteinschätzung des Schülers so wichtig?'
      ]
    },
    {
      id: 'paed-05',
      subject: 'paedagogik',
      topic: 'Prüfungsangst',
      difficulty: 2,
      question: 'Wie erkennen Sie Prüfungsangst bei einem Fahrschüler und wie können Sie ihm helfen?',
      explanation: 'Ein bisschen Aufregung ist normal und kann sogar helfen. Zu viel Angst blockiert aber. Der Fahrlehrer kann durch Sicherheit, Wissen über den Ablauf und realistische Übung viel Angst nehmen.',
      example: 'Eine Schülerin fährt in den Stunden sicher, bekommt aber vor der Prüfung Herzrasen. Sie üben eine „Generalprobe“ mit fremdem Fahrlehrer auf dem Rücksitz, besprechen den genauen Ablauf und üben eine einfache Atemtechnik.',
      modelAnswer: 'Prüfungsangst zeigt sich körperlich (Schwitzen, Zittern, Herzrasen), emotional (Nervosität, Unsicherheit) und im Verhalten (Fehler bei eigentlich beherrschten Aufgaben, Blackout, Vermeidung). Ursachen sind oft Versagensangst, frühere Misserfolge oder Druck von außen. Hilfen: Transparenz über Ablauf und Bewertung der Prüfung schaffen, Prüfungsreife ehrlich beurteilen, Prüfungssimulationen durchführen, Erfolge bewusst machen und Selbstvertrauen stärken, Entspannungs- und Atemtechniken vermitteln, ruhig und positiv auftreten und am Prüfungstag eine kurze Einfahrphase einplanen. Ein mittleres Erregungsniveau ist leistungsfördernd (Yerkes-Dodson).',
      keyPoints: [
        { label: 'Anzeichen erkennen (körperlich/Verhalten)', keywords: ['schwitzen', 'zittern', 'herzrasen', 'blackout', 'nervös'] },
        { label: 'Ursachen', keywords: ['versagensangst', 'misserfolg', 'druck', 'ursache'] },
        { label: 'Transparenz über Ablauf', keywords: ['ablauf', 'transparenz', 'informieren'] },
        { label: 'Prüfungssimulation', keywords: ['simulation', 'probeprüfung', 'generalprobe'] },
        { label: 'Entspannung/Atemtechnik', keywords: ['entspannung', 'atem'] },
        { label: 'Selbstvertrauen stärken', keywords: ['selbstvertrauen', 'erfolg', 'bestärk', 'lob'] }
      ],
      followUps: [
        'Was besagt das Yerkes-Dodson-Gesetz?',
        'Wie verhalten Sie sich am Prüfungstag selbst gegenüber dem Schüler?'
      ]
    },
    {
      id: 'paed-06',
      subject: 'paedagogik',
      topic: 'Didaktische Grundsätze',
      difficulty: 1,
      question: 'Nennen Sie didaktische Grundsätze, nach denen Sie die praktische Fahrausbildung aufbauen.',
      explanation: 'Man fängt mit dem Leichten an und steigert sich langsam. So wird der Schüler weder unter- noch überfordert und kann Schritt für Schritt Routine aufbauen.',
      example: 'Das Anfahren am Berg wird erst geübt, wenn Anfahren in der Ebene sicher klappt. Die Innenstadt zur Hauptverkehrszeit kommt erst, wenn Schalten und Blickführung automatisiert sind.',
      modelAnswer: 'Wichtige Grundsätze sind: vom Leichten zum Schweren, vom Einfachen zum Komplexen, vom Bekannten zum Unbekannten. Außerdem Anschaulichkeit, Schülerorientierung (Lerntempo und Vorerfahrung berücksichtigen), Aktivierung des Lernenden, Wiederholung und Festigung sowie Erfolgssicherung. Für das Lernen von Bewegungsabläufen eignet sich die Vier-Stufen-Methode: Vorbereiten/Erklären, Vormachen, Nachmachen lassen, Üben. Die Ausbildung orientiert sich am Ausbildungsplan und an den Fahraufgaben der Prüfung.',
      keyPoints: [
        { label: 'Vom Leichten zum Schweren', keywords: ['leichten zum schweren', 'leicht', 'schwer'] },
        { label: 'Vom Einfachen zum Komplexen', keywords: ['einfach', 'komplex'] },
        { label: 'Vom Bekannten zum Unbekannten', keywords: ['bekannt', 'unbekannt'] },
        { label: 'Schülerorientierung/Lerntempo', keywords: ['schülerorient', 'lerntempo', 'individuell'] },
        { label: 'Vier-Stufen-Methode', keywords: ['vier-stufen', 'vier stufen', 'vormachen', 'nachmachen'] },
        { label: 'Wiederholung/Festigung', keywords: ['wiederhol', 'festig', 'üben'] }
      ],
      followUps: [
        'Beschreiben Sie die Vier-Stufen-Methode an einem konkreten Beispiel.',
        'Woran erkennen Sie, dass ein Schüler überfordert ist?'
      ]
    },
    {
      id: 'paed-07',
      subject: 'paedagogik',
      topic: 'Kompetenzorientierte Prüfung (OFP)',
      difficulty: 3,
      question: 'Welche Fahrkompetenzbereiche werden in der optimierten praktischen Fahrerlaubnisprüfung (OFP) bewertet und was bedeutet das für Ihre Ausbildung?',
      explanation: 'Seit der OFP wird nicht nur nach Fehlern geschaut, sondern danach, ob der Schüler bestimmte Fähigkeiten zeigt. Diese Bereiche sollte man in jeder Fahrstunde gezielt trainieren und zurückmelden.',
      example: 'Nach einer Stadtfahrt geben Sie Rückmeldung in den gleichen Kategorien wie der Prüfer: Verkehrsbeobachtung gut, Geschwindigkeitsanpassung im Wohngebiet noch zu hoch, Kommunikation (Blinken) vorbildlich.',
      modelAnswer: 'In der OFP werden fünf Fahrkompetenzbereiche beobachtet und bewertet: Verkehrsbeobachtung, Fahrzeugpositionierung, Geschwindigkeitsanpassung, Kommunikation sowie Fahrzeugbedienung/umweltbewusste Fahrweise. Diese werden in Fahraufgaben (z. B. Kreuzungen, Kreisverkehr, Ein- und Ausfahren, Überholen) beurteilt. Für die Ausbildung bedeutet das: Ich richte meine Planung und Rückmeldungen an diesen Kompetenzbereichen aus, nutze eine Ausbildungsdokumentation, mache Lernfortschritte transparent und bereite den Schüler auf die strukturierte Rückmeldung nach der Prüfung vor.',
      keyPoints: [
        { label: 'Verkehrsbeobachtung', keywords: ['verkehrsbeobachtung', 'beobachtung'] },
        { label: 'Fahrzeugpositionierung', keywords: ['positionierung', 'position'] },
        { label: 'Geschwindigkeitsanpassung', keywords: ['geschwindigkeitsanpassung', 'geschwindigkeit'] },
        { label: 'Kommunikation', keywords: ['kommunikation', 'blinken', 'zeichen geben'] },
        { label: 'Fahrzeugbedienung/umweltbewusst', keywords: ['bedienung', 'umweltbewusst', 'umwelt'] },
        { label: 'Ausbildung danach ausrichten', keywords: ['ausrichten', 'rückmeldung', 'dokumentation', 'fahraufgaben'] }
      ],
      followUps: [
        'Nennen Sie drei Fahraufgaben aus der OFP.',
        'Wie dokumentieren Sie den Ausbildungsstand entlang der Kompetenzbereiche?'
      ]
    },

    // ------------------------------------------------------------------ Recht
    {
      id: 'recht-01',
      subject: 'recht',
      topic: 'Fahrlehrerlaubnis',
      difficulty: 2,
      question: 'Welche Voraussetzungen müssen für die Erteilung der Fahrlehrerlaubnis der Klasse BE erfüllt sein?',
      explanation: 'Wer Fahrlehrer werden will, muss alt genug, geeignet, zuverlässig und gut ausgebildet sein – und natürlich selbst schon länger Auto fahren.',
      example: 'Ein Bewerber hat seinen Führerschein Klasse B erst seit zwei Jahren. Er muss noch warten, bis er die Mindestbesitzzeit erfüllt.',
      modelAnswer: 'Nach § 2 FahrlG wird die Fahrlehrerlaubnis erteilt, wenn der Bewerber das 21. Lebensjahr vollendet hat, geistig und körperlich geeignet ist, keine Tatsachen vorliegen, die ihn für den Beruf unzuverlässig erscheinen lassen, und er fachlich und pädagogisch geeignet ist. Er muss eine abgeschlossene Berufsausbildung oder eine gleichwertige Vorbildung besitzen, die Fahrerlaubnis der Klasse B seit mindestens drei Jahren besitzen, die vorgeschriebene Ausbildung (für BE mindestens zwölf Monate in Ausbildungsstätte und Ausbildungsfahrschule) absolviert und die Fahrlehrerprüfung bestanden haben. Ausreichende Deutschkenntnisse sind ebenfalls erforderlich.',
      keyPoints: [
        { label: 'Mindestalter 21 Jahre', keywords: ['21'] },
        { label: 'Geistige/körperliche Eignung', keywords: ['geistig', 'körperlich', 'eignung'] },
        { label: 'Zuverlässigkeit', keywords: ['zuverlässig'] },
        { label: 'Klasse B seit mind. 3 Jahren', keywords: ['3 jahre', 'drei jahre', 'klasse b'] },
        { label: 'Berufsausbildung/gleichwertige Vorbildung', keywords: ['berufsausbildung', 'vorbildung'] },
        { label: 'Ausbildung und bestandene Prüfung', keywords: ['prüfung', 'ausbildung', 'ausbildungsfahrschule'] }
      ],
      followUps: [
        'Wie lange dauert die Fahrlehrerausbildung für die Klasse BE mindestens?',
        'Aus welchen Teilen besteht die Fahrlehrerprüfung für die Klasse BE?'
      ]
    },
    {
      id: 'recht-02',
      subject: 'recht',
      topic: 'Probezeit',
      difficulty: 2,
      question: 'Erläutern Sie die Regelungen zur Fahrerlaubnis auf Probe.',
      explanation: 'Wer neu den Führerschein macht, ist erst einmal zwei Jahre „auf Probe“. Wer in dieser Zeit schwere Verstöße begeht, muss nachschulen und die Probezeit verlängert sich.',
      example: 'Ein ehemaliger Schüler wird in der Probezeit mit 25 km/h zu schnell innerorts geblitzt. Das ist ein A-Verstoß: Er muss ein Aufbauseminar besuchen, und seine Probezeit verlängert sich auf vier Jahre.',
      modelAnswer: 'Nach § 2a StVG wird die Fahrerlaubnis bei Ersterwerb auf Probe erteilt; die Probezeit dauert zwei Jahre. Verstöße werden in schwerwiegende (A) und weniger schwerwiegende (B) Zuwiderhandlungen eingeteilt. Bei einer A- oder zwei B-Zuwiderhandlungen wird die Teilnahme an einem Aufbauseminar angeordnet, und die Probezeit verlängert sich um zwei Jahre. Bei einer erneuten A- oder zwei weiteren B-Zuwiderhandlungen erfolgt eine schriftliche Verwarnung mit Empfehlung einer verkehrspsychologischen Beratung. Bei weiteren Verstößen nach Ablauf der dort gesetzten Frist wird die Fahrerlaubnis entzogen. In der Probezeit und bis zum 21. Lebensjahr gilt zudem ein absolutes Alkoholverbot (0,0 Promille, § 24c StVG).',
      keyPoints: [
        { label: '2 Jahre Probezeit', keywords: ['zwei jahre', '2 jahre'] },
        { label: 'A- und B-Verstöße', keywords: ['a-verstoß', 'b-verstoß', 'schwerwiegend', 'zuwiderhandlung'] },
        { label: 'Aufbauseminar', keywords: ['aufbauseminar'] },
        { label: 'Verlängerung um 2 Jahre', keywords: ['verlänger', 'vier jahre', '4 jahre'] },
        { label: 'Verwarnung/verkehrspsych. Beratung', keywords: ['verwarnung', 'verkehrspsychologisch', 'beratung'] },
        { label: 'Entzug als letzte Stufe', keywords: ['entzug', 'entzogen'] },
        { label: 'Alkoholverbot 0,0 Promille', keywords: ['0,0', 'alkoholverbot', 'promille'] }
      ],
      followUps: [
        'Nennen Sie je ein Beispiel für einen A- und einen B-Verstoß.',
        'Wie lange gilt das absolute Alkoholverbot für Fahranfänger?'
      ]
    },
    {
      id: 'recht-03',
      subject: 'recht',
      topic: 'Fahreignungs-Bewertungssystem',
      difficulty: 2,
      question: 'Beschreiben Sie das Fahreignungs-Bewertungssystem (Punktesystem) und seine Maßnahmenstufen.',
      explanation: 'Verstöße bringen Punkte in Flensburg. Je mehr Punkte, desto deutlicher die Warnung. Bei 8 Punkten ist der Führerschein weg.',
      example: 'Im Theorieunterricht fragt ein Schüler, ob man „mit 7 Punkten noch fahren darf“. Nutzen Sie die Frage, um auch über das Ziel hinter dem System – Verkehrssicherheit – zu sprechen.',
      modelAnswer: 'Verkehrsverstöße werden im Fahreignungsregister mit 1 bis 3 Punkten bewertet (1 Punkt: verkehrssicherheitsbeeinträchtigende Ordnungswidrigkeit, 2 Punkte: besonders schwere Ordnungswidrigkeit bzw. Straftat ohne Entziehung, 3 Punkte: Straftat mit Entziehung der Fahrerlaubnis). Maßnahmen: 4–5 Punkte Ermahnung (Vormerkung), 6–7 Punkte Verwarnung, ab 8 Punkten Entziehung der Fahrerlaubnis. Durch freiwillige Teilnahme an einem Fahreignungsseminar kann bei 1–5 Punkten ein Punkt abgebaut werden (einmal in fünf Jahren). Punkte verjähren je nach Schwere nach 2,5, 5 oder 10 Jahren.',
      keyPoints: [
        { label: 'Bewertung mit 1–3 Punkten', keywords: ['1 bis 3', 'ein bis drei', '1-3', 'punkte'] },
        { label: '4–5 Punkte Ermahnung', keywords: ['ermahnung'] },
        { label: '6–7 Punkte Verwarnung', keywords: ['verwarnung'] },
        { label: '8 Punkte Entziehung', keywords: ['8 punkte', 'acht punkte', 'entzieh', 'entzug'] },
        { label: 'Fahreignungsseminar/Punkteabbau', keywords: ['fahreignungsseminar', 'abbau'] },
        { label: 'Tilgungsfristen', keywords: ['tilgung', 'verjähr', '2,5', '5 jahre', '10 jahre'] }
      ],
      followUps: [
        'Wie verhält sich das Punktesystem zu den Maßnahmen in der Probezeit?',
        'Wie läuft ein Fahreignungsseminar ab?'
      ]
    },
    {
      id: 'recht-04',
      subject: 'recht',
      topic: 'Verantwortung des Fahrlehrers',
      difficulty: 2,
      question: 'Wer gilt bei einer Ausbildungsfahrt als Führer des Kraftfahrzeugs und welche Folgen hat das?',
      explanation: 'Der Fahrschüler lenkt zwar, aber verantwortlich ist der Fahrlehrer. Das Gesetz behandelt ihn so, als würde er selbst fahren.',
      example: 'Ihr Schüler fährt bei Rot über die Ampel, weil Sie gerade auf Ihr Tablet geschaut haben. Der Verstoß wird Ihnen zugerechnet – Sie bekommen den Bußgeldbescheid und ggf. Punkte.',
      modelAnswer: 'Nach § 2 Abs. 15 StVG gilt bei Ausbildungs- und Prüfungsfahrten der Fahrlehrer als Führer des Kraftfahrzeugs, auch wenn er nicht selbst lenkt. Folglich ist er für Verkehrsverstöße verantwortlich, muss fahrtüchtig sein (z. B. Alkohol- und Medikamentenregeln gelten für ihn) und darf sich nicht ablenken lassen. Er muss jederzeit eingreifen können, z. B. über die Doppelbedienung. Der Fahrschüler gilt nicht als Führer. Zivilrechtlich haften Halter und ggf. Fahrlehrer, abgesichert über die Kfz-Haftpflichtversicherung.',
      keyPoints: [
        { label: 'Fahrlehrer gilt als Führer', keywords: ['fahrlehrer gilt', 'führer des', 'fahrzeugführer'] },
        { label: '§ 2 Abs. 15 StVG', keywords: ['2 abs. 15', 'stvg'] },
        { label: 'Verantwortung für Verstöße', keywords: ['verantwort', 'verstoß', 'bußgeld'] },
        { label: 'Fahrtüchtigkeit (Alkohol etc.)', keywords: ['alkohol', 'fahrtüchtig', 'medikament'] },
        { label: 'Eingreifen/Doppelbedienung', keywords: ['eingreifen', 'doppelbedienung', 'doppelpedal'] },
        { label: 'Haftung/Versicherung', keywords: ['haftung', 'versicherung', 'halter'] }
      ],
      followUps: [
        'Gilt das auch für die Fahrprüfung?',
        'Welche Promillegrenze gilt für Sie als Fahrlehrer während einer Ausbildungsfahrt?'
      ]
    },
    {
      id: 'recht-05',
      subject: 'recht',
      topic: 'Begleitetes Fahren ab 17',
      difficulty: 2,
      question: 'Welche Regeln gelten für das begleitete Fahren ab 17?',
      explanation: 'Mit 17 darf man schon Auto fahren – aber nur mit einer eingetragenen erfahrenen Begleitperson. Diese hilft und berät, unterrichtet aber nicht.',
      example: 'Eltern fragen Sie beim Anmeldegespräch, ob der Opa mit 2 Punkten in Flensburg Begleiter sein kann. Sie können die Voraussetzungen sicher erklären.',
      modelAnswer: 'Nach § 48a FeV kann die Fahrerlaubnis der Klasse B (und BE) ab 17 Jahren erteilt werden, wenn der Fahrer bis zum 18. Geburtstag nur in Begleitung einer namentlich benannten Begleitperson fährt. Die Begleitperson muss mindestens 30 Jahre alt sein, seit mindestens fünf Jahren die Fahrerlaubnis der Klasse B besitzen und darf zum Zeitpunkt der Beantragung höchstens einen Punkt im Fahreignungsregister haben. Für sie gelten die 0,5-Promille-Grenze und das Verbot berauschender Mittel. Die Begleitperson soll Ansprechpartner sein, sie hat keine Ausbilderfunktion. Als Nachweis dient eine Prüfungsbescheinigung.',
      keyPoints: [
        { label: '§ 48a FeV', keywords: ['48a', 'fev'] },
        { label: 'Begleiter mind. 30 Jahre', keywords: ['30'] },
        { label: 'Klasse B seit 5 Jahren', keywords: ['5 jahre', 'fünf jahre'] },
        { label: 'Max. 1 Punkt', keywords: ['1 punkt', 'einen punkt', 'ein punkt'] },
        { label: 'Namentlich benannt/Prüfungsbescheinigung', keywords: ['namentlich', 'bescheinigung', 'eingetragen'] },
        { label: 'Keine Ausbilderfunktion', keywords: ['ansprechpartner', 'keine ausbild', 'nicht ausbild', 'beraten'] }
      ],
      followUps: [
        'Welche Alkoholregel gilt für die Begleitperson?',
        'Was passiert, wenn der 17-Jährige ohne Begleitperson fährt?'
      ]
    },
    {
      id: 'recht-06',
      subject: 'recht',
      topic: 'Fortbildungspflicht',
      difficulty: 2,
      question: 'Welche Fortbildungspflichten haben Fahrlehrer nach dem Fahrlehrergesetz?',
      explanation: 'Fahrlehrer müssen regelmäßig zur Fortbildung – Recht, Technik und Pädagogik ändern sich ständig. Wer das nicht nachweist, riskiert seine Erlaubnis.',
      example: 'Ihr Kollege hat seine Fortbildung „vergessen“. Erklären Sie ihm, welche Fristen gelten und welche Folgen drohen.',
      modelAnswer: 'Nach § 53 FahrlG muss jeder Inhaber einer Fahrlehrerlaubnis alle vier Jahre an einer dreitägigen Fortbildung teilnehmen. Inhaber einer Seminarerlaubnis (Aufbauseminar bzw. Verkehrspädagogik) müssen zusätzlich alle zwei Jahre an einer eintägigen Fortbildung teilnehmen, Ausbildungsfahrlehrer alle vier Jahre an einer eintägigen Fortbildung. Die Teilnahme muss gegenüber der Erlaubnisbehörde nachgewiesen werden. Wird die Fortbildung trotz Fristsetzung nicht nachgewiesen, kann die Fahrlehrerlaubnis widerrufen werden.',
      keyPoints: [
        { label: '§ 53 FahrlG', keywords: ['53'] },
        { label: 'Alle 4 Jahre 3 Tage', keywords: ['vier jahre', '4 jahre', 'drei tage', '3 tage', 'dreitägig'] },
        { label: 'Seminarerlaubnis: alle 2 Jahre', keywords: ['seminarerlaubnis', 'zwei jahre', '2 jahre'] },
        { label: 'Nachweis gegenüber Behörde', keywords: ['nachweis', 'behörde'] },
        { label: 'Folge: Widerruf möglich', keywords: ['widerruf', 'entzug'] }
      ],
      followUps: [
        'Welche Themen sollten in einer Fortbildung für Fahrlehrer behandelt werden?',
        'Was gilt für Ausbildungsfahrlehrer?'
      ]
    },
    {
      id: 'recht-07',
      subject: 'recht',
      topic: 'Alkohol im Straßenverkehr',
      difficulty: 2,
      question: 'Welche Promillegrenzen und Rechtsfolgen sollten Sie Ihren Fahrschülern zum Thema Alkohol erklären?',
      explanation: 'Schon wenig Alkohol verschlechtert Reaktion und Einschätzung. Für Fahranfänger gilt deshalb Null. Für alle anderen gibt es abgestufte Grenzen – und ab 1,1 Promille ist es immer eine Straftat.',
      example: 'Im Unterricht rechnen Sie mit den Schülern durch, wie lange der Abbau von Alkohol dauert (ca. 0,1 Promille pro Stunde) – viele unterschätzen den „Restalkohol“ am nächsten Morgen.',
      modelAnswer: 'Für Fahranfänger in der Probezeit und unter 21 Jahren gilt 0,0 Promille (§ 24c StVG). Ab 0,3 Promille liegt bei Ausfallerscheinungen oder einem Unfall eine Straftat vor (relative Fahruntüchtigkeit). Ab 0,5 Promille ist das Führen eines Kfz eine Ordnungswidrigkeit nach § 24a StVG (Bußgeld, Punkte, Fahrverbot). Ab 1,1 Promille besteht absolute Fahruntüchtigkeit – eine Straftat (§ 316 StGB) mit Entziehung der Fahrerlaubnis. Ab 1,6 Promille wird in der Regel eine MPU angeordnet. Der Alkoholabbau beträgt etwa 0,1 bis 0,2 Promille pro Stunde.',
      keyPoints: [
        { label: '0,0 für Fahranfänger/unter 21', keywords: ['0,0', 'null promille', 'fahranfänger'] },
        { label: '0,3 relative Fahruntüchtigkeit', keywords: ['0,3', 'relative', 'ausfallerscheinung'] },
        { label: '0,5 Ordnungswidrigkeit', keywords: ['0,5', 'ordnungswidrigkeit'] },
        { label: '1,1 absolute Fahruntüchtigkeit/Straftat', keywords: ['1,1', 'absolute', 'straftat'] },
        { label: '1,6 MPU', keywords: ['1,6', 'mpu'] },
        { label: 'Abbau ca. 0,1 Promille/Stunde', keywords: ['abbau', 'pro stunde', 'restalkohol'] }
      ],
      followUps: [
        'Wie würden Sie das Thema Alkohol im Unterricht methodisch aufbereiten?',
        'Was ist der Unterschied zwischen relativer und absoluter Fahruntüchtigkeit?'
      ]
    },

    // ------------------------------------------------------------------ Technik
    {
      id: 'technik-01',
      subject: 'technik',
      topic: 'Anhalteweg',
      difficulty: 1,
      question: 'Wie setzt sich der Anhalteweg zusammen und wie berechnen Sie ihn mit den Faustformeln?',
      explanation: 'Bis das Auto steht, vergeht Zeit: erst die Schrecksekunde (Reaktionsweg), dann das eigentliche Bremsen (Bremsweg). Beides zusammen ist der Anhalteweg.',
      example: 'Bei 50 km/h: Reaktionsweg 15 m + Bremsweg 25 m = 40 m. Bei einer Gefahrbremsung 15 m + 12,5 m = 27,5 m. Lassen Sie den Schüler die Strecke auf einem Parkplatz abschreiten – das wirkt nachhaltiger als jede Formel.',
      modelAnswer: 'Der Anhalteweg ist die Summe aus Reaktionsweg und Bremsweg. Reaktionsweg = (Geschwindigkeit in km/h ÷ 10) × 3. Bremsweg (normale Bremsung) = (Geschwindigkeit ÷ 10) × (Geschwindigkeit ÷ 10). Bei einer Gefahrbremsung halbiert sich der Bremsweg nach der Faustformel. Wichtig: Der Bremsweg wächst quadratisch mit der Geschwindigkeit – doppelte Geschwindigkeit bedeutet vierfachen Bremsweg. Einflussfaktoren sind Fahrbahnzustand, Reifen, Bremsen, Beladung sowie beim Reaktionsweg Müdigkeit, Alkohol und Ablenkung.',
      keyPoints: [
        { label: 'Reaktionsweg + Bremsweg', keywords: ['reaktionsweg', 'bremsweg'] },
        { label: 'Formel Reaktionsweg (v/10)·3', keywords: ['mal 3', '× 3', 'x 3', '*3', '* 3'] },
        { label: 'Formel Bremsweg (v/10)²', keywords: ['quadrat', '(v/10)', 'mal geschwindigkeit', '× (', 'x (', 'v/10 * v/10'] },
        { label: 'Gefahrbremsung: halbieren', keywords: ['gefahrbremsung', 'halb', 'durch 2'] },
        { label: 'Quadratischer Anstieg', keywords: ['vierfach', 'quadratisch', 'doppelte'] },
        { label: 'Einflussfaktoren', keywords: ['fahrbahn', 'reifen', 'müdigkeit', 'ablenkung', 'nässe'] }
      ],
      followUps: [
        'Rechnen Sie den Anhalteweg bei 100 km/h mit normaler Bremsung vor.',
        'Welche Faktoren verlängern den Reaktionsweg?'
      ]
    },
    {
      id: 'technik-02',
      subject: 'technik',
      topic: 'ABS und ESP',
      difficulty: 2,
      question: 'Erklären Sie Funktion und Grenzen von ABS und ESP.',
      explanation: 'ABS verhindert, dass die Räder beim Bremsen blockieren – so bleibt das Auto lenkbar. ESP bremst einzelne Räder gezielt ab, damit das Auto nicht ins Schleudern gerät. Beide helfen, können aber die Physik nicht aufheben.',
      example: 'Bei einer Gefahrbremsung auf dem Übungsplatz spürt der Schüler das Pulsieren im Bremspedal. Erklären Sie: „Voll draufbleiben und um das Hindernis herumlenken!“',
      modelAnswer: 'Das Antiblockiersystem (ABS) verhindert über Raddrehzahlsensoren und Druckregelung das Blockieren der Räder beim Bremsen. Dadurch bleibt das Fahrzeug lenkbar und fahrstabil. Bei einer Gefahrbremsung soll der Fahrer das Bremspedal kräftig durchtreten und gedrückt halten, das Pulsieren ist normal. ESP (elektronisches Stabilitätsprogramm) vergleicht Lenkwinkel, Gierrate und Querbeschleunigung mit dem gewünschten Kurs und greift durch gezieltes Abbremsen einzelner Räder und Reduzierung der Motorleistung ein, um Über- oder Untersteuern zu verhindern. Grenzen: Die physikalischen Haftgrenzen bleiben bestehen; der Bremsweg wird nicht automatisch kürzer (auf losem Untergrund wie Schotter oder Schnee kann er sogar länger sein).',
      keyPoints: [
        { label: 'ABS verhindert Blockieren', keywords: ['blockier'] },
        { label: 'Lenkfähigkeit bleibt erhalten', keywords: ['lenkbar', 'lenkfähig', 'ausweichen'] },
        { label: 'Bedienung: voll bremsen, Pulsieren normal', keywords: ['durchtreten', 'pulsier', 'voll'] },
        { label: 'ESP bremst einzelne Räder', keywords: ['einzelne räder', 'einzelnes rad', 'gezielt'] },
        { label: 'Über-/Untersteuern', keywords: ['übersteuern', 'untersteuern', 'schleuder'] },
        { label: 'Grenzen: Physik bleibt', keywords: ['grenze', 'physik', 'haftung', 'schotter', 'schnee'] }
      ],
      followUps: [
        'Was versteht man unter Über- und Untersteuern?',
        'Wie demonstrieren Sie die Wirkung von ABS in der Ausbildung?'
      ]
    },
    {
      id: 'technik-03',
      subject: 'technik',
      topic: 'Reifen',
      difficulty: 1,
      question: 'Welche Vorschriften und Empfehlungen gelten für Reifen, insbesondere zur Profiltiefe und zu Winterreifen?',
      explanation: 'Reifen sind die einzige Verbindung zur Straße. Zu wenig Profil bedeutet weniger Halt, besonders bei Nässe. Bei Glätte und Schnee sind Winterreifen Pflicht.',
      example: 'Lassen Sie den Schüler bei der Abfahrtkontrolle die Profiltiefe mit einer Ein-Euro-Münze prüfen: Der goldene Rand ist ca. 3 mm breit.',
      modelAnswer: 'Gesetzlich vorgeschrieben ist eine Mindestprofiltiefe von 1,6 mm im gesamten Hauptprofil. Empfohlen werden mindestens 3 mm bei Sommerreifen und 4 mm bei Winterreifen, da die Aquaplaning-Gefahr und der Bremsweg mit abnehmendem Profil deutlich steigen. Nach § 2 Abs. 3a StVO gilt eine situative Winterreifenpflicht: Bei Glatteis, Schneeglätte, Schneematsch, Eis- oder Reifglätte dürfen Kfz nur mit wintertauglichen Reifen gefahren werden. Als wintertauglich gelten Reifen mit dem Alpine-Symbol (Bergpiktogramm mit Schneeflocke). Außerdem wichtig: richtiger Luftdruck, keine Beschädigungen und Reifenalter beachten.',
      keyPoints: [
        { label: '1,6 mm gesetzlich', keywords: ['1,6'] },
        { label: 'Empfehlung 3 mm / 4 mm', keywords: ['3 mm', '4 mm', 'empfehl'] },
        { label: 'Situative Winterreifenpflicht', keywords: ['situativ', 'glätte', 'schnee', 'glatteis'] },
        { label: 'Alpine-Symbol', keywords: ['alpine', 'schneeflocke', 'bergpiktogramm'] },
        { label: 'Luftdruck/Zustand/Alter', keywords: ['luftdruck', 'beschädig', 'alter'] }
      ],
      followUps: [
        'Was ist Aquaplaning und wie verhalten Sie sich, wenn es auftritt?',
        'Woran erkennen Sie das Alter eines Reifens?'
      ]
    },
    {
      id: 'technik-04',
      subject: 'technik',
      topic: 'Bremsanlage',
      difficulty: 2,
      question: 'Beschreiben Sie den Aufbau einer hydraulischen Bremsanlage und typische Störungen.',
      explanation: 'Wenn man aufs Bremspedal tritt, drückt man Flüssigkeit durch Leitungen zu den Rädern. Dort pressen Kolben die Beläge an Scheiben oder Trommeln. Wenn Bremsflüssigkeit alt ist, kann sie bei Hitze Blasen bilden – dann tritt man ins Leere.',
      example: 'Bei einer langen Bergabfahrt erklären Sie, warum man mit Motorbremse (niedriger Gang) fährt statt dauerhaft zu bremsen: Die Bremsen könnten überhitzen (Fading).',
      modelAnswer: 'Die hydraulische Betriebsbremse besteht aus Bremspedal, Bremskraftverstärker, Hauptbremszylinder, Bremsleitungen und Radbremszylindern bzw. Bremssätteln mit Scheiben- oder Trommelbremsen. Sie ist als Zweikreisanlage ausgeführt, damit bei Ausfall eines Kreises noch gebremst werden kann. Die Bremsflüssigkeit ist hygroskopisch (zieht Wasser an), wodurch der Siedepunkt sinkt; bei starker Erwärmung bilden sich Dampfblasen und das Pedal geht durch. Deshalb wird ein Wechsel etwa alle zwei Jahre empfohlen. Weitere Störungen: Fading durch Überhitzung, abgenutzte Beläge, Undichtigkeiten. Die Feststellbremse wirkt meist mechanisch oder elektrisch auf die Hinterräder.',
      keyPoints: [
        { label: 'Hauptbremszylinder/Leitungen/Radbremsen', keywords: ['hauptbremszylinder', 'bremsleitung', 'bremssattel', 'radbremszylinder'] },
        { label: 'Bremskraftverstärker', keywords: ['bremskraftverstärker', 'verstärker'] },
        { label: 'Zweikreisanlage', keywords: ['zweikreis', 'zwei kreise'] },
        { label: 'Hygroskopische Bremsflüssigkeit', keywords: ['hygroskopisch', 'wasser', 'siedepunkt'] },
        { label: 'Dampfblasenbildung', keywords: ['dampfblase', 'blasen'] },
        { label: 'Fading/Überhitzung', keywords: ['fading', 'überhitz'] },
        { label: 'Feststellbremse', keywords: ['feststellbremse', 'handbremse'] }
      ],
      followUps: [
        'Wie verhalten Sie sich bei langen Gefällestrecken?',
        'Welche Prüfungen an der Bremsanlage gehören zur Abfahrtkontrolle?'
      ]
    },
    {
      id: 'technik-05',
      subject: 'technik',
      topic: 'Automatik und Schlüsselzahl 197',
      difficulty: 2,
      question: 'Was bedeutet die Schlüsselzahl B197 und welche Voraussetzungen gelten dafür?',
      explanation: 'Wer die Prüfung auf einem Automatikauto macht, darf trotzdem Schaltwagen fahren – wenn er in der Fahrschule genug Schaltstunden hatte und eine kurze Testfahrt bestanden hat.',
      example: 'Viele Fahrschulen bilden heute überwiegend auf E-Autos aus. Mit B197 können Sie diese nutzen, ohne dass Ihre Schüler auf Automatik beschränkt werden.',
      modelAnswer: 'Mit der Schlüsselzahl 197 wird die praktische Prüfung auf einem Fahrzeug mit Automatikgetriebe abgelegt, ohne dass die Fahrerlaubnis auf Automatik beschränkt wird (Schlüsselzahl 78 entfällt). Voraussetzung ist, dass der Bewerber in der Fahrschule mindestens zehn Fahrstunden à 45 Minuten auf einem Schaltwagen absolviert hat und eine mindestens 15-minütige Testfahrt auf einem Schaltwagen erfolgreich bestanden hat, die von der Fahrschule bescheinigt wird. Das erleichtert die Ausbildung auf Elektro- und Hybridfahrzeugen.',
      keyPoints: [
        { label: 'Prüfung auf Automatik ohne Beschränkung', keywords: ['automatik', 'ohne beschränkung', 'keine beschränkung'] },
        { label: '10 Fahrstunden Schaltwagen', keywords: ['10', 'zehn'] },
        { label: '15-minütige Testfahrt', keywords: ['15', 'testfahrt'] },
        { label: 'Bescheinigung durch Fahrschule', keywords: ['bescheinig', 'fahrschule'] },
        { label: 'Abgrenzung Schlüsselzahl 78', keywords: ['78'] }
      ],
      followUps: [
        'Welche Besonderheiten müssen Sie bei der Ausbildung auf Elektrofahrzeugen beachten?',
        'Was ist Rekuperation?'
      ]
    },
    {
      id: 'technik-06',
      subject: 'technik',
      topic: 'Beleuchtung',
      difficulty: 1,
      question: 'Wann dürfen bzw. müssen Nebelscheinwerfer und Nebelschlussleuchte eingeschaltet werden?',
      explanation: 'Nebelscheinwerfer dürfen nur bei schlechter Sicht durch Nebel, Schnee oder Regen an. Die Nebelschlussleuchte ist sehr hell und blendet – deshalb nur bei Sicht unter 50 m, und dann darf man höchstens 50 km/h fahren.',
      example: 'Auf der Nachtfahrt (Sonderfahrt) bei Nebel lassen Sie den Schüler die Sichtweite an den Leitpfosten (Abstand 50 m) abschätzen.',
      modelAnswer: 'Nebelscheinwerfer dürfen nur benutzt werden, wenn Nebel, Schneefall oder Regen die Sicht erheblich behindern (§ 17 Abs. 3 StVO). Die Nebelschlussleuchte darf nur eingeschaltet werden, wenn die Sichtweite durch Nebel weniger als 50 m beträgt. Bei Sichtweite unter 50 m darf nicht schneller als 50 km/h gefahren werden (§ 3 Abs. 1 StVO). Zur Orientierung dienen die Leitpfosten, die im Abstand von 50 m stehen. Bei Sichtbehinderung muss auch tagsüber Abblendlicht eingeschaltet werden; Tagfahrlicht allein reicht nicht.',
      keyPoints: [
        { label: 'Nebelscheinwerfer bei erheblicher Sichtbehinderung', keywords: ['erheblich', 'sichtbehinder', 'nebel, schnee', 'schneefall', 'regen'] },
        { label: 'Nebelschlussleuchte unter 50 m', keywords: ['50 m', 'unter 50', 'weniger als 50'] },
        { label: 'Max. 50 km/h', keywords: ['50 km/h'] },
        { label: 'Leitpfosten im 50-m-Abstand', keywords: ['leitpfosten'] },
        { label: 'Abblendlicht, Tagfahrlicht reicht nicht', keywords: ['abblendlicht', 'tagfahrlicht'] }
      ],
      followUps: [
        'Warum blendet die Nebelschlussleuchte bei guter Sicht?',
        'Was gilt bei Sichtbehinderung für die Beleuchtung tagsüber?'
      ]
    },
    {
      id: 'technik-07',
      subject: 'technik',
      topic: 'Umweltbewusste Fahrweise',
      difficulty: 1,
      question: 'Welche Grundsätze einer umweltbewussten und energiesparenden Fahrweise vermitteln Sie?',
      explanation: 'Wer vorausschauend fährt, bremst weniger, spart Sprit bzw. Strom und schont die Umwelt. Das gehört auch zur Fahrprüfung.',
      example: 'Bei der Ampel, die auf Rot springt, lassen Sie den Schüler früh vom Gas gehen und ausrollen – die Schubabschaltung verbraucht keinen Kraftstoff.',
      modelAnswer: 'Grundsätze: vorausschauend fahren und gleichmäßige Geschwindigkeit halten; zügig beschleunigen und früh hochschalten (niedertouriges Fahren); Schubabschaltung nutzen und rechtzeitig vom Gas gehen bzw. bei E-Fahrzeugen rekuperieren; unnötige Lasten und Dachaufbauten vermeiden; korrekten Reifendruck einhalten; elektrische Verbraucher wie Klimaanlage bewusst einsetzen; bei längeren Standzeiten Motor abstellen bzw. Start-Stopp nutzen. Umweltbewusste Fahrweise ist Teil des Kompetenzbereichs Fahrzeugbedienung in der OFP.',
      keyPoints: [
        { label: 'Vorausschauend/gleichmäßig', keywords: ['vorausschauend', 'gleichmäßig'] },
        { label: 'Früh hochschalten/niedertourig', keywords: ['hochschalten', 'niedertourig', 'drehzahl'] },
        { label: 'Schubabschaltung/Rekuperation', keywords: ['schubabschaltung', 'rekuperation', 'ausrollen'] },
        { label: 'Reifendruck/Ballast', keywords: ['reifendruck', 'luftdruck', 'dachbox', 'last', 'ballast'] },
        { label: 'Verbraucher/Start-Stopp', keywords: ['klimaanlage', 'verbraucher', 'start-stopp', 'motor abstellen'] }
      ],
      followUps: [
        'Wie messen und zeigen Sie dem Schüler den Erfolg einer sparsamen Fahrweise?',
        'Welche Rolle spielt die Rekuperation bei E-Fahrzeugen?'
      ]
    },

    // ------------------------------------------------------------------ Verkehrsverhalten
    {
      id: 'verhalten-01',
      subject: 'verhalten',
      topic: 'Überholen',
      difficulty: 2,
      question: 'Welche Regeln gelten beim Überholen, insbesondere gegenüber Radfahrern?',
      explanation: 'Überholen ist eine der gefährlichsten Fahraufgaben. Man darf nur überholen, wenn klar ist, dass niemand gefährdet wird. Bei Radfahrern braucht man besonders viel Platz.',
      example: 'Auf der Landstraße will der Schüler einen Radfahrer trotz Gegenverkehr „knapp“ überholen. Lassen Sie ihn abschätzen, ob 2 m Seitenabstand möglich sind – wenn nicht, muss er warten.',
      modelAnswer: 'Nach § 5 StVO wird links überholt. Überholen darf nur, wer übersehen kann, dass während des ganzen Überholvorgangs jede Behinderung des Gegenverkehrs ausgeschlossen ist, und wer wesentlich schneller fährt als der zu Überholende. Verboten ist es bei unklarer Verkehrslage oder durch Verkehrszeichen. Beim Überholen muss ein ausreichender Seitenabstand eingehalten werden: Gegenüber Fußgängern, Radfahrern und Elektrokleinstfahrzeugen innerorts mindestens 1,5 m und außerorts mindestens 2 m. Vor dem Überholen: Spiegel, Schulterblick, Blinken; nach dem Überholen: Blinken rechts und mit ausreichendem Abstand wieder einordnen. Wer überholt wird, darf nicht beschleunigen.',
      keyPoints: [
        { label: 'Links überholen', keywords: ['links'] },
        { label: 'Keine Gefährdung/Behinderung Gegenverkehr', keywords: ['gegenverkehr', 'behinderung', 'gefährdung'] },
        { label: 'Wesentlich höhere Geschwindigkeit', keywords: ['wesentlich', 'schneller'] },
        { label: 'Unklare Verkehrslage verboten', keywords: ['unklar'] },
        { label: '1,5 m innerorts / 2 m außerorts', keywords: ['1,5', '2 m', 'zwei meter'] },
        { label: 'Spiegel/Schulterblick/Blinken', keywords: ['spiegel', 'schulterblick', 'blinken'] },
        { label: 'Überholter darf nicht beschleunigen', keywords: ['beschleunig'] }
      ],
      followUps: [
        'Wann ist rechts überholen erlaubt?',
        'Wie bringen Sie einem Schüler bei, die Geschwindigkeit des Gegenverkehrs einzuschätzen?'
      ]
    },
    {
      id: 'verhalten-02',
      subject: 'verhalten',
      topic: 'Rettungsgasse',
      difficulty: 1,
      question: 'Wann und wie ist eine Rettungsgasse zu bilden?',
      explanation: 'Sobald der Verkehr stockt, macht man auf Autobahnen und mehrspurigen Außerortsstraßen Platz – nicht erst, wenn man das Martinshorn hört. Die Gasse kommt immer zwischen den ganz linken Fahrstreifen und den daneben.',
      example: 'Auf der Autobahnfahrt (Sonderfahrt) bildet sich ein Stau. Fragen Sie den Schüler sofort: „Wo bilden wir jetzt die Rettungsgasse?“',
      modelAnswer: 'Nach § 11 Abs. 2 StVO muss eine Rettungsgasse gebildet werden, sobald Fahrzeuge auf Autobahnen sowie auf Außerortsstraßen mit mindestens zwei Fahrstreifen für eine Richtung mit Schrittgeschwindigkeit fahren oder sich die Fahrzeuge im Stillstand befinden. Die Gasse wird zwischen dem äußerst linken und dem unmittelbar rechts daneben liegenden Fahrstreifen gebildet: Fahrzeuge auf dem linken Fahrstreifen weichen nach links aus, alle anderen nach rechts. Das Befahren der Rettungsgasse durch Unberechtigte ist verboten und wird mit hohen Bußgeldern, Punkten und Fahrverbot geahndet.',
      keyPoints: [
        { label: 'Bei Schrittgeschwindigkeit oder Stillstand', keywords: ['schrittgeschwindigkeit', 'stillstand', 'stau', 'stockend'] },
        { label: 'Autobahn/Außerorts mit 2+ Fahrstreifen', keywords: ['autobahn', 'außerorts', 'zwei fahrstreifen', 'mehrspurig'] },
        { label: 'Zwischen ganz links und daneben', keywords: ['ganz links', 'äußerst link', 'linken'] },
        { label: 'Links nach links, alle anderen nach rechts', keywords: ['nach links', 'nach rechts'] },
        { label: 'Befahren verboten/Sanktionen', keywords: ['befahren', 'bußgeld', 'fahrverbot', 'verboten'] }
      ],
      followUps: [
        'Darf der Seitenstreifen für die Rettungsgasse genutzt werden?',
        'Was gilt auf einer dreispurigen Autobahn?'
      ]
    },
    {
      id: 'verhalten-03',
      subject: 'verhalten',
      topic: 'Schulbus und Linienbus',
      difficulty: 2,
      question: 'Wie müssen Sie sich gegenüber Linien- und Schulbussen verhalten?',
      explanation: 'An Bussen steigen oft Kinder aus, die plötzlich auf die Straße laufen. Deshalb gibt es strenge Regeln, vor allem wenn das Warnblinklicht an ist.',
      example: 'Ein Schulbus hält mit Warnblinklicht auf der Gegenfahrbahn. Viele Schüler wissen nicht, dass auch der Gegenverkehr nur mit Schrittgeschwindigkeit vorbeifahren darf.',
      modelAnswer: 'Nach § 20 StVO gilt: An Omnibussen des Linienverkehrs und gekennzeichneten Schulbussen, die an Haltestellen halten, darf nur vorsichtig vorbeigefahren werden. Wenn Fahrgäste ein- oder aussteigen, darf rechts nur mit Schrittgeschwindigkeit und so großem Abstand vorbeigefahren werden, dass eine Gefährdung ausgeschlossen ist; notfalls muss man warten. Nähert sich ein Bus mit eingeschaltetem Warnblinklicht einer Haltestelle, darf er nicht überholt werden. Hält ein Bus mit Warnblinklicht, darf nur mit Schrittgeschwindigkeit vorbeigefahren werden – das gilt auch für den Gegenverkehr. Außerdem ist Bussen innerorts das Abfahren von gekennzeichneten Haltestellen zu ermöglichen.',
      keyPoints: [
        { label: '§ 20 StVO', keywords: ['20'] },
        { label: 'Schrittgeschwindigkeit beim Vorbeifahren', keywords: ['schrittgeschwindigkeit'] },
        { label: 'Warnblinklicht: nicht überholen', keywords: ['nicht überholen', 'überholverbot', 'warnblink'] },
        { label: 'Gilt auch für Gegenverkehr', keywords: ['gegenverkehr'] },
        { label: 'Notfalls warten', keywords: ['warten', 'anhalten'] },
        { label: 'Abfahren ermöglichen', keywords: ['abfahren', 'anfahren ermöglichen'] }
      ],
      followUps: [
        'Warum gilt die Schrittgeschwindigkeit auch für den Gegenverkehr?',
        'Wie erkennen Sie einen Schulbus?'
      ]
    },
    {
      id: 'verhalten-04',
      subject: 'verhalten',
      topic: 'Sicherheitsabstand',
      difficulty: 1,
      question: 'Welcher Sicherheitsabstand ist einzuhalten und wie vermitteln Sie ihn praxisnah?',
      explanation: 'Wer zu dicht auffährt, kann nicht rechtzeitig reagieren. Eine einfache Regel: Mindestens zwei Sekunden Abstand – außerorts als Faustregel „halber Tacho“ in Metern.',
      example: 'Lassen Sie den Schüler bei einem Leitpfosten anfangen zu zählen: „einundzwanzig, zweiundzwanzig“ – erst dann darf er den Pfosten erreichen.',
      modelAnswer: 'Nach § 4 StVO muss der Abstand zum Vorausfahrenden in der Regel so groß sein, dass auch bei plötzlichem Bremsen hinter ihm angehalten werden kann. Faustregeln: außerorts „halber Tacho“ in Metern (z. B. 50 m bei 100 km/h), was etwa 1,8 Sekunden entspricht, oder die Zwei-Sekunden-Regel. Innerorts gilt in der Regel ein Abstand von mindestens einer Sekunde (ca. 3 Pkw-Längen bei 50 km/h als Orientierung). Bei Nässe, Glätte oder schlechter Sicht muss der Abstand vergrößert werden. Lkw über 3,5 t müssen auf Autobahnen bei mehr als 50 km/h mindestens 50 m Abstand halten. Grundloses starkes Bremsen ist verboten.',
      keyPoints: [
        { label: 'Anhalten bei plötzlichem Bremsen', keywords: ['plötzlich', 'anhalten', 'bremsen'] },
        { label: 'Halber Tacho', keywords: ['halber tacho', 'halbe tacho'] },
        { label: 'Zwei-Sekunden-Regel', keywords: ['zwei sekunden', '2 sekunden', 'zwei-sekunden', 'einundzwanzig'] },
        { label: 'Vergrößern bei Nässe/Glätte', keywords: ['nässe', 'glätte', 'regen', 'vergrößern'] },
        { label: 'Lkw > 3,5 t: 50 m', keywords: ['3,5', '50 m'] }
      ],
      followUps: [
        'Wie reagieren Sie, wenn jemand dicht auffährt?',
        'Wie viel Meter sind „halber Tacho“ bei 130 km/h?'
      ]
    },
    {
      id: 'verhalten-05',
      subject: 'verhalten',
      topic: 'Vertrauensgrundsatz',
      difficulty: 2,
      question: 'Erläutern Sie den Vertrauensgrundsatz und seine Grenzen.',
      explanation: 'Man darf grundsätzlich darauf vertrauen, dass sich andere an die Regeln halten. Bei Kindern, älteren oder hilfsbedürftigen Menschen und bei erkennbarem Fehlverhalten gilt das aber nicht.',
      example: 'Ein Ball rollt auf die Straße. Ihr Schüler bremst nicht, weil „da ja niemand ist“. Erklären Sie: Hinter einem Ball kommt oft ein Kind – hier gilt der Vertrauensgrundsatz nicht.',
      modelAnswer: 'Der Vertrauensgrundsatz besagt, dass jeder Verkehrsteilnehmer grundsätzlich darauf vertrauen darf, dass sich andere verkehrsgerecht verhalten. Er gilt nicht gegenüber Kindern, Hilfsbedürftigen und älteren Menschen – ihnen gegenüber muss man sich nach § 3 Abs. 2a StVO durch Verminderung der Geschwindigkeit und Bremsbereitschaft so verhalten, dass eine Gefährdung ausgeschlossen ist. Er gilt außerdem nicht, wenn erkennbar ist, dass sich ein anderer falsch verhält oder verhalten wird, und nicht für jemanden, der sich selbst verkehrswidrig verhält. Grundlage ist § 1 StVO (ständige Vorsicht und gegenseitige Rücksicht).',
      keyPoints: [
        { label: 'Vertrauen auf regelgerechtes Verhalten', keywords: ['vertrauen', 'verkehrsgerecht', 'regelgerecht'] },
        { label: 'Nicht bei Kindern/Älteren/Hilfsbedürftigen', keywords: ['kinder', 'ältere', 'hilfsbedürftig'] },
        { label: '§ 3 Abs. 2a StVO', keywords: ['2a'] },
        { label: 'Nicht bei erkennbarem Fehlverhalten', keywords: ['erkennbar', 'fehlverhalten', 'falsch verhält'] },
        { label: 'Nicht für eigenes Fehlverhalten', keywords: ['selbst', 'eigenes'] },
        { label: '§ 1 StVO Vorsicht und Rücksicht', keywords: ['§ 1', 'rücksicht', 'vorsicht'] }
      ],
      followUps: [
        'Nennen Sie Anzeichen, an denen Sie das Fehlverhalten anderer frühzeitig erkennen.',
        'Wie vermitteln Sie Gefahrenwahrnehmung gegenüber Kindern im Unterricht?'
      ]
    },
    {
      id: 'verhalten-06',
      subject: 'verhalten',
      topic: 'Kreisverkehr',
      difficulty: 1,
      question: 'Welche Regeln gelten im Kreisverkehr (Zeichen 215)?',
      explanation: 'Wer im Kreis fährt, hat Vorfahrt (wenn das Zeichen 205 an der Einfahrt steht). Beim Hineinfahren blinkt man nicht, beim Herausfahren schon.',
      example: 'Typischer Prüfungsfehler: Blinken links beim Einfahren. Üben Sie mehrere Kreisverkehre hintereinander und lassen Sie den Schüler laut kommentieren, wann er blinkt.',
      modelAnswer: 'Nach § 9a StVO: Ist ein Kreisverkehr durch Zeichen 215 in Verbindung mit Zeichen 205 gekennzeichnet, hat der Verkehr im Kreis Vorfahrt. Beim Einfahren darf nicht geblinkt werden, beim Ausfahren muss rechts geblinkt werden. Auf der Kreisfahrbahn darf nicht gehalten werden. Die Mittelinsel darf nicht überfahren werden, ausgenommen von Fahrzeugen, denen das wegen ihrer Abmessungen nicht möglich ist, wenn eine Gefährdung ausgeschlossen ist. Beim Ausfahren muss auf Radfahrer und Fußgänger geachtet werden.',
      keyPoints: [
        { label: '215 + 205: Kreis hat Vorfahrt', keywords: ['vorfahrt', '205'] },
        { label: 'Kein Blinken beim Einfahren', keywords: ['einfahren', 'nicht blinken', 'kein blinken'] },
        { label: 'Blinken beim Ausfahren', keywords: ['ausfahren', 'rechts blinken', 'blinken'] },
        { label: 'Halteverbot auf Kreisfahrbahn', keywords: ['halten', 'halteverbot', 'haltverbot'] },
        { label: 'Mittelinsel nicht überfahren', keywords: ['mittelinsel'] },
        { label: 'Rad/Fußgänger beim Ausfahren', keywords: ['radfahrer', 'fußgänger'] }
      ],
      followUps: [
        'Was gilt, wenn an einem Kreisverkehr kein Zeichen 205 steht?',
        'Wie viele Fahrstreifen darf man im mehrstreifigen Kreisverkehr wählen?'
      ]
    },
    {
      id: 'verhalten-07',
      subject: 'verhalten',
      topic: 'Linksabbiegen',
      difficulty: 2,
      question: 'Wie verhalten Sie sich beim Linksabbiegen an einer Kreuzung mit Gegenverkehr, der ebenfalls links abbiegt?',
      explanation: 'Linksabbieger müssen den Gegenverkehr durchlassen. Wenn beide links abbiegen, fährt man normalerweise voreinander vorbei (tangential), damit man sich gegenseitig sehen kann.',
      example: 'Zeichnen Sie im Unterricht die beiden Abbiegelinien auf: tangential (voreinander) vs. umeinander herum. Fragen Sie: Wann ist welche Variante sinnvoll?',
      modelAnswer: 'Nach § 9 StVO muss man sich rechtzeitig links einordnen, Richtungsanzeiger setzen und den entgegenkommenden Verkehr, auch Radfahrer und Fußgänger auf der abzubiegenden Straße, durchfahren lassen. Einander entgegenkommende Linksabbieger biegen voreinander ab (tangentiales Abbiegen), es sei denn, die Verkehrslage oder die Gestaltung der Kreuzung (z. B. Markierungen) erfordern ein Umfahren. Vor dem Abbiegen sind Rückspiegel und Schulterblick erforderlich, um Überholer zu erkennen.',
      keyPoints: [
        { label: 'Einordnen und blinken', keywords: ['einordnen', 'blinken', 'richtungsanzeiger'] },
        { label: 'Gegenverkehr durchlassen', keywords: ['gegenverkehr', 'durchfahren lassen', 'vorrang'] },
        { label: 'Voreinander abbiegen (tangential)', keywords: ['voreinander', 'tangential'] },
        { label: 'Ausnahmen durch Lage/Markierung', keywords: ['markierung', 'verkehrslage', 'umfahren', 'hintereinander'] },
        { label: 'Spiegel/Schulterblick', keywords: ['spiegel', 'schulterblick'] },
        { label: 'Fußgänger/Radfahrer beachten', keywords: ['fußgänger', 'radfahrer'] }
      ],
      followUps: [
        'Was gilt für Linksabbieger an Ampeln mit grünem Pfeil?',
        'Wie üben Sie mit einem Schüler die Wahl der Abbiegelinie?'
      ]
    },

    // ------------------------------------------------------------------ Berufspraxis
    {
      id: 'praxis-01',
      subject: 'praxis',
      topic: 'Besondere Ausbildungsfahrten',
      difficulty: 1,
      question: 'Welche besonderen Ausbildungsfahrten (Sonderfahrten) sind für die Klasse B vorgeschrieben und wie planen Sie sie sinnvoll?',
      explanation: 'Neben den normalen Übungsstunden gibt es Pflichtfahrten auf Landstraße, Autobahn und bei Dunkelheit. Sie sollen erst kommen, wenn der Schüler die Grundlagen sicher beherrscht.',
      example: 'Planen Sie die Nachtfahrten in den Herbst- und Wintermonaten früh ein, im Sommer wird es erst spät dunkel – das ist eine typische Organisationsfrage in der Prüfung.',
      modelAnswer: 'Nach der Fahrschüler-Ausbildungsordnung sind für die Klasse B bei Ersterwerb zwölf besondere Ausbildungsfahrten à 45 Minuten vorgeschrieben: fünf Fahrten auf Bundes- oder Landstraßen (Überlandfahrten), vier Fahrten auf Autobahnen oder Kraftfahrstraßen und drei Fahrten bei Dämmerung oder Dunkelheit. Sie bauen auf der Grundausbildung auf und werden erst durchgeführt, wenn der Schüler die Grundfertigkeiten sicher beherrscht. Ich plane sie im Ausbildungsplan, achte bei den Dunkelfahrten auf die Jahreszeit und lege für jede Fahrt konkrete Lernziele fest. Alle Fahrten werden in der Ausbildungsdokumentation nachgewiesen.',
      keyPoints: [
        { label: '12 Sonderfahrten à 45 Min.', keywords: ['12', 'zwölf', '45 minuten'] },
        { label: '5 Überlandfahrten', keywords: ['überland', 'landstraße', 'bundesstraße'] },
        { label: '4 Autobahnfahrten', keywords: ['autobahn', 'kraftfahrstraße'] },
        { label: '3 Fahrten bei Dunkelheit', keywords: ['dunkel', 'nacht', 'dämmerung'] },
        { label: 'Erst nach Grundausbildung', keywords: ['grundausbildung', 'grundfertigkeit', 'nach der', 'erst wenn'] },
        { label: 'Dokumentation', keywords: ['dokument', 'nachweis', 'ausbildungsnachweis'] }
      ],
      followUps: [
        'Welche Lernziele verfolgen Sie bei der ersten Autobahnfahrt?',
        'Was ändert sich bei den Sonderfahrten, wenn der Bewerber bereits eine andere Fahrerlaubnisklasse besitzt?'
      ]
    },
    {
      id: 'praxis-02',
      subject: 'praxis',
      topic: 'Theorieunterricht',
      difficulty: 1,
      question: 'Wie ist der theoretische Unterricht für die Klasse B bei Ersterwerb aufgebaut?',
      explanation: 'Der Theorieunterricht besteht aus Grundstoff (für alle Klassen gleich) und Zusatzstoff (speziell für die Klasse). Jede Unterrichtseinheit dauert 90 Minuten.',
      example: 'Ein Schüler möchte nur die Hälfte der Doppelstunde bleiben, weil er zum Training muss. Erklären Sie ihm, warum die Stunde dann nicht angerechnet werden kann.',
      modelAnswer: 'Bei Ersterwerb der Klasse B umfasst der theoretische Unterricht 14 Doppelstunden à 90 Minuten: zwölf Doppelstunden Grundstoff und zwei Doppelstunden klassenspezifischen Zusatzstoff. Pro Tag dürfen höchstens zwei Doppelstunden erteilt werden. Der Unterricht folgt dem Rahmenplan der Fahrschüler-Ausbildungsordnung, Teilnahme wird auf der Ausbildungsbescheinigung dokumentiert. Pädagogisch sollte der Unterricht schülerorientiert, mit wechselnden Methoden und Medien und mit Bezug zur Fahrpraxis gestaltet werden.',
      keyPoints: [
        { label: '12 Doppelstunden Grundstoff', keywords: ['12', 'zwölf', 'grundstoff'] },
        { label: '2 Doppelstunden Zusatzstoff', keywords: ['2 doppelstunden', 'zwei doppelstunden', 'zusatzstoff'] },
        { label: 'Je 90 Minuten', keywords: ['90'] },
        { label: 'Max. 2 Doppelstunden pro Tag', keywords: ['pro tag', 'täglich', 'am tag'] },
        { label: 'Rahmenplan/Dokumentation', keywords: ['rahmenplan', 'bescheinigung', 'dokument'] }
      ],
      followUps: [
        'Wie gestalten Sie den Unterricht für eine sehr heterogene Gruppe?',
        'Welche Medien setzen Sie im Theorieunterricht ein?'
      ]
    },
    {
      id: 'praxis-03',
      subject: 'praxis',
      topic: 'Ausstattung des Fahrschulwagens',
      difficulty: 1,
      question: 'Welche besondere Ausstattung muss ein Ausbildungsfahrzeug der Klasse B haben?',
      explanation: 'Der Fahrlehrer muss jederzeit eingreifen und den Verkehr beobachten können. Deshalb hat das Fahrschulauto zusätzliche Pedale und Spiegel.',
      example: 'Vor Beginn einer Fahrstunde prüfen Sie kurz die Doppelbedienung – ein klemmendes Bremspedal auf der Beifahrerseite kann im Ernstfall fatal sein.',
      modelAnswer: 'Ausbildungsfahrzeuge der Klasse B müssen nach der Fahrschüler-Ausbildungsordnung mit einer Doppelbedienungseinrichtung für Bremse und Kupplung (bei Schaltwagen) ausgestattet sein. Zusätzlich sind ein Innenspiegel und rechter Außenspiegel für den Fahrlehrer vorgeschrieben. Das Fahrzeug muss während der Ausbildung als Fahrschulfahrzeug gekennzeichnet sein (Schild „Fahrschule“). Für die Prüfung gelten zusätzliche Anforderungen an das Prüfungsfahrzeug, z. B. Mindestleistung und Ausstattung. Der Fahrlehrer ist für die Verkehrssicherheit und regelmäßige Kontrolle verantwortlich.',
      keyPoints: [
        { label: 'Doppelbedienung Bremse', keywords: ['doppelbedienung', 'doppelpedal', 'bremse'] },
        { label: 'Doppelbedienung Kupplung', keywords: ['kupplung'] },
        { label: 'Zusätzliche Spiegel für Fahrlehrer', keywords: ['spiegel'] },
        { label: 'Kennzeichnung „Fahrschule“', keywords: ['schild', 'kennzeichnung', 'fahrschule'] },
        { label: 'Kontrolle/Verkehrssicherheit', keywords: ['kontroll', 'verkehrssicher', 'prüf'] }
      ],
      followUps: [
        'Wann muss das Fahrschulschild entfernt werden?',
        'Welche Besonderheiten gelten für ein Fahrzeug mit Automatikgetriebe?'
      ]
    },
    {
      id: 'praxis-04',
      subject: 'praxis',
      topic: 'Prüfungsreife',
      difficulty: 2,
      question: 'Wie stellen Sie die Prüfungsreife eines Fahrschülers fest und wie gehen Sie mit Schülern um, die sich für fertig halten, es aber nicht sind?',
      explanation: 'Der Fahrlehrer entscheidet verantwortungsvoll, wann jemand zur Prüfung geht. Grundlage ist der dokumentierte Ausbildungsstand, nicht der Wunsch des Schülers oder der Eltern.',
      example: 'Ein Schüler drängt zur Prüfung, macht aber noch regelmäßig Fehler beim Abbiegen. Sie zeigen ihm seinen Ausbildungsstand anhand der Dokumentation und vereinbaren konkrete Übungsziele.',
      modelAnswer: 'Die Prüfungsreife stelle ich anhand der Ausbildungsdokumentation und des Ausbildungsplans fest: Alle Fahraufgaben und Fahrkompetenzbereiche müssen sicher und selbstständig bewältigt werden, die vorgeschriebenen Sonderfahrten sind absolviert, und eine Prüfungssimulation („Testfahrt“) verläuft fehlerfrei. Ein Fahrlehrer darf Bewerber erst zur Prüfung anmelden bzw. vorstellen, wenn er sie für ausreichend ausgebildet hält. Mit uneinsichtigen Schülern führe ich ein sachliches Gespräch auf Basis der Dokumentation, mache Defizite transparent, vereinbare konkrete Ziele und eine realistische Zeitplanung. Dabei bleibe ich wertschätzend und beziehe ggf. Eltern ein.',
      keyPoints: [
        { label: 'Ausbildungsdokumentation/Plan', keywords: ['dokument', 'ausbildungsplan', 'ausbildungsstand'] },
        { label: 'Selbstständige Bewältigung aller Fahraufgaben', keywords: ['selbstständig', 'sicher', 'fahraufgaben', 'kompetenz'] },
        { label: 'Sonderfahrten absolviert', keywords: ['sonderfahrt', 'besondere ausbildungsfahrt'] },
        { label: 'Prüfungssimulation', keywords: ['simulation', 'testfahrt', 'probeprüfung'] },
        { label: 'Verantwortung des Fahrlehrers', keywords: ['verantwort', 'ausreichend ausgebildet'] },
        { label: 'Sachliches, wertschätzendes Gespräch', keywords: ['gespräch', 'transparent', 'wertschätz', 'sachlich'] }
      ],
      followUps: [
        'Welche Konsequenzen hat es, wenn Sie Schüler zu früh zur Prüfung anmelden?',
        'Wie beziehen Sie Eltern minderjähriger Schüler ein?'
      ]
    },
    {
      id: 'praxis-05',
      subject: 'praxis',
      topic: 'Ausbildungsvertrag und Preisaushang',
      difficulty: 2,
      question: 'Welche Pflichten hat eine Fahrschule gegenüber Kunden bezüglich Vertrag und Entgelten?',
      explanation: 'Kunden müssen vorher wissen, was die Ausbildung kostet und was im Vertrag steht. Deshalb gibt es Pflichten zum Preisaushang und zum schriftlichen Ausbildungsvertrag.',
      example: 'Eine Mutter beschwert sich, dass „plötzlich“ Kosten für Sonderfahrten anfallen. Mit einem klaren Vertrag und Preisaushang hätten Sie das von Anfang an transparent gemacht.',
      modelAnswer: 'Der Fahrschulinhaber muss die Entgelte für die Ausbildung (Grundbetrag, Fahrstunden, besondere Ausbildungsfahrten, Vorstellung zur Prüfung) in den Geschäftsräumen gut sichtbar aushängen; die Entgelte gelten dann für alle Fahrschüler gleichermaßen. Mit dem Fahrschüler wird vor Beginn der Ausbildung ein schriftlicher Ausbildungsvertrag geschlossen, der u. a. die Entgelte, Zahlungs- und Kündigungsbedingungen enthält; bei Minderjährigen ist die Zustimmung der Erziehungsberechtigten nötig. Außerdem müssen Ausbildungsnachweise geführt und aufbewahrt werden.',
      keyPoints: [
        { label: 'Preisaushang', keywords: ['aushang', 'aushängen', 'preisaushang'] },
        { label: 'Bestandteile der Entgelte', keywords: ['grundbetrag', 'fahrstunde', 'vorstellung'] },
        { label: 'Schriftlicher Ausbildungsvertrag', keywords: ['vertrag', 'schriftlich'] },
        { label: 'Minderjährige: Erziehungsberechtigte', keywords: ['minderjährig', 'eltern', 'erziehungsberechtigt'] },
        { label: 'Ausbildungsnachweise', keywords: ['nachweis', 'aufbewahr', 'dokument'] }
      ],
      followUps: [
        'Darf eine Fahrschule unterschiedlichen Kunden unterschiedliche Preise berechnen?',
        'Welche Angaben gehören in einen Ausbildungsvertrag?'
      ]
    },
    {
      id: 'praxis-06',
      subject: 'praxis',
      topic: 'Erste Fahrstunde',
      difficulty: 1,
      question: 'Wie gestalten Sie die erste Fahrstunde mit einem Fahranfänger?',
      explanation: 'Die erste Stunde prägt den Schüler. Er soll Vertrauen fassen, die Bedienelemente kennenlernen und in einer ruhigen Umgebung erste Erfolgserlebnisse haben.',
      example: 'Statt sofort loszufahren, nehmen Sie sich 10 Minuten für Sitzposition, Spiegel und Bedienelemente auf einem ruhigen Parkplatz. Danach erste Anfahr- und Bremsübungen.',
      modelAnswer: 'Ich beginne mit einem kurzen Kennenlernen und klären von Vorerfahrungen und Erwartungen. Dann folgt die Einweisung: Sitz- und Lenkradeinstellung, Spiegel, Anschnallen, Bedienelemente und Instrumente. Auf einem verkehrsarmen Gelände übt der Schüler Anfahren, Schalten, Lenken und Anhalten nach der Vier-Stufen-Methode. Ich gebe klare, rechtzeitige Anweisungen und dosiertes, positives Feedback. Zum Schluss werden die Stunde gemeinsam reflektiert, Fortschritte dokumentiert und das Ziel der nächsten Stunde besprochen. Sicherheit hat jederzeit Vorrang, ich bin stets eingriffsbereit.',
      keyPoints: [
        { label: 'Kennenlernen/Vorerfahrung', keywords: ['kennenlernen', 'vorerfahrung', 'erwartung'] },
        { label: 'Einweisung Sitz/Spiegel/Bedienelemente', keywords: ['sitz', 'spiegel', 'bedienelement', 'einweisung'] },
        { label: 'Verkehrsarmes Gelände', keywords: ['verkehrsarm', 'parkplatz', 'übungsplatz', 'ruhig'] },
        { label: 'Grundübungen Anfahren/Schalten/Bremsen', keywords: ['anfahren', 'schalten', 'bremsen', 'lenken'] },
        { label: 'Positives Feedback', keywords: ['feedback', 'lob', 'positiv'] },
        { label: 'Reflexion/Dokumentation/Ausblick', keywords: ['reflex', 'dokument', 'nächste stunde', 'ausblick'] }
      ],
      followUps: [
        'Was tun Sie, wenn der Schüler in der ersten Stunde sehr ängstlich ist?',
        'Wie formulieren Sie Fahranweisungen, damit sie rechtzeitig und eindeutig sind?'
      ]
    },
    {
      id: 'praxis-07',
      subject: 'praxis',
      topic: 'Überwachung und Qualitätssicherung',
      difficulty: 3,
      question: 'Wie wird die Qualität in Fahrschulen gesichert und überwacht?',
      explanation: 'Fahrschulen werden von Behörden überwacht. Daneben gibt es Pflichtfortbildungen und freiwillige Qualitätssysteme. Ziel ist eine gute, sichere Ausbildung.',
      example: 'Vor einer angekündigten Überwachung überprüfen Sie, ob Ausbildungsnachweise vollständig, Unterrichtsräume in Ordnung und Fortbildungsnachweise vorhanden sind.',
      modelAnswer: 'Die Erlaubnisbehörde überwacht die Fahrschulen nach dem FahrlG. Geprüft werden insbesondere die Einhaltung der gesetzlichen Pflichten (z. B. Ausbildungsnachweise, Preisaushang, Ausstattung von Unterrichtsräumen und Fahrzeugen) sowie im Rahmen der pädagogischen Qualitätssicherung die Qualität von Theorieunterricht und praktischer Ausbildung. Hinzu kommen die Fortbildungspflichten der Fahrlehrer (§ 53 FahrlG) sowie freiwillige Qualitätsmanagementsysteme. Intern sichert der Inhaber die Qualität durch Ausbildungspläne, Teambesprechungen, Hospitationen und Auswertung von Prüfungsergebnissen.',
      keyPoints: [
        { label: 'Überwachung durch Erlaubnisbehörde', keywords: ['behörde', 'überwach'] },
        { label: 'Formale Pflichten (Nachweise, Aushang, Ausstattung)', keywords: ['nachweis', 'aushang', 'ausstattung', 'unterrichtsraum'] },
        { label: 'Pädagogische Qualitätssicherung', keywords: ['pädagogische qualität', 'qualitätssicherung', 'unterricht'] },
        { label: 'Fortbildungspflicht', keywords: ['fortbildung'] },
        { label: 'Freiwilliges QM', keywords: ['qualitätsmanagement', 'qm', 'freiwillig'] },
        { label: 'Interne Maßnahmen (Hospitation, Auswertung)', keywords: ['hospitation', 'auswert', 'teambesprechung', 'prüfungsergebnis'] }
      ],
      followUps: [
        'Wie werten Sie die Prüfungsergebnisse Ihrer Fahrschule sinnvoll aus?',
        'Was passiert bei schwerwiegenden Mängeln, die bei einer Überwachung festgestellt werden?'
      ]
    }
  ];

  // Verkehrszeichen: Bild, Bezeichnung und amtlicher Text aus der StVO (signs-stvo.js),
  // ergänzt um handgeschriebene Erklärungen und typische Fehler (signs.js).
  const EXTRA_FIELDS = ['explanation', 'example', 'modelAnswer', 'keyPoints', 'wrongClaims', 'followUps', 'difficulty'];
  const extras = new Map(((signExtras && signExtras.signs) || []).map(item => [item.id, item]));
  const imageMap = (signImages && signImages.images) || {};
  // Bei Verkehrszeichen werden keine Paragrafen- oder Anlagenangaben erwartet: Verweise aus Kategorie,
  // Musterantwort und Kernpunkten entfernen (der amtliche Text bleibt unverändert).
  const LEGAL_PAREN = /\s*\((?:zu )?(?:§|Anlage \d)[^()]*\)/g;
  // Nur ganze Sätze, die mit einem Paragrafen beginnen (z. B. „§ 2 Absatz 4 Satz 6 bleibt unberührt.“).
  const PARAGRAPH_SENTENCE = /(^|[.!?:]\s+)(?:\d+\.\s*)?§[^.]*\.(?=\s|$)/g;
  // Verweise, die inhaltlich etwas aussagen, in Klartext umformulieren.
  const LEGAL_REWRITES = [
    ['Beim Ausfahren ist § 10 zu beachten.', 'Beim Ausfahren muss man den fließenden Verkehr vorlassen und darf niemanden gefährden.'],
    ['beim Ausfahren bin ich nach § 10 StVO wartepflichtig.', 'beim Ausfahren bin ich wartepflichtig und muss den fließenden Verkehr vorlassen.']
  ];
  const stripLegalRefs = text => LEGAL_REWRITES
    .reduce((acc, [from, to]) => acc.split(from).join(to), String(text || ''))
    .replace(LEGAL_PAREN, '').replace(PARAGRAPH_SENTENCE, '$1').replace(/\s{2,}/g, ' ').trim();
  // Vorfahrt- bzw. Vorrang-gewähren-Zeichen sind Vorschriftzeichen (Anlage 2), keine Vorrangzeichen (Anlage 3).
  const WAIT_SIGNS = new Set(['vz-205', 'vz-206', 'vz-208']);
  const CATEGORY_CLAIMS = [
    { prefix: 'Vorschriftzeichen', claim: { label: 'Falsch eingeordnet: Das ist ein Vorschriftzeichen, kein Richt- oder Vorrangzeichen', keywords: ['richtzeichen', 'vorrangzeichen'] } },
    { prefix: 'Richtzeichen', claim: { label: 'Falsch eingeordnet: Das ist ein Richtzeichen, kein Vorschriftzeichen', keywords: ['vorschriftzeichen'] } }
  ];

  function withoutLegalRefs(card) {
    card.category = stripLegalRefs(card.category);
    card.modelAnswer = stripLegalRefs(card.modelAnswer);
    const points = card.keyPoints
      .filter(point => !/^(?:\d+\.\s*)?§/.test(point.label))
      .map(point => Object.assign({}, point, {
        label: stripLegalRefs(point.label),
        keywords: point.keywords.filter(word => !/§/.test(word))
      }))
      .filter(point => point.keywords.length > 0);
    if (points.length) card.keyPoints = points;
    return card;
  }

  const allSigns = ((stvo && stvo.signs) || []).map(item => {
    const extra = extras.get(item.id);
    const merged = Object.assign({ explanation: '', example: '' }, item);
    if (extra) EXTRA_FIELDS.forEach(field => { if (extra[field] !== undefined) merged[field] = extra[field]; });
    withoutLegalRefs(merged);
    const rule = CATEGORY_CLAIMS.find(entry => (merged.category || '').startsWith(entry.prefix));
    if (rule) merged.wrongClaims = (merged.wrongClaims || []).concat([rule.claim]);
    if (WAIT_SIGNS.has(merged.id)) {
      merged.keyPoints = merged.keyPoints.concat([{ label: 'Vorschriftzeichen (kein Vorrangzeichen)', keywords: ['vorschriftzeichen'] }]);
    }
    merged.imageSrc = (item.images || []).map(key => imageMap[key]).filter(Boolean);
    // Ohne Abbildung im Original (z. B. Parkflächenmarkierung) wird die Karte als Textfrage gestellt.
    if (merged.imageSrc.length === 0) {
      merged.question = `Was regelt die StVO zur ${merged.kind || 'Zeichen'} „${merged.name}“? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.`;
    }
    return merged;
  });
  // Für das Bild-Training zählen nur Karten mit Original-Abbildung.
  const signs = allSigns.filter(item => item.imageSrc.length > 0);

  const all = questions
    .concat((muendlich && muendlich.questions) || [])
    .concat((technik && technik.questions) || [])
    .concat((sammlung && sammlung.questions) || [])
    .concat(allSigns);

  // Sammlungsfragen, die inhaltlich schon als eigene Frage enthalten sind (Verweis statt Dublette).
  const collectionCovered = (sammlung && sammlung.covered) || [];

  return { subjects, questions: all, signs, collectionCovered };
});
