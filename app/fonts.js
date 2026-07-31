import localFont from 'next/font/local';

/**
 * Brand webfonts, self-hosted and fingerprinted by next/font.
 *
 * Latin subsets only — the brand's copy stays inside U+0000–00FF (which
 * covers accents like the é in Nestlé). next/font inlines the @font-face
 * rules and preloads them, so there's no third-party request and no FOUT.
 */
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

export const workSans = localFont({
  src: [{ path: '../public/fonts/worksans-var-latin.woff2', weight: '300 600', style: 'normal' }],
  variable: '--font-work-sans',
  display: 'swap',
});

export const jetbrainsMono = localFont({
  src: [{ path: '../public/fonts/jetbrainsmono-var-latin.woff2', weight: '400 500', style: 'normal' }],
  variable: '--font-jetbrains',
  display: 'swap',
});
