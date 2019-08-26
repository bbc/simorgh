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
const runTestsForPage = testsForPage => {
  // For each Service and Page Type in the config file it visits the path and it writes a describe saying this.
  Object.keys(config)
    .filter(service => serviceHasPageType(service, testsForPage.pageType))
    .forEach(service => {
      describe(`${testsForPage.pageType} - ${service} - Canonical`, () => {
        before(() => {
          cy.visit(config[service].pageTypes[testsForPage.pageType].path, {
            failOnStatusCode: !testsForPage.pageType.includes('error'),
          });
        });

        // Enables overriding of the smoke test values in the config/services.js file
        testsToAlwaysRunForAllPages(service, testsForPage.pageType);
        testsToAlwaysRunForCanonicalPages(service, testsForPage.pageType);
        testsForPage.runCanonicalTestsSpecificToPageTypeToAlwaysRun(
          service,
          testsForPage.pageType,
        );
        testsForPage.runTestsSpecificToPageTypeToAlwaysRun(
          service,
          testsForPage.pageType,
        );

        // This runs most tests but only on Service:PageType combinations with smoke enabled
        if (shouldSmokeTest(testsForPage.pageType, service)) {
          testsForAllPages(service, testsForPage.pageType);
          testsForAllCanonicalPages(service, testsForPage.pageType);
          testsForPage.runTestsSpecificToPageType(
            service,
            testsForPage.pageType,
          );
          testsForPage.runCanonicalTestsSpecificToPageType(
            service,
            testsForPage.pageType,
          );
        }

        // This is for low priority and long running tests and ensures they're only run when not smoke testing.
        if (!Cypress.env('SMOKE')) {
          testsToNeverSmokeTestForAllPageTypes(service, testsForPage.pageType);
          testsToNeverSmokeTestForCanonicalPages(
            service,
            testsForPage.pageType,
          );
          testsForPage.runCanonicalTestsSpecificToPageTypeToNeverSmokeTest(
            service,
            testsForPage.pageType,
          );
          testsForPage.runTestsSpecificToPageTypeToNeverSmokeTest(
            service,
            testsForPage.pageType,
          );
        }
      });

      // Switch to AMP page URL (NB all our pages have AMP variants)
      describe(`${testsForPage.pageType} - ${service} - Amp`, () => {
        before(() => {
          cy.visit(
            `${config[service].pageTypes[testsForPage.pageType].path}.amp`,
            {
              failOnStatusCode: !testsForPage.pageType.includes('error'),
            },
          );
        });

        // Enables overriding of the smoke test values in the config/services.js file
        testsToAlwaysRunForAllPages(service, testsForPage.pageType);
        testsToAlwaysRunForAMPPages(service, testsForPage.pageType);
        testsForPage.runAMPTestsSpecificToPageTypeToAlwaysRun(
          service,
          testsForPage.pageType,
        );
        testsForPage.runTestsSpecificToPageTypeToAlwaysRun(
          service,
          testsForPage.pageType,
        );

        // This runs most tests but only on Service:PageType combinations with smoke enabled
        if (shouldSmokeTest(testsForPage.pageType, service)) {
          testsForAllPages(service, testsForPage.pageType);
          testsForAllAMPPages(service, testsForPage.pageType);
          testsForPage.runTestsSpecificToPageType(
            service,
            testsForPage.pageType,
          );
          testsForPage.runAmpTestsSpecificToPageType(
            service,
            testsForPage.pageType,
          );
        }

        // This is for low priority and long running tests and ensures they're only run when not smoke testing.
        if (!Cypress.env('SMOKE')) {
          testsToNeverSmokeTestForAllPageTypes(service, testsForPage.pageType);
          testsToNeverSmokeTestForAMPPages(service, testsForPage.pageType);
          testsForPage.runAmpTestsSpecificToPageTypeToNeverSmokeTest(
            service,
            testsForPage.pageType,
          );
          testsForPage.runTestsSpecificToPageTypeToNeverSmokeTest(
            service,
            testsForPage.pageType,
          );
        }
      });
    });
};

export default runTestsForPage;
