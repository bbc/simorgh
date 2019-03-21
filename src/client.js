// polyfills for >IE11
// import polyfillCryptoGetRandomValues from 'polyfill-crypto.getrandomvalues';
import getRandomValuesPolyfill from 'nanoid/non-secure';

import 'core-js/es6/set';
import 'core-js/es6/map';
import 'core-js/es6/symbol';

import React from 'react';
import { hydrate } from 'react-dom';
import { ClientApp } from './app/containers/App';
import routes from './app/routes';

window.crypto = { getRandomValues: getRandomValuesPolyfill };
self.crypto = { getRandomValues: getRandomValuesPolyfill };
global.crypto = { getRandomValues: getRandomValuesPolyfill };
crypto = { getRandomValues: getRandomValuesPolyfill };

const data = window.SIMORGH_DATA || {};
const root = document.getElementById('root');

hydrate(<ClientApp data={data} routes={routes} />, root); // eslint-disable-line react/jsx-filename-extension

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register(`/${data.service}/articles/sw.js`);
}

if (module.hot) {
  module.hot.accept();
}
