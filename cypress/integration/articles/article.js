import { config } from '../../support';

Object.keys(config.services).forEach(index => {
  const serviceConfig = config.services[index];
  const service = index;

  // NB need to PREVENT not handle redirect
  // Attempt to handle redirects this doesn't work, the replace seems to do nothing but the set to null is successful
  // Fails in envs with redirects
  // if (Cypress.env('APP_ENV') !== 'local') {
  //   // Cypress.env('UK') === true &&
  //   if (service !== 'news') {
  //     // Cypress.config('baseUrl', null);
  //     const oldBaseUrl = Cypress.config('baseUrl');
  //     const newBaseUrl = oldBaseUrl.replace('.co.uk', '.com');
  //     // Cypress.config('baseUrl', newBaseUrl);
  //     Cypress.config().baseUrl = newBaseUrl;
  //   } else if (service === 'news') {
  //     // Cypress.config('baseUrl', null);
  //     const oldBaseUrl = Cypress.config('baseUrl');
  //     const newBaseUrl = oldBaseUrl.replace('.com', '.co.uk');
  //     // Cypress.config('baseUrl', newBaseUrl);
  //     Cypress.config().baseUrl = newBaseUrl;
  //   }
  // }

  describe(`Article Tests for ${service}`, () => {
    if (
      serviceConfig.pageTypes.articles !== undefined &&
      serviceConfig.pageTypes.articles.basicAsset !== undefined
    ) {
      // can refactor to use the visit below for increased speed?
      it(`should return a 200 status code and HTML file for ${service}`, () => {
        cy.testResponseCodeAndType(
          `${serviceConfig.pageTypes.articles.basicAsset}`,
          200,
          'text/html',
        );
      });

      if (serviceConfig.pageTypes.articles.featureFlags.dataEndpoint === true) {
        it(`should have an available data endpoint (200 response with a JSON file) for ${service}`, () => {
          cy.testResponseCodeAndType(
            `${serviceConfig.pageTypes.articles.basicAsset}.json`,
            200,
            'application/json',
          );
        });
      }

      // eslint-disable-next-line no-undef
      before(() => {
        cy.visit(`${serviceConfig.pageTypes.articles.basicAsset}`);
      });

      if (serviceConfig.pageTypes.articles.featureFlags.header === true) {
        it(`should render the header's BBC News branding for ${service}`, () => {
          cy.headerTestBBCNewsString();
        });

        it(`should have a visible banner for ${service}`, () => {
          cy.headerTestVisibleBanner(serviceConfig.canonical);
        });

        it(`should have aand h1 for ${service}`, () => {
          cy.headerTestHaveH1();
        });
      }

      if (serviceConfig.pageTypes.articles.featureFlags.footer === true) {
        it(`should render the footers's BBC News branding for ${service}`, () => {
          cy.footerTestBranding(serviceConfig.canonical);
        });

        it(`should have working links for ${service} in the footer`, () => {
          cy.footerTestWorkingLinks();
        });

        it(`should contain copyright text with a link in it for ${service} in the footer`, () => {
          cy.footerTestCopyrightLink();
        });
      }

      it(`should have script to fetch bundle for ${service}`, () => {
        cy.hasScriptToFetchBundle();
      });
    }
  });
});
