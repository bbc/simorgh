import {
  ElectionCandidate,
  ElectionMetric,
  ElectionResults,
} from '#app/models/types/elections';

const candidate = ({
  id,
  name,
  party,
  colour,
  totalVotes,
  votesPercentage,
}: {
  id: number;
  name: string;
  party: string;
  colour: string;
  totalVotes: number;
  votesPercentage: number;
}): ElectionCandidate => ({
  id,
  name,
  shortName: name.split(' ').pop() ?? name,
  image: '',
  party: { name: `${party} Party`, shortName: party, colour },
  result: {
    conditions: [
      { id: ElectionMetric.VOTE, totalVotes, votesPercentage },
      { id: ElectionMetric.GEOGRAPHIC_SPREAD, achievedAreas: null },
    ],
    outcome: false,
  },
});

const wireframeFixture: ElectionResults = {
  title: 'Presidential election 2027',
  stage: { current: null, maximum: null, label: null },
  status: null,
  lastUpdated: 1800109800,
  source: { name: null },
  reporting: { returned: 18, total: 36, percentage: 50 },
  winningConditions: [
    { id: ElectionMetric.VOTE },
    {
      id: ElectionMetric.GEOGRAPHIC_SPREAD,
      requiredAreas: 24,
      thresholdPerArea: { operator: '>=', value: 25 },
    },
  ],
  bannerImage: '',
  CTA: {
    text: 'Full results',
    link: 'https://www.bbc.com/news/election-results',
  },
  candidates: [
    candidate({
      id: 1,
      name: 'Amina Example',
      party: 'APX',
      colour: '#2E8B57',
      totalVotes: 6800000,
      votesPercentage: 34,
    }),
    candidate({
      id: 2,
      name: 'Bayo Sample',
      party: 'NDX',
      colour: '#8A2BE2',
      totalVotes: 5800000,
      votesPercentage: 29,
    }),
    candidate({
      id: 3,
      name: 'Chidi Placeholder',
      party: 'ADX',
      colour: '#E67E22',
      totalVotes: 4800000,
      votesPercentage: 24,
    }),
    candidate({
      id: 4,
      name: 'Dele Mock',
      party: 'PDX',
      colour: '#C62828',
      totalVotes: 2600000,
      votesPercentage: 13,
    }),
  ],
};

export default wireframeFixture;
