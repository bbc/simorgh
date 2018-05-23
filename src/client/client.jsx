import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ensureReady, After } from '@jaredpalmer/after';
import routes from '../app/routes';

const root = document.getElementById('root'); // eslint-disable-line no-undef

ensureReady(routes).then(data =>
  hydrate(
    <BrowserRouter>
      <After data={data} routes={routes} />
    </BrowserRouter>,
    root,
  ),
);

// eslint-disable-next-line no-undef
if (module.hot) {
  module.hot.accept(); // eslint-disable-line no-undef
}
