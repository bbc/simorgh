export enum ElectionStatus {
  NOT_YET_STARTED = 'NOT_YET_STARTED',
  COUNTING = 'COUNTING',
  FINISHED = 'FINISHED',
}

export enum ElectionMetric {
  VOTE = 'vote',
  GEOGRAPHIC_SPREAD = 'geographic-spread',
}

export type ElectionCondition = {
  id: ElectionMetric;
  totalVotes?: number | null;
  votesPercentage?: number | null;
  achievedAreas?: number | null;
};

export type ElectionCandidate = {
  id: number;
  name: string;
  shortName: string;
  image: string;
  party: {
    name: string;
    shortName: string;
    colour: string;
  };
  result: {
    conditions: ElectionCondition[];
    outcome: boolean | null;
  };
};

export type WinningCondition = {
  id: ElectionMetric;
  requiredAreas?: number | null;
  thresholdPerArea?: {
    operator: string | null;
    value: number | null;
  } | null;
};

export type ElectionResults = {
  title?: string | null;
  stage: {
    current: number | null;
    maximum: number | null;
    label: string | null;
  };
  status: ElectionStatus | null;
  lastUpdated: number;
  source: {
    name: string | null;
  };
  reporting: {
    returned: number;
    total: number;
    percentage: number;
  };
  winningConditions: WinningCondition[];
  bannerImage: string;
  CTA: {
    text: string | null;
    link: string | null;
  };
  candidates: ElectionCandidate[];
};
