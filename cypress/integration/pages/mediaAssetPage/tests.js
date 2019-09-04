import config from '../../../support/config/services';

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRun = ({ service, pageType }) => {
  describe(`No testsToAlwaysRun to run for ${service} ${pageType}`, () => {});
};

export const testsThatFollowSmokeTestConfig = ({ service, pageType }) => {
  describe(`Tests for ${service} ${pageType}`, () => {
    describe('MAP Body', () => {
      describe('Header', () => {
        it('should render a H1, which contains/displays a styled headline', () => {
          cy.request(
            `${config[service].pageTypes.mediaAssetPage.path}.json`,
          ).then(({ body }) => {
            const [{ text: headline }] = body.content.blocks;
            cy.get('h1').should('contain', headline);
          });
        });

        it('should have header', () => {
          cy.get('header').should('have.length', 1);
        });

        it(`should the header contains the brand of the ${service}`, () => {
          cy.get('header')
            .find('div')
            .should('have.class', '/^Banner/');
        });

        it('should have nav element with role navigation', () => {
          cy.get('header')
            .find('nav')
            .should('have.attr', 'role', 'navigation')
            .should('be.visible');
        });
      });

      describe('Main', () => {
        cy.get('main').should('have.length', 1);
      });

      describe('Footer', () => {
        cy.get('footer').should('have.length', 1);
      });
    });
  });
};

export const testsThatNeverRunDuringSmokeTesting = ({ service, pageType }) => {
  describe(`No testsToNeverSmokeTest to run for ${service} ${pageType}`, () => {});
};
