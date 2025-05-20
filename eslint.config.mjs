// filepath: /Applications/Code/simorgh/eslint.config.js
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import jsxA11Y from 'eslint-plugin-jsx-a11y';
import cypress from 'eslint-plugin-cypress';
import json from 'eslint-plugin-json';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import noOnlyTests from 'eslint-plugin-no-only-tests';
import * as dirAlias from './dirAlias.mjs';

const { eslintDirAlias } = dirAlias;

export default [
  {
    ignores: [
      '**/tz/**/*',
      '**/index.stories.jsx',
      '**/index.amp.stories.jsx',
      '.storybook/**/*',
    ],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node,
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
      react,
      'jsx-a11y': jsxA11Y,
      'react-hooks': reactHooks,
      cypress,
      json,
      import: importPlugin,
      'no-only-tests': noOnlyTests,
    },
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-vars': 'error',
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-is-valid': 'warn',
      'jsx-a11y/aria-role': 'error',
      'jsx-a11y/no-autofocus': 'warn',
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
      'max-len': 'off',
      'import/no-unresolved': 'error',
      'import/extensions': 'off',
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
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json', // Ensure this points to your tsconfig.json
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
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
    },
  },
];
