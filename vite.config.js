import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));

/**
 * Minimal HTML partials.
 *
 * `<!--#include partials/nav.html -->` is replaced at build and dev time, so
 * the nav, footer and sign-off live in one file instead of being copy-pasted
 * across five pages. Nested includes are resolved too.
 *
 * Each page sets `data-page="about"` on <body>; `data-nav-page` markers inside
 * a partial become `aria-current="page"` on the matching link.
 */
function htmlPartials() {
  const INCLUDE = /<!--#include\s+([\w./-]+)\s*-->/g;

  const expand = (html, depth = 0) => {
    if (depth > 5) throw new Error('partials: include nesting too deep');
    return html.replace(INCLUDE, (_, file) =>
      expand(readFileSync(resolve(root, file), 'utf8'), depth + 1)
    );
  };

  return {
    name: 'html-partials',
    enforce: 'pre',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const out = expand(html);
        const page = /<body[^>]*data-page="([\w-]+)"/.exec(out)?.[1];
        // Mark the active nav link for the page currently being built.
        return out.replace(
          /\s+data-nav-page="([\w-]+)"/g,
          (_, name) => (name === page ? ' aria-current="page"' : '')
        );
      },
    },
    handleHotUpdate({ file, server }) {
      if (file.includes('/partials/')) server.ws.send({ type: 'full-reload' });
    },
  };
}

export default defineConfig({
  // GitHub Pages serves from /<repo>/, so the CI build passes BASE_PATH.
  // Local dev and custom-domain deploys stay at the root.
  base: process.env.BASE_PATH || '/',
  plugins: [htmlPartials()],
  server: { port: 5173, host: true },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 2048,
    rollupOptions: {
      input: {
        home: resolve(root, 'index.html'),
        about: resolve(root, 'about.html'),
        services: resolve(root, 'services.html'),
        service: resolve(root, 'service.html'),
        contact: resolve(root, 'contact.html'),
      },
    },
  },
});
