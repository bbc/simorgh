/* eslint-disable react/jsx-filename-extension  */
import React from 'react';
import { matchRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
import { hydrate } from 'react-dom';
import { ClientApp } from './app/containers/App';
import routes from './app/routes';
import { template, templateStyles } from './app/lib/joinUsTemplate';

const data = window.SIMORGH_DATA || {};
const root = document.getElementById('root');

// Only hydrate the client if we're on a known route
// When on an unknown route, the SSR will be discarded and the user will only
// see a blank screen. This should never happen on BBC domains, but web page
// archival/caching sites such as
if (matchRoutes(routes, window.location.pathname).length > 0) {
  Loadable.preloadReady().then(() => {
    hydrate(<ClientApp data={data} routes={routes} />, root);
  });
}

if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line no-console
  console.log(template, ...templateStyles);
}

if (module.hot) {
  module.hot.accept();
}
