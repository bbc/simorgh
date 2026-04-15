import { config } from '@bbc/unified-web-e2e-framework';

config.testDir = 'playwright/specs';
if (config.use) {
  config.use.baseURL = 'https://www.bbc.com';
}

export default config;
