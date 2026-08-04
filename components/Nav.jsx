'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { services } from '@/lib/services';
import { site } from '@/lib/site';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/work', label: 'Work' },
  { href: '/blog', label: 'Journal' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const pathname = usePathname();
  const [stuck, setStuck] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  const megaWrap = useRef(null);
  const megaToggle = useRef(null);
  const closeTimer = useRef(null);

  const isCurrent = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const closeMega = useCallback(() => {
    clearTimeout(closeTimer.current);
    setMegaOpen(false);
  }, []);

  /* Close everything on navigation. */
  useEffect(() => {
    setMenuOpen(false);
    closeMega();
  }, [pathname, closeMega]);

  /* Open state is read through refs so the scroll effect can stay mounted
     once. Depending on it directly re-ran the effect the moment the mega
     opened, and its immediate first call closed it again. */
  const megaOpenRef = useRef(false);
  const menuOpenRef = useRef(false);
  useEffect(() => { megaOpenRef.current = megaOpen; }, [megaOpen]);
  useEffect(() => { menuOpenRef.current = menuOpen; }, [menuOpen]);

  /* Charcoal bar once scrolled; hide the bar on the way down. */
  useEffect(() => {
    let lastY = window.scrollY;
    setStuck(lastY > 40);

    const onScroll = () => {
      const y = window.scrollY;
      setStuck(y > 40);

      if (megaOpenRef.current) {
        closeMega();
        setHidden(false);
      } else if (menuOpenRef.current) {
        setHidden(false);
      } else if (y > lastY && y > 300) {
        setHidden(true);
      } else if (y < lastY) {
        setHidden(false);
      }

      lastY = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [closeMega]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (megaOpen) {
        closeMega();
        megaToggle.current?.focus();
      }
      setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [megaOpen, closeMega]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  /* Hover intent — a delay so a diagonal path to the panel doesn't dismiss it. */
  const canHover =
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const hoverOpen = () => {
    if (!canHover) return;
    clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const hoverClose = () => {
    if (!canHover) return;
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 180);
  };

  return (
    <>
      <header
        className={[
          'nav',
          stuck ? 'is-stuck' : '',
          hidden ? 'is-hidden' : '',
          menuOpen ? 'is-menu-open' : '',
        ].join(' ')}
      >
        <div className="nav__inner">
          <Link className="nav__logo" href="/" aria-label={`${site.name} — home`}>
            <Image
              src="/brand/logo-lockup-transparent.png"
              alt={site.name}
              width={1000}
              height={429}
              priority
            />
          </Link>

          <nav className="nav__links" aria-label="Primary">
            {LINKS.slice(0, 2).map((l) => (
              <Link key={l.href} href={l.href} aria-current={isCurrent(l.href) ? 'page' : undefined}>
                {l.label}
              </Link>
            ))}

            <div
              className="nav__mega-wrap"
              ref={megaWrap}
              onMouseEnter={hoverOpen}
              onMouseLeave={hoverClose}
              onBlur={(e) => {
                if (!megaWrap.current?.contains(e.relatedTarget)) closeMega();
              }}
            >
              <button
                className="nav__mega-toggle"
                type="button"
                ref={megaToggle}
                aria-expanded={megaOpen}
                aria-controls="mega-services"
                aria-current={isCurrent('/services') ? 'page' : undefined}
                onClick={() => setMegaOpen((o) => !o)}
              >
                Services
                <svg
                  className="nav__chevron"
                  viewBox="0 0 12 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m1 2 5 4 5-4" />
                </svg>
              </button>

              <div className="mega" id="mega-services" hidden={!megaOpen} data-open={megaOpen || undefined}>
                <div className="mega__inner">
                  <ul className="mega__grid">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link href={`/services/${s.slug}`}>
                          <Image src={s.icon} alt="" aria-hidden="true" width={34} height={34} />
                          <span>
                            <strong>{s.title}</strong>
                            {s.short}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="mega__aside">
                    <p className="mega__kicker">Not sure where to start?</p>
                    <p className="mega__copy">
                      Tell us what you&rsquo;re trying to grow. We&rsquo;ll tell you honestly what
                      will move the needle — and what won&rsquo;t.
                    </p>
                    <Link className="btn btn--rose btn--sm" href="/contact">Let&rsquo;s talk</Link>
                    <Link className="mega__all" href="/services">
                      See all services <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {LINKS.slice(2).map((l) => (
              <Link key={l.href} href={l.href} aria-current={isCurrent(l.href) ? 'page' : undefined}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="nav__actions">
            <Link className="btn btn--rose btn--sm" href="/contact">Let&rsquo;s connect</Link>
            <button
              className="nav__toggle"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className="nav__toggle-label">Menu</span>
              <span className="nav__toggle-bars" aria-hidden="true"><i /><i /></span>
            </button>
          </div>
        </div>

        <div className="nav__mobile" id="mobile-menu" hidden={!menuOpen} data-open={menuOpen || undefined}>
          <Link href="/" aria-current={isCurrent('/') ? 'page' : undefined}>Home</Link>
          <Link href="/about" aria-current={isCurrent('/about') ? 'page' : undefined}>About</Link>
          <Link href="/services" aria-current={isCurrent('/services') ? 'page' : undefined}>Services</Link>
          <ul className="nav__mobile-sub">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`}>{s.title}</Link>
              </li>
            ))}
          </ul>
          <Link href="/work" aria-current={isCurrent('/work') ? 'page' : undefined}>Work</Link>
          <Link href="/blog" aria-current={isCurrent('/blog') ? 'page' : undefined}>Journal</Link>
          <Link href="/contact" aria-current={isCurrent('/contact') ? 'page' : undefined}>Contact</Link>
          <a className="nav__mobile-cta" href={`tel:${site.phoneHref}`}>{site.phone}</a>
        </div>
      </header>

      <div
        className="nav__scrim"
        hidden={!megaOpen}
        data-open={megaOpen || undefined}
        onClick={closeMega}
      />
    </>
  );
}
