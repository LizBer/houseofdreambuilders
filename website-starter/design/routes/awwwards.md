# Route: awwwards

The `/awwwards` skill acts as creative director, designer and developer. It decides on a concept,
art direction, type and motion, then checks the result in a real browser. It is built for sites that
should impress.

## Install (once)
```bash
npx skills add juliobsz/skills -g
```
Then open a **new** Claude session in this repo and use `/awwwards`. (The installer needs Node 22.20 or later;
its helper scripts need Node 20+. It uses Playwright and axe-core for its checks, and installs them when needed.)

## How to use it with this kit
1. Create the theme: `node tools/new-theme.mjs bold "Bold" awwwards`
2. Give Claude a prompt like this (fill in the brackets):

> Use /awwwards to design a look for this kit. This is an **existing project**: do not create a Next.js
> or Astro app. The design goes into `themes/bold/theme.css` (plus images or fonts in that folder) and
> must style the markup from `engine/` using the class names in `docs/themes.md`. Content is
> `content/content.json` and is fixed: do not rewrite it, and do not invent facts, reviews or photos.
> The business is [one line]. The visitor is [who, and how she feels]. Tone: [three words].
> Do the concept step first and show me the three concepts before you build one.

3. Let it present **three concepts** from different territories (this is its method), and choose one.
4. It builds the theme. Build and look: `node build.mjs --theme bold && node tools/serve.mjs`
5. Run its checks against the served site (`http://localhost:4500`): its browser screenshots, the accessibility
   pass and the performance numbers. Fix what it finds.
6. Compare with the other looks: `node build.mjs --all`.

## Watch for
- **Motion must stay optional.** `prefers-reduced-motion` must still give a complete, calm page. `engine/base.css` already switches animation off for reduced motion; don't undo it.
- **WebGL and heavy effects** are out of scope for a small practice site: slow phones, and nothing to say with them. Ask for restraint.
- **Placeholder content.** If it tries to write copy, say no: copy comes from the brief. Photos not yet available stay labelled slots.
- **Stack drift.** If it wants a build tool or a framework, say: plain CSS in the theme folder.
