'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

const EASE = 'power3.out';

/**
 * The site's motion layer.
 *
 * Everything is set up inside a single gsap.context() keyed to the current
 * route, so a client-side navigation tears down every tween, ScrollTrigger
 * and listener from the previous page before the next one wires itself up.
 * Without that, triggers accumulate across navigations and start firing
 * against elements that no longer exist.
 */
export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.setAttribute('data-motion-ready', '');
      document.documentElement.classList.remove('js-anim');
      return;
    }

    let lenis;
    let raf;

    const ctx = gsap.context(() => {
      /* ---- Smooth scroll ---- */
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.6,
      });
      lenis.on('scroll', ScrollTrigger.update);
      raf = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      /* ---- Hero ---- */
      const title = document.querySelector('[data-split]');
      const heroItems = gsap.utils.toArray('[data-hero-item]');
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
      if (heroItems.length) {
        tl.fromTo(heroItems, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.85, stagger: 0.1 }, 0.45);
      }

      const watermark = document.querySelector('[data-watermark]');
      if (watermark) {
        const host = watermark.closest('.hero, .page-hero');
        if (host) {
          gsap.fromTo(
            watermark,
            { yPercent: 0 },
            {
              /* Drift only — the header art is a photograph now, and rotating
                 it swings the frame off its overscan. */
              yPercent: -7,
              ease: 'none',
              scrollTrigger: { trigger: host, start: 'top top', end: 'bottom top', scrub: 1 },
            }
          );
        }
      }

      /* ---- Scroll reveals ---- */
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: EASE,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }
        );
      });

      gsap.utils.toArray('[data-reveal-stagger]').forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.85, ease: EASE, stagger: 0.08,
            scrollTrigger: { trigger: group, start: 'top 85%', once: true },
          }
        );
      });

      /* ---- Marquee ---- */
      const track = document.querySelector('[data-marquee]');
      const group = track?.firstElementChild;
      if (group?.scrollWidth) {
        const groupWidth = group.scrollWidth;
        const needed = Math.ceil((window.innerWidth * 2) / groupWidth) + 1;
        for (let i = track.children.length; i < needed; i++) {
          const clone = group.cloneNode(true);
          clone.setAttribute('aria-hidden', 'true');
          track.appendChild(clone);
        }
        gsap.to(track, { x: -groupWidth, duration: groupWidth / 70, ease: 'none', repeat: -1 });
      }

      ScrollTrigger.refresh();
      document.documentElement.setAttribute('data-motion-ready', '');
    });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      if (raf) gsap.ticker.remove(raf);
      lenis?.destroy();
      ctx.revert();
    };
  }, [pathname]);

  return null;
}

/* Wrap each rendered line so it can be revealed from behind a mask. */
function splitIntoLines(el) {
  const text = el.dataset.originalText || el.textContent.trim();
  el.dataset.originalText = text;

  const words = text.split(/\s+/);
  el.textContent = '';

  const spans = words.map((word, i) => {
    const span = document.createElement('span');
    span.style.display = 'inline-block';
    span.textContent = word;
    el.appendChild(span);
    if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
    return span;
  });

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
  const inners = lines.map((lineWords) => {
    const line = document.createElement('span');
    line.className = 'split-line';
    const inner = document.createElement('span');
    inner.textContent = lineWords.join(' ');
    line.appendChild(inner);
    el.appendChild(line);
    return inner;
  });

  el.classList.add('is-split');
  return inners;
}

/* Restore plain text once revealed, so a resize re-wraps instead of clipping. */
function unsplit(el) {
  if (!el?.dataset.originalText) return;
  el.textContent = el.dataset.originalText;
  el.classList.remove('is-split');
  gsap.set(el, { opacity: 1 });
}
