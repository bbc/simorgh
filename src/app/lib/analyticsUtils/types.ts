// biome-ignore-all lint/suspicious/noExplicitAny: we want this
import type { ATIEventTrackingProps } from '#app/components/ATIAnalytics/types';
import type {
  EventTrackingContextProps,
  EventTrackingMetadata,
} from '#app/models/types/eventTracking';
import {
  type CLICK_EVENT,
  STATIC_ATI_VIEW_TRACKING,
  type VIEW_EVENT,
} from './analytics.const';

export type ATIEventType = typeof VIEW_EVENT | typeof CLICK_EVENT;

export type EventTrackingData = EventTrackingMetadata & ATIEventTrackingProps;

export type EventTrackingProps = {
  eventTrackingData?: EventTrackingData;
  eventType: ATIEventType;
  eventTrackingContextFromHook?: EventTrackingContextProps;
};

export type ViewTracker = {
  ref?: any;
  [STATIC_ATI_VIEW_TRACKING]?: string;
};
