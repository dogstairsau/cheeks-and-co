import Link from 'next/link';
import Image from 'next/image';
import Swoop from '@/components/Swoop';
import Cta from '@/components/Cta';
import { getCaseStudies, formatDate } from '@/lib/content';
import { site } from '@/lib/site';

export const metadata = {
  title: 'Work — results you can actually see',
  description: `Case studies from ${site.name}: the brief, what we did, and what it returned.`,
  alternates: { canonical: '/work' },
  openGraph: { title: `Work — ${site.name}`, url: '/work' },
};

export default function WorkPage() {
  const studies = getCaseStudies();

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
          <p className="eyebrow eyebrow--rose" data-hero-item>
            <span className="eyebrow__dot" aria-hidden="true" />
            Our work
          </p>
          <h1 className="page-hero__title" data-split>Results you can actually see</h1>
          <p className="page-hero__lead" data-hero-item>
            The brief, what we did, and what it returned.
          </p>
        </div>
      </section>

      <Swoop flip from="blush" to="paper" />

      <section className="section entries">
        <div className="shell">
          {studies.length === 0 ? (
            <p className="entries__empty" data-reveal>
              Case studies are on their way. In the meantime,{' '}
              <Link href="/contact">tell us what you&rsquo;re growing</Link>.
            </p>
          ) : (
            <div className="entries__grid" data-reveal-stagger>
              {studies.map((entry) => (
                <Link className="entry" href={`/work/${entry.slug}`} key={entry.slug}>
                  {entry.image && (
                    <figure className="entry__figure">
                      <Image
                        src={entry.image}
                        alt=""
                        width={1500}
                        height={1000}
                        sizes="(max-width: 760px) 100vw, 46vw"
                      />
                    </figure>
                  )}
                  <div className="entry__body">
                    {entry.client && <span className="entry__meta">{entry.client}</span>}
                    <h2>{entry.title}</h2>
                    {entry.summary && <p>{entry.summary}</p>}
                    {entry.services?.length > 0 && (
                      <ul className="entry__tags">
                        {entry.services.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Cta from="paper" />
    </>
  );
}
