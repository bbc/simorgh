import { RadioScheduleData } from '#app/models/types/radioSchedule';
import { MostReadData } from '../../components/MostRead/types';

export interface Summary {
  imageUrl?: string;
  link?: string;
  imageAlt?: string;
  description?: string;
  title: string;
  id?: string;
  type: string;
  firstPublished?: string | number;
  lastPublished?: string | number;
}

export const VISUAL_STYLE = {
  NONE: 'NONE',
  BANNER: 'BANNER',
  COLLECTION: 'COLLECTION',
  LINKS: 'LINKS',
  FEED: 'FEED',
  RANKED: 'RANKED',
} as const;

export const VISUAL_PROMINENCE = {
  MINIMUM: 'MINIMUM',
  LOW: 'LOW',
  NORMAL: 'NORMAL',
  HIGH: 'HIGH',
  MAXIMUM: 'MAXIMUM',
} as const;

export type VisualStyle = keyof typeof VISUAL_STYLE;

export type VisualProminence = keyof typeof VISUAL_PROMINENCE;

export interface CurationProps {
  visualStyle: VisualStyle;
  visualProminence: VisualProminence;
  curationType?: string;
  promos?: Summary[];
  title?: string;
  link?: string;
  headingLevel?: number;
  position?: number;
  topStoriesTitle?: string;
  curationLength?: number;
  mostRead?: MostReadData;
  nthCurationByStyleAndProminence?: number;
  radioSchedule?: RadioScheduleData[];
}

export interface CurationData {
  summaries?: Summary[];
  visualStyle?: VisualStyle | string;
  visualProminence: VisualProminence | string;
  curationId: string;
  title?: string;
  link?: string;
  position: number;
  activePage?: number;
  pageCount?: number;
  curationType?: string;
  mostRead?: MostReadData;
  radioSchedule?: RadioScheduleData[];
}
