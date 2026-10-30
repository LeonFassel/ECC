/**
 * Verkehrszeichen nach StVO Anlage 1 bis 4 – automatisch erzeugt aus der
 * Unterlage mit tools/extract-stvo-signs.py. Nicht von Hand bearbeiten;
 * Ergänzungen (Erklärungen, Praxisbeispiele, typische Fehler) stehen in signs.js.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FLSignsStvo = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const signs = [
    {
      "id": "vz-101",
      "subject": "zeichen",
      "sign": "101",
      "signLabel": "Zeichen 101",
      "kind": "Zeichen",
      "anlage": 1,
      "lfd": "1",
      "name": "Gefahrstelle",
      "category": "Gefahrzeichen (Anlage 1), Allgemeine Gefahrzeichen (zu § 40 Absatz 6)",
      "topic": "Zeichen 101 – Gefahrstelle",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 1,
      "images": [
        "x15"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Ein Zusatzzeichen kann die Gefahr näher bezeichnen."
        }
      ],
      "modelAnswer": "Das ist Zeichen 101 „Gefahrstelle“ – Gefahrzeichen (Anlage 1), Allgemeine Gefahrzeichen (zu § 40 Absatz 6). Gefahrzeichen mahnen zu erhöhter Aufmerksamkeit, insbesondere zur Verringerung der Geschwindigkeit im Hinblick auf eine Gefahrsituation (§ 40 Absatz 1 StVO). Außerhalb geschlossener Ortschaften stehen sie im Allgemeinen 150 bis 250 m vor der Gefahrstelle (§ 40 Absatz 2 StVO). Ein Zusatzzeichen kann die Gefahr näher bezeichnen.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Gefahrstelle",
          "keywords": [
            "101",
            "gefahrstelle"
          ]
        },
        {
          "label": "Gefahrzeichen: Aufmerksamkeit, Geschwindigkeit anpassen",
          "keywords": [
            "gefahrzeichen",
            "warnt",
            "aufmerksam",
            "langsam",
            "geschwindigkeit",
            "vorsicht"
          ]
        },
        {
          "label": "Außerorts 150–250 m vor der Gefahrstelle",
          "keywords": [
            "150",
            "250",
            "außerorts"
          ]
        },
        {
          "label": "Ein Zusatzzeichen kann die Gefahr näher bezeichnen.",
          "keywords": [
            "bezeichnen",
            "gefahr",
            "näher"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Wie verhalten Sie sich nach diesem Gefahrzeichen?",
        "Wo wird dieses Zeichen innerorts und außerorts aufgestellt?"
      ],
      "source": "StVO Anlage 1, lfd. Nr. 1"
    },
    {
      "id": "vz-102",
      "subject": "zeichen",
      "sign": "102",
      "signLabel": "Zeichen 102",
      "kind": "Zeichen",
      "anlage": 1,
      "lfd": "2",
      "name": "Kreuzung oder Einmündung",
      "category": "Gefahrzeichen (Anlage 1), Allgemeine Gefahrzeichen (zu § 40 Absatz 6)",
      "topic": "Zeichen 102 – Kreuzung oder Einmündung",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 1,
      "images": [
        "x16"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Kreuzung oder Einmündung mit Vorfahrt von rechts"
        }
      ],
      "modelAnswer": "Das ist Zeichen 102 „Kreuzung oder Einmündung“ – Gefahrzeichen (Anlage 1), Allgemeine Gefahrzeichen (zu § 40 Absatz 6). Gefahrzeichen mahnen zu erhöhter Aufmerksamkeit, insbesondere zur Verringerung der Geschwindigkeit im Hinblick auf eine Gefahrsituation (§ 40 Absatz 1 StVO). Außerhalb geschlossener Ortschaften stehen sie im Allgemeinen 150 bis 250 m vor der Gefahrstelle (§ 40 Absatz 2 StVO). Kreuzung oder Einmündung mit Vorfahrt von rechts.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Kreuzung oder Einmündung",
          "keywords": [
            "102",
            "kreuzung",
            "einmündung",
            "kreuzung oder einmündung"
          ]
        },
        {
          "label": "Gefahrzeichen: Aufmerksamkeit, Geschwindigkeit anpassen",
          "keywords": [
            "gefahrzeichen",
            "warnt",
            "aufmerksam",
            "langsam",
            "geschwindigkeit",
            "vorsicht"
          ]
        },
        {
          "label": "Außerorts 150–250 m vor der Gefahrstelle",
          "keywords": [
            "150",
            "250",
            "außerorts"
          ]
        },
        {
          "label": "Kreuzung oder Einmündung mit Vorfahrt von rechts",
          "keywords": [
            "einmündung",
            "kreuzung",
            "vorfahrt"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Wie verhalten Sie sich nach diesem Gefahrzeichen?",
        "Wo wird dieses Zeichen innerorts und außerorts aufgestellt?"
      ],
      "source": "StVO Anlage 1, lfd. Nr. 2"
    },
    {
      "id": "vz-103",
      "subject": "zeichen",
      "sign": "103",
      "signLabel": "Zeichen 103",
      "kind": "Zeichen",
      "anlage": 1,
      "lfd": "3",
      "name": "Kurve",
      "category": "Gefahrzeichen (Anlage 1), Allgemeine Gefahrzeichen (zu § 40 Absatz 6)",
      "topic": "Zeichen 103 – Kurve",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 1,
      "images": [
        "x17"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 103 „Kurve“ – Gefahrzeichen (Anlage 1), Allgemeine Gefahrzeichen (zu § 40 Absatz 6). Gefahrzeichen mahnen zu erhöhter Aufmerksamkeit, insbesondere zur Verringerung der Geschwindigkeit im Hinblick auf eine Gefahrsituation (§ 40 Absatz 1 StVO). Außerhalb geschlossener Ortschaften stehen sie im Allgemeinen 150 bis 250 m vor der Gefahrstelle (§ 40 Absatz 2 StVO).",
      "keyPoints": [
        {
          "label": "Bezeichnung: Kurve",
          "keywords": [
            "103",
            "kurve"
          ]
        },
        {
          "label": "Gefahrzeichen: Aufmerksamkeit, Geschwindigkeit anpassen",
          "keywords": [
            "gefahrzeichen",
            "warnt",
            "aufmerksam",
            "langsam",
            "geschwindigkeit",
            "vorsicht"
          ]
        },
        {
          "label": "Außerorts 150–250 m vor der Gefahrstelle",
          "keywords": [
            "150",
            "250",
            "außerorts"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Wie verhalten Sie sich nach diesem Gefahrzeichen?",
        "Wo wird dieses Zeichen innerorts und außerorts aufgestellt?"
      ],
      "source": "StVO Anlage 1, lfd. Nr. 3"
    },
    {
      "id": "vz-105",
      "subject": "zeichen",
      "sign": "105",
      "signLabel": "Zeichen 105",
      "kind": "Zeichen",
      "anlage": 1,
      "lfd": "4",
      "name": "Doppelkurve",
      "category": "Gefahrzeichen (Anlage 1), Allgemeine Gefahrzeichen (zu § 40 Absatz 6)",
      "topic": "Zeichen 105 – Doppelkurve",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 1,
      "images": [
        "x31"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 105 „Doppelkurve“ – Gefahrzeichen (Anlage 1), Allgemeine Gefahrzeichen (zu § 40 Absatz 6). Gefahrzeichen mahnen zu erhöhter Aufmerksamkeit, insbesondere zur Verringerung der Geschwindigkeit im Hinblick auf eine Gefahrsituation (§ 40 Absatz 1 StVO). Außerhalb geschlossener Ortschaften stehen sie im Allgemeinen 150 bis 250 m vor der Gefahrstelle (§ 40 Absatz 2 StVO).",
      "keyPoints": [
        {
          "label": "Bezeichnung: Doppelkurve",
          "keywords": [
            "105",
            "doppelkurve"
          ]
        },
        {
          "label": "Gefahrzeichen: Aufmerksamkeit, Geschwindigkeit anpassen",
          "keywords": [
            "gefahrzeichen",
            "warnt",
            "aufmerksam",
            "langsam",
            "geschwindigkeit",
            "vorsicht"
          ]
        },
        {
          "label": "Außerorts 150–250 m vor der Gefahrstelle",
          "keywords": [
            "150",
            "250",
            "außerorts"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Wie verhalten Sie sich nach diesem Gefahrzeichen?",
        "Wo wird dieses Zeichen innerorts und außerorts aufgestellt?"
      ],
      "source": "StVO Anlage 1, lfd. Nr. 4"
    },
    {
      "id": "vz-108",
      "subject": "zeichen",
      "sign": "108",
      "signLabel": "Zeichen 108",
      "kind": "Zeichen",
      "anlage": 1,
      "lfd": "5",
      "name": "Gefälle",
      "category": "Gefahrzeichen (Anlage 1), Allgemeine Gefahrzeichen (zu § 40 Absatz 6)",
      "topic": "Zeichen 108 – Gefälle",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 1,
      "images": [
        "x32"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 108 „Gefälle“ – Gefahrzeichen (Anlage 1), Allgemeine Gefahrzeichen (zu § 40 Absatz 6). Gefahrzeichen mahnen zu erhöhter Aufmerksamkeit, insbesondere zur Verringerung der Geschwindigkeit im Hinblick auf eine Gefahrsituation (§ 40 Absatz 1 StVO). Außerhalb geschlossener Ortschaften stehen sie im Allgemeinen 150 bis 250 m vor der Gefahrstelle (§ 40 Absatz 2 StVO).",
      "keyPoints": [
        {
          "label": "Bezeichnung: Gefälle",
          "keywords": [
            "108",
            "gefälle"
          ]
        },
        {
          "label": "Gefahrzeichen: Aufmerksamkeit, Geschwindigkeit anpassen",
          "keywords": [
            "gefahrzeichen",
            "warnt",
            "aufmerksam",
            "langsam",
            "geschwindigkeit",
            "vorsicht"
          ]
        },
        {
          "label": "Außerorts 150–250 m vor der Gefahrstelle",
          "keywords": [
            "150",
            "250",
            "außerorts"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Wie verhalten Sie sich nach diesem Gefahrzeichen?",
        "Wo wird dieses Zeichen innerorts und außerorts aufgestellt?"
      ],
      "source": "StVO Anlage 1, lfd. Nr. 5"
    },
    {
      "id": "vz-110",
      "subject": "zeichen",
      "sign": "110",
      "signLabel": "Zeichen 110",
      "kind": "Zeichen",
      "anlage": 1,
      "lfd": "6",
      "name": "Steigung",
      "category": "Gefahrzeichen (Anlage 1), Allgemeine Gefahrzeichen (zu § 40 Absatz 6)",
      "topic": "Zeichen 110 – Steigung",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 1,
      "images": [
        "x33"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 110 „Steigung“ – Gefahrzeichen (Anlage 1), Allgemeine Gefahrzeichen (zu § 40 Absatz 6). Gefahrzeichen mahnen zu erhöhter Aufmerksamkeit, insbesondere zur Verringerung der Geschwindigkeit im Hinblick auf eine Gefahrsituation (§ 40 Absatz 1 StVO). Außerhalb geschlossener Ortschaften stehen sie im Allgemeinen 150 bis 250 m vor der Gefahrstelle (§ 40 Absatz 2 StVO).",
      "keyPoints": [
        {
          "label": "Bezeichnung: Steigung",
          "keywords": [
            "110",
            "steigung"
          ]
        },
        {
          "label": "Gefahrzeichen: Aufmerksamkeit, Geschwindigkeit anpassen",
          "keywords": [
            "gefahrzeichen",
            "warnt",
            "aufmerksam",
            "langsam",
            "geschwindigkeit",
            "vorsicht"
          ]
        },
        {
          "label": "Außerorts 150–250 m vor der Gefahrstelle",
          "keywords": [
            "150",
            "250",
            "außerorts"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Wie verhalten Sie sich nach diesem Gefahrzeichen?",
        "Wo wird dieses Zeichen innerorts und außerorts aufgestellt?"
      ],
      "source": "StVO Anlage 1, lfd. Nr. 6"
    },
    {
      "id": "vz-112",
      "subject": "zeichen",
      "sign": "112",
      "signLabel": "Zeichen 112",
      "kind": "Zeichen",
      "anlage": 1,
      "lfd": "7",
      "name": "Unebene Fahrbahn",
      "category": "Gefahrzeichen (Anlage 1), Allgemeine Gefahrzeichen (zu § 40 Absatz 6)",
      "topic": "Zeichen 112 – Unebene Fahrbahn",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 1,
      "images": [
        "x34"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 112 „Unebene Fahrbahn“ – Gefahrzeichen (Anlage 1), Allgemeine Gefahrzeichen (zu § 40 Absatz 6). Gefahrzeichen mahnen zu erhöhter Aufmerksamkeit, insbesondere zur Verringerung der Geschwindigkeit im Hinblick auf eine Gefahrsituation (§ 40 Absatz 1 StVO). Außerhalb geschlossener Ortschaften stehen sie im Allgemeinen 150 bis 250 m vor der Gefahrstelle (§ 40 Absatz 2 StVO).",
      "keyPoints": [
        {
          "label": "Bezeichnung: Unebene Fahrbahn",
          "keywords": [
            "112",
            "unebene",
            "unebene fahrbahn"
          ]
        },
        {
          "label": "Gefahrzeichen: Aufmerksamkeit, Geschwindigkeit anpassen",
          "keywords": [
            "gefahrzeichen",
            "warnt",
            "aufmerksam",
            "langsam",
            "geschwindigkeit",
            "vorsicht"
          ]
        },
        {
          "label": "Außerorts 150–250 m vor der Gefahrstelle",
          "keywords": [
            "150",
            "250",
            "außerorts"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Wie verhalten Sie sich nach diesem Gefahrzeichen?",
        "Wo wird dieses Zeichen innerorts und außerorts aufgestellt?"
      ],
      "source": "StVO Anlage 1, lfd. Nr. 7"
    },
    {
      "id": "vz-114",
      "subject": "zeichen",
      "sign": "114",
      "signLabel": "Zeichen 114",
      "kind": "Zeichen",
      "anlage": 1,
      "lfd": "8",
      "name": "Schleuder- oder Rutschgefahr",
      "category": "Gefahrzeichen (Anlage 1), Allgemeine Gefahrzeichen (zu § 40 Absatz 6)",
      "topic": "Zeichen 114 – Schleuder- oder Rutschgefahr",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 1,
      "images": [
        "x46"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Schleuder- oder Rutschgefahr bei Nässe oder Schmutz"
        }
      ],
      "modelAnswer": "Das ist Zeichen 114 „Schleuder- oder Rutschgefahr“ – Gefahrzeichen (Anlage 1), Allgemeine Gefahrzeichen (zu § 40 Absatz 6). Gefahrzeichen mahnen zu erhöhter Aufmerksamkeit, insbesondere zur Verringerung der Geschwindigkeit im Hinblick auf eine Gefahrsituation (§ 40 Absatz 1 StVO). Außerhalb geschlossener Ortschaften stehen sie im Allgemeinen 150 bis 250 m vor der Gefahrstelle (§ 40 Absatz 2 StVO). Schleuder- oder Rutschgefahr bei Nässe oder Schmutz.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Schleuder- oder Rutschgefahr",
          "keywords": [
            "114",
            "schleuder",
            "rutschgefahr",
            "schleuder- oder rutschgefahr"
          ]
        },
        {
          "label": "Gefahrzeichen: Aufmerksamkeit, Geschwindigkeit anpassen",
          "keywords": [
            "gefahrzeichen",
            "warnt",
            "aufmerksam",
            "langsam",
            "geschwindigkeit",
            "vorsicht"
          ]
        },
        {
          "label": "Außerorts 150–250 m vor der Gefahrstelle",
          "keywords": [
            "150",
            "250",
            "außerorts"
          ]
        },
        {
          "label": "Schleuder- oder Rutschgefahr bei Nässe oder Schmutz",
          "keywords": [
            "rutschgefahr",
            "schleuder",
            "schmutz",
            "nässe"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Wie verhalten Sie sich nach diesem Gefahrzeichen?",
        "Wo wird dieses Zeichen innerorts und außerorts aufgestellt?"
      ],
      "source": "StVO Anlage 1, lfd. Nr. 8"
    },
    {
      "id": "vz-117",
      "subject": "zeichen",
      "sign": "117",
      "signLabel": "Zeichen 117",
      "kind": "Zeichen",
      "anlage": 1,
      "lfd": "9",
      "name": "Seitenwind",
      "category": "Gefahrzeichen (Anlage 1), Allgemeine Gefahrzeichen (zu § 40 Absatz 6)",
      "topic": "Zeichen 117 – Seitenwind",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 1,
      "images": [
        "x47"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 117 „Seitenwind“ – Gefahrzeichen (Anlage 1), Allgemeine Gefahrzeichen (zu § 40 Absatz 6). Gefahrzeichen mahnen zu erhöhter Aufmerksamkeit, insbesondere zur Verringerung der Geschwindigkeit im Hinblick auf eine Gefahrsituation (§ 40 Absatz 1 StVO). Außerhalb geschlossener Ortschaften stehen sie im Allgemeinen 150 bis 250 m vor der Gefahrstelle (§ 40 Absatz 2 StVO).",
      "keyPoints": [
        {
          "label": "Bezeichnung: Seitenwind",
          "keywords": [
            "117",
            "seitenwind"
          ]
        },
        {
          "label": "Gefahrzeichen: Aufmerksamkeit, Geschwindigkeit anpassen",
          "keywords": [
            "gefahrzeichen",
            "warnt",
            "aufmerksam",
            "langsam",
            "geschwindigkeit",
            "vorsicht"
          ]
        },
        {
          "label": "Außerorts 150–250 m vor der Gefahrstelle",
          "keywords": [
            "150",
            "250",
            "außerorts"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Wie verhalten Sie sich nach diesem Gefahrzeichen?",
        "Wo wird dieses Zeichen innerorts und außerorts aufgestellt?"
      ],
      "source": "StVO Anlage 1, lfd. Nr. 9"
    },
    {
      "id": "vz-120",
      "subject": "zeichen",
      "sign": "120",
      "signLabel": "Zeichen 120",
      "kind": "Zeichen",
      "anlage": 1,
      "lfd": "10",
      "name": "Verengte Fahrbahn",
      "category": "Gefahrzeichen (Anlage 1), Allgemeine Gefahrzeichen (zu § 40 Absatz 6)",
      "topic": "Zeichen 120 – Verengte Fahrbahn",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 1,
      "images": [
        "x48"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 120 „Verengte Fahrbahn“ – Gefahrzeichen (Anlage 1), Allgemeine Gefahrzeichen (zu § 40 Absatz 6). Gefahrzeichen mahnen zu erhöhter Aufmerksamkeit, insbesondere zur Verringerung der Geschwindigkeit im Hinblick auf eine Gefahrsituation (§ 40 Absatz 1 StVO). Außerhalb geschlossener Ortschaften stehen sie im Allgemeinen 150 bis 250 m vor der Gefahrstelle (§ 40 Absatz 2 StVO).",
      "keyPoints": [
        {
          "label": "Bezeichnung: Verengte Fahrbahn",
          "keywords": [
            "120",
            "verengte",
            "verengte fahrbahn"
          ]
        },
        {
          "label": "Gefahrzeichen: Aufmerksamkeit, Geschwindigkeit anpassen",
          "keywords": [
            "gefahrzeichen",
            "warnt",
            "aufmerksam",
            "langsam",
            "geschwindigkeit",
            "vorsicht"
          ]
        },
        {
          "label": "Außerorts 150–250 m vor der Gefahrstelle",
          "keywords": [
            "150",
            "250",
            "außerorts"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Wie verhalten Sie sich nach diesem Gefahrzeichen?",
        "Wo wird dieses Zeichen innerorts und außerorts aufgestellt?"
      ],
      "source": "StVO Anlage 1, lfd. Nr. 10"
    },
    {
      "id": "vz-121",
      "subject": "zeichen",
      "sign": "121",
      "signLabel": "Zeichen 121",
      "kind": "Zeichen",
      "anlage": 1,
      "lfd": "11",
      "name": "Einseitig verengte Fahrbahn",
      "category": "Gefahrzeichen (Anlage 1), Allgemeine Gefahrzeichen (zu § 40 Absatz 6)",
      "topic": "Zeichen 121 – Einseitig verengte Fahrbahn",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 1,
      "images": [
        "x58"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 121 „Einseitig verengte Fahrbahn“ – Gefahrzeichen (Anlage 1), Allgemeine Gefahrzeichen (zu § 40 Absatz 6). Gefahrzeichen mahnen zu erhöhter Aufmerksamkeit, insbesondere zur Verringerung der Geschwindigkeit im Hinblick auf eine Gefahrsituation (§ 40 Absatz 1 StVO). Außerhalb geschlossener Ortschaften stehen sie im Allgemeinen 150 bis 250 m vor der Gefahrstelle (§ 40 Absatz 2 StVO).",
      "keyPoints": [
        {
          "label": "Bezeichnung: Einseitig verengte Fahrbahn",
          "keywords": [
            "121",
            "verengte",
            "einseitig",
            "einseitig verengte fahrbahn"
          ]
        },
        {
          "label": "Gefahrzeichen: Aufmerksamkeit, Geschwindigkeit anpassen",
          "keywords": [
            "gefahrzeichen",
            "warnt",
            "aufmerksam",
            "langsam",
            "geschwindigkeit",
            "vorsicht"
          ]
        },
        {
          "label": "Außerorts 150–250 m vor der Gefahrstelle",
          "keywords": [
            "150",
            "250",
            "außerorts"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Wie verhalten Sie sich nach diesem Gefahrzeichen?",
        "Wo wird dieses Zeichen innerorts und außerorts aufgestellt?"
      ],
      "source": "StVO Anlage 1, lfd. Nr. 11"
    },
    {
      "id": "vz-123",
      "subject": "zeichen",
      "sign": "123",
      "signLabel": "Zeichen 123",
      "kind": "Zeichen",
      "anlage": 1,
      "lfd": "12",
      "name": "Arbeitsstelle",
      "category": "Gefahrzeichen (Anlage 1), Allgemeine Gefahrzeichen (zu § 40 Absatz 6)",
      "topic": "Zeichen 123 – Arbeitsstelle",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 1,
      "images": [
        "x59"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 123 „Arbeitsstelle“ – Gefahrzeichen (Anlage 1), Allgemeine Gefahrzeichen (zu § 40 Absatz 6). Gefahrzeichen mahnen zu erhöhter Aufmerksamkeit, insbesondere zur Verringerung der Geschwindigkeit im Hinblick auf eine Gefahrsituation (§ 40 Absatz 1 StVO). Außerhalb geschlossener Ortschaften stehen sie im Allgemeinen 150 bis 250 m vor der Gefahrstelle (§ 40 Absatz 2 StVO).",
      "keyPoints": [
        {
          "label": "Bezeichnung: Arbeitsstelle",
          "keywords": [
            "123",
            "arbeitsstelle"
          ]
        },
        {
          "label": "Gefahrzeichen: Aufmerksamkeit, Geschwindigkeit anpassen",
          "keywords": [
            "gefahrzeichen",
            "warnt",
            "aufmerksam",
            "langsam",
            "geschwindigkeit",
            "vorsicht"
          ]
        },
        {
          "label": "Außerorts 150–250 m vor der Gefahrstelle",
          "keywords": [
            "150",
            "250",
            "außerorts"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Wie verhalten Sie sich nach diesem Gefahrzeichen?",
        "Wo wird dieses Zeichen innerorts und außerorts aufgestellt?"
      ],
      "source": "StVO Anlage 1, lfd. Nr. 12"
    },
    {
      "id": "vz-124",
      "subject": "zeichen",
      "sign": "124",
      "signLabel": "Zeichen 124",
      "kind": "Zeichen",
      "anlage": 1,
      "lfd": "13",
      "name": "Stau",
      "category": "Gefahrzeichen (Anlage 1), Allgemeine Gefahrzeichen (zu § 40 Absatz 6)",
      "topic": "Zeichen 124 – Stau",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 1,
      "images": [
        "x60"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 124 „Stau“ – Gefahrzeichen (Anlage 1), Allgemeine Gefahrzeichen (zu § 40 Absatz 6). Gefahrzeichen mahnen zu erhöhter Aufmerksamkeit, insbesondere zur Verringerung der Geschwindigkeit im Hinblick auf eine Gefahrsituation (§ 40 Absatz 1 StVO). Außerhalb geschlossener Ortschaften stehen sie im Allgemeinen 150 bis 250 m vor der Gefahrstelle (§ 40 Absatz 2 StVO).",
      "keyPoints": [
        {
          "label": "Bezeichnung: Stau",
          "keywords": [
            "124",
            "stau"
          ]
        },
        {
          "label": "Gefahrzeichen: Aufmerksamkeit, Geschwindigkeit anpassen",
          "keywords": [
            "gefahrzeichen",
            "warnt",
            "aufmerksam",
            "langsam",
            "geschwindigkeit",
            "vorsicht"
          ]
        },
        {
          "label": "Außerorts 150–250 m vor der Gefahrstelle",
          "keywords": [
            "150",
            "250",
            "außerorts"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Wie verhalten Sie sich nach diesem Gefahrzeichen?",
        "Wo wird dieses Zeichen innerorts und außerorts aufgestellt?"
      ],
      "source": "StVO Anlage 1, lfd. Nr. 13"
    },
    {
      "id": "vz-125",
      "subject": "zeichen",
      "sign": "125",
      "signLabel": "Zeichen 125",
      "kind": "Zeichen",
      "anlage": 1,
      "lfd": "14",
      "name": "Gegenverkehr",
      "category": "Gefahrzeichen (Anlage 1), Allgemeine Gefahrzeichen (zu § 40 Absatz 6)",
      "topic": "Zeichen 125 – Gegenverkehr",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 1,
      "images": [
        "x61"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 125 „Gegenverkehr“ – Gefahrzeichen (Anlage 1), Allgemeine Gefahrzeichen (zu § 40 Absatz 6). Gefahrzeichen mahnen zu erhöhter Aufmerksamkeit, insbesondere zur Verringerung der Geschwindigkeit im Hinblick auf eine Gefahrsituation (§ 40 Absatz 1 StVO). Außerhalb geschlossener Ortschaften stehen sie im Allgemeinen 150 bis 250 m vor der Gefahrstelle (§ 40 Absatz 2 StVO).",
      "keyPoints": [
        {
          "label": "Bezeichnung: Gegenverkehr",
          "keywords": [
            "125",
            "gegenverkehr"
          ]
        },
        {
          "label": "Gefahrzeichen: Aufmerksamkeit, Geschwindigkeit anpassen",
          "keywords": [
            "gefahrzeichen",
            "warnt",
            "aufmerksam",
            "langsam",
            "geschwindigkeit",
            "vorsicht"
          ]
        },
        {
          "label": "Außerorts 150–250 m vor der Gefahrstelle",
          "keywords": [
            "150",
            "250",
            "außerorts"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Wie verhalten Sie sich nach diesem Gefahrzeichen?",
        "Wo wird dieses Zeichen innerorts und außerorts aufgestellt?"
      ],
      "source": "StVO Anlage 1, lfd. Nr. 14"
    },
    {
      "id": "vz-131",
      "subject": "zeichen",
      "sign": "131",
      "signLabel": "Zeichen 131",
      "kind": "Zeichen",
      "anlage": 1,
      "lfd": "15",
      "name": "Lichtzeichenanlage",
      "category": "Gefahrzeichen (Anlage 1), Allgemeine Gefahrzeichen (zu § 40 Absatz 6)",
      "topic": "Zeichen 131 – Lichtzeichenanlage",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 1,
      "images": [
        "x73"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 131 „Lichtzeichenanlage“ – Gefahrzeichen (Anlage 1), Allgemeine Gefahrzeichen (zu § 40 Absatz 6). Gefahrzeichen mahnen zu erhöhter Aufmerksamkeit, insbesondere zur Verringerung der Geschwindigkeit im Hinblick auf eine Gefahrsituation (§ 40 Absatz 1 StVO). Außerhalb geschlossener Ortschaften stehen sie im Allgemeinen 150 bis 250 m vor der Gefahrstelle (§ 40 Absatz 2 StVO).",
      "keyPoints": [
        {
          "label": "Bezeichnung: Lichtzeichenanlage",
          "keywords": [
            "131",
            "lichtzeichenanlage"
          ]
        },
        {
          "label": "Gefahrzeichen: Aufmerksamkeit, Geschwindigkeit anpassen",
          "keywords": [
            "gefahrzeichen",
            "warnt",
            "aufmerksam",
            "langsam",
            "geschwindigkeit",
            "vorsicht"
          ]
        },
        {
          "label": "Außerorts 150–250 m vor der Gefahrstelle",
          "keywords": [
            "150",
            "250",
            "außerorts"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Wie verhalten Sie sich nach diesem Gefahrzeichen?",
        "Wo wird dieses Zeichen innerorts und außerorts aufgestellt?"
      ],
      "source": "StVO Anlage 1, lfd. Nr. 15"
    },
    {
      "id": "vz-133",
      "subject": "zeichen",
      "sign": "133",
      "signLabel": "Zeichen 133",
      "kind": "Zeichen",
      "anlage": 1,
      "lfd": "16",
      "name": "Fußgänger",
      "category": "Gefahrzeichen (Anlage 1), Allgemeine Gefahrzeichen (zu § 40 Absatz 6)",
      "topic": "Zeichen 133 – Fußgänger",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 1,
      "images": [
        "x74"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 133 „Fußgänger“ – Gefahrzeichen (Anlage 1), Allgemeine Gefahrzeichen (zu § 40 Absatz 6). Gefahrzeichen mahnen zu erhöhter Aufmerksamkeit, insbesondere zur Verringerung der Geschwindigkeit im Hinblick auf eine Gefahrsituation (§ 40 Absatz 1 StVO). Außerhalb geschlossener Ortschaften stehen sie im Allgemeinen 150 bis 250 m vor der Gefahrstelle (§ 40 Absatz 2 StVO).",
      "keyPoints": [
        {
          "label": "Bezeichnung: Fußgänger",
          "keywords": [
            "133",
            "fußgänger"
          ]
        },
        {
          "label": "Gefahrzeichen: Aufmerksamkeit, Geschwindigkeit anpassen",
          "keywords": [
            "gefahrzeichen",
            "warnt",
            "aufmerksam",
            "langsam",
            "geschwindigkeit",
            "vorsicht"
          ]
        },
        {
          "label": "Außerorts 150–250 m vor der Gefahrstelle",
          "keywords": [
            "150",
            "250",
            "außerorts"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Wie verhalten Sie sich nach diesem Gefahrzeichen?",
        "Wo wird dieses Zeichen innerorts und außerorts aufgestellt?"
      ],
      "source": "StVO Anlage 1, lfd. Nr. 16"
    },
    {
      "id": "vz-136",
      "subject": "zeichen",
      "sign": "136",
      "signLabel": "Zeichen 136",
      "kind": "Zeichen",
      "anlage": 1,
      "lfd": "17",
      "name": "Kinder",
      "category": "Gefahrzeichen (Anlage 1), Allgemeine Gefahrzeichen (zu § 40 Absatz 6)",
      "topic": "Zeichen 136 – Kinder",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 1,
      "images": [
        "x75"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 136 „Kinder“ – Gefahrzeichen (Anlage 1), Allgemeine Gefahrzeichen (zu § 40 Absatz 6). Gefahrzeichen mahnen zu erhöhter Aufmerksamkeit, insbesondere zur Verringerung der Geschwindigkeit im Hinblick auf eine Gefahrsituation (§ 40 Absatz 1 StVO). Außerhalb geschlossener Ortschaften stehen sie im Allgemeinen 150 bis 250 m vor der Gefahrstelle (§ 40 Absatz 2 StVO).",
      "keyPoints": [
        {
          "label": "Bezeichnung: Kinder",
          "keywords": [
            "136",
            "kinder"
          ]
        },
        {
          "label": "Gefahrzeichen: Aufmerksamkeit, Geschwindigkeit anpassen",
          "keywords": [
            "gefahrzeichen",
            "warnt",
            "aufmerksam",
            "langsam",
            "geschwindigkeit",
            "vorsicht"
          ]
        },
        {
          "label": "Außerorts 150–250 m vor der Gefahrstelle",
          "keywords": [
            "150",
            "250",
            "außerorts"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Wie verhalten Sie sich nach diesem Gefahrzeichen?",
        "Wo wird dieses Zeichen innerorts und außerorts aufgestellt?"
      ],
      "source": "StVO Anlage 1, lfd. Nr. 17"
    },
    {
      "id": "vz-138",
      "subject": "zeichen",
      "sign": "138",
      "signLabel": "Zeichen 138",
      "kind": "Zeichen",
      "anlage": 1,
      "lfd": "18",
      "name": "Radverkehr",
      "category": "Gefahrzeichen (Anlage 1), Allgemeine Gefahrzeichen (zu § 40 Absatz 6)",
      "topic": "Zeichen 138 – Radverkehr",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 1,
      "images": [
        "x76"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 138 „Radverkehr“ – Gefahrzeichen (Anlage 1), Allgemeine Gefahrzeichen (zu § 40 Absatz 6). Gefahrzeichen mahnen zu erhöhter Aufmerksamkeit, insbesondere zur Verringerung der Geschwindigkeit im Hinblick auf eine Gefahrsituation (§ 40 Absatz 1 StVO). Außerhalb geschlossener Ortschaften stehen sie im Allgemeinen 150 bis 250 m vor der Gefahrstelle (§ 40 Absatz 2 StVO).",
      "keyPoints": [
        {
          "label": "Bezeichnung: Radverkehr",
          "keywords": [
            "138",
            "radverkehr"
          ]
        },
        {
          "label": "Gefahrzeichen: Aufmerksamkeit, Geschwindigkeit anpassen",
          "keywords": [
            "gefahrzeichen",
            "warnt",
            "aufmerksam",
            "langsam",
            "geschwindigkeit",
            "vorsicht"
          ]
        },
        {
          "label": "Außerorts 150–250 m vor der Gefahrstelle",
          "keywords": [
            "150",
            "250",
            "außerorts"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Wie verhalten Sie sich nach diesem Gefahrzeichen?",
        "Wo wird dieses Zeichen innerorts und außerorts aufgestellt?"
      ],
      "source": "StVO Anlage 1, lfd. Nr. 18"
    },
    {
      "id": "vz-142",
      "subject": "zeichen",
      "sign": "142",
      "signLabel": "Zeichen 142",
      "kind": "Zeichen",
      "anlage": 1,
      "lfd": "19",
      "name": "Wildwechsel",
      "category": "Gefahrzeichen (Anlage 1), Allgemeine Gefahrzeichen (zu § 40 Absatz 6)",
      "topic": "Zeichen 142 – Wildwechsel",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 1,
      "images": [
        "x88"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 142 „Wildwechsel“ – Gefahrzeichen (Anlage 1), Allgemeine Gefahrzeichen (zu § 40 Absatz 6). Gefahrzeichen mahnen zu erhöhter Aufmerksamkeit, insbesondere zur Verringerung der Geschwindigkeit im Hinblick auf eine Gefahrsituation (§ 40 Absatz 1 StVO). Außerhalb geschlossener Ortschaften stehen sie im Allgemeinen 150 bis 250 m vor der Gefahrstelle (§ 40 Absatz 2 StVO).",
      "keyPoints": [
        {
          "label": "Bezeichnung: Wildwechsel",
          "keywords": [
            "142",
            "wildwechsel"
          ]
        },
        {
          "label": "Gefahrzeichen: Aufmerksamkeit, Geschwindigkeit anpassen",
          "keywords": [
            "gefahrzeichen",
            "warnt",
            "aufmerksam",
            "langsam",
            "geschwindigkeit",
            "vorsicht"
          ]
        },
        {
          "label": "Außerorts 150–250 m vor der Gefahrstelle",
          "keywords": [
            "150",
            "250",
            "außerorts"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Wie verhalten Sie sich nach diesem Gefahrzeichen?",
        "Wo wird dieses Zeichen innerorts und außerorts aufgestellt?"
      ],
      "source": "StVO Anlage 1, lfd. Nr. 19"
    },
    {
      "id": "vz-151",
      "subject": "zeichen",
      "sign": "151",
      "signLabel": "Zeichen 151",
      "kind": "Zeichen",
      "anlage": 1,
      "lfd": "20",
      "name": "Bahnübergang",
      "category": "Gefahrzeichen (Anlage 1), Besondere Gefahrzeichen vor Übergängen von Schienenbahnen mit Vorrang (zu § 40 Absatz 7)",
      "topic": "Zeichen 151 – Bahnübergang",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 1,
      "images": [
        "x89"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 151 „Bahnübergang“ – Gefahrzeichen (Anlage 1), Besondere Gefahrzeichen vor Übergängen von Schienenbahnen mit Vorrang (zu § 40 Absatz 7). Gefahrzeichen mahnen zu erhöhter Aufmerksamkeit, insbesondere zur Verringerung der Geschwindigkeit im Hinblick auf eine Gefahrsituation (§ 40 Absatz 1 StVO). Außerhalb geschlossener Ortschaften stehen sie im Allgemeinen 150 bis 250 m vor der Gefahrstelle (§ 40 Absatz 2 StVO).",
      "keyPoints": [
        {
          "label": "Bezeichnung: Bahnübergang",
          "keywords": [
            "151",
            "bahnübergang"
          ]
        },
        {
          "label": "Gefahrzeichen: Aufmerksamkeit, Geschwindigkeit anpassen",
          "keywords": [
            "gefahrzeichen",
            "warnt",
            "aufmerksam",
            "langsam",
            "geschwindigkeit",
            "vorsicht"
          ]
        },
        {
          "label": "Außerorts 150–250 m vor der Gefahrstelle",
          "keywords": [
            "150",
            "250",
            "außerorts"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Wie verhalten Sie sich nach diesem Gefahrzeichen?",
        "Wo wird dieses Zeichen innerorts und außerorts aufgestellt?"
      ],
      "source": "StVO Anlage 1, lfd. Nr. 20"
    },
    {
      "id": "vz-156",
      "subject": "zeichen",
      "sign": "156",
      "signLabel": "Zeichen 156",
      "kind": "Zeichen",
      "anlage": 1,
      "lfd": "21",
      "name": "Bahnübergang mit dreistreifiger Bake",
      "category": "Gefahrzeichen (Anlage 1), Besondere Gefahrzeichen vor Übergängen von Schienenbahnen mit Vorrang (zu § 40 Absatz 7)",
      "topic": "Zeichen 156 – Bahnübergang mit dreistreifiger Bake",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 1,
      "images": [
        "x90"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Bahnübergang mit dreistreifiger Bake etwa 240 m vor dem Bahnübergang. Die Angabe erheblich abweichender Abstände kann an der dreistreifigen, zweistreifigen und einstreifigen Bake oberhalb der Schrägstreifen in schwarzen Ziffern erfolgen."
        }
      ],
      "modelAnswer": "Das ist Zeichen 156 „Bahnübergang mit dreistreifiger Bake“ – Gefahrzeichen (Anlage 1), Besondere Gefahrzeichen vor Übergängen von Schienenbahnen mit Vorrang (zu § 40 Absatz 7). Gefahrzeichen mahnen zu erhöhter Aufmerksamkeit, insbesondere zur Verringerung der Geschwindigkeit im Hinblick auf eine Gefahrsituation (§ 40 Absatz 1 StVO). Außerhalb geschlossener Ortschaften stehen sie im Allgemeinen 150 bis 250 m vor der Gefahrstelle (§ 40 Absatz 2 StVO). Bahnübergang mit dreistreifiger Bake etwa 240 m vor dem Bahnübergang. Die Angabe erheblich abweichender Abstände kann an der dreistreifigen, zweistreifigen und einstreifigen Bake oberhalb der Schrägstreifen in schwarzen Ziffern erfolgen.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Bahnübergang mit dreistreifiger Bake",
          "keywords": [
            "156",
            "bake",
            "bahnübergang",
            "dreistreifiger",
            "bahnübergang mit dreistreifiger bake"
          ]
        },
        {
          "label": "Gefahrzeichen: Aufmerksamkeit, Geschwindigkeit anpassen",
          "keywords": [
            "gefahrzeichen",
            "warnt",
            "aufmerksam",
            "langsam",
            "geschwindigkeit",
            "vorsicht"
          ]
        },
        {
          "label": "Bahnübergang mit dreistreifiger Bake etwa 240 m vor dem Bahnübergang. Die Angabe erheblich abweichender …",
          "keywords": [
            "240 m",
            "dreistreifiger",
            "dreistreifigen",
            "zweistreifigen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Wie verhalten Sie sich nach diesem Gefahrzeichen?",
        "Wo wird dieses Zeichen innerorts und außerorts aufgestellt?"
      ],
      "source": "StVO Anlage 1, lfd. Nr. 21"
    },
    {
      "id": "vz-159",
      "subject": "zeichen",
      "sign": "159",
      "signLabel": "Zeichen 159",
      "kind": "Zeichen",
      "anlage": 1,
      "lfd": "22",
      "name": "Zweistreifige Bake",
      "category": "Gefahrzeichen (Anlage 1), Besondere Gefahrzeichen vor Übergängen von Schienenbahnen mit Vorrang (zu § 40 Absatz 7)",
      "topic": "Zeichen 159 – Zweistreifige Bake",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 1,
      "images": [
        "x100"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Zweistreifige Bake etwa 160 m vor dem Bahnübergang"
        }
      ],
      "modelAnswer": "Das ist Zeichen 159 „Zweistreifige Bake“ – Gefahrzeichen (Anlage 1), Besondere Gefahrzeichen vor Übergängen von Schienenbahnen mit Vorrang (zu § 40 Absatz 7). Gefahrzeichen mahnen zu erhöhter Aufmerksamkeit, insbesondere zur Verringerung der Geschwindigkeit im Hinblick auf eine Gefahrsituation (§ 40 Absatz 1 StVO). Außerhalb geschlossener Ortschaften stehen sie im Allgemeinen 150 bis 250 m vor der Gefahrstelle (§ 40 Absatz 2 StVO). Zweistreifige Bake etwa 160 m vor dem Bahnübergang.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Zweistreifige Bake",
          "keywords": [
            "159",
            "bake",
            "zweistreifige",
            "zweistreifige bake"
          ]
        },
        {
          "label": "Gefahrzeichen: Aufmerksamkeit, Geschwindigkeit anpassen",
          "keywords": [
            "gefahrzeichen",
            "warnt",
            "aufmerksam",
            "langsam",
            "geschwindigkeit",
            "vorsicht"
          ]
        },
        {
          "label": "Zweistreifige Bake etwa 160 m vor dem Bahnübergang",
          "keywords": [
            "160 m",
            "zweistreifige",
            "bahnübergang",
            "bake"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Wie verhalten Sie sich nach diesem Gefahrzeichen?",
        "Wo wird dieses Zeichen innerorts und außerorts aufgestellt?"
      ],
      "source": "StVO Anlage 1, lfd. Nr. 22"
    },
    {
      "id": "vz-162",
      "subject": "zeichen",
      "sign": "162",
      "signLabel": "Zeichen 162",
      "kind": "Zeichen",
      "anlage": 1,
      "lfd": "23",
      "name": "Einstreifige Bake",
      "category": "Gefahrzeichen (Anlage 1), Besondere Gefahrzeichen vor Übergängen von Schienenbahnen mit Vorrang (zu § 40 Absatz 7)",
      "topic": "Zeichen 162 – Einstreifige Bake",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 1,
      "images": [
        "x101"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Einstreifige Bake etwa 80 m vor dem Bahnübergang"
        }
      ],
      "modelAnswer": "Das ist Zeichen 162 „Einstreifige Bake“ – Gefahrzeichen (Anlage 1), Besondere Gefahrzeichen vor Übergängen von Schienenbahnen mit Vorrang (zu § 40 Absatz 7). Gefahrzeichen mahnen zu erhöhter Aufmerksamkeit, insbesondere zur Verringerung der Geschwindigkeit im Hinblick auf eine Gefahrsituation (§ 40 Absatz 1 StVO). Außerhalb geschlossener Ortschaften stehen sie im Allgemeinen 150 bis 250 m vor der Gefahrstelle (§ 40 Absatz 2 StVO). Einstreifige Bake etwa 80 m vor dem Bahnübergang.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Einstreifige Bake",
          "keywords": [
            "162",
            "bake",
            "einstreifige",
            "einstreifige bake"
          ]
        },
        {
          "label": "Gefahrzeichen: Aufmerksamkeit, Geschwindigkeit anpassen",
          "keywords": [
            "gefahrzeichen",
            "warnt",
            "aufmerksam",
            "langsam",
            "geschwindigkeit",
            "vorsicht"
          ]
        },
        {
          "label": "Einstreifige Bake etwa 80 m vor dem Bahnübergang",
          "keywords": [
            "80 m",
            "einstreifige",
            "bahnübergang",
            "bake"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Wie verhalten Sie sich nach diesem Gefahrzeichen?",
        "Wo wird dieses Zeichen innerorts und außerorts aufgestellt?"
      ],
      "source": "StVO Anlage 1, lfd. Nr. 23"
    },
    {
      "id": "vz-201",
      "subject": "zeichen",
      "sign": "201",
      "signLabel": "Zeichen 201",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "1",
      "name": "Andreaskreuz",
      "category": "Vorschriftzeichen (Anlage 2), Wartegebote und Haltgebote",
      "topic": "Zeichen 201 – Andreaskreuz",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x109"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "1. Wer ein Fahrzeug führt, muss dem Schienenverkehr Vorrang gewähren. 2. Wer ein Fahrzeug führt, darf bis zu 10 m vor diesem Zeichen nicht halten, wenn es dadurch verdeckt wird. 3. Wer ein Fahrzeug führt, darf vor und hinter diesem Zeichen a) innerhalb geschlossener Ortschaften (Zeichen 310 und 311) bis zu je 5 m, b) außerhalb geschlossener Ortschaften bis zu je 50 m nicht parken. 4. Ein Zusatzzeichen mit schwarzem Pfeil zeigt an, dass das Andreaskreuz nur für den Straßenverkehr in Richtung dieses Pfeils gilt."
        },
        {
          "type": "erlaeuterung",
          "text": "Das Zeichen (auch liegend) befindet sich vor dem Bahnübergang, in der Regel unmittelbar davor. Ein Blitzpfeil in der Mitte des Andreaskreuzes zeigt an, dass die Bahnstrecke eine Spannung führende Fahrleitung hat."
        }
      ],
      "modelAnswer": "Das ist Zeichen 201 „Andreaskreuz“ – Vorschriftzeichen (Anlage 2), Wartegebote und Haltgebote. 1. Wer ein Fahrzeug führt, muss dem Schienenverkehr Vorrang gewähren. 2. Wer ein Fahrzeug führt, darf bis zu 10 m vor diesem Zeichen nicht halten, wenn es dadurch verdeckt wird. 3. Wer ein Fahrzeug führt, darf vor und hinter diesem Zeichen a) innerhalb geschlossener Ortschaften (Zeichen 310 und 311) bis zu je 5 m, b) außerhalb geschlossener Ortschaften bis zu je 50 m nicht parken. 4. Ein Zusatzzeichen mit schwarzem Pfeil zeigt an, dass das Andreaskreuz nur für den Straßenverkehr in Richtung dieses Pfeils gilt. Das Zeichen (auch liegend) befindet sich vor dem Bahnübergang, in der Regel unmittelbar davor. Ein Blitzpfeil in der Mitte des Andreaskreuzes zeigt an, dass die Bahnstrecke eine Spannung führende Fahrleitung hat.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Andreaskreuz",
          "keywords": [
            "201",
            "andreaskreuz"
          ]
        },
        {
          "label": "1. Wer ein Fahrzeug führt, muss dem Schienenverkehr Vorrang gewähren.",
          "keywords": [
            "schienenverkehr",
            "gewähren",
            "vorrang"
          ]
        },
        {
          "label": "2. Wer ein Fahrzeug führt, darf bis zu 10 m vor diesem Zeichen nicht halten, wenn es dadurch verdeckt wird.",
          "keywords": [
            "10 m",
            "verdeckt"
          ]
        },
        {
          "label": "3. Wer ein Fahrzeug führt, darf vor und hinter diesem Zeichen a) innerhalb geschlossener Ortschaften …",
          "keywords": [
            "5 m",
            "50 m",
            "geschlossener",
            "ortschaften"
          ]
        },
        {
          "label": "4. Ein Zusatzzeichen mit schwarzem Pfeil zeigt an, dass das Andreaskreuz nur für den Straßenverkehr in …",
          "keywords": [
            "straßenverkehr",
            "andreaskreuz",
            "schwarzem",
            "richtung"
          ]
        },
        {
          "label": "Das Zeichen (auch liegend) befindet sich vor dem Bahnübergang, in der Regel unmittelbar davor. Ein …",
          "keywords": [
            "andreaskreuzes",
            "bahnübergang",
            "unmittelbar",
            "bahnstrecke"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 1"
    },
    {
      "id": "vz-205",
      "subject": "zeichen",
      "sign": "205",
      "signLabel": "Zeichen 205",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "2",
      "name": "Vorfahrt gewähren",
      "category": "Vorschriftzeichen (Anlage 2), Wartegebote und Haltgebote",
      "topic": "Zeichen 205 – Vorfahrt gewähren",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x116"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "1. Wer ein Fahrzeug führt, muss Vorfahrt gewähren. 2. Wer ein Fahrzeug führt, darf bis zu 10 m vor diesem Zeichen nicht halten, wenn es dadurch verdeckt wird."
        },
        {
          "type": "erlaeuterung",
          "text": "Das Zeichen steht unmittelbar vor der Kreuzung oder Einmündung. Es kann durch dasselbe Zeichen mit Zusatzzeichen, das die Entfernung angibt, angekündigt sein."
        }
      ],
      "modelAnswer": "Das ist Zeichen 205 „Vorfahrt gewähren“ – Vorschriftzeichen (Anlage 2), Wartegebote und Haltgebote. 1. Wer ein Fahrzeug führt, muss Vorfahrt gewähren. 2. Wer ein Fahrzeug führt, darf bis zu 10 m vor diesem Zeichen nicht halten, wenn es dadurch verdeckt wird. Das Zeichen steht unmittelbar vor der Kreuzung oder Einmündung. Es kann durch dasselbe Zeichen mit Zusatzzeichen, das die Entfernung angibt, angekündigt sein.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Vorfahrt gewähren",
          "keywords": [
            "205",
            "gewähren",
            "vorfahrt",
            "vorfahrt gewähren"
          ]
        },
        {
          "label": "1. Wer ein Fahrzeug führt, muss Vorfahrt gewähren.",
          "keywords": [
            "vorfahrt",
            "gewähren"
          ]
        },
        {
          "label": "2. Wer ein Fahrzeug führt, darf bis zu 10 m vor diesem Zeichen nicht halten, wenn es dadurch verdeckt wird.",
          "keywords": [
            "10 m",
            "verdeckt"
          ]
        },
        {
          "label": "Das Zeichen steht unmittelbar vor der Kreuzung oder Einmündung. Es kann durch dasselbe Zeichen mit …",
          "keywords": [
            "unmittelbar",
            "angekündigt",
            "einmündung",
            "entfernung"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 2"
    },
    {
      "id": "vz-z2-2-1",
      "subject": "zeichen",
      "sign": null,
      "signLabel": "Zusatzzeichen",
      "kind": "Zusatzzeichen",
      "anlage": 2,
      "lfd": "2.1",
      "name": "Radverkehr von links und rechts (zu Zeichen 205)",
      "category": "Zusatzzeichen (Anlage 2), Wartegebote und Haltgebote",
      "topic": "Zusatzzeichen – Radverkehr von links und rechts (zu Zeichen 205)",
      "question": "Was bedeutet dieses Zusatzzeichen? Erklären Sie, zu welchem Zeichen es gehört und was es regelt.",
      "difficulty": 2,
      "images": [
        "x117"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Ist das Zusatzzeichen zusammen mit dem Zeichen 205 angeordnet, bedeutet es: Wer ein Fahrzeug führt, muss Vorfahrt gewähren und dabei auf Radverkehr und Elektrokleinstfahrzeuge im Sinne der eKFV von links und rechts achten."
        },
        {
          "type": "erlaeuterung",
          "text": "Das Zusatzzeichen steht über dem Zeichen 205."
        }
      ],
      "modelAnswer": "Das ist Zusatzzeichen „Radverkehr von links und rechts (zu Zeichen 205)“ – Zusatzzeichen (Anlage 2), Wartegebote und Haltgebote. Ist das Zusatzzeichen zusammen mit dem Zeichen 205 angeordnet, bedeutet es: Wer ein Fahrzeug führt, muss Vorfahrt gewähren und dabei auf Radverkehr und Elektrokleinstfahrzeuge im Sinne der eKFV von links und rechts achten. Das Zusatzzeichen steht über dem Zeichen 205.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Radverkehr von links und rechts (zu Zeichen 205)",
          "keywords": [
            "radverkehr",
            "radverkehr von links und rechts (zu zeichen 205)"
          ]
        },
        {
          "label": "Zusatzzeichen zum Hauptzeichen",
          "keywords": [
            "zusatzzeichen",
            "205"
          ]
        },
        {
          "label": "Ist das Zusatzzeichen zusammen mit dem Zeichen 205 angeordnet, bedeutet es: Wer ein Fahrzeug führt, muss …",
          "keywords": [
            "elektrokleinstfahrzeuge",
            "radverkehr",
            "vorfahrt",
            "gewähren"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Mit welchem Hauptzeichen wird dieses Zusatzzeichen verwendet?",
        "Wo steht das Zusatzzeichen?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 2.1"
    },
    {
      "id": "vz-z2-2-2",
      "subject": "zeichen",
      "sign": null,
      "signLabel": "Zusatzzeichen",
      "kind": "Zusatzzeichen",
      "anlage": 2,
      "lfd": "2.2",
      "name": "Straßenbahn (zu Zeichen 205)",
      "category": "Zusatzzeichen (Anlage 2), Wartegebote und Haltgebote",
      "topic": "Zusatzzeichen – Straßenbahn (zu Zeichen 205)",
      "question": "Was bedeutet dieses Zusatzzeichen? Erklären Sie, zu welchem Zeichen es gehört und was es regelt.",
      "difficulty": 2,
      "images": [
        "x125"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Ist das Zusatzzeichen zusammen mit dem Zeichen 205 angeordnet, bedeutet es: Wer ein Fahrzeug führt, muss der Straßenbahn Vorfahrt gewähren."
        },
        {
          "type": "erlaeuterung",
          "text": "Das Zusatzzeichen steht über dem Zeichen 205."
        }
      ],
      "modelAnswer": "Das ist Zusatzzeichen „Straßenbahn (zu Zeichen 205)“ – Zusatzzeichen (Anlage 2), Wartegebote und Haltgebote. Ist das Zusatzzeichen zusammen mit dem Zeichen 205 angeordnet, bedeutet es: Wer ein Fahrzeug führt, muss der Straßenbahn Vorfahrt gewähren. Das Zusatzzeichen steht über dem Zeichen 205.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Straßenbahn (zu Zeichen 205)",
          "keywords": [
            "straßenbahn",
            "straßenbahn (zu zeichen 205)"
          ]
        },
        {
          "label": "Zusatzzeichen zum Hauptzeichen",
          "keywords": [
            "zusatzzeichen",
            "205"
          ]
        },
        {
          "label": "Ist das Zusatzzeichen zusammen mit dem Zeichen 205 angeordnet, bedeutet es: Wer ein Fahrzeug führt, muss der …",
          "keywords": [
            "straßenbahn",
            "vorfahrt",
            "gewähren"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Mit welchem Hauptzeichen wird dieses Zusatzzeichen verwendet?",
        "Wo steht das Zusatzzeichen?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 2.2"
    },
    {
      "id": "vz-206",
      "subject": "zeichen",
      "sign": "206",
      "signLabel": "Zeichen 206",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "3",
      "name": "Halt. Vorfahrt gewähren",
      "category": "Vorschriftzeichen (Anlage 2), Wartegebote und Haltgebote",
      "topic": "Zeichen 206 – Halt. Vorfahrt gewähren",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x126"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "1. Wer ein Fahrzeug führt, muss anhalten und Vorfahrt gewähren. 2. Wer ein Fahrzeug führt, darf bis zu 10 m vor diesem Zeichen nicht halten, wenn es dadurch verdeckt wird. 3. Ist keine Haltlinie (Zeichen 294) vorhanden, ist dort anzuhalten, wo die andere Straße zu übersehen ist."
        }
      ],
      "modelAnswer": "Das ist Zeichen 206 „Halt. Vorfahrt gewähren“ – Vorschriftzeichen (Anlage 2), Wartegebote und Haltgebote. 1. Wer ein Fahrzeug führt, muss anhalten und Vorfahrt gewähren. 2. Wer ein Fahrzeug führt, darf bis zu 10 m vor diesem Zeichen nicht halten, wenn es dadurch verdeckt wird. 3. Ist keine Haltlinie (Zeichen 294) vorhanden, ist dort anzuhalten, wo die andere Straße zu übersehen ist.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Halt. Vorfahrt gewähren",
          "keywords": [
            "206",
            "halt",
            "gewähren",
            "vorfahrt",
            "halt. vorfahrt gewähren"
          ]
        },
        {
          "label": "1. Wer ein Fahrzeug führt, muss anhalten und Vorfahrt gewähren.",
          "keywords": [
            "anhalten",
            "vorfahrt",
            "gewähren"
          ]
        },
        {
          "label": "2. Wer ein Fahrzeug führt, darf bis zu 10 m vor diesem Zeichen nicht halten, wenn es dadurch verdeckt wird.",
          "keywords": [
            "10 m",
            "verdeckt"
          ]
        },
        {
          "label": "3. Ist keine Haltlinie (Zeichen 294) vorhanden, ist dort anzuhalten, wo die andere Straße zu übersehen ist.",
          "keywords": [
            "anzuhalten",
            "haltlinie",
            "vorhanden",
            "übersehen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 3"
    },
    {
      "id": "vz-z2-3-1",
      "subject": "zeichen",
      "sign": null,
      "signLabel": "Zusatzzeichen",
      "kind": "Zusatzzeichen",
      "anlage": 2,
      "lfd": "3.1",
      "name": "Haltgebot in 100 m („STOP 100 m“, zu Zeichen 205)",
      "category": "Zusatzzeichen (Anlage 2), Wartegebote und Haltgebote",
      "topic": "Zusatzzeichen – Haltgebot in 100 m („STOP 100 m“, zu Zeichen 205)",
      "question": "Was bedeutet dieses Zusatzzeichen? Erklären Sie, zu welchem Zeichen es gehört und was es regelt.",
      "difficulty": 2,
      "images": [
        "x127"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Das Zusatzzeichen kündigt zusammen mit dem Zeichen 205 das Haltgebot in der angegebenen Entfernung an."
        }
      ],
      "modelAnswer": "Das ist Zusatzzeichen „Haltgebot in 100 m („STOP 100 m“, zu Zeichen 205)“ – Zusatzzeichen (Anlage 2), Wartegebote und Haltgebote. Das Zusatzzeichen kündigt zusammen mit dem Zeichen 205 das Haltgebot in der angegebenen Entfernung an.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Haltgebot in 100 m („STOP 100 m“, zu Zeichen 205)",
          "keywords": [
            "stop",
            "100 m",
            "haltgebot",
            "haltgebot in 100 m („stop 100 m“, zu zeichen 205)"
          ]
        },
        {
          "label": "Zusatzzeichen zum Hauptzeichen",
          "keywords": [
            "zusatzzeichen",
            "205"
          ]
        },
        {
          "label": "Das Zusatzzeichen kündigt zusammen mit dem Zeichen 205 das Haltgebot in der angegebenen Entfernung an.",
          "keywords": [
            "entfernung",
            "haltgebot",
            "kündigt"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Mit welchem Hauptzeichen wird dieses Zusatzzeichen verwendet?",
        "Wo steht das Zusatzzeichen?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 3.1"
    },
    {
      "id": "vz-z2-3-2",
      "subject": "zeichen",
      "sign": null,
      "signLabel": "Zusatzzeichen",
      "kind": "Zusatzzeichen",
      "anlage": 2,
      "lfd": "3.2",
      "name": "Radverkehr von links und rechts (zu Zeichen 206)",
      "category": "Zusatzzeichen (Anlage 2), Wartegebote und Haltgebote",
      "topic": "Zusatzzeichen – Radverkehr von links und rechts (zu Zeichen 206)",
      "question": "Was bedeutet dieses Zusatzzeichen? Erklären Sie, zu welchem Zeichen es gehört und was es regelt.",
      "difficulty": 2,
      "images": [
        "x137"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Ist das Zusatzzeichen zusammen mit dem Zeichen 206 angeordnet, bedeutet es: Wer ein Fahrzeug führt, muss anhalten und Vorfahrt gewähren und dabei auf Radverkehr und Elektrokleinstfahrzeuge im Sinne der eKFV von links und rechts achten."
        },
        {
          "type": "erlaeuterung",
          "text": "Das Zusatzzeichen steht über dem Zeichen 206."
        }
      ],
      "modelAnswer": "Das ist Zusatzzeichen „Radverkehr von links und rechts (zu Zeichen 206)“ – Zusatzzeichen (Anlage 2), Wartegebote und Haltgebote. Ist das Zusatzzeichen zusammen mit dem Zeichen 206 angeordnet, bedeutet es: Wer ein Fahrzeug führt, muss anhalten und Vorfahrt gewähren und dabei auf Radverkehr und Elektrokleinstfahrzeuge im Sinne der eKFV von links und rechts achten. Das Zusatzzeichen steht über dem Zeichen 206.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Radverkehr von links und rechts (zu Zeichen 206)",
          "keywords": [
            "radverkehr",
            "radverkehr von links und rechts (zu zeichen 206)"
          ]
        },
        {
          "label": "Zusatzzeichen zum Hauptzeichen",
          "keywords": [
            "zusatzzeichen",
            "206"
          ]
        },
        {
          "label": "Ist das Zusatzzeichen zusammen mit dem Zeichen 206 angeordnet, bedeutet es: Wer ein Fahrzeug führt, muss …",
          "keywords": [
            "elektrokleinstfahrzeuge",
            "radverkehr",
            "anhalten",
            "vorfahrt"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Mit welchem Hauptzeichen wird dieses Zusatzzeichen verwendet?",
        "Wo steht das Zusatzzeichen?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 3.2"
    },
    {
      "id": "vz-z2-2-3",
      "subject": "zeichen",
      "sign": null,
      "signLabel": "Zusatzzeichen",
      "kind": "Zusatzzeichen",
      "anlage": 2,
      "lfd": "Zu 2 und 3",
      "name": "Abknickende Vorfahrt (zu Zeichen 205 oder 206)",
      "category": "Zusatzzeichen (Anlage 2), Wartegebote und Haltgebote",
      "topic": "Zusatzzeichen – Abknickende Vorfahrt (zu Zeichen 205 oder 206)",
      "question": "Was bedeutet dieses Zusatzzeichen? Erklären Sie, zu welchem Zeichen es gehört und was es regelt.",
      "difficulty": 2,
      "images": [
        "x138"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Das Zusatzzeichen gibt zusammen mit den Zeichen 205 oder 206 den Verlauf der Vorfahrtstraße (abknickende Vorfahrt) bekannt."
        }
      ],
      "modelAnswer": "Das ist Zusatzzeichen „Abknickende Vorfahrt (zu Zeichen 205 oder 206)“ – Zusatzzeichen (Anlage 2), Wartegebote und Haltgebote. Das Zusatzzeichen gibt zusammen mit den Zeichen 205 oder 206 den Verlauf der Vorfahrtstraße (abknickende Vorfahrt) bekannt.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Abknickende Vorfahrt (zu Zeichen 205 oder 206)",
          "keywords": [
            "vorfahrt",
            "abknickende",
            "abknickende vorfahrt (zu zeichen 205 oder 206)"
          ]
        },
        {
          "label": "Zusatzzeichen zum Hauptzeichen",
          "keywords": [
            "zusatzzeichen",
            "205"
          ]
        },
        {
          "label": "Das Zusatzzeichen gibt zusammen mit den Zeichen 205 oder 206 den Verlauf der Vorfahrtstraße (abknickende …",
          "keywords": [
            "vorfahrtstraße",
            "abknickende",
            "vorfahrt",
            "verlauf"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Mit welchem Hauptzeichen wird dieses Zusatzzeichen verwendet?",
        "Wo steht das Zusatzzeichen?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. Zu 2 und 3"
    },
    {
      "id": "vz-208",
      "subject": "zeichen",
      "sign": "208",
      "signLabel": "Zeichen 208",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "4",
      "name": "Vorrang des Gegenverkehrs",
      "category": "Vorschriftzeichen (Anlage 2), Wartegebote und Haltgebote",
      "topic": "Zeichen 208 – Vorrang des Gegenverkehrs",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x139"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Wer ein Fahrzeug führt, hat dem Gegenverkehr Vorrang zu gewähren."
        }
      ],
      "modelAnswer": "Das ist Zeichen 208 „Vorrang des Gegenverkehrs“ – Vorschriftzeichen (Anlage 2), Wartegebote und Haltgebote. Wer ein Fahrzeug führt, hat dem Gegenverkehr Vorrang zu gewähren.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Vorrang des Gegenverkehrs",
          "keywords": [
            "208",
            "vorrang",
            "gegenverkehrs",
            "vorrang des gegenverkehrs"
          ]
        },
        {
          "label": "Wer ein Fahrzeug führt, hat dem Gegenverkehr Vorrang zu gewähren.",
          "keywords": [
            "gegenverkehr",
            "gewähren",
            "vorrang"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 4"
    },
    {
      "id": "vz-209",
      "subject": "zeichen",
      "sign": "209",
      "signLabel": "Zeichen 209",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "5",
      "name": "Rechts",
      "category": "Vorschriftzeichen (Anlage 2), Vorgeschriebene Fahrtrichtungen",
      "topic": "Zeichen 209 – Rechts",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x149"
      ],
      "official": [
        {
          "type": "allgemein",
          "text": "Wer ein Fahrzeug führt, muss der vorgeschriebenen Fahrtrichtung folgen."
        },
        {
          "type": "allgemein",
          "text": "Andere als die dargestellten Fahrtrichtungen werden entsprechend vorgeschrieben. Auf Anlage 2 laufende Nummer 70 wird hingewiesen."
        }
      ],
      "modelAnswer": "Das ist Zeichen 209 „Rechts“ – Vorschriftzeichen (Anlage 2), Vorgeschriebene Fahrtrichtungen. Wer ein Fahrzeug führt, muss der vorgeschriebenen Fahrtrichtung folgen. Andere als die dargestellten Fahrtrichtungen werden entsprechend vorgeschrieben. Auf Anlage 2 laufende Nummer 70 wird hingewiesen.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Rechts",
          "keywords": [
            "209",
            "rechts"
          ]
        },
        {
          "label": "Wer ein Fahrzeug führt, muss der vorgeschriebenen Fahrtrichtung folgen.",
          "keywords": [
            "vorgeschriebenen",
            "folgen"
          ]
        },
        {
          "label": "Andere als die dargestellten Fahrtrichtungen werden entsprechend vorgeschrieben. Auf Anlage 2 laufende …",
          "keywords": [
            "fahrtrichtungen",
            "vorgeschrieben",
            "dargestellten",
            "entsprechend"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 5"
    },
    {
      "id": "vz-211",
      "subject": "zeichen",
      "sign": "211",
      "signLabel": "Zeichen 211",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "6",
      "name": "Hier rechts",
      "category": "Vorschriftzeichen (Anlage 2), Vorgeschriebene Fahrtrichtungen",
      "topic": "Zeichen 211 – Hier rechts",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x150"
      ],
      "official": [
        {
          "type": "allgemein",
          "text": "Wer ein Fahrzeug führt, muss der vorgeschriebenen Fahrtrichtung folgen."
        },
        {
          "type": "allgemein",
          "text": "Andere als die dargestellten Fahrtrichtungen werden entsprechend vorgeschrieben. Auf Anlage 2 laufende Nummer 70 wird hingewiesen."
        }
      ],
      "modelAnswer": "Das ist Zeichen 211 „Hier rechts“ – Vorschriftzeichen (Anlage 2), Vorgeschriebene Fahrtrichtungen. Wer ein Fahrzeug führt, muss der vorgeschriebenen Fahrtrichtung folgen. Andere als die dargestellten Fahrtrichtungen werden entsprechend vorgeschrieben. Auf Anlage 2 laufende Nummer 70 wird hingewiesen.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Hier rechts",
          "keywords": [
            "211",
            "hier rechts"
          ]
        },
        {
          "label": "Wer ein Fahrzeug führt, muss der vorgeschriebenen Fahrtrichtung folgen.",
          "keywords": [
            "vorgeschriebenen",
            "folgen"
          ]
        },
        {
          "label": "Andere als die dargestellten Fahrtrichtungen werden entsprechend vorgeschrieben. Auf Anlage 2 laufende …",
          "keywords": [
            "fahrtrichtungen",
            "vorgeschrieben",
            "dargestellten",
            "entsprechend"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 6"
    },
    {
      "id": "vz-214",
      "subject": "zeichen",
      "sign": "214",
      "signLabel": "Zeichen 214",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "7",
      "name": "Geradeaus oder rechts",
      "category": "Vorschriftzeichen (Anlage 2), Vorgeschriebene Fahrtrichtungen",
      "topic": "Zeichen 214 – Geradeaus oder rechts",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x158"
      ],
      "official": [
        {
          "type": "allgemein",
          "text": "Wer ein Fahrzeug führt, muss der vorgeschriebenen Fahrtrichtung folgen."
        },
        {
          "type": "allgemein",
          "text": "Andere als die dargestellten Fahrtrichtungen werden entsprechend vorgeschrieben. Auf Anlage 2 laufende Nummer 70 wird hingewiesen."
        }
      ],
      "modelAnswer": "Das ist Zeichen 214 „Geradeaus oder rechts“ – Vorschriftzeichen (Anlage 2), Vorgeschriebene Fahrtrichtungen. Wer ein Fahrzeug führt, muss der vorgeschriebenen Fahrtrichtung folgen. Andere als die dargestellten Fahrtrichtungen werden entsprechend vorgeschrieben. Auf Anlage 2 laufende Nummer 70 wird hingewiesen.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Geradeaus oder rechts",
          "keywords": [
            "214",
            "geradeaus",
            "geradeaus oder rechts"
          ]
        },
        {
          "label": "Wer ein Fahrzeug führt, muss der vorgeschriebenen Fahrtrichtung folgen.",
          "keywords": [
            "vorgeschriebenen",
            "folgen"
          ]
        },
        {
          "label": "Andere als die dargestellten Fahrtrichtungen werden entsprechend vorgeschrieben. Auf Anlage 2 laufende …",
          "keywords": [
            "fahrtrichtungen",
            "vorgeschrieben",
            "dargestellten",
            "entsprechend"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 7"
    },
    {
      "id": "vz-215",
      "subject": "zeichen",
      "sign": "215",
      "signLabel": "Zeichen 215",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "8",
      "name": "Kreisverkehr",
      "category": "Vorschriftzeichen (Anlage 2), Vorgeschriebene Fahrtrichtungen",
      "topic": "Zeichen 215 – Kreisverkehr",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x159"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "1. Wer ein Fahrzeug führt, muss der vorgeschriebenen Fahrtrichtung im Kreisverkehr rechts folgen. 2. Wer ein Fahrzeug führt, darf die Mittelinsel des Kreisverkehrs nicht überfahren. Ausgenommen von diesem Verbot sind nur Fahrzeuge, denen wegen ihrer Abmessungen das Befahren sonst nicht möglich wäre. Mit ihnen darf die Mittelinsel und Fahrbahnbegrenzung überfahren werden, wenn eine Gefährdung anderer am Verkehr Teilnehmenden ausgeschlossen ist. 3. Es darf innerhalb des Kreisverkehrs auf der Fahrbahn nicht gehalten werden."
        }
      ],
      "modelAnswer": "Das ist Zeichen 215 „Kreisverkehr“ – Vorschriftzeichen (Anlage 2), Vorgeschriebene Fahrtrichtungen. 1. Wer ein Fahrzeug führt, muss der vorgeschriebenen Fahrtrichtung im Kreisverkehr rechts folgen. 2. Wer ein Fahrzeug führt, darf die Mittelinsel des Kreisverkehrs nicht überfahren. Ausgenommen von diesem Verbot sind nur Fahrzeuge, denen wegen ihrer Abmessungen das Befahren sonst nicht möglich wäre. Mit ihnen darf die Mittelinsel und Fahrbahnbegrenzung überfahren werden, wenn eine Gefährdung anderer am Verkehr Teilnehmenden ausgeschlossen ist. 3. Es darf innerhalb des Kreisverkehrs auf der Fahrbahn nicht gehalten werden.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Kreisverkehr",
          "keywords": [
            "215",
            "kreisverkehr"
          ]
        },
        {
          "label": "1. Wer ein Fahrzeug führt, muss der vorgeschriebenen Fahrtrichtung im Kreisverkehr rechts folgen.",
          "keywords": [
            "vorgeschriebenen",
            "kreisverkehr",
            "folgen"
          ]
        },
        {
          "label": "2. Wer ein Fahrzeug führt, darf die Mittelinsel des Kreisverkehrs nicht überfahren. Ausgenommen von diesem …",
          "keywords": [
            "fahrbahnbegrenzung",
            "ausgeschlossen",
            "kreisverkehrs",
            "teilnehmenden"
          ]
        },
        {
          "label": "3. Es darf innerhalb des Kreisverkehrs auf der Fahrbahn nicht gehalten werden.",
          "keywords": [
            "kreisverkehrs",
            "gehalten"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 8"
    },
    {
      "id": "vz-220",
      "subject": "zeichen",
      "sign": "220",
      "signLabel": "Zeichen 220",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "9",
      "name": "Einbahnstraße",
      "category": "Vorschriftzeichen (Anlage 2), Vorgeschriebene Fahrtrichtungen",
      "topic": "Zeichen 220 – Einbahnstraße",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x160"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Wer ein Fahrzeug führt, darf die Einbahnstraße nur in Richtung des Pfeils befahren."
        },
        {
          "type": "erlaeuterung",
          "text": "Das Zeichen schreibt für den Fahrzeugverkehr auf der Fahrbahn die Fahrtrichtung vor."
        }
      ],
      "modelAnswer": "Das ist Zeichen 220 „Einbahnstraße“ – Vorschriftzeichen (Anlage 2), Vorgeschriebene Fahrtrichtungen. Wer ein Fahrzeug führt, darf die Einbahnstraße nur in Richtung des Pfeils befahren. Das Zeichen schreibt für den Fahrzeugverkehr auf der Fahrbahn die Fahrtrichtung vor.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Einbahnstraße",
          "keywords": [
            "220",
            "einbahnstraße"
          ]
        },
        {
          "label": "Wer ein Fahrzeug führt, darf die Einbahnstraße nur in Richtung des Pfeils befahren.",
          "keywords": [
            "einbahnstraße",
            "richtung",
            "befahren",
            "pfeils"
          ]
        },
        {
          "label": "Das Zeichen schreibt für den Fahrzeugverkehr auf der Fahrbahn die Fahrtrichtung vor.",
          "keywords": [
            "fahrzeugverkehr",
            "schreibt"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 9"
    },
    {
      "id": "vz-z2-9-1",
      "subject": "zeichen",
      "sign": null,
      "signLabel": "Zusatzzeichen",
      "kind": "Zusatzzeichen",
      "anlage": 2,
      "lfd": "9.1",
      "name": "Radverkehr in der Gegenrichtung (zu Zeichen 220)",
      "category": "Zusatzzeichen (Anlage 2), Vorgeschriebene Fahrtrichtungen",
      "topic": "Zusatzzeichen – Radverkehr in der Gegenrichtung (zu Zeichen 220)",
      "question": "Was bedeutet dieses Zusatzzeichen? Erklären Sie, zu welchem Zeichen es gehört und was es regelt.",
      "difficulty": 2,
      "images": [
        "x170"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Ist Zeichen 220 mit diesem Zusatzzeichen angeordnet, bedeutet dies: Wer ein Fahrzeug führt, muss beim Einbiegen und im Verlauf einer Einbahnstraße auf Radverkehr und Elektrokleinstfahrzeuge im Sinne der eKFV entgegen der Fahrtrichtung achten."
        },
        {
          "type": "erlaeuterung",
          "text": "Das Zusatzzeichen zeigt an, dass Radverkehr in der Gegenrichtung zugelassen ist. Beim Vorbeifahren an einer für den gegenläufigen Radverkehr freigegebenen Einbahnstraße bleibt gegenüber dem ausfahrenden Radfahrer der Grundsatz, dass Vorfahrt hat, wer von rechts kommt (§ 8 Absatz 1 Satz 1) unberührt. Dies gilt auch für den ausfahrenden Radverkehr. Mündet eine Einbahnstraße für den gegenläufig zugelassenen Radverkehr in eine Vorfahrtstraße, steht für den aus der Einbahnstraße ausfahrenden Radverkehr das Zeichen 205."
        }
      ],
      "modelAnswer": "Das ist Zusatzzeichen „Radverkehr in der Gegenrichtung (zu Zeichen 220)“ – Zusatzzeichen (Anlage 2), Vorgeschriebene Fahrtrichtungen. Ist Zeichen 220 mit diesem Zusatzzeichen angeordnet, bedeutet dies: Wer ein Fahrzeug führt, muss beim Einbiegen und im Verlauf einer Einbahnstraße auf Radverkehr und Elektrokleinstfahrzeuge im Sinne der eKFV entgegen der Fahrtrichtung achten. Das Zusatzzeichen zeigt an, dass Radverkehr in der Gegenrichtung zugelassen ist. Beim Vorbeifahren an einer für den gegenläufigen Radverkehr freigegebenen Einbahnstraße bleibt gegenüber dem ausfahrenden Radfahrer der Grundsatz, dass Vorfahrt hat, wer von rechts kommt (§ 8 Absatz 1 Satz 1) unberührt. Dies gilt auch für den ausfahrenden Radverkehr. Mündet eine Einbahnstraße für den gegenläufig zugelassenen Radverkehr in eine Vorfahrtstraße, steht für den aus der Einbahnstraße ausfahrenden Radverkehr das Zeichen 205.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Radverkehr in der Gegenrichtung (zu Zeichen 220)",
          "keywords": [
            "radverkehr",
            "gegenrichtung",
            "radverkehr in der gegenrichtung (zu zeichen 220)"
          ]
        },
        {
          "label": "Zusatzzeichen zum Hauptzeichen",
          "keywords": [
            "zusatzzeichen",
            "220"
          ]
        },
        {
          "label": "Ist Zeichen 220 mit diesem Zusatzzeichen angeordnet, bedeutet dies: Wer ein Fahrzeug führt, muss beim …",
          "keywords": [
            "elektrokleinstfahrzeuge",
            "einbahnstraße",
            "radverkehr",
            "einbiegen"
          ]
        },
        {
          "label": "Das Zusatzzeichen zeigt an, dass Radverkehr in der Gegenrichtung zugelassen ist. Beim Vorbeifahren an einer …",
          "keywords": [
            "vorfahrtstraße",
            "gegenrichtung",
            "gegenläufigen",
            "freigegebenen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Mit welchem Hauptzeichen wird dieses Zusatzzeichen verwendet?",
        "Wo steht das Zusatzzeichen?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 9.1"
    },
    {
      "id": "vz-222",
      "subject": "zeichen",
      "sign": "222",
      "signLabel": "Zeichen 222",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "10",
      "name": "Rechts vorbei",
      "category": "Vorschriftzeichen (Anlage 2), Vorgeschriebene Vorbeifahrt",
      "topic": "Zeichen 222 – Rechts vorbei",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x171"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Wer ein Fahrzeug führt, muss der vorgeschriebenen Vorbeifahrt folgen."
        },
        {
          "type": "erlaeuterung",
          "text": "\"Links vorbei\" wird entsprechend vorgeschrieben."
        }
      ],
      "modelAnswer": "Das ist Zeichen 222 „Rechts vorbei“ – Vorschriftzeichen (Anlage 2), Vorgeschriebene Vorbeifahrt. Wer ein Fahrzeug führt, muss der vorgeschriebenen Vorbeifahrt folgen. \"Links vorbei\" wird entsprechend vorgeschrieben.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Rechts vorbei",
          "keywords": [
            "222",
            "vorbei",
            "rechts vorbei"
          ]
        },
        {
          "label": "Wer ein Fahrzeug führt, muss der vorgeschriebenen Vorbeifahrt folgen.",
          "keywords": [
            "vorgeschriebenen",
            "vorbeifahrt",
            "folgen"
          ]
        },
        {
          "label": "\"Links vorbei\" wird entsprechend vorgeschrieben.",
          "keywords": [
            "vorgeschrieben",
            "entsprechend",
            "vorbei"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 10"
    },
    {
      "id": "vz-223-1",
      "subject": "zeichen",
      "sign": "223.1",
      "signLabel": "Zeichen 223.1",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "11",
      "name": "Seitenstreifen befahren",
      "category": "Vorschriftzeichen (Anlage 2), Seitenstreifen als Fahrstreifen, Haltestellen und Taxenstände",
      "topic": "Zeichen 223.1 – Seitenstreifen befahren",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x179"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Das Zeichen gibt den Seitenstreifen als Fahrstreifen frei; dieser ist wie ein rechter Fahrstreifen zu befahren."
        },
        {
          "type": "allgemein",
          "text": "Wird das Zeichen 223.1, 223.2 oder 223.3 für eine Fahrbahn mit mehr als zwei Fahrstreifen angeordnet, zeigen die Zeichen die entsprechende Anzahl der Pfeile."
        }
      ],
      "modelAnswer": "Das ist Zeichen 223.1 „Seitenstreifen befahren“ – Vorschriftzeichen (Anlage 2), Seitenstreifen als Fahrstreifen, Haltestellen und Taxenstände. Das Zeichen gibt den Seitenstreifen als Fahrstreifen frei; dieser ist wie ein rechter Fahrstreifen zu befahren. Wird das Zeichen 223.1, 223.2 oder 223.3 für eine Fahrbahn mit mehr als zwei Fahrstreifen angeordnet, zeigen die Zeichen die entsprechende Anzahl der Pfeile.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Seitenstreifen befahren",
          "keywords": [
            "223.1",
            "befahren",
            "seitenstreifen",
            "seitenstreifen befahren"
          ]
        },
        {
          "label": "Das Zeichen gibt den Seitenstreifen als Fahrstreifen frei; dieser ist wie ein rechter Fahrstreifen zu …",
          "keywords": [
            "seitenstreifen",
            "befahren",
            "rechter",
            "gibt"
          ]
        },
        {
          "label": "Wird das Zeichen 223.1, 223.2 oder 223.3 für eine Fahrbahn mit mehr als zwei Fahrstreifen angeordnet, zeigen …",
          "keywords": [
            "entsprechende",
            "anzahl",
            "pfeile",
            "zwei"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 11"
    },
    {
      "id": "vz-z2-11-1",
      "subject": "zeichen",
      "sign": null,
      "signLabel": "Zusatzzeichen",
      "kind": "Zusatzzeichen",
      "anlage": 2,
      "lfd": "11.1",
      "name": "„Ende in … m“ (zu Zeichen 223.1)",
      "category": "Zusatzzeichen (Anlage 2), Seitenstreifen als Fahrstreifen, Haltestellen und Taxenstände",
      "topic": "Zusatzzeichen – „Ende in … m“ (zu Zeichen 223.1)",
      "question": "Was bedeutet dieses Zusatzzeichen? Erklären Sie, zu welchem Zeichen es gehört und was es regelt.",
      "difficulty": 2,
      "images": [
        "x180"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Das Zeichen 223.1 mit dem Zusatzzeichen kündigt die Aufhebung der Anordnung an."
        }
      ],
      "modelAnswer": "Das ist Zusatzzeichen „„Ende in … m“ (zu Zeichen 223.1)“ – Zusatzzeichen (Anlage 2), Seitenstreifen als Fahrstreifen, Haltestellen und Taxenstände. Das Zeichen 223.1 mit dem Zusatzzeichen kündigt die Aufhebung der Anordnung an.",
      "keyPoints": [
        {
          "label": "Bezeichnung: „Ende in … m“ (zu Zeichen 223.1)",
          "keywords": [
            "„ende in … m“ (zu zeichen 223.1)"
          ]
        },
        {
          "label": "Zusatzzeichen zum Hauptzeichen",
          "keywords": [
            "zusatzzeichen",
            "223.1"
          ]
        },
        {
          "label": "Das Zeichen 223.1 mit dem Zusatzzeichen kündigt die Aufhebung der Anordnung an.",
          "keywords": [
            "aufhebung",
            "anordnung",
            "kündigt"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Mit welchem Hauptzeichen wird dieses Zusatzzeichen verwendet?",
        "Wo steht das Zusatzzeichen?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 11.1"
    },
    {
      "id": "vz-223-2",
      "subject": "zeichen",
      "sign": "223.2",
      "signLabel": "Zeichen 223.2",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "12",
      "name": "Seitenstreifen nicht mehr befahren",
      "category": "Vorschriftzeichen (Anlage 2), Seitenstreifen als Fahrstreifen, Haltestellen und Taxenstände",
      "topic": "Zeichen 223.2 – Seitenstreifen nicht mehr befahren",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x181"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Das Zeichen hebt die Freigabe des Seitenstreifens als Fahrstreifen auf."
        },
        {
          "type": "allgemein",
          "text": "Wird das Zeichen 223.1, 223.2 oder 223.3 für eine Fahrbahn mit mehr als zwei Fahrstreifen angeordnet, zeigen die Zeichen die entsprechende Anzahl der Pfeile."
        }
      ],
      "modelAnswer": "Das ist Zeichen 223.2 „Seitenstreifen nicht mehr befahren“ – Vorschriftzeichen (Anlage 2), Seitenstreifen als Fahrstreifen, Haltestellen und Taxenstände. Das Zeichen hebt die Freigabe des Seitenstreifens als Fahrstreifen auf. Wird das Zeichen 223.1, 223.2 oder 223.3 für eine Fahrbahn mit mehr als zwei Fahrstreifen angeordnet, zeigen die Zeichen die entsprechende Anzahl der Pfeile.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Seitenstreifen nicht mehr befahren",
          "keywords": [
            "223.2",
            "befahren",
            "seitenstreifen",
            "seitenstreifen nicht mehr befahren"
          ]
        },
        {
          "label": "Das Zeichen hebt die Freigabe des Seitenstreifens als Fahrstreifen auf.",
          "keywords": [
            "seitenstreifens",
            "freigabe",
            "hebt"
          ]
        },
        {
          "label": "Wird das Zeichen 223.1, 223.2 oder 223.3 für eine Fahrbahn mit mehr als zwei Fahrstreifen angeordnet, zeigen …",
          "keywords": [
            "entsprechende",
            "anzahl",
            "pfeile",
            "zwei"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 12"
    },
    {
      "id": "vz-223-3",
      "subject": "zeichen",
      "sign": "223.3",
      "signLabel": "Zeichen 223.3",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "13",
      "name": "Seitenstreifen räumen",
      "category": "Vorschriftzeichen (Anlage 2), Seitenstreifen als Fahrstreifen, Haltestellen und Taxenstände",
      "topic": "Zeichen 223.3 – Seitenstreifen räumen",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x191"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Das Zeichen ordnet die Räumung des Seitenstreifens an."
        },
        {
          "type": "allgemein",
          "text": "Wird das Zeichen 223.1, 223.2 oder 223.3 für eine Fahrbahn mit mehr als zwei Fahrstreifen angeordnet, zeigen die Zeichen die entsprechende Anzahl der Pfeile."
        }
      ],
      "modelAnswer": "Das ist Zeichen 223.3 „Seitenstreifen räumen“ – Vorschriftzeichen (Anlage 2), Seitenstreifen als Fahrstreifen, Haltestellen und Taxenstände. Das Zeichen ordnet die Räumung des Seitenstreifens an. Wird das Zeichen 223.1, 223.2 oder 223.3 für eine Fahrbahn mit mehr als zwei Fahrstreifen angeordnet, zeigen die Zeichen die entsprechende Anzahl der Pfeile.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Seitenstreifen räumen",
          "keywords": [
            "223.3",
            "räumen",
            "seitenstreifen",
            "seitenstreifen räumen"
          ]
        },
        {
          "label": "Das Zeichen ordnet die Räumung des Seitenstreifens an.",
          "keywords": [
            "seitenstreifens",
            "räumung",
            "ordnet"
          ]
        },
        {
          "label": "Wird das Zeichen 223.1, 223.2 oder 223.3 für eine Fahrbahn mit mehr als zwei Fahrstreifen angeordnet, zeigen …",
          "keywords": [
            "entsprechende",
            "anzahl",
            "pfeile",
            "zwei"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 13"
    },
    {
      "id": "vz-224",
      "subject": "zeichen",
      "sign": "224",
      "signLabel": "Zeichen 224",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "14",
      "name": "Haltestelle",
      "category": "Vorschriftzeichen (Anlage 2), Seitenstreifen als Fahrstreifen, Haltestellen und Taxenstände",
      "topic": "Zeichen 224 – Haltestelle",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x192"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Wer ein Fahrzeug führt, darf bis zu 15 m vor und hinter dem Zeichen nicht parken."
        },
        {
          "type": "erlaeuterung",
          "text": "Das Zeichen kennzeichnet eine Haltestelle des Linienverkehrs und für Schulbusse. Das Zeichen mit dem Zusatzzeichen \"Schulbus\" (Angabe der tageszeitlichen Benutzung) auf einer gemeinsamen weißen Trägerfläche kennzeichnet eine Haltestelle nur für Schulbusse."
        }
      ],
      "modelAnswer": "Das ist Zeichen 224 „Haltestelle“ – Vorschriftzeichen (Anlage 2), Seitenstreifen als Fahrstreifen, Haltestellen und Taxenstände. Wer ein Fahrzeug führt, darf bis zu 15 m vor und hinter dem Zeichen nicht parken. Das Zeichen kennzeichnet eine Haltestelle des Linienverkehrs und für Schulbusse. Das Zeichen mit dem Zusatzzeichen \"Schulbus\" (Angabe der tageszeitlichen Benutzung) auf einer gemeinsamen weißen Trägerfläche kennzeichnet eine Haltestelle nur für Schulbusse.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Haltestelle",
          "keywords": [
            "224",
            "haltestelle"
          ]
        },
        {
          "label": "Wer ein Fahrzeug führt, darf bis zu 15 m vor und hinter dem Zeichen nicht parken.",
          "keywords": [
            "15 m",
            "hinter"
          ]
        },
        {
          "label": "Das Zeichen kennzeichnet eine Haltestelle des Linienverkehrs und für Schulbusse. Das Zeichen mit dem …",
          "keywords": [
            "tageszeitlichen",
            "linienverkehrs",
            "kennzeichnet",
            "trägerfläche"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 14"
    },
    {
      "id": "vz-229",
      "subject": "zeichen",
      "sign": "229",
      "signLabel": "Zeichen 229",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "15",
      "name": "Taxenstand",
      "category": "Vorschriftzeichen (Anlage 2), Seitenstreifen als Fahrstreifen, Haltestellen und Taxenstände",
      "topic": "Zeichen 229 – Taxenstand",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x201"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Wer ein Fahrzeug führt, darf an Taxenständen nicht halten, ausgenommen sind für die Fahrgastbeförderung bereitgehaltene Taxen."
        },
        {
          "type": "erlaeuterung",
          "text": "Die Länge des Taxenstandes wird durch die Angabe der Zahl der vorgesehenen Taxen oder das am Anfang der Strecke aufgestellte Zeichen mit einem zur Fahrbahn weisenden waagerechten weißen Pfeil und durch ein am Ende aufgestelltes Zeichen mit einem solchen von der Fahrbahn wegweisenden Pfeil oder durch eine Grenzmarkierung für Halt- und Parkverbote (Zeichen 299) gekennzeichnet."
        }
      ],
      "modelAnswer": "Das ist Zeichen 229 „Taxenstand“ – Vorschriftzeichen (Anlage 2), Seitenstreifen als Fahrstreifen, Haltestellen und Taxenstände. Wer ein Fahrzeug führt, darf an Taxenständen nicht halten, ausgenommen sind für die Fahrgastbeförderung bereitgehaltene Taxen. Die Länge des Taxenstandes wird durch die Angabe der Zahl der vorgesehenen Taxen oder das am Anfang der Strecke aufgestellte Zeichen mit einem zur Fahrbahn weisenden waagerechten weißen Pfeil und durch ein am Ende aufgestelltes Zeichen mit einem solchen von der Fahrbahn wegweisenden Pfeil oder durch eine Grenzmarkierung für Halt- und Parkverbote (Zeichen 299) gekennzeichnet.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Taxenstand",
          "keywords": [
            "229",
            "taxenstand"
          ]
        },
        {
          "label": "Wer ein Fahrzeug führt, darf an Taxenständen nicht halten, ausgenommen sind für die Fahrgastbeförderung …",
          "keywords": [
            "fahrgastbeförderung",
            "bereitgehaltene",
            "taxenständen",
            "taxen"
          ]
        },
        {
          "label": "Die Länge des Taxenstandes wird durch die Angabe der Zahl der vorgesehenen Taxen oder das am Anfang der …",
          "keywords": [
            "grenzmarkierung",
            "aufgestelltes",
            "taxenstandes",
            "vorgesehenen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 15"
    },
    {
      "id": "vz-237",
      "subject": "zeichen",
      "sign": "237",
      "signLabel": "Zeichen 237",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "16",
      "name": "Radweg",
      "category": "Vorschriftzeichen (Anlage 2), Sonderwege",
      "topic": "Zeichen 237 – Radweg",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x202"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "1. Der Radverkehr darf nicht die Fahrbahn, sondern muss den Radweg benutzen (Radwegbenutzungspflicht). 2. Anderer Verkehr darf ihn nicht benutzen. 3. Ist durch Zusatzzeichen die Benutzung eines Radwegs für eine andere Verkehrsart erlaubt, muss diese auf den Radverkehr Rücksicht nehmen und der andere Fahrzeugverkehr muss erforderlichenfalls die Geschwindigkeit an den Radverkehr anpassen. 4. § 2 Absatz 4 Satz 6 bleibt unberührt."
        }
      ],
      "modelAnswer": "Das ist Zeichen 237 „Radweg“ – Vorschriftzeichen (Anlage 2), Sonderwege. 1. Der Radverkehr darf nicht die Fahrbahn, sondern muss den Radweg benutzen (Radwegbenutzungspflicht). 2. Anderer Verkehr darf ihn nicht benutzen. 3. Ist durch Zusatzzeichen die Benutzung eines Radwegs für eine andere Verkehrsart erlaubt, muss diese auf den Radverkehr Rücksicht nehmen und der andere Fahrzeugverkehr muss erforderlichenfalls die Geschwindigkeit an den Radverkehr anpassen. 4. § 2 Absatz 4 Satz 6 bleibt unberührt.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Radweg",
          "keywords": [
            "237",
            "radweg"
          ]
        },
        {
          "label": "1. Der Radverkehr darf nicht die Fahrbahn, sondern muss den Radweg benutzen (Radwegbenutzungspflicht).",
          "keywords": [
            "radwegbenutzungspflicht",
            "radverkehr",
            "sondern",
            "radweg"
          ]
        },
        {
          "label": "3. Ist durch Zusatzzeichen die Benutzung eines Radwegs für eine andere Verkehrsart erlaubt, muss diese auf …",
          "keywords": [
            "fahrzeugverkehr",
            "geschwindigkeit",
            "verkehrsart",
            "radverkehr"
          ]
        },
        {
          "label": "4. § 2 Absatz 4 Satz 6 bleibt unberührt.",
          "keywords": [
            "unberührt",
            "bleibt",
            "satz"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 16"
    },
    {
      "id": "vz-238",
      "subject": "zeichen",
      "sign": "238",
      "signLabel": "Zeichen 238",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "17",
      "name": "Reitweg",
      "category": "Vorschriftzeichen (Anlage 2), Sonderwege",
      "topic": "Zeichen 238 – Reitweg",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x210"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "1. Wer reitet, darf nicht die Fahrbahn, sondern muss den Reitweg benutzen. Dies gilt auch für das Führen von Pferden (Reitwegbenutzungspflicht). 2. Anderer Verkehr darf ihn nicht benutzen. 3. Ist durch Zusatzzeichen die Benutzung eines Reitwegs für eine andere Verkehrsart erlaubt, muss diese auf den Reitverkehr Rücksicht nehmen und der Fahrzeugverkehr muss erforderlichenfalls die Geschwindigkeit an den Reitverkehr anpassen."
        }
      ],
      "modelAnswer": "Das ist Zeichen 238 „Reitweg“ – Vorschriftzeichen (Anlage 2), Sonderwege. 1. Wer reitet, darf nicht die Fahrbahn, sondern muss den Reitweg benutzen. Dies gilt auch für das Führen von Pferden (Reitwegbenutzungspflicht). 2. Anderer Verkehr darf ihn nicht benutzen. 3. Ist durch Zusatzzeichen die Benutzung eines Reitwegs für eine andere Verkehrsart erlaubt, muss diese auf den Reitverkehr Rücksicht nehmen und der Fahrzeugverkehr muss erforderlichenfalls die Geschwindigkeit an den Reitverkehr anpassen.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Reitweg",
          "keywords": [
            "238",
            "reitweg"
          ]
        },
        {
          "label": "1. Wer reitet, darf nicht die Fahrbahn, sondern muss den Reitweg benutzen. Dies gilt auch für das Führen von …",
          "keywords": [
            "reitwegbenutzungspflicht",
            "sondern",
            "reitweg",
            "pferden"
          ]
        },
        {
          "label": "3. Ist durch Zusatzzeichen die Benutzung eines Reitwegs für eine andere Verkehrsart erlaubt, muss diese auf …",
          "keywords": [
            "fahrzeugverkehr",
            "geschwindigkeit",
            "verkehrsart",
            "reitverkehr"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 17"
    },
    {
      "id": "vz-239",
      "subject": "zeichen",
      "sign": "239",
      "signLabel": "Zeichen 239",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "18",
      "name": "Gehweg",
      "category": "Vorschriftzeichen (Anlage 2), Sonderwege",
      "topic": "Zeichen 239 – Gehweg",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x211"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "1. Anderer als Fußgängerverkehr darf den Gehweg nicht nutzen. 2. Ist durch Zusatzzeichen die Benutzung eines Gehwegs für eine andere Verkehrsart erlaubt, muss diese auf den Fußgängerverkehr Rücksicht nehmen. Der Fußgängerverkehr darf weder gefährdet noch behindert werden. Wenn nötig, muss der Fahrverkehr warten; er darf nur mit Schrittgeschwindigkeit fahren."
        },
        {
          "type": "erlaeuterung",
          "text": "Das Zeichen kennzeichnet einen Gehweg (§ 25 Absatz 1 Satz 1), wo eine Klarstellung notwendig ist."
        }
      ],
      "modelAnswer": "Das ist Zeichen 239 „Gehweg“ – Vorschriftzeichen (Anlage 2), Sonderwege. 1. Anderer als Fußgängerverkehr darf den Gehweg nicht nutzen. 2. Ist durch Zusatzzeichen die Benutzung eines Gehwegs für eine andere Verkehrsart erlaubt, muss diese auf den Fußgängerverkehr Rücksicht nehmen. Der Fußgängerverkehr darf weder gefährdet noch behindert werden. Wenn nötig, muss der Fahrverkehr warten; er darf nur mit Schrittgeschwindigkeit fahren. Das Zeichen kennzeichnet einen Gehweg (§ 25 Absatz 1 Satz 1), wo eine Klarstellung notwendig ist.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Gehweg",
          "keywords": [
            "239",
            "gehweg"
          ]
        },
        {
          "label": "1. Anderer als Fußgängerverkehr darf den Gehweg nicht nutzen.",
          "keywords": [
            "fußgängerverkehr",
            "gehweg",
            "nutzen"
          ]
        },
        {
          "label": "2. Ist durch Zusatzzeichen die Benutzung eines Gehwegs für eine andere Verkehrsart erlaubt, muss diese auf …",
          "keywords": [
            "schrittgeschwindigkeit",
            "fußgängerverkehr",
            "verkehrsart",
            "fahrverkehr"
          ]
        },
        {
          "label": "Das Zeichen kennzeichnet einen Gehweg (§ 25 Absatz 1 Satz 1), wo eine Klarstellung notwendig ist.",
          "keywords": [
            "kennzeichnet",
            "klarstellung",
            "notwendig",
            "gehweg"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 18"
    },
    {
      "id": "vz-240",
      "subject": "zeichen",
      "sign": "240",
      "signLabel": "Zeichen 240",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "19",
      "name": "Gemeinsamer Geh- und Radweg",
      "category": "Vorschriftzeichen (Anlage 2), Sonderwege",
      "topic": "Zeichen 240 – Gemeinsamer Geh- und Radweg",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x219"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "1. Der Radverkehr darf nicht die Fahrbahn, sondern muss den gemeinsamen Geh- und Radweg benutzen (Radwegbenutzungspflicht). 2. Anderer Verkehr darf ihn nicht benutzen. 3. Ist durch Zusatzzeichen die Benutzung eines gemeinsamen Geh- und Radwegs für eine andere Verkehrsart erlaubt, muss diese auf den Fußgänger- und Radverkehr Rücksicht nehmen. Erforderlichenfalls muss der Fahrverkehr die Geschwindigkeit an den Fußgängerverkehr anpassen. 4. § 2 Absatz 4 Satz 6 bleibt unberührt."
        },
        {
          "type": "erlaeuterung",
          "text": "Das Zeichen kennzeichnet auch den Gehweg (§ 25 Absatz 1 Satz 1)."
        }
      ],
      "modelAnswer": "Das ist Zeichen 240 „Gemeinsamer Geh- und Radweg“ – Vorschriftzeichen (Anlage 2), Sonderwege. 1. Der Radverkehr darf nicht die Fahrbahn, sondern muss den gemeinsamen Geh- und Radweg benutzen (Radwegbenutzungspflicht). 2. Anderer Verkehr darf ihn nicht benutzen. 3. Ist durch Zusatzzeichen die Benutzung eines gemeinsamen Geh- und Radwegs für eine andere Verkehrsart erlaubt, muss diese auf den Fußgänger- und Radverkehr Rücksicht nehmen. Erforderlichenfalls muss der Fahrverkehr die Geschwindigkeit an den Fußgängerverkehr anpassen. 4. § 2 Absatz 4 Satz 6 bleibt unberührt. Das Zeichen kennzeichnet auch den Gehweg (§ 25 Absatz 1 Satz 1).",
      "keyPoints": [
        {
          "label": "Bezeichnung: Gemeinsamer Geh- und Radweg",
          "keywords": [
            "240",
            "radweg",
            "gemeinsamer",
            "gemeinsamer geh- und radweg"
          ]
        },
        {
          "label": "1. Der Radverkehr darf nicht die Fahrbahn, sondern muss den gemeinsamen Geh- und Radweg benutzen …",
          "keywords": [
            "radwegbenutzungspflicht",
            "gemeinsamen",
            "radverkehr",
            "sondern"
          ]
        },
        {
          "label": "3. Ist durch Zusatzzeichen die Benutzung eines gemeinsamen Geh- und Radwegs für eine andere Verkehrsart …",
          "keywords": [
            "fußgängerverkehr",
            "geschwindigkeit",
            "gemeinsamen",
            "verkehrsart"
          ]
        },
        {
          "label": "4. § 2 Absatz 4 Satz 6 bleibt unberührt.",
          "keywords": [
            "unberührt",
            "bleibt",
            "satz"
          ]
        },
        {
          "label": "Das Zeichen kennzeichnet auch den Gehweg (§ 25 Absatz 1 Satz 1).",
          "keywords": [
            "kennzeichnet",
            "gehweg",
            "satz"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 19"
    },
    {
      "id": "vz-241",
      "subject": "zeichen",
      "sign": "241",
      "signLabel": "Zeichen 241",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "20",
      "name": "Getrennter Rad- und Gehweg",
      "category": "Vorschriftzeichen (Anlage 2), Sonderwege",
      "topic": "Zeichen 241 – Getrennter Rad- und Gehweg",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x225"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "1. Der Radverkehr darf nicht die Fahrbahn, sondern muss den Radweg des getrennten Rad- und Gehwegs benutzen (Radwegbenutzungspflicht). 2. Anderer Verkehr darf ihn nicht benutzen. 3. Ist durch Zusatzzeichen die Benutzung eines getrennten Geh- und Radwegs für eine andere Verkehrsart erlaubt, darf diese nur den für den Radverkehr bestimmten Teil des getrennten Geh- und Radwegs befahren. 4. Die andere Verkehrsart muss auf den Radverkehr Rücksicht nehmen. Erforderlichenfalls muss anderer Fahrzeugverkehr die Geschwindigkeit an den Radverkehr anpassen. 5. § 2 Absatz 4 Satz 6 bleibt unberührt."
        },
        {
          "type": "erlaeuterung",
          "text": "Das Zeichen kennzeichnet auch den Gehweg (§ 25 Absatz 1 Satz 1)."
        }
      ],
      "modelAnswer": "Das ist Zeichen 241 „Getrennter Rad- und Gehweg“ – Vorschriftzeichen (Anlage 2), Sonderwege. 1. Der Radverkehr darf nicht die Fahrbahn, sondern muss den Radweg des getrennten Rad- und Gehwegs benutzen (Radwegbenutzungspflicht). 2. Anderer Verkehr darf ihn nicht benutzen. 3. Ist durch Zusatzzeichen die Benutzung eines getrennten Geh- und Radwegs für eine andere Verkehrsart erlaubt, darf diese nur den für den Radverkehr bestimmten Teil des getrennten Geh- und Radwegs befahren. 4. Die andere Verkehrsart muss auf den Radverkehr Rücksicht nehmen. Erforderlichenfalls muss anderer Fahrzeugverkehr die Geschwindigkeit an den Radverkehr anpassen. 5. § 2 Absatz 4 Satz 6 bleibt unberührt. Das Zeichen kennzeichnet auch den Gehweg (§ 25 Absatz 1 Satz 1).",
      "keyPoints": [
        {
          "label": "Bezeichnung: Getrennter Rad- und Gehweg",
          "keywords": [
            "241",
            "gehweg",
            "getrennter",
            "getrennter rad- und gehweg"
          ]
        },
        {
          "label": "1. Der Radverkehr darf nicht die Fahrbahn, sondern muss den Radweg des getrennten Rad- und Gehwegs benutzen …",
          "keywords": [
            "radwegbenutzungspflicht",
            "radverkehr",
            "getrennten",
            "sondern"
          ]
        },
        {
          "label": "3. Ist durch Zusatzzeichen die Benutzung eines getrennten Geh- und Radwegs für eine andere Verkehrsart …",
          "keywords": [
            "verkehrsart",
            "getrennten",
            "radverkehr",
            "benutzung"
          ]
        },
        {
          "label": "4. Die andere Verkehrsart muss auf den Radverkehr Rücksicht nehmen. Erforderlichenfalls muss anderer …",
          "keywords": [
            "fahrzeugverkehr",
            "geschwindigkeit",
            "verkehrsart",
            "radverkehr"
          ]
        },
        {
          "label": "5. § 2 Absatz 4 Satz 6 bleibt unberührt.",
          "keywords": [
            "unberührt",
            "bleibt",
            "satz"
          ]
        },
        {
          "label": "Das Zeichen kennzeichnet auch den Gehweg (§ 25 Absatz 1 Satz 1).",
          "keywords": [
            "kennzeichnet",
            "gehweg",
            "satz"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 20"
    },
    {
      "id": "vz-242-1",
      "subject": "zeichen",
      "sign": "242.1",
      "signLabel": "Zeichen 242.1",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "21",
      "name": "Beginn einer Fußgängerzone",
      "category": "Vorschriftzeichen (Anlage 2), Sonderwege",
      "topic": "Zeichen 242.1 – Beginn einer Fußgängerzone",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x226"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "1. Anderer als Fußgängerverkehr darf die Fußgängerzone nicht benutzen. 2. Ist durch Zusatzzeichen die Benutzung einer Fußgängerzone für eine andere Verkehrsart erlaubt, dann gilt für den Fahrverkehr Nummer 2 zu Zeichen 239 entsprechend."
        }
      ],
      "modelAnswer": "Das ist Zeichen 242.1 „Beginn einer Fußgängerzone“ – Vorschriftzeichen (Anlage 2), Sonderwege. 1. Anderer als Fußgängerverkehr darf die Fußgängerzone nicht benutzen. 2. Ist durch Zusatzzeichen die Benutzung einer Fußgängerzone für eine andere Verkehrsart erlaubt, dann gilt für den Fahrverkehr Nummer 2 zu Zeichen 239 entsprechend.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Beginn einer Fußgängerzone",
          "keywords": [
            "242.1",
            "fußgängerzone",
            "beginn einer fußgängerzone"
          ]
        },
        {
          "label": "1. Anderer als Fußgängerverkehr darf die Fußgängerzone nicht benutzen.",
          "keywords": [
            "fußgängerverkehr",
            "fußgängerzone"
          ]
        },
        {
          "label": "2. Ist durch Zusatzzeichen die Benutzung einer Fußgängerzone für eine andere Verkehrsart erlaubt, dann gilt …",
          "keywords": [
            "fußgängerzone",
            "entsprechend",
            "verkehrsart",
            "fahrverkehr"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 21"
    },
    {
      "id": "vz-242-2",
      "subject": "zeichen",
      "sign": "242.2",
      "signLabel": "Zeichen 242.2",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "22",
      "name": "Ende einer Fußgängerzone",
      "category": "Vorschriftzeichen (Anlage 2), Sonderwege",
      "topic": "Zeichen 242.2 – Ende einer Fußgängerzone",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x234"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 242.2 „Ende einer Fußgängerzone“ – Vorschriftzeichen (Anlage 2), Sonderwege.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Ende einer Fußgängerzone",
          "keywords": [
            "242.2",
            "fußgängerzone",
            "ende einer fußgängerzone"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 22"
    },
    {
      "id": "vz-244-1",
      "subject": "zeichen",
      "sign": "244.1",
      "signLabel": "Zeichen 244.1",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "23",
      "name": "Beginn einer Fahrradstraße",
      "category": "Vorschriftzeichen (Anlage 2), Sonderwege",
      "topic": "Zeichen 244.1 – Beginn einer Fahrradstraße",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x235"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "1. Anderer Fahrzeugverkehr als Radverkehr sowie Elektrokleinstfahrzeuge im Sinne der eKFV darf Fahrradstraßen nicht benutzen, es sei denn, dies ist durch Zusatzzeichen erlaubt. Die freigegebenen Verkehrsarten können auch gemeinsam auf einem Zusatzzeichen abgebildet sein. Das Überqueren einer Fahrradstraße durch anderen Fahrzeugverkehr an einer Kreuzung zum Erreichen der weiterführenden Straße ist gestattet. 2. Für den Fahrverkehr gilt eine Höchstgeschwindigkeit von 30 km/h. Der Radverkehr darf weder gefährdet noch behindert werden. Wenn nötig, muss der Kraftfahrzeugverkehr die Geschwindigkeit weiter verringern. 3. Das Nebeneinanderfahren mit Fahrrädern ist erlaubt. 4. Im Übrigen gelten die Vorschriften über die Fahrbahnbenutzung und über die Vorfahrt."
        }
      ],
      "modelAnswer": "Das ist Zeichen 244.1 „Beginn einer Fahrradstraße“ – Vorschriftzeichen (Anlage 2), Sonderwege. 1. Anderer Fahrzeugverkehr als Radverkehr sowie Elektrokleinstfahrzeuge im Sinne der eKFV darf Fahrradstraßen nicht benutzen, es sei denn, dies ist durch Zusatzzeichen erlaubt. Die freigegebenen Verkehrsarten können auch gemeinsam auf einem Zusatzzeichen abgebildet sein. Das Überqueren einer Fahrradstraße durch anderen Fahrzeugverkehr an einer Kreuzung zum Erreichen der weiterführenden Straße ist gestattet. 2. Für den Fahrverkehr gilt eine Höchstgeschwindigkeit von 30 km/h. Der Radverkehr darf weder gefährdet noch behindert werden. Wenn nötig, muss der Kraftfahrzeugverkehr die Geschwindigkeit weiter verringern. 3. Das Nebeneinanderfahren mit Fahrrädern ist erlaubt. 4. Im Übrigen gelten die Vorschriften über die Fahrbahnbenutzung und über die Vorfahrt.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Beginn einer Fahrradstraße",
          "keywords": [
            "244.1",
            "fahrradstraße",
            "beginn einer fahrradstraße"
          ]
        },
        {
          "label": "1. Anderer Fahrzeugverkehr als Radverkehr sowie Elektrokleinstfahrzeuge im Sinne der eKFV darf …",
          "keywords": [
            "elektrokleinstfahrzeuge",
            "fahrzeugverkehr",
            "weiterführenden",
            "fahrradstraßen"
          ]
        },
        {
          "label": "2. Für den Fahrverkehr gilt eine Höchstgeschwindigkeit von 30 km/h. Der Radverkehr darf weder gefährdet noch …",
          "keywords": [
            "30 km/h",
            "höchstgeschwindigkeit",
            "kraftfahrzeugverkehr",
            "geschwindigkeit"
          ]
        },
        {
          "label": "3. Das Nebeneinanderfahren mit Fahrrädern ist erlaubt.",
          "keywords": [
            "nebeneinanderfahren",
            "fahrrädern"
          ]
        },
        {
          "label": "4. Im Übrigen gelten die Vorschriften über die Fahrbahnbenutzung und über die Vorfahrt.",
          "keywords": [
            "fahrbahnbenutzung",
            "vorschriften",
            "vorfahrt",
            "übrigen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 23"
    },
    {
      "id": "vz-244-2",
      "subject": "zeichen",
      "sign": "244.2",
      "signLabel": "Zeichen 244.2",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "24",
      "name": "Ende einer Fahrradstraße",
      "category": "Vorschriftzeichen (Anlage 2), Sonderwege",
      "topic": "Zeichen 244.2 – Ende einer Fahrradstraße",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x243"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 244.2 „Ende einer Fahrradstraße“ – Vorschriftzeichen (Anlage 2), Sonderwege.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Ende einer Fahrradstraße",
          "keywords": [
            "244.2",
            "fahrradstraße",
            "ende einer fahrradstraße"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 24"
    },
    {
      "id": "vz-244-3",
      "subject": "zeichen",
      "sign": "244.3",
      "signLabel": "Zeichen 244.3",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "24.1",
      "name": "Beginn einer Fahrradzone",
      "category": "Vorschriftzeichen (Anlage 2), Sonderwege",
      "topic": "Zeichen 244.3 – Beginn einer Fahrradzone",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x244"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "1. Anderer Fahrzeugverkehr als Radverkehr sowie Elektrokleinstfahrzeuge im Sinne der eKFV darf Fahrradzonen nicht benutzen, es sei denn, dies ist durch Zusatzzeichen erlaubt. Die freigegebenen Verkehrsarten können auch gemeinsam auf einem Zusatzzeichen abgebildet sein. 2. Für den Fahrverkehr gilt eine Höchstgeschwindigkeit von 30 km/h. Der Radverkehr darf weder gefährdet noch behindert werden. Wenn nötig, muss der Kraftfahrzeugverkehr die Geschwindigkeit weiter verringern. 3. Das Nebeneinanderfahren mit Fahrrädern und Elektrokleinstfahrzeugen im Sinne der eKFV ist erlaubt. 4. Im Übrigen gelten die Vorschriften über die Fahrbahnbenutzung und über die Vorfahrt."
        }
      ],
      "modelAnswer": "Das ist Zeichen 244.3 „Beginn einer Fahrradzone“ – Vorschriftzeichen (Anlage 2), Sonderwege. 1. Anderer Fahrzeugverkehr als Radverkehr sowie Elektrokleinstfahrzeuge im Sinne der eKFV darf Fahrradzonen nicht benutzen, es sei denn, dies ist durch Zusatzzeichen erlaubt. Die freigegebenen Verkehrsarten können auch gemeinsam auf einem Zusatzzeichen abgebildet sein. 2. Für den Fahrverkehr gilt eine Höchstgeschwindigkeit von 30 km/h. Der Radverkehr darf weder gefährdet noch behindert werden. Wenn nötig, muss der Kraftfahrzeugverkehr die Geschwindigkeit weiter verringern. 3. Das Nebeneinanderfahren mit Fahrrädern und Elektrokleinstfahrzeugen im Sinne der eKFV ist erlaubt. 4. Im Übrigen gelten die Vorschriften über die Fahrbahnbenutzung und über die Vorfahrt.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Beginn einer Fahrradzone",
          "keywords": [
            "244.3",
            "fahrradzone",
            "beginn einer fahrradzone"
          ]
        },
        {
          "label": "1. Anderer Fahrzeugverkehr als Radverkehr sowie Elektrokleinstfahrzeuge im Sinne der eKFV darf Fahrradzonen …",
          "keywords": [
            "elektrokleinstfahrzeuge",
            "fahrzeugverkehr",
            "freigegebenen",
            "fahrradzonen"
          ]
        },
        {
          "label": "2. Für den Fahrverkehr gilt eine Höchstgeschwindigkeit von 30 km/h. Der Radverkehr darf weder gefährdet noch …",
          "keywords": [
            "30 km/h",
            "höchstgeschwindigkeit",
            "kraftfahrzeugverkehr",
            "geschwindigkeit"
          ]
        },
        {
          "label": "3. Das Nebeneinanderfahren mit Fahrrädern und Elektrokleinstfahrzeugen im Sinne der eKFV ist erlaubt.",
          "keywords": [
            "elektrokleinstfahrzeugen",
            "nebeneinanderfahren",
            "fahrrädern",
            "sinne"
          ]
        },
        {
          "label": "4. Im Übrigen gelten die Vorschriften über die Fahrbahnbenutzung und über die Vorfahrt.",
          "keywords": [
            "fahrbahnbenutzung",
            "vorschriften",
            "vorfahrt",
            "übrigen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 24.1"
    },
    {
      "id": "vz-244-4",
      "subject": "zeichen",
      "sign": "244.4",
      "signLabel": "Zeichen 244.4",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "24.2",
      "name": "Ende einer Fahrradzone",
      "category": "Vorschriftzeichen (Anlage 2), Sonderwege",
      "topic": "Zeichen 244.4 – Ende einer Fahrradzone",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x251"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 244.4 „Ende einer Fahrradzone“ – Vorschriftzeichen (Anlage 2), Sonderwege.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Ende einer Fahrradzone",
          "keywords": [
            "244.4",
            "fahrradzone",
            "ende einer fahrradzone"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 24.2"
    },
    {
      "id": "vz-245",
      "subject": "zeichen",
      "sign": "245",
      "signLabel": "Zeichen 245",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "25",
      "name": "Bussonderfahrstreifen",
      "category": "Vorschriftzeichen (Anlage 2), Sonderwege",
      "topic": "Zeichen 245 – Bussonderfahrstreifen",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x252"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "1. Anderer Fahrverkehr als Omnibusse des Linienverkehrs sowie nach dem Personenbeförderungsrecht mit dem Schulbus-Schild zu kennzeichnende Fahrzeuge des Schüler- und Behindertenverkehrs dürfen Bussonderfahrstreifen nicht benutzen. 2. Mit Krankenfahrzeugen, Taxen, Fahrrädern und Bussen im Gelegenheitsverkehr darf der Sonderfahrstreifen nur benutzt werden, wenn dies durch Zusatzzeichen angezeigt ist. 3. Taxen dürfen an Bushaltestellen (Zeichen 224) zum sofortigen Ein- und Aussteigen von Fahrgästen halten. 4. Mit elektrisch betriebenen Fahrzeugen darf der Bussonderfahrstreifen nur benutzt werden, wenn dies durch Zusatzzeichen angezeigt ist."
        }
      ],
      "modelAnswer": "Das ist Zeichen 245 „Bussonderfahrstreifen“ – Vorschriftzeichen (Anlage 2), Sonderwege. 1. Anderer Fahrverkehr als Omnibusse des Linienverkehrs sowie nach dem Personenbeförderungsrecht mit dem Schulbus-Schild zu kennzeichnende Fahrzeuge des Schüler- und Behindertenverkehrs dürfen Bussonderfahrstreifen nicht benutzen. 2. Mit Krankenfahrzeugen, Taxen, Fahrrädern und Bussen im Gelegenheitsverkehr darf der Sonderfahrstreifen nur benutzt werden, wenn dies durch Zusatzzeichen angezeigt ist. 3. Taxen dürfen an Bushaltestellen (Zeichen 224) zum sofortigen Ein- und Aussteigen von Fahrgästen halten. 4. Mit elektrisch betriebenen Fahrzeugen darf der Bussonderfahrstreifen nur benutzt werden, wenn dies durch Zusatzzeichen angezeigt ist.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Bussonderfahrstreifen",
          "keywords": [
            "245",
            "bussonderfahrstreifen"
          ]
        },
        {
          "label": "1. Anderer Fahrverkehr als Omnibusse des Linienverkehrs sowie nach dem Personenbeförderungsrecht mit dem …",
          "keywords": [
            "personenbeförderungsrecht",
            "bussonderfahrstreifen",
            "behindertenverkehrs",
            "schulbus-schild"
          ]
        },
        {
          "label": "2. Mit Krankenfahrzeugen, Taxen, Fahrrädern und Bussen im Gelegenheitsverkehr darf der Sonderfahrstreifen …",
          "keywords": [
            "gelegenheitsverkehr",
            "sonderfahrstreifen",
            "krankenfahrzeugen",
            "fahrrädern"
          ]
        },
        {
          "label": "3. Taxen dürfen an Bushaltestellen (Zeichen 224) zum sofortigen Ein- und Aussteigen von Fahrgästen halten.",
          "keywords": [
            "bushaltestellen",
            "sofortigen",
            "aussteigen",
            "fahrgästen"
          ]
        },
        {
          "label": "4. Mit elektrisch betriebenen Fahrzeugen darf der Bussonderfahrstreifen nur benutzt werden, wenn dies durch …",
          "keywords": [
            "bussonderfahrstreifen",
            "betriebenen",
            "elektrisch",
            "benutzt"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 25"
    },
    {
      "id": "vz-z2-25-1",
      "subject": "zeichen",
      "sign": null,
      "signLabel": "Zusatzzeichen",
      "kind": "Zusatzzeichen",
      "anlage": 2,
      "lfd": "25.1",
      "name": "Elektrisch betriebene Fahrzeuge frei (zu Zeichen 245)",
      "category": "Zusatzzeichen (Anlage 2), Sonderwege",
      "topic": "Zusatzzeichen – Elektrisch betriebene Fahrzeuge frei (zu Zeichen 245)",
      "question": "Was bedeutet dieses Zusatzzeichen? Erklären Sie, zu welchem Zeichen es gehört und was es regelt.",
      "difficulty": 2,
      "images": [
        "x258"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Mit diesem Zusatzzeichen sind elektrisch betriebene Fahrzeuge auf dem Bussonderfahrstreifen zugelassen."
        }
      ],
      "modelAnswer": "Das ist Zusatzzeichen „Elektrisch betriebene Fahrzeuge frei (zu Zeichen 245)“ – Zusatzzeichen (Anlage 2), Sonderwege. Mit diesem Zusatzzeichen sind elektrisch betriebene Fahrzeuge auf dem Bussonderfahrstreifen zugelassen.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Elektrisch betriebene Fahrzeuge frei (zu Zeichen 245)",
          "keywords": [
            "frei",
            "betriebene",
            "elektrisch",
            "elektrisch betriebene fahrzeuge frei (zu zeichen 245)"
          ]
        },
        {
          "label": "Zusatzzeichen zum Hauptzeichen",
          "keywords": [
            "zusatzzeichen",
            "245"
          ]
        },
        {
          "label": "Mit diesem Zusatzzeichen sind elektrisch betriebene Fahrzeuge auf dem Bussonderfahrstreifen zugelassen.",
          "keywords": [
            "bussonderfahrstreifen",
            "elektrisch",
            "betriebene",
            "zugelassen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Mit welchem Hauptzeichen wird dieses Zusatzzeichen verwendet?",
        "Wo steht das Zusatzzeichen?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 25.1"
    },
    {
      "id": "vz-z2-27",
      "subject": "zeichen",
      "sign": null,
      "signLabel": "Zusatzzeichen",
      "kind": "Zusatzzeichen",
      "anlage": 2,
      "lfd": "27",
      "name": "Massenangabe „7,5 t“ (zu Verkehrsverboten)",
      "category": "Zusatzzeichen (Anlage 2), Verkehrsverbote",
      "topic": "Zusatzzeichen – Massenangabe „7,5 t“ (zu Verkehrsverboten)",
      "question": "Was bedeutet dieses Zusatzzeichen? Erklären Sie, zu welchem Zeichen es gehört und was es regelt.",
      "difficulty": 2,
      "images": [
        "x259"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Ist auf einem Zusatzzeichen eine Masse, wie \"7,5 t\", angegeben, gilt das Verbot nur, soweit die zulässige Gesamtmasse dieser Verkehrsmittel einschließlich ihrer Anhänger die angegebene Grenze überschreitet."
        }
      ],
      "modelAnswer": "Das ist Zusatzzeichen „Massenangabe „7,5 t“ (zu Verkehrsverboten)“ – Zusatzzeichen (Anlage 2), Verkehrsverbote. Ist auf einem Zusatzzeichen eine Masse, wie \"7,5 t\", angegeben, gilt das Verbot nur, soweit die zulässige Gesamtmasse dieser Verkehrsmittel einschließlich ihrer Anhänger die angegebene Grenze überschreitet.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Massenangabe „7,5 t“ (zu Verkehrsverboten)",
          "keywords": [
            "7,5 t",
            "massenangabe",
            "verkehrsverboten",
            "massenangabe „7,5 t“ (zu verkehrsverboten)"
          ]
        },
        {
          "label": "Zusatzzeichen zum Hauptzeichen",
          "keywords": [
            "zusatzzeichen"
          ]
        },
        {
          "label": "Ist auf einem Zusatzzeichen eine Masse, wie \"7,5 t\", angegeben, gilt das Verbot nur, soweit die zulässige …",
          "keywords": [
            "7,5 t",
            "verkehrsmittel",
            "überschreitet",
            "gesamtmasse"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Mit welchem Hauptzeichen wird dieses Zusatzzeichen verwendet?",
        "Wo steht das Zusatzzeichen?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 27"
    },
    {
      "id": "vz-z2-27-1",
      "subject": "zeichen",
      "sign": null,
      "signLabel": "Zusatzzeichen",
      "kind": "Zusatzzeichen",
      "anlage": 2,
      "lfd": "27.1",
      "name": "Elektrisch betriebene Fahrzeuge frei (zu Verkehrsverboten)",
      "category": "Zusatzzeichen (Anlage 2), Verkehrsverbote",
      "topic": "Zusatzzeichen – Elektrisch betriebene Fahrzeuge frei (zu Verkehrsverboten)",
      "question": "Was bedeutet dieses Zusatzzeichen? Erklären Sie, zu welchem Zeichen es gehört und was es regelt.",
      "difficulty": 2,
      "images": [
        "x258"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Mit diesem Zusatzzeichen sind elektrisch betriebene Fahrzeuge von Verkehrsverboten (Zeichen 250, 251, 253, 255, 260) ausgenommen."
        }
      ],
      "modelAnswer": "Das ist Zusatzzeichen „Elektrisch betriebene Fahrzeuge frei (zu Verkehrsverboten)“ – Zusatzzeichen (Anlage 2), Verkehrsverbote. Mit diesem Zusatzzeichen sind elektrisch betriebene Fahrzeuge von Verkehrsverboten (Zeichen 250, 251, 253, 255, 260) ausgenommen.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Elektrisch betriebene Fahrzeuge frei (zu Verkehrsverboten)",
          "keywords": [
            "betriebene",
            "elektrisch",
            "verkehrsverboten",
            "elektrisch betriebene fahrzeuge frei (zu verkehrsverboten)"
          ]
        },
        {
          "label": "Zusatzzeichen zum Hauptzeichen",
          "keywords": [
            "zusatzzeichen"
          ]
        },
        {
          "label": "Mit diesem Zusatzzeichen sind elektrisch betriebene Fahrzeuge von Verkehrsverboten (Zeichen 250, 251, 253, …",
          "keywords": [
            "verkehrsverboten",
            "elektrisch",
            "betriebene"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Mit welchem Hauptzeichen wird dieses Zusatzzeichen verwendet?",
        "Wo steht das Zusatzzeichen?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 27.1"
    },
    {
      "id": "vz-250",
      "subject": "zeichen",
      "sign": "250",
      "signLabel": "Zeichen 250",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "28",
      "name": "Verbot für Fahrzeuge aller Art",
      "category": "Vorschriftzeichen (Anlage 2), Verkehrsverbote",
      "topic": "Zeichen 250 – Verbot für Fahrzeuge aller Art",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x268"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "1. Verbot für Fahrzeuge aller Art. Das Zeichen gilt nicht für Handfahrzeuge, abweichend von § 28 Absatz 2 auch nicht für Reiter, Führer von Pferden sowie Treiber und Führer von Vieh. 2. Krafträder und Fahrräder dürfen geschoben werden."
        },
        {
          "type": "allgemein",
          "text": "Die nachfolgenden Zeichen 250 bis 261 (Verkehrsverbote) untersagen die Verkehrsteilnahme ganz oder teilweise mit dem angegebenen Inhalt."
        },
        {
          "type": "allgemein",
          "text": "Für die Zeichen 250 bis 259 gilt: 1. Durch Verkehrszeichen gleicher Art mit Sinnbildern nach § 39 Absatz 7 können andere Verkehrsarten verboten werden. 2. Zwei der nachstehenden Verbote können auf einem Schild vereinigt sein."
        }
      ],
      "modelAnswer": "Das ist Zeichen 250 „Verbot für Fahrzeuge aller Art“ – Vorschriftzeichen (Anlage 2), Verkehrsverbote. 1. Verbot für Fahrzeuge aller Art. Das Zeichen gilt nicht für Handfahrzeuge, abweichend von § 28 Absatz 2 auch nicht für Reiter, Führer von Pferden sowie Treiber und Führer von Vieh. 2. Krafträder und Fahrräder dürfen geschoben werden. Die nachfolgenden Zeichen 250 bis 261 (Verkehrsverbote) untersagen die Verkehrsteilnahme ganz oder teilweise mit dem angegebenen Inhalt. Für die Zeichen 250 bis 259 gilt: 1. Durch Verkehrszeichen gleicher Art mit Sinnbildern nach § 39 Absatz 7 können andere Verkehrsarten verboten werden. 2. Zwei der nachstehenden Verbote können auf einem Schild vereinigt sein.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Verbot für Fahrzeuge aller Art",
          "keywords": [
            "250",
            "aller",
            "verbot für fahrzeuge aller art"
          ]
        },
        {
          "label": "1. Verbot für Fahrzeuge aller Art. Das Zeichen gilt nicht für Handfahrzeuge, abweichend von § 28 Absatz 2 …",
          "keywords": [
            "handfahrzeuge",
            "abweichend",
            "pferden",
            "treiber"
          ]
        },
        {
          "label": "2. Krafträder und Fahrräder dürfen geschoben werden.",
          "keywords": [
            "krafträder",
            "fahrräder",
            "geschoben",
            "dürfen"
          ]
        },
        {
          "label": "Die nachfolgenden Zeichen 250 bis 261 (Verkehrsverbote) untersagen die Verkehrsteilnahme ganz oder teilweise …",
          "keywords": [
            "verkehrsteilnahme",
            "verkehrsverbote",
            "untersagen",
            "inhalt"
          ]
        },
        {
          "label": "1. Durch Verkehrszeichen gleicher Art mit Sinnbildern nach § 39 Absatz 7 können andere Verkehrsarten …",
          "keywords": [
            "verkehrszeichen",
            "sinnbildern",
            "gleicher"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 28"
    },
    {
      "id": "vz-251",
      "subject": "zeichen",
      "sign": "251",
      "signLabel": "Zeichen 251",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "29",
      "name": "Verbot für Kraftwagen",
      "category": "Vorschriftzeichen (Anlage 2), Verkehrsverbote",
      "topic": "Zeichen 251 – Verbot für Kraftwagen",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x269"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Verbot für Kraftwagen und sonstige mehrspurige Kraftfahrzeuge"
        },
        {
          "type": "allgemein",
          "text": "Die nachfolgenden Zeichen 250 bis 261 (Verkehrsverbote) untersagen die Verkehrsteilnahme ganz oder teilweise mit dem angegebenen Inhalt."
        },
        {
          "type": "allgemein",
          "text": "Für die Zeichen 250 bis 259 gilt: 1. Durch Verkehrszeichen gleicher Art mit Sinnbildern nach § 39 Absatz 7 können andere Verkehrsarten verboten werden. 2. Zwei der nachstehenden Verbote können auf einem Schild vereinigt sein."
        }
      ],
      "modelAnswer": "Das ist Zeichen 251 „Verbot für Kraftwagen“ – Vorschriftzeichen (Anlage 2), Verkehrsverbote. Verbot für Kraftwagen und sonstige mehrspurige Kraftfahrzeuge. Die nachfolgenden Zeichen 250 bis 261 (Verkehrsverbote) untersagen die Verkehrsteilnahme ganz oder teilweise mit dem angegebenen Inhalt. Für die Zeichen 250 bis 259 gilt: 1. Durch Verkehrszeichen gleicher Art mit Sinnbildern nach § 39 Absatz 7 können andere Verkehrsarten verboten werden. 2. Zwei der nachstehenden Verbote können auf einem Schild vereinigt sein.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Verbot für Kraftwagen",
          "keywords": [
            "251",
            "kraftwagen",
            "verbot für kraftwagen"
          ]
        },
        {
          "label": "Verbot für Kraftwagen und sonstige mehrspurige Kraftfahrzeuge",
          "keywords": [
            "kraftfahrzeuge",
            "mehrspurige",
            "kraftwagen"
          ]
        },
        {
          "label": "Die nachfolgenden Zeichen 250 bis 261 (Verkehrsverbote) untersagen die Verkehrsteilnahme ganz oder teilweise …",
          "keywords": [
            "verkehrsteilnahme",
            "verkehrsverbote",
            "untersagen",
            "inhalt"
          ]
        },
        {
          "label": "1. Durch Verkehrszeichen gleicher Art mit Sinnbildern nach § 39 Absatz 7 können andere Verkehrsarten …",
          "keywords": [
            "verkehrszeichen",
            "sinnbildern",
            "gleicher"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 29"
    },
    {
      "id": "vz-253",
      "subject": "zeichen",
      "sign": "253",
      "signLabel": "Zeichen 253",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "30",
      "name": "Verbot für Kraftfahrzeuge über 3,5 t",
      "category": "Vorschriftzeichen (Anlage 2), Verkehrsverbote",
      "topic": "Zeichen 253 – Verbot für Kraftfahrzeuge über 3,5 t",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x277"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Verbot für Kraftfahrzeuge mit einer zulässigen Gesamtmasse über 3,5 t, einschließlich ihrer Anhänger, und für Zugmaschinen. Ausgenommen sind Personenkraftwagen und Kraftomnibusse."
        },
        {
          "type": "erlaeuterung",
          "text": "Das Zeichen kann in einer Überleitungstafel oder in einer Verschwenkungstafel oder in einer Fahrstreifentafel integriert sein. Dann bezieht sich das Verbot nur auf den jeweiligen Fahrstreifen, für den das Verbot angeordnet ist."
        },
        {
          "type": "allgemein",
          "text": "Die nachfolgenden Zeichen 250 bis 261 (Verkehrsverbote) untersagen die Verkehrsteilnahme ganz oder teilweise mit dem angegebenen Inhalt."
        },
        {
          "type": "allgemein",
          "text": "Für die Zeichen 250 bis 259 gilt: 1. Durch Verkehrszeichen gleicher Art mit Sinnbildern nach § 39 Absatz 7 können andere Verkehrsarten verboten werden. 2. Zwei der nachstehenden Verbote können auf einem Schild vereinigt sein."
        }
      ],
      "modelAnswer": "Das ist Zeichen 253 „Verbot für Kraftfahrzeuge über 3,5 t“ – Vorschriftzeichen (Anlage 2), Verkehrsverbote. Verbot für Kraftfahrzeuge mit einer zulässigen Gesamtmasse über 3,5 t, einschließlich ihrer Anhänger, und für Zugmaschinen. Ausgenommen sind Personenkraftwagen und Kraftomnibusse. Das Zeichen kann in einer Überleitungstafel oder in einer Verschwenkungstafel oder in einer Fahrstreifentafel integriert sein. Dann bezieht sich das Verbot nur auf den jeweiligen Fahrstreifen, für den das Verbot angeordnet ist. Die nachfolgenden Zeichen 250 bis 261 (Verkehrsverbote) untersagen die Verkehrsteilnahme ganz oder teilweise mit dem angegebenen Inhalt. Für die Zeichen 250 bis 259 gilt: 1. Durch Verkehrszeichen gleicher Art mit Sinnbildern nach § 39 Absatz 7 können andere Verkehrsarten verboten werden. 2. Zwei der nachstehenden Verbote können auf einem Schild vereinigt sein.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Verbot für Kraftfahrzeuge über 3,5 t",
          "keywords": [
            "253",
            "3,5 t",
            "kraftfahrzeuge",
            "verbot für kraftfahrzeuge über 3,5 t"
          ]
        },
        {
          "label": "Verbot für Kraftfahrzeuge mit einer zulässigen Gesamtmasse über 3,5 t, einschließlich ihrer Anhänger, und …",
          "keywords": [
            "3,5 t",
            "personenkraftwagen",
            "kraftfahrzeuge",
            "kraftomnibusse"
          ]
        },
        {
          "label": "Das Zeichen kann in einer Überleitungstafel oder in einer Verschwenkungstafel oder in einer …",
          "keywords": [
            "verschwenkungstafel",
            "überleitungstafel",
            "fahrstreifentafel",
            "integriert"
          ]
        },
        {
          "label": "Die nachfolgenden Zeichen 250 bis 261 (Verkehrsverbote) untersagen die Verkehrsteilnahme ganz oder teilweise …",
          "keywords": [
            "verkehrsteilnahme",
            "verkehrsverbote",
            "untersagen",
            "inhalt"
          ]
        },
        {
          "label": "1. Durch Verkehrszeichen gleicher Art mit Sinnbildern nach § 39 Absatz 7 können andere Verkehrsarten …",
          "keywords": [
            "verkehrszeichen",
            "sinnbildern",
            "gleicher"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 30"
    },
    {
      "id": "vz-z2-30-1",
      "subject": "zeichen",
      "sign": null,
      "signLabel": "Zusatzzeichen",
      "kind": "Zusatzzeichen",
      "anlage": 2,
      "lfd": "30.1",
      "name": "„Durchgangsverkehr“ mit „7,5 t“ (zu Zeichen 253)",
      "category": "Zusatzzeichen (Anlage 2), Verkehrsverbote",
      "topic": "Zusatzzeichen – „Durchgangsverkehr“ mit „7,5 t“ (zu Zeichen 253)",
      "question": "Was bedeutet dieses Zusatzzeichen? Erklären Sie, zu welchem Zeichen es gehört und was es regelt.",
      "difficulty": 2,
      "images": [
        "x283"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Wird Zeichen 253 mit diesen Zusatzzeichen angeordnet, bedeutet dies: 1. Das Verbot ist auf den Durchgangsverkehr mit Nutzfahrzeugen einschließlich ihrer Anhänger, mit einer zulässigen Gesamtmasse ab 7,5 t beschränkt. 2. Durchgangsverkehr liegt nicht vor, soweit die jeweilige Fahrt a) dazu dient, ein Grundstück an der vom Verkehrsverbot betroffenen Straße oder an einer Straße, die durch die vom Verkehrsverbot betroffene Straße erschlossen wird, zu erreichen oder zu verlassen, b) dem Güterverkehr im Sinne des § 1 Absatz 1 des Güterkraftverkehrsgesetzes in einem Gebiet innerhalb eines Umkreises von 75 km, gerechnet in der Luftlinie vom Mittelpunkt des zu Beginn einer Fahrt ersten Beladeorts des jeweiligen Fahrzeugs (Ortsmittelpunkt), dient; dabei gehören alle Gemeinden, deren Ortsmittelpunkt innerhalb des Gebietes liegt, zu dem Gebiet, oder c) mit im Bundesfernstraßenmautgesetz bezeichneten Fahrzeugen, die nicht der Mautpflicht unterliegen, durchgeführt wird. 3. Ausgenommen von dem Verkehrsverbot ist eine Fahrt, die auf ausgewiesenen Umleitungsstrecken (Zeichen 421, 442, 454 bis 457.2 oder Zeichen 460 und 466) durchgeführt wird, um besonderen Verkehrslagen Rechnung zu tragen."
        },
        {
          "type": "erlaeuterung",
          "text": "Diese Kombination ist nur mit Zeichen 253 zulässig."
        }
      ],
      "modelAnswer": "Das ist Zusatzzeichen „„Durchgangsverkehr“ mit „7,5 t“ (zu Zeichen 253)“ – Zusatzzeichen (Anlage 2), Verkehrsverbote. Wird Zeichen 253 mit diesen Zusatzzeichen angeordnet, bedeutet dies: 1. Das Verbot ist auf den Durchgangsverkehr mit Nutzfahrzeugen einschließlich ihrer Anhänger, mit einer zulässigen Gesamtmasse ab 7,5 t beschränkt. 2. Durchgangsverkehr liegt nicht vor, soweit die jeweilige Fahrt a) dazu dient, ein Grundstück an der vom Verkehrsverbot betroffenen Straße oder an einer Straße, die durch die vom Verkehrsverbot betroffene Straße erschlossen wird, zu erreichen oder zu verlassen, b) dem Güterverkehr im Sinne des § 1 Absatz 1 des Güterkraftverkehrsgesetzes in einem Gebiet innerhalb eines Umkreises von 75 km, gerechnet in der Luftlinie vom Mittelpunkt des zu Beginn einer Fahrt ersten Beladeorts des jeweiligen Fahrzeugs (Ortsmittelpunkt), dient; dabei gehören alle Gemeinden, deren Ortsmittelpunkt innerhalb des Gebietes liegt, zu dem Gebiet, oder c) mit im Bundesfernstraßenmautgesetz bezeichneten Fahrzeugen, die nicht der Mautpflicht unterliegen, durchgeführt wird. 3. Ausgenommen von dem Verkehrsverbot ist eine Fahrt, die auf ausgewiesenen Umleitungsstrecken (Zeichen 421, 442, 454 bis 457.2 oder Zeichen 460 und 466) durchgeführt wird, um besonderen Verkehrslagen Rechnung zu tragen. Diese Kombination ist nur mit Zeichen 253 zulässig.",
      "keyPoints": [
        {
          "label": "Bezeichnung: „Durchgangsverkehr“ mit „7,5 t“ (zu Zeichen 253)",
          "keywords": [
            "7,5 t",
            "durchgangsverkehr",
            "„durchgangsverkehr“ mit „7,5 t“ (zu zeichen 253)"
          ]
        },
        {
          "label": "Zusatzzeichen zum Hauptzeichen",
          "keywords": [
            "zusatzzeichen",
            "253"
          ]
        },
        {
          "label": "1. Das Verbot ist auf den Durchgangsverkehr mit Nutzfahrzeugen einschließlich ihrer Anhänger, mit einer …",
          "keywords": [
            "7,5 t",
            "durchgangsverkehr",
            "nutzfahrzeugen",
            "gesamtmasse"
          ]
        },
        {
          "label": "2. Durchgangsverkehr liegt nicht vor, soweit die jeweilige Fahrt a) dazu dient, ein Grundstück an der vom …",
          "keywords": [
            "75 km",
            "bundesfernstraßenmautgesetz",
            "güterkraftverkehrsgesetzes",
            "durchgangsverkehr"
          ]
        },
        {
          "label": "3. Ausgenommen von dem Verkehrsverbot ist eine Fahrt, die auf ausgewiesenen Umleitungsstrecken (Zeichen 421, …",
          "keywords": [
            "umleitungsstrecken",
            "verkehrsverbot",
            "ausgewiesenen",
            "verkehrslagen"
          ]
        },
        {
          "label": "Diese Kombination ist nur mit Zeichen 253 zulässig.",
          "keywords": [
            "kombination",
            "zulässig"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Mit welchem Hauptzeichen wird dieses Zusatzzeichen verwendet?",
        "Wo steht das Zusatzzeichen?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 30.1"
    },
    {
      "id": "vz-254",
      "subject": "zeichen",
      "sign": "254",
      "signLabel": "Zeichen 254",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "31",
      "name": "Verbot für Radverkehr",
      "category": "Vorschriftzeichen (Anlage 2), Verkehrsverbote",
      "topic": "Zeichen 254 – Verbot für Radverkehr",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x289"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Verbot für den Radverkehr und den Verkehr mit Elektrokleinstfahrzeugen im Sinne der eKFV"
        },
        {
          "type": "allgemein",
          "text": "Die nachfolgenden Zeichen 250 bis 261 (Verkehrsverbote) untersagen die Verkehrsteilnahme ganz oder teilweise mit dem angegebenen Inhalt."
        },
        {
          "type": "allgemein",
          "text": "Für die Zeichen 250 bis 259 gilt: 1. Durch Verkehrszeichen gleicher Art mit Sinnbildern nach § 39 Absatz 7 können andere Verkehrsarten verboten werden. 2. Zwei der nachstehenden Verbote können auf einem Schild vereinigt sein."
        }
      ],
      "modelAnswer": "Das ist Zeichen 254 „Verbot für Radverkehr“ – Vorschriftzeichen (Anlage 2), Verkehrsverbote. Verbot für den Radverkehr und den Verkehr mit Elektrokleinstfahrzeugen im Sinne der eKFV. Die nachfolgenden Zeichen 250 bis 261 (Verkehrsverbote) untersagen die Verkehrsteilnahme ganz oder teilweise mit dem angegebenen Inhalt. Für die Zeichen 250 bis 259 gilt: 1. Durch Verkehrszeichen gleicher Art mit Sinnbildern nach § 39 Absatz 7 können andere Verkehrsarten verboten werden. 2. Zwei der nachstehenden Verbote können auf einem Schild vereinigt sein.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Verbot für Radverkehr",
          "keywords": [
            "254",
            "radverkehr",
            "verbot für radverkehr"
          ]
        },
        {
          "label": "Verbot für den Radverkehr und den Verkehr mit Elektrokleinstfahrzeugen im Sinne der eKFV",
          "keywords": [
            "elektrokleinstfahrzeugen",
            "radverkehr",
            "sinne",
            "ekfv"
          ]
        },
        {
          "label": "Die nachfolgenden Zeichen 250 bis 261 (Verkehrsverbote) untersagen die Verkehrsteilnahme ganz oder teilweise …",
          "keywords": [
            "verkehrsteilnahme",
            "verkehrsverbote",
            "untersagen",
            "inhalt"
          ]
        },
        {
          "label": "1. Durch Verkehrszeichen gleicher Art mit Sinnbildern nach § 39 Absatz 7 können andere Verkehrsarten …",
          "keywords": [
            "verkehrszeichen",
            "sinnbildern",
            "gleicher"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 31"
    },
    {
      "id": "vz-255",
      "subject": "zeichen",
      "sign": "255",
      "signLabel": "Zeichen 255",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "32",
      "name": "Verbot für Krafträder",
      "category": "Vorschriftzeichen (Anlage 2), Verkehrsverbote",
      "topic": "Zeichen 255 – Verbot für Krafträder",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x290"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Verbot für Krafträder, auch mit Beiwagen, Kleinkrafträder und Mofas"
        },
        {
          "type": "allgemein",
          "text": "Die nachfolgenden Zeichen 250 bis 261 (Verkehrsverbote) untersagen die Verkehrsteilnahme ganz oder teilweise mit dem angegebenen Inhalt."
        },
        {
          "type": "allgemein",
          "text": "Für die Zeichen 250 bis 259 gilt: 1. Durch Verkehrszeichen gleicher Art mit Sinnbildern nach § 39 Absatz 7 können andere Verkehrsarten verboten werden. 2. Zwei der nachstehenden Verbote können auf einem Schild vereinigt sein."
        }
      ],
      "modelAnswer": "Das ist Zeichen 255 „Verbot für Krafträder“ – Vorschriftzeichen (Anlage 2), Verkehrsverbote. Verbot für Krafträder, auch mit Beiwagen, Kleinkrafträder und Mofas. Die nachfolgenden Zeichen 250 bis 261 (Verkehrsverbote) untersagen die Verkehrsteilnahme ganz oder teilweise mit dem angegebenen Inhalt. Für die Zeichen 250 bis 259 gilt: 1. Durch Verkehrszeichen gleicher Art mit Sinnbildern nach § 39 Absatz 7 können andere Verkehrsarten verboten werden. 2. Zwei der nachstehenden Verbote können auf einem Schild vereinigt sein.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Verbot für Krafträder",
          "keywords": [
            "255",
            "krafträder",
            "verbot für krafträder"
          ]
        },
        {
          "label": "Verbot für Krafträder, auch mit Beiwagen, Kleinkrafträder und Mofas",
          "keywords": [
            "kleinkrafträder",
            "krafträder",
            "beiwagen",
            "mofas"
          ]
        },
        {
          "label": "Die nachfolgenden Zeichen 250 bis 261 (Verkehrsverbote) untersagen die Verkehrsteilnahme ganz oder teilweise …",
          "keywords": [
            "verkehrsteilnahme",
            "verkehrsverbote",
            "untersagen",
            "inhalt"
          ]
        },
        {
          "label": "1. Durch Verkehrszeichen gleicher Art mit Sinnbildern nach § 39 Absatz 7 können andere Verkehrsarten …",
          "keywords": [
            "verkehrszeichen",
            "sinnbildern",
            "gleicher"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 32"
    },
    {
      "id": "vz-259",
      "subject": "zeichen",
      "sign": "259",
      "signLabel": "Zeichen 259",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "33",
      "name": "Verbot für Fußgänger",
      "category": "Vorschriftzeichen (Anlage 2), Verkehrsverbote",
      "topic": "Zeichen 259 – Verbot für Fußgänger",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x291"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Verbot für den Fußgängerverkehr"
        },
        {
          "type": "allgemein",
          "text": "Die nachfolgenden Zeichen 250 bis 261 (Verkehrsverbote) untersagen die Verkehrsteilnahme ganz oder teilweise mit dem angegebenen Inhalt."
        },
        {
          "type": "allgemein",
          "text": "Für die Zeichen 250 bis 259 gilt: 1. Durch Verkehrszeichen gleicher Art mit Sinnbildern nach § 39 Absatz 7 können andere Verkehrsarten verboten werden. 2. Zwei der nachstehenden Verbote können auf einem Schild vereinigt sein."
        }
      ],
      "modelAnswer": "Das ist Zeichen 259 „Verbot für Fußgänger“ – Vorschriftzeichen (Anlage 2), Verkehrsverbote. Verbot für den Fußgängerverkehr. Die nachfolgenden Zeichen 250 bis 261 (Verkehrsverbote) untersagen die Verkehrsteilnahme ganz oder teilweise mit dem angegebenen Inhalt. Für die Zeichen 250 bis 259 gilt: 1. Durch Verkehrszeichen gleicher Art mit Sinnbildern nach § 39 Absatz 7 können andere Verkehrsarten verboten werden. 2. Zwei der nachstehenden Verbote können auf einem Schild vereinigt sein.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Verbot für Fußgänger",
          "keywords": [
            "259",
            "fußgänger",
            "verbot für fußgänger"
          ]
        },
        {
          "label": "Verbot für den Fußgängerverkehr",
          "keywords": [
            "fußgängerverkehr"
          ]
        },
        {
          "label": "Die nachfolgenden Zeichen 250 bis 261 (Verkehrsverbote) untersagen die Verkehrsteilnahme ganz oder teilweise …",
          "keywords": [
            "verkehrsteilnahme",
            "verkehrsverbote",
            "untersagen",
            "inhalt"
          ]
        },
        {
          "label": "1. Durch Verkehrszeichen gleicher Art mit Sinnbildern nach § 39 Absatz 7 können andere Verkehrsarten …",
          "keywords": [
            "verkehrszeichen",
            "sinnbildern",
            "gleicher"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 33"
    },
    {
      "id": "vz-260",
      "subject": "zeichen",
      "sign": "260",
      "signLabel": "Zeichen 260",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "34",
      "name": "Verbot für Kraftfahrzeuge",
      "category": "Vorschriftzeichen (Anlage 2), Verkehrsverbote",
      "topic": "Zeichen 260 – Verbot für Kraftfahrzeuge",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x301"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Verbot für Krafträder, auch mit Beiwagen, Kleinkrafträder und Mofas sowie für Kraftwagen und sonstige mehrspurige Kraftfahrzeuge"
        },
        {
          "type": "allgemein",
          "text": "Die nachfolgenden Zeichen 250 bis 261 (Verkehrsverbote) untersagen die Verkehrsteilnahme ganz oder teilweise mit dem angegebenen Inhalt."
        },
        {
          "type": "allgemein",
          "text": "Für die Zeichen 250 bis 259 gilt: 1. Durch Verkehrszeichen gleicher Art mit Sinnbildern nach § 39 Absatz 7 können andere Verkehrsarten verboten werden. 2. Zwei der nachstehenden Verbote können auf einem Schild vereinigt sein."
        }
      ],
      "modelAnswer": "Das ist Zeichen 260 „Verbot für Kraftfahrzeuge“ – Vorschriftzeichen (Anlage 2), Verkehrsverbote. Verbot für Krafträder, auch mit Beiwagen, Kleinkrafträder und Mofas sowie für Kraftwagen und sonstige mehrspurige Kraftfahrzeuge. Die nachfolgenden Zeichen 250 bis 261 (Verkehrsverbote) untersagen die Verkehrsteilnahme ganz oder teilweise mit dem angegebenen Inhalt. Für die Zeichen 250 bis 259 gilt: 1. Durch Verkehrszeichen gleicher Art mit Sinnbildern nach § 39 Absatz 7 können andere Verkehrsarten verboten werden. 2. Zwei der nachstehenden Verbote können auf einem Schild vereinigt sein.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Verbot für Kraftfahrzeuge",
          "keywords": [
            "260",
            "kraftfahrzeuge",
            "verbot für kraftfahrzeuge"
          ]
        },
        {
          "label": "Verbot für Krafträder, auch mit Beiwagen, Kleinkrafträder und Mofas sowie für Kraftwagen und sonstige …",
          "keywords": [
            "kleinkrafträder",
            "kraftfahrzeuge",
            "mehrspurige",
            "krafträder"
          ]
        },
        {
          "label": "Die nachfolgenden Zeichen 250 bis 261 (Verkehrsverbote) untersagen die Verkehrsteilnahme ganz oder teilweise …",
          "keywords": [
            "verkehrsteilnahme",
            "verkehrsverbote",
            "untersagen",
            "inhalt"
          ]
        },
        {
          "label": "1. Durch Verkehrszeichen gleicher Art mit Sinnbildern nach § 39 Absatz 7 können andere Verkehrsarten …",
          "keywords": [
            "verkehrszeichen",
            "sinnbildern",
            "gleicher"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 34"
    },
    {
      "id": "vz-261",
      "subject": "zeichen",
      "sign": "261",
      "signLabel": "Zeichen 261",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "35",
      "name": "Verbot für kennzeichnungspflichtige Kraftfahrzeuge mit gefährlichen Gütern",
      "category": "Vorschriftzeichen (Anlage 2), Verkehrsverbote",
      "topic": "Zeichen 261 – Verbot für kennzeichnungspflichtige Kraftfahrzeuge mit gefährlichen Gütern",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x302"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Verbot für kennzeichnungspflichtige Kraftfahrzeuge mit gefährlichen Gütern"
        },
        {
          "type": "allgemein",
          "text": "Die nachfolgenden Zeichen 250 bis 261 (Verkehrsverbote) untersagen die Verkehrsteilnahme ganz oder teilweise mit dem angegebenen Inhalt."
        },
        {
          "type": "allgemein",
          "text": "Für die Zeichen 250 bis 259 gilt: 1. Durch Verkehrszeichen gleicher Art mit Sinnbildern nach § 39 Absatz 7 können andere Verkehrsarten verboten werden. 2. Zwei der nachstehenden Verbote können auf einem Schild vereinigt sein."
        }
      ],
      "modelAnswer": "Das ist Zeichen 261 „Verbot für kennzeichnungspflichtige Kraftfahrzeuge mit gefährlichen Gütern“ – Vorschriftzeichen (Anlage 2), Verkehrsverbote. Verbot für kennzeichnungspflichtige Kraftfahrzeuge mit gefährlichen Gütern. Die nachfolgenden Zeichen 250 bis 261 (Verkehrsverbote) untersagen die Verkehrsteilnahme ganz oder teilweise mit dem angegebenen Inhalt. Für die Zeichen 250 bis 259 gilt: 1. Durch Verkehrszeichen gleicher Art mit Sinnbildern nach § 39 Absatz 7 können andere Verkehrsarten verboten werden. 2. Zwei der nachstehenden Verbote können auf einem Schild vereinigt sein.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Verbot für kennzeichnungspflichtige Kraftfahrzeuge mit gefährlichen Gütern",
          "keywords": [
            "261",
            "gefährlichen",
            "kraftfahrzeuge",
            "kennzeichnungspflichtige",
            "verbot für kennzeichnungspflichtige kraftfahrzeuge mit gefährlichen gütern"
          ]
        },
        {
          "label": "Verbot für kennzeichnungspflichtige Kraftfahrzeuge mit gefährlichen Gütern",
          "keywords": [
            "kennzeichnungspflichtige",
            "kraftfahrzeuge",
            "gefährlichen",
            "gütern"
          ]
        },
        {
          "label": "Die nachfolgenden Zeichen 250 bis 261 (Verkehrsverbote) untersagen die Verkehrsteilnahme ganz oder teilweise …",
          "keywords": [
            "verkehrsteilnahme",
            "verkehrsverbote",
            "untersagen",
            "inhalt"
          ]
        },
        {
          "label": "1. Durch Verkehrszeichen gleicher Art mit Sinnbildern nach § 39 Absatz 7 können andere Verkehrsarten …",
          "keywords": [
            "verkehrszeichen",
            "sinnbildern",
            "gleicher"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 35"
    },
    {
      "id": "vz-262",
      "subject": "zeichen",
      "sign": "262",
      "signLabel": "Zeichen 262",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "36",
      "name": "Tatsächliche Masse",
      "category": "Vorschriftzeichen (Anlage 2), Verkehrsverbote",
      "topic": "Zeichen 262 – Tatsächliche Masse",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x310"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Die Beschränkung durch Zeichen 262 gilt bei Fahrzeugkombinationen für das einzelne Fahrzeug, bei Sattelkraftfahrzeugen gesondert für die Sattelzugmaschine einschließlich Sattellast und für die tatsächlich vorhandenen Achslasten des Sattelanhängers."
        },
        {
          "type": "erlaeuterung",
          "text": "Das Zeichen kann in einer Überleitungstafel oder in einer Verschwenkungstafel oder in einer Fahrstreifentafel integriert sein. Dann bezieht sich das Verbot nur auf den jeweiligen Fahrstreifen, für den das Verbot angeordnet ist."
        },
        {
          "type": "allgemein",
          "text": "Die nachfolgenden Zeichen 262 bis 266 verbieten die Verkehrsteilnahme für Fahrzeuge, deren Maße oder Massen, einschließlich Ladung, eine auf dem jeweiligen Zeichen angegebene tatsächliche Grenze überschreiten."
        },
        {
          "type": "allgemein",
          "text": "Die angegebenen Grenzen stellen nur Beispiele dar."
        }
      ],
      "modelAnswer": "Das ist Zeichen 262 „Tatsächliche Masse“ – Vorschriftzeichen (Anlage 2), Verkehrsverbote. Die Beschränkung durch Zeichen 262 gilt bei Fahrzeugkombinationen für das einzelne Fahrzeug, bei Sattelkraftfahrzeugen gesondert für die Sattelzugmaschine einschließlich Sattellast und für die tatsächlich vorhandenen Achslasten des Sattelanhängers. Das Zeichen kann in einer Überleitungstafel oder in einer Verschwenkungstafel oder in einer Fahrstreifentafel integriert sein. Dann bezieht sich das Verbot nur auf den jeweiligen Fahrstreifen, für den das Verbot angeordnet ist. Die nachfolgenden Zeichen 262 bis 266 verbieten die Verkehrsteilnahme für Fahrzeuge, deren Maße oder Massen, einschließlich Ladung, eine auf dem jeweiligen Zeichen angegebene tatsächliche Grenze überschreiten. Die angegebenen Grenzen stellen nur Beispiele dar.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Tatsächliche Masse",
          "keywords": [
            "262",
            "masse",
            "tatsächliche",
            "tatsächliche masse"
          ]
        },
        {
          "label": "Die Beschränkung durch Zeichen 262 gilt bei Fahrzeugkombinationen für das einzelne Fahrzeug, bei …",
          "keywords": [
            "fahrzeugkombinationen",
            "sattelkraftfahrzeugen",
            "sattelzugmaschine",
            "sattelanhängers"
          ]
        },
        {
          "label": "Das Zeichen kann in einer Überleitungstafel oder in einer Verschwenkungstafel oder in einer …",
          "keywords": [
            "verschwenkungstafel",
            "überleitungstafel",
            "fahrstreifentafel",
            "integriert"
          ]
        },
        {
          "label": "Die nachfolgenden Zeichen 262 bis 266 verbieten die Verkehrsteilnahme für Fahrzeuge, deren Maße oder Massen, …",
          "keywords": [
            "verkehrsteilnahme",
            "überschreiten",
            "tatsächliche",
            "angegebene"
          ]
        },
        {
          "label": "Die angegebenen Grenzen stellen nur Beispiele dar.",
          "keywords": [
            "beispiele",
            "grenzen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 36"
    },
    {
      "id": "vz-263",
      "subject": "zeichen",
      "sign": "263",
      "signLabel": "Zeichen 263",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "37",
      "name": "Tatsächliche Achslast",
      "category": "Vorschriftzeichen (Anlage 2), Verkehrsverbote",
      "topic": "Zeichen 263 – Tatsächliche Achslast",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x316"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Das Zeichen kann in einer Überleitungstafel oder in einer Verschwenkungstafel oder in einer Fahrstreifentafel integriert sein. Dann bezieht sich das Verbot nur auf den jeweiligen Fahrstreifen, für den das Verbot angeordnet ist."
        },
        {
          "type": "allgemein",
          "text": "Die nachfolgenden Zeichen 262 bis 266 verbieten die Verkehrsteilnahme für Fahrzeuge, deren Maße oder Massen, einschließlich Ladung, eine auf dem jeweiligen Zeichen angegebene tatsächliche Grenze überschreiten."
        },
        {
          "type": "allgemein",
          "text": "Die angegebenen Grenzen stellen nur Beispiele dar."
        }
      ],
      "modelAnswer": "Das ist Zeichen 263 „Tatsächliche Achslast“ – Vorschriftzeichen (Anlage 2), Verkehrsverbote. Das Zeichen kann in einer Überleitungstafel oder in einer Verschwenkungstafel oder in einer Fahrstreifentafel integriert sein. Dann bezieht sich das Verbot nur auf den jeweiligen Fahrstreifen, für den das Verbot angeordnet ist. Die nachfolgenden Zeichen 262 bis 266 verbieten die Verkehrsteilnahme für Fahrzeuge, deren Maße oder Massen, einschließlich Ladung, eine auf dem jeweiligen Zeichen angegebene tatsächliche Grenze überschreiten. Die angegebenen Grenzen stellen nur Beispiele dar.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Tatsächliche Achslast",
          "keywords": [
            "263",
            "achslast",
            "tatsächliche",
            "tatsächliche achslast"
          ]
        },
        {
          "label": "Das Zeichen kann in einer Überleitungstafel oder in einer Verschwenkungstafel oder in einer …",
          "keywords": [
            "verschwenkungstafel",
            "überleitungstafel",
            "fahrstreifentafel",
            "integriert"
          ]
        },
        {
          "label": "Die nachfolgenden Zeichen 262 bis 266 verbieten die Verkehrsteilnahme für Fahrzeuge, deren Maße oder Massen, …",
          "keywords": [
            "verkehrsteilnahme",
            "überschreiten",
            "tatsächliche",
            "angegebene"
          ]
        },
        {
          "label": "Die angegebenen Grenzen stellen nur Beispiele dar.",
          "keywords": [
            "beispiele",
            "grenzen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 37"
    },
    {
      "id": "vz-264",
      "subject": "zeichen",
      "sign": "264",
      "signLabel": "Zeichen 264",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "38",
      "name": "Tatsächliche Breite",
      "category": "Vorschriftzeichen (Anlage 2), Verkehrsverbote",
      "topic": "Zeichen 264 – Tatsächliche Breite",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x317"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Die tatsächliche Breite gibt das Maß einschließlich der Fahrzeugaußenspiegel an. Das Zeichen kann in einer Überleitungstafel oder in einer Verschwenkungstafel oder in einer Fahrstreifentafel integriert sein. Dann bezieht sich das Verbot nur auf den jeweiligen Fahrstreifen, für den das Verbot angeordnet ist."
        },
        {
          "type": "allgemein",
          "text": "Die nachfolgenden Zeichen 262 bis 266 verbieten die Verkehrsteilnahme für Fahrzeuge, deren Maße oder Massen, einschließlich Ladung, eine auf dem jeweiligen Zeichen angegebene tatsächliche Grenze überschreiten."
        },
        {
          "type": "allgemein",
          "text": "Die angegebenen Grenzen stellen nur Beispiele dar."
        }
      ],
      "modelAnswer": "Das ist Zeichen 264 „Tatsächliche Breite“ – Vorschriftzeichen (Anlage 2), Verkehrsverbote. Die tatsächliche Breite gibt das Maß einschließlich der Fahrzeugaußenspiegel an. Das Zeichen kann in einer Überleitungstafel oder in einer Verschwenkungstafel oder in einer Fahrstreifentafel integriert sein. Dann bezieht sich das Verbot nur auf den jeweiligen Fahrstreifen, für den das Verbot angeordnet ist. Die nachfolgenden Zeichen 262 bis 266 verbieten die Verkehrsteilnahme für Fahrzeuge, deren Maße oder Massen, einschließlich Ladung, eine auf dem jeweiligen Zeichen angegebene tatsächliche Grenze überschreiten. Die angegebenen Grenzen stellen nur Beispiele dar.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Tatsächliche Breite",
          "keywords": [
            "264",
            "breite",
            "tatsächliche",
            "tatsächliche breite"
          ]
        },
        {
          "label": "Die tatsächliche Breite gibt das Maß einschließlich der Fahrzeugaußenspiegel an. Das Zeichen kann in einer …",
          "keywords": [
            "fahrzeugaußenspiegel",
            "verschwenkungstafel",
            "überleitungstafel",
            "fahrstreifentafel"
          ]
        },
        {
          "label": "Die nachfolgenden Zeichen 262 bis 266 verbieten die Verkehrsteilnahme für Fahrzeuge, deren Maße oder Massen, …",
          "keywords": [
            "verkehrsteilnahme",
            "überschreiten",
            "tatsächliche",
            "angegebene"
          ]
        },
        {
          "label": "Die angegebenen Grenzen stellen nur Beispiele dar.",
          "keywords": [
            "beispiele",
            "grenzen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 38"
    },
    {
      "id": "vz-265",
      "subject": "zeichen",
      "sign": "265",
      "signLabel": "Zeichen 265",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "39",
      "name": "Tatsächliche Höhe",
      "category": "Vorschriftzeichen (Anlage 2), Verkehrsverbote",
      "topic": "Zeichen 265 – Tatsächliche Höhe",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x318"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Das Zeichen kann in einer Überleitungstafel oder in einer Verschwenkungstafel oder in einer Fahrstreifentafel integriert sein. Dann bezieht sich das Verbot nur auf den jeweiligen Fahrstreifen, für den das Verbot angeordnet ist."
        },
        {
          "type": "allgemein",
          "text": "Die nachfolgenden Zeichen 262 bis 266 verbieten die Verkehrsteilnahme für Fahrzeuge, deren Maße oder Massen, einschließlich Ladung, eine auf dem jeweiligen Zeichen angegebene tatsächliche Grenze überschreiten."
        },
        {
          "type": "allgemein",
          "text": "Die angegebenen Grenzen stellen nur Beispiele dar."
        }
      ],
      "modelAnswer": "Das ist Zeichen 265 „Tatsächliche Höhe“ – Vorschriftzeichen (Anlage 2), Verkehrsverbote. Das Zeichen kann in einer Überleitungstafel oder in einer Verschwenkungstafel oder in einer Fahrstreifentafel integriert sein. Dann bezieht sich das Verbot nur auf den jeweiligen Fahrstreifen, für den das Verbot angeordnet ist. Die nachfolgenden Zeichen 262 bis 266 verbieten die Verkehrsteilnahme für Fahrzeuge, deren Maße oder Massen, einschließlich Ladung, eine auf dem jeweiligen Zeichen angegebene tatsächliche Grenze überschreiten. Die angegebenen Grenzen stellen nur Beispiele dar.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Tatsächliche Höhe",
          "keywords": [
            "265",
            "höhe",
            "tatsächliche",
            "tatsächliche höhe"
          ]
        },
        {
          "label": "Das Zeichen kann in einer Überleitungstafel oder in einer Verschwenkungstafel oder in einer …",
          "keywords": [
            "verschwenkungstafel",
            "überleitungstafel",
            "fahrstreifentafel",
            "integriert"
          ]
        },
        {
          "label": "Die nachfolgenden Zeichen 262 bis 266 verbieten die Verkehrsteilnahme für Fahrzeuge, deren Maße oder Massen, …",
          "keywords": [
            "verkehrsteilnahme",
            "überschreiten",
            "tatsächliche",
            "angegebene"
          ]
        },
        {
          "label": "Die angegebenen Grenzen stellen nur Beispiele dar.",
          "keywords": [
            "beispiele",
            "grenzen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 39"
    },
    {
      "id": "vz-266",
      "subject": "zeichen",
      "sign": "266",
      "signLabel": "Zeichen 266",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "40",
      "name": "Tatsächliche Länge",
      "category": "Vorschriftzeichen (Anlage 2), Verkehrsverbote",
      "topic": "Zeichen 266 – Tatsächliche Länge",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x334"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Das Verbot gilt bei Fahrzeugkombinationen für die Gesamtlänge."
        },
        {
          "type": "allgemein",
          "text": "Die nachfolgenden Zeichen 262 bis 266 verbieten die Verkehrsteilnahme für Fahrzeuge, deren Maße oder Massen, einschließlich Ladung, eine auf dem jeweiligen Zeichen angegebene tatsächliche Grenze überschreiten."
        },
        {
          "type": "allgemein",
          "text": "Die angegebenen Grenzen stellen nur Beispiele dar."
        }
      ],
      "modelAnswer": "Das ist Zeichen 266 „Tatsächliche Länge“ – Vorschriftzeichen (Anlage 2), Verkehrsverbote. Das Verbot gilt bei Fahrzeugkombinationen für die Gesamtlänge. Die nachfolgenden Zeichen 262 bis 266 verbieten die Verkehrsteilnahme für Fahrzeuge, deren Maße oder Massen, einschließlich Ladung, eine auf dem jeweiligen Zeichen angegebene tatsächliche Grenze überschreiten. Die angegebenen Grenzen stellen nur Beispiele dar.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Tatsächliche Länge",
          "keywords": [
            "266",
            "länge",
            "tatsächliche",
            "tatsächliche länge"
          ]
        },
        {
          "label": "Das Verbot gilt bei Fahrzeugkombinationen für die Gesamtlänge.",
          "keywords": [
            "fahrzeugkombinationen",
            "gesamtlänge"
          ]
        },
        {
          "label": "Die nachfolgenden Zeichen 262 bis 266 verbieten die Verkehrsteilnahme für Fahrzeuge, deren Maße oder Massen, …",
          "keywords": [
            "verkehrsteilnahme",
            "überschreiten",
            "tatsächliche",
            "angegebene"
          ]
        },
        {
          "label": "Die angegebenen Grenzen stellen nur Beispiele dar.",
          "keywords": [
            "beispiele",
            "grenzen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 40"
    },
    {
      "id": "vz-267",
      "subject": "zeichen",
      "sign": "267",
      "signLabel": "Zeichen 267",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "41",
      "name": "Verbot der Einfahrt",
      "category": "Vorschriftzeichen (Anlage 2), Verkehrsverbote",
      "topic": "Zeichen 267 – Verbot der Einfahrt",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x335"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Wer ein Fahrzeug führt, darf nicht in die Fahrbahn einfahren, für die das Zeichen angeordnet ist."
        },
        {
          "type": "erlaeuterung",
          "text": "Das Zeichen steht auf der rechten Seite der Fahrbahn, für die es gilt, oder auf beiden Seiten dieser Fahrbahn."
        }
      ],
      "modelAnswer": "Das ist Zeichen 267 „Verbot der Einfahrt“ – Vorschriftzeichen (Anlage 2), Verkehrsverbote. Wer ein Fahrzeug führt, darf nicht in die Fahrbahn einfahren, für die das Zeichen angeordnet ist. Das Zeichen steht auf der rechten Seite der Fahrbahn, für die es gilt, oder auf beiden Seiten dieser Fahrbahn.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Verbot der Einfahrt",
          "keywords": [
            "267",
            "einfahrt",
            "verbot der einfahrt"
          ]
        },
        {
          "label": "Wer ein Fahrzeug führt, darf nicht in die Fahrbahn einfahren, für die das Zeichen angeordnet ist.",
          "keywords": [
            "einfahren"
          ]
        },
        {
          "label": "Das Zeichen steht auf der rechten Seite der Fahrbahn, für die es gilt, oder auf beiden Seiten dieser Fahrbahn.",
          "keywords": [
            "rechten",
            "beiden",
            "seiten",
            "seite"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 41"
    },
    {
      "id": "vz-z2-41-1",
      "subject": "zeichen",
      "sign": null,
      "signLabel": "Zusatzzeichen",
      "kind": "Zusatzzeichen",
      "anlage": 2,
      "lfd": "41.1",
      "name": "Radverkehr frei (zu Zeichen 267)",
      "category": "Zusatzzeichen (Anlage 2), Verkehrsverbote",
      "topic": "Zusatzzeichen – Radverkehr frei (zu Zeichen 267)",
      "question": "Was bedeutet dieses Zusatzzeichen? Erklären Sie, zu welchem Zeichen es gehört und was es regelt.",
      "difficulty": 2,
      "images": [
        "x336"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Durch das Zusatzzeichen zu dem Zeichen 267 ist die Einfahrt für den Radverkehr und Elektrokleinstfahrzeuge im Sinne der eKFV zugelassen."
        }
      ],
      "modelAnswer": "Das ist Zusatzzeichen „Radverkehr frei (zu Zeichen 267)“ – Zusatzzeichen (Anlage 2), Verkehrsverbote. Durch das Zusatzzeichen zu dem Zeichen 267 ist die Einfahrt für den Radverkehr und Elektrokleinstfahrzeuge im Sinne der eKFV zugelassen.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Radverkehr frei (zu Zeichen 267)",
          "keywords": [
            "frei",
            "radverkehr",
            "radverkehr frei (zu zeichen 267)"
          ]
        },
        {
          "label": "Zusatzzeichen zum Hauptzeichen",
          "keywords": [
            "zusatzzeichen",
            "267"
          ]
        },
        {
          "label": "Durch das Zusatzzeichen zu dem Zeichen 267 ist die Einfahrt für den Radverkehr und Elektrokleinstfahrzeuge …",
          "keywords": [
            "elektrokleinstfahrzeuge",
            "radverkehr",
            "zugelassen",
            "einfahrt"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Mit welchem Hauptzeichen wird dieses Zusatzzeichen verwendet?",
        "Wo steht das Zusatzzeichen?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 41.1"
    },
    {
      "id": "vz-268",
      "subject": "zeichen",
      "sign": "268",
      "signLabel": "Zeichen 268",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "42",
      "name": "Schneeketten vorgeschrieben",
      "category": "Vorschriftzeichen (Anlage 2), Verkehrsverbote",
      "topic": "Zeichen 268 – Schneeketten vorgeschrieben",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x337"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Wer ein Fahrzeug führt, darf die Straße nur mit Schneeketten befahren."
        }
      ],
      "modelAnswer": "Das ist Zeichen 268 „Schneeketten vorgeschrieben“ – Vorschriftzeichen (Anlage 2), Verkehrsverbote. Wer ein Fahrzeug führt, darf die Straße nur mit Schneeketten befahren.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Schneeketten vorgeschrieben",
          "keywords": [
            "268",
            "schneeketten",
            "vorgeschrieben",
            "schneeketten vorgeschrieben"
          ]
        },
        {
          "label": "Wer ein Fahrzeug führt, darf die Straße nur mit Schneeketten befahren.",
          "keywords": [
            "schneeketten",
            "befahren",
            "straße"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 42"
    },
    {
      "id": "vz-269",
      "subject": "zeichen",
      "sign": "269",
      "signLabel": "Zeichen 269",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "43",
      "name": "Verbot für Fahrzeuge mit wassergefährdender Ladung",
      "category": "Vorschriftzeichen (Anlage 2), Verkehrsverbote",
      "topic": "Zeichen 269 – Verbot für Fahrzeuge mit wassergefährdender Ladung",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x350"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Wer ein Fahrzeug führt, darf die Straße mit mehr als 20 l wassergefährdender Ladung nicht benutzen."
        }
      ],
      "modelAnswer": "Das ist Zeichen 269 „Verbot für Fahrzeuge mit wassergefährdender Ladung“ – Vorschriftzeichen (Anlage 2), Verkehrsverbote. Wer ein Fahrzeug führt, darf die Straße mit mehr als 20 l wassergefährdender Ladung nicht benutzen.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Verbot für Fahrzeuge mit wassergefährdender Ladung",
          "keywords": [
            "269",
            "ladung",
            "wassergefährdender",
            "verbot für fahrzeuge mit wassergefährdender ladung"
          ]
        },
        {
          "label": "Wer ein Fahrzeug führt, darf die Straße mit mehr als 20 l wassergefährdender Ladung nicht benutzen.",
          "keywords": [
            "wassergefährdender",
            "straße",
            "ladung"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 43"
    },
    {
      "id": "vz-270-1",
      "subject": "zeichen",
      "sign": "270.1",
      "signLabel": "Zeichen 270.1",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "44",
      "name": "Beginn einer Verkehrsverbotszone zur Verminderung schädlicher Luftverunreinigungen in einer Zone (Umweltzone)",
      "category": "Vorschriftzeichen (Anlage 2), Verkehrsverbote",
      "topic": "Zeichen 270.1 – Beginn einer Verkehrsverbotszone zur Verminderung schädlicher Luftverunreinigungen in einer Zone (Umweltzone)",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x356"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "1. Die Teilnahme am Verkehr mit einem Kraftfahrzeug innerhalb einer so gekennzeichneten Zone ist verboten. 2. § 1 Absatz 2 sowie § 2 Absatz 3 in Verbindung mit Anhang 3 der Verordnung zur Kennzeichnung der Kraftfahrzeuge mit geringem Beitrag zur Schadstoffbelastung vom 10. Oktober 2006 (BGBl. I S. 2218), die durch Artikel 1 der Verordnung vom 5. Dezember 2007 (BGBl. I S. 2793) geändert worden ist, bleiben unberührt. Die Ausnahmen können im Einzelfall oder allgemein durch Zusatzzeichen oder Allgemeinverfügung zugelassen sein. 3. Von dem Verbot der Verkehrsteilnahme sind zudem Kraftfahrzeuge zur Beförderung schwerbehinderter Menschen mit außergewöhnlicher Gehbehinderung, beidseitiger Amelie oder Phokomelie oder mit vergleichbaren Funktionseinschränkungen sowie blinde Menschen ausgenommen."
        },
        {
          "type": "erlaeuterung",
          "text": "Die Umweltzone ist zur Vermeidung von schädlichen Umwelteinwirkungen durch Luftverunreinigungen in einem Luftreinhalteplan oder einem Plan für kurzfristig zu ergreifende Maßnahmen nach § 47 Absatz 1 oder 2 des Bundes-Immissionsschutzgesetzes festgesetzt und auf Grund des § 40 Absatz 1 des Bundes-Immissionsschutzgesetzes angeordnet. Die Kennzeichnung der Umweltzone erfolgt auf Grund von § 45 Absatz 1f."
        }
      ],
      "modelAnswer": "Das ist Zeichen 270.1 „Beginn einer Verkehrsverbotszone zur Verminderung schädlicher Luftverunreinigungen in einer Zone (Umweltzone)“ – Vorschriftzeichen (Anlage 2), Verkehrsverbote. 1. Die Teilnahme am Verkehr mit einem Kraftfahrzeug innerhalb einer so gekennzeichneten Zone ist verboten. 2. § 1 Absatz 2 sowie § 2 Absatz 3 in Verbindung mit Anhang 3 der Verordnung zur Kennzeichnung der Kraftfahrzeuge mit geringem Beitrag zur Schadstoffbelastung vom 10. Oktober 2006 (BGBl. I S. 2218), die durch Artikel 1 der Verordnung vom 5. Dezember 2007 (BGBl. I S. 2793) geändert worden ist, bleiben unberührt. Die Ausnahmen können im Einzelfall oder allgemein durch Zusatzzeichen oder Allgemeinverfügung zugelassen sein. 3. Von dem Verbot der Verkehrsteilnahme sind zudem Kraftfahrzeuge zur Beförderung schwerbehinderter Menschen mit außergewöhnlicher Gehbehinderung, beidseitiger Amelie oder Phokomelie oder mit vergleichbaren Funktionseinschränkungen sowie blinde Menschen ausgenommen. Die Umweltzone ist zur Vermeidung von schädlichen Umwelteinwirkungen durch Luftverunreinigungen in einem Luftreinhalteplan oder einem Plan für kurzfristig zu ergreifende Maßnahmen nach § 47 Absatz 1 oder 2 des Bundes-Immissionsschutzgesetzes festgesetzt und auf Grund des § 40 Absatz 1 des Bundes-Immissionsschutzgesetzes angeordnet. Die Kennzeichnung der Umweltzone erfolgt auf Grund von § 45 Absatz 1f.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Beginn einer Verkehrsverbotszone zur Verminderung schädlicher Luftverunreinigungen in einer Zone (Umweltzone)",
          "keywords": [
            "270.1",
            "verminderung",
            "verkehrsverbotszone",
            "luftverunreinigungen",
            "beginn einer verkehrsverbotszone zur verminderung schädlicher luftverunreinigungen in einer zone (umweltzone)"
          ]
        },
        {
          "label": "1. Die Teilnahme am Verkehr mit einem Kraftfahrzeug innerhalb einer so gekennzeichneten Zone ist verboten.",
          "keywords": [
            "kraftfahrzeug",
            "teilnahme",
            "zone"
          ]
        },
        {
          "label": "2. § 1 Absatz 2 sowie § 2 Absatz 3 in Verbindung mit Anhang 3 der Verordnung zur Kennzeichnung der …",
          "keywords": [
            "schadstoffbelastung",
            "allgemeinverfügung",
            "kraftfahrzeuge",
            "kennzeichnung"
          ]
        },
        {
          "label": "3. Von dem Verbot der Verkehrsteilnahme sind zudem Kraftfahrzeuge zur Beförderung schwerbehinderter Menschen …",
          "keywords": [
            "funktionseinschränkungen",
            "verkehrsteilnahme",
            "schwerbehinderter",
            "außergewöhnlicher"
          ]
        },
        {
          "label": "Die Umweltzone ist zur Vermeidung von schädlichen Umwelteinwirkungen durch Luftverunreinigungen in einem …",
          "keywords": [
            "bundes-immissionsschutzgesetzes",
            "luftverunreinigungen",
            "umwelteinwirkungen",
            "luftreinhalteplan"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 44"
    },
    {
      "id": "vz-270-2",
      "subject": "zeichen",
      "sign": "270.2",
      "signLabel": "Zeichen 270.2",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "45",
      "name": "Ende einer Verkehrsverbotszone zur Verminderung schädlicher Luftverunreinigungen in einer Zone (Umweltzone)",
      "category": "Vorschriftzeichen (Anlage 2), Verkehrsverbote",
      "topic": "Zeichen 270.2 – Ende einer Verkehrsverbotszone zur Verminderung schädlicher Luftverunreinigungen in einer Zone (Umweltzone)",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x362"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 270.2 „Ende einer Verkehrsverbotszone zur Verminderung schädlicher Luftverunreinigungen in einer Zone (Umweltzone)“ – Vorschriftzeichen (Anlage 2), Verkehrsverbote.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Ende einer Verkehrsverbotszone zur Verminderung schädlicher Luftverunreinigungen in einer Zone (Umweltzone)",
          "keywords": [
            "270.2",
            "verminderung",
            "verkehrsverbotszone",
            "luftverunreinigungen",
            "ende einer verkehrsverbotszone zur verminderung schädlicher luftverunreinigungen in einer zone (umweltzone)"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 45"
    },
    {
      "id": "vz-z2-46",
      "subject": "zeichen",
      "sign": null,
      "signLabel": "Zusatzzeichen",
      "kind": "Zusatzzeichen",
      "anlage": 2,
      "lfd": "46",
      "name": "Freistellung vom Verkehrsverbot nach § 40 Absatz 1 des Bundes-Immissionsschutzgesetzes (Plakette, zu Zeichen 270.1)",
      "category": "Zusatzzeichen (Anlage 2), Verkehrsverbote",
      "topic": "Zusatzzeichen – Freistellung vom Verkehrsverbot nach § 40 Absatz 1 des Bundes-Immissionsschutzgesetzes (Plakette, zu Zeichen 270.1)",
      "question": "Was bedeutet dieses Zusatzzeichen? Erklären Sie, zu welchem Zeichen es gehört und was es regelt.",
      "difficulty": 2,
      "images": [
        "x363"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Das Zusatzzeichen zum Zeichen 270.1 nimmt Kraftfahrzeuge vom Verkehrsverbot aus, die mit einer auf dem Zusatzzeichen in der jeweiligen Farbe angezeigten Plakette nach § 3 der Verordnung zur Kennzeichnung der Kraftfahrzeuge mit geringem Beitrag zur Schadstoffbelastung ausgestattet sind."
        }
      ],
      "modelAnswer": "Das ist Zusatzzeichen „Freistellung vom Verkehrsverbot nach § 40 Absatz 1 des Bundes-Immissionsschutzgesetzes (Plakette, zu Zeichen 270.1)“ – Zusatzzeichen (Anlage 2), Verkehrsverbote. Das Zusatzzeichen zum Zeichen 270.1 nimmt Kraftfahrzeuge vom Verkehrsverbot aus, die mit einer auf dem Zusatzzeichen in der jeweiligen Farbe angezeigten Plakette nach § 3 der Verordnung zur Kennzeichnung der Kraftfahrzeuge mit geringem Beitrag zur Schadstoffbelastung ausgestattet sind.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Freistellung vom Verkehrsverbot nach § 40 Absatz 1 des Bundes-Immissionsschutzgesetzes (Plakette, zu Zeichen 270.1)",
          "keywords": [
            "freistellung",
            "verkehrsverbot",
            "bundes-immissionsschutzgesetzes",
            "freistellung vom verkehrsverbot nach § 40 absatz 1 des bundes-immissionsschutzgesetzes (plakette, zu zeichen 270.1)"
          ]
        },
        {
          "label": "Zusatzzeichen zum Hauptzeichen",
          "keywords": [
            "zusatzzeichen",
            "270.1"
          ]
        },
        {
          "label": "Das Zusatzzeichen zum Zeichen 270.1 nimmt Kraftfahrzeuge vom Verkehrsverbot aus, die mit einer auf dem …",
          "keywords": [
            "schadstoffbelastung",
            "kraftfahrzeuge",
            "verkehrsverbot",
            "kennzeichnung"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Mit welchem Hauptzeichen wird dieses Zusatzzeichen verwendet?",
        "Wo steht das Zusatzzeichen?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 46"
    },
    {
      "id": "vz-272",
      "subject": "zeichen",
      "sign": "272",
      "signLabel": "Zeichen 272",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "47",
      "name": "Verbot des Wendens",
      "category": "Vorschriftzeichen (Anlage 2), Verkehrsverbote",
      "topic": "Zeichen 272 – Verbot des Wendens",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x364"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Wer ein Fahrzeug führt, darf hier nicht wenden."
        }
      ],
      "modelAnswer": "Das ist Zeichen 272 „Verbot des Wendens“ – Vorschriftzeichen (Anlage 2), Verkehrsverbote. Wer ein Fahrzeug führt, darf hier nicht wenden.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Verbot des Wendens",
          "keywords": [
            "272",
            "wendens",
            "verbot des wendens"
          ]
        },
        {
          "label": "Wer ein Fahrzeug führt, darf hier nicht wenden.",
          "keywords": [
            "wenden"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 47"
    },
    {
      "id": "vz-273",
      "subject": "zeichen",
      "sign": "273",
      "signLabel": "Zeichen 273",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "48",
      "name": "Verbot des Unterschreitens des angegebenen Mindestabstandes",
      "category": "Vorschriftzeichen (Anlage 2), Verkehrsverbote",
      "topic": "Zeichen 273 – Verbot des Unterschreitens des angegebenen Mindestabstandes",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x374"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Wer ein Kraftfahrzeug mit einer zulässigen Gesamtmasse über 3,5 t oder eine Zugmaschine führt, darf den angegebenen Mindestabstand zu einem vorausfahrenden Kraftfahrzeug gleicher Art nicht unterschreiten. Personenkraftwagen und Kraftomnibusse sind ausgenommen."
        }
      ],
      "modelAnswer": "Das ist Zeichen 273 „Verbot des Unterschreitens des angegebenen Mindestabstandes“ – Vorschriftzeichen (Anlage 2), Verkehrsverbote. Wer ein Kraftfahrzeug mit einer zulässigen Gesamtmasse über 3,5 t oder eine Zugmaschine führt, darf den angegebenen Mindestabstand zu einem vorausfahrenden Kraftfahrzeug gleicher Art nicht unterschreiten. Personenkraftwagen und Kraftomnibusse sind ausgenommen.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Verbot des Unterschreitens des angegebenen Mindestabstandes",
          "keywords": [
            "273",
            "unterschreitens",
            "mindestabstandes",
            "verbot des unterschreitens des angegebenen mindestabstandes"
          ]
        },
        {
          "label": "Wer ein Kraftfahrzeug mit einer zulässigen Gesamtmasse über 3,5 t oder eine Zugmaschine führt, darf den …",
          "keywords": [
            "3,5 t",
            "personenkraftwagen",
            "vorausfahrenden",
            "mindestabstand"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 48"
    },
    {
      "id": "vz-274",
      "subject": "zeichen",
      "sign": "274",
      "signLabel": "Zeichen 274",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "49",
      "name": "Zulässige Höchstgeschwindigkeit",
      "category": "Vorschriftzeichen (Anlage 2), Geschwindigkeitsbeschränkungen und Überholverbote",
      "topic": "Zeichen 274 – Zulässige Höchstgeschwindigkeit",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x380"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "1. Wer ein Fahrzeug führt, darf nicht schneller als mit der jeweils angegebenen Höchstgeschwindigkeit fahren. 2. Sind durch das Zeichen innerhalb geschlossener Ortschaften bestimmte Geschwindigkeiten über 50 km/h zugelassen, gilt das für Fahrzeuge aller Art. 3. Außerhalb geschlossener Ortschaften bleiben die für bestimmte Fahrzeugarten geltenden Höchstgeschwindigkeiten (§ 3 Absatz 3 Nummer 2 Buchstabe a und b und § 18 Absatz 5) unberührt, wenn durch das Zeichen eine höhere Geschwindigkeit zugelassen ist."
        },
        {
          "type": "erlaeuterung",
          "text": "Das Zeichen kann in einer Fahrstreifentafel oder einer Einengungstafel oder einer Aufweitungstafel integriert sein. Dann bezieht sich die zulässige Höchstgeschwindigkeit nur auf den jeweiligen Fahrstreifen, für den die Höchstgeschwindigkeit angeordnet ist."
        },
        {
          "type": "allgemein",
          "text": "Das Ende einer streckenbezogenen Geschwindigkeitsbeschränkung oder eines Überholverbots ist nicht gekennzeichnet, wenn das Verbot nur für eine kurze Strecke gilt und auf einem Zusatzzeichen die Länge des Verbots angegeben ist. Es ist auch nicht gekennzeichnet, wenn das Verbotszeichen zusammen mit einem Gefahrzeichen angebracht ist und sich aus der Örtlichkeit zweifelsfrei ergibt, von wo an die angezeigte Gefahr nicht mehr besteht. Sonst ist es gekennzeichnet durch die Zeichen 278 bis 282."
        }
      ],
      "modelAnswer": "Das ist Zeichen 274 „Zulässige Höchstgeschwindigkeit“ – Vorschriftzeichen (Anlage 2), Geschwindigkeitsbeschränkungen und Überholverbote. 1. Wer ein Fahrzeug führt, darf nicht schneller als mit der jeweils angegebenen Höchstgeschwindigkeit fahren. 2. Sind durch das Zeichen innerhalb geschlossener Ortschaften bestimmte Geschwindigkeiten über 50 km/h zugelassen, gilt das für Fahrzeuge aller Art. 3. Außerhalb geschlossener Ortschaften bleiben die für bestimmte Fahrzeugarten geltenden Höchstgeschwindigkeiten (§ 3 Absatz 3 Nummer 2 Buchstabe a und b und § 18 Absatz 5) unberührt, wenn durch das Zeichen eine höhere Geschwindigkeit zugelassen ist. Das Zeichen kann in einer Fahrstreifentafel oder einer Einengungstafel oder einer Aufweitungstafel integriert sein. Dann bezieht sich die zulässige Höchstgeschwindigkeit nur auf den jeweiligen Fahrstreifen, für den die Höchstgeschwindigkeit angeordnet ist. Das Ende einer streckenbezogenen Geschwindigkeitsbeschränkung oder eines Überholverbots ist nicht gekennzeichnet, wenn das Verbot nur für eine kurze Strecke gilt und auf einem Zusatzzeichen die Länge des Verbots angegeben ist. Es ist auch nicht gekennzeichnet, wenn das Verbotszeichen zusammen mit einem Gefahrzeichen angebracht ist und sich aus der Örtlichkeit zweifelsfrei ergibt, von wo an die angezeigte Gefahr nicht mehr besteht. Sonst ist es gekennzeichnet durch die Zeichen 278 bis 282.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Zulässige Höchstgeschwindigkeit",
          "keywords": [
            "274",
            "zulässige",
            "höchstgeschwindigkeit",
            "zulässige höchstgeschwindigkeit"
          ]
        },
        {
          "label": "1. Wer ein Fahrzeug führt, darf nicht schneller als mit der jeweils angegebenen Höchstgeschwindigkeit fahren.",
          "keywords": [
            "höchstgeschwindigkeit",
            "schneller",
            "fahren"
          ]
        },
        {
          "label": "2. Sind durch das Zeichen innerhalb geschlossener Ortschaften bestimmte Geschwindigkeiten über 50 km/h …",
          "keywords": [
            "50 km/h",
            "geschwindigkeiten",
            "geschlossener",
            "ortschaften"
          ]
        },
        {
          "label": "3. Außerhalb geschlossener Ortschaften bleiben die für bestimmte Fahrzeugarten geltenden …",
          "keywords": [
            "höchstgeschwindigkeiten",
            "geschwindigkeit",
            "geschlossener",
            "fahrzeugarten"
          ]
        },
        {
          "label": "Das Zeichen kann in einer Fahrstreifentafel oder einer Einengungstafel oder einer Aufweitungstafel …",
          "keywords": [
            "höchstgeschwindigkeit",
            "fahrstreifentafel",
            "aufweitungstafel",
            "einengungstafel"
          ]
        },
        {
          "label": "Das Ende einer streckenbezogenen Geschwindigkeitsbeschränkung oder eines Überholverbots ist nicht …",
          "keywords": [
            "geschwindigkeitsbeschränkung",
            "streckenbezogenen",
            "überholverbots",
            "verbotszeichen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 49"
    },
    {
      "id": "vz-z2-49-1",
      "subject": "zeichen",
      "sign": null,
      "signLabel": "Zusatzzeichen",
      "kind": "Zusatzzeichen",
      "anlage": 2,
      "lfd": "49.1",
      "name": "„bei Nässe“ (zu Zeichen 274)",
      "category": "Zusatzzeichen (Anlage 2), Geschwindigkeitsbeschränkungen und Überholverbote",
      "topic": "Zusatzzeichen – „bei Nässe“ (zu Zeichen 274)",
      "question": "Was bedeutet dieses Zusatzzeichen? Erklären Sie, zu welchem Zeichen es gehört und was es regelt.",
      "difficulty": 2,
      "images": [
        "x381"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Das Zusatzzeichen zu dem Zeichen 274 verbietet Fahrzeugführenden, bei nasser Fahrbahn die angegebene Geschwindigkeit zu überschreiten."
        }
      ],
      "modelAnswer": "Das ist Zusatzzeichen „„bei Nässe“ (zu Zeichen 274)“ – Zusatzzeichen (Anlage 2), Geschwindigkeitsbeschränkungen und Überholverbote. Das Zusatzzeichen zu dem Zeichen 274 verbietet Fahrzeugführenden, bei nasser Fahrbahn die angegebene Geschwindigkeit zu überschreiten.",
      "keyPoints": [
        {
          "label": "Bezeichnung: „bei Nässe“ (zu Zeichen 274)",
          "keywords": [
            "nässe",
            "„bei nässe“ (zu zeichen 274)"
          ]
        },
        {
          "label": "Zusatzzeichen zum Hauptzeichen",
          "keywords": [
            "zusatzzeichen",
            "274"
          ]
        },
        {
          "label": "Das Zusatzzeichen zu dem Zeichen 274 verbietet Fahrzeugführenden, bei nasser Fahrbahn die angegebene …",
          "keywords": [
            "fahrzeugführenden",
            "geschwindigkeit",
            "überschreiten",
            "angegebene"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Mit welchem Hauptzeichen wird dieses Zusatzzeichen verwendet?",
        "Wo steht das Zusatzzeichen?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 49.1"
    },
    {
      "id": "vz-274-1",
      "subject": "zeichen",
      "sign": "274.1",
      "signLabel": "Zeichen 274.1",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "50",
      "name": "Beginn einer Tempo 30-Zone",
      "category": "Vorschriftzeichen (Anlage 2), Geschwindigkeitsbeschränkungen und Überholverbote",
      "topic": "Zeichen 274.1 – Beginn einer Tempo 30-Zone",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x389"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Wer ein Fahrzeug führt, darf innerhalb dieser Zone nicht schneller als mit der angegebenen Höchstgeschwindigkeit fahren."
        },
        {
          "type": "erlaeuterung",
          "text": "Mit dem Zeichen können in verkehrsberuhigten Geschäftsbereichen auch Zonengeschwindigkeitsbeschränkungen von weniger als 30 km/h angeordnet sein."
        }
      ],
      "modelAnswer": "Das ist Zeichen 274.1 „Beginn einer Tempo 30-Zone“ – Vorschriftzeichen (Anlage 2), Geschwindigkeitsbeschränkungen und Überholverbote. Wer ein Fahrzeug führt, darf innerhalb dieser Zone nicht schneller als mit der angegebenen Höchstgeschwindigkeit fahren. Mit dem Zeichen können in verkehrsberuhigten Geschäftsbereichen auch Zonengeschwindigkeitsbeschränkungen von weniger als 30 km/h angeordnet sein.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Beginn einer Tempo 30-Zone",
          "keywords": [
            "zone",
            "tempo",
            "274.1",
            "beginn einer tempo 30-zone"
          ]
        },
        {
          "label": "Wer ein Fahrzeug führt, darf innerhalb dieser Zone nicht schneller als mit der angegebenen …",
          "keywords": [
            "höchstgeschwindigkeit",
            "schneller",
            "fahren",
            "zone"
          ]
        },
        {
          "label": "Mit dem Zeichen können in verkehrsberuhigten Geschäftsbereichen auch Zonengeschwindigkeitsbeschränkungen von …",
          "keywords": [
            "30 km/h",
            "zonengeschwindigkeitsbeschränkungen",
            "verkehrsberuhigten",
            "geschäftsbereichen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 50"
    },
    {
      "id": "vz-274-2",
      "subject": "zeichen",
      "sign": "274.2",
      "signLabel": "Zeichen 274.2",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "51",
      "name": "Ende einer Tempo 30-Zone",
      "category": "Vorschriftzeichen (Anlage 2), Geschwindigkeitsbeschränkungen und Überholverbote",
      "topic": "Zeichen 274.2 – Ende einer Tempo 30-Zone",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x390"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 274.2 „Ende einer Tempo 30-Zone“ – Vorschriftzeichen (Anlage 2), Geschwindigkeitsbeschränkungen und Überholverbote.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Ende einer Tempo 30-Zone",
          "keywords": [
            "zone",
            "tempo",
            "274.2",
            "ende einer tempo 30-zone"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 51"
    },
    {
      "id": "vz-275",
      "subject": "zeichen",
      "sign": "275",
      "signLabel": "Zeichen 275",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "52",
      "name": "Vorgeschriebene Mindestgeschwindigkeit",
      "category": "Vorschriftzeichen (Anlage 2), Geschwindigkeitsbeschränkungen und Überholverbote",
      "topic": "Zeichen 275 – Vorgeschriebene Mindestgeschwindigkeit",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x398"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Wer ein Fahrzeug führt, darf nicht langsamer als mit der angegebenen Mindestgeschwindigkeit fahren, sofern nicht Straßen-, Verkehrs-, Sicht- oder Wetterverhältnisse dazu verpflichten. Es verbietet, mit Fahrzeugen, die nicht so schnell fahren können oder dürfen, einen so gekennzeichneten Fahrstreifen zu benutzen."
        },
        {
          "type": "erlaeuterung",
          "text": "Das Zeichen kann in einer Fahrstreifentafel oder einer Aufweitungstafel integriert sein. Dann bezieht sich die vorgeschriebene Mindestgeschwindigkeit nur auf den jeweiligen Fahrstreifen, für den die Mindestgeschwindigkeit angeordnet ist."
        }
      ],
      "modelAnswer": "Das ist Zeichen 275 „Vorgeschriebene Mindestgeschwindigkeit“ – Vorschriftzeichen (Anlage 2), Geschwindigkeitsbeschränkungen und Überholverbote. Wer ein Fahrzeug führt, darf nicht langsamer als mit der angegebenen Mindestgeschwindigkeit fahren, sofern nicht Straßen-, Verkehrs-, Sicht- oder Wetterverhältnisse dazu verpflichten. Es verbietet, mit Fahrzeugen, die nicht so schnell fahren können oder dürfen, einen so gekennzeichneten Fahrstreifen zu benutzen. Das Zeichen kann in einer Fahrstreifentafel oder einer Aufweitungstafel integriert sein. Dann bezieht sich die vorgeschriebene Mindestgeschwindigkeit nur auf den jeweiligen Fahrstreifen, für den die Mindestgeschwindigkeit angeordnet ist.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Vorgeschriebene Mindestgeschwindigkeit",
          "keywords": [
            "275",
            "vorgeschriebene",
            "mindestgeschwindigkeit",
            "vorgeschriebene mindestgeschwindigkeit"
          ]
        },
        {
          "label": "Wer ein Fahrzeug führt, darf nicht langsamer als mit der angegebenen Mindestgeschwindigkeit fahren, sofern …",
          "keywords": [
            "mindestgeschwindigkeit",
            "wetterverhältnisse",
            "verpflichten",
            "langsamer"
          ]
        },
        {
          "label": "Das Zeichen kann in einer Fahrstreifentafel oder einer Aufweitungstafel integriert sein. Dann bezieht sich …",
          "keywords": [
            "mindestgeschwindigkeit",
            "fahrstreifentafel",
            "aufweitungstafel",
            "vorgeschriebene"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 52"
    },
    {
      "id": "vz-276",
      "subject": "zeichen",
      "sign": "276",
      "signLabel": "Zeichen 276",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "53",
      "name": "Überholverbot für Kraftfahrzeuge aller Art",
      "category": "Vorschriftzeichen (Anlage 2), Geschwindigkeitsbeschränkungen und Überholverbote",
      "topic": "Zeichen 276 – Überholverbot für Kraftfahrzeuge aller Art",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x404"
      ],
      "official": [
        {
          "type": "allgemein",
          "text": "Die nachfolgenden Zeichen 276 und 277 verbieten Kraftfahrzeugen das Überholen von mehrspurigen Kraftfahrzeugen und Krafträdern mit Beiwagen. Ist auf einem Zusatzzeichen eine Masse, wie \"7,5 t\" angegeben, gilt das Verbot nur, soweit die zulässige Gesamtmasse dieser Kraftfahrzeuge, einschließlich ihrer Anhänger, die angegebene Grenze überschreitet. Soll mehrspurigen Kraftfahrzeugen und Krafträdern mit Beiwagen das Überholen von einspurigen Fahrzeugen verboten werden, ist Zeichen 277.1 angeordnet."
        },
        {
          "type": "allgemein",
          "text": "Das Ende einer streckenbezogenen Geschwindigkeitsbeschränkung oder eines Überholverbots ist nicht gekennzeichnet, wenn das Verbot nur für eine kurze Strecke gilt und auf einem Zusatzzeichen die Länge des Verbots angegeben ist. Es ist auch nicht gekennzeichnet, wenn das Verbotszeichen zusammen mit einem Gefahrzeichen angebracht ist und sich aus der Örtlichkeit zweifelsfrei ergibt, von wo an die angezeigte Gefahr nicht mehr besteht. Sonst ist es gekennzeichnet durch die Zeichen 278 bis 282."
        }
      ],
      "modelAnswer": "Das ist Zeichen 276 „Überholverbot für Kraftfahrzeuge aller Art“ – Vorschriftzeichen (Anlage 2), Geschwindigkeitsbeschränkungen und Überholverbote. Die nachfolgenden Zeichen 276 und 277 verbieten Kraftfahrzeugen das Überholen von mehrspurigen Kraftfahrzeugen und Krafträdern mit Beiwagen. Ist auf einem Zusatzzeichen eine Masse, wie \"7,5 t\" angegeben, gilt das Verbot nur, soweit die zulässige Gesamtmasse dieser Kraftfahrzeuge, einschließlich ihrer Anhänger, die angegebene Grenze überschreitet. Soll mehrspurigen Kraftfahrzeugen und Krafträdern mit Beiwagen das Überholen von einspurigen Fahrzeugen verboten werden, ist Zeichen 277.1 angeordnet. Das Ende einer streckenbezogenen Geschwindigkeitsbeschränkung oder eines Überholverbots ist nicht gekennzeichnet, wenn das Verbot nur für eine kurze Strecke gilt und auf einem Zusatzzeichen die Länge des Verbots angegeben ist. Es ist auch nicht gekennzeichnet, wenn das Verbotszeichen zusammen mit einem Gefahrzeichen angebracht ist und sich aus der Örtlichkeit zweifelsfrei ergibt, von wo an die angezeigte Gefahr nicht mehr besteht. Sonst ist es gekennzeichnet durch die Zeichen 278 bis 282.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Überholverbot für Kraftfahrzeuge aller Art",
          "keywords": [
            "276",
            "aller",
            "überholverbot",
            "kraftfahrzeuge",
            "überholverbot für kraftfahrzeuge aller art"
          ]
        },
        {
          "label": "Die nachfolgenden Zeichen 276 und 277 verbieten Kraftfahrzeugen das Überholen von mehrspurigen …",
          "keywords": [
            "7,5 t",
            "kraftfahrzeugen",
            "kraftfahrzeuge",
            "überschreitet"
          ]
        },
        {
          "label": "Das Ende einer streckenbezogenen Geschwindigkeitsbeschränkung oder eines Überholverbots ist nicht …",
          "keywords": [
            "geschwindigkeitsbeschränkung",
            "streckenbezogenen",
            "überholverbots",
            "verbotszeichen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 53"
    },
    {
      "id": "vz-277",
      "subject": "zeichen",
      "sign": "277",
      "signLabel": "Zeichen 277",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "54",
      "name": "Überholverbot für Kraftfahrzeuge über 3,5 t",
      "category": "Vorschriftzeichen (Anlage 2), Geschwindigkeitsbeschränkungen und Überholverbote",
      "topic": "Zeichen 277 – Überholverbot für Kraftfahrzeuge über 3,5 t",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x405"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Überholverbot für Kraftfahrzeuge mit einer zulässigen Gesamtmasse über 3,5 t, einschließlich ihrer Anhänger, und für Zugmaschinen. Ausgenommen sind Personenkraftwagen und Kraftomnibusse."
        },
        {
          "type": "allgemein",
          "text": "Die nachfolgenden Zeichen 276 und 277 verbieten Kraftfahrzeugen das Überholen von mehrspurigen Kraftfahrzeugen und Krafträdern mit Beiwagen. Ist auf einem Zusatzzeichen eine Masse, wie \"7,5 t\" angegeben, gilt das Verbot nur, soweit die zulässige Gesamtmasse dieser Kraftfahrzeuge, einschließlich ihrer Anhänger, die angegebene Grenze überschreitet. Soll mehrspurigen Kraftfahrzeugen und Krafträdern mit Beiwagen das Überholen von einspurigen Fahrzeugen verboten werden, ist Zeichen 277.1 angeordnet."
        },
        {
          "type": "allgemein",
          "text": "Das Ende einer streckenbezogenen Geschwindigkeitsbeschränkung oder eines Überholverbots ist nicht gekennzeichnet, wenn das Verbot nur für eine kurze Strecke gilt und auf einem Zusatzzeichen die Länge des Verbots angegeben ist. Es ist auch nicht gekennzeichnet, wenn das Verbotszeichen zusammen mit einem Gefahrzeichen angebracht ist und sich aus der Örtlichkeit zweifelsfrei ergibt, von wo an die angezeigte Gefahr nicht mehr besteht. Sonst ist es gekennzeichnet durch die Zeichen 278 bis 282."
        }
      ],
      "modelAnswer": "Das ist Zeichen 277 „Überholverbot für Kraftfahrzeuge über 3,5 t“ – Vorschriftzeichen (Anlage 2), Geschwindigkeitsbeschränkungen und Überholverbote. Überholverbot für Kraftfahrzeuge mit einer zulässigen Gesamtmasse über 3,5 t, einschließlich ihrer Anhänger, und für Zugmaschinen. Ausgenommen sind Personenkraftwagen und Kraftomnibusse. Die nachfolgenden Zeichen 276 und 277 verbieten Kraftfahrzeugen das Überholen von mehrspurigen Kraftfahrzeugen und Krafträdern mit Beiwagen. Ist auf einem Zusatzzeichen eine Masse, wie \"7,5 t\" angegeben, gilt das Verbot nur, soweit die zulässige Gesamtmasse dieser Kraftfahrzeuge, einschließlich ihrer Anhänger, die angegebene Grenze überschreitet. Soll mehrspurigen Kraftfahrzeugen und Krafträdern mit Beiwagen das Überholen von einspurigen Fahrzeugen verboten werden, ist Zeichen 277.1 angeordnet. Das Ende einer streckenbezogenen Geschwindigkeitsbeschränkung oder eines Überholverbots ist nicht gekennzeichnet, wenn das Verbot nur für eine kurze Strecke gilt und auf einem Zusatzzeichen die Länge des Verbots angegeben ist. Es ist auch nicht gekennzeichnet, wenn das Verbotszeichen zusammen mit einem Gefahrzeichen angebracht ist und sich aus der Örtlichkeit zweifelsfrei ergibt, von wo an die angezeigte Gefahr nicht mehr besteht. Sonst ist es gekennzeichnet durch die Zeichen 278 bis 282.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Überholverbot für Kraftfahrzeuge über 3,5 t",
          "keywords": [
            "277",
            "3,5 t",
            "überholverbot",
            "kraftfahrzeuge",
            "überholverbot für kraftfahrzeuge über 3,5 t"
          ]
        },
        {
          "label": "Überholverbot für Kraftfahrzeuge mit einer zulässigen Gesamtmasse über 3,5 t, einschließlich ihrer Anhänger, …",
          "keywords": [
            "3,5 t",
            "personenkraftwagen",
            "kraftfahrzeuge",
            "kraftomnibusse"
          ]
        },
        {
          "label": "Die nachfolgenden Zeichen 276 und 277 verbieten Kraftfahrzeugen das Überholen von mehrspurigen …",
          "keywords": [
            "7,5 t",
            "kraftfahrzeugen",
            "kraftfahrzeuge",
            "überschreitet"
          ]
        },
        {
          "label": "Das Ende einer streckenbezogenen Geschwindigkeitsbeschränkung oder eines Überholverbots ist nicht …",
          "keywords": [
            "geschwindigkeitsbeschränkung",
            "streckenbezogenen",
            "überholverbots",
            "verbotszeichen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 54"
    },
    {
      "id": "vz-z2-54-1",
      "subject": "zeichen",
      "sign": null,
      "signLabel": "Zusatzzeichen",
      "kind": "Zusatzzeichen",
      "anlage": 2,
      "lfd": "54.1",
      "name": "Massenangabe „2,8 t“ (zu Zeichen 277)",
      "category": "Zusatzzeichen (Anlage 2), Geschwindigkeitsbeschränkungen und Überholverbote",
      "topic": "Zusatzzeichen – Massenangabe „2,8 t“ (zu Zeichen 277)",
      "question": "Was bedeutet dieses Zusatzzeichen? Erklären Sie, zu welchem Zeichen es gehört und was es regelt.",
      "difficulty": 2,
      "images": [
        "x406"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Mit dem Zusatzzeichen gilt das durch Zeichen 277 angeordnete Überholverbot auch für Kraftfahrzeuge über 2,8 t, einschließlich ihrer Anhänger."
        }
      ],
      "modelAnswer": "Das ist Zusatzzeichen „Massenangabe „2,8 t“ (zu Zeichen 277)“ – Zusatzzeichen (Anlage 2), Geschwindigkeitsbeschränkungen und Überholverbote. Mit dem Zusatzzeichen gilt das durch Zeichen 277 angeordnete Überholverbot auch für Kraftfahrzeuge über 2,8 t, einschließlich ihrer Anhänger.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Massenangabe „2,8 t“ (zu Zeichen 277)",
          "keywords": [
            "2,8 t",
            "massenangabe",
            "massenangabe „2,8 t“ (zu zeichen 277)"
          ]
        },
        {
          "label": "Zusatzzeichen zum Hauptzeichen",
          "keywords": [
            "zusatzzeichen",
            "277"
          ]
        },
        {
          "label": "Mit dem Zusatzzeichen gilt das durch Zeichen 277 angeordnete Überholverbot auch für Kraftfahrzeuge über 2,8 …",
          "keywords": [
            "2,8 t",
            "kraftfahrzeuge",
            "überholverbot",
            "angeordnete"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Mit welchem Hauptzeichen wird dieses Zusatzzeichen verwendet?",
        "Wo steht das Zusatzzeichen?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 54.1"
    },
    {
      "id": "vz-z2-54-2",
      "subject": "zeichen",
      "sign": null,
      "signLabel": "Zusatzzeichen",
      "kind": "Zusatzzeichen",
      "anlage": 2,
      "lfd": "54.2",
      "name": "„auch“ Kraftomnibusse und Pkw mit Anhänger (zu Zeichen 277)",
      "category": "Zusatzzeichen (Anlage 2), Geschwindigkeitsbeschränkungen und Überholverbote",
      "topic": "Zusatzzeichen – „auch“ Kraftomnibusse und Pkw mit Anhänger (zu Zeichen 277)",
      "question": "Was bedeutet dieses Zusatzzeichen? Erklären Sie, zu welchem Zeichen es gehört und was es regelt.",
      "difficulty": 2,
      "images": [
        "x407"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Mit dem Zusatzzeichen gilt das durch Zeichen 277 angeordnete Überholverbot auch für Kraftomnibusse und Personenkraftwagen mit Anhänger."
        }
      ],
      "modelAnswer": "Das ist Zusatzzeichen „„auch“ Kraftomnibusse und Pkw mit Anhänger (zu Zeichen 277)“ – Zusatzzeichen (Anlage 2), Geschwindigkeitsbeschränkungen und Überholverbote. Mit dem Zusatzzeichen gilt das durch Zeichen 277 angeordnete Überholverbot auch für Kraftomnibusse und Personenkraftwagen mit Anhänger.",
      "keyPoints": [
        {
          "label": "Bezeichnung: „auch“ Kraftomnibusse und Pkw mit Anhänger (zu Zeichen 277)",
          "keywords": [
            "anhänger",
            "kraftomnibusse",
            "„auch“ kraftomnibusse und pkw mit anhänger (zu zeichen 277)"
          ]
        },
        {
          "label": "Zusatzzeichen zum Hauptzeichen",
          "keywords": [
            "zusatzzeichen",
            "277"
          ]
        },
        {
          "label": "Mit dem Zusatzzeichen gilt das durch Zeichen 277 angeordnete Überholverbot auch für Kraftomnibusse und …",
          "keywords": [
            "personenkraftwagen",
            "kraftomnibusse",
            "überholverbot",
            "angeordnete"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Mit welchem Hauptzeichen wird dieses Zusatzzeichen verwendet?",
        "Wo steht das Zusatzzeichen?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 54.2"
    },
    {
      "id": "vz-z2-54-3",
      "subject": "zeichen",
      "sign": null,
      "signLabel": "Zusatzzeichen",
      "kind": "Zusatzzeichen",
      "anlage": 2,
      "lfd": "54.3",
      "name": "Längenangabe (zu Zeichen 274, 276, 277, 277.1)",
      "category": "Zusatzzeichen (Anlage 2), Geschwindigkeitsbeschränkungen und Überholverbote",
      "topic": "Zusatzzeichen – Längenangabe (zu Zeichen 274, 276, 277, 277.1)",
      "question": "Was bedeutet dieses Zusatzzeichen? Erklären Sie, zu welchem Zeichen es gehört und was es regelt.",
      "difficulty": 2,
      "images": [
        "x420"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Das Zusatzzeichen zu dem Zeichen 274, 276, 277 oder 277.1 gibt die Länge einer Geschwindigkeitsbeschränkung oder eines Überholverbots an."
        }
      ],
      "modelAnswer": "Das ist Zusatzzeichen „Längenangabe (zu Zeichen 274, 276, 277, 277.1)“ – Zusatzzeichen (Anlage 2), Geschwindigkeitsbeschränkungen und Überholverbote. Das Zusatzzeichen zu dem Zeichen 274, 276, 277 oder 277.1 gibt die Länge einer Geschwindigkeitsbeschränkung oder eines Überholverbots an.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Längenangabe (zu Zeichen 274, 276, 277, 277.1)",
          "keywords": [
            "längenangabe",
            "längenangabe (zu zeichen 274, 276, 277, 277.1)"
          ]
        },
        {
          "label": "Zusatzzeichen zum Hauptzeichen",
          "keywords": [
            "zusatzzeichen",
            "274"
          ]
        },
        {
          "label": "Das Zusatzzeichen zu dem Zeichen 274, 276, 277 oder 277.1 gibt die Länge einer Geschwindigkeitsbeschränkung …",
          "keywords": [
            "geschwindigkeitsbeschränkung",
            "überholverbots",
            "länge",
            "gibt"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Mit welchem Hauptzeichen wird dieses Zusatzzeichen verwendet?",
        "Wo steht das Zusatzzeichen?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 54.3"
    },
    {
      "id": "vz-277-1",
      "subject": "zeichen",
      "sign": "277.1",
      "signLabel": "Zeichen 277.1",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "54.4",
      "name": "Verbot des Überholens von einspurigen Fahrzeugen für mehrspurige Kraftfahrzeuge und Krafträder mit Beiwagen",
      "category": "Vorschriftzeichen (Anlage 2), Geschwindigkeitsbeschränkungen und Überholverbote",
      "topic": "Zeichen 277.1 – Verbot des Überholens von einspurigen Fahrzeugen für mehrspurige Kraftfahrzeuge und Krafträder mit Beiwagen",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x421"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Wer ein mehrspuriges Kraftfahrzeug führt, darf ein- und mehrspurige Fahrzeuge nicht überholen."
        },
        {
          "type": "allgemein",
          "text": "Die nachfolgenden Zeichen 276 und 277 verbieten Kraftfahrzeugen das Überholen von mehrspurigen Kraftfahrzeugen und Krafträdern mit Beiwagen. Ist auf einem Zusatzzeichen eine Masse, wie \"7,5 t\" angegeben, gilt das Verbot nur, soweit die zulässige Gesamtmasse dieser Kraftfahrzeuge, einschließlich ihrer Anhänger, die angegebene Grenze überschreitet. Soll mehrspurigen Kraftfahrzeugen und Krafträdern mit Beiwagen das Überholen von einspurigen Fahrzeugen verboten werden, ist Zeichen 277.1 angeordnet."
        },
        {
          "type": "allgemein",
          "text": "Das Ende einer streckenbezogenen Geschwindigkeitsbeschränkung oder eines Überholverbots ist nicht gekennzeichnet, wenn das Verbot nur für eine kurze Strecke gilt und auf einem Zusatzzeichen die Länge des Verbots angegeben ist. Es ist auch nicht gekennzeichnet, wenn das Verbotszeichen zusammen mit einem Gefahrzeichen angebracht ist und sich aus der Örtlichkeit zweifelsfrei ergibt, von wo an die angezeigte Gefahr nicht mehr besteht. Sonst ist es gekennzeichnet durch die Zeichen 278 bis 282."
        }
      ],
      "modelAnswer": "Das ist Zeichen 277.1 „Verbot des Überholens von einspurigen Fahrzeugen für mehrspurige Kraftfahrzeuge und Krafträder mit Beiwagen“ – Vorschriftzeichen (Anlage 2), Geschwindigkeitsbeschränkungen und Überholverbote. Wer ein mehrspuriges Kraftfahrzeug führt, darf ein- und mehrspurige Fahrzeuge nicht überholen. Die nachfolgenden Zeichen 276 und 277 verbieten Kraftfahrzeugen das Überholen von mehrspurigen Kraftfahrzeugen und Krafträdern mit Beiwagen. Ist auf einem Zusatzzeichen eine Masse, wie \"7,5 t\" angegeben, gilt das Verbot nur, soweit die zulässige Gesamtmasse dieser Kraftfahrzeuge, einschließlich ihrer Anhänger, die angegebene Grenze überschreitet. Soll mehrspurigen Kraftfahrzeugen und Krafträdern mit Beiwagen das Überholen von einspurigen Fahrzeugen verboten werden, ist Zeichen 277.1 angeordnet. Das Ende einer streckenbezogenen Geschwindigkeitsbeschränkung oder eines Überholverbots ist nicht gekennzeichnet, wenn das Verbot nur für eine kurze Strecke gilt und auf einem Zusatzzeichen die Länge des Verbots angegeben ist. Es ist auch nicht gekennzeichnet, wenn das Verbotszeichen zusammen mit einem Gefahrzeichen angebracht ist und sich aus der Örtlichkeit zweifelsfrei ergibt, von wo an die angezeigte Gefahr nicht mehr besteht. Sonst ist es gekennzeichnet durch die Zeichen 278 bis 282.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Verbot des Überholens von einspurigen Fahrzeugen für mehrspurige Kraftfahrzeuge und Krafträder mit Beiwagen",
          "keywords": [
            "277.1",
            "mehrspurige",
            "einspurigen",
            "kraftfahrzeuge",
            "verbot des überholens von einspurigen fahrzeugen für mehrspurige kraftfahrzeuge und krafträder mit beiwagen"
          ]
        },
        {
          "label": "Wer ein mehrspuriges Kraftfahrzeug führt, darf ein- und mehrspurige Fahrzeuge nicht überholen.",
          "keywords": [
            "kraftfahrzeug",
            "mehrspuriges",
            "mehrspurige",
            "überholen"
          ]
        },
        {
          "label": "Die nachfolgenden Zeichen 276 und 277 verbieten Kraftfahrzeugen das Überholen von mehrspurigen …",
          "keywords": [
            "7,5 t",
            "kraftfahrzeugen",
            "kraftfahrzeuge",
            "überschreitet"
          ]
        },
        {
          "label": "Das Ende einer streckenbezogenen Geschwindigkeitsbeschränkung oder eines Überholverbots ist nicht …",
          "keywords": [
            "geschwindigkeitsbeschränkung",
            "streckenbezogenen",
            "überholverbots",
            "verbotszeichen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 54.4"
    },
    {
      "id": "vz-278",
      "subject": "zeichen",
      "sign": "278",
      "signLabel": "Zeichen 278",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "56",
      "name": "Ende der zulässigen Höchstgeschwindigkeit",
      "category": "Vorschriftzeichen (Anlage 2), Geschwindigkeitsbeschränkungen und Überholverbote",
      "topic": "Zeichen 278 – Ende der zulässigen Höchstgeschwindigkeit",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x428"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Das Zeichen kann in einer Fahrstreifentafel oder einer Einengungstafel oder Aufweitungstafel integriert sein. Dann bezieht sich das Zeichen nur auf den jeweiligen Fahrstreifen, für den die zulässige Höchstgeschwindigkeit vorher angeordnet worden war."
        },
        {
          "type": "allgemein",
          "text": "Das Ende einer streckenbezogenen Geschwindigkeitsbeschränkung oder eines Überholverbots ist nicht gekennzeichnet, wenn das Verbot nur für eine kurze Strecke gilt und auf einem Zusatzzeichen die Länge des Verbots angegeben ist. Es ist auch nicht gekennzeichnet, wenn das Verbotszeichen zusammen mit einem Gefahrzeichen angebracht ist und sich aus der Örtlichkeit zweifelsfrei ergibt, von wo an die angezeigte Gefahr nicht mehr besteht. Sonst ist es gekennzeichnet durch die Zeichen 278 bis 282."
        }
      ],
      "modelAnswer": "Das ist Zeichen 278 „Ende der zulässigen Höchstgeschwindigkeit“ – Vorschriftzeichen (Anlage 2), Geschwindigkeitsbeschränkungen und Überholverbote. Das Zeichen kann in einer Fahrstreifentafel oder einer Einengungstafel oder Aufweitungstafel integriert sein. Dann bezieht sich das Zeichen nur auf den jeweiligen Fahrstreifen, für den die zulässige Höchstgeschwindigkeit vorher angeordnet worden war. Das Ende einer streckenbezogenen Geschwindigkeitsbeschränkung oder eines Überholverbots ist nicht gekennzeichnet, wenn das Verbot nur für eine kurze Strecke gilt und auf einem Zusatzzeichen die Länge des Verbots angegeben ist. Es ist auch nicht gekennzeichnet, wenn das Verbotszeichen zusammen mit einem Gefahrzeichen angebracht ist und sich aus der Örtlichkeit zweifelsfrei ergibt, von wo an die angezeigte Gefahr nicht mehr besteht. Sonst ist es gekennzeichnet durch die Zeichen 278 bis 282.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Ende der zulässigen Höchstgeschwindigkeit",
          "keywords": [
            "278",
            "zulässigen",
            "höchstgeschwindigkeit",
            "ende der zulässigen höchstgeschwindigkeit"
          ]
        },
        {
          "label": "Das Zeichen kann in einer Fahrstreifentafel oder einer Einengungstafel oder Aufweitungstafel integriert …",
          "keywords": [
            "höchstgeschwindigkeit",
            "fahrstreifentafel",
            "aufweitungstafel",
            "einengungstafel"
          ]
        },
        {
          "label": "Das Ende einer streckenbezogenen Geschwindigkeitsbeschränkung oder eines Überholverbots ist nicht …",
          "keywords": [
            "geschwindigkeitsbeschränkung",
            "streckenbezogenen",
            "überholverbots",
            "verbotszeichen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 56"
    },
    {
      "id": "vz-279",
      "subject": "zeichen",
      "sign": "279",
      "signLabel": "Zeichen 279",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "57",
      "name": "Ende der vorgeschriebenen Mindestgeschwindigkeit",
      "category": "Vorschriftzeichen (Anlage 2), Geschwindigkeitsbeschränkungen und Überholverbote",
      "topic": "Zeichen 279 – Ende der vorgeschriebenen Mindestgeschwindigkeit",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x429"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Das Zeichen kann in einer Fahrstreifentafel oder einer Einengungstafel integriert sein. Dann bezieht sich das Zeichen nur auf den jeweiligen Fahrstreifen, für den die vorgeschriebene Mindestgeschwindigkeit vorher angeordnet worden war."
        }
      ],
      "modelAnswer": "Das ist Zeichen 279 „Ende der vorgeschriebenen Mindestgeschwindigkeit“ – Vorschriftzeichen (Anlage 2), Geschwindigkeitsbeschränkungen und Überholverbote. Das Zeichen kann in einer Fahrstreifentafel oder einer Einengungstafel integriert sein. Dann bezieht sich das Zeichen nur auf den jeweiligen Fahrstreifen, für den die vorgeschriebene Mindestgeschwindigkeit vorher angeordnet worden war.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Ende der vorgeschriebenen Mindestgeschwindigkeit",
          "keywords": [
            "279",
            "vorgeschriebenen",
            "mindestgeschwindigkeit",
            "ende der vorgeschriebenen mindestgeschwindigkeit"
          ]
        },
        {
          "label": "Das Zeichen kann in einer Fahrstreifentafel oder einer Einengungstafel integriert sein. Dann bezieht sich …",
          "keywords": [
            "mindestgeschwindigkeit",
            "fahrstreifentafel",
            "einengungstafel",
            "vorgeschriebene"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 57"
    },
    {
      "id": "vz-280",
      "subject": "zeichen",
      "sign": "280",
      "signLabel": "Zeichen 280",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "58",
      "name": "Ende des Überholverbots für Kraftfahrzeuge aller Art",
      "category": "Vorschriftzeichen (Anlage 2), Geschwindigkeitsbeschränkungen und Überholverbote",
      "topic": "Zeichen 280 – Ende des Überholverbots für Kraftfahrzeuge aller Art",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x430"
      ],
      "official": [
        {
          "type": "allgemein",
          "text": "Das Ende einer streckenbezogenen Geschwindigkeitsbeschränkung oder eines Überholverbots ist nicht gekennzeichnet, wenn das Verbot nur für eine kurze Strecke gilt und auf einem Zusatzzeichen die Länge des Verbots angegeben ist. Es ist auch nicht gekennzeichnet, wenn das Verbotszeichen zusammen mit einem Gefahrzeichen angebracht ist und sich aus der Örtlichkeit zweifelsfrei ergibt, von wo an die angezeigte Gefahr nicht mehr besteht. Sonst ist es gekennzeichnet durch die Zeichen 278 bis 282."
        }
      ],
      "modelAnswer": "Das ist Zeichen 280 „Ende des Überholverbots für Kraftfahrzeuge aller Art“ – Vorschriftzeichen (Anlage 2), Geschwindigkeitsbeschränkungen und Überholverbote. Das Ende einer streckenbezogenen Geschwindigkeitsbeschränkung oder eines Überholverbots ist nicht gekennzeichnet, wenn das Verbot nur für eine kurze Strecke gilt und auf einem Zusatzzeichen die Länge des Verbots angegeben ist. Es ist auch nicht gekennzeichnet, wenn das Verbotszeichen zusammen mit einem Gefahrzeichen angebracht ist und sich aus der Örtlichkeit zweifelsfrei ergibt, von wo an die angezeigte Gefahr nicht mehr besteht. Sonst ist es gekennzeichnet durch die Zeichen 278 bis 282.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Ende des Überholverbots für Kraftfahrzeuge aller Art",
          "keywords": [
            "280",
            "aller",
            "kraftfahrzeuge",
            "überholverbots",
            "ende des überholverbots für kraftfahrzeuge aller art"
          ]
        },
        {
          "label": "Das Ende einer streckenbezogenen Geschwindigkeitsbeschränkung oder eines Überholverbots ist nicht …",
          "keywords": [
            "geschwindigkeitsbeschränkung",
            "streckenbezogenen",
            "überholverbots",
            "verbotszeichen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 58"
    },
    {
      "id": "vz-281",
      "subject": "zeichen",
      "sign": "281",
      "signLabel": "Zeichen 281",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "59",
      "name": "Ende des Überholverbots für Kraftfahrzeuge über 3,5 t",
      "category": "Vorschriftzeichen (Anlage 2), Geschwindigkeitsbeschränkungen und Überholverbote",
      "topic": "Zeichen 281 – Ende des Überholverbots für Kraftfahrzeuge über 3,5 t",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x440"
      ],
      "official": [
        {
          "type": "allgemein",
          "text": "Das Ende einer streckenbezogenen Geschwindigkeitsbeschränkung oder eines Überholverbots ist nicht gekennzeichnet, wenn das Verbot nur für eine kurze Strecke gilt und auf einem Zusatzzeichen die Länge des Verbots angegeben ist. Es ist auch nicht gekennzeichnet, wenn das Verbotszeichen zusammen mit einem Gefahrzeichen angebracht ist und sich aus der Örtlichkeit zweifelsfrei ergibt, von wo an die angezeigte Gefahr nicht mehr besteht. Sonst ist es gekennzeichnet durch die Zeichen 278 bis 282."
        }
      ],
      "modelAnswer": "Das ist Zeichen 281 „Ende des Überholverbots für Kraftfahrzeuge über 3,5 t“ – Vorschriftzeichen (Anlage 2), Geschwindigkeitsbeschränkungen und Überholverbote. Das Ende einer streckenbezogenen Geschwindigkeitsbeschränkung oder eines Überholverbots ist nicht gekennzeichnet, wenn das Verbot nur für eine kurze Strecke gilt und auf einem Zusatzzeichen die Länge des Verbots angegeben ist. Es ist auch nicht gekennzeichnet, wenn das Verbotszeichen zusammen mit einem Gefahrzeichen angebracht ist und sich aus der Örtlichkeit zweifelsfrei ergibt, von wo an die angezeigte Gefahr nicht mehr besteht. Sonst ist es gekennzeichnet durch die Zeichen 278 bis 282.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Ende des Überholverbots für Kraftfahrzeuge über 3,5 t",
          "keywords": [
            "281",
            "3,5 t",
            "kraftfahrzeuge",
            "überholverbots",
            "ende des überholverbots für kraftfahrzeuge über 3,5 t"
          ]
        },
        {
          "label": "Das Ende einer streckenbezogenen Geschwindigkeitsbeschränkung oder eines Überholverbots ist nicht …",
          "keywords": [
            "geschwindigkeitsbeschränkung",
            "streckenbezogenen",
            "überholverbots",
            "verbotszeichen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 59"
    },
    {
      "id": "vz-281-1",
      "subject": "zeichen",
      "sign": "281.1",
      "signLabel": "Zeichen 281.1",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "59.1",
      "name": "Ende des Verbots des Überholens von einspurigen Fahrzeugen für mehrspurige Kraftfahrzeuge und Krafträder mit Beiwagen",
      "category": "Vorschriftzeichen (Anlage 2), Geschwindigkeitsbeschränkungen und Überholverbote",
      "topic": "Zeichen 281.1 – Ende des Verbots des Überholens von einspurigen Fahrzeugen für mehrspurige Kraftfahrzeuge und Krafträder mit Beiwagen",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x441"
      ],
      "official": [
        {
          "type": "allgemein",
          "text": "Das Ende einer streckenbezogenen Geschwindigkeitsbeschränkung oder eines Überholverbots ist nicht gekennzeichnet, wenn das Verbot nur für eine kurze Strecke gilt und auf einem Zusatzzeichen die Länge des Verbots angegeben ist. Es ist auch nicht gekennzeichnet, wenn das Verbotszeichen zusammen mit einem Gefahrzeichen angebracht ist und sich aus der Örtlichkeit zweifelsfrei ergibt, von wo an die angezeigte Gefahr nicht mehr besteht. Sonst ist es gekennzeichnet durch die Zeichen 278 bis 282."
        }
      ],
      "modelAnswer": "Das ist Zeichen 281.1 „Ende des Verbots des Überholens von einspurigen Fahrzeugen für mehrspurige Kraftfahrzeuge und Krafträder mit Beiwagen“ – Vorschriftzeichen (Anlage 2), Geschwindigkeitsbeschränkungen und Überholverbote. Das Ende einer streckenbezogenen Geschwindigkeitsbeschränkung oder eines Überholverbots ist nicht gekennzeichnet, wenn das Verbot nur für eine kurze Strecke gilt und auf einem Zusatzzeichen die Länge des Verbots angegeben ist. Es ist auch nicht gekennzeichnet, wenn das Verbotszeichen zusammen mit einem Gefahrzeichen angebracht ist und sich aus der Örtlichkeit zweifelsfrei ergibt, von wo an die angezeigte Gefahr nicht mehr besteht. Sonst ist es gekennzeichnet durch die Zeichen 278 bis 282.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Ende des Verbots des Überholens von einspurigen Fahrzeugen für mehrspurige Kraftfahrzeuge und Krafträder mit Beiwagen",
          "keywords": [
            "281.1",
            "mehrspurige",
            "einspurigen",
            "kraftfahrzeuge",
            "ende des verbots des überholens von einspurigen fahrzeugen für mehrspurige kraftfahrzeuge und krafträder mit beiwagen"
          ]
        },
        {
          "label": "Das Ende einer streckenbezogenen Geschwindigkeitsbeschränkung oder eines Überholverbots ist nicht …",
          "keywords": [
            "geschwindigkeitsbeschränkung",
            "streckenbezogenen",
            "überholverbots",
            "verbotszeichen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 59.1"
    },
    {
      "id": "vz-282",
      "subject": "zeichen",
      "sign": "282",
      "signLabel": "Zeichen 282",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "60",
      "name": "Ende sämtlicher streckenbezogener Geschwindigkeitsbeschränkungen und Überholverbote",
      "category": "Vorschriftzeichen (Anlage 2), Geschwindigkeitsbeschränkungen und Überholverbote",
      "topic": "Zeichen 282 – Ende sämtlicher streckenbezogener Geschwindigkeitsbeschränkungen und Überholverbote",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x447"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Das Zeichen kann in einer Fahrstreifentafel oder einer Aufweitungstafel integriert sein. Dann bezieht sich das Zeichen nur auf den jeweiligen Fahrstreifen, für den die streckenbezogenen Geschwindigkeitsbeschränkungen und Überholverbote vorher angeordnet worden waren."
        },
        {
          "type": "allgemein",
          "text": "Das Ende einer streckenbezogenen Geschwindigkeitsbeschränkung oder eines Überholverbots ist nicht gekennzeichnet, wenn das Verbot nur für eine kurze Strecke gilt und auf einem Zusatzzeichen die Länge des Verbots angegeben ist. Es ist auch nicht gekennzeichnet, wenn das Verbotszeichen zusammen mit einem Gefahrzeichen angebracht ist und sich aus der Örtlichkeit zweifelsfrei ergibt, von wo an die angezeigte Gefahr nicht mehr besteht. Sonst ist es gekennzeichnet durch die Zeichen 278 bis 282."
        }
      ],
      "modelAnswer": "Das ist Zeichen 282 „Ende sämtlicher streckenbezogener Geschwindigkeitsbeschränkungen und Überholverbote“ – Vorschriftzeichen (Anlage 2), Geschwindigkeitsbeschränkungen und Überholverbote. Das Zeichen kann in einer Fahrstreifentafel oder einer Aufweitungstafel integriert sein. Dann bezieht sich das Zeichen nur auf den jeweiligen Fahrstreifen, für den die streckenbezogenen Geschwindigkeitsbeschränkungen und Überholverbote vorher angeordnet worden waren. Das Ende einer streckenbezogenen Geschwindigkeitsbeschränkung oder eines Überholverbots ist nicht gekennzeichnet, wenn das Verbot nur für eine kurze Strecke gilt und auf einem Zusatzzeichen die Länge des Verbots angegeben ist. Es ist auch nicht gekennzeichnet, wenn das Verbotszeichen zusammen mit einem Gefahrzeichen angebracht ist und sich aus der Örtlichkeit zweifelsfrei ergibt, von wo an die angezeigte Gefahr nicht mehr besteht. Sonst ist es gekennzeichnet durch die Zeichen 278 bis 282.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Ende sämtlicher streckenbezogener Geschwindigkeitsbeschränkungen und Überholverbote",
          "keywords": [
            "282",
            "überholverbote",
            "streckenbezogener",
            "geschwindigkeitsbeschränkungen",
            "ende sämtlicher streckenbezogener geschwindigkeitsbeschränkungen und überholverbote"
          ]
        },
        {
          "label": "Das Zeichen kann in einer Fahrstreifentafel oder einer Aufweitungstafel integriert sein. Dann bezieht sich …",
          "keywords": [
            "geschwindigkeitsbeschränkungen",
            "fahrstreifentafel",
            "streckenbezogenen",
            "aufweitungstafel"
          ]
        },
        {
          "label": "Das Ende einer streckenbezogenen Geschwindigkeitsbeschränkung oder eines Überholverbots ist nicht …",
          "keywords": [
            "geschwindigkeitsbeschränkung",
            "streckenbezogenen",
            "überholverbots",
            "verbotszeichen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 60"
    },
    {
      "id": "vz-283",
      "subject": "zeichen",
      "sign": "283",
      "signLabel": "Zeichen 283",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "62",
      "name": "Absolutes Haltverbot",
      "category": "Vorschriftzeichen (Anlage 2), Halt- und Parkverbote",
      "topic": "Zeichen 283 – Absolutes Haltverbot",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x453"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Das Halten auf der Fahrbahn ist verboten."
        },
        {
          "type": "allgemein",
          "text": "1. Die durch die nachfolgenden Zeichen 283 und 286 angeordneten Haltverbote gelten nur auf der Straßenseite, auf der die Zeichen angebracht sind. Sie gelten bis zur nächsten Kreuzung oder Einmündung auf der gleichen Straßenseite oder bis durch Verkehrszeichen für den ruhenden Verkehr eine andere Regelung vorgegeben wird. 2. Mobile, vorübergehend angeordnete Haltverbote durch Zeichen 283 und 286 heben Verkehrszeichen auf, die das Parken erlauben."
        },
        {
          "type": "allgemein",
          "text": "Der Anfang der Verbotsstrecke kann durch einen zur Fahrbahn weisenden waagerechten weißen Pfeil im Zeichen, das Ende durch einen solchen von der Fahrbahn wegweisenden Pfeil gekennzeichnet sein. Bei in der Verbotsstrecke wiederholten Zeichen weist eine Pfeilspitze zur Fahrbahn, die zweite Pfeilspitze von ihr weg."
        }
      ],
      "modelAnswer": "Das ist Zeichen 283 „Absolutes Haltverbot“ – Vorschriftzeichen (Anlage 2), Halt- und Parkverbote. Das Halten auf der Fahrbahn ist verboten. 1. Die durch die nachfolgenden Zeichen 283 und 286 angeordneten Haltverbote gelten nur auf der Straßenseite, auf der die Zeichen angebracht sind. Sie gelten bis zur nächsten Kreuzung oder Einmündung auf der gleichen Straßenseite oder bis durch Verkehrszeichen für den ruhenden Verkehr eine andere Regelung vorgegeben wird. 2. Mobile, vorübergehend angeordnete Haltverbote durch Zeichen 283 und 286 heben Verkehrszeichen auf, die das Parken erlauben. Der Anfang der Verbotsstrecke kann durch einen zur Fahrbahn weisenden waagerechten weißen Pfeil im Zeichen, das Ende durch einen solchen von der Fahrbahn wegweisenden Pfeil gekennzeichnet sein. Bei in der Verbotsstrecke wiederholten Zeichen weist eine Pfeilspitze zur Fahrbahn, die zweite Pfeilspitze von ihr weg.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Absolutes Haltverbot",
          "keywords": [
            "283",
            "absolutes",
            "haltverbot",
            "absolutes haltverbot"
          ]
        },
        {
          "label": "1. Die durch die nachfolgenden Zeichen 283 und 286 angeordneten Haltverbote gelten nur auf der Straßenseite, …",
          "keywords": [
            "verkehrszeichen",
            "angeordneten",
            "straßenseite",
            "haltverbote"
          ]
        },
        {
          "label": "2. Mobile, vorübergehend angeordnete Haltverbote durch Zeichen 283 und 286 heben Verkehrszeichen auf, die …",
          "keywords": [
            "verkehrszeichen",
            "vorübergehend",
            "angeordnete",
            "haltverbote"
          ]
        },
        {
          "label": "Der Anfang der Verbotsstrecke kann durch einen zur Fahrbahn weisenden waagerechten weißen Pfeil im Zeichen, …",
          "keywords": [
            "verbotsstrecke",
            "waagerechten",
            "wegweisenden",
            "wiederholten"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 62"
    },
    {
      "id": "vz-z2-62-1",
      "subject": "zeichen",
      "sign": null,
      "signLabel": "Zusatzzeichen",
      "kind": "Zusatzzeichen",
      "anlage": 2,
      "lfd": "62.1",
      "name": "Haltverbot auch auf dem Seitenstreifen (zu Zeichen 283)",
      "category": "Zusatzzeichen (Anlage 2), Halt- und Parkverbote",
      "topic": "Zusatzzeichen – Haltverbot auch auf dem Seitenstreifen (zu Zeichen 283)",
      "question": "Was bedeutet dieses Zusatzzeichen? Erklären Sie, zu welchem Zeichen es gehört und was es regelt.",
      "difficulty": 2,
      "images": [
        "x459"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Das mit dem Zeichen 283 angeordnete Zusatzzeichen verbietet das Halten von Fahrzeugen auch auf dem Seitenstreifen."
        }
      ],
      "modelAnswer": "Das ist Zusatzzeichen „Haltverbot auch auf dem Seitenstreifen (zu Zeichen 283)“ – Zusatzzeichen (Anlage 2), Halt- und Parkverbote. Das mit dem Zeichen 283 angeordnete Zusatzzeichen verbietet das Halten von Fahrzeugen auch auf dem Seitenstreifen.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Haltverbot auch auf dem Seitenstreifen (zu Zeichen 283)",
          "keywords": [
            "haltverbot",
            "seitenstreifen",
            "haltverbot auch auf dem seitenstreifen (zu zeichen 283)"
          ]
        },
        {
          "label": "Zusatzzeichen zum Hauptzeichen",
          "keywords": [
            "zusatzzeichen",
            "283"
          ]
        },
        {
          "label": "Das mit dem Zeichen 283 angeordnete Zusatzzeichen verbietet das Halten von Fahrzeugen auch auf dem …",
          "keywords": [
            "seitenstreifen",
            "angeordnete",
            "verbietet"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Mit welchem Hauptzeichen wird dieses Zusatzzeichen verwendet?",
        "Wo steht das Zusatzzeichen?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 62.1"
    },
    {
      "id": "vz-z2-62-2",
      "subject": "zeichen",
      "sign": null,
      "signLabel": "Zusatzzeichen",
      "kind": "Zusatzzeichen",
      "anlage": 2,
      "lfd": "62.2",
      "name": "„auf dem Seitenstreifen“ (zu Zeichen 283)",
      "category": "Zusatzzeichen (Anlage 2), Halt- und Parkverbote",
      "topic": "Zusatzzeichen – „auf dem Seitenstreifen“ (zu Zeichen 283)",
      "question": "Was bedeutet dieses Zusatzzeichen? Erklären Sie, zu welchem Zeichen es gehört und was es regelt.",
      "difficulty": 2,
      "images": [
        "x460"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Das mit dem Zeichen 283 angeordnete Zusatzzeichen verbietet das Halten von Fahrzeugen nur auf dem Seitenstreifen."
        }
      ],
      "modelAnswer": "Das ist Zusatzzeichen „„auf dem Seitenstreifen“ (zu Zeichen 283)“ – Zusatzzeichen (Anlage 2), Halt- und Parkverbote. Das mit dem Zeichen 283 angeordnete Zusatzzeichen verbietet das Halten von Fahrzeugen nur auf dem Seitenstreifen.",
      "keyPoints": [
        {
          "label": "Bezeichnung: „auf dem Seitenstreifen“ (zu Zeichen 283)",
          "keywords": [
            "seitenstreifen",
            "„auf dem seitenstreifen“ (zu zeichen 283)"
          ]
        },
        {
          "label": "Zusatzzeichen zum Hauptzeichen",
          "keywords": [
            "zusatzzeichen",
            "283"
          ]
        },
        {
          "label": "Das mit dem Zeichen 283 angeordnete Zusatzzeichen verbietet das Halten von Fahrzeugen nur auf dem …",
          "keywords": [
            "seitenstreifen",
            "angeordnete",
            "verbietet"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Mit welchem Hauptzeichen wird dieses Zusatzzeichen verwendet?",
        "Wo steht das Zusatzzeichen?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 62.2"
    },
    {
      "id": "vz-286",
      "subject": "zeichen",
      "sign": "286",
      "signLabel": "Zeichen 286",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "63",
      "name": "Eingeschränktes Haltverbot",
      "category": "Vorschriftzeichen (Anlage 2), Halt- und Parkverbote",
      "topic": "Zeichen 286 – Eingeschränktes Haltverbot",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x461"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "1. Wer ein Fahrzeug führt, darf nicht länger als drei Minuten auf der Fahrbahn halten, ausgenommen zum Ein- oder Aussteigen oder zum Be- oder Entladen. 2. Ladegeschäfte müssen ohne Verzögerung durchgeführt werden."
        },
        {
          "type": "allgemein",
          "text": "1. Die durch die nachfolgenden Zeichen 283 und 286 angeordneten Haltverbote gelten nur auf der Straßenseite, auf der die Zeichen angebracht sind. Sie gelten bis zur nächsten Kreuzung oder Einmündung auf der gleichen Straßenseite oder bis durch Verkehrszeichen für den ruhenden Verkehr eine andere Regelung vorgegeben wird. 2. Mobile, vorübergehend angeordnete Haltverbote durch Zeichen 283 und 286 heben Verkehrszeichen auf, die das Parken erlauben."
        },
        {
          "type": "allgemein",
          "text": "Der Anfang der Verbotsstrecke kann durch einen zur Fahrbahn weisenden waagerechten weißen Pfeil im Zeichen, das Ende durch einen solchen von der Fahrbahn wegweisenden Pfeil gekennzeichnet sein. Bei in der Verbotsstrecke wiederholten Zeichen weist eine Pfeilspitze zur Fahrbahn, die zweite Pfeilspitze von ihr weg."
        }
      ],
      "modelAnswer": "Das ist Zeichen 286 „Eingeschränktes Haltverbot“ – Vorschriftzeichen (Anlage 2), Halt- und Parkverbote. 1. Wer ein Fahrzeug führt, darf nicht länger als drei Minuten auf der Fahrbahn halten, ausgenommen zum Ein- oder Aussteigen oder zum Be- oder Entladen. 2. Ladegeschäfte müssen ohne Verzögerung durchgeführt werden. 1. Die durch die nachfolgenden Zeichen 283 und 286 angeordneten Haltverbote gelten nur auf der Straßenseite, auf der die Zeichen angebracht sind. Sie gelten bis zur nächsten Kreuzung oder Einmündung auf der gleichen Straßenseite oder bis durch Verkehrszeichen für den ruhenden Verkehr eine andere Regelung vorgegeben wird. 2. Mobile, vorübergehend angeordnete Haltverbote durch Zeichen 283 und 286 heben Verkehrszeichen auf, die das Parken erlauben. Der Anfang der Verbotsstrecke kann durch einen zur Fahrbahn weisenden waagerechten weißen Pfeil im Zeichen, das Ende durch einen solchen von der Fahrbahn wegweisenden Pfeil gekennzeichnet sein. Bei in der Verbotsstrecke wiederholten Zeichen weist eine Pfeilspitze zur Fahrbahn, die zweite Pfeilspitze von ihr weg.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Eingeschränktes Haltverbot",
          "keywords": [
            "286",
            "haltverbot",
            "eingeschränktes",
            "eingeschränktes haltverbot"
          ]
        },
        {
          "label": "1. Wer ein Fahrzeug führt, darf nicht länger als drei Minuten auf der Fahrbahn halten, ausgenommen zum Ein- …",
          "keywords": [
            "aussteigen",
            "entladen",
            "minuten",
            "länger"
          ]
        },
        {
          "label": "2. Ladegeschäfte müssen ohne Verzögerung durchgeführt werden.",
          "keywords": [
            "ladegeschäfte",
            "durchgeführt",
            "verzögerung",
            "müssen"
          ]
        },
        {
          "label": "1. Die durch die nachfolgenden Zeichen 283 und 286 angeordneten Haltverbote gelten nur auf der Straßenseite, …",
          "keywords": [
            "verkehrszeichen",
            "angeordneten",
            "straßenseite",
            "haltverbote"
          ]
        },
        {
          "label": "2. Mobile, vorübergehend angeordnete Haltverbote durch Zeichen 283 und 286 heben Verkehrszeichen auf, die …",
          "keywords": [
            "verkehrszeichen",
            "vorübergehend",
            "angeordnete",
            "haltverbote"
          ]
        },
        {
          "label": "Der Anfang der Verbotsstrecke kann durch einen zur Fahrbahn weisenden waagerechten weißen Pfeil im Zeichen, …",
          "keywords": [
            "verbotsstrecke",
            "waagerechten",
            "wegweisenden",
            "wiederholten"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 63"
    },
    {
      "id": "vz-z2-63-1",
      "subject": "zeichen",
      "sign": null,
      "signLabel": "Zusatzzeichen",
      "kind": "Zusatzzeichen",
      "anlage": 2,
      "lfd": "63.1",
      "name": "Haltverbot auch auf dem Seitenstreifen (zu Zeichen 286)",
      "category": "Zusatzzeichen (Anlage 2), Halt- und Parkverbote",
      "topic": "Zusatzzeichen – Haltverbot auch auf dem Seitenstreifen (zu Zeichen 286)",
      "question": "Was bedeutet dieses Zusatzzeichen? Erklären Sie, zu welchem Zeichen es gehört und was es regelt.",
      "difficulty": 2,
      "images": [
        "x462"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Mit dem Zusatzzeichen zu Zeichen 286 darf auch auf dem Seitenstreifen nicht länger als drei Minuten gehalten werden, ausgenommen zum Ein- oder Aussteigen oder zum Be- oder Entladen."
        }
      ],
      "modelAnswer": "Das ist Zusatzzeichen „Haltverbot auch auf dem Seitenstreifen (zu Zeichen 286)“ – Zusatzzeichen (Anlage 2), Halt- und Parkverbote. Mit dem Zusatzzeichen zu Zeichen 286 darf auch auf dem Seitenstreifen nicht länger als drei Minuten gehalten werden, ausgenommen zum Ein- oder Aussteigen oder zum Be- oder Entladen.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Haltverbot auch auf dem Seitenstreifen (zu Zeichen 286)",
          "keywords": [
            "haltverbot",
            "seitenstreifen",
            "haltverbot auch auf dem seitenstreifen (zu zeichen 286)"
          ]
        },
        {
          "label": "Zusatzzeichen zum Hauptzeichen",
          "keywords": [
            "zusatzzeichen",
            "286"
          ]
        },
        {
          "label": "Mit dem Zusatzzeichen zu Zeichen 286 darf auch auf dem Seitenstreifen nicht länger als drei Minuten gehalten …",
          "keywords": [
            "seitenstreifen",
            "aussteigen",
            "gehalten",
            "entladen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Mit welchem Hauptzeichen wird dieses Zusatzzeichen verwendet?",
        "Wo steht das Zusatzzeichen?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 63.1"
    },
    {
      "id": "vz-z2-63-2",
      "subject": "zeichen",
      "sign": null,
      "signLabel": "Zusatzzeichen",
      "kind": "Zusatzzeichen",
      "anlage": 2,
      "lfd": "63.2",
      "name": "„auf dem Seitenstreifen“ (zu Zeichen 286)",
      "category": "Zusatzzeichen (Anlage 2), Halt- und Parkverbote",
      "topic": "Zusatzzeichen – „auf dem Seitenstreifen“ (zu Zeichen 286)",
      "question": "Was bedeutet dieses Zusatzzeichen? Erklären Sie, zu welchem Zeichen es gehört und was es regelt.",
      "difficulty": 2,
      "images": [
        "x463"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Mit dem Zusatzzeichen zu Zeichen 286 darf nur auf dem Seitenstreifen nicht länger als drei Minuten gehalten werden, ausgenommen zum Ein- oder Aussteigen oder zum Be- oder Entladen."
        }
      ],
      "modelAnswer": "Das ist Zusatzzeichen „„auf dem Seitenstreifen“ (zu Zeichen 286)“ – Zusatzzeichen (Anlage 2), Halt- und Parkverbote. Mit dem Zusatzzeichen zu Zeichen 286 darf nur auf dem Seitenstreifen nicht länger als drei Minuten gehalten werden, ausgenommen zum Ein- oder Aussteigen oder zum Be- oder Entladen.",
      "keyPoints": [
        {
          "label": "Bezeichnung: „auf dem Seitenstreifen“ (zu Zeichen 286)",
          "keywords": [
            "seitenstreifen",
            "„auf dem seitenstreifen“ (zu zeichen 286)"
          ]
        },
        {
          "label": "Zusatzzeichen zum Hauptzeichen",
          "keywords": [
            "zusatzzeichen",
            "286"
          ]
        },
        {
          "label": "Mit dem Zusatzzeichen zu Zeichen 286 darf nur auf dem Seitenstreifen nicht länger als drei Minuten gehalten …",
          "keywords": [
            "seitenstreifen",
            "aussteigen",
            "gehalten",
            "entladen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Mit welchem Hauptzeichen wird dieses Zusatzzeichen verwendet?",
        "Wo steht das Zusatzzeichen?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 63.2"
    },
    {
      "id": "vz-z2-63-3",
      "subject": "zeichen",
      "sign": null,
      "signLabel": "Zusatzzeichen",
      "kind": "Zusatzzeichen",
      "anlage": 2,
      "lfd": "63.3",
      "name": "Schwerbehinderte mit Parkausweis frei (zu Zeichen 286)",
      "category": "Zusatzzeichen (Anlage 2), Halt- und Parkverbote",
      "topic": "Zusatzzeichen – Schwerbehinderte mit Parkausweis frei (zu Zeichen 286)",
      "question": "Was bedeutet dieses Zusatzzeichen? Erklären Sie, zu welchem Zeichen es gehört und was es regelt.",
      "difficulty": 2,
      "images": [
        "x477"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "1. Das Zusatzzeichen zu Zeichen 286 nimmt schwerbehinderte Menschen mit außergewöhnlicher Gehbehinderung, beidseitiger Amelie oder Phokomelie oder mit vergleichbaren Funktionseinschränkungen sowie blinde Menschen, jeweils mit besonderem Parkausweis Nummer ..., vom Haltverbot aus. 2. Die Ausnahme gilt nur, soweit der Parkausweis gut lesbar ausgelegt oder angebracht ist."
        }
      ],
      "modelAnswer": "Das ist Zusatzzeichen „Schwerbehinderte mit Parkausweis frei (zu Zeichen 286)“ – Zusatzzeichen (Anlage 2), Halt- und Parkverbote. 1. Das Zusatzzeichen zu Zeichen 286 nimmt schwerbehinderte Menschen mit außergewöhnlicher Gehbehinderung, beidseitiger Amelie oder Phokomelie oder mit vergleichbaren Funktionseinschränkungen sowie blinde Menschen, jeweils mit besonderem Parkausweis Nummer ..., vom Haltverbot aus. 2. Die Ausnahme gilt nur, soweit der Parkausweis gut lesbar ausgelegt oder angebracht ist.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Schwerbehinderte mit Parkausweis frei (zu Zeichen 286)",
          "keywords": [
            "frei",
            "parkausweis",
            "schwerbehinderte",
            "schwerbehinderte mit parkausweis frei (zu zeichen 286)"
          ]
        },
        {
          "label": "Zusatzzeichen zum Hauptzeichen",
          "keywords": [
            "zusatzzeichen",
            "286"
          ]
        },
        {
          "label": "1. Das Zusatzzeichen zu Zeichen 286 nimmt schwerbehinderte Menschen mit außergewöhnlicher Gehbehinderung, …",
          "keywords": [
            "funktionseinschränkungen",
            "außergewöhnlicher",
            "schwerbehinderte",
            "gehbehinderung"
          ]
        },
        {
          "label": "2. Die Ausnahme gilt nur, soweit der Parkausweis gut lesbar ausgelegt oder angebracht ist.",
          "keywords": [
            "parkausweis",
            "ausgelegt",
            "ausnahme",
            "soweit"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Mit welchem Hauptzeichen wird dieses Zusatzzeichen verwendet?",
        "Wo steht das Zusatzzeichen?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 63.3"
    },
    {
      "id": "vz-z2-63-4",
      "subject": "zeichen",
      "sign": null,
      "signLabel": "Zusatzzeichen",
      "kind": "Zusatzzeichen",
      "anlage": 2,
      "lfd": "63.4",
      "name": "„Bewohner mit Parkausweis frei“ (zu Zeichen 286)",
      "category": "Zusatzzeichen (Anlage 2), Halt- und Parkverbote",
      "topic": "Zusatzzeichen – „Bewohner mit Parkausweis frei“ (zu Zeichen 286)",
      "question": "Was bedeutet dieses Zusatzzeichen? Erklären Sie, zu welchem Zeichen es gehört und was es regelt.",
      "difficulty": 2,
      "images": [
        "x478"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "1. Das Zusatzzeichen zu Zeichen 286 nimmt Bewohner mit besonderem Parkausweis vom Haltverbot aus. 2. Die Ausnahme gilt nur, soweit der Parkausweis gut lesbar ausgelegt oder angebracht ist."
        }
      ],
      "modelAnswer": "Das ist Zusatzzeichen „„Bewohner mit Parkausweis frei“ (zu Zeichen 286)“ – Zusatzzeichen (Anlage 2), Halt- und Parkverbote. 1. Das Zusatzzeichen zu Zeichen 286 nimmt Bewohner mit besonderem Parkausweis vom Haltverbot aus. 2. Die Ausnahme gilt nur, soweit der Parkausweis gut lesbar ausgelegt oder angebracht ist.",
      "keyPoints": [
        {
          "label": "Bezeichnung: „Bewohner mit Parkausweis frei“ (zu Zeichen 286)",
          "keywords": [
            "frei",
            "bewohner",
            "parkausweis",
            "„bewohner mit parkausweis frei“ (zu zeichen 286)"
          ]
        },
        {
          "label": "Zusatzzeichen zum Hauptzeichen",
          "keywords": [
            "zusatzzeichen",
            "286"
          ]
        },
        {
          "label": "1. Das Zusatzzeichen zu Zeichen 286 nimmt Bewohner mit besonderem Parkausweis vom Haltverbot aus.",
          "keywords": [
            "parkausweis",
            "besonderem",
            "haltverbot",
            "bewohner"
          ]
        },
        {
          "label": "2. Die Ausnahme gilt nur, soweit der Parkausweis gut lesbar ausgelegt oder angebracht ist.",
          "keywords": [
            "parkausweis",
            "ausgelegt",
            "ausnahme",
            "soweit"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Mit welchem Hauptzeichen wird dieses Zusatzzeichen verwendet?",
        "Wo steht das Zusatzzeichen?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 63.4"
    },
    {
      "id": "vz-z2-63-5",
      "subject": "zeichen",
      "sign": null,
      "signLabel": "Zusatzzeichen",
      "kind": "Zusatzzeichen",
      "anlage": 2,
      "lfd": "63.5",
      "name": "Elektrisch betriebene Fahrzeuge frei (zu Zeichen 286)",
      "category": "Zusatzzeichen (Anlage 2), Halt- und Parkverbote",
      "topic": "Zusatzzeichen – Elektrisch betriebene Fahrzeuge frei (zu Zeichen 286)",
      "question": "Was bedeutet dieses Zusatzzeichen? Erklären Sie, zu welchem Zeichen es gehört und was es regelt.",
      "difficulty": 2,
      "images": [
        "x479"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Durch das Zusatzzeichen zu Zeichen 286 wird das Parken für elektrisch betriebene Fahrzeuge innerhalb der gekennzeichneten Flächen erlaubt."
        }
      ],
      "modelAnswer": "Das ist Zusatzzeichen „Elektrisch betriebene Fahrzeuge frei (zu Zeichen 286)“ – Zusatzzeichen (Anlage 2), Halt- und Parkverbote. Durch das Zusatzzeichen zu Zeichen 286 wird das Parken für elektrisch betriebene Fahrzeuge innerhalb der gekennzeichneten Flächen erlaubt.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Elektrisch betriebene Fahrzeuge frei (zu Zeichen 286)",
          "keywords": [
            "frei",
            "betriebene",
            "elektrisch",
            "elektrisch betriebene fahrzeuge frei (zu zeichen 286)"
          ]
        },
        {
          "label": "Zusatzzeichen zum Hauptzeichen",
          "keywords": [
            "zusatzzeichen",
            "286"
          ]
        },
        {
          "label": "Durch das Zusatzzeichen zu Zeichen 286 wird das Parken für elektrisch betriebene Fahrzeuge innerhalb der …",
          "keywords": [
            "elektrisch",
            "betriebene",
            "flächen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Mit welchem Hauptzeichen wird dieses Zusatzzeichen verwendet?",
        "Wo steht das Zusatzzeichen?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 63.5"
    },
    {
      "id": "vz-z2-63-6",
      "subject": "zeichen",
      "sign": null,
      "signLabel": "Zusatzzeichen",
      "kind": "Zusatzzeichen",
      "anlage": 2,
      "lfd": "63.6",
      "name": "Carsharingfahrzeuge frei (zu Zeichen 286)",
      "category": "Zusatzzeichen (Anlage 2), Halt- und Parkverbote",
      "topic": "Zusatzzeichen – Carsharingfahrzeuge frei (zu Zeichen 286)",
      "question": "Was bedeutet dieses Zusatzzeichen? Erklären Sie, zu welchem Zeichen es gehört und was es regelt.",
      "difficulty": 2,
      "images": [
        "x480"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Durch das Zusatzzeichen zu Zeichen 286 wird das Parken für Carsharingfahrzeuge (§ 39 Absatz 11) innerhalb der gekennzeichneten Flächen erlaubt."
        }
      ],
      "modelAnswer": "Das ist Zusatzzeichen „Carsharingfahrzeuge frei (zu Zeichen 286)“ – Zusatzzeichen (Anlage 2), Halt- und Parkverbote. Durch das Zusatzzeichen zu Zeichen 286 wird das Parken für Carsharingfahrzeuge (§ 39 Absatz 11) innerhalb der gekennzeichneten Flächen erlaubt.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Carsharingfahrzeuge frei (zu Zeichen 286)",
          "keywords": [
            "frei",
            "carsharingfahrzeuge",
            "carsharingfahrzeuge frei (zu zeichen 286)"
          ]
        },
        {
          "label": "Zusatzzeichen zum Hauptzeichen",
          "keywords": [
            "zusatzzeichen",
            "286"
          ]
        },
        {
          "label": "Durch das Zusatzzeichen zu Zeichen 286 wird das Parken für Carsharingfahrzeuge (§ 39 Absatz 11) innerhalb …",
          "keywords": [
            "carsharingfahrzeuge",
            "flächen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Mit welchem Hauptzeichen wird dieses Zusatzzeichen verwendet?",
        "Wo steht das Zusatzzeichen?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 63.6"
    },
    {
      "id": "vz-290-1",
      "subject": "zeichen",
      "sign": "290.1",
      "signLabel": "Zeichen 290.1",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "64",
      "name": "Beginn eines Eingeschränkten Haltverbots für eine Zone",
      "category": "Vorschriftzeichen (Anlage 2), Halt- und Parkverbote",
      "topic": "Zeichen 290.1 – Beginn eines Eingeschränkten Haltverbots für eine Zone",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x491"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "1. Wer ein Fahrzeug führt, darf innerhalb der gekennzeichneten Zone nicht länger als drei Minuten halten, ausgenommen zum Ein- oder Aussteigen oder zum Be- oder Entladen. 2. Innerhalb der gekennzeichneten Zone gilt das eingeschränkte Haltverbot auf allen öffentlichen Verkehrsflächen, sofern nicht abweichende Regelungen durch Verkehrszeichen oder Verkehrseinrichtungen getroffen sind. 3. Durch Zusatzzeichen kann das Parken für Bewohner mit Parkausweis oder mit Parkschein oder Parkscheibe (Bild 318) innerhalb gekennzeichneter Flächen erlaubt sein. 4. Durch Zusatzzeichen kann das Parken mit Parkschein oder Parkscheibe (Bild 318) innerhalb gekennzeichneter Flächen erlaubt sein. Dabei ist der Parkausweis, der Parkschein oder die Parkscheibe gut lesbar auszulegen oder anzubringen."
        }
      ],
      "modelAnswer": "Das ist Zeichen 290.1 „Beginn eines Eingeschränkten Haltverbots für eine Zone“ – Vorschriftzeichen (Anlage 2), Halt- und Parkverbote. 1. Wer ein Fahrzeug führt, darf innerhalb der gekennzeichneten Zone nicht länger als drei Minuten halten, ausgenommen zum Ein- oder Aussteigen oder zum Be- oder Entladen. 2. Innerhalb der gekennzeichneten Zone gilt das eingeschränkte Haltverbot auf allen öffentlichen Verkehrsflächen, sofern nicht abweichende Regelungen durch Verkehrszeichen oder Verkehrseinrichtungen getroffen sind. 3. Durch Zusatzzeichen kann das Parken für Bewohner mit Parkausweis oder mit Parkschein oder Parkscheibe (Bild 318) innerhalb gekennzeichneter Flächen erlaubt sein. 4. Durch Zusatzzeichen kann das Parken mit Parkschein oder Parkscheibe (Bild 318) innerhalb gekennzeichneter Flächen erlaubt sein. Dabei ist der Parkausweis, der Parkschein oder die Parkscheibe gut lesbar auszulegen oder anzubringen.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Beginn eines Eingeschränkten Haltverbots für eine Zone",
          "keywords": [
            "zone",
            "290.1",
            "haltverbots",
            "eingeschränkten",
            "beginn eines eingeschränkten haltverbots für eine zone"
          ]
        },
        {
          "label": "1. Wer ein Fahrzeug führt, darf innerhalb der gekennzeichneten Zone nicht länger als drei Minuten halten, …",
          "keywords": [
            "aussteigen",
            "entladen",
            "minuten",
            "länger"
          ]
        },
        {
          "label": "2. Innerhalb der gekennzeichneten Zone gilt das eingeschränkte Haltverbot auf allen öffentlichen …",
          "keywords": [
            "verkehrseinrichtungen",
            "verkehrsflächen",
            "verkehrszeichen",
            "eingeschränkte"
          ]
        },
        {
          "label": "3. Durch Zusatzzeichen kann das Parken für Bewohner mit Parkausweis oder mit Parkschein oder Parkscheibe …",
          "keywords": [
            "gekennzeichneter",
            "parkausweis",
            "parkscheibe",
            "parkschein"
          ]
        },
        {
          "label": "4. Durch Zusatzzeichen kann das Parken mit Parkschein oder Parkscheibe (Bild 318) innerhalb gekennzeichneter …",
          "keywords": [
            "gekennzeichneter",
            "parkscheibe",
            "parkausweis",
            "anzubringen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 64"
    },
    {
      "id": "vz-z2-64-1",
      "subject": "zeichen",
      "sign": null,
      "signLabel": "Zusatzzeichen",
      "kind": "Zusatzzeichen",
      "anlage": 2,
      "lfd": "64.1",
      "name": "Elektrisch betriebene Fahrzeuge frei (zu Zeichen 290.1)",
      "category": "Zusatzzeichen (Anlage 2), Halt- und Parkverbote",
      "topic": "Zusatzzeichen – Elektrisch betriebene Fahrzeuge frei (zu Zeichen 290.1)",
      "question": "Was bedeutet dieses Zusatzzeichen? Erklären Sie, zu welchem Zeichen es gehört und was es regelt.",
      "difficulty": 2,
      "images": [
        "x479"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Durch das Zusatzzeichen zu Zeichen 290.1 wird das Parken für elektrisch betriebene Fahrzeuge innerhalb der gekennzeichneten Flächen erlaubt."
        }
      ],
      "modelAnswer": "Das ist Zusatzzeichen „Elektrisch betriebene Fahrzeuge frei (zu Zeichen 290.1)“ – Zusatzzeichen (Anlage 2), Halt- und Parkverbote. Durch das Zusatzzeichen zu Zeichen 290.1 wird das Parken für elektrisch betriebene Fahrzeuge innerhalb der gekennzeichneten Flächen erlaubt.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Elektrisch betriebene Fahrzeuge frei (zu Zeichen 290.1)",
          "keywords": [
            "frei",
            "betriebene",
            "elektrisch",
            "elektrisch betriebene fahrzeuge frei (zu zeichen 290.1)"
          ]
        },
        {
          "label": "Zusatzzeichen zum Hauptzeichen",
          "keywords": [
            "zusatzzeichen",
            "290.1"
          ]
        },
        {
          "label": "Durch das Zusatzzeichen zu Zeichen 290.1 wird das Parken für elektrisch betriebene Fahrzeuge innerhalb der …",
          "keywords": [
            "elektrisch",
            "betriebene",
            "flächen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Mit welchem Hauptzeichen wird dieses Zusatzzeichen verwendet?",
        "Wo steht das Zusatzzeichen?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 64.1"
    },
    {
      "id": "vz-z2-64-2",
      "subject": "zeichen",
      "sign": null,
      "signLabel": "Zusatzzeichen",
      "kind": "Zusatzzeichen",
      "anlage": 2,
      "lfd": "64.2",
      "name": "Carsharingfahrzeuge frei (zu Zeichen 290.1)",
      "category": "Zusatzzeichen (Anlage 2), Halt- und Parkverbote",
      "topic": "Zusatzzeichen – Carsharingfahrzeuge frei (zu Zeichen 290.1)",
      "question": "Was bedeutet dieses Zusatzzeichen? Erklären Sie, zu welchem Zeichen es gehört und was es regelt.",
      "difficulty": 2,
      "images": [
        "x480"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Durch das Zusatzzeichen zu Zeichen 290.1 wird das Parken für Carsharingfahrzeuge (§ 39 Absatz 11) innerhalb der gekennzeichneten Flächen erlaubt."
        }
      ],
      "modelAnswer": "Das ist Zusatzzeichen „Carsharingfahrzeuge frei (zu Zeichen 290.1)“ – Zusatzzeichen (Anlage 2), Halt- und Parkverbote. Durch das Zusatzzeichen zu Zeichen 290.1 wird das Parken für Carsharingfahrzeuge (§ 39 Absatz 11) innerhalb der gekennzeichneten Flächen erlaubt.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Carsharingfahrzeuge frei (zu Zeichen 290.1)",
          "keywords": [
            "frei",
            "carsharingfahrzeuge",
            "carsharingfahrzeuge frei (zu zeichen 290.1)"
          ]
        },
        {
          "label": "Zusatzzeichen zum Hauptzeichen",
          "keywords": [
            "zusatzzeichen",
            "290.1"
          ]
        },
        {
          "label": "Durch das Zusatzzeichen zu Zeichen 290.1 wird das Parken für Carsharingfahrzeuge (§ 39 Absatz 11) innerhalb …",
          "keywords": [
            "carsharingfahrzeuge",
            "flächen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Mit welchem Hauptzeichen wird dieses Zusatzzeichen verwendet?",
        "Wo steht das Zusatzzeichen?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 64.2"
    },
    {
      "id": "vz-290-2",
      "subject": "zeichen",
      "sign": "290.2",
      "signLabel": "Zeichen 290.2",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "65",
      "name": "Ende eines eingeschränkten Haltverbots für eine Zone",
      "category": "Vorschriftzeichen (Anlage 2), Halt- und Parkverbote",
      "topic": "Zeichen 290.2 – Ende eines eingeschränkten Haltverbots für eine Zone",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x498"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 290.2 „Ende eines eingeschränkten Haltverbots für eine Zone“ – Vorschriftzeichen (Anlage 2), Halt- und Parkverbote.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Ende eines eingeschränkten Haltverbots für eine Zone",
          "keywords": [
            "zone",
            "290.2",
            "haltverbots",
            "eingeschränkten",
            "ende eines eingeschränkten haltverbots für eine zone"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 65"
    },
    {
      "id": "vz-293",
      "subject": "zeichen",
      "sign": "293",
      "signLabel": "Zeichen 293",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "66",
      "name": "Fußgängerüberweg",
      "category": "Vorschriftzeichen (Anlage 2), Markierungen",
      "topic": "Zeichen 293 – Fußgängerüberweg",
      "question": "Welche Markierung ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x499"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Wer ein Fahrzeug führt, darf auf Fußgängerüberwegen sowie bis zu 5 m davor nicht halten."
        }
      ],
      "modelAnswer": "Das ist Zeichen 293 „Fußgängerüberweg“ – Vorschriftzeichen (Anlage 2), Markierungen. Wer ein Fahrzeug führt, darf auf Fußgängerüberwegen sowie bis zu 5 m davor nicht halten.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Fußgängerüberweg",
          "keywords": [
            "293",
            "fußgängerüberweg"
          ]
        },
        {
          "label": "Wer ein Fahrzeug führt, darf auf Fußgängerüberwegen sowie bis zu 5 m davor nicht halten.",
          "keywords": [
            "5 m",
            "fußgängerüberwegen",
            "davor"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 66"
    },
    {
      "id": "vz-294",
      "subject": "zeichen",
      "sign": "294",
      "signLabel": "Zeichen 294",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "67",
      "name": "Haltlinie",
      "category": "Vorschriftzeichen (Anlage 2), Markierungen",
      "topic": "Zeichen 294 – Haltlinie",
      "question": "Welche Markierung ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x507"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Ergänzend zu Halt- oder Wartegeboten, die durch Zeichen 206, durch Polizeibeamte, Lichtzeichen oder Schranken gegeben werden, ordnet sie an: Wer ein Fahrzeug führt, muss hier anhalten. Erforderlichenfalls ist an der Stelle, wo die Straße eingesehen werden kann, in die eingefahren werden soll (Sichtlinie), erneut anzuhalten."
        }
      ],
      "modelAnswer": "Das ist Zeichen 294 „Haltlinie“ – Vorschriftzeichen (Anlage 2), Markierungen. Ergänzend zu Halt- oder Wartegeboten, die durch Zeichen 206, durch Polizeibeamte, Lichtzeichen oder Schranken gegeben werden, ordnet sie an: Wer ein Fahrzeug führt, muss hier anhalten. Erforderlichenfalls ist an der Stelle, wo die Straße eingesehen werden kann, in die eingefahren werden soll (Sichtlinie), erneut anzuhalten.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Haltlinie",
          "keywords": [
            "294",
            "haltlinie"
          ]
        },
        {
          "label": "Ergänzend zu Halt- oder Wartegeboten, die durch Zeichen 206, durch Polizeibeamte, Lichtzeichen oder …",
          "keywords": [
            "polizeibeamte",
            "wartegeboten",
            "lichtzeichen",
            "eingefahren"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 67"
    },
    {
      "id": "vz-295",
      "subject": "zeichen",
      "sign": "295",
      "signLabel": "Zeichen 295",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "68",
      "name": "Fahrstreifenbegrenzung, Begrenzung von Fahrbahnen und Sonderwegen",
      "category": "Vorschriftzeichen (Anlage 2), Markierungen",
      "topic": "Zeichen 295 – Fahrstreifenbegrenzung, Begrenzung von Fahrbahnen und Sonderwegen",
      "question": "Welche Markierung ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x508"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "1. a) Wer ein Fahrzeug führt, darf die durchgehende Linie auch nicht teilweise überfahren. b) Trennt die durchgehende Linie den Teil der Fahrbahn oder des Sonderwegs für den Gegenverkehr ab, ist rechts von ihr zu fahren. c) Grenzt sie einen befestigten Seitenstreifen ab, müssen außerorts landwirtschaftliche Zug- und Arbeitsmaschinen, Fuhrwerke und ähnlich langsame Fahrzeuge möglichst rechts von ihr fahren. d) Wer ein Fahrzeug führt, darf auf der Fahrbahn nicht parken, wenn zwischen dem abgestellten Fahrzeug und der Fahrstreifenbegrenzungslinie kein Fahrstreifen von mindestens 3 m mehr verbleibt. 2. a) Wer ein Fahrzeug führt, darf links von der durchgehenden Fahrbahnbegrenzungslinie nicht halten, wenn rechts ein Seitenstreifen oder Sonderweg vorhanden ist. b) Wer ein Fahrzeug führt, darf die Fahrbahnbegrenzung der Mittelinsel des Kreisverkehrs nicht überfahren. c) Ausgenommen von dem Verbot zum Überfahren der Fahrbahnbegrenzung der Mittelinsel des Kreisverkehrs sind nur Fahrzeuge, denen wegen ihrer Abmessungen das Befahren sonst nicht möglich wäre. Mit ihnen darf die Mittelinsel überfahren werden, wenn eine Gefährdung anderer am Verkehr Teilnehmenden ausgeschlossen ist. 3. a) Wird durch Zeichen 223.1 das Befahren eines Seitenstreifens angeordnet, darf die Fahrbahnbegrenzung wie eine Leitlinie zur Markierung von Fahrstreifen einer durchgehenden Fahrbahn (Zeichen 340) überfahren werden. b) Grenzt sie einen Sonderweg ab, darf sie nur überfahren werden, wenn dahinter anders nicht erreichbare Parkstände angelegt sind oder sich Grundstückszufahrten befinden und das Benutzen von Sonderwegen weder gefährdet noch behindert wird. c) Die Linie zur Begrenzung von Fahrbahnen oder Sonderwegen darf überfahren werden, wenn sich dahinter eine nicht anders erreichbare Grundstückszufahrt befindet."
        },
        {
          "type": "erlaeuterung",
          "text": "1. Als Fahrstreifenbegrenzung trennt das Zeichen den für den Gegenverkehr bestimmten Teil der Fahrbahn oder mehrere Fahrstreifen für den gleichgerichteten Verkehr voneinander ab. Die Fahrstreifenbegrenzung kann zur Abtrennung des Gegenverkehrs aus einer Doppellinie bestehen. Die Doppellinie kann voneinander abgesetzt aufgebracht sein, dann kann der verbleibende Zwischenraum in grüner Farbe ausgefüllt sein, was weder einen Mittelstreifen noch eine bauliche Trennung darstellt. 2. Als Fahrbahnbegrenzung kann die durchgehende Linie auch einen Seitenstreifen oder Sonderweg abgrenzen. 3. Als Begrenzung eines Sonderwegs kennzeichnet sie den Verlauf des für den Radverkehr bestimmten Teils des Sonderwegs."
        }
      ],
      "modelAnswer": "Das ist Zeichen 295 „Fahrstreifenbegrenzung, Begrenzung von Fahrbahnen und Sonderwegen“ – Vorschriftzeichen (Anlage 2), Markierungen. 1. a) Wer ein Fahrzeug führt, darf die durchgehende Linie auch nicht teilweise überfahren. b) Trennt die durchgehende Linie den Teil der Fahrbahn oder des Sonderwegs für den Gegenverkehr ab, ist rechts von ihr zu fahren. c) Grenzt sie einen befestigten Seitenstreifen ab, müssen außerorts landwirtschaftliche Zug- und Arbeitsmaschinen, Fuhrwerke und ähnlich langsame Fahrzeuge möglichst rechts von ihr fahren. d) Wer ein Fahrzeug führt, darf auf der Fahrbahn nicht parken, wenn zwischen dem abgestellten Fahrzeug und der Fahrstreifenbegrenzungslinie kein Fahrstreifen von mindestens 3 m mehr verbleibt. 2. a) Wer ein Fahrzeug führt, darf links von der durchgehenden Fahrbahnbegrenzungslinie nicht halten, wenn rechts ein Seitenstreifen oder Sonderweg vorhanden ist. b) Wer ein Fahrzeug führt, darf die Fahrbahnbegrenzung der Mittelinsel des Kreisverkehrs nicht überfahren. c) Ausgenommen von dem Verbot zum Überfahren der Fahrbahnbegrenzung der Mittelinsel des Kreisverkehrs sind nur Fahrzeuge, denen wegen ihrer Abmessungen das Befahren sonst nicht möglich wäre. Mit ihnen darf die Mittelinsel überfahren werden, wenn eine Gefährdung anderer am Verkehr Teilnehmenden ausgeschlossen ist. 3. a) Wird durch Zeichen 223.1 das Befahren eines Seitenstreifens angeordnet, darf die Fahrbahnbegrenzung wie eine Leitlinie zur Markierung von Fahrstreifen einer durchgehenden Fahrbahn (Zeichen 340) überfahren werden. b) Grenzt sie einen Sonderweg ab, darf sie nur überfahren werden, wenn dahinter anders nicht erreichbare Parkstände angelegt sind oder sich Grundstückszufahrten befinden und das Benutzen von Sonderwegen weder gefährdet noch behindert wird. c) Die Linie zur Begrenzung von Fahrbahnen oder Sonderwegen darf überfahren werden, wenn sich dahinter eine nicht anders erreichbare Grundstückszufahrt befindet. 1. Als Fahrstreifenbegrenzung trennt das Zeichen den für den Gegenverkehr bestimmten Teil der Fahrbahn oder mehrere Fahrstreifen für den gleichgerichteten Verkehr voneinander ab. Die Fahrstreifenbegrenzung kann zur Abtrennung des Gegenverkehrs aus einer Doppellinie bestehen. Die Doppellinie kann voneinander abgesetzt aufgebracht sein, dann kann der verbleibende Zwischenraum in grüner Farbe ausgefüllt sein, was weder einen Mittelstreifen noch eine bauliche Trennung darstellt. 2. Als Fahrbahnbegrenzung kann die durchgehende Linie auch einen Seitenstreifen oder Sonderweg abgrenzen. 3. Als Begrenzung eines Sonderwegs kennzeichnet sie den Verlauf des für den Radverkehr bestimmten Teils des Sonderwegs.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Fahrstreifenbegrenzung, Begrenzung von Fahrbahnen und Sonderwegen",
          "keywords": [
            "295",
            "begrenzung",
            "sonderwegen",
            "fahrstreifenbegrenzung",
            "fahrstreifenbegrenzung, begrenzung von fahrbahnen und sonderwegen"
          ]
        },
        {
          "label": "a) Wer ein Fahrzeug führt, darf die durchgehende Linie auch nicht teilweise überfahren.",
          "keywords": [
            "durchgehende",
            "überfahren",
            "linie"
          ]
        },
        {
          "label": "b) Trennt die durchgehende Linie den Teil der Fahrbahn oder des Sonderwegs für den Gegenverkehr ab, ist …",
          "keywords": [
            "durchgehende",
            "gegenverkehr",
            "sonderwegs",
            "trennt"
          ]
        },
        {
          "label": "c) Grenzt sie einen befestigten Seitenstreifen ab, müssen außerorts landwirtschaftliche Zug- und …",
          "keywords": [
            "landwirtschaftliche",
            "arbeitsmaschinen",
            "seitenstreifen",
            "befestigten"
          ]
        },
        {
          "label": "d) Wer ein Fahrzeug führt, darf auf der Fahrbahn nicht parken, wenn zwischen dem abgestellten Fahrzeug und …",
          "keywords": [
            "3 m",
            "fahrstreifenbegrenzungslinie",
            "abgestellten",
            "mindestens"
          ]
        },
        {
          "label": "a) Wer ein Fahrzeug führt, darf links von der durchgehenden Fahrbahnbegrenzungslinie nicht halten, wenn …",
          "keywords": [
            "fahrbahnbegrenzungslinie",
            "seitenstreifen",
            "durchgehenden",
            "sonderweg"
          ]
        },
        {
          "label": "b) Wer ein Fahrzeug führt, darf die Fahrbahnbegrenzung der Mittelinsel des Kreisverkehrs nicht überfahren.",
          "keywords": [
            "fahrbahnbegrenzung",
            "kreisverkehrs",
            "mittelinsel",
            "überfahren"
          ]
        },
        {
          "label": "c) Ausgenommen von dem Verbot zum Überfahren der Fahrbahnbegrenzung der Mittelinsel des Kreisverkehrs sind …",
          "keywords": [
            "fahrbahnbegrenzung",
            "ausgeschlossen",
            "kreisverkehrs",
            "teilnehmenden"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 68"
    },
    {
      "id": "vz-296",
      "subject": "zeichen",
      "sign": "296",
      "signLabel": "Zeichen 296",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "69",
      "name": "Einseitige Fahrstreifenbegrenzung",
      "category": "Vorschriftzeichen (Anlage 2), Markierungen",
      "topic": "Zeichen 296 – Einseitige Fahrstreifenbegrenzung",
      "question": "Welche Markierung ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x522"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "1. Wer ein Fahrzeug führt, darf die durchgehende Linie nicht überfahren oder auf ihr fahren. 2. Wer ein Fahrzeug führt, darf nicht auf der Fahrbahn parken, wenn zwischen dem parkenden Fahrzeug und der durchgehenden Fahrstreifenbegrenzungslinie kein Fahrstreifen von mindestens 3 m mehr verbleibt. 3. Für Fahrzeuge auf dem Fahrstreifen B ordnet die Markierung an: Fahrzeuge auf dem Fahrstreifen B dürfen die Markierung überfahren, wenn der Verkehr dadurch nicht gefährdet wird."
        }
      ],
      "modelAnswer": "Das ist Zeichen 296 „Einseitige Fahrstreifenbegrenzung“ – Vorschriftzeichen (Anlage 2), Markierungen. 1. Wer ein Fahrzeug führt, darf die durchgehende Linie nicht überfahren oder auf ihr fahren. 2. Wer ein Fahrzeug führt, darf nicht auf der Fahrbahn parken, wenn zwischen dem parkenden Fahrzeug und der durchgehenden Fahrstreifenbegrenzungslinie kein Fahrstreifen von mindestens 3 m mehr verbleibt. 3. Für Fahrzeuge auf dem Fahrstreifen B ordnet die Markierung an: Fahrzeuge auf dem Fahrstreifen B dürfen die Markierung überfahren, wenn der Verkehr dadurch nicht gefährdet wird.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Einseitige Fahrstreifenbegrenzung",
          "keywords": [
            "296",
            "einseitige",
            "fahrstreifenbegrenzung",
            "einseitige fahrstreifenbegrenzung"
          ]
        },
        {
          "label": "1. Wer ein Fahrzeug führt, darf die durchgehende Linie nicht überfahren oder auf ihr fahren.",
          "keywords": [
            "durchgehende",
            "überfahren",
            "fahren",
            "linie"
          ]
        },
        {
          "label": "2. Wer ein Fahrzeug führt, darf nicht auf der Fahrbahn parken, wenn zwischen dem parkenden Fahrzeug und der …",
          "keywords": [
            "3 m",
            "fahrstreifenbegrenzungslinie",
            "durchgehenden",
            "mindestens"
          ]
        },
        {
          "label": "3. Für Fahrzeuge auf dem Fahrstreifen B ordnet die Markierung an: Fahrzeuge auf dem Fahrstreifen B dürfen …",
          "keywords": [
            "markierung",
            "überfahren",
            "gefährdet",
            "ordnet"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 69"
    },
    {
      "id": "vz-297",
      "subject": "zeichen",
      "sign": "297",
      "signLabel": "Zeichen 297",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "70",
      "name": "Pfeilmarkierungen",
      "category": "Vorschriftzeichen (Anlage 2), Markierungen",
      "topic": "Zeichen 297 – Pfeilmarkierungen",
      "question": "Welche Markierung ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x523"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "1. Wer ein Fahrzeug führt, muss der Fahrtrichtung auf der folgenden Kreuzung oder Einmündung folgen, wenn zwischen den Pfeilen Leitlinien (Zeichen 340) oder Fahrstreifenbegrenzungen (Zeichen 295) markiert sind. 2. Wer ein Fahrzeug führt, darf auf der mit Pfeilen markierten Strecke der Fahrbahn nicht halten (§ 12 Absatz 1)."
        },
        {
          "type": "erlaeuterung",
          "text": "Pfeile empfehlen, sich rechtzeitig einzuordnen und in Fahrstreifen nebeneinander zu fahren. Fahrzeuge, die sich eingeordnet haben, dürfen auch rechts überholt werden."
        }
      ],
      "modelAnswer": "Das ist Zeichen 297 „Pfeilmarkierungen“ – Vorschriftzeichen (Anlage 2), Markierungen. 1. Wer ein Fahrzeug führt, muss der Fahrtrichtung auf der folgenden Kreuzung oder Einmündung folgen, wenn zwischen den Pfeilen Leitlinien (Zeichen 340) oder Fahrstreifenbegrenzungen (Zeichen 295) markiert sind. 2. Wer ein Fahrzeug führt, darf auf der mit Pfeilen markierten Strecke der Fahrbahn nicht halten (§ 12 Absatz 1). Pfeile empfehlen, sich rechtzeitig einzuordnen und in Fahrstreifen nebeneinander zu fahren. Fahrzeuge, die sich eingeordnet haben, dürfen auch rechts überholt werden.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Pfeilmarkierungen",
          "keywords": [
            "297",
            "pfeilmarkierungen"
          ]
        },
        {
          "label": "1. Wer ein Fahrzeug führt, muss der Fahrtrichtung auf der folgenden Kreuzung oder Einmündung folgen, wenn …",
          "keywords": [
            "fahrstreifenbegrenzungen",
            "einmündung",
            "leitlinien",
            "folgenden"
          ]
        },
        {
          "label": "2. Wer ein Fahrzeug führt, darf auf der mit Pfeilen markierten Strecke der Fahrbahn nicht halten (§ 12 …",
          "keywords": [
            "markierten",
            "pfeilen",
            "strecke"
          ]
        },
        {
          "label": "Pfeile empfehlen, sich rechtzeitig einzuordnen und in Fahrstreifen nebeneinander zu fahren. Fahrzeuge, die …",
          "keywords": [
            "nebeneinander",
            "rechtzeitig",
            "einzuordnen",
            "eingeordnet"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 70"
    },
    {
      "id": "vz-297-1",
      "subject": "zeichen",
      "sign": "297.1",
      "signLabel": "Zeichen 297.1",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "71",
      "name": "Vorankündigungspfeil",
      "category": "Vorschriftzeichen (Anlage 2), Markierungen",
      "topic": "Zeichen 297.1 – Vorankündigungspfeil",
      "question": "Welche Markierung ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x531"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Mit dem Vorankündigungspfeil wird eine Fahrstreifenbegrenzung angekündigt oder das Ende eines Fahrstreifens angezeigt. Die Ausführung des Pfeils kann von der gezeigten abweichen."
        }
      ],
      "modelAnswer": "Das ist Zeichen 297.1 „Vorankündigungspfeil“ – Vorschriftzeichen (Anlage 2), Markierungen. Mit dem Vorankündigungspfeil wird eine Fahrstreifenbegrenzung angekündigt oder das Ende eines Fahrstreifens angezeigt. Die Ausführung des Pfeils kann von der gezeigten abweichen.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Vorankündigungspfeil",
          "keywords": [
            "297.1",
            "vorankündigungspfeil"
          ]
        },
        {
          "label": "Mit dem Vorankündigungspfeil wird eine Fahrstreifenbegrenzung angekündigt oder das Ende eines Fahrstreifens …",
          "keywords": [
            "fahrstreifenbegrenzung",
            "vorankündigungspfeil",
            "fahrstreifens",
            "angekündigt"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 71"
    },
    {
      "id": "vz-298",
      "subject": "zeichen",
      "sign": "298",
      "signLabel": "Zeichen 298",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "72",
      "name": "Sperrfläche",
      "category": "Vorschriftzeichen (Anlage 2), Markierungen",
      "topic": "Zeichen 298 – Sperrfläche",
      "question": "Welche Markierung ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x532"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Wer ein Fahrzeug führt, darf Sperrflächen nicht benutzen."
        }
      ],
      "modelAnswer": "Das ist Zeichen 298 „Sperrfläche“ – Vorschriftzeichen (Anlage 2), Markierungen. Wer ein Fahrzeug führt, darf Sperrflächen nicht benutzen.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Sperrfläche",
          "keywords": [
            "298",
            "sperrfläche"
          ]
        },
        {
          "label": "Wer ein Fahrzeug führt, darf Sperrflächen nicht benutzen.",
          "keywords": [
            "sperrflächen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 72"
    },
    {
      "id": "vz-299",
      "subject": "zeichen",
      "sign": "299",
      "signLabel": "Zeichen 299",
      "kind": "Zeichen",
      "anlage": 2,
      "lfd": "73",
      "name": "Grenzmarkierung für Halt- oder Parkverbote",
      "category": "Vorschriftzeichen (Anlage 2), Markierungen",
      "topic": "Zeichen 299 – Grenzmarkierung für Halt- oder Parkverbote",
      "question": "Welche Markierung ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x533"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Wer ein Fahrzeug führt, darf innerhalb einer Grenzmarkierung für Halt- oder Parkverbote nicht halten oder parken."
        },
        {
          "type": "erlaeuterung",
          "text": "Grenzmarkierungen bezeichnen, verlängern oder verkürzen ein an anderer Stelle vorgeschriebenes Halt- oder Parkverbot."
        }
      ],
      "modelAnswer": "Das ist Zeichen 299 „Grenzmarkierung für Halt- oder Parkverbote“ – Vorschriftzeichen (Anlage 2), Markierungen. Wer ein Fahrzeug führt, darf innerhalb einer Grenzmarkierung für Halt- oder Parkverbote nicht halten oder parken. Grenzmarkierungen bezeichnen, verlängern oder verkürzen ein an anderer Stelle vorgeschriebenes Halt- oder Parkverbot.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Grenzmarkierung für Halt- oder Parkverbote",
          "keywords": [
            "299",
            "halt",
            "parkverbote",
            "grenzmarkierung",
            "grenzmarkierung für halt- oder parkverbote"
          ]
        },
        {
          "label": "Wer ein Fahrzeug führt, darf innerhalb einer Grenzmarkierung für Halt- oder Parkverbote nicht halten oder …",
          "keywords": [
            "grenzmarkierung",
            "parkverbote",
            "halt"
          ]
        },
        {
          "label": "Grenzmarkierungen bezeichnen, verlängern oder verkürzen ein an anderer Stelle vorgeschriebenes Halt- oder …",
          "keywords": [
            "grenzmarkierungen",
            "vorgeschriebenes",
            "bezeichnen",
            "verlängern"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 73"
    },
    {
      "id": "vz-z2-74",
      "subject": "zeichen",
      "sign": null,
      "signLabel": "Markierung",
      "kind": "Markierung",
      "anlage": 2,
      "lfd": "74",
      "name": "Parkflächenmarkierung",
      "category": "Vorschriftzeichen (Anlage 2), Markierungen",
      "topic": "Markierung – Parkflächenmarkierung",
      "question": "Welche Markierung ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [],
      "official": [
        {
          "type": "gebot",
          "text": "Eine Parkflächenmarkierung erlaubt das Parken; auf Gehwegen aber nur Fahrzeugen mit einer zulässigen Gesamtmasse bis zu 2,8 t. Die durch die Aufstellung ist einzuhalten. Wo sie mit durchgehenden Linien markiert ist, darf diese überfahren werden."
        },
        {
          "type": "erlaeuterung",
          "text": "Sind Parkflächen auf Straßen erkennbar abgegrenzt, wird damit angeordnet, wie Fahrzeuge aufzustellen sind."
        }
      ],
      "modelAnswer": "Das ist Markierung „Parkflächenmarkierung“ – Vorschriftzeichen (Anlage 2), Markierungen. Eine Parkflächenmarkierung erlaubt das Parken; auf Gehwegen aber nur Fahrzeugen mit einer zulässigen Gesamtmasse bis zu 2,8 t. Die durch die Aufstellung ist einzuhalten. Wo sie mit durchgehenden Linien markiert ist, darf diese überfahren werden. Sind Parkflächen auf Straßen erkennbar abgegrenzt, wird damit angeordnet, wie Fahrzeuge aufzustellen sind.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Parkflächenmarkierung",
          "keywords": [
            "parkflächenmarkierung"
          ]
        },
        {
          "label": "Eine Parkflächenmarkierung erlaubt das Parken; auf Gehwegen aber nur Fahrzeugen mit einer zulässigen …",
          "keywords": [
            "2,8 t",
            "parkflächenmarkierung",
            "durchgehenden",
            "gesamtmasse"
          ]
        },
        {
          "label": "Sind Parkflächen auf Straßen erkennbar abgegrenzt, wird damit angeordnet, wie Fahrzeuge aufzustellen sind.",
          "keywords": [
            "aufzustellen",
            "parkflächen",
            "abgegrenzt",
            "erkennbar"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Für wen gilt dieses Zeichen und welche Ausnahmen gibt es?",
        "Wie und wo endet die Anordnung?"
      ],
      "source": "StVO Anlage 2, lfd. Nr. 74"
    },
    {
      "id": "vz-301",
      "subject": "zeichen",
      "sign": "301",
      "signLabel": "Zeichen 301",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "1",
      "name": "Vorfahrt",
      "category": "Richtzeichen (Anlage 3), Vorrangzeichen",
      "topic": "Zeichen 301 – Vorfahrt",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x548"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Das Zeichen zeigt an, dass an der nächsten Kreuzung oder Einmündung Vorfahrt besteht."
        }
      ],
      "modelAnswer": "Das ist Zeichen 301 „Vorfahrt“ – Richtzeichen (Anlage 3), Vorrangzeichen. Das Zeichen zeigt an, dass an der nächsten Kreuzung oder Einmündung Vorfahrt besteht.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Vorfahrt",
          "keywords": [
            "301",
            "vorfahrt"
          ]
        },
        {
          "label": "Das Zeichen zeigt an, dass an der nächsten Kreuzung oder Einmündung Vorfahrt besteht.",
          "keywords": [
            "einmündung",
            "nächsten",
            "kreuzung",
            "vorfahrt"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 1"
    },
    {
      "id": "vz-306",
      "subject": "zeichen",
      "sign": "306",
      "signLabel": "Zeichen 306",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "2",
      "name": "Vorfahrtstraße",
      "category": "Richtzeichen (Anlage 3), Vorrangzeichen",
      "topic": "Zeichen 306 – Vorfahrtstraße",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x549"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Wer ein Fahrzeug führt, darf außerhalb geschlossener Ortschaften auf Fahrbahnen von Vorfahrtstraßen nicht parken. Das Zeichen zeigt an, dass Vorfahrt besteht bis zum nächsten Zeichen 205 \"Vorfahrt gewähren.\", 206 \"Halt. Vorfahrt gewähren.\" oder 307 \"Ende der Vorfahrtstraße\"."
        }
      ],
      "modelAnswer": "Das ist Zeichen 306 „Vorfahrtstraße“ – Richtzeichen (Anlage 3), Vorrangzeichen. Wer ein Fahrzeug führt, darf außerhalb geschlossener Ortschaften auf Fahrbahnen von Vorfahrtstraßen nicht parken. Das Zeichen zeigt an, dass Vorfahrt besteht bis zum nächsten Zeichen 205 \"Vorfahrt gewähren.\", 206 \"Halt. Vorfahrt gewähren.\" oder 307 \"Ende der Vorfahrtstraße\".",
      "keyPoints": [
        {
          "label": "Bezeichnung: Vorfahrtstraße",
          "keywords": [
            "306",
            "vorfahrtstraße"
          ]
        },
        {
          "label": "Wer ein Fahrzeug führt, darf außerhalb geschlossener Ortschaften auf Fahrbahnen von Vorfahrtstraßen nicht …",
          "keywords": [
            "vorfahrtstraßen",
            "vorfahrtstraße",
            "geschlossener",
            "ortschaften"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 2"
    },
    {
      "id": "vz-z3-2-1",
      "subject": "zeichen",
      "sign": null,
      "signLabel": "Zusatzzeichen",
      "kind": "Zusatzzeichen",
      "anlage": 3,
      "lfd": "2.1",
      "name": "Abknickende Vorfahrt (zu Zeichen 306)",
      "category": "Zusatzzeichen (Anlage 3), Vorrangzeichen",
      "topic": "Zusatzzeichen – Abknickende Vorfahrt (zu Zeichen 306)",
      "question": "Was bedeutet dieses Zusatzzeichen? Erklären Sie, zu welchem Zeichen es gehört und was es regelt.",
      "difficulty": 2,
      "images": [
        "x558"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "1. Wer ein Fahrzeug führt und dem Verlauf der abknickenden Vorfahrtstraße folgen will, muss dies rechtzeitig und deutlich ankündigen; dabei sind die Fahrtrichtungsanzeiger zu benutzen. 2. Auf den Fußgängerverkehr ist besondere Rücksicht zu nehmen. Wenn nötig, muss gewartet werden."
        },
        {
          "type": "erlaeuterung",
          "text": "Das Zusatzzeichen zum Zeichen 306 zeigt den Verlauf der Vorfahrtstraße an."
        }
      ],
      "modelAnswer": "Das ist Zusatzzeichen „Abknickende Vorfahrt (zu Zeichen 306)“ – Zusatzzeichen (Anlage 3), Vorrangzeichen. 1. Wer ein Fahrzeug führt und dem Verlauf der abknickenden Vorfahrtstraße folgen will, muss dies rechtzeitig und deutlich ankündigen; dabei sind die Fahrtrichtungsanzeiger zu benutzen. 2. Auf den Fußgängerverkehr ist besondere Rücksicht zu nehmen. Wenn nötig, muss gewartet werden. Das Zusatzzeichen zum Zeichen 306 zeigt den Verlauf der Vorfahrtstraße an.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Abknickende Vorfahrt (zu Zeichen 306)",
          "keywords": [
            "vorfahrt",
            "abknickende",
            "abknickende vorfahrt (zu zeichen 306)"
          ]
        },
        {
          "label": "Zusatzzeichen zum Hauptzeichen",
          "keywords": [
            "zusatzzeichen",
            "306"
          ]
        },
        {
          "label": "1. Wer ein Fahrzeug führt und dem Verlauf der abknickenden Vorfahrtstraße folgen will, muss dies rechtzeitig …",
          "keywords": [
            "fahrtrichtungsanzeiger",
            "vorfahrtstraße",
            "abknickenden",
            "rechtzeitig"
          ]
        },
        {
          "label": "2. Auf den Fußgängerverkehr ist besondere Rücksicht zu nehmen. Wenn nötig, muss gewartet werden.",
          "keywords": [
            "fußgängerverkehr",
            "besondere",
            "rücksicht",
            "gewartet"
          ]
        },
        {
          "label": "Das Zusatzzeichen zum Zeichen 306 zeigt den Verlauf der Vorfahrtstraße an.",
          "keywords": [
            "vorfahrtstraße",
            "verlauf"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Mit welchem Hauptzeichen wird dieses Zusatzzeichen verwendet?",
        "Wo steht das Zusatzzeichen?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 2.1"
    },
    {
      "id": "vz-307",
      "subject": "zeichen",
      "sign": "307",
      "signLabel": "Zeichen 307",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "3",
      "name": "Ende der Vorfahrtstraße",
      "category": "Richtzeichen (Anlage 3), Vorrangzeichen",
      "topic": "Zeichen 307 – Ende der Vorfahrtstraße",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x559"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 307 „Ende der Vorfahrtstraße“ – Richtzeichen (Anlage 3), Vorrangzeichen.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Ende der Vorfahrtstraße",
          "keywords": [
            "307",
            "vorfahrtstraße",
            "ende der vorfahrtstraße"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 3"
    },
    {
      "id": "vz-308",
      "subject": "zeichen",
      "sign": "308",
      "signLabel": "Zeichen 308",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "4",
      "name": "Vorrang vor dem Gegenverkehr",
      "category": "Richtzeichen (Anlage 3), Vorrangzeichen",
      "topic": "Zeichen 308 – Vorrang vor dem Gegenverkehr",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x560"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Wer ein Fahrzeug führt, hat Vorrang vor dem Gegenverkehr."
        }
      ],
      "modelAnswer": "Das ist Zeichen 308 „Vorrang vor dem Gegenverkehr“ – Richtzeichen (Anlage 3), Vorrangzeichen. Wer ein Fahrzeug führt, hat Vorrang vor dem Gegenverkehr.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Vorrang vor dem Gegenverkehr",
          "keywords": [
            "308",
            "vorrang",
            "gegenverkehr",
            "vorrang vor dem gegenverkehr"
          ]
        },
        {
          "label": "Wer ein Fahrzeug führt, hat Vorrang vor dem Gegenverkehr.",
          "keywords": [
            "gegenverkehr",
            "vorrang"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 4"
    },
    {
      "id": "vz-310",
      "subject": "zeichen",
      "sign": "310",
      "signLabel": "Zeichen 310",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "5",
      "name": "Ortstafel Vorderseite",
      "category": "Richtzeichen (Anlage 3), Ortstafel",
      "topic": "Zeichen 310 – Ortstafel Vorderseite",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x570"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Die Ortstafel bestimmt: Hier beginnt eine geschlossene Ortschaft."
        },
        {
          "type": "allgemein",
          "text": "Ab der Ortstafel gelten jeweils die für den Verkehr innerhalb oder außerhalb geschlossener Ortschaften bestehenden Vorschriften."
        }
      ],
      "modelAnswer": "Das ist Zeichen 310 „Ortstafel Vorderseite“ – Richtzeichen (Anlage 3), Ortstafel. Die Ortstafel bestimmt: Hier beginnt eine geschlossene Ortschaft. Ab der Ortstafel gelten jeweils die für den Verkehr innerhalb oder außerhalb geschlossener Ortschaften bestehenden Vorschriften.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Ortstafel Vorderseite",
          "keywords": [
            "310",
            "ortstafel",
            "vorderseite",
            "ortstafel vorderseite"
          ]
        },
        {
          "label": "Die Ortstafel bestimmt: Hier beginnt eine geschlossene Ortschaft.",
          "keywords": [
            "geschlossene",
            "ortstafel",
            "ortschaft",
            "bestimmt"
          ]
        },
        {
          "label": "Ab der Ortstafel gelten jeweils die für den Verkehr innerhalb oder außerhalb geschlossener Ortschaften …",
          "keywords": [
            "geschlossener",
            "vorschriften",
            "ortschaften",
            "bestehenden"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 5"
    },
    {
      "id": "vz-311",
      "subject": "zeichen",
      "sign": "311",
      "signLabel": "Zeichen 311",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "6",
      "name": "Ortstafel Rückseite",
      "category": "Richtzeichen (Anlage 3), Ortstafel",
      "topic": "Zeichen 311 – Ortstafel Rückseite",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x571"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Die Ortstafel bestimmt: Hier endet eine geschlossene Ortschaft."
        },
        {
          "type": "allgemein",
          "text": "Ab der Ortstafel gelten jeweils die für den Verkehr innerhalb oder außerhalb geschlossener Ortschaften bestehenden Vorschriften."
        }
      ],
      "modelAnswer": "Das ist Zeichen 311 „Ortstafel Rückseite“ – Richtzeichen (Anlage 3), Ortstafel. Die Ortstafel bestimmt: Hier endet eine geschlossene Ortschaft. Ab der Ortstafel gelten jeweils die für den Verkehr innerhalb oder außerhalb geschlossener Ortschaften bestehenden Vorschriften.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Ortstafel Rückseite",
          "keywords": [
            "311",
            "ortstafel",
            "rückseite",
            "ortstafel rückseite"
          ]
        },
        {
          "label": "Die Ortstafel bestimmt: Hier endet eine geschlossene Ortschaft.",
          "keywords": [
            "geschlossene",
            "ortstafel",
            "ortschaft",
            "bestimmt"
          ]
        },
        {
          "label": "Ab der Ortstafel gelten jeweils die für den Verkehr innerhalb oder außerhalb geschlossener Ortschaften …",
          "keywords": [
            "geschlossener",
            "vorschriften",
            "ortschaften",
            "bestehenden"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 6"
    },
    {
      "id": "vz-314",
      "subject": "zeichen",
      "sign": "314",
      "signLabel": "Zeichen 314",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "7",
      "name": "Parken",
      "category": "Richtzeichen (Anlage 3), Parken",
      "topic": "Zeichen 314 – Parken",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x579"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "1. Wer ein Fahrzeug führt, darf hier parken. 2. a) Durch ein Zusatzzeichen kann die Parkerlaubnis insbesondere nach der Dauer, nach Fahrzeugarten, zugunsten der mit besonderem Parkausweis versehenen Bewohner oder auf das Parken mit Parkschein oder Parkscheibe beschränkt sein. b) Ein Zusatzzeichen mit Bild 318 (Parkscheibe) und Angabe der Stundenzahl schreibt das Parken mit Parkscheibe und dessen zulässige Höchstdauer vor. c) Durch Zusatzzeichen können Bewohner mit Parkausweis von der Verpflichtung zum Parken mit Parkschein oder Parkscheibe freigestellt sein. d) Durch ein Zusatzzeichen mit Rollstuhlfahrersinnbild kann die Parkerlaubnis beschränkt sein auf schwerbehinderte Menschen mit außergewöhnlicher Gehbehinderung, beidseitiger Amelie oder Phokomelie oder mit vergleichbaren Funktionseinschränkungen sowie auf blinde Menschen. e) Die Parkerlaubnis gilt nur, wenn der Parkschein, die Parkscheibe oder der Parkausweis gut lesbar ausgelegt oder angebracht ist. f) Durch Zusatzzeichen kann ein Parkplatz als gebührenpflichtig ausgewiesen sein. 3. a) Durch Zusatzzeichen kann die Parkerlaubnis zugunsten elektrisch betriebener Fahrzeuge beschränkt sein. b) Durch Zusatzzeichen können elektrisch betriebene Fahrzeuge von der Verpflichtung zum Parken mit Parkschein oder Parkscheibe freigestellt sein. Sind Parkscheinautomaten aufgestellt, kann die Freistellung auch allein am Automaten angegeben sein. c) Durch Zusatzzeichen kann die Parkerlaubnis für elektrisch betriebene Fahrzeuge nach der Dauer beschränkt sein. Der Nachweis zur Einhaltung der zeitlichen Dauer erfolgt durch Auslegen der Parkscheibe. Die Parkerlaubnis gilt nur, wenn die Parkscheibe gut lesbar ausgelegt oder angebracht ist. 4. a) Durch Zusatzzeichen kann die Parkerlaubnis zugunsten von mit einem Carsharingausweis versehenen Carsharingfahrzeugen beschränkt sein. Eine Beschränkung auf Fahrzeuge nur eines Carsharingunternehmens oder auf bestimmte Carsharingunternehmen ist nach Maßgabe des Carsharinggesetzes zulässig. Die Beschränkung erfolgt durch die Angabe der entsprechenden Firmenbezeichnung in schwarzer Schrift auf weißem Grund auf einem weiteren Zusatzzeichen. Die Parkerlaubnis gilt nur, wenn der Carsharingausweis im Fahrzeug gut lesbar ausgelegt oder angebracht ist. b) Durch Zusatzzeichen können Carsharingfahrzeuge von der Verpflichtung zum Parken mit Parkschein oder Parkscheibe freigestellt sein. Sind Parkscheinautomaten aufgestellt, kann die Freistellung auch allein am Automaten angegeben sein."
        },
        {
          "type": "erlaeuterung",
          "text": "1. Der Anfang des erlaubten Parkens kann durch einen zur Fahrbahn weisenden waagerechten weißen Pfeil im Zeichen, das Ende durch einen solchen von der Fahrbahn wegweisenden Pfeil gekennzeichnet sein. Bei in der Strecke wiederholten Zeichen weist eine Pfeilspitze zur Fahrbahn, die zweite Pfeilspitze von ihr weg. 2. Das Zeichen mit einem Zusatzzeichen mit schwarzem Pfeil weist auf die Zufahrt zu größeren Parkplätzen oder Parkhäusern hin. Das Zeichen kann auch durch Hinweise ergänzt werden, ob es sich um ein Parkhaus handelt."
        }
      ],
      "modelAnswer": "Das ist Zeichen 314 „Parken“ – Richtzeichen (Anlage 3), Parken. 1. Wer ein Fahrzeug führt, darf hier parken. 2. a) Durch ein Zusatzzeichen kann die Parkerlaubnis insbesondere nach der Dauer, nach Fahrzeugarten, zugunsten der mit besonderem Parkausweis versehenen Bewohner oder auf das Parken mit Parkschein oder Parkscheibe beschränkt sein. b) Ein Zusatzzeichen mit Bild 318 (Parkscheibe) und Angabe der Stundenzahl schreibt das Parken mit Parkscheibe und dessen zulässige Höchstdauer vor. c) Durch Zusatzzeichen können Bewohner mit Parkausweis von der Verpflichtung zum Parken mit Parkschein oder Parkscheibe freigestellt sein. d) Durch ein Zusatzzeichen mit Rollstuhlfahrersinnbild kann die Parkerlaubnis beschränkt sein auf schwerbehinderte Menschen mit außergewöhnlicher Gehbehinderung, beidseitiger Amelie oder Phokomelie oder mit vergleichbaren Funktionseinschränkungen sowie auf blinde Menschen. e) Die Parkerlaubnis gilt nur, wenn der Parkschein, die Parkscheibe oder der Parkausweis gut lesbar ausgelegt oder angebracht ist. f) Durch Zusatzzeichen kann ein Parkplatz als gebührenpflichtig ausgewiesen sein. 3. a) Durch Zusatzzeichen kann die Parkerlaubnis zugunsten elektrisch betriebener Fahrzeuge beschränkt sein. b) Durch Zusatzzeichen können elektrisch betriebene Fahrzeuge von der Verpflichtung zum Parken mit Parkschein oder Parkscheibe freigestellt sein. Sind Parkscheinautomaten aufgestellt, kann die Freistellung auch allein am Automaten angegeben sein. c) Durch Zusatzzeichen kann die Parkerlaubnis für elektrisch betriebene Fahrzeuge nach der Dauer beschränkt sein. Der Nachweis zur Einhaltung der zeitlichen Dauer erfolgt durch Auslegen der Parkscheibe. Die Parkerlaubnis gilt nur, wenn die Parkscheibe gut lesbar ausgelegt oder angebracht ist. 4. a) Durch Zusatzzeichen kann die Parkerlaubnis zugunsten von mit einem Carsharingausweis versehenen Carsharingfahrzeugen beschränkt sein. Eine Beschränkung auf Fahrzeuge nur eines Carsharingunternehmens oder auf bestimmte Carsharingunternehmen ist nach Maßgabe des Carsharinggesetzes zulässig. Die Beschränkung erfolgt durch die Angabe der entsprechenden Firmenbezeichnung in schwarzer Schrift auf weißem Grund auf einem weiteren Zusatzzeichen. Die Parkerlaubnis gilt nur, wenn der Carsharingausweis im Fahrzeug gut lesbar ausgelegt oder angebracht ist. b) Durch Zusatzzeichen können Carsharingfahrzeuge von der Verpflichtung zum Parken mit Parkschein oder Parkscheibe freigestellt sein. Sind Parkscheinautomaten aufgestellt, kann die Freistellung auch allein am Automaten angegeben sein. 1. Der Anfang des erlaubten Parkens kann durch einen zur Fahrbahn weisenden waagerechten weißen Pfeil im Zeichen, das Ende durch einen solchen von der Fahrbahn wegweisenden Pfeil gekennzeichnet sein. Bei in der Strecke wiederholten Zeichen weist eine Pfeilspitze zur Fahrbahn, die zweite Pfeilspitze von ihr weg. 2. Das Zeichen mit einem Zusatzzeichen mit schwarzem Pfeil weist auf die Zufahrt zu größeren Parkplätzen oder Parkhäusern hin. Das Zeichen kann auch durch Hinweise ergänzt werden, ob es sich um ein Parkhaus handelt.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Parken",
          "keywords": [
            "314",
            "parken"
          ]
        },
        {
          "label": "a) Durch ein Zusatzzeichen kann die Parkerlaubnis insbesondere nach der Dauer, nach Fahrzeugarten, zugunsten …",
          "keywords": [
            "parkerlaubnis",
            "fahrzeugarten",
            "parkausweis",
            "parkscheibe"
          ]
        },
        {
          "label": "b) Ein Zusatzzeichen mit Bild 318 (Parkscheibe) und Angabe der Stundenzahl schreibt das Parken mit …",
          "keywords": [
            "parkscheibe",
            "stundenzahl",
            "höchstdauer",
            "zulässige"
          ]
        },
        {
          "label": "c) Durch Zusatzzeichen können Bewohner mit Parkausweis von der Verpflichtung zum Parken mit Parkschein oder …",
          "keywords": [
            "verpflichtung",
            "freigestellt",
            "parkausweis",
            "parkscheibe"
          ]
        },
        {
          "label": "d) Durch ein Zusatzzeichen mit Rollstuhlfahrersinnbild kann die Parkerlaubnis beschränkt sein auf …",
          "keywords": [
            "funktionseinschränkungen",
            "rollstuhlfahrersinnbild",
            "außergewöhnlicher",
            "schwerbehinderte"
          ]
        },
        {
          "label": "e) Die Parkerlaubnis gilt nur, wenn der Parkschein, die Parkscheibe oder der Parkausweis gut lesbar …",
          "keywords": [
            "parkerlaubnis",
            "parkscheibe",
            "parkausweis",
            "parkschein"
          ]
        },
        {
          "label": "f) Durch Zusatzzeichen kann ein Parkplatz als gebührenpflichtig ausgewiesen sein.",
          "keywords": [
            "gebührenpflichtig",
            "ausgewiesen",
            "parkplatz"
          ]
        },
        {
          "label": "a) Durch Zusatzzeichen kann die Parkerlaubnis zugunsten elektrisch betriebener Fahrzeuge beschränkt sein.",
          "keywords": [
            "parkerlaubnis",
            "betriebener",
            "elektrisch",
            "beschränkt"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 7"
    },
    {
      "id": "vz-314-1",
      "subject": "zeichen",
      "sign": "314.1",
      "signLabel": "Zeichen 314.1",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "8",
      "name": "Beginn einer Parkraumbewirtschaftungszone",
      "category": "Richtzeichen (Anlage 3), Parken",
      "topic": "Zeichen 314.1 – Beginn einer Parkraumbewirtschaftungszone",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x591"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "1. Wer ein Fahrzeug führt, darf innerhalb der Parkraumbewirtschaftungszone nur mit Parkschein oder mit Parkscheibe (Bild 318) parken, soweit das Halten und Parken nicht gesetzlich oder durch Verkehrszeichen verboten ist. 2. Durch Zusatzzeichen können Bewohner mit Parkausweis von der Verpflichtung zum Parken mit Parkschein oder Parkscheibe freigestellt sein. 3. Die Parkerlaubnis gilt nur, wenn der Parkschein, die Parkscheibe oder der Parkausweis gut lesbar ausgelegt oder angebracht ist. 4. a) Durch Zusatzzeichen kann die Parkerlaubnis zugunsten elektrisch betriebener Fahrzeuge beschränkt sein. b) Durch Zusatzzeichen können elektrisch betriebene Fahrzeuge von der Verpflichtung zum Parken mit Parkschein oder Parkscheibe freigestellt sein. Sind Parkscheinautomaten aufgestellt, kann die Freistellung auch allein am Automaten angegeben sein. c) Durch Zusatzzeichen kann die Parkerlaubnis für elektrisch betriebene Fahrzeuge nach der Dauer beschränkt sein. Der Nachweis zur Einhaltung der zeitlichen Dauer erfolgt durch Auslegen der Parkscheibe. Die Parkerlaubnis gilt nur, wenn die Parkscheibe gut lesbar ausgelegt oder angebracht ist. 5. a) Durch Zusatzzeichen kann die Parkerlaubnis zugunsten von mit einem Carsharingausweis versehenen Carsharingfahrzeugen beschränkt sein. Eine Beschränkung auf Fahrzeuge nur eines Carsharingunternehmens oder auf bestimmte Carsharingunternehmen ist nach Maßgabe des Carsharinggesetzes zulässig. Die Beschränkung erfolgt durch eine zusätzliche Angabe der entsprechenden Firmenbezeichnung in schwarzer Schrift auf weißem Grund auf einem weiteren Zusatzzeichen. Die Parkerlaubnis gilt nur, wenn der Carsharingausweis gut lesbar im Fahrzeug ausgelegt oder angebracht ist. b) Durch Zusatzzeichen können Carsharingfahrzeuge von der Verpflichtung zum Parken mit Parkschein oder Parkscheibe freigestellt sein. Sind Parkscheinautomaten aufgestellt, kann die Freistellung auch allein am Automaten angegeben sein."
        },
        {
          "type": "erlaeuterung",
          "text": "Die Art der Parkbeschränkung wird durch Zusatzzeichen angezeigt."
        }
      ],
      "modelAnswer": "Das ist Zeichen 314.1 „Beginn einer Parkraumbewirtschaftungszone“ – Richtzeichen (Anlage 3), Parken. 1. Wer ein Fahrzeug führt, darf innerhalb der Parkraumbewirtschaftungszone nur mit Parkschein oder mit Parkscheibe (Bild 318) parken, soweit das Halten und Parken nicht gesetzlich oder durch Verkehrszeichen verboten ist. 2. Durch Zusatzzeichen können Bewohner mit Parkausweis von der Verpflichtung zum Parken mit Parkschein oder Parkscheibe freigestellt sein. 3. Die Parkerlaubnis gilt nur, wenn der Parkschein, die Parkscheibe oder der Parkausweis gut lesbar ausgelegt oder angebracht ist. 4. a) Durch Zusatzzeichen kann die Parkerlaubnis zugunsten elektrisch betriebener Fahrzeuge beschränkt sein. b) Durch Zusatzzeichen können elektrisch betriebene Fahrzeuge von der Verpflichtung zum Parken mit Parkschein oder Parkscheibe freigestellt sein. Sind Parkscheinautomaten aufgestellt, kann die Freistellung auch allein am Automaten angegeben sein. c) Durch Zusatzzeichen kann die Parkerlaubnis für elektrisch betriebene Fahrzeuge nach der Dauer beschränkt sein. Der Nachweis zur Einhaltung der zeitlichen Dauer erfolgt durch Auslegen der Parkscheibe. Die Parkerlaubnis gilt nur, wenn die Parkscheibe gut lesbar ausgelegt oder angebracht ist. 5. a) Durch Zusatzzeichen kann die Parkerlaubnis zugunsten von mit einem Carsharingausweis versehenen Carsharingfahrzeugen beschränkt sein. Eine Beschränkung auf Fahrzeuge nur eines Carsharingunternehmens oder auf bestimmte Carsharingunternehmen ist nach Maßgabe des Carsharinggesetzes zulässig. Die Beschränkung erfolgt durch eine zusätzliche Angabe der entsprechenden Firmenbezeichnung in schwarzer Schrift auf weißem Grund auf einem weiteren Zusatzzeichen. Die Parkerlaubnis gilt nur, wenn der Carsharingausweis gut lesbar im Fahrzeug ausgelegt oder angebracht ist. b) Durch Zusatzzeichen können Carsharingfahrzeuge von der Verpflichtung zum Parken mit Parkschein oder Parkscheibe freigestellt sein. Sind Parkscheinautomaten aufgestellt, kann die Freistellung auch allein am Automaten angegeben sein. Die Art der Parkbeschränkung wird durch Zusatzzeichen angezeigt.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Beginn einer Parkraumbewirtschaftungszone",
          "keywords": [
            "314.1",
            "parkraumbewirtschaftungszone",
            "beginn einer parkraumbewirtschaftungszone"
          ]
        },
        {
          "label": "1. Wer ein Fahrzeug führt, darf innerhalb der Parkraumbewirtschaftungszone nur mit Parkschein oder mit …",
          "keywords": [
            "parkraumbewirtschaftungszone",
            "verkehrszeichen",
            "parkscheibe",
            "parkschein"
          ]
        },
        {
          "label": "2. Durch Zusatzzeichen können Bewohner mit Parkausweis von der Verpflichtung zum Parken mit Parkschein oder …",
          "keywords": [
            "verpflichtung",
            "freigestellt",
            "parkausweis",
            "parkscheibe"
          ]
        },
        {
          "label": "3. Die Parkerlaubnis gilt nur, wenn der Parkschein, die Parkscheibe oder der Parkausweis gut lesbar …",
          "keywords": [
            "parkerlaubnis",
            "parkscheibe",
            "parkausweis",
            "parkschein"
          ]
        },
        {
          "label": "a) Durch Zusatzzeichen kann die Parkerlaubnis zugunsten elektrisch betriebener Fahrzeuge beschränkt sein.",
          "keywords": [
            "parkerlaubnis",
            "betriebener",
            "elektrisch",
            "beschränkt"
          ]
        },
        {
          "label": "b) Durch Zusatzzeichen können elektrisch betriebene Fahrzeuge von der Verpflichtung zum Parken mit …",
          "keywords": [
            "parkscheinautomaten",
            "verpflichtung",
            "freigestellt",
            "freistellung"
          ]
        },
        {
          "label": "c) Durch Zusatzzeichen kann die Parkerlaubnis für elektrisch betriebene Fahrzeuge nach der Dauer beschränkt …",
          "keywords": [
            "parkerlaubnis",
            "parkscheibe",
            "elektrisch",
            "betriebene"
          ]
        },
        {
          "label": "a) Durch Zusatzzeichen kann die Parkerlaubnis zugunsten von mit einem Carsharingausweis versehenen …",
          "keywords": [
            "carsharingunternehmens",
            "carsharingunternehmen",
            "carsharingfahrzeugen",
            "carsharinggesetzes"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 8"
    },
    {
      "id": "vz-314-2",
      "subject": "zeichen",
      "sign": "314.2",
      "signLabel": "Zeichen 314.2",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "9",
      "name": "Ende einer Parkraumbewirtschaftungszone",
      "category": "Richtzeichen (Anlage 3), Parken",
      "topic": "Zeichen 314.2 – Ende einer Parkraumbewirtschaftungszone",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x600"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 314.2 „Ende einer Parkraumbewirtschaftungszone“ – Richtzeichen (Anlage 3), Parken.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Ende einer Parkraumbewirtschaftungszone",
          "keywords": [
            "314.2",
            "parkraumbewirtschaftungszone",
            "ende einer parkraumbewirtschaftungszone"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 9"
    },
    {
      "id": "vz-315",
      "subject": "zeichen",
      "sign": "315",
      "signLabel": "Zeichen 315",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "10",
      "name": "Parken auf Gehwegen",
      "category": "Richtzeichen (Anlage 3), Parken",
      "topic": "Zeichen 315 – Parken auf Gehwegen",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x601"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "1. Wer ein Fahrzeug führt, darf auf Gehwegen mit Fahrzeugen mit einer zulässigen Gesamtmasse über 2,8 t nicht parken. Dann darf auch nicht entgegen der angeordneten Aufstellungsart des Zeichens oder entgegen Beschränkungen durch Zusatzzeichen geparkt werden. 2. a) Durch ein Zusatzzeichen kann die Parkerlaubnis insbesondere nach der Dauer, nach Fahrzeugarten, zugunsten der mit besonderem Parkausweis versehenen Bewohner oder auf das Parken mit Parkschein oder Parkscheibe beschränkt sein. b) Ein Zusatzzeichen mit Bild 318 (Parkscheibe) und Angabe der Stundenzahl schreibt das Parken mit Parkscheibe und dessen zulässige Höchstdauer vor. c) Durch Zusatzzeichen können Bewohner mit Parkausweis von der Verpflichtung zum Parken mit Parkschein oder Parkscheibe freigestellt sein. d) Durch ein Zusatzzeichen mit Rollstuhlfahrersinnbild kann die Parkerlaubnis beschränkt sein für schwerbehinderte Menschen mit außergewöhnlicher Gehbehinderung, beidseitiger Amelie oder Phokomelie oder mit vergleichbaren Funktionseinschränkungen sowie für blinde Menschen. e) Die Parkerlaubnis gilt nur, wenn der Parkschein, die Parkscheibe oder der Parkausweis gut lesbar ausgelegt oder angebracht ist. 3. a) Durch Zusatzzeichen kann die Parkerlaubnis zugunsten elektrisch betriebener Fahrzeuge beschränkt sein. b) Durch Zusatzzeichen können elektrisch betriebene Fahrzeuge von der Verpflichtung zum Parken mit Parkschein oder Parkscheibe freigestellt sein. Sind Parkscheinautomaten aufgestellt, kann die Freistellung auch allein am Automaten angegeben sein. c) Durch Zusatzzeichen kann die Parkerlaubnis für elektrisch betriebene Fahrzeuge nach der Dauer beschränkt sein. Der Nachweis zur Einhaltung der zeitlichen Dauer erfolgt durch Auslegen der Parkscheibe. Die Parkerlaubnis gilt nur, wenn die Parkscheibe gut lesbar ausgelegt oder angebracht ist. 4. a) Durch Zusatzzeichen kann die Parkerlaubnis zugunsten von mit einem Carsharingausweis versehenen Carsharingfahrzeugen beschränkt sein. Eine Beschränkung auf Fahrzeuge nur eines Carsharingunternehmens oder auf bestimmte Carsharingunternehmen ist nach Maßgabe des Carsharinggesetzes zulässig. Die Beschränkung erfolgt durch eine zusätzliche Angabe der entsprechenden Firmenbezeichnung in schwarzer Schrift auf weißem Grund auf einem weiteren Zusatzzeichen. Die Parkerlaubnis gilt nur, wenn der Carsharingausweis gut lesbar im Fahrzeug ausgelegt oder angebracht ist. b) Durch Zusatzzeichen können Carsharingfahrzeuge von der Verpflichtung zum Parken mit Parkschein oder Parkscheibe freigestellt sein. Sind Parkscheinautomaten aufgestellt, kann die Freistellung auch allein am Automaten angegeben sein."
        },
        {
          "type": "erlaeuterung",
          "text": "1. Der Anfang des erlaubten Parkens kann durch einen zur Fahrbahn weisenden waagerechten weißen Pfeil im Zeichen, das Ende durch einen solchen von der Fahrbahn wegweisenden Pfeil gekennzeichnet sein. Bei in der Strecke wiederholten Zeichen weist eine Pfeilspitze zur Fahrbahn, die zweite Pfeilspitze von ihr weg. 2. Im Zeichen ist bildlich dargestellt, wie die Fahrzeuge aufzustellen sind."
        }
      ],
      "modelAnswer": "Das ist Zeichen 315 „Parken auf Gehwegen“ – Richtzeichen (Anlage 3), Parken. 1. Wer ein Fahrzeug führt, darf auf Gehwegen mit Fahrzeugen mit einer zulässigen Gesamtmasse über 2,8 t nicht parken. Dann darf auch nicht entgegen der angeordneten Aufstellungsart des Zeichens oder entgegen Beschränkungen durch Zusatzzeichen geparkt werden. 2. a) Durch ein Zusatzzeichen kann die Parkerlaubnis insbesondere nach der Dauer, nach Fahrzeugarten, zugunsten der mit besonderem Parkausweis versehenen Bewohner oder auf das Parken mit Parkschein oder Parkscheibe beschränkt sein. b) Ein Zusatzzeichen mit Bild 318 (Parkscheibe) und Angabe der Stundenzahl schreibt das Parken mit Parkscheibe und dessen zulässige Höchstdauer vor. c) Durch Zusatzzeichen können Bewohner mit Parkausweis von der Verpflichtung zum Parken mit Parkschein oder Parkscheibe freigestellt sein. d) Durch ein Zusatzzeichen mit Rollstuhlfahrersinnbild kann die Parkerlaubnis beschränkt sein für schwerbehinderte Menschen mit außergewöhnlicher Gehbehinderung, beidseitiger Amelie oder Phokomelie oder mit vergleichbaren Funktionseinschränkungen sowie für blinde Menschen. e) Die Parkerlaubnis gilt nur, wenn der Parkschein, die Parkscheibe oder der Parkausweis gut lesbar ausgelegt oder angebracht ist. 3. a) Durch Zusatzzeichen kann die Parkerlaubnis zugunsten elektrisch betriebener Fahrzeuge beschränkt sein. b) Durch Zusatzzeichen können elektrisch betriebene Fahrzeuge von der Verpflichtung zum Parken mit Parkschein oder Parkscheibe freigestellt sein. Sind Parkscheinautomaten aufgestellt, kann die Freistellung auch allein am Automaten angegeben sein. c) Durch Zusatzzeichen kann die Parkerlaubnis für elektrisch betriebene Fahrzeuge nach der Dauer beschränkt sein. Der Nachweis zur Einhaltung der zeitlichen Dauer erfolgt durch Auslegen der Parkscheibe. Die Parkerlaubnis gilt nur, wenn die Parkscheibe gut lesbar ausgelegt oder angebracht ist. 4. a) Durch Zusatzzeichen kann die Parkerlaubnis zugunsten von mit einem Carsharingausweis versehenen Carsharingfahrzeugen beschränkt sein. Eine Beschränkung auf Fahrzeuge nur eines Carsharingunternehmens oder auf bestimmte Carsharingunternehmen ist nach Maßgabe des Carsharinggesetzes zulässig. Die Beschränkung erfolgt durch eine zusätzliche Angabe der entsprechenden Firmenbezeichnung in schwarzer Schrift auf weißem Grund auf einem weiteren Zusatzzeichen. Die Parkerlaubnis gilt nur, wenn der Carsharingausweis gut lesbar im Fahrzeug ausgelegt oder angebracht ist. b) Durch Zusatzzeichen können Carsharingfahrzeuge von der Verpflichtung zum Parken mit Parkschein oder Parkscheibe freigestellt sein. Sind Parkscheinautomaten aufgestellt, kann die Freistellung auch allein am Automaten angegeben sein. 1. Der Anfang des erlaubten Parkens kann durch einen zur Fahrbahn weisenden waagerechten weißen Pfeil im Zeichen, das Ende durch einen solchen von der Fahrbahn wegweisenden Pfeil gekennzeichnet sein. Bei in der Strecke wiederholten Zeichen weist eine Pfeilspitze zur Fahrbahn, die zweite Pfeilspitze von ihr weg. 2. Im Zeichen ist bildlich dargestellt, wie die Fahrzeuge aufzustellen sind.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Parken auf Gehwegen",
          "keywords": [
            "315",
            "gehwegen",
            "parken auf gehwegen"
          ]
        },
        {
          "label": "1. Wer ein Fahrzeug führt, darf auf Gehwegen mit Fahrzeugen mit einer zulässigen Gesamtmasse über 2,8 t …",
          "keywords": [
            "2,8 t",
            "aufstellungsart",
            "beschränkungen",
            "angeordneten"
          ]
        },
        {
          "label": "a) Durch ein Zusatzzeichen kann die Parkerlaubnis insbesondere nach der Dauer, nach Fahrzeugarten, zugunsten …",
          "keywords": [
            "parkerlaubnis",
            "fahrzeugarten",
            "parkausweis",
            "parkscheibe"
          ]
        },
        {
          "label": "b) Ein Zusatzzeichen mit Bild 318 (Parkscheibe) und Angabe der Stundenzahl schreibt das Parken mit …",
          "keywords": [
            "parkscheibe",
            "stundenzahl",
            "höchstdauer",
            "zulässige"
          ]
        },
        {
          "label": "c) Durch Zusatzzeichen können Bewohner mit Parkausweis von der Verpflichtung zum Parken mit Parkschein oder …",
          "keywords": [
            "verpflichtung",
            "freigestellt",
            "parkausweis",
            "parkscheibe"
          ]
        },
        {
          "label": "d) Durch ein Zusatzzeichen mit Rollstuhlfahrersinnbild kann die Parkerlaubnis beschränkt sein für …",
          "keywords": [
            "funktionseinschränkungen",
            "rollstuhlfahrersinnbild",
            "außergewöhnlicher",
            "schwerbehinderte"
          ]
        },
        {
          "label": "e) Die Parkerlaubnis gilt nur, wenn der Parkschein, die Parkscheibe oder der Parkausweis gut lesbar …",
          "keywords": [
            "parkerlaubnis",
            "parkscheibe",
            "parkausweis",
            "parkschein"
          ]
        },
        {
          "label": "a) Durch Zusatzzeichen kann die Parkerlaubnis zugunsten elektrisch betriebener Fahrzeuge beschränkt sein.",
          "keywords": [
            "parkerlaubnis",
            "betriebener",
            "elektrisch",
            "beschränkt"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 10"
    },
    {
      "id": "vz-318",
      "subject": "zeichen",
      "sign": "318",
      "signLabel": "Bild 318",
      "kind": "Bild",
      "anlage": 3,
      "lfd": "11",
      "name": "Parkscheibe",
      "category": "Richtzeichen (Anlage 3), Parken",
      "topic": "Bild 318 – Parkscheibe",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x616"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Ist die Parkzeit bei elektrisch betriebenen Fahrzeugen beschränkt, so ist der Nachweis durch Auslegen der Parkscheibe zu erbringen."
        }
      ],
      "modelAnswer": "Das ist Bild 318 „Parkscheibe“ – Richtzeichen (Anlage 3), Parken. Ist die Parkzeit bei elektrisch betriebenen Fahrzeugen beschränkt, so ist der Nachweis durch Auslegen der Parkscheibe zu erbringen.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Parkscheibe",
          "keywords": [
            "318",
            "parkscheibe"
          ]
        },
        {
          "label": "Ist die Parkzeit bei elektrisch betriebenen Fahrzeugen beschränkt, so ist der Nachweis durch Auslegen der …",
          "keywords": [
            "betriebenen",
            "parkscheibe",
            "elektrisch",
            "beschränkt"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 11"
    },
    {
      "id": "vz-325-1",
      "subject": "zeichen",
      "sign": "325.1",
      "signLabel": "Zeichen 325.1",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "12",
      "name": "Beginn eines verkehrsberuhigten Bereichs",
      "category": "Richtzeichen (Anlage 3), Verkehrsberuhigter Bereich",
      "topic": "Zeichen 325.1 – Beginn eines verkehrsberuhigten Bereichs",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x617"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "1. Wer ein Fahrzeug führt, muss mit Schrittgeschwindigkeit fahren. 2. Wer ein Fahrzeug führt, darf den Fußgängerverkehr weder gefährden noch behindern; wenn nötig, muss gewartet werden. 3. Wer zu Fuß geht, darf den Fahrverkehr nicht unnötig behindern. 4. Wer ein Fahrzeug führt, darf außerhalb der dafür gekennzeichneten Flächen nicht parken, ausgenommen zum Ein- oder Aussteigen und zum Be- oder Entladen. 5. Wer zu Fuß geht, darf die Straße in ihrer ganzen Breite benutzen; Kinderspiele sind überall erlaubt."
        }
      ],
      "modelAnswer": "Das ist Zeichen 325.1 „Beginn eines verkehrsberuhigten Bereichs“ – Richtzeichen (Anlage 3), Verkehrsberuhigter Bereich. 1. Wer ein Fahrzeug führt, muss mit Schrittgeschwindigkeit fahren. 2. Wer ein Fahrzeug führt, darf den Fußgängerverkehr weder gefährden noch behindern; wenn nötig, muss gewartet werden. 3. Wer zu Fuß geht, darf den Fahrverkehr nicht unnötig behindern. 4. Wer ein Fahrzeug führt, darf außerhalb der dafür gekennzeichneten Flächen nicht parken, ausgenommen zum Ein- oder Aussteigen und zum Be- oder Entladen. 5. Wer zu Fuß geht, darf die Straße in ihrer ganzen Breite benutzen; Kinderspiele sind überall erlaubt.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Beginn eines verkehrsberuhigten Bereichs",
          "keywords": [
            "325.1",
            "bereichs",
            "verkehrsberuhigten",
            "beginn eines verkehrsberuhigten bereichs"
          ]
        },
        {
          "label": "1. Wer ein Fahrzeug führt, muss mit Schrittgeschwindigkeit fahren.",
          "keywords": [
            "schrittgeschwindigkeit",
            "fahren"
          ]
        },
        {
          "label": "2. Wer ein Fahrzeug führt, darf den Fußgängerverkehr weder gefährden noch behindern; wenn nötig, muss …",
          "keywords": [
            "fußgängerverkehr",
            "gefährden",
            "behindern",
            "gewartet"
          ]
        },
        {
          "label": "3. Wer zu Fuß geht, darf den Fahrverkehr nicht unnötig behindern.",
          "keywords": [
            "fahrverkehr",
            "behindern",
            "unnötig",
            "geht"
          ]
        },
        {
          "label": "4. Wer ein Fahrzeug führt, darf außerhalb der dafür gekennzeichneten Flächen nicht parken, ausgenommen zum …",
          "keywords": [
            "aussteigen",
            "entladen",
            "flächen",
            "dafür"
          ]
        },
        {
          "label": "5. Wer zu Fuß geht, darf die Straße in ihrer ganzen Breite benutzen; Kinderspiele sind überall erlaubt.",
          "keywords": [
            "kinderspiele",
            "überall",
            "straße",
            "ganzen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 12"
    },
    {
      "id": "vz-325-2",
      "subject": "zeichen",
      "sign": "325.2",
      "signLabel": "Zeichen 325.2",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "13",
      "name": "Ende eines verkehrsberuhigten Bereichs",
      "category": "Richtzeichen (Anlage 3), Verkehrsberuhigter Bereich",
      "topic": "Zeichen 325.2 – Ende eines verkehrsberuhigten Bereichs",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x625"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Beim Ausfahren ist § 10 zu beachten."
        }
      ],
      "modelAnswer": "Das ist Zeichen 325.2 „Ende eines verkehrsberuhigten Bereichs“ – Richtzeichen (Anlage 3), Verkehrsberuhigter Bereich. Beim Ausfahren ist § 10 zu beachten.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Ende eines verkehrsberuhigten Bereichs",
          "keywords": [
            "325.2",
            "bereichs",
            "verkehrsberuhigten",
            "ende eines verkehrsberuhigten bereichs"
          ]
        },
        {
          "label": "Beim Ausfahren ist § 10 zu beachten.",
          "keywords": [
            "ausfahren",
            "beachten",
            "beim"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 13"
    },
    {
      "id": "vz-327",
      "subject": "zeichen",
      "sign": "327",
      "signLabel": "Zeichen 327",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "14",
      "name": "Tunnel",
      "category": "Richtzeichen (Anlage 3), Tunnel",
      "topic": "Zeichen 327 – Tunnel",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x626"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "1. Wer ein Fahrzeug führt, muss beim Durchfahren des Tunnels Abblendlicht benutzen und darf im Tunnel nicht wenden. 2. Im Falle eines Notfalls oder einer Panne sollen nur vorhandene Nothalte- und Pannenbuchten genutzt werden."
        }
      ],
      "modelAnswer": "Das ist Zeichen 327 „Tunnel“ – Richtzeichen (Anlage 3), Tunnel. 1. Wer ein Fahrzeug führt, muss beim Durchfahren des Tunnels Abblendlicht benutzen und darf im Tunnel nicht wenden. 2. Im Falle eines Notfalls oder einer Panne sollen nur vorhandene Nothalte- und Pannenbuchten genutzt werden.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Tunnel",
          "keywords": [
            "327",
            "tunnel"
          ]
        },
        {
          "label": "1. Wer ein Fahrzeug führt, muss beim Durchfahren des Tunnels Abblendlicht benutzen und darf im Tunnel nicht …",
          "keywords": [
            "abblendlicht",
            "durchfahren",
            "tunnels",
            "tunnel"
          ]
        },
        {
          "label": "2. Im Falle eines Notfalls oder einer Panne sollen nur vorhandene Nothalte- und Pannenbuchten genutzt werden.",
          "keywords": [
            "pannenbuchten",
            "vorhandene",
            "notfalls",
            "nothalte"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 14"
    },
    {
      "id": "vz-328",
      "subject": "zeichen",
      "sign": "328",
      "signLabel": "Zeichen 328",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "15",
      "name": "Nothalte- und Pannenbucht",
      "category": "Richtzeichen (Anlage 3), Nothalte- und Pannenbucht",
      "topic": "Zeichen 328 – Nothalte- und Pannenbucht",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x627"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Wer ein Fahrzeug führt, darf nur im Notfall oder bei einer Panne in einer Nothalte- und Pannenbucht halten."
        }
      ],
      "modelAnswer": "Das ist Zeichen 328 „Nothalte- und Pannenbucht“ – Richtzeichen (Anlage 3), Nothalte- und Pannenbucht. Wer ein Fahrzeug führt, darf nur im Notfall oder bei einer Panne in einer Nothalte- und Pannenbucht halten.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Nothalte- und Pannenbucht",
          "keywords": [
            "328",
            "nothalte",
            "pannenbucht",
            "nothalte- und pannenbucht"
          ]
        },
        {
          "label": "Wer ein Fahrzeug führt, darf nur im Notfall oder bei einer Panne in einer Nothalte- und Pannenbucht halten.",
          "keywords": [
            "pannenbucht",
            "nothalte",
            "notfall",
            "panne"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 15"
    },
    {
      "id": "vz-330-1",
      "subject": "zeichen",
      "sign": "330.1",
      "signLabel": "Zeichen 330.1",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "16",
      "name": "Autobahn",
      "category": "Richtzeichen (Anlage 3), Autobahnen und Kraftfahrstraßen",
      "topic": "Zeichen 330.1 – Autobahn",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x637"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Ab diesem Zeichen gelten die Regeln für den Verkehr auf Autobahnen."
        }
      ],
      "modelAnswer": "Das ist Zeichen 330.1 „Autobahn“ – Richtzeichen (Anlage 3), Autobahnen und Kraftfahrstraßen. Ab diesem Zeichen gelten die Regeln für den Verkehr auf Autobahnen.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Autobahn",
          "keywords": [
            "330.1",
            "autobahn"
          ]
        },
        {
          "label": "Ab diesem Zeichen gelten die Regeln für den Verkehr auf Autobahnen.",
          "keywords": [
            "autobahnen",
            "gelten",
            "regeln"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 16"
    },
    {
      "id": "vz-330-2",
      "subject": "zeichen",
      "sign": "330.2",
      "signLabel": "Zeichen 330.2",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "17",
      "name": "Ende der Autobahn",
      "category": "Richtzeichen (Anlage 3), Autobahnen und Kraftfahrstraßen",
      "topic": "Zeichen 330.2 – Ende der Autobahn",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x638"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 330.2 „Ende der Autobahn“ – Richtzeichen (Anlage 3), Autobahnen und Kraftfahrstraßen.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Ende der Autobahn",
          "keywords": [
            "330.2",
            "autobahn",
            "ende der autobahn"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 17"
    },
    {
      "id": "vz-331-1",
      "subject": "zeichen",
      "sign": "331.1",
      "signLabel": "Zeichen 331.1",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "18",
      "name": "Kraftfahrstraße",
      "category": "Richtzeichen (Anlage 3), Autobahnen und Kraftfahrstraßen",
      "topic": "Zeichen 331.1 – Kraftfahrstraße",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x639"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Ab diesem Zeichen gelten die Regeln für den Verkehr auf Kraftfahrstraßen."
        }
      ],
      "modelAnswer": "Das ist Zeichen 331.1 „Kraftfahrstraße“ – Richtzeichen (Anlage 3), Autobahnen und Kraftfahrstraßen. Ab diesem Zeichen gelten die Regeln für den Verkehr auf Kraftfahrstraßen.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Kraftfahrstraße",
          "keywords": [
            "331.1",
            "kraftfahrstraße"
          ]
        },
        {
          "label": "Ab diesem Zeichen gelten die Regeln für den Verkehr auf Kraftfahrstraßen.",
          "keywords": [
            "kraftfahrstraßen",
            "gelten",
            "regeln"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 18"
    },
    {
      "id": "vz-331-2",
      "subject": "zeichen",
      "sign": "331.2",
      "signLabel": "Zeichen 331.2",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "19",
      "name": "Ende der Kraftfahrstraße",
      "category": "Richtzeichen (Anlage 3), Autobahnen und Kraftfahrstraßen",
      "topic": "Zeichen 331.2 – Ende der Kraftfahrstraße",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x640"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 331.2 „Ende der Kraftfahrstraße“ – Richtzeichen (Anlage 3), Autobahnen und Kraftfahrstraßen.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Ende der Kraftfahrstraße",
          "keywords": [
            "331.2",
            "kraftfahrstraße",
            "ende der kraftfahrstraße"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 19"
    },
    {
      "id": "vz-333",
      "subject": "zeichen",
      "sign": "333",
      "signLabel": "Zeichen 333",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "20",
      "name": "Ausfahrt von der Autobahn",
      "category": "Richtzeichen (Anlage 3), Autobahnen und Kraftfahrstraßen",
      "topic": "Zeichen 333 – Ausfahrt von der Autobahn",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x652"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Auf Kraftfahrstraßen oder autobahnähnlich ausgebauten Straßen weist das entsprechende Zeichen mit schwarzer Schrift auf gelbem Grund auf die Ausfahrt hin. Das Zeichen kann auch auf weißem Grund ausgeführt sein."
        }
      ],
      "modelAnswer": "Das ist Zeichen 333 „Ausfahrt von der Autobahn“ – Richtzeichen (Anlage 3), Autobahnen und Kraftfahrstraßen. Auf Kraftfahrstraßen oder autobahnähnlich ausgebauten Straßen weist das entsprechende Zeichen mit schwarzer Schrift auf gelbem Grund auf die Ausfahrt hin. Das Zeichen kann auch auf weißem Grund ausgeführt sein.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Ausfahrt von der Autobahn",
          "keywords": [
            "333",
            "autobahn",
            "ausfahrt",
            "ausfahrt von der autobahn"
          ]
        },
        {
          "label": "Auf Kraftfahrstraßen oder autobahnähnlich ausgebauten Straßen weist das entsprechende Zeichen mit schwarzer …",
          "keywords": [
            "kraftfahrstraßen",
            "autobahnähnlich",
            "entsprechende",
            "ausgebauten"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 20"
    },
    {
      "id": "vz-450",
      "subject": "zeichen",
      "sign": "450",
      "signLabel": "Zeichen 450",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "21",
      "name": "Ankündigungsbake",
      "category": "Richtzeichen (Anlage 3), Autobahnen und Kraftfahrstraßen",
      "topic": "Zeichen 450 – Ankündigungsbake",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x653"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Das Zeichen steht 300 m, 200 m (wie abgebildet) und 100 m vor einem Autobahnknotenpunkt (Autobahnanschlussstelle, Autobahnkreuz oder Autobahndreieck). Es steht auch vor einer bewirtschafteten Rastanlage. Vor einem Knotenpunkt kann auf der 300 m-Bake die Nummer des Knotenpunktes angezeigt sein."
        }
      ],
      "modelAnswer": "Das ist Zeichen 450 „Ankündigungsbake“ – Richtzeichen (Anlage 3), Autobahnen und Kraftfahrstraßen. Das Zeichen steht 300 m, 200 m (wie abgebildet) und 100 m vor einem Autobahnknotenpunkt (Autobahnanschlussstelle, Autobahnkreuz oder Autobahndreieck). Es steht auch vor einer bewirtschafteten Rastanlage. Vor einem Knotenpunkt kann auf der 300 m-Bake die Nummer des Knotenpunktes angezeigt sein.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Ankündigungsbake",
          "keywords": [
            "450",
            "ankündigungsbake"
          ]
        },
        {
          "label": "Das Zeichen steht 300 m, 200 m (wie abgebildet) und 100 m vor einem Autobahnknotenpunkt …",
          "keywords": [
            "300 m",
            "200 m",
            "100 m",
            "autobahnanschlussstelle"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 21"
    },
    {
      "id": "vz-340",
      "subject": "zeichen",
      "sign": "340",
      "signLabel": "Zeichen 340",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "22",
      "name": "Leitlinie",
      "category": "Richtzeichen (Anlage 3), Markierungen",
      "topic": "Zeichen 340 – Leitlinie",
      "question": "Welche Markierung ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x661"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "1. Wer ein Fahrzeug führt, darf Leitlinien nicht überfahren, wenn dadurch der Verkehr gefährdet wird. 2. Wer ein Fahrzeug führt, darf auf der Fahrbahn durch Leitlinien markierte Schutzstreifen für den Radverkehr nur bei Bedarf überfahren, insbesondere um dem Gegenverkehr auszuweichen. Der Radverkehr darf dabei nicht gefährdet werden. 3. Auf durch Leitlinien markierten Schutzstreifen für den Radverkehr darf nicht gehalten werden. Satz 1 gilt nicht für Fahrräder und Elektrokleinstfahrzeuge im Sinne der eKFV."
        },
        {
          "type": "erlaeuterung",
          "text": "Der Schutzstreifen für den Radverkehr ist in regelmäßigen Abständen mit dem Sinnbild \"Radverkehr\" auf der Fahrbahn gekennzeichnet."
        }
      ],
      "modelAnswer": "Das ist Zeichen 340 „Leitlinie“ – Richtzeichen (Anlage 3), Markierungen. 1. Wer ein Fahrzeug führt, darf Leitlinien nicht überfahren, wenn dadurch der Verkehr gefährdet wird. 2. Wer ein Fahrzeug führt, darf auf der Fahrbahn durch Leitlinien markierte Schutzstreifen für den Radverkehr nur bei Bedarf überfahren, insbesondere um dem Gegenverkehr auszuweichen. Der Radverkehr darf dabei nicht gefährdet werden. 3. Auf durch Leitlinien markierten Schutzstreifen für den Radverkehr darf nicht gehalten werden. Satz 1 gilt nicht für Fahrräder und Elektrokleinstfahrzeuge im Sinne der eKFV. Der Schutzstreifen für den Radverkehr ist in regelmäßigen Abständen mit dem Sinnbild \"Radverkehr\" auf der Fahrbahn gekennzeichnet.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Leitlinie",
          "keywords": [
            "340",
            "leitlinie"
          ]
        },
        {
          "label": "1. Wer ein Fahrzeug führt, darf Leitlinien nicht überfahren, wenn dadurch der Verkehr gefährdet wird.",
          "keywords": [
            "leitlinien",
            "überfahren",
            "gefährdet"
          ]
        },
        {
          "label": "2. Wer ein Fahrzeug führt, darf auf der Fahrbahn durch Leitlinien markierte Schutzstreifen für den …",
          "keywords": [
            "schutzstreifen",
            "gegenverkehr",
            "auszuweichen",
            "leitlinien"
          ]
        },
        {
          "label": "3. Auf durch Leitlinien markierten Schutzstreifen für den Radverkehr darf nicht gehalten werden. Satz 1 gilt …",
          "keywords": [
            "elektrokleinstfahrzeuge",
            "schutzstreifen",
            "leitlinien",
            "markierten"
          ]
        },
        {
          "label": "Der Schutzstreifen für den Radverkehr ist in regelmäßigen Abständen mit dem Sinnbild \"Radverkehr\" auf der …",
          "keywords": [
            "schutzstreifen",
            "regelmäßigen",
            "radverkehr",
            "abständen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 22"
    },
    {
      "id": "vz-341",
      "subject": "zeichen",
      "sign": "341",
      "signLabel": "Zeichen 341",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "23",
      "name": "Wartelinie",
      "category": "Richtzeichen (Anlage 3), Markierungen",
      "topic": "Zeichen 341 – Wartelinie",
      "question": "Welche Markierung ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x662"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Die Wartelinie empfiehlt dem Wartepflichtigen, an dieser Stelle zu warten."
        }
      ],
      "modelAnswer": "Das ist Zeichen 341 „Wartelinie“ – Richtzeichen (Anlage 3), Markierungen. Die Wartelinie empfiehlt dem Wartepflichtigen, an dieser Stelle zu warten.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Wartelinie",
          "keywords": [
            "341",
            "wartelinie"
          ]
        },
        {
          "label": "Die Wartelinie empfiehlt dem Wartepflichtigen, an dieser Stelle zu warten.",
          "keywords": [
            "wartepflichtigen",
            "wartelinie",
            "empfiehlt",
            "stelle"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 23"
    },
    {
      "id": "vz-342",
      "subject": "zeichen",
      "sign": "342",
      "signLabel": "Zeichen 342",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "23.1",
      "name": "Haifischzähne",
      "category": "Richtzeichen (Anlage 3), Markierungen",
      "topic": "Zeichen 342 – Haifischzähne",
      "question": "Welche Markierung ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x670"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Die Markierung hebt eine Wartepflicht infolge einer bestehenden Rechts-vor-links-Regelung abseits der Bundes-, Landes- und Kreisstraßen sowie weiterer Hauptverkehrsstraßen und eine durch Zeichen 205 oder 206 angeordnete Vorfahrtberechtigung des Radverkehrs im Zuge von Kreuzungen oder Einmündungen von Radschnellwegen hervor. Im Fall dieser Vorfahrtberechtigung des Radverkehrs sind die Markierungen auf beiden Seiten entlang der Fahrbahnkanten des Radschnellwegs mit den Spitzen in Richtung des wartepflichtigen Verkehrs anzuordnen."
        }
      ],
      "modelAnswer": "Das ist Zeichen 342 „Haifischzähne“ – Richtzeichen (Anlage 3), Markierungen. Die Markierung hebt eine Wartepflicht infolge einer bestehenden Rechts-vor-links-Regelung abseits der Bundes-, Landes- und Kreisstraßen sowie weiterer Hauptverkehrsstraßen und eine durch Zeichen 205 oder 206 angeordnete Vorfahrtberechtigung des Radverkehrs im Zuge von Kreuzungen oder Einmündungen von Radschnellwegen hervor. Im Fall dieser Vorfahrtberechtigung des Radverkehrs sind die Markierungen auf beiden Seiten entlang der Fahrbahnkanten des Radschnellwegs mit den Spitzen in Richtung des wartepflichtigen Verkehrs anzuordnen.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Haifischzähne",
          "keywords": [
            "342",
            "haifischzähne"
          ]
        },
        {
          "label": "Die Markierung hebt eine Wartepflicht infolge einer bestehenden Rechts-vor-links-Regelung abseits der …",
          "keywords": [
            "rechts-vor-links-regelung",
            "hauptverkehrsstraßen",
            "vorfahrtberechtigung",
            "wartepflichtigen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 23.1"
    },
    {
      "id": "vz-350",
      "subject": "zeichen",
      "sign": "350",
      "signLabel": "Zeichen 350",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "24",
      "name": "Fußgängerüberweg",
      "category": "Richtzeichen (Anlage 3), Hinweise",
      "topic": "Zeichen 350 – Fußgängerüberweg",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x671"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 350 „Fußgängerüberweg“ – Richtzeichen (Anlage 3), Hinweise.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Fußgängerüberweg",
          "keywords": [
            "350",
            "fußgängerüberweg"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 24"
    },
    {
      "id": "vz-350-1",
      "subject": "zeichen",
      "sign": "350.1",
      "signLabel": "Zeichen 350.1",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "24.1",
      "name": "Radschnellweg",
      "category": "Richtzeichen (Anlage 3), Hinweise",
      "topic": "Zeichen 350.1 – Radschnellweg",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x679"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Das Zeichen steht an Radschnellwegen. Es dient der Unterrichtung über den Beginn von Radschnellwegen und der Führung von Radschnellwegen an Knotenpunkten."
        }
      ],
      "modelAnswer": "Das ist Zeichen 350.1 „Radschnellweg“ – Richtzeichen (Anlage 3), Hinweise. Das Zeichen steht an Radschnellwegen. Es dient der Unterrichtung über den Beginn von Radschnellwegen und der Führung von Radschnellwegen an Knotenpunkten.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Radschnellweg",
          "keywords": [
            "350.1",
            "radschnellweg"
          ]
        },
        {
          "label": "Das Zeichen steht an Radschnellwegen. Es dient der Unterrichtung über den Beginn von Radschnellwegen und der …",
          "keywords": [
            "radschnellwegen",
            "unterrichtung",
            "knotenpunkten",
            "führung"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 24.1"
    },
    {
      "id": "vz-350-2",
      "subject": "zeichen",
      "sign": "350.2",
      "signLabel": "Zeichen 350.2",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "24.2",
      "name": "Ende des Radschnellwegs",
      "category": "Richtzeichen (Anlage 3), Hinweise",
      "topic": "Zeichen 350.2 – Ende des Radschnellwegs",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x680"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 350.2 „Ende des Radschnellwegs“ – Richtzeichen (Anlage 3), Hinweise.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Ende des Radschnellwegs",
          "keywords": [
            "350.2",
            "radschnellwegs",
            "ende des radschnellwegs"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 24.2"
    },
    {
      "id": "vz-354",
      "subject": "zeichen",
      "sign": "354",
      "signLabel": "Zeichen 354",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "25",
      "name": "Wasserschutzgebiet",
      "category": "Richtzeichen (Anlage 3), Hinweise",
      "topic": "Zeichen 354 – Wasserschutzgebiet",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x681"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 354 „Wasserschutzgebiet“ – Richtzeichen (Anlage 3), Hinweise.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Wasserschutzgebiet",
          "keywords": [
            "354",
            "wasserschutzgebiet"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 25"
    },
    {
      "id": "vz-356",
      "subject": "zeichen",
      "sign": "356",
      "signLabel": "Zeichen 356",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "26",
      "name": "Verkehrshelfer",
      "category": "Richtzeichen (Anlage 3), Hinweise",
      "topic": "Zeichen 356 – Verkehrshelfer",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x689"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 356 „Verkehrshelfer“ – Richtzeichen (Anlage 3), Hinweise.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Verkehrshelfer",
          "keywords": [
            "356",
            "verkehrshelfer"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 26"
    },
    {
      "id": "vz-357",
      "subject": "zeichen",
      "sign": "357",
      "signLabel": "Zeichen 357",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "27",
      "name": "Sackgasse",
      "category": "Richtzeichen (Anlage 3), Hinweise",
      "topic": "Zeichen 357 – Sackgasse",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x690"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Im oberen Teil des Verkehrszeichens kann die Durchlässigkeit der Sackgasse für den Radverkehr und/oder Fußgängerverkehr durch Piktogramme angezeigt sein."
        }
      ],
      "modelAnswer": "Das ist Zeichen 357 „Sackgasse“ – Richtzeichen (Anlage 3), Hinweise. Im oberen Teil des Verkehrszeichens kann die Durchlässigkeit der Sackgasse für den Radverkehr und/oder Fußgängerverkehr durch Piktogramme angezeigt sein.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Sackgasse",
          "keywords": [
            "357",
            "sackgasse"
          ]
        },
        {
          "label": "Im oberen Teil des Verkehrszeichens kann die Durchlässigkeit der Sackgasse für den Radverkehr und/oder …",
          "keywords": [
            "verkehrszeichens",
            "fußgängerverkehr",
            "durchlässigkeit",
            "piktogramme"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 27"
    },
    {
      "id": "vz-358",
      "subject": "zeichen",
      "sign": "358",
      "signLabel": "Zeichen 358",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "28",
      "name": "Erste Hilfe",
      "category": "Richtzeichen (Anlage 3), Hinweise",
      "topic": "Zeichen 358 – Erste Hilfe",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x698"
      ],
      "official": [
        {
          "type": "allgemein",
          "text": "1. Durch solche Zeichen mit entsprechenden Sinnbildern können auch andere Hinweise gegeben werden, wie auf Fußgängerunter- oder -überführung, Fernsprecher, Notrufsäule, Pannenhilfe, Tankstellen, Zelt- und Wohnwagenplätze, Autobahnhotel, Autobahngasthaus, Autobahnkiosk. 2. Auf Hotels, Gasthäuser und Kioske wird nur auf Autobahnen und nur dann hingewiesen, wenn es sich um Autobahnanlagen oder Autohöfe handelt."
        }
      ],
      "modelAnswer": "Das ist Zeichen 358 „Erste Hilfe“ – Richtzeichen (Anlage 3), Hinweise. 1. Durch solche Zeichen mit entsprechenden Sinnbildern können auch andere Hinweise gegeben werden, wie auf Fußgängerunter- oder -überführung, Fernsprecher, Notrufsäule, Pannenhilfe, Tankstellen, Zelt- und Wohnwagenplätze, Autobahnhotel, Autobahngasthaus, Autobahnkiosk. 2. Auf Hotels, Gasthäuser und Kioske wird nur auf Autobahnen und nur dann hingewiesen, wenn es sich um Autobahnanlagen oder Autohöfe handelt.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Erste Hilfe",
          "keywords": [
            "358",
            "erste",
            "hilfe",
            "erste hilfe"
          ]
        },
        {
          "label": "1. Durch solche Zeichen mit entsprechenden Sinnbildern können auch andere Hinweise gegeben werden, wie auf …",
          "keywords": [
            "autobahngasthaus",
            "wohnwagenplätze",
            "entsprechenden",
            "fußgängerunter"
          ]
        },
        {
          "label": "2. Auf Hotels, Gasthäuser und Kioske wird nur auf Autobahnen und nur dann hingewiesen, wenn es sich um …",
          "keywords": [
            "autobahnanlagen",
            "hingewiesen",
            "gasthäuser",
            "autobahnen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 28"
    },
    {
      "id": "vz-363",
      "subject": "zeichen",
      "sign": "363",
      "signLabel": "Zeichen 363",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "29",
      "name": "Polizei",
      "category": "Richtzeichen (Anlage 3), Hinweise",
      "topic": "Zeichen 363 – Polizei",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x699"
      ],
      "official": [
        {
          "type": "allgemein",
          "text": "1. Durch solche Zeichen mit entsprechenden Sinnbildern können auch andere Hinweise gegeben werden, wie auf Fußgängerunter- oder -überführung, Fernsprecher, Notrufsäule, Pannenhilfe, Tankstellen, Zelt- und Wohnwagenplätze, Autobahnhotel, Autobahngasthaus, Autobahnkiosk. 2. Auf Hotels, Gasthäuser und Kioske wird nur auf Autobahnen und nur dann hingewiesen, wenn es sich um Autobahnanlagen oder Autohöfe handelt."
        }
      ],
      "modelAnswer": "Das ist Zeichen 363 „Polizei“ – Richtzeichen (Anlage 3), Hinweise. 1. Durch solche Zeichen mit entsprechenden Sinnbildern können auch andere Hinweise gegeben werden, wie auf Fußgängerunter- oder -überführung, Fernsprecher, Notrufsäule, Pannenhilfe, Tankstellen, Zelt- und Wohnwagenplätze, Autobahnhotel, Autobahngasthaus, Autobahnkiosk. 2. Auf Hotels, Gasthäuser und Kioske wird nur auf Autobahnen und nur dann hingewiesen, wenn es sich um Autobahnanlagen oder Autohöfe handelt.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Polizei",
          "keywords": [
            "363",
            "polizei"
          ]
        },
        {
          "label": "1. Durch solche Zeichen mit entsprechenden Sinnbildern können auch andere Hinweise gegeben werden, wie auf …",
          "keywords": [
            "autobahngasthaus",
            "wohnwagenplätze",
            "entsprechenden",
            "fußgängerunter"
          ]
        },
        {
          "label": "2. Auf Hotels, Gasthäuser und Kioske wird nur auf Autobahnen und nur dann hingewiesen, wenn es sich um …",
          "keywords": [
            "autobahnanlagen",
            "hingewiesen",
            "gasthäuser",
            "autobahnen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 29"
    },
    {
      "id": "vz-385",
      "subject": "zeichen",
      "sign": "385",
      "signLabel": "Zeichen 385",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "30",
      "name": "Ortshinweistafel",
      "category": "Richtzeichen (Anlage 3), Hinweise",
      "topic": "Zeichen 385 – Ortshinweistafel",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x700"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 385 „Ortshinweistafel“ – Richtzeichen (Anlage 3), Hinweise.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Ortshinweistafel",
          "keywords": [
            "385",
            "ortshinweistafel"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 30"
    },
    {
      "id": "vz-386-1",
      "subject": "zeichen",
      "sign": "386.1",
      "signLabel": "Zeichen 386.1",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "31",
      "name": "Touristischer Hinweis",
      "category": "Richtzeichen (Anlage 3), Hinweise",
      "topic": "Zeichen 386.1 – Touristischer Hinweis",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x710"
      ],
      "official": [
        {
          "type": "allgemein",
          "text": "Die Zeichen stehen außerhalb von Autobahnen. Sie dienen dem Hinweis auf touristisch bedeutsame Ziele und der Kennzeichnung des Verlaufs touristischer Routen. Sie können auch als Wegweiser ausgeführt sein."
        }
      ],
      "modelAnswer": "Das ist Zeichen 386.1 „Touristischer Hinweis“ – Richtzeichen (Anlage 3), Hinweise. Die Zeichen stehen außerhalb von Autobahnen. Sie dienen dem Hinweis auf touristisch bedeutsame Ziele und der Kennzeichnung des Verlaufs touristischer Routen. Sie können auch als Wegweiser ausgeführt sein.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Touristischer Hinweis",
          "keywords": [
            "386.1",
            "hinweis",
            "touristischer",
            "touristischer hinweis"
          ]
        },
        {
          "label": "Die Zeichen stehen außerhalb von Autobahnen. Sie dienen dem Hinweis auf touristisch bedeutsame Ziele und der …",
          "keywords": [
            "kennzeichnung",
            "touristischer",
            "touristisch",
            "autobahnen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 31"
    },
    {
      "id": "vz-386-2",
      "subject": "zeichen",
      "sign": "386.2",
      "signLabel": "Zeichen 386.2",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "32",
      "name": "Touristische Route",
      "category": "Richtzeichen (Anlage 3), Hinweise",
      "topic": "Zeichen 386.2 – Touristische Route",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x711"
      ],
      "official": [
        {
          "type": "allgemein",
          "text": "Die Zeichen stehen außerhalb von Autobahnen. Sie dienen dem Hinweis auf touristisch bedeutsame Ziele und der Kennzeichnung des Verlaufs touristischer Routen. Sie können auch als Wegweiser ausgeführt sein."
        }
      ],
      "modelAnswer": "Das ist Zeichen 386.2 „Touristische Route“ – Richtzeichen (Anlage 3), Hinweise. Die Zeichen stehen außerhalb von Autobahnen. Sie dienen dem Hinweis auf touristisch bedeutsame Ziele und der Kennzeichnung des Verlaufs touristischer Routen. Sie können auch als Wegweiser ausgeführt sein.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Touristische Route",
          "keywords": [
            "386.2",
            "route",
            "touristische",
            "touristische route"
          ]
        },
        {
          "label": "Die Zeichen stehen außerhalb von Autobahnen. Sie dienen dem Hinweis auf touristisch bedeutsame Ziele und der …",
          "keywords": [
            "kennzeichnung",
            "touristischer",
            "touristisch",
            "autobahnen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 32"
    },
    {
      "id": "vz-386-3",
      "subject": "zeichen",
      "sign": "386.3",
      "signLabel": "Zeichen 386.3",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "33",
      "name": "Touristische Unterrichtungstafel",
      "category": "Richtzeichen (Anlage 3), Hinweise",
      "topic": "Zeichen 386.3 – Touristische Unterrichtungstafel",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x712"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Das Zeichen steht an der Autobahn. Es dient der Unterrichtung über touristisch bedeutsame Ziele."
        }
      ],
      "modelAnswer": "Das ist Zeichen 386.3 „Touristische Unterrichtungstafel“ – Richtzeichen (Anlage 3), Hinweise. Das Zeichen steht an der Autobahn. Es dient der Unterrichtung über touristisch bedeutsame Ziele.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Touristische Unterrichtungstafel",
          "keywords": [
            "386.3",
            "touristische",
            "unterrichtungstafel",
            "touristische unterrichtungstafel"
          ]
        },
        {
          "label": "Das Zeichen steht an der Autobahn. Es dient der Unterrichtung über touristisch bedeutsame Ziele.",
          "keywords": [
            "unterrichtung",
            "touristisch",
            "bedeutsame",
            "autobahn"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 33"
    },
    {
      "id": "vz-390",
      "subject": "zeichen",
      "sign": "390",
      "signLabel": "Zeichen 390",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "34",
      "name": "Mautpflicht nach dem Bundesfernstraßenmautgesetz",
      "category": "Richtzeichen (Anlage 3), Hinweise",
      "topic": "Zeichen 390 – Mautpflicht nach dem Bundesfernstraßenmautgesetz",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x713"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 390 „Mautpflicht nach dem Bundesfernstraßenmautgesetz“ – Richtzeichen (Anlage 3), Hinweise.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Mautpflicht nach dem Bundesfernstraßenmautgesetz",
          "keywords": [
            "390",
            "mautpflicht",
            "bundesfernstraßenmautgesetz",
            "mautpflicht nach dem bundesfernstraßenmautgesetz"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 34"
    },
    {
      "id": "vz-391",
      "subject": "zeichen",
      "sign": "391",
      "signLabel": "Zeichen 391",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "35",
      "name": "Mautpflichtige Strecke",
      "category": "Richtzeichen (Anlage 3), Hinweise",
      "topic": "Zeichen 391 – Mautpflichtige Strecke",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x725"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 391 „Mautpflichtige Strecke“ – Richtzeichen (Anlage 3), Hinweise.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Mautpflichtige Strecke",
          "keywords": [
            "391",
            "strecke",
            "mautpflichtige",
            "mautpflichtige strecke"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 35"
    },
    {
      "id": "vz-392",
      "subject": "zeichen",
      "sign": "392",
      "signLabel": "Zeichen 392",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "36",
      "name": "Zollstelle",
      "category": "Richtzeichen (Anlage 3), Hinweise",
      "topic": "Zeichen 392 – Zollstelle",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x726"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 392 „Zollstelle“ – Richtzeichen (Anlage 3), Hinweise.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Zollstelle",
          "keywords": [
            "392",
            "zollstelle"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 36"
    },
    {
      "id": "vz-393",
      "subject": "zeichen",
      "sign": "393",
      "signLabel": "Zeichen 393",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "37",
      "name": "Informationstafel an Grenzübergangsstellen",
      "category": "Richtzeichen (Anlage 3), Hinweise",
      "topic": "Zeichen 393 – Informationstafel an Grenzübergangsstellen",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x727"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 393 „Informationstafel an Grenzübergangsstellen“ – Richtzeichen (Anlage 3), Hinweise.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Informationstafel an Grenzübergangsstellen",
          "keywords": [
            "393",
            "informationstafel",
            "grenzübergangsstellen",
            "informationstafel an grenzübergangsstellen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 37"
    },
    {
      "id": "vz-394",
      "subject": "zeichen",
      "sign": "394",
      "signLabel": "Zeichen 394",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "38",
      "name": "Laternenring",
      "category": "Richtzeichen (Anlage 3), Hinweise",
      "topic": "Zeichen 394 – Laternenring",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x728"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Das Zeichen kennzeichnet innerhalb geschlossener Ortschaften Laternen, die nicht die ganze Nacht leuchten. In dem roten Feld kann in weißer Schrift angegeben sein, wann die Laterne erlischt."
        }
      ],
      "modelAnswer": "Das ist Zeichen 394 „Laternenring“ – Richtzeichen (Anlage 3), Hinweise. Das Zeichen kennzeichnet innerhalb geschlossener Ortschaften Laternen, die nicht die ganze Nacht leuchten. In dem roten Feld kann in weißer Schrift angegeben sein, wann die Laterne erlischt.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Laternenring",
          "keywords": [
            "394",
            "laternenring"
          ]
        },
        {
          "label": "Das Zeichen kennzeichnet innerhalb geschlossener Ortschaften Laternen, die nicht die ganze Nacht leuchten. …",
          "keywords": [
            "geschlossener",
            "kennzeichnet",
            "ortschaften",
            "laternen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 38"
    },
    {
      "id": "vz-401",
      "subject": "zeichen",
      "sign": "401",
      "signLabel": "Zeichen 401",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "39",
      "name": "Bundesstraßen",
      "category": "Richtzeichen (Anlage 3), Wegweisung",
      "topic": "Zeichen 401 – Bundesstraßen",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x740"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 401 „Bundesstraßen“ – Richtzeichen (Anlage 3), Wegweisung.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Bundesstraßen",
          "keywords": [
            "401",
            "bundesstraßen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 39"
    },
    {
      "id": "vz-405",
      "subject": "zeichen",
      "sign": "405",
      "signLabel": "Zeichen 405",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "40",
      "name": "Autobahnen",
      "category": "Richtzeichen (Anlage 3), Wegweisung",
      "topic": "Zeichen 405 – Autobahnen",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x741"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 405 „Autobahnen“ – Richtzeichen (Anlage 3), Wegweisung.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Autobahnen",
          "keywords": [
            "405",
            "autobahnen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 40"
    },
    {
      "id": "vz-406",
      "subject": "zeichen",
      "sign": "406",
      "signLabel": "Zeichen 406",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "41",
      "name": "Knotenpunkte der Autobahnen",
      "category": "Richtzeichen (Anlage 3), Wegweisung",
      "topic": "Zeichen 406 – Knotenpunkte der Autobahnen",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x742"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "So sind Knotenpunkte der Autobahnen (Autobahnausfahrten, Autobahnkreuze und Autobahndreiecke) beziffert."
        }
      ],
      "modelAnswer": "Das ist Zeichen 406 „Knotenpunkte der Autobahnen“ – Richtzeichen (Anlage 3), Wegweisung. So sind Knotenpunkte der Autobahnen (Autobahnausfahrten, Autobahnkreuze und Autobahndreiecke) beziffert.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Knotenpunkte der Autobahnen",
          "keywords": [
            "406",
            "autobahnen",
            "knotenpunkte",
            "knotenpunkte der autobahnen"
          ]
        },
        {
          "label": "So sind Knotenpunkte der Autobahnen (Autobahnausfahrten, Autobahnkreuze und Autobahndreiecke) beziffert.",
          "keywords": [
            "autobahnausfahrten",
            "autobahndreiecke",
            "autobahnkreuze",
            "knotenpunkte"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 41"
    },
    {
      "id": "vz-410",
      "subject": "zeichen",
      "sign": "410",
      "signLabel": "Zeichen 410",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "42",
      "name": "Europastraßen",
      "category": "Richtzeichen (Anlage 3), Wegweisung",
      "topic": "Zeichen 410 – Europastraßen",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x743"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 410 „Europastraßen“ – Richtzeichen (Anlage 3), Wegweisung.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Europastraßen",
          "keywords": [
            "410",
            "europastraßen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 42"
    },
    {
      "id": "vz-438",
      "subject": "zeichen",
      "sign": "438",
      "signLabel": "Zeichen 438",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "43",
      "name": "Vorwegweiser",
      "category": "Richtzeichen (Anlage 3), Wegweisung",
      "topic": "Zeichen 438 – Vorwegweiser",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x755"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 438 „Vorwegweiser“ – Richtzeichen (Anlage 3), Wegweisung.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Vorwegweiser",
          "keywords": [
            "438",
            "vorwegweiser"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 43"
    },
    {
      "id": "vz-439",
      "subject": "zeichen",
      "sign": "439",
      "signLabel": "Zeichen 439",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "44",
      "name": "Vorwegweiser",
      "category": "Richtzeichen (Anlage 3), Wegweisung",
      "topic": "Zeichen 439 – Vorwegweiser",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x756"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 439 „Vorwegweiser“ – Richtzeichen (Anlage 3), Wegweisung.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Vorwegweiser",
          "keywords": [
            "439",
            "vorwegweiser"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 44"
    },
    {
      "id": "vz-440",
      "subject": "zeichen",
      "sign": "440",
      "signLabel": "Zeichen 440",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "45",
      "name": "Vorwegweiser",
      "category": "Richtzeichen (Anlage 3), Wegweisung",
      "topic": "Zeichen 440 – Vorwegweiser",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x757"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 440 „Vorwegweiser“ – Richtzeichen (Anlage 3), Wegweisung.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Vorwegweiser",
          "keywords": [
            "440",
            "vorwegweiser"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 45"
    },
    {
      "id": "vz-441",
      "subject": "zeichen",
      "sign": "441",
      "signLabel": "Zeichen 441",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "46",
      "name": "Vorwegweiser",
      "category": "Richtzeichen (Anlage 3), Wegweisung",
      "topic": "Zeichen 441 – Vorwegweiser",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x758"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 441 „Vorwegweiser“ – Richtzeichen (Anlage 3), Wegweisung.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Vorwegweiser",
          "keywords": [
            "441",
            "vorwegweiser"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 46"
    },
    {
      "id": "vz-415",
      "subject": "zeichen",
      "sign": "415",
      "signLabel": "Zeichen 415",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "47",
      "name": "Pfeilwegweiser auf Bundesstraßen",
      "category": "Richtzeichen (Anlage 3), Wegweisung",
      "topic": "Zeichen 415 – Pfeilwegweiser auf Bundesstraßen",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x770"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Pfeilwegweiser auf Bundesstraßen"
        },
        {
          "type": "allgemein",
          "text": "Das Zusatzzeichen \"Nebenstrecke\" oder der Zusatz \"Nebenstrecke\" im Wegweiser weist auf eine Straßenverbindung von untergeordneter Bedeutung hin."
        }
      ],
      "modelAnswer": "Das ist Zeichen 415 „Pfeilwegweiser auf Bundesstraßen“ – Richtzeichen (Anlage 3), Wegweisung. Pfeilwegweiser auf Bundesstraßen. Das Zusatzzeichen \"Nebenstrecke\" oder der Zusatz \"Nebenstrecke\" im Wegweiser weist auf eine Straßenverbindung von untergeordneter Bedeutung hin.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Pfeilwegweiser auf Bundesstraßen",
          "keywords": [
            "415",
            "bundesstraßen",
            "pfeilwegweiser",
            "pfeilwegweiser auf bundesstraßen"
          ]
        },
        {
          "label": "Pfeilwegweiser auf Bundesstraßen",
          "keywords": [
            "pfeilwegweiser",
            "bundesstraßen"
          ]
        },
        {
          "label": "Das Zusatzzeichen \"Nebenstrecke\" oder der Zusatz \"Nebenstrecke\" im Wegweiser weist auf eine …",
          "keywords": [
            "straßenverbindung",
            "untergeordneter",
            "nebenstrecke",
            "wegweiser"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 47"
    },
    {
      "id": "vz-418",
      "subject": "zeichen",
      "sign": "418",
      "signLabel": "Zeichen 418",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "48",
      "name": "Pfeilwegweiser auf sonstigen Straßen",
      "category": "Richtzeichen (Anlage 3), Wegweisung",
      "topic": "Zeichen 418 – Pfeilwegweiser auf sonstigen Straßen",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x771"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Pfeilwegweiser auf sonstigen Straßen"
        },
        {
          "type": "allgemein",
          "text": "Das Zusatzzeichen \"Nebenstrecke\" oder der Zusatz \"Nebenstrecke\" im Wegweiser weist auf eine Straßenverbindung von untergeordneter Bedeutung hin."
        }
      ],
      "modelAnswer": "Das ist Zeichen 418 „Pfeilwegweiser auf sonstigen Straßen“ – Richtzeichen (Anlage 3), Wegweisung. Pfeilwegweiser auf sonstigen Straßen. Das Zusatzzeichen \"Nebenstrecke\" oder der Zusatz \"Nebenstrecke\" im Wegweiser weist auf eine Straßenverbindung von untergeordneter Bedeutung hin.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Pfeilwegweiser auf sonstigen Straßen",
          "keywords": [
            "418",
            "straßen",
            "pfeilwegweiser",
            "pfeilwegweiser auf sonstigen straßen"
          ]
        },
        {
          "label": "Pfeilwegweiser auf sonstigen Straßen",
          "keywords": [
            "pfeilwegweiser",
            "straßen"
          ]
        },
        {
          "label": "Das Zusatzzeichen \"Nebenstrecke\" oder der Zusatz \"Nebenstrecke\" im Wegweiser weist auf eine …",
          "keywords": [
            "straßenverbindung",
            "untergeordneter",
            "nebenstrecke",
            "wegweiser"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 48"
    },
    {
      "id": "vz-419",
      "subject": "zeichen",
      "sign": "419",
      "signLabel": "Zeichen 419",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "49",
      "name": "Pfeilwegweiser auf sonstigen Straßen mit geringerer Verkehrsbedeutung",
      "category": "Richtzeichen (Anlage 3), Wegweisung",
      "topic": "Zeichen 419 – Pfeilwegweiser auf sonstigen Straßen mit geringerer Verkehrsbedeutung",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x772"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Pfeilwegweiser auf sonstigen Straßen mit geringerer Verkehrsbedeutung"
        },
        {
          "type": "allgemein",
          "text": "Das Zusatzzeichen \"Nebenstrecke\" oder der Zusatz \"Nebenstrecke\" im Wegweiser weist auf eine Straßenverbindung von untergeordneter Bedeutung hin."
        }
      ],
      "modelAnswer": "Das ist Zeichen 419 „Pfeilwegweiser auf sonstigen Straßen mit geringerer Verkehrsbedeutung“ – Richtzeichen (Anlage 3), Wegweisung. Pfeilwegweiser auf sonstigen Straßen mit geringerer Verkehrsbedeutung. Das Zusatzzeichen \"Nebenstrecke\" oder der Zusatz \"Nebenstrecke\" im Wegweiser weist auf eine Straßenverbindung von untergeordneter Bedeutung hin.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Pfeilwegweiser auf sonstigen Straßen mit geringerer Verkehrsbedeutung",
          "keywords": [
            "419",
            "geringerer",
            "pfeilwegweiser",
            "verkehrsbedeutung",
            "pfeilwegweiser auf sonstigen straßen mit geringerer verkehrsbedeutung"
          ]
        },
        {
          "label": "Pfeilwegweiser auf sonstigen Straßen mit geringerer Verkehrsbedeutung",
          "keywords": [
            "verkehrsbedeutung",
            "pfeilwegweiser",
            "geringerer",
            "straßen"
          ]
        },
        {
          "label": "Das Zusatzzeichen \"Nebenstrecke\" oder der Zusatz \"Nebenstrecke\" im Wegweiser weist auf eine …",
          "keywords": [
            "straßenverbindung",
            "untergeordneter",
            "nebenstrecke",
            "wegweiser"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 49"
    },
    {
      "id": "vz-430",
      "subject": "zeichen",
      "sign": "430",
      "signLabel": "Zeichen 430",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "50",
      "name": "Pfeilwegweiser zur Autobahn",
      "category": "Richtzeichen (Anlage 3), Wegweisung",
      "topic": "Zeichen 430 – Pfeilwegweiser zur Autobahn",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x773"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Pfeilwegweiser zur Autobahn"
        }
      ],
      "modelAnswer": "Das ist Zeichen 430 „Pfeilwegweiser zur Autobahn“ – Richtzeichen (Anlage 3), Wegweisung. Pfeilwegweiser zur Autobahn.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Pfeilwegweiser zur Autobahn",
          "keywords": [
            "430",
            "autobahn",
            "pfeilwegweiser",
            "pfeilwegweiser zur autobahn"
          ]
        },
        {
          "label": "Pfeilwegweiser zur Autobahn",
          "keywords": [
            "pfeilwegweiser",
            "autobahn"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 50"
    },
    {
      "id": "vz-432",
      "subject": "zeichen",
      "sign": "432",
      "signLabel": "Zeichen 432",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "51",
      "name": "Pfeilwegweiser zu Zielen mit erheblicher Verkehrsbedeutung",
      "category": "Richtzeichen (Anlage 3), Wegweisung",
      "topic": "Zeichen 432 – Pfeilwegweiser zu Zielen mit erheblicher Verkehrsbedeutung",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x774"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Pfeilwegweiser zu Zielen mit erheblicher Verkehrsbedeutung."
        }
      ],
      "modelAnswer": "Das ist Zeichen 432 „Pfeilwegweiser zu Zielen mit erheblicher Verkehrsbedeutung“ – Richtzeichen (Anlage 3), Wegweisung. Pfeilwegweiser zu Zielen mit erheblicher Verkehrsbedeutung.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Pfeilwegweiser zu Zielen mit erheblicher Verkehrsbedeutung",
          "keywords": [
            "432",
            "erheblicher",
            "pfeilwegweiser",
            "verkehrsbedeutung",
            "pfeilwegweiser zu zielen mit erheblicher verkehrsbedeutung"
          ]
        },
        {
          "label": "Pfeilwegweiser zu Zielen mit erheblicher Verkehrsbedeutung.",
          "keywords": [
            "verkehrsbedeutung",
            "pfeilwegweiser",
            "erheblicher",
            "zielen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 51"
    },
    {
      "id": "vz-434",
      "subject": "zeichen",
      "sign": "434",
      "signLabel": "Zeichen 434",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "52",
      "name": "Tabellenwegweiser",
      "category": "Richtzeichen (Anlage 3), Wegweisung",
      "topic": "Zeichen 434 – Tabellenwegweiser",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x789"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Der Tabellenwegweiser kann auch auf einer Tafel zusammengefasst sein. Die Zielangaben in einer Richtung können auch auf separaten Tafeln gezeigt werden."
        }
      ],
      "modelAnswer": "Das ist Zeichen 434 „Tabellenwegweiser“ – Richtzeichen (Anlage 3), Wegweisung. Der Tabellenwegweiser kann auch auf einer Tafel zusammengefasst sein. Die Zielangaben in einer Richtung können auch auf separaten Tafeln gezeigt werden.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Tabellenwegweiser",
          "keywords": [
            "434",
            "tabellenwegweiser"
          ]
        },
        {
          "label": "Der Tabellenwegweiser kann auch auf einer Tafel zusammengefasst sein. Die Zielangaben in einer Richtung …",
          "keywords": [
            "tabellenwegweiser",
            "zusammengefasst",
            "zielangaben",
            "separaten"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 52"
    },
    {
      "id": "vz-332-1",
      "subject": "zeichen",
      "sign": "332.1",
      "signLabel": "Zeichen 332.1",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "53",
      "name": "Ausfahrttafel (Kraftfahrstraße oder autobahnähnlich ausgebaute Straße)",
      "category": "Richtzeichen (Anlage 3), Wegweisung",
      "topic": "Zeichen 332.1 – Ausfahrttafel (Kraftfahrstraße oder autobahnähnlich ausgebaute Straße)",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x790"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Ausfahrt von der Kraftfahrstraße oder einer autobahnähnlich ausgebauten Straße. Das Zeichen kann innerhalb geschlossener Ortschaften auch mit weißem Grund ausgeführt sein."
        }
      ],
      "modelAnswer": "Das ist Zeichen 332.1 „Ausfahrttafel (Kraftfahrstraße oder autobahnähnlich ausgebaute Straße)“ – Richtzeichen (Anlage 3), Wegweisung. Ausfahrt von der Kraftfahrstraße oder einer autobahnähnlich ausgebauten Straße. Das Zeichen kann innerhalb geschlossener Ortschaften auch mit weißem Grund ausgeführt sein.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Ausfahrttafel (Kraftfahrstraße oder autobahnähnlich ausgebaute Straße)",
          "keywords": [
            "332.1",
            "ausfahrttafel",
            "kraftfahrstraße",
            "autobahnähnlich",
            "ausfahrttafel (kraftfahrstraße oder autobahnähnlich ausgebaute straße)"
          ]
        },
        {
          "label": "Ausfahrt von der Kraftfahrstraße oder einer autobahnähnlich ausgebauten Straße. Das Zeichen kann innerhalb …",
          "keywords": [
            "kraftfahrstraße",
            "autobahnähnlich",
            "geschlossener",
            "ausgebauten"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 53"
    },
    {
      "id": "vz-437",
      "subject": "zeichen",
      "sign": "437",
      "signLabel": "Zeichen 437",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "54",
      "name": "Straßennamensschild",
      "category": "Richtzeichen (Anlage 3), Wegweisung",
      "topic": "Zeichen 437 – Straßennamensschild",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x791"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Das Zeichen hat entweder weiße Schrift auf dunklem Grund oder schwarze Schrift auf hellem Grund. Es kann auch an Bauwerken angebracht sein."
        }
      ],
      "modelAnswer": "Das ist Zeichen 437 „Straßennamensschild“ – Richtzeichen (Anlage 3), Wegweisung. Das Zeichen hat entweder weiße Schrift auf dunklem Grund oder schwarze Schrift auf hellem Grund. Es kann auch an Bauwerken angebracht sein.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Straßennamensschild",
          "keywords": [
            "437",
            "straßennamensschild"
          ]
        },
        {
          "label": "Das Zeichen hat entweder weiße Schrift auf dunklem Grund oder schwarze Schrift auf hellem Grund. Es kann …",
          "keywords": [
            "bauwerken",
            "entweder",
            "schwarze",
            "schrift"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 54"
    },
    {
      "id": "vz-448",
      "subject": "zeichen",
      "sign": "448",
      "signLabel": "Zeichen 448",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "55",
      "name": "Ankündigungstafel (Autobahnausfahrt, -kreuz oder -dreieck)",
      "category": "Richtzeichen (Anlage 3), Wegweisung",
      "topic": "Zeichen 448 – Ankündigungstafel (Autobahnausfahrt, -kreuz oder -dreieck)",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x801"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Das Zeichen weist auf eine Autobahnausfahrt, ein Autobahnkreuz oder Autobahndreieck hin. Es schließt Zeichen 406 ein."
        },
        {
          "type": "allgemein",
          "text": "Die Nummer (Zeichen 406) ist die laufende Nummer der Autobahnausfahrten, Autobahnkreuze und Autobahndreiecke der gerade befahrenen Autobahn. Sie dient der besseren Orientierung."
        }
      ],
      "modelAnswer": "Das ist Zeichen 448 „Ankündigungstafel (Autobahnausfahrt, -kreuz oder -dreieck)“ – Richtzeichen (Anlage 3), Wegweisung. Das Zeichen weist auf eine Autobahnausfahrt, ein Autobahnkreuz oder Autobahndreieck hin. Es schließt Zeichen 406 ein. Die Nummer (Zeichen 406) ist die laufende Nummer der Autobahnausfahrten, Autobahnkreuze und Autobahndreiecke der gerade befahrenen Autobahn. Sie dient der besseren Orientierung.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Ankündigungstafel (Autobahnausfahrt, -kreuz oder -dreieck)",
          "keywords": [
            "448",
            "dreieck",
            "autobahnausfahrt",
            "ankündigungstafel",
            "ankündigungstafel (autobahnausfahrt, -kreuz oder -dreieck)"
          ]
        },
        {
          "label": "Das Zeichen weist auf eine Autobahnausfahrt, ein Autobahnkreuz oder Autobahndreieck hin. Es schließt Zeichen …",
          "keywords": [
            "autobahnausfahrt",
            "autobahndreieck",
            "autobahnkreuz",
            "schließt"
          ]
        },
        {
          "label": "Die Nummer (Zeichen 406) ist die laufende Nummer der Autobahnausfahrten, Autobahnkreuze und Autobahndreiecke …",
          "keywords": [
            "autobahnausfahrten",
            "autobahndreiecke",
            "autobahnkreuze",
            "orientierung"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 55"
    },
    {
      "id": "vz-z3-56",
      "subject": "zeichen",
      "sign": null,
      "signLabel": "Sinnbild",
      "kind": "Sinnbild",
      "anlage": 3,
      "lfd": "56",
      "name": "Ausfahrt (auf Ankündigungstafeln der Autobahn)",
      "category": "Sinnbild (Anlage 3), Wegweisung",
      "topic": "Sinnbild – Ausfahrt (auf Ankündigungstafeln der Autobahn)",
      "question": "Was bedeutet dieses Sinnbild auf Wegweisern der Autobahn?",
      "difficulty": 2,
      "images": [
        "x802"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Das Sinnbild weist auf eine Ausfahrt hin."
        }
      ],
      "modelAnswer": "Das ist Sinnbild „Ausfahrt (auf Ankündigungstafeln der Autobahn)“ – Sinnbild (Anlage 3), Wegweisung. Das Sinnbild weist auf eine Ausfahrt hin.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Ausfahrt (auf Ankündigungstafeln der Autobahn)",
          "keywords": [
            "autobahn",
            "ausfahrt",
            "ankündigungstafeln",
            "ausfahrt (auf ankündigungstafeln der autobahn)"
          ]
        },
        {
          "label": "Das Sinnbild weist auf eine Ausfahrt hin.",
          "keywords": [
            "sinnbild",
            "ausfahrt"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 56"
    },
    {
      "id": "vz-z3-57",
      "subject": "zeichen",
      "sign": null,
      "signLabel": "Sinnbild",
      "kind": "Sinnbild",
      "anlage": 3,
      "lfd": "57",
      "name": "Autobahnkreuz oder Autobahndreieck (auf Ankündigungstafeln)",
      "category": "Sinnbild (Anlage 3), Wegweisung",
      "topic": "Sinnbild – Autobahnkreuz oder Autobahndreieck (auf Ankündigungstafeln)",
      "question": "Was bedeutet dieses Sinnbild auf Wegweisern der Autobahn?",
      "difficulty": 2,
      "images": [
        "x803"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Das Sinnbild weist auf ein Autobahnkreuz oder Autobahndreieck hin; es weist auch auf Kreuze und Dreiecke von Autobahnen mit autobahnähnlich ausgebauten Straßen des nachgeordneten Netzes hin."
        }
      ],
      "modelAnswer": "Das ist Sinnbild „Autobahnkreuz oder Autobahndreieck (auf Ankündigungstafeln)“ – Sinnbild (Anlage 3), Wegweisung. Das Sinnbild weist auf ein Autobahnkreuz oder Autobahndreieck hin; es weist auch auf Kreuze und Dreiecke von Autobahnen mit autobahnähnlich ausgebauten Straßen des nachgeordneten Netzes hin.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Autobahnkreuz oder Autobahndreieck (auf Ankündigungstafeln)",
          "keywords": [
            "autobahnkreuz",
            "autobahndreieck",
            "ankündigungstafeln",
            "autobahnkreuz oder autobahndreieck (auf ankündigungstafeln)"
          ]
        },
        {
          "label": "Das Sinnbild weist auf ein Autobahnkreuz oder Autobahndreieck hin; es weist auch auf Kreuze und Dreiecke von …",
          "keywords": [
            "autobahndreieck",
            "autobahnähnlich",
            "nachgeordneten",
            "autobahnkreuz"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 57"
    },
    {
      "id": "vz-448-1",
      "subject": "zeichen",
      "sign": "448.1",
      "signLabel": "Zeichen 448.1",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "58",
      "name": "Ankündigung eines Autohofs",
      "category": "Richtzeichen (Anlage 3), Wegweisung",
      "topic": "Zeichen 448.1 – Ankündigung eines Autohofs",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x813"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "1. Mit dem Zeichen wird ein Autohof in unmittelbarer Nähe einer Autobahnausfahrt angekündigt. 2. Der Autohof wird einmal am rechten Fahrbahnrand 500 bis 1 000 m vor dem Zeichen 448 angekündigt. Auf einem Zusatzzeichen wird durch grafische Symbole der Leistungsumfang des Autohofs dargestellt."
        },
        {
          "type": "allgemein",
          "text": "Die Nummer (Zeichen 406) ist die laufende Nummer der Autobahnausfahrten, Autobahnkreuze und Autobahndreiecke der gerade befahrenen Autobahn. Sie dient der besseren Orientierung."
        }
      ],
      "modelAnswer": "Das ist Zeichen 448.1 „Ankündigung eines Autohofs“ – Richtzeichen (Anlage 3), Wegweisung. 1. Mit dem Zeichen wird ein Autohof in unmittelbarer Nähe einer Autobahnausfahrt angekündigt. 2. Der Autohof wird einmal am rechten Fahrbahnrand 500 bis 1 000 m vor dem Zeichen 448 angekündigt. Auf einem Zusatzzeichen wird durch grafische Symbole der Leistungsumfang des Autohofs dargestellt. Die Nummer (Zeichen 406) ist die laufende Nummer der Autobahnausfahrten, Autobahnkreuze und Autobahndreiecke der gerade befahrenen Autobahn. Sie dient der besseren Orientierung.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Ankündigung eines Autohofs",
          "keywords": [
            "448.1",
            "autohofs",
            "ankündigung",
            "ankündigung eines autohofs"
          ]
        },
        {
          "label": "1. Mit dem Zeichen wird ein Autohof in unmittelbarer Nähe einer Autobahnausfahrt angekündigt.",
          "keywords": [
            "autobahnausfahrt",
            "unmittelbarer",
            "angekündigt",
            "autohof"
          ]
        },
        {
          "label": "2. Der Autohof wird einmal am rechten Fahrbahnrand 500 bis 1 000 m vor dem Zeichen 448 angekündigt. Auf …",
          "keywords": [
            "000 m",
            "leistungsumfang",
            "fahrbahnrand",
            "angekündigt"
          ]
        },
        {
          "label": "Die Nummer (Zeichen 406) ist die laufende Nummer der Autobahnausfahrten, Autobahnkreuze und Autobahndreiecke …",
          "keywords": [
            "autobahnausfahrten",
            "autobahndreiecke",
            "autobahnkreuze",
            "orientierung"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 58"
    },
    {
      "id": "vz-449",
      "subject": "zeichen",
      "sign": "449",
      "signLabel": "Zeichen 449",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "59",
      "name": "Vorwegweiser auf Autobahnen",
      "category": "Richtzeichen (Anlage 3), Wegweisung",
      "topic": "Zeichen 449 – Vorwegweiser auf Autobahnen",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x814"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 449 „Vorwegweiser auf Autobahnen“ – Richtzeichen (Anlage 3), Wegweisung.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Vorwegweiser auf Autobahnen",
          "keywords": [
            "449",
            "autobahnen",
            "vorwegweiser",
            "vorwegweiser auf autobahnen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 59"
    },
    {
      "id": "vz-332",
      "subject": "zeichen",
      "sign": "332",
      "signLabel": "Zeichen 332",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "60",
      "name": "Ausfahrttafel auf Autobahnen",
      "category": "Richtzeichen (Anlage 3), Wegweisung",
      "topic": "Zeichen 332 – Ausfahrttafel auf Autobahnen",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x815"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 332 „Ausfahrttafel auf Autobahnen“ – Richtzeichen (Anlage 3), Wegweisung.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Ausfahrttafel auf Autobahnen",
          "keywords": [
            "332",
            "autobahnen",
            "ausfahrttafel",
            "ausfahrttafel auf autobahnen"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 60"
    },
    {
      "id": "vz-453",
      "subject": "zeichen",
      "sign": "453",
      "signLabel": "Zeichen 453",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "61",
      "name": "Entfernungstafel",
      "category": "Richtzeichen (Anlage 3), Wegweisung",
      "topic": "Zeichen 453 – Entfernungstafel",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x825"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Die Entfernungstafel gibt Fernziele und die Entfernung zur jeweiligen Ortsmitte an. Ziele, die über eine andere als die gerade befahrene Autobahn zu erreichen sind, werden unterhalb des waagerechten Striches angegeben."
        }
      ],
      "modelAnswer": "Das ist Zeichen 453 „Entfernungstafel“ – Richtzeichen (Anlage 3), Wegweisung. Die Entfernungstafel gibt Fernziele und die Entfernung zur jeweiligen Ortsmitte an. Ziele, die über eine andere als die gerade befahrene Autobahn zu erreichen sind, werden unterhalb des waagerechten Striches angegeben.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Entfernungstafel",
          "keywords": [
            "453",
            "entfernungstafel"
          ]
        },
        {
          "label": "Die Entfernungstafel gibt Fernziele und die Entfernung zur jeweiligen Ortsmitte an. Ziele, die über eine …",
          "keywords": [
            "entfernungstafel",
            "waagerechten",
            "entfernung",
            "fernziele"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 61"
    },
    {
      "id": "vz-442",
      "subject": "zeichen",
      "sign": "442",
      "signLabel": "Zeichen 442",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "62",
      "name": "Vorwegweiser für bestimmte Verkehrsarten",
      "category": "Richtzeichen (Anlage 3), Umleitungsbeschilderung",
      "topic": "Zeichen 442 – Vorwegweiser für bestimmte Verkehrsarten",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x826"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Vorwegweiser für bestimmte Verkehrsarten"
        }
      ],
      "modelAnswer": "Das ist Zeichen 442 „Vorwegweiser für bestimmte Verkehrsarten“ – Richtzeichen (Anlage 3), Umleitungsbeschilderung. Vorwegweiser für bestimmte Verkehrsarten.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Vorwegweiser für bestimmte Verkehrsarten",
          "keywords": [
            "442",
            "vorwegweiser",
            "vorwegweiser für bestimmte verkehrsarten"
          ]
        },
        {
          "label": "Vorwegweiser für bestimmte Verkehrsarten",
          "keywords": [
            "vorwegweiser"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 62"
    },
    {
      "id": "vz-421",
      "subject": "zeichen",
      "sign": "421",
      "signLabel": "Zeichen 421",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "63",
      "name": "Pfeilwegweiser für bestimmte Verkehrsarten",
      "category": "Richtzeichen (Anlage 3), Umleitungsbeschilderung",
      "topic": "Zeichen 421 – Pfeilwegweiser für bestimmte Verkehrsarten",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x827"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Pfeilwegweiser für bestimmte Verkehrsarten"
        }
      ],
      "modelAnswer": "Das ist Zeichen 421 „Pfeilwegweiser für bestimmte Verkehrsarten“ – Richtzeichen (Anlage 3), Umleitungsbeschilderung. Pfeilwegweiser für bestimmte Verkehrsarten.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Pfeilwegweiser für bestimmte Verkehrsarten",
          "keywords": [
            "421",
            "pfeilwegweiser",
            "pfeilwegweiser für bestimmte verkehrsarten"
          ]
        },
        {
          "label": "Pfeilwegweiser für bestimmte Verkehrsarten",
          "keywords": [
            "pfeilwegweiser"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 63"
    },
    {
      "id": "vz-422",
      "subject": "zeichen",
      "sign": "422",
      "signLabel": "Zeichen 422",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "64",
      "name": "Wegweiser für bestimmte Verkehrsarten",
      "category": "Richtzeichen (Anlage 3), Umleitungsbeschilderung",
      "topic": "Zeichen 422 – Wegweiser für bestimmte Verkehrsarten",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x828"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Wegweiser für bestimmte Verkehrsarten"
        }
      ],
      "modelAnswer": "Das ist Zeichen 422 „Wegweiser für bestimmte Verkehrsarten“ – Richtzeichen (Anlage 3), Umleitungsbeschilderung. Wegweiser für bestimmte Verkehrsarten.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Wegweiser für bestimmte Verkehrsarten",
          "keywords": [
            "422",
            "wegweiser",
            "wegweiser für bestimmte verkehrsarten"
          ]
        },
        {
          "label": "Wegweiser für bestimmte Verkehrsarten",
          "keywords": [
            "wegweiser"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 64"
    },
    {
      "id": "vz-454",
      "subject": "zeichen",
      "sign": "454",
      "signLabel": "Zeichen 454",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "66",
      "name": "Umleitungswegweiser",
      "category": "Richtzeichen (Anlage 3), Umleitungsbeschilderung",
      "topic": "Zeichen 454 – Umleitungswegweiser",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x840"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Der Verlauf einer temporären Umleitungsstrecke (z. B. infolge von Baumaßnahmen) kann durch den Umleitungswegweiser (Zeichen 454) oder durch Zeichen 455.1 „Fortsetzung der Umleitung“ gekennzeichnet werden."
        },
        {
          "type": "allgemein",
          "text": "Die Zeichen 454 und 455.1 können durch eine Zielangabe auf einem Schild über den Zeichen ergänzt sein. Werden nur bestimmte Verkehrsarten umgeleitet, sind diese auf einem Zusatzzeichen über dem Zeichen angegeben."
        }
      ],
      "modelAnswer": "Das ist Zeichen 454 „Umleitungswegweiser“ – Richtzeichen (Anlage 3), Umleitungsbeschilderung. Der Verlauf einer temporären Umleitungsstrecke (z. B. infolge von Baumaßnahmen) kann durch den Umleitungswegweiser (Zeichen 454) oder durch Zeichen 455.1 „Fortsetzung der Umleitung“ gekennzeichnet werden. Die Zeichen 454 und 455.1 können durch eine Zielangabe auf einem Schild über den Zeichen ergänzt sein. Werden nur bestimmte Verkehrsarten umgeleitet, sind diese auf einem Zusatzzeichen über dem Zeichen angegeben.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Umleitungswegweiser",
          "keywords": [
            "454",
            "umleitungswegweiser"
          ]
        },
        {
          "label": "Der Verlauf einer temporären Umleitungsstrecke (z. B. infolge von Baumaßnahmen) kann durch den …",
          "keywords": [
            "umleitungswegweiser",
            "umleitungsstrecke",
            "baumaßnahmen",
            "fortsetzung"
          ]
        },
        {
          "label": "Die Zeichen 454 und 455.1 können durch eine Zielangabe auf einem Schild über den Zeichen ergänzt sein. …",
          "keywords": [
            "zielangabe",
            "umgeleitet",
            "ergänzt",
            "schild"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 66"
    },
    {
      "id": "vz-455-1",
      "subject": "zeichen",
      "sign": "455.1",
      "signLabel": "Zeichen 455.1",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "67",
      "name": "Fortsetzung der Umleitung",
      "category": "Richtzeichen (Anlage 3), Umleitungsbeschilderung",
      "topic": "Zeichen 455.1 – Fortsetzung der Umleitung",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x841"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Der Verlauf einer temporären Umleitungsstrecke (z. B. infolge von Baumaßnahmen) kann durch Zeichen 454 oder durch Zeichen 455.1 „Fortsetzung der Umleitung“ gekennzeichnet werden. Die temporäre Umleitung kann auch durch Zeichen 455.1 angekündigt sein, jedoch nur mit Entfernungsangabe auf einem Zusatzzeichen und bei Bedarf mit Zielangabe auf einem zusätzlichen Schild über dem Zeichen."
        },
        {
          "type": "allgemein",
          "text": "Die Zeichen 454 und 455.1 können durch eine Zielangabe auf einem Schild über den Zeichen ergänzt sein. Werden nur bestimmte Verkehrsarten umgeleitet, sind diese auf einem Zusatzzeichen über dem Zeichen angegeben."
        }
      ],
      "modelAnswer": "Das ist Zeichen 455.1 „Fortsetzung der Umleitung“ – Richtzeichen (Anlage 3), Umleitungsbeschilderung. Der Verlauf einer temporären Umleitungsstrecke (z. B. infolge von Baumaßnahmen) kann durch Zeichen 454 oder durch Zeichen 455.1 „Fortsetzung der Umleitung“ gekennzeichnet werden. Die temporäre Umleitung kann auch durch Zeichen 455.1 angekündigt sein, jedoch nur mit Entfernungsangabe auf einem Zusatzzeichen und bei Bedarf mit Zielangabe auf einem zusätzlichen Schild über dem Zeichen. Die Zeichen 454 und 455.1 können durch eine Zielangabe auf einem Schild über den Zeichen ergänzt sein. Werden nur bestimmte Verkehrsarten umgeleitet, sind diese auf einem Zusatzzeichen über dem Zeichen angegeben.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Fortsetzung der Umleitung",
          "keywords": [
            "455.1",
            "umleitung",
            "fortsetzung",
            "fortsetzung der umleitung"
          ]
        },
        {
          "label": "Der Verlauf einer temporären Umleitungsstrecke (z. B. infolge von Baumaßnahmen) kann durch Zeichen 454 oder …",
          "keywords": [
            "umleitungsstrecke",
            "entfernungsangabe",
            "baumaßnahmen",
            "zusätzlichen"
          ]
        },
        {
          "label": "Die Zeichen 454 und 455.1 können durch eine Zielangabe auf einem Schild über den Zeichen ergänzt sein. …",
          "keywords": [
            "zielangabe",
            "umgeleitet",
            "ergänzt",
            "schild"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 67"
    },
    {
      "id": "vz-457-1",
      "subject": "zeichen",
      "sign": "457.1",
      "signLabel": "Zeichen 457.1",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "69",
      "name": "Umleitungsankündigung",
      "category": "Richtzeichen (Anlage 3), Umleitungsbeschilderung",
      "topic": "Zeichen 457.1 – Umleitungsankündigung",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x842"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Die temporäre Umleitung kann durch die Umleitungsankündigung (Zeichen 457.1) angekündigt sein, jedoch nur mit Entfernungsangabe auf einem Zusatzzeichen und bei Bedarf mit Zielangabe auf einem zusätzlichen Schild über dem Zeichen."
        }
      ],
      "modelAnswer": "Das ist Zeichen 457.1 „Umleitungsankündigung“ – Richtzeichen (Anlage 3), Umleitungsbeschilderung. Die temporäre Umleitung kann durch die Umleitungsankündigung (Zeichen 457.1) angekündigt sein, jedoch nur mit Entfernungsangabe auf einem Zusatzzeichen und bei Bedarf mit Zielangabe auf einem zusätzlichen Schild über dem Zeichen.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Umleitungsankündigung",
          "keywords": [
            "457.1",
            "umleitungsankündigung"
          ]
        },
        {
          "label": "Die temporäre Umleitung kann durch die Umleitungsankündigung (Zeichen 457.1) angekündigt sein, jedoch nur …",
          "keywords": [
            "umleitungsankündigung",
            "entfernungsangabe",
            "zusätzlichen",
            "angekündigt"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 69"
    },
    {
      "id": "vz-458",
      "subject": "zeichen",
      "sign": "458",
      "signLabel": "Zeichen 458",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "72",
      "name": "Planskizze (Ankündigung einer Umleitung)",
      "category": "Richtzeichen (Anlage 3), Umleitungsbeschilderung",
      "topic": "Zeichen 458 – Planskizze (Ankündigung einer Umleitung)",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x852"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Die Ankündigung einer temporären Umleitung kann auch durch eine Planskizze (Zeichen 458) erfolgen."
        }
      ],
      "modelAnswer": "Das ist Zeichen 458 „Planskizze (Ankündigung einer Umleitung)“ – Richtzeichen (Anlage 3), Umleitungsbeschilderung. Die Ankündigung einer temporären Umleitung kann auch durch eine Planskizze (Zeichen 458) erfolgen.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Planskizze (Ankündigung einer Umleitung)",
          "keywords": [
            "458",
            "umleitung",
            "planskizze",
            "ankündigung",
            "planskizze (ankündigung einer umleitung)"
          ]
        },
        {
          "label": "Die Ankündigung einer temporären Umleitung kann auch durch eine Planskizze (Zeichen 458) erfolgen.",
          "keywords": [
            "ankündigung",
            "temporären",
            "planskizze",
            "umleitung"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 72"
    },
    {
      "id": "vz-457-2",
      "subject": "zeichen",
      "sign": "457.2",
      "signLabel": "Zeichen 457.2",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "74",
      "name": "Ende der Umleitung",
      "category": "Richtzeichen (Anlage 3), Umleitungsbeschilderung",
      "topic": "Zeichen 457.2 – Ende der Umleitung",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x853"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Das Ende der Umleitung kann durch Zeichen 457.2 oder durch Zeichen 455.2 angezeigt werden."
        }
      ],
      "modelAnswer": "Das ist Zeichen 457.2 „Ende der Umleitung“ – Richtzeichen (Anlage 3), Umleitungsbeschilderung. Das Ende der Umleitung kann durch Zeichen 457.2 oder durch Zeichen 455.2 angezeigt werden.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Ende der Umleitung",
          "keywords": [
            "457.2",
            "umleitung",
            "ende der umleitung"
          ]
        },
        {
          "label": "Das Ende der Umleitung kann durch Zeichen 457.2 oder durch Zeichen 455.2 angezeigt werden.",
          "keywords": [
            "umleitung"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 74"
    },
    {
      "id": "vz-455-2",
      "subject": "zeichen",
      "sign": "455.2",
      "signLabel": "Zeichen 455.2",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "75",
      "name": "Ende der Umleitung",
      "category": "Richtzeichen (Anlage 3), Umleitungsbeschilderung",
      "topic": "Zeichen 455.2 – Ende der Umleitung",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x854"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Das Ende der Umleitung kann durch Zeichen 457.2 oder durch Zeichen 455.2 angezeigt werden."
        }
      ],
      "modelAnswer": "Das ist Zeichen 455.2 „Ende der Umleitung“ – Richtzeichen (Anlage 3), Umleitungsbeschilderung. Das Ende der Umleitung kann durch Zeichen 457.2 oder durch Zeichen 455.2 angezeigt werden.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Ende der Umleitung",
          "keywords": [
            "455.2",
            "umleitung",
            "ende der umleitung"
          ]
        },
        {
          "label": "Das Ende der Umleitung kann durch Zeichen 457.2 oder durch Zeichen 455.2 angezeigt werden.",
          "keywords": [
            "umleitung"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 75"
    },
    {
      "id": "vz-460",
      "subject": "zeichen",
      "sign": "460",
      "signLabel": "Zeichen 460",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "76",
      "name": "Bedarfsumleitung",
      "category": "Richtzeichen (Anlage 3), Umleitungsbeschilderung",
      "topic": "Zeichen 460 – Bedarfsumleitung",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x864"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Das Zeichen kennzeichnet eine alternative Streckenführung im nachgeordneten Straßennetz zwischen Autobahnanschlussstellen."
        }
      ],
      "modelAnswer": "Das ist Zeichen 460 „Bedarfsumleitung“ – Richtzeichen (Anlage 3), Umleitungsbeschilderung. Das Zeichen kennzeichnet eine alternative Streckenführung im nachgeordneten Straßennetz zwischen Autobahnanschlussstellen.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Bedarfsumleitung",
          "keywords": [
            "460",
            "bedarfsumleitung"
          ]
        },
        {
          "label": "Das Zeichen kennzeichnet eine alternative Streckenführung im nachgeordneten Straßennetz zwischen …",
          "keywords": [
            "autobahnanschlussstellen",
            "streckenführung",
            "nachgeordneten",
            "kennzeichnet"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 76"
    },
    {
      "id": "vz-466",
      "subject": "zeichen",
      "sign": "466",
      "signLabel": "Zeichen 466",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "77",
      "name": "Weiterführende Bedarfsumleitung",
      "category": "Richtzeichen (Anlage 3), Umleitungsbeschilderung",
      "topic": "Zeichen 466 – Weiterführende Bedarfsumleitung",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x865"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Kann der umgeleitete Verkehr an der nach Zeichen 460 vorgesehenen Anschlussstelle noch nicht auf die Autobahn zurückgeleitet werden, wird er durch dieses Zeichen über die nächste Bedarfsumleitung weitergeführt."
        }
      ],
      "modelAnswer": "Das ist Zeichen 466 „Weiterführende Bedarfsumleitung“ – Richtzeichen (Anlage 3), Umleitungsbeschilderung. Kann der umgeleitete Verkehr an der nach Zeichen 460 vorgesehenen Anschlussstelle noch nicht auf die Autobahn zurückgeleitet werden, wird er durch dieses Zeichen über die nächste Bedarfsumleitung weitergeführt.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Weiterführende Bedarfsumleitung",
          "keywords": [
            "466",
            "weiterführende",
            "bedarfsumleitung",
            "weiterführende bedarfsumleitung"
          ]
        },
        {
          "label": "Kann der umgeleitete Verkehr an der nach Zeichen 460 vorgesehenen Anschlussstelle noch nicht auf die …",
          "keywords": [
            "bedarfsumleitung",
            "anschlussstelle",
            "zurückgeleitet",
            "weitergeführt"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 77"
    },
    {
      "id": "vz-467-1",
      "subject": "zeichen",
      "sign": "467.1",
      "signLabel": "Zeichen 467.1",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "78",
      "name": "Umlenkungspfeil",
      "category": "Richtzeichen (Anlage 3), Sonstige Verkehrsführung",
      "topic": "Zeichen 467.1 – Umlenkungspfeil",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x866"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Das Zeichen kennzeichnet Alternativstrecken auf Autobahnen, deren Benutzung im Bedarfsfall empfohlen wird (Streckenempfehlung)."
        }
      ],
      "modelAnswer": "Das ist Zeichen 467.1 „Umlenkungspfeil“ – Richtzeichen (Anlage 3), Sonstige Verkehrsführung. Das Zeichen kennzeichnet Alternativstrecken auf Autobahnen, deren Benutzung im Bedarfsfall empfohlen wird (Streckenempfehlung).",
      "keyPoints": [
        {
          "label": "Bezeichnung: Umlenkungspfeil",
          "keywords": [
            "467.1",
            "umlenkungspfeil"
          ]
        },
        {
          "label": "Das Zeichen kennzeichnet Alternativstrecken auf Autobahnen, deren Benutzung im Bedarfsfall empfohlen wird …",
          "keywords": [
            "alternativstrecken",
            "streckenempfehlung",
            "kennzeichnet",
            "bedarfsfall"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 78"
    },
    {
      "id": "vz-467-2",
      "subject": "zeichen",
      "sign": "467.2",
      "signLabel": "Zeichen 467.2",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "79",
      "name": "Ende einer Streckenempfehlung",
      "category": "Richtzeichen (Anlage 3), Sonstige Verkehrsführung",
      "topic": "Zeichen 467.2 – Ende einer Streckenempfehlung",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x876"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Das Zeichen kennzeichnet das Ende einer Streckenempfehlung."
        }
      ],
      "modelAnswer": "Das ist Zeichen 467.2 „Ende einer Streckenempfehlung“ – Richtzeichen (Anlage 3), Sonstige Verkehrsführung. Das Zeichen kennzeichnet das Ende einer Streckenempfehlung.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Ende einer Streckenempfehlung",
          "keywords": [
            "467.2",
            "streckenempfehlung",
            "ende einer streckenempfehlung"
          ]
        },
        {
          "label": "Das Zeichen kennzeichnet das Ende einer Streckenempfehlung.",
          "keywords": [
            "streckenempfehlung",
            "kennzeichnet"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 79"
    },
    {
      "id": "vz-501",
      "subject": "zeichen",
      "sign": "501",
      "signLabel": "Zeichen 501",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "81",
      "name": "Überleitungstafel",
      "category": "Richtzeichen (Anlage 3), Sonstige Verkehrsführung",
      "topic": "Zeichen 501 – Überleitungstafel",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x877"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Das Zeichen kündigt die Überleitung des Verkehrs auf die Gegenfahrbahn an."
        },
        {
          "type": "allgemein",
          "text": "Verkehrslenkungstafeln geben den Verlauf und die Anzahl der Fahrstreifen an, wie beispielsweise:"
        }
      ],
      "modelAnswer": "Das ist Zeichen 501 „Überleitungstafel“ – Richtzeichen (Anlage 3), Sonstige Verkehrsführung. Das Zeichen kündigt die Überleitung des Verkehrs auf die Gegenfahrbahn an. Verkehrslenkungstafeln geben den Verlauf und die Anzahl der Fahrstreifen an, wie beispielsweise:",
      "keyPoints": [
        {
          "label": "Bezeichnung: Überleitungstafel",
          "keywords": [
            "501",
            "überleitungstafel"
          ]
        },
        {
          "label": "Das Zeichen kündigt die Überleitung des Verkehrs auf die Gegenfahrbahn an.",
          "keywords": [
            "gegenfahrbahn",
            "überleitung",
            "verkehrs",
            "kündigt"
          ]
        },
        {
          "label": "Verkehrslenkungstafeln geben den Verlauf und die Anzahl der Fahrstreifen an, wie beispielsweise:",
          "keywords": [
            "verkehrslenkungstafeln",
            "beispielsweise",
            "verlauf",
            "anzahl"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 81"
    },
    {
      "id": "vz-531",
      "subject": "zeichen",
      "sign": "531",
      "signLabel": "Zeichen 531",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "82",
      "name": "Einengungstafel",
      "category": "Richtzeichen (Anlage 3), Sonstige Verkehrsführung",
      "topic": "Zeichen 531 – Einengungstafel",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x878"
      ],
      "official": [
        {
          "type": "allgemein",
          "text": "Verkehrslenkungstafeln geben den Verlauf und die Anzahl der Fahrstreifen an, wie beispielsweise:"
        }
      ],
      "modelAnswer": "Das ist Zeichen 531 „Einengungstafel“ – Richtzeichen (Anlage 3), Sonstige Verkehrsführung. Verkehrslenkungstafeln geben den Verlauf und die Anzahl der Fahrstreifen an, wie beispielsweise:",
      "keyPoints": [
        {
          "label": "Bezeichnung: Einengungstafel",
          "keywords": [
            "531",
            "einengungstafel"
          ]
        },
        {
          "label": "Verkehrslenkungstafeln geben den Verlauf und die Anzahl der Fahrstreifen an, wie beispielsweise:",
          "keywords": [
            "verkehrslenkungstafeln",
            "beispielsweise",
            "verlauf",
            "anzahl"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 82"
    },
    {
      "id": "vz-z3-82-1",
      "subject": "zeichen",
      "sign": null,
      "signLabel": "Zusatzzeichen",
      "kind": "Zusatzzeichen",
      "anlage": 3,
      "lfd": "82.1",
      "name": "„Reißverschluss erst in … m“ (zu Zeichen 531)",
      "category": "Zusatzzeichen (Anlage 3), Sonstige Verkehrsführung",
      "topic": "Zusatzzeichen – „Reißverschluss erst in … m“ (zu Zeichen 531)",
      "question": "Was bedeutet dieses Zusatzzeichen? Erklären Sie, zu welchem Zeichen es gehört und was es regelt.",
      "difficulty": 2,
      "images": [
        "x889"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Bei Einengungstafeln wird mit dem Zusatzzeichen der Ort angekündigt, an dem der Fahrstreifenwechsel nach dem Reißverschlussverfahren (§ 7 Absatz 4) erfolgen soll."
        }
      ],
      "modelAnswer": "Das ist Zusatzzeichen „„Reißverschluss erst in … m“ (zu Zeichen 531)“ – Zusatzzeichen (Anlage 3), Sonstige Verkehrsführung. Bei Einengungstafeln wird mit dem Zusatzzeichen der Ort angekündigt, an dem der Fahrstreifenwechsel nach dem Reißverschlussverfahren (§ 7 Absatz 4) erfolgen soll.",
      "keyPoints": [
        {
          "label": "Bezeichnung: „Reißverschluss erst in … m“ (zu Zeichen 531)",
          "keywords": [
            "erst",
            "reißverschluss",
            "„reißverschluss erst in … m“ (zu zeichen 531)"
          ]
        },
        {
          "label": "Zusatzzeichen zum Hauptzeichen",
          "keywords": [
            "zusatzzeichen",
            "531"
          ]
        },
        {
          "label": "Bei Einengungstafeln wird mit dem Zusatzzeichen der Ort angekündigt, an dem der Fahrstreifenwechsel nach dem …",
          "keywords": [
            "reißverschlussverfahren",
            "fahrstreifenwechsel",
            "einengungstafeln",
            "angekündigt"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Mit welchem Hauptzeichen wird dieses Zusatzzeichen verwendet?",
        "Wo steht das Zusatzzeichen?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 82.1"
    },
    {
      "id": "vz-590",
      "subject": "zeichen",
      "sign": "590",
      "signLabel": "Zeichen 590",
      "kind": "Zeichen",
      "anlage": 3,
      "lfd": "83",
      "name": "Blockumfahrung",
      "category": "Richtzeichen (Anlage 3), Sonstige Verkehrsführung",
      "topic": "Zeichen 590 – Blockumfahrung",
      "question": "Welches Verkehrszeichen ist das? Erklären Sie Bedeutung, Ge- oder Verbote und wie Sie sich verhalten.",
      "difficulty": 2,
      "images": [
        "x890"
      ],
      "official": [
        {
          "type": "erlaeuterung",
          "text": "Das Zeichen kündigt eine durch die Zeichen \"Vorgeschriebene Fahrtrichtung\" (Zeichen 209 bis 214) vorgegebene Verkehrsführung an."
        }
      ],
      "modelAnswer": "Das ist Zeichen 590 „Blockumfahrung“ – Richtzeichen (Anlage 3), Sonstige Verkehrsführung. Das Zeichen kündigt eine durch die Zeichen \"Vorgeschriebene Fahrtrichtung\" (Zeichen 209 bis 214) vorgegebene Verkehrsführung an.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Blockumfahrung",
          "keywords": [
            "590",
            "blockumfahrung"
          ]
        },
        {
          "label": "Das Zeichen kündigt eine durch die Zeichen \"Vorgeschriebene Fahrtrichtung\" (Zeichen 209 bis 214) vorgegebene …",
          "keywords": [
            "vorgeschriebene",
            "verkehrsführung",
            "vorgegebene",
            "kündigt"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Ist dieses Zeichen ein Gebot oder nur ein Hinweis?",
        "Wie erklären Sie dieses Zeichen einem Fahrschüler?"
      ],
      "source": "StVO Anlage 3, lfd. Nr. 83"
    },
    {
      "id": "vz-600",
      "subject": "zeichen",
      "sign": "600",
      "signLabel": "Zeichen 600",
      "kind": "Zeichen",
      "anlage": 4,
      "lfd": "1",
      "name": "Absperrschranke",
      "category": "Verkehrseinrichtung (Anlage 4), Einrichtungen zur Kennzeichnung von Arbeits- und Unfallstellen oder sonstigen vorübergehenden Hindernissen",
      "topic": "Zeichen 600 – Absperrschranke",
      "question": "Welche Verkehrseinrichtung ist das? Erklären Sie Bedeutung und Verhalten.",
      "difficulty": 2,
      "images": [
        "x898"
      ],
      "official": [
        {
          "type": "allgemein",
          "text": "Die Einrichtungen verbieten das Befahren der so gekennzeichneten Straßenfläche und leiten den Verkehr an dieser Fläche vorbei."
        },
        {
          "type": "allgemein",
          "text": "1. Warnleuchten an diesen Einrichtungen zeigen rotes Licht, wenn die ganze Fahrbahn gesperrt ist, sonst gelbes Licht oder gelbes Blinklicht. 2. Zusammen mit der Absperrtafel können überfahrbare Warnschwellen verwendet sein, die quer zur Fahrtrichtung vor der Absperrtafel ausgelegt sind."
        }
      ],
      "modelAnswer": "Das ist Zeichen 600 „Absperrschranke“ – Verkehrseinrichtung (Anlage 4), Einrichtungen zur Kennzeichnung von Arbeits- und Unfallstellen oder sonstigen vorübergehenden Hindernissen. Die Einrichtungen verbieten das Befahren der so gekennzeichneten Straßenfläche und leiten den Verkehr an dieser Fläche vorbei. 1. Warnleuchten an diesen Einrichtungen zeigen rotes Licht, wenn die ganze Fahrbahn gesperrt ist, sonst gelbes Licht oder gelbes Blinklicht. 2. Zusammen mit der Absperrtafel können überfahrbare Warnschwellen verwendet sein, die quer zur Fahrtrichtung vor der Absperrtafel ausgelegt sind.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Absperrschranke",
          "keywords": [
            "600",
            "absperrschranke"
          ]
        },
        {
          "label": "Die Einrichtungen verbieten das Befahren der so gekennzeichneten Straßenfläche und leiten den Verkehr an …",
          "keywords": [
            "einrichtungen",
            "straßenfläche",
            "befahren",
            "leiten"
          ]
        },
        {
          "label": "1. Warnleuchten an diesen Einrichtungen zeigen rotes Licht, wenn die ganze Fahrbahn gesperrt ist, sonst …",
          "keywords": [
            "einrichtungen",
            "warnleuchten",
            "blinklicht",
            "gesperrt"
          ]
        },
        {
          "label": "2. Zusammen mit der Absperrtafel können überfahrbare Warnschwellen verwendet sein, die quer zur …",
          "keywords": [
            "warnschwellen",
            "absperrtafel",
            "überfahrbare",
            "verwendet"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Was verbietet oder zeigt diese Einrichtung an?",
        "Wo wird sie typischerweise verwendet?"
      ],
      "source": "StVO Anlage 4, lfd. Nr. 1"
    },
    {
      "id": "vz-605",
      "subject": "zeichen",
      "sign": "605",
      "signLabel": "Zeichen 605",
      "kind": "Zeichen",
      "anlage": 4,
      "lfd": "2",
      "name": "Leitbake (Pfeilbake, Schraffenbake)",
      "category": "Verkehrseinrichtung (Anlage 4), Einrichtungen zur Kennzeichnung von Arbeits- und Unfallstellen oder sonstigen vorübergehenden Hindernissen",
      "topic": "Zeichen 605 – Leitbake (Pfeilbake, Schraffenbake)",
      "question": "Welche Verkehrseinrichtung ist das? Erklären Sie Bedeutung und Verhalten.",
      "difficulty": 2,
      "images": [
        "x899"
      ],
      "official": [
        {
          "type": "allgemein",
          "text": "Die Einrichtungen verbieten das Befahren der so gekennzeichneten Straßenfläche und leiten den Verkehr an dieser Fläche vorbei."
        },
        {
          "type": "allgemein",
          "text": "1. Warnleuchten an diesen Einrichtungen zeigen rotes Licht, wenn die ganze Fahrbahn gesperrt ist, sonst gelbes Licht oder gelbes Blinklicht. 2. Zusammen mit der Absperrtafel können überfahrbare Warnschwellen verwendet sein, die quer zur Fahrtrichtung vor der Absperrtafel ausgelegt sind."
        }
      ],
      "modelAnswer": "Das ist Zeichen 605 „Leitbake (Pfeilbake, Schraffenbake)“ – Verkehrseinrichtung (Anlage 4), Einrichtungen zur Kennzeichnung von Arbeits- und Unfallstellen oder sonstigen vorübergehenden Hindernissen. Die Einrichtungen verbieten das Befahren der so gekennzeichneten Straßenfläche und leiten den Verkehr an dieser Fläche vorbei. 1. Warnleuchten an diesen Einrichtungen zeigen rotes Licht, wenn die ganze Fahrbahn gesperrt ist, sonst gelbes Licht oder gelbes Blinklicht. 2. Zusammen mit der Absperrtafel können überfahrbare Warnschwellen verwendet sein, die quer zur Fahrtrichtung vor der Absperrtafel ausgelegt sind.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Leitbake (Pfeilbake, Schraffenbake)",
          "keywords": [
            "605",
            "leitbake",
            "pfeilbake",
            "schraffenbake",
            "leitbake (pfeilbake, schraffenbake)"
          ]
        },
        {
          "label": "Die Einrichtungen verbieten das Befahren der so gekennzeichneten Straßenfläche und leiten den Verkehr an …",
          "keywords": [
            "einrichtungen",
            "straßenfläche",
            "befahren",
            "leiten"
          ]
        },
        {
          "label": "1. Warnleuchten an diesen Einrichtungen zeigen rotes Licht, wenn die ganze Fahrbahn gesperrt ist, sonst …",
          "keywords": [
            "einrichtungen",
            "warnleuchten",
            "blinklicht",
            "gesperrt"
          ]
        },
        {
          "label": "2. Zusammen mit der Absperrtafel können überfahrbare Warnschwellen verwendet sein, die quer zur …",
          "keywords": [
            "warnschwellen",
            "absperrtafel",
            "überfahrbare",
            "verwendet"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Was verbietet oder zeigt diese Einrichtung an?",
        "Wo wird sie typischerweise verwendet?"
      ],
      "source": "StVO Anlage 4, lfd. Nr. 2"
    },
    {
      "id": "vz-628",
      "subject": "zeichen",
      "sign": "628",
      "signLabel": "Zeichen 628",
      "kind": "Zeichen",
      "anlage": 4,
      "lfd": "3",
      "name": "Leitschwelle mit Pfeilbake oder Schraffenbake",
      "category": "Verkehrseinrichtung (Anlage 4), Einrichtungen zur Kennzeichnung von Arbeits- und Unfallstellen oder sonstigen vorübergehenden Hindernissen",
      "topic": "Zeichen 628 – Leitschwelle mit Pfeilbake oder Schraffenbake",
      "question": "Welche Verkehrseinrichtung ist das? Erklären Sie Bedeutung und Verhalten.",
      "difficulty": 2,
      "images": [
        "x900"
      ],
      "official": [
        {
          "type": "allgemein",
          "text": "Die Einrichtungen verbieten das Befahren der so gekennzeichneten Straßenfläche und leiten den Verkehr an dieser Fläche vorbei."
        },
        {
          "type": "allgemein",
          "text": "1. Warnleuchten an diesen Einrichtungen zeigen rotes Licht, wenn die ganze Fahrbahn gesperrt ist, sonst gelbes Licht oder gelbes Blinklicht. 2. Zusammen mit der Absperrtafel können überfahrbare Warnschwellen verwendet sein, die quer zur Fahrtrichtung vor der Absperrtafel ausgelegt sind."
        }
      ],
      "modelAnswer": "Das ist Zeichen 628 „Leitschwelle mit Pfeilbake oder Schraffenbake“ – Verkehrseinrichtung (Anlage 4), Einrichtungen zur Kennzeichnung von Arbeits- und Unfallstellen oder sonstigen vorübergehenden Hindernissen. Die Einrichtungen verbieten das Befahren der so gekennzeichneten Straßenfläche und leiten den Verkehr an dieser Fläche vorbei. 1. Warnleuchten an diesen Einrichtungen zeigen rotes Licht, wenn die ganze Fahrbahn gesperrt ist, sonst gelbes Licht oder gelbes Blinklicht. 2. Zusammen mit der Absperrtafel können überfahrbare Warnschwellen verwendet sein, die quer zur Fahrtrichtung vor der Absperrtafel ausgelegt sind.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Leitschwelle mit Pfeilbake oder Schraffenbake",
          "keywords": [
            "628",
            "pfeilbake",
            "leitschwelle",
            "schraffenbake",
            "leitschwelle mit pfeilbake oder schraffenbake"
          ]
        },
        {
          "label": "Die Einrichtungen verbieten das Befahren der so gekennzeichneten Straßenfläche und leiten den Verkehr an …",
          "keywords": [
            "einrichtungen",
            "straßenfläche",
            "befahren",
            "leiten"
          ]
        },
        {
          "label": "1. Warnleuchten an diesen Einrichtungen zeigen rotes Licht, wenn die ganze Fahrbahn gesperrt ist, sonst …",
          "keywords": [
            "einrichtungen",
            "warnleuchten",
            "blinklicht",
            "gesperrt"
          ]
        },
        {
          "label": "2. Zusammen mit der Absperrtafel können überfahrbare Warnschwellen verwendet sein, die quer zur …",
          "keywords": [
            "warnschwellen",
            "absperrtafel",
            "überfahrbare",
            "verwendet"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Was verbietet oder zeigt diese Einrichtung an?",
        "Wo wird sie typischerweise verwendet?"
      ],
      "source": "StVO Anlage 4, lfd. Nr. 3"
    },
    {
      "id": "vz-629",
      "subject": "zeichen",
      "sign": "629",
      "signLabel": "Zeichen 629",
      "kind": "Zeichen",
      "anlage": 4,
      "lfd": "4",
      "name": "Leitbord mit Pfeilbake oder Schraffenbake",
      "category": "Verkehrseinrichtung (Anlage 4), Einrichtungen zur Kennzeichnung von Arbeits- und Unfallstellen oder sonstigen vorübergehenden Hindernissen",
      "topic": "Zeichen 629 – Leitbord mit Pfeilbake oder Schraffenbake",
      "question": "Welche Verkehrseinrichtung ist das? Erklären Sie Bedeutung und Verhalten.",
      "difficulty": 2,
      "images": [
        "x910"
      ],
      "official": [
        {
          "type": "allgemein",
          "text": "Die Einrichtungen verbieten das Befahren der so gekennzeichneten Straßenfläche und leiten den Verkehr an dieser Fläche vorbei."
        },
        {
          "type": "allgemein",
          "text": "1. Warnleuchten an diesen Einrichtungen zeigen rotes Licht, wenn die ganze Fahrbahn gesperrt ist, sonst gelbes Licht oder gelbes Blinklicht. 2. Zusammen mit der Absperrtafel können überfahrbare Warnschwellen verwendet sein, die quer zur Fahrtrichtung vor der Absperrtafel ausgelegt sind."
        }
      ],
      "modelAnswer": "Das ist Zeichen 629 „Leitbord mit Pfeilbake oder Schraffenbake“ – Verkehrseinrichtung (Anlage 4), Einrichtungen zur Kennzeichnung von Arbeits- und Unfallstellen oder sonstigen vorübergehenden Hindernissen. Die Einrichtungen verbieten das Befahren der so gekennzeichneten Straßenfläche und leiten den Verkehr an dieser Fläche vorbei. 1. Warnleuchten an diesen Einrichtungen zeigen rotes Licht, wenn die ganze Fahrbahn gesperrt ist, sonst gelbes Licht oder gelbes Blinklicht. 2. Zusammen mit der Absperrtafel können überfahrbare Warnschwellen verwendet sein, die quer zur Fahrtrichtung vor der Absperrtafel ausgelegt sind.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Leitbord mit Pfeilbake oder Schraffenbake",
          "keywords": [
            "629",
            "leitbord",
            "pfeilbake",
            "schraffenbake",
            "leitbord mit pfeilbake oder schraffenbake"
          ]
        },
        {
          "label": "Die Einrichtungen verbieten das Befahren der so gekennzeichneten Straßenfläche und leiten den Verkehr an …",
          "keywords": [
            "einrichtungen",
            "straßenfläche",
            "befahren",
            "leiten"
          ]
        },
        {
          "label": "1. Warnleuchten an diesen Einrichtungen zeigen rotes Licht, wenn die ganze Fahrbahn gesperrt ist, sonst …",
          "keywords": [
            "einrichtungen",
            "warnleuchten",
            "blinklicht",
            "gesperrt"
          ]
        },
        {
          "label": "2. Zusammen mit der Absperrtafel können überfahrbare Warnschwellen verwendet sein, die quer zur …",
          "keywords": [
            "warnschwellen",
            "absperrtafel",
            "überfahrbare",
            "verwendet"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Was verbietet oder zeigt diese Einrichtung an?",
        "Wo wird sie typischerweise verwendet?"
      ],
      "source": "StVO Anlage 4, lfd. Nr. 4"
    },
    {
      "id": "vz-610",
      "subject": "zeichen",
      "sign": "610",
      "signLabel": "Zeichen 610",
      "kind": "Zeichen",
      "anlage": 4,
      "lfd": "5",
      "name": "Leitkegel",
      "category": "Verkehrseinrichtung (Anlage 4), Einrichtungen zur Kennzeichnung von Arbeits- und Unfallstellen oder sonstigen vorübergehenden Hindernissen",
      "topic": "Zeichen 610 – Leitkegel",
      "question": "Welche Verkehrseinrichtung ist das? Erklären Sie Bedeutung und Verhalten.",
      "difficulty": 2,
      "images": [
        "x911"
      ],
      "official": [
        {
          "type": "allgemein",
          "text": "Die Einrichtungen verbieten das Befahren der so gekennzeichneten Straßenfläche und leiten den Verkehr an dieser Fläche vorbei."
        },
        {
          "type": "allgemein",
          "text": "1. Warnleuchten an diesen Einrichtungen zeigen rotes Licht, wenn die ganze Fahrbahn gesperrt ist, sonst gelbes Licht oder gelbes Blinklicht. 2. Zusammen mit der Absperrtafel können überfahrbare Warnschwellen verwendet sein, die quer zur Fahrtrichtung vor der Absperrtafel ausgelegt sind."
        }
      ],
      "modelAnswer": "Das ist Zeichen 610 „Leitkegel“ – Verkehrseinrichtung (Anlage 4), Einrichtungen zur Kennzeichnung von Arbeits- und Unfallstellen oder sonstigen vorübergehenden Hindernissen. Die Einrichtungen verbieten das Befahren der so gekennzeichneten Straßenfläche und leiten den Verkehr an dieser Fläche vorbei. 1. Warnleuchten an diesen Einrichtungen zeigen rotes Licht, wenn die ganze Fahrbahn gesperrt ist, sonst gelbes Licht oder gelbes Blinklicht. 2. Zusammen mit der Absperrtafel können überfahrbare Warnschwellen verwendet sein, die quer zur Fahrtrichtung vor der Absperrtafel ausgelegt sind.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Leitkegel",
          "keywords": [
            "610",
            "leitkegel"
          ]
        },
        {
          "label": "Die Einrichtungen verbieten das Befahren der so gekennzeichneten Straßenfläche und leiten den Verkehr an …",
          "keywords": [
            "einrichtungen",
            "straßenfläche",
            "befahren",
            "leiten"
          ]
        },
        {
          "label": "1. Warnleuchten an diesen Einrichtungen zeigen rotes Licht, wenn die ganze Fahrbahn gesperrt ist, sonst …",
          "keywords": [
            "einrichtungen",
            "warnleuchten",
            "blinklicht",
            "gesperrt"
          ]
        },
        {
          "label": "2. Zusammen mit der Absperrtafel können überfahrbare Warnschwellen verwendet sein, die quer zur …",
          "keywords": [
            "warnschwellen",
            "absperrtafel",
            "überfahrbare",
            "verwendet"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Was verbietet oder zeigt diese Einrichtung an?",
        "Wo wird sie typischerweise verwendet?"
      ],
      "source": "StVO Anlage 4, lfd. Nr. 5"
    },
    {
      "id": "vz-615",
      "subject": "zeichen",
      "sign": "615",
      "signLabel": "Zeichen 615",
      "kind": "Zeichen",
      "anlage": 4,
      "lfd": "6",
      "name": "Fahrbare Absperrtafel",
      "category": "Verkehrseinrichtung (Anlage 4), Einrichtungen zur Kennzeichnung von Arbeits- und Unfallstellen oder sonstigen vorübergehenden Hindernissen",
      "topic": "Zeichen 615 – Fahrbare Absperrtafel",
      "question": "Welche Verkehrseinrichtung ist das? Erklären Sie Bedeutung und Verhalten.",
      "difficulty": 2,
      "images": [
        "x912"
      ],
      "official": [
        {
          "type": "allgemein",
          "text": "Die Einrichtungen verbieten das Befahren der so gekennzeichneten Straßenfläche und leiten den Verkehr an dieser Fläche vorbei."
        },
        {
          "type": "allgemein",
          "text": "1. Warnleuchten an diesen Einrichtungen zeigen rotes Licht, wenn die ganze Fahrbahn gesperrt ist, sonst gelbes Licht oder gelbes Blinklicht. 2. Zusammen mit der Absperrtafel können überfahrbare Warnschwellen verwendet sein, die quer zur Fahrtrichtung vor der Absperrtafel ausgelegt sind."
        }
      ],
      "modelAnswer": "Das ist Zeichen 615 „Fahrbare Absperrtafel“ – Verkehrseinrichtung (Anlage 4), Einrichtungen zur Kennzeichnung von Arbeits- und Unfallstellen oder sonstigen vorübergehenden Hindernissen. Die Einrichtungen verbieten das Befahren der so gekennzeichneten Straßenfläche und leiten den Verkehr an dieser Fläche vorbei. 1. Warnleuchten an diesen Einrichtungen zeigen rotes Licht, wenn die ganze Fahrbahn gesperrt ist, sonst gelbes Licht oder gelbes Blinklicht. 2. Zusammen mit der Absperrtafel können überfahrbare Warnschwellen verwendet sein, die quer zur Fahrtrichtung vor der Absperrtafel ausgelegt sind.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Fahrbare Absperrtafel",
          "keywords": [
            "615",
            "fahrbare",
            "absperrtafel",
            "fahrbare absperrtafel"
          ]
        },
        {
          "label": "Die Einrichtungen verbieten das Befahren der so gekennzeichneten Straßenfläche und leiten den Verkehr an …",
          "keywords": [
            "einrichtungen",
            "straßenfläche",
            "befahren",
            "leiten"
          ]
        },
        {
          "label": "1. Warnleuchten an diesen Einrichtungen zeigen rotes Licht, wenn die ganze Fahrbahn gesperrt ist, sonst …",
          "keywords": [
            "einrichtungen",
            "warnleuchten",
            "blinklicht",
            "gesperrt"
          ]
        },
        {
          "label": "2. Zusammen mit der Absperrtafel können überfahrbare Warnschwellen verwendet sein, die quer zur …",
          "keywords": [
            "warnschwellen",
            "absperrtafel",
            "überfahrbare",
            "verwendet"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Was verbietet oder zeigt diese Einrichtung an?",
        "Wo wird sie typischerweise verwendet?"
      ],
      "source": "StVO Anlage 4, lfd. Nr. 6"
    },
    {
      "id": "vz-616",
      "subject": "zeichen",
      "sign": "616",
      "signLabel": "Zeichen 616",
      "kind": "Zeichen",
      "anlage": 4,
      "lfd": "7",
      "name": "Fahrbare Absperrtafel mit Blinkpfeil",
      "category": "Verkehrseinrichtung (Anlage 4), Einrichtungen zur Kennzeichnung von Arbeits- und Unfallstellen oder sonstigen vorübergehenden Hindernissen",
      "topic": "Zeichen 616 – Fahrbare Absperrtafel mit Blinkpfeil",
      "question": "Welche Verkehrseinrichtung ist das? Erklären Sie Bedeutung und Verhalten.",
      "difficulty": 2,
      "images": [
        "x922"
      ],
      "official": [
        {
          "type": "allgemein",
          "text": "Die Einrichtungen verbieten das Befahren der so gekennzeichneten Straßenfläche und leiten den Verkehr an dieser Fläche vorbei."
        },
        {
          "type": "allgemein",
          "text": "1. Warnleuchten an diesen Einrichtungen zeigen rotes Licht, wenn die ganze Fahrbahn gesperrt ist, sonst gelbes Licht oder gelbes Blinklicht. 2. Zusammen mit der Absperrtafel können überfahrbare Warnschwellen verwendet sein, die quer zur Fahrtrichtung vor der Absperrtafel ausgelegt sind."
        }
      ],
      "modelAnswer": "Das ist Zeichen 616 „Fahrbare Absperrtafel mit Blinkpfeil“ – Verkehrseinrichtung (Anlage 4), Einrichtungen zur Kennzeichnung von Arbeits- und Unfallstellen oder sonstigen vorübergehenden Hindernissen. Die Einrichtungen verbieten das Befahren der so gekennzeichneten Straßenfläche und leiten den Verkehr an dieser Fläche vorbei. 1. Warnleuchten an diesen Einrichtungen zeigen rotes Licht, wenn die ganze Fahrbahn gesperrt ist, sonst gelbes Licht oder gelbes Blinklicht. 2. Zusammen mit der Absperrtafel können überfahrbare Warnschwellen verwendet sein, die quer zur Fahrtrichtung vor der Absperrtafel ausgelegt sind.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Fahrbare Absperrtafel mit Blinkpfeil",
          "keywords": [
            "616",
            "fahrbare",
            "blinkpfeil",
            "absperrtafel",
            "fahrbare absperrtafel mit blinkpfeil"
          ]
        },
        {
          "label": "Die Einrichtungen verbieten das Befahren der so gekennzeichneten Straßenfläche und leiten den Verkehr an …",
          "keywords": [
            "einrichtungen",
            "straßenfläche",
            "befahren",
            "leiten"
          ]
        },
        {
          "label": "1. Warnleuchten an diesen Einrichtungen zeigen rotes Licht, wenn die ganze Fahrbahn gesperrt ist, sonst …",
          "keywords": [
            "einrichtungen",
            "warnleuchten",
            "blinklicht",
            "gesperrt"
          ]
        },
        {
          "label": "2. Zusammen mit der Absperrtafel können überfahrbare Warnschwellen verwendet sein, die quer zur …",
          "keywords": [
            "warnschwellen",
            "absperrtafel",
            "überfahrbare",
            "verwendet"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Was verbietet oder zeigt diese Einrichtung an?",
        "Wo wird sie typischerweise verwendet?"
      ],
      "source": "StVO Anlage 4, lfd. Nr. 7"
    },
    {
      "id": "vz-625",
      "subject": "zeichen",
      "sign": "625",
      "signLabel": "Zeichen 625",
      "kind": "Zeichen",
      "anlage": 4,
      "lfd": "8",
      "name": "Richtungstafel in Kurven",
      "category": "Verkehrseinrichtung (Anlage 4), Einrichtungen zur Kennzeichnung von dauerhaften Hindernissen oder sonstigen gefährlichen Stellen",
      "topic": "Zeichen 625 – Richtungstafel in Kurven",
      "question": "Welche Verkehrseinrichtung ist das? Erklären Sie Bedeutung und Verhalten.",
      "difficulty": 2,
      "images": [
        "x923"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Die Richtungstafel in Kurven kann auch in aufgelöster Form angebracht sein."
        }
      ],
      "modelAnswer": "Das ist Zeichen 625 „Richtungstafel in Kurven“ – Verkehrseinrichtung (Anlage 4), Einrichtungen zur Kennzeichnung von dauerhaften Hindernissen oder sonstigen gefährlichen Stellen. Die Richtungstafel in Kurven kann auch in aufgelöster Form angebracht sein.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Richtungstafel in Kurven",
          "keywords": [
            "625",
            "kurven",
            "richtungstafel",
            "richtungstafel in kurven"
          ]
        },
        {
          "label": "Die Richtungstafel in Kurven kann auch in aufgelöster Form angebracht sein.",
          "keywords": [
            "richtungstafel",
            "aufgelöster",
            "kurven",
            "form"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Was verbietet oder zeigt diese Einrichtung an?",
        "Wo wird sie typischerweise verwendet?"
      ],
      "source": "StVO Anlage 4, lfd. Nr. 8"
    },
    {
      "id": "vz-626",
      "subject": "zeichen",
      "sign": "626",
      "signLabel": "Zeichen 626",
      "kind": "Zeichen",
      "anlage": 4,
      "lfd": "9",
      "name": "Leitplatte",
      "category": "Verkehrseinrichtung (Anlage 4), Einrichtungen zur Kennzeichnung von dauerhaften Hindernissen oder sonstigen gefährlichen Stellen",
      "topic": "Zeichen 626 – Leitplatte",
      "question": "Welche Verkehrseinrichtung ist das? Erklären Sie Bedeutung und Verhalten.",
      "difficulty": 2,
      "images": [
        "x931"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 626 „Leitplatte“ – Verkehrseinrichtung (Anlage 4), Einrichtungen zur Kennzeichnung von dauerhaften Hindernissen oder sonstigen gefährlichen Stellen.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Leitplatte",
          "keywords": [
            "626",
            "leitplatte"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Was verbietet oder zeigt diese Einrichtung an?",
        "Wo wird sie typischerweise verwendet?"
      ],
      "source": "StVO Anlage 4, lfd. Nr. 9"
    },
    {
      "id": "vz-627",
      "subject": "zeichen",
      "sign": "627",
      "signLabel": "Zeichen 627",
      "kind": "Zeichen",
      "anlage": 4,
      "lfd": "10",
      "name": "Leitmal",
      "category": "Verkehrseinrichtung (Anlage 4), Einrichtungen zur Kennzeichnung von dauerhaften Hindernissen oder sonstigen gefährlichen Stellen",
      "topic": "Zeichen 627 – Leitmal",
      "question": "Welche Verkehrseinrichtung ist das? Erklären Sie Bedeutung und Verhalten.",
      "difficulty": 2,
      "images": [
        "x932"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Leitmale kennzeichnen in der Regel den Verkehr einschränkende Gegenstände. Ihre Ausführung richtet sich nach der senkrechten, waagerechten oder gewölbten Anbringung beispielsweise an Bauwerken, Bauteilen und Gerüsten."
        }
      ],
      "modelAnswer": "Das ist Zeichen 627 „Leitmal“ – Verkehrseinrichtung (Anlage 4), Einrichtungen zur Kennzeichnung von dauerhaften Hindernissen oder sonstigen gefährlichen Stellen. Leitmale kennzeichnen in der Regel den Verkehr einschränkende Gegenstände. Ihre Ausführung richtet sich nach der senkrechten, waagerechten oder gewölbten Anbringung beispielsweise an Bauwerken, Bauteilen und Gerüsten.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Leitmal",
          "keywords": [
            "627",
            "leitmal"
          ]
        },
        {
          "label": "Leitmale kennzeichnen in der Regel den Verkehr einschränkende Gegenstände. Ihre Ausführung richtet sich nach …",
          "keywords": [
            "einschränkende",
            "beispielsweise",
            "kennzeichnen",
            "waagerechten"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Was verbietet oder zeigt diese Einrichtung an?",
        "Wo wird sie typischerweise verwendet?"
      ],
      "source": "StVO Anlage 4, lfd. Nr. 10"
    },
    {
      "id": "vz-620",
      "subject": "zeichen",
      "sign": "620",
      "signLabel": "Zeichen 620",
      "kind": "Zeichen",
      "anlage": 4,
      "lfd": "11",
      "name": "Leitpfosten",
      "category": "Verkehrseinrichtung (Anlage 4), Einrichtung zur Kennzeichnung des Straßenverlaufs",
      "topic": "Zeichen 620 – Leitpfosten",
      "question": "Welche Verkehrseinrichtung ist das? Erklären Sie Bedeutung und Verhalten.",
      "difficulty": 2,
      "images": [
        "x933"
      ],
      "official": [
        {
          "type": "gebot",
          "text": "Um den Verlauf der Straße kenntlich zu machen, können an den Straßenseiten Leitpfosten in der Regel im Abstand von 50 m und in Kurven verdichtet stehen."
        }
      ],
      "modelAnswer": "Das ist Zeichen 620 „Leitpfosten“ – Verkehrseinrichtung (Anlage 4), Einrichtung zur Kennzeichnung des Straßenverlaufs. Um den Verlauf der Straße kenntlich zu machen, können an den Straßenseiten Leitpfosten in der Regel im Abstand von 50 m und in Kurven verdichtet stehen.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Leitpfosten",
          "keywords": [
            "620",
            "leitpfosten"
          ]
        },
        {
          "label": "Um den Verlauf der Straße kenntlich zu machen, können an den Straßenseiten Leitpfosten in der Regel im …",
          "keywords": [
            "50 m",
            "straßenseiten",
            "leitpfosten",
            "verdichtet"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Was verbietet oder zeigt diese Einrichtung an?",
        "Wo wird sie typischerweise verwendet?"
      ],
      "source": "StVO Anlage 4, lfd. Nr. 11"
    },
    {
      "id": "vz-630",
      "subject": "zeichen",
      "sign": "630",
      "signLabel": "Zeichen 630",
      "kind": "Zeichen",
      "anlage": 4,
      "lfd": "12",
      "name": "Parkwarntafel",
      "category": "Verkehrseinrichtung (Anlage 4), Warntafel zur Kennzeichnung von Fahrzeugen und Anhängern bei Dunkelheit",
      "topic": "Zeichen 630 – Parkwarntafel",
      "question": "Welche Verkehrseinrichtung ist das? Erklären Sie Bedeutung und Verhalten.",
      "difficulty": 2,
      "images": [
        "x943"
      ],
      "official": [],
      "modelAnswer": "Das ist Zeichen 630 „Parkwarntafel“ – Verkehrseinrichtung (Anlage 4), Warntafel zur Kennzeichnung von Fahrzeugen und Anhängern bei Dunkelheit.",
      "keyPoints": [
        {
          "label": "Bezeichnung: Parkwarntafel",
          "keywords": [
            "630",
            "parkwarntafel"
          ]
        }
      ],
      "wrongClaims": [],
      "followUps": [
        "Was verbietet oder zeigt diese Einrichtung an?",
        "Wo wird sie typischerweise verwendet?"
      ],
      "source": "StVO Anlage 4, lfd. Nr. 12"
    }
  ];

  return { signs };
});
