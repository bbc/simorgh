import config from '../config/services';
import shouldSmokeTest from './shouldSmokeTest';
import { testsThatAlwaysRunForAllPages } from '../../e2e/pages/testsForAllPages';
import { testsThatFollowSmokeTestConfigForAllAMPPages } from '../../e2e/pages/testsForAllAMPPages';
import { testsThatFollowSmokeTestConfigForAllCanonicalPages } from '../../e2e/pages/testsForAllCanonicalPages';

import getPaths from './getPaths';
import serviceHasPageType from './serviceHasPageType';
import ampOnlyServices from './ampOnlyServices';
import visitPage from './visitPage';
import getAmpUrl from './getAmpUrl';
import getAppEnv from './getAppEnv';

// This function takes all types of tests we have and runs in this series of steps with the fewest possible page visits

const noOp = () => {};

// Pass arguments in from each page's index.js file
const runTestsForPage = ({
  pageType,
  testsThatAlwaysRun = noOp,
  testsThatAlwaysRunForCanonicalOnly = noOp,
  testsThatAlwaysRunForAMPOnly = noOp,
  testsThatFollowSmokeTestConfig = noOp,
  testsThatFollowSmokeTestConfigForCanonicalOnly = noOp,
  testsThatFollowSmokeTestConfigForAMPOnly = noOp,
  testsThatNeverRunDuringSmokeTesting = noOp,
  testsThatNeverRunDuringSmokeTestingForCanonicalOnly = noOp,
  testsThatNeverRunDuringSmokeTestingForAMPOnly = noOp,
}) => {
  // For each Service and Page Type in the config file it visits the path and it writes a describe saying this.

  Object.keys(config)
    .filter(service => serviceHasPageType(service, pageType))
    .forEach(service => {
      const paths = getPaths(service, pageType);

      paths.forEach(currentPath => {
        describe(`${pageType} - ${currentPath} - Canonical`, () => {
          before(() => {
            Cypress.env('currentPath', currentPath);

            const optimizelyKey =
              Cypress.env('APP_ENV') === 'live'
                ? '4Rje1JY7YY1FhaiHJ88Zi'
                : 'LptPKDnHyAFu9V12s5xCz';

            if (pageType === 'articles') {
              cy.intercept(
                {
                  method: 'GET',
                  pathname: `/datafiles/${optimizelyKey}.json`,
                },
                { statusCode: 404 },
              );
            }
            if (pageType === 'storyPage') {
              cy.intercept(
                {
                  method: 'GET',
                  pathname: `/datafiles/${optimizelyKey}.json`,
                },
                { foo: '123' },
              );
            }

            if (!(getAppEnv() === 'local' && pageType === 'mediaAssetPage')) {
              visitPage(currentPath, pageType);
            }
          });

          /* MAP tests on local are timing out when running on localhost in production mode,
           * due to CORS / CSP errors when loading the media loader scripts
           *
           * For this reason, we will no longer run MAP canonical tests on local environment
           *
           * These tests will run on all other environments:
           * Scheduled E2Es: Test / Live environment, when smoke: false
           * Deployment Pipeline: Test / Live environment, when smoke: true
           */
          if (getAppEnv === 'local' && pageType === 'mediaAssetPage') return;

          const testArgs = {
            service,
            pageType,
            variant: config[service].variant,
          };

          if (!ampOnlyServices.includes(service)) {
            // Enables overriding of the smoke test values in the config/settings.js file
            testsThatAlwaysRunForAllPages(testArgs);

            // Page specific tests
            testsThatAlwaysRunForCanonicalOnly(testArgs);
            testsThatAlwaysRun(testArgs);

            // This runs most tests but only on Service:PageType combinations with smoke enabled
            if (shouldSmokeTest(pageType, service)) {
              testsThatFollowSmokeTestConfigForAllCanonicalPages(testArgs);
              // Page specific tests
              testsThatFollowSmokeTestConfig(testArgs);
              testsThatFollowSmokeTestConfigForCanonicalOnly(testArgs);
            }

            // This is for low priority and long running tests and ensures they're only run when not smoke testing.
            if (!Cypress.env('SMOKE')) {
              // Page specific tests
              testsThatNeverRunDuringSmokeTestingForCanonicalOnly(testArgs);
              testsThatNeverRunDuringSmokeTesting(testArgs);
            }
          }
        });

        // Switch to AMP page URL (NB all our pages have AMP variants)
        describe(`${pageType} - ${currentPath} - AMP`, () => {
          before(() => {
            Cypress.env('currentPath', currentPath);

            visitPage(getAmpUrl(currentPath), pageType);
          });

          const testArgs = {
            service,
            pageType,
            variant: config[service].variant,
            isAmp: true,
          };

          // Enables overriding of the smoke test values in the config/settings.js file
          testsThatAlwaysRunForAllPages(testArgs);
          // Page specific tests
          testsThatAlwaysRunForAMPOnly(testArgs);
          testsThatAlwaysRun(testArgs);

          // This runs most tests but only on Service:PageType combinations with smoke enabled
          if (shouldSmokeTest(pageType, service)) {
            testsThatFollowSmokeTestConfigForAllAMPPages(testArgs);
            // Page specific tests
            testsThatFollowSmokeTestConfig(testArgs);
            testsThatFollowSmokeTestConfigForAMPOnly(testArgs);
          }

          // This is for low priority and long running tests and ensures they're only run when not smoke testing.
          if (!Cypress.env('SMOKE')) {
            // Page specific tests
            testsThatNeverRunDuringSmokeTestingForAMPOnly(testArgs);
            testsThatNeverRunDuringSmokeTesting(testArgs);
          }
        });
      });
    });
};

export default runTestsForPage;
