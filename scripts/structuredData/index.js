/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const { green } = require('chalk');
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
    } else {
      console.error(error);
      process.exit(1);
    }
  }
  result.url = url;
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

const printResults = (results) => {
  const showInfo = process.argv[2] && process.argv[2] === '-i';

  results.forEach((result) => {
    console.log(`\n${result.url}`);

    if (showInfo) {
      printPassing(result.passed);
    } else {
      console.log(green(`${result.passed.length} tests passed`));
    }

    printFailures(result.failed);
  });

  printStatistics(results);
};

const exit = (results) => {
  const totalFailed = results.map((result) => result.failed).flat();

  if (totalFailed.length > 0) {
    console.error('Tests Failed');
    process.exit(1);
  }
};

const run = async () => {
  const results = await checkStructuredData(getUrls());

  printResults(results);

  exit(results);
};

run();
