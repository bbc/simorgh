import config from './config/services';
import runCommonTests from '../integration/pages';

const serviceHasPageType = (service, pageType) =>
  config[service].pageTypes[pageType].path !== undefined;

const smokeTest = (service, pageType) =>
  Cypress.env('SMOKE') ? config[service].pageTypes[pageType].smoke : true;

const serviceConfigOverride = service => config[service].serviceOverride || null

const iterator = (pageType, runTests, runCanonicalTests, runAmpTests) => {
  
  Object.keys(config)
    .filter(service => serviceHasPageType(service, pageType))
    .filter(service => smokeTest(service, pageType))
    .forEach(service => {
      const serviceVariantConfig = serviceConfigOverride(service)
      describe(`${pageType} - ${service} - Canonical`, () => {
        before(() => {
          cy.visit(config[service].pageTypes[pageType].path, {
            failOnStatusCode: !pageType.includes('error'),
          });
        });

        runCommonTests({ service, serviceVariantConfig, pageType });
        if (runTests) runTests({ service, serviceVariantConfig,  pageType });
        if (runCanonicalTests) runCanonicalTests({ service, serviceVariantConfig, pageType });
      });

      describe(`${pageType} - ${service} - Amp`, () => {
        before(() => {
          cy.visit(`${config[service].pageTypes[pageType].path}.amp`, {
            failOnStatusCode: !pageType.includes('error'),
          });
        });

        runCommonTests({ service, serviceVariantConfig, pageType });
        if (runTests) runTests({ service, serviceVariantConfig,  pageType });
        if (runAmpTests) runAmpTests({ service, serviceVariantConfig,  pageType });
      });
    });
};

export default iterator;
