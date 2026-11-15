// The hero's light: water caustics drawn live on a small canvas and scaled up.
// It pauses off screen, on the pause button, and holds one still frame under
// reduced motion. Colours are read from the theme tokens.
(() => {
  const fig = document.querySelector('[data-loop]');
  if (!fig) return;
  const canvas = fig.querySelector('canvas');
  const btn = document.querySelector('[data-loop-toggle]');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const W = canvas.width, H = canvas.height;

  const rgbOf = (token) => {
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
    ctx.fillRect(0, 0, 1, 1);
    return ctx.getImageData(0, 0, 1, 1).data;
  };
  const shade = rgbOf('--color-shade'), deep = rgbOf('--color-shade-2'), light = rgbOf('--color-light');
  const img = ctx.createImageData(W, H);
  const TAU = Math.PI * 2;

  const draw = (time) => {
    const d = img.data;
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const px = ((x / W) * 3.4 * TAU) % TAU - 250, py = ((y / W) * 3.4 * TAU) % TAU - 250;
        let ix = px, iy = py, c = 1;
        for (let n = 0; n < 4; n++) {
          const t = time * (1 - 3.5 / (n + 1));
          const nx = px + Math.cos(t - ix) + Math.sin(t + iy);
          const ny = py + Math.sin(t - iy) + Math.cos(t + ix);
          ix = nx; iy = ny;
          const ax = px / (Math.sin(ix + t) / 0.005), ay = py / (Math.cos(iy + t) / 0.005);
          c += 1 / Math.sqrt(ax * ax + ay * ay);
        }
        c = 1.17 - Math.pow(c / 4, 1.4);
        const v = Math.min(1, Math.pow(Math.abs(c), 8));
        const g = y / H, o = (y * W + x) * 4;
        for (let k = 0; k < 3; k++) {
          const base = shade[k] + (deep[k] - shade[k]) * g * 0.35;
          d[o + k] = base + (light[k] - base) * v;
        }
        d[o + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
  };

  const s = { seen: false, held: matchMedia('(prefers-reduced-motion: reduce)').matches };
  let t = 4, last = 0, raf = 0;
  const tick = (now) => {
    raf = 0;
    if (!(s.seen && !s.held)) return;
    if (now - last > 50) { t += Math.min(now - last, 100) / 1000 * 0.32; last = now; draw(t); }
    raf = requestAnimationFrame(tick);
  };
  const sync = () => {
    const run = s.seen && !s.held;
    fig.classList.toggle('is-running', run);
    if (btn) btn.textContent = s.held ? 'Play the water' : 'Pause the water';
    if (run && !raf) { last = performance.now(); raf = requestAnimationFrame(tick); }
  };
  draw(t);
  if (btn) btn.addEventListener('click', () => { s.held = !s.held; sync(); });
  new IntersectionObserver(([e]) => { s.seen = e.isIntersecting; sync(); }).observe(fig);
})();
