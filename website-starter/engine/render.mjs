// The engine: content.json in, one finished HTML page out.
//
// The one rule that matters: the page is honest about what is not known yet.
//   status "draft": every section shows, unknown facts appear as dashed blanks you can see.
//   status "live" : a section whose main facts are missing is left out, unknown facts are
//                   left out, and anything still unfilled is an ERROR, so the build stops
//                   and an unfinished site never gets published.
import { LOCALES } from './locales.mjs';

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const attr = (s) => esc(s).replace(/"/g, '&quot;');
const blank = (v) => v === undefined || v === null || (typeof v === 'string' && v.trim() === '');
const list = (v) => (Array.isArray(v) ? v : []);

export const DEFAULT_FIELDS = [
  { name: 'name', label: 'Naam', type: 'text', autocomplete: 'name', required: true },
  { name: 'email', label: 'E-mail', type: 'email', autocomplete: 'email', required: true },
  { name: 'message', label: 'Bericht', type: 'textarea', wide: true }
];

/** Which facts a section needs before it is worth showing on a live site. Returns a reason or null. */
export const READY = {
  hero: (s) => (blank(s.heading) ? 'a heading' : null),
  statement: (s) => (blank(s.text) ? 'text' : null),
  hotspots: (s) => (!list(s.points).length ? 'at least one point' : blank(s.image?.src) ? 'a photo' : null),
  offering: (s) => (!list(s.items).some((i) => !blank(i.name)) ? 'at least one service' : null),
  steps: (s) => (!list(s.items).length ? 'at least one step' : null),
  about: (s) => (!list(s.paragraphs).some((p) => !blank(p)) ? 'at least one paragraph' : null),
  reviews: (s) => (!list(s.items).some((i) => !blank(i.text)) ? 'at least one real review' : null),
  pricing: (s) => (!list(s.plans).some((p) => !blank(p.price)) ? 'at least one plan with a price' : null),
  practical: (s) => (!list(s.facts).some((f) => !blank(f.v)) ? 'at least one known fact' : null),
  faq: (s) => (!list(s.items).length ? 'at least one question' : null),
  booking: null // decided in render(): needs a booking widget or a connected form
};

export function render(content, opts = {}) {
  const site = content.site || {};
  const status = opts.status || site.status || 'draft';
  const live = status === 'live';
  const base = opts.base || '';
  const theme = opts.theme || { name: 'warm', fonts: [], themeColor: '#7a4e3e' };
  const cssHref = opts.cssHref || 'styles.css';
  const lang = site.lang || 'nl';
  const L = { ...(LOCALES[lang] || LOCALES.en), ...(site.labels || {}) };

  const issues = []; // { kind: blank|omitted|error|warn, path, msg }
  const hidden = []; // sections left out of a live build
  const add = (kind, path, msg) => issues.push({ kind, path, msg });

  // ---- small building blocks -------------------------------------------------------
  const fill = (path, hint, what) => {
    add(live ? 'omitted' : 'blank', path, what || hint || 'still to fill in');
    return live ? '' : `<span class="fill" data-fill="${attr(path)}">${esc(hint || L.blank)}</span>`;
  };
  // Text can hold [[placeholders]] for things not known yet, e.g. "Ik ben [[je naam]]".
  const rich = (v, path) =>
    esc(v).replace(/\[\[(.+?)\]\]/g, (_, t) => {
      add(live ? 'error' : 'blank', path, `unfilled placeholder: ${t}`);
      return `<span class="fill" data-fill="${attr(path)}">${t}</span>`;
    });
  const txt = (v, path, hint, what) => (blank(v) ? fill(path, hint, what) : rich(v, path));
  const asset = (p) => (/^(https?:|\/\/|data:|\/)/.test(p) ? p : base + p);

  const image = (im, path, { cls = '', eager = false, sizes = '100vw' } = {}) => {
    if (im && !blank(im.src)) {
      if (blank(im.alt) && im.decorative !== true) add('warn', path, 'photo has no alt text');
      if (!im.width || !im.height) add('warn', path, 'photo has no width/height (causes layout shift)');
      const set = im.srcset
        ? ` srcset="${attr(im.srcset.split(',').map((x) => { const [u, w] = x.trim().split(/\s+/); return `${asset(u)} ${w}`; }).join(', '))}" sizes="${attr(im.sizes || sizes)}"`
        : '';
      return `<img class="${cls}" src="${attr(asset(im.src))}"${set}${im.width ? ` width="${im.width}"` : ''}${im.height ? ` height="${im.height}"` : ''} alt="${attr(im.decorative ? '' : im.alt || '')}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'}>`;
    }
    if (live) return '';
    const hint = (im && (im.slot || im.alt)) || '';
    add('blank', path, `photo missing${hint ? `: ${hint}` : ''}`);
    return `<figure class="slot ${cls}" data-slot="${attr(path)}"><span class="slot__label">${esc(L.slot)} ${esc(hint)}</span></figure>`;
  };

  const head = (s, p) =>
    `<div class="sec__head">${blank(s.label) ? '' : `<p class="label">${txt(s.label, p + '.label')}</p>`}` +
    `<h2>${txt(s.title, p + '.title', 'title')}</h2>` +
    `${blank(s.intro) ? '' : `<p class="sec__intro">${txt(s.intro, p + '.intro')}</p>`}</div>`;
  const note = (s, p) => (blank(s.note) ? '' : `<p class="sec__note">${txt(s.note, p + '.note')}</p>`);
  const sec = (s, id, cls, inner) =>
    `<section class="sec ${cls}${s.tone === 'alt' ? ' sec--alt' : ''}" id="${attr(id)}" data-type="${attr(s.type)}"><div class="wrap">${inner}</div></section>`;

  // ---- integrations ----------------------------------------------------------------
  const integ = site.integrations || {};
  const formCfg = integ.form || {};
  const formProvider = formCfg.provider === 'netlify' ? 'netlify' : !blank(formCfg.endpoint) ? 'endpoint' : null;
  const bookingEmbed = integ.booking && !blank(integ.booking.embed) ? integ.booking.embed : null;

  // ---- which sections show ---------------------------------------------------------
  const idOf = (s) => s.id || (s.type === 'hero' ? 'top' : s.type);
  const all = list(content.sections).map((s, i) => ({ s, i })).filter(({ s }) => s.on !== false);
  const shown = [];
  all.forEach(({ s, i }) => {
    let why = s.type === 'booking' ? (!bookingEmbed && !formProvider ? 'a booking widget or a connected form' : null) : READY[s.type] ? READY[s.type](s) : null;
    if (!READY[s.type] && s.type !== 'booking') { add('error', `sections.${i}`, `unknown section type "${s.type}"`); return; }
    if (live && why) { hidden.push({ id: idOf(s), type: s.type, reason: why }); return; }
    shown.push({ s, i });
  });
  const ids = new Set(shown.map(({ s }) => idOf(s)));
  if (ids.size !== shown.length) add('warn', 'sections', 'two sections share the same id');

  // ---- section renderers -----------------------------------------------------------
  const R = {};

  R.hero = (s, p, id, next) => {
    const img = image(s.image, p + '.image', { cls: 'hero__img', eager: true });
    const cta = site.cta || {};
    return `<section class="s-hero${img ? '' : ' s-hero--text'}" id="${attr(id)}" data-type="hero">${img}
  <div class="wrap hero__in">
    <h1>${txt(s.heading, p + '.heading')}</h1>
    ${blank(s.text) ? '' : `<p class="hero__text">${txt(s.text, p + '.text')}</p>`}
    ${blank(cta.label) ? '' : `<div class="hero__acts"><a class="btn" href="${attr(cta.href || '#booking')}">${esc(cta.label)}</a></div>`}
  </div>
  ${next ? `<a class="hero__scroll" href="#${attr(next)}">${esc(L.scroll)}</a>` : ''}
</section>`;
  };

  R.statement = (s, p, id) =>
    `<section class="s-statement" id="${attr(id)}" data-type="statement"><div class="wrap"><p class="statement__text">${txt(s.text, p + '.text')}</p></div></section>`;

  R.hotspots = (s, p, id) => {
    const pts = list(s.points);
    const ratio = s.image?.width && s.image?.height ? `${s.image.width} / ${s.image.height}` : '4 / 3';
    const img = image(s.image, p + '.image', { cls: 'hotspots__img' });
    const dots = pts.map((pt, i) => {
      const n = String(i + 1).padStart(2, '0');
      if (!(pt.x >= 0 && pt.x <= 100 && pt.y >= 0 && pt.y <= 100)) add('error', `${p}.points.${i}`, 'x and y must be numbers from 0 to 100 (percent of the photo)');
      return `<button class="point" type="button" role="tab" id="${attr(id)}-t${n}" aria-controls="${attr(id)}-p${n}" aria-selected="${i === 0}"${i ? ' tabindex="-1"' : ''} style="left:${pt.x}%;top:${pt.y}%"><span class="vh">${esc(pt.title)}, </span>${n}</button>`;
    }).join('');
    const panels = pts.map((pt, i) => {
      const n = String(i + 1).padStart(2, '0'), q = `${p}.points.${i}`;
      return `<div class="hotspots__panel" role="tabpanel" id="${attr(id)}-p${n}" aria-labelledby="${attr(id)}-t${n}"${i ? ' hidden' : ''}>
      <p class="hotspots__title"><span class="hotspots__nr">${n}</span><span>${txt(pt.title, q + '.title')}</span></p>
      ${blank(pt.text) ? '' : `<p>${txt(pt.text, q + '.text')}</p>`}${blank(pt.more) ? '' : `<p>${txt(pt.more, q + '.more')}</p>`}</div>`;
    }).join('');
    return `<section class="s-hotspots" id="${attr(id)}" data-type="hotspots">
  <div class="hotspots__stage" style="--ratio:${ratio}">
    <div class="hotspots__photo">${img}
      <div class="hotspots__points" role="tablist" aria-label="${attr(s.pointsLabel || L.pointsLabel)}">${dots}</div>
    </div>
    <div class="hotspots__zone"><p class="hotspots__hint">${esc(s.hint || L.pointsHint)}</p><div class="hotspots__cards">${panels}</div></div>
  </div>
</section>`;
  };

  R.offering = (s, p, id) => {
    const cards = list(s.items).map((it, i) => {
      if (live && blank(it.name)) return '';
      const q = `${p}.items.${i}`;
      const meta = ['price', 'duration'].filter((k) => k in it).map((k) => {
        if (blank(it[k]) && live) { add('omitted', `${q}.${k}`, k); return ''; }
        return `<div><dt>${esc(L[k])}</dt><dd>${txt(it[k], `${q}.${k}`)}</dd></div>`;
      }).join('');
      const good = it.goodFor ? `<div class="offer__good"><p class="label">${esc(it.goodFor.title || L.goodFor)}</p><ul class="ticks">${list(it.goodFor.list).map((x, j) => `<li>${txt(x, `${q}.goodFor.list.${j}`)}</li>`).join('')}</ul></div>` : '';
      return `<article class="offer"><div class="offer__main"><h3>${txt(it.name, q + '.name', 'name')}</h3>${blank(it.text) ? '' : `<p>${txt(it.text, q + '.text')}</p>`}${meta ? `<dl class="offer__meta">${meta}</dl>` : ''}</div>${good}</article>`;
    }).join('');
    return sec(s, id, 's-offering', `${head(s, p)}<div class="offers">${cards}</div>${note(s, p)}`);
  };

  R.steps = (s, p, id) =>
    sec(s, id, 's-steps', `${head(s, p)}<div class="steps">${list(s.items).map((it, i) => {
      const q = `${p}.items.${i}`;
      return `<div class="step">${blank(it.when) ? '' : `<p class="label">${txt(it.when, q + '.when')}</p>`}<h3>${txt(it.title, q + '.title', 'title')}</h3><p>${txt(it.text, q + '.text')}</p></div>`;
    }).join('')}</div>${note(s, p)}`);

  R.about = (s, p, id) => {
    const img = s.image ? image(s.image, p + '.image', { cls: 'about__img' }) : '';
    const paras = list(s.paragraphs).map((t, i) => `<p${i === 0 ? ' class="lead"' : ''}>${txt(t, `${p}.paragraphs.${i}`)}</p>`).join('');
    const facts = list(s.facts).map((f, i) => {
      if (blank(f.v) && live) { add('omitted', `${p}.facts.${i}.v`, f.k); return ''; }
      return `<div><dt>${esc(f.k)}</dt><dd>${txt(f.v, `${p}.facts.${i}.v`, undefined, f.k)}</dd></div>`;
    }).join('');
    return sec(s, id, 's-about', `${head(s, p)}<div class="about">${img ? `<figure class="about__photo">${img}</figure>` : ''}<div class="prose">${paras}${facts ? `<dl class="facts facts--small">${facts}</dl>` : ''}</div></div>`);
  };

  R.reviews = (s, p, id) => {
    const items = list(s.items).map((it, i) => {
      if (blank(it.text) && live) return '';
      const q = `${p}.items.${i}`;
      if (!live && blank(it.text)) { add('blank', q, 'review text'); }
      if (!blank(it.text) && blank(it.source)) add('warn', q, 'review has no source (say where it came from, e.g. Google)');
      const stars = it.rating ? `<p class="review__stars" role="img" aria-label="${attr(L.stars.replace('{n}', it.rating))}">${'\u2605'.repeat(it.rating)}</p>` : '';
      const by = [it.name, it.source].filter((x) => !blank(x)).join(', ');
      return `<figure class="review">${stars}<blockquote>${blank(it.text) ? fill(q + '.text', 'review') : rich(it.text, q + '.text')}</blockquote>${by ? `<figcaption>${esc(by)}</figcaption>` : ''}</figure>`;
    }).join('');
    return sec(s, id, 's-reviews', `${head(s, p)}<div class="reviews">${items}</div>${note(s, p)}`);
  };

  R.pricing = (s, p, id) => {
    const plans = list(s.plans).map((pl, i) => {
      const q = `${p}.plans.${i}`;
      if (live && blank(pl.price)) { add('omitted', q, `plan "${pl.name}" has no price`); return ''; }
      const pts = list(pl.points).map((x, j) => `<li>${txt(x, `${q}.points.${j}`)}</li>`).join('');
      return `<article class="plan${pl.featured ? ' plan--featured' : ''}"><h3>${txt(pl.name, q + '.name', 'name')}</h3>${blank(pl.for) ? '' : `<p class="plan__for">${txt(pl.for, q + '.for')}</p>`}
      <p class="plan__price">${txt(pl.price, q + '.price', undefined, `${pl.name}: price`)}</p>${'duration' in pl ? `<p class="plan__duration">${txt(pl.duration, q + '.duration', undefined, `${pl.name}: duration`)}</p>` : ''}
      ${pts ? `<ul class="ticks">${pts}</ul>` : ''}<a class="btn" href="${attr((site.cta && site.cta.href) || '#booking')}">${esc(pl.cta || (site.cta && site.cta.short) || (site.cta && site.cta.label) || L.send)}</a></article>`;
    }).join('');
    return sec(s, id, 's-pricing', `${head(s, p)}<div class="plans">${plans}</div>${note(s, p)}`);
  };

  R.practical = (s, p, id) => {
    const rows = list(s.facts).map((f, i) => {
      const q = `${p}.facts.${i}`;
      if (blank(f.v) && live) { add('omitted', q, f.k); return ''; }
      const val = blank(f.v) ? fill(q + '.v', f.hint, f.k) : blank(f.href) ? rich(f.v, q + '.v') : `<a href="${attr(f.href)}">${rich(f.v, q + '.v')}</a>`;
      return `<div><dt>${esc(f.k)}</dt><dd>${val}</dd></div>`;
    }).join('');
    let map = '';
    if (s.map && !blank(s.map.embed)) map = `<div class="map">${s.map.embed}</div>`;
    else if (!live) { add('blank', p + '.map', 'map'); map = `<figure class="slot map" data-slot="${attr(p)}.map"><span class="slot__label">${esc(L.slot)} ${esc((s.map && s.map.slot) || 'map')}</span></figure>`; }
    return sec(s, id, 's-practical', `${head(s, p)}<div class="practical"><dl class="facts">${rows}</dl>${map}</div>`);
  };

  R.faq = (s, p, id) =>
    sec(s, id, 's-faq', `${head(s, p)}<div class="qa">${list(s.items).map((q, i) =>
      `<details${i === 0 ? ' open' : ''}><summary>${txt(q.q, `${p}.items.${i}.q`, 'question')}</summary><p>${txt(q.a, `${p}.items.${i}.a`, 'answer')}</p></details>`).join('')}</div>`);

  R.booking = (s, p, id) => {
    let widget = '';
    if (bookingEmbed) widget = `<div class="booking__widget">${bookingEmbed}</div>`;
    else if (!live) { add('blank', 'site.integrations.booking.embed', 'booking widget'); widget = `<figure class="slot booking__widget" data-slot="booking"><span class="slot__label">${esc(L.slot)} ${esc((integ.booking && integ.booking.slot) || 'booking widget')}</span></figure>`; }
    let form = '';
    const f = s.form || {};
    if (formProvider || !live) {
      const fields = list(f.fields).length ? f.fields : DEFAULT_FIELDS;
      const open = formProvider === 'netlify'
        ? `<form class="form" name="contact" method="POST" action="/thanks/" data-netlify="true" netlify-honeypot="bot-field"><input type="hidden" name="form-name" value="contact"><p hidden><label>Do not fill this in: <input name="bot-field"></label></p>`
        : formProvider === 'endpoint' ? `<form class="form" method="POST" action="${attr(formCfg.endpoint)}">`
        : `<form class="form" data-unconnected novalidate>`;
      if (!formProvider) add('blank', 'site.integrations.form', 'form is not connected (choose provider "netlify" or set an endpoint)');
      form = `<div class="booking__form">${open}${fields.map((fl) => {
        const id2 = `f-${fl.name}`;
        const common = `id="${id2}" name="${attr(fl.name)}"${fl.required ? ' required' : ''}${fl.autocomplete ? ` autocomplete="${attr(fl.autocomplete)}"` : ''}${fl.placeholder ? ` placeholder="${attr(fl.placeholder)}"` : ''}`;
        const ctl = fl.type === 'textarea' ? `<textarea ${common} rows="${fl.rows || 3}"></textarea>` : `<input ${common} type="${attr(fl.type || 'text')}"${fl.type === 'email' ? ' inputmode="email"' : ''}>`;
        return `<label class="${fl.wide ? 'wide' : ''}" for="${id2}"><span>${esc(fl.label)}</span>${ctl}</label>`;
      }).join('')}<div class="form__foot wide"><button class="btn" type="submit">${esc(f.button || L.send)}</button><p class="help" id="form-help" aria-live="polite"></p></div>${blank(f.note) ? '' : `<p class="form__note wide">${txt(f.note, p + '.form.note')}</p>`}</form></div>`;
    }
    return `<section class="sec s-booking" id="${attr(id)}" data-type="booking"><div class="wrap">${blank(s.title) ? '' : `<h2>${txt(s.title, p + '.title')}</h2>`}${blank(s.text) ? '' : `<p class="booking__text">${txt(s.text, p + '.text')}</p>`}${widget}${form}</div></section>`;
  };

  // ---- the page --------------------------------------------------------------------
  const sectionsHtml = shown.map(({ s, i }, k) => {
    const next = shown[k + 1] ? idOf(shown[k + 1].s) : null;
    return R[s.type](s, `sections.${i}`, idOf(s), next);
  }).join('\n\n');

  const cta = site.cta || {};
  if (cta.href && cta.href.startsWith('#') && !ids.has(cta.href.slice(1)) && !(cta.href === '#top'))
    add(live ? 'error' : 'warn', 'site.cta.href', `button points to ${cta.href} but no such section is shown`);

  const menu = shown.filter(({ s }) => !blank(s.nav)).map(({ s }) => `<a href="${attr('#' + idOf(s))}">${esc(s.nav)}</a>`).join('\n    ');
  const logo = site.logo && !blank(site.logo.src)
    ? `<img src="${attr(asset(site.logo.src))}"${site.logo.width ? ` width="${site.logo.width}" height="${site.logo.height}"` : ''} alt="${attr(site.logo.alt || site.name || '')}">`
    : `<span class="wordmark">${esc(site.name || '')}</span>`;

  const foot = site.footer || {};
  const links = list(foot.links).map((l) => `<a href="${attr(l.href)}">${esc(l.label)}</a>`).join(' ');
  if (live && !list(foot.links).length) add('warn', 'site.footer.links', 'no privacy page linked (needed under GDPR when you collect personal data)');

  const indexable = live && site.indexable === true;
  if (live && !indexable) add('warn', 'site.indexable', 'site is live but still set to noindex (search engines will skip it)');
  if (blank(site.description)) add('warn', 'site.description', 'no description (shown in search results and link previews)');
  const title = site.title || site.name || '';
  const fonts = list(theme.fonts);

  const html = `<!doctype html>
<html lang="${attr(lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${attr(site.description || '')}">
<meta property="og:title" content="${attr(title)}">
<meta property="og:description" content="${attr(site.description || '')}">
<meta property="og:type" content="website">
<meta name="theme-color" content="${attr(theme.themeColor || '#ffffff')}">
${indexable ? '' : '<meta name="robots" content="noindex, nofollow">\n'}${live && site.url ? `<link rel="canonical" href="${attr(site.url)}">\n` : ''}${site.icon ? `<link rel="icon" href="${attr(asset(site.icon))}">\n` : ''}${fonts.length ? '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' + fonts.map((f) => `<link href="${attr(f)}" rel="stylesheet">`).join('\n') + '\n' : ''}<link rel="stylesheet" href="${attr(cssHref)}">
<script>document.documentElement.classList.add('js');</script>
</head>
<body>
<a class="skip" href="#main">${esc(L.skip)}</a>

<header class="top">
  <div class="wrap top__in">
    <button class="top__menu" type="button" data-menu-open aria-expanded="false" aria-controls="menu"><span></span>${esc(L.menu)}</button>
    <a class="top__mark" href="#top" aria-label="${attr(site.name || '')}">${logo}</a>
    ${blank(cta.label) ? '<span></span>' : `<a class="top__act" href="${attr(cta.href || '#booking')}">${esc(cta.label)}</a>`}
  </div>
</header>

<div class="menu" id="menu" hidden>
  <button class="menu__close" type="button" data-menu-close>${esc(L.close)}</button>
    ${menu}
    ${blank(cta.label) ? '' : `<a href="${attr(cta.href || '#booking')}">${esc(cta.label)}</a>`}
</div>

<main id="main">
${sectionsHtml}
</main>

<footer class="foot wrap">
  ${blank(foot.line) ? '' : `<p class="foot__line">${txt(foot.line, 'site.footer.line')}</p>`}
  ${links ? `<p class="foot__links">${links}</p>` : ''}
  ${blank(foot.disclaimer) ? '' : `<p class="foot__small">${txt(foot.disclaimer, 'site.footer.disclaimer')}</p>`}
</footer>

<script type="application/json" id="labels">${JSON.stringify({ notConnected: L.notConnected, needName: L.needName, needEmail: L.needEmail, pause: L.pause, play: L.play }).replace(/</g, '\\u003c')}</script>
<script src="${attr(opts.appHref || 'app.js')}"></script>
</body>
</html>
`;

  const names = {};
  list(content.sections).forEach((s, i) => { names[i] = idOf(s); });
  issues.forEach((is) => { is.path = is.path.replace(/^sections\.(\d+)/, (_, n) => names[n] ?? `sections.${n}`); });
  return { html, issues, hidden, status, ids: [...ids] };
}

/** A small page in the same theme: 404 and the "thank you" page after a form is sent. */
export function simplePage(content, opts, { kind, cssHref, homeHref = '/' }) {
  const site = content.site || {};
  const theme = opts.theme || {};
  const lang = site.lang || 'nl';
  const L = { ...(LOCALES[lang] || LOCALES.en), ...(site.labels || {}) };
  const title = kind === 'thanks' ? L.thanksTitle : L.notFoundTitle;
  const text = kind === 'thanks' ? L.thanksText : L.notFoundText;
  return `<!doctype html>
<html lang="${attr(lang)}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} | ${esc(site.name || '')}</title><meta name="robots" content="noindex">
${list(theme.fonts).map((f) => `<link href="${attr(f)}" rel="stylesheet">`).join('\n')}
<link rel="stylesheet" href="${attr(cssHref)}"></head>
<body class="simple"><main class="wrap simple__in"><h1>${esc(title)}</h1><p>${esc(text)}</p><p><a class="btn" href="${attr(homeHref)}">${esc(L.home)}</a></p></main></body></html>
`;
}

export function chooserPage(content, themes) {
  const site = content.site || {};
  const lang = site.lang || 'nl';
  const L = { ...(LOCALES[lang] || LOCALES.en), ...(site.labels || {}) };
  const cards = themes.map((t) => `<li><a href="${attr(t.name)}/">${t.preview ? `<img src="${attr(t.name)}/${attr(t.preview)}" alt="" width="1440" height="900">` : ''}<h2>${esc(t.label || t.name)}</h2><p>${esc(t.description || '')}</p>${t.route ? `<p class="route">${esc(t.route)}</p>` : ''}</a></li>`).join('\n');
  return `<!doctype html>
<html lang="${attr(lang)}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(L.chooserTitle)} | ${esc(site.name || '')}</title><meta name="robots" content="noindex, nofollow">
<style>
:root{color-scheme:light}*{box-sizing:border-box}body{margin:0;font:400 1.0625rem/1.6 ui-sans-serif,system-ui,sans-serif;background:#fbf6f0;color:#2b1a14}
main{max-width:1200px;margin:0 auto;padding:clamp(32px,6vw,80px) clamp(20px,4vw,56px)}h1{font-weight:300;font-size:clamp(2rem,4vw,3rem);margin:0 0 .3em}
.lead{color:#6b5446;margin:0 0 2.4em}ul{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:32px}
a{color:inherit;text-decoration:none;display:grid;gap:8px}a:focus-visible{outline:2px solid #a8563d;outline-offset:6px}
img{width:100%;height:auto;border:1px solid #ded0c0;display:block}li h2{font-weight:400;font-size:1.25rem;margin:.2em 0 0}li p{margin:0;color:#6b5446}.route{font-size:.8125rem;letter-spacing:.08em;text-transform:uppercase;color:#8d4530!important}
a:hover img{border-color:#2b1a14}
</style></head>
<body><main><h1>${esc(L.chooserTitle)}</h1><p class="lead">${esc(L.chooserText)}</p><ul>
${cards}
</ul></main></body></html>
`;
}
