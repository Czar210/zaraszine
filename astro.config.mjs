import { defineConfig, passthroughImageService } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://zaraszine.vercel.app',
  // Capas são SVG inline e assets estáticos de /public — sem otimização
  // de imagem, então dispensamos o sharp (dependência nativa pesada).
  image: { service: passthroughImageService() },
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [mdx()],
});
