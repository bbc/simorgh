/* eslint-disable */
/*
 * © Jordan Tart https://github.com/jtart
 * https://github.com/jtart/react-universal-app
 */
import React from 'react';
import { StaticRouter, MemoryRouter } from 'react-router';
import App from './App';

export class ClientApp extends React.Component {
  // Having an error boundary here means that if hydration fails, users are left with the server-rendered DOM
  // Without this, DOM would be removed if hydration fails, leaving users with a blank white page
  componentDidCatch() {}

  render() {
    return (
      <MemoryRouter {...this.props}>
        <App initialData={this.props.data} />
      </MemoryRouter>
    );
  }
}

export const ServerApp = props => (
  <StaticRouter {...props}>
    <App initialData={props.data} bbcOrigin={props.bbcOrigin} />
  </StaticRouter>
);
