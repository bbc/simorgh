// filepath: /Applications/Code/simorgh/eslint.config.js
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import jsxA11Y from 'eslint-plugin-jsx-a11y';
import cypress from 'eslint-plugin-cypress';
import json from 'eslint-plugin-json';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import noOnlyTests from 'eslint-plugin-no-only-tests';
import dirAlias from './dirAlias.mjs';
import prettier from 'eslint-plugin-prettier';

const { eslintDirAlias } = dirAlias;

export default [
  {
    ignores: [
      '**/build/**/*',
      '**/tz/**/*',
      '**/index.stories.jsx',
      '**/index.amp.stories.jsx',
      '.storybook/**/*',
      'ws-nextjs-app/public/vendor/**/*',
      'ws-nextjs-app/build/**/*',
      'ws-nextjs-app/cypress.config.ts',
      'storybook_dist/**/*',
      '**/webpack.config.*.js',
      './webpack.config.*.js',
      './webpack.config.js',
      'ws-nextjs-app/cypress/**/*',
      '**/*.png',
      '**/*.jpg',
      '**/*.jpeg',
      '**/*.gif',
      '**/*.svg',
      '**/*.sh',
      '**/*.json',
      '**/*.gz',
      '**/*.md',
      '**/*.snap',
      '**/*.env',
      '**/*.gitattributes',
      '**/*.yml',
      '**/*.xml',
      '**/*.zip',
      '**/*.html',
      '**/.DS_Store',
      '**/.gitignore',
      '**/.husky/**/*',
      '**/.nojekyll',
      '**/.nvmrc',
      '**/.prettierrc',
      '**/.yarn/**/*',
    ],
  },
  {
    files: ['src/**/*.{js,jsx}', 'cypress/**/*.{js,jsx}'], // JavaScript files
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node,
      },
      parser: babelParser, // Use babelParser for JavaScript files
      parserOptions: {
        project: true,
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
      prettier: prettier,
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
      'import/no-unresolved': 'error',
      'import/extensions': 'off',
      'no-only-tests/no-only-tests': 'error',
      'no-unsafe-optional-chaining': 'error',
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx'],
        },
        alias: {
          map: eslintDirAlias.map,
          extensions: eslintDirAlias.extensions,
        },
      },
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node,
      },
      parser: tsParser, // Use @typescript-eslint/parser for TypeScript files
      parserOptions: {
        project: true,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react,
      'jsx-a11y': jsxA11Y,
      'react-hooks': reactHooks,
      cypress,
      json,
      import: importPlugin,
      'no-only-tests': noOnlyTests,
      prettier: prettier,
    },
    rules: {
      '@typescript-eslint/no-use-before-define': ['error'],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^(jsx|_)', // jsx is required for Emotion's CSS-in-JS functionality to work with JSX syntax even if not used in the file
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/prefer-optional-chain': ['error'], // TypeScript-specific rule
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-vars': 'error',
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-is-valid': 'warn',
      'jsx-a11y/aria-role': 'error',
      'jsx-a11y/no-autofocus': 'warn',
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
        typescript: {
          project: './tsconfig.json', // Point to your tsconfig.json
        },
        alias: {
          map: eslintDirAlias.map,
          extensions: eslintDirAlias.extensions,
        },
      },
    },
  },
  {
    files: [
      'ws-nextjs-app/**/*.{ts,tsx}', // General TypeScript files in ws-nextjs-app
      'ws-nextjs-app/**/*.test.{ts,tsx}', // Test files in ws-nextjs-app
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node,
        describe: true,
        it: true,
        expect: true,
        document: true,
      },
      parser: tsParser, // Use @typescript-eslint/parser for TypeScript files
      parserOptions: {
        project: true,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react,
      'jsx-a11y': jsxA11Y,
      'react-hooks': reactHooks,
      cypress,
      json,
      import: importPlugin,
      'no-only-tests': noOnlyTests,
      prettier: prettier,
    },
    rules: {
      '@typescript-eslint/no-use-before-define': ['error'],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^(jsx|_)', // jsx is required for Emotion's CSS-in-JS functionality to work with JSX syntax even if not used in the file
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/prefer-optional-chain': ['error'],
      'no-undef': 'off', // Disable no-undef for test globals
    },
  },
  {
    files: ['src/**/*.{js,jsx}', 'cypress/**/*.{js,jsx}'], // JavaScript files
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node,
      },
      parser: babelParser, // Use babelParser for JavaScript files
      parserOptions: {
        project: true,
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
      prettier: prettier,
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
      'max-len': 'off',
      'import/no-unresolved': 'error',
      'import/extensions': 'off',
      'no-only-tests/no-only-tests': 'error',
      'no-unsafe-optional-chaining': 'error',
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx'],
        },
        alias: {
          map: eslintDirAlias.map,
          extensions: eslintDirAlias.extensions,
        },
      },
    },
  },
];
