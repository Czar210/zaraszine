---
dono: César
atualizado: 2026-07-06
---

# Log de decisões (cronológico)

<!-- Decisão tática = linha aqui. Decisão estrutural = ADR + linha aqui apontando. Mudança de NÍVEL do projeto = registrada aqui obrigatoriamente. -->

| Data | Decisão | Por quê | Ref |
|---|---|---|---|
| 2026-07-06 | Projeto criado no nível N2 | Ferramenta pessoal séria: sem dinheiro/PII/execução autônoma, mas vive anos com identidade própria | — |
| 2026-07-06 | Publicação só via git (sem admin/CMS) | Zero auth e superfície de ataque; César já vive no GitHub; admin empurraria pra N4 | CLAUDE.md §4 |
| 2026-07-06 | Stack: Astro 5 + MDX na Vercel | Content collections tipadas, i18n PT/EN, zero JS por padrão; N2 dispensa ADR | CLAUDE.md §2 |
| 2026-07-06 | Capas procedurais em build + override manual | Determinístico, sem ferramenta separada; arte própria vence via frontmatter | CLAUDE.md §2 |
| 2026-07-06 | Direção visual «zine terroso» aprovada | Fundo bistre #241811, tinta ouro-velho #D9A24B, fogo xanthous só em ação; Young Serif (display) + Literata (corpo) + Courier Prime (utilitária); sujeira punk só nas capas | direction board (artifact f331a4b8, rev.3) |
| 2026-07-06 | Carimbos de idioma na linha de meta, nunca na capa | Mais visível ao lado do tema; capa fica limpa; tigers-eye=PT, moss claro=EN, carimbo duplo PT✳EN pra post com gêmeo | board rev.2 |
| 2026-07-06 | Nome do blog: **ZarasZine** (`zaraszine.`) | Apelido Zaras + formato zine, aliterado, igual nos dois mundos; padrão «pessoa+ofício» à la Akita on Rails | board rev.3 |
| 2026-07-06 | Repo renomeado `zaraszine` e publicado público no GitHub | Coerência com o nome antes do primeiro código; README é a porta de entrada | Aval do Diretor |
| 2026-07-07 | Três formatos: **zine / artigo / post** | zine=gráfico folheável (1/mês), artigo=longo vertical (2/mês), post=curto quase comentário (vários/mês); cada um com física de leitura própria | M2, Aval total |
| 2026-07-07 | **Blocos** = coletânea temática transversal aos mundos | Dá personalidade: uma ideia grande respira em várias peças de formatos variados (PT+EN juntos) | M2 |
| 2026-07-07 | Sem guarda-chuva; navegação por **filtros** | «posts» virou só o formato curto; home é «o mais recente» + filtros por formato/tag; menos jargão | M2, decisão do Diretor |
| 2026-07-07 | Zine: **páginas soltas** (1 img/página), site emparelha | César fornece as páginas (Claude/upload) em /public/zines/<slug>/; conteúdo é dele, site é o leitor | M2; folheador = M3 |
| 2026-07-07 | Sangramento de imagem **removido** | O efeito era fraco (coluna 720 sufocava); drama visual migra pro formato zine, artigo fica limpo | M2 |
