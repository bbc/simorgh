import { EventTrackingMetadata } from '#app/models/types/eventTracking';

export type CallToActionLinkProps = {
  href?: string;
  className?: string;
  eventTrackingData?: EventTrackingMetadata;
  download?: boolean;
};
