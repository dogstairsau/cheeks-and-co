import { testimonials } from '@/lib/site';

export default function Testimonials({ eyebrow, title, light = false }) {
  return (
    <section className={`section testimonials${light ? ' testimonials--light' : ''}`}>
      <div className="shell">
        <div className="section__head" data-reveal>
          <span className={`index${light ? '' : ' index--pink'}`}>{eyebrow}</span>
          <h2 className="section__title">{title}</h2>
        </div>

        <div className="testimonials__grid" data-reveal-stagger>
          {testimonials.map((t) => (
            <figure className="quote" key={t.id}>
              <blockquote>
                {t.quote.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </blockquote>
              <figcaption>
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
