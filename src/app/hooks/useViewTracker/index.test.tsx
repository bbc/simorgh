/* eslint-disable no-console */

import React, { createContext, ReactNode } from 'react';
import { OptimizelyProvider, ReactSDKClient } from '@optimizely/react-sdk';
import {
  renderHook,
  act,
} from '#app/components/react-testing-library-with-providers';
import { EventTrackingContextProvider } from '#contexts/EventTrackingContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import { ATIData } from '#app/components/ATIAnalytics/types';
import { Toggles } from '#app/models/types/global';
import * as serviceContextModule from '../../contexts/ServiceContext';
import useViewTracker from '.';
import fixtureData from './fixtureData.json';

process.env.SIMORGH_ATI_BASE_URL = 'https://logws1363.ati-host.net?';

const observers = new Map();

const IntersectionObserver = jest.fn(cb => {
  const item = {
    callback: cb,
    elements: new Set(),
  };

  const instance = {
    observe: jest.fn(element => {
      item.elements.add(element);
    }),
    disconnect: jest.fn(() => {
      item.elements.clear();
    }),
  };

  observers.set(instance, item);

  return instance;
});

const getObserverInstance = (element: HTMLElement) => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - Required for testing purposes. Using @ts-expect-error causes github actions to fail.
    const [instance] = Array.from(observers).find(([, item]) =>
      item.elements.has(element),
    );

    return instance;
  } catch (e) {
    throw new Error('Failed to find IntersectionObserver for element.');
  }
};

const triggerIntersection = ({
  changes,
  observer,
}: {
  changes: Partial<IntersectionObserverEntry>[];
  observer: IntersectionObserver;
}) => {
  const item = observers.get(observer);

  item.callback(changes);
};

const { error } = console;

jest.mock('#app/lib/utilities/getUUID', () =>
  jest.fn().mockImplementation(() => '12345678-abcd-1fed-0123-a1b2c3d4e5f6'),
);

const {
  metadata: { atiAnalytics },
} = fixtureData;

beforeEach(() => {
  jest.clearAllMocks();
  jest.useFakeTimers();
  console.error = jest.fn();

  // @ts-expect-error mocking required for tests
  global.IntersectionObserver = IntersectionObserver;

  jest.replaceProperty(
    serviceContextModule,
    'ServiceContext',
    // @ts-expect-error override service context for tests
    createContext({
      atiAnalyticsProducerId: '70',
      atiAnalyticsProducerName: 'PIDGIN',
      service: 'pidgin',
      useReverb: false,
    }),
  );
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  console.error = error;
  observers.clear();
});

const urlToObject = (url: string) => {
  const { origin, pathname, searchParams } = new URL(url);

  return {
    origin,
    pathname,
    searchParams: Object.fromEntries(searchParams),
  };
};

const defaultToggles = {
  eventTracking: {
    enabled: true,
  },
};

const defaultOptimizely = {
  track: jest.fn(),
  user: { attributes: { foo: 'bar' }, id: 'test' },
} as unknown as ReactSDKClient;

const reverbMock = {
  isReady: jest.fn(),
  initialise: jest.fn(() => Promise.resolve()),
  viewEvent: jest.fn(),
  userActionEvent: jest.fn(),
};

// eslint-disable-next-line no-underscore-dangle
window.__reverb = {
  __reverbLoadedPromise: Promise.resolve(reverbMock),
};

const wrapper = ({
  atiData,
  children,
  toggles = defaultToggles,
  mockOptimizely = defaultOptimizely,
}: {
  atiData?: ATIData;
  children?: ReactNode | null;
  toggles?: Toggles;
  mockOptimizely?: ReactSDKClient;
}) => (
  <OptimizelyProvider optimizely={mockOptimizely} isServerSide>
    <RequestContextProvider
      bbcOrigin="https://www.test.bbc.com"
      pageType={STORY_PAGE}
      isAmp={false}
      service="pidgin"
      pathname="/pidgin/tori-51745682"
    >
      <serviceContextModule.ServiceContextProvider service="pidgin">
        <ToggleContextProvider toggles={toggles}>
          <EventTrackingContextProvider atiData={atiData}>
            {children}
          </EventTrackingContextProvider>
        </ToggleContextProvider>
      </serviceContextModule.ServiceContextProvider>
    </RequestContextProvider>
  </OptimizelyProvider>
);

describe('useViewTracker', () => {
  describe('Expected use', () => {
    const trackingData = {
      componentName: 'most-read',
      format: 'CHD=promo::2',
      url: 'http://www.bbc.com/pidgin/tori-51745682',
    };

    it('should return a function that can be assigned to an element to observe for intersections', async () => {
      const { result } = renderHook(() => useViewTracker(trackingData), {
        wrapper,
      });
      const element = document.createElement('div');

      await result.current.ref(element);

      const { observe } = getObserverInstance(element);

      expect(observe).toHaveBeenCalledWith(element);
    });

    it('should not send event to ATI when element is not in view', async () => {
      const { result } = renderHook(() => useViewTracker(trackingData), {
        wrapper,
      });
      const element = document.createElement('div');

      await result.current.ref(element);

      const observerInstance = getObserverInstance(element);

      act(() => {
        triggerIntersection({
          changes: [{ isIntersecting: false }],
          observer: observerInstance,
        });
      });

      act(() => {
        jest.advanceTimersByTime(1100);
      });

      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('should skip initialising IntersectionObserver when eventTracking toggle is disabled', async () => {
      const { result } = renderHook(() => useViewTracker(trackingData), {
        wrapper: props =>
          wrapper({
            ...props,
            toggles: { eventTracking: { enabled: false } },
          }),
      });
      const element = document.createElement('div');

      await result.current.ref(element);

      try {
        getObserverInstance(element);

        throw new Error('IntersectionObserver was initialised.');
      } catch (err) {
        const { message } = err as Error;
        expect(message).toEqual(
          'Failed to find IntersectionObserver for element.',
        );
      }

      expect(global.IntersectionObserver).not.toHaveBeenCalled();
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('should skip initialising IntersectionObserver when ref is not assigned to element', async () => {
      renderHook(() => useViewTracker(trackingData), {
        wrapper,
        initialProps: {
          toggles: {
            eventTracking: {
              enabled: true,
            },
          },
        },
      });

      expect(global.IntersectionObserver).not.toHaveBeenCalled();
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('should use componentName property if provided in eventTrackingData object', async () => {
      const { result } = renderHook(
        () =>
          useViewTracker({
            ...trackingData,
            experimentName: 'dummy_experiment',
            experimentVariant: 'variation_a',
            sendOptimizelyEvents: true,
          }),
        {
          wrapper: props => wrapper({ ...props, atiData: atiAnalytics }),
        },
      );
      const element = document.createElement('div');

      await result.current.ref(element);

      const observerInstance = getObserverInstance(element);

      act(() => {
        triggerIntersection({
          changes: [{ isIntersecting: true }],
          observer: observerInstance,
        });
      });

      act(() => {
        jest.advanceTimersByTime(1100);
      });

      const [[, options]] = (global.IntersectionObserver as jest.Mock).mock
        .calls;

      expect(global.IntersectionObserver).toHaveBeenCalledTimes(1);
      expect(options).toEqual({ threshold: [0.5] });
      expect(defaultOptimizely.track).toHaveBeenCalledTimes(1);
      expect(defaultOptimizely.track).toHaveBeenCalledWith(
        'most-read-views',
        defaultOptimizely.user.id,
        { foo: 'bar' },
      );
    });

    it.each([
      {
        title: 'For no user defined threshold',
        threshold: undefined,
        expected: 0.5,
      },
      {
        title: 'For a user defined threshold of 0.8',
        threshold: 0.8,
        expected: 0.8,
      },
    ])(
      'should send event to ATI and return correct tracking url when element is $expected or more in view for more than 1 second - $title',
      async ({ threshold, expected }) => {
        const { result } = renderHook(
          () => useViewTracker({ ...trackingData, viewThreshold: threshold }),
          {
            wrapper: props => wrapper({ ...props, atiData: atiAnalytics }),
          },
        );
        const element = document.createElement('div');

        await result.current.ref(element);

        const observerInstance = getObserverInstance(element);

        act(() => {
          triggerIntersection({
            changes: [{ isIntersecting: true }],
            observer: observerInstance,
          });
        });

        act(() => {
          jest.advanceTimersByTime(1100);
        });

        const [[, options]] = (global.IntersectionObserver as jest.Mock).mock
          .calls;
        const [[viewEventUrl]] = (global.fetch as jest.Mock).mock.calls;

        expect(global.IntersectionObserver).toHaveBeenCalledTimes(1);
        expect(options).toEqual({ threshold: [expected] });
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(urlToObject(viewEventUrl)).toEqual({
          origin: 'https://logws1363.ati-host.net',
          pathname: '/',
          searchParams: {
            ati: 'PUB-[article-sty]-[most-read]-[]-[CHD=promo::2]-[news::pidgin.news.story.51745682.page]-[]-[]-[http://www.bbc.com/pidgin/tori-51745682]',
            hl: expect.stringMatching(/^.+?x.+?x.+?$/), // timestamp based value
            idclient: expect.stringMatching(/^.+?-.+?-.+?-.+?$/),
            lng: 'en-US',
            p: 'news::pidgin.news.story.51745682.page',
            r: '1024x768x24x24',
            re: '1024x768',
            s: '598343',
            s2: '70',
            type: 'AT',
          },
        });
      },
    );

    it('should only send one view event when mutiple elements are viewed', async () => {
      const { result } = renderHook(() => useViewTracker(trackingData), {
        wrapper: props => wrapper({ ...props, atiData: atiAnalytics }),
      });
      const elementA = document.createElement('div');
      const elementB = document.createElement('div');

      await result.current.ref(elementA);
      await result.current.ref(elementB);

      const observerInstanceA = getObserverInstance(elementA);
      const observerInstanceB = getObserverInstance(elementB);

      act(() => {
        triggerIntersection({
          changes: [{ isIntersecting: true }],
          observer: observerInstanceA,
        });
        triggerIntersection({
          changes: [{ isIntersecting: true }],
          observer: observerInstanceB,
        });
      });

      act(() => {
        jest.advanceTimersByTime(1100);
      });

      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should send one view event for multiple observed elements when at least one of them is in view', async () => {
      const { result } = renderHook(() => useViewTracker(trackingData), {
        wrapper: props => wrapper({ ...props, atiData: atiAnalytics }),
      });
      const element = document.createElement('div');

      await result.current.ref(element);

      const observerInstance = getObserverInstance(element);

      act(() => {
        triggerIntersection({
          changes: [{ isIntersecting: true }, { isIntersecting: false }],
          observer: observerInstance,
        });
      });

      act(() => {
        jest.advanceTimersByTime(1100);
      });

      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should send multiple view events for multiple hook instances', async () => {
      const { result: resultA } = renderHook(
        () => useViewTracker(trackingData),
        {
          wrapper: props => wrapper({ ...props, atiData: atiAnalytics }),
        },
      );
      const { result: resultB } = renderHook(
        () => useViewTracker(trackingData),
        {
          wrapper: props => wrapper({ ...props, atiData: atiAnalytics }),
        },
      );
      const elementA = document.createElement('div');
      const elementB = document.createElement('div');

      await resultA.current.ref(elementA);
      await resultB.current.ref(elementB);

      const observerInstanceA = getObserverInstance(elementA);
      const observerInstanceB = getObserverInstance(elementB);

      act(() => {
        triggerIntersection({
          changes: [{ isIntersecting: true }],
          observer: observerInstanceA,
        });
        triggerIntersection({
          changes: [{ isIntersecting: true }],
          observer: observerInstanceB,
        });
      });

      act(() => {
        jest.advanceTimersByTime(1100);
      });

      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    it('should disconnect IntersectionObserver after event is sent', async () => {
      const { result } = renderHook(() => useViewTracker(trackingData), {
        wrapper: props => wrapper({ ...props, atiData: atiAnalytics }),
      });

      const element = document.createElement('div');

      await result.current.ref(element);

      const observerInstance = getObserverInstance(element);
      const { disconnect } = observerInstance;

      act(() => {
        triggerIntersection({
          changes: [{ isIntersecting: true }],
          observer: observerInstance,
        });
      });

      act(() => {
        jest.advanceTimersByTime(1100);
      });

      expect(disconnect).toHaveBeenCalledTimes(1);
    });

    it('should not disconnect IntersectionObserver before event is sent', async () => {
      const { result } = renderHook(() => useViewTracker(trackingData), {
        wrapper,
        initialProps: {},
      });
      const element = document.createElement('div');

      await result.current.ref(element);

      const observerInstance = getObserverInstance(element);
      const { disconnect } = observerInstance;

      act(() => {
        triggerIntersection({
          changes: [{ isIntersecting: true }],
          observer: observerInstance,
        });
      });

      act(() => {
        jest.advanceTimersByTime(900);
      });

      expect(disconnect).toHaveBeenCalledTimes(0);
    });

    it('should not send event to ATI when element is in view for less than 1 second', async () => {
      const { result } = renderHook(() => useViewTracker(trackingData), {
        wrapper,
        initialProps: {},
      });

      const element = document.createElement('div');

      await result.current.ref(element);

      const observerInstance = getObserverInstance(element);

      act(() => {
        // scroll element into view
        triggerIntersection({
          changes: [{ isIntersecting: true }],
          observer: observerInstance,
        });
      });

      act(() => {
        jest.advanceTimersByTime(900);
      });

      act(() => {
        // scroll element out of view
        triggerIntersection({
          changes: [{ isIntersecting: false }],
          observer: observerInstance,
        });
      });

      act(() => {
        jest.advanceTimersByTime(1100);
      });

      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('should not send event to ATI more than once when element is scrolled in and out of view', async () => {
      const { result } = renderHook(() => useViewTracker(trackingData), {
        wrapper: props => wrapper({ ...props, atiData: atiAnalytics }),
      });
      const element = document.createElement('div');

      await result.current.ref(element);

      const observerInstance = getObserverInstance(element);

      act(() => {
        // scroll element into view
        triggerIntersection({
          changes: [{ isIntersecting: true }],
          observer: observerInstance,
        });
      });

      act(() => {
        jest.advanceTimersByTime(1100);
      });

      act(() => {
        // scroll element out of view
        triggerIntersection({
          changes: [{ isIntersecting: false }],
          observer: observerInstance,
        });
      });

      act(() => {
        // scroll element into view again
        triggerIntersection({
          changes: [{ isIntersecting: true }],
          observer: observerInstance,
        });
      });

      act(() => {
        jest.advanceTimersByTime(1100);
      });

      const [[viewEventUrl]] = (global.fetch as jest.Mock).mock.calls;

      expect(viewEventUrl).toMatch('https://logws1363.ati-host.net');
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should be able to override the campaignID that is sent to ATI', async () => {
      const { result } = renderHook(
        () =>
          useViewTracker({ ...trackingData, campaignID: 'custom-campaign' }),
        {
          wrapper: props => wrapper({ ...props, atiData: atiAnalytics }),
        },
      );
      const element = document.createElement('div');

      await result.current.ref(element);

      const observerInstance = getObserverInstance(element);

      act(() => {
        triggerIntersection({
          changes: [{ isIntersecting: true }],
          observer: observerInstance,
        });
      });

      act(() => {
        jest.advanceTimersByTime(1100);
      });

      const [[viewEventUrl]] = (global.fetch as jest.Mock).mock.calls;

      expect(urlToObject(viewEventUrl).searchParams.ati).toEqual(
        'PUB-[custom-campaign]-[most-read]-[]-[CHD=promo::2]-[news::pidgin.news.story.51745682.page]-[]-[]-[http://www.bbc.com/pidgin/tori-51745682]',
      );
    });

    describe('Optimizely', () => {
      it('should send event to Optimizely when element is 50% or more in view for more than 1 second and optimizely object exists', async () => {
        const { result } = renderHook(
          () =>
            useViewTracker({
              ...trackingData,
              sendOptimizelyEvents: true,
              experimentName: 'dummy_experiment',
              experimentVariant: 'variation_a',
            }),
          {
            wrapper: props => wrapper({ ...props, atiData: atiAnalytics }),
          },
        );
        const element = document.createElement('div');

        await result.current.ref(element);

        const observerInstance = getObserverInstance(element);

        act(() => {
          triggerIntersection({
            changes: [{ isIntersecting: true }],
            observer: observerInstance,
          });
        });

        act(() => {
          jest.advanceTimersByTime(1100);
        });

        const [[, options]] = (global.IntersectionObserver as jest.Mock).mock
          .calls;

        expect(global.IntersectionObserver).toHaveBeenCalledTimes(1);
        expect(options).toEqual({ threshold: [0.5] });
        expect(defaultOptimizely.track).toHaveBeenCalledTimes(1);
        expect(defaultOptimizely.track).toHaveBeenCalledWith(
          'most-read-views',
          defaultOptimizely.user.id,
          defaultOptimizely.user.attributes,
        );
      });

      it('should not send event to Optimizely when element is 50% or more in view for more than 1 second and optimizely object is undefined', async () => {
        const mockOptimizelyTrack = jest.fn();
        const mockOptimizely = undefined;

        const { result } = renderHook(
          () =>
            useViewTracker({
              ...trackingData,
              // @ts-expect-error partial data for tests
              ...mockOptimizely,
            }),
          {
            wrapper,
            initialProps: {},
          },
        );
        const element = document.createElement('div');

        await result.current.ref(element);

        const observerInstance = getObserverInstance(element);

        act(() => {
          triggerIntersection({
            changes: [{ isIntersecting: true }],
            observer: observerInstance,
          });
        });

        act(() => {
          jest.advanceTimersByTime(1100);
        });

        const [[, options]] = (global.IntersectionObserver as jest.Mock).mock
          .calls;

        expect(global.IntersectionObserver).toHaveBeenCalledTimes(1);
        expect(options).toEqual({ threshold: [0.5] });
        expect(mockOptimizelyTrack).toHaveBeenCalledTimes(0);
      });
    });

    describe('View tracking - Reverb', () => {
      beforeEach(() => {
        jest.replaceProperty(
          serviceContextModule,
          'ServiceContext',
          // @ts-expect-error override service context for tests
          createContext({
            atiAnalyticsProducerId: '70',
            atiAnalyticsProducerName: 'PIDGIN',
            service: 'pidgin',
            useReverb: true,
          }),
        );
      });

      describe('Viewability Model', () => {
        it.each([
          {
            title: 'should trigger a beacon for a view event',
            eventTrackingData: { ...trackingData },
            expectedItemEvent: {
              link: 'http://www.bbc.com/pidgin/tori-51745682',
              name: 'most-read',
            },
            expectedGroupEvent: {
              name: 'article-sty',
              type: 'most-read',
            },
          },
          {
            title: 'should trigger a beacon for an item level click event',
            eventTrackingData: {
              ...trackingData,
              componentName: 'portrait-video',
              itemTracker: {
                type: 'portrait-video-promo',
                text: 'Rollercoaster facts... while riding a rollercoaster',
                position: 1,
                duration: 73000,
                resourceId: 'test-item-id',
                label: 'test-item-label',
              },
              groupTracker: {
                itemCount: 15,
                resourceId: 'test-group-id',
              },
            },
            expectedItemEvent: {
              duration: 73000,
              link: 'http://www.bbc.com/pidgin/tori-51745682',
              name: 'portrait-video',
              position: 1,
              resource_id: 'test-item-id',
              text: 'Rollercoaster facts... while riding a rollercoaster',
              type: 'portrait-video-promo',
              label: 'test-item-label',
            },
            expectedGroupEvent: {
              item_count: 15,
              name: 'article-sty',
              resource_id: 'test-group-id',
              type: 'portrait-video',
            },
          },
        ])(
          '$title',
          async ({
            eventTrackingData,
            expectedItemEvent,
            expectedGroupEvent,
          }) => {
            const { result } = renderHook(
              () => useViewTracker(eventTrackingData),
              {
                wrapper: props => wrapper({ ...props, atiData: atiAnalytics }),
              },
            );
            const element = document.createElement('div');

            await result.current.ref(element);

            const observerInstance = getObserverInstance(element);

            act(() => {
              triggerIntersection({
                changes: [{ isIntersecting: true }],
                observer: observerInstance,
              });
            });

            await act(() => {
              jest.advanceTimersByTime(1100);
            });

            const [[, options]] = (global.IntersectionObserver as jest.Mock)
              .mock.calls;

            expect(global.IntersectionObserver).toHaveBeenCalledTimes(1);
            expect(options).toEqual({ threshold: [0.5] });
            expect(reverbMock.userActionEvent).toHaveBeenCalledTimes(1);
            expect(reverbMock.userActionEvent).toHaveBeenCalledWith(
              'viewability',
              '',
              {
                event: { action: 'view', category: 'viewability' },
                group: expectedGroupEvent,
                item: expectedItemEvent,
              },
              undefined,
              undefined,
              false,
            );
          },
        );
      });
    });
  });

  describe('Error handling', () => {
    it('should load polyfill and not throw error if IntersectionObserver is not supported', async () => {
      // @ts-expect-error required for testing purposes
      delete global.IntersectionObserver;

      const trackingData = {
        componentName: 'most-read',
        format: 'CHD=promo::2',
        url: 'http://www.bbc.com/pidgin/tori-51745682',
      };
      const { result } = renderHook(() => useViewTracker(trackingData), {
        wrapper,
        initialProps: {},
      });
      const element = document.createElement('div');

      await result.current.ref(element);

      expect(result).not.toHaveProperty('error');
      expect(typeof global.IntersectionObserver).toEqual('function');
    });

    it('should not throw error and not send event to ATI when no tracking data passed into hook', async () => {
      const trackingData = undefined;

      const { result } = renderHook(() => useViewTracker(trackingData), {
        wrapper,
        initialProps: {},
      });

      const element = document.createElement('div');

      await result.current.ref(element);

      expect(result).not.toHaveProperty('error');
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('should not throw error and not send event to ATI when no tracking data from the event context provider is passed into hook', async () => {
      const trackingData = {
        componentName: 'most-read',
        format: 'CHD=promo::2',
        url: 'http://www.bbc.com/pidgin/tori-51745682',
      };
      const { result } = renderHook(() => useViewTracker(trackingData), {
        wrapper,
        initialProps: {
          pageData: undefined,
        },
      });
      const element = document.createElement('div');

      await result.current.ref(element);

      expect(result).not.toHaveProperty('error');
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('should not throw error and not send event to ATI when unexpected data passed into hook', async () => {
      const trackingData = {
        foo: 'bar',
      };

      // @ts-expect-error partial data for tests
      const { result } = renderHook(() => useViewTracker(trackingData), {
        wrapper,
        initialProps: {},
      });
      const element = document.createElement('div');

      await result.current.ref(element);

      expect(result).not.toHaveProperty('error');
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('should not throw error and not send event to ATI when unexpected data type passed into hook', async () => {
      const trackingData = ['unexpected data type'];

      // @ts-expect-error partial data for tests
      const { result } = renderHook(() => useViewTracker(trackingData), {
        wrapper,
        initialProps: {},
      });

      const element = document.createElement('div');

      await result.current.ref(element);

      expect(result).not.toHaveProperty('error');
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('should not throw error and not send event to ATI when no element is passed into hook ref callback function', async () => {
      const trackingData = {
        componentName: 'most-read',
        format: 'CHD=promo::2',
        url: 'http://www.bbc.com/pidgin/tori-51745682',
      };

      const { result } = renderHook(() => useViewTracker(trackingData), {
        wrapper,
        initialProps: {},
      });

      const element = null;

      await result.current.ref(element);

      expect(result).not.toHaveProperty('error');
      expect(global.IntersectionObserver).not.toHaveBeenCalled();
      expect(global.fetch).not.toHaveBeenCalled();
    });
  });
});
