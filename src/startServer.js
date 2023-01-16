import cluster from 'cluster';
import os from 'os';

import {
  CLUSTER_PROCESS_START,
  CLUSTER_PROCESS_EXIT,
  SERVER_LISTEN_ERROR,
} from '#lib/logger.const';

// dotenv should be called on entry to the application to ensure all `process.env.*` variables are correctly set from '.env'
const dotenv = require('dotenv');

const DOT_ENV_CONFIG = dotenv.config();
if (DOT_ENV_CONFIG.error) {
  throw DOT_ENV_CONFIG.error;
}

// now `process.env.*` variables are set run the rest of the app
const http = require('http');
const nodeLogger = require('#lib/logger.node');
const app = require('./server').default;

const logger = nodeLogger(__filename);
const port = process.env.PORT || 7080;

const startApplicationInstance = () => {
  const server = http.createServer(app);
  // see https://github.com/bbc/simorgh-infrastructure/issues/1367#issuecomment-819314701
  server.keepAliveTimeout = Number(process.env.SERVER_KEEP_ALIVE_TIMEOUT);
  server.headersTimeout = Number(process.env.SERVER_HEADERS_TIMEOUT);

  let currentApp = app;
  server.listen(port, error => {
    if (error) {
      logger.error(SERVER_LISTEN_ERROR, {
        error,
      });
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

const processOnline = worker =>
  logger.info(CLUSTER_PROCESS_START, {
    message: `Worker ${worker.id} started`,
  });

const processExit = (worker, code, signal) => {
  const exitReason = code ? `with code ${code}` : `due to signal ${signal}`;

  if (code !== 0 && !worker.exitedAfterDisconnect) {
    cluster.fork();
  }

  return logger.error(CLUSTER_PROCESS_EXIT, {
    message: `Worker ${worker.id} terminated ${exitReason}`,
  });
};

const startCluster = () => {
  if (process.env.NODE_ENV !== 'production') {
    startApplicationInstance();
  } else {
    const isParentProcess = !cluster.isWorker;
    if (isParentProcess) {
      const availableCores = os.cpus();
      availableCores.map(() => cluster.fork());
      cluster.on('online', processOnline);
      cluster.on('exit', processExit);
    } else {
      startApplicationInstance();
    }
  }
};

// eslint-disable-next-line import/prefer-default-export
export { startCluster };
