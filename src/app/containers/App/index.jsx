/* eslint-disable */
/*
 * © Jordan Tart https://github.com/jtart
 * https://github.com/jtart/react-universal-app
 */
import React from 'react';
import { StaticRouter, BrowserRouter } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { getAtUserId } from '../../lib/analyticsUtils';

import App from './App';

const invokeUuid = () => {
  try {
    return uuid();
  } catch (e) {
    return e;
  }
};

export const ClientApp = props => (
  <div>
    <div>weakmap: {new WeakMap().set(window, 'foo').get(window)}</div>
    <div>uint8array: {new Uint8Array(123).length}</div>
    <div>crypto: {crypto.toString()}</div>
    <div>
      isExtreme:{' '}
      {Object.prototype.toString.call(window.operamini) === '[object OperaMini]'
        ? 'true'
        : 'false'}
    </div>
    <div>uuid: {invokeUuid()}</div>
    <div>getAtUserId: {getAtUserId()}</div>
    <BrowserRouter {...props}>
      <App initialData={props.data} />
    </BrowserRouter>
  </div>
);

export const ServerApp = props => (
  <StaticRouter {...props}>
    on server
    <App initialData={props.data} bbcOrigin={props.bbcOrigin} />
  </StaticRouter>
);
