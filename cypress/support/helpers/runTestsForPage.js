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

const serviceHasPageType = (service, pageType) =>
  config[service].pageTypes[pageType].path !== undefined;

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
      describe(`${pageType} - ${service} - Canonical`, () => {
        before(() => {
          cy.visit(config[service].pageTypes[pageType].path, {
            failOnStatusCode: !pageType.includes('error'),
          });
        });

        // Enables overriding of the smoke test values in the config/services.js file
        testsThatAlwaysRunForAllPages({ service, pageType });
        testsThatAlwaysRunForAllCanonicalPages({ service, pageType });
        // Page specific tests
        testsThatAlwaysRunForCanonicalOnly({ service, pageType });
        testsThatAlwaysRun({ service, pageType });

        // This runs most tests but only on Service:PageType combinations with smoke enabled
        if (shouldSmokeTest(pageType, service)) {
          testsThatFollowSmokeTestConfigforAllPages({ service, pageType });
          testsThatFollowSmokeTestConfigForAllCanonicalPages({
            service,
            pageType,
          });
          // Page specific tests
          testsThatFollowSmokeTestConfig({ service, pageType });
          testsThatFollowSmokeTestConfigForCanonicalOnly({ service, pageType });
        }

        // This is for low priority and long running tests and ensures they're only run when not smoke testing.
        if (!Cypress.env('SMOKE')) {
          testsThatNeverRunDuringSmokeTestingForAllPageTypes({
            service,
            pageType,
          });
          testsThatNeverRunDuringSmokeTestingForAllCanonicalPages({
            service,
            pageType,
          });
          // Page specific tests
          testsThatNeverRunDuringSmokeTestingForCanonicalOnly({
            service,
            pageType,
          });
          testsThatNeverRunDuringSmokeTesting({ service, pageType });
        }
      });

      // Switch to AMP page URL (NB all our pages have AMP variants)
      describe(`${pageType} - ${service} - Amp`, () => {
        before(() => {
          cy.visit(`${config[service].pageTypes[pageType].path}.amp`, {
            failOnStatusCode: !pageType.includes('error'),
          });
        });

        // Enables overriding of the smoke test values in the config/services.js file
        testsThatAlwaysRunForAllPages({ service, pageType });
        testsThatAlwaysRunForAllAMPPages({ service, pageType });
        // Page specific tests
        testsThatAlwaysRunForAMPOnly({ service, pageType });
        testsThatAlwaysRun({ service, pageType });

        // This runs most tests but only on Service:PageType combinations with smoke enabled
        if (shouldSmokeTest(pageType, service)) {
          testsThatFollowSmokeTestConfigforAllPages({ service, pageType });
          testsThatFollowSmokeTestConfigForAllAMPPages({ service, pageType });
          // Page specific tests
          testsThatFollowSmokeTestConfig({ service, pageType });
          testsThatFollowSmokeTestConfigForAMPOnly({ service, pageType });
        }

        // This is for low priority and long running tests and ensures they're only run when not smoke testing.
        if (!Cypress.env('SMOKE')) {
          testsThatNeverRunDuringSmokeTestingForAllPageTypes({
            service,
            pageType,
          });
          testsThatNeverRunDuringSmokeTestingForAllAMPPages({
            service,
            pageType,
          });
          // Page specific tests
          testsThatNeverRunDuringSmokeTestingForAMPOnly({ service, pageType });
          testsThatNeverRunDuringSmokeTesting({ service, pageType });
        }
      });
    });
};

export default runTestsForPage;
