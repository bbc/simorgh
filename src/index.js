import http from 'http';
import nodeLogger from './app/helpers/logger.node';

const getEnv = require('./server/env');

getEnv();

const app = require('./server').default;

const logger = nodeLogger(__filename);
const server = http.createServer(app);
const port = process.env.PORT || 7080;
let currentApp = app;

server.listen(port, error => {
  if (error) {
    logger.error(error);
  }

  logger.info(`Started and listening on http://localhost:${port}`);
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
