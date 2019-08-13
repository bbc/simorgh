import config from './config/services';
import alwaysTests from '../integration/pages';

const serviceHasPageType = (service, pageType) =>
  config[service].pageTypes[pageType].path !== undefined;

const smokeTest = (service, pageType) =>
  Cypress.env('SMOKE') ? config[service].pageTypes[pageType].smoke : true;

const iterator = (pageType, tests, canonicalOnlyTests, ampOnlyTests) => {
  Object.keys(config)
    .filter(service => serviceHasPageType(service, pageType))
    .filter(service => smokeTest(service, pageType))
    .forEach(service => {
      describe(`${pageType} - ${service} - Canonical`, () => {
        before(() => {
          cy.visit(config[service].pageTypes[pageType].path, {
            failOnStatusCode: !pageType.includes('error'),
          });
        });

        if (alwaysTests) alwaysTests(service);
        if (tests) tests(service);
        if (canonicalOnlyTests) canonicalOnlyTests(service);
      });

      describe(`${pageType} - ${service} - Amp`, () => {
        before(() => {
          cy.visit(`${config[service].pageTypes[pageType].path}.amp`, {
            failOnStatusCode: !pageType.includes('error'),
          });
        });

        if (alwaysTests) alwaysTests(service, pageType);
        if (tests) tests(service);
        if (ampOnlyTests) ampOnlyTests(service);
      });
    });
};

export default iterator;
