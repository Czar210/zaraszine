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
