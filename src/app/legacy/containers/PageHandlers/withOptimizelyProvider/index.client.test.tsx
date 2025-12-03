/* eslint-disable import/no-unresolved */
import React, { useMemo } from 'react';
import * as optimizelyReactSdk from '@optimizely/react-sdk';
import { UserInfo } from '@optimizely/react-sdk/dist/utils';
import { render } from '@testing-library/react';
import Cookie from 'js-cookie';
import { GEL_GROUP_3_SCREEN_WIDTH_MAX } from '#psammead/gel-foundations/src/breakpoints';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext, RequestContextProps } from '#contexts/RequestContext';
import { ServiceConfig } from '#app/models/types/serviceConfig';
import latin from '../../../../components/ThemeProvider/fontScripts/latin';
import withOptimizelyProvider, { REFERRER_CATEGORIES } from '.';

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

const TestComponent = ({ country }: { country?: string }) => {
  const OptimizelyComponent = withOptimizelyProvider(Component);

  const memoizedServiceContextValue = useMemo(
    () => ({ script: latin, service: 'news' }),
    [],
  ) as ServiceConfig;

  const memoizedRequestContextValue = useMemo(
    () => ({ country }),
    [country],
  ) as RequestContextProps;

  return (
    <ServiceContext.Provider value={memoizedServiceContextValue}>
      <RequestContext.Provider value={memoizedRequestContextValue}>
        <OptimizelyComponent {...props} />
      </RequestContext.Provider>
    </ServiceContext.Provider>
  );
};

jest.mock('./isCypress', () => jest.fn().mockImplementation(() => false));
jest.mock('@optimizely/react-sdk');

describe('withOptimizelyProvider HOC', () => {
  const originalMatchMedia = window.matchMedia;

  afterEach(() => {
    jest.clearAllMocks();
    Cookie.remove('ckns_mvt');
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

  describe('mobile attribute', () => {
    it('should set mobile to true when the viewport width is less than or equal to GEL_GROUP_3_SCREEN_WIDTH_MAX', () => {
      window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: query === `(max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX})`,
      }));

      render(<TestComponent />);

      expect(
        (optimizelyProviderSpy.mock.calls[0]?.[0]?.user as UserInfo)?.attributes
          ?.mobile,
      ).toBe(true);
    });

    it('should set mobile to false when the viewport width is greater than GEL_GROUP_3_SCREEN_WIDTH_MAX', () => {
      window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: query !== `(max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX})`,
      }));

      render(<TestComponent />);

      expect(
        (optimizelyProviderSpy.mock.calls[0]?.[0]?.user as UserInfo)?.attributes
          ?.mobile,
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

    it.each(REFERRER_CATEGORIES.SEARCH)(
      'should set referrer to "search" when the document.referrer contains %s',
      domain => {
        Object.defineProperty(document, 'referrer', {
          value: `https://www.${domain}.com`,
          writable: true,
        });

        render(<TestComponent />);

        expect(
          (optimizelyProviderSpy.mock.calls[0]?.[0]?.user as UserInfo)
            ?.attributes?.referrer,
        ).toBe('search');
      },
    );

    it.each(REFERRER_CATEGORIES.SOCIAL)(
      'should set referrer to "social" when the document.referrer contains %s',
      domain => {
        Object.defineProperty(document, 'referrer', {
          value: `https://www.${domain}.com`,
          writable: true,
        });

        render(<TestComponent />);

        expect(
          (optimizelyProviderSpy.mock.calls[0]?.[0]?.user as UserInfo)
            ?.attributes?.referrer,
        ).toBe('social');
      },
    );

    it.each(REFERRER_CATEGORIES.DIRECT)(
      'should set referrer to "direct" when the document.referrer contains %s',
      domain => {
        Object.defineProperty(document, 'referrer', {
          value: `https://www.${domain}`,
          writable: true,
        });

        render(<TestComponent />);

        expect(
          (optimizelyProviderSpy.mock.calls[0]?.[0]?.user as UserInfo)
            ?.attributes?.referrer,
        ).toBe('direct');
      },
    );

    it.each(REFERRER_CATEGORIES.AT_PARAM_VALUES)(
      'should set referrer to "social" when the at_campaign URL parameter is %s',
      atParamValue => {
        Object.defineProperty(window, 'location', {
          value: { search: `?at_campaign=${atParamValue}` },
          writable: true,
        });

        render(<TestComponent />);

        expect(
          (optimizelyProviderSpy.mock.calls[0]?.[0]?.user as UserInfo)
            ?.attributes?.referrer,
        ).toBe('social');
      },
    );

    it.each(REFERRER_CATEGORIES.AT_PARAM_VALUES)(
      'should set referrer to "social" when the at_medium URL parameter is %s',
      atParamValue => {
        Object.defineProperty(window, 'location', {
          value: { search: `?at_medium=${atParamValue}` },
          writable: true,
        });

        render(<TestComponent />);

        expect(
          (optimizelyProviderSpy.mock.calls[0]?.[0]?.user as UserInfo)
            ?.attributes?.referrer,
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
        (optimizelyProviderSpy.mock.calls[0]?.[0]?.user as UserInfo)?.attributes
          ?.referrer,
      ).toBe('direct');
    });

    it('should set referrer to null when no conditions are met', () => {
      Object.defineProperty(document, 'referrer', {
        value: 'https://www.unknownsource.com',
        writable: true,
      });

      Object.defineProperty(window, 'location', {
        value: { search: '' },
        writable: true,
      });

      render(<TestComponent />);

      expect(
        (optimizelyProviderSpy.mock.calls[0]?.[0]?.user as UserInfo)?.attributes
          ?.referrer,
      ).toBeNull();
    });
  });

  describe('country attribute', () => {
    it('should set country to the value provided by RequestContext', () => {
      render(<TestComponent country="gb" />);

      expect(
        (optimizelyProviderSpy.mock.calls[0]?.[0]?.user as UserInfo)?.attributes
          ?.country,
      ).toBe('gb');
    });

    it('should set country to null when RequestContext does not provide a country', () => {
      render(<TestComponent />);

      expect(
        (optimizelyProviderSpy.mock.calls[0]?.[0]?.user as UserInfo)?.attributes
          ?.country,
      ).toBeNull();
    });
  });
});
