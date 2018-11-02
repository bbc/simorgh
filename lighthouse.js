const config = {
  urls: [
    'http://localhost:7080/news/articles/c9rpqy7pmypo',
    'http://localhost:7080/news/articles/c85pqyj5m2ko',
  ],
  thresholds: {
    accessibility: 2,
    seo: 2,
    pwa: 2,
    performance: 2,
    'best-practices': 2,
  },
  opts: {
    chromeFlags: ['--headless'],
  },
};

module.exports = config;
