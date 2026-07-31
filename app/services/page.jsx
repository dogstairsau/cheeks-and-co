import Link from 'next/link';
import Image from 'next/image';
import Swoop from '@/components/Swoop';
import Clients from '@/components/Clients';
import Testimonials from '@/components/Testimonials';
import Cta from '@/components/Cta';
import { services } from '@/lib/services';
import { site } from '@/lib/site';

export const metadata = {
  title: 'Services — making brands shine, strategy to results',
  description:
    "Marketing strategy, digital advertising, traditional media buying, website development, graphic design, organic social and partnership management. If it sits under marketing, it's in our wheelhouse.",
  alternates: { canonical: '/services' },
  openGraph: { title: `Services — ${site.name}`, url: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero">
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
          <p className="eyebrow eyebrow--pink" data-hero-item>
            <span className="eyebrow__dot" aria-hidden="true" />
            Our services
          </p>
          <h1 className="page-hero__title" data-split>How we make brands shine</h1>
          <p className="page-hero__lead" data-hero-item>
            If it sits under marketing, it&rsquo;s in our wheelhouse.
          </p>
        </div>
      </section>

      <Swoop flip from="charcoal" to="paper" />

      <section className="section services-intro">
        <div className="shell">
          <div className="services-intro__grid">
            <p className="statement" data-reveal>Get seen, be heard, and chosen.</p>
            <div className="prose" data-reveal>
              <p>
                {site.name} is a full-service independent marketing collective based in Adelaide,
                servicing clients all across Australia.
              </p>
              <p>
                Our marketing services are designed to help your business get seen, be heard and
                chosen. We take a strategic, results-focused approach across digital and traditional
                channels, making sure your brand reaches the right audience at the right time.
              </p>
              <p>
                From performance-driven digital advertising to broader brand-building media, we
                plan, manage, and optimise every campaign to drive measurable growth, increase
                visibility, and turn attention into action.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Swoop flip from="paper" to="blush" />

      <section className="section service-list">
        <div className="shell">
          <div className="section__head" data-reveal>
            <span className="index">Everything we do</span>
            <h2 className="section__title">Our services</h2>
          </div>

          <div className="service-list__grid" data-reveal-stagger>
            {services.map((s) => (
              <Link className="service-row" href={`/services/${s.slug}`} key={s.slug}>
                <Image
                  className="service-row__icon"
                  src={s.icon}
                  alt=""
                  aria-hidden="true"
                  width={62}
                  height={62}
                />
                <div className="service-row__body">
                  <h3>{s.title}</h3>
                  <p className="service__tag">{s.tag}</p>
                  <p>{s.summary}</p>
                </div>
                <span className="service-row__go" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Swoop from="blush" to="charcoal" />

      <section className="statement-band">
        <Image
          className="statement-band__mark"
          src="/brand/cheek-mark.png"
          alt=""
          aria-hidden="true"
          width={602}
          height={470}
        />
        <div className="shell">
          <p className="statement-band__quote" data-reveal>
            Plug into our energy and watch your world <em>accelerate</em>.
          </p>
          <p className="statement-band__body" data-reveal>
            Getting results for clients is what we do best. We treat every campaign like it&rsquo;s
            our own business, because your results deserve nothing less.
          </p>
          <p className="statement-band__attrib" data-reveal>
            Chelsea Teelow · Director of Cheek &amp; Sparkle
          </p>
        </div>
      </section>

      <Swoop flip from="charcoal" to="paper" />

      <Testimonials
        light
        eyebrow="In their words"
        title={<>Some legends<br />we work with</>}
      />

      <Clients />

      <Cta from="paper" />
    </>
  );
}
