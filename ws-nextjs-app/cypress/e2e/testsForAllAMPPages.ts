/* eslint-disable import/prefer-default-export */
import config from '../support/config/services';
import { ServiceParametersType } from '../types';

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForAllAMPPages = ({
  service,
  pageType,
}: ServiceParametersType) => {
  describe(`testsThatFollowSmokeTestConfigForAllAMPPages to run for ${service} ${pageType}`, () => {
    describe('Header Tests', () => {
      const serviceName = config[service]?.name || service;
      // limit number of tests to 2 services for navigation toggling
      const testMobileNav =
        serviceName === 'ukchina' || serviceName === 'persian';
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
    });
  });
};
