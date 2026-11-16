// Holi Her — versie D.

// --- menu ---------------------------------------------------------------
(() => {
  const paneel = document.getElementById('menu');
  const open = document.querySelector('[data-menu-open]');
  const dicht = document.querySelector('[data-menu-close]');
  if (!paneel || !open) return;
  let vorige = null;
  const toon = (aan) => {
    paneel.hidden = !aan;
    open.setAttribute('aria-expanded', String(aan));
    document.body.style.overflow = aan ? 'hidden' : '';
    if (aan) { vorige = document.activeElement; paneel.querySelector('a').focus({ preventScroll: true }); }
    else if (vorige) vorige.focus({ preventScroll: true });
  };
  open.addEventListener('click', () => toon(true));
  dicht.addEventListener('click', () => toon(false));
  paneel.addEventListener('click', (e) => { if (e.target.tagName === 'A') toon(false); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !paneel.hidden) toon(false); });
})();

// --- de lopende band ----------------------------------------------------
(() => {
  const band = document.querySelector('[data-band]');
  if (!band) return;
  const knop = band.querySelector('[data-band-toggle]');
  const s = { zicht: false, hover: false, focus: false, vast: matchMedia('(prefers-reduced-motion: reduce)').matches };
  const sync = () => {
    const loopt = s.zicht && !s.hover && !s.focus && !s.vast;
    band.classList.toggle('is-stil', !loopt);
    knop.textContent = s.vast ? 'Afspelen' : 'Pauzeer';
  };
  knop.addEventListener('click', () => { s.vast = !s.vast; sync(); });
  [['pointerenter', 'hover', true], ['pointerleave', 'hover', false], ['focusin', 'focus', true], ['focusout', 'focus', false]]
    .forEach(([ev, k, v]) => band.addEventListener(ev, () => { s[k] = v; sync(); }));
  new IntersectionObserver(([e]) => { s.zicht = e.isIntersecting; sync(); }).observe(band);
  sync();
})();

// --- de punten op de foto ----------------------------------------------
// Hoveren, klikken of tabben wisselt de kaart. De kaart blijft staan waar hij
// staat; alleen de inhoud wisselt. Zonder script staan alle vijf onder elkaar.
(() => {
  const strook = document.querySelector('.punten__tabs');
  if (!strook) return;
  const tabs = [...strook.querySelectorAll('[role="tab"]')];
  const toon = (tab, focus) => {
    tabs.forEach((t) => {
      const aan = t === tab;
      t.setAttribute('aria-selected', String(aan));
      t.tabIndex = aan ? 0 : -1;
      const paneel = document.getElementById(t.getAttribute('aria-controls'));
      if (paneel) paneel.hidden = !aan;
    });
    if (focus) tab.focus({ preventScroll: true });
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener('pointerenter', () => toon(tab, false));
    tab.addEventListener('click', () => toon(tab, false));
    tab.addEventListener('focus', () => toon(tab, false));
    tab.addEventListener('keydown', (e) => {
      const stap = ['ArrowRight', 'ArrowDown'].includes(e.key) ? 1 : ['ArrowLeft', 'ArrowUp'].includes(e.key) ? -1 : 0;
      if (!stap) return;
      e.preventDefault();
      toon(tabs[(i + stap + tabs.length) % tabs.length], true);
    });
  });
})();

// --- het formulier ------------------------------------------------------
document.querySelectorAll('form[data-endpoint]').forEach((form) => {
  const hulp = form.querySelector('[aria-live]');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.querySelectorAll('[aria-invalid]').forEach((f) => f.removeAttribute('aria-invalid'));
    const fout = [...form.querySelectorAll('input[required]')].find((f) => !f.checkValidity());
    if (fout) {
      fout.setAttribute('aria-invalid', 'true');
      fout.setAttribute('aria-describedby', hulp.id);
      hulp.textContent = fout.type === 'email'
        ? 'Dat adres lijkt niet compleet. Schrijf het als naam@voorbeeld.nl.'
        : 'Vul je naam even in, dan weet ik wie je bent.';
      fout.focus();
      return;
    }
    if (!form.dataset.endpoint) { hulp.textContent = 'Er is niets verstuurd: dit formulier is nog niet aangesloten.'; return; }
    fetch(form.dataset.endpoint, { method: 'POST', body: new FormData(form) })
      .then((r) => { hulp.textContent = r.ok ? 'Dank je. Ik schrijf je terug per e-mail.' : 'Dat ging niet goed. Probeer het over een minuut nog eens.'; })
      .catch(() => { hulp.textContent = 'Dat ging niet goed. Probeer het over een minuut nog eens.'; });
  });
});

// --- foto's die nog komen ----------------------------------------------
window.hallmarkSlots = (m) => {
  for (const [k, v] of Object.entries(m)) {
    const plek = document.querySelector(`[data-slot="${k}"]`);
    if (!plek) continue;
    const img = new Image();
    img.src = typeof v === 'string' ? v : v.src;
    img.alt = (typeof v === 'object' && v.alt) || plek.dataset.alt || '';
    plek.querySelectorAll(':scope > img').forEach((o) => o.remove());
    plek.prepend(img);
  }
};
document.querySelectorAll('[data-slot] img').forEach((i) => {
  if (i.complete && !i.naturalWidth) i.remove();
  else i.addEventListener('error', () => i.remove(), { once: true });
});
