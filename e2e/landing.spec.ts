import { expect, test } from '@playwright/test';

const APP_STORE = 'https://apps.apple.com/br/app/rumo-pragas-ia/id6762232682';
const PLAY_STORE = 'https://play.google.com/store/apps/details?id=com.agrorumo.rumopragas&hl=pt_BR';

test('página principal publica proposta e lojas reais', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Rumo Pragas/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Receba uma hipótese');
  await expect(page.getByRole('link', { name: /App Store/i }).first()).toHaveAttribute('href', APP_STORE);
  await expect(page.getByRole('link', { name: /Google Play/i }).first()).toHaveAttribute('href', PLAY_STORE);
  await expect(page.locator('img[src="/store-badges/app-store-pt-br.svg"]').first()).toBeVisible();
  await expect(page.locator('img[src="/store-badges/google-play-pt-br-155.png"]').first()).toBeVisible();
  await expect(page.getByText('Grátis, sem anúncios e sem compras no aplicativo.')).toBeVisible();
  await expect(page.getByText(/Rumo Pragas Pro|R\$\s*19[,.]90|14 dias grátis/i)).toHaveCount(0);
});

test('lista de etapas contém somente itens como filhos diretos', async ({ page, request }) => {
  const response = await request.get('/');
  expect(response.status()).toBe(200);
  const html = await response.text();
  const sections = [
    ...html.matchAll(/<section\b[^>]*\bid="como-funciona"[^>]*>[\s\S]*?<\/section>/giu),
  ];
  expect(sections).toHaveLength(1);
  const lists = [...sections[0][0].matchAll(/<ol\b[^>]*>([\s\S]*?)<\/ol>/giu)];
  expect(lists).toHaveLength(1);
  const listSource = lists[0][1].replace(/<!--[\s\S]*?-->/gu, '').trim();
  const directItems = [...listSource.matchAll(/<li\b[^>]*>[\s\S]*?<\/li>/giu)]
    .map((match) => match[0]);
  expect(directItems).toHaveLength(4);
  expect(directItems.filter((item) => /^<li\b[^>]*\baria-hidden="true"/iu.test(item))).toHaveLength(1);
  expect(listSource.replace(/<li\b[^>]*>[\s\S]*?<\/li>/giu, '').trim()).toBe('');

  await page.goto('/');
  await expect(page.locator('#como-funciona')).toHaveCount(1);
  const stepsList = page.locator('#como-funciona ol');
  await expect(stepsList).toHaveCount(1);
  await expect(stepsList.locator(':scope > li')).toHaveCount(4);
  await expect(stepsList.locator(':scope > li[aria-hidden="true"]')).toHaveCount(1);
  await expect(stepsList.locator(':scope > li:not([aria-hidden])')).toHaveCount(3);
  await expect(stepsList.locator(':scope > :not(li)')).toHaveCount(0);
});

test('fallbacks HTML de privacidade e termos são válidos e navegáveis', async ({ page, request }) => {
  const redirects = [
    {
      source: '/privacy',
      destination: '/privacidade',
      canonical: 'https://pragas.agrorumo.com/privacidade',
    },
    {
      source: '/terms',
      destination: '/termos',
      canonical: 'https://pragas.agrorumo.com/termos',
    },
  ];

  for (const { source, destination, canonical } of redirects) {
    const response = await request.get(source);
    expect(response.status(), `${source} deve publicar o fallback estático`).toBe(200);
    const html = await response.text();
    const metadata = await page.evaluate(
      ({ documentHtml, expectedDestination, sourceUrl }) => {
        const document = new DOMParser().parseFromString(documentHtml, 'text/html');
        const absoluteDestination = new URL(expectedDestination, sourceUrl).href;
        return {
          refresh: [...document.querySelectorAll('meta[http-equiv]')]
            .filter((meta) => meta.getAttribute('http-equiv')?.toLowerCase() === 'refresh')
            .map((meta) => {
              const content = meta.getAttribute('content');
              const url = content?.match(/^0; url=(.+)$/iu)?.[1];
              return {
                content,
                destination: url ? new URL(url, sourceUrl).href : null,
              };
            }),
          robots: [...document.querySelectorAll('meta[name="robots" i]')]
            .map((meta) => meta.getAttribute('content')),
          canonicals: [...document.querySelectorAll('link[rel~="canonical" i]')]
            .map((link) => new URL(link.getAttribute('href') ?? '', sourceUrl).href),
          links: [...document.querySelectorAll('a[href]')]
            .map((link) => new URL(link.getAttribute('href') ?? '', sourceUrl).href),
          absoluteDestination,
        };
      },
      { documentHtml: html, expectedDestination: destination, sourceUrl: response.url() },
    );
    const absoluteDestination = new URL(destination, response.url()).href;
    expect(metadata).toEqual({
      refresh: [{ content: `0; url=${destination}`, destination: absoluteDestination }],
      robots: ['noindex, follow'],
      canonicals: [canonical],
      links: [absoluteDestination],
      absoluteDestination,
    });

    await page.goto(source);
    await expect(page).toHaveURL(absoluteDestination);
  }
});

test('consentimento impede medição antes da escolha', async ({ page }) => {
  const analyticsRequests: string[] = [];
  page.on('request', (request) => {
    if (/facebook\.net|facebook\.com\/tr|googletagmanager\.com|google-analytics\.com/.test(request.url())) {
      analyticsRequests.push(request.url());
    }
  });

  await page.goto('/');
  const banner = page.locator('#analytics-consent');
  await expect(banner).toBeVisible();
  await page.waitForTimeout(250);
  expect(analyticsRequests).toHaveLength(0);

  await page.getByRole('button', { name: 'Recusar' }).click();
  await expect(banner).toBeHidden();
  await expect.poll(() => page.evaluate(() => localStorage.getItem('rumo-pragas-analytics-consent-v1'))).toBe('denied');
  expect(analyticsRequests).toHaveLength(0);

  await page.getByRole('button', { name: 'Preferências de medição' }).click();
  await expect(banner).toBeVisible();
});

test('revogação interrompe novos sinais de medição na mesma sessão', async ({ page }) => {
  await page.route(/connect\.facebook\.net|googletagmanager\.com/, (route) => route.abort());
  await page.addInitScript(() => {
    const target = window as unknown as Window & {
      __fbqCalls: unknown[][];
      fbq: (...args: unknown[]) => void;
    };
    target.__fbqCalls = [];
    target.fbq = (...args) => target.__fbqCalls.push(args);
  });

  await page.goto('/');
  await page.getByRole('button', { name: 'Aceitar medição' }).click();
  await page.getByRole('button', { name: 'Preferências de medição' }).click();
  await page.getByRole('button', { name: 'Recusar' }).click();

  await expect.poll(() => page.evaluate(() => localStorage.getItem('rumo-pragas-analytics-consent-v1'))).toBe('denied');
  expect(await page.evaluate(() => (window as unknown as Window & { __fbqCalls: unknown[][] }).__fbqCalls)).toContainEqual([
    'consent',
    'revoke',
  ]);
});

test('consentimento pode ser revogado e concedido novamente na mesma sessão', async ({ page }) => {
  await page.route(/connect\.facebook\.net|googletagmanager\.com/, (route) => route.abort());
  await page.addInitScript(() => {
    const target = window as unknown as Window & {
      __fbqCalls: unknown[][];
      fbq: (...args: unknown[]) => void;
    };
    target.__fbqCalls = [];
    target.fbq = (...args) => target.__fbqCalls.push(args);
  });

  await page.goto('/');
  await page.getByRole('button', { name: 'Aceitar medição' }).click();
  await page.getByRole('button', { name: 'Preferências de medição' }).click();
  await page.getByRole('button', { name: 'Recusar' }).click();
  await page.getByRole('button', { name: 'Preferências de medição' }).click();
  await page.getByRole('button', { name: 'Aceitar medição' }).click();

  const consentCalls = await page.evaluate(() =>
    (window as unknown as Window & { __fbqCalls: unknown[][] }).__fbqCalls.filter(
      (call) => call[0] === 'consent',
    ),
  );
  expect(consentCalls).toEqual([
    ['consent', 'grant'],
    ['consent', 'revoke'],
    ['consent', 'grant'],
  ]);
  const firstLoadCalls = await page.evaluate(
    () => (window as unknown as Window & { __fbqCalls: unknown[][] }).__fbqCalls,
  );
  expect(firstLoadCalls.findIndex((call) => call[0] === 'consent' && call[1] === 'grant')).toBeLessThan(
    firstLoadCalls.findIndex((call) => call[0] === 'track' && call[1] === 'PageView'),
  );
  await expect.poll(() => page.evaluate(() => localStorage.getItem('rumo-pragas-analytics-consent-v1'))).toBe('granted');
});

test('preferências de medição restauram o foco ao recusar ou aceitar', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Recusar' }).click();

  const settingsButton = page.getByRole('button', { name: 'Preferências de medição' });
  const denyButton = page.getByRole('button', { name: 'Recusar' });
  const acceptButton = page.getByRole('button', { name: 'Aceitar medição' });

  await settingsButton.focus();
  await page.keyboard.press('Enter');
  await expect(denyButton).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(settingsButton).toBeFocused();

  await page.keyboard.press('Enter');
  await expect(denyButton).toBeFocused();
  await acceptButton.focus();
  await page.keyboard.press('Enter');
  await expect(settingsButton).toBeFocused();
});

test('landmarks de navegação do rodapé têm nomes únicos', async ({ page }) => {
  await page.goto('/');
  const footer = page.locator('footer');

  await expect(footer.getByRole('navigation')).toHaveCount(3);
  for (const name of ['Produto', 'Empresa', 'Legal']) {
    await expect(footer.getByRole('navigation', { name, exact: true })).toHaveCount(1);
  }
});

test('FAQ, legal e suporte refletem o produto gratuito e os limites', async ({ page }) => {
  await page.goto('/');
  const question = page.getByText('A identificação é definitiva?', { exact: true });
  await question.click();
  await expect(page.getByText(/hipótese probabilística/).first()).toBeVisible();

  await page.goto('/termos');
  await expect(page.getByRole('heading', { name: 'Termos de Uso' })).toBeVisible();
  await expect(page.getByText(/Lei nº 14\.785\/2023/)).toBeVisible();
  await expect(page.getByText(/Resolução Confea nº 1\.149\/2025/)).toBeVisible();
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(0);

  await page.goto('/excluir-conta');
  await expect(page.getByText(/dados específicos do Rumo Pragas foram eliminados/)).toBeVisible();
  await expect(page.getByText(/identidade global AgroRumo.*registros históricos compartilhados.*marcador técnico mínimo/s)).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Marcador técnico de desvinculação' })).toBeVisible();
  await expect(page.getByText(/permanece até você reativar.*identidade global AgroRumo ser excluída/s)).toBeVisible();

  await page.goto('/privacidade');
  await expect(page.locator('header')).toBeVisible();
  await expect(page.locator('footer')).toBeVisible();
  await expect(page.getByRole('link', { name: /Rumo Pragas/ }).first()).toHaveAttribute('href', '/#hero');
  const historicalLocationNotice = page.locator('p').filter({
    hasText: 'Registros históricos criados antes dessa minimização',
  });
  await expect(historicalLocationNotice).toBeVisible();
  await expect(historicalLocationNotice).toContainText(/coordenadas com maior\s+precisão/);
  await expect(page.getByText(/Não afirmamos que terceiros.*retenção.*zero/s)).toBeVisible();
  await expect(page.getByText(/Google e Apple:.*autenticação social/s)).toBeVisible();

  await page.goto('/suporte');
  await expect(page.getByText('Não. O Rumo Pragas é gratuito, sem assinatura, compra interna ou período de teste.')).toBeVisible();

  await page.goto('/delete-account');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('header')).toHaveAttribute('lang', 'pt-BR');
  await expect(page.locator('footer')).toHaveAttribute('lang', 'pt-BR');
  await expect(page.locator('.skip-link')).toHaveAttribute('lang', 'pt-BR');
  await expect(page.locator('#analytics-consent')).toHaveAttribute('lang', 'pt-BR');
  await expect(page.getByRole('link', { name: 'Excluir dados do Rumo Pragas' })).toHaveAttribute('lang', 'pt-BR');
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'en_US');
  await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute('content', /photo-based hypotheses/);
});

test('rotas públicas respondem e links internos não quebram', async ({ page, request }) => {
  const routes = [
    '/',
    '/privacidade',
    '/termos',
    '/suporte',
    '/excluir-conta',
    '/delete-account',
    '/llms.txt',
    '/manifest.json',
    '/robots.txt',
  ];
  for (const route of routes) {
    const response = await request.get(route);
    expect(response.status(), `${route} deve responder`).toBe(200);
  }

  await page.goto('/');
  const hrefs = await page.locator('a[href^="/"]').evaluateAll((links) =>
    [...new Set(links.map((link) => link.getAttribute('href')).filter(Boolean))],
  );
  for (const href of hrefs) {
    const response = await request.get(href!);
    expect(response.status(), `${href} deve responder`).toBeLessThan(400);
  }
});

test('não publica associações HTTPS que o aplicativo não roteia', async ({ request }) => {
  const assetLinks = await request.get('/.well-known/assetlinks.json');
  expect(assetLinks.status()).toBe(404);
  const aasa = await request.get('/.well-known/apple-app-site-association');
  expect(aasa.status()).toBe(404);
});

test('página 404 orienta recuperação com acessibilidade', async ({ page }) => {
  const response = await page.goto('/rota-que-nao-existe');
  expect(response?.status()).toBe(404);
  await expect(page).toHaveTitle(/Página não encontrada/);
  await expect(
    page.getByRole('heading', { name: 'Esta página não foi encontrada' }),
  ).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
  await expect(page.getByRole('link', { name: 'Voltar ao início' })).toHaveAttribute('href', '/');
  await expect(page.getByRole('link', { name: 'Acessar suporte' })).toHaveAttribute(
    'href',
    '/suporte',
  );
});

test('layout não cria rolagem horizontal', async ({ page }) => {
  for (const route of ['/', '/privacidade', '/termos', '/suporte', '/excluir-conta']) {
    await page.goto(route);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `${route} tem overflow horizontal`).toBeLessThanOrEqual(1);
  }
});

test('menu móvel fecha depois de navegar para uma seção', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const menu = page.locator('details.mobile-menu');
  await menu.locator('summary').click();
  await expect(menu).toHaveAttribute('open', '');

  await menu.getByRole('link', { name: 'Como funciona' }).click();
  await expect(page).toHaveURL(/#como-funciona$/);
  await expect(menu).not.toHaveAttribute('open', '');
});

test('atalho de conteúdo e FAQ funcionam somente com teclado', async ({ page }, testInfo) => {
  await page.goto('/');

  const skipLink = page.locator('.skip-link');
  const focusNext = testInfo.project.name.includes('safari') || testInfo.project.name.includes('webkit')
    ? 'Alt+Tab'
    : 'Tab';
  await page.keyboard.press(focusNext);
  await expect(skipLink).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();

  const secondQuestion = page.locator('#faq details').nth(1);
  const summary = secondQuestion.locator('summary');
  await summary.focus();
  await expect(summary).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(secondQuestion).toHaveAttribute('open', '');
  await page.keyboard.press('Enter');
  await expect(secondQuestion).not.toHaveAttribute('open', '');
});
