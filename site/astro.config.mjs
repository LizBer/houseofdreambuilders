import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Production URL: canonical, OG and sitemap depend on it.
// PUBLIC_PREVIEW=1 builds a flat, relative-path copy for sharing as a private preview.
const preview = process.env.PUBLIC_PREVIEW === '1';

export default defineConfig({
  site: 'https://houseofdreambuilders.com',
  trailingSlash: preview ? 'ignore' : 'always',
  outDir: preview ? './dist-preview' : './dist',
  build: { inlineStylesheets: 'auto', format: preview ? 'file' : 'directory' },
  integrations: [sitemap()],
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
