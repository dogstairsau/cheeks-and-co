import Link from 'next/link';
import Image from 'next/image';
import Swoop from '@/components/Swoop';
import Cta from '@/components/Cta';
import { partners, site } from '@/lib/site';

export const metadata = {
  title: 'About — Adelaide based marketing specialists',
  description:
    `${site.name} was born in 2025 — grounded in transparency, guided by intelligent strategy, and just a little bit cheeky. Meet Chelsea Teelow and Jacqui Leopardi.`,
  alternates: { canonical: '/about' },
  openGraph: { title: `About — ${site.name}`, url: '/about' },
};

const FOUNDERS = [
  {
    name: 'Chelsea Teelow',
    role: 'Director of Cheek & Sparkle',
    photo: '/photos/chelsea.webp',
    // Native dimensions differ per portrait; passing the real ones keeps
    // next/image from reserving the wrong box and shifting layout.
    w: 1365,
    h: 2048,
    body: [
      'With over 20 years of experience across sales, marketing and media, Chelsea has worked with hundreds of brands — from small local businesses to major national companies across radio, digital and integrated media.',
      "Her career started in hospitality before moving into senior sales roles with Telstra and Southern Cross Austereo. She's known for her strong relationships, big ideas, and a track record of delivering results that move the needle.",
      'Chelsea has always been passionate about helping businesses grow. She brings energy, creativity and a healthy dose of cheek and sparkle to every brand she works with, going the extra mile to track performance, optimise campaigns, and make sure every marketing dollar is working hard.',
    ],
    quote:
      "Getting results for clients is what I do best. I treat every campaign like it's my own business, because their results deserve nothing less.",
  },
  {
    name: 'Jacqui Leopardi',
    role: 'Head of Making Everything Happen',
    photo: '/photos/jacqui.webp',
    w: 1500,
    h: 1000,
    reverse: true,
    body: [
      "Jacqui has built her career working with some of the world's most recognised brands, including Nestlé, Southern Cross Austereo and Red Bull Australia, where she held the role of State Manager. Along the way, she developed a sharp instinct for building brands that don't just look impressive in a deck but actually deliver meaningful, measurable growth.",
      "More recently, Jacqui has stepped into the agency world, gaining a full-circle perspective on marketing. It's here she found her sweet spot: partnering with ambitious local businesses that have already proven themselves and are ready to scale with intent.",
      'Detail driven, commercially minded and unapologetically results-focused, Jacqui believes great marketing should do more than turn heads — it should move the needle. She keeps the wheels turning, the standards high, and the promises not just met but exceeded.',
    ],
    quote: "If it's been said, signed, or even slightly implied… Jacqui's already onto it.",
  },
];

export default function AboutPage() {
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
            About us
          </p>
          <h1 className="page-hero__title" data-split>Hi, it&rsquo;s nice to meet you</h1>
          <p className="page-hero__lead" data-hero-item>
            An independent marketing collective in Adelaide, working with ambitious businesses right
            across Australia.
          </p>
        </div>
      </section>

      <Swoop flip from="charcoal" to="paper" />

      <section className="section story">
        <div className="shell">
          <figure className="showcase__figure" data-reveal>
            <Image
              src="/photos/pair-kitchen.webp"
              alt="Chelsea Teelow and Jacqui Leopardi at the Cheeks &amp; Co. Media studio"
              width={1500}
              height={1000}
              sizes="(max-width: 1240px) 100vw, 1240px"
              priority
            />
          </figure>

          <div className="story__grid">
            <div className="section__head" data-reveal>
              <span className="index">Our story</span>
              <h2 className="section__title">
                It started over
                <br />a glass (or two)
              </h2>
            </div>

            <div className="prose prose--lead" data-reveal>
              <p>
                {site.name}{' '}
                began the way many great ideas do: a little industry chit chat over
                dinner, with a glass (or two) of champagne. Two former colleagues found themselves
                reflecting on the state of marketing — the overcomplicated strategies, the constant
                platform shifts, the reports that said a lot but meant very little. Beneath it all
                was a shared belief: it didn&rsquo;t need to be this complex to be effective.
              </p>
              <p>
                A few months later, Chelsea connected the dots and backed the vision. In 2025,{' '}
                {site.name} was born: grounded in transparency, guided by intelligent strategy, and
                just a little bit cheeky.
              </p>
              <p>
                We connect great businesses with the right audiences at the right time. Deep industry
                relationships, clear and considered media planning and buying, and a sense of ease
                and precision in a space that often feels anything but.
              </p>
              <p>
                The result? Marketing that is strategic, refined, and built to perform. Clarity,
                confidence, and results you can actually see.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Swoop flip from="paper" to="blush" />

      <section className="section founders" id="team">
        <div className="shell">
          <div className="section__head" data-reveal>
            <span className="index">The founders</span>
            <h2 className="section__title">
              The two behind
              <br />
              the cheek
            </h2>
          </div>

          {FOUNDERS.map((f) => (
            <article
              className={`founder${f.reverse ? ' founder--reverse' : ''}`}
              key={f.name}
              data-reveal
            >
              <figure className="founder__figure">
                <Image
                  src={f.photo}
                  alt={f.name}
                  width={f.w}
                  height={f.h}
                  sizes="(max-width: 900px) 100vw, 38vw"
                />
              </figure>
              <div className="founder__body">
                <h3>{f.name}</h3>
                <p className="person__role">{f.role}</p>
                {f.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                <blockquote>{f.quote}</blockquote>
                <Link className="btn btn--outline-dark btn--sm" href="/contact">
                  Connect with {f.name.split(' ')[0]}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Swoop from="blush" to="charcoal" />

      <section className="section team-band">
        <Image
          className="statement-band__mark"
          src="/brand/cheek-mark.png"
          alt=""
          aria-hidden="true"
          width={602}
          height={470}
        />
        <div className="shell">
          <div className="section__head" data-reveal>
            <span className="index index--pink">The wider team</span>
            <h2 className="section__title">
              We have an amazing
              <br />
              team behind us
            </h2>
          </div>

          <div className="team-band__grid">
            <div className="prose prose--invert" data-reveal>
              <p>
                Success isn&rsquo;t about having all the answers. It&rsquo;s about having the right
                people in the room when the questions get asked.
              </p>
              <p>
                {site.name} is proud to have built an exceptional team of specialists spanning every
                corner of the marketing world, each bringing their own expertise, perspective, and a
                shared obsession with delivering real results.
              </p>
              <p>
                From the very first audit through to strategy, presentation, onboarding and ongoing
                delivery, our team works seamlessly together (and yes, a little tirelessly too).
                It&rsquo;s a genuinely collaborative approach — no silos, no handballs, just the
                right people, at the right time, doing what they do best.
              </p>
              <p>
                Because great marketing isn&rsquo;t about one person having all the answers.
                It&rsquo;s about having a team clever enough, curious enough, and just cheeky enough
                to figure them out and then execute them brilliantly.
              </p>
            </div>

            <figure className="team-band__figure" data-reveal>
              <Image
                src="/photos/boardroom.webp"
                alt={`The ${site.name} team around the boardroom table`}
                width={1500}
                height={1000}
                sizes="(max-width: 900px) 100vw, 46vw"
              />
            </figure>
          </div>
        </div>
      </section>

      <Swoop flip from="charcoal" to="paper" />

      <section className="section partners">
        <div className="shell">
          <div className="section__head" data-reveal>
            <span className="index">Our network</span>
            <h2 className="section__title">
              Partners we
              <br />
              work with
            </h2>
            <p className="section__note">
              Deep industry relationships across broadcast, print, outdoor, digital and social — the
              reason we can plan and negotiate with confidence.
            </p>
          </div>

          <ul className="partners__grid" data-reveal-stagger>
            {partners.map((p) => (
              <li key={p.name}>
                <Image src={p.logo} alt={p.name} width={200} height={90} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Cta from="paper" />
    </>
  );
}
