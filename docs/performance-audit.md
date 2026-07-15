# Evidência de performance e compatibilidade

Data: 2026-07-14.

## Lighthouse CI

Comando: `corepack pnpm@11.13.0 dlx @lhci/cli@0.15.1 autorun`, após build
estático limpo.
Foram gerados 18 relatórios: três execuções para cada uma das seis rotas definidas
em `.lighthouserc.json`.

| Rotas | Performance | Acessibilidade | Boas práticas | SEO | LCP máximo | CLS máximo | TBT máximo |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home, privacidade, termos, suporte, excluir-conta e delete-account | 100 | 100 | 100 | 100 | 300 ms | 0,00046 | 0 ms |

O gate aplica mínimo de 90 em performance e boas práticas, 95 em acessibilidade
e SEO, LCP máximo de 2,5 s e CLS máximo de 0,1. A rota 404 permanece `noindex`
por projeto e, por isso, é coberta pelo E2E funcional em vez do gate de
indexabilidade.

As 18 execuções passaram todas as asserções. Os valores da tabela são os
piores resultados observados no conjunto (LCP bruto de 299,2921 ms e CLS de
0,000453204, arredondados para exibição).

## Navegadores

O Playwright cobre a home e rotas públicas em Chromium desktop, Firefox desktop,
WebKit desktop, Chrome móvel e Safari móvel. O ciclo final do candidato passou
101 casos, com 24 skips intencionais: as seis varreduras automatizadas WCAG com
axe-core rodam uma vez no Chromium e são omitidas nos outros quatro projetos. A
cobertura inclui consentimento e revogação na mesma sessão, retorno de foco,
navegação por teclado, estrutura semântica, menu móvel, ausência de overflow,
metadados, links, rotas legais, 404 e ausência de associações HTTPS não
implementadas pelo app.

Os relatórios brutos são artefatos efêmeros do CI e não são publicados em
armazenamento público; o workflow conserva os artefatos privados por sete dias.
