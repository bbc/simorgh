/* eslint-disable array-callback-return */
/* eslint-disable no-console */
const chalk = require('chalk');
const { structuredDataTest } = require('structured-data-testing-tool');
const {
  Google,
  Twitter,
  Facebook,
  SocialMedia,
} = require('structured-data-testing-tool/presets');

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

const logPassed = (url, passed) => {
  console.log(`\n${passed.length} Tests passed: ${url}`);
  passed.map((test) => {
    console.log(`${chalk.green('✓', testSummary(test))}`);
    console.log(`\t${chalk.cyan(testDetails(test))}`);
  });
};

const logFailed = (url, failed) => {
  console.log(`\n${failed.length} Tests failed: ${url}`);
  failed.map((test) => {
    console.error(`${chalk.redBright('✗', testSummary(test))}`);
    console.error(`\t${chalk.bgRed(testDetails(test))}`);
  });
};

const checkStructuredData = () => {
  const overallResults = {};
  Object.keys(services).forEach((service) => {
    Object.keys(services[service].pageTypes)
      .filter((pageType) => !pageType.startsWith('error'))
      .forEach((pageType) => {
        let result;
        const paths = getPaths(service, pageType);
        paths.forEach(async (path) => {
          const url = `http://localhost:7080${path}`;
          structuredDataTest(url, {
            // Check for compliance with Google, Twitter and Facebook recommendations
            presets: [Google, Twitter, Facebook, SocialMedia],
          })
            .then((res) => {
              result = res;
            })
            .catch((err) => {
              if (err.type === 'VALIDATION_FAILED') {
                result = err.res;
              } else {
                console.error(err);
              }
            })
            .finally(() => {
              if (result) {
                overallResults[url] = result;
                const pageTypeUrl = `${pageType} - ${url}`;

                const errorsWarnings = result.warnings.concat(result.failed);
                if (result.passed.length > 0) {
                  logPassed(pageTypeUrl, result.passed);
                }
                if (errorsWarnings.length > 0) {
                  logFailed(pageTypeUrl, errorsWarnings);
                }

                console.log(`\nSummary: ${pageTypeUrl}`);
                console.log(chalk.bgGreen(`\tPassed: ${result.passed.length}`));
                console.log(
                  chalk.bgRedBright(`\tFailed: ${errorsWarnings.length}`),
                );
                console.log(`\tSchemas: ${result.schemas.join(',')}`);
                console.log('');
              }
            });

          console.log(`Completed Path: ${url}`);
        });
        console.log(`Completed Page Type: ${pageType}`);
      });
    console.log(`Completed Service: ${service}`);
  });

  console.log(`Overall Results: ${Object.keys(overallResults).length}`);
  return overallResults;
};

const run = () => {
  const results = checkStructuredData();
  console.log('finished');
  console.log(results);
};

run();
