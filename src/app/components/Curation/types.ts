import type { EventTrackingData } from '#app/lib/analyticsUtils/types';
import type { Summary } from '#app/models/types/curationData';

export interface CurationGridProps {
  summaries: Summary[];
  headingLevel?: number;
  isFirstCuration?: boolean;
  eventTrackingData: EventTrackingData;
}
