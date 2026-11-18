# Instructions for Claude in this repo

This repo is a starter kit for one-page landing sites for service businesses. A person (usually the
maker, sometimes the owner) will ask you to build the first version, change content, add a look, or
get the site ready to publish. Read `README.md`, `GUIDE.md`, `brief.md` and `docs/` before you start.

## How the repo works
- `content/content.json` is the only place content lives. `sections` is ordered; `site` holds settings.
- `engine/` turns content into HTML. `themes/<name>/theme.css` makes it look like something.
- `node build.mjs` builds `site/`. `--check` reports. `--status live` is the strict mode.
- Do not change `engine/` to suit one client. If something is missing, say so and propose a new field or section type for the kit.

## Building a first version
1. Read `brief.md` (filled in by the person). If it is empty or thin, **ask**; do not invent a business.
2. Fill `content/content.json`: the voice is the visitor's, plain language, no jargon. Replace ALL the sample text.
3. Pick sections from what is known (table at the bottom of `brief.md`). Switch off (`"on": false`) what doesn't apply; never fill a section with filler.
4. Anything unknown stays unknown: `null`, an empty list, or a `[[placeholder]]` in a sentence. **Never write a plausible-looking value.**
5. Run `node build.mjs --check` and report what is still blank, in plain words, as a to-do list for the person.
6. Look at the result in a browser at ~1440px and ~390px. Fix what's off. Then say what you saw.

## Guardrails (these are the product; do not trade them away)
- **No invented facts.** Reviews, ratings, client counts, years of experience, prices, certifications, addresses, hours, quotes, names. If it isn't in the brief or given by the person, it is a blank.
- **Reviews are verbatim.** No editing, no merging, no translating. Keep the real source. Names only if the person has them and permission.
- **Health and wellbeing wording.** No promises to cure, treat or heal. Describe what it is and what people tend to notice; say what it doesn't do. Leave a disclaimer and a "see your doctor" line where it applies.
- **Privacy.** If the form collects anything about health or children, make sure a privacy link is in `site.footer.links` and the form note says what the data is used for. Flag it if missing.
- **Accessibility floor.** Text contrast at least 4.5:1, visible focus, keyboard-usable hotspots and menu, `alt` text on every photo, respect reduced motion, no horizontal scroll from 320px up.
- **Honest forms.** A form that isn't connected must say so (the engine does this). Never fake a "thank you".
- **Copyright.** Don't copy another site's text, images, logo or code. Learn from structure and feel only.
- **Photos.** Real photos of the real people and place beat stock. If a photo is missing, leave the labelled slot.

## Changing content for the owner
- Edit `content/content.json` only. Keep valid JSON (quotes, commas). Run `node build.mjs --check` afterwards.
- Propose the change on a branch and let the person merge it. Netlify shows a preview of the proposal.
- Explain what you changed in one or two plain sentences. The owner is not technical.

## Making a look (theme)
- `node tools/new-theme.mjs <name> "<Label>" <route>` copies `warm`. Restyle `themes/<name>/theme.css`.
- Keep the class names in `docs/themes.md`; they are the contract with the engine. `engine/base.css` keeps the hotspots, menu and no-script fallback working whatever the theme does.
- Routes are in `design/routes/` (awwwards, hallmark, inspiration). Follow the route's file.
- Compare looks with `node build.mjs --all`.

## Going live
- `node build.mjs --status live --check` must be clean. In live status the build refuses to publish anything unfinished; that is on purpose, don't work around it.
- Then set `status` to `live`, and `indexable` to `true` only when the person says the site is ready for search engines.

## Checks before you say "done"
`npm test`, `node build.mjs --check`, a look at desktop and phone width, and an accessibility pass (the awwwards or hallmark browser checks, or axe). Report what you checked and what you didn't.
