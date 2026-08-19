/* eslint-disable import/no-unresolved */
import { useMemo } from 'react';
import * as optimizelyReactSdk from '@optimizely/react-sdk';
import { UserInfo } from '@optimizely/react-sdk/dist/utils';
import { render } from '@testing-library/react';
import Cookie from 'js-cookie';
import { GROUP_3_MAX_WIDTH_BP } from '#app/components/ThemeProvider/mediaQueries';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext, RequestContextProps } from '#contexts/RequestContext';
import { ServiceConfig } from '#app/models/types/serviceConfig';
import latin from '../../../../components/ThemeProvider/fontScripts/latin';
import withOptimizelyProvider from '.';
import { REFERRER_CATEGORIES } from './userAttributes';

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
    it('should set mobile to true when the viewport width is less than or equal to GROUP_3_MAX_WIDTH_BP', () => {
      window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: query === `(max-width: ${GROUP_3_MAX_WIDTH_BP}rem)`,
      }));

      render(<TestComponent />);

      expect(
        (optimizelyProviderSpy.mock.calls[0]?.[0]?.user as UserInfo)?.attributes
          ?.mobile,
      ).toBe(true);
    });

    it('should set mobile to false when the viewport width is greater than GROUP_3_MAX_WIDTH_BP', () => {
      window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: query !== `(max-width: ${GROUP_3_MAX_WIDTH_BP}rem)`,
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

  describe('timeOfDay attribute', () => {
    afterEach(() => {
      jest.useRealTimers();
    });

    it('should set timeOfDay to "morning" when the current hour is between 6 and 11', () => {
      jest.useFakeTimers().setSystemTime(new Date('2024-01-01T08:00:00'));
      render(<TestComponent />);

      expect(
        (optimizelyProviderSpy.mock.calls[0]?.[0]?.user as UserInfo)?.attributes
          ?.timeOfDay,
      ).toBe('morning');
    });

    it('should set timeOfDay to "afternoon" when the current hour is between 12 and 16', () => {
      jest.useFakeTimers().setSystemTime(new Date('2024-01-01T13:00:00'));

      render(<TestComponent />);

      expect(
        (optimizelyProviderSpy.mock.calls[0]?.[0]?.user as UserInfo)?.attributes
          ?.timeOfDay,
      ).toBe('afternoon');
    });

    it('should set timeOfDay to "evening" when the current hour is between 17 and 23', () => {
      jest.useFakeTimers().setSystemTime(new Date('2024-01-01T18:00:00'));

      render(<TestComponent />);

      expect(
        (optimizelyProviderSpy.mock.calls[0]?.[0]?.user as UserInfo)?.attributes
          ?.timeOfDay,
      ).toBe('evening');
    });

    it('should set timeOfDay to "night" when the current hour is between 0 and 5', () => {
      jest.useFakeTimers().setSystemTime(new Date('2024-01-01T02:00:00'));

      render(<TestComponent />);

      expect(
        (optimizelyProviderSpy.mock.calls[0]?.[0]?.user as UserInfo)?.attributes
          ?.timeOfDay,
      ).toBe('night');
    });
  });

  describe('page view tracking', () => {
    const mockTrack = jest.fn();
    let capturedDecisionListener: ((payload: object) => void) | undefined;

    beforeEach(() => {
      capturedDecisionListener = undefined;
      mockTrack.mockReset();
      localStorage.clear();
      Object.defineProperty(window, 'location', {
        value: { pathname: '/pathname', search: '' },
        writable: true,
      });

      // The notification listener is registered at module initialisation time (top-level code
      // in index.tsx), so the standard top-level import would have already run before any mocks
      // are in place. To test the listener we need to:
      //   1. jest.resetModules() — clear the module registry so the next require is a fresh load
      //   2. jest.doMock(...)    — queue controlled mocks, including the addNotificationListener
      //                           spy that captures the callback into capturedDecisionListener
      //   3. require('./index') — trigger a fresh module load against those mocks, causing the
      //                           listener registration to run synchronously
      // Each test can then call capturedDecisionListener directly to exercise the listener logic.
      jest.resetModules();

      jest.doMock('@optimizely/react-sdk', () => ({
        createInstance: jest.fn(() => ({
          notificationCenter: {
            addNotificationListener: jest.fn((_, cb) => {
              capturedDecisionListener = cb;
            }),
          },
          track: mockTrack,
        })),
        OptimizelyProvider: jest.fn(),
        setLogger: jest.fn(),
        enums: {
          NOTIFICATION_TYPES: { DECISION: 'DECISION' },
        },
      }));
      jest.doMock('./isCypress', () => jest.fn().mockReturnValue(false));
      jest.doMock('#app/lib/optimizelyDecisionStore', () => ({
        notifyDecision: jest.fn(),
      }));
      // eslint-disable-next-line global-require
      require('./index');
    });

    afterEach(() => {
      jest.resetModules();
    });

    it('should call optimizely.track with page-views when decisionEventDispatched is true and the flag is active', () => {
      capturedDecisionListener?.({
        decisionInfo: {
          flagKey: 'test_flag',
          variationKey: 'on',
          decisionEventDispatched: true,
        },
      });

      expect(mockTrack).toHaveBeenCalledWith('page-views');
    });

    it('should not call optimizely.track when decisionEventDispatched is false', () => {
      capturedDecisionListener?.({
        decisionInfo: {
          flagKey: 'test_flag',
          variationKey: 'on',
          decisionEventDispatched: false,
        },
      });

      expect(mockTrack).not.toHaveBeenCalled();
    });

    it('should not call optimizely.track when variationKey is off', () => {
      capturedDecisionListener?.({
        decisionInfo: {
          flagKey: 'test_flag',
          variationKey: 'off',
          decisionEventDispatched: true,
        },
      });

      expect(mockTrack).not.toHaveBeenCalled();
    });

    it('should not call optimizely.track when variationKey is undefined', () => {
      capturedDecisionListener?.({
        decisionInfo: {
          flagKey: 'test_flag',
          decisionEventDispatched: true,
        },
      });

      expect(mockTrack).not.toHaveBeenCalled();
    });

    it('should not call optimizely.track when both flagKey and experimentKey are missing', () => {
      capturedDecisionListener?.({
        decisionInfo: {
          variationKey: 'on',
          decisionEventDispatched: true,
        },
      });

      expect(mockTrack).not.toHaveBeenCalled();
    });

    it('should call optimizely.track with page-views for a legacy activate() decision (experimentKey without decisionEventDispatched)', () => {
      capturedDecisionListener?.({
        decisionInfo: {
          experimentKey: 'newswb_ws_article_account_promo_banner',
          variationKey: 'on',
        },
      });

      expect(mockTrack.mock.calls.map(call => call[0])).toEqual([
        'visit',
        'page-views',
      ]);
    });

    it('should not call optimizely.track for a legacy activate() decision when variationKey is off', () => {
      capturedDecisionListener?.({
        decisionInfo: {
          experimentKey: 'newswb_ws_article_account_promo_banner',
          variationKey: 'off',
        },
      });

      expect(mockTrack).not.toHaveBeenCalled();
    });

    it('should send the visit event before the page-views event on a new visit', () => {
      capturedDecisionListener?.({
        decisionInfo: {
          flagKey: 'test_flag',
          variationKey: 'on',
          decisionEventDispatched: true,
        },
      });

      expect(mockTrack.mock.calls.map(call => call[0])).toEqual([
        'visit',
        'page-views',
      ]);
    });

    it('should not send a visit event within the visit timeout window', () => {
      const tenMinutesAgo = Date.now() - 10 * 60 * 1000;
      localStorage.setItem('last_visit_ts', String(tenMinutesAgo));

      capturedDecisionListener?.({
        decisionInfo: {
          flagKey: 'test_flag',
          variationKey: 'on',
          decisionEventDispatched: true,
        },
      });

      expect(mockTrack).toHaveBeenCalledTimes(1);
      expect(mockTrack).toHaveBeenCalledWith('page-views');
    });

    it('should send visit then page-views exactly once when multiple experiments fire decisions for the same URL', () => {
      capturedDecisionListener?.({
        decisionInfo: {
          flagKey: 'experiment_1',
          variationKey: 'on',
          decisionEventDispatched: true,
        },
      });
      capturedDecisionListener?.({
        decisionInfo: {
          flagKey: 'experiment_2',
          variationKey: 'on',
          decisionEventDispatched: true,
        },
      });

      expect(mockTrack.mock.calls.map(call => call[0])).toEqual([
        'visit',
        'page-views',
      ]);
    });

    it('should send page-views again on a new URL without re-sending visit within the same session', () => {
      capturedDecisionListener?.({
        decisionInfo: {
          flagKey: 'experiment_1',
          variationKey: 'on',
          decisionEventDispatched: true,
        },
      });

      Object.defineProperty(window, 'location', {
        value: { pathname: '/new-page', search: '' },
        writable: true,
      });

      capturedDecisionListener?.({
        decisionInfo: {
          flagKey: 'experiment_1',
          variationKey: 'on',
          decisionEventDispatched: true,
        },
      });

      expect(mockTrack.mock.calls.map(call => call[0])).toEqual([
        'visit',
        'page-views',
        'page-views',
      ]);
    });

    it('should send page-views again when navigating back to a previously visited URL', () => {
      capturedDecisionListener?.({
        decisionInfo: {
          flagKey: 'experiment_1',
          variationKey: 'on',
          decisionEventDispatched: true,
        },
      });

      Object.defineProperty(window, 'location', {
        value: { pathname: '/new-page', search: '' },
        writable: true,
      });

      capturedDecisionListener?.({
        decisionInfo: {
          flagKey: 'experiment_1',
          variationKey: 'on',
          decisionEventDispatched: true,
        },
      });

      Object.defineProperty(window, 'location', {
        value: { pathname: '/pathname', search: '' },
        writable: true,
      });

      capturedDecisionListener?.({
        decisionInfo: {
          flagKey: 'experiment_1',
          variationKey: 'on',
          decisionEventDispatched: true,
        },
      });

      expect(mockTrack.mock.calls.map(call => call[0])).toEqual([
        'visit',
        'page-views',
        'page-views',
        'page-views',
      ]);
    });

    it('should send page-views again when the same pathname is visited with different query parameters', () => {
      capturedDecisionListener?.({
        decisionInfo: {
          flagKey: 'experiment_1',
          variationKey: 'on',
          decisionEventDispatched: true,
        },
      });

      Object.defineProperty(window, 'location', {
        value: { pathname: '/pathname', search: '?page=2' },
        writable: true,
      });

      capturedDecisionListener?.({
        decisionInfo: {
          flagKey: 'experiment_1',
          variationKey: 'on',
          decisionEventDispatched: true,
        },
      });

      expect(mockTrack.mock.calls.map(call => call[0])).toEqual([
        'visit',
        'page-views',
        'page-views',
      ]);
    });

    describe('signed-in page view tracking', () => {
      afterEach(() => {
        Cookie.remove('ckns_id');
      });

      it('should send the signed-in-page-views event alongside page-views when the user is signed in', () => {
        Cookie.set('ckns_id', 'signed-in-token');

        capturedDecisionListener?.({
          decisionInfo: {
            flagKey: 'test_flag',
            variationKey: 'on',
            decisionEventDispatched: true,
          },
        });

        expect(mockTrack.mock.calls.map(call => call[0])).toEqual([
          'visit',
          'page-views',
          'signed-in-page-views',
        ]);
      });

      it('should not send the signed-in-page-views event when the user is signed out', () => {
        capturedDecisionListener?.({
          decisionInfo: {
            flagKey: 'test_flag',
            variationKey: 'on',
            decisionEventDispatched: true,
          },
        });

        expect(mockTrack.mock.calls.map(call => call[0])).toEqual([
          'visit',
          'page-views',
        ]);
        expect(mockTrack).not.toHaveBeenCalledWith('signed-in-page-views');
      });

      it('should send the signed-in-page-views event only once per page view for the same URL', () => {
        Cookie.set('ckns_id', 'signed-in-token');

        capturedDecisionListener?.({
          decisionInfo: {
            flagKey: 'experiment_1',
            variationKey: 'on',
            decisionEventDispatched: true,
          },
        });
        capturedDecisionListener?.({
          decisionInfo: {
            flagKey: 'experiment_2',
            variationKey: 'on',
            decisionEventDispatched: true,
          },
        });

        expect(
          mockTrack.mock.calls.filter(
            call => call[0] === 'signed-in-page-views',
          ),
        ).toHaveLength(1);
      });
    });

    it('should not track or notify decisions when not on client', () => {
      jest.resetModules();

      let serverCapturedListener: ((payload: object) => void) | undefined;
      const serverMockTrack = jest.fn();
      const serverMockNotifyDecision = jest.fn();

      jest.doMock('#lib/utilities/onClient', () =>
        jest.fn().mockReturnValue(false),
      );
      jest.doMock('@optimizely/react-sdk', () => ({
        createInstance: jest.fn(() => ({
          notificationCenter: {
            addNotificationListener: jest.fn((_, cb) => {
              serverCapturedListener = cb;
            }),
          },
          track: serverMockTrack,
        })),
        OptimizelyProvider: jest.fn(),
        setLogger: jest.fn(),
        enums: { NOTIFICATION_TYPES: { DECISION: 'DECISION' } },
      }));
      jest.doMock('./isCypress', () => jest.fn().mockReturnValue(false));
      jest.doMock('#app/lib/optimizelyDecisionStore', () => ({
        notifyDecision: serverMockNotifyDecision,
      }));
      // eslint-disable-next-line global-require
      require('./index');

      serverCapturedListener?.({
        decisionInfo: {
          flagKey: 'test_flag',
          variationKey: 'on',
          decisionEventDispatched: true,
        },
      });

      expect(serverMockTrack).not.toHaveBeenCalled();
      expect(serverMockNotifyDecision).not.toHaveBeenCalled();
    });
  });

  describe('activation event tracking', () => {
    const mocksendExperimentActivationEvent = jest.fn();
    const mockNotifyDecision = jest.fn();
    const mockActivationContext = {
      trackingIsEnabled: true,
      pageIdentifier: 'page-identifier',
      producerName: 'producer-name',
      statsDestination: 'stats-destination',
      isSignedIn: false,
      hashedId: null,
    };
    let capturedDecisionListener: ((payload: object) => void) | undefined;

    beforeEach(() => {
      capturedDecisionListener = undefined;
      mocksendExperimentActivationEvent.mockReset();
      mockNotifyDecision.mockReset().mockReturnValue(true);

      jest.resetModules();

      jest.doMock('#lib/utilities/onClient', () =>
        jest.fn().mockReturnValue(true),
      );
      jest.doMock('@optimizely/react-sdk', () => ({
        createInstance: jest.fn(() => ({
          notificationCenter: {
            addNotificationListener: jest.fn((_, cb) => {
              capturedDecisionListener = cb;
            }),
          },
          track: jest.fn(),
        })),
        OptimizelyProvider: jest.fn(),
        setLogger: jest.fn(),
        enums: { NOTIFICATION_TYPES: { DECISION: 'DECISION' } },
      }));
      jest.doMock('./isCypress', () => jest.fn().mockReturnValue(false));
      jest.doMock('#app/lib/optimizelyDecisionStore', () => ({
        notifyDecision: mockNotifyDecision,
      }));
      jest.doMock(
        '#app/lib/analyticsUtils/sendExperimentActivationEvent',
        () => ({
          __esModule: true,
          default: mocksendExperimentActivationEvent,
        }),
      );
      jest.doMock('#app/lib/analyticsUtils/activationContext', () => ({
        getActivationContext: () => mockActivationContext,
      }));
      // eslint-disable-next-line global-require
      require('./index');
    });

    afterEach(() => {
      jest.resetModules();
    });

    it('should send the activation event when a new decision is dispatched with an impression', () => {
      capturedDecisionListener?.({
        decisionInfo: {
          flagKey: 'test_flag',
          variationKey: 'control',
          decisionEventDispatched: true,
        },
      });

      expect(mocksendExperimentActivationEvent).toHaveBeenCalledTimes(1);
      expect(mocksendExperimentActivationEvent).toHaveBeenCalledWith({
        experimentName: 'test_flag',
        experimentVariant: 'control',
        ...mockActivationContext,
      });
    });

    it('should not send the activation event when no impression was dispatched', () => {
      capturedDecisionListener?.({
        decisionInfo: {
          flagKey: 'test_flag',
          variationKey: 'control',
          decisionEventDispatched: false,
        },
      });

      expect(mocksendExperimentActivationEvent).not.toHaveBeenCalled();
    });

    it('should not send the activation event when the variation is "off"', () => {
      capturedDecisionListener?.({
        decisionInfo: {
          flagKey: 'test_flag',
          variationKey: 'off',
          decisionEventDispatched: true,
        },
      });

      expect(mocksendExperimentActivationEvent).not.toHaveBeenCalled();
    });

    it('should not send the activation event again for a decision already recorded this session', () => {
      capturedDecisionListener?.({
        decisionInfo: {
          flagKey: 'test_flag',
          variationKey: 'control',
          decisionEventDispatched: true,
        },
      });

      mockNotifyDecision.mockReturnValue(false);

      capturedDecisionListener?.({
        decisionInfo: {
          flagKey: 'test_flag',
          variationKey: 'control',
          decisionEventDispatched: true,
        },
      });

      expect(mocksendExperimentActivationEvent).toHaveBeenCalledTimes(1);
    });

    it('should send the activation event for a legacy activate() decision (experimentKey without decisionEventDispatched)', () => {
      capturedDecisionListener?.({
        decisionInfo: {
          experimentKey: 'newswb_ws_article_account_promo_banner',
          variationKey: 'control',
        },
      });

      expect(mocksendExperimentActivationEvent).toHaveBeenCalledTimes(1);
      expect(mocksendExperimentActivationEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          experimentName: 'newswb_ws_article_account_promo_banner',
          experimentVariant: 'control',
        }),
      );
    });
  });
});
