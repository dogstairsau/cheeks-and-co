'use server';

import { site } from '@/lib/site';

const MAX = { name: 120, email: 200, phone: 40, business: 160, interest: 80, message: 4000 };

function validate(data) {
  const errors = {};
  const value = (k) => String(data.get(k) ?? '').trim();

  const name = value('name');
  const email = value('email');
  const message = value('message');

  if (!name) errors.name = 'Please tell us your name.';
  else if (name.length > MAX.name) errors.name = 'That name is too long.';

  if (!email) errors.email = 'We need an email address to reply to.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    errors.email = 'That email address doesn&rsquo;t look right.';
  }

  if (!message) errors.message = 'Tell us a little about what you need.';
  else if (message.length > MAX.message) errors.message = 'That message is a bit long — trim it down?';

  return { errors, name, email, message };
}

/**
 * Handles a contact enquiry.
 *
 * Sending is done through Resend when RESEND_API_KEY is set. Without it the
 * action reports honestly that the form is not connected rather than showing
 * a success state for a message nobody received — a silent success here loses
 * real enquiries.
 */
export async function submitEnquiry(prevState, formData) {
  // Honeypot: real people leave this empty.
  if (String(formData.get('company') ?? '').trim()) {
    return { status: 'success', errors: {} };
  }

  const { errors, name, email, message } = validate(formData);
  if (Object.keys(errors).length) {
    return { status: 'error', errors };
  }

  const phone = String(formData.get('phone') ?? '').trim().slice(0, MAX.phone);
  const business = String(formData.get('business') ?? '').trim().slice(0, MAX.business);
  const interest = String(formData.get('interest') ?? '').trim().slice(0, MAX.interest);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO || site.email;
  const from = process.env.ENQUIRY_FROM;

  if (!apiKey || !from) {
    return {
      status: 'unconfigured',
      errors: {},
      message: `This form isn't connected to an inbox yet. Email us directly at ${site.email} and we'll pick it up straight away.`,
    };
  }

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone && `Phone: ${phone}`,
    business && `Business: ${business}`,
    interest && `Interested in: ${interest}`,
    '',
    message,
  ].filter(Boolean);

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Website enquiry — ${name}${business ? ` (${business})` : ''}`,
        text: lines.join('\n'),
      }),
    });

    if (!res.ok) {
      console.error('Enquiry send failed:', res.status, await res.text());
      return {
        status: 'error',
        errors: {},
        message: `Something went wrong sending that. Please email us at ${site.email}.`,
      };
    }

    return { status: 'success', errors: {} };
  } catch (err) {
    console.error('Enquiry send threw:', err);
    return {
      status: 'error',
      errors: {},
      message: `Something went wrong sending that. Please email us at ${site.email}.`,
    };
  }
}
