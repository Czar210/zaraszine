> metodo: 1.1 | nivel: N2 | vault: C:\Users\cesar\Documents\GitHub\vault (caminho canônico em ~/.claude/metodo-config.md)

# CLAUDE.md — ZarasZine

> Leia antes de qualquer ação. O modelo completo do método está em `COMO-FUNCIONA.md` (nesta pasta) e detalhado em `vault/geral/metodo/`. **Teto deste arquivo: ~200 linhas** — o que é transversal migra pro vault e vira link.

## 1. O que é

**ZarasZine** (wordmark `zaraszine.`) — blog pessoal do César/Zaras: um diário aberto, editorial e extremamente bonito, para anotar aprendizados e opiniões em português e inglês. O blog é só o blog: sem admin, sem auth, sem banco; publicar um post = commitar um arquivo MDX e dar push (a Vercel builda). É ferramenta pessoal séria com identidade visual própria (N2): não mexe com dinheiro nem PII, mas vai viver anos.

## 2. Stack canônica (source of truth)

| Camada | Tecnologia | Observação |
|---|---|---|
| Framework | Astro 5 + MDX | content collections tipadas (título, tags, data, capa, idioma) |
| Conteúdo | arquivos `.mdx` no repo | fonte da verdade dos posts é o git — nunca CMS externo |
| Capas | geração procedural em build | foto opcional + título + seed → capa na paleta; imagem própria no frontmatter vence |
| Design tokens | arquivo de tokens versionado | paleta + tipografia = fonte da verdade (ver §4) |
| Deploy | Vercel (estático) | push na `main` = deploy |

Mudança de stack = ADR + Aval total (A2).

## 3. Como rodar

```
npm install       # setup
npm run dev       # dev server local
npm run build     # build de produção (gera capas procedurais)
npm run preview   # servir o build localmente
```

(Comandos padrão Astro — valem a partir do M1, quando o esqueleto for criado.)

## 4. Regras duras do projeto

- **Publicação só via git.** Nunca adicionar admin, auth, CMS ou escrita em runtime — isso mudaria o nível do projeto e exige re-declaração.
- **Zero dados de terceiros.** Sem formulários, sem comentários com banco, sem analytics que colete PII.
- **Paleta e tipografia vivem nos tokens.** Cor ou fonte hardcoded fora do arquivo de tokens é bug. Base canônica: tigers-eye `#E08D3C` · xanthous `#FFB627` · sunset `#FAD6A5` · dark-moss-green `#4A5D23` · bistre `#3D2B1F`. Direção «zine terroso» aprovada 06/07/2026 define os cargos (fundo `#241811`, tinta `#D9A24B`, texto `#E9C289`, fogo = xanthous só em ação, carimbos PT/EN, papel = sunset) e as 3 vozes: Young Serif (display) + Literata (corpo) + Courier Prime (utilitária). O arquivo de tokens do M1 materializa isso; detalhes em `.speckit/tracking/decisions.md`.
- **Conteúdo é do César.** A IA nunca cria, edita ou apaga post sem pedido explícito.
- **URL de post publicado é imutável.** Mudança de permalink/slug publicado = A2.

## 5. Autonomia neste projeto

Padrão do método (`vault/geral/metodo/autonomia.md`), com ajustes:
- **A2 adicional neste projeto:** mudar tokens de design (paleta/tipografia); tocar em qualquer post publicado; mudar slugs/estrutura de URL.
- **A0 liberado neste projeto:** ajustes visuais menores em componentes (espaçamento, easing de animação, responsivo) que não alterem os tokens; correção de typo em código e estilos (não em posts).

## 6. Ponteiros pro vault

- Contexto de negócio: `vault/projetos/blog-cesar/`
- APIs externas usadas: nenhuma (estático puro).
- Padrões aplicados: — (preencher quando o primeiro padrão do vault for usado).

## 7. Fluxo obrigatório

1. Ler `.speckit/plans/current.md` (bloqueadores primeiro).
2. Implementation Plan com `[NEW]/[MODIFY]/[DELETE]` + critérios de aceite. Classificar A0/A1/A2.
3. A2 → aguardar **"Aval total"**. Ambiguidade = bloqueador.
4. Executar atômico; confirmar tudo contra o disco.
5. Testar conforme o nível.
6. Atualizar `.speckit/` + `tracking/diario.md`.

### NUNCA
- Declarar "concluído" sem evidência de teste rodando.
- Referenciar arquivo hipotético — ler o disco.
- Adicionar feature/refactor não solicitado.
- `git push` sem autorização explícita.
- Duplicar no repo o que já existe no vault.
