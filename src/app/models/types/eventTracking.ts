/* eslint-disable camelcase */
export type ViewabilityEventTrackingData = {
  app_type: string;
  app_name: string;
  event_category: string;
  page: string;
  page_title: string;
  group_name: string;
  group_type: string;
  group_position: string;
  group_resource_id: string | undefined;
  group_item_count?: number;
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
