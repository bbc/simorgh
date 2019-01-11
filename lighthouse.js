const config = {
  urls: [
    'http://localhost:7080/news/articles/c9rpqy7pmypo',
    'http://localhost:7080/news/articles/c85pqyj5m2ko',
  ],
  thresholds: {
    accessibility: 1,
    seo: 0.8,
    pwa: 0,
    performance: 0.83,
    'best-practices': 0.87,
  },
  opts: {
    chromeFlags: ['--headless'],
  },
};

module.exports = config;
