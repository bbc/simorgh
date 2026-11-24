export type ResonanceEventModel = {
  event: {
    action?: string;
    category?: string;
    pixelThreshold?: number;
    subcategory?: string;
    grouping?: string;
  };
  experience: {
    breakpoint?: string;
    globalPlatform?: string;
    isAccount?: boolean;
  };
  item: {
    type?: string;
    text?: string;
    position?: number;
    duration?: number;
    label?: string;
    mediaType?: string;
    resourceId?: string;
    attribution?: string;
    campaignName?: string;
    link?: string;
    name?: string;
  };
  group: {
    itemCount?: number;
    link?: string;
    name?: string;
    position?: string | number;
    resourceId?: string;
    type?: string;
  };
  mv?: {
    engineName?: string;
    variationId?: string;
    experimentId?: string;
  };
  destination?: string;
  producer?: string;
  service?: string;
  isSignedIn?: boolean;
  hashedId?: string | null;
};
