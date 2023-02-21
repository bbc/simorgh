export interface Summary {
  imageUrl?: string;
  link?: string;
  imageAlt?: string;
  description?: string;
  title: string;
  id?: string;
  type: string;
  firstPublished?: string | number;
}

export type VisualStyle =
  | 'NONE'
  | 'BANNER'
  | 'COLLECTION'
  | 'LINKS'
  | 'FEED'
  | 'RANKED';

export type VisualProminence =
  | 'MAXIMUM'
  | 'HIGH'
  | 'NORMAL'
  | 'LOW'
  | 'MINIMUM';

export interface Curation {
  visualStyle: VisualStyle;
  visualProminence: VisualProminence;
  promos: Summary[];
  title?: string;
  link?: string;
  headingLevel?: number;
  position?: number;
  topStoriesTitle?: string;
  curationLength?: number;
}
