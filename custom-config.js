module.exports = {
  extends: 'lighthouse:default',
  settings: {
    onlyAudits: [
      'first-meaningful-paint',
      'speed-index-metric',
      'estimated-input-latency',
      'first-interactive',
      'consistently-interactive',
    ],
  },
};
