const cucumber = require('cypress-cucumber-preprocessor').default;
const envConfig = require('../support/config/envs');

/* eslint-disable no-param-reassign */
module.exports = (on, config) => {
  config.baseUrl = envConfig(config.env.APP_ENV, config.env.UK).baseUrl;

  // Debugging console logs to see running config
  /* eslint-disable no-console */
  console.log('\n\n\n\n\n');
  console.log('Cypress running config:');
  console.log('SMOKE:', config.env.SMOKE);
  console.log('APP_ENV:', config.env.APP_ENV);
  console.log('UK:', config.env.UK);
  console.log('\n\n\n\n\n');
  /* eslint-enable no-console */

  on('file:preprocessor', cucumber());

  return config;
};
