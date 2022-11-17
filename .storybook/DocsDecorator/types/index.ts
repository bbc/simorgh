interface HealthFactorItem {
  done: boolean;
  reference: {
    url: string;
    label: string;
  };
}

export default interface HealthFactorMetadata {
  uxAccessibilityDoc: HealthFactorItem;
  acceptanceCriteria: HealthFactorItem;
  swarm: HealthFactorItem;
}
