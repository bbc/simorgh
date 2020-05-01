/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const fetch = require('node-fetch');
const { green, bgRedBright } = require('chalk');
const { structuredDataTest } = require('structured-data-testing-tool');
const { Google, SocialMedia } = require('structured-data-testing-tool/presets');
const {
  printFailures,
  printStatistics,
  printPassing,
} = require('./printResults');
const getSchemas = require('./schemas');

global.Cypress = {
  env: () => {
    return 'local';
  },
};

const getPaths = require('../../cypress/support/helpers/getPaths');
const services = require('../../cypress/support/config/services');

const validate = async url => {
  let result;
  const dataPath = `${url}.json`;

  const response = await fetch(dataPath);
  const jsonData = await response.json();

  const schemas = getSchemas(jsonData) || [];

  try {
    result = await structuredDataTest(url, {
      presets: [Google, SocialMedia],
      schemas: [...schemas],
    });
  } catch (error) {
    if (error.type === 'VALIDATION_FAILED') {
      result = error.res;
    } else {
      console.error(error);
      process.exit(1);
    }
  }

  result.url = url;
  return result;
};

const getUrls = () => {
  const urlsToValidate = [];
  Object.keys(services).forEach(service => {
    Object.keys(services[service].pageTypes)
      .filter(pageType => !pageType.startsWith('error'))
      .forEach(pageType => {
        const paths = getPaths(service, pageType);
        const urls = paths.map(path => `http://localhost:7080${path}`);

        urlsToValidate.push(...urls);
      });
  });

  return urlsToValidate;
};

const checkStructuredData = urls => {
  return Promise.all(urls.map(url => validate(url)))
    .then(results => {
      return results;
    })
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
};

const printResults = results => {
  const showInfo = process.argv[2] && process.argv[2] === '-i';

  results.forEach(result => {
    console.log(`\n${result.url}`);

    if (showInfo) {
      printPassing(result);
    } else {
      console.log(green(`  ✓ ${result.passed.length} tests passed`));
    }
  });

  results.forEach(result => {
    if (result.failed.length > 0) {
      console.log(`\n${result.url}`);
      printFailures(result.failed);
    }
  });

  printStatistics(results);
};

const exit = results => {
  const totalFailed = results.map(result => result.failed).flat();

  if (totalFailed.length > 0) {
    console.error(bgRedBright('Tests Failed'));
    process.exit(1);
  }
};

const run = async () => {
  const start = new Date();

  const results = await checkStructuredData(getUrls());

  printResults(results);

  console.log('Execution Time: %d seconds', (new Date() - start) / 1000);

  exit(results);
};

module.exports = {
  getUrls,
  printResults,
  validate,
  checkStructuredData,
  run,
};
