/* eslint-disable import/first */
// Mock the useNetworkStatusTracker hook before imports
jest.mock('../useNetworkStatusTracker');

import React, { createContext, ReactNode } from 'react';
import {
  renderHook,
  act,
  waitFor,
} from '#app/components/react-testing-library-with-providers';
import { EventTrackingContextProvider } from '#contexts/EventTrackingContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import { ATIData } from '#app/components/ATIAnalytics/types';
import { Toggles } from '#app/models/types/global';
import {
  VIEW_EVENT,
  CLICK_EVENT,
} from '#app/lib/analyticsUtils/analytics.const';
import { ATIEventType } from '#app/lib/analyticsUtils/types';
import * as serviceContextModule from '../../contexts/ServiceContext';
import * as beaconModule from '../../components/ATIAnalytics/beacon';
import useNetworkStatusTracker from '../useNetworkStatusTracker';
import useCachedAnalyticsTracker from '.';

const atiAnalyticsFixture: ATIData = {
  campaigns: [
    {
      campaignId: '5a988e3e39461b000e9dabfb',
      campaignName: 'WS - Keep me on trend',
    },
  ],
  categoryName: 'News',
  contentId: 'urn:bbc:cps:curie:asset:53870d86-88c5-6f4d-a260-f97c68606458',
  contentType: 'article',
  language: 'pcm',
  ldpThingIds: null,
  ldpThingLabels: null,
  pageIdentifier: 'news::pidgin.news.story.51745682.page',
  pageTitle: 'Test Article',
  producerId: null,
  timePublished: '2020-03-04T18:58:43.000Z',
  timeUpdated: '2020-03-04T19:26:11.000Z',
  producerName: 'PIDGIN',
};

const mockSendEventBeacon = jest
  .spyOn(beaconModule, 'sendEventBeacon')
  .mockImplementation(jest.fn());

const mockUseNetworkStatusTracker =
  useNetworkStatusTracker as jest.MockedFunction<
    typeof useNetworkStatusTracker
  >;

const defaultToggles: Toggles = {
  eventTracking: {
    enabled: true,
  },
};

const STORAGE_KEY = 'cached_analytics_queue';

const setNetworkStatus = (isOnline: boolean) => {
  Object.defineProperty(navigator, 'onLine', {
    writable: true,
    value: isOnline,
  });
  mockUseNetworkStatusTracker.mockReturnValue({
    isOnline,
    networkType: '4g',
  });
};

const getQueue = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

const trackEvent = (
  componentName: string,
  eventType: ATIEventType = VIEW_EVENT,
) => ({
  eventType,
  eventTrackingData: { componentName },
});

beforeEach(() => {
  jest.clearAllMocks();
  localStorage.clear();

  setNetworkStatus(true);

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

const wrapper = ({
  atiData,
  children,
  toggles = defaultToggles,
}: {
  atiData?: ATIData;
  children?: ReactNode | null;
  toggles?: Toggles;
}) => (
  <RequestContextProvider
    bbcOrigin="https://www.test.bbc.com"
    pageType={STORY_PAGE}
    isAmp={false}
    service="pidgin"
    pathname="/pidgin"
    statusCode={200}
  >
    <ToggleContextProvider toggles={toggles}>
      <EventTrackingContextProvider atiData={atiData || atiAnalyticsFixture}>
        {children}
      </EventTrackingContextProvider>
    </ToggleContextProvider>
  </RequestContextProvider>
);

describe('useCachedAnalyticsTracker', () => {
  it('should return track and flush functions', () => {
    const { result } = renderHook(() => useCachedAnalyticsTracker(), {
      wrapper,
    });

    expect(result.current).toHaveProperty('track');
    expect(result.current).toHaveProperty('flush');
    expect(typeof result.current.track).toBe('function');
    expect(typeof result.current.flush).toBe('function');
  });

  describe('when tracking is enabled and online', () => {
    it('should send event immediately when online', async () => {
      const { result } = renderHook(() => useCachedAnalyticsTracker(), {
        wrapper,
      });

      await act(async () => {
        await result.current.track({
          eventType: VIEW_EVENT,
          eventTrackingData: {
            componentName: 'test-component',
          },
        });
      });

      expect(mockSendEventBeacon).toHaveBeenCalledTimes(1);
      expect(mockSendEventBeacon).toHaveBeenCalledWith(
        expect.objectContaining({
          componentName: 'test-component',
          type: VIEW_EVENT,
          service: 'pidgin',
          useReverb: true,
        }),
      );
    });

    it('should support CLICK_EVENT type', async () => {
      const { result } = renderHook(() => useCachedAnalyticsTracker(), {
        wrapper,
      });

      await act(async () => {
        await result.current.track({
          eventType: CLICK_EVENT,
          eventTrackingData: {
            componentName: 'click-component',
          },
        });
      });

      expect(mockSendEventBeacon).toHaveBeenCalledWith(
        expect.objectContaining({
          componentName: 'click-component',
          type: CLICK_EVENT,
        }),
      );
    });
  });

  describe('when offline', () => {
    beforeEach(() => {
      setNetworkStatus(false);
    });

    it('should enqueue event when offline', async () => {
      const { result } = renderHook(() => useCachedAnalyticsTracker(), {
        wrapper,
      });

      await act(async () => {
        await result.current.track(trackEvent('offline-test'));
      });

      expect(mockSendEventBeacon).not.toHaveBeenCalled();

      const queue = getQueue();
      expect(queue).toHaveLength(1);
      expect(queue[0]).toMatchObject({
        eventType: VIEW_EVENT,
        retries: 0,
      });
      expect(queue[0].props.componentName).toBe('offline-test');
      expect(queue[0].occurredAt).toBeGreaterThan(0);
    });

    it('should cap queue at 200 items', async () => {
      const { result } = renderHook(() => useCachedAnalyticsTracker(), {
        wrapper,
      });

      // Enqueue 250 items
      await act(async () => {
        await Promise.all(
          Array.from({ length: 250 }, (_, i) =>
            result.current.track(trackEvent(`component-${i}`)),
          ),
        );
      });

      const queue = getQueue();
      expect(queue).toHaveLength(200);
      // First 50 items should be dropped
      expect(queue[0].props.componentName).toBe('component-50');
      expect(queue[199].props.componentName).toBe('component-249');
    });

    it('should preserve timestamp when event occurred', async () => {
      const { result } = renderHook(() => useCachedAnalyticsTracker(), {
        wrapper,
      });

      const beforeTime = Date.now();

      await act(async () => {
        await result.current.track(trackEvent('timestamp-test'));
      });

      const afterTime = Date.now();
      const queue = getQueue();

      expect(queue[0].occurredAt).toBeGreaterThanOrEqual(beforeTime);
      expect(queue[0].occurredAt).toBeLessThanOrEqual(afterTime);
    });
  });

  describe('when send fails', () => {
    it('should enqueue event on send failure', async () => {
      mockSendEventBeacon.mockRejectedValueOnce(new Error('Network error'));

      const { result } = renderHook(() => useCachedAnalyticsTracker(), {
        wrapper,
      });

      await act(async () => {
        await result.current.track(trackEvent('fail-test'));
      });

      expect(mockSendEventBeacon).toHaveBeenCalledTimes(1);

      const queue = getQueue();
      expect(queue).toHaveLength(1);
      expect(queue[0].retries).toBe(1);
      expect(queue[0].props.componentName).toBe('fail-test');
    });
  });

  describe('flush functionality', () => {
    it('should flush queued events sequentially when back online', async () => {
      setNetworkStatus(false);

      const { result, rerender } = renderHook(
        () => useCachedAnalyticsTracker(),
        {
          wrapper,
        },
      );

      // Enqueue 3 events while offline
      await act(async () => {
        await result.current.track(trackEvent('event-1'));
        await result.current.track(trackEvent('event-2', CLICK_EVENT));
        await result.current.track(trackEvent('event-3'));
      });

      expect(mockSendEventBeacon).not.toHaveBeenCalled();

      let queue = getQueue();
      expect(queue).toHaveLength(3);

      // Go back online
      setNetworkStatus(true);
      rerender();

      // Flush queue
      await act(async () => {
        await result.current.flush();
      });

      expect(mockSendEventBeacon).toHaveBeenCalledTimes(3);

      queue = getQueue();
      expect(queue).toHaveLength(0);
    });

    it('should not flush when offline', async () => {
      setNetworkStatus(false);

      const { result } = renderHook(() => useCachedAnalyticsTracker(), {
        wrapper,
      });

      await act(async () => {
        await result.current.track(trackEvent('no-flush'));
      });

      await act(async () => {
        await result.current.flush();
      });

      expect(mockSendEventBeacon).not.toHaveBeenCalled();
      const queue = getQueue();
      expect(queue).toHaveLength(1);
    });

    it('should re-enqueue failed items during flush', async () => {
      setNetworkStatus(false);

      const { result, rerender } = renderHook(
        () => useCachedAnalyticsTracker(),
        {
          wrapper,
        },
      );

      await act(async () => {
        await result.current.track(trackEvent('will-fail'));
        await result.current.track(trackEvent('will-succeed'));
      });

      // Go back online
      setNetworkStatus(true);
      rerender();

      // First event fails, second should not be sent
      mockSendEventBeacon.mockRejectedValueOnce(new Error('Fail'));

      await act(async () => {
        await result.current.flush();
      });

      expect(mockSendEventBeacon).toHaveBeenCalledTimes(1);

      const queue = getQueue();
      // Failed item should be re-enqueued at the end, plus the second item not yet sent
      expect(queue.length).toBeGreaterThan(0);
    });
  });

  describe('tracking toggle', () => {
    it('should not track when tracking is disabled', async () => {
      const disabledToggles: Toggles = {
        eventTracking: {
          enabled: false,
        },
      };

      const { result } = renderHook(() => useCachedAnalyticsTracker(), {
        wrapper: ({ children }) =>
          wrapper({ children, toggles: disabledToggles }),
      });

      await act(async () => {
        await result.current.track(trackEvent('disabled-test'));
      });

      expect(mockSendEventBeacon).not.toHaveBeenCalled();
      const queue = getQueue();
      expect(queue).toHaveLength(0);
    });

    it('should respect component-specific toggle exclusion', async () => {
      const excludedToggles: Toggles = {
        eventTracking: {
          enabled: true,
          value: 'cached-analytics',
        },
      };

      const { result } = renderHook(() => useCachedAnalyticsTracker(), {
        wrapper: ({ children }) =>
          wrapper({ children, toggles: excludedToggles }),
      });

      await act(async () => {
        await result.current.track(trackEvent('excluded-test'));
      });

      expect(mockSendEventBeacon).not.toHaveBeenCalled();
    });
  });

  describe('field validation', () => {
    it('should not send event with missing required fields', async () => {
      const incompleteAtiData: ATIData = {
        pageIdentifier: undefined,
        producerId: undefined,
      };

      const { result } = renderHook(() => useCachedAnalyticsTracker(), {
        wrapper: ({ children }) =>
          wrapper({ children, atiData: incompleteAtiData }),
      });

      await act(async () => {
        await result.current.track(trackEvent('invalid-test'));
      });

      expect(mockSendEventBeacon).not.toHaveBeenCalled();
      const queue = getQueue();
      expect(queue).toHaveLength(0);
    });
  });

  describe('dev helpers', () => {
    const originalEnv = process.env.NODE_ENV;

    beforeEach(() => {
      delete window.cached_analytics;
    });

    afterEach(() => {
      process.env.NODE_ENV = originalEnv;
      delete window.cached_analytics;
    });

    it('should expose dev helpers in non-production', () => {
      process.env.NODE_ENV = 'development';

      renderHook(() => useCachedAnalyticsTracker(), { wrapper });

      expect(window.cached_analytics).toBeDefined();
      expect(window.cached_analytics?.track).toBeDefined();
      expect(window.cached_analytics?.flush).toBeDefined();
      expect(window.cached_analytics?.getQueue).toBeDefined();
      expect(window.cached_analytics?.clearQueue).toBeDefined();
    });

    it('should not expose dev helpers in production', () => {
      process.env.NODE_ENV = 'production';

      renderHook(() => useCachedAnalyticsTracker(), { wrapper });

      expect(window.cached_analytics).toBeUndefined();
    });

    it('should allow clearing queue via dev helper', async () => {
      process.env.NODE_ENV = 'development';
      setNetworkStatus(false);

      const { result } = renderHook(() => useCachedAnalyticsTracker(), {
        wrapper,
      });

      await act(async () => {
        await result.current.track(trackEvent('to-clear'));
      });

      let queue = window.cached_analytics?.getQueue();
      expect(queue).toHaveLength(1);

      act(() => {
        window.cached_analytics?.clearQueue();
      });

      queue = window.cached_analytics?.getQueue();
      expect(queue).toHaveLength(0);
    });
  });

  describe('auto-flush on mount', () => {
    it('should auto-flush existing queue when hook mounts and online', async () => {
      // Pre-populate queue
      const mockQueue = [
        {
          eventType: VIEW_EVENT,
          props: {
            componentName: 'pre-existing',
            type: VIEW_EVENT,
            pageIdentifier: 'test',
            platform: 'canonical',
            producerId: '70',
            service: 'pidgin',
            statsDestination: 'NEWS_PS',
          },
          occurredAt: Date.now(),
          retries: 0,
        },
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockQueue));

      await act(async () => {
        renderHook(() => useCachedAnalyticsTracker(), { wrapper });
      });

      await waitFor(() => {
        expect(mockSendEventBeacon).toHaveBeenCalled();
      });
    });

    it('should flush queue when app comes back to foreground (mobile)', async () => {
      setNetworkStatus(false);

      const { result, rerender } = renderHook(
        () => useCachedAnalyticsTracker(),
        { wrapper },
      );

      // Enqueue event while offline
      await act(async () => {
        await result.current.track(trackEvent('mobile-test'));
      });

      expect(mockSendEventBeacon).not.toHaveBeenCalled();
      let queue = getQueue();
      expect(queue).toHaveLength(1);

      // Go back online
      setNetworkStatus(true);
      rerender();

      // Simulate app coming back to foreground
      Object.defineProperty(document, 'visibilityState', {
        writable: true,
        value: 'visible',
      });

      await act(async () => {
        document.dispatchEvent(new Event('visibilitychange'));
        // Wait for the 500ms delay in visibility handler
        await new Promise(resolve => {
          setTimeout(resolve, 600);
        });
      });

      expect(mockSendEventBeacon).toHaveBeenCalled();
      queue = getQueue();
      expect(queue).toHaveLength(0);
    });
  });
});
