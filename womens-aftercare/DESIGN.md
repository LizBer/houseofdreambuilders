# Tend Aftercare: three directions

Loving care for women after birth, body and heart, specialised in C-section cupping.
Open `index.html` to compare the three. Each is a plain static page: no build step, no
dependencies, two fonts at most. "Tend Aftercare" is a placeholder name.

These are not three skins on one layout. Each is built on a different idea about what the
page is for, taken from a different part of the practice, so they are laid out, written
and read differently. All three keep the woman at the centre and speak in the owner's own
voice ("I look after you", never "our team").

## A. The fourth trimester — `a-six-weeks/`

| | |
|---|---|
| Idea | The page is the time after birth, not a list of services. Week one, week two, week six, week twelve, and any week after that. |
| Anchor | Cupping really does begin six to eight weeks after birth. That fact becomes the spine of the page. |
| Signature | One scroll position drives two things: a huge week number in the sticky rail, and the colour of the page, which warms from the pale raw first days to deep amber. |
| Layout | A sticky rail on the left, chapters scrolling past it on the right. |
| Type | Bricolage Grotesque over Instrument Sans. |
| Reads as | A calendar made for her, when every other calendar is the baby's. |

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

No photographs yet, by request. Every picture is an empty frame saying what belongs there
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

- The business name, in every version.
- The treatments: the four or six listed are samples, not your real menu.
- Studio address and opening hours (the dashed blanks).
- The booking form: set `data-endpoint` on the `<form>` to a form service URL. Until then
  it says plainly that nothing was sent, and never pretends it worked.
- Once you have a domain: a canonical link, a social share image and a sitemap. The
  favicon, robots.txt and the 404 page are already here.
