// DRAFT: placeholder shape for the `detail` payload of Resonance's "viewability" CustomEvent.
// The real `ViewabilityProperties` type from '@bbc/resonance' can't be resolved here because
// its published .d.ts references a nested module that isn't shipped in the package's dist/.
// Replace this with the confirmed shape from the Viewability Events properties reference
// (linked in the ticket) before this leaves draft status.
export type ResonanceViewabilityEventDetail = {
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
