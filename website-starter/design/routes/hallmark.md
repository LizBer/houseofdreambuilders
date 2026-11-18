# Route: hallmark

The `/hallmark` skill makes pages look designed instead of generated. It holds a hard floor (contrast,
focus, reduced motion, no invented facts, a working phone layout), deals a direction from a catalogue of
fifty "materials" (paper, type, colour, surfaces), and lints the result in a real browser.

## Install (once)
```bash
npx skills add nutlope/hallmark -g
```
Needs Node 18+. For the in-browser checks, also `npm i -g puppeteer-core` and a Chrome; without those the
static checks still run. Then open a **new** Claude session and use `/hallmark`.

## How to use it with this kit
Hallmark is built to make a finished page, and it only touches an existing design when you name it
(`redesign` and `audit` verbs). So use it in two steps:

**1. Take its direction, write it as a theme.**
1. `node tools/new-theme.mjs clean "Clean" hallmark`
2. Prompt:

> Use /hallmark for the *direction* of a look for this kit (a dealt theme, or custom if I ask). The result
> goes into `themes/clean/theme.css`, styling the markup from `engine/` with the class names in
> `docs/themes.md`. Content is `content/content.json` and is fixed. Audience: [who]. One action the page
> drives: book an appointment. Tone: [pick an extreme, not "clean and modern"]. Anchor colour: [if any].
> Do not place stock or stand-in photos: missing photos stay as the labelled slots.

3. Hallmark first asks four things (material, audience, use, tone). Answer from `brief.md`, or say "go ahead".
4. If it builds a whole page in a scratch folder, take its **palette, type, spacing and surface decisions** and write
   them into `theme.css`. It's a translation, not a copy-paste.

**2. Let it audit the result.**
```bash
node build.mjs --theme clean
```
> `/hallmark audit site/index.html`

Fix what the audit reports (the Floor items are not optional).

## Watch for
- **Stand-in photos.** Hallmark can place openly licensed photos from its own library where you have none, and credits them. For a
  real practice, real photos of the real people and place beat stock. Use stand-ins only for a draft the client knows about; never on a live site.
- **Its checks overlap ours on purpose** (invented facts, a form that says thanks without sending). Where they disagree with `CLAUDE.md`, the stricter one wins.
- **A locked system.** A `DESIGN.md` at the repo root makes Hallmark treat the design as locked. If you want to keep a look consistent across a client's future pages, write one.
