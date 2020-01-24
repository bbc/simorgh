import config from '../../../support/config/services';
import appConfig from '../../../../src/server/utilities/serviceConfigs';

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRun = ({ service, pageType }) => {
  describe(`No testsToAlwaysRun to run for ${service} ${pageType}`, () => {});
};

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfig = ({ service, pageType }) => {
  describe(`testsThatFollowSmokeTestConfig to run for ${service} ${pageType}`, () => {
    it('should render a H1, which displays the headline', () => {
      cy.request(`${config[service].pageTypes[pageType].path}.json`).then(
        ({ body }) => {
          cy.get('h1').should('contain', body.promo.headlines.headline);
        },
      );
    });

    // Expects a second timestamp only if lastPublished is 1 minute later than firstPublished.
    // This is due to a CPS asset bug, see issue simorgh#5065
    it('should render a timestamp', () => {
      cy.request(
        `${config[service].pageTypes.photoGalleryPage.path}.json`,
      ).then(({ body }) => {
        const { lastPublished, firstPublished } = body.metadata;
        const timeDifferenceMinutes =
          (lastPublished - firstPublished) / 1000 / 60;
        const minutesTolerance = 1;
        cy.get('time')
          .eq(0)
          .should('exist')
          .should('be.visible')
          .should('have.attr', 'datetime')
          .should('not.be.empty');

        if (timeDifferenceMinutes > minutesTolerance) {
          cy.get('time')
            .eq(1)
            .should(
              'contain',
              appConfig[config[service].name].default.articleTimestampPrefix,
            );
        }
      });
    });

    it('should render a description for the page, which contains/displays styled text', () => {
      cy.request(`${config[service].pageTypes[pageType].path}.json`).then(
        ({ body }) => {
          const description = body.promo.summary;
          cy.get('main p')
            .first()
            .should('contain', description);
        },
      );
    });
  });
};

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTesting = ({ service, pageType }) => {
  describe(`No testsToNeverSmokeTest to run for ${service} ${pageType}`, () => {});
};
