/**
 * Technikfragen zur Prüfungsvorbereitung (Fahrzeugtechnik, Umwelt, Fahrphysik).
 * Themenauswahl nach Ihren Unterlagen, Musterantworten selbst formuliert.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FLQuestionsTechnik = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const SOURCE = 'Technik – Prüfungsvorbereitung';
  let counter = 0;

  function t(topic, data) {
    counter += 1;
    return Object.assign({
      id: `tk-${String(counter).padStart(2, '0')}`,
      subject: 'technik',
      topic,
      difficulty: 2,
      source: SOURCE,
      wrongClaims: []
    }, data);
  }

  const questions = [
    // ---------------------------------------------------------------- Kraftstoffe und Betriebsmittel
    t('Kraftstoff und Gewinnung', {
      group: 'Kraftstoffe & Betriebsmittel',
      difficulty: 1,
      question: 'Was ist Kraftstoff und wie wird er gewonnen?',
      explanation: 'Kraftstoff speichert chemische Energie. Im Motor wird er verbrannt, die Wärme treibt über den Kurbeltrieb das Auto an. Benzin und Diesel stammen meist aus Erdöl.',
      example: 'Vergleichen Sie im Unterricht: Ein Diesel nutzt etwa 45 % der Energie, ein Benziner etwa 35 % – der Rest geht als Wärme verloren.',
      modelAnswer: 'Kraftstoff ist ein Energieträger, dessen chemische Energie im Verbrennungsmotor durch Verbrennung mit Sauerstoff in Wärme und über den Kurbeltrieb in mechanische Arbeit umgewandelt wird. Klassische Kraftstoffe sind Kohlenwasserstoffe; sie werden in Raffinerien durch Destillation von Erdöl und anschließende Raffination (Aufbereitung, Entschwefelung) gewonnen. Der Wirkungsgrad liegt beim Ottomotor bei etwa 35 %, beim Dieselmotor bei etwa 45 %.',
      keyPoints: [
        { label: 'Chemische Energie → Wärme → Bewegung', keywords: ['chemische energie', 'energie', 'wärme', 'verbrennung'] },
        { label: 'Kohlenwasserstoffe', keywords: ['kohlenwasserstoff'] },
        { label: 'Aus Erdöl in Raffinerien', keywords: ['erdöl', 'raffinerie'] },
        { label: 'Destillation/Raffination', keywords: ['destill', 'raffination'] },
        { label: 'Wirkungsgrad Otto/Diesel', keywords: ['wirkungsgrad', '35', '45'] }
      ],
      followUps: ['Warum hat der Dieselmotor einen besseren Wirkungsgrad?']
    }),
    t('Alternative Kraftstoffe', {
      group: 'Kraftstoffe & Betriebsmittel',
      question: 'Welche alternativen Kraftstoffe gibt es und welche Vor- und Nachteile haben sie?',
      explanation: 'Neben Benzin und Diesel gibt es Gas, Biokraftstoffe, Wasserstoff, synthetische Kraftstoffe und Strom. Sie können CO₂ sparen, sind aber oft teurer oder schlechter verfügbar.',
      example: 'Ein Kunde fragt, ob sich ein Erdgasauto lohnt. Besprechen Sie Tankstellennetz, Reichweite und CO₂-Bilanz.',
      modelAnswer: 'Alternativen sind Flüssiggas (LPG), komprimiertes und verflüssigtes Erdgas (CNG, LNG), Biogas, Bioethanol, Biodiesel und Pflanzenöle, Wasserstoff, synthetische Kraftstoffe (E-Fuels, Power-to-Liquid, Biomass-to-Liquid) sowie Strom. Vorteile: geringerer oder bilanziell neutraler CO₂-Ausstoß bei Herstellung aus erneuerbarer Energie, sauberere Verbrennung (z. B. schwefel- und aromatenfrei bei synthetischen Kraftstoffen), teils nutzbar ohne große Änderungen am Fahrzeug. Nachteile: aufwendige und teure Herstellung, teils geringerer Energiegehalt, eingeschränktes Tankstellennetz, bei Biokraftstoffen Flächenkonkurrenz zur Nahrungsmittelproduktion.',
      keyPoints: [
        { label: 'Gas (LPG/CNG/LNG)', keywords: ['lpg', 'cng', 'lng', 'erdgas', 'flüssiggas', 'autogas'] },
        { label: 'Biokraftstoffe', keywords: ['bio', 'ethanol', 'pflanzenöl'] },
        { label: 'Wasserstoff', keywords: ['wasserstoff'] },
        { label: 'Synthetische Kraftstoffe/E-Fuels', keywords: ['synthetisch', 'e-fuel', 'power to'] },
        { label: 'Strom', keywords: ['strom', 'elektr'] },
        { label: 'Vorteile (CO₂, sauber)', keywords: ['co2', 'co₂', 'sauber', 'erneuerbar'] },
        { label: 'Nachteile (Kosten, Verfügbarkeit, Energiegehalt)', keywords: ['teuer', 'aufwendig', 'verfügbar', 'tankstelle', 'energiegehalt'] }
      ],
      followUps: ['Was sind E-Fuels?', 'Welche Umweltauswirkungen hat Biodiesel?']
    }),
    t('E-Fuels', {
      group: 'Kraftstoffe & Betriebsmittel',
      difficulty: 1,
      question: 'Was sind E-Fuels?',
      explanation: 'E-Fuels sind künstlich hergestellte Kraftstoffe: Mit Ökostrom wird Wasserstoff erzeugt und mit CO₂ zu Kraftstoff verbunden.',
      example: 'Diskutieren Sie: Warum könnten E-Fuels für Oldtimer oder Flugzeuge wichtiger werden als für normale Pkw?',
      modelAnswer: 'E-Fuels sind strombasierte synthetische Kraftstoffe (Power-to-Fuel). Mit Strom aus erneuerbaren Quellen wird durch Elektrolyse aus Wasser Wasserstoff gewonnen; dieser wird mit CO₂, z. B. aus der Luft, zu flüssigen oder gasförmigen Kraftstoffen synthetisiert. Sie können in bestehenden Verbrennungsmotoren genutzt werden und sind bilanziell nahezu CO₂-neutral, die Herstellung ist aber energieintensiv und teuer.',
      keyPoints: [
        { label: 'Synthetisch, strombasiert', keywords: ['synthetisch', 'strom'] },
        { label: 'Wasserstoff aus Elektrolyse', keywords: ['wasserstoff', 'elektrolyse'] },
        { label: 'CO₂ als Ausgangsstoff', keywords: ['co2', 'co₂'] },
        { label: 'Erneuerbare Energie', keywords: ['erneuerbar', 'regenerativ', 'ökostrom'] },
        { label: 'Bewertung (CO₂-neutral, teuer)', keywords: ['neutral', 'teuer', 'energieintensiv', 'aufwendig'] }
      ],
      followUps: ['Welche Nachteile haben E-Fuels gegenüber dem direkten Einsatz von Strom?']
    }),
    t('Biodiesel', {
      group: 'Kraftstoffe & Betriebsmittel',
      question: 'Ein Fahrschüler fragt Sie zum Biodiesel: Was ist zu beachten, wie ist die Schadstoffbilanz und kann Biodiesel herkömmlichen Diesel komplett ersetzen?',
      explanation: 'Biodiesel wird meist aus Rapsöl hergestellt. Er darf nur getankt werden, wenn der Hersteller ihn freigibt, weil er Dichtungen angreifen und das Motoröl verdünnen kann.',
      example: 'Lassen Sie den Schüler in der Betriebsanleitung nachsehen, ob B7 oder B100 freigegeben ist.',
      modelAnswer: 'a) Zu beachten: Biodiesel (z. B. Rapsölmethylester) darf rein nur verwendet werden, wenn der Hersteller ihn freigegeben hat. Er kann Kunststoffe und Dichtungen im Kraftstoffsystem angreifen, löst Ablagerungen (Kraftstofffilter wechseln) und verdünnt das Motoröl, daher etwa halbierte Ölwechselintervalle. b) Die Schadstoffbilanz ist überwiegend besser: deutlich weniger Partikel und kein Schwefel, bilanziell weniger CO₂; Stickoxide liegen ähnlich oder etwas höher. c) Nein – die Anbauflächen reichen nicht, es gibt Flächenkonkurrenz zur Nahrungsmittelproduktion, und nicht alle Motoren vertragen ihn.',
      keyPoints: [
        { label: 'Herstellerfreigabe', keywords: ['freigabe', 'hersteller', 'freigegeben'] },
        { label: 'Greift Dichtungen/Kunststoffe an', keywords: ['dichtung', 'kunststoff', 'schläuche'] },
        { label: 'Kürzere Ölwechselintervalle / Filter', keywords: ['ölwechsel', 'filter', 'ölverdünnung'] },
        { label: 'Bessere Bilanz (Partikel, CO₂)', keywords: ['partikel', 'besser', 'co2', 'co₂', 'schwefel'] },
        { label: 'Kein vollständiger Ersatz (Fläche, Verfügbarkeit)', keywords: ['nein', 'fläche', 'verfügbar', 'nahrung'] }
      ],
      followUps: ['Was bedeutet B7 an der Zapfsäule?']
    }),
    t('Betriebsmittel', {
      group: 'Kraftstoffe & Betriebsmittel',
      difficulty: 1,
      question: 'Nennen Sie die wichtigsten Betriebsmittel eines Kfz, wie sie kontrolliert werden und welche Folgen Mängel für Fahrzeug, Umwelt und Gesundheit haben.',
      explanation: 'Betriebsmittel sind alle Flüssigkeiten, die ein Auto braucht: Kraftstoff, Öl, Kühlmittel, Bremsflüssigkeit und Wischwasser. Sie müssen regelmäßig kontrolliert werden.',
      example: 'Bei der Abfahrtkontrolle zeigen Sie dem Schüler unter der Motorhaube alle Ausgleichsbehälter mit Min-/Max-Markierung.',
      modelAnswer: 'Wichtige Betriebsmittel sind Kraftstoff, Motoröl, Kühlmittel, Bremsflüssigkeit, Scheibenwaschwasser, bei Dieseln AdBlue und das Kältemittel der Klimaanlage. Kontrolle: Ölpeilstab bzw. Bordcomputer, Ausgleichsbehälter mit Min-/Max-Markierung für Kühlmittel und Bremsflüssigkeit, Tankanzeige, Warnleuchten. Folgen von Mängeln reichen von Sichtbehinderung (Wischwasser) über Überhitzung und Motorschaden (Öl, Kühlmittel) bis zum Bremsversagen. Umwelt und Gesundheit: Öl, Kraftstoff, Glykol und Bremsflüssigkeit sind giftig, verschmutzen Boden und Wasser und können Haut und Atemwege schädigen; Altöl und Flüssigkeiten müssen fachgerecht entsorgt werden.',
      keyPoints: [
        { label: 'Öl, Kühlmittel, Bremsflüssigkeit', keywords: ['öl', 'kühlmittel', 'bremsflüssigkeit'] },
        { label: 'Kraftstoff, Wischwasser, AdBlue', keywords: ['kraftstoff', 'wischwasser', 'waschwasser', 'adblue'] },
        { label: 'Kontrolle (Peilstab, Min/Max, Anzeigen)', keywords: ['peilstab', 'min', 'max', 'anzeige', 'warnleuchte'] },
        { label: 'Folgen am Fahrzeug (Motorschaden, Bremsversagen)', keywords: ['motorschaden', 'bremsversagen', 'überhitz'] },
        { label: 'Umwelt/Gesundheit, Entsorgung', keywords: ['umwelt', 'gesundheit', 'giftig', 'entsorg'] }
      ],
      followUps: ['Warum muss Bremsflüssigkeit regelmäßig gewechselt werden?']
    }),

    // ---------------------------------------------------------------- Motor
    t('Aufgaben und Kreislauf des Motoröls', {
      group: 'Motor',
      question: 'Welche Aufgaben hat das Motoröl, wie wird die Ölmenge kontrolliert, wie gelangt das Öl an die Schmierstellen und wie wird es gereinigt?',
      explanation: 'Öl schmiert, kühlt, reinigt, dichtet und schützt den Motor. Eine Pumpe drückt es durch den Motor, ein Filter hält Schmutz zurück.',
      example: 'Lassen Sie den Schüler bei warmem Motor auf ebener Fläche den Ölstand am Peilstab messen.',
      modelAnswer: 'Aufgaben: Schmieren und damit Verschleiß mindern, Kühlen, Reinigen (Abtransport von Abrieb und Verbrennungsrückständen), Feinabdichten zwischen Kolbenringen und Zylinder, Korrosionsschutz und Geräuschdämpfung. Kontrolle über den Ölpeilstab (auf ebener Fläche, einige Minuten nach Abstellen) oder den Bordcomputer. Eine Ölpumpe fördert das Öl aus der Ölwanne durch den Ölfilter über Kanäle zu Kurbelwelle, Nockenwelle und weiteren Schmierstellen (Druckumlaufschmierung). Der Ölfilter hält Ruß, Abrieb und andere Partikel zurück. Beim Nachfüllen und Wechseln Herstellervorgabe, Viskosität (SAE-Klasse) und Spezifikation beachten; Altöl fachgerecht entsorgen.',
      keyPoints: [
        { label: 'Schmieren/Verschleißminderung', keywords: ['schmier', 'verschleiß'] },
        { label: 'Kühlen, Reinigen', keywords: ['kühl', 'reinig'] },
        { label: 'Abdichten, Korrosionsschutz', keywords: ['dicht', 'korrosion'] },
        { label: 'Kontrolle per Peilstab', keywords: ['peilstab', 'bordcomputer'] },
        { label: 'Ölpumpe / Druckumlauf', keywords: ['pumpe', 'druckumlauf', 'kreislauf'] },
        { label: 'Ölfilter', keywords: ['filter'] },
        { label: 'Herstellervorgabe, SAE, Entsorgung', keywords: ['hersteller', 'sae', 'spezifikation', 'entsorg'] }
      ],
      followUps: ['Was bedeutet die Angabe 0W-30?']
    }),
    t('Arten von Motorölen und Ölwechsel', {
      group: 'Motor',
      question: 'Welche Arten von Motorölen unterscheidet man und warum muss das Motoröl gewechselt werden?',
      explanation: 'Es gibt mineralische, teilsynthetische und vollsynthetische Öle sowie Einbereichs- und Mehrbereichsöle. Öl altert und verschmutzt, deshalb muss es regelmäßig gewechselt werden.',
      example: 'Zeigen Sie dem Schüler die Ölangabe in der Betriebsanleitung und erklären Sie, was „5W-30“ bedeutet.',
      modelAnswer: 'Nach Grundöl unterscheidet man Mineralöle, teilsynthetische und vollsynthetische Öle; Leichtlauföle sind dünnflüssig und senken Reibung und Verbrauch. Nach Viskosität gibt es Einbereichsöle und die heute üblichen Mehrbereichsöle, z. B. SAE 5W-30: Die Zahl vor dem W beschreibt das Kaltverhalten (W = Winter), die zweite Zahl die Viskosität bei Betriebstemperatur. Dazu kommen Spezifikationen und Herstellerfreigaben (z. B. ACEA, Longlife). Wechseln muss man das Öl, weil es altert und oxidiert, durch Ruß, Abrieb und Kraftstoff verunreinigt bzw. verdünnt wird und die Additive verbraucht werden – dadurch lässt die Schmierwirkung nach.',
      keyPoints: [
        { label: 'Mineral-, teil-, vollsynthetisch', keywords: ['mineral', 'synthetisch'] },
        { label: 'Leichtlauföl', keywords: ['leichtlauf'] },
        { label: 'Einbereichs-/Mehrbereichsöl, SAE', keywords: ['mehrbereich', 'einbereich', 'sae', 'viskosität'] },
        { label: 'Alterung/Oxidation', keywords: ['alter', 'oxid'] },
        { label: 'Verschmutzung/Verdünnung', keywords: ['verschmutz', 'ruß', 'abrieb', 'verdünn'] },
        { label: 'Additive verbraucht', keywords: ['additiv', 'zusätze'] }
      ],
      followUps: ['Welche Folgen hat zu wenig Motoröl?']
    }),
    t('Getriebeöl und Motoröl', {
      group: 'Motor',
      question: 'Welche Aufgaben haben Getriebeöle im Vergleich zu Motorölen?',
      explanation: 'Getriebeöl schmiert vor allem die Zahnräder unter hohem Druck und kühlt. In Automatikgetrieben überträgt es auch Kraft und steuert die Schaltung.',
      example: 'Fragen Sie im Unterricht: Warum muss Getriebeöl viel seltener gewechselt werden als Motoröl?',
      modelAnswer: 'Getriebeöl schmiert die Zahnräder und Lager unter hohem Flächendruck (mit Hochdruckzusätzen), kühlt, schützt vor Korrosion und dämpft Geräusche; in Automatikgetrieben (ATF) übernimmt es zusätzlich hydraulische Aufgaben wie Kraftübertragung im Wandler, Schaltung und Kupplungsbetätigung. Es ist nicht den Verbrennungsrückständen ausgesetzt und hat daher eine deutlich längere Lebensdauer, teils für die gesamte Fahrzeuglebensdauer. Motoröl schmiert, kühlt, reinigt, dichtet und schützt den Motor und muss wegen Verbrennungsrückständen und Alterung regelmäßig gewechselt werden.',
      keyPoints: [
        { label: 'Schmierung der Zahnräder (Hochdruck)', keywords: ['zahnr', 'hochdruck', 'druck'] },
        { label: 'Kühlung/Korrosionsschutz', keywords: ['kühl', 'korrosion'] },
        { label: 'Hydraulische Aufgaben bei Automatik (ATF)', keywords: ['hydraulisch', 'automatik', 'atf', 'wandler', 'schaltung'] },
        { label: 'Längere Lebensdauer', keywords: ['länger', 'lebensdauer', 'seltener'] },
        { label: 'Motoröl: schmieren, kühlen, reinigen, dichten', keywords: ['reinig', 'dicht'] }
      ],
      followUps: ['Was ist ATF?']
    }),
    t('Arbeitstakte des Motors', {
      group: 'Motor',
      difficulty: 1,
      question: 'Welche Arbeitstakte hat der Viertaktmotor?',
      explanation: 'Der Motor arbeitet in vier Schritten: Luft (bzw. Gemisch) ansaugen, zusammendrücken, verbrennen und Abgas hinausschieben.',
      example: 'Mit dem Merksatz „Saugen – Pressen – Zünden – Ausstoßen“ bleibt die Reihenfolge leicht hängen.',
      modelAnswer: 'Der Viertaktmotor arbeitet in vier Takten, die zwei Kurbelwellenumdrehungen dauern: 1. Ansaugen – der Kolben bewegt sich nach unten, das Einlassventil ist offen, Gemisch (Otto) bzw. Luft (Diesel) strömt ein. 2. Verdichten – beide Ventile geschlossen, der Kolben verdichtet. 3. Arbeiten – Zündung durch die Zündkerze (Otto) bzw. Selbstzündung des eingespritzten Kraftstoffs (Diesel); der Verbrennungsdruck drückt den Kolben nach unten. 4. Ausstoßen – das Auslassventil öffnet, der Kolben schiebt die Abgase hinaus.',
      keyPoints: [
        { label: 'Ansaugen', keywords: ['ansaugen', 'saugen'] },
        { label: 'Verdichten', keywords: ['verdicht', 'pressen'] },
        { label: 'Arbeiten/Verbrennen', keywords: ['arbeit', 'verbrenn', 'zünd'] },
        { label: 'Ausstoßen', keywords: ['ausstoß', 'auspuffen'] },
        { label: 'Otto: Fremdzündung / Diesel: Selbstzündung', keywords: ['zündkerze', 'selbstzündung', 'fremdzündung'] }
      ],
      followUps: ['Was ist der Unterschied zwischen Otto- und Dieselmotor?']
    }),
    t('Ventilüberschneidung', {
      group: 'Motor',
      question: 'Was ist Ventilüberschneidung?',
      explanation: 'Für einen kurzen Moment sind Ein- und Auslassventil gleichzeitig offen. Die frische Luft hilft dabei, die Abgase hinauszuschieben.',
      example: 'Zeigen Sie ein Steuerdiagramm und markieren Sie den Bereich, in dem beide Ventile offen sind.',
      modelAnswer: 'Ventilüberschneidung bedeutet, dass am Ende des Ausstoßtaktes und zu Beginn des Ansaugtaktes Einlass- und Auslassventil kurz gleichzeitig geöffnet sind. Die ausströmenden Abgase saugen dabei Frischgas bzw. Frischluft nach; dadurch wird der Brennraum besser gespült und die Füllung verbessert. Moderne Motoren verstellen die Überschneidung über eine variable Nockenwellenverstellung.',
      keyPoints: [
        { label: 'Einlass- und Auslassventil gleichzeitig offen', keywords: ['gleichzeitig', 'beide ventile', 'einlass', 'auslass'] },
        { label: 'Zwischen Ausstoßen und Ansaugen', keywords: ['ausstoß', 'ansaug', 'oberer totpunkt', 'ot'] },
        { label: 'Bessere Spülung/Füllung', keywords: ['spülung', 'füllung', 'spülen'] },
        { label: 'Nockenwellenverstellung', keywords: ['nockenwelle', 'verstell'] }
      ],
      followUps: ['Wozu dient eine variable Nockenwellenverstellung?']
    }),
    t('Kurbeltrieb', {
      group: 'Motor',
      difficulty: 1,
      question: 'Was ist der Kurbeltrieb und aus welchen Bauteilen besteht er?',
      explanation: 'Der Kurbeltrieb macht aus dem Auf und Ab der Kolben eine Drehbewegung – ähnlich wie beim Fahrradpedal.',
      example: 'Vergleichen Sie mit dem Fahrrad: Die Beine drücken auf und ab, die Kurbel dreht.',
      modelAnswer: 'Der Kurbeltrieb wandelt die geradlinige Hin- und Herbewegung der Kolben in eine Drehbewegung der Kurbelwelle um. Bauteile: Kolben mit Kolbenringen, Kolbenbolzen, Pleuelstange, Kurbelwelle und Schwungrad. Das Schwungrad speichert Bewegungsenergie und gleicht Drehungleichförmigkeiten aus.',
      keyPoints: [
        { label: 'Lineare Bewegung → Drehbewegung', keywords: ['drehbewegung', 'geradlinig', 'linear', 'umwandel', 'wandelt'] },
        { label: 'Kolben', keywords: ['kolben'] },
        { label: 'Pleuel', keywords: ['pleuel'] },
        { label: 'Kurbelwelle', keywords: ['kurbelwelle'] },
        { label: 'Schwungrad', keywords: ['schwungrad'] }
      ],
      followUps: ['Welche Aufgabe hat das Schwungrad?']
    }),
    t('Drosselklappe', {
      group: 'Motor',
      question: 'Welche Aufgabe hat die Drosselklappe?',
      explanation: 'Beim Benziner bestimmt die Drosselklappe, wie viel Luft in den Motor kommt – und damit, wie viel Leistung er abgibt. Gesteuert wird sie heute elektronisch über das Gaspedal.',
      example: 'Erklären Sie dem Schüler, dass das Gaspedal nur einen „Leistungswunsch“ an das Steuergerät meldet.',
      modelAnswer: 'Die Drosselklappe sitzt im Ansaugtrakt des Ottomotors und regelt die angesaugte Luftmenge und damit die Gemischmenge im Brennraum (Quantitätsregelung). Der Fahrer gibt über das Gaspedal seinen Leistungswunsch vor; eine mechanische Verbindung gibt es heute nicht mehr, das Steuergerät verstellt die Klappe elektronisch über einen Drosselklappensteller (E-Gas). Beim Dieselmotor wird die Leistung dagegen über die eingespritzte Kraftstoffmenge geregelt (Qualitätsregelung).',
      keyPoints: [
        { label: 'Regelt Luft-/Gemischmenge', keywords: ['luftmenge', 'gemisch', 'menge'] },
        { label: 'Quantitätsregelung', keywords: ['quantität'] },
        { label: 'Leistungswunsch über Gaspedal', keywords: ['gaspedal', 'leistungswunsch'] },
        { label: 'Elektronisch (E-Gas), keine mechanische Verbindung', keywords: ['elektronisch', 'e-gas', 'steller', 'keine mechanische'] },
        { label: 'Diesel: Qualitätsregelung', keywords: ['diesel', 'qualität'] }
      ],
      followUps: ['Was passiert bei einem Defekt des Drosselklappenstellers?']
    }),
    t('Motorschmierung', {
      group: 'Motor',
      question: 'Welche Aufgabe hat das Schmiersystem bzw. die Motorschmierung?',
      explanation: 'Das Schmiersystem versorgt alle bewegten Teile mit genug Öl. Dadurch reiben die Teile nicht direkt aufeinander.',
      example: 'Erklären Sie die Öldruckkontrollleuchte: Leuchtet sie während der Fahrt, sofort anhalten und Motor abstellen.',
      modelAnswer: 'Das Schmiersystem versorgt alle beweglichen Motorteile mit ausreichend Öl unter Druck. Aufgaben der Motorschmierung: Reibung und Verschleiß mindern, Motorbauteile kühlen, Ablagerungen, Verbrennungsrückstände und Abrieb zum Ölfilter abführen, feinabdichten, vor Korrosion schützen und Geräusche sowie Schwingungen dämpfen. Die Öldruckkontrollleuchte warnt bei zu geringem Öldruck – dann sofort anhalten und den Motor abstellen.',
      keyPoints: [
        { label: 'Ausreichende Ölversorgung', keywords: ['versorg', 'ausreichend'] },
        { label: 'Reibung/Verschleiß mindern', keywords: ['reibung', 'verschleiß'] },
        { label: 'Kühlen', keywords: ['kühl'] },
        { label: 'Rückstände zum Filter abführen', keywords: ['filter', 'rückstände', 'abrieb', 'ablagerung'] },
        { label: 'Abdichten, Korrosionsschutz, Dämpfung', keywords: ['dicht', 'korrosion', 'dämpf'] },
        { label: 'Öldruckkontrollleuchte', keywords: ['öldruck', 'kontrollleuchte'] }
      ],
      followUps: ['Was tun Sie, wenn die Öldruckleuchte während der Fahrt aufleuchtet?']
    }),
    t('Motorkühlung', {
      group: 'Motor',
      question: 'Welche Aufgaben hat die Motorkühlung und wie ist sie aufgebaut?',
      explanation: 'Die Kühlung sorgt dafür, dass der Motor schnell warm wird und dann nicht zu heiß. Ein Thermostat steuert, ob das Kühlmittel durch den Kühler fließt.',
      example: 'Die Temperaturanzeige steigt im Stau in den roten Bereich – besprechen Sie, was der Schüler tun soll.',
      modelAnswer: 'Die Motorkühlung soll die Betriebstemperatur schnell erreichen, eine möglichst konstante Temperatur halten, Schmierstoffe und Bauteile vor Überhitzung schützen und die Temperatur im Verbrennungsraum begrenzen. Bauteile der Flüssigkeitskühlung: Wasserpumpe, Thermostat (schaltet zwischen kleinem und großem Kühlkreislauf), Kühler, Lüfter, Ausgleichsbehälter und Schläuche. Das Kühlmittel enthält Frost- und Korrosionsschutz. Bei Überhitzung: anhalten, Motor abstellen, Kühlmittelbehälter erst nach Abkühlen öffnen.',
      keyPoints: [
        { label: 'Schnell auf Betriebstemperatur', keywords: ['betriebstemperatur', 'schnell'] },
        { label: 'Konstante Temperatur, Schutz vor Überhitzung', keywords: ['konstant', 'überhitz'] },
        { label: 'Thermostat (kleiner/großer Kreislauf)', keywords: ['thermostat', 'kreislauf'] },
        { label: 'Wasserpumpe, Kühler, Lüfter', keywords: ['pumpe', 'kühler', 'lüfter'] },
        { label: 'Frostschutz/Ausgleichsbehälter', keywords: ['frost', 'ausgleichsbehälter'] }
      ],
      followUps: ['Warum darf man den Kühlerdeckel bei heißem Motor nicht öffnen?']
    }),
    t('Abgasturbolader und Downsizing', {
      group: 'Motor',
      question: 'Wie funktioniert der Abgasturbolader und was versteht man unter Downsizing?',
      explanation: 'Der Turbolader nutzt die Energie der Abgase, um mehr Luft in den Motor zu pressen. So kann ein kleinerer Motor die gleiche Leistung bringen – das nennt man Downsizing.',
      example: 'Erklären Sie das „Turboloch“: Beim Anfahren reagiert der Motor erst etwas verzögert.',
      modelAnswer: 'Beim Abgasturbolader treibt der Abgasstrom ein Turbinenrad an, das über eine Welle mit einem Verdichterrad verbunden ist. Der Verdichter presst mehr Luft in die Zylinder, ein Ladeluftkühler kühlt sie; so kann mehr Kraftstoff verbrannt werden und die Leistung steigt. Er nutzt Abgasenergie, die sonst ungenutzt verloren ginge, und braucht keine Antriebsleistung vom Motor. Downsizing bedeutet, den Hubraum zu verkleinern und die Leistung durch Aufladung zu halten; die Literleistung steigt, Reibung und Verbrauch sinken. Nachteil kann ein verzögertes Ansprechen (Turboloch) sein.',
      keyPoints: [
        { label: 'Abgas treibt Turbine', keywords: ['abgas', 'turbine'] },
        { label: 'Verdichter presst mehr Luft', keywords: ['verdichter', 'mehr luft', 'luft'] },
        { label: 'Mehr Leistung ohne Antriebsleistung', keywords: ['leistung', 'ungenutzt', 'keine antriebs'] },
        { label: 'Downsizing: kleiner Hubraum, gleiche Leistung', keywords: ['hubraum', 'kleiner', 'gleiche leistung', 'verkleiner'] },
        { label: 'Literleistung steigt, Verbrauch sinkt', keywords: ['literleistung', 'verbrauch'] }
      ],
      followUps: ['Was ist ein Ladeluftkühler?']
    }),
    t('Schubabschaltung', {
      group: 'Motor',
      difficulty: 1,
      question: 'Was ist Schubabschaltung?',
      explanation: 'Wenn man mit eingelegtem Gang rollt und kein Gas gibt, spritzt der Motor keinen Kraftstoff ein. Das spart Sprit.',
      example: 'Zeigen Sie die Momentanverbrauchsanzeige: Beim Rollen im Gang steht sie auf 0 l/100 km.',
      modelAnswer: 'Bei der Schubabschaltung sorgt die Motorelektronik dafür, dass bei eingelegtem Gang, rollendem Fahrzeug und nicht betätigtem Gaspedal kein Kraftstoff eingespritzt wird. Kurz vor Erreichen der Leerlaufdrehzahl wird wieder eingespritzt, damit der Motor nicht ausgeht. Deshalb ist Ausrollen im Gang sparsamer als im Leerlauf, und die Motorbremse wird genutzt.',
      keyPoints: [
        { label: 'Keine Einspritzung im Schub', keywords: ['kein kraftstoff', 'keine einspritzung', 'nicht eingespritzt', 'kraftstoffzufuhr'] },
        { label: 'Gang eingelegt, Gaspedal nicht betätigt', keywords: ['gang', 'gaspedal', 'rollen'] },
        { label: 'Wiedereinsetzen vor Leerlaufdrehzahl', keywords: ['leerlauf'] },
        { label: 'Sparsamer als Rollen im Leerlauf', keywords: ['spar', 'verbrauch'] }
      ],
      followUps: ['Warum ist Rollen im Leerlauf bergab ungünstig?']
    }),
    t('On-Board-Diagnose', {
      group: 'Motor',
      question: 'Welche Funktion hat die On-Board-Diagnose (OBD)?',
      explanation: 'Die OBD überwacht während der Fahrt die Abgassysteme und wichtige Steuergeräte. Fehler zeigt sie mit einer Kontrollleuchte an und speichert sie.',
      example: 'Die gelbe Motorkontrollleuchte geht an. Besprechen Sie: weiterfahren, aber zeitnah in die Werkstatt.',
      modelAnswer: 'Die On-Board-Diagnose überwacht während der Fahrt alle abgasrelevanten Systeme und Komponenten über Sensoren, z. B. Lambdasonden, Katalysator und Zündung, sowie weitere wichtige Steuergeräte. Erkannte Fehler werden dem Fahrer über die Motorkontrollleuchte (MIL, Malfunction Indicator Light) angezeigt und im Fehlerspeicher abgelegt. Die Werkstatt kann sie über die OBD-Schnittstelle auslesen; auch die Abgasuntersuchung nutzt sie.',
      keyPoints: [
        { label: 'Überwacht abgasrelevante Systeme', keywords: ['abgas', 'überwach'] },
        { label: 'Sensoren/Steuergeräte', keywords: ['sensor', 'steuergerät'] },
        { label: 'Motorkontrollleuchte (MIL)', keywords: ['kontrollleuchte', 'mil', 'warnleuchte'] },
        { label: 'Fehlerspeicher', keywords: ['speicher', 'gespeichert'] },
        { label: 'Auslesen in der Werkstatt', keywords: ['auslesen', 'werkstatt', 'schnittstelle'] }
      ],
      followUps: ['Was bedeutet eine blinkende Motorkontrollleuchte?']
    }),
    t('Drehmoment', {
      group: 'Motor',
      difficulty: 1,
      question: 'Was ist Drehmoment?',
      explanation: 'Drehmoment ist die „Drehkraft“: Kraft mal Hebelarm. Ein langer Schraubenschlüssel erzeugt mit gleicher Kraft mehr Drehmoment.',
      example: 'Beim Radwechsel spürt der Schüler: Mit dem langen Radkreuz lösen sich die Muttern leichter.',
      modelAnswer: 'Das Drehmoment ist die Wirkung einer Kraft, die einen Körper in Drehung versetzt. Es ergibt sich aus Kraft mal Hebelarm (M = F × r) und wird in Newtonmeter (Nm) angegeben. Beim Motor beschreibt es die Durchzugskraft; die Leistung ergibt sich aus Drehmoment und Drehzahl.',
      keyPoints: [
        { label: 'Kraft, die eine Drehung bewirkt', keywords: ['drehung', 'dreh'] },
        { label: 'Kraft × Hebelarm', keywords: ['hebel', 'kraft mal', 'f × r', 'f x r'] },
        { label: 'Einheit Newtonmeter', keywords: ['newtonmeter', 'nm'] },
        { label: 'Leistung = Drehmoment × Drehzahl', keywords: ['drehzahl', 'leistung'] }
      ],
      followUps: ['Warum haben Elektromotoren schon aus dem Stand ein hohes Drehmoment?']
    }),
    t('Technische Maßnahmen zur CO₂-Reduzierung', {
      group: 'Motor',
      question: 'Welche technischen Maßnahmen zur Reduzierung von CO₂ kennen Sie?',
      explanation: 'Weniger Verbrauch heißt weniger CO₂. Hersteller erreichen das über effizientere Motoren, weniger Widerstand und Elektrifizierung.',
      example: 'Vergleichen Sie zwei Fahrzeuge im Datenblatt: Welche Technik erklärt den Verbrauchsunterschied?',
      modelAnswer: 'Maßnahmen sind z. B. Direkteinspritzung, Nockenwellenverstellung, Downsizing mit Aufladung, Zylinderabschaltung, Start-Stopp-Automatik, Schubabschaltung, Rekuperation und Hybridisierung, Leichtlauföle, rollwiderstandsoptimierte Reifen, Leichtbau, verbesserte Aerodynamik sowie alternative Antriebe und Kraftstoffe.',
      keyPoints: [
        { label: 'Motortechnik (Direkteinspritzung, Downsizing, Zylinderabschaltung)', keywords: ['direkteinspritzung', 'downsizing', 'zylinderabschaltung', 'nockenwelle'] },
        { label: 'Start-Stopp/Schubabschaltung', keywords: ['start-stopp', 'start stopp', 'schubabschaltung'] },
        { label: 'Rekuperation/Hybrid', keywords: ['rekuperation', 'hybrid'] },
        { label: 'Reifen/Leichtlauföl', keywords: ['reifen', 'leichtlauf', 'rollwiderstand'] },
        { label: 'Aerodynamik/Leichtbau', keywords: ['aerodynamik', 'leichtbau', 'gewicht'] },
        { label: 'Alternative Antriebe', keywords: ['alternativ', 'elektro'] }
      ],
      followUps: ['Was kann der Fahrer selbst tun, um CO₂ zu sparen?']
    }),

    // ---------------------------------------------------------------- Abgas und Umwelt
    t('Abgasanlage und Schalldämpfer', {
      group: 'Abgas & Umwelt',
      question: 'Welche Aufgaben hat die Abgasanlage und wie funktioniert ein Schalldämpfer?',
      explanation: 'Die Abgasanlage leitet die Abgase ab, reinigt sie und macht den Motor leiser. Schalldämpfer schlucken, reflektieren oder überlagern Schallwellen.',
      example: 'Ein lauter Auspuff kann auf ein Loch hinweisen – dann können Abgase in den Innenraum gelangen.',
      modelAnswer: 'Die Abgasanlage leitet die Abgase ins Freie, reinigt sie von Schadstoffen (Katalysator, Partikelfilter), dämpft Geräusche und schützt den Fahrgastraum vor Abgasen. Schalldämpfer arbeiten nach drei Prinzipien: Absorption – schallschluckende Materialien wie Mineralwolle wandeln Schallenergie in Wärme; Reflexion – Schallwellen prallen an Wänden und Kammern ab und verlieren Energie; Interferenz – Teile des Abgasstroms werden so umgelenkt, dass sich Schallwellen teilweise gegenseitig aufheben.',
      keyPoints: [
        { label: 'Abgase ableiten', keywords: ['ableit', 'ins freie'] },
        { label: 'Schadstoffe reinigen', keywords: ['schadstoff', 'reinig', 'katalysator'] },
        { label: 'Geräusche dämpfen', keywords: ['geräusch', 'lärm', 'dämpf'] },
        { label: 'Fahrgastraum schützen', keywords: ['fahrgastraum', 'innenraum'] },
        { label: 'Absorption', keywords: ['absorption', 'schallschluck'] },
        { label: 'Reflexion', keywords: ['reflexion'] },
        { label: 'Interferenz', keywords: ['interferenz', 'aufheben', 'überlagern'] }
      ],
      followUps: ['Woran erkennen Sie eine defekte Abgasanlage?']
    }),
    t('Lambdasonde', {
      group: 'Abgas & Umwelt',
      question: 'Welche Aufgabe hat die Lambdasonde?',
      explanation: 'Die Lambdasonde misst, wie viel Sauerstoff im Abgas ist. Damit kann das Steuergerät das Gemisch so einstellen, dass der Katalysator optimal arbeitet.',
      example: 'Bei defekter Lambdasonde leuchtet die Motorkontrollleuchte, der Verbrauch steigt – die Werkstatt muss ran.',
      modelAnswer: 'Die Lambdasonde sitzt im Abgasstrang vor (und zur Überwachung oft auch hinter) dem Katalysator. Sie misst den Restsauerstoffgehalt im Abgas und vergleicht ihn mit dem Sauerstoffgehalt der Umgebungsluft. Aus dem Signal regelt das Motorsteuergerät das Kraftstoff-Luft-Gemisch auf Lambda = 1 (stöchiometrisches Verhältnis), bei dem der geregelte Drei-Wege-Katalysator am besten arbeitet.',
      keyPoints: [
        { label: 'Misst Restsauerstoff im Abgas', keywords: ['restsauerstoff', 'sauerstoff'] },
        { label: 'Vergleich mit Umgebungsluft', keywords: ['umgebungsluft', 'vergleich'] },
        { label: 'Regelung des Gemischs', keywords: ['gemisch', 'regel', 'steuergerät'] },
        { label: 'Lambda = 1 für Katalysator', keywords: ['lambda', 'katalysator', 'kat', 'stöchiometrisch'] }
      ],
      followUps: ['Was bedeutet Lambda kleiner bzw. größer 1?']
    }),
    t('Kurbelgehäuseentlüftung', {
      group: 'Abgas & Umwelt',
      question: 'Welchen Nutzen hat die Kurbelgehäuseentlüftung?',
      explanation: 'Ein Teil der Verbrennungsgase drückt am Kolben vorbei ins Kurbelgehäuse. Die Entlüftung führt diese schadstoffhaltigen Gase zurück zum Ansaugtrakt, damit kein Überdruck entsteht und sie nicht ins Freie gelangen.',
      example: 'Bei verstopfter Entlüftung kann Öl an Dichtungen austreten – ein typischer Werkstattfall.',
      modelAnswer: 'Im Betrieb gelangen Verbrennungsgase (Blow-by-Gase) zwischen Kolben und Zylinderwand in das Kurbelgehäuse. Sie enthalten Schadstoffe, vermischen sich mit Ölnebel und erzeugen Überdruck. Die Kurbelgehäuseentlüftung führt diese Gase, meist über einen Ölabscheider, dem Ansaugsystem zu, wo sie mitverbrannt werden. So wird Überdruck im Kurbelgehäuse verhindert, Öl zurückgehalten und es gelangen keine Schadstoffe direkt in die Umwelt.',
      keyPoints: [
        { label: 'Blow-by-Gase', keywords: ['blow-by', 'blow by', 'verbrennungsgase'] },
        { label: 'Überdruck verhindern', keywords: ['überdruck', 'druck'] },
        { label: 'Rückführung ins Ansaugsystem', keywords: ['ansaug', 'zurück', 'zugeführt', 'verbrannt'] },
        { label: 'Schadstoffe nicht in die Umwelt', keywords: ['schadstoff', 'umwelt'] }
      ],
      followUps: ['Was ist ein Ölabscheider?']
    }),
    t('Abgasrückführung (AGR)', {
      group: 'Abgas & Umwelt',
      question: 'Was versteht man unter Abgasrückführung?',
      explanation: 'Ein Teil des Abgases wird gekühlt und wieder in die Ansaugluft gemischt. Dadurch verbrennt der Motor etwas kühler und es entstehen weniger Stickoxide.',
      example: 'Erklären Sie im Unterricht, warum die AGR bei Volllast abgeschaltet wird: Dann braucht der Motor möglichst viel Sauerstoff.',
      modelAnswer: 'Bei der Abgasrückführung wird ein Teil des Abgases, meist gekühlt, über das AGR-Ventil wieder der Ansaugluft beigemischt. Das senkt die Verbrennungstemperatur und den Sauerstoffanteil, wodurch weniger Stickoxide (NOx) entstehen. Man unterscheidet Hochdruck- und Niederdruck-AGR. Die Rückführung erfolgt vor allem im Teillastbereich (bis zu etwa 40 % Abgasanteil); bei Volllast ist sie abgeschaltet.',
      keyPoints: [
        { label: 'Abgas wird der Ansaugluft beigemischt', keywords: ['ansaugluft', 'beigemischt', 'zurückgeführt', 'rückführ'] },
        { label: 'Gekühlt, über AGR-Ventil', keywords: ['gekühlt', 'ventil'] },
        { label: 'Senkt Verbrennungstemperatur', keywords: ['temperatur'] },
        { label: 'Weniger Stickoxide', keywords: ['stickoxid', 'nox'] },
        { label: 'Hoch-/Niederdruck, nicht bei Volllast', keywords: ['hochdruck', 'niederdruck', 'volllast', 'teillast'] }
      ],
      followUps: ['Welche Nachteile kann die AGR haben?']
    }),
    t('Geregelter Drei-Wege-Katalysator', {
      group: 'Abgas & Umwelt',
      question: 'Wie ist ein geregelter Drei-Wege-Katalysator aufgebaut, wie wirkt er und was vermitteln Sie Ihren Fahrschülern dazu?',
      explanation: 'Im Katalysator wandeln Edelmetalle drei Schadstoffe gleichzeitig in harmlosere Stoffe um: Kohlenmonoxid, Kohlenwasserstoffe und Stickoxide.',
      example: 'Merksatz für den Schüler: Nicht über trockenem Gras parken – der Kat wird mehrere hundert Grad heiß.',
      modelAnswer: 'Aufbau: Ein Keramik- oder Metallträger mit Wabenstruktur, darauf eine Zwischenschicht (Washcoat) zur Oberflächenvergrößerung und eine Edelmetallbeschichtung aus Platin, Palladium und Rhodium, eingebaut in ein Edelstahlgehäuse. Wirkung: Platin und Palladium oxidieren Kohlenmonoxid (CO) zu CO₂ und Kohlenwasserstoffe (HC) zu CO₂ und Wasser; Rhodium reduziert Stickoxide (NOx) zu Stickstoff. Er braucht Betriebstemperatur und ein über die Lambdasonde geregeltes Gemisch mit Lambda = 1. Für Fahrschüler: richtigen Kraftstoff tanken, nicht anschleppen oder anschieben, Zündaussetzer reparieren lassen (unverbrannter Kraftstoff zerstört den Kat), nicht über trockenem Gras parken, viele Kurzstrecken vermeiden.',
      keyPoints: [
        { label: 'Träger mit Wabenstruktur', keywords: ['wabe', 'träger', 'keramik'] },
        { label: 'Edelmetalle Platin, Palladium, Rhodium', keywords: ['platin', 'palladium', 'rhodium', 'edelmetall'] },
        { label: 'Oxidation CO und HC', keywords: ['oxid', 'kohlenmonoxid', 'co ', 'kohlenwasserstoff'] },
        { label: 'Reduktion NOx', keywords: ['redu', 'stickoxid', 'nox'] },
        { label: 'Lambda = 1 / Betriebstemperatur', keywords: ['lambda', 'temperatur'] },
        { label: 'Hinweise für Fahrschüler', keywords: ['anschleppen', 'anschieben', 'gras', 'kurzstrecke', 'zündaussetzer'] }
      ],
      followUps: ['Warum kann ein Dieselmotor keinen Drei-Wege-Kat für NOx nutzen?']
    }),
    t('Schadstoffreduzierung beim Dieselmotor', {
      group: 'Abgas & Umwelt',
      question: 'Wie funktioniert die Schadstoffreduzierung beim Dieselmotor (Oxidationskatalysator, Partikelfilter, Stickoxide)?',
      explanation: 'Der Diesel hat viel Sauerstoff im Abgas, deshalb funktioniert der normale Kat für Stickoxide nicht. Man braucht mehrere Systeme: Oxidationskat, Partikelfilter und für NOx die AGR plus SCR- oder Speicherkat.',
      example: 'Zeichnen Sie den Abgasstrang eines modernen Diesels mit allen Bauteilen von vorn nach hinten.',
      modelAnswer: 'Der Diesel-Oxidationskatalysator (Zwei-Wege-Kat) wandelt bis zu etwa 90 % von CO und HC in CO₂ und Wasser um, Stickoxide aber nicht. Ruß wird im Dieselpartikelfilter zurückgehalten. Stickoxide werden zuerst durch die Abgasrückführung vermindert und anschließend in einem NOx-Speicherkatalysator oder einem SCR-Katalysator mit AdBlue umgewandelt. Ein Drei-Wege-Kat funktioniert beim Diesel nicht, weil der Motor mit Luftüberschuss arbeitet.',
      keyPoints: [
        { label: 'Oxidationskat für CO/HC', keywords: ['oxidationskat', 'zwei-wege', '2-wege', 'co', 'hc'] },
        { label: 'Wandelt kein NOx um', keywords: ['keine stickoxid', 'kein nox', 'nicht nox', 'keine nox'] },
        { label: 'Partikelfilter für Ruß', keywords: ['partikelfilter', 'ruß', 'dpf'] },
        { label: 'AGR', keywords: ['abgasrückführung', 'agr'] },
        { label: 'SCR mit AdBlue oder NOx-Speicherkat', keywords: ['scr', 'adblue', 'speicherkat'] },
        { label: 'Luftüberschuss', keywords: ['luftüberschuss', 'sauerstoff', 'mager'] }
      ],
      followUps: ['Was ist AdBlue?']
    }),
    t('SCR-Katalysator und AdBlue', {
      group: 'Abgas & Umwelt',
      question: 'Wie funktioniert ein SCR-Katalysator und was ist AdBlue?',
      explanation: 'In das Abgas wird eine Harnstofflösung (AdBlue) gesprüht. Daraus entsteht Ammoniak, das die Stickoxide in harmlosen Stickstoff und Wasser umwandelt.',
      example: 'Die AdBlue-Warnung im Display: Ist der Tank leer, startet der Motor irgendwann nicht mehr. Erklären Sie, wo nachgefüllt wird.',
      modelAnswer: 'Beim SCR-Katalysator (selektive katalytische Reduktion) spritzt eine elektrisch gesteuerte Dosiereinheit bedarfsgerecht AdBlue in den Abgasstrom. Aus der Harnstofflösung entsteht im heißen Abgas Ammoniak, das im Katalysator die Stickoxide zu Stickstoff und Wasser reduziert; so werden etwa 80 bis 90 % der NOx entfernt. AdBlue ist eine wässrige Lösung aus 32,5 % Harnstoff und Wasser, gefriert bei etwa −11 °C (Leitungen und Tank werden beheizt) und der Verbrauch liegt bei rund 1 bis 4 % des Dieselverbrauchs. Ist der Tank leer, verhindert die Elektronik nach Vorwarnung den Neustart.',
      keyPoints: [
        { label: 'Einspritzung von AdBlue', keywords: ['eingespritzt', 'einspritz', 'dosier'] },
        { label: 'Ammoniak entsteht', keywords: ['ammoniak'] },
        { label: 'NOx → Stickstoff und Wasser', keywords: ['stickstoff', 'wasser'] },
        { label: '32,5 % Harnstofflösung', keywords: ['harnstoff', '32,5'] },
        { label: 'Gefriert bei −11 °C', keywords: ['11', 'gefrier', 'beheizt'] },
        { label: 'Verbrauch 1–4 % des Diesels', keywords: ['1-4', '1 bis 4', 'prozent des diesel', '% des diesel'] }
      ],
      followUps: ['Was passiert, wenn der AdBlue-Tank leer ist?']
    }),
    t('NOx-Speicherkatalysator', {
      group: 'Abgas & Umwelt',
      question: 'Wie funktioniert ein NOx-Speicherkatalysator?',
      explanation: 'Der Speicherkat saugt Stickoxide auf wie ein Schwamm. Ist er voll, wird er kurz mit fettem Gemisch „gereinigt“.',
      example: 'Vergleichen Sie im Unterricht: SCR braucht AdBlue, der Speicherkat braucht kurze Phasen mit fettem Gemisch.',
      modelAnswer: 'Der NOx-Speicherkatalysator speichert die Stickoxide im mageren Betrieb chemisch in seiner Beschichtung, ähnlich wie ein Schwamm. In regelmäßigen Abständen wird er regeneriert: Das Motorsteuergerät erzeugt kurzzeitig ein fettes Gemisch (z. B. durch Nacheinspritzung), wodurch die gespeicherten Stickoxide zu Stickstoff reduziert werden. Zur Erkennung des Beladungszustands und für die Regelung sind Temperatur-, Druck- bzw. NOx-Sensoren erforderlich.',
      keyPoints: [
        { label: 'Speichert NOx (Schwamm)', keywords: ['speicher', 'schwamm'] },
        { label: 'Regeneration mit fettem Gemisch', keywords: ['fett', 'regener', 'nacheinspritz'] },
        { label: 'Reduktion zu Stickstoff', keywords: ['stickstoff', 'reduz'] },
        { label: 'Sensoren erforderlich', keywords: ['sensor', 'temperatur', 'druck'] }
      ],
      followUps: ['Warum erhöht die Regeneration kurzzeitig den Verbrauch?']
    }),
    t('Dieselpartikelfilter und Rußausstoß', {
      group: 'Abgas & Umwelt',
      question: 'Wie funktioniert ein Partikelfilter, woher kommt der Ruß, brauchen nur Diesel einen Filter und welche Abgasfärbungen deuten auf welche Ursachen hin?',
      explanation: 'Der Filter hält Rußteilchen zurück und verbrennt sie regelmäßig bei hoher Temperatur. Auch moderne Benziner mit Direkteinspritzung haben inzwischen einen Partikelfilter.',
      example: 'Nach vielen Kurzstrecken meldet das Auto „Partikelfilter voll“. Empfehlen Sie eine längere Fahrt auf der Landstraße oder Autobahn.',
      modelAnswer: 'Ruß entsteht bei inhomogenem Kraftstoff-Luft-Gemisch, also bei örtlichem Luftmangel und niedrigen Brennraumtemperaturen. Der Partikelfilter besteht aus porösen Kanälen, die wechselseitig verschlossen sind: Die Gase strömen durch die Wände, die Rußpartikel bleiben hängen. Bei einem bestimmten Beladungsgrad wird der Filter regeneriert – passiv während normaler Fahrt oder aktiv durch Anheben der Abgastemperatur auf rund 600 °C – und der Ruß zu CO₂ verbrannt. Nicht nur Diesel: Seit einigen Jahren haben auch Benziner mit Direkteinspritzung Otto-Partikelfilter. Weitere Maßnahmen gegen Ruß: Einspritztechnik, Brennraumgestaltung, AGR-Regelung und ruhige Fahrweise. Abgasfarben: schwarz = Ruß durch zu fettes Gemisch oder Luftmangel; blau = verbranntes Motoröl; weiß = Wasserdampf beim Kaltstart oder Kühlmittel im Brennraum.',
      keyPoints: [
        { label: 'Ruß durch inhomogenes Gemisch/Luftmangel', keywords: ['inhomogen', 'luftmangel', 'gemisch'] },
        { label: 'Filter hält Partikel zurück', keywords: ['zurück', 'poren', 'wände', 'filter'] },
        { label: 'Regeneration (aktiv/passiv, ca. 600 °C)', keywords: ['regener', '600', 'frei brennen', 'freibrennen'] },
        { label: 'Auch Benziner (Otto-Partikelfilter)', keywords: ['benzin', 'otto'] },
        { label: 'Abgasfarben (schwarz/blau/weiß)', keywords: ['schwarz', 'blau', 'weiß'] }
      ],
      followUps: ['Warum sind viele Kurzstrecken für den Partikelfilter schlecht?']
    }),
    t('Umweltbelastungen durch den Straßenverkehr', {
      group: 'Abgas & Umwelt',
      question: 'Nennen Sie Umweltbelastungen durch den Straßenverkehr und wie der Kraftfahrer zur Vermeidung beitragen kann.',
      explanation: 'Verkehr belastet Luft, Klima, Boden und Menschen durch Abgase, Lärm und Flächenverbrauch. Jeder Fahrer kann durch seine Fahrweise etwas beitragen.',
      example: 'Lassen Sie die Gruppe im Unterricht zehn Spartipps sammeln und nach Wirkung sortieren.',
      modelAnswer: 'Belastungen: Natur- und Landschaftsverbrauch durch Straßenbau, Luftverschmutzung durch Abgase und Feinstaub (auch Reifen- und Bremsabrieb), Treibhausgase und Klimawandel, Lärm, Boden- und Gewässerverschmutzung durch Öl und Betriebsstoffe. Beitrag des Fahrers: richtiger Reifendruck, unnötige Verbraucher wie die Klimaanlage vermeiden, Gewicht und Dachaufbauten reduzieren, Motor bei längerem Stand abschalten, Kurzstrecken vermeiden, niedertourig und vorausschauend fahren, Motorbremse nutzen, Wartungsintervalle einhalten, Fahrgemeinschaften und andere Verkehrsmittel nutzen.',
      keyPoints: [
        { label: 'Flächen-/Landschaftsverbrauch', keywords: ['landschaft', 'fläche', 'straßenbau'] },
        { label: 'Luftverschmutzung/Feinstaub', keywords: ['luft', 'feinstaub', 'abgas'] },
        { label: 'Treibhausgase/Klima', keywords: ['treibhaus', 'klima', 'co2', 'co₂'] },
        { label: 'Lärm', keywords: ['lärm'] },
        { label: 'Maßnahmen des Fahrers', keywords: ['reifendruck', 'niedertourig', 'kurzstrecke', 'motor abschalten', 'vorausschauend'] }
      ],
      followUps: ['Welche Wirkung hat 0,5 bar zu wenig Reifendruck?']
    }),

    // ---------------------------------------------------------------- Kraftübertragung
    t('Antriebsstrang', {
      group: 'Kraftübertragung',
      difficulty: 1,
      question: 'Aus welchen Bauteilen besteht der Antriebsstrang und welche Funktion hat er? Skizzieren Sie den Kraftstrang eines Fahrzeugs mit Hinterradantrieb.',
      explanation: 'Der Antriebsstrang bringt die Kraft vom Motor zu den Rädern: Motor – Kupplung – Getriebe – Gelenkwelle – Differenzial – Antriebswellen – Räder.',
      example: 'Lassen Sie den Schüler den Weg der Kraft vom Gaspedal bis zum Reifen in eigenen Worten erzählen.',
      modelAnswer: 'Der Antriebsstrang überträgt Drehzahl und Drehmoment des Motors auf die Antriebsräder. Bauteile bei Hinterradantrieb: Motor (vorn), Kupplung, Schaltgetriebe, Gelenkwelle (Kardanwelle), Ausgleichsgetriebe (Differenzial) an der Hinterachse, Radantriebswellen (Achswellen) und Räder. Bei Frontantrieb sind Getriebe und Differenzial meist in einem Gehäuse zusammengefasst, die Gelenkwelle entfällt.',
      keyPoints: [
        { label: 'Überträgt Drehmoment/Drehzahl an die Räder', keywords: ['drehmoment', 'drehzahl', 'überträgt', 'übertragung'] },
        { label: 'Motor, Kupplung, Getriebe', keywords: ['kupplung', 'getriebe'] },
        { label: 'Gelenkwelle', keywords: ['gelenkwelle', 'kardan'] },
        { label: 'Ausgleichsgetriebe/Differenzial', keywords: ['ausgleich', 'differenzial', 'differential'] },
        { label: 'Antriebswellen, Räder', keywords: ['antriebswelle', 'achswelle', 'räder'] }
      ],
      followUps: ['Was ändert sich beim Frontantrieb?']
    }),
    t('Kupplung und Getriebe', {
      group: 'Kraftübertragung',
      question: 'Welche Aufgaben haben Kupplung und Getriebe?',
      explanation: 'Die Kupplung trennt und verbindet Motor und Getriebe – zum Anfahren und Schalten. Das Getriebe passt Drehzahl und Kraft an die Fahrsituation an.',
      example: 'Beim Anfahren am Berg erklärt der Schleifpunkt die Aufgabe der Kupplung besser als jede Theorie.',
      modelAnswer: 'Die Kupplung verbindet den Motor ruckfrei mit dem Getriebe (Anfahren), unterbricht den Kraftfluss zum Schalten und beim Anhalten und dämpft Drehschwingungen. Das Getriebe wandelt Drehzahl und Drehmoment des Motors durch verschiedene Übersetzungen, damit der Motor in jeder Fahrsituation im günstigen Drehzahlbereich arbeitet: kleine Gänge für viel Zugkraft beim Anfahren und am Berg, große Gänge für hohe Geschwindigkeit bei niedriger Drehzahl. Außerdem ermöglicht es Leerlauf und Rückwärtsfahrt.',
      keyPoints: [
        { label: 'Kupplung: ruckfrei verbinden (Anfahren)', keywords: ['anfahren', 'verbinden', 'ruckfrei'] },
        { label: 'Kupplung: Kraftfluss unterbrechen (Schalten)', keywords: ['unterbrech', 'trennen', 'schalten'] },
        { label: 'Getriebe: Drehmoment/Drehzahl wandeln', keywords: ['drehmoment', 'drehzahl', 'übersetzung', 'wandel'] },
        { label: 'Günstiger Drehzahlbereich', keywords: ['drehzahlbereich', 'günstig'] },
        { label: 'Leerlauf und Rückwärtsgang', keywords: ['leerlauf', 'rückwärts'] }
      ],
      followUps: ['Was ist der Schleifpunkt?']
    }),
    t('Ausgleichsgetriebe', {
      group: 'Kraftübertragung',
      difficulty: 1,
      question: 'Welche Aufgabe hat das Ausgleichsgetriebe (Differenzial)?',
      explanation: 'In der Kurve muss das äußere Rad einen weiteren Weg fahren als das innere. Das Differenzial lässt die Räder deshalb unterschiedlich schnell drehen.',
      example: 'Lassen Sie den Schüler eine Kurve abschreiten: Wer außen läuft, muss schneller gehen.',
      modelAnswer: 'Das Ausgleichsgetriebe gleicht die unterschiedlichen Drehzahlen der Räder an einer angetriebenen Achse aus, z. B. bei Kurvenfahrt, wenn das kurvenäußere Rad einen längeren Weg zurücklegt. Gleichzeitig verteilt es das Antriebsmoment auf beide Räder. Nachteil: Dreht ein Rad auf glattem Untergrund durch, geht viel Kraft verloren; dagegen helfen Differenzialsperren oder ASR.',
      keyPoints: [
        { label: 'Gleicht Drehzahlunterschiede aus', keywords: ['drehzahl', 'ausgleich', 'unterschiedlich'] },
        { label: 'Kurvenfahrt (außen längerer Weg)', keywords: ['kurve', 'kurvenäuß', 'außen'] },
        { label: 'Verteilt Antriebsmoment', keywords: ['verteilt', 'moment'] },
        { label: 'Differenzialsperre/ASR bei Glätte', keywords: ['sperre', 'asr', 'durchdreh'] }
      ],
      followUps: ['Was passiert ohne Differenzial in der Kurve?']
    }),
    t('Automatische Getriebe und Doppelkupplungsgetriebe', {
      group: 'Kraftübertragung',
      question: 'Wie werden automatische Getriebe unterteilt? Erläutern Sie das Funktionsprinzip des Doppelkupplungsgetriebes und seine Vorteile.',
      explanation: 'Es gibt automatisierte Schaltgetriebe, Doppelkupplungsgetriebe, Wandlerautomaten und stufenlose Getriebe. Das Doppelkupplungsgetriebe hat den nächsten Gang schon eingelegt und wechselt blitzschnell die Kupplung.',
      example: 'Bei der Ausbildung auf Automatik (B197) erklären Sie, warum man beim DSG kaum einen Schaltruck spürt.',
      modelAnswer: 'Automatische Getriebe: automatisierte Schaltgetriebe, Doppelkupplungsgetriebe (DSG/DKG), Vollautomaten mit hydrodynamischem Drehmomentwandler und Planetengetriebe sowie stufenlose Getriebe (CVT). Das Doppelkupplungsgetriebe besteht aus zwei Teilgetrieben mit je einer Kupplung – eines für die geraden, eines für die ungeraden Gänge. Während in einem Gang gefahren wird, ist der nächste im anderen Teilgetriebe bereits eingelegt; beim Schalten öffnet die eine Kupplung, während die andere schließt. Vorteile: sehr schnelle Gangwechsel ohne Zugkraftunterbrechung, hoher Wirkungsgrad und dadurch geringerer Verbrauch und Emissionen als beim Wandlerautomaten, hoher Komfort.',
      keyPoints: [
        { label: 'Arten: automatisiert, DSG, Wandler, CVT', keywords: ['automatisiert', 'wandler', 'cvt', 'stufenlos'] },
        { label: 'Zwei Teilgetriebe/zwei Kupplungen', keywords: ['zwei kupplungen', 'zwei teilgetriebe', '2 kupplungen', 'doppel'] },
        { label: 'Gerade/ungerade Gänge', keywords: ['gerade', 'ungerade'] },
        { label: 'Nächster Gang vorgewählt', keywords: ['vorgewählt', 'bereits eingelegt', 'gleichzeitig eingelegt', 'nächste gang'] },
        { label: 'Keine Zugkraftunterbrechung', keywords: ['zugkraft'] },
        { label: 'Verbrauch/Emissionen/Komfort', keywords: ['verbrauch', 'emission', 'komfort'] }
      ],
      followUps: ['Wie verhält sich ein Wandlerautomat beim Anhalten am Berg?']
    }),

    // ---------------------------------------------------------------- Fahrwerk und Lenkung
    t('Fahrwerk und Lenkgetriebe', {
      group: 'Fahrwerk & Lenkung',
      difficulty: 1,
      question: 'Aus welchen Komponenten besteht das Fahrwerk und welche Funktion hat das Lenkgetriebe?',
      explanation: 'Zum Fahrwerk gehört alles, was das Auto mit der Straße verbindet: Federung, Dämpfung, Lenkung, Bremsen, Radaufhängung, Räder und Reifen.',
      example: 'Bei der Abfahrtkontrolle drückt der Schüler eine Ecke des Autos herunter: Schwingt es nach, sind die Stoßdämpfer verdächtig.',
      modelAnswer: 'Zum Fahrwerk gehören Federung und Dämpfung (Federn, Stoßdämpfer), Lenkung, Bremsen, Radaufhängung (Achsen, Querlenker) sowie Räder und Reifen. Das Lenkgetriebe, meist eine Zahnstangenlenkung, überträgt die Drehbewegung des Lenkrads über die Lenksäule auf die Spurstangen und damit auf die gelenkten Räder; eine Servolenkung unterstützt die Lenkkraft hydraulisch oder elektrisch.',
      keyPoints: [
        { label: 'Federung und Dämpfung', keywords: ['feder', 'dämpf', 'stoßdämpfer'] },
        { label: 'Lenkung', keywords: ['lenkung'] },
        { label: 'Bremsen', keywords: ['bremse'] },
        { label: 'Radaufhängung, Räder/Reifen', keywords: ['radaufhängung', 'achse', 'reifen', 'räder'] },
        { label: 'Lenkgetriebe: Lenkrad → Spurstangen → Räder', keywords: ['spurstange', 'zahnstange', 'drehbewegung'] }
      ],
      followUps: ['Welche Folgen haben defekte Stoßdämpfer?']
    }),
    t('Spur und Reifenabnutzung', {
      group: 'Fahrwerk & Lenkung',
      question: 'Welche Aufgaben hat die Spur und welche Auswirkungen hat eine falsche Spureinstellung? Welche Ursachen hat ungleiche Reifenabnutzung?',
      explanation: 'Die Spur gibt an, ob die Vorderräder leicht nach innen (Vorspur) oder außen (Nachspur) zeigen. Falsche Einstellungen nutzen die Reifen einseitig ab.',
      example: 'Lassen Sie den Schüler das Profil der Vorderreifen innen und außen vergleichen – ungleiche Abnutzung ist ein Fall für die Werkstatt.',
      modelAnswer: 'Die Spur verbessert den Geradeauslauf, baut Seitenführungskräfte am Reifen auf und verhindert Flattern bzw. das Ausnutzen von Gelenkspiel. Zu viel Vorspur (Räder vorn nach innen gestellt) führt zu Abnutzung an der Außenseite, Nachspur zu Abnutzung an der Innenseite und schwammigem Fahrverhalten. Ungleiche Abnutzung: innen stärker – Nachspur oder zu viel negativer Sturz; außen stärker – zu viel Vorspur, positiver Sturz oder schnelle Kurvenfahrten; beide Schultern stärker – zu geringer Luftdruck; Mitte stärker – zu hoher Luftdruck. Auch defekte Stoßdämpfer oder Unwucht führen zu ungleichmäßigem (fleckigem) Verschleiß.',
      keyPoints: [
        { label: 'Geradeauslauf/Seitenführung', keywords: ['geradeaus', 'seitenführung'] },
        { label: 'Vorspur → außen abgenutzt', keywords: ['vorspur'] },
        { label: 'Nachspur → innen abgenutzt', keywords: ['nachspur'] },
        { label: 'Luftdruck zu niedrig → Schultern', keywords: ['zu niedrig', 'zu gering', 'schulter', 'beide seiten'] },
        { label: 'Luftdruck zu hoch → Mitte', keywords: ['zu hoch', 'mitte'] },
        { label: 'Sturz/Stoßdämpfer/Unwucht', keywords: ['sturz', 'stoßdämpfer', 'unwucht'] }
      ],
      followUps: ['Wie prüfen Sie den richtigen Reifendruck?']
    }),
    t('Nachlauf, Spreizung und Lenkrollradius', {
      group: 'Fahrwerk & Lenkung',
      difficulty: 3,
      question: 'Was versteht man unter Nachlauf, Spreizung und Lenkrollradius?',
      explanation: 'Das sind Einstellwinkel der Lenkung. Sie sorgen dafür, dass das Auto stabil geradeaus fährt, die Lenkung von selbst zurückkommt und sich leicht lenken lässt.',
      example: 'Vergleichen Sie den Nachlauf mit dem Einkaufswagen: Das Rad läuft hinter der Drehachse her und stellt sich von selbst gerade.',
      modelAnswer: 'Nachlauf ist die Neigung der Lenkdrehachse gegenüber der Senkrechten in Fahrzeuglängsrichtung: Der Radaufstandspunkt liegt hinter dem Durchstoßpunkt der Lenkachse. Er stabilisiert den Geradeauslauf, stellt die Lenkung nach Kurven zurück und verhindert Flattern. Spreizung ist die Neigung der Lenkachse in Querrichtung zur Fahrzeugmitte hin; sie verkleinert den Hebelarm, an dem die Radkräfte angreifen, erleichtert das Einschlagen und unterstützt die Rückstellung. Der Lenkrollradius ist der Abstand zwischen der Mitte der Radaufstandsfläche und dem Durchstoßpunkt der Lenkachse durch die Fahrbahn; ein negativer Lenkrollradius stabilisiert das Fahrzeug beim Bremsen auf unterschiedlich griffiger Fahrbahn.',
      keyPoints: [
        { label: 'Nachlauf: Neigung in Längsrichtung', keywords: ['längsrichtung', 'längsachse'] },
        { label: 'Nachlauf: Geradeauslauf/Rückstellung', keywords: ['geradeaus', 'rückstell', 'zurück'] },
        { label: 'Spreizung: Neigung in Querrichtung', keywords: ['querrichtung', 'fahrzeugmitte', 'quer'] },
        { label: 'Spreizung: kleiner Hebelarm, leichteres Lenken', keywords: ['hebel', 'leicht'] },
        { label: 'Lenkrollradius: Abstand Radmitte – Lenkachse', keywords: ['abstand', 'durchstoß', 'aufstandsfläche'] },
        { label: 'Negativer Lenkrollradius stabilisiert beim Bremsen', keywords: ['negativ', 'bremsen'] }
      ],
      followUps: ['Warum stellt sich die Lenkung nach einer Kurve von selbst zurück?']
    }),
    t('Spurdifferenzwinkel', {
      group: 'Fahrwerk & Lenkung',
      question: 'Was versteht man unter dem Spurdifferenzwinkel?',
      explanation: 'In der Kurve fährt das innere Rad einen kleineren Kreis. Deshalb muss es etwas stärker eingeschlagen sein als das äußere.',
      example: 'Zeichnen Sie die beiden Radspuren in einer engen Kurve – der Unterschied wird sofort sichtbar.',
      modelAnswer: 'Bei Kurvenfahrt rollt das kurveninnere Vorderrad auf einem Kreis mit kleinerem Radius als das kurvenäußere. Damit beide Räder ohne Radieren abrollen, muss das innere Rad stärker eingeschlagen sein. Der Unterschied der beiden Lenkwinkel heißt Spurdifferenzwinkel; er wird durch die Anordnung des Lenktrapezes (Ackermann-Prinzip) erreicht.',
      keyPoints: [
        { label: 'Inneres Rad stärker eingeschlagen', keywords: ['innere', 'stärker eingeschlagen', 'kurveninnere'] },
        { label: 'Kleinerer Kreis innen', keywords: ['kleiner', 'radius'] },
        { label: 'Differenz der Lenkwinkel', keywords: ['differenz', 'unterschied', 'winkel'] },
        { label: 'Kein Radieren / Lenktrapez', keywords: ['radier', 'lenktrapez', 'ackermann'] }
      ],
      followUps: ['Was passiert, wenn der Spurdifferenzwinkel falsch eingestellt ist?']
    }),
    t('Auflaufbremse', {
      group: 'Fahrwerk & Lenkung',
      question: 'Skizzieren Sie eine Auflaufbremse, benennen Sie die wesentlichen Bauteile und beschreiben Sie die Wirkungsweise.',
      explanation: 'Wenn das Zugfahrzeug bremst, schiebt der Anhänger auf. Dabei wird die Zugdeichsel eingeschoben und betätigt über ein Gestänge die Bremsen des Anhängers.',
      example: 'Bei der BE-Ausbildung lassen Sie den Schüler das Abreißseil anlegen und erklären, wozu es dient.',
      modelAnswer: 'Bauteile: Zugeinrichtung mit Kugelkupplung und verschiebbarem Zugrohr (Auflaufeinrichtung), Stoßdämpfer, Übertragungshebel und Bremsgestänge bzw. Bowdenzüge, Ausgleichswaage, Radbremsen (meist Trommelbremsen) mit Rückfahrautomatik, Handbremshebel und Abreißseil. Wirkungsweise: Bremst das Zugfahrzeug, läuft der Anhänger auf; das Zugrohr wird gegen den Stoßdämpfer eingeschoben und betätigt über Umlenkhebel und Gestänge die Radbremsen des Anhängers. Der Dämpfer verhindert ein Ruckeln. Die Rückfahrautomatik lässt das Rückwärtsfahren zu. Reißt der Anhänger ab, betätigt das Abreißseil die Feststellbremse.',
      keyPoints: [
        { label: 'Zugrohr/Auflaufeinrichtung', keywords: ['zugrohr', 'auflaufeinrichtung', 'deichsel', 'zugeinrichtung'] },
        { label: 'Stoßdämpfer', keywords: ['dämpfer'] },
        { label: 'Gestänge/Bowdenzüge', keywords: ['gestänge', 'bowdenzug', 'hebel'] },
        { label: 'Radbremsen/Rückfahrautomatik', keywords: ['radbremse', 'trommel', 'rückfahr'] },
        { label: 'Anhänger läuft auf → Bremsen werden betätigt', keywords: ['aufläuft', 'auflaufen', 'läuft auf', 'schiebt'] },
        { label: 'Abreißseil', keywords: ['abreiß'] }
      ],
      followUps: ['Warum muss beim Rückwärtsfahren mit Anhänger nichts manuell gelöst werden?']
    }),

    // ---------------------------------------------------------------- Sicherheit und Assistenz
    t('Aktive und passive Sicherheit', {
      group: 'Sicherheit & Assistenz',
      question: 'Definieren Sie aktive und passive Sicherheit, nennen Sie je drei Komponenten und erläutern Sie den Begriff Sicherheitskarosserie.',
      explanation: 'Aktive Sicherheit soll Unfälle verhindern, passive Sicherheit soll die Folgen eines Unfalls verringern.',
      example: 'Sortieren Sie mit der Gruppe Karten mit Begriffen (ABS, Airbag, Gurt, ESP …) in „aktiv“ und „passiv“.',
      modelAnswer: 'Aktive Sicherheit umfasst alle Maßnahmen, die Unfälle verhindern: z. B. Bremsanlage mit ABS, ESP, Notbremsassistent, Spurhalte- und Müdigkeitswarner, gute Beleuchtung, Fahrwerk sowie Bedien- und Sitzkomfort (Konditionssicherheit). Passive Sicherheit umfasst Maßnahmen, die Unfallfolgen mindern: Sicherheitsgurt mit Gurtstraffer und Gurtkraftbegrenzer, Airbags, Kopfstützen, Knautschzonen, stabile Fahrgastzelle, Seitenaufprallschutz. Die Sicherheitskarosserie kombiniert eine sehr steife Fahrgastzelle (Überlebensraum) mit gezielt verformbaren Knautschzonen vorn und hinten, die Aufprallenergie aufnehmen. Ein modernes Rückhaltesystem hält die Insassen schon vor und während des Aufpralls fest im Sitz und verteilt die Kräfte.',
      keyPoints: [
        { label: 'Aktiv = Unfallvermeidung', keywords: ['vermeid', 'verhinder'] },
        { label: 'Beispiele aktiv (ABS, ESP, Assistenz)', keywords: ['abs', 'esp', 'assistent', 'beleuchtung'] },
        { label: 'Passiv = Unfallfolgen mindern', keywords: ['folgen', 'minder', 'verringer'] },
        { label: 'Beispiele passiv (Gurt, Airbag, Knautschzone)', keywords: ['gurt', 'airbag', 'knautschzone', 'kopfstütze'] },
        { label: 'Sicherheitskarosserie: steife Fahrgastzelle + Knautschzonen', keywords: ['fahrgastzelle', 'steif', 'knautsch'] }
      ],
      followUps: ['Was ist ein Gurtkraftbegrenzer?']
    }),
    t('Airbag und Knautschzonen', {
      group: 'Sicherheit & Assistenz',
      question: 'Wie funktioniert ein Airbag und was sind Knautschzonen?',
      explanation: 'Sensoren erkennen den Aufprall, ein Steuergerät zündet eine Treibladung und der Airbag bläst sich in Sekundenbruchteilen auf. Knautschzonen verformen sich und schlucken dabei Aufprallenergie.',
      example: 'Wichtiger Hinweis für Eltern: Babyschale rückwärts nie auf den Beifahrersitz mit aktivem Airbag.',
      modelAnswer: 'Airbag: Beschleunigungssensoren erkennen einen Aufprall, das Steuergerät löst per Stromimpuls eine Zündpille aus; diese entzündet einen Festtreibstoff im Gasgenerator, dessen Gase den Luftsack innerhalb von etwa 30 Millisekunden füllen. Er wirkt nur zusammen mit dem angelegten Gurt. Knautschzonen sind Bereiche der Karosserie (vorn und hinten), die sich bei einem Unfall gezielt verformen. Sie wandeln Bewegungsenergie in Verformungsenergie um, verlängern den Verzögerungsweg und verringern so die auf die Insassen wirkenden Kräfte.',
      keyPoints: [
        { label: 'Sensoren/Steuergerät', keywords: ['sensor', 'steuergerät'] },
        { label: 'Zündpille, Festtreibstoff, Gas', keywords: ['zündpille', 'treibstoff', 'gasgenerator', 'gas'] },
        { label: 'Nur mit Gurt wirksam', keywords: ['gurt'] },
        { label: 'Knautschzone verformt sich', keywords: ['verform'] },
        { label: 'Energieumwandlung, geringere Kräfte', keywords: ['energie', 'kräfte', 'verzögerung'] }
      ],
      followUps: ['Warum muss der Airbag bei rückwärts gerichteten Kindersitzen abgeschaltet werden?']
    }),
    t('ABV, ASR und ESP', {
      group: 'Sicherheit & Assistenz',
      question: 'Erläutern Sie die Funktionsweise von ABV, ASR und ESP – und wie ESP bei Über- bzw. Untersteuern eingreift.',
      explanation: 'ABV/ABS verhindert blockierende Räder beim Bremsen, ASR durchdrehende Räder beim Beschleunigen, ESP das Ausbrechen des Fahrzeugs in Kurven.',
      example: 'Auf Schnee beim Anfahren blinkt die ESP/ASR-Leuchte – der Schüler soll gefühlvoll Gas geben.',
      modelAnswer: 'ABV (automatischer Blockierverhinderer, ABS) regelt über Raddrehzahlsensoren und Hydraulikeinheit den Bremsdruck so, dass die Räder nicht blockieren; das Fahrzeug bleibt lenkbar. ASR (Antriebsschlupfregelung) verhindert das Durchdrehen der Antriebsräder beim Anfahren und Beschleunigen durch Reduzieren des Motormoments und gezieltes Abbremsen des durchdrehenden Rades. ESP verhindert das Ausbrechen des Fahrzeugs: Es vergleicht über Lenkwinkel-, Querbeschleunigungs-, Drehraten- und Raddrehzahlsensoren den Fahrerwunsch mit der tatsächlichen Bewegung und greift durch Bremseingriffe an einzelnen Rädern und in die Motorsteuerung ein. Beim Übersteuern wird das kurvenäußere Vorderrad abgebremst, beim Untersteuern das kurveninnere Hinterrad.',
      keyPoints: [
        { label: 'ABV/ABS: kein Blockieren, lenkbar', keywords: ['blockier', 'lenkbar'] },
        { label: 'ASR: kein Durchdrehen', keywords: ['durchdreh', 'antriebsschlupf'] },
        { label: 'ESP: Sensoren (Lenkwinkel, Querbeschleunigung, Drehrate)', keywords: ['lenkwinkel', 'querbeschleunigung', 'drehrate', 'gierrate'] },
        { label: 'ESP: Bremseingriff einzelner Räder + Motor', keywords: ['einzelne', 'motor'] },
        { label: 'Übersteuern: kurvenäußeres Vorderrad', keywords: ['kurvenäußere', 'äußere vorderrad'] },
        { label: 'Untersteuern: kurveninneres Hinterrad', keywords: ['kurveninnere', 'innere hinterrad'] }
      ],
      followUps: ['Was ist der Unterschied zwischen Über- und Untersteuern?']
    }),
    t('Technik zur Verkürzung des Anhaltewegs', {
      group: 'Sicherheit & Assistenz',
      question: 'Welche technischen Möglichkeiten nutzen Hersteller, um den Anhalteweg zu verkürzen und Unfälle zu verringern? Nennen Sie mindestens drei.',
      explanation: 'Technik kann die Reaktionszeit verkürzen (Warnen, automatisches Bremsen) und die Bremswirkung verbessern.',
      example: 'Testen Sie mit dem Schüler auf einem Übungsplatz, wie stark der Bremsassistent bei schnellem Antippen nachhilft.',
      modelAnswer: 'Möglichkeiten: Notbremsassistent (automatische Notbremsung mit Kamera/Radar), Bremsassistent (erkennt Notbremsungen am schnellen Pedaltritt und erhöht den Bremsdruck), Vorbefüllung der Bremse bei erkannter Gefahr (Prefill), ABS und elektronische Bremskraftverteilung, Abstandsregeltempomat und Abstandswarner, adaptive Bremsleuchten bzw. Warnblinken bei Vollbremsung für den Hintermann, leistungsfähige Bremsanlagen und Reifen mit gutem Nassgriff.',
      keyPoints: [
        { label: 'Notbremsassistent', keywords: ['notbrems', 'automatisch'] },
        { label: 'Bremsassistent', keywords: ['bremsassistent'] },
        { label: 'ABS/Bremskraftverteilung', keywords: ['abs', 'bremskraftverteilung', 'ebv'] },
        { label: 'Abstandsregeltempomat/-warner', keywords: ['abstand', 'acc', 'tempomat'] },
        { label: 'Adaptive Bremsleuchte/Prefill', keywords: ['bremsleuchte', 'bremslicht', 'warnblink', 'vorbefüll', 'prefill'] }
      ],
      followUps: ['Welche Grenzen haben Notbremsassistenten?']
    }),
    t('Stufen des automatisierten Fahrens und Car2X', {
      group: 'Sicherheit & Assistenz',
      question: 'Welche Stufen des automatisierten Fahrens gibt es und was versteht man unter Fahrzeug-zu-X-Kommunikation (Car2X)?',
      explanation: 'Die Stufen reichen von Assistenz (Fahrer fährt) bis autonom (kein Fahrer nötig). Bei Car2X tauschen Fahrzeuge mit anderen Fahrzeugen und der Infrastruktur Informationen aus.',
      example: 'Diskutieren Sie: Auf welcher Stufe darf man in Deutschland heute schon die Hände vom Lenkrad nehmen?',
      modelAnswer: 'Stufen: 0 keine Automatisierung, 1 assistiertes Fahren (z. B. Tempomat mit Abstandsregelung), 2 teilautomatisiertes Fahren (System lenkt und bremst, Fahrer überwacht ständig), 3 hochautomatisiertes Fahren (Fahrer darf sich zeitweise abwenden, muss aber übernehmen können), 4 vollautomatisiertes Fahren (in definierten Bereichen ohne Fahrer), 5 autonomes Fahren (fahrerlos überall). Car2X ist die bidirektionale Kommunikation des Fahrzeugs mit seiner Umgebung: anderen Fahrzeugen (Car2Car), Ampeln, Verkehrszentralen. Ziele: Verkehrssicherheit erhöhen (Warnung vor Stauende, Glätte, Einsatzfahrzeugen), Verkehrseffizienz verbessern und Energie sparen.',
      keyPoints: [
        { label: 'Assistiert', keywords: ['assistiert'] },
        { label: 'Teilautomatisiert', keywords: ['teilautomatisiert'] },
        { label: 'Hochautomatisiert', keywords: ['hochautomatisiert'] },
        { label: 'Vollautomatisiert/autonom', keywords: ['vollautomatisiert', 'autonom'] },
        { label: 'Car2X: Kommunikation mit Umgebung', keywords: ['kommunikation', 'austausch', 'umgebung', 'infrastruktur'] },
        { label: 'Ziele: Sicherheit, Effizienz, Energie', keywords: ['sicherheit', 'effizienz', 'energie'] }
      ],
      followUps: ['Wer haftet bei Stufe 3, wenn das System fährt?']
    }),

    // ---------------------------------------------------------------- Alternative Antriebe
    t('Hybridisierungsgrade und Rekuperation', {
      group: 'Alternative Antriebe',
      question: 'Welche Hybridisierungsgrade kennen Sie und was ist Rekuperation?',
      explanation: 'Hybride kombinieren Verbrenner und Elektromotor – vom einfachen Start-Stopp bis zum Plug-in zum Aufladen. Rekuperation heißt: Beim Bremsen und Rollen wird Strom zurückgewonnen.',
      example: 'Zeigen Sie im Hybrid-Fahrschulwagen die Energieflussanzeige beim Rollen auf eine rote Ampel zu.',
      modelAnswer: 'Micro-Hybrid: Start-Stopp-Automatik und Bremsenergierückgewinnung, kein elektrischer Antrieb. Mild-Hybrid: Ein Motorgenerator unterstützt den Verbrennungsmotor beim Anfahren und Beschleunigen, rein elektrisches Fahren ist kaum möglich. Voll-Hybrid: Rein elektrisches Fahren über kurze Strecken möglich. Plug-in-Hybrid: größere Batterie, extern aufladbar, längere elektrische Reichweite. Rekuperation ist die Bremsenergierückgewinnung: Beim Ausrollen und Bremsen arbeitet der Elektromotor als Generator, bremst das Fahrzeug und lädt die Batterie – ähnlich wie ein Fahrraddynamo.',
      keyPoints: [
        { label: 'Micro-Hybrid', keywords: ['micro', 'mikro'] },
        { label: 'Mild-Hybrid', keywords: ['mild'] },
        { label: 'Voll-Hybrid', keywords: ['voll'] },
        { label: 'Plug-in-Hybrid', keywords: ['plug'] },
        { label: 'Rekuperation: Bremsenergie zurückgewinnen', keywords: ['rückgewinn', 'zurückgewonnen', 'bremsenergie'] },
        { label: 'Generator lädt Batterie', keywords: ['generator', 'batterie', 'lädt'] }
      ],
      followUps: ['Wie verändert Rekuperation das Bremsverhalten für den Fahrschüler?']
    }),
    t('Elektroantrieb: Vor- und Nachteile', {
      group: 'Alternative Antriebe',
      question: 'Nennen Sie jeweils drei Vor- und Nachteile eines Elektroantriebs im Pkw.',
      explanation: 'E-Autos fahren lokal ohne Abgase, leise und kraftvoll. Nachteile sind Reichweite, Ladezeit und die aufwendige Batterieherstellung.',
      example: 'In der Ausbildung auf dem E-Auto: Weisen Sie auf Fußgänger hin, die das leise Fahrzeug nicht hören.',
      modelAnswer: 'Vorteile: lokal emissionsfrei, hohes Drehmoment schon ab dem Stand, hoher Wirkungsgrad und Rekuperation, leise, wartungsarm (kein Ölwechsel, weniger Verschleißteile), kein Schaltgetriebe. Nachteile: begrenzte Reichweite, längere Ladezeiten und teils lückenhafte Ladeinfrastruktur, hohe Kosten und Rohstoffbedarf der Batterie, hohes Fahrzeuggewicht, Reichweitenverlust bei Kälte; außerdem werden leise Fahrzeuge von Fußgängern schlecht gehört.',
      keyPoints: [
        { label: 'Lokal emissionsfrei', keywords: ['emissionsfrei', 'keine abgase', 'lokal'] },
        { label: 'Drehmoment ab Stand', keywords: ['drehmoment'] },
        { label: 'Leise/wartungsarm/Wirkungsgrad', keywords: ['leise', 'wartungsarm', 'wirkungsgrad'] },
        { label: 'Reichweite', keywords: ['reichweite'] },
        { label: 'Ladezeit/Ladeinfrastruktur', keywords: ['lade'] },
        { label: 'Batterie (Kosten, Rohstoffe, Gewicht)', keywords: ['batterie', 'akku', 'rohstoff', 'gewicht'] }
      ],
      followUps: ['Was bedeutet die Schlüsselzahl 197 für E-Auto-Fahrschulen?']
    }),

    // ---------------------------------------------------------------- Reifen
    t('Reifen: Aufgaben, Aufbau und Bezeichnung', {
      group: 'Reifen',
      question: 'Welche Aufgaben haben Reifen, wie ist ein Pkw-Reifen aufgebaut und was bedeutet die Bezeichnung 225/50 R 18 92 V TL DOT 4003?',
      explanation: 'Reifen übertragen alle Kräfte zwischen Auto und Straße. Die Reifenbezeichnung verrät Breite, Höhe, Bauart, Felgengröße, Tragfähigkeit, Geschwindigkeit und Herstellungsdatum.',
      example: 'Lassen Sie den Schüler die Bezeichnung am Fahrschulwagen selbst ablesen und entschlüsseln.',
      modelAnswer: 'Aufgaben: Kräfte übertragen (Antriebs-, Brems- und Seitenführungskräfte), Fahrzeuglast tragen, federn und dämpfen, Spur halten, dabei möglichst geringer Rollwiderstand, Verschleiß und Lärm. Aufbau: Lauffläche mit Profil, Gürtel (Stahlcord), Karkasse (Textilcord), Seitenwand, Wulst mit Wulstkern und luftdichte Innenschicht. Bezeichnung: 225 = Reifenbreite in mm, 50 = Querschnittsverhältnis (Höhe 50 % der Breite), R = Radialbauweise, 18 = Felgendurchmesser in Zoll, 92 = Lastindex (630 kg je Reifen), V = Geschwindigkeitsindex (bis 240 km/h), TL = tubeless (schlauchlos), DOT 4003 = hergestellt in der 40. Kalenderwoche 2003.',
      keyPoints: [
        { label: 'Aufgaben: Kräfte übertragen, tragen, federn', keywords: ['übertrag', 'tragen', 'feder', 'kräfte'] },
        { label: 'Aufbau: Lauffläche, Gürtel, Karkasse, Wulst', keywords: ['lauffläche', 'gürtel', 'karkasse', 'wulst'] },
        { label: '225 mm Breite / 50 % Querschnitt', keywords: ['breite', 'querschnitt', '50 %', '50%'] },
        { label: 'R = Radial, 18 Zoll', keywords: ['radial', 'zoll'] },
        { label: 'Lastindex 92 / V = 240 km/h', keywords: ['lastindex', 'tragfähigkeit', '240', 'geschwindigkeitsindex'] },
        { label: 'TL / DOT = Herstellungsdatum', keywords: ['tubeless', 'schlauchlos', 'kalenderwoche', 'woche', 'herstell'] }
      ],
      followUps: ['Wie alt darf ein Reifen höchstens sein?']
    }),
    t('Reifenprüfung, Schäden und Winterreifen', {
      group: 'Reifen',
      question: 'Wie prüfen Sie die Profiltiefe mit einfachen Mitteln, welche Reifenschäden erkennen Sie durch Sichtprüfung, und woran erkennen Sie einen wintertauglichen Reifen?',
      explanation: 'Profiltiefe misst man mit einem Profilmesser, den Abriebanzeigern oder einer 1-Euro-Münze. Bei der Sichtprüfung sucht man Schnitte, Beulen, Risse und ungleiche Abnutzung.',
      example: 'Machen Sie die Reifenprüfung zum festen Teil der Abfahrtkontrolle – der Schüler erklärt jeden Schritt.',
      modelAnswer: 'Profiltiefe: mit Profiltiefenmesser, an den Abriebindikatoren (TWI) in den Hauptrillen oder mit einer 1-Euro-Münze – verschwindet der goldene Rand (ca. 3 mm) im Profil, sind noch etwa 3 mm vorhanden. Gesetzlich 1,6 mm, empfohlen 3 mm (Sommer) bzw. 4 mm (Winter). Sichtprüfung: Schnitte und eingefahrene Fremdkörper, Beulen an der Flanke (Karkassenschaden, z. B. durch Bordsteinkontakt), Risse (Alterung, UV), einseitige oder fleckige Abnutzung (Fahrwerk, Luftdruck, Unwucht). Winterreifen: Wintertauglich sind Reifen mit dem Alpine-Symbol (Bergpiktogramm mit Schneeflocke); reine M+S-Reifen gelten nach Ablauf der Übergangsfrist nicht mehr. Besonderheiten: weichere Gummimischung, die bei Kälte elastisch bleibt, viele Lamellen und ein tieferes, gröberes Profil.',
      keyPoints: [
        { label: 'Profilmesser/TWI/1-Euro-Münze', keywords: ['münze', 'euro', 'twi', 'messer', 'abrieb'] },
        { label: '1,6 mm gesetzlich, 3/4 mm empfohlen', keywords: ['1,6', '3 mm', '4 mm'] },
        { label: 'Schäden: Schnitte, Beulen, Risse', keywords: ['schnitt', 'beule', 'riss'] },
        { label: 'Ungleiche Abnutzung', keywords: ['abnutzung', 'einseitig'] },
        { label: 'Alpine-Symbol', keywords: ['alpine', 'schneeflocke', 'berg'] },
        { label: 'Weiche Mischung, Lamellen, Profil', keywords: ['mischung', 'lamelle', 'weich'] }
      ],
      followUps: ['Seit wann gilt das Alpine-Symbol als Pflichtkennzeichnung?']
    }),
    t('Aquaplaning', {
      group: 'Reifen',
      question: 'Was ist Aquaplaning, welche Umstände führen dazu und welche Reaktion empfehlen Sie dem Fahrschüler, wenn das Fahrzeug aufschwimmt?',
      explanation: 'Bei Aquaplaning schwimmt der Reifen auf einem Wasserkeil auf und verliert den Kontakt zur Straße. Lenken und Bremsen wirken dann nicht mehr.',
      example: 'Bei Starkregen auf der Autobahn zeigen Sie dem Schüler die Spurrillen, in denen sich Wasser sammelt.',
      modelAnswer: 'Beim Aquaplaning bildet sich vor dem Reifen ein Wasserkeil, weil das Profil das Wasser nicht mehr verdrängen kann; der Reifen schwimmt auf und verliert die Haftung, Lenk-, Brems- und Antriebskräfte können nicht mehr übertragen werden. Ursachen: hohe Geschwindigkeit, große Wassertiefe (z. B. in Spurrillen und Senken), geringe Profiltiefe, breite Reifen, zu geringer Luftdruck. Reaktion: sofort auskuppeln bzw. Gas wegnehmen, nicht bremsen, Lenkrad gerade halten und nicht hektisch lenken, bis die Reifen wieder greifen. Vorbeugen: Geschwindigkeit anpassen, Spurrillen meiden, ausreichendes Profil.',
      keyPoints: [
        { label: 'Wasserkeil, Reifen schwimmt auf', keywords: ['wasserkeil', 'aufschwimm', 'schwimmt'] },
        { label: 'Keine Kraftübertragung', keywords: ['haftung', 'kontakt', 'kraftübertragung', 'nicht mehr'] },
        { label: 'Ursachen: Geschwindigkeit, Wassertiefe, Profil', keywords: ['geschwindigkeit', 'wassertiefe', 'profil', 'spurrillen'] },
        { label: 'Reifenbreite/Luftdruck', keywords: ['breit', 'luftdruck'] },
        { label: 'Auskuppeln/Gas weg, nicht bremsen', keywords: ['auskuppeln', 'gas weg', 'nicht bremsen', 'gas wegnehmen'] },
        { label: 'Lenkrad gerade halten', keywords: ['lenkrad', 'gerade'] }
      ],
      wrongClaims: [
        { label: 'Falsch: Bei Aquaplaning nicht stark bremsen', keywords: ['vollbremsung', 'stark bremsen', 'sofort bremsen'] }
      ],
      followUps: ['Warum sind breite Reifen anfälliger für Aquaplaning?']
    }),

    // ---------------------------------------------------------------- Fahrphysik
    t('Fliehkraft', {
      group: 'Fahrphysik',
      difficulty: 1,
      question: 'Wie hängt die Fliehkraft von Kurvengeschwindigkeit, Kurvenradius und Fahrzeugmasse ab? An welche äußeren Umstände muss die Kurvengeschwindigkeit angepasst werden?',
      explanation: 'Doppelte Geschwindigkeit bedeutet vierfache Fliehkraft. Je enger die Kurve und je schwerer das Auto, desto größer die Fliehkraft.',
      example: 'Rechnen Sie im Unterricht: Von 50 auf 70 km/h steigt die Fliehkraft fast auf das Doppelte.',
      modelAnswer: 'Die Fliehkraft berechnet sich aus F = m · v² / r. Sie steigt im Quadrat mit der Geschwindigkeit: doppelte Geschwindigkeit, vierfache Fliehkraft. Je enger der Kurvenradius, desto größer die Fliehkraft bei gleicher Geschwindigkeit (halber Radius, doppelte Kraft). Sie steigt in gleichem Maß wie die Masse. Die Kurvengeschwindigkeit muss angepasst werden an Kurvenradius und Sicht, Fahrbahnzustand (Nässe, Laub, Glätte, Schotter), Reifenzustand, Beladung und Schwerpunkt, Querneigung der Fahrbahn und Wind.',
      keyPoints: [
        { label: 'Quadratisch mit Geschwindigkeit (doppelt → vierfach)', keywords: ['vierfach', 'quadrat', 'doppelt'] },
        { label: 'Engerer Radius → größere Fliehkraft', keywords: ['radius', 'enger'] },
        { label: 'Proportional zur Masse', keywords: ['masse', 'gewicht', 'proportional', 'gleichem maß'] },
        { label: 'Formel F = m·v²/r', keywords: ['m · v', 'm*v', 'mv²', 'v²', 'formel'] },
        { label: 'Anpassen an Fahrbahn, Sicht, Beladung, Reifen', keywords: ['fahrbahn', 'nässe', 'sicht', 'beladung', 'reifen', 'glätte'] }
      ],
      followUps: ['Warum kippen hohe Fahrzeuge in Kurven leichter?']
    }),
    t('Schlupf und Reibung', {
      group: 'Fahrphysik',
      question: 'Was bedeutet Schlupf? Bei welchem Schlupf wird die Bremskraft optimal übertragen, wie hoch ist er beim Gleiten und welche Reibung ist höher – Haft- oder Gleitreibung?',
      explanation: 'Schlupf beschreibt, wie stark sich ein Reifen anders dreht, als das Auto fährt. Ein bisschen Schlupf ist ideal, ein blockiertes Rad (100 % Schlupf) rutscht nur noch.',
      example: 'Erklären Sie damit, warum ABS-Bremsungen kürzer sind als Bremsungen mit blockierten Rädern.',
      modelAnswer: 'Schlupf ist die relative Differenz zwischen der Umfangsgeschwindigkeit des Reifens und der tatsächlichen Fahrzeuggeschwindigkeit. 0 % bedeutet freies Abrollen (Haftreibung), 100 % bedeutet ein blockiertes oder durchdrehendes Rad, das über die Fahrbahn gleitet (Gleitreibung). Die maximale Brems- bzw. Antriebskraft wird bei etwa 10 bis 15 % (je nach Untergrund bis ca. 30 %) Schlupf übertragen; in diesem Bereich regeln ABS und ASR. Die Haftreibung ist größer als die Gleitreibung – deshalb sind blockierte Räder schlecht: längerer Bremsweg und keine Lenkfähigkeit. Hoher Schlupf in der Kurve durch zu starkes Bremsen oder Beschleunigen führt zu Untersteuern (Fahrzeug schiebt geradeaus) oder Übersteuern (Heck bricht aus).',
      keyPoints: [
        { label: 'Differenz Rad- und Fahrzeuggeschwindigkeit', keywords: ['differenz', 'umfangsgeschwindigkeit', 'unterschied'] },
        { label: '0 % Haften / 100 % Gleiten', keywords: ['100', '0 %', '0%'] },
        { label: 'Optimum ca. 10–15 %', keywords: ['10', '15'] },
        { label: 'Haftreibung > Gleitreibung', keywords: ['haftreibung', 'größer'] },
        { label: 'ABS/ASR regeln im Optimum', keywords: ['abs', 'asr', 'regel'] },
        { label: 'Folgen in der Kurve: Unter-/Übersteuern', keywords: ['untersteuern', 'übersteuern'] }
      ],
      followUps: ['Was ist der Reibbeiwert?']
    }),
    t('Reibbeiwert, Form- und Kraftschluss', {
      group: 'Fahrphysik',
      question: 'Was beschreibt der Reibbeiwert µ? Was sind Formschluss und Kraftschluss? Nennen Sie Beispiele.',
      explanation: 'Der Reibbeiwert sagt, wie gut ein Reifen auf einer Fläche haftet. Formschluss überträgt Kraft durch ineinandergreifende Formen (Zahnräder), Kraftschluss durch Reibung (Kupplung, Bremse).',
      example: 'Lassen Sie Teilnehmer schätzen: Auf Eis ist der Reibbeiwert etwa ein Zehntel von trockenem Asphalt.',
      modelAnswer: 'Der Reibbeiwert (Kraftschlussbeiwert) µ beschreibt das Verhältnis von übertragbarer Reibungskraft zur Gewichtskraft bzw. Radlast. Richtwerte: trockener Asphalt ca. 0,8 bis 1, nasser Asphalt ca. 0,5, Schnee ca. 0,2, Eis ca. 0,1. Formschluss ist die Kraftübertragung durch das Ineinandergreifen von Formen, z. B. Zahnräder im Getriebe oder eine Passfeder. Kraftschluss ist die Kraftübertragung durch Reibung, z. B. Kupplung, Bremse oder Reifen auf der Fahrbahn.',
      keyPoints: [
        { label: 'µ = Reibungskraft / Gewichtskraft', keywords: ['verhältnis', 'gewichtskraft', 'radlast', 'normalkraft'] },
        { label: 'Richtwerte (trocken/nass/Eis)', keywords: ['0,8', '0,5', '0,1', 'eis', 'nass'] },
        { label: 'Formschluss: Ineinandergreifen', keywords: ['ineinander', 'form'] },
        { label: 'Beispiel Zahnräder', keywords: ['zahnr'] },
        { label: 'Kraftschluss: Reibung', keywords: ['reibung'] },
        { label: 'Beispiel Kupplung/Bremse', keywords: ['kupplung', 'bremse'] }
      ],
      followUps: ['Wie verändert sich der Bremsweg auf Schnee?']
    }),
    t('Kamm’scher Kreis', {
      group: 'Fahrphysik',
      question: 'Was stellt der Kamm’sche Kreis dar?',
      explanation: 'Ein Reifen kann nur eine bestimmte Gesamtkraft übertragen. Wer in der Kurve stark bremst oder beschleunigt, hat weniger Kraft zum Lenken übrig.',
      example: 'Zeichnen Sie den Kreis und tragen Sie Bremsen und Lenken als Pfeile ein: Beide zusammen dürfen nicht über den Rand hinaus.',
      modelAnswer: 'Der Kamm’sche Kreis ist eine vereinfachte Darstellung der maximal übertragbaren Gesamtkraft am Reifen. Er zeigt den Zusammenhang zwischen Umfangskräften (Antriebs- und Bremskräfte) und Seitenführungskräften: Beide zusammen (als Vektorsumme) können den Kreisradius, also die Haftgrenze, nicht überschreiten. Wer in der Kurve stark bremst oder beschleunigt, verringert die verfügbare Seitenführungskraft – das Fahrzeug kann aus der Kurve rutschen. Deshalb: vor der Kurve bremsen, in der Kurve gleichmäßig fahren.',
      keyPoints: [
        { label: 'Maximal übertragbare Gesamtkraft', keywords: ['gesamtkraft', 'maximal', 'haftgrenze'] },
        { label: 'Umfangskräfte (Bremsen/Antrieb)', keywords: ['umfang', 'brems', 'antrieb'] },
        { label: 'Seitenführungskräfte', keywords: ['seitenführung'] },
        { label: 'Summe darf Kreis nicht überschreiten', keywords: ['überschreit', 'summe', 'vektor', 'zusammen'] },
        { label: 'Praxis: vor der Kurve bremsen', keywords: ['vor der kurve'] }
      ],
      followUps: ['Wie erklären Sie das einem Fahrschüler ohne Physikkenntnisse?']
    }),
    t('Achslastverlagerung und Radlasten', {
      group: 'Fahrphysik',
      question: 'Wie verlagert sich das Fahrzeuggewicht beim Anfahren und Bremsen? Von welchen Faktoren hängen die statischen Radlasten ab, und welche Kräfte wirken am Reifenaufstandspunkt?',
      explanation: 'Beim Bremsen drückt das Gewicht nach vorn, beim Beschleunigen nach hinten. Am Reifen wirken Gewichtskraft, Brems- bzw. Antriebskraft und Seitenführungskraft.',
      example: 'Beobachten Sie mit dem Schüler, wie die Fahrzeugfront beim Bremsen eintaucht.',
      modelAnswer: 'Dynamische Achslastverlagerung: Beim Bremsen wird die Vorderachse stärker belastet, dort können größere Reibungskräfte übertragen werden (daher stärkere Vorderradbremsen); die Hinterachse wird entlastet. Beim Beschleunigen wird die Vorderachse entlastet und kann beim Lenken weniger Seitenführungskraft übertragen. Statische Radlasten hängen ab von Fahrzeugmasse und Beladung, Lage des Schwerpunkts sowie Anzahl und Anordnung der Achsen und Räder. Am Reifenaufstandspunkt wirken Gewichtskraft (Radlast), Bremskraft, Antriebs- bzw. Beschleunigungskraft und Seitenführungskraft.',
      keyPoints: [
        { label: 'Bremsen: Vorderachse belastet', keywords: ['vorderachse', 'vorn'] },
        { label: 'Beschleunigen: Vorderachse entlastet', keywords: ['entlastet', 'beschleunig'] },
        { label: 'Statische Radlast: Masse, Schwerpunkt', keywords: ['masse', 'schwerpunkt', 'beladung'] },
        { label: 'Achsen/Räder', keywords: ['achsen', 'räder', 'anordnung'] },
        { label: 'Kräfte: Gewicht, Brems-/Antriebskraft, Seitenführung', keywords: ['gewichtskraft', 'bremskraft', 'antriebskraft', 'seitenführung'] }
      ],
      followUps: ['Warum ist Bremsen in der Kurve gefährlich?']
    }),
    t('Fahrwiderstände und Luftwiderstand', {
      group: 'Fahrphysik',
      question: 'Welche Widerstandskräfte wirken auf ein Fahrzeug, wovon hängt der Luftwiderstand ab und wie beeinflusst das Gewicht den Rollwiderstand?',
      explanation: 'Ein Auto muss Roll-, Luft-, Steigungs- und Beschleunigungswiderstand überwinden. Der Luftwiderstand wächst stark mit der Geschwindigkeit.',
      example: 'Zeigen Sie auf der Autobahn den Verbrauch bei 100 und bei 140 km/h – der Unterschied überrascht viele Schüler.',
      modelAnswer: 'Fahrwiderstände sind Rollwiderstand, Luftwiderstand, Steigungswiderstand und Beschleunigungswiderstand. Der Luftwiderstand hängt ab von der Fahrzeugform (cw-Wert), der Stirnfläche, der Luftdichte und vor allem der Geschwindigkeit – er steigt im Quadrat, die benötigte Leistung sogar in der dritten Potenz. Der Rollwiderstand ist proportional zur Gewichtskraft: Je schwerer das Fahrzeug, desto höher der Rollwiderstand; außerdem steigt er bei zu niedrigem Reifendruck.',
      keyPoints: [
        { label: 'Rollwiderstand', keywords: ['rollwiderstand'] },
        { label: 'Luftwiderstand', keywords: ['luftwiderstand'] },
        { label: 'Steigungs- und Beschleunigungswiderstand', keywords: ['steigung', 'beschleunigung'] },
        { label: 'cw-Wert/Form, Stirnfläche, Luftdichte', keywords: ['cw', 'form', 'stirnfläche', 'luftdichte'] },
        { label: 'Geschwindigkeit im Quadrat', keywords: ['quadrat', 'geschwindigkeit'] },
        { label: 'Rollwiderstand proportional zum Gewicht', keywords: ['proportional', 'gewicht', 'schwerer'] }
      ],
      followUps: ['Warum verbraucht ein Dachträger so viel Kraftstoff?']
    }),
    t('Querkräfte, Spurrillen und Reifenhaftung', {
      group: 'Fahrphysik',
      question: 'Wodurch wirken auch bei Geradeausfahrt Querkräfte auf das Fahrzeug, wie verhält man sich bei Spurrillen und welche Faktoren verringern die Reifenhaftung bei schneller Kurveneinfahrt?',
      explanation: 'Seitenwind, schräge Fahrbahnen und Spurrillen drücken das Auto zur Seite. In Kurven verschlechtern hohe Geschwindigkeit, schlechte Reifen und glatte Fahrbahn die Haftung.',
      example: 'Auf einer Lkw-belasteten Landstraße mit Spurrillen üben Sie das ruhige, leicht versetzte Fahren.',
      modelAnswer: 'Querkräfte bei Geradeausfahrt entstehen durch Seitenwind, Querneigung der Fahrbahn und Spurrillen. Bei Spurrillen: Geschwindigkeit reduzieren, Lenkrad ruhig und fest halten, leicht versetzt zu den Rillen fahren und bei Regen an die Aquaplaninggefahr denken. Die Reifenhaftung bei schneller Kurveneinfahrt verschlechtern vor allem zu hohe Geschwindigkeit, abgefahrenes Profil, falscher Reifendruck, rutschige Fahrbahn (Nässe, Laub, Schmutz, Glätte) sowie Bremsen oder Beschleunigen in der Kurve.',
      keyPoints: [
        { label: 'Seitenwind', keywords: ['seitenwind', 'wind'] },
        { label: 'Fahrbahnneigung', keywords: ['neigung', 'geneigt', 'quergefälle'] },
        { label: 'Spurrillen', keywords: ['spurrillen'] },
        { label: 'Verhalten: langsamer, ruhig lenken, versetzt fahren', keywords: ['versetzt', 'ruhig', 'langsamer', 'reduzier'] },
        { label: 'Haftung: Geschwindigkeit, Profil, Fahrbahn', keywords: ['profil', 'rutschig', 'nässe', 'glätte', 'geschwindigkeit'] }
      ],
      followUps: ['Wie reagieren Sie auf eine plötzliche Seitenwindböe auf einer Brücke?']
    })
  ];

  return { questions };
});
