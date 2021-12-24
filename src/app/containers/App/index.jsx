/* eslint-disable */
/*
 * © Jordan Tart https://github.com/jtart
 * https://github.com/jtart/react-universal-app
 */
import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// I removed props spreading in this file too

export class ClientApp extends React.Component {
  // Having an error boundary here means that if hydration fails, users are left with the server-rendered DOM
  // Without this, DOM would be removed if hydration fails, leaving users with a blank white page
  componentDidCatch() {}

  render() {
    return (
      <BrowserRouter>
        <App initialData={this.props.data} />
      </BrowserRouter>
    );
  }
}

export const ServerApp = props => (
  <StaticRouter location={props.location}>
    <App initialData={props.data} bbcOrigin={props.bbcOrigin} />
  </StaticRouter>
);
