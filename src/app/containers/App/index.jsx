/* eslint-disable */
/*
 * © Jordan Tart https://github.com/jtart
 * https://github.com/jtart/react-universal-app
 */
import React from 'react';
import { StaticRouter, BrowserRouter } from 'react-router-dom';
import App from './App';

export const ClientApp = (props) => (
  <BrowserRouter {...props}>
    <App initialData={props.data} routes={props.routes} />
  </BrowserRouter>
);

export const ServerApp = (props) => (
  <StaticRouter {...props}>
    <App
      initialData={props.data}
      routes={props.routes}
      bbcOrigin={props.bbcOrigin}
    />
  </StaticRouter>
);
