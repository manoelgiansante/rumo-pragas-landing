# Auditoria de segurança da landing

Data: 2026-07-14.

## Estado fechado

- `pnpm audit --audit-level moderate` com pnpm 11.13.0: aprovado, sem vulnerabilidade alta ou moderada. O projeto e o CI foram atualizados do pnpm 9 porque o npm retirou o endpoint legado de auditoria consumido por aquela versão.
- Astro foi atualizado de 6.1.6 para 6.4.8; o lock passou a usar Vite 7.3.6 e `devalue` 5.8.1, fechando os advisories de XSS, SSRF, bypass de `server.fs.deny` e DoS encontrados na auditoria.
- O site é gerado como conteúdo estático, sem endpoint de formulário ou API própria.
- CSP, HSTS, `frame-ancestors`, `nosniff`, política de permissões, COOP e CORP estão configurados no `vercel.json`.
- Meta Pixel e Google Analytics não são carregados antes da autorização; a revogação na mesma sessão envia os sinais de consentimento negado e é coberta por E2E.
- `security.txt` expõe somente o canal de reporte e não aponta para uma política inexistente.
- O pnpm 11 mantém `strictDepBuilds` ativo. `pnpm-workspace.yaml` autoriza o script de instalação necessário do `esbuild` e nega explicitamente o script nativo do `sharp`, que a landing não usa; qualquer novo pacote com script não revisado faz a instalação falhar.
- Os workflows têm permissões mínimas, checkout sem persistência de credencial e todas as GitHub Actions fixadas por SHA. O runtime é Node 22.22.3 e a instalação usa Corepack com pnpm 11.13.0 e lockfile imutável.
- O gate executa lint estático dos scripts públicos/configurações e validação estrutural de todo HTML gerado. O `gitleaks` examinou 57,04 MB do diretório final e os nove commits do histórico sem encontrar segredo.

## Não aplicável, com evidência

O audit mantém um advisory baixo em `esbuild` 0.27.7 para leitura de arquivo pelo servidor de desenvolvimento **somente no Windows**. A landing é publicada como build estático na Vercel, o CI executa em Ubuntu e o ambiente de desenvolvimento auditado é macOS. Astro 6.4.8 declara `esbuild ^0.27.3`, portanto forçar 0.28.x ultrapassaria o contrato de dependência. O servidor de desenvolvimento não é exposto em produção. O risco é, assim, não aplicável ao artefato de lançamento.
