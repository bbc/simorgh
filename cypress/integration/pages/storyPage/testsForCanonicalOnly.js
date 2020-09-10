import path from 'ramda/src/path';
import config from '../../../support/config/services';

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRunForCanonicalOnly = ({ service }) => {
  describe(`Include initialisation only on Mundo on specific page`, () => {
    // This test ensures that inline scripts used in includes execute successfully and
    // progressively enhance the include. These scripts can be supressed by the browser
    // if they are rendered in the browser following clientside render tree modification;
    // our story pages should not do this. The test checks the core content has been removed
    // following progressive enhancement by the include's inline scripts.
    it('should load the eclipse VJ include successfully', () => {
      if (service === 'mundo') {
        cy.get(
          '#responsive-embed-vjamericas-176-eclipse-lookup-app-core-content',
        ).should('not.exist');
      }
    });
  });

  if (Cypress.env('APP_ENV') === 'local') {
    describe.only('Ads', () => {
      it('should be displayed based on whether ads toggle is enabled/disabled', () => {
        cy.getToggles(config[service].name).then(toggles => {
          const adsEnabled = path(['ads', 'enabled'], toggles);

          if (adsEnabled) {
            cy.visit(Cypress.env('currentPath'), {
              headers: {
                'BBC-Adverts': 'true',
              },
            });

            cy.log('Ads should be displayed because toggle is enabled');

            cy.get('[data-e2e="advertisement"]')
              .should('exist')
              .within(() => {
                cy.get('[id="dotcom-leaderboard"]').should('exist');
                cy.get('[id="dotcom-mpu"]').should('exist');
              });
          } else {
            cy.log('Ads should not be displayed because toggle is disabled');
            cy.get('[data-e2e="advertisement"]').should('not.exist');
          }
        });
      });
    });
  }
};

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForCanonicalOnly = ({
  service,
  pageType,
}) =>
  describe(`No testsThatFollowSmokeTestConfigForCanonicalOnly for ${service} ${pageType}`, () => {});

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForCanonicalOnly = ({
  service,
  pageType,
}) => {
  describe(`No testsToNeverSmokeTestForCanonicalOnly to run for ${service} ${pageType}`, () => {});
};
