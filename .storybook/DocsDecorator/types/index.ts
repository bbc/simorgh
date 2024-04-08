interface HealthFactorsItem {
  done?: boolean;
  reference?: {
    url: string;
    label: string;
  };
}

export default interface HealthFactorsMetadata {
  alpha?: boolean;
  lastUpdated?: {
    day?: number;
    month?:
      | 'January'
      | 'February'
      | 'March'
      | 'April'
      | 'May'
      | 'June'
      | 'July'
      | 'August'
      | 'September'
      | 'October'
      | 'November'
      | 'December';
    year?: number;
  };
  uxAccessibilityDoc: HealthFactorsItem;
  acceptanceCriteria: HealthFactorsItem;
  swarm: HealthFactorsItem;
}

export interface HealthFactorsProps {
  metadata?: HealthFactorsMetadata;
  docs?: {
    readme?: string;
  };
}
