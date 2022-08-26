const { eslintDirAlias } = require('./dirAlias');

module.exports = {
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:cypress/recommended',
  ],
  env: {
    es6: true,
    browser: true,
    jest: true,
    node: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  ignorePatterns: ['**/tz/**', 'index.stories.jsx', 'index.amp.stories.jsx'],
  plugins: ['prettier', 'json', 'jsx-a11y', 'react-hooks', 'cypress', 'import'],
  rules: {
    'react/forbid-foreign-prop-types': 'error',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'linebreak-style': process.platform === 'win32' ? 'off' : ['error', 'unix'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/no-extraneous-dependencies': [
      'off',
      {
        devDependencies: [
          '/.storybook/**',
          '**/stories.jsx',
          '/src/testHelpers/**',
        ],
      },
    ],
    'import/extensions': [1, { json: 'ignorePackages' }],
    'jsx-a11y/no-redundant-roles': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      alias: eslintDirAlias,
    },
  },
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        'react/prop-types': 'off',
        'react/jsx-filename-extension': [
          2,
          {
            extensions: ['.jsx', '.tsx'],
          },
        ],
        ...{
          // adds support for type, interface and enum declarations https://typescript-eslint.io/rules/no-use-before-define/#how-to-use
          'no-use-before-define': 'off',
          '@typescript-eslint/no-use-before-define': ['error'],
          'react/require-default-props': 'off',
        },
      },
    },
  ],
};
