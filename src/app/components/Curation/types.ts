import { Summary } from '#app/models/types/curationData';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';

export interface CurationGridProps {
  summaries: Summary[];
  headingLevel?: number;
  isFirstCuration?: boolean;
  eventTrackingData: EventTrackingData;
  // experiment: newswb_ws_homepage_related_topic_promos
  showRelatedTopicExperiment?: boolean;
}
