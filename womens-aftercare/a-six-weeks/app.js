// One clock. Scroll position drives two things: the week shown in the rail, and --t,
// which warms the ground and the ink from the raw first days to the present.
(() => {
  const root = document.documentElement;
  const num = document.querySelector('[data-rail-num]');
  const word = document.querySelector('[data-rail-word]');
  const chapters = [...document.querySelectorAll('.ch')];
  const weeks = document.querySelector('.weeks');
  if (!num || !chapters.length) return;

  const still = matchMedia('(prefers-reduced-motion: reduce)');
  let queued = false;

  const frame = () => {
    queued = false;
    const box = weeks.getBoundingClientRect();
    const run = box.height - innerHeight;
    const t = run > 0 ? Math.min(1, Math.max(0, -box.top / run)) : (box.top < 0 ? 1 : 0);
    root.style.setProperty('--t', t.toFixed(3));

    // the chapter whose top has most recently passed the reading line
    const line = innerHeight * 0.35;
    let current = chapters[0];
    for (const ch of chapters) if (ch.getBoundingClientRect().top <= line) current = ch;
    if (num.textContent !== current.dataset.week) {
      num.textContent = current.dataset.week;
      word.textContent = current.dataset.word;
    }
  };

  const onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(frame); } };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll, { passive: true });
  frame();

  // Under reduced motion the page still warms, it just never animates between steps.
  if (still.matches) document.body.style.transition = 'none';
})();
