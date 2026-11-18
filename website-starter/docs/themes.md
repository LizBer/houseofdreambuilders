# Themes

A theme is a folder in `themes/`: `theme.json`, `theme.css`, and optionally images or fonts it uses.
It changes how the page **looks**; it never changes what the page **says**, so the same content works in every theme.

## Make one
```bash
node tools/new-theme.mjs bold "Bold" awwwards     # copies "warm", records how it was made
node build.mjs --theme bold                        # build just this look
node build.mjs --all                               # build every look + a chooser page
```
`theme.json`: `label`, `description`, `route` (awwwards | hallmark | inspiration | custom | default),
`themeColor` (the browser bar colour), `fonts` (Google Fonts stylesheet URLs; keep to free fonts).
An optional `preview.jpg` (1440 by 900) is shown on the chooser.

## What you can rely on
`engine/base.css` is placed in front of every theme. It keeps these working whatever you do: the hotspot points
sitting on the photo, hidden panels, the visually-hidden helper, the skip link, labelled empty photo slots,
the no-JavaScript fallback and reduced motion. You restyle on top of it; you don't have to rebuild it.

## The rules
- Keep the class names below. They are the contract.
- Text contrast 4.5:1 or better (3:1 for large text and UI), including on photos and on the dashed "unknown" marks.
- Visible `:focus-visible` styles. Honour `prefers-reduced-motion`.
- No horizontal scroll from 320px to 1920px. Check with a real browser, not a guess.
- A photo slot and a dashed `.fill` must stay legible: they are how a draft shows what's missing.
- Use `font-display` through Google's `display=swap` and give the display font a metric-matched fallback
  (see `warm`) so the text doesn't jump when the font arrives.

## Class names
| Area | Classes |
|---|---|
| Page | `.wrap`, `.btn`, `.label`, `.fill`, `.slot`, `.slot__label`, `.skip`, `.vh` |
| Top bar and menu | `.top`, `.top__in`, `.top__menu`, `.top__mark`, `.wordmark`, `.top__act`, `.menu`, `.menu__close` |
| Hero | `.s-hero`, `.s-hero--text`, `.hero__img`, `.hero__in`, `.hero__text`, `.hero__acts`, `.hero__scroll` |
| Statement | `.s-statement`, `.statement__text` |
| Hotspots | `.s-hotspots`, `.hotspots__stage`, `.hotspots__photo`, `.hotspots__img`, `.hotspots__points`, `.point`, `.hotspots__zone`, `.hotspots__hint`, `.hotspots__cards`, `.hotspots__panel`, `.hotspots__title`, `.hotspots__nr` |
| Sections | `.sec`, `.sec--alt`, `.sec__head`, `.sec__intro`, `.sec__note`, and per type: `.s-offering`, `.s-steps`, `.s-about`, `.s-reviews`, `.s-pricing`, `.s-practical`, `.s-faq`, `.s-booking` |
| Offering | `.offers`, `.offer`, `.offer__main`, `.offer__meta`, `.offer__good`, `.ticks` |
| Steps / About | `.steps`, `.step`, `.about`, `.about__photo`, `.about__img`, `.prose`, `.lead`, `.facts`, `.facts--small` |
| Reviews | `.reviews`, `.review`, `.review__stars` (inside: `blockquote`, `figcaption`) |
| Pricing | `.plans`, `.plan`, `.plan--featured`, `.plan__for`, `.plan__price`, `.plan__duration` |
| Practical | `.practical`, `.facts`, `.map` |
| FAQ | `.qa` (inside: `details`, `summary`, `p`) |
| Booking / form | `.booking__text`, `.booking__widget`, `.booking__form`, `.form`, `.wide`, `.form__foot`, `.help`, `.form__note` |
| Footer | `.foot`, `.foot__line`, `.foot__links`, `.foot__small` |
| 404 and thank-you pages | `body.simple`, `.simple__in` |

## When a look needs a different structure
Most looks are CSS only (grid and positioning can rearrange sections visually). If a design truly needs different
markup, don't fork the engine for one client. Describe the change and add it to the kit as a new optional field
or section type, with a test, so every site can use it.
