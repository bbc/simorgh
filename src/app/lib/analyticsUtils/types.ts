import { ATIEventTrackingProps } from '#app/components/ATIAnalytics/types';
import { EventTrackingMetadata } from '#app/models/types/eventTracking';
import {
  CLICK_EVENT,
  LITE_ATI_VIEW_TRACKING,
  VIEW_EVENT,
} from './analytics.const';

export type ATIEventType = typeof VIEW_EVENT | typeof CLICK_EVENT;

export type EventTrackingData = EventTrackingMetadata & ATIEventTrackingProps;

export type EventTrackingProps = {
  eventTrackingData: EventTrackingData;
  eventType: ATIEventType;
};

export type ViewRef = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: any;
  [LITE_ATI_VIEW_TRACKING]?: string;
};
