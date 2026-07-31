# Cheeks & Co. Media — Landing Page

Landing page for [Cheeks & Co. Media](https://www.cheeksandco.com.au/), a full-service
independent marketing collective based in Adelaide, servicing clients across Australia.

Built to Brand Kit v1.0.

## Stack

| Tool | Why |
| --- | --- |
| [Vite](https://vite.dev) | Build tooling and dev server |
| [GSAP](https://github.com/greensock/gsap) 3.15 + ScrollTrigger | Hero line reveal, scroll reveals, marquee, watermark parallax |
| [Lenis](https://github.com/darkroomengineering/lenis) 1.3 | Smooth scroll, synced to ScrollTrigger |

No framework, no CSS library — plain HTML, CSS and ES modules.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview  # serve the production build
```

## Brand system

Tokens live at the top of `src/styles/main.css`.

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
grounds, and reserve Cheeks Pink for charcoal grounds or flat fields.

### Type

- **Poppins** (400/500/600/700) — display and headings. Picks up the geometry of the wordmark.
- **Work Sans** (variable 300–600) — body copy.
- **JetBrains Mono** (variable 400–500) — micro labels, indices, eyebrow text.

Fonts are **self-hosted** in `public/fonts/` (woff2, subset to latin + latin-ext). No
third-party font request: faster first paint, no FOUT, and nothing leaks to Google.

### Shape

- `--radius` **22px** on cards, quotes and menus; `--radius-lg` **34px** on photography.
  Fully rounded pills on buttons and tags.
  > Brand Kit v1.0 specifies a 4px card radius. The client asked for rounded rather than
  > squared edges, so this build uses the softer geometry above — it also sits better with
  > the Cheek Mark's curves. Change the two tokens in `main.css` to revert.
- Flat colour blocks only — no gradients.
- The Cheek Mark crops off-canvas as a watermark at 8–12% opacity (hero, statement band).
- **Swoop dividers** (`.swoop`) sit at every section transition, echoing the curve of the
  Cheek Mark. Compose with `--from-*` / `--to-*` modifiers, plus `--flip` to mirror, e.g.
  `<div class="swoop swoop--flip swoop--from-charcoal swoop--to-pink">`.

## Structure

```
index.html              markup + JSON-LD + no-FOUC guard
src/styles/fonts.css    self-hosted @font-face declarations
src/styles/main.css     tokens, layout, components, responsive, reduced-motion
src/js/main.js          Lenis + GSAP: nav, hero, reveals, marquee, carousel
public/brand/           logo lockup (charcoal + transparent), Cheek Mark
public/photos/          team photography
public/fonts/           woff2 webfonts
```

## Motion

Movement is deliberately restrained — short distances, soft easing, "a wink not a shout".

- **Hero** — headline reveals line by line behind masks, then unwraps back to plain text so
  a resize re-wraps naturally instead of being clipped.
- **Scroll reveals** — `data-reveal` (single) and `data-reveal-stagger` (children), fire once.
- **Marquee** — the service list clones itself until it covers 2× the viewport, then
  translates by exactly one group width for a seamless loop.
- **Services carousel** — native CSS scroll-snap does the moving; JS adds prev/next buttons,
  a progress bar and pointer dragging, so touch and keyboard behaviour stay native. Marked
  `data-lenis-prevent` so Lenis doesn't hijack its horizontal scroll.

### Accessibility & resilience

- `prefers-reduced-motion: reduce` disables Lenis, all reveals and all looping animation;
  content renders static and fully visible.
- Reveal targets are pre-hidden only when JS is running. A guard in `<head>` removes the
  pre-hide if the motion module hasn't booted within 2.5s, so a script failure can never
  leave the page blank.
- Carousel is keyboard operable (arrow keys, tabbing into a card scrolls it into view) and
  labelled with `aria-roledescription="carousel"`.
- Skip link, visible focus rings, and semantic landmarks throughout.

## Content

Copy is drawn from the live site and Brand Kit v1.0. Testimonials (The Grange Golf Club,
Truevault) and team bios are verbatim from the client's existing site.

## Notes for the client

- The two supplied PDFs are image/vector-only Canva exports with no extractable text, so the
  build follows the **Brand Kit HTML**, which is more detailed and consistent with the live
  site. Worth a check that nothing in the PDFs contradicts it.
- The live site uses filled illustrative service icons; the brand kit specifies *line icons
  in Cheeks Pink, single weight, rounded caps*. This build follows the brand kit. Easy to
  swap if the client prefers the illustrated set — drop them into `public/brand/`.
- Logo vector originals (EPS/SVG) are still to be sourced; the lockup and mark here are the
  PNGs from the brand kit. A transparent lockup was derived by alpha-keying the flat
  charcoal ground.
