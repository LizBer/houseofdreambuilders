# Holi Her: three directions

Loving care for women after birth, body and heart, specialised in C-section cupping.
Open `index.html` to compare the three. Each is a plain static page: no build step, no
dependencies, two fonts at most. Version A carries the real Holi Her name and logo;
B and C still say "Tend Aftercare", a placeholder from before the brand arrived.

These are not three skins on one layout. Each is built on a different idea about what the
page is for, so they are laid out, written and read differently. All three keep the woman
at the centre and speak in the owner's own voice ("I look after you", never "our team").

Version A is the finished site: the real Holi Her brand, your photograph, six pages,
all copy in Dutch, built around the one treatment. B and C are still one-page sketches in English with a different
structure. If you prefer one of those, the brand and the Dutch copy move across to it.

## A. Holi Her — `a-holiher/` — de volledige website

De enige versie met het echte merk, en de enige die af is. Zes pagina's, alle tekst in
het Nederlands, in de geest van ever.co.id: één warme grond voor de hele site, crème
letters, foto's zonder versiering eromheen.

Er is één behandeling: cupping bij een keizersnedelitteken. De site gaat daarom niet
over een aanbod maar over dat ene uur, en wat het met je litteken doet.

| Pagina | Bestand | Waarvoor |
|---|---|---|
| Start | `index.html` | De foto over het hele scherm, hoe het uur verloopt in vier stappen, waarom cupping, vragen, het formulier |
| De behandeling | `cupping.html` | De zeven lagen, hoe het uur verloopt, waar het bij helpt, wat je niet belooft, wanneer je beter wacht, de tarieven |
| Over mij | `over-mij.html` | Wie je bent, waarom je je op dit ene toelegt, waar je niet voor bent |
| Vragen | `vragen.html` | Vijftien vragen, in drie groepen |
| Afspraak maken | `afspraak.html` | Contactgegevens, het formulier, wat er daarna gebeurt |
| 404 | `404.html` | De weg terug |

| | |
|---|---|
| Idee | Eén warme kamer. De site verlaat de kleigrond nooit, dus alleen de woorden en de foto's veranderen. |
| Merk | De klei en het goud van je logo. Het logo is uit zijn witte vierkant geknipt en in crème hertekend voor de donkere grond; het originele terracotta staat ook in `brand/`. |
| Blikvanger | Jouw foto vult het eerste scherm, met één regel eroverheen: "Jouw lichaam droeg een leven." |
| Letters | Instrument Serif voor die ene kop en de slotregel; Jost in lichte kapitalen voor de rest. |
| Overgenomen van ever.co.id | De ene warme grond met crème letters, de driedelige vaste balk bovenaan, de grote schreefkop over een dichtbij genomen foto, de grote lichte kapitalen, de genummerde behandelingen, de lopende band. |
| Niet overgenomen | Hun teksten, hun foto's en hun woordmerk. De stem en de inhoud zijn van jou. |

### Wat er nog ingevuld moet worden

Elke lege plek staat op de pagina met een stippellijn eromheen, zodat je ze niet kunt missen:

- Je naam en je achtergrond (`over-mij.html`)
- Adres, openingstijden, telefoonnummer, e-mailadres (`afspraak.html`)
- De duur en de prijs van een afspraak (`cupping.html`)
- Het antwoord over vergoeding door de verzekering (`cupping.html`, `vragen.html`)
- Het formulier: zet `data-endpoint` op het `<form>` naar een formulierdienst. Zolang dat
  leeg is zegt het formulier eerlijk dat er niets verstuurd is, en doet het nooit alsof.
- Een sitemap en een deelafbeelding, zodra er een domeinnaam is.

### Foto's

Eén foto is er: het keizersnedelitteken, over het hele eerste scherm. Alle andere plekken
zijn leeg en vertellen wat erin hoort en op welk formaat. Zet je eigen bestand in de map en
roep `hallmarkSlots({ cupping: 'mijn-foto.jpg' })` aan, of zet er een `<img>` in.

### Merkbestanden in `a-holiher/brand/`

- `logo.jpg` — jouw origineel.
- `logo-cream.png`, `logo-word-cream.png`, `logo-mark-cream.png` — uitgeknipt, in crème, voor de donkere grond (gebruikt op de site).
- `logo-terracotta.png`, `logo-mark.png` — uitgeknipt, in het originele terracotta en goud, voor lichte achtergronden.
- `scar.jpg` — jouw foto, over het hele eerste scherm.

## B. Where it pulls — `b-the-line/`

| | |
|---|---|
| Idea | A scar is a line the body drew in a hurry. The page is built on that line, and on the words women actually use about it. |
| Anchor | What cupping does: it lifts tissue that has knitted tight so the layers glide again. |
| Signature | One line runs the whole page. Every seam between sections is the same line, drawn tight and straight under the first screen and softer each time you meet it. |
| Layout | A poster opening, her words hung alternately off the line, then the treatments as stops with a cup that slides along the row on hover. |
| Type | Outfit, light and lowercase, over Karla. |
| Reads as | Quiet, confident, more like a studio than a clinic. |

## C. Tell me — `c-tell-me/`

| | |
|---|---|
| Idea | A first visit does not begin with a price list. It begins with someone asking how she is. So the page asks. |
| Anchor | How the owner actually starts a session: with her words, not a menu. |
| Signature | She picks the words that fit today ("it pulls", "I am exhausted", "I cry a lot") and the page answers in the owner's voice and names where they would start. Without scripting, all five answers are simply there. |
| Layout | A centred corridor, one exchange filling the first screen, then the letter, the facts and the booking. |
| Type | Fraunces alone; weight and size carry everything. |
| Reads as | Warm dark, intimate, like being spoken to across a table. |

## Photo spots

One photograph so far, the C-section scar, used full-bleed in version A's hero.
Everywhere else there is an empty spot. Every picture is an empty frame saying what belongs there
and at what size. Each carries `data-slot` and `data-alt`, so your own pictures drop in
without touching the layout: put the file in the version folder and add an `<img>` inside
the spot, or call `hallmarkSlots({ hero: 'my-photo.jpg' })`.

## Checked

Run against the awwwards skill's own tools (`audit.mjs`, `shoot.mjs`) on a served build:
no console errors, no failed requests, LCP under 1.3s and CLS under 0.04 on a throttled
phone, 60fps scrolling, no horizontal overflow at any width, a skip link first in the tab
order, visible focus on every stop, nothing hidden under reduced motion, and zero serious
or critical axe violations on all three.

## To replace before going live

- The business name in versions B and C (A already says Holi Her).
- The treatments: the four or six listed are samples, not your real menu.
- Studio address and opening hours (the dashed blanks).
- The booking form: set `data-endpoint` on the `<form>` to a form service URL. Until then
  it says plainly that nothing was sent, and never pretends it worked.
- Once you have a domain: a canonical link, a social share image and a sitemap. The
  favicon, robots.txt and the 404 page are already here.
