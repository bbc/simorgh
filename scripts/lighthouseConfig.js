module.exports = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: [
      'accessibility',
      'best-practices',
      'performance',
      'pwa',
      'seo',
    ],
    skipAudits: ['is-on-https'],
  },
};
