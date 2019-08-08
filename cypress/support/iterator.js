import config from './config/services';

const alwaysTests = () => {};

const serviceHasPageType = (service, pageType) =>
  config[service].pageTypes[pageType] !== undefined;

const iterator = (pageType, tests, canonicalOnlyTests, ampOnlyTests) => {
  Object.keys(config)
    .filter(service => serviceHasPageType(service, pageType))
    .forEach(service => {
      describe(`${pageType} - ${service} - Canonical`, () => {
        before(() => {
          cy.visit(config[service].pageTypes.articles);
        });

        if (alwaysTests) alwaysTests(service);
        if (tests) tests(service);
        if (canonicalOnlyTests) canonicalOnlyTests(service);
      });

      describe(`${pageType} - ${service} - Amp`, () => {
        before(() => {
          cy.visit(`${config[service].pageTypes.articles}.amp`);
        });

        if (alwaysTests) alwaysTests(service);
        if (tests) tests(service);
        if (ampOnlyTests) ampOnlyTests(service);
      });
    });
};

export default iterator;
