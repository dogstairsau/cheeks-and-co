import Link from 'next/link';
import Image from 'next/image';
import Swoop from '@/components/Swoop';
import Cta from '@/components/Cta';
import { getPosts, formatDate } from '@/lib/content';
import { site } from '@/lib/site';

export const metadata = {
  title: 'Journal — marketing, plainly put',
  description: `Thinking, opinions and the occasional bit of cheek from ${site.name}.`,
  alternates: { canonical: '/blog' },
  openGraph: { title: `Journal — ${site.name}`, url: '/blog' },
};

export default function BlogPage() {
  const posts = getPosts();

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
            Journal
          </p>
          <h1 className="page-hero__title" data-split>Marketing, plainly put</h1>
          <p className="page-hero__lead" data-hero-item>
            Thinking, opinions and the occasional bit of cheek.
          </p>
        </div>
      </section>

      <Swoop flip from="charcoal" to="paper" />

      <section className="section entries">
        <div className="shell">
          {posts.length === 0 ? (
            <p className="entries__empty" data-reveal>
              First post coming soon. In the meantime,{' '}
              <Link href="/contact">come and say hello</Link>.
            </p>
          ) : (
            <div className="entries__grid" data-reveal-stagger>
              {posts.map((post) => (
                <Link className="entry" href={`/blog/${post.slug}`} key={post.slug}>
                  {post.image && (
                    <figure className="entry__figure">
                      <Image
                        src={post.image}
                        alt=""
                        width={1500}
                        height={1000}
                        sizes="(max-width: 760px) 100vw, 46vw"
                      />
                    </figure>
                  )}
                  <div className="entry__body">
                    {post.date && (
                      <span className="entry__meta">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                      </span>
                    )}
                    <h2>{post.title}</h2>
                    {post.summary && <p>{post.summary}</p>}
                    {post.tags?.length > 0 && (
                      <ul className="entry__tags">
                        {post.tags.map((t) => (
                          <li key={t}>{t}</li>
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
