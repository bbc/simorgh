import config from '../config/services';
import shouldSmokeTest from './shouldSmokeTest';
import {
  testsToAlwaysRunForAllPages,
  testsForAllPages,
  testsToNeverSmokeTestForAllPageTypes,
} from '../../integration/pages/testsForAllPages';
import {
  testsToAlwaysRunForAMPPages,
  testsForAllAMPPages,
  testsToNeverSmokeTestForAMPPages,
} from '../../integration/pages/testsForAllAMPPages';
import {
  testsToAlwaysRunForCanonicalPages,
  testsForAllCanonicalPages,
  testsToNeverSmokeTestForCanonicalPages,
} from '../../integration/pages/testsForAllCanonicalPages';

const serviceHasPageType = (service, pageType) =>
  config[service].pageTypes[pageType].path !== undefined;

// This function takes all types of tests we have and runs in this series of steps with the fewest possible page visits

// Pass arguments in from each page's index.js file
const runTestsForPage = (
  pageType,
  runTestsSpecificToPageTypeToAlwaysRun,
  runTestsSpecificToPageType,
  runTestsSpecificToPageTypeToNeverSmokeTest,
  runCanonicalTests,
  runAmpTests,
) => {
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
        testsToAlwaysRunForAllPages({ service, pageType });
        testsToAlwaysRunForCanonicalPages({ service, pageType });
        if (runTestsSpecificToPageTypeToAlwaysRun) {
          runTestsSpecificToPageTypeToAlwaysRun({ service, pageType });
        }

        // This runs most tests but only on Service:PageType combinations with smoke enabled
        if (shouldSmokeTest(pageType, service)) {
          testsForAllPages({ service, pageType });
          testsForAllCanonicalPages({ service, pageType });
          if (runTestsSpecificToPageType)
            runTestsSpecificToPageType({ service, pageType });
          if (runCanonicalTests) runCanonicalTests({ service, pageType });
        }

        // This is for low priority and long running tests and ensures they're only run when not smoke testing.
        if (!Cypress.env('SMOKE')) {
          testsToNeverSmokeTestForAllPageTypes({ service, pageType });
          testsToNeverSmokeTestForCanonicalPages({ service, pageType });
          if (runTestsSpecificToPageTypeToNeverSmokeTest)
            runTestsSpecificToPageTypeToNeverSmokeTest({ service, pageType });
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
        testsToAlwaysRunForAllPages({ service, pageType });
        testsToAlwaysRunForAMPPages({ service, pageType });
        if (runTestsSpecificToPageTypeToAlwaysRun)
          runTestsSpecificToPageTypeToAlwaysRun({ service, pageType });

        // This runs most tests but only on Service:PageType combinations with smoke enabled
        if (shouldSmokeTest(pageType, service)) {
          testsForAllPages({ service, pageType });
          testsForAllAMPPages({ service, pageType });
          if (runTestsSpecificToPageType)
            runTestsSpecificToPageType({ service, pageType });
          if (runAmpTests) runAmpTests({ service, pageType });
        }

        // This is for low priority and long running tests and ensures they're only run when not smoke testing.
        if (!Cypress.env('SMOKE')) {
          testsToNeverSmokeTestForAllPageTypes({ service, pageType });
          testsToNeverSmokeTestForAMPPages({ service, pageType });
          if (runTestsSpecificToPageTypeToNeverSmokeTest)
            runTestsSpecificToPageTypeToNeverSmokeTest({ service, pageType });
        }
      });
    });
};

export default runTestsForPage;
