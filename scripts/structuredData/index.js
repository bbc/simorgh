/* eslint-disable consistent-return */
/* eslint-disable no-console */
import fetch from 'node-fetch';
import twitterPresets from './presets';

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

const mapPresets = (jsonData, serviceConfig) => {
  return twitterPresets(jsonData, serviceConfig);
};

const getPresets = (pageType, jsonData, serviceConfig) => {
  switch (pageType) {
    case 'mediaAssetPage':
      return mapPresets(jsonData, serviceConfig);
    default:
      return null;
  }
};

const validate = async (url, pageType, serviceConfig) => {
  let result;
  const dataPath = `${url}.json`;

  const response = await fetch(dataPath);
  const jsonData = await response.json();

  const presets = getPresets(pageType, jsonData, serviceConfig);

  try {
    result = await structuredDataTest(url, {
      presets: [Google, SocialMedia, presets],
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
    .filter((service) => service === 'pidgin')
    .forEach((service) => {
      const { name: serviceName, variant } = services[service];
      const serviceConfig = appConfig[serviceName][variant];
      Object.keys(services[service].pageTypes)
        .filter((pageType) => !pageType.startsWith('error'))
        .filter((pageType) => pageType === 'mediaAssetPage')
        .forEach((pageType) => {
          const paths = getPaths(service, pageType);
          paths.forEach((path) => {
            const url = `http://localhost:7080${path}`;
            const pageTypeUrl = `${pageType} - ${url}`;

            describe(`${pageTypeUrl}`, () => {
              let result;
              let allTests;

              beforeEach(async () => {
                result = await validate(url, pageType, serviceConfig);

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
