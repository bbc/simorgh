module.exports = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['ally', 'bestPractises', 'seo'],
    skipAudits: ['is-on-https'],
  },
};
