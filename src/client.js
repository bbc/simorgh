/* eslint-disable react/jsx-filename-extension  */
import React from 'react';
import 'babel-polyfill';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ensureReady, After } from '@jaredpalmer/after';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import routes from './app/routes';

OfflinePluginRuntime.install();

const root = document.getElementById('root');

ensureReady(routes).then(data =>
  hydrate(
    <BrowserRouter>
      <After data={data} routes={routes} />
    </BrowserRouter>,
    root,
  ),
);

if (module.hot) {
  module.hot.accept();
}
