export type LatestMedia = {
  description: string;
  duration: string;
  firstPublished: string;
  id: string;
  imageUrl: string;
  link: string;
  title: string;
  type: 'video' | 'audio';
};

export type TrackingBlock = {
  componentName: string;
};

export type LatestMediaItemProp = {
  item: LatestMedia;
  ariaLabelledBy: unknown;
  ref: unknown;
  eventTrackingData: unknown;
};
