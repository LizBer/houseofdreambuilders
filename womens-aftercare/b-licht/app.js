// Holi Her — Zeven lagen.

// --- menu --------------------------------------------------------------
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
  matchMedia('(min-width: 64rem)').addEventListener('change', (e) => { if (e.matches && !panel.hidden) show(false); });
})();

// --- de cijfers --------------------------------------------------------
// Hoveren zoomt in op die klacht, klikken houdt hem vast, pijltjes lopen ze langs.
// Zonder script staan ze alle vijf onder elkaar.
(() => {
  const strip = document.querySelector('.klachten__tabs');
  if (!strip) return;
  const tabs = [...strip.querySelectorAll('[role="tab"]')];
  const show = (tab, focus) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      if (panel) panel.hidden = !on;
    });
    if (focus) tab.focus({ preventScroll: true });
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener('pointerenter', () => show(tab, false));
    tab.addEventListener('click', () => show(tab, false));
    tab.addEventListener('focus', () => show(tab, false));
    tab.addEventListener('keydown', (e) => {
      const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!step) return;
      e.preventDefault();
      show(tabs[(i + step + tabs.length) % tabs.length], true);
    });
  });
})();

// --- formulier ---------------------------------------------------------
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
    if (!form.dataset.endpoint) { help.textContent = 'Er is niets verstuurd: dit formulier is nog niet aangesloten.'; return; }
    fetch(form.dataset.endpoint, { method: 'POST', body: new FormData(form) })
      .then((r) => { help.textContent = r.ok ? 'Dank je. Ik schrijf je terug per e-mail.' : 'Dat ging niet goed. Probeer het over een minuut nog eens.'; })
      .catch(() => { help.textContent = 'Dat ging niet goed. Probeer het over een minuut nog eens.'; });
  });
});

// --- foto's die nog komen ----------------------------------------------
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
