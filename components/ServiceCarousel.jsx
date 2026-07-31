'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { services } from '@/lib/services';

/**
 * Native CSS scroll-snap does the moving; this adds prev/next buttons, a
 * progress bar and pointer dragging, so touch and keyboard behaviour stay
 * native. Marked data-lenis-prevent so Lenis doesn't hijack horizontal scroll.
 */
export default function ServiceCarousel() {
  const viewport = useRef(null);
  const track = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [progress, setProgress] = useState(0);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: 0 });

  const sync = useCallback(() => {
    const el = viewport.current;
    if (!el) return;
    const max = Math.max(0, el.scrollWidth - el.clientWidth);
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, [sync]);

  const step = () => {
    const card = track.current?.firstElementChild;
    if (!card) return viewport.current?.clientWidth ?? 0;
    const gap = parseFloat(getComputedStyle(track.current).columnGap) || 0;
    return card.getBoundingClientRect().width + gap;
  };

  const scrollBy = (dir) =>
    viewport.current?.scrollBy({ left: dir * step(), behavior: 'smooth' });

  const onPointerDown = (e) => {
    if (e.pointerType === 'touch') return; // native touch scrolling is better
    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: viewport.current.scrollLeft,
      moved: 0,
    };
    viewport.current.classList.add('is-dragging');
    viewport.current.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.abs(dx);
    viewport.current.scrollLeft = drag.current.startScroll - dx;
  };

  const endDrag = (e) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    const el = viewport.current;
    el.classList.remove('is-dragging');
    if (e.pointerId != null && el.hasPointerCapture?.(e.pointerId)) {
      el.releasePointerCapture(e.pointerId);
    }
    // Swallow the click that ends a drag so it doesn't follow the card link.
    if (drag.current.moved > 6) {
      const swallow = (evt) => evt.preventDefault();
      el.addEventListener('click', swallow, { capture: true, once: true });
      requestAnimationFrame(() => el.removeEventListener('click', swallow, { capture: true }));
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); scrollBy(1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); scrollBy(-1); }
  };

  return (
    <div className="carousel" role="group" aria-roledescription="carousel" aria-label="Our services">
      <div
        className="carousel__viewport"
        ref={viewport}
        data-lenis-prevent
        tabIndex={0}
        aria-label="Services — scroll horizontally to browse"
        onScroll={sync}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
      >
        <div className="carousel__track" ref={track} data-reveal-stagger>
          {services.map((s, i) => (
            <Link className="service" key={s.slug} href={`/services/${s.slug}`}>
              <span className="service__num">{String(i + 1).padStart(2, '0')}</span>
              <Image className="service__icon" src={s.icon} alt="" aria-hidden="true" width={56} height={56} />
              <h3>{s.title}</h3>
              <p className="service__tag">{s.tag}</p>
              <p>{s.summary}</p>
            </Link>
          ))}

          <Link className="service service--cta" href="/contact">
            <span className="service__num">→</span>
            <h3>Not sure where to start?</h3>
            <p>
              Tell us what you&rsquo;re trying to grow. We&rsquo;ll tell you honestly what will move
              the needle — and what won&rsquo;t.
            </p>
            <span className="service__link">Let&rsquo;s talk</span>
          </Link>
        </div>
      </div>

      <div className="carousel__controls">
        <div className="carousel__progress" aria-hidden="true">
          <span style={{ width: `${Math.min(100, Math.max(6, progress * 100))}%` }} />
        </div>
        <div className="carousel__buttons">
          <button
            className="carousel__btn"
            type="button"
            onClick={() => scrollBy(-1)}
            disabled={atStart}
            aria-label="Previous services"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 5 8 12l7 7" />
            </svg>
          </button>
          <button
            className="carousel__btn"
            type="button"
            onClick={() => scrollBy(1)}
            disabled={atEnd}
            aria-label="Next services"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m9 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
