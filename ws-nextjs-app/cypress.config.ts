/* eslint-disable no-param-reassign */
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      if (!config.env.APP_ENV) {
        config.env.APP_ENV = 'local';
      }
      const appEnv = config.env.APP_ENV;
      const env = config.env[appEnv];

      config.baseUrl = env.baseUrl;

      // Debugging console logs to see running config
      /* eslint-disable no-console */
      console.log('\n\n\n\n\n');
      console.log('Cypress running config:');
      // console.log('SMOKE:', config.env.SMOKE);
      console.log('APP_ENV:', config.env.APP_ENV);
      console.log('Base URL:', config.baseUrl);
      // console.log('UK:', config.env.UK);
      console.log('\n\n\n\n\n');
      /* eslint-enable no-console */

      // Add options for the cypress terminal report (cy.logs) here
      const logPrinterOptions = {
        defaultTrimLength: 2000,
      };
      // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
      require('cypress-terminal-report/src/installLogsPrinter')(
        on,
        logPrinterOptions,
      );

      return config;
    },
    env: {
      isNextJs: true,
      live: {
        baseUrl: 'https://www.bbc.com',
      },
      test: {
        baseUrl: 'https://www.test.bbc.com',
      },
      local: {
        baseUrl: 'http://localhost:7081',
      },
    },
  },
  video: false,
});
