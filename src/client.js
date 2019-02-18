/* eslint-disable react/jsx-filename-extension  */
import React from 'react';
import '@babel/polyfill';
import { hydrate } from 'react-dom';
import { ClientApp } from './app/containers/App';
import routes from './app/routes';

const data = window.SIMORGH_DATA || {};
const root = document.getElementById('root');

hydrate(<ClientApp data={data} routes={routes} />, root);

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register(`/${data.service}/articles/sw.js`);
}

if (module.hot) {
  module.hot.accept();
}
