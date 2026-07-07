---
dono: IA (escreve) / César (lê)
atualizado: 2026-07-06
---

# Patch notes — milestone atual

<!-- Mudanças observáveis + aprendizados, não só "o que". Teto: 1 milestone. No fechamento, compacta pra plans/done.md e arquiva o bruto em _archive/. -->

## M1 — esqueleto Astro (2026-07-06)

**O que passou a existir:** blog Astro 5 + MDX navegável, dois mundos PT (`/`) e EN (`/en/`), capas procedurais em SVG, tema «zine terroso» inteiro em tokens. Build limpo (5 páginas), rodado e verificado local.

**Decisões técnicas tomadas na execução:**
- **Sem `sharp`.** O build quebrou pedindo a dependência nativa `sharp` (image service padrão). Como só uso SVG inline e assets de `/public` (nenhum `image()`), troquei por `passthroughImageService()` — build mais leve e sem dependência nativa (melhor pra Vercel também).
- **Zigzag do corpo via plugin, não CSS puro.** A primeira tentativa (`p:nth-of-type(odd/even)`) alternava pela paridade dos parágrafos de texto, não das imagens — as duas figuras caíram no mesmo lado. Corrigido com um rehype plugin (`rehypeFiguras`) que marca cada imagem-de-bloco alternadamente `fig-r`/`fig-l` pela ORDEM das imagens. Determinístico.
- **Pegadinha de scoping do Astro.** `.prose :global(p.fig-r) img` não aplicava: o `img` fora do `:global()` ganha o atributo de escopo, mas a imagem vem do markdown global e não o tem. Alvo tem que ficar DENTRO do `:global(...)` → `.prose :global(p.fig-r img)`.

**Aprendizado transversal:** em Astro, qualquer estilo que mira conteúdo renderizado de markdown/MDX precisa do alvo inteiro dentro de `:global()`, senão o scoping mata o seletor silenciosamente.

**Pendência:** deploy na Vercel (conectar o repo — ação do Diretor). → feito pelo Diretor via dashboard.

### Fix — switch de idioma (2026-07-06, pós-deploy)

**Sintoma (achado pelo César no site no ar):** no mundo EN o switch mostrava "PT PT" nos dois lados, com o iluminado no lado errado; pra voltar pro PT tinha que clicar no "PT" que estava na posição do EN.

**Causa:** o Masthead tinha um slot esquerdo fixo em "PT" e um slot direito dinâmico (`lang==='pt' ? 'EN' : 'PT'`). No mundo EN os dois viravam "PT" e o realce caía no link, não na posição do idioma.

**Correção:** os dois slots agora são fixos — PT à esquerda, EN à direita. O idioma do mundo atual vira `<span>` estático aceso (com `aria-current`); o outro é `<a>` pro mundo oposto. Verificado nos dois mundos (PT acende tigers-eye à esquerda; EN acende moss à direita).

## M2 — espinha dorsal editorial (2026-07-07)

**O que passou a existir:** o blog virou uma publicação com estrutura. Três **formatos** (zine/artigo/post), cada um com selo colorido e física de leitura própria; **blocos** que agrupam peças por tema (transversais aos dois mundos); **filtros** por formato e tag na home; e o **copy novo** (título com «código» em fogo, subtexto, marquee agora por-mundo). Build limpo (7 páginas), verificado local + mobile.

**Formatos:**
- **zine** — gráfica, folheável. No M2 é fallback: capa + páginas empilhadas 2-col + selo «folhear (em breve)». O folheador de spread é M3. As páginas são imagens soltas do César em `/public/zines/<slug>/`.
- **artigo** — longo, capa hero, corpo espaçoso.
- **post** — curto, sem capa hero, quase um comentário. (label EN = «note».)

**Decisões de design na execução:**
- **O sangramento morreu.** Estava fraco de origem: a coluna de leitura (720px) sufocava o efeito — a imagem escapava só ~24px, lia como torto, não como sangrar. Em vez de forçar, migrei o drama visual pro formato zine (onde faz sentido) e no artigo a imagem virou respiro limpo. Removi o rehypeFiguras (código que já não servia).
- **Sem substantivo guarda-chuva.** «posts» agora é um formato, não o conjunto. A home é «o mais recente» e os filtros cortam. Menos jargão.
- **Bloco é transversal aos mundos.** Uma página `/bloco/<slug>` (em PT no M2) lista PT e EN juntos, cada card com seu carimbo — provado com o par gêmeo aparecendo lado a lado.

**Filtros:** client-side puro (mostra/esconde por `data-formato`/`data-tags`), reatados em `astro:page-load` pra sobreviver às View Transitions. Sem JS, a home degrada mostrando tudo.

## M3 — folheador de zine (2026-07-07)

**O que passou a existir:** a zine deixou de ser páginas empilhadas e virou um **leitor que se folheia**. Em desktop, spread de 2 páginas com a folha virando sobre a lombada em 3D (frente/verso com `backface-visibility`); em mobile, 1 página por vez. Navega por botões, teclado ← → e swipe. Progressive enhancement: sem JS ou com reduced-motion, cai no empilhado do M2.

**Modelo da virada (a parte que podia bugar):** ao avançar do spread i, a folha ocupa a metade direita, gira sobre a lombada esquerda (`transform-origin: left center`, `rotateY 0→-180`), com frente = página direita atual e verso = nova página esquerda; a nova direita é revelada embaixo. Ao voltar, espelhado na metade esquerda. Verificado por dado: frente/verso e páginas reveladas batem em ambas as direções.

**Bug pego na verificação:** o fallback empilhado não sumia com JS. Causa clássica: o atributo HTML `hidden` perde pro `.empilhado { display: grid }` (o `[hidden]{display:none}` do user-agent tem especificidade menor). Corrigido com `.empilhado[hidden] { display: none; }` explícito.

**Aprendizado transversal:** sempre que um elemento tem `display` próprio no CSS, o atributo `hidden` precisa de uma regra `[hidden]` própria pra vencer — senão fica "escondido" no DOM mas visível na tela.
