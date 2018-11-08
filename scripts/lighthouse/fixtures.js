const url = 'http://localhost:7080/news/articles/c9rpqy7pmypo';
const config = {
  urls: [url],
  thresholds: {
    accessibility: 0,
    seo: 0,
    pwa: 0,
    performance: 0,
    'best-practices': 0,
  },
  opts: {
    chromeFlags: ['--headless'],
  },
};

const validatedPassingScores = [
  {
    url,
    scores: [
      {
        id: 'performance',
        score: 0.72,
        expectedScore: 0,
        pass: true,
      },
      { id: 'pwa', score: 0.58, expectedScore: 0, pass: true },
      { id: 'accessibility', score: 1, expectedScore: 0, pass: true },
      {
        id: 'best-practices',
        score: 0.93,
        expectedScore: 0,
        pass: true,
      },
      { id: 'seo', score: 0.8, expectedScore: 0, pass: true },
    ],
  },
];

const validatedFailingScores = [
  {
    url,
    scores: [
      {
        id: 'performance',
        score: 0.72,
        expectedScore: 0,
        pass: true,
      },
      { id: 'pwa', score: 0.58, expectedScore: 0, pass: true },
      { id: 'accessibility', score: 1, expectedScore: 0, pass: true },
      {
        id: 'best-practices',
        score: 0.93,
        expectedScore: 1,
        pass: false,
      },
      { id: 'seo', score: 0.8, expectedScore: 1, pass: false },
    ],
  },
];

const failures = [
  {
    url,
    category: 'best-practices',
  },
  {
    url,
    category: 'seo',
  },
];

module.exports = {
  validatedPassingScores,
  validatedFailingScores,
  failures,
  config,
};
