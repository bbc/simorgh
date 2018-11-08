const validatedPassingScores = [
  {
    url: 'http://localhost:7080/news/articles/c9rpqy7pmypo',
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
    url: 'http://localhost:7080/news/articles/c9rpqy7pmypo',
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
    url: 'http://localhost:7080/news/articles/c9rpqy7pmypo',
    category: 'best-practices',
  },
  {
    url: 'http://localhost:7080/news/articles/c9rpqy7pmypo',
    category: 'seo',
  },
];

module.exports = {
  validatedPassingScores,
  validatedFailingScores,
  failures,
};
