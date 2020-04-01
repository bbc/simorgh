/* eslint-disable react/jsx-filename-extension  */
import React from 'react';
import { loadableReady } from '@loadable/component';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { DataProvider, createDataClient } from 'react-isomorphic-data';
import SimorghApp from '#containers/App/App';
import routes from './app/routes';
import { template, templateStyles } from '#lib/joinUsTemplate';
import loggerNode from '#lib/logger.node';

const logger = loggerNode();

const data = window.SIMORGH_DATA || {};
const componentData = window.__cache || {};
const root = document.getElementById('root');

// Create a store for all component data fetches
const dataClient = createDataClient({
  initialCache: componentData,
  ssr: false,
});

// Only hydrate the client if we're on the expected path
// When on an unknown route, the SSR would be discarded and the user would only
// see a blank screen. Avoid this by only hydrating when the embedded page data
// and window location agree what the path is. Otherwise, fallback to the SSR.
if (window.SIMORGH_DATA.path === window.location.pathname) {
  loadableReady(() => {
    hydrate(
      <DataProvider client={dataClient}>
        <BrowserRouter>
          <SimorghApp initialData={data} routes={routes} />
        </BrowserRouter>
      </DataProvider>,
      root,
    );
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
