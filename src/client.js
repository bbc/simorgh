/* eslint-disable react/jsx-filename-extension  */
import React from 'react';
import 'babel-polyfill';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ensureReady, After } from '@jaredpalmer/after';
import routes from './app/routes';

const root = document.getElementById('root');

const object1 = {
  a: 1,
  b: 2,
  c: 3,
};

const object2 = Object.assign({ c: 4, d: 5 }, object1);

console.log(object2.c);
console.log(object2.d);

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
