# Holi Her — drie volledige websites

Eén behandeling: cupping bij een keizersnedelitteken. Eén merk, dezelfde Nederlandse
teksten, drie manieren om het te brengen. Open `index.html` om ze naast elkaar te zien,
of start ze zelf met `node serve.mjs` (dan staan ze op http://localhost:4400).

Alle drie zijn af: zes pagina's, gewone HTML en CSS, geen bouwstap, hooguit twee
lettertypes per site.

| Pagina | Bestand |
|---|---|
| Start | `index.html` |
| De behandeling | `behandeling.html` (bij A: `cupping.html`) |
| Over mij | `over-mij.html` |
| Vragen | `vragen.html` |
| Afspraak maken | `afspraak.html` |
| 404 | `404.html` |

## A. Eén warme kamer — `a-holiher/`

| | |
|---|---|
| Idee | De site verlaat de kleigrond nooit. Alleen de woorden en de foto's veranderen. |
| Kleur | De klei en het goud van je logo; crèmekleurige letters. |
| Letters | Instrument Serif voor die ene kop, Jost in lichte kapitalen voor de rest. |
| Blikvanger | Jouw foto vult het eerste scherm, met één regel eroverheen. |
| Overgenomen van ever.co.id | De ene warme grond, de driedelige balk bovenaan, de grote schreefkop over een dichtbij genomen foto, de lopende band. |

## B. Zeven lagen diep — `b-zeven-lagen/`

| | |
|---|---|
| Idee | Een keizersnede gaat door zeven lagen. Dat is de hele site: wat eronder zit, niet wat je ziet. |
| Kleur | Botkleurig papier, diep espresso-bruin, terracotta uit je logo, goud als tweede lijn. |
| Letters | Bodoni Moda, hoog contrast, over Archivo. |
| Blikvanger | Een tekening van de zeven lagen die uit elkaar schuift terwijl je leest, en de foto over de volle breedte met een onderschrift ernaast. |
| Waarom het past | Het is het enige stuk uitleg dat vrouwen nergens anders krijgen, en het is eerlijk: de buikspieren worden opzijgeschoven, niet doorgesneden. |

## C. Stil — `c-stil/`

| | |
|---|---|
| Idee | Geen pagina om door te scrollen maar hoofdstukken om door te lopen, elk een volledig scherm. |
| Kleur | Bijna zwart espresso, botkleurige letters, goud als enige signaal. |
| Letters | Cormorant Garamond, licht, op posterformaat. |
| Blikvanger | De gouden draad langs de linkerrand die meeloopt met het hoofdstuk dat je leest, en de foto als heel hoofdstuk. |
| Let op | De hoofdstukken klikken zachtjes in (`proximity`, geen harde sprongen), en bij minder beweging staat dat helemaal uit. |

## Wat nog ingevuld moet worden

Op alle drie de sites staat elke ontbrekende feit met een stippellijn eromheen:

- Je naam en je achtergrond (Over mij)
- Adres, openingstijden, telefoonnummer, e-mailadres (Afspraak maken)
- De duur en de prijs van een afspraak (De behandeling)
- Het antwoord over vergoeding door de verzekering
- Het formulier: zet `data-endpoint` op het `<form>` naar een formulierdienst. Zolang dat
  leeg is zegt het formulier eerlijk dat er niets verstuurd is, en doet het nooit alsof.
- Een sitemap en een deelafbeelding, zodra er een domeinnaam is.

## Foto's

Eén foto is er: het keizersnedelitteken. Elke andere plek is leeg en vertelt wat erin
hoort en op welk formaat. Zet je bestand in de map van de site en roep
`hallmarkSlots({ portret: 'mijn-foto.jpg' })` aan, of zet er een `<img>` in.

## Merkbestanden

In `brand/` van elke site: je originele logo, plus uitgeknipte versies in crème (voor de
donkere sites) en in het originele terracotta (voor de lichte), als heel logo, als alleen
het woordmerk en als alleen het beeldmerk.

## Gecontroleerd

Met de awwwards-gereedschappen over alle zestien pagina's: 0 fouten in de audit, geen
meldingen in de console, geen ernstige toegankelijkheidsproblemen, niets dat buiten beeld
loopt tussen 320 en 1920 pixels, zichtbare focus overal, en alles blijft leesbaar als
iemand minder beweging heeft ingesteld.
