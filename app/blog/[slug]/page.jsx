import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Swoop from '@/components/Swoop';
import Cta from '@/components/Cta';
import { getPosts, getPost, formatDate } from '@/lib/content';
import { site } from '@/lib/site';

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: `${post.title} — ${site.name}`,
      description: post.summary,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    author: { '@type': 'Organization', name: site.name },
    publisher: { '@type': 'Organization', name: site.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
            <Link href="/blog">Journal</Link>
            <span aria-hidden="true">/</span>
            {post.date && <time dateTime={post.date}>{formatDate(post.date)}</time>}
          </nav>
          <h1 className="page-hero__title" data-split>{post.title}</h1>
          {post.summary && <p className="page-hero__lead" data-hero-item>{post.summary}</p>}
        </div>
      </section>

      <Swoop flip from="blush" to="paper" />

      <section className="section article">
        <div className="shell article__shell">
          {post.image && (
            <figure className="showcase__figure" data-reveal>
              <Image
                src={post.image}
                alt=""
                width={1500}
                height={1000}
                sizes="(max-width: 1240px) 100vw, 1240px"
                priority
              />
            </figure>
          )}

          <div
            className="article__body"
            data-reveal
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <p className="article__back" data-reveal>
            <Link className="btn btn--outline-dark btn--sm" href="/blog">All posts</Link>
          </p>
        </div>
      </section>

      <Cta from="paper" />
    </>
  );
}
