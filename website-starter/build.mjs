// Build: content/content.json + a theme (or all of them) -> site/
//   node build.mjs                    build what site.theme says ("warm", or "all" to compare)
//   node build.mjs --check            only report: what is blank, hidden, or wrong
//   node build.mjs --status live      build as live: incomplete sections are left out, errors stop the build
//   node build.mjs --theme name       build one theme to site/
//   node build.mjs --all              build every theme side by side with a chooser page
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { render, simplePage, chooserPage } from './engine/render.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const val = (n) => (args.includes(n) ? args[args.indexOf(n) + 1] : undefined);

const content = JSON.parse(readFileSync(join(root, 'content/content.json'), 'utf8'));
const status = val('--status') || content.site?.status || 'draft';
const live = status === 'live';
const outDir = join(root, val('--out') || 'site');

const themeNames = readdirSync(join(root, 'themes'), { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(join(root, 'themes', d.name, 'theme.json'))).map((d) => d.name).sort();
const loadTheme = (n) => ({ name: n, ...JSON.parse(readFileSync(join(root, 'themes', n, 'theme.json'), 'utf8')) });

const want = flag('--all') ? 'all' : val('--theme') || content.site?.theme || themeNames[0];
const names = want === 'all' ? themeNames : [want];
for (const n of names) if (!themeNames.includes(n)) { console.error(`No theme "${n}". Available: ${themeNames.join(', ')}`); process.exit(2); }
const multi = names.length > 1;

const baseCss = readFileSync(join(root, 'engine/base.css'), 'utf8');
const app = readFileSync(join(root, 'engine/behaviour.js'), 'utf8');

let first;
const built = [];
for (const n of names) {
  const theme = loadTheme(n);
  const dir = multi ? join(outDir, n) : outDir;
  const result = render(content, { status, theme, base: multi ? '../' : '' });
  first ||= result;
  built.push({ theme, dir, result });
}

if (flag('--check')) report(first, names);
else {
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  for (const { theme, dir, result } of built) {
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), result.html);
    writeFileSync(join(dir, 'styles.css'), baseCss + '\n' + readFileSync(join(root, 'themes', theme.name, 'theme.css'), 'utf8'));
    writeFileSync(join(dir, 'app.js'), app);
    for (const f of readdirSync(join(root, 'themes', theme.name))) {
      if (['theme.json', 'theme.css'].includes(f)) continue;
      cpSync(join(root, 'themes', theme.name, f), join(dir, f), { recursive: true });
    }
  }
  if (existsSync(join(root, 'assets'))) cpSync(join(root, 'assets'), join(outDir, 'assets'), { recursive: true });

  const t0 = built[0].theme;
  const css = multi ? `${t0.name}/styles.css` : 'styles.css';
  writeFileSync(join(outDir, '404.html'), simplePage(content, { theme: t0 }, { kind: '404', cssHref: css, homeHref: './' }));
  if (!multi && content.site?.integrations?.form?.provider === 'netlify') {
    mkdirSync(join(outDir, 'thanks'), { recursive: true });
    writeFileSync(join(outDir, 'thanks/index.html'), simplePage(content, { theme: t0 }, { kind: 'thanks', cssHref: '/styles.css', homeHref: '/' }));
  }
  const indexable = live && content.site?.indexable === true;
  writeFileSync(join(outDir, 'robots.txt'), indexable
    ? `User-agent: *\nAllow: /\n${content.site.url ? `Sitemap: ${content.site.url.replace(/\/$/, '')}/sitemap.xml\n` : ''}`
    : 'User-agent: *\nDisallow: /\n');
  if (indexable && content.site.url) writeFileSync(join(outDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${content.site.url}</loc></url></urlset>\n`);
  if (multi) writeFileSync(join(outDir, 'index.html'), chooserPage(content, built.map((b) => b.theme)));

  console.log(`Built ${names.join(', ')} as ${status} into ${val('--out') || 'site'}/`);
  report(first, names);
}

function report({ issues, hidden }, themes) {
  const by = (k) => issues.filter((i) => i.kind === k);
  const errors = by('error'), blanks = by('blank'), omitted = by('omitted'), warns = by('warn');
  const line = (i) => `    ${i.path}  ${i.msg ? `(${i.msg})` : ''}`;
  const out = [];
  out.push(`\nStatus: ${status}${live ? '' : '  (draft: blanks are shown on the page, search engines are told to skip it)'}`);
  if (hidden.length) { out.push(`\nLeft out because the facts are not there yet (${hidden.length}):`); hidden.forEach((h) => out.push(`    ${h.id}: needs ${h.reason}`)); }
  if (omitted.length) { out.push(`\nLeft out inside a section, still unknown (${omitted.length}):`); omitted.forEach((i) => out.push(line(i))); }
  if (blanks.length) { out.push(`\nShown as dashed blanks, still to fill in (${blanks.length}):`); blanks.forEach((i) => out.push(line(i))); }
  if (warns.length) { out.push(`\nWarnings (${warns.length}):`); warns.forEach((i) => out.push(line(i))); }
  if (errors.length) { out.push(`\nERRORS (${errors.length})${live ? ', the build stops' : ''}:`); errors.forEach((i) => out.push(line(i))); }
  if (!hidden.length && !omitted.length && !blanks.length && !errors.length) out.push('\nNothing left to fill in.');
  console.log(out.join('\n'));
  if (live && errors.length) { console.error('\nNot published: fix the errors above, or set status back to "draft".'); process.exit(1); }
}
