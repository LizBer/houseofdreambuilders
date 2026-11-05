// Tabs for the example system. Without this script both panels show in order.
document.querySelectorAll('[data-switch]').forEach((root) => {
  const groove = root.querySelector('[role="tablist"]');
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  const panels = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls')));

  function select(i, focus) {
    tabs.forEach((t, j) => {
      t.setAttribute('aria-selected', String(i === j));
      t.tabIndex = i === j ? 0 : -1;
      panels[j].hidden = i !== j;
    });
    groove.style.setProperty('--n', i);
    if (focus) tabs[i].focus();
  }

  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(i));
    t.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); select((i + 1) % tabs.length, true); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); select((i - 1 + tabs.length) % tabs.length, true); }
    });
  });
  select(0);
});

// The sign-up form posts nowhere yet: set data-endpoint on the form to connect it.
document.querySelectorAll('form[data-endpoint]').forEach((form) => {
  const input = form.querySelector('input');
  const help = form.querySelector('[aria-live]');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const ok = input.checkValidity();
    input.toggleAttribute('aria-invalid', !ok);
    if (!ok) {
      help.textContent = 'That address looks incomplete. Write it as name@example.com.';
      input.focus();
      return;
    }
    if (!form.dataset.endpoint) {
      help.textContent = 'Nothing was sent: this form is not connected yet.';
      return;
    }
    fetch(form.dataset.endpoint, { method: 'POST', body: new FormData(form) })
      .then((r) => { help.textContent = r.ok ? 'Thanks. We will write to ' + input.value.trim() + '.' : 'That did not go through. Try again in a minute.'; })
      .catch(() => { help.textContent = 'That did not go through. Try again in a minute.'; });
  });
});
