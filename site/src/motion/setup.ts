// Global motion: the margin (signature), the loader handoff, the page transition and the
// header. Runs once on the client, before the first page initializes.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ease, onPage, onScroll, prefersReducedMotion, setLoaderExit, setLoaderFormat, setTransition } from '../engine';

gsap.registerPlugin(ScrollTrigger);

/* ----------------------------------------------------------------- the margin driver
   One variable: how many columns the margin takes in the section being read. It moves the
   fixed field (transform only), the loader's exit and the page transition, so all three agree. */

const live = () => !prefersReducedMotion() && matchMedia('(min-width: 900px)').matches;
const syncLive = () => document.documentElement.classList.toggle('margin-live', live());
const field = () => document.querySelector<HTMLElement>('.margin__field');
const sections = () => [...document.querySelectorAll<HTMLElement>('main [data-margin]')];

let active: HTMLElement | null = null;
let fieldX = 0;

/** Where the margin rule sits for a section, in px from the left of the viewport. */
function ruleX(section: HTMLElement | null | undefined): number {
  const off = innerWidth + 4;
  if (!section || !live()) return off;
  const m = section.dataset.margin;
  if (m === 'full') return 0;
  const dream = section.querySelector<HTMLElement>('[data-dream]');
  if (m === '0' || !dream) return off;
  const gap = parseFloat(getComputedStyle(dream.parentElement!).columnGap) || 0;
  return Math.round(dream.getBoundingClientRect().left - gap / 2);
}

function goTo(section: HTMLElement, immediate = false) {
  active = section;
  const el = field();
  if (!el || !live()) return;
  fieldX = ruleX(section);
  if (immediate) gsap.set(el, { x: fieldX, overwrite: true });
  else gsap.to(el, { x: fieldX, duration: 1.1, ease: ease.inOut, overwrite: true });
}

function startMargin() {
  onPage(() => {
    const list = sections();
    if (!list.length) return;
    goTo(list[0], true);
    list.forEach((s, i) =>
      ScrollTrigger.create({
        trigger: s,
        start: i === 0 ? 'top top' : 'top 80%',
        end: 'bottom 80%',
        onToggle: (self) => self.isActive && active !== s && goTo(s),
      }),
    );
  });
  const onResize = () => { syncLive(); if (active) goTo(active, true); };
  addEventListener('resize', onResize, { passive: true });
  // Astro swaps <html> attributes on navigation: restore the flag before paint.
  document.addEventListener('astro:after-swap', syncLive);
}

/* ----------------------------------------------------------------- loader: the day counts to 21:12 */
const FROM = 6 * 60 + 10;
const TO = 21 * 60 + 12;
const clock = (p: number) => {
  const m = Math.round(FROM + ((TO - FROM) * p) / 100);
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
};

function loader() {
  // Scale the theatre: the loader plays on desktop only. Phones and reduced motion go straight to the page.
  if (!live()) document.getElementById('loader')?.remove();
  setLoaderFormat(clock);
  // The loader folds back into the margin: its left edge travels to the hero's rule.
  setLoaderExit((root) => {
    const x = ruleX(sections()[0]);
    const rule = root.querySelector<HTMLElement>('[data-loader-rule]');
    return gsap.timeline()
      .to(root.querySelectorAll('[data-loader-out]'), { yPercent: -120, duration: 0.35, ease: ease.inOut, stagger: 0.04 })
      .to(root, { clipPath: `inset(0% 0% 0% ${x}px)`, duration: 0.7, ease: ease.inOut }, '-=0.2')
      .to(rule, { x, duration: 0.7, ease: ease.inOut }, '<');
  });
}

/* ----------------------------------------------------------------- page transition
   The margin takes the whole page, then opens again where the next page's margin starts. */
let dest = '';
function transition() {
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest('a');
    dest = a?.textContent?.trim().replace(/\s+/g, ' ').toLowerCase() || '';
  }, true);
  setTransition({
    leave: (c) => {
      const panel = c.querySelector<HTMLElement>('.curtain__panel')!;
      const label = c.querySelector<HTMLElement>('[data-curtain-label]');
      if (label) label.textContent = dest ? `on to: ${dest}` : '';
      const from = live() && active ? fieldX : innerWidth + 4;
      return gsap.timeline()
        .set(c, { autoAlpha: 1 })
        .fromTo(panel, { x: from }, { x: 0, duration: 0.8, ease: ease.inOut });
    },
    enter: (c) => {
      const panel = c.querySelector<HTMLElement>('.curtain__panel')!;
      const to = ruleX(sections()[0]);
      return gsap.timeline()
        .to(panel, { x: to, duration: 0.9, ease: ease.inOut })
        .set(c, { autoAlpha: 0 });
    },
  });
}

/* ----------------------------------------------------------------- header: steps aside going down */
function header() {
  let last = 0;
  onScroll(({ y }) => {
    const h = document.documentElement.classList;
    h.toggle('is-scrolled', y > 24);
    if (Math.abs(y - last) < 4) return;
    h.toggle('frame-away', y > 240 && y > last);
    last = y;
  });
  document.addEventListener('astro:after-swap', () => {
    document.documentElement.classList.remove('is-scrolled', 'frame-away');
  });
}

/* ----------------------------------------------------------------- the pen caret (idle) */
function caret() {
  onPage(() => {
    const c = document.querySelector<HTMLElement>('[data-caret]');
    if (!c || prefersReducedMotion()) return;
    const tw = gsap.to(c, { autoAlpha: 0, duration: 0.55, repeat: -1, yoyo: true, ease: 'steps(1)', repeatDelay: 0.2 });
    ScrollTrigger.create({ trigger: c, onToggle: (s) => (s.isActive ? tw.play() : tw.pause()) });
  });
}

export function setupMotion() {
  syncLive();
  loader();
  transition();
  header();
  startMargin();
  caret();
}
