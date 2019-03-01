/* eslint-disable react/jsx-filename-extension  */
import { setupClient, data } from '@bbc/spartacus/client';
import routes from './app/routes';

setupClient(routes, module);

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register(`/${data.service}/articles/sw.js`);
}
