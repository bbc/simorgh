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
  Object.keys(services).forEach((service) => {
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

const combineResults = (results, urls) => {
  return {
    urls: Object.values(urls).flat(),
    tests: results.map((result) => result.tests).flat(),
    passed: results.map((result) => result.passed).flat(),
    failed: results.map((result) => result.failed).flat(),
    warnings: results.map((result) => result.warnings).flat(),
    optional: results.map((result) => result.optional).flat(),
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
  const errorsWarnings = [...overallResult.failed, ...overallResult.warnings];
  if (errorsWarnings.length > 0) {
    process.exit(1);
  }
};

const run = async () => {
  const urls = getUrls();
  const results = await checkStructuredData(urls);
  const overallResult = combineResults(results, urls);

  printResults(overallResult);

  exit(overallResult);
};

run();
