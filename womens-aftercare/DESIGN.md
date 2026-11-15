# Tend Aftercare: three warm versions

Loving care for women after birth, body and heart, specialised in C-section cupping.
Open `index.html` to compare the three. Each is a plain static page, no build step.
Built with the Hallmark and Awwwards skills. "Tend Aftercare" is a placeholder name.

The focus is the woman, not the baby, and the whole page is written in the owner's
own voice: "I look after you", never "our team".

| | Version 1: Golden hour | Version 2: Soft hands | Version 3: Come in, mama |
|---|---|---|---|
| Folder | `w1-golden/` | `w2-terracotta/` | `w3-rose/` |
| Colours | Cream and honey, deep brown, a red signal | Peach and terracotta | Blush and deep rose |
| Type | Yeseva One over Archivo | Gloock over Figtree | Libre Bodoni over DM Sans |
| Feeling | Steady, grown up, like an almanac | Soft and close, everything rounded | A greeting at the door |
| Opens with | A promise beside a portrait | "Someone to hold you, too." | "Come in, mama. Sit down.", centred |
| The letter | Under the hero, on a lighter band | Left out; the treatments come first | Under the hero, beside your portrait |

## Photo spots

No photographs yet, by request. Every picture is an empty spot that says what belongs
there and at what size. Each one carries `data-slot` and `data-alt`, so when you have
your own pictures they drop straight in without changing the layout:

- `hero`: you, or a mother in your care, in warm light
- `letter`: your treatment room, or a portrait of you (versions 1 and 3)
- `room`: your treatment room, wide (version 2)
- `close`: your hands at work, or the oil and cups, close up

To fill one, put the file in the version folder and either set the `src` on an `<img>`
inside the spot, or call `hallmarkSlots({ hero: 'my-photo.jpg' })` in the page.

## To replace before going live

- The business name, in every version.
- The treatments: the six listed are samples, not your real menu.
- Studio address and opening hours (the dashed blanks).
- The booking form: set `data-endpoint` on the `<form>` to a form service URL.
  Until then it says plainly that nothing was sent, and never pretends it worked.
- Before launch: favicon, social share image, canonical URL, sitemap.
