/* eslint-disable */
/*
 * © Jordan Tart https://github.com/jtart
 * https://github.com/jtart/react-universal-app
 */
import React, { useContext } from 'react';
import { StaticRouter, BrowserRouter } from 'react-router-dom';
import { createInstance, OptimizelyProvider } from '@optimizely/react-sdk';
import { ServiceContext } from '#contexts/ServiceContext';
import App from './App';

const optimizely = createInstance({
  sdkKey: process.env.SIMORGH_OPTIMIZELY_SDK_KEY,
  eventBatchSize: 100,
  eventFlushInterval: 1000,
});

export class ClientApp extends React.Component {
  // Having an error boundary here means that if hydration fails, users are left with the server-rendered DOM
  // Without this, DOM would be removed if hydration fails, leaving users with a blank white page
  componentDidCatch() {}

  render() {
    return (
      <OptimizelyProvider
        optimizely={optimizely}
        user={{
          id: 'default_user',
          attributes: {
            service: 'mundo',
          }
        }}
      >
        <BrowserRouter {...this.props}>
          <App initialData={this.props.data} />
        </BrowserRouter>
      </OptimizelyProvider>
    );
  }
}

export const ServerApp = props => (
  <OptimizelyProvider
    optimizely={optimizely}
    user={{
      id: 'default_user1',
      attributes: {
        service: 'pidgin',
      }
    }}
  >
    <StaticRouter {...props}>
      <App initialData={props.data} bbcOrigin={props.bbcOrigin} />
    </StaticRouter>
  </OptimizelyProvider>
);
