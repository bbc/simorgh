/* eslint-disable */
/*
 * © Jordan Tart https://github.com/jtart
 * https://github.com/jtart/react-universal-app
 */
import React from 'react';
import { StaticRouter, BrowserRouter } from 'react-router-dom';
import { StyleSheetManager } from 'styled-components';
import stylisRTLPlugin from 'stylis-rtl';
import App from './App';

export const ClientApp = props => (
  <BrowserRouter {...props}>
    <StyleSheetManager stylisPlugins={[stylisRTLPlugin]}>
      <App initialData={props.data} routes={props.routes} />
    </StyleSheetManager>
  </BrowserRouter>
);

export const ServerApp = props => (
  <StaticRouter {...props}>
    <StyleSheetManager stylisPlugins={[stylisRTLPlugin]}>
      <App
        initialData={props.data}
        routes={props.routes}
        bbcOrigin={props.bbcOrigin}
      />
    </StyleSheetManager>
  </StaticRouter>
);
