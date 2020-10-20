module.exports = {
  processors: [
    [
      'stylelint-processor-styled-components',
      {
        parserPlugins: ['dynamicImport', 'jsx', 'throwExpressions'],
      },
    ],
  ],
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-styled-components',
  ],
  rules: {
    'selector-type-no-unknown': [true, { ignoreTypes: ['/^amp-/'] }],
  },
};
