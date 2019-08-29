import config from '../../../support/config/services';
import appConfig from '../../../../src/app/lib/config/services';

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRun = ({ service, pageType }) => {
  describe(`No testsToAlwaysRun to run for ${service} ${pageType}`, () => {});
};

// For testing feastures that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfig = ({ service, pageType }) =>
  describe(`Tests for ${service} ${pageType}`, () => {
    describe(`${service} Test we get a 404`, () => {
      it('should return a 404 error code', () => {
        cy.testResponseCodeAndType(
          config[service].pageTypes.errorPage404.path,
          404,
          'text/html',
        );
      });
    });

    describe(`${service} Test we get a 404`, () => {
      it('should return a 404 error code', () => {
        cy.testResponseCodeAndType(
          config[service].pageTypes.errorPage404.path,
          404,
          'text/html',
        );
      });
    });

    describe(`${service} Article Error Page Tests`, () => {
      before(() => {
        cy.visit(config[service].pageTypes.errorPage404.path, {
          failOnStatusCode: false,
        });
      });

      it(`should display a ${appConfig[service].translations.error[404].statusCode} error message on screen`, () => {
        cy.get('h1 span').should(
          'contain',
          `${appConfig[service].translations.error[404].statusCode}`,
        );
        cy.get('h1').should(
          'contain',
          `${appConfig[service].translations.error[404].title}`,
        );
      });

      it('should have an inline link on the page that is linked to the home page', () => {
        cy.get('main p')
          .eq(1)
          .within(() => {
            cy.get('a').should(
              'have.attr',
              'href',
              `${appConfig[service].translations.error[404].callToActionLinkUrl}`,
            );
          });
      });

      it('should have correct title & description metadata', () => {
        /* Note that description & title tests for all other page types are in /pages/testsForAllPages.js */
        const description = appConfig[service].translations.error[404].title;
        const { title } = appConfig[service].translations.error[404];
        const pageTitle = `${title} - ${appConfig[service].brandName}`;

        cy.get('head').within(() => {
          cy.title().should('eq', pageTitle);
          cy.get('meta[name="og:description"]').should(
            'have.attr',
            'content',
            description,
          );
          cy.get('meta[name="og:title"]').should(
            'have.attr',
            'content',
            pageTitle,
          );
          cy.get('meta[name="twitter:description"]').should(
            'have.attr',
            'content',
            description,
          );
          cy.get('meta[name="twitter:title"]').should(
            'have.attr',
            'content',
            pageTitle,
          );
        });
      });
    });
  });

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTesting = ({ service, pageType }) => {
  describe(`No testsToNeverSmokeTest to run for ${service} ${pageType}`, () => {});
};
