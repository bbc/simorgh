import { Platforms } from './global';

// Types consolidated into ATIAnalytics/types.ts. Use EventTrackingData everywhere.
export type ReverbClient = {
  isReady: () => boolean;
  initialise: () => Promise<void>;
  viewEvent: () => void;
  userActionEvent: (...args: unknown[]) => void;
};

export type EventTrackingMetadata = {
  componentName: string;
  detailedPlacement?: string;
  campaignID?: string;
  advertiserID?: string;
  sendOptimizelyEvents?: boolean;
  alwaysInView?: boolean;
};

export type EventTrackingBlock = {
  block: {
    componentName: EventTrackingMetadata['componentName'];
  };
};

export type EventTrackingContextProps =
  | {
      campaignID: string;
      pageIdentifier: string;
      platform: Platforms;
      producerId: string;
      statsDestination: string;
      producerName: string;
    }
  | Record<string, never>;
