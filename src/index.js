// dotenv should be called on entry to the application to ensure all `process.env.*` variables are correctly set from '.env'
const dotenv = require('dotenv');
const Loadable = require('react-loadable');

const DOT_ENV_CONFIG = dotenv.config();
if (DOT_ENV_CONFIG.error) {
  throw DOT_ENV_CONFIG.error;
}

// now `process.env.*` variables are set run the rest of the app
const http = require('http');
const nodeLogger = require('./app/lib/logger.node');
const app = require('./server').default;

const logger = nodeLogger(__filename);
const server = http.createServer(app);
const port = process.env.PORT || 7080;
let currentApp = app;

Loadable.preloadAll().then(() => {
  server.listen(port, error => {
    if (error) {
      logger.error(error);
    }
  });
});

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
