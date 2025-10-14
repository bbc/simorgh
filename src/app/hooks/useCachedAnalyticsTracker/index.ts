import { useCallback, useEffect, useRef, use } from 'react';
import extractATITrackingProps from '#app/lib/analyticsUtils/extractATITrackingProps';
import useTrackingToggle from '#app/hooks/useTrackingToggle';
import { sendEventBeacon } from '#app/components/ATIAnalytics/beacon';
import { ATIEventTrackingProps } from '#app/components/ATIAnalytics/types';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { EventTrackingContext } from '#app/contexts/EventTrackingContext';
import useNetworkStatusTracker from '#app/hooks/useNetworkStatusTracker';
import { CachedItem, CachedAnalyticsApi } from './type';

const STORAGE_KEY = 'cached_analytics_queue';
const MAX_QUEUE = 200;

let flushingInProgress = false;

// LocalStorage helpers (browser-only)
const readQueue = (): CachedItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeQueue = (items: CachedItem[]) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(items.slice(0, MAX_QUEUE)),
    );
  } catch {
    // noop
  }
};

const enqueue = (item: CachedItem) => {
  const queue = readQueue();
  queue.push(item);
  if (queue.length > MAX_QUEUE) queue.splice(0, queue.length - MAX_QUEUE);
  writeQueue(queue);
};

const shift = (): CachedItem | undefined => {
  const queue = readQueue();
  const item = queue.shift();
  writeQueue(queue);
  return item;
};

const getNow = () => Date.now();

const isDev = () => process.env.NODE_ENV !== 'production';

const hasQueuedItems = () => readQueue().length > 0;

const enqueueWithLog = (
  item: Omit<CachedItem, 'retries'>,
  retries: number,
  reason: string,
) => {
  enqueue({ ...item, retries });
  if (isDev()) {
    // eslint-disable-next-line no-console
    console.log(`[cached-analytics] ${reason}`, {
      size: readQueue().length,
      eventType: item.eventType,
    });
  }
};

const validateRequiredFields = (props: ATIEventTrackingProps): boolean => {
  // Minimal sanity checks; extend if needed
  return Boolean(
    props?.componentName &&
      props?.pageIdentifier &&
      props?.platform &&
      props?.producerId &&
      props?.service &&
      props?.statsDestination &&
      props?.type,
  );
};

const sendSequentially = async (isOnline: boolean): Promise<void> => {
  if (flushingInProgress) return;
  flushingInProgress = true;
  try {
    // send items one by one to preserve order
    // stop early if we go offline midway
    // retry logic: on a single failure of an item, re-enqueue at tail and continue with next
    let safetyCounter = 0; // prevent infinite loops if something goes wrong
    while (isOnline || hasQueuedItems()) {
      const item = shift();
      if (!item) break;
      try {
        console.log('Send sendEventBeacon');
        // eslint-disable-next-line no-await-in-loop
        await sendEventBeacon(item.props);
      } catch {
        // re-enqueue with retries incremented
        enqueue({ ...item, retries: item.retries + 1 });
        break; // break the loop to avoid hot spinning while possibly offline
      }
      safetyCounter += 1;
      if (safetyCounter > MAX_QUEUE * 2) break;
    }
  } finally {
    flushingInProgress = false;
  }
};

const scheduleFlush = (isOnline: boolean, delayMs: number) => {
  setTimeout(() => {
    sendSequentially(isOnline);
  }, delayMs);
};

const exposeDevHelpers = (api: CachedAnalyticsApi) => {
  if (typeof window === 'undefined' || !isDev()) return;
  const getQueue = () => readQueue();
  const clearQueue = () => writeQueue([]);
  window.cached_analytics = {
    ...api,
    getQueue,
    clearQueue,
  };
};

export const useCachedAnalyticsTracker = (
  componentNameForToggle?: string,
): CachedAnalyticsApi => {
  const toggleName = componentNameForToggle || 'cached-analytics';
  const { trackingIsEnabled } = useTrackingToggle(toggleName);
  const { isOnline } = useNetworkStatusTracker();
  const { service, useReverb } = use(ServiceContext);
  const eventTrackingContext = use(EventTrackingContext);

  const canTrackRef = useRef<boolean>(false);
  const prevOnlineRef = useRef<boolean>(isOnline);

  useEffect(() => {
    canTrackRef.current = trackingIsEnabled;
  }, [trackingIsEnabled]);

  useEffect(() => {
    // auto-flush when coming back online or on mount if online with backlog
    const wasOffline = !prevOnlineRef.current;

    if (isOnline && hasQueuedItems()) {
      if (wasOffline) {
        // slight delay to allow connectivity to stabilise
        scheduleFlush(isOnline, 250);
      } else {
        sendSequentially(isOnline);
      }
    }

    prevOnlineRef.current = isOnline;
  }, [isOnline]);

  // Mobile-specific: flush queue when app comes back to foreground
  useEffect(() => {
    if (typeof document === 'undefined') return undefined;

    const handleVisibilityChange = () => {
      if (
        document.visibilityState === 'visible' &&
        isOnline &&
        hasQueuedItems()
      ) {
        // Small delay to ensure network is stable after app resume
        scheduleFlush(isOnline, 500);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isOnline]);

  const flush = useCallback(async () => {
    if (!canTrackRef.current) return;
    if (!isOnline) return;
    await sendSequentially(isOnline);
  }, [isOnline]);

  const track = useCallback<CachedAnalyticsApi['track']>(
    async ({ eventType, eventTrackingData }) => {
      if (!canTrackRef.current) return;

      // Derive full ATI/Reverb props from provided tracking data
      const {
        componentName,
        format,
        advertiserID,
        url,
        pageIdentifier,
        platform,
        producerId,
        producerName,
        statsDestination,
        campaignID,
        detailedPlacement,
        experimentName,
        experimentVariant,
        groupTracker,
        itemTracker,
        eventGroupingName,
      } = extractATITrackingProps({
        eventTrackingData,
        eventType,
        eventTrackingContextFromHook: eventTrackingContext,
      });

      const props: ATIEventTrackingProps = {
        campaignID,
        componentName,
        format,
        pageIdentifier,
        platform,
        producerId,
        producerName,
        service,
        statsDestination,
        type: eventType,
        advertiserID,
        url,
        detailedPlacement,
        experimentName,
        experimentVariant,
        useReverb,
        ...(groupTracker && { groupTracker }),
        ...(itemTracker && { itemTracker }),
        ...(eventGroupingName && { eventGroupingName }),
      };

      if (!validateRequiredFields(props)) {
        if (isDev()) {
          // eslint-disable-next-line no-console
          console.warn(
            '[cached-analytics] Missing required analytics fields, dropping event',
            {
              eventType,
              componentName,
            },
          );
        }
        return;
      }

      const occurredAt = getNow();

      if (!isOnline) {
        enqueueWithLog(
          { eventType, eventTrackingData, props, occurredAt },
          0,
          'Enqueued (offline)',
        );
        return;
      }

      try {
        console.log('Send sendEventBeacon');
        await sendEventBeacon(props);
      } catch {
        enqueueWithLog(
          { eventType, eventTrackingData, props, occurredAt },
          1,
          'Enqueued (send failed)',
        );
      }
    },
    [service, useReverb, isOnline, eventTrackingContext],
  );

  const api: CachedAnalyticsApi = { track, flush };

  useEffect(() => {
    exposeDevHelpers(api);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return api;
};

export default useCachedAnalyticsTracker;
export type { CachedAnalyticsApi, TrackEventType, CachedItem } from './type';
