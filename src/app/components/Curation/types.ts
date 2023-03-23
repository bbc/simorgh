import { Summary } from '#app/models/types/curationData';
import { Services, Variants } from '#models/types/global';

export interface Promo extends Summary {
  mediaType?: 'audio' | 'video' | 'photogallery';
  duration?: string | number;
  lazy?: boolean;
  headingLevel?: number;
}

export interface CurationGridProps {
  promos: Promo[];
  headingLevel?: number;
}

export interface StorybookProps {
  service: Services;
  variant: Variants;
}
