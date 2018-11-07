const config = {
  urls: ['http://localhost:7080/news/articles/c85pqyj5m2ko'],
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

module.exports = config;
