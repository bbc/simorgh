import React from 'react';
import * as optimizelyReactSdk from '@optimizely/react-sdk';
import { render } from '@testing-library/react';
import { latin } from '@bbc/gel-foundations/scripts';
import { ServiceContext } from '#contexts/ServiceContext';
import withOptimizelyProvider from '.';

describe('withOptimizelyProvider HOC', () => {
  const optimizelyProviderSpy = jest.spyOn(
    optimizelyReactSdk.OptimizelyProvider.prototype,
    'render',
  );

  const props = {
    bbcOrigin: 'https://www.bbc.com',
    id: 'c0000000000o',
    service: 'news',
    isAmp: true,
    pathname: '/pathname',
    status: 200,
    showAdsBasedOnLocation: true,
    toggles: {
      testToggle: {
        enabled: false,
      },
    },
  };

  it('should load Optimizely with correct params', () => {
    const Component = () => <h1>Hola Optimizely</h1>;

    const OptimizelyComponent = withOptimizelyProvider(Component);

    const TestComponent = () => (
      <ServiceContext.Provider value={{ script: latin, service: 'news' }}>
        <OptimizelyComponent {...props} />
      </ServiceContext.Provider>
    );

    render(<TestComponent />);

    expect(optimizelyProviderSpy).toHaveBeenCalledTimes(1);
  });
});
