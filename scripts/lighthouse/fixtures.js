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
        score: 1,
        expectedScore: 0,
        pass: true,
      },
      { id: 'pwa', score: 1, expectedScore: 0, pass: true },
      { id: 'accessibility', score: 1, expectedScore: 0, pass: true },
      {
        id: 'best-practices',
        score: 0.5,
        expectedScore: 0,
        pass: true,
      },
      { id: 'seo', score: 0.5, expectedScore: 0, pass: true },
    ],
  },
];

// create a copy of validatedPassingScores
const validatedFailingScores = JSON.parse(
  JSON.stringify(validatedPassingScores),
);

function createFailingScores(index) {
  validatedFailingScores[0].scores[index].expectedScore = 1;
  validatedFailingScores[0].scores[index].pass = false;
}

// create failing scores for best-practices and seo
createFailingScores(3);
createFailingScores(4);

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
