# zaraszine.

> Diário aberto do Zaras — **impresso em ouro sobre café.**
> *An open diary, printed in gold on coffee.*

Blog pessoal, bilíngue (PT/EN), sobre aprendizados e opiniões de engenharia. Escrito à mão, publicado por `git push`.

## A filosofia: o blog é só o blog

Sem admin, sem CMS, sem banco, sem login. Um post é um arquivo `.mdx` neste repositório; publicar é commitar e dar push — a Vercel builda o resto.

Isso é uma decisão de arquitetura, não preguiça: zero superfície de ataque, zero dependência de plataforma, e a fonte da verdade do conteúdo é o git. Se você está lendo isto no GitHub, está olhando o "banco de dados" inteiro do blog — histórico de edições incluso.

## Dois mundos

O blog existe em português e em inglês como **mundos separados**, não como tradução espelhada:

- Cada mundo lista só os posts do próprio idioma — nem todo post tem gêmeo; alguns nascem só em PT, outros só em EN.
- O idioma é carimbado na linha de meta de cada card, ao lado do tema: **PT** (tigers-eye), **EN** (moss) ou o carimbo duplo **PT✳EN** quando o post existe nas duas línguas — e aí um mundo linka o outro.

## Identidade visual: «zine terroso»

Grid suíço na estrutura, terra na cor, zine nas capas. A ousadia mora num lugar só: as capas gritam, o resto da página fica quieto.

| Token | Hex | Cargo |
|---|---|---|
| bistre profundo | `#241811` | o chão — fundo de tudo |
| bistre | `#3D2B1F` | superfícies e cards |
| ouro-velho | `#D9A24B` | a tinta dos títulos |
| ouro-claro | `#E9C289` | texto corrido |
| xanthous | `#FFB627` | fogo: links e ação, usado com avareza |
| tigers-eye | `#E08D3C` | carimbo PT |
| moss claro | `#93A757` | carimbo EN (derivado do dark-moss `#4A5D23`) |
| sunset | `#FAD6A5` | papel: capas e fita |

Três vozes tipográficas, três cargos: **Young Serif** é a personalidade (display), **Literata** é a leitura longa do diário (corpo), **Courier Prime** é a máquina de escrever do zine (datas, tags, carimbos).

Nenhuma cor ou fonte existe fora do arquivo de tokens — hardcode é bug.

### Capas procedurais

Cada post ganha capa gerada no build: `hash(título) + seed → capa determinística` na paleta, com cara de recorte de zine — formas, meio-tom, fita, grão. Recarregou, é a mesma. Quer arte própria num post? Aponta a imagem no frontmatter e ela vence a procedural.

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | [Astro 5](https://astro.build) + MDX (content collections tipadas) |
| Conteúdo | arquivos `.mdx` versionados neste repo |
| Capas | geração procedural em build |
| Deploy | Vercel (site estático) |

## Rodando local

```sh
npm install
npm run dev       # dev server
npm run build     # build de produção (gera as capas)
npm run preview   # servir o build
```

> Comandos valem a partir do M1 — ver status abaixo.

## Status

- [x] **M0** — fundação documental (06/07/2026)
- [x] Direção visual «zine terroso» + nome fechados (06/07/2026)
- [ ] **M1** — esqueleto Astro, tokens, gerador de capas, primeiro post, deploy *(em construção)*

## Sobre o método

Este repo segue o método pessoal de trabalho humano+IA do autor (César 1.1): `CLAUDE.md` é o contrato da IA no projeto — regras duras, autonomia, fluxo — e `.speckit/` é o estado vivo (plano atual, log de decisões, diário de bordo). Nível declarado: N2 (ferramenta pessoal séria). As decisões de design têm data e porquê em [`.speckit/tracking/decisions.md`](.speckit/tracking/decisions.md).

Os textos dos posts são meus e só meus — IA não escreve, não edita e não apaga conteúdo aqui.

---

**EN — tl;dr:** ZarasZine is my personal bilingual blog — an open diary of engineering lessons and opinions. No CMS, no admin panel: posts are `.mdx` files in this repo, published by `git push`. Portuguese and English live as separate worlds with their own posts (language stamps: PT / EN / PT✳EN). Zine-style procedural covers are generated at build time from each post's title. Astro 5 + MDX, deployed on Vercel. Under construction (M1).
