# Website starter kit

A starter for one-page landing sites for service businesses (practices, studios, coaches, salons).
Claude builds the first version with you. After that, small changes are made by editing one file
or asking Claude, and Netlify publishes the result.

```
brief.md  ──►  content/content.json  ──►  themes/<look>/  ──►  site/  ──►  Netlify
 what you       all the words, photos,      how it looks        the built     publishes
 know           prices, in one file         (several allowed)   website       it live
```

## The ideas behind it
- **One file holds the content** (`content/content.json`). The look lives in themes, separate from it.
  Change the words without touching the design, change the design without touching the words.
- **Honest about what isn't known yet.** Unknown facts show as dashed blanks in a draft. On a live
  site, a section without its main facts is left out, and an unfinished site **refuses to publish**.
  No invented reviews, prices or credentials.
- **Several looks from the same content.** Build every theme side by side and let the client pick.
  Three ways to make a look: with the awwwards skill, with the hallmark skill, or from an
  inspiration website (`design/routes/`).
- **No dependencies.** Plain Node, plain HTML/CSS/JS. Nothing to install, nothing to keep updated.

## Quick start (10 minutes)
```bash
node build.mjs            # build site/ from content/content.json
node tools/serve.mjs      # preview at http://localhost:4500
node build.mjs --check    # what is still blank, left out, or wrong
npm test                  # the tests for the engine
```
Needs Node 20 or later.

## Where things are
| Path | What it is |
|---|---|
| `GUIDE.md` | **Start here.** Step by step: brief, build, publish on Netlify, edit with Claude |
| `brief.md` | The questions to answer before building. What you know decides what gets built |
| `CLAUDE.md` | The instructions Claude follows in this repo (process and guardrails) |
| `content/content.json` | The single source of content, the sections and their order |
| `themes/` | The looks. `warm` is the default. Add more with `node tools/new-theme.mjs` |
| `design/routes/` | How to make a look: awwwards, hallmark, inspiration site |
| `docs/` | How a landing page works, the content reference, the theme rules |
| `engine/` | Turns content into a page. You normally never touch this |
| `build.mjs` | The build command. `netlify.toml` tells Netlify to run it |

## Not built yet
- A login-protected edit page, so the owner can edit on the site itself (without Claude or GitHub)
- AI text suggestions inside that edit page
- Photo upload and resizing
