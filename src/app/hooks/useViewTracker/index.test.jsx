/* eslint-disable no-console */

import React, { createContext } from 'react';
import {
  renderHook,
  act,
} from '#app/components/react-testing-library-with-providers';

import { EventTrackingContextProvider } from '#contexts/EventTrackingContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import OPTIMIZELY_CONFIG from '#lib/config/optimizely';
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

const getObserverInstance = element => {
  try {
    const [instance] = Array.from(observers).find(([, item]) =>
      item.elements.has(element),
    );

    return instance;
  } catch (e) {
    throw new Error('Failed to find IntersectionObserver for element.');
  }
};

const triggerIntersection = ({ changes, observer }) => {
  const item = observers.get(observer);

  item.callback(changes);
};

const { error } = console;

jest.mock('#app/lib/utilities/getUUID', () =>
  jest.fn().mockImplementation(() => '12345678-abcd-1fed-0123-a1b2c3d4e5f6'),
);

beforeEach(() => {
  jest.clearAllMocks();
  jest.useFakeTimers();
  console.error = jest.fn();
  global.IntersectionObserver = IntersectionObserver;

  jest.replaceProperty(
    serviceContextModule,
    'ServiceContext',
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

const urlToObject = url => {
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

const wrapper = ({ pageData, atiData, children, toggles = defaultToggles }) => (
  <RequestContextProvider
    bbcOrigin="https://www.test.bbc.com"
    pageType={STORY_PAGE}
    isAmp={false}
    service="pidgin"
    pathname="/pidgin/tori-51745682"
  >
    <serviceContextModule.ServiceContextProvider service="pidgin">
      <ToggleContextProvider toggles={toggles}>
        <EventTrackingContextProvider data={pageData} atiData={atiData}>
          {children}
        </EventTrackingContextProvider>
      </ToggleContextProvider>
    </serviceContextModule.ServiceContextProvider>
  </RequestContextProvider>
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
        initialProps: {
          pageData: fixtureData,
        },
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
            pageData: fixtureData,
            toggles: { eventTracking: { enabled: false } },
          }),
      });
      const element = document.createElement('div');

      await result.current.ref(element);

      try {
        getObserverInstance(element);

        throw new Error('IntersectionObserver was initialised.');
      } catch ({ message }) {
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
          pageData: fixtureData,
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

    it('should use "optimizelyMetricNameOverride" property if provided in eventTrackingData object', async () => {
      const mockOptimizelyTrack = jest.fn();
      const mockUserId = 'test';
      const mockAttributes = { foo: 'bar' };

      const mockOptimizely = {
        optimizely: {
          track: mockOptimizelyTrack,
          user: { attributes: mockAttributes, id: mockUserId },
          getVariation: jest.fn(() => 'off'),
        },
        optimizelyMetricNameOverride: 'myEvent',
      };

      const {
        metadata: { atiAnalytics },
      } = fixtureData;

      const { result } = renderHook(
        () => useViewTracker({ ...trackingData, ...mockOptimizely }),
        {
          wrapper: props =>
            wrapper({ ...props, pageData: fixtureData, atiData: atiAnalytics }),
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

      const [[, options]] = global.IntersectionObserver.mock.calls;

      expect(global.IntersectionObserver).toHaveBeenCalledTimes(1);
      expect(options).toEqual({ threshold: [0.5] });
      expect(mockOptimizelyTrack).toHaveBeenCalledTimes(1);
      expect(mockOptimizelyTrack).toHaveBeenCalledWith(
        'myEvent_views',
        mockUserId,
        {
          foo: 'bar',
          'viewed_canonical-lite-cta': true,
        },
      );
    });

    it('should send event to ATI and return correct tracking url when element is 50% or more in view for more than 1 second', async () => {
      const {
        metadata: { atiAnalytics },
      } = fixtureData;

      const { result } = renderHook(() => useViewTracker(trackingData), {
        wrapper: props =>
          wrapper({ ...props, pageData: fixtureData, atiData: atiAnalytics }),
      });
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

      const [[, options]] = global.IntersectionObserver.mock.calls;
      const [[viewEventUrl]] = global.fetch.mock.calls;

      expect(global.IntersectionObserver).toHaveBeenCalledTimes(1);
      expect(options).toEqual({ threshold: [0.5] });
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
          r: '0x0x24x24',
          re: '1024x768',
          s: '598343',
          s2: '70',
          type: 'AT',
        },
      });
    });

    it('should only send one view event when mutiple elements are viewed', async () => {
      const {
        metadata: { atiAnalytics },
      } = fixtureData;

      const { result } = renderHook(() => useViewTracker(trackingData), {
        wrapper: props =>
          wrapper({ ...props, pageData: fixtureData, atiData: atiAnalytics }),
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
      const {
        metadata: { atiAnalytics },
      } = fixtureData;

      const { result } = renderHook(() => useViewTracker(trackingData), {
        wrapper: props =>
          wrapper({ ...props, pageData: fixtureData, atiData: atiAnalytics }),
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
      const {
        metadata: { atiAnalytics },
      } = fixtureData;

      const { result: resultA } = renderHook(
        () => useViewTracker(trackingData),
        {
          wrapper: props =>
            wrapper({ ...props, pageData: fixtureData, atiData: atiAnalytics }),
        },
      );
      const { result: resultB } = renderHook(
        () => useViewTracker(trackingData),
        {
          wrapper: props =>
            wrapper({ ...props, pageData: fixtureData, atiData: atiAnalytics }),
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
      const {
        metadata: { atiAnalytics },
      } = fixtureData;

      const { result } = renderHook(() => useViewTracker(trackingData), {
        wrapper: props =>
          wrapper({ ...props, pageData: fixtureData, atiData: atiAnalytics }),
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
        initialProps: {
          pageData: fixtureData,
        },
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
        initialProps: {
          pageData: fixtureData,
        },
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
      const {
        metadata: { atiAnalytics },
      } = fixtureData;

      const { result } = renderHook(() => useViewTracker(trackingData), {
        wrapper: props =>
          wrapper({ ...props, pageData: fixtureData, atiData: atiAnalytics }),
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

      const [[viewEventUrl]] = global.fetch.mock.calls;

      expect(viewEventUrl).toMatch('https://logws1363.ati-host.net');
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should be able to override the campaignID that is sent to ATI', async () => {
      const {
        metadata: { atiAnalytics },
      } = fixtureData;

      const { result } = renderHook(
        () =>
          useViewTracker({ ...trackingData, campaignID: 'custom-campaign' }),
        {
          wrapper: props =>
            wrapper({ ...props, pageData: fixtureData, atiData: atiAnalytics }),
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

      const [[viewEventUrl]] = global.fetch.mock.calls;

      expect(urlToObject(viewEventUrl).searchParams.ati).toEqual(
        'PUB-[custom-campaign]-[most-read]-[]-[CHD=promo::2]-[news::pidgin.news.story.51745682.page]-[]-[]-[http://www.bbc.com/pidgin/tori-51745682]',
      );
    });

    it('should send event to Optimizely when element is 50% or more in view for more than 1 second and optimizely object exists', async () => {
      const mockOptimizelyTrack = jest.fn();
      const mockUserId = 'test';
      const mockAttributes = { foo: 'bar' };
      const mockOverrideAttributes = {
        ...mockAttributes,
        [`viewed_${OPTIMIZELY_CONFIG.viewClickAttributeId}`]: true,
      };
      const mockOptimizely = {
        optimizely: {
          track: mockOptimizelyTrack,
          user: { attributes: mockAttributes, id: mockUserId },
          getVariation: jest.fn(() => 'off'),
        },
      };

      const {
        metadata: { atiAnalytics },
      } = fixtureData;

      const { result } = renderHook(
        () => useViewTracker({ ...trackingData, ...mockOptimizely }),
        {
          wrapper: props =>
            wrapper({ ...props, pageData: fixtureData, atiData: atiAnalytics }),
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

      const [[, options]] = global.IntersectionObserver.mock.calls;

      expect(global.IntersectionObserver).toHaveBeenCalledTimes(1);
      expect(options).toEqual({ threshold: [0.5] });
      expect(mockOptimizelyTrack).toHaveBeenCalledTimes(1);
      expect(mockOptimizelyTrack).toHaveBeenCalledWith(
        'component_views',
        mockUserId,
        mockOverrideAttributes,
      );
    });

    it('should not send event to Optimizely when element is 50% or more in view for more than 1 second and optimizely object is undefined', async () => {
      const mockOptimizelyTrack = jest.fn();
      const mockOptimizely = undefined;

      const { result } = renderHook(
        () => useViewTracker({ ...trackingData, ...mockOptimizely }),
        {
          wrapper,
          initialProps: {
            pageData: fixtureData,
          },
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

      const [[, options]] = global.IntersectionObserver.mock.calls;

      expect(global.IntersectionObserver).toHaveBeenCalledTimes(1);
      expect(options).toEqual({ threshold: [0.5] });
      expect(mockOptimizelyTrack).toHaveBeenCalledTimes(0);
    });
  });

  describe('Error handling', () => {
    it('should load polyfill and not throw error if IntersectionObserver is not supported', async () => {
      delete global.IntersectionObserver;

      const trackingData = {
        componentName: 'most-read',
        format: 'CHD=promo::2',
        url: 'http://www.bbc.com/pidgin/tori-51745682',
      };
      const { result } = renderHook(() => useViewTracker(trackingData), {
        wrapper,
        initialProps: {
          pageData: fixtureData,
        },
      });
      const element = document.createElement('div');

      await result.current.ref(element);

      expect(result.error).toBeUndefined();
      expect(typeof global.IntersectionObserver).toEqual('function');
    });

    it('should not throw error and not send event to ATI when no tracking data passed into hook', async () => {
      const trackingData = undefined;

      const { result } = renderHook(() => useViewTracker(trackingData), {
        wrapper,
        initialProps: {
          pageData: fixtureData,
        },
      });

      const element = document.createElement('div');

      await result.current.ref(element);

      expect(result.error).toBeUndefined();
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

      expect(result.error).toBeUndefined();
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('should not throw error and not send event to ATI when unexpected data passed into hook', async () => {
      const trackingData = {
        foo: 'bar',
      };

      const { result } = renderHook(() => useViewTracker(trackingData), {
        wrapper,
        initialProps: {
          pageData: fixtureData,
        },
      });
      const element = document.createElement('div');

      await result.current.ref(element);

      expect(result.error).toBeUndefined();
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('should not throw error and not send event to ATI when unexpected data type passed into hook', async () => {
      const trackingData = ['unexpected data type'];

      const { result } = renderHook(() => useViewTracker(trackingData), {
        wrapper,
        initialProps: {
          pageData: fixtureData,
        },
      });

      const element = document.createElement('div');

      await result.current.ref(element);

      expect(result.error).toBeUndefined();
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
        initialProps: {
          pageData: fixtureData,
        },
      });

      const element = null;

      await result.current.ref(element);

      expect(result.error).toBeUndefined();
      expect(global.IntersectionObserver).not.toHaveBeenCalled();
      expect(global.fetch).not.toHaveBeenCalled();
    });
  });
});
