// @ts-check
import { defineConfig } from 'astro/config';

// Purely static site: no adapter, no server endpoints.
// Locally the site is served from "/". The GitHub Pages workflow sets
// SITE_URL=https://vinhht2703.github.io and BASE_PATH=/learning-everything.
export default defineConfig({
  site: process.env.SITE_URL || 'http://localhost:4321',
  base: process.env.BASE_PATH || '/',
  output: 'static',
  trailingSlash: 'ignore',
  i18n: {
    locales: ['en', 'vi'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
  markdown: {
    shikiConfig: { theme: 'github-dark' },
  },
});
