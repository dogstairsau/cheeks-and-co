import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer__inner">
        <div className="footer__brand">
          <Image
            src="/brand/logo-lockup-transparent.png"
            alt={site.name}
            width={1000}
            height={429}
          />
          <p>
            Independent marketing.
            <br />
            Thoughtfully done, expertly delivered.
          </p>
        </div>

        <nav className="footer__nav" aria-label="Footer">
          <h2>Explore</h2>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/work">Work</Link>
          <Link href="/blog">Journal</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <div className="footer__contact">
          <h2>Let&rsquo;s talk</h2>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
          <address>
            {site.address.street}
            <br />
            {site.address.locality}, {site.address.region}, {site.address.postcode}
          </address>
        </div>
      </div>

      <div className="shell footer__base">
        <p>
          © {new Date().getFullYear()} {site.name} · Wayville SA
        </p>
        <p>Adelaide based · Servicing Australia-wide</p>
      </div>
    </footer>
  );
}
