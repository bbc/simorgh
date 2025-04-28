/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventTrackingMetadata } from '#app/models/types/eventTracking';
import { Platforms, Services } from '#app/models/types/global';
import {
  CLICK_EVENT,
  STATIC_ATI_VIEW_TRACKING,
  VIEW_EVENT,
} from './analytics.const';

export type ATIEventType = typeof VIEW_EVENT | typeof CLICK_EVENT;

export interface ComponentTrackingProps {
  campaignID?: string;
  componentName?: string;
  format?: string;
  pageIdentifier?: string;
  platform?: Platforms;
  producerId?: string;
  producerName?: string;
  service?: Services;
  statsDestination?: string;
  type?: string;
  advertiserID?: string;
  url?: string;
  detailedPlacement?: string;
  useReverb?: boolean;
  experimentVariant?: string;
  ampExperimentName?: string;
  preventNavigation?: string;
}

export type EventTrackingData = EventTrackingMetadata & ComponentTrackingProps;

export type EventTrackingProps = {
  eventTrackingData?: EventTrackingData;
  eventType: ATIEventType;
};

export type ViewTracker = {
  ref?: any;
  [STATIC_ATI_VIEW_TRACKING]?: string;
};
