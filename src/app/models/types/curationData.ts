import { OEmbedData } from '#app/components/Embeds/types';
import { RadioScheduleData } from '#app/models/types/radioSchedule';
import { MostReadData } from '../../components/MostRead/types';

// This maps to the Summary type definition from the BFF
interface BaseSummary {
  imageUrl: string;
  link: string;
  imageAlt: string;
  description?: string;
  title: string;
  id?: string;
  type: string;
  firstPublished?: string | number;
  lastPublished?: string | number;
  duration?: string | number;
  isLive?: boolean;
}

export interface Summary extends BaseSummary {
  mediaType?: 'audio' | 'video' | 'photogallery';
  lazy?: boolean;
  headingLevel?: number;
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

// This maps to the Curation type definition in the BFF
export interface BaseCuration {
  summaries?: Summary[];
  visualStyle?: VisualStyle | string;
  visualProminence: VisualProminence | string;
  curationId?: string;
  title?: string;
  link?: string;
  position: number;
  activePage?: number;
  pageCount?: number;
  curationType?: string;
  mostRead?: MostReadData;
  radioSchedule?: RadioScheduleData[];
  embed?: OEmbedData;
}

export interface Curation extends BaseCuration {
  topStoriesTitle?: string;
  curationLength?: number;
  nthCurationByStyleAndProminence?: number;
}
