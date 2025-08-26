import { Summary } from '#app/models/types/curationData';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import useViewTracker from '#app/hooks/useViewTracker';

export interface CurationGridProps {
  summaries: Summary[];
  headingLevel?: number;
  isFirstCuration?: boolean;
  eventTrackingData: EventTrackingData;
  viewTracker?: ReturnType<typeof useViewTracker>;
}
