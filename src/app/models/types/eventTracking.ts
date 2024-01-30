export type EventTrackingMetadata = {
  componentName: string;
  detailedPlacement?: string;
};

export type EventTrackingBlock = {
  block: {
    componentName: EventTrackingMetadata['componentName'];
  };
};
