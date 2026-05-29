import { defineConfig } from '@playwright/test';

const appEnv = process.env.APP_ENV || 'local';
const playwrightChannel = process.env.PLAYWRIGHT_CHANNEL;

const baseUrlByEnv: Record<string, string> = {
  local: 'http://localhost:7081',
  test: 'https://www.test.bbc.com',
  live: 'https://www.bbc.com',
};

const baseURL =
  process.env.PLAYWRIGHT_BASE_URL || baseUrlByEnv[appEnv] || baseUrlByEnv.local;

const reporter = process.env.CI
  ? [['list'], ['html', { open: 'never' }]]
  : [['list']];

export default defineConfig({
  testDir: './playwright',
  timeout: 30_000,
  retries: appEnv === 'live' ? 2 : 1,
  use: {
    baseURL,
    trace: 'retain-on-failure',
    ...(playwrightChannel ? { channel: playwrightChannel } : {}),
  },
  reporter,
});
