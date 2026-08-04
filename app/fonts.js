import localFont from 'next/font/local';

/**
 * Brand webfonts, self-hosted and fingerprinted by next/font.
 *
 * Two faces, per the brand guidelines: Cormorant Garamond carries the
 * display voice (set in italic, the way the wordmark and the guideline
 * headlines are drawn), Poppins carries body copy, UI and the wide-tracked
 * uppercase labels.
 *
 * Latin subsets only — the brand's copy stays inside U+0000–00FF (which
 * covers accents like the é in Nestlé). next/font inlines the @font-face
 * rules and preloads them, so there's no third-party request and no FOUT.
 */
export const cormorant = localFont({
  src: [
    { path: '../public/fonts/cormorant-var-latin.woff2', weight: '300 700', style: 'normal' },
    { path: '../public/fonts/cormorant-var-italic-latin.woff2', weight: '300 700', style: 'italic' },
  ],
  variable: '--font-cormorant',
  display: 'swap',
});

export const poppins = localFont({
  src: [
    { path: '../public/fonts/poppins-400-latin.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/poppins-500-latin.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/poppins-600-latin.woff2', weight: '600', style: 'normal' },
    { path: '../public/fonts/poppins-700-latin.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-poppins',
  display: 'swap',
});
