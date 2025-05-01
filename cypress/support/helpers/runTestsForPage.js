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
import getLiteUrl from './getLiteUrl';
import getOptimizelyKey from './getOptimizelyKey';

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
  testsForLiteOnly = noOp,
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
            if (pageType === 'storyPage') {
              cy.intercept(
                {
                  method: 'GET',
                  pathname: `/datafiles/${getOptimizelyKey()}.json`,
                },
                { foo: '123' },
              );
            }

            visitPage(currentPath, pageType);
          });

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

        // Switch to AMP page URL (NB only some of our pages have AMP variants)
        describe(`${pageType} - ${currentPath} - AMP`, () => {
          // TC2 MAPs are not loading the media player which causes the tests to fail when the page is visited, this is accepted behaviour
          // The substring '/20' is common to all the TC2 MAPs test URLs in the settings and we will not be adding more
          if (!currentPath.includes('/20')) {
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
          }
        });

        // Switch to Lite page URL (NB only some of our pages have AMP variants)
        describe(`${pageType} - ${currentPath} - Lite`, () => {
          // TC2 MAPs are not loading the media player which causes the tests to fail when the page is visited, this is accepted behaviour
          // The substring '/20' is common to all the TC2 MAPs test URLs in the settings and we will not be adding more
          if (!currentPath.includes('/20')) {
            before(() => {
              Cypress.env('currentPath', currentPath);

              visitPage(getLiteUrl(currentPath), pageType);
            });

            const testArgs = {
              service,
              pageType,
              variant: config[service].variant,
              isAmp: true,
            };

            testsForLiteOnly(testArgs);
          }
        });
      });
    });
};

export default runTestsForPage;
