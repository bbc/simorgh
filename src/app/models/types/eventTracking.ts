/* eslint-disable camelcase */
export type ViewabilityEventTrackingData = {
  groupTracker: {
    name: string;
    type: string;
    position: string;
    resourceId?: string;
    itemCount?: number;
  };
  page: string;
  pageTitle: string;
  appName: string;
  componentName: string;
  eventCategory: string;
  appType: string;
};
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
