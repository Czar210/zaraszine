# .speckit/ — estado vivo do projeto (estrutura canônica, método 1.1)

Esta é a estrutura ÚNICA do speckit. Os dialetos antigos (Metis `plano_atual.md`, Atlas `planning/`, neo-hub `docs/planos/`) convergem pra cá; projeto migrado declara `metodo: 1.1` no CLAUDE.md.

```
.speckit/
├── product/
│   └── vision.md          # visão do produto (por que existe, pra quem)
├── architecture/
│   └── adr/               # ADRs imutáveis (N3+); ADR-0000 é o template
├── plans/
│   ├── current.md         # a sprint/milestone atual — a IA lê ISTO primeiro
│   ├── backlog.md         # priorizado
│   └── done.md            # histórico compactado
└── tracking/
    ├── patch-notes.md     # mudanças do milestone atual (compacta no fechamento)
    ├── bugfixes.md        # bloqueadores — precedência absoluta sobre features
    ├── decisions.md       # log cronológico (inclui mudanças de nível)
    └── diario.md          # uma linha por ação A0/A1 da IA
```

## Regras de ouro (herdadas do speckit-template, mantidas)

- Toda spec tem dono e data (`dono:`, `atualizado:`, `status:`).
- Spec obsoleta vai pra `_archive/` com motivo — nunca delete.
- ADR é imutável após `status: ativo`; mudança = novo ADR com `supersedes`.
- `current.md` terminou → compacta e vai pra `done.md`.
- Subpasta nova só com 3+ arquivos.

## O que cada nível usa

- **N1:** speckit inteiro dispensado.
- **N2:** só `plans/current.md` + `tracking/patch-notes.md` + `tracking/diario.md`.
- **N3+:** tudo, incluindo ADRs e o ritual de destilação no fechamento de milestone.
