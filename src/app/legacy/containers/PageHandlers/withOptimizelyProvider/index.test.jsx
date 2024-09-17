import React, { useMemo } from 'react';
import * as optimizelyReactSdk from '@optimizely/react-sdk';
import { render } from '@testing-library/react';
import latin from '#components/ThemeProvider/fontScripts/latin';
import { ServiceContext } from '#contexts/ServiceContext';
import withOptimizelyProvider from '.';

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

const TestComponent = () => {
  const Component = () => <h1>Hola Optimizely</h1>;

  const OptimizelyComponent = withOptimizelyProvider(Component);

  const memoizedServiceContextValue = useMemo(
    () => ({ script: latin, service: 'news' }),
    [],
  );

  return (
    <ServiceContext.Provider value={memoizedServiceContextValue}>
      <OptimizelyComponent {...props} />
    </ServiceContext.Provider>
  );
};

describe('withOptimizelyProvider HOC', () => {
  it('should enrich the component with the Optimizely API', () => {
    render(<TestComponent />);

    expect(optimizelyProviderSpy).toHaveBeenCalledTimes(1);
  });
});
