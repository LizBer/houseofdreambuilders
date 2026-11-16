# Holi Her — drie landingspagina's

Eén dienst: cupping bij een keizersnedelitteken. Eén doorlopende pagina per versie,
dezelfde Nederlandse tekst, drie heel verschillende handschriften. Open `index.html` om ze
naast elkaar te zien, of start ze met `node serve.mjs` (http://localhost:4400).

## De twaalf secties, bij alle drie hetzelfde

1. **Kop** — de uitkomst, met de boekknop en de foto van moeder en kind
2. **Vertrouwensbalk** — Google-cijfer, aantal vrouwen, opleiding, jaren ervaring (nog leeg)
3. **Het probleem** — vijf cijfers, 01 tot 05. Hoveren, klikken of tabben zoomt in: het trekt ·
   gevoelig of juist gevoelloos · niemand kijkt ernaar · het doet pijn · het doet iets met je.
   Met de foto van het litteken erboven
4. **De behandeling** — losse behandeling en traject van vijf, elk met duur, prijs en een
   regel "goed voor"
5. **Hoe het gaat** — vooraf, tijdens en daarna, inclusief wat je mee naar huis krijgt
6. **Wat het je kan geven** — zes uitkomsten, plus wat er níet beloofd wordt
7. **Over mij** — je portret, je verhaal, en je opleiding in een rij
8. **Ervaringen** — drie Google-reviews en twee voor-en-na-foto's (nog leeg)
9. **Prijzen** — losse behandeling, traject van vijf en cadeaubon
10. **Praktisch** — adres, parkeren, openingstijden, telefoon, WhatsApp, e-mail en de kaart
11. **Vragen en twijfels** — tien vragen: pijn, plekken, wanneer niet, hoe vaak, afzeggen
12. **Afspraak** — ruimte voor je agenda, met het formulier ernaast

## De drie versies

| | A. Eén warme kamer | B. Licht | C. Stil |
|---|---|---|---|
| Map | `a-holiher/` | `b-licht/` | `c-stil/` |
| Grond | Klei uit je logo, crème letters | Botkleurig papier, espresso inkt | Bijna zwart espresso, botkleurige letters |
| Letters | Instrument Serif + Jost | Bodoni Moda + Archivo | Cormorant Garamond + Figtree |
| Accent | Goud | Terracotta uit je logo | Goud |
| Kop | Foto over het hele scherm, tekst erover | Tekst links, foto rechts | Foto over het hele scherm, tekst gecentreerd |
| De vijf cijfers | Lijst links, verhaal zoomt rechts in | Rij over de volle breedte, verhaal valt eronder open | Kaartjes naast elkaar, verhaal gecentreerd eronder |
| Extra | Lopende band met pauzeknop | Terracotta streep boven het gekozen cijfer | Gouden draad langs de rand die meeloopt |

## De reviews zijn leeg, met opzet

Ik verzin geen woorden van cliënten. Op elke versie staan drie lege plekken met daarin wat
erin hoort: haar woorden, haar voornaam, en hoeveel weken of jaren na de bevalling ze kwam.
Vraag na een paar behandelingen of je iemand mag citeren. Verzonnen reviews zijn niet alleen
misleidend, ze zijn ook meteen te herkennen.

## Wat er nog ingevuld moet worden

Elk ontbrekend feit staat op de pagina met een stippellijn eromheen:

- Google-cijfer, aantal behandelde vrouwen, opleiding en jaren ervaring (vertrouwensbalk)
- Je naam, opleiding, bijscholing en beroepsvereniging (Over mij)
- Duur en prijs van de losse behandeling, het traject en de cadeaubon
- Adres, parkeren, openingstijden, telefoon, WhatsApp en e-mail, plus de kaart
- Het antwoord over vergoeding door de verzekering
- Drie reviews en twee voor-en-na-foto's
- De insluitcode van je agenda (Calendly, Setmore, Treatwell of je eigen systeem)
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
