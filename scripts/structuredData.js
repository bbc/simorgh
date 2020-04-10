/* eslint-disable no-console */
const chalk = require('chalk');
const { structuredDataTest } = require('structured-data-testing-tool');
const { Google, SocialMedia } = require('structured-data-testing-tool/presets');

global.Cypress = {
  env: () => {
    return 'local';
  },
};

const getPaths = require('../cypress/support/helpers/getPaths');
const services = require('../cypress/support/config/services');

const testSummary = (test) => {
  return `${test.group ? test.group : ''} ${test.description}`;
};

const testDetails = (test) => {
  return `${test.test} = ${JSON.stringify(test.value)}`;
};

const checkPage = async (url) => {
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

expect.extend({
  hasCorrectMetadata(test) {
    const { passed: pass } = test;
    const message = `${chalk.blue(testSummary(test))}\n\t${chalk.cyan(
      testDetails(test),
    )}`;

    return {
      message: () => message,
      pass,
    };
  },
});

const checkStructuredData = () => {
  Object.keys(services).forEach((service) => {
    Object.keys(services[service].pageTypes)
      .filter((pageType) => !pageType.startsWith('error'))
      .forEach((pageType) => {
        const paths = getPaths(service, pageType);
        paths.forEach(async (path) => {
          const url = `http://localhost:7080${path}`;
          const pageTypeUrl = `${pageType} - ${url}`;

          describe(`${pageTypeUrl}`, () => {
            let result;
            let allPageResults;

            beforeEach(async () => {
              result = await checkPage(url);

              allPageResults = [
                ...result.passed,
                ...result.warnings,
                ...result.failed,
              ];
            });

            it('should have correct metadata & structured data', () => {
              expect(allPageResults).not.toBeUndefined();
              allPageResults.forEach((pageResult) => {
                expect(pageResult).hasCorrectMetadata();
              });
            });
          });
        });
      });
  });
};

checkStructuredData();
