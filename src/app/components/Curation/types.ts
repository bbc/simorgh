import { Summary } from '#app/models/types/curationData';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';

export interface CurationGridProps {
  summaries: Summary[];
  headingLevel?: number;
  isFirstCuration?: boolean;
  eventTrackingData: EventTrackingData;
  timeOfDayExperimentName?: string;
  timeOfDayVariant?: string;
}
