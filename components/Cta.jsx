import Link from 'next/link';
import Image from 'next/image';
import Swoop from './Swoop';
import { site } from '@/lib/site';

/** Closing block: pink CTA, then the "marketing you can feel" sign-off. */
export default function Cta({ from = 'charcoal' }) {
  return (
    <>
      <Swoop from={from} to="pink" />

      <section className="cta">
        <div className="shell cta__inner">
          <p className="eyebrow eyebrow--dark" data-reveal>Ready to grow your business?</p>
          <h2 className="cta__title" data-reveal>
            Big ideas,
            <br />
            real impact.
          </h2>
          <p className="cta__lead" data-reveal>{site.rally}</p>

          <div className="cta__actions" data-reveal>
            <a className="btn btn--dark" href={`mailto:${site.email}`}>{site.email}</a>
            <a className="btn btn--outline-dark" href={`tel:${site.phoneHref}`}>{site.phone}</a>
          </div>

          <address className="cta__address" data-reveal>
            {site.address.street}, {site.address.locality}, {site.address.region}{' '}
            {site.address.postcode}
          </address>
        </div>
      </section>

      <Swoop from="pink" to="paper" />

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
          <Link href="/">
            <Image
              className="signoff__logo"
              src="/brand/logo-lockup-transparent.png"
              alt={site.name}
              width={1000}
              height={429}
            />
          </Link>
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
