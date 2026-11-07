// The cut: the Reels Starters Room's signature. The headline is "recorded" with stumbles in it,
// then edited live: an orange cut line strikes each stumble and the words close the gap (Flip).
// The clean headline is the real text; stumbles are CSS generated content (aria-hidden), motion only.
// Then the video opens from a vertical phone clip into the full 16:9 player.
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ease, onPage, prefersReducedMotion } from '../engine';

gsap.registerPlugin(Flip, SplitText, ScrollTrigger);

export function startCut() {
  onPage(({ intro }) => {
    const h = document.querySelector<HTMLElement>('[data-cut]');
    const vsl = document.querySelector<HTMLElement>('[data-vsl]');
    if (!h || prefersReducedMotion()) { if (h) h.style.visibility = 'visible'; return; }

    // 1. The stumbles are already in the layout (CSS content under .motion), so nothing shifts.
    h.style.visibility = 'visible';
    const startHeight = h.offsetHeight;

    const all = [...h.querySelectorAll<HTMLElement>('.cw, .cut')];
    const stumbles = [...h.querySelectorAll<HTMLElement>('.cut')];
    const tl = gsap.timeline();
    tl.from(all, { yPercent: 70, autoAlpha: 0, duration: 0.9, ease: ease.out, stagger: 0.045 }, 0);
    stumbles.forEach((c, i) => {
      tl.to(c.querySelector('.cut__line'), { scaleX: 1, duration: 0.35, ease: ease.soft }, 1.05 + i * 0.32);
    });
    tl.add(() => {
      const state = Flip.getState(all);
      stumbles.forEach((c) => (c.style.display = 'none'));
      h.style.minHeight = `${startHeight}px`; // keep the space: the player below never jumps
      Flip.from(state, { duration: 0.8, ease: ease.inOut, absolute: false, nested: true });
    }, 1.05 + stumbles.length * 0.32 + 0.15);

    // 2. The video: a vertical phone clip that opens into the player.
    if (vsl) {
      const frame = vsl.querySelector<HTMLElement>('.vsl__frame')!;
      const tag = vsl.querySelector<HTMLElement>('[data-vsl-tag]');
      const phone = () => {
        const r = frame.getBoundingClientRect();
        const side = Math.max(0, (r.width - r.height * 9 / 16) / 2);
        return `inset(0% ${side}px 0% ${side}px round 22px)`;
      };
      gsap.set(frame, { clipPath: phone(), autoAlpha: 0, y: 40 });
      tl.to(frame, { autoAlpha: 1, y: 0, duration: 0.9, ease: ease.out }, 0.35)
        .to(frame, { clipPath: 'inset(0% 0px 0% 0px round 0px)', duration: 1.2, ease: ease.inOut }, 1.9)
        .add(() => { if (tag) tag.textContent = 'finished · 06:12'; }, 2.5);
      // Idle: the play ring breathes while the player is on screen.
      const ring = vsl.querySelector('.vsl__ring');
      const pulse = gsap.fromTo(ring, { scale: 1, autoAlpha: 0.55 }, { scale: 1.6, autoAlpha: 0, duration: 1.8, ease: 'power2.out', repeat: -1, paused: true });
      ScrollTrigger.create({ trigger: vsl, onToggle: (s) => (s.isActive ? pulse.play() : pulse.pause()) });
    }
    tl.pause();
    intro.add(() => tl.play(), 0);
  });
}
