# Zen Sand

Meditativer Falling-Sand-Sandkasten per Canvas (Cellular Automaton). Kein Ziel, kein Timer, kein Game Over – einfach reinmalen und zuschauen.

Kein Server, kein Build – einfach `index.html` öffnen.

## Materialien
Grundmaterialien schalten sich frei, je mehr insgesamt gemalt wurde (Fortschrittsbalken): Sand → Stein → Wasser → Pflanze → Sporen → Feuer → Draht. Jedes Material hat ein eigenes Icon (Palette, Hotbar, Quest-Karten) für schnelle Wiedererkennung.

Darüber hinaus gibt es Spezialmaterialien, die nur über Herausforderungen (siehe unten) freigeschaltet werden, jedes mit eigener, bewusst andersartiger Physik:
- **Öl** – schwimmt auf Wasser, brennt heißer/länger
- **Eis** – schmilzt bei Feuer/Lava zu Wasser; Wasser kann neben Eis langsam gefrieren
- **Schnee** – fällt wie Sand, schmilzt schnell
- **Lava** – dickflüssig, entzündet Pflanzen/Öl, wird bei Wasserkontakt zu Stein + Dampf
- **Glas** – entsteht automatisch, wenn Sand lange genug neben Feuer/Lava liegt
- **Honig** – extrem zähflüssig
- **Regenbogensand** – kosmetische Variante mit wanderndem Farbton
- **Sporen** – schwebt erratisch umher (nicht wie Sand/Schnee geradlinig), verschwindet nach einer Weile oder schlägt auf Sand/Schlamm Wurzeln und wird zur Pflanze
- **Säure** – ätzt Sand/Stein/Glas/Eis/Pflanze/Schnee bei Kontakt weg, verbraucht sich dabei selbst und löst sich irgendwann auf
- **Schlamm** – entsteht automatisch, wenn Sand lange genug neben Wasser liegt; extrem zäh/klebrig, trocknet zurück zu Sand, wenn kein Wasser mehr in der Nähe ist
- **Kristall** – wächst nur, wenn gleichzeitig Stein UND Wasser angrenzen, verzweigt sich in zufällige Richtungen (nicht nur nach oben wie Pflanzen), glitzert animiert
- **Giftgas** – steigt langsam auf und breitet sich seitlich aus, um Räume zu füllen (bleibt viel länger als Dampf), tötet angrenzende Pflanzen
- **Zündschnur** – reine Lunte: entzündet sich an Feuer/Lava und trägt die Flamme mit sichtbarer Verzögerung an verbundene Zündschnur-Zellen weiter, bis sie am Ende explodiert/entflammt – perfekt für selbstgebaute Fallen und Kettenreaktionen
- **Quecksilber** – dichteste Flüssigkeit im Spiel, sinkt durch Wasser, Öl, Honig und sogar Sand hindurch, spreizt sich kaum seitlich
- **Treibsand** – sieht aus wie Sand, lässt aber alles was darauf liegt (Sand, Stein, Pflanze, Glas) langsam einsinken und verschwinden
- **Fisch** – kleine Kois, die gemächlich durchs Wasser schwimmen, an Hindernissen wenden und ab und zu die Tiefe wechseln. Können direkt ins Wasser gemalt werden. An Land zappeln sie und ersticken nach einer Weile; Feuer, Lava, Säure und Strom im Wasser sind tödlich – Vorsicht mit Elektrik am Teich!
- **Ameise** – gräbt sich durch Sand und hinterlässt sichtbare Tunnel; trägt aufgesammelte Körner nach oben und häuft sie dort zu kleinen Sandhügeln auf. Können nur auf bestehenden Sand gemalt werden. Feuer, Lava, Säure und Wasser sind tödlich.

### ⚡ Elektrizität
- **Draht** – statisches, leitendes Metall (säurefest!). Wird er geladen, wandert die Ladung als sichtbare gelbe Welle durchs Netz. Geladene Drähte zünden Öl und Zündschnüre, schmelzen langsam Eis.
- **Batterie** – statische Dauerstromquelle: lädt angrenzende Drähte (und Wasser) permanent auf.
- **Wasser leitet!** Geladene Drähte elektrisieren angrenzendes Wasser – die Ladung breitet sich durch den ganzen Wasserkörper aus (hellblau flackernd), einzelne Zellen verdampfen zischend. Und Wasser lädt umgekehrt wieder Drähte – Vorsicht bei nassen Schaltkreisen.
- **Blitze laden**: Ein Gewitter-Blitz, der Draht oder Wasser trifft, jagt einen einzelnen Ladungspuls durchs Netz – perfekt für blitzgetriggerte Fallen.

Herausforderungen zum Freischalten der Spezialmaterialien: Feuerlöscher→Öl, Seebaumeister→Eis, Frostig→Schnee, Waldbrand→Lava, Alchemist→Glas, Geologe→Honig, Vollbild→Regenbogensand, Glasbläser→Säure, Sumpfland→Schlamm, Ozeanmeister→Kristall, Flächenbrand→Giftgas, Kettenreaktion→Zündschnur, Schwermetall→Quecksilber, Wüstenwanderer→Treibsand, Elektriker→Batterie, Biotop→Fisch, Sandburg→Ameisen.

## Atmosphäre (immer aktiv)
Eine reine Deko-Ebene über dem Sandkasten – greift nie in die Physik ein und lebt auch bei pausierter Simulation weiter, im Takt des Tag/Nacht-Zyklus (~90 s, per Regler auch manuell einstellbar, siehe unten):
- **Himmel**: weicher Farbverlauf von tiefer Nacht über Morgen-/Abenddämmerung bis zum hellen (aber nie grellen) Taghimmel; Sonne und Mond wandern dabei sichtbar als Bogen mit sanftem Glow über die Fläche
- **Nachts**: funkelnder Sternenhimmel über freien Flächen (nur bei echter Dunkelheit sichtbar), gelegentlich eine Sternschnuppe; Glühwürmchen blinken und tanzen über den Pflanzen
- **Tagsüber**: Schmetterlinge flattern über den Pflanzen (je mehr Grün, desto eher tauchen sie auf)
- **Dynamisches Licht**: Feuer, Lava, Kristall, geladene Drähte, Batterie und brennende Zündschnur beleuchten ihre Umgebung – der dunkle Hintergrund hellt sich in einem warmen (oder bei Kristall kühlen) Schein auf, benachbarte Materialien werden sichtbar angestrahlt
- **Screen-Shake**: Bombe, Dynamit und Nuke lassen die Fläche kurz erzittern (Stärke je nach Sprengkraft), auch ein Blitzeinschlag gibt einen kleinen Ruckler
- **Windspiel**: Im ASMR-Modus erklingen ab und zu sanfte pentatonische Glockentöne, wie ein fernes Windspiel

## Herausforderungen & Rang
Ein Achievement-System läuft im Hintergrund mit und schaltet Spezialmaterialien sowie Werkzeuge frei, sobald bestimmte Dinge im Sandkasten passiert sind (z. B. "Lösche 5-mal Feuer mit Wasser", "Halte gleichzeitig 250 Wasser-Zellen", "Löse 10 Explosionen aus"). Jede Freischaltung löst einen kleinen Konfetti-Effekt + Sound-Jingle aus.

Das Quest-Log (rechte Seitenleiste) zeigt oben einen **Rang** (Sandkasten-Neuling → Hobby-Alchemist → Elementmeister → Katastrophen-Experte → Weltenformer → Zen-Großmeister, je nach Anzahl abgeschlossener Erfolge) mit Gesamtfortschrittsbalken. Offene Quests sind nach Nähe zur Fertigstellung sortiert (die, die am kurzweiligsten vor der Freischaltung stehen, oben), jede Quest-Karte hat einen farbigen Rand und ein Icon passend zum freizuschaltenden Material. Abgeschlossene Quests wandern in einen einklappbaren "✅ Abgeschlossen"-Bereich unten.

Darunter ein einklappbares **"📊 Lebenszeit-Statistik"**-Panel mit allen Kennzahlen (platzierte Körner, Explosionen, geschmolzenes Eis, Peak-Wasser/-Pflanzen, u.v.m.), und ganz unten ein **"🔄 Fortschritt zurücksetzen"**-Button: setzt nach Bestätigung alle Erfolge, Werkzeuge und Spezialmaterialien zurück auf null – die Zeichenfläche selbst bleibt dabei erhalten (wer aktuell z. B. viel Wasser auf der Fläche hat, kann dadurch manche Peak-Erfolge sofort wieder auslösen, das ist beabsichtigt).

### Werkzeuge
- **💨 Wind**: Klicken/Ziehen pustet lose Materialien (Sand, Wasser, Öl, Honig, Schnee, Dampf, Regenbogensand) vom Klickpunkt weg, mehrere Durchläufe pro Klick für spürbaren Effekt.
- **☄️ Meteor**: Lässt an zufälliger Stelle einen Feuer-/Lava-Klumpen vom Himmel fallen.
- **💣 Bombe / 🧨 Dynamit / ☢️ Nuke**: Klick-zielbare Explosionen mit steigendem Radius. Kern vernichtet alles (auch Stein), mittlerer Ring entzündet Pflanzen/Öl und trägt Nicht-Stein-Material ab, äußerer Ring stößt lose Materialien weg. Die Nuke hinterlässt zusätzlich eine aufsteigende Dampf-/Rauchsäule.
- **⛈️ Gewitter / ❄️ Schneesturm**: Umschaltbare Wettermodi statt einmaliger Aktionen – laufen weiter, bis man sie wieder ausschaltet. Gewitter bringt leichten Dauerregen plus gelegentliche Blitzeinschläge (entzünden Pflanzen/Öl), Schneesturm sorgt für Dauerschneefall plus gelegentliche Windstöße.

## Vorgefertigte Karten
Immer verfügbar, kein Freischalten nötig – prozedural generierte Startszenen zum sofortigen Loslegen:
- 🏝️ **Insel**, 🪷 **Teich**, 🌋 **Vulkan**, 🏜️ **Wüste** – die Klassiker
- ⛏️ **Bergwerk** – ein Stollensystem aus miteinander verbundenen Höhlenkammern in einem Stein-Massiv, mit einer Treibsandfalle und einem Wasserbecken samt Kristallkeimen zum Weiterwachsen
- 🐸 **Giftsumpf** – ein Schlammboden mit Wasserlöchern und darüber hängenden Giftgaswolken, ein paar vereinzelte Pflanzen
- 💎 **Kristallhöhle** – eine ausgehöhlte Steinkaverne mit einem Wasserbecken am Boden und Kristallkeimen an den Wänden zum Weiterwachsen
- 🧨 **Sprengplatz** – eine Steinbunker-Kammer voller Öl, mit einer Zündschnur, die vom offenen Feld bis hinein führt: Feuer ans linke Ende halten und zusehen, wie die Flamme rüberläuft und die Ladung hochgeht

## Gärten (eigene Speicherstände)
Neben dem einen Auto-Save-Slot lassen sich beliebig viele eigene Kreationen unter einem Namen sichern (linke Seitenleiste, unter "Karten"): **💾 Garten speichern** öffnet einen kleinen Namens-Dialog, danach erscheint der Garten in der Liste mit Datum, 📂 zum Laden (überschreibt die aktuelle Fläche, per Rückgängig widerrufbar) und 🗑️ zum endgültigen Löschen (mit Bestätigung). Maximal 12 Gärten gleichzeitig, um den Browser-Speicher nicht zu sprengen.

## Sound (ASMR-Modus)
Rein prozedural erzeugt (Web Audio API, keine Audiodateien): ein leiser, sich langsam wandelnder Ambient-Drone läuft durchgehend; Wasser/Feuer/Dampf/Lava erzeugen bei ausreichender Menge auf der Fläche zufällige, gefilterte Rauschtexturen (Plätschern/Knistern/Zischen/Brodeln); jede Material-Platzierung gibt einen kurzen tonalen Blip (Tonhöhe je nach Material); Explosionen erzeugen einen Bass-Boom + Rauschknall (Stärke je nach Bombe/Dynamit/Nuke); Freischaltungen lösen ein aufsteigendes Glockenspiel aus. Sound startet erst nach der ersten Interaktion (Browser-Autoplay-Regel) und lässt sich über 🔊/🔇 stummschalten (Einstellung bleibt gespeichert).

## Layout
Auf breiten Bildschirmen (ab ~1100px) drei Spalten: links Materialien/Werkzeuge/Karten, mitte die Zeichenfläche, rechts das Quest-Log. Beide Seitenleisten lassen sich über den kleinen Pfeil-Button an ihrem Rand ein- und ausklappen (Zustand bleibt gespeichert); auf schmaleren Bildschirmen fällt alles automatisch in eine gestapelte Spalte zurück.

## Hotbar & Tastenkürzel
Unter der Zeichenfläche zeigt eine Hotbar-Leiste die ersten 10 aktuell freigeschalteten Werkzeuge (Radierer zuerst, dann Materialien, dann Bombe/Dynamit/Nuke/Wind) mit ihrer Zifferntaste. Einfach **1–9 und 0** drücken, um blitzschnell zu wechseln, ganz ohne Maus – wächst automatisch mit, sobald mehr freigeschaltet wird.

## Weitere Funktionen
- **🪞 Spiegeln**: Spiegelt jeden Pinselstrich (und jedes Werkzeug, auch Explosionen!) an der vertikalen Mittelachse – für symmetrische Muster/Mandalas.
- **↩️ Rückgängig** (auch Strg/Cmd+Z): Macht den letzten Strich, die letzte Kartenladung oder das letzte Leeren rückgängig (History mit 15 Schritten).
- **Tag/Nacht-Zyklus**: Der Hintergrund der leeren Fläche wandert langsam (ca. 90 Sekunden pro Zyklus) zwischen dunkel und etwas heller – rein atmosphärisch, ohne Spielauswirkung.
- "PNG speichern" exportiert den aktuellen Stand als hochskaliertes Bild.
- Die Fläche wird automatisch alle paar Sekunden sowie beim Schließen gespeichert und beim nächsten Laden wiederhergestellt (eigener "Leeren"-Klick löscht auch den Auto-Save).

## Steuerung
- Klicken/Ziehen auf der Fläche malt mit dem aktiven Material
- **Formen-Werkzeuge** neben dem Pinsel-Slider: ✏️ Freihand, 📏 Linie, ▭ Rechteck (beide mit Live-Vorschau beim Aufziehen), 🪣 Füllen (füllt zusammenhängende leere Bereiche; mit dem Radierer löscht es eine zusammenhängende Materialfläche)
- Radierer löscht (funktioniert immer, unabhängig vom Material)
- Pinselgröße per Slider, Hotbar/Zifferntasten für schnellen Wechsel
- **Pause & Tempo** (unter der Fläche): ⏸️ pausiert die Simulation (auch Leertaste; malen geht weiter – in Ruhe bauen, dann abspielen!), Punkt-Taste macht im Pausenmodus einen Einzelschritt, der Tempo-Button schaltet zwischen 0.25× (Zeitlupe) bis 4× (Zeitraffer) um
- **Zoom & Pan**: Mausrad über der Fläche zoomt zum Cursor (bis 8×), Alt+Ziehen oder mittlere Maustaste verschiebt den Ausschnitt, ↺ setzt die Ansicht zurück
- **Tageszeit-Regler** (unter Pause/Tempo/Zoom): Schieberegler stellt die Tageszeit frei ein (Sonne/Mond/Himmelsfarbe/Sterne folgen sofort), "🔄 Auto" kehrt nahtlos zum automatischen Zyklus zurück
- "Leeren" setzt nur die Fläche zurück, nicht den Freischalt-Fortschritt

## Ideen für später
- Teilen per Link-Code, Timelapse-/GIF-Export
- Szenario-Puzzles ("Rette den Wald"), PWA/Mobile
