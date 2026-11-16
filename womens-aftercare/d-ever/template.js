/* Holi Her — het sjabloon.
 * Deze ene functie bouwt de hele pagina uit de gegevens. De bouwstap draait hem
 * in Node om index.html te maken; in de browser draait hij opnieuw zodra jij in
 * de bewerkmodus iets verandert en op Opslaan klikt. Zo kan de opmaak nooit
 * uit elkaar lopen tussen wat je ziet en wat er wordt bewaard.
 */
(function (g) {
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const attr = (s) => esc(s).replace(/"/g, '&quot;');

  // tekstveld dat je in de bewerkmodus kunt aanpassen
  const T = (d, pad, tag = 'p', klasse = '') =>
    `<${tag}${klasse ? ` class="${klasse}"` : ''} data-veld="${attr(pad)}">${esc(lees(d, pad))}</${tag}>`;
  const lees = (d, pad) => pad.split('.').reduce((o, k) => (o == null ? '' : o[k]), d);

  const sectie = (d, id, binnen, klasse = '') => {
    const s = (d.secties && d.secties[id]) || {};
    if (s.aan === false) return '';
    const schaal = s.schaal && s.schaal !== 1 ? ` style="--schaal:${s.schaal}"` : '';
    return `<section class="${klasse}" id="${id}" data-sectie="${id}"${schaal}>${binnen}</section>`;
  };

  const kop = (d, basis, klasse = 'sec__kop') =>
    `<div class="${klasse}">${T(d, basis + '.label', 'p', 'label')}${T(d, basis + '.titel', 'h2')}` +
    (lees(d, basis + '.onder') ? T(d, basis + '.onder') : '') + `</div>`;

  function render(d) {
    const t = d.tekst;
    const blok = {};

    // 2. ondertitel, groot gezet
    blok.ondertitel = sectie(d, 'ondertitel',
      `<div class="wrap">${T(d, 'tekst.ondertitel', 'p', 'ondertitel__tekst')}</div>`, 'ondertitel');

    // 3. verklaring in kapitalen
    blok.verklaring = sectie(d, 'verklaring',
      `<div class="wrap">${T(d, 'tekst.verklaring', 'h2')}</div>`, 'verklaring');

    // 4. de lopende band, over de volle breedte
    const bandregel = esc(t.band);
    blok.band = sectie(d, 'band',
      `<div class="band__rij"><div class="band__spoor" aria-hidden="true">` +
      `<span>${bandregel.repeat(3)}</span><span>${bandregel.repeat(3)}</span></div>` +
      `<button class="band__pauze" type="button" data-band-toggle>Pauzeer</button></div>`, 'band');

    // 5. het probleem: alleen de foto met de punten
    const punten = d.lijsten.klachten.map((k, i) => {
      const aan = i === 0;
      return `<button class="punt" type="button" role="tab" id="t${k.nr}" aria-controls="k${k.nr}"` +
        ` aria-selected="${aan}"${aan ? '' : ' tabindex="-1"'} data-x="${k.x}" data-y="${k.y}">` +
        `<span class="vh">${esc(k.titel)}, </span>${esc(k.nr)}</button>`;
    }).join('');
    const kaarten = d.lijsten.klachten.map((k, i) => {
      const n = `lijsten.klachten.${i}`;
      return `<div class="kaart__inhoud" role="tabpanel" id="k${k.nr}" aria-labelledby="t${k.nr}"${i ? ' hidden' : ''}>` +
        `<p class="kaart__kop"><span class="kaart__nr">${esc(k.nr)}</span>` +
        `<span class="kaart__titel" data-veld="${n}.titel">${esc(k.titel)}</span></p>` +
        T(d, n + '.kort') + T(d, n + '.extra') +
        `<p class="kaart__meta">${esc(t.kaartMeta)}</p></div>`;
    }).join('');
    blok.probleem = sectie(d, 'probleem',
      `<div class="doek">` +
      `<img src="brand/scar.jpg" width="1312" height="1199" alt="${attr(t.altLitteken)}" loading="lazy">` +
      `<div class="punten__tabs" role="tablist" aria-label="Wat vrouwen ervaren">${punten}</div>` +
      `<div class="kaartzone">` +
      `<p class="doek__hint" data-veld="tekst.puntHint">${esc(t.puntHint)}</p>` +
      `<div class="kaart">${kaarten}</div></div></div>`, 'punten');

    // 6. diensten
    const diensten = d.lijsten.diensten.map((r, i) => {
      const n = `lijsten.diensten.${i}`;
      return `<div class="lijst__rij"><span class="lijst__nr">${String(i + 1).padStart(2, '0')}</span>` +
        `<div>${T(d, n + '.naam', 'h3')}<dl class="lijst__cijfers">` +
        `<div><dt>Duur</dt><dd><span class="fill" data-veld="${n}.duur">${esc(r.duur)}</span></dd></div>` +
        `<div><dt>Prijs</dt><dd><span class="fill" data-veld="${n}.prijs">${esc(r.prijs)}</span></dd></div>` +
        `</dl></div><div>${T(d, n + '.wat')}${T(d, n + '.voor', 'p', 'lijst__voor')}</div></div>`;
    }).join('');
    blok.diensten = sectie(d, 'diensten',
      `<div class="wrap">${kop(d, 'tekst.diensten')}<div class="lijst">${diensten}</div></div>`, 'sec sec--diep');

    // 7. hoe het gaat
    const stappen = d.lijsten.verloop.map((s, i) => {
      const n = `lijsten.verloop.${i}`;
      return `<div class="stap">${T(d, n + '.wanneer', 'p', 'label')}${T(d, n + '.titel', 'h3')}${T(d, n + '.tekst')}</div>`;
    }).join('');
    blok.verloop = sectie(d, 'verloop',
      `<div class="wrap">${kop(d, 'tekst.verloop')}<div class="stappen">${stappen}</div></div>`, 'sec');

    // 8. over mij
    const verhaal = d.lijsten.verhaal.map((p, i) =>
      T(d, `lijsten.verhaal.${i}.tekst`, 'p', i === 0 ? 'eerste' : '')).join('');
    const opleiding = d.lijsten.opleiding.map((r, i) =>
      `<div><dt data-veld="lijsten.opleiding.${i}.k">${esc(r.k)}</dt>` +
      `<dd><span class="fill" data-veld="lijsten.opleiding.${i}.v">${esc(r.v)}</span></dd></div>`).join('');
    blok.over = sectie(d, 'over',
      `<div class="wrap">${kop(d, 'tekst.over')}<div class="over">` +
      `<figure class="over__foto"><img src="brand/portret.jpg" width="1066" height="1600" alt="${attr(t.altPortret)}" loading="lazy"></figure>` +
      `<div class="prose">${verhaal}<dl class="opleiding">${opleiding}</dl></div></div></div>`, 'sec');

    // 9. ervaringen
    const reviews = d.lijsten.reviews.map((r, i) =>
      `<figure class="review"><b data-veld="lijsten.reviews.${i}.kop">${esc(r.kop)}</b>` +
      `<span data-veld="lijsten.reviews.${i}.tekst">${esc(r.tekst)}</span></figure>`).join('');
    blok.ervaringen = sectie(d, 'ervaringen',
      `<div class="wrap">${kop(d, 'tekst.ervaringen')}<div class="reviews">${reviews}</div>` +
      T(d, 'tekst.reviewNoot', 'p', 'sec__noot') + `</div>`, 'sec sec--diep');

    // 10. prijzen
    const pakketten = d.lijsten.pakketten.map((p, i) => {
      const n = `lijsten.pakketten.${i}`;
      const punten = p.punten.map((x, j) => `<li data-veld="${n}.punten.${j}">${esc(x)}</li>`).join('');
      return `<article class="pakket${p.uit ? ' pakket--uit' : ''}">${T(d, n + '.naam', 'h3')}` +
        T(d, n + '.wat', 'p', 'pakket__wat') +
        `<p class="pakket__prijs"><span class="fill" data-veld="${n}.prijs">${esc(p.prijs)}</span></p>` +
        `<p class="pakket__duur"><span class="fill" data-veld="${n}.duur">${esc(p.duur)}</span></p>` +
        `<ul>${punten}</ul><a class="btn" href="#afspraak">${esc(t.ctaKlein)}</a></article>`;
    }).join('');
    blok.prijzen = sectie(d, 'prijzen',
      `<div class="wrap">${kop(d, 'tekst.prijzen')}<div class="pakketten">${pakketten}</div>` +
      T(d, 'tekst.prijsNoot', 'p', 'sec__noot') + `</div>`, 'sec');

    // 11. praktisch
    const feiten = d.lijsten.praktisch.map((r, i) =>
      `<div><dt data-veld="lijsten.praktisch.${i}.k">${esc(r.k)}</dt>` +
      `<dd><span class="fill" data-veld="lijsten.praktisch.${i}.v">${esc(r.v)}</span></dd></div>`).join('');
    blok.praktisch = sectie(d, 'praktisch',
      `<div class="wrap">${kop(d, 'tekst.praktisch')}<div class="praktisch"><dl class="feiten">${feiten}</dl>` +
      `<figure class="plek kaartje" data-slot="kaart" data-alt="Een kaart van de buurt met de studio erop">` +
      `<span class="plek__tekst">Hier komt de kaart<span class="plek__maat" data-veld="tekst.kaartNoot">${esc(t.kaartNoot)}</span></span>` +
      `</figure></div></div>`, 'sec sec--diep');

    // 12. vragen
    const vragen = d.lijsten.vragen.map((q, i) =>
      `<details${i === 0 ? ' open' : ''}><summary data-veld="lijsten.vragen.${i}.v">${esc(q.v)}</summary>` +
      `<p data-veld="lijsten.vragen.${i}.a">${esc(q.a)}</p></details>`).join('');
    blok.vragen = sectie(d, 'vragen',
      `<div class="wrap">${kop(d, 'tekst.vragen')}<div class="qa">${vragen}</div></div>`, 'sec');

    // 13. afspraak
    blok.afspraak = sectie(d, 'afspraak',
      `<div class="wrap">${T(d, 'tekst.slotKop', 'h2')}${T(d, 'tekst.slotTekst')}` +
      `<figure class="plek agenda" data-slot="agenda" data-alt="De ingesloten agenda waarin bezoekers zelf een moment kiezen">` +
      `<span class="plek__tekst">Hier komt je agenda<span class="plek__maat" data-veld="tekst.agendaNoot">${esc(t.agendaNoot)}</span></span></figure>` +
      `<div class="formhouder"><form class="form" data-endpoint="" novalidate>` +
      `<label>Je naam <input name="naam" type="text" autocomplete="name" required></label>` +
      `<label>E-mailadres <input name="email" type="email" autocomplete="email" inputmode="email" required></label>` +
      `<label class="wide">Hoe lang geleden was je bevalling <input name="bevalling" type="text" autocomplete="off" placeholder="Acht weken, of drie jaar"></label>` +
      `<label class="wide">Wat speelt er bij jou <textarea name="bericht" rows="3"></textarea></label>` +
      `<div class="form__voet wide"><button class="btn" type="submit">${esc(t.formKnop)}</button>` +
      `<p class="help" id="form-help" aria-live="polite"></p></div></form></div></div>`, 'slot');

    const menu = d.volgorde.filter((id) => blok[id] && d.menu[id])
      .map((id) => `<a href="#${id}">${esc(d.menu[id])}</a>`).join('\n    ');

    const body = d.volgorde.map((id) => blok[id] || '').filter(Boolean).join('\n\n');
    const hs = (d.secties && d.secties.hero) || {};
    const heroStijl = (hs.schaal && hs.schaal !== 1 ? ` style="--schaal:${hs.schaal}"` : '') + (hs.aan === false ? ' data-uit' : '');

    return `<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t.titel)}</title>
<meta name="description" content="${attr(t.omschrijving)}">
<meta property="og:title" content="${attr(t.titel)}">
<meta property="og:description" content="${attr(t.omschrijving)}">
<meta property="og:type" content="website">
<meta name="theme-color" content="#7a4e3e">
<link rel="icon" href="brand/logo-mark.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200;0,6..72,300;0,6..72,400;1,6..72,300&family=Hanken+Grotesk:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="styles.css">
<script>document.documentElement.classList.add('js');</script>
</head>
<body>
<a class="skip" href="#main">Ga naar de inhoud</a>

<header class="top">
  <div class="wrap top__in">
    <button class="top__menu" type="button" data-menu-open aria-expanded="false" aria-controls="menu"><span></span>Menu</button>
    <a class="top__mark" href="#top" aria-label="Holi Her, naar boven">
      <img src="brand/logo-word-cream.png" width="811" height="194" alt="Holi Her">
    </a>
    <a class="top__act" href="#afspraak" data-veld="tekst.navAfspraak">${esc(t.navAfspraak)}</a>
  </div>
</header>

<div class="menu" id="menu" hidden>
  <button class="menu__close" type="button" data-menu-close>Sluiten</button>
    ${menu}
    <a href="#afspraak">${esc(t.navAfspraak)}</a>
</div>

<main id="main">
<section class="hero" id="top" data-sectie="hero"${heroStijl}>
  <img src="brand/moeder.jpg" srcset="brand/moeder-900.jpg 900w, brand/moeder-1300.jpg 1300w, brand/moeder.jpg 1800w" sizes="100vw" width="1800" height="1344" alt="${attr(t.altHero)}" fetchpriority="high">
  <div class="wrap">
    ${T(d, 'tekst.heroKop', 'h1')}
    <div class="hero__acts"><a class="btn" href="#afspraak" data-veld="tekst.cta">${esc(t.cta)}</a></div>
  </div>
  <a class="hero__scroll" href="#ondertitel">${esc(t.heroScroll)}</a>
</section>

${body}
</main>

<footer class="voet wrap">
  <img class="voet__logo" src="brand/logo-cream.png" width="1254" height="1254" alt="Holi Her" loading="lazy">
  ${T(d, 'tekst.voetRegel', 'p', 'voet__regel')}
  ${T(d, 'tekst.disclaimer', 'p', 'voet__klein')}
</footer>

<script type="application/json" id="holi-data">${JSON.stringify(d).replace(/</g, '\\u003c')}</script>
<script src="template.js"></script>
<script src="app.js"></script>
</body>
</html>
`;
  }

  g.HOLI = { render };
})(typeof window !== 'undefined' ? window : globalThis);
