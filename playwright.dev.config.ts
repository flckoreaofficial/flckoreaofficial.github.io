import { defineConfig } from '@playwright/test';
import config from './playwright.config';

export default defineConfig({
  ...config,
  testMatch: 'development.spec.ts',
  outputDir: 'test-results/development',
  projects: [{ name: 'development', use: { viewport: { width: 1440, height: 1000 } } }],
  use: { ...config.use, baseURL: 'http://127.0.0.1:5174/' },
  webServer: {
    command: 'npm run dev -- --port 5174 --strictPort',
    url: 'http://127.0.0.1:5174/',
    reuseExistingServer: false,
  },
});
