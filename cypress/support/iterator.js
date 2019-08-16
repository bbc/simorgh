import config from './config/services';
import runCommonTests from '../integration/pages';

const serviceHasPageType = (service, pageType) =>
  config[service].pageTypes[pageType].path !== undefined;

const smokeTest = (service, pageType) =>
  Cypress.env('SMOKE') ? config[service].pageTypes[pageType].smoke : true;

const iterator = (pageType, runTests, runCanonicalTests, runAmpTests) => {
  Object.keys(config)
    .filter(service => serviceHasPageType(service, pageType))
    .filter(service => smokeTest(service, pageType))
    .forEach(service => {
      describe(`${pageType} - ${service} - Canonical`, () => {
        before(() => {
          cy.visit(config[service].pageTypes[pageType].path, {
            failOnStatusCode: !pageType.includes('error'),
            timeout: 10000,
          });
        });

        runCommonTests({ service, pageType });
        if (runTests) runTests({ service, pageType });
        if (runCanonicalTests) runCanonicalTests({ service, pageType });
      });

      describe(`${pageType} - ${service} - Amp`, () => {
        before(() => {
          cy.visit(`${config[service].pageTypes[pageType].path}.amp`, {
            failOnStatusCode: !pageType.includes('error'),
            timeout: 10000,
          });
        });

        runCommonTests({ service, pageType });
        if (runTests) runTests({ service, pageType });
        if (runAmpTests) runAmpTests({ service, pageType });
      });
    });
};

export default iterator;
