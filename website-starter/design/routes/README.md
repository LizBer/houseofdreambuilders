# Design routes: three ways to make a look

Every look is a theme (`themes/<name>/`). The content stays the same; only the look changes.
Pick the route by what the client has, not by taste:

| Route | File | Best when | Needs |
|---|---|---|---|
| **awwwards** | [awwwards.md](awwwards.md) | the site should feel distinctive and designed, with a strong concept and motion | the awwwards skill |
| **hallmark** | [hallmark.md](hallmark.md) | the site should look made, not generated, with firm rules on accessibility and honesty | the hallmark skill |
| **inspiration** | [inspiration.md](inspiration.md) | the client names a site they love ("like this, but for me") | a URL, and a browser for Claude to look with |

A good first round is **one look per route** (three looks), compared side by side:
```bash
node tools/new-theme.mjs awwwards-look "Distinctive" awwwards
node tools/new-theme.mjs hallmark-look "Clean" hallmark
node tools/new-theme.mjs inspired-look "Inspired" inspiration
node build.mjs --all          # chooser page with every look
```

## What every route must respect
- **The content is fixed.** A look styles `content/content.json`; it doesn't rewrite it. If the words need to change, that's a content change, with the owner.
- **The class names are the contract** (`docs/themes.md`). Restyle them; don't invent a new structure for one client.
- **The honesty rules from `CLAUDE.md` outrank any design skill.** No invented facts, no fake reviews, no stand-in photos on a live site. These skills are built to produce finished-looking pages, and some fill gaps with plausible placeholders. In this kit a gap stays a labelled slot.
- **The accessibility floor holds:** contrast, focus, reduced motion, 320 to 1920px without horizontal scroll.
- **Record how the look was made** in `theme.json` (`route`) and, if useful, a short `themes/<name>/NOTES.md`: the idea, the type, the colours, what was borrowed from where.

## The shared limits of design skills
Both skills are designed to build **whole sites** from a prompt, usually in their own stack. This kit has its own,
smaller system. So the work is a translation: take the skill's direction (concept, type, colour, motion, rules)
and write it as theme CSS for this kit's markup. Say so in the prompt. Expect a few rounds; don't expect a one-shot.
