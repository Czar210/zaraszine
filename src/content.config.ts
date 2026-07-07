import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* Coleção de posts — a fonte da verdade do conteúdo é o git.
   Um post = um arquivo .mdx em src/content/posts/. */
const posts = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/posts' }),
  schema: z.object({
    /** Título — vira a semente da capa procedural. */
    titulo: z.string(),
    /** Chamada curta que aparece no card e no topo do post. */
    resumo: z.string(),
    /** Data de publicação (YYYY-MM-DD). */
    data: z.coerce.date(),
    /** Mundo do post: um post vive em UM idioma. */
    lang: z.enum(['pt', 'en']),
    /** Temas. O primeiro é o tema-âncora exibido no card. */
    tags: z.array(z.string()).default([]),
    /** Arte própria opcional: caminho em /public (ex.: /media/capa.jpg).
        Se presente, vence a capa procedural. */
    cover: z.string().optional(),
    /** Chave de tradução: dois posts com a mesma chave são gêmeos
        (um PT, um EN) e ganham o carimbo duplo PT✳EN. */
    traducao: z.string().optional(),
    /** Rascunho não entra no build de produção. */
    rascunho: z.boolean().default(false),
  }),
});

export const collections = { posts };
