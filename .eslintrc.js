const { eslintDirAlias } = require('./dirAlias');

module.exports = {
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  env: {
    es6: true,
    browser: true,
    jest: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  ignorePatterns: [
    '**/tz/**',
    'index.stories.jsx',
    'index.stories.tsx',
    'index.amp.stories.jsx',
    '.storybook/**/*',
  ],
  plugins: [
    'prettier',
    'json',
    'jsx-a11y',
    'react-hooks',
    'cypress',
    'import',
    'no-only-tests',
  ],
  globals: {
    globalThis: false,
    cy: false,
    Cypress: false,
    expect: false,
    assert: false,
    chai: false,
    before: false,
    beforeEach: false,
    after: false,
    afterEach: false,
    describe: false,
    it: false,
    context: false,
    specify: false,
    test: false,
  },
  rules: {
    'react/prop-types': 'off',
    'react/forbid-foreign-prop-types': 'error',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
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
        devDependencies: ['**/stories.jsx', '/src/testHelpers/**'],
      },
    ],
    'import/extensions': [1, { json: 'ignorePackages' }],
    'import/no-unresolved': [
      'error',
      {
        ignore: ['^#psammead/moment-timezone-include/tz/'],
      },
    ],
    'jsx-a11y/no-redundant-roles': 'off',
    // The #components, #containers and #psammead aliases resolve into src/app/legacy.
    // Ratchet: warn now, raise to error once the remaining legacy modules are migrated.
    'no-restricted-imports': [
      'warn',
      {
        patterns: [
          {
            group: [
              // The leading '#' must be escaped: these patterns are matched with
              // gitignore semantics, where an unescaped leading '#' is a comment.
              '\\#components/*',
              '\\#components/**',
              '\\#containers/*',
              '\\#containers/**',
              '\\#psammead/*',
              '\\#psammead/**',
            ],
            message:
              'This resolves into src/app/legacy. Import a migrated component from #app/components instead, or migrate it — see docs/Coding-Standards/Migrating-Legacy-Components.mdx',
          },
        ],
      },
    ],
    'no-only-tests/no-only-tests': 'error',
    'no-unsafe-optional-chaining': 'error',
    'cypress/no-assigning-return-values': 'error',
    'cypress/no-unnecessary-waiting': 'error',
    'cypress/no-async-tests': 'error',
    'cypress/unsafe-to-chain-command': 'error',
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
      // Legacy modules necessarily import each other via these aliases until migrated.
      files: ['src/app/legacy/**'],
      rules: {
        'no-restricted-imports': 'off',
      },
    },
    {
      files: ['**/*.{ts,tsx}'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: true,
      },
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
        '@typescript-eslint/prefer-optional-chain': ['error'],
        'react/require-default-props': 'off',
        'react/no-unused-prop-types': 'off',
      },
    },
  ],
};
