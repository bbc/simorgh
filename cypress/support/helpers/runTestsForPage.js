import config from '../config/services';
import shouldSmokeTest from './shouldSmokeTest';
import {
  testsThatAlwaysRunForAllPages,
  testsThatFollowSmokeTestConfigforAllPages,
  testsThatNeverRunDuringSmokeTestingForAllPageTypes,
} from '../../integration/pages/testsForAllPages';
import {
  testsThatAlwaysRunForAllAMPPages,
  testsThatFollowSmokeTestConfigForAllAMPPages,
  testsThatNeverRunDuringSmokeTestingForAllAMPPages,
} from '../../integration/pages/testsForAllAMPPages';
import {
  testsThatAlwaysRunForAllCanonicalPages,
  testsThatFollowSmokeTestConfigForAllCanonicalPages,
  testsThatNeverRunDuringSmokeTestingForAllCanonicalPages,
} from '../../integration/pages/testsForAllCanonicalPages';

import getPaths from './getPaths';
import serviceHasPageType from './serviceHasPageType';

const visitPage = (path, pageType) => {
  const expectedContentType = 'text/html';
  const isErrorPage = pageType.includes('error');
  const expectedStatus = isErrorPage ? 404 : 200;
  const failOnStatusCode = !isErrorPage;

  cy.testResponseCodeAndType(path, expectedStatus, expectedContentType);
  cy.visit(path, {
    failOnStatusCode,
  });
};

// This function takes all types of tests we have and runs in this series of steps with the fewest possible page visits

// Pass arguments in from each page's index.js file
const runTestsForPage = ({
  pageType,
  testsThatAlwaysRun,
  testsThatAlwaysRunForCanonicalOnly,
  testsThatAlwaysRunForAMPOnly,
  testsThatFollowSmokeTestConfig,
  testsThatFollowSmokeTestConfigForCanonicalOnly,
  testsThatFollowSmokeTestConfigForAMPOnly,
  testsThatNeverRunDuringSmokeTesting,
  testsThatNeverRunDuringSmokeTestingForCanonicalOnly,
  testsThatNeverRunDuringSmokeTestingForAMPOnly,
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
            visitPage(currentPath, pageType);
          });

          const testArgs = {
            service,
            pageType,
            variant: config[service].variant,
          };

          // Enables overriding of the smoke test values in the config/settings.js file
          testsThatAlwaysRunForAllPages(testArgs);
          testsThatAlwaysRunForAllCanonicalPages(testArgs);
          // Page specific tests
          testsThatAlwaysRunForCanonicalOnly(testArgs);
          testsThatAlwaysRun(testArgs);

          // This runs most tests but only on Service:PageType combinations with smoke enabled
          if (shouldSmokeTest(pageType, service)) {
            testsThatFollowSmokeTestConfigforAllPages(testArgs);
            testsThatFollowSmokeTestConfigForAllCanonicalPages(testArgs);
            // Page specific tests
            testsThatFollowSmokeTestConfig(testArgs);
            testsThatFollowSmokeTestConfigForCanonicalOnly(testArgs);
          }

          // This is for low priority and long running tests and ensures they're only run when not smoke testing.
          if (!Cypress.env('SMOKE')) {
            testsThatNeverRunDuringSmokeTestingForAllPageTypes(testArgs);
            testsThatNeverRunDuringSmokeTestingForAllCanonicalPages(testArgs);
            // Page specific tests
            testsThatNeverRunDuringSmokeTestingForCanonicalOnly(testArgs);
            testsThatNeverRunDuringSmokeTesting(testArgs);
          }
        });

        // Switch to AMP page URL (NB all our pages have AMP variants)
        describe(`${pageType} - ${currentPath} - AMP`, () => {
          before(() => {
            Cypress.env('currentPath', currentPath);
            visitPage(`${currentPath}.amp`, pageType);
          });

          const testArgs = {
            service,
            pageType,
            variant: config[service].variant,
          };

          // Enables overriding of the smoke test values in the config/settings.js file
          testsThatAlwaysRunForAllPages(testArgs);
          testsThatAlwaysRunForAllAMPPages(testArgs);
          // Page specific tests
          testsThatAlwaysRunForAMPOnly(testArgs);
          testsThatAlwaysRun(testArgs);

          // This runs most tests but only on Service:PageType combinations with smoke enabled
          if (shouldSmokeTest(pageType, service)) {
            testsThatFollowSmokeTestConfigforAllPages(testArgs);
            testsThatFollowSmokeTestConfigForAllAMPPages(testArgs);
            // Page specific tests
            testsThatFollowSmokeTestConfig(testArgs);
            testsThatFollowSmokeTestConfigForAMPOnly(testArgs);
          }

          // This is for low priority and long running tests and ensures they're only run when not smoke testing.
          if (!Cypress.env('SMOKE')) {
            testsThatNeverRunDuringSmokeTestingForAllPageTypes(testArgs);
            testsThatNeverRunDuringSmokeTestingForAllAMPPages(testArgs);
            // Page specific tests
            testsThatNeverRunDuringSmokeTestingForAMPOnly(testArgs);
            testsThatNeverRunDuringSmokeTesting(testArgs);
          }
        });
      });
    });
};

export default runTestsForPage;
