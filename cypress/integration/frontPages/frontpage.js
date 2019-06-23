import { config } from '../../support';

Object.keys(config.services).forEach(index => {
  const serviceConfig = config.services[index];
  const service = index;

  describe(`FrontPage Tests for ${service}`, () => {
    if (serviceConfig.pageTypes.frontPage !== undefined) {
      // can refactor to use the visit below for increased speed?
      it(`should return a 200 status code and HTML file for ${service}`, () => {
        cy.testResponseCodeAndType(
          `${serviceConfig.pageTypes.frontPage.path}`,
          200,
          'text/html',
        );
      });

      if (
        serviceConfig.pageTypes.frontPage.featureFlags.dataEndpoint === true
      ) {
        it(`should have an available data endpoint (200 response with a JSON file) for ${service}`, () => {
          cy.testResponseCodeAndType(
            `${serviceConfig.pageTypes.frontPage.path}.json`,
            200,
            'application/json',
          );
        });
      }

      // eslint-disable-next-line no-undef
      before(() => {
        cy.visit(`${serviceConfig.pageTypes.frontPage.path}`);
      });

      if (serviceConfig.pageTypes.frontPage.featureFlags.header === true) {
        it(`should render the header's BBC News branding for ${service}`, () => {
          cy.headerTestBBCNewsString();
        });

        it(`should have a visible banner for ${service}`, () => {
          cy.headerTestVisibleBanner(serviceConfig.canonical);
        });

        it(`should have and h1 for ${service}`, () => {
          cy.headerTestHaveH1();
        });
      }

      if (serviceConfig.pageTypes.frontPage.featureFlags.footer === true) {
        it(`should render the footers's BBC News branding for ${service}`, () => {
          cy.footerTestBranding(serviceConfig.canonical);
        });

        it(`should have working links for ${service} in the footer`, () => {
          cy.footerTestWorkingLinks(); // NB the values inside this are hardcoded to /news values.
        });

        it(`should contain copyright text with a link in it for ${service} in the footer`, () => {
          cy.footerTestCopyrightLink();
        });
      }

      it(`should be labelled by a visible section label for ${service}`, () => {
        cy.hasVisibleSectionLabel();
      });

      it(`should contain at least one story promo for ${service}`, () => {
        cy.hasOneOrMoreStoryPromos();
      });

      it(`should have script to fetch bundle for ${service}`, () => {
        cy.hasScriptToFetchBundle();
      });
    }
  });
});
