// Holi Her — alles wat de pagina's aan gedrag nodig hebben: het menu, de band
// met de lopende tekst, en het formulier.

// --- het menu, voor smalle schermen -----------------------------------------
(() => {
  const panel = document.getElementById('menu');
  const open = document.querySelector('[data-menu-open]');
  const close = document.querySelector('[data-menu-close]');
  if (!panel || !open) return;
  let last = null;

  const show = (on) => {
    panel.hidden = !on;
    open.setAttribute('aria-expanded', String(on));
    document.body.style.overflow = on ? 'hidden' : '';
    if (on) { last = document.activeElement; panel.querySelector('a').focus({ preventScroll: true }); }
    else if (last) last.focus({ preventScroll: true });
  };

  open.addEventListener('click', () => show(true));
  close.addEventListener('click', () => show(false));
  panel.addEventListener('click', (e) => { if (e.target.tagName === 'A') show(false); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden) show(false); });
  // keep the panel shut when the screen grows back to a width that shows the nav
  matchMedia('(min-width: 64rem)').addEventListener('change', (e) => { if (e.matches && !panel.hidden) show(false); });
})();

// --- de lopende band --------------------------------------------------------
// Staat stil tot het script draait, stopt buiten beeld en bij minder beweging,
// pauzeert bij hover en focus, en heeft een zichtbare pauzeknop.
(() => {
  const strip = document.querySelector('[data-strip]');
  if (!strip) return;
  const btn = strip.querySelector('[data-strip-toggle]');
  const s = { seen: false, hover: false, focus: false, held: matchMedia('(prefers-reduced-motion: reduce)').matches };
  const sync = () => {
    const run = s.seen && !s.hover && !s.focus && !s.held;
    strip.classList.toggle('is-held', !run);
    btn.textContent = s.held ? 'Afspelen' : 'Pauzeer';
  };
  btn.addEventListener('click', () => { s.held = !s.held; sync(); });
  [['pointerenter', 'hover', true], ['pointerleave', 'hover', false], ['focusin', 'focus', true], ['focusout', 'focus', false]]
    .forEach(([ev, key, val]) => strip.addEventListener(ev, () => { s[key] = val; sync(); }));
  new IntersectionObserver(([e]) => { s.seen = e.isIntersecting; sync(); }).observe(strip);
  sync();
})();

// --- het formulier ----------------------------------------------------------
// Zolang data-endpoint leeg is wordt er niets verstuurd, en dat zegt het ook.
document.querySelectorAll('form[data-endpoint]').forEach((form) => {
  const help = form.querySelector('[aria-live]');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.querySelectorAll('[aria-invalid]').forEach((f) => f.removeAttribute('aria-invalid'));
    const bad = [...form.querySelectorAll('input[required]')].find((f) => !f.checkValidity());
    if (bad) {
      bad.setAttribute('aria-invalid', 'true');
      bad.setAttribute('aria-describedby', help.id);
      help.textContent = bad.type === 'email'
        ? 'Dat adres lijkt niet compleet. Schrijf het als naam@voorbeeld.nl.'
        : 'Vul je naam even in, dan weet ik wie je bent.';
      bad.focus();
      return;
    }
    if (!form.dataset.endpoint) {
      help.textContent = 'Er is niets verstuurd: dit formulier is nog niet aangesloten.';
      return;
    }
    fetch(form.dataset.endpoint, { method: 'POST', body: new FormData(form) })
      .then((r) => { help.textContent = r.ok ? 'Dank je. Ik schrijf je terug per e-mail.' : 'Dat ging niet goed. Probeer het over een minuut nog eens.'; })
      .catch(() => { help.textContent = 'Dat ging niet goed. Probeer het over een minuut nog eens.'; });
  });
});

// --- de foto's die nog komen ------------------------------------------------
// hallmarkSlots({ cupping: 'foto.jpg' }) zet jouw eigen foto in een plek.
window.hallmarkSlots = (m) => {
  for (const [k, v] of Object.entries(m)) {
    const slot = document.querySelector(`[data-slot="${k}"]`);
    if (!slot) continue;
    const img = new Image();
    img.src = typeof v === 'string' ? v : v.src;
    img.alt = (typeof v === 'object' && v.alt) || slot.dataset.alt || '';
    slot.querySelectorAll(':scope > img').forEach((o) => o.remove());
    slot.prepend(img);
  }
};
document.querySelectorAll('[data-slot] img').forEach((i) => {
  if (i.complete && !i.naturalWidth) i.remove();
  else i.addEventListener('error', () => i.remove(), { once: true });
});
