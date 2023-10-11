/* eslint-disable react/jsx-filename-extension  */
import React from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { loadableReady } from '@loadable/component';
import { hydrateRoot } from 'react-dom/client';
import { template, templateStyles } from '#lib/joinUsTemplate';
import loggerNode from '#lib/logger.node';
import { ClientApp } from './app/legacy/containers/App';

const logger = loggerNode();
const data = window.SIMORGH_DATA || {};
const root = document.getElementById('root');
const isModernBrowser = 'noModule' in document.createElement('script');
const bundleToExecute = isModernBrowser ? 'modern' : 'legacy';

// Only hydrate the client if we're on the expected path
// When on an unknown route, the SSR would be discarded and the user would only
// see a blank screen. Avoid this by only hydrating when the embedded page data
// and window location agree what the path is. Otherwise, fallback to the SSR.
if (window.SIMORGH_DATA.path === window.location.pathname) {
  loadableReady(
    () => {
      const cache = createCache({ key: 'bbc' });

      hydrateRoot(
        root,
        <CacheProvider value={cache}>
          <ClientApp data={data} />
        </CacheProvider>,
      );
    },
    {
      namespace: bundleToExecute, // execute the correct __LOADABLE_REQUIRED_CHUNKS__ found in json script tag
    },
  );
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
