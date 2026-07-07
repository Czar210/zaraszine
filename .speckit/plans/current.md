---
dono: César
atualizado: 2026-07-06
status: em andamento
---

# M1 — Fundação visual + esqueleto Astro

## Objetivo (1 frase)

Sair do zero pra um blog Astro navegável com a identidade visual fechada (tokens, tipografia, paleta) e 1 post de exemplo publicável via git.

## Entregas
- [x] Esqueleto Astro 5 + MDX com content collection de posts (titulo, resumo, data, lang, tags, cover?, traducao?, rascunho)
- [x] Arquivo de tokens de design (`src/styles/tokens.css` — cargos e vozes «zine terroso»)
- [x] Home em card/block layout interativo (`HomeView`, dois mundos PT/EN)
- [x] Template de post em Z-shape/assimétrico (imagens sangram e alternam de lado via `rehypeFiguras`)
- [x] Gerador procedural de capas em build (`src/lib/cover.ts`, SVG determinístico; override por frontmatter)
- [x] Animações de entrada (View Transitions + reveal, reduced-motion respeitado)
- [x] Posts de exemplo (andaimes descartáveis: par gêmeo PT/EN + um só-PT) rodando local + build limpo
- [ ] **Deploy na Vercel** ← única pendência do M1 (é do Diretor: conectar repo na Vercel)

## Critérios de aceite

- [x] `npm run build` limpo — 5 páginas geradas, zero warning.
- [x] Post novo entra só com um `.mdx` novo — provado com 3 andaimes.
- [x] Capa determinística (HTML idêntico byte-a-byte entre 2 builds); imagem própria (`cover`) vence.
- [x] Nenhuma cor/fonte fora dos tokens — auditado; 2 exceções documentadas (PAL do cover.ts, theme-color meta).
- [x] Switch PT↔EN funciona; post com `traducao` mostra PT✳EN e o switch pula pro gêmeo.

## Evidências (2026-07-06, local)

- Build: `5 page(s) built`, sem erro. Determinismo: `sha1` idêntico em 2 builds do post.
- Verificado no dev (screenshots + medições): hero, cards com carimbo na meta, post Z-shape (fig-r 397→1024 / fig-l 241→868 em 1280px), home EN com 1 card PT✳EN, switch de gêmeo → `/en/posts/andaime-en`.

## Bloqueadores conhecidos

Nenhum.
