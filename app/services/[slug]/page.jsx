import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Swoop from '@/components/Swoop';
import ServiceCarousel from '@/components/ServiceCarousel';
import Cta from '@/components/Cta';
import { services, getService } from '@/lib/services';
import { site } from '@/lib/site';

/* One static page per service, generated at build time. */
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: `${service.title} — services`,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} — ${site.name}`,
      description: service.summary,
      url: `/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.summary,
    serviceType: service.title,
    provider: { '@type': 'Organization', name: site.name, url: site.url },
    areaServed: 'AU',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="page-hero page-hero--service">
        <Image
          className="hero__watermark"
          src="/brand/cheek-mark.png"
          alt=""
          aria-hidden="true"
          width={602}
          height={470}
          data-watermark
          priority
        />
        <div className="shell page-hero__inner">
          <nav className="crumbs" aria-label="Breadcrumb" data-hero-item>
            <Link href="/services">Services</Link>
            <span aria-hidden="true">/</span>
            <span>{service.title}</span>
          </nav>

          <Image
            className="page-hero__icon"
            src={service.icon}
            alt=""
            aria-hidden="true"
            width={68}
            height={68}
            data-hero-item
          />

          <h1 className="page-hero__title" data-split>{service.title}</h1>
          <p className="page-hero__lead" data-hero-item>{service.tag}</p>

          <div className="hero__actions" data-hero-item>
            <Link className="btn btn--pink" href="/contact">Let&rsquo;s talk about it</Link>
            <Link className="btn btn--ghost" href="/services">All services</Link>
          </div>
        </div>
      </section>

      <Swoop flip from="charcoal" to="paper" />

      <section className="section service-detail">
        <div className="shell">
          <div className="service-detail__grid">
            <div>
              <div className="section__head" data-reveal>
                <span className="index">Overview</span>
                <h2 className="section__title">What&rsquo;s involved</h2>
              </div>

              <div className="prose" data-reveal>
                {service.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <ul className="ticks" data-reveal>
                {service.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <aside className="service-detail__aside" data-reveal>
              <figure>
                <Image
                  src="/photos/space-laptop.webp"
                  alt={`A laptop showing a ${site.name} ${service.title.toLowerCase()} deck`}
                  width={1200}
                  height={800}
                  sizes="(max-width: 900px) 100vw, 34vw"
                />
              </figure>
              <div className="service-detail__card">
                <h3>Where to start</h3>
                <p>
                  Tell us what you&rsquo;re trying to grow. We&rsquo;ll tell you honestly what will
                  move the needle — and what won&rsquo;t.
                </p>
                <Link className="btn btn--dark btn--sm" href="/contact">Get in touch</Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Swoop flip from="paper" to="blush" />

      <section className="section services">
        <div className="shell">
          <div className="section__head" data-reveal>
            <span className="index">Keep exploring</span>
            <h2 className="section__title">
              Other things
              <br />
              we&rsquo;re good at
            </h2>
          </div>

          <ServiceCarousel />
        </div>
      </section>

      <Swoop from="blush" to="charcoal" />

      <Cta />
    </>
  );
}
