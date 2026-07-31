/**
 * The seven services, and the single source of truth for them.
 *
 * Feeds the services index, the mega menu, the carousel, and the generated
 * /services/[slug] routes — add a service here and it appears everywhere.
 */
export const services = [
  {
    slug: 'marketing-strategy',
    title: 'Marketing Strategy',
    tag: 'Marketing your business starts with a strong plan.',
    short: 'Research, positioning & campaign planning',
    icon: '/icons/marketing-strategy.webp',
    summary:
      'Smart, data-led marketing strategies that drive real business outcomes. Market research, audience profiling, brand positioning and campaign strategy.',
    body: [
      `Smart, data-led marketing strategies that drive real business outcomes. We start by understanding your business properly — not just the brief, but the commercial reality behind it.`,
      `From there we build a plan that's considered, purposeful and tailored to you. Free from external pressures and agendas, our recommendations are always in your best interest: designed to deliver real impact and measurable results, not just activity.`,
    ],
    includes: ['Market research', 'Audience profiling', 'Brand positioning', 'Campaign strategy'],
  },
  {
    slug: 'digital-advertising',
    title: 'Digital Advertising',
    tag: 'Google & Meta advertising.',
    short: 'Google & Meta, driven by results',
    icon: '/icons/digital-advertising.webp',
    summary:
      'Performance-driven digital campaigns powered by Zib Digital, with a transparent dashboard so you can see exactly what your money returned.',
    body: [
      `We specialise in performance-driven digital campaigns powered by Zib Digital. Every campaign is built around what you actually need it to do — leads, bookings, sales — not vanity metrics.`,
      `Our production team prides itself on driving results with a transparent dashboard, so you can see exactly where the money went and what it returned.`,
    ],
    includes: ['Google Ads', 'Meta advertising', 'Transparent reporting', 'Ongoing optimisation'],
  },
  {
    slug: 'media-buying',
    title: 'Traditional Media Buying',
    tag: 'Radio, print, TV & outdoor.',
    short: 'Radio, print, TV & outdoor',
    icon: '/icons/media-buying.webp',
    summary:
      'Strategic planning and negotiation across metro and regional radio, television, print and outdoor placements.',
    body: [
      `Strategic planning and negotiation across traditional channels. Deep industry relationships mean we can plan and negotiate with confidence — and pass that value straight through to you.`,
      `We manage metro and regional radio, television, print and outdoor placements to maximise your branding reach.`,
    ],
    includes: ['Metro & regional radio', 'Television', 'Print', 'Outdoor placement'],
  },
  {
    slug: 'website-development',
    title: 'Website Development',
    tag: 'Website design, development and SEO.',
    short: 'Design, build & ongoing SEO',
    icon: '/icons/website-development.webp',
    summary:
      'Conversion-focused websites built with a partnering company — planning, design and ongoing SEO performance.',
    body: [
      `We work with a partnering company to build conversion-focused websites — sites built to do a job, not just to look good in a portfolio.`,
      `That covers planning, design and ongoing SEO performance, so the site keeps earning its keep long after launch.`,
    ],
    includes: ['Website design', 'Development', 'On-page SEO', 'Ongoing performance'],
  },
  {
    slug: 'graphic-design',
    title: 'Graphic Design',
    tag: 'Bringing your thoughts to life.',
    short: 'Branding, creative & production',
    icon: '/icons/graphic-design.webp',
    summary:
      'Strategic creative including branding, campaign assets, ad creative, video production, photography, and print and digital design.',
    body: [
      `Strategic creative including branding, campaign assets, ad creative, video production, photography, and print and digital design.`,
      `Creative that's tied to the strategy behind it — so every asset is working towards the same outcome rather than just looking the part.`,
    ],
    includes: ['Branding', 'Campaign & ad creative', 'Video & photography', 'Print & digital design'],
  },
  {
    slug: 'organic-social',
    title: 'Organic Social Media',
    tag: 'Facebook, Instagram, LinkedIn & more.',
    short: 'Content, community & growth',
    icon: '/icons/organic-social.webp',
    summary:
      'Consistent content planning, scheduling, community engagement, caption writing, growth strategy and detailed monthly reporting.',
    body: [
      `Consistent content planning, scheduling, community engagement, caption writing and growth strategy — the unglamorous consistency that actually builds an audience.`,
      `Backed by detailed monthly reporting, so you can see what's landing and what isn't.`,
    ],
    includes: ['Content planning', 'Community engagement', 'Growth strategy', 'Monthly reporting'],
  },
  {
    slug: 'partnership-management',
    title: 'Partnership Management',
    tag: 'Our network is wide.',
    short: 'Sponsorship, influencers & events',
    // TODO: the brand has six service icons; this one borrows Marketing
    // Strategy's until a seventh is supplied.
    icon: '/icons/marketing-strategy.webp',
    summary:
      'Brand partnerships, sponsorship negotiation, influencer collaborations and full event planning and execution.',
    body: [
      `Brand partnerships, sponsorship negotiation and influencer collaborations that put your brand where its audience already is.`,
      `Plus full event planning and execution to elevate brand exposure — handled end to end.`,
    ],
    includes: ['Brand partnerships', 'Sponsorship negotiation', 'Influencer collaboration', 'Event planning'],
  },
];

export const getService = (slug) => services.find((s) => s.slug === slug);
