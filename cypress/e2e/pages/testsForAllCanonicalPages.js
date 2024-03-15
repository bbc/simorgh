/* eslint-disable import/prefer-default-export */
import envConfig from '../../support/config/envs';
import config from '../../support/config/services';
import chartbeatTests from '../../support/helpers/chartbeatTests';

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForAllCanonicalPages = ({
  service,
  pageType,
}) => {
  chartbeatTests();

  if (pageType !== 'errorPage404') {
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
  }

  const serviceName = config[service].name;
  // limit number of tests to 2 services for navigation toggling
  const testMobileNav = serviceName === 'mundo' || serviceName === 'persian';

  if (testMobileNav) {
    describe('Header Tests', () => {
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
    });
  }
};
