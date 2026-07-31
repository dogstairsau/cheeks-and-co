# Cheeks & Co. Media

Website for [Cheeks & Co. Media](https://www.cheeksandco.com.au), a full-service
independent marketing collective based in Adelaide, servicing clients across Australia.

Built to Brand Kit v1.0.

## Stack

| Tool | Why |
| --- | --- |
| [Next.js](https://nextjs.org) 16 (App Router) | Routing, static generation, per-page metadata, image optimisation |
| React 19 | Components |
| [GSAP](https://github.com/greensock/gsap) 3.15 + ScrollTrigger | Hero reveal, scroll reveals, marquee, watermark parallax |
| [Lenis](https://github.com/darkroomengineering/lenis) 1.3 | Smooth scroll, synced to ScrollTrigger |

Plain CSS — no utility framework. The whole design system is `app/globals.css`.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

## Routes

| Route | Notes |
| --- | --- |
| `/` | Home |
| `/about` | Story, founder profiles, wider team, media partners |
| `/services` | All seven services |
| `/services/[slug]` | One static page per service, generated from `lib/services.js` |
| `/work` | Case study index |
| `/work/[slug]` | Case study, from `content/work/*.md` |
| `/blog` | Journal index |
| `/blog/[slug]` | Post, from `content/blog/*.md` |
| `/contact` | Enquiry form |

Every route is prerendered as static HTML at build time. Each service, case study and
post carries its own `<title>`, meta description, canonical URL, Open Graph tags and
JSON-LD — none of it depends on JavaScript running.

## Adding content

**A case study** — drop a markdown file in `content/work/`:

```markdown
---
title: More leads than they could keep up with
client: The Grange Golf Club
date: 2026-05-20
summary: One line for the index card and the social preview.
services: Marketing Strategy, Digital Advertising
image: /photos/working-session.webp
---

## The brief

Body copy in markdown…
```

**A journal post** — same thing in `content/blog/`, using `tags:` instead of `services:`.
The filename becomes the URL. The route, index card, metadata and JSON-LD all follow
automatically.

`lib/content.js` is a deliberately dependency-free parser covering headings, bold,
italic, links, lists and blockquotes. If posts start needing tables, embeds or custom
components, swap it for MDX rather than extending it.

**A service** — add an entry to `lib/services.js`. It appears in the mega menu, the
carousel, the services index and gets its own generated page.

## The contact form

`app/contact/actions.js` is a server action: it validates, checks a honeypot, and sends
through [Resend](https://resend.com). Set these environment variables to connect it:

```
RESEND_API_KEY=re_...
ENQUIRY_FROM=website@cheeksandco.com.au   # must be a Resend-verified domain
ENQUIRY_TO=hello@cheeksandco.com.au       # optional, defaults to the site address
```

**Until those are set the form tells the visitor it isn't connected and gives them the
email address instead.** That's deliberate — showing a success message for an enquiry
nobody received loses real leads.

## Deploying

The site needs a Node host because of the server action behind the contact form.
[Vercel](https://vercel.com) is the path of least resistance: import the repo, add the
environment variables above, done. Image optimisation and caching work out of the box.

> The previous GitHub Pages workflow was removed in the Next.js migration — Pages only
> serves static files, so it can't run the form. If you'd rather stay on Pages, add
> `output: 'export'` to `next.config.mjs` and move the form to a third-party endpoint;
> you lose `next/image` optimisation in the process.

## Brand system

Tokens live at the top of `app/globals.css`.

### Colour

| Token | Hex | Use |
| --- | --- | --- |
| `--pink` Cheeks Pink | `#F6A7BF` | Signature. Logos, highlights, big flat fields |
| `--charcoal` Ink Charcoal | `#2C2C2C` | Primary ground and body copy. Never pure black |
| `--rose` Deep Rose | `#C2557C` | Links, small type and buttons on light grounds |
| `--blush` Blush Tint | `#FBE9EF` | Section ground |
| `--paper` Warm Paper | `#F7F4F2` | Default page ground |
| `--stone` Stone Grey | `#7A716D` | Secondary type |

Contrast rule from the brand kit: **pink text on white fails** — use Deep Rose on light
grounds, and reserve Cheeks Pink for charcoal grounds or flat fields. This is why the
sign-off sets "FEEL." in Deep Rose where the email footer uses pink.

### Type

- **Poppins** (400/500/600/700) — display and headings. Picks up the geometry of the wordmark.
- **Work Sans** (variable 300–600) — body copy.
- **JetBrains Mono** (variable 400–500) — micro labels, indices, eyebrow text.

Self-hosted via `next/font/local` (`app/fonts.js`): no third-party request, no FOUT,
and the files are fingerprinted and preloaded automatically.

### Shape

- `--radius` **22px** on cards, quotes and menus; `--radius-lg` **34px** on photography.
  Fully rounded pills on buttons and tags.
  > Brand Kit v1.0 specifies 4px. The client asked for rounded rather than squared edges,
  > and the softer geometry sits better with the Cheek Mark's curves.
- Flat colour blocks only — no gradients.
- The Cheek Mark crops off-canvas as a watermark at 8–12% opacity. Marks are sized by
  **height**, not width, so they always fit their section and bleed off one edge only —
  a width-sized mark overflows a short section and gets sliced flat top and bottom.
- **Swoop dividers** (`<Swoop from="..." to="..." flip />`) sit at every section
  transition, echoing the curve of the Cheek Mark.

## Motion

Movement is deliberately restrained — short distances, soft easing, "a wink not a shout".

`components/Motion.jsx` sets everything up inside a single `gsap.context()` keyed to the
current route, so a client-side navigation tears down every tween, ScrollTrigger and
listener before the next page wires itself up. Without that, triggers accumulate across
navigations and fire against elements that no longer exist.

- **Hero** — the headline reveals line by line behind masks, then unwraps back to plain
  text so a resize re-wraps naturally instead of being clipped.
- **Marquee** — the group clones itself until it covers 2× the viewport, then translates
  by exactly one group width for a seamless loop.
- **Services carousel** — native CSS scroll-snap does the moving; React adds prev/next
  buttons, a progress bar and pointer dragging, so touch and keyboard behaviour stay
  native. Marked `data-lenis-prevent` so Lenis doesn't hijack its horizontal scroll.

### Accessibility & resilience

- `prefers-reduced-motion: reduce` disables Lenis and all animation; content renders
  static and fully visible.
- Reveal targets are pre-hidden only when JS is running. A guard in the layout removes
  the pre-hide if the motion layer hasn't booted within 2.5s, so a script failure can
  never leave the page blank.
- The mega menu is a proper disclosure: hover with a close delay, click and keyboard
  operable, Escape returns focus to the trigger.
- Skip link, visible focus rings, semantic landmarks, labelled form fields with
  `aria-invalid` and `role="alert"` errors.

## Content notes

Copy, photography and logos come from the live site and Brand Kit v1.0. Testimonials
(The Grange Golf Club, Truevault) and team bios are verbatim from the client's site.

**Open items for the client:**

- **Partnership Management has no icon of its own** — the brand has six service icons
  and seven services, so it currently borrows Marketing Strategy's. See the TODO in
  `lib/services.js`.
- **Logo vector originals (EPS/SVG) are still to be sourced.** The lockup and mark here
  are the PNGs from the brand kit; the transparent lockup was derived by alpha-keying
  the flat charcoal ground.
- **Social links point at the platform homepages** — swap in the real profile URLs in
  `lib/site.js`.
- The two supplied brand PDFs are image-only Canva exports with no extractable text, so
  this build follows the Brand Kit HTML. Worth checking nothing in them contradicts it.
