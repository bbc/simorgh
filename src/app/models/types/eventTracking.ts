export type EventTrackingMetadata = {
  componentName: string;
};

export type EventTrackingBlock = {
  block: {
    componentName: EventTrackingMetadata['componentName'];
  };
  useReverb?: boolean;
};

export type ReverbEventTrackingMetadata = {
  componentName?: string;
  useReverb?: boolean;
};
