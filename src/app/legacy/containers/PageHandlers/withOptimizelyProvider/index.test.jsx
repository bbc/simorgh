import React, { useMemo } from 'react';
import * as optimizelyReactSdk from '@optimizely/react-sdk';
import { render } from '@testing-library/react';
import Cookie from 'js-cookie';
import { GEL_GROUP_3_SCREEN_WIDTH_MAX } from '#psammead/gel-foundations/src/breakpoints';
import latin from '../../../../components/ThemeProvider/fontScripts/latin';
import { ServiceContext } from '../../../../contexts/ServiceContext';
import withOptimizelyProvider from '.';

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

const optimizelyProviderSpy = jest.spyOn(
  optimizelyReactSdk,
  'OptimizelyProvider',
);

const Component = () => <h1>Hola Optimizely</h1>;
const OptimizelyComponent = withOptimizelyProvider(Component);

const TestComponent = () => {
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

jest.mock('./isCypress', () => jest.fn().mockImplementation(() => false));
jest.mock('@optimizely/react-sdk');

describe('withOptimizelyProvider HOC', () => {
  const originalMatchMedia = window.matchMedia;

  afterEach(() => {
    jest.clearAllMocks();
    window.matchMedia = originalMatchMedia;
  });

  it('should enrich the component with the Optimizely API', () => {
    const optimizelyProviderRenderSpy = jest.spyOn(
      optimizelyReactSdk.OptimizelyProvider.prototype,
      'render',
    );

    render(<TestComponent />);

    expect(optimizelyProviderRenderSpy).toHaveBeenCalledTimes(1);
  });

  it('should return undefined when ckns_mvt is fetched with Cookie.get', () => {
    const cookieGetterSpy = jest.spyOn(Cookie, 'get');

    render(<TestComponent />);

    expect(cookieGetterSpy).toHaveBeenCalledWith('ckns_mvt');
    expect(cookieGetterSpy).toHaveReturnedWith(undefined);
  });

  it('should return the correct ckns_mvt cookie value from Cookie.get', () => {
    const cookieGetterSpy = jest.spyOn(Cookie, 'get');
    Cookie.set('ckns_mvt', 'random-uuid');

    render(<TestComponent />);

    expect(cookieGetterSpy).toHaveBeenCalledWith('ckns_mvt');
    expect(cookieGetterSpy).toHaveReturnedWith('random-uuid');
  });

  it('should set mobile to true when the viewport width is less than or equal to GEL_GROUP_3_SCREEN_WIDTH_MAX', () => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === `(max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX})`,
    }));

    render(<TestComponent />);

    expect(optimizelyProviderSpy.mock.calls[0][0].user.attributes.mobile).toBe(
      true,
    );
  });

  it('should set mobile to false when the viewport width is greater than GEL_GROUP_3_SCREEN_WIDTH_MAX', () => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query !== `(max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX})`,
    }));

    render(<TestComponent />);

    expect(optimizelyProviderSpy.mock.calls[0][0].user.attributes.mobile).toBe(
      false,
    );
  });

  // TODO: Will be extended in https://bbc.atlassian.net/browse/WS-947
  it('should set referrer to null', () => {
    render(<TestComponent />);

    expect(
      optimizelyProviderSpy.mock.calls[0][0].user.attributes.referrer,
    ).toBeNull();
  });
});
