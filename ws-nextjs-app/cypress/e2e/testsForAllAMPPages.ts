/* eslint-disable import/prefer-default-export */
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

      // Two tier nav only available on select services and requires non-local data as
      // the nav configuration is fetched from the back-end API
      const testTwoTierNav =
        SERVICES_WITH_NEW_NAV.includes(service) && getAppEnv() !== 'local';

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

      // this check limits these tests to arabic and tamil services
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
