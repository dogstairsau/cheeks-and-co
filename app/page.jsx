import Link from 'next/link';
import Image from 'next/image';
import Swoop from '@/components/Swoop';
import Clients from '@/components/Clients';
import Marquee from '@/components/Marquee';
import ServiceCarousel from '@/components/ServiceCarousel';
import Testimonials from '@/components/Testimonials';
import Cta from '@/components/Cta';
import { site } from '@/lib/site';

export const metadata = {
  title: `${site.name} — ${site.tagline}`,
  description:
    'A full-service independent marketing collective in Adelaide, working with ambitious businesses across Australia. Strategy, media buying, digital advertising, social and design.',
  alternates: { canonical: '/' },
  openGraph: {
    title: `${site.name} — Where bold ideas meet real results`,
    description: site.tagline,
    url: '/',
  },
};

const FACTS = [
  ['Based', 'Adelaide, SA'],
  ['Working', 'Australia-wide'],
  ['Experience', '20+ years'],
  ['Agenda', 'Yours only'],
];

const PILLARS = [
  ['What we are', 'A full-service independent marketing collective in Adelaide, working with clients across Australia — free from external agendas.'],
  ["Who it's for", 'Ambitious businesses that have already proven themselves and are ready to scale with intent.'],
  ['The difference', 'Clarity over complexity. Results you can actually see. And a little cheek and sparkle along the way.'],
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <span className="blob blob--a" aria-hidden="true" />
        <span className="blob blob--b" aria-hidden="true" />

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

        <div className="hero__inner">
          <p className="eyebrow eyebrow--rose" data-hero-item>
            <span className="eyebrow__dot" aria-hidden="true" />
            Are you ready to grow?
          </p>

          {/* The client's own headline. Kept as plain text because the
              line-reveal rebuilds this node from textContent. */}
          <h1 className="hero__title" data-split>
            Independent marketing. Thoughtfully done, expertly delivered.
          </h1>

          <p className="hero__lead" data-hero-item>Where bold ideas meet real results.</p>

          <div className="hero__actions" data-hero-item>
            <Link className="btn btn--dark" href="/contact">Let&rsquo;s connect</Link>
            <Link className="btn btn--outline-dark" href="/services">See what we do</Link>
          </div>

          <dl className="hero__facts" data-hero-item>
            {FACTS.map(([term, value]) => (
              <div className="hero__fact" key={term}>
                <dt>{term}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* The header's foot: the photograph edge to edge, with the blush curving
          down into it and the cream curving up out of it, so the picture is
          held by the same swoop that divides every other section. */}
      <section className="hero-foot">
        <Image
          src="/photos/chelsea-jacqui.webp"
          alt="Chelsea Teelow and Jacqui Leopardi at the Cheeks &amp; Co. Media office, beside a wall reading “Plug into our energy and watch your world accelerate.”"
          width={1500}
          height={1000}
          sizes="100vw"
          priority
        />
        <Swoop cap="top" from="blush" />
        <Swoop cap="bottom" from="paper" flip />
      </section>

      <Clients />

      <Swoop flip from="paper" to="blush" />

      <section className="section approach approach--blush" id="approach">
        <div className="shell">
          <div className="section__head" data-reveal>
            <span className="index">The approach</span>
            <h2 className="section__title">
              Where bold ideas
              <br />
              meet real results
            </h2>
          </div>

          <div className="approach__grid">
            <div className="approach__lede">
              <p className="statement" data-reveal>
                Great marketing is built on clarity, intention, and the freedom to do what&rsquo;s
                right for each client.
              </p>

              <div className="prose" data-reveal>
                <p>
                  It&rsquo;s not a one-size-fits-all approach, and it&rsquo;s certainly not about
                  doing more for the sake of it. It&rsquo;s about finding the right audience and
                  doing what matters, properly.
                </p>
                <p>
                  We take the time to truly understand your business, cutting through the noise to
                  build strategies that are considered, purposeful, and tailored to you. Free from
                  external pressures and agendas, our recommendations are always in your best
                  interest — designed to deliver real impact and measurable results, not just
                  activity.
                </p>
                <p>
                  With deep expertise across marketing and media, we execute with precision: every
                  detail handled seamlessly, every outcome driving a return that actually moves the
                  needle for your business.
                </p>
              </div>
            </div>

            <figure className="approach__figure" data-reveal>
              <Image
                src="/photos/working-session.webp"
                alt="The Cheeks &amp; Co. team in a working session around the boardroom table"
                width={1500}
                height={1000}
                sizes="(max-width: 900px) 100vw, 42vw"
              />
              <figcaption>No silos, no handballs — just the right people at the right time.</figcaption>
            </figure>
          </div>

          <div className="pillars" data-reveal-stagger>
            {PILLARS.map(([title, copy]) => (
              <article className="pillar" key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Marquee />

      <section className="section services">
        <div className="shell">
          <div className="section__head" data-reveal>
            <span className="index">What we do</span>
            <h2 className="section__title">
              How we make
              <br />
              brands shine
            </h2>
            <p className="section__note">If it sits under marketing, it&rsquo;s in our wheelhouse.</p>
          </div>

          <ServiceCarousel />

          <p className="services__more" data-reveal>
            <Link className="btn btn--outline-dark" href="/services">See all services</Link>
          </p>
        </div>
      </section>

      <Swoop from="paper" to="charcoal" />

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
            Helping brands grow with strategy, <em>cheek</em> and a little <em>sparkle</em>.
          </p>
          <p className="statement-band__body" data-reveal>
            Integrity, creativity and empathy shape the way we work. These aren&rsquo;t just words —
            they&rsquo;re the foundation of everything we build, and why brands keep working with us.
          </p>
          <ul className="values" data-reveal-stagger>
            {['Integrity', 'Creativity', 'Empathy', 'Transparency', 'Cheek'].map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Light variant + a swoop: the statement band is already charcoal, and
          running the testimonials straight on from it read as one dead slab. */}
      <Swoop flip from="charcoal" to="paper" />

      <Testimonials
        light
        eyebrow="In their words"
        title={<>Don&rsquo;t just<br />take our word</>}
      />

      <Cta from="paper" />
    </>
  );
}
