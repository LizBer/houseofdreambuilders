# Holi Her — drie landingspagina's

Eén dienst: cupping bij een keizersnedelitteken. Eén doorlopende pagina per versie,
dezelfde Nederlandse tekst, drie heel verschillende handschriften. Open `index.html` om ze
naast elkaar te zien, of start ze met `node serve.mjs` (http://localhost:4400).

## De opbouw, bij alle drie hetzelfde

1. **Kop** — de belofte, één regel, met de knop
2. **Het probleem** — vijf cijfers, 01 tot 05. Hoveren, klikken of tabben zoomt in op die
   klacht: het trekt · gevoelig of juist gevoelloos · niemand kijkt ernaar · het doet pijn ·
   het doet iets met je
3. **De verandering** — waar je naartoe werkt, zes uitkomsten, plus wat er níet beloofd wordt
4. **Wat vrouwen zeggen** — ruimte voor reviews (nog leeg, zie hieronder)
5. **De behandeling** — wat cupping is en hoe het uur verloopt in vier stappen
6. **Mijn verhaal** — wie je bent en waarom je je op dit ene toelegt
7. **De prijs** — één behandeling, één tarief, met de voorwaarden eronder
8. **Vragen en twijfels** — negen vragen die mensen tegenhouden, eerlijk beantwoord
9. **Afspraak** — het formulier en je gegevens

## De drie versies

| | A. Eén warme kamer | B. Licht | C. Stil |
|---|---|---|---|
| Map | `a-holiher/` | `b-licht/` | `c-stil/` |
| Grond | Klei uit je logo, crème letters | Botkleurig papier, espresso inkt | Bijna zwart espresso, botkleurige letters |
| Letters | Instrument Serif + Jost | Bodoni Moda + Archivo | Cormorant Garamond + Figtree |
| Accent | Goud | Terracotta uit je logo | Goud |
| Kop | Foto over het hele scherm, tekst erover | Redactionele split: tekst links, foto breed eronder | Foto over het hele scherm, tekst gecentreerd |
| De vijf cijfers | Lijst links, verhaal zoomt rechts in | Rij over de volle breedte, verhaal valt eronder open | Kaartjes naast elkaar, verhaal gecentreerd eronder |
| Extra | Lopende band met pauzeknop | Terracotta streep boven het gekozen cijfer | Gouden draad langs de rand die meeloopt |

## De reviews zijn leeg, met opzet

Ik verzin geen woorden van cliënten. Op elke versie staan drie lege plekken met daarin wat
erin hoort: haar woorden, haar voornaam, en hoeveel weken of jaren na de bevalling ze kwam.
Vraag na een paar behandelingen of je iemand mag citeren. Verzonnen reviews zijn niet alleen
misleidend, ze zijn ook meteen te herkennen.

## Wat er nog ingevuld moet worden

Elke ontbrekende feit staat op de pagina met een stippellijn eromheen:

- Je naam en je achtergrond (Mijn verhaal)
- Adres, openingstijden, telefoonnummer (Afspraak)
- De duur en de prijs van een afspraak (De prijs)
- Het antwoord over vergoeding door de verzekering (Vragen)
- De drie reviews
- Het formulier: zet `data-endpoint` op het `<form>` naar een formulierdienst. Zolang dat
  leeg is zegt het formulier eerlijk dat er niets verstuurd is, en doet het nooit alsof.
- Een sitemap en een deelafbeelding, zodra er een domeinnaam is

## Foto's

Eén foto is er: het keizersnedelitteken, in de kop van alle drie. De andere plekken zijn
leeg en vertellen wat erin hoort en op welk formaat. Zet je bestand in de map van de versie
en roep `hallmarkSlots({ portret: 'mijn-foto.jpg' })` aan, of zet er een `<img>` in.

## Merkbestanden

In `brand/` van elke versie: je originele logo, plus uitgeknipte versies in crème (voor de
donkere pagina's) en in terracotta (voor de lichte), als heel logo, als woordmerk en als
beeldmerk.

## Gecontroleerd

Met de awwwards-gereedschappen, op alle drie: geen fouten in de console, geen ernstige
toegankelijkheidsproblemen, niets dat buiten beeld loopt tussen 320 en 1920 pixels,
zichtbare focus overal, de cijfers werken met muis, vinger én toetsenbord, en zonder
JavaScript staan alle vijf de klachten gewoon onder elkaar.
