import React, { useMemo } from 'react';
import * as optimizelyReactSdk from '@optimizely/react-sdk';
import { render } from '@testing-library/react';
import Cookie from 'js-cookie';
import { GEL_GROUP_3_SCREEN_WIDTH_MAX } from '#psammead/gel-foundations/src/breakpoints';
import latin from '../../../../components/ThemeProvider/fontScripts/latin';
import { ServiceContext } from '../../../../contexts/ServiceContext';
import withOptimizelyProvider, {
  DIRECT_DOMAINS,
  SEARCH_DOMAINS,
  SOCIAL_DOMAINS,
  SOCIAL_AT_PARAM_VALUES,
} from '.';

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

const cookieGetterSpy = jest.spyOn(Cookie, 'get');

const Component = () => <h1>Hola Optimizely</h1>;

const TestComponent = () => {
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
    render(<TestComponent />);

    expect(cookieGetterSpy).toHaveBeenCalledWith('ckns_mvt');
    expect(cookieGetterSpy).toHaveReturnedWith(undefined);
  });

  it('should return the correct ckns_mvt cookie value from Cookie.get', () => {
    cookieGetterSpy.mockReturnValue('random_uuid');

    render(<TestComponent />);

    expect(cookieGetterSpy).toHaveBeenCalledWith('ckns_mvt');
    expect(cookieGetterSpy).toHaveReturnedWith('random_uuid');
  });

  describe('mobile attribute', () => {
    it('should set mobile to true when the viewport width is less than or equal to GEL_GROUP_3_SCREEN_WIDTH_MAX', () => {
      window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: query === `(max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX})`,
      }));

      render(<TestComponent />);

      expect(
        optimizelyProviderSpy.mock.calls[0][0].user.attributes.mobile,
      ).toBe(true);
    });

    it('should set mobile to false when the viewport width is greater than GEL_GROUP_3_SCREEN_WIDTH_MAX', () => {
      window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: query !== `(max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX})`,
      }));

      render(<TestComponent />);

      expect(
        optimizelyProviderSpy.mock.calls[0][0].user.attributes.mobile,
      ).toBe(false);
    });
  });

  describe('referrer attribute', () => {
    beforeEach(() => {
      // Reset document.referrer and window.location.search before each test
      Object.defineProperty(document, 'referrer', {
        value: '',
        writable: true,
      });
      Object.defineProperty(window, 'location', {
        value: { search: '' },
        writable: true,
      });
    });

    it.each(SEARCH_DOMAINS)(
      'should set referrer to "search" when the document.referrer contains %s',
      domain => {
        Object.defineProperty(document, 'referrer', {
          value: `https://www.${domain}.com`,
          writable: true,
        });

        render(<TestComponent />);

        expect(
          optimizelyProviderSpy.mock.calls[0][0].user.attributes.referrer,
        ).toBe('search');
      },
    );

    it.each(SOCIAL_DOMAINS)(
      'should set referrer to "social" when the document.referrer contains %s',
      domain => {
        Object.defineProperty(document, 'referrer', {
          value: `https://www.${domain}.com`,
          writable: true,
        });

        render(<TestComponent />);

        expect(
          optimizelyProviderSpy.mock.calls[0][0].user.attributes.referrer,
        ).toBe('social');
      },
    );

    it.each(DIRECT_DOMAINS)(
      'should set referrer to "direct" when the document.referrer contains %s',
      domain => {
        Object.defineProperty(document, 'referrer', {
          value: `https://www.${domain}`,
          writable: true,
        });

        render(<TestComponent />);

        expect(
          optimizelyProviderSpy.mock.calls[0][0].user.attributes.referrer,
        ).toBe('direct');
      },
    );

    it.each(SOCIAL_AT_PARAM_VALUES)(
      'should set referrer to "social" when the at_campaign URL parameter is %s',
      atParamValue => {
        Object.defineProperty(window, 'location', {
          value: { search: `?at_campaign=${atParamValue}` },
          writable: true,
        });

        render(<TestComponent />);

        expect(
          optimizelyProviderSpy.mock.calls[0][0].user.attributes.referrer,
        ).toBe('social');
      },
    );

    it.each(SOCIAL_AT_PARAM_VALUES)(
      'should set referrer to "social" when the at_medium URL parameter is %s',
      atParamValue => {
        Object.defineProperty(window, 'location', {
          value: { search: `?at_medium=${atParamValue}` },
          writable: true,
        });

        render(<TestComponent />);

        expect(
          optimizelyProviderSpy.mock.calls[0][0].user.attributes.referrer,
        ).toBe('social');
      },
    );

    it('should set referrer to "direct" when the document.referrer is empty', () => {
      Object.defineProperty(document, 'referrer', {
        value: '',
        writable: true,
      });

      render(<TestComponent />);

      expect(
        optimizelyProviderSpy.mock.calls[0][0].user.attributes.referrer,
      ).toBe('direct');
    });
  });
});
