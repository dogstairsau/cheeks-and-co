import './globals.css';
import { cormorant, poppins } from './fonts';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Motion from '@/components/Motion';
import { site } from '@/lib/site';

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description:
    'A full-service independent marketing collective in Adelaide, working with ambitious businesses across Australia. Strategy, media buying, digital advertising, social and design.',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    siteName: site.name,
    images: ['/brand/logo-lockup.png'],
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/brand/cheek-mark.png', apple: '/brand/cheek-mark.png' },
};

export const viewport = { themeColor: '#FAF8F5' };

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MarketingAgency',
  name: site.name,
  description:
    'Full-service independent marketing collective based in Adelaide, servicing clients across Australia.',
  url: site.url,
  telephone: `+61${site.phone.replace(/\D/g, '').replace(/^0/, '')}`,
  email: site.email,
  foundingDate: '2025',
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postcode,
    addressCountry: 'AU',
  },
  areaServed: 'AU',
  employee: [
    { '@type': 'Person', name: 'Chelsea Teelow', jobTitle: 'Director of Cheek & Sparkle' },
    { '@type': 'Person', name: 'Jacqui Leopardi', jobTitle: 'Head of Making Everything Happen' },
  ],
};

/*
 * Runs before paint so reveal targets never flash in before GSAP takes over.
 * The timeout is a safety net: if the motion layer never boots, the pre-hide
 * is dropped and the page renders as static content.
 */
const noFlash = `
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('js-anim');
  setTimeout(function () {
    if (!document.documentElement.hasAttribute('data-motion-ready')) {
      document.documentElement.classList.remove('js-anim');
    }
  }, 2500);
}`;

export default function RootLayout({ children }) {
  const fontVars = `${cormorant.variable} ${poppins.variable}`;

  return (
    <html lang="en-AU" className={fontVars}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlash }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <Motion />
      </body>
    </html>
  );
}
