import { expect, test } from '@playwright/test';
import { createHash } from 'node:crypto';

test.describe('Rumo Pragas — smoke técnico', () => {
  test('assets de identidade e compartilhamento respondem', async ({ page, request }) => {
    const favicon = await request.get('/favicon.ico');
    expect(favicon.status()).toBe(200);

    const appIcon = await request.get('/app-icon-512.png');
    expect(appIcon.status()).toBe(200);
    expect(createHash('sha256').update(await appIcon.body()).digest('hex')).toBe(
      '708dcc664b202d629dbc039389bcac7fe63c261e9643fe56c34e4fb277ed0d3a',
    );

    const compactIcon = await request.get('/app-icon-64.webp');
    expect(compactIcon.status()).toBe(200);

    const appStoreBadge = await request.get('/store-badges/app-store-pt-br.svg');
    expect(appStoreBadge.status()).toBe(200);
    expect(createHash('sha256').update(await appStoreBadge.body()).digest('hex')).toBe(
      '0e9291a9c654e479762b75b51dd94a150af6fab76390a79cb2218cdc8f6cc893',
    );
    const googlePlayBadge = await request.get('/store-badges/google-play-pt-br.png');
    expect(googlePlayBadge.status()).toBe(200);
    expect(createHash('sha256').update(await googlePlayBadge.body()).digest('hex')).toBe(
      'e1ad5e03f636d94b05448c1f156e39b012b9e1d772b730d9e27d066695531a6b',
    );
    const googlePlayBadge1x = await request.get('/store-badges/google-play-pt-br-155.png');
    expect(googlePlayBadge1x.status()).toBe(200);
    expect(createHash('sha256').update(await googlePlayBadge1x.body()).digest('hex')).toBe(
      '9c08ab1bd07e4e4a920fe21203c9ee08b67c12b4315f8447ff74788be10f4e5b',
    );
    const googlePlayBadge2x = await request.get('/store-badges/google-play-pt-br-310.png');
    expect(googlePlayBadge2x.status()).toBe(200);
    expect(createHash('sha256').update(await googlePlayBadge2x.body()).digest('hex')).toBe(
      'de818cdd3b75fc39faf49286f1a8a1c9b4ed1dc5681a7d0b1eb514b3565042c1',
    );
    const customGooglePlaySvg = await request.get('/store-badges/google-play-pt-br.svg');
    expect(customGooglePlaySvg.status()).toBe(404);

    await page.goto('/');
    await expect(page.locator('header img[src="/app-icon-64.webp"]')).toBeVisible();
    await expect(page.locator('[data-store-link="app-store"] svg')).toHaveCount(0);
    await expect(page.locator('[data-store-link="google-play"] svg')).toHaveCount(0);
    const googlePlayImage = page.locator('[data-store-link="google-play"] img').first();
    await expect(googlePlayImage).toHaveAttribute('src', '/store-badges/google-play-pt-br-155.png');
    await expect(googlePlayImage).toHaveAttribute(
      'srcset',
      '/store-badges/google-play-pt-br-155.png 155w, /store-badges/google-play-pt-br-310.png 310w',
    );
    await expect(googlePlayImage).toHaveAttribute('sizes', '155px');
    const expectedGooglePlaySource = await page.evaluate(() =>
      window.devicePixelRatio > 1
        ? '/store-badges/google-play-pt-br-310.png'
        : '/store-badges/google-play-pt-br-155.png',
    );
    await expect
      .poll(() =>
        googlePlayImage.evaluate(
          (image) => new URL((image as HTMLImageElement).currentSrc).pathname,
        ),
      )
      .toBe(expectedGooglePlaySource);
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(ogImage).toBe('https://pragas.agrorumo.com/images/rumo-pragas-social.png');
    const localOg = await request.get(new URL(ogImage!).pathname);
    expect(localOg.status()).toBe(200);
    expect(createHash('sha256').update(await localOg.body()).digest('hex')).toBe(
      'a484664b7189e15ec5587bcf7135d698c2c580172f2177ca67a6154f1c82f6c7',
    );

    const legacyMap = await request.get('/images/app-map.webp');
    expect(legacyMap.status()).toBe(404);
    const staleOg = await request.get('/og-image.jpg');
    expect(staleOg.status()).toBe(404);
    const staleLogo = await request.get('/images/logo.png');
    expect(staleLogo.status()).toBe(404);

    await expect(page.getByRole('link', { name: /Rumo Pragas/ }).first()).toBeVisible();
  });

  test('metadados estruturados são JSON válido e descrevem oferta gratuita', async ({ page }) => {
    await page.goto('/');
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(blocks.length).toBeGreaterThanOrEqual(2);
    const documents = blocks.map((block) => JSON.parse(block));
    const serialized = JSON.stringify(documents);
    expect(serialized).toContain('SoftwareApplication');
    expect(serialized).toContain('"price":"0"');
    expect(serialized).not.toMatch(/subscription|Rumo Pragas Pro/i);

    const manifest = await page.request.get('/manifest.json');
    expect(await manifest.json()).toMatchObject({
      name: 'Rumo Pragas',
      icons: [
        { src: '/app-icon-192.png', sizes: '192x192', purpose: 'any maskable' },
        { src: '/app-icon-512.png', sizes: '512x512', purpose: 'any maskable' },
      ],
    });
  });

  test('seções após o assistente permanecem visíveis', async ({ page }) => {
    await page.goto('/');
    await page.locator('#faq').scrollIntoViewIfNeeded();
    await expect(page.getByRole('heading', { name: 'Perguntas frequentes' })).toBeVisible();
    await expect(page.locator('#faq')).toHaveCSS('opacity', '1');
  });

  test('carregamento não produz erro de console ou de página', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('pageerror', (error) => errors.push(error.message));

    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(errors).toEqual([]);
  });
});
