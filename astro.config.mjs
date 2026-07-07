import { defineConfig, passthroughImageService } from 'astro/config';
import mdx from '@astrojs/mdx';

/* Marca cada imagem-de-bloco (parágrafo só com <img>) alternadamente
   como figura à direita/esquerda — é o Z-shape do corpo, determinístico
   pela ORDEM das imagens (não pela paridade dos parágrafos de texto). */
function rehypeFiguras() {
  return (tree) => {
    let i = 0;
    const walk = (node) => {
      if (!node.children) return;
      for (const child of node.children) {
        if (child.tagName === 'p') {
          const els = child.children.filter((c) => c.type === 'element');
          if (els.length === 1 && els[0].tagName === 'img') {
            child.properties = child.properties || {};
            child.properties.className = [i % 2 === 0 ? 'fig-r' : 'fig-l'];
            i++;
          }
        }
        walk(child);
      }
    };
    walk(tree);
  };
}

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
  markdown: {
    rehypePlugins: [rehypeFiguras],
  },
  integrations: [mdx()],
});
