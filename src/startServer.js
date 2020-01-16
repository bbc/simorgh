// dotenv should be called on entry to the application to ensure all `process.env.*` variables are correctly set from '.env'
const dotenv = require('dotenv');

const DOT_ENV_CONFIG = dotenv.config();
if (DOT_ENV_CONFIG.error) {
  throw DOT_ENV_CONFIG.error;
}

const cluster = require('cluster');
const os = require('os');
const http = require('http');
const nodeLogger = require('#lib/logger.node');
const app = require('./server').default;

const logger = nodeLogger(__filename);

const startApplicationInstance = () => {
  const server = http.createServer(app);
  const port = process.env.PORT || 7080;
  let currentApp = app;

  server.listen(port, error => {
    if (error) {
      logger.error(error);
    }
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
};

const startCluster = () => {
  const processOnline = worker => logger.info(`Worker ${worker.id} started`);
  const processExit = (worker, code, signal) => {
    const exitReason = code ? ` with code ${code}` : ` due to signal ${signal}`;

    if (code !== 0 && !worker.suicide) {
      cluster.fork();
    }

    return logger.error(`Worker ${worker.id} died ${exitReason}`);
  };

  if (cluster.isMaster) {
    os.cpus().map(() => cluster.fork());
    cluster.on('online', processOnline);
    cluster.on('exit', processExit);
  } else {
    startApplicationInstance();
  }
};

// eslint-disable-next-line import/prefer-default-export
export { startCluster };
