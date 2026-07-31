/* ============================================================
   Cheeks & Co. Media — motion layer
   GSAP (ScrollTrigger) + Lenis smooth scroll
   Movement is a wink, not a shout: short distances, soft easing.
   ============================================================ */

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const EASE = 'power3.out';

/* ------------------------------------------------------------
   Smooth scroll — Lenis drives, ScrollTrigger follows
   ------------------------------------------------------------ */
let lenis = null;

function initSmoothScroll() {
  if (prefersReducedMotion) return;

  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.6,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ------------------------------------------------------------
   Anchor links — route through Lenis so easing stays consistent
   ------------------------------------------------------------ */
function initAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      closeMenu();

      if (lenis) {
        lenis.scrollTo(target, { offset: -72, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    });
  });
}

/* ------------------------------------------------------------
   Nav — charcoal bar on scroll, hides on scroll-down
   ------------------------------------------------------------ */
const nav = document.querySelector('[data-nav]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');

function closeMenu() {
  if (!mobileMenu || !menuToggle) return;
  mobileMenu.removeAttribute('data-open');
  mobileMenu.hidden = true;
  menuToggle.setAttribute('aria-expanded', 'false');
  nav?.classList.remove('is-menu-open');
}

/* ------------------------------------------------------------
   Mega menu
   Opens on hover (with a close delay so a diagonal mouse path to
   the panel doesn't dismiss it) and on click/keyboard. Closes on
   Escape, outside click, focus leaving, or scroll.
   ------------------------------------------------------------ */
function initMega() {
  const wrap = document.querySelector('[data-mega]');
  const toggle = document.querySelector('[data-mega-toggle]');
  const panel = document.querySelector('[data-mega-panel]');
  const scrim = document.querySelector('[data-mega-scrim]');
  if (!wrap || !toggle || !panel) return;

  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  let closeTimer = null;
  let open = false;

  function show() {
    clearTimeout(closeTimer);
    if (open) return;
    open = true;
    panel.hidden = false;
    if (scrim) scrim.hidden = false;
    // Next frame so the transition has a start value to animate from.
    requestAnimationFrame(() => {
      panel.setAttribute('data-open', '');
      scrim?.setAttribute('data-open', '');
    });
    toggle.setAttribute('aria-expanded', 'true');
  }

  function hide() {
    clearTimeout(closeTimer);
    if (!open) return;
    open = false;
    panel.removeAttribute('data-open');
    scrim?.removeAttribute('data-open');
    toggle.setAttribute('aria-expanded', 'false');
    // Keep it in the tree until the fade finishes, then take it out of
    // the tab order.
    closeTimer = setTimeout(() => {
      if (open) return;
      panel.hidden = true;
      if (scrim) scrim.hidden = true;
    }, 320);
  }

  const scheduleHide = () => {
    clearTimeout(closeTimer);
    closeTimer = setTimeout(hide, 180);
  };

  toggle.addEventListener('click', () => (open ? hide() : show()));

  if (canHover) {
    wrap.addEventListener('mouseenter', show);
    wrap.addEventListener('mouseleave', scheduleHide);
    scrim?.addEventListener('mouseenter', hide);
  }

  // Keyboard: opening on focus would trap tabbing past Services, so only
  // close when focus genuinely leaves the group.
  wrap.addEventListener('focusout', (e) => {
    if (!wrap.contains(e.relatedTarget)) hide();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open) {
      hide();
      toggle.focus();
    }
  });

  document.addEventListener('click', (e) => {
    if (open && !wrap.contains(e.target)) hide();
  });

  scrim?.addEventListener('click', hide);
  window.addEventListener('scroll', () => open && hide(), { passive: true });
}

function initNav() {
  if (!nav) return;

  let lastY = window.scrollY;

  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('is-stuck', y > 40);

    const menuOpen = mobileMenu?.hasAttribute('data-open');
    const goingDown = y > lastY && y > 300;
    nav.classList.toggle('is-hidden', goingDown && !menuOpen);

    lastY = y;
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  menuToggle?.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') === 'true';
    if (open) {
      closeMenu();
    } else {
      mobileMenu.hidden = false;
      mobileMenu.setAttribute('data-open', '');
      menuToggle.setAttribute('aria-expanded', 'true');
      nav.classList.add('is-menu-open');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

/* ------------------------------------------------------------
   Line splitter — wraps each visual line for a masked reveal.
   Hand-rolled so it survives font swap and resize.
   ------------------------------------------------------------ */
function splitIntoLines(el) {
  const text = el.dataset.originalText || el.textContent.trim();
  el.dataset.originalText = text;

  const words = text.split(/\s+/);
  el.textContent = '';

  const spans = words.map((word, i) => {
    const span = document.createElement('span');
    span.className = 'split-word';
    span.style.display = 'inline-block';
    span.textContent = word;
    el.appendChild(span);
    if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
    return span;
  });

  // Group words by their rendered vertical offset.
  const lines = [];
  let currentTop = null;
  spans.forEach((span) => {
    const top = Math.round(span.offsetTop);
    if (top !== currentTop) {
      lines.push([]);
      currentTop = top;
    }
    lines[lines.length - 1].push(span.textContent);
  });

  el.textContent = '';
  const inners = lines.map((words) => {
    const line = document.createElement('span');
    line.className = 'split-line';
    const inner = document.createElement('span');
    inner.textContent = words.join(' ');
    line.appendChild(inner);
    el.appendChild(line);
    return inner;
  });

  el.classList.add('is-split');
  return inners;
}

/* Put the heading back to plain text once it has animated in, so a
   resize re-wraps naturally instead of being clipped by the line masks. */
function unsplit(el) {
  if (!el?.dataset.originalText) return;
  el.textContent = el.dataset.originalText;
  el.classList.remove('is-split');
  gsap.set(el, { opacity: 1 });
}

/* ------------------------------------------------------------
   Hero
   ------------------------------------------------------------ */
function initHero() {
  const title = document.querySelector('[data-split]');
  const items = gsap.utils.toArray('[data-hero-item]');

  if (prefersReducedMotion) {
    gsap.set([title, ...items], { opacity: 1, clearProps: 'transform' });
    return;
  }

  const tl = gsap.timeline({ defaults: { ease: EASE } });

  if (title) {
    const lines = splitIntoLines(title);
    tl.fromTo(
      lines,
      { yPercent: 115 },
      { yPercent: 0, duration: 1.05, stagger: 0.09, onComplete: () => unsplit(title) },
      0.15
    );
  }

  tl.fromTo(
    items,
    { opacity: 0, y: 22 },
    { opacity: 1, y: 0, duration: 0.85, stagger: 0.1 },
    0.45
  );

  // Watermark drifts as you scroll past the hero.
  const watermark = document.querySelector('[data-watermark]');
  if (watermark) {
    gsap.fromTo(
      watermark,
      { yPercent: 0, rotate: 0 },
      {
        yPercent: -16,
        rotate: -7,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      }
    );
  }
}

/* ------------------------------------------------------------
   Scroll reveals
   ------------------------------------------------------------ */
function initReveals() {
  if (prefersReducedMotion) return;

  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: EASE,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      }
    );
  });

  gsap.utils.toArray('[data-reveal-stagger]').forEach((group) => {
    gsap.fromTo(
      group.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: EASE,
        stagger: 0.08,
        scrollTrigger: { trigger: group, start: 'top 85%', once: true },
      }
    );
  });
}

/* ------------------------------------------------------------
   Marquee — duplicate the group until it covers 2x viewport,
   then translate by exactly one group width for a seamless loop.
   ------------------------------------------------------------ */
function initMarquee() {
  const track = document.querySelector('[data-marquee]');
  if (!track) return;

  const original = track.firstElementChild;
  if (!original) return;

  const groupWidth = original.scrollWidth;
  if (!groupWidth) return;

  const needed = Math.ceil((window.innerWidth * 2) / groupWidth) + 1;
  for (let i = 1; i < needed; i++) {
    const clone = original.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  }

  if (prefersReducedMotion) return;

  gsap.to(track, {
    x: -groupWidth,
    duration: groupWidth / 70, // ~70px per second
    ease: 'none',
    repeat: -1,
  });
}

/* ------------------------------------------------------------
   Services carousel
   Native scroll-snap does the moving; JS adds buttons, a progress
   bar and pointer dragging. Keeps keyboard + touch behaviour free.
   ------------------------------------------------------------ */
function initCarousel() {
  const root = document.querySelector('[data-carousel]');
  if (!root) return;

  const viewport = root.querySelector('[data-carousel-viewport]');
  const track = root.querySelector('[data-carousel-track]');
  const prev = root.querySelector('[data-carousel-prev]');
  const next = root.querySelector('[data-carousel-next]');
  const bar = root.querySelector('[data-carousel-bar]');
  if (!viewport || !track) return;

  const maxScroll = () => Math.max(0, viewport.scrollWidth - viewport.clientWidth);

  // One card plus the flex gap.
  function step() {
    const card = track.firstElementChild;
    if (!card) return viewport.clientWidth;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return card.getBoundingClientRect().width + gap;
  }

  function sync() {
    const max = maxScroll();
    const progress = max > 0 ? viewport.scrollLeft / max : 0;
    if (bar) bar.style.width = `${Math.min(100, Math.max(6, progress * 100))}%`;
    if (prev) prev.disabled = viewport.scrollLeft <= 2;
    if (next) next.disabled = viewport.scrollLeft >= max - 2;
  }

  prev?.addEventListener('click', () => viewport.scrollBy({ left: -step(), behavior: 'smooth' }));
  next?.addEventListener('click', () => viewport.scrollBy({ left: step(), behavior: 'smooth' }));

  viewport.addEventListener('scroll', sync, { passive: true });
  window.addEventListener('resize', sync);

  /* ---- Pointer drag ---- */
  let dragging = false;
  let startX = 0;
  let startScroll = 0;
  let moved = 0;

  viewport.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'touch') return; // native touch scrolling is better
    dragging = true;
    moved = 0;
    startX = e.clientX;
    startScroll = viewport.scrollLeft;
    viewport.classList.add('is-dragging');
    viewport.setPointerCapture(e.pointerId);
  });

  viewport.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    moved = Math.abs(dx);
    viewport.scrollLeft = startScroll - dx;
  });

  function endDrag(e) {
    if (!dragging) return;
    dragging = false;
    viewport.classList.remove('is-dragging');
    if (e.pointerId != null && viewport.hasPointerCapture?.(e.pointerId)) {
      viewport.releasePointerCapture(e.pointerId);
    }
    // Re-enable links on the next frame so the click that ends a drag is swallowed.
    if (moved > 6) {
      const swallow = (evt) => evt.preventDefault();
      viewport.addEventListener('click', swallow, { capture: true, once: true });
      requestAnimationFrame(() =>
        viewport.removeEventListener('click', swallow, { capture: true })
      );
    }
  }

  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);

  /* ---- Keyboard ---- */
  viewport.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      viewport.scrollBy({ left: step(), behavior: 'smooth' });
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      viewport.scrollBy({ left: -step(), behavior: 'smooth' });
    }
  });

  // A card reached by Tab should be scrolled fully into view.
  track.querySelectorAll('a, button').forEach((el) => {
    el.addEventListener('focus', () => {
      el.closest('.service')?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    });
  });

  sync();
}

/* ------------------------------------------------------------
   Service detail template
   One page, driven by ?s=<slug>. Keeps a single template to
   maintain rather than seven near-identical files; swap this for
   real routes or a CMS when the content grows its own life.
   ------------------------------------------------------------ */
const SERVICES = {
  'marketing-strategy': {
    title: 'Marketing Strategy',
    tag: 'Marketing your business starts with a strong plan.',
    icon: '/icons/marketing-strategy.webp',
    body: [
      `Smart, data-led marketing strategies that drive real business outcomes. We start by
       understanding your business properly — not just the brief, but the commercial reality
       behind it.`,
      `From there we build a plan that's considered, purposeful and tailored to you. Free from
       external pressures and agendas, our recommendations are always in your best interest:
       designed to deliver real impact and measurable results, not just activity.`,
    ],
    list: ['Market research', 'Audience profiling', 'Brand positioning', 'Campaign strategy'],
  },
  'digital-advertising': {
    title: 'Digital Advertising',
    tag: 'Google & Meta advertising.',
    icon: '/icons/digital-advertising.webp',
    body: [
      `We specialise in performance-driven digital campaigns powered by Zib Digital. Every
       campaign is built around what you actually need it to do — leads, bookings, sales — not
       vanity metrics.`,
      `Our production team prides itself on driving results with a transparent dashboard, so you
       can see exactly where the money went and what it returned.`,
    ],
    list: ['Google Ads', 'Meta advertising', 'Transparent reporting', 'Ongoing optimisation'],
  },
  'media-buying': {
    title: 'Traditional Media Buying',
    tag: 'Radio, print, TV & outdoor.',
    icon: '/icons/media-buying.webp',
    body: [
      `Strategic planning and negotiation across traditional channels. Deep industry
       relationships mean we can plan and negotiate with confidence — and pass that value
       straight through to you.`,
      `We manage metro and regional radio, television, print and outdoor placements to maximise
       your branding reach.`,
    ],
    list: ['Metro & regional radio', 'Television', 'Print', 'Outdoor placement'],
  },
  'website-development': {
    title: 'Website Development',
    tag: 'Website design, development and SEO.',
    icon: '/icons/website-development.webp',
    body: [
      `We work with a partnering company to build conversion-focused websites — sites built to
       do a job, not just to look good in a portfolio.`,
      `That covers planning, design and ongoing SEO performance, so the site keeps earning its
       keep long after launch.`,
    ],
    list: ['Website design', 'Development', 'On-page SEO', 'Ongoing performance'],
  },
  'graphic-design': {
    title: 'Graphic Design',
    tag: 'Bringing your thoughts to life.',
    icon: '/icons/graphic-design.webp',
    body: [
      `Strategic creative including branding, campaign assets, ad creative, video production,
       photography, and print and digital design.`,
      `Creative that's tied to the strategy behind it — so every asset is working towards the
       same outcome rather than just looking the part.`,
    ],
    list: ['Branding', 'Campaign & ad creative', 'Video & photography', 'Print & digital design'],
  },
  'organic-social': {
    title: 'Organic Social Media',
    tag: 'Facebook, Instagram, LinkedIn & more.',
    icon: '/icons/organic-social.webp',
    body: [
      `Consistent content planning, scheduling, community engagement, caption writing and growth
       strategy — the unglamorous consistency that actually builds an audience.`,
      `Backed by detailed monthly reporting, so you can see what's landing and what isn't.`,
    ],
    list: ['Content planning', 'Community engagement', 'Growth strategy', 'Monthly reporting'],
  },
  'partnership-management': {
    title: 'Partnership Management',
    tag: 'Our network is wide.',
    icon: '/icons/marketing-strategy.webp',
    body: [
      `Brand partnerships, sponsorship negotiation and influencer collaborations that put your
       brand where its audience already is.`,
      `Plus full event planning and execution to elevate brand exposure — handled end to end.`,
    ],
    list: ['Brand partnerships', 'Sponsorship negotiation', 'Influencer collaboration', 'Event planning'],
  },
};

function initServicePage() {
  const titleEl = document.querySelector('[data-service-title]');
  if (!titleEl) return;

  const slug = new URLSearchParams(window.location.search).get('s');
  const service = SERVICES[slug];
  if (!service) return; // template ships with Marketing Strategy as the default

  const set = (sel, fn) => {
    const el = document.querySelector(sel);
    if (el) fn(el);
  };

  document.title = `${service.title} — Services | Cheeks & Co. Media`;
  titleEl.textContent = service.title;
  titleEl.dataset.originalText = service.title;

  set('[data-service-crumb]', (el) => (el.textContent = service.title));
  set('[data-service-tag]', (el) => (el.textContent = service.tag));
  set('[data-service-icon]', (el) => (el.src = service.icon));
  set('[data-service-body]', (el) => {
    el.replaceChildren(
      ...service.body.map((text) => {
        const p = document.createElement('p');
        p.textContent = text.replace(/\s+/g, ' ').trim();
        return p;
      })
    );
  });
  set('[data-service-list]', (el) => {
    el.replaceChildren(
      ...service.list.map((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        return li;
      })
    );
  });
}

/* ------------------------------------------------------------
   Boot
   ------------------------------------------------------------ */
function init() {
  // Tells the inline safety net in <head> that motion is handled.
  document.documentElement.setAttribute('data-motion-ready', '');

  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  initSmoothScroll();
  initNav();
  initMega();
  initAnchors();
  initServicePage(); // before initHero — the split runs on final text
  initHero();
  initReveals();
  initMarquee();
  initCarousel();

  ScrollTrigger.refresh();
}

// Wait for webfonts so line-splitting measures the real typeface.
if (document.fonts?.ready) {
  document.fonts.ready.then(init);
} else {
  window.addEventListener('load', init);
}

window.addEventListener('resize', () => ScrollTrigger.refresh());
