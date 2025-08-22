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
};

export type EventTrackingBlock = {
  block: {
    componentName: EventTrackingMetadata['componentName'];
  };
};
