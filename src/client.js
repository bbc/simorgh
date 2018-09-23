/* eslint-disable react/jsx-filename-extension  */
import React from 'react';
import 'babel-polyfill';
import { hydrate } from 'react-dom';
import { ClientUni } from '@jtart/uni';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import routes from './app/routes';

if (process.env.NODE_ENV === 'production') {
  OfflinePluginRuntime.install({
    // Source: https://zach.codes/handling-client-side-app-updates-with-service-workers/
    // NB this means links must have special logic. I have no links to add this on yet, see the link above.
    onUpdateReady: () => OfflinePluginRuntime.applyUpdate(),
    onUpdated: () => (window.swUpdate = true), // eslint-disable-line no-return-assign
  });
}

const data = window.SIMORGH_DATA || {};
const root = document.getElementById('root');

hydrate(<ClientUni data={data} routes={routes} />, root);

if (module.hot) {
  module.hot.accept();
}
