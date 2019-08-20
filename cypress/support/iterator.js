import path from 'ramda/src/path';
import config from './config/services';
import runCommonTests from '../integration/pages';
import serviceHasPageType from './serviceHasPageType';

const smokeTest = pageType => service =>
  Cypress.env('SMOKE')
    ? path([service, 'pageTypes', pageType, 'smoke'], config)
    : true;

const iterator = (pageType, runTests, runCanonicalTests, runAmpTests) => {
  Object.keys(config)
    .filter(serviceHasPageType(pageType))
    .filter(smokeTest(pageType))
    .forEach(service => {
      describe(`${pageType} - ${service} - Canonical`, () => {
        before(() => {
          cy.visit(config[service].pageTypes[pageType].path, {
            failOnStatusCode: !pageType.includes('error'),
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
          });
        });

        runCommonTests({ service, pageType });
        if (runTests) runTests({ service, pageType });
        if (runAmpTests) runAmpTests({ service, pageType });
      });
    });
};

export default iterator;
