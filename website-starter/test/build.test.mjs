import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { render } from '../engine/render.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const sample = () => JSON.parse(readFileSync(new URL('../content/content.json', import.meta.url), 'utf8'));

/** Take the sample and fill in everything a real client would know. */
function complete() {
  const c = sample();
  c.site.integrations.form.provider = 'netlify';
  c.site.footer.links = [{ label: 'Privacy', href: '/privacy' }];
  c.site.indexable = true;
  for (const s of c.sections) {
    if (s.type === 'hotspots') s.image = { src: 'assets/p.jpg', alt: 'A photo', width: 1000, height: 800 };
    if (s.type === 'about') {
      s.paragraphs = s.paragraphs.map((p) => p.replace(/\[\[.+?\]\]/g, 'Sam'));
      s.facts.forEach((f) => (f.v = 'known'));
    }
    if (s.type === 'reviews') s.items = [{ text: 'Lovely.', source: 'Google', rating: 5 }];
    if (s.type === 'pricing') s.plans.forEach((p) => { p.price = '€ 50'; p.duration = '60 min'; });
    if (s.type === 'practical') s.facts.forEach((f) => (f.v = 'known'));
  }
  return c;
}

test('draft: every section shows and unknown facts are visible blanks', () => {
  const r = render(sample(), { status: 'draft' });
  assert.equal(r.hidden.length, 0);
  assert.match(r.html, /class="fill"/);
  for (const t of ['hero', 'statement', 'hotspots', 'offering', 'steps', 'about', 'reviews', 'pricing', 'practical', 'faq', 'booking'])
    assert.match(r.html, new RegExp(`data-type="${t}"`), `${t} missing`);
  assert.match(r.html, /noindex/, 'draft must be noindex');
});

test('live: a section without its main facts is left out, with a reason', () => {
  const r = render(sample(), { status: 'live' });
  const gone = Object.fromEntries(r.hidden.map((h) => [h.type, h.reason]));
  for (const t of ['reviews', 'pricing', 'practical', 'hotspots', 'booking']) assert.ok(gone[t], `${t} should be hidden`);
  assert.doesNotMatch(r.html, /data-type="reviews"/);
});

test('live: unfilled [[placeholders]] are errors, so an unfinished site cannot publish', () => {
  const r = render(sample(), { status: 'live' });
  assert.ok(r.issues.some((i) => i.kind === 'error' && /placeholder/.test(i.msg)));
});

test('live: a complete site builds with no errors and no blanks, and can be indexed', () => {
  const r = render(complete(), { status: 'live' });
  assert.deepEqual(r.issues.filter((i) => i.kind === 'error'), []);
  assert.equal(r.hidden.length, 0);
  assert.doesNotMatch(r.html, /class="fill"/);
  assert.doesNotMatch(r.html, /noindex/);
  assert.match(r.html, /data-netlify="true"/);
});

test('live: a plan without a price is left out, the others stay', () => {
  const c = complete();
  c.sections.find((s) => s.type === 'pricing').plans[0].price = null;
  const r = render(c, { status: 'live' });
  assert.equal((r.html.match(/<article class="plan/g) || []).length, 1);
});

test('live: a button that points at a section that is not shown is an error', () => {
  const c = complete();
  c.sections = c.sections.filter((s) => s.type !== 'booking');
  const r = render(c, { status: 'live' });
  assert.ok(r.issues.some((i) => i.kind === 'error' && i.path === 'site.cta.href'));
});

test('text from content is escaped, never run as HTML', () => {
  const c = complete();
  c.sections[0].heading = '<script>alert(1)</script>';
  assert.doesNotMatch(render(c, { status: 'live' }).html, /<script>alert/);
});

test('asset paths are rebased when themes are built side by side', () => {
  const r = render(complete(), { status: 'live', base: '../' });
  assert.match(r.html, /src="\.\.\/assets\/p\.jpg"/);
});

test('turning a section off does not shift the paths in the report', () => {
  const c = sample();
  c.sections.find((s) => s.type === 'steps').on = false;
  const r = render(c, { status: 'draft' });
  assert.ok(r.issues.some((i) => i.path.startsWith('about.')), 'about issues keep the section id');
});

test('hotspot points outside the photo are reported', () => {
  const c = complete();
  c.sections.find((s) => s.type === 'hotspots').points[0].x = 140;
  assert.ok(render(c, { status: 'live' }).issues.some((i) => i.kind === 'error' && /0 to 100/.test(i.msg)));
});

test('cli: live status exits 1 on the unfinished sample, draft exits 0', () => {
  const run = (...a) => spawnSync(process.execPath, ['build.mjs', '--out', '/tmp/_starter_test_site', ...a], { cwd: root, encoding: 'utf8' });
  assert.equal(run('--status', 'live').status, 1);
  assert.equal(run().status, 0);
});
