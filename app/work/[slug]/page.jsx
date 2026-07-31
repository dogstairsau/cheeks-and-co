import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Swoop from '@/components/Swoop';
import Cta from '@/components/Cta';
import { getCaseStudies, getCaseStudy } from '@/lib/content';
import { site } from '@/lib/site';

export function generateStaticParams() {
  return getCaseStudies().map((e) => ({ slug: e.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const entry = getCaseStudy(slug);
  if (!entry) return {};

  return {
    title: entry.title,
    description: entry.summary,
    alternates: { canonical: `/work/${entry.slug}` },
    openGraph: {
      title: `${entry.title} — ${site.name}`,
      description: entry.summary,
      url: `/work/${entry.slug}`,
      images: entry.image ? [entry.image] : undefined,
    },
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const entry = getCaseStudy(slug);
  if (!entry) notFound();

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
          <nav className="crumbs" aria-label="Breadcrumb" data-hero-item>
            <Link href="/work">Work</Link>
            <span aria-hidden="true">/</span>
            <span>{entry.client || entry.title}</span>
          </nav>
          <h1 className="page-hero__title" data-split>{entry.title}</h1>
          {entry.summary && <p className="page-hero__lead" data-hero-item>{entry.summary}</p>}
        </div>
      </section>

      <Swoop flip from="charcoal" to="paper" />

      <section className="section article">
        <div className="shell article__shell">
          {entry.image && (
            <figure className="showcase__figure" data-reveal>
              <Image
                src={entry.image}
                alt=""
                width={1500}
                height={1000}
                sizes="(max-width: 1240px) 100vw, 1240px"
                priority
              />
            </figure>
          )}

          {entry.services?.length > 0 && (
            <ul className="article__tags" data-reveal>
              {entry.services.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          )}

          <div
            className="article__body"
            data-reveal
            dangerouslySetInnerHTML={{ __html: entry.html }}
          />

          <p className="article__back" data-reveal>
            <Link className="btn btn--outline-dark btn--sm" href="/work">All work</Link>
          </p>
        </div>
      </section>

      <Cta from="paper" />
    </>
  );
}
