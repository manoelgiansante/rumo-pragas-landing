# Inventário de ativos públicos — Rumo Pragas

Data da auditoria: 2026-07-14.

## Publicados no build

| Ativo | Uso | Estado |
| --- | --- | --- |
| `favicon.ico`, `favicon-32.png`, `favicon.png`, `apple-touch-icon.png`, `app-icon-64.webp`, `app-icon-192.png`, `app-icon-512.png` | Identidade canônica do aplicativo no site, atalhos e manifesto | Derivados mecanicamente do ícone 1024 px do app, publicados e testados; a versão WebP de 64 px evita transferir um ativo superdimensionado no cabeçalho e rodapé |
| `images/rumo-pragas-social.png` | Open Graph/Twitter | Cópia byte a byte do feature graphic canônico próprio em `expo-app/store-assets/android/feature-graphic.png`, gerado do SVG versionado do projeto; sem hardware, pessoa ou ativo de terceiro; SHA-256 `a484664b7189e15ec5587bcf7135d698c2c580172f2177ca67a6154f1c82f6c7`; publicado e testado |
| `store-badges/app-store-pt-br.svg` | Link para a App Store | Arte oficial pt-BR fornecida pela [Apple Marketing Tools](https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/pt-br?size=250x83), sem modificação; SHA-256 `0e9291a9c654e479762b75b51dd94a150af6fab76390a79cb2218cdc8f6cc893` |
| `store-badges/google-play-pt-br.png`, `google-play-pt-br-155.png`, `google-play-pt-br-310.png` | Link para o Google Play | Arte oficial pt-BR fornecida pelo [Google Play](https://play.google.com/intl/en_us/badges/static/images/badges/pt-br_badge_web_generic.png), preservada sem modificação no arquivo-base (SHA-256 `e1ad5e03f636d94b05448c1f156e39b012b9e1d772b730d9e27d066695531a6b`) e redimensionada proporcionalmente para entrega responsiva em 1x e 2x. Os derivados PNG 155×60 e 310×120 foram comprimidos em paleta de alta qualidade (PSNR 48,80/48,94 dB contra os redimensionamentos sem quantização), com SHA-256 `9c08ab1bd07e4e4a920fe21203c9ee08b67c12b4315f8447ff74788be10f4e5b` e `de818cdd3b75fc39faf49286f1a8a1c9b4ed1dc5681a7d0b1eb514b3565042c1` |
| `.well-known/security.txt`, `security.txt` | Canal de segurança | Corrigido para domínio e contato atuais |
| `manifest.json`, `robots.txt`, `llms.txt` | Metadados técnicos e descoberta | Corrigidos e testados no build |

## Associações HTTPS — não aplicáveis ao candidato

`assetlinks.json` e `apple-app-site-association` foram removidos. O candidato Android não declara
`intentFilters` HTTPS e o manifesto gerado contém somente o scheme próprio `rumopragas`; publicar
`handle_all_urls` capturaria o domínio sem uma rota correspondente. No iOS, o profile auditado não
contém `associated-domains` e o aplicativo também não possui um roteamento HTTPS seguro para as
páginas do site. Os testes exigem resposta 404 para ambos os arquivos e impedem que uma associação
incompleta volte ao build. Recuperação de senha continua usando o scheme próprio do aplicativo.

## Ativos legados removidos

O diretório `public/` continha material de uma landing CampoVivo/monitoramento agrícola que não representa
o Rumo Pragas. Os arquivos foram removidos da fonte para evitar reutilização acidental. O teste
E2E exige resposta 404 para um exemplar e impede publicação acidental.

- `images/aerial-*`, `images/farmer-*`
- `images/app-fields.webp`, `images/app-map.webp`, `images/app-notes.webp`
- `images/ndvi-*`
- `images/logo.png`
- `images/pragas-demo.jpg`, `images/pragas-farmer.jpg`, `images/pragas-mockup.jpg`, `images/pragas-problem.jpg`
- `brand/*`
- `og-image.jpg`, que continha copy visual antiga e foi substituído pelo ativo canônico `images/rumo-pragas-social.png`

Classificação: **não aplicável ao lançamento do Rumo Pragas e removido**, com prova no build e no E2E.
