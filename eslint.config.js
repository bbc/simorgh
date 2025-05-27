import { defineConfig, globalIgnores } from 'eslint/config';

import { browser, jest, node as _node } from 'globals';
import babelParser from '@babel/eslint-parser';
import prettier from 'eslint-plugin-prettier';
import json from 'eslint-plugin-json';
import jsxA11Y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import cypress from 'eslint-plugin-cypress';
import _import from 'eslint-plugin-import';
import noOnlyTests from 'eslint-plugin-no-only-tests';

import { fixupPluginRules } from '@eslint/compat';

import tsParser from '@typescript-eslint/parser';
import { configs } from '@eslint/js';

import { FlatCompat } from '@eslint/eslintrc';

import { eslintDirAlias } from './dirAlias';

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: configs.recommended,
  allConfig: configs.all,
});

export default defineConfig([
  {
    extends: compat.extends(
      'airbnb',
      'plugin:prettier/recommended',
      'plugin:jsx-a11y/recommended',
      'plugin:cypress/recommended',
    ),

    languageOptions: {
      globals: {
        ...browser,
        ...jest,
        ..._node,
      },

      parser: babelParser,
      ecmaVersion: 2017,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },

        requireConfigFile: false,
      },
    },

    plugins: {
      prettier,
      json,
      'jsx-a11y': jsxA11Y,
      'react-hooks': fixupPluginRules(reactHooks),
      cypress,
      import: fixupPluginRules(_import),
      'no-only-tests': noOnlyTests,
    },

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

      'linebreak-style':
        process.platform === 'win32' ? 'off' : ['error', 'unix'],
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

      'import/extensions': [
        1,
        {
          json: 'ignorePackages',
        },
      ],

      'jsx-a11y/no-redundant-roles': 'off',
      'no-only-tests/no-only-tests': 'error',
      'no-unsafe-optional-chaining': 'error',
    },

    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },

        alias: eslintDirAlias,
      },
    },
  },
  globalIgnores([
    '**/tz/**/*',
    '**/index.stories.jsx',
    '**/index.amp.stories.jsx',
    '.storybook/**/*',
  ]),
  {
    files: ['**/*.{ts,tsx}'],

    languageOptions: {
      parser: tsParser,

      parserOptions: {
        project: true,
      },
    },

    extends: compat.extends('plugin:@typescript-eslint/recommended'),

    rules: {
      'react/jsx-filename-extension': [
        2,
        {
          extensions: ['.jsx', '.tsx'],
        },
      ],

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
]);
