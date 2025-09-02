import { use, useCallback, useEffect } from 'react';
import { VIEW_EVENT } from '#app/lib/analyticsUtils/analytics.const';
import extractATITrackingProps from '#app/lib/analyticsUtils/extractATITrackingProps';
import { sendEventBeacon } from '#app/components/ATIAnalytics/beacon';
import useTrackingToggle from '#app/hooks/useTrackingToggle';
import { ServiceContext } from '#app/contexts/ServiceContext';

export type PianoEvent = Record<string, unknown>;

// queue storage
type QueueItem = {
  id: string;
  name: string;
  payload: PianoEvent;
  ts: number;
};

const STORAGE_KEY = 'pwa_analytics_queue';
const MAX_QUEUE = 200;

// dev logging helper
const isDev =
  typeof process !== 'undefined' && process.env.NODE_ENV !== 'production';
const log = (...args: unknown[]) => {
  if (!isDev) return;
  // eslint-disable-next-line no-console
  console.log('[PWA][analytics]', ...args);
};

const now = () => Date.now();
const uuid = () => `${now()}-${Math.random().toString(36).slice(2, 10)}`;

// One-time guard to avoid multiple online listeners when hook is used in many places
let onlineListenerAttached = false;

const readQueue = (): QueueItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as QueueItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeQueue = (items: QueueItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(-MAX_QUEUE)));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('writeQueue', { error: e });
  }
};

const enqueue = (name: string, payload: PianoEvent) => {
  const items = readQueue();
  items.push({ id: uuid(), name, payload, ts: now() });
  writeQueue(items);
  log('enqueue', { name, size: items.length });
};

const usePianoAdapter = () => {
  const {
    pageIdentifier,
    producerId,
    platform,
    statsDestination,
    campaignID,
    producerName,
  } = extractATITrackingProps({ eventType: VIEW_EVENT });

  const { trackingIsEnabled } = useTrackingToggle();
  const { service, useReverb } = use(ServiceContext);

  const track = useCallback(
    async (eventName: string, payload: PianoEvent) => {
      if (!trackingIsEnabled) {
        log('skip:tracking_disabled');
        return;
      }
      if (!eventName) {
        log('skip:no_event_name');
        return;
      }

      // If offline, always enqueue first to avoid data loss, even if some fields are missing
      const isOffline =
        typeof navigator !== 'undefined' && navigator.onLine === false;
      if (isOffline) {
        log('state:offline -> enqueue', { eventName });
        enqueue(eventName, payload);
        return;
      }

      const shouldSendEvent = [
        campaignID,
        eventName,
        pageIdentifier,
        platform,
        producerId,
        producerName,
        service,
        statsDestination,
      ].every(Boolean);

      if (!shouldSendEvent) {
        log('skip:insufficient_fields', {
          hasCampaignID: Boolean(campaignID),
          hasPageIdentifier: Boolean(pageIdentifier),
          hasPlatform: Boolean(platform),
          hasProducerId: Boolean(producerId),
          hasProducerName: Boolean(producerName),
          hasService: Boolean(service),
          hasStatsDestination: Boolean(statsDestination),
        });
        return;
      }

      try {
        log('send', { eventName });
        await sendEventBeacon({
          type: VIEW_EVENT,
          eventGroupingName: eventName,
          componentName: JSON.stringify(payload),
          campaignID,
          pageIdentifier,
          platform,
          producerId,
          producerName,
          service,
          statsDestination,
          useReverb,
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('Piano tracking failed:', error);
        enqueue(eventName, payload);
      }
    },
    [
      trackingIsEnabled,
      campaignID,
      pageIdentifier,
      platform,
      producerId,
      producerName,
      service,
      statsDestination,
      useReverb,
    ],
  );

  const flush = useCallback(async () => {
    if (!trackingIsEnabled) return;
    const isOffline =
      typeof navigator !== 'undefined' && navigator.onLine === false;
    if (isOffline) {
      log('flush:skip_offline');
      return;
    }
    const items = readQueue();
    if (!items.length) return;
    const batch = items.slice(0, 20);
    log('flush:start', { queued: items.length, batch: batch.length });

    const sendSequentially = batch.reduce<Promise<void>>((prev, item) => {
      return prev.then(async () => {
        log('flush:send', { id: item.id, name: item.name });
        await sendEventBeacon({
          type: VIEW_EVENT,
          eventGroupingName: item.name,
          componentName: JSON.stringify(item.payload),
          campaignID,
          pageIdentifier,
          platform,
          producerId,
          producerName,
          service,
          statsDestination,
          useReverb,
        });
        // remove sent item (fresh read to avoid races)
        const current = readQueue();
        writeQueue(current.filter(q => q.id !== item.id));
        const remaining = readQueue().length;
        log('flush:sent', { id: item.id, remaining });
      });
    }, Promise.resolve());

    try {
      await sendSequentially;
    } catch {
      // stop on first failure; remaining items stay queued
    }
    log('flush:end', { remaining: readQueue().length });
  }, [
    trackingIsEnabled,
    campaignID,
    pageIdentifier,
    platform,
    producerId,
    producerName,
    service,
    statsDestination,
    useReverb,
  ]);

  // Ensure queued analytics are flushed when the browser comes online,
  // even if PWATelemetry is not mounted on a given page.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (onlineListenerAttached) return;
    const onOnline = () => {
      log('online_event:flush');
      // fire and forget; queue remains if failures occur
      flush().catch(() => {
        log('online_event:flush_error');
      });
    };
    window.addEventListener('online', onOnline);
    onlineListenerAttached = true;
    // Intentionally not removing the listener to keep it global for the session
  }, [flush]);

  // Expose dev-only helpers for manual testing from Console
  if (isDev && typeof window !== 'undefined') {
    (window as unknown as Record<string, unknown>).pwaAnalytics = {
      readQueue,
      flush,
      track,
    };
  }

  return { track, flush };
};

export default usePianoAdapter;
