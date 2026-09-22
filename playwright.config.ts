import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: 'site.spec.ts',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:4173/flc-preview/',
    trace: 'retain-on-failure',
    // Use the installed Edge browser locally; CI uses Playwright Chromium.
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1000 } } },
    { name: 'mobile', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' } },
  ],
  webServer: {
    command: 'npm run build && npm run preview -- --port 4173 --strictPort --base /flc-preview/',
    url: 'http://127.0.0.1:4173/flc-preview/',
    reuseExistingServer: !process.env.CI,
  },
});
