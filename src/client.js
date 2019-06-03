/* eslint-disable react/jsx-filename-extension  */
import React from 'react';
import { hydrate } from 'react-dom';
import { ClientApp } from './app/containers/App';
import routes from './app/routes';
import getRouteProps from './app/routes/getInitialData/utils/getRouteProps';

const data = window.SIMORGH_DATA || {};
const url = window.location.pathname || '/';
const root = document.getElementById('root');

const { service } = getRouteProps(routes, url);

hydrate(<ClientApp data={data} routes={routes} />, root);

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register(`/${service}/articles/sw.js`);
}

if (module.hot) {
  module.hot.accept();
}
