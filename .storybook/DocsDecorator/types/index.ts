interface HealthFactorItem {
  done?: boolean;
  reference?: {
    url: string;
    label: string;
  };
}

export default interface HealthFactorMetadata {
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
  uxAccessibilityDoc: HealthFactorItem;
  acceptanceCriteria: HealthFactorItem;
  swarm: HealthFactorItem;
}
