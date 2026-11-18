# Content reference

Everything lives in `content/content.json`: a `site` object (settings) and a `sections` list (the page, in order).
Unknown values: use `null`, an empty list, or `[[a placeholder]]` inside a sentence. In `draft` they show as
dashed blanks; in `live` they are left out (or stop the build when a `[[placeholder]]` is still there).

Any section can have `"on": false` (skip it), `"id"` (anchor name, defaults to the type), `"nav"` (menu label;
no label = not in the menu), and `"tone": "alt"` (the alternate background).

## `site`
| Field | Meaning |
|---|---|
| `status` | `"draft"` (blanks visible, not indexed) or `"live"` (strict, unfinished builds fail) |
| `theme` | name of a folder in `themes/`, or `"all"` to build every look with a chooser page |
| `lang` | `"nl"` or `"en"`: the language of the buttons and messages the engine writes itself |
| `name`, `title`, `description` | the business name, the browser title, one sentence for search results |
| `url` | the final web address (used for the canonical link and sitemap) |
| `indexable` | `true` lets search engines in, but only when `status` is `live` |
| `logo`, `icon` | `{ "src", "alt", "width", "height" }` and a path; leave empty to show the name as text |
| `cta` | `{ "label", "short", "href" }`: the main button (`href` is a section id like `#booking`) |
| `integrations.booking.embed` | the booking tool's embed code (HTML) |
| `integrations.form` | `{ "provider": "netlify" }` or `{ "endpoint": "https://…" }`; neither = not connected |
| `footer` | `{ "line", "links": [{label, href}], "disclaimer" }` |
| `labels` | override any engine-written text, e.g. `{ "send": "Verstuur" }` (see `engine/locales.mjs`) |

## Sections
Common: `label` (small caps above), `title`, `intro`, `note` (small print below).

| `type` | Fields | Shown on a live site when |
|---|---|---|
| `hero` | `heading`, `text`, `image` | there is a heading (a missing photo is simply skipped) |
| `statement` | `text` | there is text |
| `hotspots` | `image`, `points[{x, y, title, text, more}]`, `hint`, `pointsLabel` | there is a photo and a point. `x`/`y` are 0 to 100 (% of the photo) |
| `offering` | `items[{name, text, price?, duration?, goodFor{title, list[]}}]` | at least one named item. `price`/`duration` only appear if you add the key |
| `steps` | `items[{when, title, text}]` | at least one step |
| `about` | `image?`, `paragraphs[]`, `facts[{k, v}]` | at least one paragraph. Facts with no value are left out |
| `reviews` | `items[{text, source, rating?, name?}]` | at least one review with text |
| `pricing` | `plans[{name, for, price, duration, points[], featured, cta}]` | at least one plan has a price. Plans without a price are left out |
| `practical` | `facts[{k, v, href?, hint?}]`, `map{embed?, slot?}` | at least one fact has a value |
| `faq` | `items[{q, a}]` | at least one question |
| `booking` | `title`, `text`, `form{button, note, fields[]}` | a booking widget or a connected form exists |

### Photos
`{ "src": "assets/portrait.jpg", "alt": "…", "width": 1066, "height": 1600, "slot": "what the photo should show" }`.
Put files in `assets/`. Always give `alt` and the real `width`/`height` (the build warns if missing).
`srcset` is optional: `"assets/a-900.jpg 900w, assets/a-1800.jpg 1800w"`. No `src` in a draft = a labelled empty slot
(`slot` says what belongs there). Reviews and photos need a real source; the kit never fills them with stock.

### Hotspot coordinates
Open the photo, find the spot, and take its position as a percentage from the top-left:
`x` = how far across (0 to 100), `y` = how far down (0 to 100). The points stay on the same spot at any screen width.
