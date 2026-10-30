/**
 * Prüfungsfragen der mündlichen Prüfung – Verkehrsverhalten und Recht.
 * Fragenliste nach Ihren Prüfungsunterlagen, Musterantworten selbst formuliert.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FLQuestionsMuendlich = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const SOURCE = 'Prüfungsfragen Verkehrsverhalten/Recht';

  function q(n, data) {
    return Object.assign({ id: `mp-${String(n).padStart(2, '0')}`, difficulty: 2, source: SOURCE, wrongClaims: [] }, data);
  }

  const questions = [
    q(1, {
      subject: 'recht',
      topic: 'Direkt erwerbbare Fahrerlaubnisklassen',
      question: 'Welche Fahrerlaubnisklassen lassen sich direkt, also ohne Vorbesitz einer anderen Klasse, erwerben?',
      explanation: 'Manche Klassen kann man ohne anderen Führerschein machen, andere setzen eine Klasse voraus – meistens die Klasse B.',
      example: 'Ein 18-Jähriger möchte direkt den Lkw-Führerschein C machen. Er braucht vorher Klasse B.',
      modelAnswer: 'Ohne Vorbesitz einer anderen Klasse können erworben werden: AM (ab 16 Jahren, in einigen Ländern ab 15), A1 (ab 16), A2 (ab 18), A (direkt ab 24 Jahren), B (ab 18, mit begleitetem Fahren ab 17), L und T (ab 16). Für BE, C1, C, D1 und D wird die Klasse B vorausgesetzt, für die Anhängerklassen CE, C1E, DE und D1E die jeweilige Zugfahrzeugklasse.',
      keyPoints: [
        { label: 'AM', keywords: ['am'] },
        { label: 'A1, A2, A', keywords: ['a1', 'a2'] },
        { label: 'B (ab 18 / BF17)', keywords: ['klasse b', ' b ', 'b,', 'bf17', 'b ab'] },
        { label: 'L und T', keywords: ['l und t', 'klasse l', 'klasse t', ' l ', ' t '] },
        { label: 'C/D-Klassen setzen B voraus', keywords: ['vorbesitz', 'voraussetz', 'setzt b', 'setzen b'] }
      ],
      wrongClaims: [
        { label: 'Falsch: BE kann nicht ohne Klasse B erworben werden', keywords: ['be direkt', 'be ohne'] }
      ],
      followUps: ['Ab welchem Alter kann Klasse A direkt erworben werden?', 'Welche Klassen sind in Klasse B eingeschlossen?']
    }),
    q(2, {
      subject: 'recht',
      topic: 'Erweiterungen der Klasse B',
      question: 'Welche Erweiterungen gibt es zur Klasse B?',
      explanation: 'Mit Klasse B kann man durch Schulungen oder Prüfungen mehr fahren: größere Anhänger, kleine Motorräder oder Schaltwagen nach Automatik-Prüfung.',
      example: 'Ein Kunde fragt, ob er für seinen Pferdeanhänger einen neuen Führerschein braucht. Je nach Gespanngewicht reicht B96, sonst BE.',
      modelAnswer: 'Erweiterungen zur Klasse B sind: Klasse BE für Anhänger über 750 kg ohne Gesamtgrenze bis 3.500 kg Anhänger; die Schlüsselzahl 96 für Kombinationen über 3.500 bis 4.250 kg nach einer Fahrerschulung ohne Prüfung; die Schlüsselzahl 196 für Leichtkrafträder bis 125 cm³ nach Schulung (ab 25 Jahren, B seit 5 Jahren, nur in Deutschland gültig); und die Schlüsselzahl 197, mit der man nach Prüfung auf Automatik auch Schaltwagen fahren darf. Darauf aufbauend können C1, C, D1 und D erworben werden.',
      keyPoints: [
        { label: 'BE', keywords: ['be'] },
        { label: 'B96', keywords: ['96'] },
        { label: 'B196', keywords: ['196'] },
        { label: 'B197', keywords: ['197'] },
        { label: 'Kurze Inhalte (Gewichte/Schulung)', keywords: ['4.250', '4250', '125', 'schulung', 'anhänger'] }
      ],
      followUps: ['Was ist der Unterschied zwischen B96 und BE?', 'Welche Voraussetzungen gelten für B196?']
    }),
    q(3, {
      subject: 'recht',
      topic: 'Alle Fahrerlaubnisklassen',
      question: 'Nennen Sie alle Ihnen bekannten Fahrerlaubnisklassen.',
      explanation: 'Es gibt Klassen für Zweiräder (A), für Autos (B), für Lkw (C), für Busse (D) und für land- und forstwirtschaftliche Fahrzeuge (L, T) – jeweils mit Anhänger-Varianten (E).',
      example: 'Im Theorieunterricht lassen Sie die Klassen nach Fahrzeuggruppen sortieren – das bleibt besser hängen als eine reine Liste.',
      modelAnswer: 'Die Fahrerlaubnisklassen sind: AM, A1, A2, A (Krafträder), B und BE (Pkw und Anhänger), C1, C1E, C, CE (Lkw), D1, D1E, D, DE (Busse) sowie L und T (land- und forstwirtschaftliche Zugmaschinen). Dazu kommt die Mofa-Prüfbescheinigung, die keine Fahrerlaubnisklasse ist.',
      keyPoints: [
        { label: 'AM, A1, A2, A', keywords: ['a1', 'a2', 'am'] },
        { label: 'B, BE', keywords: ['be'] },
        { label: 'C1, C1E, C, CE', keywords: ['c1', 'ce'] },
        { label: 'D1, D1E, D, DE', keywords: ['d1', 'de'] },
        { label: 'L, T', keywords: [' l ', ' t ', 'l und t', 'l, t'] },
        { label: 'Mofa-Prüfbescheinigung', keywords: ['mofa'] }
      ],
      followUps: ['Welche Klassen sind in Klasse B eingeschlossen?', 'Was dürfen Sie mit Klasse T fahren?']
    }),
    q(4, {
      subject: 'verhalten',
      topic: 'Überholverbote',
      question: 'Nennen Sie fünf Überholverbote.',
      explanation: 'Überholen ist verboten, wenn es gefährlich ist oder ein Zeichen es verbietet. Die wichtigsten Fälle kann man sich gut als Liste merken.',
      example: 'Auf der Landstraße vor einem Bahnübergang will der Schüler noch schnell überholen – genau hier ist es verboten.',
      modelAnswer: 'Überholen ist verboten: 1. bei unklarer Verkehrslage (§ 5 Abs. 3 StVO), 2. wenn Zeichen 276 oder 277 es verbieten, 3. wenn dafür eine Fahrstreifenbegrenzung (Zeichen 295) überfahren werden müsste, 4. an Bahnübergängen (§ 19 StVO), 5. an Fußgängerüberwegen (§ 26 StVO), 6. wenn sich ein Linien- oder Schulbus mit eingeschaltetem Warnblinklicht einer Haltestelle nähert (§ 20 StVO), 7. für Kfz über 7,5 t bei Sichtweite unter 50 m. Außerdem darf nur überholen, wer Gegenverkehr nicht behindert und wesentlich schneller fährt.',
      keyPoints: [
        { label: 'Unklare Verkehrslage', keywords: ['unklar'] },
        { label: 'Zeichen 276/277', keywords: ['276', '277', 'überholverbotsschild', 'zeichen'] },
        { label: 'Fahrstreifenbegrenzung', keywords: ['fahrstreifenbegrenzung', 'durchgezogen', '295'] },
        { label: 'Bahnübergang', keywords: ['bahnübergang'] },
        { label: 'Fußgängerüberweg', keywords: ['fußgängerüberweg', 'zebrastreifen'] },
        { label: 'Bus mit Warnblinklicht', keywords: ['bus', 'warnblink'] },
        { label: 'Über 7,5 t bei Sicht unter 50 m', keywords: ['7,5', '50 m'] }
      ],
      followUps: ['Wann ist Rechtsüberholen erlaubt?', 'Was bedeutet „unklare Verkehrslage“?']
    }),
    q(5, {
      subject: 'recht',
      topic: 'Klasse B96',
      question: 'Beschreiben Sie die Klasse B96: Ausbildungsablauf und Art des Erwerbs.',
      explanation: 'Mit B96 darf man schwerere Gespanne bis 4.250 kg fahren. Dafür gibt es keine Prüfung, sondern eine Schulung in der Fahrschule.',
      example: 'Ein Wohnwagen-Gespann wiegt zusammen 4.000 kg: B reicht nicht, B96 schon.',
      modelAnswer: 'Die Schlüsselzahl 96 erweitert Klasse B auf Fahrzeugkombinationen aus einem Zugfahrzeug der Klasse B und einem Anhänger über 750 kg, deren zulässige Gesamtmasse mehr als 3.500 kg, aber nicht mehr als 4.250 kg beträgt. Erworben wird sie ohne Prüfung durch eine Fahrerschulung nach Anlage 7a FeV in der Fahrschule: mindestens sieben Stunden, davon mindestens 2,5 Stunden Theorie und 3,5 Stunden praktische Übungen, ergänzt um eine Fahrt im öffentlichen Straßenverkehr. Nach der Schulung gibt es eine Bescheinigung, mit der die Schlüsselzahl bei der Fahrerlaubnisbehörde eingetragen wird.',
      keyPoints: [
        { label: 'Kombination über 3.500 bis 4.250 kg', keywords: ['4.250', '4250', '3.500', '3500'] },
        { label: 'Anhänger über 750 kg', keywords: ['750'] },
        { label: 'Keine Prüfung, Schulung', keywords: ['keine prüfung', 'ohne prüfung', 'schulung'] },
        { label: 'Mindestens 7 Stunden (2,5 Theorie, 3,5 Praxis)', keywords: ['7 stunden', 'sieben stunden', '2,5', '3,5'] },
        { label: 'Bescheinigung und Eintragung', keywords: ['bescheinigung', 'eintrag', 'behörde'] }
      ],
      wrongClaims: [
        { label: 'Falsch: Für B96 gibt es keine Prüfung', keywords: ['prüfung ablegen', 'praktische prüfung'] }
      ],
      followUps: ['Was dürfen Sie mit BE, was mit B96 nicht?', 'Welche Inhalte hat die Schulung?']
    }),
    q(6, {
      subject: 'recht',
      topic: 'Klasse B197 und B78',
      question: 'a) Beschreiben Sie die Klasse B197 (Ausbildungsablauf/Prüfung). b) Wie verhält es sich, wenn jemand vorher B78 gemacht hat?',
      explanation: 'B197 heißt: Prüfung auf Automatik, trotzdem darf man Schaltwagen fahren – wenn man in der Fahrschule Schaltstunden und eine Testfahrt gemacht hat. Wer schon die Beschränkung B78 hat, muss sie gesondert aufheben lassen.',
      example: 'Eine Schülerin hat 2019 auf Automatik geprüft (B78) und will jetzt Schaltwagen fahren. Klären Sie den Weg mit der Fahrerlaubnisbehörde.',
      modelAnswer: 'Bei B197 wird die praktische Prüfung auf einem Fahrzeug mit Automatikgetriebe abgelegt, ohne dass die Fahrerlaubnis auf Automatik beschränkt wird. Voraussetzung: mindestens zehn Fahrstunden à 45 Minuten auf einem Schaltwagen in der Fahrschule und eine mindestens 15-minütige Testfahrt mit Schaltgetriebe, die die Fahrschule bescheinigt; die Schlüsselzahl muss zeitnah (innerhalb eines Jahres) eingetragen werden. b) Wer bereits die Schlüsselzahl 78 (Beschränkung auf Automatik) hat, kann sie nach § 17a FeV auf Antrag austragen lassen, indem er in einer praktischen Prüfung auf einem Schaltwagen nachweist, dass er ein solches Fahrzeug sicher führen kann. Den genauen Weg im Einzelfall klärt man mit der Fahrerlaubnisbehörde.',
      keyPoints: [
        { label: 'Prüfung auf Automatik ohne Beschränkung', keywords: ['automatik', 'keine beschränkung', 'ohne beschränkung'] },
        { label: '10 Fahrstunden Schaltwagen', keywords: ['10', 'zehn'] },
        { label: '15-minütige Testfahrt', keywords: ['15', 'testfahrt'] },
        { label: 'Bescheinigung/Eintragung', keywords: ['bescheinig', 'eintrag'] },
        { label: 'B78: praktische Prüfung auf Schaltwagen zum Austragen', keywords: ['78', 'praktische prüfung', 'schaltwagen', 'austragen'] }
      ],
      followUps: ['Warum ist B197 für Fahrschulen mit E-Autos wichtig?', 'Wer bescheinigt die Testfahrt?']
    }),
    q(7, {
      subject: 'zeichen',
      topic: 'Eingeschränktes Haltverbot mit und ohne Pfeile',
      question: 'Erklären Sie das eingeschränkte Haltverbot – mit und ohne Pfeile.',
      explanation: 'Beim eingeschränkten Haltverbot darf man bis 3 Minuten halten, länger nur zum Ein-/Aussteigen oder Be-/Entladen. Pfeile im Schild zeigen, wo die Verbotsstrecke anfängt und endet.',
      example: 'Gehen Sie mit dem Schüler eine Straße mit mehreren Haltverbotsschildern ab und lassen Sie ihn Anfang und Ende der Strecke anhand der Pfeile bestimmen.',
      modelAnswer: 'Zeichen 286 „Eingeschränktes Haltverbot“: Halten länger als drei Minuten ist verboten, ausgenommen zum Ein- oder Aussteigen und zum Be- oder Entladen, das ohne Verzögerung erfolgen muss. Das Verbot gilt nur auf der Straßenseite, auf der das Zeichen steht. Ohne Pfeile gilt es grundsätzlich bis zur nächsten Kreuzung oder Einmündung. Mit Pfeilen wird die Verbotsstrecke gekennzeichnet: Ein zur Fahrbahn weisender Pfeil zeigt den Anfang, ein von der Fahrbahn wegweisender Pfeil das Ende, ein wiederholtes Zeichen in der Strecke trägt beide Pfeile. Zusatzzeichen können das Verbot auf den Seitenstreifen ausdehnen oder Ausnahmen (z. B. Bewohner) regeln.',
      keyPoints: [
        { label: 'Max. 3 Minuten halten', keywords: ['3 minuten', 'drei minuten'] },
        { label: 'Ausnahme Ein-/Aussteigen, Be-/Entladen', keywords: ['aussteigen', 'einsteigen', 'entladen', 'beladen'] },
        { label: 'Nur auf dieser Straßenseite', keywords: ['straßenseite', 'seite'] },
        { label: 'Ohne Pfeil bis zur nächsten Kreuzung', keywords: ['kreuzung', 'einmündung'] },
        { label: 'Pfeile: Anfang, Ende, Wiederholung', keywords: ['anfang', 'ende', 'pfeil', 'beginn'] }
      ],
      wrongClaims: [
        { label: 'Falsch: Parken ist im eingeschränkten Haltverbot nicht erlaubt', keywords: ['darf parken', 'parken erlaubt'] }
      ],
      followUps: ['Ab wann parkt man?', 'Welche Zusatzzeichen gibt es zum eingeschränkten Haltverbot?']
    }),
    q(8, {
      subject: 'zeichen',
      topic: 'Zeichen 102 und seine Aufhebung',
      question: 'a) Erklären Sie Zeichen 102. b) Wie wird dieses „aufgehoben“?',
      explanation: 'Zeichen 102 warnt vor einer Kreuzung mit „rechts vor links“. Es gilt nur für die nächste Kreuzung – danach ist es automatisch vorbei.',
      example: 'Nach der Kreuzung fragt der Schüler, wo das Ende-Schild ist. Erklären Sie: Gefahrzeichen gelten nur bis zur Gefahrstelle.',
      modelAnswer: 'Zeichen 102 ist ein Gefahrzeichen „Kreuzung oder Einmündung mit Vorfahrt von rechts“. An der folgenden Kreuzung gilt rechts vor links; ich nähere mich mit mäßiger Geschwindigkeit, achte nach rechts und gewähre Fahrzeugen von rechts Vorfahrt. Außerorts steht es etwa 150 bis 250 m vorher. b) Es braucht kein Aufhebungszeichen: Wie alle Gefahrzeichen gilt es nur für die angekündigte Gefahrstelle, also für die nächste Kreuzung oder Einmündung, und endet dort.',
      keyPoints: [
        { label: 'Gefahrzeichen Vorfahrt von rechts', keywords: ['vorfahrt von rechts', 'rechts vor links'] },
        { label: 'Langsam, nach rechts achten', keywords: ['mäßig', 'langsam', 'nach rechts'] },
        { label: '150–250 m vorher (außerorts)', keywords: ['150', '250'] },
        { label: 'Gilt nur für die nächste Kreuzung', keywords: ['nächste kreuzung', 'nächsten kreuzung', 'nur für'] },
        { label: 'Keine Aufhebung nötig', keywords: ['kein aufhebung', 'keine aufhebung', 'nicht aufgehoben', 'endet', 'automatisch'] }
      ],
      followUps: ['Worin unterscheiden sich Zeichen 102 und 301?', 'Wo stehen Gefahrzeichen innerorts?']
    }),
    q(9, {
      subject: 'verhalten',
      topic: 'Warnblinklicht',
      question: 'Wann muss und wann darf man das Warnblinklicht einschalten?',
      explanation: 'Das Warnblinklicht warnt andere vor einer Gefahr. In einigen Fällen ist es Pflicht, in anderen erlaubt.',
      example: 'Auf der Autobahn nähert sich der Schüler einem Stauende: Warnblinklicht einschalten ist hier erlaubt und sinnvoll.',
      modelAnswer: 'Pflicht ist es: wenn ein mehrspuriges Fahrzeug an einer unübersichtlichen Stelle liegen bleibt (§ 15 StVO), beim Abschleppen an beiden Fahrzeugen (§ 15a StVO) und für Fahrer von Linien- und Schulbussen beim Annähern an Haltestellen, wenn die Behörde das angeordnet hat (§ 16 StVO). Erlaubt ist es, wenn man andere durch das eigene Fahrzeug gefährdet oder vor Gefahren warnen will, z. B. bei Annäherung an einen Stau oder an eine Unfallstelle. Nicht erlaubt ist es als „Entschuldigung“ beim Falschparken.',
      keyPoints: [
        { label: 'Liegenbleiben (§ 15)', keywords: ['liegenbleib', 'liegen bleib', 'panne'] },
        { label: 'Abschleppen', keywords: ['abschlepp'] },
        { label: 'Linien-/Schulbus an Haltestelle', keywords: ['schulbus', 'linienbus', 'bus'] },
        { label: 'Stauende / Gefahr warnen', keywords: ['stau', 'warnen', 'gefahr'] },
        { label: 'Nicht beim Falschparken', keywords: ['falschpark', 'parken', 'halten in zweiter reihe'] }
      ],
      followUps: ['Wie sichern Sie eine Panne auf der Landstraße ab?', 'Was gilt beim Abschleppen noch?']
    }),
    q(10, {
      subject: 'recht',
      topic: 'Personenbeförderung mit Klasse B',
      question: 'Wie viele Personen dürfen Inhaber der Klasse B mitnehmen?',
      explanation: 'Klasse B gilt für Fahrzeuge mit höchstens 8 Sitzplätzen außer dem Fahrersitz. Also dürfen höchstens 8 Personen mitfahren.',
      example: 'Für den Vereinsausflug mietet jemand einen Kleinbus mit 9 Sitzen (inkl. Fahrer) – mit Klasse B erlaubt.',
      modelAnswer: 'Mit Klasse B dürfen Kraftfahrzeuge mit einer zulässigen Gesamtmasse bis 3.500 kg geführt werden, die für die Beförderung von nicht mehr als acht Personen außer dem Fahrzeugführer ausgelegt sind. Man darf also höchstens acht Personen mitnehmen – und nur so viele, wie Sitzplätze mit Gurten im Fahrzeugschein eingetragen sind.',
      keyPoints: [
        { label: 'Max. 8 Personen außer Fahrer', keywords: ['8', 'acht'] },
        { label: 'zGM bis 3.500 kg', keywords: ['3.500', '3500', '3,5'] },
        { label: 'Begrenzung durch eingetragene Sitzplätze', keywords: ['sitzplätze', 'sitzplatz', 'fahrzeugschein', 'gurt'] }
      ],
      wrongClaims: [
        { label: 'Falsch: Es sind 8 Mitfahrer, also 9 Personen inklusive Fahrer', keywords: ['9 mitfahrer', 'neun mitfahrer'] }
      ],
      followUps: ['Welche Klasse brauchen Sie für einen Bus mit 12 Sitzplätzen?', 'Was gilt für Kinder auf den Sitzplätzen?']
    }),
    q(11, {
      subject: 'recht',
      topic: 'Geltungsbereich BF17',
      question: 'Wo gilt das begleitete Fahren ab 17 (BF17)?',
      explanation: 'Mit 17 darf man nur in Deutschland und in Österreich mit Begleitung fahren. Andere Länder erkennen die Prüfungsbescheinigung nicht an.',
      example: 'Eine Familie plant mit dem 17-jährigen Sohn einen Urlaub in Italien. Fahren darf er dort nicht.',
      modelAnswer: 'Das begleitete Fahren ab 17 gilt in Deutschland. Österreich erkennt die deutsche Prüfungsbescheinigung bis zum 18. Geburtstag ebenfalls an; die deutsche Nachfrist von drei Monaten nach dem 18. Geburtstag gilt dort aber nicht. In anderen Ländern darf mit der Prüfungsbescheinigung nicht gefahren werden.',
      keyPoints: [
        { label: 'Deutschland', keywords: ['deutschland', 'inland'] },
        { label: 'Österreich (bis 18)', keywords: ['österreich'] },
        { label: 'Sonst nirgends', keywords: ['nicht im ausland', 'andere länder', 'nur'] }
      ],
      followUps: ['Welche Voraussetzungen muss die Begleitperson erfüllen?', 'Wie lange gilt die Prüfungsbescheinigung?']
    }),
    q(12, {
      subject: 'verhalten',
      topic: 'Fahrzeugabmessungen und Ladung',
      question: 'Welche maximalen Fahrzeugabmessungen einschließlich Ladung erlaubt die StVO?',
      explanation: 'Fahrzeug und Ladung dürfen bestimmte Maße nicht überschreiten: 2,55 m breit, 4 m hoch, 20,75 m lang. Ladung darf nur begrenzt nach hinten herausragen.',
      example: 'Ein Kunde transportiert Holzlatten, die 1,2 m hinten aus dem Kofferraum ragen. Was muss er tun? Kenntlich machen (rote Fahne / Schild).',
      modelAnswer: 'Nach § 22 StVO dürfen Fahrzeug und Ladung zusammen nicht breiter als 2,55 m und nicht höher als 4 m sein; Fahrzeug bzw. Zug und Ladung nicht länger als 20,75 m. Nach vorn darf Ladung bis zu einer Höhe von 2,5 m nicht über das Fahrzeug hinausragen. Nach hinten darf sie bis 1,5 m hinausragen, bei einer Beförderung über höchstens 100 km bis 3 m. Ragt Ladung mehr als 1 m nach hinten hinaus, muss das Ende gekennzeichnet werden: tagsüber mit einer hellroten Fahne oder einem Schild (mindestens 30 × 30 cm), bei Dunkelheit zusätzlich mit roter Leuchte und rotem Rückstrahler.',
      keyPoints: [
        { label: 'Breite 2,55 m', keywords: ['2,55'] },
        { label: 'Höhe 4 m', keywords: ['4 m', 'vier meter', '4,0'] },
        { label: 'Länge 20,75 m', keywords: ['20,75'] },
        { label: 'Hinten 1,5 m (3 m bis 100 km)', keywords: ['1,5', '3 m', '100 km'] },
        { label: 'Ab 1 m Kennzeichnung (rote Fahne/Leuchte)', keywords: ['fahne', 'kenntlich', 'kennzeichn', 'rote leuchte'] }
      ],
      followUps: ['Wie kennzeichnen Sie überstehende Ladung bei Nacht?', 'Was gilt für Ladung nach vorne?']
    }),
    q(13, {
      subject: 'praxis',
      topic: 'Ausbildungsdiagrammkarte (ADK)',
      question: 'a) Zu welchem Zeitpunkt wird die Ausbildungsdiagrammkarte ausgefüllt? b) Erklären Sie die Ausbildungsstufen in der ADK.',
      explanation: 'Die ADK ist der „Fahrplan“ der praktischen Ausbildung. Nach jeder Fahrstunde wird eingetragen, was geübt wurde und wie gut es klappt.',
      example: 'Nach der Fahrstunde füllen Sie die ADK gemeinsam mit dem Schüler aus. So sieht er selbst, wo er steht.',
      modelAnswer: 'a) Die ADK wird laufend geführt, also nach jeder Ausbildungsfahrt – am besten gemeinsam mit dem Fahrschüler im Nachgespräch. Sie dokumentiert Inhalte und Leistungsstand und dient als Nachweis der Ausbildung. b) Die Stufen bauen aufeinander auf: Grundstufe (Bedienung, Grundfertigkeiten), Aufbaustufe (einfacher Straßenverkehr, z. B. Kreuzungen, Fahrstreifen), Leistungsstufe (komplexe Verkehrssituationen, Stadtverkehr), Grundfahraufgaben, besondere Ausbildungsfahrten (Überland, Autobahn, Dunkelheit) sowie die Reife- und Teststufe zur Vorbereitung auf die Prüfung.',
      keyPoints: [
        { label: 'Nach jeder Fahrstunde / laufend', keywords: ['nach jeder', 'jeder fahrstunde', 'laufend', 'jede stunde'] },
        { label: 'Grundstufe', keywords: ['grundstufe'] },
        { label: 'Aufbaustufe', keywords: ['aufbaustufe'] },
        { label: 'Leistungsstufe', keywords: ['leistungsstufe'] },
        { label: 'Grundfahraufgaben / Sonderfahrten', keywords: ['grundfahraufgaben', 'sonderfahrt', 'besondere ausbildungsfahrt'] },
        { label: 'Reife- und Teststufe', keywords: ['reife', 'teststufe'] }
      ],
      followUps: ['Warum füllen Sie die ADK gemeinsam mit dem Schüler aus?', 'Wann ist ein Schüler in der Reife- und Teststufe?']
    }),
    q(14, {
      subject: 'praxis',
      topic: 'Grundfahraufgaben Klasse B',
      question: 'Nennen Sie die Grundfahraufgaben der Klasse B.',
      explanation: 'Grundfahraufgaben sind Manöver wie Einparken, Rückwärtsfahren, Umkehren und Gefahrbremsung. In der Prüfung werden drei davon verlangt.',
      example: 'In der Reifestufe lassen Sie den Schüler jede Grundfahraufgabe zweimal fehlerfrei zeigen.',
      modelAnswer: 'Die Grundfahraufgaben der Klasse B (Anlage 7 FeV) sind: Rückwärtsfahren nach rechts unter Ausnutzung einer Einmündung, Kreuzung oder Einfahrt; Rückwärtsfahren in eine Parklücke (Längsaufstellung); Einfahren in eine Parklücke (Quer- oder Schrägaufstellung); Umkehren; Abbremsen mit höchstmöglicher Verzögerung (Gefahrbremsung). In der Prüfung werden drei geprüft: eine der beiden Rückwärtsaufgaben und zwei aus Umkehren, Einparken quer/schräg und Gefahrbremsung.',
      keyPoints: [
        { label: 'Rückwärts um die Ecke', keywords: ['rückwärts', 'einmündung', 'ecke'] },
        { label: 'Einparken längs', keywords: ['längs', 'parklücke'] },
        { label: 'Einparken quer/schräg', keywords: ['quer', 'schräg'] },
        { label: 'Umkehren', keywords: ['umkehren', 'wenden'] },
        { label: 'Gefahrbremsung', keywords: ['gefahrbremsung', 'höchstmöglicher verzögerung', 'vollbremsung'] },
        { label: 'Drei in der Prüfung', keywords: ['drei', '3'] }
      ],
      followUps: ['Wie bringen Sie das Rückwärtseinparken bei?', 'Welche Bewertungskriterien gibt es bei der Gefahrbremsung?']
    }),
    q(15, {
      subject: 'recht',
      topic: 'Alkohol bei Fahranfängern',
      question: 'Was muss ein Fahranfänger rechtlich hinsichtlich Alkoholkonsum beachten?',
      explanation: 'Für Fahranfänger gilt: null Promille. Wer in der Probezeit oder unter 21 trinkt und fährt, begeht einen schweren Verstoß.',
      example: 'Nach der Prüfung fragt ein Schüler: „Ein Bier ist doch okay?“ – Nein, in der Probezeit gilt 0,0.',
      modelAnswer: 'Nach § 24c StVG gilt für Fahranfänger in der Probezeit und für alle unter 21 Jahren ein absolutes Alkoholverbot: Sie dürfen weder Alkohol trinken und fahren noch unter Wirkung alkoholischer Getränke fahren. Ein Verstoß ist eine Ordnungswidrigkeit mit Bußgeld (250 €) und einem Punkt und gilt als schwerwiegender A-Verstoß: Aufbauseminar und Verlängerung der Probezeit auf vier Jahre. Darüber hinaus gelten die allgemeinen Grenzen: ab 0,5 ‰ Ordnungswidrigkeit, ab 0,3 ‰ mit Ausfallerscheinungen und ab 1,1 ‰ Straftat.',
      keyPoints: [
        { label: '0,0 Promille / Alkoholverbot', keywords: ['0,0', 'null promille', 'alkoholverbot', 'absolut'] },
        { label: 'Probezeit und unter 21', keywords: ['probezeit', '21'] },
        { label: '§ 24c StVG', keywords: ['24c'] },
        { label: 'A-Verstoß: Aufbauseminar, Verlängerung', keywords: ['a-verstoß', 'aufbauseminar', 'verlänger'] },
        { label: 'Bußgeld/Punkt', keywords: ['bußgeld', 'punkt', '250'] }
      ],
      followUps: ['Welche Grenzen gelten nach der Probezeit?', 'Wie lange dauert der Alkoholabbau?']
    }),
    q(16, {
      subject: 'praxis',
      topic: 'Sonderfahrten Klasse B',
      question: 'Welche Sonderfahrten gibt es? Nennen Sie die vorgeschriebene Anzahl und beschreiben Sie sie.',
      explanation: 'Für Klasse B sind zwölf besondere Ausbildungsfahrten vorgeschrieben: Landstraße, Autobahn und Dunkelheit.',
      example: 'Planen Sie die Dunkelfahrten im Sommer früh am Abend nicht – es ist noch hell. Besser im Herbst oder spät abends.',
      modelAnswer: 'Bei Ersterwerb der Klasse B sind zwölf besondere Ausbildungsfahrten à 45 Minuten vorgeschrieben: fünf auf Bundes- oder Landstraßen (Überlandfahrten, z. B. Kurven, Überholen, Wildwechsel, Geschwindigkeit anpassen), davon eine Fahrt von mindestens zwei Stunden zu je 45 Minuten am Stück; vier auf Autobahnen oder Kraftfahrstraßen (Einfädeln, Fahrstreifenwechsel, hohe Geschwindigkeit, Abstand), davon ebenfalls eine Fahrt von mindestens zwei Stunden, und soweit möglich mindestens eine Stunde auf Strecken ohne Geschwindigkeitsbegrenzung oder mit einer Begrenzung nicht unter 120 km/h; und drei bei Dämmerung oder Dunkelheit (Beleuchtung, Blendung, Sichtweite), mindestens zur Hälfte auf Autobahnen, Bundes- oder Landstraßen (Anlage 4 FahrschAusbO). Sie finden erst statt, wenn die Grundausbildung sicher sitzt, und werden in der Ausbildungsdokumentation nachgewiesen.',
      keyPoints: [
        { label: '12 Fahrten à 45 Minuten', keywords: ['12', 'zwölf', '45'] },
        { label: '5 Überland', keywords: ['überland', 'landstraße', 'bundesstraße'] },
        { label: '4 Autobahn', keywords: ['autobahn'] },
        { label: '3 Dunkelheit', keywords: ['dunkel', 'nacht', 'dämmerung'] },
        { label: 'Je eine Überland- und Autobahnfahrt mind. 2 × 45 Minuten am Stück', keywords: ['zwei stunden', '2 stunden', 'doppelstunde', '90 minuten', '2 × 45', '2 x 45'] },
        { label: 'Autobahn: möglichst 1 Stunde ohne Tempolimit bzw. nicht unter 120 km/h', keywords: ['120', 'ohne tempolimit', 'ohne geschwindigkeitsbegrenzung'] },
        { label: 'Inhalte beschrieben', keywords: ['kurven', 'einfädeln', 'blendung', 'überholen', 'beleuchtung'] },
        { label: 'Nach Grundausbildung', keywords: ['grundausbildung', 'nach der', 'erst'] }
      ],
      followUps: ['Welche Lernziele hat die erste Autobahnfahrt?', 'Was ändert sich bei Erweiterung von A auf B?']
    }),
    q(17, {
      subject: 'verhalten',
      topic: '§ 1 StVO',
      question: 'Erklären Sie § 1 StVO mit Begriffserklärungen und Beispielen.',
      explanation: '§ 1 ist die Grundregel: immer vorsichtig sein und Rücksicht nehmen. Niemand soll geschädigt, gefährdet oder unnötig behindert oder belästigt werden.',
      example: 'Unnötiges Hupen nachts im Wohngebiet ist eine Belästigung. Zu dichtes Auffahren ist eine Gefährdung.',
      modelAnswer: '§ 1 StVO ist die Grundregel. Abs. 1: Die Teilnahme am Straßenverkehr erfordert ständige Vorsicht und gegenseitige Rücksicht. Abs. 2: Wer am Verkehr teilnimmt, hat sich so zu verhalten, dass kein anderer geschädigt, gefährdet oder mehr als nach den Umständen unvermeidbar behindert oder belästigt wird. Begriffe: Schädigung – ein Schaden an Personen oder Sachen ist eingetreten (Unfall). Gefährdung – ein Schaden stand konkret bevor, z. B. durch dichtes Auffahren oder Schneiden. Behinderung – ein anderer muss seine Fahrweise ändern, z. B. Bremsen, weil jemand ohne Grund langsam fährt. Belästigung – Beeinträchtigung des Wohlbefindens, z. B. Lärm, Abgase, unnötiges Hupen, Blenden. Behinderungen und Belästigungen sind nur verboten, soweit sie vermeidbar sind.',
      keyPoints: [
        { label: 'Ständige Vorsicht, gegenseitige Rücksicht', keywords: ['vorsicht', 'rücksicht'] },
        { label: 'Schädigung', keywords: ['schädigung', 'geschädigt', 'schaden'] },
        { label: 'Gefährdung', keywords: ['gefährdung', 'gefährdet'] },
        { label: 'Behinderung', keywords: ['behinderung', 'behindert'] },
        { label: 'Belästigung', keywords: ['belästigung', 'belästigt'] },
        { label: 'Mehr als unvermeidbar', keywords: ['unvermeidbar', 'vermeidbar'] },
        { label: 'Beispiele', keywords: ['beispiel', 'hupen', 'auffahren', 'lärm'] }
      ],
      followUps: ['Ist kurzes Halten in zweiter Reihe eine Behinderung?', 'Wie vermitteln Sie § 1 im Theorieunterricht?']
    }),
    q(18, {
      subject: 'verhalten',
      topic: 'Abstände im Straßenverkehr',
      question: 'Was können Sie zu Abständen im Straßenverkehr erzählen?',
      explanation: 'Abstände gibt es nach vorn (Sicherheitsabstand), zur Seite (beim Überholen und Vorbeifahren) und beim Halten und Parken vor Kreuzungen und Einrichtungen.',
      example: 'Lassen Sie den Schüler die Zwei-Sekunden-Regel an Leitpfosten zählen und den Seitenabstand zu Radfahrern schätzen.',
      modelAnswer: 'Sicherheitsabstand nach vorn (§ 4 StVO): so groß, dass auch bei plötzlichem Bremsen angehalten werden kann; Faustregeln „halber Tacho“ in Metern oder zwei Sekunden, innerorts mindestens etwa eine Sekunde. Lkw über 3,5 t und Busse müssen auf Autobahnen über 50 km/h mindestens 50 m Abstand halten; außerorts müssen langsame Lkw und Gespanne Platz zum Einscheren lassen. Seitenabstand beim Überholen von Fußgängern, Rad- und E-Kleinstfahrzeugen: innerorts 1,5 m, außerorts 2 m; an parkenden Fahrzeugen etwa 1 m (Türbreite). Beim Halten und Parken: 5 m vor und hinter Kreuzungen und Einmündungen, 5 m vor Fußgängerüberwegen, 10 m vor Lichtzeichen und Zeichen 205/206, wenn sie verdeckt würden, 15 m vor und hinter Haltestellenschildern (Parkverbot).',
      keyPoints: [
        { label: 'Sicherheitsabstand (halber Tacho / 2 Sekunden)', keywords: ['halber tacho', 'zwei sekunden', '2 sekunden', 'sicherheitsabstand'] },
        { label: 'Lkw 50 m auf Autobahn', keywords: ['50 m'] },
        { label: 'Seitenabstand 1,5 / 2 m', keywords: ['1,5', '2 m'] },
        { label: 'Abstand zu parkenden Fahrzeugen', keywords: ['parkend', 'tür', '1 m'] },
        { label: 'Halt-/Parkabstände (5 m, 10 m, 15 m)', keywords: ['5 m', '10 m', '15 m'] }
      ],
      followUps: ['Wie bringen Sie die Zwei-Sekunden-Regel bei?', 'Welcher Abstand gilt beim Halten vor Fußgängerüberwegen?']
    }),
    q(19, {
      subject: 'zeichen',
      topic: 'Leitpfosten',
      question: 'Zeichnen und beschreiben Sie einen Leitpfosten auf der rechten Straßenseite.',
      explanation: 'Leitpfosten sind die weißen Pfosten am Straßenrand. Rechts haben sie einen rechteckigen, links zwei runde Rückstrahler. Sie stehen alle 50 m.',
      example: 'Bei der Nachtfahrt nutzen Sie die Leitpfosten, um mit dem Schüler Sichtweite und Abstand zu schätzen.',
      modelAnswer: 'Ein Leitpfosten (Anlage 4 StVO) ist ein weißer, etwa 1 m hoher Pfosten mit schräg zur Fahrbahn hin abfallender Oberseite und einem schwarzen Band. Auf der rechten Straßenseite trägt er im schwarzen Band einen rechteckigen weißen Rückstrahler, auf der linken Seite zwei runde weiße Rückstrahler. Leitpfosten stehen in der Regel im Abstand von 50 m. Sie zeigen den Straßenverlauf, helfen bei Dunkelheit und Nebel und eignen sich zum Schätzen von Sichtweite und Abstand.',
      keyPoints: [
        { label: 'Weiß mit schwarzem Band', keywords: ['weiß', 'schwarz'] },
        { label: 'Rechts: rechteckiger Rückstrahler', keywords: ['rechteck', 'eckig'] },
        { label: 'Links: zwei runde Rückstrahler', keywords: ['rund', 'zwei'] },
        { label: 'Abstand 50 m', keywords: ['50 m', '50 meter'] },
        { label: 'Zweck: Straßenverlauf, Sichtweite schätzen', keywords: ['verlauf', 'sichtweite', 'orientierung', 'nebel'] }
      ],
      wrongClaims: [
        { label: 'Verwechslung: Rechts ist der Rückstrahler rechteckig, links rund', keywords: ['rechts rund', 'rechts zwei runde'] }
      ],
      followUps: ['Wie nutzen Sie Leitpfosten bei Nebel?', 'Was sind Verkehrseinrichtungen?']
    }),
    q(20, {
      subject: 'praxis',
      topic: 'Fünf Fahrkompetenzbereiche',
      question: 'Welche fünf Fahrkompetenzbereiche gibt es in der praktischen Prüfung?',
      explanation: 'In der optimierten praktischen Prüfung wird in fünf Bereichen beobachtet und bewertet.',
      example: 'Geben Sie nach jeder Fahrstunde Rückmeldung in genau diesen fünf Bereichen.',
      modelAnswer: 'Die fünf Fahrkompetenzbereiche der optimierten praktischen Fahrerlaubnisprüfung sind: Verkehrsbeobachtung, Fahrzeugpositionierung, Geschwindigkeitsanpassung, Kommunikation sowie Fahrzeugbedienung und umweltbewusste Fahrweise.',
      keyPoints: [
        { label: 'Verkehrsbeobachtung', keywords: ['verkehrsbeobachtung', 'beobachtung'] },
        { label: 'Fahrzeugpositionierung', keywords: ['positionierung'] },
        { label: 'Geschwindigkeitsanpassung', keywords: ['geschwindigkeit'] },
        { label: 'Kommunikation', keywords: ['kommunikation'] },
        { label: 'Fahrzeugbedienung/umweltbewusst', keywords: ['bedienung', 'umwelt'] }
      ],
      followUps: ['Nennen Sie zu jedem Bereich ein typisches Fehlverhalten.', 'Welche Fahraufgaben gibt es?']
    }),
    q(21, {
      subject: 'technik',
      topic: 'Umweltschonendes Fahren und Luftreinhaltung',
      question: 'a) Wie verhält man sich umweltschonend? b) Erklären Sie den Begriff Luftreinhaltung.',
      explanation: 'Umweltschonend fährt, wer vorausschauend, gleichmäßig und niedertourig fährt. Luftreinhaltung meint alle Maßnahmen, die Schadstoffe in der Luft verringern, zum Beispiel Umweltzonen.',
      example: 'In einer Stadt mit Umweltzone fragen Sie: Welche Plakette braucht unser Fahrschulwagen?',
      modelAnswer: 'a) Umweltschonend fahre ich vorausschauend und gleichmäßig, schalte früh hoch, nutze Schubabschaltung bzw. Rekuperation, vermeide unnötige Kurzstrecken, Ballast und Dachaufbauten, halte den richtigen Reifendruck, setze Verbraucher wie die Klimaanlage bewusst ein und stelle bei längeren Standzeiten den Motor ab (§ 30 StVO: unnötiger Lärm und vermeidbare Abgasbelästigungen sind verboten, unnützes Hin- und Herfahren innerorts ebenfalls). b) Luftreinhaltung umfasst Maßnahmen, die Luftschadstoffe wie Feinstaub und Stickoxide begrenzen. Grundlage ist das Bundes-Immissionsschutzgesetz; Städte stellen Luftreinhaltepläne auf, z. B. mit Umweltzonen (Zeichen 270.1, Plakettenpflicht), Durchfahrtsverboten oder Tempolimits.',
      keyPoints: [
        { label: 'Vorausschauend, gleichmäßig, niedertourig', keywords: ['vorausschauend', 'gleichmäßig', 'niedertourig', 'früh hochschalten'] },
        { label: 'Reifendruck/Ballast/Verbraucher', keywords: ['reifendruck', 'ballast', 'klimaanlage', 'verbraucher'] },
        { label: 'Motor abstellen, Kurzstrecken vermeiden', keywords: ['motor ab', 'kurzstrecke'] },
        { label: '§ 30 StVO', keywords: ['30'] },
        { label: 'Luftreinhaltung: Schadstoffe begrenzen', keywords: ['feinstaub', 'stickoxid', 'schadstoff'] },
        { label: 'Umweltzone / Luftreinhalteplan', keywords: ['umweltzone', 'luftreinhalteplan', 'plakette', '270.1'] }
      ],
      followUps: ['Was bedeutet Zeichen 270.1?', 'Wie zeigen Sie dem Schüler den Verbrauch im Bordcomputer?']
    }),
    q(22, {
      subject: 'verhalten',
      topic: 'Halten und Parken',
      question: 'Wie definiert man Parken?',
      explanation: 'Parken heißt: Fahrzeug verlassen oder länger als 3 Minuten halten. Halten ist eine kurze, gewollte Fahrtunterbrechung.',
      example: 'Der Fahrer bleibt im Auto sitzen und wartet 5 Minuten – er parkt.',
      modelAnswer: 'Nach § 12 Abs. 2 StVO parkt, wer sein Fahrzeug verlässt oder länger als drei Minuten hält. Halten ist eine gewollte Fahrtunterbrechung, die nicht durch die Verkehrslage oder eine Anordnung veranlasst ist. Wer also im Auto sitzen bleibt und länger als drei Minuten wartet, parkt ebenfalls; wer das Fahrzeug verlässt, parkt sofort.',
      keyPoints: [
        { label: 'Fahrzeug verlassen', keywords: ['verlässt', 'verlassen'] },
        { label: 'Länger als 3 Minuten halten', keywords: ['3 minuten', 'drei minuten'] },
        { label: '§ 12 StVO', keywords: ['12'] },
        { label: 'Abgrenzung Halten', keywords: ['halten', 'fahrtunterbrechung'] }
      ],
      followUps: ['Wo ist Parken verboten?', 'Ist Warten an einer roten Ampel Halten?']
    }),
    q(23, {
      subject: 'verhalten',
      topic: 'Tastgeschwindigkeit',
      question: 'Wie erklären Sie Ihrem Fahrschüler die Tastgeschwindigkeit (visuell)?',
      explanation: 'Tastgeschwindigkeit heißt: ganz langsam, Zentimeter für Zentimeter, an eine unübersichtliche Stelle heranfahren, bis man genug sieht – jederzeit bereit, sofort anzuhalten.',
      example: 'Zeichnen Sie die Einmündung mit parkenden Autos und eine Sichtlinie auf. Der Schüler fährt im Modell Schritt für Schritt vor, bis er die Straße einsieht.',
      modelAnswer: 'Tastgeschwindigkeit bedeutet, sich an einer unübersichtlichen Stelle so langsam – deutlich unter Schrittgeschwindigkeit, mit schleifender Kupplung oder bremsbereit – vorzutasten, dass jederzeit sofort angehalten werden kann. Nach § 8 Abs. 2 StVO darf sich der Wartepflichtige an unübersichtlichen Kreuzungen vorsichtig hineintasten, bis er Übersicht hat. Visuell erkläre ich das mit einer Skizze: Haltlinie, Sichtlinie und Sichtdreieck, die Sichtachse vom Fahrerplatz, und wie sich die Sicht mit jedem Dezimeter Vorrollen vergrößert. In der Praxis zeige ich es an Grundstücksausfahrten oder Einmündungen mit parkenden Fahrzeugen.',
      keyPoints: [
        { label: 'Sehr langsam, jederzeit anhaltebereit', keywords: ['langsam', 'anhalte', 'zentimeter', 'schleifend'] },
        { label: 'An unübersichtlichen Stellen', keywords: ['unübersichtlich', 'einmündung', 'ausfahrt'] },
        { label: 'Bis Übersicht besteht', keywords: ['übersicht', 'einsehen', 'sicht'] },
        { label: '§ 8 Abs. 2 StVO', keywords: ['§ 8', '8 abs'] },
        { label: 'Visualisierung (Skizze, Sichtlinie)', keywords: ['skizze', 'zeichnung', 'sichtlinie', 'sichtdreieck'] }
      ],
      followUps: ['Wie verhalten Sie sich, wenn trotzdem jemand kommt?', 'Was ist der Unterschied zur Schrittgeschwindigkeit?']
    }),
    q(24, {
      subject: 'verhalten',
      topic: 'Toter Winkel',
      question: 'Zeichnen Sie den toten Winkel auf und erklären Sie ihn.',
      explanation: 'Der tote Winkel ist der Bereich neben und hinter dem Auto, den man weder direkt noch in den Spiegeln sieht. Nur der Schulterblick hilft.',
      example: 'Setzen Sie den Schüler ins Auto und lassen Sie eine Person langsam um das Fahrzeug gehen: Wann ist sie in keinem Spiegel zu sehen?',
      modelAnswer: 'Der tote Winkel ist der Bereich neben und schräg hinter dem Fahrzeug, der weder durch direkten Blick nach vorn noch über Innen- und Außenspiegel eingesehen werden kann. Er liegt links und rechts hinten seitlich, beim Pkw vor allem neben dem hinteren Fahrzeugteil; bei Lkw sind die toten Winkel viel größer, besonders rechts. Deshalb ist vor dem Fahrstreifenwechsel, Anfahren vom Fahrbahnrand und Abbiegen der Schulterblick nötig. Spiegel müssen richtig eingestellt sein. Für Fahrschüler ist außerdem wichtig, den toten Winkel von Lkw zu kennen und sich als Radfahrer nicht dort aufzuhalten.',
      keyPoints: [
        { label: 'Bereich, nicht über Spiegel/direkt sichtbar', keywords: ['nicht sichtbar', 'nicht einsehbar', 'spiegel', 'nicht sehen'] },
        { label: 'Seitlich hinten', keywords: ['seitlich', 'hinten', 'neben'] },
        { label: 'Schulterblick', keywords: ['schulterblick'] },
        { label: 'Lkw: großer toter Winkel rechts', keywords: ['lkw'] },
        { label: 'Spiegel richtig einstellen', keywords: ['einstellen'] }
      ],
      followUps: ['Wann ist der Schulterblick in der Prüfung Pflicht?', 'Wie helfen Totwinkel-Assistenten?']
    }),
    q(25, {
      subject: 'praxis',
      topic: 'Theorie und Praxis Klasse B',
      question: 'Wie viele Theorieunterrichte und wie viele praktische Fahrstunden sind für den Erwerb der Klasse B vorgeschrieben?',
      explanation: 'Theorie: 14 Doppelstunden. Praxis: keine Mindestzahl an normalen Fahrstunden, aber 12 Sonderfahrten sind Pflicht.',
      example: 'Ein Kunde fragt: „Wie viele Fahrstunden brauche ich mindestens?“ – Gesetzlich nur die 12 Sonderfahrten, die tatsächliche Zahl hängt vom Lernfortschritt ab.',
      modelAnswer: 'Theorie: Bei Ersterwerb der Klasse B 14 Doppelstunden à 90 Minuten, davon 12 Doppelstunden Grundstoff und 2 Doppelstunden klassenspezifischer Zusatzstoff. Praxis: Eine Mindestzahl an Übungsstunden ist gesetzlich nicht vorgeschrieben; die Ausbildung richtet sich nach dem Lernfortschritt. Vorgeschrieben sind aber 12 besondere Ausbildungsfahrten à 45 Minuten: 5 Überland und 4 Autobahn (davon jeweils eine Fahrt von mindestens zwei Stunden; auf der Autobahn möglichst eine Stunde ohne Tempolimit bzw. nicht unter 120 km/h), 3 bei Dämmerung oder Dunkelheit.',
      keyPoints: [
        { label: '14 Doppelstunden Theorie', keywords: ['14'] },
        { label: '12 Grundstoff + 2 Zusatzstoff', keywords: ['grundstoff', 'zusatzstoff'] },
        { label: 'Keine Mindestzahl Übungsstunden', keywords: ['keine mindest', 'nicht vorgeschrieben', 'lernfortschritt'] },
        { label: '12 Sonderfahrten', keywords: ['12', 'zwölf', 'sonderfahrt', 'besondere ausbildungsfahrt'] }
      ],
      followUps: ['Wie verteilen sich die Sonderfahrten?', 'Wie viele Doppelstunden pro Tag sind erlaubt?']
    }),
    q(26, {
      subject: 'zeichen',
      topic: 'Traktor-, Carsharing-, Grünpfeil-, Autobahn- und Fahrradstraßen-Zeichen',
      question: 'Erklären Sie die Zeichen mit Traktorsymbol, Carsharing-Symbol, das Grünpfeilschild sowie die Zeichen Autobahn und Fahrradstraße.',
      explanation: 'Sinnbilder auf Zeichen und Zusatzzeichen stehen für Verkehrsarten. Traktor = land- und forstwirtschaftlicher Verkehr, Carsharing = gekennzeichnete Carsharing-Fahrzeuge.',
      example: 'Am Feldweg steht „Verbot für Fahrzeuge aller Art“ mit Traktor-Zusatzzeichen. Fragen Sie: Wer darf hier fahren?',
      modelAnswer: 'Traktorsymbol: Es steht für land- und forstwirtschaftliche Fahrzeuge. Als Zusatzzeichen „Land- und forstwirtschaftlicher Verkehr frei“ nimmt es diesen Verkehr von einem Verbot aus, z. B. an Feldwegen mit Zeichen 250. Carsharing-Symbol: Als Zusatzzeichen zu Park- oder Haltverbotszeichen erlaubt es nur gekennzeichneten Carsharing-Fahrzeugen das Parken (Carsharinggesetz, Plakette). Grünpfeil: Schild an der Ampel, erlaubt nach vollständigem Anhalten das Rechtsabbiegen bei Rot ohne Behinderung oder Gefährdung anderer. Autobahn (Zeichen 330.1): Ab hier gelten die Autobahnregeln – nur Kfz über 60 km/h bbH, Halten verboten, Richtgeschwindigkeit 130. Fahrradstraße (Zeichen 244.1): Andere Fahrzeuge nur mit Zusatzzeichen, höchstens 30 km/h, Radfahrer dürfen nebeneinander fahren.',
      keyPoints: [
        { label: 'Traktor: land-/forstwirtschaftlicher Verkehr', keywords: ['land', 'forst', 'traktor'] },
        { label: 'Carsharing: Parken für Carsharingfahrzeuge', keywords: ['carsharing'] },
        { label: 'Grünpfeil: Rechtsabbiegen bei Rot nach Anhalten', keywords: ['grünpfeil', 'rechts', 'anhalten'] },
        { label: 'Autobahnregeln', keywords: ['autobahn', '60', '130'] },
        { label: 'Fahrradstraße: 30 km/h, Zusatzzeichen', keywords: ['fahrradstraße', '30'] }
      ],
      followUps: ['Welche Fahrzeuge dürfen eine Fahrradstraße mit „Kfz frei“ befahren?', 'Woran erkennt man ein Carsharing-Fahrzeug?']
    }),
    q(27, {
      subject: 'recht',
      topic: 'Parkraumüberwachung',
      question: 'Welche Möglichkeiten zur Parkraumbewirtschaftung und -überwachung gibt es?',
      explanation: 'Parkzeit kann man begrenzen oder Gebühren verlangen: Parkscheibe, Parkschein, Parkuhr, Handyparken und Bewohnerparkausweise.',
      example: 'Der Schüler soll beim Einparken auf das Zusatzzeichen achten: Parkscheibe? Parkschein? Wie lange?',
      modelAnswer: 'Nach § 13 StVO kann die Parkdauer überwacht bzw. bewirtschaftet werden durch: Parkscheibe (Ankunftszeit auf die nächste halbe Stunde einstellen, Zusatzzeichen gibt die Höchstparkdauer an), Parkscheinautomaten bzw. Parkschein, Parkuhren, elektronische Systeme wie Handyparken sowie Bewohnerparkausweise in Bewohnerparkbereichen. Die Überwachung erfolgt durch Ordnungsamt oder Polizei. Für schwerbehinderte Menschen gibt es besondere Parkausweise.',
      keyPoints: [
        { label: 'Parkscheibe', keywords: ['parkscheibe'] },
        { label: 'Parkschein/-automat', keywords: ['parkschein'] },
        { label: 'Parkuhr', keywords: ['parkuhr'] },
        { label: 'Handyparken / elektronisch', keywords: ['handy', 'app', 'elektronisch'] },
        { label: 'Bewohnerparkausweis', keywords: ['bewohner', 'anwohner'] }
      ],
      followUps: ['Wie stellt man die Parkscheibe richtig ein?', 'Was regelt § 13 StVO?']
    }),
    q(28, {
      subject: 'zeichen',
      topic: 'Zeichen 251 und Verbot für Pkw',
      question: 'Was ist der Unterschied zwischen Zeichen 251 und einem Verbot nur für Pkw?',
      explanation: 'Zeichen 251 zeigt zwar ein Auto, verbietet aber alle mehrspurigen Kraftfahrzeuge. Ein Verbot nur für Pkw müsste anders, z. B. über Zusatzzeichen, angeordnet werden.',
      example: 'Prüfungsfrage aus der Praxis: Darf ein Lkw an Zeichen 251 vorbei? Nein.',
      modelAnswer: 'Zeichen 251 „Verbot für Kraftwagen und sonstige mehrspurige Kraftfahrzeuge“ zeigt das Sinnbild eines Pkw, gilt aber für alle mehrspurigen Kraftfahrzeuge – also auch Lkw, Busse, Wohnmobile oder Trikes. Einspurige Kraftfahrzeuge wie Motorräder und Mofas dürfen weiterfahren. Ein Verbot, das nur Personenkraftwagen betreffen soll, lässt sich mit Zeichen 251 allein nicht ausdrücken; es müsste über Zusatzzeichen eingeschränkt werden (z. B. Ausnahmen für Lkw oder Busse). Bitte die genaue Darstellung mit Ihrem Ausbildungsmaterial abgleichen.',
      keyPoints: [
        { label: '251 gilt für alle mehrspurigen Kfz', keywords: ['mehrspurig', 'alle'] },
        { label: 'Auch Lkw, Busse', keywords: ['lkw', 'bus'] },
        { label: 'Motorräder erlaubt', keywords: ['motorrad', 'kraftrad', 'krafträder', 'einspurig'] },
        { label: 'Pkw-only nur über Zusatzzeichen', keywords: ['zusatzzeichen'] }
      ],
      followUps: ['Was ist der Unterschied zu Zeichen 260?', 'Was bedeutet das Zusatzzeichen „Anlieger frei“?']
    }),
    q(29, {
      subject: 'zeichen',
      topic: 'Grünpfeil und grüner Pfeil',
      question: 'Erklären Sie den Unterschied zwischen „Grünpfeil“ und „grüner Pfeil“.',
      explanation: 'Der Grünpfeil ist ein Blechschild neben der roten Ampel: anhalten, dann vorsichtig rechts abbiegen. Der grüne Pfeil leuchtet in der Ampel selbst: Die Richtung ist freigegeben, ohne Pflicht zum Anhalten.',
      example: 'Fahren Sie mit dem Schüler bewusst beide Varianten an und lassen Sie ihn vorher sagen, was er tun wird.',
      modelAnswer: 'Der Grünpfeil ist ein nicht leuchtendes Schild (grüner Pfeil auf schwarzem Grund) rechts neben dem roten Licht. Er erlaubt bei Rot das Rechtsabbiegen, aber erst nach vollständigem Anhalten an der Haltlinie und nur, wenn andere – vor allem Fußgänger und Radfahrer – nicht behindert oder gefährdet werden. Der grüne Pfeil ist dagegen ein Lichtzeichen in der Ampel: Er gibt die Fahrtrichtung frei. Leuchtet nur der grüne Pfeil, ist die Richtung in der Regel „geschützt“, d. h. der Gegenverkehr bzw. querende Fußgänger haben Rot; ein Anhalten ist nicht vorgeschrieben.',
      keyPoints: [
        { label: 'Grünpfeil = Schild', keywords: ['schild', 'blech', 'nicht leuchtend'] },
        { label: 'Grünpfeil: erst anhalten', keywords: ['anhalten', 'stillstand'] },
        { label: 'Grünpfeil: niemanden behindern/gefährden', keywords: ['behinder', 'gefährd', 'fußgänger', 'radfahrer'] },
        { label: 'Grüner Pfeil = Lichtzeichen, Freigabe', keywords: ['lichtzeichen', 'leuchtet', 'leuchtend', 'ampel', 'freigegeben', 'freigabe'] },
        { label: 'Grüner Pfeil: kein Anhalten nötig', keywords: ['kein anhalten', 'nicht anhalten', 'geschützt'] }
      ],
      followUps: ['Gibt es einen Grünpfeil nur für Radfahrer?', 'Was gilt, wenn neben dem grünen Pfeil auch Rot leuchtet?']
    }),
    q(30, {
      subject: 'verhalten',
      topic: 'Unterschiede innerorts und außerorts',
      question: 'Nennen Sie sieben Unterschiede zwischen den Regelungen innerhalb und außerhalb geschlossener Ortschaften.',
      explanation: 'Innerorts und außerorts gelten unterschiedliche Geschwindigkeiten, Abstände und Regeln zum Hupen, Parken und zur Fahrstreifenwahl.',
      example: 'Lassen Sie den Schüler nach dem Ortsausgangsschild laut sagen, was sich jetzt ändert.',
      modelAnswer: 'Unterschiede sind: 1. Höchstgeschwindigkeit innerorts 50 km/h, außerorts für Pkw 100 km/h (§ 3). 2. Schall- und Leuchtzeichen: außerorts darf Überholen angekündigt werden, innerorts nur bei Gefahr (§ 16). 3. Gefahrzeichen stehen außerorts 150 bis 250 m vor der Gefahr, innerorts kurz davor. 4. Seitenabstand zu Radfahrern und Fußgängern: innerorts 1,5 m, außerorts 2 m (§ 5). 5. Fahrstreifenwahl: innerorts dürfen Kfz bis 3,5 t bei mehreren markierten Fahrstreifen den Fahrstreifen frei wählen (§ 7 Abs. 3), außerorts gilt das Rechtsfahrgebot. 6. Parken auf Vorfahrtstraßen ist außerorts verboten. 7. Beleuchtung parkender Fahrzeuge: außerorts müssen sie beleuchtet sein, innerorts genügt oft Parkleuchte oder keine Beleuchtung bei ausreichender Straßenbeleuchtung (§ 17). 8. Langsame Lkw und Gespanne müssen außerorts Abstand zum Einscheren lassen (§ 4). 9. Fußgänger gehen außerorts ohne Gehweg links (§ 25).',
      keyPoints: [
        { label: '50 km/h vs. 100 km/h', keywords: ['50', '100'] },
        { label: 'Schallzeichen/Hupen', keywords: ['hupe', 'schallzeichen', 'lichthupe', 'leuchtzeichen'] },
        { label: 'Aufstellung Gefahrzeichen', keywords: ['gefahrzeichen', '150', '250'] },
        { label: 'Seitenabstand 1,5/2 m', keywords: ['1,5', '2 m'] },
        { label: 'Freie Fahrstreifenwahl innerorts', keywords: ['fahrstreifenwahl', 'fahrstreifen frei', 'rechtsfahrgebot'] },
        { label: 'Parkverbot Vorfahrtstraße außerorts', keywords: ['vorfahrtstraße'] },
        { label: 'Beleuchtung beim Parken', keywords: ['beleuchtung', 'parkleuchte'] },
        { label: 'Einscherabstand Lkw / Fußgänger links', keywords: ['einscher', 'fußgänger', 'links'] }
      ],
      followUps: ['Welche Höchstgeschwindigkeit gilt außerorts für Gespanne?', 'Wann dürfen Sie innerorts hupen?']
    }),
    q(31, {
      subject: 'recht',
      topic: 'Promillegrenzen und Konsequenzen',
      question: 'a) Welche Promillegrenzen gibt es im Ordnungswidrigkeiten- und im Strafrecht? b) Welche Konsequenzen haben Verstöße? c) Wie viel Promille werden pro Stunde abgebaut?',
      explanation: 'Unter 1,1 ‰ ist Trunkenheit am Steuer meist eine Ordnungswidrigkeit, ab 1,1 ‰ immer eine Straftat. Mit Ausfallerscheinungen kann schon ab 0,3 ‰ eine Straftat vorliegen.',
      example: 'Ein Schüler rechnet: „Um 2 Uhr hatte ich 1,0 ‰ – um 8 Uhr bin ich wieder fit?“ Bei ca. 0,1 ‰ pro Stunde sind es noch rund 0,4 ‰.',
      modelAnswer: 'a) Ordnungswidrigkeitenrecht: 0,0 ‰ für Fahranfänger in der Probezeit und unter 21 Jahren (§ 24c StVG); 0,5 ‰ bzw. 0,25 mg/l Atemalkohol für alle (§ 24a StVG). Strafrecht: ab 0,3 ‰ mit alkoholbedingten Ausfallerscheinungen oder Unfall (relative Fahruntüchtigkeit), ab 1,1 ‰ absolute Fahruntüchtigkeit (§§ 316, 315c StGB); für Radfahrer gilt 1,6 ‰. b) § 24c: 250 € Bußgeld, 1 Punkt, A-Verstoß in der Probezeit. § 24a beim ersten Verstoß: 500 € Bußgeld, 2 Punkte, 1 Monat Fahrverbot, im Wiederholungsfall höher. Straftat: Geld- oder Freiheitsstrafe, 3 Punkte, Entziehung der Fahrerlaubnis mit Sperrfrist; ab 1,6 ‰ (bzw. wiederholt) MPU. c) Der Körper baut etwa 0,1 bis 0,2 ‰ pro Stunde ab.',
      keyPoints: [
        { label: '0,0 ‰ Fahranfänger', keywords: ['0,0'] },
        { label: '0,5 ‰ Ordnungswidrigkeit', keywords: ['0,5'] },
        { label: '0,3 ‰ mit Ausfallerscheinungen', keywords: ['0,3'] },
        { label: '1,1 ‰ absolute Fahruntüchtigkeit', keywords: ['1,1'] },
        { label: '1,6 ‰ MPU / Radfahrer', keywords: ['1,6', 'mpu'] },
        { label: 'Konsequenzen (Bußgeld, Punkte, Fahrverbot, Entzug)', keywords: ['bußgeld', 'punkte', 'fahrverbot', 'entzug', 'entziehung'] },
        { label: 'Abbau 0,1–0,2 ‰ pro Stunde', keywords: ['pro stunde', 'stündlich', '0,1'] }
      ],
      followUps: ['Was ist der Unterschied zwischen Fahrverbot und Entziehung?', 'Wie behandeln Sie das Thema Restalkohol im Unterricht?']
    }),
    q(32, {
      subject: 'recht',
      topic: 'BF17 Prüfungsbescheinigung',
      question: 'BF17: Nennen Sie Mindestalter, den frühesten Termin für Theorie- und Praxisprüfung, Fristen der Prüfungsbescheinigung und die eingeschlossenen Klassen.',
      explanation: 'Wer mit 17 fahren will, macht die Prüfungen kurz vor dem 17. Geburtstag und bekommt eine Prüfungsbescheinigung, die bis kurz nach dem 18. Geburtstag gilt.',
      example: 'Eine Mutter fragt, wann ihr Sohn (16) mit der Ausbildung anfangen kann. Erklären Sie Antrag, Ausbildungsbeginn und Prüfungstermine.',
      modelAnswer: 'Mindestalter für das begleitete Fahren ist 17 Jahre. Der Antrag wird mit Zustimmung der Erziehungsberechtigten bei der Fahrerlaubnisbehörde gestellt; die Ausbildung kann in der Regel ab 16 ½ Jahren beginnen. Die Theorieprüfung darf frühestens drei Monate, die praktische Prüfung frühestens einen Monat vor dem 17. Geburtstag abgelegt werden. Die Prüfungsbescheinigung gilt in Deutschland bis drei Monate nach dem 18. Geburtstag; bis dahin muss der Kartenführerschein abgeholt werden. Eingeschlossen sind die Klassen B und BE (mit den in B enthaltenen Klassen AM und L). Gefahren werden darf nur mit einer eingetragenen Begleitperson.',
      keyPoints: [
        { label: 'Mindestalter 17', keywords: ['17'] },
        { label: 'Theorie frühestens 3 Monate vorher', keywords: ['3 monate', 'drei monate'] },
        { label: 'Praxis frühestens 1 Monat vorher', keywords: ['1 monat', 'einen monat', 'ein monat'] },
        { label: 'Gilt bis 3 Monate nach 18', keywords: ['18'] },
        { label: 'Klassen B und BE', keywords: ['be', 'klasse b'] },
        { label: 'Antrag mit Zustimmung der Eltern', keywords: ['eltern', 'erziehungsberechtigt', 'zustimmung', 'antrag'] }
      ],
      followUps: ['Welche Voraussetzungen hat die Begleitperson?', 'Wo gilt BF17?']
    }),
    q(33, {
      subject: 'recht',
      topic: 'Gesetze und Verordnungen im Straßenverkehrsrecht',
      question: 'a) Welche Gesetze gibt es im Straßenverkehrsrecht? b) Welche Verordnungen gibt es?',
      explanation: 'Gesetze beschließt das Parlament, Verordnungen erlässt das Ministerium auf Grundlage eines Gesetzes. Das StVG ist die Grundlage für StVO, FeV und viele weitere Verordnungen.',
      example: 'Lassen Sie die Teilnehmer im Unterricht Begriffe wie StVO, FeV und StVG den Themen zuordnen.',
      modelAnswer: 'a) Gesetze: Straßenverkehrsgesetz (StVG), Strafgesetzbuch (StGB, z. B. §§ 142, 315b, 315c, 316), Ordnungswidrigkeitengesetz (OWiG), Fahrlehrergesetz (FahrlG), Pflichtversicherungsgesetz (PflVG), Berufskraftfahrerqualifikationsgesetz und das Bürgerliche Gesetzbuch für Haftungsfragen. b) Verordnungen: Straßenverkehrs-Ordnung (StVO), Straßenverkehrs-Zulassungs-Ordnung (StVZO), Fahrerlaubnis-Verordnung (FeV), Fahrzeug-Zulassungsverordnung (FZV), Bußgeldkatalog-Verordnung (BKatV), Fahrschüler-Ausbildungsordnung (FahrschAusbO), Fahrlehrer-Prüfungsverordnung (FahrlPrüfV), Elektrokleinstfahrzeuge-Verordnung (eKFV) sowie die Gebührenordnung (GebOSt).',
      keyPoints: [
        { label: 'StVG', keywords: ['stvg', 'straßenverkehrsgesetz'] },
        { label: 'StGB / OWiG', keywords: ['stgb', 'strafgesetzbuch', 'owig'] },
        { label: 'FahrlG / PflVG', keywords: ['fahrlg', 'fahrlehrergesetz', 'pflvg', 'pflichtversicherung'] },
        { label: 'StVO / StVZO', keywords: ['stvo', 'stvzo'] },
        { label: 'FeV / FZV', keywords: ['fev', 'fzv'] },
        { label: 'BKatV / FahrschAusbO', keywords: ['bkatv', 'bußgeldkatalog', 'fahrschausbo', 'ausbildungsordnung'] }
      ],
      followUps: ['Was ist der Unterschied zwischen Gesetz und Verordnung?', 'Was regelt die FeV?']
    }),
    q(34, {
      subject: 'recht',
      topic: 'Inhalt und Ziel der StVO',
      question: 'Was regelt die StVO und was ist ihre Zielsetzung?',
      explanation: 'Die StVO regelt, wie sich alle im öffentlichen Straßenverkehr verhalten müssen. Ziel ist, dass der Verkehr sicher und flüssig läuft.',
      example: 'Fragen Sie im Unterricht: Gilt die StVO auf einem privaten Supermarktparkplatz? (Ja, wenn er öffentlich zugänglich ist.)',
      modelAnswer: 'Die Straßenverkehrs-Ordnung regelt das Verhalten aller Verkehrsteilnehmer im öffentlichen Straßenverkehr: allgemeine Verkehrsregeln (z. B. Geschwindigkeit, Vorfahrt, Überholen, Halten und Parken), Zeichen und Verkehrseinrichtungen sowie Durchführungs-, Bußgeld- und Schlussvorschriften. Sie gilt auf allen öffentlich zugänglichen Verkehrsflächen, auch auf privaten Flächen, die tatsächlich öffentlich genutzt werden. Ziel ist die Sicherheit und Leichtigkeit (Flüssigkeit) des Straßenverkehrs; dazu kommen der Schutz vor Gefahren und Belästigungen sowie Umweltaspekte.',
      keyPoints: [
        { label: 'Verhalten im öffentlichen Straßenverkehr', keywords: ['verhalten', 'öffentlich'] },
        { label: 'Allgemeine Regeln, Zeichen, Einrichtungen', keywords: ['verkehrszeichen', 'regeln', 'zeichen', 'einrichtung'] },
        { label: 'Sicherheit', keywords: ['sicherheit'] },
        { label: 'Leichtigkeit/Flüssigkeit', keywords: ['leichtigkeit', 'flüssig'] },
        { label: 'Auch öffentlich zugängliche Privatflächen', keywords: ['privat', 'parkplatz', 'zugänglich'] }
      ],
      followUps: ['Wie ist die StVO aufgebaut?', 'Welche Verkehrsteilnehmer kennen Sie?']
    }),
    q(35, {
      subject: 'zeichen',
      topic: 'Haltlinie und Wartelinie',
      question: 'Erklären Sie Haltlinie und Wartelinie.',
      explanation: 'Die Haltlinie (durchgezogen) zeigt, wo man bei einem Haltgebot anhalten muss. Die Wartelinie (unterbrochen) empfiehlt nur, dort zu warten.',
      example: 'Zeichnen Sie beide Linien nebeneinander und lassen Sie den Schüler sagen, wo er anhalten muss und wo er sich vortasten darf.',
      modelAnswer: 'Die Haltlinie (Zeichen 294) ist eine breite durchgezogene Querlinie. Ergänzend zu Halt- oder Wartegeboten durch Zeichen 206, Polizeibeamte, Lichtzeichen oder Schranken ordnet sie an, hier anzuhalten; erforderlichenfalls ist an der Sichtlinie erneut anzuhalten. Die Wartelinie (Zeichen 341) ist eine breite unterbrochene Querlinie. Sie empfiehlt dem Wartepflichtigen, an dieser Stelle zu warten, z. B. an Einmündungen mit Zeichen 205 oder für Abbieger; eine Anhaltepflicht ergibt sich aus ihr nicht.',
      keyPoints: [
        { label: 'Haltlinie durchgezogen (294)', keywords: ['294', 'durchgezogen'] },
        { label: 'Haltlinie: hier anhalten bei Haltgebot', keywords: ['anhalten', 'stopp', 'ampel', 'rot'] },
        { label: 'Ggf. erneut an Sichtlinie halten', keywords: ['sichtlinie', 'erneut'] },
        { label: 'Wartelinie unterbrochen (341)', keywords: ['341', 'unterbrochen', 'gestrichelt'] },
        { label: 'Wartelinie: Empfehlung', keywords: ['empfiehlt', 'empfehlung'] }
      ],
      followUps: ['Was bedeuten Haifischzähne?', 'Was tun Sie, wenn Sie an der Haltlinie nichts sehen?']
    }),
    q(36, {
      subject: 'verhalten',
      topic: 'Zeichen des Polizeibeamten',
      question: 'Erklären Sie die Zeichen des Polizeibeamten und die jeweils passende Lichtzeichenfarbe.',
      explanation: 'Wer den Polizisten von vorne oder hinten sieht, muss halten (wie Rot). Wer ihn von der Seite sieht, darf fahren (wie Grün). Hebt er den Arm, heißt das „Achtung“ (wie Gelb).',
      example: 'Stellen Sie sich im Unterricht selbst als „Polizist“ auf und lassen Sie die Teilnehmer je nach Richtung sagen, was sie tun.',
      modelAnswer: 'Nach § 36 StVO gehen Zeichen und Weisungen der Polizeibeamten allen anderen Anordnungen vor. Querstellung (Polizeibeamter steht mit Brust oder Rücken zu mir, Arme seitlich ausgestreckt oder hängend) bedeutet „Halt vor der Kreuzung“ – entspricht Rot. Seitenansicht (ich sehe die Flanke) bedeutet freie Fahrt – entspricht Grün; abbiegende Fahrzeuge achten auf Gegenverkehr und Fußgänger. Hochheben eines Arms bedeutet „Achtung, Halt“ – entspricht Gelb: Wer noch nicht in der Kreuzung ist, wartet; wer sich schon in der Kreuzung befindet, räumt sie. Außerdem können Polizeibeamte durch Handzeichen oder Anhaltestab Weisungen geben, z. B. zum Anhalten oder Weiterfahren.',
      keyPoints: [
        { label: 'Vorrang vor allen anderen Regeln', keywords: ['vorrang', 'gehen vor', 'vor allen'] },
        { label: 'Brust/Rücken = Halt (Rot)', keywords: ['brust', 'rücken', 'rot', 'querstellung'] },
        { label: 'Seite/Flanke = freie Fahrt (Grün)', keywords: ['seite', 'flanke', 'grün'] },
        { label: 'Arm hoch = Achtung (Gelb)', keywords: ['arm hoch', 'hochheben', 'gelb', 'erhobener arm', 'hebt den arm'] },
        { label: 'In der Kreuzung: räumen', keywords: ['räumen', 'in der kreuzung'] }
      ],
      followUps: ['Was gilt, wenn Polizei und Ampel unterschiedliche Signale geben?', 'Wie reagieren Sie auf den Anhaltestab?']
    }),
    q(37, {
      subject: 'verhalten',
      topic: 'Möglichkeiten der Vorfahrtregelung',
      question: 'Welche Möglichkeiten der Vorfahrtregelung gibt es? Nennen Sie die zugehörigen Zeichen.',
      explanation: 'Vorfahrt wird durch Polizei, Ampeln, Verkehrszeichen oder – wenn nichts geregelt ist – durch „rechts vor links“ bestimmt. Dazu kommen Sonderfälle wie Grundstücksausfahrten.',
      example: 'Fahren Sie eine Route mit möglichst vielen verschiedenen Vorfahrtsregelungen und lassen Sie den Schüler jede laut benennen.',
      modelAnswer: 'Rangfolge: 1. Polizeibeamte (§ 36). 2. Lichtzeichen (§ 37). 3. Verkehrszeichen: Zeichen 205 „Vorfahrt gewähren“, 206 „Halt. Vorfahrt gewähren“, 301 „Vorfahrt“, 306 „Vorfahrtstraße“, 307 „Ende der Vorfahrtstraße“, 102 „Vorfahrt von rechts“ als Gefahrzeichen, 215 mit 205 im Kreisverkehr, 208/308 an Engstellen, Haifischzähne (342) als Markierung. 4. Allgemeine Regel „rechts vor links“ (§ 8). Sonderfall § 10 StVO: Wer aus Grundstücken, verkehrsberuhigten Bereichen, Fußgängerbereichen, über abgesenkte Bordsteine oder von anderen Straßenteilen auf die Fahrbahn einfährt, muss sich so verhalten, dass eine Gefährdung anderer ausgeschlossen ist.',
      keyPoints: [
        { label: 'Polizeibeamte', keywords: ['polizei'] },
        { label: 'Lichtzeichen', keywords: ['lichtzeichen', 'ampel'] },
        { label: 'Verkehrszeichen 205/206/301/306', keywords: ['205', '206', '301', '306'] },
        { label: 'Rechts vor links', keywords: ['rechts vor links'] },
        { label: '§ 10 (Grundstücke, verkehrsberuhigter Bereich)', keywords: ['§ 10', 'grundstück', 'bordstein', 'verkehrsberuhigt'] },
        { label: 'Kreisverkehr / Engstellen', keywords: ['kreisverkehr', '215', '208', '308'] }
      ],
      followUps: ['Wer hat an einer abknickenden Vorfahrtstraße Vorfahrt?', 'Was ist der Unterschied zwischen Vorfahrt und Vorrang?']
    }),
    q(38, {
      subject: 'zeichen',
      topic: 'Aufhebung einer Vorfahrtstraße',
      question: 'Wie kann eine Vorfahrtstraße aufgehoben werden?',
      explanation: 'Eine Vorfahrtstraße endet mit dem Zeichen „Ende der Vorfahrtstraße“ oder wenn vor der nächsten Kreuzung „Vorfahrt gewähren“ oder ein Stoppschild steht.',
      example: 'Lassen Sie den Schüler auf einer Fahrt sagen, wann die Vorfahrtstraße endet und warum.',
      modelAnswer: 'Eine Vorfahrtstraße (Zeichen 306) endet durch Zeichen 307 „Ende der Vorfahrtstraße“ – danach gelten wieder die allgemeinen Regeln – oder durch Zeichen 205 „Vorfahrt gewähren“ bzw. Zeichen 206 „Halt. Vorfahrt gewähren“ vor der nächsten Kreuzung oder Einmündung. Zeichen 205 und 206 werden dabei meist mit Entfernungsangabe angekündigt. Vorübergehend können auch Polizeibeamte oder Lichtzeichen die Vorfahrt anders regeln.',
      keyPoints: [
        { label: 'Zeichen 307', keywords: ['307', 'ende der vorfahrt'] },
        { label: 'Zeichen 205', keywords: ['205', 'vorfahrt gewähren'] },
        { label: 'Zeichen 206', keywords: ['206', 'stopp', 'stop'] },
        { label: 'Ankündigung mit Entfernung', keywords: ['ankündig', 'entfernung', 'zusatzzeichen'] },
        { label: 'Polizei/Lichtzeichen vorübergehend', keywords: ['polizei', 'ampel', 'lichtzeichen'] }
      ],
      followUps: ['Was gilt nach Zeichen 307 an der nächsten Kreuzung?', 'Was bedeutet abknickende Vorfahrt?']
    })
  ];

  return { questions };
});
