# Sistema César 1.1 — o modelo inteiro em uma página

> Método de desenvolvimento de software com IA. Versão 1.1 (2026-07-06).
> Detalhes de cada peça: `vault/geral/metodo/`. Nenhum projeto começa do zero: copie esta pasta.

## Filosofia (herdada do 1.0, intacta)

A IA é interlocutora, não substituta. Dados reais, arquivo real, disco real — a IA nunca é fonte de verdade. Plano antes de código. Decisão estrutural é documentada, nunca silenciosa. Falha explícita — nada quebra em silêncio.

## Papéis

**Diretor (César)** decide e dá aval → **Planejador (IA)** desenha e escreve planos → **Programador (IA)** executa o plano aprovado, sem inventar → **QA (IA)** valida. Especialidades, com fronteiras guardadas por regras, não por confiança.

## As 6 peças do 1.1

1. **Vault** (`~/Documents/GitHub/vault`, aberto no Obsidian) — casa única do conhecimento transversal e do método. *Se vale pra mais de um projeto, mora no vault; o repo só tem ponteiro.* Pastas = escopo (`inbox/geral/projetos`); autoria e confiança = frontmatter (`autor`, `status`).
2. **Pasta-base** (esta pasta) — template versionado do método. Todo projeto novo começa copiando ela e declarando `metodo: 1.1 | nivel: N?` na linha 1 do CLAUDE.md. Melhoria no método = nova versão da pasta-base, propagada conscientemente.
3. **Níveis N1–N4** (`niveis.md`) — cerimônia proporcional a `max(importância, dano)`. N1 = meme (só CLAUDE.md). N2 = + speckit mínimo e teste no núcleo. N3 = + ADRs, CI, red team, destilação. N4 = tudo + autonomia estrita + telemetria + loop de verificação externo. Mudança de nível é decisão registrada.
4. **Autonomia A0/A1/A2** (`autonomia.md`) — A0 age e registra; A1 age e reporta pra revisão assíncrona; A2 bloqueia até "Aval total" (schema, auth, PII, dinheiro, push, arquitetura). Diário de bordo em `.speckit/tracking/diario.md` preserva o aprendizado do Diretor sem gargalo síncrono.
5. **Destilação** (`destilacao.md`) — garbage collection de contexto. CLAUDE.md ≤ ~200 linhas; patch-notes compactado a cada milestone; excedente transversal migra pro vault. Documentação que só cresce não é viva, é obesa.
6. **Modo evidência** (`modo-evidencia.md`) — em N4 sem ambiente de teste, o teste é evidência auditada: robô captura mapa de tela em vez de agir, IA audita, relatório HTML, aval, run real com prova pós-ação.

## Markdown vs HTML (`artefatos-html.md`)

**Md é o que o sistema lê e versiona; HTML é o que o César lê e decide em cima.** Planos pra aval (N3+), relatórios de evidência, digests do diário e retrospectivas viram páginas HTML — geradas do md, descartáveis, nunca fonte de verdade.

## Ritual de projeto novo

Ritualizado na skill **`/novo-projeto`** (canônica em `vault/geral/metodo/skills/`, instalada em `~/.claude/skills/`) — ela executa os passos abaixo, incluindo a entrevista de nível. Manual, se preferir:

1. Copie `pasta-base/` pro repo novo.
2. Preencha o CLAUDE.md: declare o nível (linha 1), stack, regras duras.
3. Primeiro commit: `M0: fundação documental`.
4. Crie a nota do projeto no vault (`projetos/<nome>/` com o template `projeto`).
5. N3+: primeira decisão estrutural já nasce como ADR.

## Fluxo obrigatório de execução (o coração, inalterado desde o 1.0)

1. Ler o plano aprovado e os bloqueadores (`.speckit/tracking/bugfixes.md` tem precedência absoluta).
2. Apresentar Implementation Plan com `[NEW]/[MODIFY]/[DELETE]` e critérios de aceite (N3+: como página HTML).
3. Classificar cada ação em A0/A1/A2. A2 aguarda **"Aval total"**. Ambiguidade = bloqueador.
4. Executar atômico. Confirmar tudo contra o disco antes de referenciar.
5. Testar conforme o nível. Sem teste = não entregue (N2+).
6. Atualizar `.speckit/` + diário. Red team antes de fechar área sensível (N3+).
