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
  // eslint-disable-next-line global-require
  require('cypress-log-to-output').install(on, (type, event) => {
    // return true or false from this plugin to control if the event is logged
    // `type` is either `console` or `browser`
    // if `type` is `browser`, `event` is an object of the type `LogEntry`:
    //  https://chromedevtools.github.io/devtools-protocol/tot/Log#type-LogEntry
    // if `type` is `console`, `event` is an object of the type passed to `Runtime.consoleAPICalled`:
    //  https://chromedevtools.github.io/devtools-protocol/tot/Runtime#event-consoleAPICalled

    // for example, to only show error events:

    if (event.level === 'error' || event.type === 'error') {
      return true;
    }

    return false;
  });
  /* eslint-enable no-console */

  return config;
};
