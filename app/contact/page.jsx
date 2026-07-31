import Image from 'next/image';
import Swoop from '@/components/Swoop';
import ContactForm from '@/components/ContactForm';
import { site } from '@/lib/site';

export const metadata = {
  title: "Contact — connect today, let's collaborate",
  description: `Got a project in mind, a question, or just want to chat about your ideas? ${site.name}, ${site.address.street}, ${site.address.locality} ${site.address.region}. ${site.email} · ${site.phone}.`,
  alternates: { canonical: '/contact' },
  openGraph: { title: `Contact — ${site.name}`, url: '/contact' },
};

export default function ContactPage() {
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
            Say hello…
          </p>
          <h1 className="page-hero__title" data-split>We&rsquo;d love to work with you</h1>
          <p className="page-hero__lead" data-hero-item>Let&rsquo;s make something great together.</p>
        </div>
      </section>

      <Swoop flip from="charcoal" to="paper" />

      <section className="section contact">
        <div className="shell contact__grid">
          <div className="contact__intro">
            <div className="section__head" data-reveal>
              <span className="index">Get in touch</span>
              <h2 className="section__title">
                Tell us what
                <br />
                you&rsquo;re growing
              </h2>
            </div>

            <div className="prose" data-reveal>
              <p>
                Whether you&rsquo;ve got a project in mind, a question, or just want to chat about
                your ideas, we&rsquo;d love to hear from you. Fill in your details, hit send, and
                we&rsquo;ll be in touch before you know it.
              </p>
            </div>

            <dl className="contact__details" data-reveal>
              <div>
                <dt>Email</dt>
                <dd><a href={`mailto:${site.email}`}>{site.email}</a></dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd><a href={`tel:${site.phoneHref}`}>{site.phone}</a></dd>
              </div>
              <div>
                <dt>Studio</dt>
                <dd>
                  <address>
                    {site.address.street}
                    <br />
                    {site.address.locality}, {site.address.region}, {site.address.postcode}
                  </address>
                </dd>
              </div>
              <div>
                <dt>Follow</dt>
                <dd className="contact__social">
                  <a href={site.social.facebook} rel="noopener noreferrer nofollow" target="_blank">Facebook</a>
                  <a href={site.social.instagram} rel="noopener noreferrer nofollow" target="_blank">Instagram</a>
                  <a href={site.social.linkedin} rel="noopener noreferrer nofollow" target="_blank">LinkedIn</a>
                </dd>
              </div>
            </dl>
          </div>

          <div data-reveal>
            <ContactForm />
          </div>
        </div>
      </section>

      <Swoop flip from="paper" to="charcoal" />

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
        </div>
      </section>

      <Swoop flip from="charcoal" to="paper" />

      <section className="signoff" aria-label={site.signoff}>
        <Image
          className="signoff__mark"
          src="/brand/cheek-mark.png"
          alt=""
          aria-hidden="true"
          width={602}
          height={470}
        />
        <div className="shell signoff__inner">
          <Image
            className="signoff__logo"
            src="/brand/logo-lockup-transparent.png"
            alt={site.name}
            width={1000}
            height={429}
          />
          <p className="signoff__line" data-reveal>
            Marketing
            <br />
            you can <em>feel.</em>
          </p>
        </div>
      </section>

      <Swoop flip from="paper" to="charcoal" />
    </>
  );
}
