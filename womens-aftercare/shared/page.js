// Shared behaviour for the three versions: the treatment switcher and the booking form.

// Switcher: tabs move with the arrow keys; without script every panel shows.
document.querySelectorAll('[data-switch]').forEach((root) => {
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  const show = (tab, focus) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) tab.focus({ preventScroll: true });
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => show(t, false));
    t.addEventListener('keydown', (e) => {
      const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!step) return;
      e.preventDefault();
      show(tabs[(i + step + tabs.length) % tabs.length], true);
    });
  });
  show(tabs.find((t) => t.getAttribute('aria-selected') === 'true') || tabs[0], false);
});

// Booking form: validates, then posts to data-endpoint. Until an endpoint is
// set it says plainly that nothing was sent, and never shows a success state.
document.querySelectorAll('form[data-endpoint]').forEach((form) => {
  const help = form.querySelector('[aria-live]');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const bad = [...form.querySelectorAll('input[required]')].find((f) => !f.checkValidity());
    form.querySelectorAll('[aria-invalid]').forEach((f) => f.removeAttribute('aria-invalid'));
    if (bad) {
      bad.setAttribute('aria-invalid', 'true');
      bad.setAttribute('aria-describedby', help.id);
      help.textContent = bad.type === 'email' ? 'That address looks incomplete. Write it as name@example.com.' : 'Please add your name so I know who to write to.';
      bad.focus();
      return;
    }
    if (!form.dataset.endpoint) { help.textContent = 'Nothing was sent: this form is not connected yet.'; return; }
    fetch(form.dataset.endpoint, { method: 'POST', body: new FormData(form) })
      .then((r) => { help.textContent = r.ok ? 'Thank you. I will write back to you by email.' : 'That did not go through. Try again in a minute.'; })
      .catch(() => { help.textContent = 'That did not go through. Try again in a minute.'; });
  });
});
