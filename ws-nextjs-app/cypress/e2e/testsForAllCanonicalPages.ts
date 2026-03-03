/* eslint-disable import/prefer-default-export */
import getAppEnv from '#cypress/support/helpers/getAppEnv';
import SERVICES_WITH_NEW_NAV from '#src/app/components/Navigation/config';
import envConfig, { EnvironmentConfigType } from '../support/config/envs';
import config from '../support/config/services';
import { ServiceParametersType } from '../types';

// For testing features that may differ across services but share a common logic e.g. translated strings.
export default ({ service, pageType }: ServiceParametersType) => {
  if (pageType && pageType !== 'errorPage404') {
    describe(`Running testsForAllCanonicalPages for ${service} ${pageType}`, () => {
      if (Cypress.env('SMOKE')) {
        describe(
          'ATI',
          {
            retries: 3,
          },
          () => {
            it('should have a noscript img tag with the ati url', () => {
              cy.hasNoscriptImgAtiUrl(
                (envConfig as EnvironmentConfigType).atiUrl,
              );
            });
          },
        );
      }
    });
  }

  describe('Header Tests', () => {
    const serviceName = config[service]?.name || service;
    // limit number of tests to 2 services for navigation toggling
    const testMobileNav =
      serviceName === 'ukchina' || serviceName === 'persian';

    const testTwoTierNav =
      SERVICES_WITH_NEW_NAV.includes(service) && getAppEnv() === 'test';

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

    // this check limits these tests to arabic and tamil services on test
    if (testTwoTierNav) {
      it('should show two tier navigation on desktop on test environment', () => {
        cy.viewport(1008, 900);
        cy.get('nav').find('[data-e2e="scrollable-nav"]').should('be.visible');

        cy.get('nav')
          .find('[data-e2e="scrollable-nav-secondary"] ul')
          .should('be.visible');
      });

      it('should show two tier navigation on mobile on test environment', () => {
        cy.viewport(320, 480);
        cy.get('nav').find('[data-e2e="scrollable-nav"]').should('be.visible');

        cy.get('nav button').click();

        cy.get('nav')
          .find('[data-e2e="scrollable-nav-secondary"] ul')
          .should('be.visible');
      });
    }
  });
};
