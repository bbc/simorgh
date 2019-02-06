import http from 'http';

/*
 * dotenv should be called on entry to the application to ensure all `process.env.*` variables are correctly set from '.env'
 */

const dotenv = require('dotenv');

const DOT_ENV_CONFIG = dotenv.config();

if (DOT_ENV_CONFIG.error) {
  throw DOT_ENV_CONFIG.error;
}

const app = require('./server').default;

const server = http.createServer(app);
const port = process.env.PORT || 7080;
let currentApp = app;

/* eslint-disable no-console */

server.listen(port, error => {
  if (error) {
    console.log(error);
  }

  console.log(`Started and listening on http://localhost:${port}`);
});

if (module.hot) {
  console.log('✅  Server-side Hot Module Replacement enabled');

  module.hot.accept('./server', () => {
    console.log('🔁  Hot Module Replacement reloading `./server`...');
    server.removeListener('request', currentApp);
    const newApp = require('./server').default; // eslint-disable-line global-require
    server.on('request', newApp);
    currentApp = newApp;
  });
}
