/* eslint-disable consistent-return */
/* eslint-disable no-console */
import fetch from 'node-fetch';
import twitterPresets from './twitter';
import facebookPresets from './facebook';

const chalk = require('chalk');
const { structuredDataTest } = require('structured-data-testing-tool');
const { Google, SocialMedia } = require('structured-data-testing-tool/presets');

jest.requireActual('node-fetch');

global.Cypress = {
  env: () => {
    return 'local';
  },
};

const getPaths = require('../../cypress/support/helpers/getPaths');
const services = require('../../cypress/support/config/services');
const appConfig = require('../../src/server/utilities/serviceConfigs').default;

const testSummary = (test) => {
  return `${test.group ? test.group : ''} ${
    test.description ? test.description : ''
  }`;
};

const testDetails = (test) => {
  return `${test.test} = ${JSON.stringify(test.value)}`;
};

const errorDetails = (test) => {
  const { error } = test;
  if (error) {
    return `${chalk.cyan(error.message)}\n\tExpected: ${JSON.stringify(
      error.expected,
    )}\n\tActual: ${JSON.stringify(error.found)}`;
  }
};

const getPresets = (jsonData, serviceConfig, url) => {
  return [
    twitterPresets(jsonData, serviceConfig),
    facebookPresets(jsonData, serviceConfig, url),
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
      presets: [Google, SocialMedia, ...presets],
    });
  } catch (error) {
    if (error.type === 'VALIDATION_FAILED') {
      result = error.res;
    }
  }

  return result;
};

expect.extend({
  hasCorrectMetadata(test) {
    const { passed: pass } = test;
    const passMessage = `${chalk.blue(testSummary(test))}\n\t${chalk.cyan(
      testDetails(test),
    )}`;

    const failMessage = `${chalk.blue(testSummary(test))}\n\t${chalk.red(
      errorDetails(test),
    )}`;
    return {
      message: () => (pass ? passMessage : failMessage),
      pass,
    };
  },
});

const checkStructuredData = () => {
  Object.keys(services)
    .filter((service) => service === 'indonesia')
    .forEach((service) => {
      const { name: serviceName, variant } = services[service];
      console.log(serviceName);
      const serviceConfig =
        appConfig[serviceName] && appConfig[serviceName][variant];
      // console.log(serviceConfig);
      Object.keys(services[service].pageTypes)
        .filter((pageType) => !pageType.startsWith('error'))
        // .filter((pageType) => pageType === 'article')
        .forEach((pageType) => {
          const paths = getPaths(service, pageType);
          paths.forEach((path) => {
            const url = `http://localhost:7080${path}`;
            const pageTypeUrl = `${pageType} - ${url}`;

            describe(`${pageTypeUrl}`, () => {
              let result;
              let allTests;

              beforeEach(async () => {
                result = await validate(url, serviceConfig);

                allTests = [
                  ...result.passed,
                  ...result.warnings,
                  ...result.failed,
                ];
              });

              it('should have correct metadata & structured data', () => {
                expect(allTests).not.toBeUndefined();
                allTests.forEach((test) => {
                  expect(test).hasCorrectMetadata();
                });
              });
            });
          });
        });
    });
};

checkStructuredData();
