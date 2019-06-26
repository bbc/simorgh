/* eslint-disable react/jsx-filename-extension  */
import React from 'react';
import Loadable from 'react-loadable';
import { hydrate } from 'react-dom';
import { ClientApp } from './app/containers/App';
import routes from './app/routes';
import getRouteProps from './app/routes/getInitialData/utils/getRouteProps';
import { template, templateStyles } from './app/lib/joinUsTemplate';

const data = window.SIMORGH_DATA || {};
const url = window.location.pathname || '/';
const root = document.getElementById('root');

const { service } = getRouteProps(routes, url);

Loadable.preloadReady().then(() => {
  hydrate(<ClientApp data={data} routes={routes} />, root);
});

if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line no-console
  console.log(template, ...templateStyles);

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(`/${service}/articles/sw.js`);
  }
}

if (module.hot) {
  module.hot.accept();
}
