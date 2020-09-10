import path from 'ramda/src/path';

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

  describe('Ads', () => {
    let adsEnabled = false;

    before(() => {
      cy.getToggles(service).then(toggles => {
        adsEnabled = path(['ads', 'enabled'], toggles);
      });
    });

    if (adsEnabled) {
      cy.get('dotcom-leaderboard').should('exist');
      cy.get('dotcom-mpu').should('exist');
    } else {
      cy.get('dotcom-leaderboard').should('not.exist');
      cy.get('dotcom-mpu').should('not.exist');
    }
  });
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
