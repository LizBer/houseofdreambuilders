/* Holi Her — versie D. Het gedrag van de pagina, plus de bewerkmodus. */
(function () {
  'use strict';
  const kies = (s, w) => (w || document).querySelector(s);
  const alles = (s, w) => [...(w || document).querySelectorAll(s)];
  const stil = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ——— menu ——— */
  (function menu() {
    const paneel = kies('#menu');
    const open = kies('[data-menu-open]');
    if (!paneel || !open) return;
    const sluit = kies('[data-menu-close]', paneel);
    const zet = (aan) => {
      paneel.hidden = !aan;
      open.setAttribute('aria-expanded', String(aan));
      document.body.style.overflow = aan ? 'hidden' : '';
      if (aan) (kies('a', paneel) || sluit).focus();
      else open.focus();
    };
    open.addEventListener('click', () => zet(true));
    sluit.addEventListener('click', () => zet(false));
    paneel.addEventListener('click', (e) => { if (e.target.tagName === 'A') zet(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !paneel.hidden) zet(false); });
  })();

  /* ——— de lopende band ——— */
  (function band() {
    const b = kies('.band');
    if (!b) return;
    const knop = kies('[data-band-toggle]', b);
    let doorGebruiker = false;
    const zet = (pauze) => {
      b.dataset.pauze = pauze ? 'ja' : 'nee';
      if (knop) knop.textContent = pauze ? 'Laat lopen' : 'Pauzeer';
    };
    zet(stil.matches);
    if (knop) knop.addEventListener('click', () => { doorGebruiker = !(b.dataset.pauze === 'ja'); zet(doorGebruiker); });
    b.addEventListener('pointerenter', () => { if (!doorGebruiker) zet(true); });
    b.addEventListener('pointerleave', () => { if (!doorGebruiker) zet(stil.matches); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([i]) => { if (!doorGebruiker) zet(!i.isIntersecting || stil.matches); })
        .observe(b);
    }
  })();

  /* ——— de punten op het litteken ———
     De foto vult de hele breedte en wordt bijgesneden, dus de punten reken ik
     uit vanuit de echte beeldmaat: dan blijven ze op hun plek op de buik,
     op elk scherm. */
  (function punten() {
    const doek = kies('.doek');
    if (!doek) return;
    const foto = kies('img', doek);
    const tabs = alles('[role="tab"]', doek);
    if (!foto || !tabs.length) return;

    const leg = () => {
      const nb = foto.naturalWidth || Number(foto.getAttribute('width')) || 1312;
      const nh = foto.naturalHeight || Number(foto.getAttribute('height')) || 1199;
      const W = foto.clientWidth, H = foto.clientHeight;
      if (!W || !H) return;
      const s = Math.max(W / nb, H / nh);
      const rw = nb * s, rh = nh * s;
      const ox = (W - rw) / 2, oy = (H - rh) / 2;
      tabs.forEach((t) => {
        t.style.left = (ox + rw * Number(t.dataset.x) / 100) + 'px';
        t.style.top = (oy + rh * Number(t.dataset.y) / 100) + 'px';
      });
    };
    if (foto.complete) leg(); else foto.addEventListener('load', leg, { once: true });
    addEventListener('resize', leg);
    if ('ResizeObserver' in window) new ResizeObserver(leg).observe(foto);

    const toon = (tab, focus) => {
      tabs.forEach((t) => {
        const aan = t === tab;
        t.setAttribute('aria-selected', String(aan));
        t.tabIndex = aan ? 0 : -1;
        const p = document.getElementById(t.getAttribute('aria-controls'));
        if (p) p.hidden = !aan;
      });
      if (focus) tab.focus({ preventScroll: true });
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => toon(t, false));
      t.addEventListener('pointerenter', () => { if (matchMedia('(hover: hover)').matches) toon(t, false); });
      t.addEventListener('focus', () => toon(t, false));
      t.addEventListener('keydown', (e) => {
        const stap = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1
          : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
        if (!stap) return;
        e.preventDefault();
        toon(tabs[(i + stap + tabs.length) % tabs.length], true);
      });
    });
    toon(tabs.find((t) => t.getAttribute('aria-selected') === 'true') || tabs[0], false);
  })();

  /* ——— het formulier ——— */
  alles('form[data-endpoint]').forEach((form) => {
    const hulp = kies('[aria-live]', form);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alles('[aria-invalid]', form).forEach((f) => f.removeAttribute('aria-invalid'));
      const fout = alles('input[required]', form).find((f) => !f.checkValidity());
      if (fout) {
        fout.setAttribute('aria-invalid', 'true');
        fout.setAttribute('aria-describedby', hulp.id);
        hulp.textContent = fout.type === 'email'
          ? 'Dat adres lijkt nog niet compleet. Schrijf het als naam@voorbeeld.nl.'
          : 'Vul je naam in, dan weet ik aan wie ik schrijf.';
        fout.focus();
        return;
      }
      if (!form.dataset.endpoint) {
        hulp.textContent = 'Er is niets verstuurd: dit formulier is nog niet aangesloten.';
        return;
      }
      fetch(form.dataset.endpoint, { method: 'POST', body: new FormData(form) })
        .then((r) => { hulp.textContent = r.ok ? 'Dank je. Ik mail je terug.' : 'Dat ging niet door. Probeer het over een minuut nog eens.'; })
        .catch(() => { hulp.textContent = 'Dat ging niet door. Probeer het over een minuut nog eens.'; });
    });
  });

  /* ——— de bewerkmodus ———
     Alleen voor jou: wie de site kan bewerken, krijgt onderaan een balk.
     Je verandert tekst door erin te typen, en maakt een sectie groter of
     kleiner met de knoppen. Opslaan bewaart een nieuwe versie van de pagina. */
  // De kop van het document leg ik vast vóórdat de bewerkmodus er iets aan
  // toevoegt, zodat de balk zelf nooit mee opgeslagen wordt.
  const skeletKop = document.head.innerHTML;

  const gegevensNode = kies('#holi-data');
  if (!gegevensNode || !window.HOLI) return;
  let staat;
  try { staat = JSON.parse(gegevensNode.textContent); } catch (e) { return; }

  const namen = Object.assign({
    hero: 'Eerste scherm', ondertitel: 'Ondertitel', verklaring: 'Verklaring',
    band: 'Lopende band', probleem: 'Wat je merkt', afspraak: 'Afspraak maken',
  }, staat.menu || {});

  const zetPad = (pad, waarde) => {
    const d = pad.split('.');
    let o = staat;
    for (let i = 0; i < d.length - 1; i++) o = o[d[i]];
    o[d[d.length - 1]] = waarde;
  };

  function oogst() {
    alles('[data-veld]').forEach((el) => {
      const t = el.textContent.replace(/\s+/g, ' ').trim();
      if (t) zetPad(el.dataset.veld, t);
    });
  }

  function volledigDocument() {
    const romp = window.HOLI.render(staat);
    return '<!doctype html><html><head>' + skeletKop + '</head><body>\n' + romp + '\n</body></html>';
  }

  (async function bewerken() {
    const gebruiker = await (window.claude && window.claude.use ? window.claude.use('user') : null);
    if (!gebruiker || !gebruiker.canEdit || !gebruiker.canEdit()) return;
    const stuk = await (window.claude.use ? window.claude.use('artifact') : null);

    const balk = document.createElement('div');
    balk.className = 'bewerk';
    balk.innerHTML =
      '<button type="button" data-aan>Tekst bewerken</button>' +
      '<button type="button" data-secties>Secties</button>' +
      '<button type="button" data-opslaan hidden>Opslaan</button>' +
      '<span class="bewerk__zeg" role="status" aria-live="polite"></span>';
    const paneel = document.createElement('div');
    paneel.className = 'bewerk__paneel';
    paneel.hidden = true;
    document.body.append(balk, paneel);

    const stijl = document.createElement('style');
    stijl.textContent = `
      .bewerk { position: fixed; z-index: 70; left: 50%; bottom: 18px; translate: -50% 0; display: flex; align-items: center; gap: 8px; max-width: calc(100vw - 24px); padding: 8px; border-radius: 999px; background: #fbf3ea; color: #633c2f; box-shadow: 0 10px 40px rgba(40,20,14,.45); font: 500 .75rem/1 "Hanken Grotesk", system-ui, sans-serif; }
      .bewerk button { padding: 10px 16px; border: 1px solid #d9c3b4; border-radius: 999px; background: #fff; color: inherit; font: inherit; letter-spacing: .1em; text-transform: uppercase; cursor: pointer; }
      .bewerk button[aria-pressed="true"] { background: #633c2f; border-color: #633c2f; color: #fbf3ea; }
      .bewerk__zeg { padding-right: 8px; max-width: 34ch; letter-spacing: 0; text-transform: none; }
      .bewerk__paneel { position: fixed; z-index: 70; right: 18px; bottom: 76px; width: min(340px, calc(100vw - 36px)); max-height: min(70vh, 620px); overflow: auto; padding: 14px; border-radius: 14px; background: #fbf3ea; color: #633c2f; box-shadow: 0 10px 40px rgba(40,20,14,.45); font: 400 .875rem/1.4 "Hanken Grotesk", system-ui, sans-serif; }
      .bewerk__rij { display: grid; grid-template-columns: 1fr auto; gap: 8px; align-items: center; padding: 8px 0; border-bottom: 1px solid #e5d2c4; }
      .bewerk__rij:last-child { border-bottom: 0; }
      .bewerk__knoppen { display: flex; gap: 4px; }
      .bewerk__paneel button { width: 30px; height: 30px; display: grid; place-items: center; padding: 0; border: 1px solid #d9c3b4; border-radius: 8px; background: #fff; color: inherit; font: 500 .875rem/1 inherit; cursor: pointer; }
      .bewerk__paneel button[aria-pressed="true"] { background: #633c2f; border-color: #633c2f; color: #fbf3ea; }
      .bewerk__uit { opacity: .45; }
      [data-veld][contenteditable="true"] { outline: 1px dashed rgba(233,197,127,.8); outline-offset: 3px; border-radius: 2px; }
      [data-veld][contenteditable="true"]:focus { outline: 2px solid #e9c57f; }
      [data-sectie][data-uit] { display: none; }
      @media print { .bewerk, .bewerk__paneel { display: none; } }
    `;
    document.head.append(stijl);

    const zeg = kies('.bewerk__zeg', balk);
    const opslaanKnop = kies('[data-opslaan]', balk);
    let gewijzigd = false;
    const wijzig = () => { gewijzigd = true; opslaanKnop.hidden = false; zeg.textContent = 'Niet opgeslagen'; };

    // tekst bewerken
    const aanKnop = kies('[data-aan]', balk);
    aanKnop.setAttribute('aria-pressed', 'false');
    aanKnop.addEventListener('click', () => {
      const aan = aanKnop.getAttribute('aria-pressed') !== 'true';
      aanKnop.setAttribute('aria-pressed', String(aan));
      alles('[data-veld]').forEach((el) => {
        if (aan) el.setAttribute('contenteditable', 'plaintext-only');
        else el.removeAttribute('contenteditable');
      });
      zeg.textContent = aan ? 'Klik in een tekst en typ.' : '';
    });
    document.addEventListener('input', (e) => { if (e.target.closest('[data-veld]')) wijzig(); });

    // secties: groter, kleiner, uit, en de volgorde
    function bouwPaneel() {
      paneel.innerHTML = '';
      const lijst = ['hero'].concat(staat.volgorde);
      lijst.forEach((id, n) => {
        const i = n - 1;
        const el = kies('[data-sectie="' + id + '"]');
        const s = staat.secties[id] || (staat.secties[id] = { aan: true, schaal: 1 });
        const rij = document.createElement('div');
        rij.className = 'bewerk__rij' + (s.aan === false ? ' bewerk__uit' : '');
        rij.innerHTML = '<span>' + (namen[id] || id) + '<br><small>' + Math.round((s.schaal || 1) * 100) + '%</small></span>' +
          '<span class="bewerk__knoppen">' +
          '<button type="button" data-doe="klein" title="Kleiner">−</button>' +
          '<button type="button" data-doe="groot" title="Groter">+</button>' +
          '<button type="button" data-doe="zicht" aria-pressed="' + (s.aan === false) + '" title="Verberg">○</button>' +
          '<button type="button" data-doe="op" title="Naar boven"' + (i === 0 ? ' disabled' : '') + '>↑</button>' +
          '<button type="button" data-doe="neer" title="Naar beneden"' + (i === staat.volgorde.length - 1 ? ' disabled' : '') + '>↓</button>' +
          '</span>';
        rij.addEventListener('click', (e) => {
          const b = e.target.closest('button');
          if (!b) return;
          const doe = b.dataset.doe;
          if (doe === 'klein' || doe === 'groot') {
            s.schaal = Math.min(1.8, Math.max(0.7, Math.round(((s.schaal || 1) + (doe === 'groot' ? 0.1 : -0.1)) * 10) / 10));
            if (el) el.style.setProperty('--schaal', s.schaal);
          } else if (doe === 'zicht') {
            s.aan = s.aan === false;
            if (el) { if (s.aan) el.removeAttribute('data-uit'); else el.setAttribute('data-uit', ''); }
          } else {
            const j = doe === 'op' ? i - 1 : i + 1;
            staat.volgorde.splice(j, 0, staat.volgorde.splice(i, 1)[0]);
            const ander = kies('[data-sectie="' + staat.volgorde[i] + '"]');
            if (el && ander) doe === 'op' ? ander.before(el) : ander.after(el);
          }
          wijzig();
          bouwPaneel();
        });
        paneel.append(rij);
      });
    }
    const sectieKnop = kies('[data-secties]', balk);
    sectieKnop.setAttribute('aria-pressed', 'false');
    sectieKnop.addEventListener('click', () => {
      const aan = paneel.hidden;
      paneel.hidden = !aan;
      sectieKnop.setAttribute('aria-pressed', String(aan));
      if (aan) bouwPaneel();
    });

    // opslaan
    if (!stuk) {
      opslaanKnop.remove();
      zeg.textContent = 'Opslaan kan hier niet; wijzigingen blijven tot je de pagina verlaat.';
      return;
    }
    opslaanKnop.addEventListener('click', async () => {
      opslaanKnop.disabled = true;
      zeg.textContent = 'Bezig met opslaan…';
      oogst();
      try {
        await stuk.publish(volledigDocument());
        gewijzigd = false;
        zeg.textContent = 'Opgeslagen.';
      } catch (err) {
        opslaanKnop.disabled = false;
        zeg.textContent = (err && err.code === 'conflict')
          ? 'Iemand anders was je voor. De pagina wordt opnieuw geladen.'
          : 'Opslaan lukte niet. Probeer het nog eens.';
      }
    });
    addEventListener('beforeunload', (e) => { if (gewijzigd) { e.preventDefault(); e.returnValue = ''; } });
  })();
})();
