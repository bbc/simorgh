module.exports = {
    extends: 'lighthouse:default',
    settings: {
      skipAudits: [
        'is-on-https',
      ],
    },
  };