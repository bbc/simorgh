const config = {
  urls: [
    'http://localhost:7080/news/articles/c9rpqy7pmypo',
    'http://localhost:7080/news/articles/c85pqyj5m2ko',
  ],
  thresholds: {
    accessibility: 1,
    seo: 0.8,
    pwa: 0.92,
    performance: 0.8,
    'best-practices': 0.93,
  },
  opts: {
    chromeFlags: ['--headless'],
  },
};

module.exports = config;
