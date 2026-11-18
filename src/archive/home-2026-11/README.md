# Archived home page (until 2026-11-18)

The previous House of Dream Builders home page, kept as it was: a single React page with
Hero, Services, Why partner with us, Contact and a menu overlay (`App.tsx`, `components/`,
`index.css`, `main.tsx`). It is not part of the build while it lives here.

To bring it back:

1. Move `App.tsx`, `main.tsx`, `index.css` and `components/` back into `src/`.
2. Restore the font links in `index.html` if needed (the old `index.css` imports Inter,
   Playfair Display and JetBrains Mono itself).

Note: the logo image the old page pointed to
(`storage.googleapis.com/tagger-dev-assets/.../house-of-dream-builders-logo.png`)
returned "NoSuchBucket" (404) on 2026-11-18, so that logo was no longer loading.
The full history is also in git (commit `1606cfc` is the last one before the archive).
