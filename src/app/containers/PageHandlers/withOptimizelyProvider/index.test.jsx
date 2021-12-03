import React from 'react';
import * as optimizelyReactSdk from '@optimizely/react-sdk';
import { render } from '@testing-library/react';
import { latin } from '@bbc/gel-foundations/scripts';
import withOptimizelyProvider from '.';
import { ServiceContext } from '#contexts/ServiceContext';

describe('withOptimizelyProvider HOC', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const optimizelyProviderSpy = jest.spyOn(
    optimizelyReactSdk,
    'OptimizelyProvider',
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

    const WithOptimizelyProviderHOC = withOptimizelyProvider(Component);

    const TestComponent = () => (
      <ServiceContext.Provider value={{ script: latin, service: 'news' }}>
        <WithOptimizelyProviderHOC {...props} />
      </ServiceContext.Provider>
    );

    const { container } = render(<TestComponent />);

    expect(container).toMatchSnapshot();
    expect(optimizelyProviderSpy).toHaveBeenCalledTimes(1);
  });
});
