/* ============================================================
   i18n.ts — dois mundos (PT / EN), formatos, blocos e as pontes.
   ============================================================ */

import { getCollection, type CollectionEntry } from 'astro:content';

export type Lang = 'pt' | 'en';
export type Formato = 'zine' | 'artigo' | 'post';
export type Post = CollectionEntry<'posts'>;
export type Bloco = CollectionEntry<'blocos'>;

export const UI = {
  pt: {
    eyebrow: 'diário aberto',
    titulo: 'Meio diário, meio blog, um pouco de zine, 100% de código',
    // a palavra realçada em fogo dentro do título:
    realce: 'código',
    sub: 'Aprendizados, opiniões, descobertas e pensamentos. Escrito à mão, impresso via git push.',
    marquee: 'Tentando forçar minha cabeça a se organizar de uma forma minimamente bonita.',
    recentes: 'o mais recente',
    tudo: 'tudo',
    vazio: 'Nada por aqui ainda. Em breve.',
    vazioFiltro: 'Nenhuma peça com esse filtro.',
    leitura: 'min de leitura',
    volta: '← início',
    outroMundo: 'English',
    bloco: 'bloco',
    nesteBloco: 'neste bloco',
    folhear: 'folhear (em breve)',
    paginas: 'páginas',
    lang: 'pt' as Lang,
  },
  en: {
    eyebrow: 'open diary',
    titulo: 'Part diary, part blog, a bit of zine, 100% code',
    realce: 'code',
    sub: 'Lessons, opinions, discoveries and thoughts. Written by hand, printed via git push.',
    marquee: 'Trying to force my head into some minimally beautiful order.',
    recentes: 'latest',
    tudo: 'all',
    vazio: 'Nothing here yet. Soon.',
    vazioFiltro: 'No pieces match this filter.',
    leitura: 'min read',
    volta: '← home',
    outroMundo: 'Português',
    bloco: 'block',
    nesteBloco: 'in this block',
    folhear: 'flip through (soon)',
    paginas: 'pages',
    lang: 'en' as Lang,
  },
} as const;

/** Rótulo do formato por idioma. */
export const FORMATO_LABEL: Record<Formato, { pt: string; en: string }> = {
  zine: { pt: 'zine', en: 'zine' },
  artigo: { pt: 'artigo', en: 'article' },
  post: { pt: 'post', en: 'note' },
};

/** slug limpo da peça, sem extensão. */
export function slugOf(post: Post): string {
  return post.id.replace(/\.mdx$/, '').replace(/^\//, '');
}

/** URL canônica: PT na raiz, EN sob /en/. */
export function urlOf(post: Post): string {
  const s = slugOf(post);
  return post.data.lang === 'en' ? `/en/posts/${s}` : `/posts/${s}`;
}

/** Home do mundo. */
export function homeOf(lang: Lang): string {
  return lang === 'en' ? '/en/' : '/';
}

/** URL da página de um bloco. */
export function blocoUrl(slug: string): string {
  return `/bloco/${slug}`;
}

/** Peças publicadas de um mundo, do mais novo ao mais antigo. */
export async function postsDoMundo(lang: Lang): Promise<Post[]> {
  const todos = await getCollection('posts', ({ data }) => !data.rascunho && data.lang === lang);
  return todos.sort((a, b) => b.data.data.getTime() - a.data.data.getTime());
}

/** Peças de um bloco (transversal aos mundos), do mais novo ao mais antigo. */
export async function postsDoBloco(slug: string): Promise<Post[]> {
  const todos = await getCollection('posts', ({ data }) => !data.rascunho && data.bloco === slug);
  return todos.sort((a, b) => b.data.data.getTime() - a.data.data.getTime());
}

/** Acha o gêmeo (mesmo `traducao`, idioma oposto), se existir. */
export async function gemeoDe(post: Post): Promise<Post | null> {
  if (!post.data.traducao) return null;
  const todos = await getCollection('posts', ({ data }) => !data.rascunho);
  const g = todos.find(
    (p) => p.data.traducao === post.data.traducao && p.data.lang !== post.data.lang,
  );
  return g ?? null;
}

/** Metadados de um bloco pelo slug. */
export async function blocoDe(slug: string): Promise<Bloco | null> {
  const blocos = await getCollection('blocos');
  return blocos.find((b) => b.id === slug) ?? null;
}

/** Tags únicas presentes num conjunto de peças, ordenadas. */
export function tagsDe(posts: Post[]): string[] {
  const set = new Set<string>();
  for (const p of posts) for (const t of p.data.tags) set.add(t);
  return [...set].sort((a, b) => a.localeCompare(b));
}

/** Estimativa de tempo de leitura a partir do corpo. */
export function tempoLeitura(texto: string): number {
  const palavras = texto.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(palavras / 200));
}
