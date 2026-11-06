# House of Dreambuilders: website (draft for approval)

A static marketing site, kept separate from the existing app in this repo.
Concept, palette, type and layout decisions are in `DESIGN.md`.

- All copy and products: `src/data/site.ts`
- Pages: `src/pages/` (home, systems, edit-starter-kit, about, 404)
- Styles: `src/styles/tokens.css` (house palette) and `src/styles/site.css`
- Motion: `src/motion/setup.ts` (the margin, loader, page transition), `src/engine/` (plumbing)

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm run preview
```

Deploy `dist/` to any static host (Vercel, Netlify, Cloudflare Pages).
