// eslint-disable no-console
const path = require('path');
const depcheck = require('depcheck');

const options = {
  specials: ['bin', 'eslint', 'jest', 'babel', 'webpack'],
  ignoreDirs: ['build'],
  ignoreMatches: [
    'puppeteer',
    'styled-normalize',
    'isarray',
    'jest-environment-jsdom',
    '@testing-library/dom',
    'structured-data-testing-tool/presets',
  ],
};

depcheck(
  path.resolve(__dirname, '..'),
  options,
  ({ dependencies, missing }) => {
    console.log(`${dependencies.length} unused dependencies.`);
    console.log(dependencies.join('\n'));

    // Filter out dependencies prefixed with "#".
    const missingFiltered = Object.keys(missing).reduce((obj, key) => {
      if (key.startsWith('#')) {
        return obj;
      }

      return {
        ...obj,
        key: missing[key],
      };
    }, {});

    console.log(`${Object.keys(missingFiltered).length} missing dependencies.`);
    Object.keys(missingFiltered).forEach((key) => {
      console.log(key);
      console.log(`  ${missingFiltered[key].join('\n  ')}`);
    });

    if (dependencies.length > 0 || Object.keys(missingFiltered).length > 0) {
      process.exit(1);
    }
  },
);
