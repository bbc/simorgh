import {
  Summary,
  VisualProminence,
  VisualStyle,
} from '#app/models/types/curationData';

export interface Promo extends Summary {
  mediaType?: 'audio' | 'video' | 'photogallery';
  duration?: string | number;
  lazy?: boolean;
  headingLevel?: number;
  hideTimestamp?: boolean;
  hideImage?: boolean;
}

export interface CurationGridProps {
  promos: Promo[];
  headingLevel?: number;
  visualProminence?: VisualProminence;
  visualStyle?: VisualStyle;
}
