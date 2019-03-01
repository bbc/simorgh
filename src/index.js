// dotenv should be called on entry to the application to ensure all `process.env.*` variables are correctly set from '.env'

const dotenv = require('dotenv');

const DOT_ENV_CONFIG = dotenv.config();
if (DOT_ENV_CONFIG.error) {
  throw DOT_ENV_CONFIG.error;
}

const setupServer = require('@bbc/spartacus/index');
const Logger = require('@bbc/spartacus/logger');

const logger = Logger(__filename);
const expressServer = require('./server').default;

const server = setupServer(expressServer);

let currentApp = expressServer;

if (module.hot) {
  logger.info('✅  Server-side Hot Module Replacement enabled');

  module.hot.accept('./server', () => {
    logger.info('🔁  Hot Module Replacement reloading `./server`...');
    server.removeListener('request', currentApp);
    const newApp = require('./server').default; // eslint-disable-line global-require
    server.on('request', newApp);
    currentApp = newApp;
  });
}
