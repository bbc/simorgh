/* eslint-disable react/jsx-filename-extension  */
import setupClient from '@bbc/spartacus/client';
import routes from './app/routes';

const data = window.SPARTACUS_DATA || {};

setupClient(data, routes, module);

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register(`/${data.service}/articles/sw.js`);
}
