/* The small amount of JavaScript the page needs: the menu, the hotspots, and forms that are
   not connected yet. Everything else works without it. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var labels = {};
  try { labels = JSON.parse($('#labels').textContent); } catch (e) { /* defaults below */ }

  // menu
  var menu = $('#menu'), openBtn = $('[data-menu-open]');
  if (menu && openBtn) {
    var closeBtn = $('[data-menu-close]', menu);
    var set = function (on) {
      menu.hidden = !on;
      openBtn.setAttribute('aria-expanded', String(on));
      document.body.style.overflow = on ? 'hidden' : '';
      (on ? ($('a', menu) || closeBtn) : openBtn).focus();
    };
    openBtn.addEventListener('click', function () { set(true); });
    closeBtn.addEventListener('click', function () { set(false); });
    menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') set(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) set(false); });
  }

  // hotspots: hover, click, focus and arrow keys all show the matching card
  $$('.s-hotspots').forEach(function (root) {
    var tabs = $$('[role="tab"]', root);
    if (!tabs.length) return;
    var show = function (tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        var p = document.getElementById(t.getAttribute('aria-controls'));
        if (p) p.hidden = !on;
      });
      if (focus) tab.focus({ preventScroll: true });
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { show(t, false); });
      t.addEventListener('pointerenter', function () { if (window.matchMedia('(hover: hover)').matches) show(t, false); });
      t.addEventListener('focus', function () { show(t, false); });
      t.addEventListener('keydown', function (e) {
        var step = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
        if (!step) return;
        e.preventDefault();
        show(tabs[(i + step + tabs.length) % tabs.length], true);
      });
    });
    show(tabs.filter(function (t) { return t.getAttribute('aria-selected') === 'true'; })[0] || tabs[0], false);
  });

  // a form that is not connected says so plainly, and never pretends it sent something
  $$('form[data-unconnected]').forEach(function (form) {
    var help = $('[aria-live]', form);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var bad = $$('[required]', form).filter(function (f) { return !f.checkValidity(); })[0];
      if (bad) {
        bad.setAttribute('aria-invalid', 'true');
        help.textContent = bad.type === 'email' ? (labels.needEmail || '') : (labels.needName || '');
        bad.focus();
        return;
      }
      help.textContent = labels.notConnected || '';
    });
  });
})();
