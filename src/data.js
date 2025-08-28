export const examData = {
  lesen: {
    teil1: {
      title: "Lesen Teil 1",
      description: "Read the text and answer the questions.",
      content: "This is the content for Lesen Teil 1...",
      questions: [
        {
          id: 1,
          text: "Question 1",
          options: ["A", "B", "C"],
          correctAnswer: "A",
        },
        {
          id: 2,
          text: "Question 2",
          options: ["A", "B", "C"],
          correctAnswer: "B",
        },
      ],
    },
    teil2: {
      title: "Lesen Teil 2",
      description: "Match the headings to the paragraphs.",
      content: "This is the content for Lesen Teil 2...",
      questions: [
        {
          id: 1,
          text: "Match paragraph 1",
          options: ["Heading A", "Heading B"],
          correctAnswer: "Heading A",
        },
      ],
    },
    teil3: {
      title: "Lesen Teil 3",
      description: "Read the long text and answer the questions.",
      content: "This is the content for Lesen Teil 3...",
      questions: [
        {
          id: 1,
          text: "True or False: ...",
          options: ["True", "False"],
          correctAnswer: "True",
        },
      ],
    },
  },
  horen: {
    teil1: {
      title: "Hören Teil 1",
      description: "Listen to the audio and answer the questions.",
      content: "Audio content for Hören Teil 1...",
      questions: [
        {
          id: 1,
          text: "What did the speaker say about...",
          options: ["Option 1", "Option 2"],
          correctAnswer: "Option 1",
        },
      ],
    },
    teil2: {
      title: "Hören Teil 2",
      description: "Listen to the conversation and answer the questions.",
      content: "Audio content for Hören Teil 2...",
      questions: [
        {
          id: 1,
          text: "Where does the conversation take place?",
          options: ["Restaurant", "Hotel"],
          correctAnswer: "Restaurant",
        },
      ],
    },
  },
  schreiben: {
    teil1: {
      title: "Schreiben",
      description: "Write an email/letter based on the given situation.",
      content: "Write a letter to your friend about your recent vacation...",
      wordLimit: 150,
    },
  },
  sprachbausteine: {
    teil1: {
      title: "Sprachbausteine Teil 1",
      description: "Fill in the blanks with the correct words.",
      content: "This is a text with _____ blanks to fill _____.",
      blanks: [
        { id: 1, options: ["some", "any"], correctAnswer: "some" },
        { id: 2, options: ["in", "on"], correctAnswer: "in" },
      ],
    },
    teil2: {
      title: "Sprachbausteine Teil 2",
      description: "Choose the correct grammatical structure.",
      content: "Select the correct form for each sentence.",
      questions: [
        {
          id: 1,
          sentence: "I _____ to school yesterday.",
          options: ["go", "went"],
          correctAnswer: "went",
        },
      ],
    },
  },
};

export const LesenData = {
  teil1: {
    texts: [
      {
        id: "t1",
        content: `Entdecken Sie interessante Städte und Regionen. Im
Herzen Deutschlands liegen wunderbare Landschaften, mit einem für deutsche Verhältnisse sehr milden
Klima – und keine typischen „Touristenziele“. Von der
netten Stadt Gießen ausgehend kann man in den hessischen Kreisen Bergstraße und Waldeck-Frankenberg
noch viele Orte entdecken, die noch ein Geheimtipp
sind.
Vor allem gilt dies für den Kreis Waldeck-Frankenberg.
Wer nicht gerade in Hessen wohnt, wird kaum eine Ahnung haben, wo diese Region eigentlich liegt. Es ist ein
herrliches Stück Deutschland ohne besonders große
Städte, eine Gegend, die Natur pur bietet. Daher wundert es nicht, dass man hier einige Kurorte fi ndet wie
Bad Arolsen oder Bad Wildungen oder den Luftkurort
Edertal-Kleinern. Apropos Edertal: Der zwölf Quadratkilometer große Edersee gehört zu den vier schönen
„blauen Augen“ des Kreises.
Der Landkreis Waldeck-Frankenberg ist Hessens attraktivstes Umland. In der Region der Berge und Seen
spürt man auch heute noch einen Hauch von Fürstlichkeit: Majestätisch erhebt sich über dem Edersee das
Schloss Waldeck. Auch in Bad Arolsen, einer ehemaligen Residenzstadt, ist vieles noch vom früheren Adel
geprägt. Unbedingt besuchen sollte man darüber hinaus das 1000-jährige Korbach wie auch die Fachwerkstadt Frankenberg mit ihren vielen romantischen Ecken.`,
      },
      {
        id: "t2",
        content: `Pferde waren schon immer Melanie Schilles große Leidenschaft. „Und jetzt kann ich Hobby und Beruf miteinander verbinden“, freut sich die junge Beamtin aus
Hannover. In die sem Jahr verstärkt sie die Strandwache
an der Nordseeküste. Ihr Arbeitsplatz ist der Strand: Mit
„Magnus“, einem 11-jährigen Pferd, patrouilliert sie dort,
wo die Kleinen Sandburgen bauen, Urlauber bei einem
Buch entspannen oder sich wagemutig in die kühlen
Fluten stür zen. Melanie Schille und ihr brauner Hannoveraner sind zweifellos eine Attraktion in dem Fe rienort.
Immer wieder wollen Gäste das Tier streicheln, von der
Polizistin wissen, was sie hier macht.
„Wir sorgen für mehr Sicherheit am Strand“, erklären
Melanie Schille und Rüdiger Teichmann (42). Sie suchen im Watt nach vermissten Kindern, klären über
Gefahren auf, verhindern Diebstähle und Sachbeschädigungen. Nachweislich gingen die Delikte zurück, seit
es die Streife hoch zu Ross gibt. Die Polizisten: „Wir sind
in dem unwegsamen Gelände oft schneller am Einsatzort als die Kollegen per Fahrrad oder mit dem Auto.
Außerdem schonen wir die Natur.“
Für sich persönlich sieht Melanie Schille noch einen
großen Vorteil: „Es ist schön, mal keine Demonstration
sichern zu müssen, stattdessen genieße ich die frische
Luft mit fröhlichen Urlaubern.“ Nur eins vermisst die
22-Jährige, die mit Polizeipferd „Magnus“ auf einem
Bauernhof Quartier bezogen hat, während ihres sechswöchigen Einsatzes: Freund Robert (23). Er fährt als
Polizist in Hannover Streife – und wartet auf sie.`,
      },
      {
        id: "t3",
        content: `Ein neuer Urlaubstrend setzt sich durch: Statt faul am
Strand zu liegen, wird man aktiv. Besonders beliebt als
Ziel ist Schweden am Ufer des Flusses Klarälven in der
Provinz Värmland. In drei bis sechs Stunden baut man
hier selbst ein Floß und macht anschließend darauf Urlaub. „Das ist Abenteuerurlaub pur“, schwärmt Urlauber
Johan Bengtson (37), der mit seiner Frau Kari (38) und
den drei Kindern Martin (13), Elfrida (11) und Peter (8)
zum zweiten Mal Floßferien macht: „Wir fühlen uns wie
Huckleberry Finn und Tom Sawyer. Sich auf dem Fluss
treiben lassen und in der Wildnis leben – dieses Gefühl
ist nicht zu überbieten!“ Seit zehn Jahren veranstaltet
Marie Junler (35) von der Agentur Vildmark i Värmland
die Holzfl oßtrips: „In der ersten Saison kamen 200 Gäste, darunter 40 Deutsche.“ In der letzten Saison waren
es schon 1700, darunter 500 Deutsche, die diesen
unvergleichlichen Natururlaub für einen Tag oder eine
ganze Woche buchten.
Wir haben die Bengtsons an ihrem ersten Urlaubstag
begleitet, auch dabei: Veranstalterin Marie Junler, die
der Familie hilft, das Floß zu bauen. Es ist ein herrlicher
Sonnentag. In einer sanften Kurve des 270 Kilometer
langen Flusses Klarälven nahe dem Dorf Branäs in Mittelschweden steht Marie bis zu den Hüften im tiefblauen Wasser. Mit fi ngerdicken grünen Seilen schnürt sie
Holzstämme zusammen. Laut schallen ihre Kommandos zu Johan und seiner Familie hinüber: „Einer hält den
Stamm, der andere knotet – den Seemannsknoten, wie
wir ihn vorhin an Land geübt haben.“ Ohne einen Nagel
werden 96 Baumstämme verzurrt – im Wasser, sonst
wäre das Holz zu schwer. Mindestens zwei Erwachsene
sind nötig, um ein Floß zu bauen – einer allein packt' s
nicht. Nach drei Stunden ist es geschafft: Das Urlaubsparadies der Bengtsons – es misst übrigens 6 mal 3
Meter und wiegt stattliche 2 Tonnen – treibt am Ufer.
Noch schnell das Sonnenzelt befestigen, darunter Vorratskasten, Frischwassertank, Chemie-Klo, Küchenausrüstung, Zelt, Rettungsring, Schwimmwesten, Notruf-Telefonnummer und das Paddel zum Steuern und
Manövrieren verstauen – und ab geht's.`,
      },
      {
        id: "t4",
        content: `Von 9 bis 15 Uhr arbeitet Sebastian Keller (18) in einem
Altenwohnheim in Hamburg-Altona: Er kümmert sich
um die Essensausgabe, putzt anschließend die Küche
und dann ist noch Zeit, um den Älteren etwas vorzulesen oder mit ihnen Karten zu spielen. Zur gleichen Zeit
putzen Rebecca (12) und Christiane (13) den Eingang
des Hamburger „Michels“, der wohl bekanntesten Kirche der Stadt, und Friderike (17) füttert schon früh morgens Kühe, Schweine und Hühner auf einem Bio-Bauernhof bei Wedel.
„Endlich mal ein sinnvoller Job“, sagen die fünf übereinstimmend. Sie stehen stellvertretend für etwa 100.000
Jugendliche, die beim „Sozialen Tag“ mitgemacht haben. Hut ab! Und was mindestens ebenso beeindruckend ist: Der Verein „Hamburgs Schüler helfen“ (HSH)
wurde von den Jugendlichen selbst im Jahr 2004 gegründet – und seitdem fi ndet jedes Jahr im August der
„Soziale Tag“ statt. Mit Behörden und Firmen haben
Schüler aus Hamburg Verträge für einen Tag abgeschlossen. Die Schülerinnen und Schüler verdienen
dann am „Sozialen Tag“ zwischen 6 und 8 Euro pro
Stunde – aber nicht für sich selbst, sondern für andere.
Denn der Verdienst wird jedes Jahr gespendet. Die Jugendlichen selbst wählen ein Projekt aus, an das sie die
Gelder spenden wollen. Einzige Bedingung: Es muss
ein Projekt sein, von dem Jugendliche profi tieren. Im
letzten Jahr zum Beispiel wurde die Gesamtsumme von
1,2 Millionen Euro an das Projekt „Frieden für alle“ gespendet. Ziel des Projekts ist es, Jugendliche in Kriegs-
und Krisenregionen zu unterstützen, den Dialog unter
Jugendlichen aus verschiedenen Ländern zu fördern
und auch das Kennenlernen anderer Kulturesn zu ermöglichen. So konnte von dem Geld, das der Verein
HSH gespendet hat, eine internationale Online-Zeitschrift hergestellt werden, in der Jugendliche ihre Länder, kulturelle Besonderheiten oder auch ihre Sprache
vorstellen konnten. Für Ralf Waldner (20) vom HSH
steht fest: „Wir können und werden anderen auch in
Zukunft helfen, das Engagement der Schülerinnen und
Schüler in Hamburg ist in den letzten Jahren schließlich
immer weiter gestiegen."`,
      },
      {
        id: "t5",
        content: `Die Windjacken waren schon eingepackt, die Koffer
geschlossen. Thomas Meurer (64) und Wiebke Fuchs
(62) aus Hannover freuten sich auf ihre Flusskreuzfahrt
mit der „MS Eurostar“ von Potsdam nach Prag. Stattliche 2500 Euro kostete die Reise pro Person, und beide
hatten lange gespart, um sich das leisten zu können.
Doch aus der Kreuzfahrt wurde eine Bustour. Meurer
berichtet, was er erlebt hat: „Wir waren am Abend auf
das Schiff gegangen und hatten unsere Kabinen bezogen. Am nächsten Morgen ging es los. Aber schon bald
machte das Schiff wieder fest und alle Gäste mussten
von Bord." Wiebke Fuchs ergänzt: „Der Fluss hatte einfach zu wenig Wasser, da konnten wir mit dem großen
Kreuzfahrtschiff nicht weiterfahren!“ Per Bus ging es
nach Prag. Beide wollen nun einen Teil des Reisepreises zurück, aber der Veranstalter Hapag-Lloyd wehrt
ab: „Das war höhere Gewalt, da kann man nichts machen.`,
      },
    ],

    titles: [
      { id: "a", text: "Am Strand im Dienst - mehr Sicherheit für Urlauber" },
      { id: "b", text: "Bäder, Seen und Natur – im hessischen Paradies" },
      { id: "c", text: "Freiheit und Natur – nach sechs Wochen harter Arbeit" },
      { id: "d", text: "Jugendliche arbeiten für Jugendliche" },
      {
        id: "e",
        text: "Kinderarbeit in Deutschland: Jugendliche werden zur Arbeit gezwungen",
      },
      { id: "f", text: "Nach harter Arbeit durch nordische Gewässer" },
      { id: "g", text: "Schaden an Kreuzfahrtschiff verhindert Weiterfahrt" },
      { id: "h", text: "Urlaub an deutschen Seen immer gefährlicher" },
      { id: "i", text: "Wegen Niedrigwasser: vom Fluss auf die Straße" },
      { id: "j", text: "Zu Gast bei den Fürsten" },
    ],
    correctAnswers: {
      1: "b", // Text 1 → Title B
      2: "a", // Text 2 → Title A
      3: "f", // Text 3 → Title F
      4: "d", // Text 4 → Title D
      5: "i", // Text 5 → Title I
    },
  },

  teil2: [
    {
      id: 1,
      title: "Korbjagd zu Pferde",
      text: `Wer sich unter dem zweimal pro Woche stattfindenden Training auf dem Wiesbadener Hofgut Adamstal eine Art "Kuschelrunde" vorgestellt hatte, der wird schnell eines Besseren belehrt, und der neugierige Betrachter fühlt sich eher auf einen Fußballplatz als in eine Reithalle versetzt. Die festgelegten Spielzüge, die es einzustudieren gilt, sind Bestandteil einer Sportart, die hierzulande allenfalls eine Randerscheinung ist: Horse-Ball. "Es kommen immer mehr Aktive dazu", versichert jedoch Hans-Jürgen Faust (59), Hausherr auf Hofgut Adamstal und Präsident des Deutschen Horse-Ball-Verbandes. Irgendwo in Hagen, Düsseldorf, München oder Heidelberg soll es noch ein paar vereinzelte Akteure geben, das eigentliche Geschehen aber spielt sich hier ab, wo einer der wohl kleinsten Sportverbände Deutschlands vor 15 Jahren aus der Taufe gehoben wurde und wo die erste Mannschaft der Reitergruppe Wiesbaden (RGW) identisch ist mit der National-Auswahl. Aber diesen Sport betreiben nicht nur Erwachsene: Die jüngsten Spieler sind nicht älter als acht. Horse-Ball ist - vereinfacht gesagt - eine Art Basketball zu Pferde.

An den beiden Enden des circa 25 mal 70 Meter großen Spielfeldes sind die Korbringe nicht waagerecht, sondern senkrecht ausgerichtet und mit Fangnetzen versehen, in denen die Bälle nach einem gelungenen Spielzug landen. Keine leichte Aufgabe, wie die bereits erwähnten ersten Trainingseindrücke zeigen, aber Übung macht eben auch hier den Meister. Zumindest auf nationaler, sprich: Wiesbadener Ebene. Darüber hinaus gilt es, immer wieder Lehrgeld zu zahlen, vor allem bei Gastspielen im Heimatland Frankreich, onde Horse-Ball vor rund 25 Jahren erfunden wurde und einen viel höheren Stellenwert als hierzulande genießt. Sogar eine eigene Profiliga gibt es bei unseren südwestlichen Nachbarn, die bei den Mitte August anstehenden Europameisterschaften einmal mehr nicht nur Gastgeber, sondern auch wieder Anwärter auf den Titel sind.

Wer es übrigens selbst einmal ausprobieren möchte: Im kommenden Monat bieten die Wiesbaden Buffalos für maximal zwölf Teilnehmer einen Einstiegs-Lehrgang an. Dabei mitzubringen sind reiterliche Grundkenntnisse und ein sogenannter Drei-Punkt-Helm. Alles andere wird - inklusive Vierbeiner bei Bedarf - gestellt. "Natürlich können auch eigene Pferde mitgebracht werden", sagt Faust. Die Tiere müssen "sozialverträglich" sein, erläutert der 59-Jährige, und das nicht nur im Umgang mit dem Reiter, sondern vor allem untereinander. "Im richtigen Wettkampf kann es auch schon mal zu Zusammenstößen kommen", weiß Faust, für den Horse-Ball zu einem ganz persönlichen "Steckenpferd" geworden ist, das in der vielfältigen Angebotspalette des riesigen Hofguts eine Art Sonderstatus einnimmt.

Damit es trotz unvermeidlichen Körperkontakts kaum einmal zu ernsthaften Verletzungen kommt, tragen nicht nur die Pferde vorgeschriebene Bandagen an den Beinen, sondern auch für die Reiter gibt es eine spezielle Vorrichtung: Ein Gurt, der unter dem Bauch der Tiere die beiden Steigbügel miteinander verbindet, gewährt selbst dann noch sicheren Halt, wenn sich der Spieler aus vollem Galopp heraus aus dem Sattel fallen lässt, um den Ball vom Boden aufnehmen zu können. Um die Handhabung dabei ein wenig zu vereinfachen, ist das runde Leder mit Fangriemen versehen, die ein sicheres Zugreifen auch mit einer Hand ermöglichen.

Aber noch eine Besonderheit weist Horse-Ball auf: Es ist die einzige Pferdesportart, bei der der Gebrauch einer Gerte (das ist ein kleiner Stock, mit dem das Pferd leicht geschlagen wird) ausdrücklich verboten ist, wie Faust betont. Damit tritt er auch etwaigen Befürchtungen entgegen, dass es zu Tierquälerei kommen könnte. Der Chef des Hofgut Adamstal: "Das Gegenteil ist der Fall. Die Tiere können beim Horse-Ball ihre natürlichen Verhaltensweisen ausleben und haben sogar Spaß dabei." Zumindest mehr als der eine oder andere Reiter, wie es angesichts des strengen Trainings den Eindruck macht.`,
      questions: [
        {
          id: 1,
          question_text: "Aktive der Wiesbadener Reitergruppe",
          option_a: "bilden die deutsche Nationalmannschaft.",
          option_b:
            "spielen schon als Achtjährige in der deutschen Nationalmannschaft mit.",
          option_c: "unterstützen die deutsche Nationalmannschaft.",
          correct_option: "a",
        },
        {
          id: 2,
          question_text: "Die Basketball-Körbe",
          option_a: "hängen wie beim normalen Basketball.",
          option_b: "sind mit dem Netz nach oben aufgehängt.",
          option_c:
            "sind so gedreht, dass ihre Öffnungen nach der Seite zeigen",
          correct_option: "c",
        },
        {
          id: 3,
          question_text: "Wer an einem Horse-Ball-Lehrgang teilnimmt",
          option_a: "braucht ein eigenes Pferd.",
          option_b: "kann sein eigenes Pferd einsetzen.",
          option_c: "muss sein Pferd jedes Mal mitbringen.",
          correct_option: "b",
        },
        {
          id: 4,
          question_text: "Beim Horse-Ball-Spiel",
          option_a: "wird ein Fußball verwendet.",
          option_b: "darf der Ball in die Hand genommen werden.",
          option_c: "darf der Ball nicht auf den Boden fallen.",
          correct_option: "b",
        },
        {
          id: 5,
          question_text: "Das Training ist so streng, dass",
          option_a:
            "die Reiter oft mehr Stress zu empfinden scheinen als die Tiere.",
          option_b:
            "die Tiere ihre naturgegebenen Anlagen nicht ausleben können.",
          option_c: "s Pferden und Reitern oft kein Vergnügen macht.",
          correct_option: "a",
        },
      ],
    },
  ],

  teil3: {
    situations: [
      { id: 1, text: "Ein Bekannter möchte Schweden per Schiff kennenlernen." },
      {
        id: 2,
        text: "Ein Freund möchte sich im Inline-Skaten perfektionieren.",
      },
      {
        id: 3,
        text: "Ein Kollege möchte sich über Gesundheitsrisiken in Ägypten informieren.",
      },
      {
        id: 4,
        text: "Eine Bekannte möchte einen Kurs über Naturkosmetik besuchen.",
      },
      {
        id: 5,
        text: "Eine 17-jährige Freundin würde gerne armen Menschen in anderen Ländern helfen.",
      },
      {
        id: 6,
        text: "Ihr Nachbar möchte sich im Sommerurlaub sportlich betätigen.",
      },
      {
        id: 7,
        text: "Ihre Freundin möchte gerne bei der Organisation einer Inline-Skate-Veranstaltung mitwirken.",
      },
      {
        id: 8,
        text: "Sie möchten das Inline-Skaten erlernen und suchen Informationen.",
      },
      {
        id: 9,
        text: "Sie möchten herausfinden, wo es in Deutschland Skate-Veranstaltungen gibt.",
      },
      {
        id: 10,
        text: "Sie möchten herausfinden, wo es in Deutschland Skate-Veranstaltungen gibt.",
      },
    ],

    ads: [
      {
        id: "a",
        title: "Schweden-Kreuzfahrt",
        text: "Entdecken Sie die schönsten Schären Schwedens auf einer luxuriösen Kreuzfahrt.",
      },
      {
        id: "b",
        title: "Inline-Skating Workshop",
        text: "Professionelle Anleitung für Fortgeschrittene. Verbessern Sie Ihre Technik!",
      },
      {
        id: "c",
        title: "Gesundheitsrisiken im Ausland",
        text: "Umfassende Informationen zu Gesundheitsgefahren in Ägypten und anderen Ländern.",
      },
      {
        id: "d",
        title: "Naturkosmetik-Seminar",
        text: "Lernen Sie, Ihre eigenen Kosmetikprodukte aus natürlichen Zutaten herzustellen.",
      },
      {
        id: "e",
        title: "Jugend-Freiwilligenarbeit",
        text: "Hilfsprojekte für Jugendliche ab 16 Jahren in Entwicklungsländern.",
      },
      {
        id: "f",
        title: "Aktiver Sommerurlaub",
        text: "Sport- und Aktivreisen für jeden Fitnesslevel. Jetzt buchen!",
      },
      {
        id: "g",
        title: "Veranstaltungshelfer gesucht",
        text: "Unterstützung bei der Organisation des Inline-Skate-Marathons gesucht.",
      },
      {
        id: "h",
        title: "Inline-Skating für Anfänger",
        text: "Kurse für Einsteiger aller Altersgruppen. Leihausrüstung verfügbar.",
      },
      {
        id: "i",
        title: "Skate-Event-Kalender",
        text: "Übersicht aller Skate-Veranstaltungen in Deutschland. Immer aktuell.",
      },
      {
        id: "j",
        title: "Veranstaltungshelfer gesucht",
        text: "Unterstützung bei der Organisation des Inline-Skate-Marathons gesucht.",
      },
      {
        id: "k",
        title: "Inline-Skating für Anfänger",
        text: "Kurse für Einsteiger aller Altersgruppen. Leihausrüstung verfügbar.",
      },
      {
        id: "l",
        title: "Skate-Event-Kalender",
        text: "Übersicht aller Skate-Veranstaltungen in Deutschland. Immer aktuell.",
      },
    ],

    correctMatches: {
      1: "a", // Schweden per Schiff → Schweden-Kreuzfahrt
      2: "b", // Inline-Skaten perfektionieren → Inline-Skating Workshop
      3: "c", // Gesundheitsrisiken in Ägypten → Gesundheitsrisiken im Ausland
      4: "d", // Kurs Naturkosmetik → Naturkosmetik-Seminar
      5: "e", // Armen Menschen helfen → Jugend-Freiwilligenarbeit
      6: "f", // Sportlich betätigen → Aktiver Sommerurlaub
      7: "g", // Organisation Inline-Skate → Veranstaltungshelfer gesucht
      8: "h", // Inline-Skaten erlernen → Inline-Skating für Anfänger
      9: "i", // Skate-Veranstaltungen finden → Skate-Event-Kalender
      10: "l", // Skate-Veranstaltungen finden → Skate-Event-Kalender
    },
  },
};

export const sprachbausteine1Data = [
  {
    id: "1",
    title: "Deutschkurs Anmeldung",
    content: [
      "Sehr geehrte Frau Szabo, vielen Dank für Ihr Interesse",
      { type: "dropdown", id: 1, options: ["an", "bei", "in"], correct: "an" },
      "unseren Deutschkursen. Anbei erhalten Sie das angeforderte Anmeldeformular, das Sie bitte ausgefüllt an uns zurückschicken. Mit der Anmeldung überweisen Sie bitte eine Anzahlung",
      {
        type: "dropdown",
        id: 2,
        options: ["in Betrag", "in Höhe", "in Summe"],
        correct: "in Höhe",
      },
      "von € 200,- auf unser Konto. Die Kontoverbindung finden Sie unten auf dem Anmeldeformular.",
      {
        type: "dropdown",
        id: 3,
        options: ["für", "zur", "Zwecks"],
        correct: "Zwecks",
      },
      "besserer Einschätzung Ihrer Vorkenntnisse haben wir einen Einstufungstest beigelegt. Wenn Sie die Tetsbögen ausfüllen und mit der Anmeldung an uns zurücksenden, helfen Sie uns bei der Kursplanung. Ein mündlicher Test wird sich am ersten Unterrichtstag in unserer Schule",
      {
        type: "dropdown",
        id: 4,
        options: ["angeschlossen", "anschließen", "anschließen an"],
        correct: "anschließen",
      },
      ". Damit sind wir in der Lage, den für Sie angemessenen Kurs auszuwählen. Außerdem finden Sie in den Unterlagen einen Fragenbogen",
      {
        type: "dropdown",
        id: 5,
        options: ["anlässlich", "bezüglich", "mittels"],
        correct: "bezüglich",
      },
      "Ihrer Freizeitinteressen. Wir werden uns bemühen, Ihnen den Aufenthalt in Leipzig so angenehm",
      {
        type: "dropdown",
        id: 6,
        options: ["als", "wenn", "wie"],
        correct: "wie",
      },
      "möglich zu gestalten. Schließlich füllen Sie bitte das grüne Unterkunftblatt aus. Sie können wählen zwischen einem 3-Sterne-Hotel,",
      {
        type: "dropdown",
        id: 7,
        options: ["ein", "einem", "einer"],
        correct: "einer",
      },
      "Privatunterkunft in einer deutschen Gastfamilie oder der Unterkunft in einem Studentenwohnheim. Letzteres ist nur in den Semesterferien der Universität - in der Regel vom 15.2. bis 15.4. und vom 15.7. bis 15.10. - möglich. Geben Sie bitte auch Ihre Verpflegungswünsche - Frühstück oder Halbpension - an. Beachten Sie aber, dass im Studentenwohnheim nur Selbstverpflegung möglich ist.",
      {
        type: "dropdown",
        id: 8,
        options: ["Sobald", "Sofort", "Sooft"],
        correct: "Sobald",
      },
      "Ihre Anmeldung bei uns eingegangen ist, erhalten Sie eine Anmeldebestätigung und einen Stadtplan mit Wegbeschreibung,",
      {
        type: "dropdown",
        id: 9,
        options: ["dafür", "damit", "dazu"],
        correct: "damit",
      },
      "Sie den Weg zu uns ohne Umstände finden. Die Adresse Ihrer Unterkunft erhalten Sie ca. 2 Wochen vor Kursbeginn.",
      {
        type: "dropdown",
        id: 10,
        options: ["bei", "Für", "Zu"],
        correct: "Für",
      },
      "weitere Fragen steht Ihnen unser Sekretariat gerne montags bis freitags von 8 bis 18 Uhr zur Verfügung. Mit freundlichen Grüßen Gerhard Dietz Direktor",
    ],
  },
];

// data.js
export const HorenData = {
  teil1: [
    {
      id: 1,
      text: "Laut BILD AM SONNTAG können in Zukunft nur Mieter...",
      correctAnswer: false,
    },
    {
      id: 2,
      text: "In bestimmten ghfh sollen Wohnhäuser abgerissen...",
      correctAnswer: true,
    },
    {
      id: 3,
      text: "In bestimmten Bundesländern sollen Wohnhäuser abgerissen...",
      correctAnswer: true,
    },
    {
      id: 4,
      text: "In bestimmten Bundesländern sollen Wohnhäuser abgerissen...",
      correctAnswer: true,
    },
    {
      id: 5,
      text: "In bestimmten Bundesländern sollen Wohnhäuser abgerissen...",
      correctAnswer: true,
    },
  ],
  teil2: [
    {
      id: 1,
      text: "Laut BILD AM SONNTAG können in Zukunft nur Mieter...",
      correctAnswer: false,
    },
    {
      id: 2,
      text: "In bestimmten Bundesländern sollen Wohnhäuser abgerissen...",
      correctAnswer: true,
    },
    {
      id: 3,
      text: "In bestimmten Bundesländern sollen Wohnhäuser abgerissen...",
      correctAnswer: true,
    },
    {
      id: 4,
      text: "In bestimmten Bundesländern sollen Wohnhäuser abgerissen...",
      correctAnswer: true,
    },
    {
      id: 5,
      text: "In bestimmten Bundesländern sollen Wohnhäuser abgerissen...",
      correctAnswer: true,
    },
    {
      id: 6,
      text: "Laut BILD AM SONNTAG können in Zukunft nur Mieter...",
      correctAnswer: false,
    },
    {
      id: 7,
      text: "In bestimmten Bundesländern sollen Wohnhäuser abgerissen...",
      correctAnswer: true,
    },
    {
      id: 8,
      text: "In bestimmten Bundesländern sollen Wohnhäuser abgerissen...",
      correctAnswer: true,
    },
    {
      id: 9,
      text: "In bestimmten Bundesländern sollen Wohnhäuser abgerissen...",
      correctAnswer: true,
    },
    {
      id: 10,
      text: "In bestimmten Bundesländern sollen Wohnhäuser abgerissen...",
      correctAnswer: true,
    },
  ],
  teil3: [
    {
      id: 1,
      text: "Laut BILD AM SONNTAG können in Zukunft nur Mieter...",
      correctAnswer: false,
    },
    {
      id: 2,
      text: "In bestimmten Bundesländern sollen Wohnhäuser abgerissen...",
      correctAnswer: true,
    },
    {
      id: 3,
      text: "In bestimmten Bundesländern sollen Wohnhäuser abgerissen...",
      correctAnswer: true,
    },
    {
      id: 4,
      text: "In bestimmten Bundesländern sollen Wohnhäuser abgerissen...",
      correctAnswer: true,
    },
    {
      id: 5,
      text: "In bestimmten Bundesländern sollen Wohnhäuser abgerissen...",
      correctAnswer: true,
    },
  ],
};
