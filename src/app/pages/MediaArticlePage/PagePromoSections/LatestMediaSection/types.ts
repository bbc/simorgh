import { EventTrackingBlock } from '#models/types/eventTracking';

export type Media = 'video' | 'audio';

export type LatestMedia = {
  description: string;
  duration: string;
  firstPublished: string;
  id: string;
  imageUrl: string;
  link: string;
  title: string;
  type: Media;
  imageAlt?: string;
};

export type LatestMediaItemProp = {
  item: LatestMedia;
  ariaLabelledBy: string;
  ref: () => Promise<void>;
  eventTrackingData: EventTrackingBlock;
};

export type ImageProp = {
  src: string;
  useLargeImages: boolean;
};

export type LatestMediaIndicatorProp = {
  duration: string;
};
