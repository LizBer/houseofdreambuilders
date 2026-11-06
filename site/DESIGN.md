# House of Dreambuilders: design plan

## Brief

- **Subject:** House of Dreambuilders, started by Lizzy: a mom with a full-time job who is
  building a business of her own.
- **Audience:** moms who want to build something of their own, often while working full time.
  They have very little time, but feel a strong pull to build something bigger for
  themselves.
- **The site's job:** show them there is a way to keep building in the time they really have,
  and send them to the systems and products. The Edit Starter Kit is the flagship and the
  only product available today.
- **Offer:** plug-and-play AI systems (set up once, then they run every week) and digital
  products that help them build and grow.
- **Voice:** warm, capable, plain. "Be supermommy" read as *capable, not superbusy*: she gets
  more done because the system does the long part, not because she gives up her evenings.
- **Constraints:** use the house palette from the Edit Starter Kit sales page. Keep the site
  in its own folder (`site/`) for approval, and leave the existing app untouched.

## Concepts

| | Idea | Anchor | Signature | O / F / Fe / P |
|---|---|---|---|---|
| **A. The margin** (formal / process) | The site is a page: the day fills the main column, and the dream is written in the margin. Scroll down and the margin takes more of the page, until the dream fills all of it. | Lizzy's own line: "for every mom building something in the margins of a full life." | An orange margin rule that slides across the grid section by section. The loader and page transitions are the margin opening and closing. | 4 / 5 / 4 / 2 |
| B. Bedtime clock (time) | The site is one day, from the alarm to the quiet house, and the palette dims as you scroll. | Most of these moms only get the hour after the kids are asleep. | Ground and ink cool from morning to night as you scroll. | 3 / 4 / 4 / 3 (too close to a time-of-day scroll; portable) |
| C. The house (name) | The site is a house being built: blueprint lines turn into rooms, one room per product. | The brand name. | Blueprint strokes draw in, then fill with color. | 2 / 3 / 3 / 4 (generic "build" imagery) |

**Pick A.** It uses the owner's own words, and the same rule decides the layout, the loader,
the transitions, the 404 and the copy. From B, keep one detail: the day is written as real
timestamps (06:10, 21:12), and the loader counts the clock up to the quiet hour.

## Concept card

```
Idea:        Your dream gets built in the margins of a full day, and over time the margin takes the page.
Metaphor:    a planner page: the day in the main column, the dream written in the margin.
Signature:   the margin rule (orange, 2px) and its tinted field slide across the 12-col grid, section by
             section (0.33 → 0.5 → 0.67 → 0.83 → the full page). Transitions are the margin covering the page.
Emotion:     "oh, that's my day", then relief: the margin is real and it can grow.
Motion verb: written in. Things appear left to right like a pen stroke (clip reveals, underlines that
             draw, the margin opening).
Screenshot:  the hero: a small, dense schedule on the left ending at "21:12 The house goes quiet", with a
             handwritten note pointing at it, and a big headline in the tinted margin on the right.
```

## Art direction system

### Palette (house tokens, from the Edit Starter Kit page)

| Role | Value | Use |
|---|---|---|
| ground | `hsl(34 45% 96%)` | page |
| surface / margin field / curtain | `hsl(32 38% 91%)` | the margin, loader, transitions |
| ink | `hsl(22 40% 12%)` | text |
| muted | `hsl(25 18% 38%)` | the day column, secondary text (AA on ground and on surface) |
| line | `hsl(30 25% 82%)` | hairlines |
| accent | `hsl(27 82% 60%)` | the margin rule, button fills. Never used for text. |
| accent-text | `hsl(22 78% 38%)` | handwritten notes, small accents in text |
| accent-fg | `hsl(20 45% 7%)` | text on accent |

Cream and orange is close to a default AI palette (warm cream with a terracotta accent). Here it
is the brand's own house style, already live on the sales page, so it stays. To keep it from
reading as a template, the serif italic accent is dropped, and the contrast comes from the hand
instead.

### Type

- **Familjen Grotesk** (400 to 700, variable): everything. Display is 600 weight with tracking of
  -0.035em at the largest sizes.
- **Caveat** (600): Lizzy's handwriting. It appears only as margin notes that say something
  real, in accent-text.
- **Azeret Mono** (400): timestamps in the day column only. Nowhere else.
- Scale: `--t-mega clamp(3rem, 1rem + 7.5vw, 8.5rem)`, `--t-xl clamp(2.4rem, 1.3rem + 4.4vw, 5.5rem)`,
  `--t-l clamp(1.6rem, 1.2rem + 1.6vw, 2.6rem)`, `--t-m clamp(1.2rem, 1.05rem + .5vw, 1.5rem)`, body 17 to 18px.

### Grid and rhythm

- 12 columns with a fluid gutter. **Alignment rule:** day content ends where the margin
  begins. Every section declares `data-margin` (4, 6, 8, 10 or `full`): the number of columns
  the margin takes. The dream content starts exactly on that column line, and the margin rule
  sits half a gutter to its left.
- Rhythm moods: airy (hero, closing), normal (offer, kit), tight (steps).

### Shape

Pills (999px) for buttons, as on the sales page. Everything else is square: the margin is a
ruled page, not a set of cards.

### Motion language

- Eases: `expo.out` for entrances, `expo.inOut` for the margin and the curtain, and
  `power3.out` for hovers.
- Written in: line reveals rise from a mask, and blocks wipe in from the left with a clip.
- Hover treatments, one per role:
  - Buttons: ink floods in from the left (a clip-path wipe) and the arrow travels.
  - Nav links: an underline draws left to right, and the current page keeps it.
  - Product rows: the title steps right and a handwritten "open" writes in.
  - Inline links: underlined at rest, and the band thickens on hover.
  - Footer and utility links: the underline only.

### Composition plan

```
HOME
[hero  m=4]   06:10 Alarm. Lunches.          |  Build your dream
              07:40 Drop-off                 |  in the margins of
              09:00 The job                  |  a full life
              17:30 Pick-up, dinner, bath    |  lead, 2 CTAs
              21:12 The house goes quiet  <- "be supermommy, not superbusy" (hand)
[day   m=4]   statement paragraph at t-l     |  hand note
[make  m=6]   intro: two kinds of help       |  index list of systems/products (rows)
[kit   m=8]   before (camera roll)           |  after: kit name, 4 outcomes, CTA
[steps m=8]   "what it asks of you"          |  3 timed steps (10 min once / 2 min / pick & post)
[note  m=10]  "Hi, I'm Lizzy" label          |  story excerpt, signature, link to about
[close full]  This hour is yours. (mega, full-width margin) CTA
SYSTEMS   hero m=6 → index of all → "what plug and play means" m=8
KIT       hero m=6 (video slot) → included (list) m=8 → needs/own → FAQ m=8 → close full
ABOUT     hero m=6 → story m=8 → what I believe m=10 → close full
404       m=0: the margin is closed. "Nothing written here yet."
```

Each section uses a different layout family: schedule + poster, statement, index list,
asymmetric pair, sequence, letter, and finale.

### Phones (390 px)

The fixed margin field is turned off. Each section's dream block becomes its own tinted block
with the orange rule on its left, and the blocks get wider and more prominent toward the end
of the page. That is the stepped, static version of the same idea. Reduced motion uses the
same static version on every screen width.

### Idle state

The concept holds still at rest on purpose: a page doesn't move while you read it. The one
thing alive at rest is the pen caret blinking after the hero's handwritten note, as if Lizzy
is still writing. The hovers and the margin carry the rest of the life. This is a decision,
not an omission.

## Genericness test

- "Moms + warm cream + a serif italic word in the headline" is what a generic model would do.
  The serif italic accent is gone, and the contrast comes from the handwriting and the timestamps.
- "Three equal benefit cards" became an index list and a before/after pair.
- "Hero over a gradient blob" became the day schedule beside the margin.
