/* eslint-disable react/jsx-filename-extension  */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { hydrate } from 'react-dom';
import App from '#containers/app/App';
import routes from './app/routes';
import { template, templateStyles } from '#lib/joinUsTemplate';
import loggerNode from '#lib/logger.node';

const logger = loggerNode();

const data = window.SIMORGH_DATA || {}; // Initial data fetched on the server
const root = document.getElementById('root');

// Compose Client App
const ClientApp = ({ initialData, routes }) => (
  <BrowserRouter>
    <App initialData={initialData} routes={routes} />
  </BrowserRouter>
);

// Only hydrate the client if we're on the expected path
// When on an unknown route, the SSR would be discarded and the user would only
// see a blank screen. Avoid this by only hydrating when the embedded page data
// and window location agree what the path is. Otherwise, fallback to the SSR.
if (window.SIMORGH_DATA.path === window.location.pathname) {
  loadableReady(() => {
    hydrate(<ClientApp initialData={data} routes={routes} />, root);
  });
} else {
  logger.warn(`
    Simorgh refused to hydrate.
    It attempted to hydrate page with path ${window.SIMORGH_DATA.path},
    but window.location says path is ${window.location.pathname}
  `);
}

if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line no-console
  console.log(template, ...templateStyles);
}

if (module.hot) {
  module.hot.accept();
}
