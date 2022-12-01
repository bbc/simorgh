interface HealthFactorItem {
  done?: boolean;
  reference?: {
    url: string;
    label: string;
  };
}

export default interface HealthFactorMetadata {
  alpha?: Boolean;
  last_updated?: {
    day?: Number;
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
    year?: Number;
  };
  uxAccessibilityDoc: HealthFactorItem;
  acceptanceCriteria: HealthFactorItem;
  swarm: HealthFactorItem;
}
