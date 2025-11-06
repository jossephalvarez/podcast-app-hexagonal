import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'src/tests-e2e',
  timeout: 60000,
  fullyParallel: false,
  maxFailures: 0,
  use: {
    baseURL: 'http://localhost:3000',
    headless: false,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  reporter: [['list'], ['html', { open: 'never' }]],
  retries: process.env.CI ? 2 : 0,
});
