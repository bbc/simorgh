const config = {
  urls: [
    'http://localhost:7080/news/articles/c9rpqy7pmypo',
    'http://localhost:7080/news/articles/c85pqyj5m2ko',
  ],
  thresholds: {
    accessibility: 1,
    seo: 1,
    pwa: 0,
    performance: 0.9,
    'best-practices': 1,
  },
  opts: {
    chromeFlags: ['--headless'],
  },
};

module.exports = config;
