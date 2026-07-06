---
dono: César
atualizado: 2026-07-06
status: rascunho
---

# M1 — Fundação visual + esqueleto Astro

## Objetivo (1 frase)

Sair do zero pra um blog Astro navegável com a identidade visual fechada (tokens, tipografia, paleta) e 1 post de exemplo publicável via git.

## Entregas
- [ ] Esqueleto Astro 5 + MDX com content collection de posts (título, tags, data, idioma, capa)
- [ ] Arquivo de tokens de design (paleta confirmada visualmente + tipografia escolhida como fonte da verdade)
- [ ] Home em card/block layout interativo
- [ ] Template de post em Z-shape/assimétrico (texto + imagens intercaladas)
- [ ] Gerador procedural de capas em build (foto opcional + título + seed; override manual por frontmatter)
- [ ] Animações de entrada (View Transitions)
- [ ] 1 post de exemplo real (PT ou EN) rodando local + build limpo
- [ ] Deploy na Vercel

## Critérios de aceite

- `npm run build` limpo, sem warning de conteúdo.
- Post novo entra no blog só com um `.mdx` novo + push — zero passo manual extra.
- Capa gerada muda de forma determinística com o seed; imagem própria no frontmatter vence a procedural.
- Nenhuma cor/fonte fora do arquivo de tokens.

## Bloqueadores conhecidos

- Hexes da paleta são proposta inicial (ver CLAUDE.md §4) — confirmar visualmente antes de fechar os tokens.
- Tipografia ainda não escolhida — decisão de design a fechar no início do M1.
