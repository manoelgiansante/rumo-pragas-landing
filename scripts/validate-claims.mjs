import { readdir, readFile } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';

const roots = ['src', 'public'];
const textExtensions = new Set(['.astro', '.js', '.json', '.md', '.txt', '.xml']);
const forbidden = [
  { pattern: /Rumo Pragas Pro/iu, reason: 'plano Pro inexistente' },
  { pattern: /R\$\s*19[,.]90/iu, reason: 'preço inexistente' },
  { pattern: /14\s+dias\s+(?:de\s+)?(?:teste|gr[áa]tis)/iu, reason: 'período de teste inexistente' },
  { pattern: /Plano Pro via assinatura/iu, reason: 'assinatura inexistente' },
  { pattern: /mapa de surtos regional/iu, reason: 'mapa comunitário não publicado' },
  { pattern: /hist[óo]rico por talh[ãa]o/iu, reason: 'histórico por talhão não publicado' },
  { pattern: /identifica\w*[^.\n]{0,40}\bem segundos\b/iu, reason: 'promessa fixa de velocidade' },
  { pattern: /\b(?:9[0-9]|100)%\s+(?:de\s+)?precis/iu, reason: 'promessa de precisão sem evidência' },
  {
    pattern: /considera a hip[óo]tese e o n[íi]vel de confian[çc]a exibidos no resultado/iu,
    reason: 'o chat não recebe automaticamente o contexto da análise',
  },
];

const files = [];

async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await collect(path);
    else if (textExtensions.has(extname(entry.name))) files.push(path);
  }
}

for (const root of roots) await collect(root);

const failures = [];
for (const file of files) {
  const content = await readFile(file, 'utf8');
  for (const rule of forbidden) {
    const match = content.match(rule.pattern);
    if (match) failures.push(`${relative('.', file)}: ${rule.reason} (${JSON.stringify(match[0])})`);
  }
}

const vercel = JSON.parse(await readFile('vercel.json', 'utf8'));
for (const [field, expected] of [
  ['framework', 'astro'],
  ['buildCommand', 'pnpm build'],
  ['installCommand', 'corepack pnpm@11.13.0 install --frozen-lockfile'],
  ['cleanUrls', true],
]) {
  if (vercel[field] !== expected) {
    failures.push(`vercel.json: ${field} deve ser ${JSON.stringify(expected)}`);
  }
}

const expectedRedirects = new Map([
  ['/privacy', '/privacidade'],
  ['/terms', '/termos'],
  ['/exclusao-de-conta', '/excluir-conta'],
  ['/account-deletion', '/delete-account'],
  ['/excluir', '/excluir-conta'],
  ['/sitemap.xml', '/sitemap-index.xml'],
]);
const configuredRedirects = vercel.redirects ?? [];
const redirects = new Map(configuredRedirects.map((redirect) => [redirect.source, redirect]));
if (configuredRedirects.length !== expectedRedirects.size || redirects.size !== expectedRedirects.size) {
  failures.push(`vercel.json: esperado conjunto único de ${expectedRedirects.size} redirects`);
}
for (const [source, destination] of expectedRedirects) {
  const redirect = redirects.get(source);
  if (redirect?.destination !== destination || redirect.permanent !== true) {
    failures.push(`vercel.json: redirect permanente ${source} -> ${destination} ausente`);
  }
}

const expectedHeaderRules = new Map([
  ['/(.*)', new Map([
    ['Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload'],
    ['X-Content-Type-Options', 'nosniff'],
    ['X-Frame-Options', 'DENY'],
    ['Referrer-Policy', 'strict-origin-when-cross-origin'],
    ['Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=()'],
    ['Cross-Origin-Opener-Policy', 'same-origin'],
    ['Cross-Origin-Resource-Policy', 'same-origin'],
    ['Content-Security-Policy', "default-src 'self'; script-src 'self' https://connect.facebook.net https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; font-src 'self' data:; img-src 'self' data: blob: https://www.facebook.com; connect-src 'self' https://www.facebook.com https://connect.facebook.net https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://*.analytics.google.com; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; upgrade-insecure-requests"],
  ])],
  ['/_astro/(.*)', new Map([
    ['Cache-Control', 'public, max-age=31536000, immutable'],
  ])],
  ['/js/(.*)', new Map([
    ['Cache-Control', 'public, max-age=0, must-revalidate'],
  ])],
  ['/images/(.*)', new Map([
    ['Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400'],
  ])],
  ['/(favicon|apple-touch-icon|app-icon|og-image)(.*)', new Map([
    ['Cache-Control', 'public, max-age=604800'],
  ])],
]);

const configuredHeaderRules = vercel.headers ?? [];
const headerRules = new Map(configuredHeaderRules.map((rule) => [rule.source, rule.headers]));
if (configuredHeaderRules.length !== expectedHeaderRules.size || headerRules.size !== expectedHeaderRules.size) {
  failures.push(`vercel.json: esperado conjunto único de ${expectedHeaderRules.size} regras de headers`);
}
for (const [source, expectedHeaders] of expectedHeaderRules) {
  const configuredHeaders = headerRules.get(source) ?? [];
  const headers = new Map(configuredHeaders.map((header) => [header.key, header.value]));
  if (configuredHeaders.length !== expectedHeaders.size || headers.size !== expectedHeaders.size) {
    failures.push(`vercel.json: regra ${source} deve conter ${expectedHeaders.size} headers únicos`);
  }
  for (const [key, value] of expectedHeaders) {
    if (headers.get(key) !== value) {
      failures.push(`vercel.json: header ${key} incorreto ou ausente em ${source}`);
    }
  }
}

if (failures.length) {
  console.error('Public claim gate failed:\n' + failures.map((item) => `- ${item}`).join('\n'));
  process.exit(1);
}

console.log(`Public claim gate passed (${files.length} text files checked).`);
