module.exports = {
  customSyntax: '@stylelint/postcss-css-in-js',
  rules: {
    'selector-type-no-unknown': [true, { ignoreTypes: ['/^amp-/'] }],
    'no-empty-source': [
      true,
      {
        severity: 'warning',
      },
    ],
  },
  extends: ['stylelint-config-recommended'],
};
