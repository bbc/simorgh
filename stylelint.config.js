module.exports = {
  rules: {
    'selector-type-no-unknown': [true, { ignoreTypes: ['/^amp-/'] }],
  },
  extends: ['stylelint-config-recommended'],
};
