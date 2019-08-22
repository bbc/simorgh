import config from './config/services';
import shouldSmokeTest from './shouldSmokeTest';
import { runCommonTests, runCommonCanonicalTests } from '../integration/pages';

const serviceHasPageType = (service, pageType) =>
  config[service].pageTypes[pageType].path !== undefined;

const iterator = (pageType, runTests, runCanonicalTests, runAmpTests) => {
  Object.keys(config)
    .filter(service => serviceHasPageType(service, pageType))
    .filter(service => shouldSmokeTest(pageType, service))
    .forEach(service => {
      describe(`${pageType} - ${service} - Canonical`, () => {
        before(() => {
          cy.visit(config[service].pageTypes[pageType].path, {
            failOnStatusCode: !pageType.includes('error'),
          });
        });

        runCommonTests({ service, pageType });
        runCommonCanonicalTests({ service, pageType });
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
