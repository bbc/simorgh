module.exports = {
  rules: {
    'selector-type-no-unknown': [true, { ignoreTypes: ['/^amp-/', 'mq'] }],
    'no-empty-source': [
      true,
      {
        severity: 'warning',
      },
    ],
    'no-extra-semicolons': null,
  },
  extends: ['stylelint-config-recommended'],
};
