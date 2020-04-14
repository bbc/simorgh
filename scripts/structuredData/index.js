/* eslint-disable consistent-return */
/* eslint-disable no-console */
const fetch = require('node-fetch');
const { structuredDataTest } = require('structured-data-testing-tool');
const { Google } = require('structured-data-testing-tool/presets');
const { printTestResults } = require('structured-data-testing-tool/lib/cli');

const twitterPresets = require('./twitterPresets');
const facebookPresets = require('./facebookPresets');
const metatagPresets = require('./metatagPresets');

global.Cypress = {
  env: () => {
    return 'local';
  },
};

const getPaths = require('../../cypress/support/helpers/getPaths');
const services = require('../../cypress/support/config/services');

const getPresets = (jsonData, serviceConfig, url) => {
  return [
    twitterPresets({ jsonData, serviceConfig, url }),
    facebookPresets({ jsonData, serviceConfig, url }),
    metatagPresets({ jsonData, serviceConfig, url }),
  ];
};

const validate = async (url, serviceConfig) => {
  let result;
  const dataPath = `${url}.json`;

  const response = await fetch(dataPath);
  const jsonData = await response.json();

  const presets = getPresets(jsonData, serviceConfig, url);

  try {
    result = await structuredDataTest(url, {
      presets: [Google, ...presets],
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

const run = async () => {
  const results = await checkStructuredData(getUrls());

  const overallResult = {
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

  printTestResults(overallResult, {
    showInfo: true,
  });
};

run();
