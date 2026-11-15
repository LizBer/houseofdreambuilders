// One clock drives the whole concept: the seam between each pair of sections is the same
// line, and it releases from straight to a loose curve the further down the page you are.
(() => {
  const seams = [...document.querySelectorAll('.seam')];
  if (!seams.length) return;
  const still = matchMedia('(prefers-reduced-motion: reduce)');

  // A seam's own place in the sequence sets how far it has already let go; where it sits in
  // the viewport adds the rest, so the line keeps easing while you read.
  const path = (slack) => {
    const w = 1200, mid = 40, a = 26 * slack;
    let d = `M0 ${mid}`;
    for (let x = 0; x <= w; x += 40) {
      const y = mid + Math.sin((x / w) * Math.PI * 2.4) * a * Math.sin((x / w) * Math.PI);
      d += ` L${x} ${y.toFixed(2)}`;
    }
    return d;
  };

  let queued = false;
  const frame = () => {
    queued = false;
    seams.forEach((seam, i) => {
      const base = i / Math.max(1, seams.length - 1);
      const box = seam.getBoundingClientRect();
      const seen = Math.min(1, Math.max(0, 1 - box.top / innerHeight));
      const slack = still.matches ? base : Math.min(1, base * 0.72 + seen * 0.4);
      seam.firstElementChild.setAttribute('d', path(slack));
    });
  };
  const onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(frame); } };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll, { passive: true });
  frame();
})();
