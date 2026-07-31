'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { submitEnquiry } from '@/app/contact/actions';
import { services } from '@/lib/services';
import { site } from '@/lib/site';

const initialState = { status: 'idle', errors: {} };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn--dark" type="submit" disabled={pending}>
      {pending ? 'Sending…' : 'Send it through'}
    </button>
  );
}

function Field({ id, label, optional, error, children }) {
  return (
    <div className="field">
      <label htmlFor={id}>
        {label} {optional && <span>(optional)</span>}
      </label>
      {children}
      {error && (
        <p className="field__error" id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(submitEnquiry, initialState);
  const err = state.errors ?? {};
  const invalid = (k) => (err[k] ? { 'aria-invalid': true, 'aria-describedby': `${k}-error` } : {});

  if (state.status === 'success') {
    return (
      <div className="contact__form-wrap">
        <div className="form-result" role="status">
          <h3>Thanks — that&rsquo;s with us.</h3>
          <p>
            We&rsquo;ll be in touch before you know it. If it&rsquo;s urgent, call us on{' '}
            <a href={`tel:${site.phoneHref}`}>{site.phone}</a>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="contact__form-wrap">
      <form className="contact__form" action={formAction} noValidate>
        {(state.status === 'error' || state.status === 'unconfigured') && state.message && (
          <p className="form-notice" role="alert">{state.message}</p>
        )}

        <Field id="name" label="Your name" error={err.name}>
          <input id="name" name="name" type="text" autoComplete="name" required {...invalid('name')} />
        </Field>

        <div className="field-row">
          <Field id="email" label="Email" error={err.email}>
            <input id="email" name="email" type="email" autoComplete="email" required {...invalid('email')} />
          </Field>
          <Field id="phone" label="Phone" optional>
            <input id="phone" name="phone" type="tel" autoComplete="tel" />
          </Field>
        </div>

        <Field id="business" label="Business" optional>
          <input id="business" name="business" type="text" autoComplete="organization" />
        </Field>

        <Field id="interest" label="What can we help with?">
          <select id="interest" name="interest" defaultValue="">
            <option value="" disabled>Choose one…</option>
            {services.map((s) => (
              <option key={s.slug}>{s.title}</option>
            ))}
            <option>Not sure yet — let&rsquo;s chat</option>
          </select>
        </Field>

        <Field id="message" label="Tell us a bit more" error={err.message}>
          <textarea id="message" name="message" rows={5} required {...invalid('message')} />
        </Field>

        {/* Honeypot — hidden from people, tempting to bots. */}
        <div className="field-honey" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <SubmitButton />

        <p className="contact__form-note">
          Prefer email? Reach us direct at <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </form>
    </div>
  );
}
