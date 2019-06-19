module.exports = {
  extends: 'lighthouse:default',
  settings: {
    skipAudits: ['uses-http2', 'aria-roles'],
  },
};
