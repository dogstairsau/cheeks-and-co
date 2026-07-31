import { defineConfig } from 'vite';

export default defineConfig({
  // GitHub Pages serves from /<repo>/, so the CI build passes BASE_PATH.
  // Local dev and custom-domain deploys stay at the root.
  base: process.env.BASE_PATH || '/',
  server: { port: 5173, host: true },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 2048,
  },
});
