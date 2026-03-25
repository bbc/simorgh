import SERVICES_WITH_NEW_NAV from '#app/components/Navigation/config';
import getAppEnv from '#cypress/support/helpers/getAppEnv';
import config from '../support/config/services';
import { ServiceParametersType } from '../types';

// For testing features that may differ across services but share a common logic e.g. translated strings.
export default ({ service, pageType }: ServiceParametersType) => {
  describe(`testsThatFollowSmokeTestConfigForAllAMPPages to run for ${service} ${pageType}`, () => {
    describe('Header Tests', () => {
      const serviceName = config[service]?.name || service;
      // limit number of tests to 2 services for navigation toggling
      const testMobileNav =
        serviceName === 'ukchina' || serviceName === 'persian';

      const twoTierNavServices = {
        local: null, // Don't test two tier nav locally as the local environment can't fetch config
        test: ['arabic', 'tamil'], // Test env isn't guaranteed to have the new nav config, so only run tests for services we know have it
        live: SERVICES_WITH_NEW_NAV,
      };

      const cypressAppEnv = getAppEnv();

      const testTwoTierNav = twoTierNavServices[cypressAppEnv];

      if (testMobileNav) {
        it('should show dropdown menu and hide scrollable menu when menu button is clicked', () => {
          cy.viewport(320, 480);
          cy.get('nav')
            .find('[data-e2e="scrollable-nav"]')
            .should('be.visible');

          cy.get('nav')
            .find('[data-e2e="dropdown-nav"] ul')
            .should('not.be.visible');

          cy.get('nav button').click();

          cy.get('nav')
            .find('[data-e2e="scrollable-nav"]')
            .should('not.be.visible');

          cy.get('nav')
            .find('[data-e2e="dropdown-nav"] ul')
            .should('be.visible');
        });
      }

      if (testTwoTierNav) {
        it('should show two tier navigation on mobile', () => {
          cy.viewport(320, 480);
          cy.get('nav')
            .find('[data-e2e="scrollable-nav"]')
            .should('be.visible');

          cy.get('nav')
            .find('[data-e2e="scrollable-nav-secondary"]')
            .should('be.visible');

          cy.get('nav')
            .find('[data-e2e="dropdown-nav"] ul')
            .should('not.be.visible');

          cy.get('nav button').click({ force: true });

          cy.get('nav')
            .find('[data-e2e="dropdown-nav"] ul')
            .should('be.visible');

          cy.get('nav')
            .find('[data-e2e="scrollable-nav-secondary"]')
            .should('not.be.visible');
        });
      }
    });
  });
};
