/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const { structuredDataTest } = require('structured-data-testing-tool');
const { Google, SocialMedia } = require('structured-data-testing-tool/presets');
const {
  printFailures,
  printStatistics,
  printPassing,
} = require('./printResults');

global.Cypress = {
  env: () => {
    return 'local';
  },
};

const getPaths = require('../../cypress/support/helpers/getPaths');
const services = require('../../cypress/support/config/services');

const validate = async (url) => {
  let result;

  try {
    result = await structuredDataTest(url, {
      presets: [Google, SocialMedia],
    });
  } catch (error) {
    if (error.type === 'VALIDATION_FAILED') {
      result = error.res;
    }
  }

  return result;
};

const getUrls = () => {
  const urlsToValidate = {};
  Object.keys(services)
    .filter((service) => service === 'persian')
    .forEach((service) => {
      urlsToValidate[service] = [];
      Object.keys(services[service].pageTypes)
        .filter((pageType) => !pageType.startsWith('error'))
        .forEach((pageType) => {
          const paths = getPaths(service, pageType);
          const urls = paths.map((path) => `http://localhost:7080${path}`);

          urlsToValidate[service] = [urlsToValidate[service], urls].flat();
        });
    });
  return urlsToValidate;
};

const checkStructuredData = async (urls) => {
  const urlsToValidate = Object.values(urls).flat();

  return Promise.all(urlsToValidate.map((url) => validate(url)))
    .then((results) => {
      return results;
    })
    .catch((error) => console.error(error));
};

const aggregateResults = (results) => {
  console.log(JSON.stringify(results, null, 2));

  return {
    urls: results.map((result) => result.url),
    tests: results.map((result) => result.tests).flat(),
    passed: results.map((result) => result.passed).flat(),
    failed: results
      .map((result) => [...result.failed, ...result.warnings])
      .flat(),
    schemas: [...new Set(results.map((result) => result.schemas).flat())],
    structuredData: Object.assign(
      ...results.map((result) => result.structuredData),
    ),
  };
};

const printResults = (overallResult) => {
  printPassing(overallResult);
  printFailures(overallResult);
  printStatistics(overallResult);
};

const exit = (overallResult) => {
  if (overallResult.failed > 0) {
    process.exit(1);
  }
};

const run = async () => {
  const results = await checkStructuredData(getUrls());
  const overallResult = aggregateResults(results);

  printResults(overallResult);

  exit(overallResult);
};

run();
