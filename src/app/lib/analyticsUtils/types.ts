/* eslint-disable @typescript-eslint/no-explicit-any */
import { ATIEventTrackingProps } from '#app/components/ATIAnalytics/types';
import {
  EventTrackingContextProps,
  EventTrackingMetadata,
} from '#app/models/types/eventTracking';
import {
  CLICK_EVENT,
  STATIC_ATI_VIEW_TRACKING,
  VIEW_EVENT,
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
