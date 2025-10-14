import { EventTrackingData, ATIEventType } from '#app/lib/analyticsUtils/types';
import { ATIEventTrackingProps } from '#app/components/ATIAnalytics/types';

export type TrackEventType = ATIEventType;

export type CachedItem = {
  eventType: TrackEventType;
  eventTrackingData?: EventTrackingData;
  props: ATIEventTrackingProps;
  occurredAt: number;
  retries: number;
};

export type CachedAnalyticsApi = {
  track: (args: {
    eventType: TrackEventType;
    eventTrackingData?: EventTrackingData;
  }) => Promise<void>;
  flush: () => Promise<void>;
};

declare global {
  interface Window {
    // eslint-disable-next-line camelcase
    cached_analytics?: CachedAnalyticsApi & {
      getQueue: () => CachedItem[];
      clearQueue: () => void;
    };
  }
}
