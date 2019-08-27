import config from '../../../support/config/services';
import appConfig from '../../../../src/app/lib/config/services';

// For testing important features that differ between services, e.g. Timestamps.
// Inline conditional logic limiting tests to only those service/s which are different are encouraged.
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

      it('should have a relevant error title in the head', () => {
        cy.title().should(
          'eq',
          `${appConfig[service].translations.error[404].title} - ${appConfig[service].brandName}`,
        );
      });
    });
  });

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTesting = ({ service, pageType }) => {
  describe(`No testsToNeverSmokeTest to run for ${service} ${pageType}`, () => {});
};
