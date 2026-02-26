// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://psicologiasindistancia.com',
  integrations: [react(), sitemap()],
  output: 'static',
  vite: {
    server: {
      allowedHosts: [
        '3439-79-147-39-202.ngrok-free.app',
        '1576-88-12-42-245.ngrok-free.app',
      ],
    },
  },
});
