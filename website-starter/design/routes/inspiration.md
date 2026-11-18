# Route: inspiration website

The client points at a site and says "like this, but for me". You learn from it and build a look that
feels related, using their words, their photos and their brand. This is how version D of the first project
(inspired by ever.co.id) was made.

## What you may take, and what you may not
- **Take:** structure and rhythm (what comes in what order), how big the type is next to the image, spacing, the feeling of the colours, how an interaction behaves (what hover does, what a click opens).
- **Don't take:** text, images, logo, icons, illustrations, the exact fonts if they're licensed, or code. Different words, different assets, original CSS.
- If a font is paid, find a free one with a similar feel (Google Fonts has many) and say so in the notes.

## Steps
1. **Get the URL** and ask what exactly they like ("the big headline over the photo", "the way the numbers open a card").
2. **Look at it properly**, not from memory. Have Claude open the page in a browser, take screenshots at ~1440px and ~390px, scroll the whole page, and note the section order, type sizes, spacing, colours, and every interaction (hover, click, scroll effects). If the site blocks automated browsing or is behind a login, ask the client for screenshots and a screen recording instead.
3. **Write it down** in `design/inspiration/<name>.md`: sections in order, type scale, colour and spacing feel, the interactions explained in one sentence each, and what *not* to copy.
4. **Map it onto this kit's sections.** Where the reference has something this kit doesn't (a special interaction), either approximate it in CSS or note it as a possible new section type. Don't force the client's content into the reference's shape.
5. `node tools/new-theme.mjs inspired "Inspired" inspiration`, then write `themes/inspired/theme.css`.
6. Build, look at desktop and phone, compare side by side with the reference, and run the accessibility checks. The reference may be inaccessible in places: **match its feel, not its flaws**.
7. Record in `themes/inspired/NOTES.md`: the reference URL, what was learned, which fonts were substituted.

## Prompt
> Look at [URL] in a browser at desktop and phone width. Write what you learn to `design/inspiration/[name].md`:
> section order, type and spacing, colours, and how each interaction behaves. Then make a theme `themes/inspired/`
> for this kit that feels related but is original: our content, our assets, free fonts, our CSS. Do not copy text,
> images, logo or code. Keep to the class names in `docs/themes.md` and the rules in `CLAUDE.md`.
