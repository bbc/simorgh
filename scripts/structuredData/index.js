/* eslint-disable consistent-return */
/* eslint-disable no-console */
import fetch from 'node-fetch';
import { Google } from 'structured-data-testing-tool/presets';
import { cyan, blue, red } from 'chalk';
import { structuredDataTest } from 'structured-data-testing-tool';

import twitterPresets from './twitterPresets';
import facebookPresets from './facebookPresets';
import metatagPresets from './metatagPresets';

import getPaths from '../../cypress/support/helpers/getPaths';
import services from '../../cypress/support/config/services';
import appConfig from '../../src/server/utilities/serviceConfigs';

global.Cypress = {
  env: () => {
    return 'local';
  },
};

const testSummary = (test) => {
  return `${test.group ? test.group : ''} ${
    test.description ? test.description : ''
  }`;
};

const testDetails = (test) => {
  return `${test.test} = ${JSON.stringify(test.value)}`;
};

const errorDetails = (test) => {
  const { error, expect } = test;
  if (error) {
    return `${cyan(error.message)}\n\tExpected: ${JSON.stringify(
      expect,
    )}\n\tActual: ${JSON.stringify(error.found)}`;
  }
};

const getPresets = (jsonData, serviceConfig, url) => {
  return [
    twitterPresets(jsonData, serviceConfig),
    facebookPresets(jsonData, serviceConfig, url),
    metatagPresets(jsonData, serviceConfig),
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
      showInfo: true,
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
    const passMessage = `${blue(testSummary(test))}\n\t${cyan(
      testDetails(test),
    )}`;

    const failMessage = `${blue(testSummary(test))}\n\t${red(
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
    // .filter((service) => service === 'indonesia')
    .forEach((service) => {
      const { name: serviceName, variant } = services[service];
      const serviceConfig =
        appConfig[serviceName] && appConfig[serviceName][variant];
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
