/* eslint-disable no-console */
const path = require('path');
const depcheck = require('depcheck');

const options = {
  specials: ['bin', 'eslint', 'jest', 'babel', 'webpack'],
  ignoreDirs: ['build', '.storybook', '.yarn', 'cypress'],
  ignoreMatches: [
    'puppeteer',
    'isarray',
    'jest-environment-jsdom',
    '@testing-library/dom',
    '@storybook/addon-knobs',
  ],
};

depcheck(
  path.resolve(__dirname, '..'),
  options,
  ({ dependencies, missing }) => {

    // Filter out dependencies prefixed with "#".
    const missingFiltered = Object.keys(missing).reduce((obj, key) => {
      if (key.startsWith('#')) {
        return obj;
      }

      return {
        ...obj,
        [key]: missing[key],
      };
    }, {});
    Object.keys(missingFiltered).forEach(_key => {
    });

    if (dependencies.length > 0 || Object.keys(missingFiltered).length > 0) {
      process.exit(1);
    }
  },
);
