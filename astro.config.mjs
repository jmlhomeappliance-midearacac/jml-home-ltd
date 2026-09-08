import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://www.jmlhome.ltd';

export default defineConfig({
  site: SITE,
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'ar', 'es', 'pt'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          fr: 'fr',
          ar: 'ar',
          es: 'es',
          pt: 'pt',
        },
      },
    }),
  ],
});
