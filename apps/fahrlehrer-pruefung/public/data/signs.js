/**
 * Ergänzungen zu ausgewählten Verkehrszeichen: Erklärung in einfacher Sprache,
 * Praxisbeispiel, ausführliche Musterantwort, Kernpunkte und typische Fehler
 * (wrongClaims), damit die Bewertung auch falsche Aussagen erkennt.
 *
 * Bild, Bezeichnung und amtlicher Text kommen aus signs-stvo.js (StVO Anlage 1–4).
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FLSigns = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const QUESTION = 'Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.';

  function sign(number, data) {
    return Object.assign({
      id: `vz-${String(number).replace('.', '-')}`,
      subject: 'zeichen',
      sign: String(number),
      topic: `Zeichen ${number} – ${data.name}`,
      question: QUESTION,
      difficulty: 1,
      wrongClaims: [],
      source: 'StVO Anlage 1–3'
    }, data);
  }

  const signs = [
    sign(101, {
      name: 'Gefahrstelle',
      category: 'Gefahrzeichen',
      explanation: 'Das Ausrufezeichen warnt vor einer Gefahr, die kein eigenes Zeichen hat. Oft sagt ein Zusatzzeichen, was genau gemeint ist.',
      example: 'Unter dem Zeichen hängt „Unfallgefahr“ oder „Ölspur“. Fragen Sie den Schüler, warum ein Zusatzzeichen sinnvoll ist.',
      modelAnswer: 'Das ist Zeichen 101 „Gefahrstelle“, ein allgemeines Gefahrzeichen. Es warnt vor einer Gefahr, für die es kein eigenes Gefahrzeichen gibt; ein Zusatzzeichen kann die Gefahr näher bezeichnen. Wie alle Gefahrzeichen mahnt es zu erhöhter Aufmerksamkeit und angepasster Geschwindigkeit. Außerorts steht es in der Regel 150 bis 250 m vor der Gefahrstelle, innerorts kurz davor.',
      keyPoints: [
        { label: 'Name: Gefahrstelle', keywords: ['gefahrstelle', '101'] },
        { label: 'Gefahrzeichen', keywords: ['gefahrzeichen', 'warnt', 'warnung'] },
        { label: 'Zusatzzeichen kann Gefahr bezeichnen', keywords: ['zusatzzeichen'] },
        { label: 'Aufmerksamkeit/Geschwindigkeit anpassen', keywords: ['aufmerksam', 'langsam', 'geschwindigkeit', 'vorsicht'] },
        { label: 'Aufstellung 150–250 m außerorts', keywords: ['150', '250', 'außerorts'] }
      ],
      wrongClaims: [
        { label: 'Kein Verbot: Gefahrzeichen ordnen nichts an, sie warnen', keywords: ['verboten', 'verbot'] }
      ],
      followUps: ['Wo stehen Gefahrzeichen innerorts und außerorts?', 'Nennen Sie Beispiele für Zusatzzeichen zu Zeichen 101.']
    }),
    sign(102, {
      name: 'Kreuzung oder Einmündung mit Vorfahrt von rechts',
      category: 'Gefahrzeichen',
      difficulty: 2,
      explanation: 'Das Kreuz im Dreieck warnt: An der nächsten Kreuzung gilt „rechts vor links“. Wer von rechts kommt, darf zuerst fahren.',
      example: 'Auf einer Landstraße steht Zeichen 102. Der Schüler soll Tempo reduzieren und nach rechts schauen, auch wenn die Straße breiter wirkt.',
      modelAnswer: 'Zeichen 102 ist ein Gefahrzeichen: Kreuzung oder Einmündung mit Vorfahrt von rechts. An der nächsten Kreuzung gilt also „rechts vor links“ (§ 8 StVO). Ich muss mich mit mäßiger Geschwindigkeit nähern, nach rechts schauen und dem Verkehr von rechts Vorfahrt gewähren; selbst habe ich gegenüber Fahrzeugen von links Vorfahrt. Das Zeichen gilt nur für die nächste Kreuzung oder Einmündung und muss daher nicht aufgehoben werden – es endet mit der Kreuzung. Außerorts steht es etwa 150 bis 250 m vorher.',
      keyPoints: [
        { label: 'Name: Kreuzung/Einmündung mit Vorfahrt von rechts', keywords: ['vorfahrt von rechts', 'kreuzung', 'einmündung', '102'] },
        { label: 'Rechts vor links gilt', keywords: ['rechts vor links'] },
        { label: 'Gefahrzeichen', keywords: ['gefahrzeichen', 'warnt'] },
        { label: 'Langsam heranfahren, nach rechts schauen', keywords: ['langsam', 'mäßig', 'nach rechts', 'geschwindigkeit'] },
        { label: 'Gilt nur für die nächste Kreuzung (endet dort)', keywords: ['nächste kreuzung', 'nur für die', 'endet', 'keine aufhebung', 'nicht aufgehoben'] }
      ],
      wrongClaims: [
        { label: 'Verwechslung mit Zeichen 301 (Vorfahrt) – bei 102 hat man keine Vorfahrt', keywords: ['ich habe vorfahrt', 'habe ich vorfahrt', 'vorfahrtstraße'] }
      ],
      followUps: ['Wie wird dieses Zeichen „aufgehoben“?', 'Worin unterscheidet es sich von Zeichen 301?']
    }),
    sign(108, {
      name: 'Gefälle',
      category: 'Gefahrzeichen',
      explanation: 'Achtung, es geht steil bergab. Die Prozentzahl sagt, wie steil: 10 % heißt 10 m Höhenunterschied auf 100 m.',
      example: 'Vor einer langen Abfahrt lassen Sie den Schüler rechtzeitig in einen kleineren Gang schalten und die Motorbremse nutzen.',
      modelAnswer: 'Zeichen 108 warnt vor einem Gefälle; die Prozentangabe nennt die Neigung, 10 % bedeutet 10 m Höhenunterschied auf 100 m Strecke. Ich sollte vor dem Gefälle die Geschwindigkeit reduzieren und rechtzeitig einen niedrigeren Gang einlegen, um die Motorbremse zu nutzen. Dauerbremsen ist zu vermeiden, weil die Bremsen überhitzen können (Fading). Der Bremsweg verlängert sich bergab.',
      keyPoints: [
        { label: 'Name: Gefälle', keywords: ['gefälle', 'bergab', '108'] },
        { label: 'Prozentangabe = Neigung', keywords: ['prozent', '%', '100 m', 'höhenunterschied', 'neigung'] },
        { label: 'Niedrigeren Gang / Motorbremse', keywords: ['motorbremse', 'gang', 'zurückschalten', 'runterschalten'] },
        { label: 'Bremsen nicht überhitzen (Fading)', keywords: ['überhitz', 'fading', 'dauerbremsen'] },
        { label: 'Längerer Bremsweg', keywords: ['bremsweg'] }
      ],
      wrongClaims: [
        { label: 'Verwechslung mit Zeichen 110 (Steigung)', keywords: ['steigung', 'bergauf'] },
        { label: 'Im Leerlauf rollen lassen spart nicht und ist gefährlich', keywords: ['leerlauf', 'auskuppeln'] }
      ],
      followUps: ['Wie verhalten Sie sich mit einem schweren Anhänger im Gefälle?', 'Was bedeutet „10 %“ genau?']
    }),
    sign(110, {
      name: 'Steigung',
      category: 'Gefahrzeichen',
      explanation: 'Achtung, es geht steil bergauf. Rechtzeitig zurückschalten, damit das Auto nicht an Kraft verliert.',
      example: 'Üben Sie vor einer Steigung das vorausschauende Zurückschalten und das Anfahren am Berg.',
      modelAnswer: 'Zeichen 110 warnt vor einer Steigung; die Prozentangabe nennt die Neigung. Ich schalte rechtzeitig in einen passenden Gang, damit das Fahrzeug nicht an Zugkraft verliert, und rechne mit langsamen Fahrzeugen wie Lkw. Beim Anhalten am Berg muss ich sicher anfahren können (Feststellbremse oder Berganfahrhilfe). Bei Winterglätte kann das Anfahren problematisch sein.',
      keyPoints: [
        { label: 'Name: Steigung', keywords: ['steigung', 'bergauf', '110'] },
        { label: 'Prozentangabe = Neigung', keywords: ['prozent', '%', 'neigung'] },
        { label: 'Rechtzeitig zurückschalten', keywords: ['zurückschalten', 'runterschalten', 'gang'] },
        { label: 'Langsame Fahrzeuge erwarten', keywords: ['lkw', 'langsam'] },
        { label: 'Anfahren am Berg', keywords: ['anfahren', 'berganfahr', 'handbremse', 'feststellbremse'] }
      ],
      wrongClaims: [
        { label: 'Verwechslung mit Zeichen 108 (Gefälle)', keywords: ['gefälle', 'bergab'] }
      ],
      followUps: ['Wie bringen Sie das Anfahren am Berg bei?', 'Welche Assistenzsysteme helfen am Berg?']
    }),
    sign(112, {
      name: 'Unebene Fahrbahn',
      category: 'Gefahrzeichen',
      explanation: 'Die Straße hat Schlaglöcher, Bodenwellen oder Schäden. Langsamer fahren und das Lenkrad gut festhalten.',
      example: 'Auf einer Landstraße mit Frostschäden: Der Schüler soll das Tempo senken und auf Motorradfahrer achten, die ausweichen.',
      modelAnswer: 'Zeichen 112 warnt vor einer unebenen Fahrbahn, etwa Bodenwellen, Schlaglöcher oder Frostaufbrüche. Ich verringere die Geschwindigkeit, halte das Lenkrad fest und rechne damit, dass Fahrzeuge kurz die Bodenhaftung verlieren oder andere – besonders Zweiradfahrer – ausweichen. Bremsen auf den Unebenheiten möglichst vermeiden.',
      keyPoints: [
        { label: 'Name: Unebene Fahrbahn', keywords: ['uneben', '112', 'bodenwelle', 'schlagloch'] },
        { label: 'Gefahrzeichen', keywords: ['gefahrzeichen', 'warnt'] },
        { label: 'Geschwindigkeit verringern', keywords: ['langsam', 'geschwindigkeit', 'verringer', 'reduzier'] },
        { label: 'Lenkrad festhalten / Haftung', keywords: ['lenkrad', 'festhalten', 'haftung', 'bodenkontakt'] },
        { label: 'Zweiräder weichen aus', keywords: ['motorrad', 'radfahrer', 'zweirad', 'ausweichen'] }
      ],
      wrongClaims: [
        { label: 'Verwechslung mit Schleuder-/Rutschgefahr (Zeichen 114)', keywords: ['schleudergefahr', 'rutschgefahr', 'glätte'] }
      ],
      followUps: ['Wie wirkt sich eine Bodenwelle auf das Fahrwerk aus?', 'Worauf achten Sie bei Motorradfahrern?']
    }),
    sign(205, {
      name: 'Vorfahrt gewähren',
      category: 'Vorschriftzeichen (Wartegebot)',
      explanation: 'Das auf der Spitze stehende Dreieck heißt: Andere haben Vorfahrt. Anhalten muss man nur, wenn es nötig ist.',
      example: 'Der Schüler bleibt am Zeichen 205 grundlos stehen, obwohl die Straße frei und einsehbar ist – üben Sie das zügige, aber vorsichtige Einfahren.',
      modelAnswer: 'Das ist Zeichen 205 „Vorfahrt gewähren“. Wer ein Fahrzeug führt, muss Vorfahrt gewähren. Anhalten muss ich nur, wenn es die Verkehrslage erfordert; ich darf andere nicht gefährden oder wesentlich behindern. Bis zu 10 m vor dem Zeichen darf nicht gehalten werden, wenn es dadurch verdeckt wird. Es steht unmittelbar vor der Kreuzung und kann mit Entfernungsangabe angekündigt werden. Mit Zusatzzeichen kann es auch auf Radverkehr von links und rechts oder auf die Straßenbahn hinweisen.',
      keyPoints: [
        { label: 'Name: Vorfahrt gewähren', keywords: ['vorfahrt gewähren', '205', 'vorfahrt achten'] },
        { label: 'Anhalten nur wenn nötig', keywords: ['wenn nötig', 'erforderlich', 'nur wenn', 'bei bedarf', 'nicht zwingend'] },
        { label: 'Andere nicht gefährden/behindern', keywords: ['gefährden', 'behindern'] },
        { label: 'Haltverbot 10 m davor, wenn verdeckt', keywords: ['10 m', 'zehn meter', 'verdeckt'] },
        { label: 'Steht unmittelbar vor der Kreuzung / Ankündigung', keywords: ['unmittelbar', 'angekündigt', 'entfernung', 'zusatzzeichen'] }
      ],
      wrongClaims: [
        { label: 'Verwechslung mit Zeichen 206: Bei 205 muss man nicht immer anhalten', keywords: ['immer anhalten', 'muss anhalten', 'stoppschild'] }
      ],
      followUps: ['Wo genau steht Zeichen 205?', 'Was bedeutet Zeichen 205 mit dem Zusatzzeichen Radverkehr von links und rechts?']
    }),
    sign(206, {
      name: 'Halt. Vorfahrt gewähren.',
      category: 'Vorschriftzeichen (Wartegebot)',
      explanation: 'Das Stoppschild heißt: immer vollständig anhalten – auch wenn frei ist – und dann Vorfahrt gewähren.',
      example: 'Typischer Prüfungsfehler: Rollen über die Haltlinie. Üben Sie bewusst den Stillstand der Räder an der Haltlinie und danach das Vortasten zur Sichtlinie.',
      modelAnswer: 'Das ist Zeichen 206 „Halt. Vorfahrt gewähren.“, das Stoppschild. Wer ein Fahrzeug führt, muss anhalten und Vorfahrt gewähren – das Anhalten ist immer Pflicht, auch wenn die Straße frei ist. Angehalten wird an der Haltlinie (Zeichen 294); ist keine vorhanden, dort, wo die andere Straße zu übersehen ist. Bis zu 10 m vor dem Zeichen darf nicht gehalten werden, wenn es dadurch verdeckt wird. Es ist achteckig, damit es auch von hinten oder verschmutzt erkannt wird, und wird an unübersichtlichen oder gefährlichen Kreuzungen aufgestellt.',
      keyPoints: [
        { label: 'Name: Halt. Vorfahrt gewähren / Stoppschild', keywords: ['stopp', 'stop', 'halt. vorfahrt', '206', 'halt vorfahrt'] },
        { label: 'Immer anhalten (Stillstand)', keywords: ['immer anhalten', 'anhalten', 'stillstand', 'stehen bleiben'] },
        { label: 'Vorfahrt gewähren', keywords: ['vorfahrt gewähren', 'vorfahrt lassen', 'wartepflicht'] },
        { label: 'An der Haltlinie bzw. Sichtlinie', keywords: ['haltlinie', 'sichtlinie', 'übersehen', 'einsehen'] },
        { label: 'Haltverbot 10 m davor, wenn verdeckt', keywords: ['10 m', 'zehn meter', 'verdeckt'] },
        { label: 'Achteckige Form', keywords: ['achteck', 'form', 'von hinten'] }
      ],
      wrongClaims: [
        { label: 'Falsch: Langsames Durchrollen reicht nicht – vollständiger Stillstand ist Pflicht', keywords: ['durchrollen', 'rollen lassen', 'abbremsen reicht', 'nur abbremsen', 'nur bremsen'] },
        { label: 'Falsch: Anhalten ist auch bei freier Straße Pflicht', keywords: ['nur wenn verkehr', 'nur bei verkehr', 'wenn frei ist darf'] }
      ],
      followUps: ['Wo halten Sie, wenn keine Haltlinie vorhanden ist?', 'Was ist der Unterschied zwischen Haltlinie und Wartelinie?']
    }),
    sign(215, {
      name: 'Kreisverkehr',
      category: 'Vorschriftzeichen',
      explanation: 'Die drei Pfeile zeigen: Hier ist ein Kreisverkehr. Man fährt rechts herum (gegen den Uhrzeigersinn). Zusammen mit Zeichen 205 hat der Verkehr im Kreis Vorfahrt.',
      example: 'Schüler blinken oft beim Einfahren links. Üben Sie: nicht blinken beim Einfahren, rechts blinken beim Ausfahren.',
      modelAnswer: 'Zeichen 215 kennzeichnet einen Kreisverkehr. Ich muss der vorgeschriebenen Fahrtrichtung rechts folgen. Die Mittelinsel darf nicht überfahren werden, außer von Fahrzeugen, die wegen ihrer Abmessungen sonst nicht durchkommen, wenn niemand gefährdet wird. Innerhalb des Kreisverkehrs darf auf der Fahrbahn nicht gehalten werden. Steht zusätzlich Zeichen 205, hat der Verkehr im Kreis Vorfahrt. Beim Einfahren wird nicht geblinkt, beim Ausfahren muss rechts geblinkt werden (§ 9a StVO).',
      keyPoints: [
        { label: 'Name: Kreisverkehr', keywords: ['kreisverkehr', '215'] },
        { label: 'Rechts herum fahren', keywords: ['rechts', 'gegen den uhrzeigersinn', 'fahrtrichtung'] },
        { label: 'Mittelinsel nicht überfahren (Ausnahme große Fahrzeuge)', keywords: ['mittelinsel'] },
        { label: 'Halteverbot im Kreis', keywords: ['nicht gehalten', 'halten verboten', 'haltverbot', 'nicht halten'] },
        { label: 'Mit 205: Kreis hat Vorfahrt', keywords: ['205', 'vorfahrt'] },
        { label: 'Blinken nur beim Ausfahren', keywords: ['ausfahren', 'blinken'] }
      ],
      wrongClaims: [
        { label: 'Falsch: Beim Einfahren wird nicht geblinkt', keywords: ['beim einfahren blinken', 'links blinken', 'beim einfahren links'] }
      ],
      followUps: ['Was gilt, wenn an der Einfahrt kein Zeichen 205 steht?', 'Wer darf die Mittelinsel überfahren?']
    }),
    sign(244.1, {
      name: 'Beginn einer Fahrradstraße',
      category: 'Vorschriftzeichen (Sonderweg)',
      difficulty: 2,
      explanation: 'Die Straße ist für Radfahrer gedacht. Autos dürfen nur rein, wenn ein Zusatzzeichen es erlaubt – und dann höchstens 30 km/h.',
      example: 'In der Fahrradstraße fahren zwei Radfahrer nebeneinander. Erklären Sie dem Schüler, dass das erlaubt ist und er nicht drängeln darf.',
      modelAnswer: 'Zeichen 244.1 kennzeichnet den Beginn einer Fahrradstraße. Anderer Fahrzeugverkehr als Radverkehr und Elektrokleinstfahrzeuge darf sie nur benutzen, wenn ein Zusatzzeichen das erlaubt, etwa „Kraftfahrzeuge frei“ oder „Anlieger frei“. Das Überqueren an Kreuzungen ist erlaubt. Für den Fahrverkehr gilt höchstens 30 km/h; der Radverkehr darf weder gefährdet noch behindert werden, notfalls muss der Kfz-Verkehr noch langsamer fahren. Radfahrer dürfen nebeneinander fahren. Im Übrigen gelten die normalen Vorfahrtsregeln. Das Ende zeigt Zeichen 244.2.',
      keyPoints: [
        { label: 'Name: Fahrradstraße', keywords: ['fahrradstraße', '244'] },
        { label: 'Andere nur mit Zusatzzeichen', keywords: ['zusatzzeichen', 'frei', 'anlieger'] },
        { label: 'Höchstgeschwindigkeit 30 km/h', keywords: ['30'] },
        { label: 'Radverkehr nicht gefährden/behindern', keywords: ['gefährden', 'behindern', 'rücksicht'] },
        { label: 'Nebeneinanderfahren erlaubt', keywords: ['nebeneinander'] },
        { label: 'Normale Vorfahrtsregeln', keywords: ['vorfahrt'] }
      ],
      wrongClaims: [
        { label: 'Falsch: Radfahrer haben nicht automatisch überall Vorfahrt – es gelten die normalen Regeln', keywords: ['radfahrer haben immer vorfahrt', 'immer vorfahrt'] },
        { label: 'Falsch: Es gilt 30 km/h, keine Schrittgeschwindigkeit', keywords: ['schrittgeschwindigkeit'] }
      ],
      followUps: ['Dürfen Sie mit dem Auto eine Fahrradstraße überqueren?', 'Was gilt, wenn das Zusatzzeichen „Anlieger frei“ angebracht ist?']
    }),
    sign(245, {
      name: 'Bussonderfahrstreifen',
      category: 'Vorschriftzeichen (Sonderweg)',
      difficulty: 2,
      explanation: 'Dieser Fahrstreifen ist für Linienbusse reserviert. Andere dürfen nur drauf, wenn ein Zusatzzeichen es erlaubt.',
      example: 'Der Schüler will zum Rechtsabbiegen früh auf die Busspur. Besprechen Sie, wann das erlaubt ist und wann nicht.',
      modelAnswer: 'Zeichen 245 kennzeichnet einen Bussonderfahrstreifen. Anderer Fahrverkehr als Linienbusse und gekennzeichnete Schulbusse sowie Fahrzeuge des Behindertenverkehrs darf ihn nicht benutzen. Taxen, Krankenfahrzeuge, Fahrräder, Busse im Gelegenheitsverkehr und elektrisch betriebene Fahrzeuge dürfen ihn nur benutzen, wenn ein Zusatzzeichen das erlaubt. Taxen dürfen an Bushaltestellen zum sofortigen Ein- und Aussteigen halten.',
      keyPoints: [
        { label: 'Name: Bussonderfahrstreifen / Busspur', keywords: ['bussonderfahrstreifen', 'busspur', 'busfahrstreifen', '245'] },
        { label: 'Nur Linienbusse (und Schulbusse)', keywords: ['linienbus', 'linienverkehr', 'schulbus'] },
        { label: 'Andere nur mit Zusatzzeichen (Taxi, Rad, E-Fahrzeuge)', keywords: ['zusatzzeichen', 'taxi', 'fahrrad', 'elektro'] },
        { label: 'Taxen dürfen an Bushaltestellen halten', keywords: ['haltestelle'] }
      ],
      wrongClaims: [
        { label: 'Falsch: Taxen dürfen nur mit Zusatzzeichen auf den Busstreifen', keywords: ['taxen dürfen immer', 'taxis dürfen immer'] }
      ],
      followUps: ['Dürfen Sie den Bussonderfahrstreifen zum Abbiegen überqueren?', 'Welche Zusatzzeichen gibt es dazu?']
    }),
    sign(250, {
      name: 'Verbot für Fahrzeuge aller Art',
      category: 'Vorschriftzeichen (Verkehrsverbot)',
      explanation: 'Der leere rote Ring heißt: Hier darf kein Fahrzeug fahren. Fahrrad und Motorrad darf man schieben.',
      example: 'Fragen Sie im Unterricht: Darf man mit dem Kinderwagen oder dem Fahrrad (geschoben) durch?',
      modelAnswer: 'Zeichen 250 bedeutet „Verbot für Fahrzeuge aller Art“. Es gilt nicht für Handfahrzeuge und auch nicht für Reiter sowie Führer von Pferden und Vieh. Krafträder und Fahrräder dürfen geschoben werden. Ausnahmen, z. B. für Anlieger oder Radfahrer, können durch Zusatzzeichen zugelassen werden.',
      keyPoints: [
        { label: 'Name: Verbot für Fahrzeuge aller Art', keywords: ['fahrzeuge aller art', '250', 'durchfahrt verboten', 'alle fahrzeuge'] },
        { label: 'Nicht für Handfahrzeuge/Reiter', keywords: ['handfahrzeug', 'reiter', 'pferd'] },
        { label: 'Schieben erlaubt', keywords: ['schieben', 'geschoben'] },
        { label: 'Ausnahmen per Zusatzzeichen', keywords: ['zusatzzeichen', 'anlieger', 'frei'] }
      ],
      wrongClaims: [
        { label: 'Verwechslung mit Zeichen 267 (Verbot der Einfahrt)', keywords: ['einbahnstraße', 'einfahrt verboten'] }
      ],
      followUps: ['Was ist der Unterschied zu Zeichen 267 „Verbot der Einfahrt“?', 'Welche Zusatzzeichen kennen Sie zu Zeichen 250?']
    }),
    sign(251, {
      name: 'Verbot für Kraftwagen und sonstige mehrspurige Kraftfahrzeuge',
      category: 'Vorschriftzeichen (Verkehrsverbot)',
      difficulty: 2,
      explanation: 'Auf dem Schild ist zwar ein Auto abgebildet, verboten sind aber alle mehrspurigen Kraftfahrzeuge – also auch Lkw, Busse und Quads. Motorräder dürfen fahren.',
      example: 'Prüfungsklassiker: „Darf hier ein Lkw fahren?“ – Nein, das Pkw-Sinnbild steht für alle mehrspurigen Kfz.',
      modelAnswer: 'Zeichen 251 bedeutet „Verbot für Kraftwagen und sonstige mehrspurige Kraftfahrzeuge“. Obwohl ein Pkw abgebildet ist, gilt das Verbot für alle mehrspurigen Kraftfahrzeuge, also auch für Lkw, Busse, Wohnmobile oder Trikes. Krafträder, Mofas und Fahrräder dürfen weiterfahren. Ausnahmen werden durch Zusatzzeichen geregelt.',
      keyPoints: [
        { label: 'Name: Verbot für Kraftwagen', keywords: ['kraftwagen', '251', 'verbot für'] },
        { label: 'Gilt für alle mehrspurigen Kfz', keywords: ['mehrspurig', 'alle', 'lkw', 'bus'] },
        { label: 'Krafträder/Fahrräder erlaubt', keywords: ['krafträder', 'motorrad', 'fahrrad', 'mofa', 'einspurig'] },
        { label: 'Ausnahmen per Zusatzzeichen', keywords: ['zusatzzeichen'] }
      ],
      wrongClaims: [
        { label: 'Falsch: Das Verbot gilt nicht nur für Pkw', keywords: ['nur für pkw', 'nur pkw', 'nur für autos'] },
        { label: 'Falsch: Motorräder sind nicht betroffen', keywords: ['auch motorräder', 'motorräder verboten'] }
      ],
      followUps: ['Darf hier ein Motorrad mit Beiwagen fahren?', 'Was ist der Unterschied zu Zeichen 260?']
    }),
    sign(253, {
      name: 'Verbot für Kraftfahrzeuge über 3,5 t',
      category: 'Vorschriftzeichen (Verkehrsverbot)',
      difficulty: 2,
      explanation: 'Der Lkw im roten Ring heißt: Schwere Kraftfahrzeuge über 3,5 t zulässige Gesamtmasse und Zugmaschinen dürfen nicht durch. Pkw und Busse schon.',
      example: 'Ein Wohnmobil mit 4,1 t zulässiger Gesamtmasse – darf es hier fahren? Gute Übung zum Unterschied zwischen Pkw-Zulassung und Gesamtmasse.',
      modelAnswer: 'Zeichen 253 ist ein Verbot für Kraftfahrzeuge mit einer zulässigen Gesamtmasse über 3,5 t einschließlich ihrer Anhänger und für Zugmaschinen. Ausgenommen sind Personenkraftwagen und Kraftomnibusse. Steht eine andere Masse auf einem Zusatzzeichen, gilt diese. Mit dem Zusatzzeichen „Durchgangsverkehr“ ab 7,5 t ist nur der Durchgangsverkehr verboten, Ziel- und Quellverkehr ist erlaubt.',
      keyPoints: [
        { label: 'Name: Verbot für Kfz über 3,5 t', keywords: ['3,5', 'lkw-verbot', 'lkw verbot', '253'] },
        { label: 'Zulässige Gesamtmasse inkl. Anhänger', keywords: ['zulässige gesamtmasse', 'gesamtmasse', 'anhänger'] },
        { label: 'Auch Zugmaschinen', keywords: ['zugmaschine', 'traktor'] },
        { label: 'Pkw und Busse ausgenommen', keywords: ['pkw', 'omnibus', 'bus', 'ausgenommen'] },
        { label: 'Zusatzzeichen ändern Masse/Durchgangsverkehr', keywords: ['zusatzzeichen', 'durchgangsverkehr', '7,5'] }
      ],
      wrongClaims: [
        { label: 'Falsch: Es zählt die zulässige, nicht die tatsächliche Masse', keywords: ['tatsächliche masse', 'tatsächliches gewicht'] }
      ],
      followUps: ['Darf ein Reisebus hier fahren?', 'Was bedeutet das Zusatzzeichen „Durchgangsverkehr“?']
    }),
    sign(260, {
      name: 'Verbot für Kraftfahrzeuge',
      category: 'Vorschriftzeichen (Verkehrsverbot)',
      explanation: 'Motorrad und Auto im Ring: Kraftfahrzeuge aller Art dürfen hier nicht fahren – vom Mofa bis zum Lkw.',
      example: 'Viele Schüler denken, Mofas seien erlaubt. Klären Sie: Auch Mofas und Kleinkrafträder sind ausgeschlossen.',
      modelAnswer: 'Zeichen 260 ist das Verbot für Kraftfahrzeuge: Es gilt für Krafträder, auch mit Beiwagen, Kleinkrafträder und Mofas sowie für Kraftwagen und sonstige mehrspurige Kraftfahrzeuge. Fahrräder dürfen fahren. Ausnahmen, z. B. für Anlieger oder E-Fahrzeuge, regelt ein Zusatzzeichen.',
      keyPoints: [
        { label: 'Name: Verbot für Kraftfahrzeuge', keywords: ['verbot für kraftfahrzeuge', 'kraftfahrzeuge', '260'] },
        { label: 'Krafträder, Mofas, Kleinkrafträder', keywords: ['kraftr', 'motorrad', 'mofa', 'kleinkraftr'] },
        { label: 'Kraftwagen/mehrspurige Kfz', keywords: ['kraftwagen', 'mehrspurig', 'auto', 'pkw'] },
        { label: 'Fahrräder erlaubt', keywords: ['fahrrad', 'radfahrer'] },
        { label: 'Ausnahmen per Zusatzzeichen', keywords: ['zusatzzeichen', 'anlieger'] }
      ],
      wrongClaims: [
        { label: 'Falsch: Auch Mofas sind verboten', keywords: ['mofas erlaubt', 'mofa darf', 'mofas dürfen'] }
      ],
      followUps: ['Welche Fahrzeuge dürfen hier trotzdem fahren?', 'Was ist der Unterschied zu Zeichen 251?']
    }),
    sign(261, {
      name: 'Verbot für kennzeichnungspflichtige Kraftfahrzeuge mit gefährlichen Gütern',
      category: 'Vorschriftzeichen (Verkehrsverbot)',
      difficulty: 2,
      explanation: 'Die orange Tafel im Ring steht für Gefahrgut-Warntafeln. Fahrzeuge, die so eine Tafel tragen müssen, dürfen hier nicht fahren.',
      example: 'Vor Tunneln oder in Wasserschutzgebieten sieht man das Zeichen. Fragen Sie: Warum ist das hier sinnvoll?',
      modelAnswer: 'Zeichen 261 verbietet kennzeichnungspflichtigen Kraftfahrzeugen mit gefährlichen Gütern die Durchfahrt. Gemeint sind Fahrzeuge, die mit orangefarbenen Warntafeln gekennzeichnet sein müssen, etwa Tanklastwagen mit Benzin. Es wird z. B. vor Tunneln, in Wohngebieten oder Wasserschutzgebieten aufgestellt.',
      keyPoints: [
        { label: 'Name: Verbot für Gefahrguttransporte', keywords: ['gefährliche güter', 'gefährlichen gütern', 'gefahrgut', '261'] },
        { label: 'Kennzeichnungspflichtig (orange Warntafel)', keywords: ['kennzeichnungspflichtig', 'orange', 'warntafel'] },
        { label: 'Beispiele/Zweck (Tunnel, Wasserschutz)', keywords: ['tunnel', 'wasserschutz', 'wohngebiet'] }
      ],
      wrongClaims: [
        { label: 'Verwechslung mit Zeichen 269 (Wasser gefährdende Ladung)', keywords: ['wassergefährdend'] }
      ],
      followUps: ['Was ist der Unterschied zu Zeichen 269?', 'Woran erkennt man ein Gefahrgutfahrzeug?']
    }),
    sign(264, {
      name: 'Verbot für Fahrzeuge, deren tatsächliche Breite die angegebene Grenze überschreitet',
      category: 'Vorschriftzeichen (Verkehrsverbot)',
      difficulty: 2,
      explanation: 'Die Pfeile zeigen auf die Breite: Ist das Fahrzeug samt Ladung breiter als angegeben, darf es nicht durch – und die Spiegel zählen mit.',
      example: 'Baustelle auf der Autobahn, linker Fahrstreifen nur bis 2 m Breite. Viele SUV sind mit Spiegeln breiter – lassen Sie den Schüler im Fahrzeugschein nachsehen.',
      modelAnswer: 'Zeichen 264 verbietet die Durchfahrt für Fahrzeuge, deren tatsächliche Breite einschließlich Ladung die angegebene Grenze überschreitet. Die tatsächliche Breite schließt die Außenspiegel ein. Oft steht es in Baustellen auf Fahrstreifentafeln; dann gilt das Verbot nur für den jeweiligen Fahrstreifen.',
      keyPoints: [
        { label: 'Name: Tatsächliche Breite', keywords: ['breite', '264'] },
        { label: 'Tatsächliche Breite inkl. Ladung', keywords: ['tatsächlich', 'ladung'] },
        { label: 'Außenspiegel zählen mit', keywords: ['spiegel'] },
        { label: 'Bei Fahrstreifentafel nur für den Streifen', keywords: ['fahrstreifen', 'baustelle'] }
      ],
      wrongClaims: [
        { label: 'Verwechslung mit Zeichen 265 (Höhe) oder 266 (Länge)', keywords: ['höhe', 'länge'] },
        { label: 'Falsch: Spiegel werden mitgemessen', keywords: ['ohne spiegel'] }
      ],
      followUps: ['Wo finden Sie die Breite Ihres Fahrzeugs?', 'Was zeigen die Zeichen 265 und 266?']
    }),
    sign(266, {
      name: 'Verbot für Fahrzeuge über der angegebenen tatsächlichen Länge',
      category: 'Vorschriftzeichen (Verkehrsverbot)',
      difficulty: 2,
      explanation: 'Fahrzeuge (samt Ladung) die länger sind als angegeben, dürfen nicht durch. Bei Gespannen zählt die Gesamtlänge.',
      example: 'Mit Wohnwagen-Gespann (B96/BE) vor einer engen Ortsdurchfahrt: Die Länge des ganzen Gespanns zählt.',
      modelAnswer: 'Zeichen 266 verbietet Fahrzeugen, deren tatsächliche Länge einschließlich Ladung die angegebene Grenze überschreitet, die Durchfahrt. Bei Fahrzeugkombinationen, also z. B. Pkw mit Anhänger, gilt das Verbot für die Gesamtlänge.',
      keyPoints: [
        { label: 'Name: Tatsächliche Länge', keywords: ['länge', '266'] },
        { label: 'Inkl. Ladung', keywords: ['ladung', 'tatsächlich'] },
        { label: 'Bei Kombinationen Gesamtlänge', keywords: ['gesamtlänge', 'anhänger', 'kombination', 'gespann'] }
      ],
      wrongClaims: [
        { label: 'Verwechslung mit Breite (264) oder Höhe (265)', keywords: ['breite', 'höhe'] }
      ],
      followUps: ['Welche Höchstlänge erlaubt die StVO für Fahrzeug und Ladung?', 'Was zählt bei einem Gespann?']
    }),
    sign(268, {
      name: 'Schneeketten vorgeschrieben',
      category: 'Vorschriftzeichen',
      explanation: 'Der Reifen mit Kette heißt: Weiter geht es nur mit Schneeketten. Mit Ketten darf man höchstens 50 km/h fahren.',
      example: 'Vor einer Skifahrt im Unterricht: Wann zieht man die Ketten auf, und wie schnell darf man damit fahren?',
      modelAnswer: 'Zeichen 268 „Schneeketten vorgeschrieben“: Wer ein Fahrzeug führt, darf die Straße nur mit Schneeketten befahren. Mit Schneeketten darf nicht schneller als 50 km/h gefahren werden (§ 3 Abs. 4 StVO). Die Ketten gehören auf die Antriebsräder; das Montieren sollte vorher geübt werden.',
      keyPoints: [
        { label: 'Name: Schneeketten vorgeschrieben', keywords: ['schneeketten', 'ketten', '268'] },
        { label: 'Nur mit Schneeketten befahren', keywords: ['nur mit', 'pflicht', 'vorgeschrieben'] },
        { label: 'Max. 50 km/h mit Ketten', keywords: ['50'] },
        { label: 'Auf Antriebsräder', keywords: ['antriebsr'] }
      ],
      wrongClaims: [
        { label: 'Falsch: Winterreifen allein reichen hier nicht', keywords: ['winterreifen reichen', 'winterreifen genügen'] }
      ],
      followUps: ['Welche Höchstgeschwindigkeit gilt mit Schneeketten?', 'Auf welche Räder gehören die Ketten?']
    }),
    sign(273, {
      name: 'Verbot des Unterschreitens des angegebenen Mindestabstandes',
      category: 'Vorschriftzeichen',
      difficulty: 2,
      explanation: 'Schwere Fahrzeuge über 3,5 t und Zugmaschinen müssen zum vorausfahrenden Fahrzeug gleicher Art mindestens den angegebenen Abstand halten. Pkw und Busse sind ausgenommen.',
      example: 'Auf Brücken sieht man das Zeichen oft – zu viele schwere Lkw dicht hintereinander würden die Brücke zu stark belasten.',
      modelAnswer: 'Zeichen 273 verbietet das Unterschreiten des angegebenen Mindestabstandes. Es gilt für Kraftfahrzeuge mit einer zulässigen Gesamtmasse über 3,5 t und für Zugmaschinen gegenüber einem vorausfahrenden Kraftfahrzeug gleicher Art. Personenkraftwagen und Kraftomnibusse sind ausgenommen. Es steht häufig vor Brücken, um die Belastung zu begrenzen.',
      keyPoints: [
        { label: 'Name: Mindestabstand', keywords: ['mindestabstand', 'abstand', '273'] },
        { label: 'Gilt für Kfz über 3,5 t und Zugmaschinen', keywords: ['3,5', 'zugmaschine', 'lkw'] },
        { label: 'Zu Fahrzeugen gleicher Art', keywords: ['gleicher art'] },
        { label: 'Pkw und Busse ausgenommen', keywords: ['pkw', 'bus', 'ausgenommen'] },
        { label: 'Zweck z. B. Brücken', keywords: ['brücke'] }
      ],
      wrongClaims: [
        { label: 'Falsch: Pkw sind nicht betroffen', keywords: ['gilt für alle', 'auch für pkw'] }
      ],
      followUps: ['Warum steht dieses Zeichen oft vor Brücken?', 'Welcher Abstand gilt sonst für Lkw auf der Autobahn?']
    }),
    sign(274, {
      name: 'Zulässige Höchstgeschwindigkeit',
      category: 'Vorschriftzeichen (Streckenverbot)',
      explanation: 'Die Zahl im roten Ring ist das Tempolimit ab diesem Schild. Es gilt, bis es aufgehoben wird – nicht automatisch nach der nächsten Kreuzung.',
      example: 'Nach einer Einmündung fragt der Schüler, ob die 70 noch gilt. Ja – bis Zeichen 278, 282 oder bis ein anderes Limit angeordnet ist.',
      modelAnswer: 'Zeichen 274 „Zulässige Höchstgeschwindigkeit“: Ich darf nicht schneller fahren als angegeben. Werden innerorts mehr als 50 km/h zugelassen, gilt das für Fahrzeuge aller Art. Außerorts bleiben die Höchstgeschwindigkeiten für bestimmte Fahrzeugarten (z. B. Lkw, Gespanne) unberührt, wenn das Zeichen mehr erlaubt. Das Streckenverbot endet durch Zeichen 278 oder 282, durch eine Längenangabe im Zusatzzeichen oder – zusammen mit einem Gefahrzeichen – nach der Gefahrstelle. Mit dem Zusatzzeichen „bei Nässe“ gilt es nur bei nasser Fahrbahn.',
      keyPoints: [
        { label: 'Name: Zulässige Höchstgeschwindigkeit', keywords: ['höchstgeschwindigkeit', 'tempolimit', 'geschwindigkeitsbegrenzung', '274'] },
        { label: 'Nicht schneller als angegeben', keywords: ['nicht schneller', 'maximal', 'höchstens'] },
        { label: 'Streckenverbot – gilt bis Aufhebung', keywords: ['streckenverbot', 'aufgehoben', 'aufhebung', 'bis'] },
        { label: 'Ende: 278, 282, Zusatzzeichen oder Gefahrstelle', keywords: ['278', '282', 'gefahrstelle', 'zusatzzeichen'] },
        { label: 'Fahrzeugspezifische Limits bleiben außerorts', keywords: ['lkw', 'anhänger', 'fahrzeugart', 'unberührt'] }
      ],
      wrongClaims: [
        { label: 'Falsch: Kreuzungen heben das Tempolimit nicht auf', keywords: ['endet an der kreuzung', 'nach der kreuzung aufgehoben', 'endet nach der kreuzung'] },
        { label: 'Falsch: Es ist eine Höchst-, keine Richt- oder Mindestgeschwindigkeit', keywords: ['richtgeschwindigkeit', 'mindestgeschwindigkeit'] }
      ],
      followUps: ['Wie endet ein Streckenverbot?', 'Was bedeutet das Zusatzzeichen „bei Nässe“?']
    }),
    sign(276, {
      name: 'Überholverbot für Kraftfahrzeuge aller Art',
      category: 'Vorschriftzeichen (Streckenverbot)',
      explanation: 'Das rote Auto links neben dem schwarzen heißt: Kraftfahrzeuge dürfen hier keine mehrspurigen Kraftfahrzeuge und Krafträder mit Beiwagen überholen.',
      example: 'Ein Traktor fährt mit 25 km/h vor Ihnen im Überholverbot. Der Schüler muss dahinter bleiben – auch wenn es lange dauert.',
      modelAnswer: 'Zeichen 276 „Überholverbot für Kraftfahrzeuge aller Art“: Wer ein Kraftfahrzeug führt, darf mehrspurige Kraftfahrzeuge und Krafträder mit Beiwagen nicht überholen. Einspurige Fahrzeuge wie Fahrräder, Mofas und Motorräder ohne Beiwagen dürfen überholt werden. Es ist ein Streckenverbot und endet mit Zeichen 280 oder 282, mit einer Längenangabe im Zusatzzeichen oder nach einer zusammen angeordneten Gefahrstelle.',
      keyPoints: [
        { label: 'Name: Überholverbot', keywords: ['überholverbot', '276'] },
        { label: 'Mehrspurige Kfz nicht überholen', keywords: ['mehrspurig', 'kraftfahrzeuge'] },
        { label: 'Einspurige dürfen überholt werden', keywords: ['einspurig', 'fahrrad', 'radfahrer', 'motorrad', 'mofa'] },
        { label: 'Streckenverbot, Ende 280/282', keywords: ['280', '282', 'streckenverbot', 'aufgehoben'] }
      ],
      wrongClaims: [
        { label: 'Falsch: Radfahrer dürfen auch im Überholverbot überholt werden', keywords: ['auch radfahrer nicht', 'radfahrer nicht überholen', 'keine radfahrer überholen'] },
        { label: 'Verwechslung mit Zeichen 277 (Überholverbot für Lkw über 3,5 t)', keywords: ['nur für lkw', '3,5 t'] }
      ],
      followUps: ['Darf ein Traktor im Überholverbot überholt werden?', 'Was gilt bei Zeichen 277?']
    }),
    sign(283, {
      name: 'Absolutes Haltverbot',
      category: 'Vorschriftzeichen (Haltverbot)',
      explanation: 'Das rote Kreuz auf Blau heißt: Hier darf man gar nicht halten – nicht einmal kurz zum Aussteigen.',
      example: 'Die Mutter will den Schüler im absoluten Haltverbot „nur kurz rauslassen“. Klären Sie: Auch das ist verboten.',
      modelAnswer: 'Zeichen 283 „Absolutes Haltverbot“: Das Halten auf der Fahrbahn ist verboten, auch kurz zum Ein- oder Aussteigen. Mit Zusatzzeichen kann das Verbot auf den Seitenstreifen ausgedehnt oder nur auf ihn beschränkt werden. Es gilt nur auf der Straßenseite, auf der es steht. Anfang, Mitte und Ende werden durch Pfeile angezeigt; ohne Pfeil gilt es in der Regel bis zur nächsten Kreuzung oder Einmündung.',
      keyPoints: [
        { label: 'Name: Absolutes Haltverbot', keywords: ['absolutes haltverbot', 'halteverbot', 'haltverbot', '283'] },
        { label: 'Jedes Halten verboten', keywords: ['nicht halten', 'halten verboten', 'gar nicht', 'auch nicht kurz'] },
        { label: 'Zusatzzeichen: Seitenstreifen', keywords: ['seitenstreifen', 'zusatzzeichen'] },
        { label: 'Nur auf dieser Straßenseite', keywords: ['straßenseite', 'seite'] },
        { label: 'Pfeile / bis zur nächsten Kreuzung', keywords: ['pfeil', 'kreuzung', 'einmündung'] }
      ],
      wrongClaims: [
        { label: 'Verwechslung mit Zeichen 286: Kurzes Halten ist bei 283 nicht erlaubt', keywords: ['3 minuten', 'drei minuten', 'kurz halten erlaubt', 'aussteigen erlaubt'] }
      ],
      followUps: ['Was bedeuten die Pfeile am Haltverbot?', 'Was ist der Unterschied zu Zeichen 286?']
    }),
    sign(286, {
      name: 'Eingeschränktes Haltverbot',
      category: 'Vorschriftzeichen (Haltverbot)',
      explanation: 'Ein roter Strich auf Blau: Halten bis 3 Minuten ist erlaubt, länger nur zum Ein- und Aussteigen oder Be- und Entladen.',
      example: 'Paketdienst hält 10 Minuten zum Entladen – erlaubt, wenn ohne Verzögerung geladen wird. Der Schüler wartet 5 Minuten auf einen Freund – nicht erlaubt.',
      modelAnswer: 'Zeichen 286 „Eingeschränktes Haltverbot“: Ich darf nicht länger als drei Minuten auf der Fahrbahn halten, ausgenommen zum Ein- oder Aussteigen oder zum Be- oder Entladen; Ladegeschäfte müssen ohne Verzögerung durchgeführt werden. Mit Zusatzzeichen kann das Verbot auf den Seitenstreifen ausgedehnt oder Ausnahmen geregelt werden, z. B. für Bewohner mit Parkausweis, Carsharing oder E-Fahrzeuge. Pfeile im Zeichen markieren die Verbotsstrecke: Anfang (Pfeil zur Fahrbahn hin), Ende (Pfeil von der Fahrbahn weg), wiederholtes Zeichen innerhalb der Strecke (beide Pfeile); ohne Pfeile gilt es bis zur nächsten Kreuzung oder Einmündung auf dieser Straßenseite.',
      keyPoints: [
        { label: 'Name: Eingeschränktes Haltverbot', keywords: ['eingeschränkt', '286'] },
        { label: 'Bis 3 Minuten halten erlaubt', keywords: ['3 minuten', 'drei minuten'] },
        { label: 'Ein-/Aussteigen, Be-/Entladen', keywords: ['aussteigen', 'einsteigen', 'entladen', 'beladen'] },
        { label: 'Ladegeschäft ohne Verzögerung', keywords: ['ohne verzögerung', 'zügig', 'sofort'] },
        { label: 'Pfeile: Anfang, Mitte, Ende', keywords: ['pfeil', 'anfang', 'ende', 'mitte'] },
        { label: 'Ohne Pfeile bis zur Kreuzung', keywords: ['kreuzung', 'einmündung'] },
        { label: 'Ausnahmen per Zusatzzeichen', keywords: ['zusatzzeichen', 'bewohner', 'parkausweis'] }
      ],
      wrongClaims: [
        { label: 'Falsch: Parken ist hier verboten (länger als 3 Minuten halten)', keywords: ['parken erlaubt', 'darf parken'] }
      ],
      followUps: ['Was bedeutet ein Pfeil nach links bzw. rechts am Haltverbotsschild?', 'Ab wann parkt man?']
    }),
    sign(294, {
      name: 'Haltlinie',
      category: 'Markierung (Vorschriftzeichen)',
      explanation: 'Die breite durchgezogene Querlinie ist die Haltlinie. Hier muss man anhalten, wenn ein Stoppschild, eine rote Ampel, ein Polizist oder eine Schranke es verlangt.',
      example: 'Bei Rot hält der Schüler zu weit hinter der Haltlinie – oder auf ihr. Üben Sie das genaue Anhalten davor.',
      modelAnswer: 'Zeichen 294 ist die Haltlinie. Ergänzend zu Halt- oder Wartegeboten durch Zeichen 206, Polizeibeamte, Lichtzeichen oder Schranken ordnet sie an: Hier muss angehalten werden. Erforderlichenfalls ist an der Stelle, von der aus die Straße eingesehen werden kann (Sichtlinie), erneut anzuhalten. Ohne ein solches Haltgebot hat die Haltlinie für sich keine Bedeutung.',
      keyPoints: [
        { label: 'Name: Haltlinie', keywords: ['haltlinie', '294'] },
        { label: 'Hier anhalten (bei Haltgebot)', keywords: ['anhalten', 'halten'] },
        { label: 'Ergänzt 206, Ampel, Polizei, Schranke', keywords: ['206', 'stopp', 'ampel', 'lichtzeichen', 'polizei', 'schranke'] },
        { label: 'Ggf. erneut an der Sichtlinie halten', keywords: ['sichtlinie', 'erneut', 'einsehen'] }
      ],
      wrongClaims: [
        { label: 'Verwechslung mit der Wartelinie (Zeichen 341) – die Haltlinie ist durchgezogen', keywords: ['gestrichelt', 'empfiehlt'] }
      ],
      followUps: ['Was ist der Unterschied zur Wartelinie?', 'Was tun Sie, wenn Sie von der Haltlinie aus nichts sehen?']
    }),
    sign(301, {
      name: 'Vorfahrt',
      category: 'Richtzeichen (Vorrangzeichen)',
      explanation: 'Der dicke Strich mit kleinem Querbalken heißt: An der nächsten Kreuzung oder Einmündung habe ich Vorfahrt – aber nur dort.',
      example: 'Der Schüler verwechselt 301 mit 102. Zeichnen Sie beide nebeneinander: dicker Balken = ich habe Vorfahrt; gleichmäßiges Kreuz = rechts vor links.',
      modelAnswer: 'Zeichen 301 „Vorfahrt“ zeigt an, dass an der nächsten Kreuzung oder Einmündung Vorfahrt besteht. Es gilt nur für diese eine Kreuzung. Außerorts steht es etwa 150 bis 250 m vorher, innerorts kurz davor. Trotz Vorfahrt muss ich aufmerksam bleiben (Vertrauensgrundsatz mit Grenzen, § 1 StVO).',
      keyPoints: [
        { label: 'Name: Vorfahrt', keywords: ['vorfahrt', '301'] },
        { label: 'Nur an der nächsten Kreuzung', keywords: ['nächste kreuzung', 'nächsten kreuzung', 'nur für die', 'nur dort', 'einmalig'] },
        { label: 'Aufstellung vor der Kreuzung', keywords: ['150', '250', 'kurz davor', 'vorher'] },
        { label: 'Aufmerksam bleiben', keywords: ['aufmerksam', 'vorsicht', 'vertrauensgrundsatz'] }
      ],
      wrongClaims: [
        { label: 'Verwechslung mit Zeichen 102 (Vorfahrt von rechts)', keywords: ['rechts vor links', 'von rechts'] },
        { label: 'Verwechslung mit Zeichen 306 (Vorfahrtstraße) – 301 gilt nur einmal', keywords: ['bis zum nächsten', 'mehrere kreuzungen', 'ganze straße'] }
      ],
      followUps: ['Was ist der Unterschied zu Zeichen 306?', 'Wo wird Zeichen 301 aufgestellt?']
    }),
    sign(306, {
      name: 'Vorfahrtstraße',
      category: 'Richtzeichen (Vorrangzeichen)',
      explanation: 'Die gelbe Raute heißt: Ich bin auf einer Vorfahrtstraße und habe an allen folgenden Kreuzungen Vorfahrt, bis das wieder aufgehoben wird.',
      example: 'Auf der Vorfahrtstraße bremst der Schüler an jeder Einmündung. Erklären Sie: zügig fahren, aber bremsbereit bleiben.',
      modelAnswer: 'Zeichen 306 „Vorfahrtstraße“ zeigt an, dass Vorfahrt besteht bis zum nächsten Zeichen 205, 206 oder 307 „Ende der Vorfahrtstraße“. Außerhalb geschlossener Ortschaften darf auf der Fahrbahn von Vorfahrtstraßen nicht geparkt werden. Mit dem Zusatzzeichen „abknickende Vorfahrt“ muss ich, wenn ich dem Verlauf folge, rechtzeitig blinken und besonders auf Fußgänger achten. ',
      keyPoints: [
        { label: 'Name: Vorfahrtstraße', keywords: ['vorfahrtstraße', 'vorfahrtsstraße', '306'] },
        { label: 'Vorfahrt bis 205/206/307', keywords: ['205', '206', '307', 'bis zum', 'aufgehoben'] },
        { label: 'Parkverbot außerorts', keywords: ['parken', 'parkverbot'] },
        { label: 'Abknickende Vorfahrt: blinken', keywords: ['abknickend', 'blinken', 'zusatzzeichen'] },
        { label: 'Fußgänger beachten', keywords: ['fußgänger'] }
      ],
      wrongClaims: [
        { label: 'Falsch: Das Parkverbot gilt nur außerorts', keywords: ['innerorts parkverbot', 'innerorts nicht parken'] }
      ],
      followUps: ['Wie kann eine Vorfahrtstraße aufgehoben werden?', 'Was gilt bei abknickender Vorfahrt?']
    }),
    sign(307, {
      name: 'Ende der Vorfahrtstraße',
      category: 'Richtzeichen (Vorrangzeichen)',
      explanation: 'Die durchgestrichene Raute heißt: Die Vorfahrtstraße ist zu Ende. Ab hier gelten wieder die normalen Vorfahrtregeln.',
      example: 'Nach Zeichen 307 kommt eine Kreuzung ohne Schilder – der Schüler muss jetzt wieder „rechts vor links“ beachten.',
      modelAnswer: 'Zeichen 307 zeigt das Ende der Vorfahrtstraße an. Ab hier gelten wieder die allgemeinen Vorfahrtregeln, sofern nichts anderes angeordnet ist – an der nächsten Kreuzung ohne Beschilderung also „rechts vor links“. Eine Vorfahrtstraße kann außerdem durch Zeichen 205 oder 206 enden.',
      keyPoints: [
        { label: 'Name: Ende der Vorfahrtstraße', keywords: ['ende der vorfahrt', 'ende vorfahrt', '307'] },
        { label: 'Allgemeine Regeln gelten wieder', keywords: ['allgemein', 'rechts vor links', 'normale'] },
        { label: 'Auch durch 205/206 beendet', keywords: ['205', '206'] }
      ],
      wrongClaims: [
        { label: 'Falsch: Nach 307 hat man nicht automatisch Wartepflicht – es gilt rechts vor links', keywords: ['muss jetzt warten', 'immer warten'] }
      ],
      followUps: ['Welche weiteren Möglichkeiten gibt es, eine Vorfahrtstraße aufzuheben?', 'Was gilt an der nächsten Kreuzung?']
    }),
    sign(308, {
      name: 'Vorrang vor dem Gegenverkehr',
      category: 'Richtzeichen (Vorrangzeichen)',
      explanation: 'Großer weißer Pfeil nach oben: An der Engstelle darf ich zuerst fahren. Der Gegenverkehr (kleiner roter Pfeil) muss warten.',
      example: 'An einer Baustellen-Engstelle fährt der Gegenverkehr trotzdem. Der Schüler soll Vorrang nicht erzwingen (§ 1 StVO).',
      modelAnswer: 'Zeichen 308 „Vorrang vor dem Gegenverkehr“: Wer ein Fahrzeug führt, hat an der folgenden Engstelle Vorrang vor dem Gegenverkehr. Das Gegenstück ist Zeichen 208 „Vorrang des Gegenverkehrs“ für die andere Richtung. Den Vorrang darf ich nicht erzwingen; ich bleibe aufmerksam, falls der Gegenverkehr ihn missachtet.',
      keyPoints: [
        { label: 'Name: Vorrang vor dem Gegenverkehr', keywords: ['vorrang vor dem gegenverkehr', 'vorrang', '308'] },
        { label: 'An Engstellen', keywords: ['engstelle', 'eng'] },
        { label: 'Gegenstück Zeichen 208', keywords: ['208'] },
        { label: 'Nicht erzwingen', keywords: ['erzwingen', 'aufmerksam', 'vorsicht'] }
      ],
      wrongClaims: [
        { label: 'Verwechslung mit Zeichen 208 – hier habe ICH Vorrang', keywords: ['gegenverkehr hat vorrang', 'ich muss warten'] }
      ],
      followUps: ['Wie sieht das Gegenstück aus und was bedeutet es?', 'Wie verhalten Sie sich, wenn der Gegenverkehr trotzdem fährt?']
    }),
    sign(310, {
      name: 'Ortstafel (Vorderseite)',
      category: 'Richtzeichen',
      explanation: 'Das gelbe Ortsschild heißt: Hier beginnt die geschlossene Ortschaft. Ab dem Schild gelten die Innerorts-Regeln, z. B. 50 km/h.',
      example: 'Der Schüler bremst erst nach dem Ortsschild. Erklären Sie: Die 50 km/h gelten ab dem Schild, also vorher verzögern.',
      modelAnswer: 'Zeichen 310, die Ortstafel (Vorderseite), bestimmt: Hier beginnt eine geschlossene Ortschaft. Ab der Ortstafel gelten die Vorschriften für den Verkehr innerhalb geschlossener Ortschaften, insbesondere die Höchstgeschwindigkeit von 50 km/h, Einschränkungen beim Schallzeichen und die Regeln zur Fahrstreifenwahl. Die Rückseite (Zeichen 311) zeigt das Ende der geschlossenen Ortschaft; dann gelten wieder die Außerortsregeln.',
      keyPoints: [
        { label: 'Name: Ortstafel / Ortseingang', keywords: ['ortstafel', 'ortsschild', 'ortseingang', '310'] },
        { label: 'Beginn geschlossene Ortschaft', keywords: ['geschlossene ortschaft', 'innerorts', 'ortschaft'] },
        { label: 'Ab der Tafel gelten Innerortsregeln', keywords: ['ab der', 'ab dem', 'ab hier', 'gelten'] },
        { label: '50 km/h', keywords: ['50'] },
        { label: 'Rückseite 311 = Ende', keywords: ['311', 'rückseite', 'ende'] }
      ],
      wrongClaims: [
        { label: 'Falsch: Die Regeln gelten ab der Tafel, nicht erst ab der Bebauung', keywords: ['ab der bebauung', 'erst ab den häusern'] }
      ],
      followUps: ['Nennen Sie Unterschiede zwischen innerorts und außerorts.', 'Was gilt, wenn die Ortstafel grün ist?']
    }),
    sign(314, {
      name: 'Parken',
      category: 'Richtzeichen',
      explanation: 'Das weiße P auf Blau zeigt: Hier ist Parken erlaubt. Zusatzzeichen können es einschränken, z. B. nur mit Parkschein, für Carsharing oder E-Autos.',
      example: 'Ein P-Schild mit Zusatzzeichen „Carsharing“: Fragen Sie den Schüler, ob er mit seinem Privatwagen dort parken darf.',
      modelAnswer: 'Zeichen 314 „Parken“ erlaubt das Parken. Durch Zusatzzeichen kann die Erlaubnis eingeschränkt werden, etwa auf bestimmte Fahrzeugarten, Zeiten, Parkscheibe oder Parkschein, Bewohner mit Parkausweis, elektrisch betriebene Fahrzeuge oder Carsharingfahrzeuge (Sinnbild Carsharing). Ein Pfeil im Zeichen kann die Lage oder Zufahrt des Parkplatzes angeben.',
      keyPoints: [
        { label: 'Name: Parken / Parkplatz', keywords: ['parken', 'parkplatz', '314'] },
        { label: 'Parken erlaubt', keywords: ['erlaubt'] },
        { label: 'Einschränkung per Zusatzzeichen', keywords: ['zusatzzeichen', 'parkscheibe', 'parkschein', 'zeit'] },
        { label: 'Sonderberechtigte (Carsharing, E-Auto, Bewohner)', keywords: ['carsharing', 'elektro', 'e-auto', 'bewohner'] }
      ],
      wrongClaims: [],
      followUps: ['Welche Möglichkeiten der Parkraumüberwachung gibt es?', 'Was bedeutet das Carsharing-Sinnbild?']
    }),
    sign(325.1, {
      name: 'Beginn eines verkehrsberuhigten Bereichs',
      category: 'Richtzeichen',
      explanation: 'Haus, Mensch, Kind und Auto auf Blau: Spielstraße. Hier fährt man nur Schrittgeschwindigkeit, Fußgänger dürfen die ganze Straße nutzen, Kinder dürfen überall spielen.',
      example: 'Prüfungsfalle: Beim Verlassen des verkehrsberuhigten Bereichs ist man gegenüber dem fließenden Verkehr wartepflichtig (§ 10 StVO).',
      modelAnswer: 'Zeichen 325.1 kennzeichnet den Beginn eines verkehrsberuhigten Bereichs. Wer ein Fahrzeug führt, muss mit Schrittgeschwindigkeit fahren und darf den Fußgängerverkehr weder gefährden noch behindern, notfalls muss gewartet werden. Fußgänger dürfen die Straße in ihrer ganzen Breite benutzen, Kinderspiele sind überall erlaubt; sie dürfen den Fahrverkehr aber nicht unnötig behindern. Parken ist nur auf gekennzeichneten Flächen erlaubt, ausgenommen zum Ein- oder Aussteigen und Be- oder Entladen. Das Ende zeigt Zeichen 325.2; beim Ausfahren bin ich nach § 10 StVO wartepflichtig.',
      keyPoints: [
        { label: 'Name: Verkehrsberuhigter Bereich', keywords: ['verkehrsberuhigt', 'spielstraße', '325'] },
        { label: 'Schrittgeschwindigkeit', keywords: ['schrittgeschwindigkeit', 'schritttempo'] },
        { label: 'Fußgänger nicht gefährden/behindern, ggf. warten', keywords: ['fußgänger', 'gefährden', 'warten'] },
        { label: 'Ganze Straßenbreite, Kinderspiele erlaubt', keywords: ['ganze breite', 'ganzen breite', 'kinder', 'spielen'] },
        { label: 'Parken nur auf gekennzeichneten Flächen', keywords: ['parken', 'gekennzeichnet'] },
        { label: 'Beim Verlassen wartepflichtig (§ 10)', keywords: ['§ 10', 'wartepflicht', 'verlassen', 'ausfahren'] }
      ],
      wrongClaims: [
        { label: 'Falsch: Es gilt Schrittgeschwindigkeit, nicht 30 km/h', keywords: ['30 km/h', 'tempo 30', '30 kmh'] },
        { label: 'Falsch: Beim Ausfahren hat man keine Vorfahrt', keywords: ['rechts vor links beim ausfahren', 'beim ausfahren vorfahrt'] }
      ],
      followUps: ['Wie schnell ist Schrittgeschwindigkeit?', 'Wie verhalten Sie sich beim Verlassen des Bereichs?']
    }),
    sign(330.1, {
      name: 'Autobahn',
      category: 'Richtzeichen',
      explanation: 'Brücke über zwei Fahrbahnen auf Blau: Ab hier gelten die Autobahnregeln.',
      example: 'Vor der ersten Autobahnfahrt (Sonderfahrt) wiederholen Sie die wichtigsten Regeln: Einfädeln, Richtgeschwindigkeit, Halteverbot, Rettungsgasse.',
      modelAnswer: 'Zeichen 330.1 „Autobahn“: Ab diesem Zeichen gelten die Regeln für den Verkehr auf Autobahnen (§ 18 StVO). Benutzen dürfen sie nur Kraftfahrzeuge mit einer bauartbedingten Höchstgeschwindigkeit von mehr als 60 km/h. Es gilt eine Richtgeschwindigkeit von 130 km/h. Halten ist verboten, auch auf dem Seitenstreifen; Wenden und Rückwärtsfahren sind verboten. Eingefahren wird nur an Anschlussstellen, dabei hat der Verkehr auf der durchgehenden Fahrbahn Vorfahrt. Das Ende zeigt Zeichen 330.2.',
      keyPoints: [
        { label: 'Name: Autobahn', keywords: ['autobahn', '330'] },
        { label: 'Nur Kfz > 60 km/h bbH', keywords: ['60'] },
        { label: 'Richtgeschwindigkeit 130 km/h', keywords: ['130', 'richtgeschwindigkeit'] },
        { label: 'Halten, Wenden, Rückwärtsfahren verboten', keywords: ['halten', 'wenden', 'rückwärts'] },
        { label: 'Einfahren nur an Anschlussstellen, Vorfahrt der Fahrbahn', keywords: ['anschlussstelle', 'einfahren', 'vorfahrt', 'beschleunigungsstreifen'] },
        { label: 'Ende Zeichen 330.2', keywords: ['330.2', 'ende'] }
      ],
      wrongClaims: [
        { label: 'Falsch: 130 km/h ist eine Richtgeschwindigkeit, keine Höchstgeschwindigkeit', keywords: ['höchstgeschwindigkeit 130', 'darf maximal 130', 'tempolimit 130'] },
        { label: 'Falsch: Es gibt keine Mindestgeschwindigkeit von 60 km/h – das Fahrzeug muss bauartbedingt schneller als 60 können', keywords: ['mindestgeschwindigkeit'] }
      ],
      followUps: ['Was ist der Unterschied zur Kraftfahrstraße?', 'Wann muss eine Rettungsgasse gebildet werden?']
    }),
    sign(331.1, {
      name: 'Kraftfahrstraße',
      category: 'Richtzeichen',
      difficulty: 2,
      explanation: 'Weißes Auto auf Blau: Kraftfahrstraße. Fast die gleichen Regeln wie auf der Autobahn, aber es kann Kreuzungen geben und außerorts gilt grundsätzlich 100 km/h.',
      example: 'Auf einer Bundesstraße mit Zeichen 331.1 fragt der Schüler, ob er wie auf der Autobahn fahren darf – gute Gelegenheit für die Unterschiede.',
      modelAnswer: 'Zeichen 331.1 „Kraftfahrstraße“: Ab hier gelten die Regeln für Kraftfahrstraßen. Benutzen dürfen sie nur Kraftfahrzeuge mit einer bauartbedingten Höchstgeschwindigkeit von mehr als 60 km/h. Halten ist verboten, auch auf Seitenstreifen; Wenden und Rückwärtsfahren sind verboten; eingefahren wird nur an Kreuzungen oder Einmündungen. Anders als auf der Autobahn gilt außerorts grundsätzlich die Höchstgeschwindigkeit von 100 km/h, sofern die Richtungsfahrbahnen nicht baulich getrennt sind bzw. nicht zwei markierte Fahrstreifen je Richtung vorhanden sind. Das Ende zeigt Zeichen 331.2.',
      keyPoints: [
        { label: 'Name: Kraftfahrstraße', keywords: ['kraftfahrstraße', '331'] },
        { label: 'Nur Kfz > 60 km/h bbH', keywords: ['60'] },
        { label: 'Halten/Wenden/Rückwärts verboten', keywords: ['halten', 'wenden', 'rückwärts'] },
        { label: 'Grundsätzlich 100 km/h außerorts', keywords: ['100'] },
        { label: 'Einfahren an Kreuzungen/Einmündungen', keywords: ['kreuzung', 'einmündung', 'einfahren'] },
        { label: 'Ende Zeichen 331.2', keywords: ['331.2', 'ende'] }
      ],
      wrongClaims: [
        { label: 'Verwechslung mit der Autobahn (Zeichen 330.1)', keywords: ['das ist die autobahn', 'autobahnschild'] }
      ],
      followUps: ['Nennen Sie drei Unterschiede zwischen Kraftfahrstraße und Autobahn.', 'Wo darf auf der Kraftfahrstraße eingefahren werden?']
    }),
    sign(341, {
      name: 'Wartelinie',
      category: 'Markierung (Richtzeichen)',
      explanation: 'Die unterbrochene breite Querlinie ist die Wartelinie. Sie empfiehlt, hier zu warten, wenn man Vorfahrt gewähren muss. Pflicht zum Anhalten ist sie nicht.',
      example: 'An einer Einmündung mit Zeichen 205 bleibt der Schüler an der Wartelinie stehen, obwohl er von dort nichts sieht. Erklären Sie: Sie ist eine Empfehlung.',
      modelAnswer: 'Zeichen 341 ist die Wartelinie, eine unterbrochene breite Querlinie. Sie empfiehlt dem Wartepflichtigen, an dieser Stelle zu warten, meist an Einmündungen mit Zeichen 205 oder vor Lichtzeichen für Abbieger. Anders als die Haltlinie (Zeichen 294) ist sie keine Anordnung zum Anhalten, sondern eine Empfehlung.',
      keyPoints: [
        { label: 'Name: Wartelinie', keywords: ['wartelinie', '341'] },
        { label: 'Empfiehlt zu warten', keywords: ['empfiehlt', 'empfehlung'] },
        { label: 'Für Wartepflichtige (z. B. 205)', keywords: ['wartepflicht', '205', 'vorfahrt'] },
        { label: 'Unterschied zur Haltlinie', keywords: ['haltlinie', '294', 'keine pflicht', 'nicht verpflichtend'] }
      ],
      wrongClaims: [
        { label: 'Falsch: An der Wartelinie muss man nicht zwingend anhalten', keywords: ['muss anhalten', 'anhaltepflicht'] }
      ],
      followUps: ['Was ist der Unterschied zur Haltlinie?', 'Was bedeuten Haifischzähne (Zeichen 342)?']
    }),
    sign(625, {
      name: 'Richtungstafel in Kurven',
      category: 'Verkehrseinrichtung',
      explanation: 'Rot-weiße Pfeile in der Kurve zeigen, wohin die Straße führt. Sie warnen vor einer engen oder unübersichtlichen Kurve.',
      example: 'Bei Nachtfahrten (Sonderfahrt) zeigt sich, wie wichtig die Richtungstafeln für die Kurvenerkennung sind.',
      modelAnswer: 'Zeichen 625 ist die Richtungstafel in Kurven. Sie ist eine Verkehrseinrichtung (Anlage 4 StVO) und zeigt den Verlauf einer Kurve an; die Pfeilspitzen weisen in die Kurvenrichtung. Sie kann auch in aufgelöster Form, also mit einzelnen Tafeln, angebracht sein. Ich passe die Geschwindigkeit vor der Kurve an.',
      keyPoints: [
        { label: 'Name: Richtungstafel', keywords: ['richtungstafel', '625', 'leittafel'] },
        { label: 'Zeigt Kurvenverlauf', keywords: ['kurve', 'verlauf', 'richtung'] },
        { label: 'Verkehrseinrichtung', keywords: ['verkehrseinrichtung', 'anlage 4'] },
        { label: 'Geschwindigkeit anpassen', keywords: ['langsam', 'geschwindigkeit', 'bremsen'] }
      ],
      wrongClaims: [],
      followUps: ['Was sind Verkehrseinrichtungen?', 'Wie verhalten Sie sich vor einer Kurve mit Richtungstafel?']
    })
  ];

  return { signs };
});
