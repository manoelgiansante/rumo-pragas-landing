import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['html'], ['github']] : 'list',
  use: {
    baseURL: process.env.BASE_URL || 'http://127.0.0.1:4321',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    colorScheme: 'light',
  },
  projects: [
    { name: 'chromium-desktop', use: { ...devices['Desktop Chrome'], browserName: 'chromium' } },
    { name: 'webkit-desktop', use: { ...devices['Desktop Safari'], browserName: 'webkit' } },
    { name: 'firefox-desktop', use: { ...devices['Desktop Firefox'], browserName: 'firefox' } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 5'], browserName: 'chromium' } },
    { name: 'mobile-safari', use: { ...devices['iPhone 13'], browserName: 'webkit' } },
  ],
  webServer: {
    command: 'pnpm preview --host 127.0.0.1',
    port: 4321,
    reuseExistingServer: !process.env.CI,
  },
});
