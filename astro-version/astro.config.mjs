import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://portfolio-arnaud.pages.dev',
  integrations: [mdx()],
  server: {
    port: 4321,
    host: true
  }
});
