// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://pragas.agrorumo.com',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/privacy/') && !page.endsWith('/terms/'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  compressHTML: true,
  build: {
    inlineStylesheets: 'always',
  },
});
