---
dono: César
atualizado: 2026-07-07
status: em andamento
---

# M2 — espinha dorsal editorial

> M1 (esqueleto Astro «zine terroso») concluído e **deployado na Vercel** em 06/07. Ver patch-notes.

## Objetivo (1 frase)

Dar ao blog uma estrutura editorial de verdade: três formatos (zine/artigo/post), blocos que agrupam peças, filtros de navegação e o copy novo.

## Entregas
- [x] Formatos `zine | artigo | post` no schema, com selo por cor e layout próprio
- [x] Blocos (coletânea transversal aos mundos) + página `/bloco/<slug>`
- [x] Filtros client-side na home (por formato e por tag), com estado vazio
- [x] Copy novo (título com «código» em fogo, subtexto, marquee **por mundo** PT/EN)
- [x] Zine: layout de fallback (páginas empilhadas 2-col + selo «folhear em breve»); folheador real fica pro M3
- [x] Sangramento removido — imagem de artigo vira respiro limpo (sem o translate torto)
- [x] Jogo de exemplos-andaime (1 zine 4-pág + 1 artigo + 2 posts gêmeos + 1 bloco), build limpo

## Critérios de aceite

- [x] `npm run build` limpo — 7 páginas.
- [x] Filtro por formato/tag funciona (verificado: zine→só zine, post→só post, tudo→volta).
- [x] Cada formato com seu selo e layout; zine mostra páginas + «folhear em breve».
- [x] Página de bloco lista as peças certas (4, transversal: 2 pt + par gêmeo PT✳EN).
- [x] Copy novo no ar nos dois mundos; marquee correto por idioma; artigo sem torto.
- [x] Responsivo (verificado em mobile 375px) e sem hex fora dos tokens.

## Bloqueadores conhecidos

Nenhum.

## Próximo (M3)

Folheador de zine: spread de 2 páginas, vira-página (teclado/swipe), capa de entrada — consumindo o mesmo campo `paginas`. Depende de César fornecer páginas reais de zine.
