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

// --- de draad ---------------------------------------------------------
// Markeert in de rand welk hoofdstuk je leest. Eén waarnemer, geen scroll-lus.
(() => {
  const links = [...document.querySelectorAll('.thread a')];
  const chapters = [...document.querySelectorAll('.chapters > [id]')];
  if (!links.length || !chapters.length) return;
  const mark = (id) => links.forEach((a) => {
    if (a.getAttribute('href') === '#' + id) a.setAttribute('aria-current', 'true');
    else a.removeAttribute('aria-current');
  });
  const io = new IntersectionObserver((entries) => {
    const seen = entries.filter((e) => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (seen) mark(seen.target.id);
  }, { threshold: [0.3, 0.6] });
  chapters.forEach((c) => io.observe(c));
  mark(chapters[0].id);
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
