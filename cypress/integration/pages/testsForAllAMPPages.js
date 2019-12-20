import config from '../../support/config/services';
import envConfig from '../../support/config/envs';
import appConfig from '../../../src/server/utilities/serviceConfigs';
import appToggles from '../../support/helpers/useAppToggles';

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRunForAllAMPPages = ({ service, pageType }) => {
  describe(`No testsToAlwaysRunForAMPPages to run for ${service} ${pageType}`, () => {});
};

// For testing feastures that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForAllAMPPages = ({
  service,
  pageType,
}) => {
  describe(`Running testsForAllAMPPages for ${service} ${pageType}`, () => {
    if (pageType !== 'errorPage404') {
      it('should have an AMP attribute on the page', () => {
        cy.get('html').should('have.attr', 'amp');
      });

      it('should load the core AMP scripts in the head', () => {
        const ampScripts = [
          'https://cdn.ampproject.org/v0.js',
          'https://cdn.ampproject.org/v0/amp-geo-0.1.js',
          'https://cdn.ampproject.org/v0/amp-consent-0.1.js',
          'https://cdn.ampproject.org/v0/amp-analytics-0.1.js',
        ];

        ampScripts.forEach(script => {
          cy.get(`head > script[src="${script}"]`);
        });
      });

      it('should include AMP elements with JSON configuration in the body', () => {
        cy.get('body amp-geo > script[type="application/json"]');
        cy.get('body amp-consent > script[type="application/json"]');
      });

      // limiting number of tests to run for navigation toggling
      const { variant } = config[service];
      const shouldTestNav = service === 'ukchina' || service === 'persian';
      const serviceHasNavigation = appConfig[service][variant].navigation;
      const pageTypeHasNavigation =
        pageType !== 'articles' ||
        (pageType === 'articles' && appToggles.navOnArticles.enabled);

      if (shouldTestNav && serviceHasNavigation && pageTypeHasNavigation) {
        it('should have a dropdown menu that toggles on click', () => {
          cy.viewport(320, 480);
          cy.get('#scrollable-nav').should('be.visible');
          cy.get('#dropdown-menu').should('not.be.visible');

          cy.get('nav button').click();

          cy.get('#scrollable-nav').should('not.be.visible');
          cy.get('#dropdown-menu').should('be.visible');
        });
      }

      if (Cypress.env('SMOKE')) {
        describe('ATI', () => {
          it('should have an amp-analytics tag with the ati url', () => {
            cy.hasAmpAnalyticsAtiUrl(envConfig.atiUrl);
          });
        });
      }
    }
  });
};

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForAllAMPPages = ({
  service,
  pageType,
}) => {
  describe(`No testsToNeverSmokeTestForAMPPages to run for ${service} ${pageType}`, () => {});
};
