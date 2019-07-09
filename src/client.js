/* eslint-disable react/jsx-filename-extension  */
import React from 'react';
import Loadable from 'react-loadable';
import { hydrate } from 'react-dom';
import { ClientApp } from './app/containers/App';
import routes from './app/routes';
import { template, templateStyles } from './app/lib/joinUsTemplate';

const data = window.SIMORGH_DATA || {};
const root = document.getElementById('root');

Loadable.preloadReady().then(() => {
  hydrate(<ClientApp data={data} routes={routes} />, root);
});

if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line no-console
  console.log(template, ...templateStyles);
}

if (module.hot) {
  module.hot.accept();
}
