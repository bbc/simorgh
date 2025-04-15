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
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    requireConfigFile: false,
  },
  ignorePatterns: ['**/tz/**', 'index.stories.jsx', 'index.amp.stories.jsx'],
  plugins: [
    'prettier',
    'json',
    'jsx-a11y',
    'react-hooks',
    'cypress',
    'import',
    'no-only-tests',
  ],
  rules: {
    'react/prop-types': 'off',
    'react/forbid-foreign-prop-types': 'error',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/function-component-definition': 'off',
    'react/no-unknown-property': [
      'error',
      {
        ignore: [
          'amp-boilerplate',
          'amp-custom',
          'amp-access',
          'amp-access-hide',
          'amp-install-serviceworker',
          'css',
          'custom-element',
          'custom-template',
          'fallback',
        ],
      },
    ],
    'linebreak-style': process.platform === 'win32' ? 'off' : ['error', 'unix'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/no-import-module-exports': [
      'error',
      {
        exceptions: ['**/*/startServer.js'],
      },
    ],
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
    'no-only-tests/no-only-tests': 'error',
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
        'react/jsx-filename-extension': [
          2,
          {
            extensions: ['.jsx', '.tsx'],
          },
        ],
        // adds support for type, interface and enum declarations https://typescript-eslint.io/rules/no-use-before-define/#how-to-use
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
          },
        ],
        'react/require-default-props': 'off',
        'react/no-unused-prop-types': 'off',
      },
    },
  ],
};
