/* ============================================================
   i18n.ts — dois mundos (PT / EN) e a ponte entre gêmeos.
   ============================================================ */

import { getCollection, type CollectionEntry } from 'astro:content';

export type Lang = 'pt' | 'en';
export type Post = CollectionEntry<'posts'>;

export const UI = {
  pt: {
    home: 'zaraszine.',
    tese: 'Um diário aberto, impresso em ouro sobre café.',
    todos: 'todos os posts',
    vazio: 'Ainda não há posts neste mundo. Em breve.',
    outroMundo: 'English',
    leitura: 'min de leitura',
    volta: '← todos os posts',
    lang: 'pt' as Lang,
  },
  en: {
    home: 'zaraszine.',
    tese: 'An open diary, printed in gold on coffee.',
    todos: 'all posts',
    vazio: 'No posts in this world yet. Soon.',
    outroMundo: 'Português',
    leitura: 'min read',
    volta: '← all posts',
    lang: 'en' as Lang,
  },
} as const;

/** slug limpo do post, sem o idioma. */
export function slugOf(post: Post): string {
  return post.id.replace(/\.mdx$/, '').replace(/^\//, '');
}

/** URL canônica do post: PT na raiz, EN sob /en/. */
export function urlOf(post: Post): string {
  const s = slugOf(post);
  return post.data.lang === 'en' ? `/en/posts/${s}` : `/posts/${s}`;
}

/** Home do mundo. */
export function homeOf(lang: Lang): string {
  return lang === 'en' ? '/en/' : '/';
}

/** Posts publicados de um mundo, do mais novo ao mais antigo. */
export async function postsDoMundo(lang: Lang): Promise<Post[]> {
  const todos = await getCollection('posts', ({ data }) => !data.rascunho && data.lang === lang);
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

/** Estimativa de tempo de leitura a partir do corpo renderizado. */
export function tempoLeitura(texto: string): number {
  const palavras = texto.trim().split(/\s+/).length;
  return Math.max(1, Math.round(palavras / 200));
}
