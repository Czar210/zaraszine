import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* Peças do blog — a fonte da verdade do conteúdo é o git.
   Uma peça = um arquivo .mdx em src/content/posts/. Três formatos:
   - zine:   gráfico, imagens reais, lido em spread horizontal (folheador = M3)
   - artigo: longo, muita escrita, vertical
   - post:   curto, quase um comentário, vertical */
const posts = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/posts' }),
  schema: z.object({
    /** Título — vira a semente da capa procedural. */
    titulo: z.string(),
    /** Chamada curta que aparece no card e no topo. */
    resumo: z.string(),
    /** Data de publicação (YYYY-MM-DD). */
    data: z.coerce.date(),
    /** Mundo da peça: vive em UM idioma. */
    lang: z.enum(['pt', 'en']),
    /** Formato — define a física de leitura e o selo. */
    formato: z.enum(['zine', 'artigo', 'post']).default('post'),
    /** Temas. O primeiro é o tema-âncora exibido no card. */
    tags: z.array(z.string()).default([]),
    /** Slug do bloco a que a peça pertence (coletânea temática). */
    bloco: z.string().optional(),
    /** Arte própria opcional (caminho em /public). Vence a capa procedural. */
    cover: z.string().optional(),
    /** Só zine: páginas soltas em ordem (caminhos em /public).
        No M2 são empilhadas; no M3 viram spread folheável. */
    paginas: z.array(z.string()).optional(),
    /** Chave de tradução: duas peças com a mesma chave são gêmeas → PT✳EN. */
    traducao: z.string().optional(),
    /** Rascunho não entra no build de produção. */
    rascunho: z.boolean().default(false),
  }),
});

/* Blocos — coletâneas temáticas que agrupam peças de qualquer formato.
   Um bloco é transversal aos dois mundos. */
const blocos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blocos' }),
  schema: z.object({
    titulo: z.string(),
    resumo: z.string(),
    cover: z.string().optional(),
  }),
});

export const collections = { posts, blocos };
