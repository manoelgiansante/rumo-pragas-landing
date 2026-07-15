import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const PUBLIC_ROUTES = [
  '/',
  '/privacidade',
  '/termos',
  '/suporte',
  '/excluir-conta',
  '/delete-account',
] as const;

test.describe('Rumo Pragas — acessibilidade automatizada', () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium-desktop', 'axe roda uma vez no Chromium desktop');
  });

  for (const route of PUBLIC_ROUTES) {
    test(`${route} não tem violações axe A/AA ou best-practice`, async ({ page }) => {
      await page.goto(route);

      const results = await new AxeBuilder({ page })
        .withTags([
          'wcag2a',
          'wcag2aa',
          'wcag21a',
          'wcag21aa',
          'wcag22a',
          'wcag22aa',
          'best-practice',
        ])
        .analyze();
      const violations = results.violations.map(({ id, impact, help, nodes }) => ({
        id,
        impact,
        help,
        targets: nodes.map((node) => node.target),
      }));

      expect(violations).toEqual([]);
    });
  }
});
