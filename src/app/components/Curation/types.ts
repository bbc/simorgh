import { Summary } from '#app/models/types/curationData';

export interface CurationGridProps {
  summaries: Summary[];
  headingLevel?: number;
  isFirstCuration?: boolean;
}
