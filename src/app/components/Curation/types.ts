import { Summary } from '#app/models/types/curationData';

export interface CurationGridProps {
  summaries: Summary[];
  isFirstCuration?: boolean;
}
