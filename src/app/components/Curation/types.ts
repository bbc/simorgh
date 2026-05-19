import type { Summary } from '#app/models/types/curationData';
import type { EventTrackingData } from '#app/lib/analyticsUtils/types';

export interface CurationGridProps {
  summaries: Summary[];
  headingLevel?: number;
  isFirstCuration?: boolean;
  eventTrackingData: EventTrackingData;
}
