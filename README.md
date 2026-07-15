# Landing oficial do Rumo Pragas

Site estático de produto, suporte, privacidade, termos e exclusão de dados do
Rumo Pragas. A fonte de produção é este repositório,
`manoelgiansante/rumo-pragas-landing`, integrado ao projeto Vercel
`rumo-pragas-landing` e publicado em `https://pragas.agrorumo.com`.

## Escopo e arquitetura

- Astro 6, Tailwind CSS 4 e TypeScript, com saída totalmente estática.
- Nenhuma API própria, formulário público ou endpoint CAPI; o produto entregue é
  um artefato estático. A hospedagem ainda processa metadados técnicos essenciais
  de cada requisição para entregar e proteger o site, conforme a política pública.
- Meta Pixel e Google Analytics opcionais, carregados somente após consentimento
  positivo e revogáveis na mesma sessão.
- Playwright em Chromium, Firefox e WebKit, incluindo perfis móveis.
- Lighthouse CI com gates de performance, acessibilidade, boas práticas e SEO.
- Headers de segurança e redirects declarados em `vercel.json`.

## Ambiente local

Requer Node 22.x (CI em 22.22.3 e Vercel na versão 22.x mais recente) e pnpm 11.13.0.

```bash
corepack pnpm@11.13.0 install --frozen-lockfile
pnpm test
pnpm audit --audit-level moderate
```

Para auditoria local de Lighthouse, depois do build:

```bash
pnpm dlx @lhci/cli@0.15.1 autorun
```

Os únicos valores configuráveis da landing estão documentados em
`.env.example`. Eles são identificadores públicos; não adicione tokens, chaves
ou credenciais ao repositório. Não há fallback de medição: cada ambiente carrega
Meta Pixel ou GA4 somente quando `PUBLIC_FB_PIXEL_ID` ou `PUBLIC_GA4_ID` estiver
explicitamente configurado nele.

## Estrutura

```text
src/components/       componentes Astro estáticos
src/layouts/           shell HTML, metadados e consentimento
src/pages/             home, suporte e páginas legais
src/styles/            design system e estilos globais
public/                identidade, scripts, associações e metadados públicos
e2e/                   regressões funcionais e de claims
scripts/               gates de conteúdo verificável
docs/                  evidências de ativos e segurança
.github/workflows/     CI de navegador e Lighthouse
```

## Gate obrigatório de preview e produção

Antes de qualquer deploy, confirme que `git remote get-url origin` aponta para
`manoelgiansante/rumo-pragas-landing`, que a branch de produção é `main` e que o
projeto Vercel vinculado é `rumo-pragas-landing` (`prj_gUA98GLz8Lst0WZo6B9m6JpFyHQ9`),
responsável por `pragas.agrorumo.com`. Um checkout sem `.vercel/project.json`
validado não está autorizado a publicar. O repositório
`manoelgiansante/rumo-pragas-landing-nextjs` e cópias em monorepos não são fontes
de deploy deste domínio.

Pull requests podem gerar preview reversível. Publicação no domínio de produção
exige o gate operacional explícito do projeto; este repositório não contém um
comando de deploy automático ou uma instrução para contornar esse gate.

Antes do próximo preview, uma ação externa nas configurações Vercel deve:

- cadastrar explicitamente os identificadores públicos `PUBLIC_FB_PIXEL_ID` e/ou
  `PUBLIC_GA4_ID` nos ambientes em que a medição consentida deve operar;
- revisar e remover, depois de confirmar que nenhum outro projeto os consome, os
  nomes legados `SENTRY_DSN`, `FB_CAPI_ACCESS_TOKEN`, `FB_PIXEL_ID` e
  `PUBLIC_META_PIXEL_ID`, que esta landing estática não lê;
- manter o gate operacional de produção `[DEPLOY_PROD]` e inspecionar um preview
  antes da promoção. Essas mudanças de configuração não foram executadas nesta
  auditoria porque alteram diretamente os ambientes hospedados.

## Critérios de lançamento

- `pnpm check`, gate de claims, build e testes E2E aprovados.
- Lighthouse dentro dos limites de `.lighthouserc.json`.
- auditoria com o cliente pnpm 11.13.0 sem achado alto ou moderado.
- Links das lojas, textos legais, identidade e associações de plataforma revisados.
- Preview inspecionado antes de qualquer promoção para produção.

Consulte `docs/asset-inventory.md`, `docs/security-audit.md` e
`docs/performance-audit.md` para as evidências da auditoria de lançamento de
14 de julho de 2026.
