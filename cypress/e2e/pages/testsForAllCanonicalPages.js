/* eslint-disable no-unused-expressions */
/* eslint-disable cypress/unsafe-to-chain-command */
/* eslint-disable import/prefer-default-export */
import envConfig from '../../support/config/envs';
import config from '../../support/config/services';

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForAllCanonicalPages = ({
  service,
  pageType,
}) => {
  if (pageType !== 'errorPage404') {
    describe(`Running testsForAllCanonicalPages for ${service} ${pageType}`, () => {
      if (Cypress.env('SMOKE')) {
        describe(
          'ATI',
          {
            retries: 3,
          },
          () => {
            it('should have a noscript img tag with the ati url', () => {
              cy.hasNoscriptImgAtiUrl(envConfig.atiUrl);
            });
          },
        );
      }
    });
  }

  describe('Header Tests', () => {
    const serviceName = config[service].name;
    // limit number of tests to 2 services for navigation toggling
    const testMobileNav =
      serviceName === 'ukchina' || serviceName === 'persian';

    if (testMobileNav) {
      it('should show dropdown menu and hide scrollable menu when menu button is clicked', () => {
        cy.viewport(320, 480);
        cy.get('nav').find('[data-e2e="scrollable-nav"]').should('be.visible');

        cy.get('nav')
          .find('[data-e2e="dropdown-nav"] ul')
          .should('not.be.visible');

        cy.get('nav button').click();

        cy.get('nav').find('[data-e2e="scrollable-nav"]').should('not.exist');

        cy.get('nav').find('[data-e2e="dropdown-nav"] ul').should('be.visible');
      });
    }
  });
};
