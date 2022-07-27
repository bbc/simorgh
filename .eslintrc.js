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
  plugins: ['json', 'jsx-a11y', 'react-hooks', 'cypress', 'import', 'prettier'],
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
      alias: eslintDirAlias,
    },
  },
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      parser: '@typescript-eslint/parser',
      extends: [
        'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
      ],
      rules: {
        'react/jsx-filename-extension': [
          2,
          {
            extensions: ['.jsx', '.tsx'],
          },
        ],
      },
    },
  ],
};
