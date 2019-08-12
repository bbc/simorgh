/* eslint-disable react/jsx-filename-extension  */
import React from 'react';
import Loadable from 'react-loadable';
import { hydrate } from 'react-dom';
import { ClientApp } from './app/containers/App';
import routes from './app/routes';
import { template, templateStyles } from './app/lib/joinUsTemplate';

const data = window.SIMORGH_DATA || {};
const root = document.getElementById('root');

// Only hydrate the client if we're on the expected path
// When on an unknown route, the SSR would be discarded and the user would only
// see a blank screen. Avoid this by only hydrating when the embedded page data
// and window location agree what the path is. Otherwise, fallback to the SSR.
if (window.SIMORGH_DATA.path === window.location.pathname) {
  Loadable.preloadReady().then(() => {
    hydrate(<ClientApp data={data} routes={routes} />, root);
  });
} else {
  /* eslint-disable no-console */
  console.log(`Simorgh refused to hydrate.`);
  console.log(
    `Attempted to hydrate page with path ${window.SIMORGH_DATA.path},`,
  );
  console.log(`but window says path is ${window.location.pathname}`);
  /* eslint-enable no-console */
}

if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line no-console
  console.log(template, ...templateStyles);
}

if (module.hot) {
  module.hot.accept();
}
