import envConfig from '../../support/config/envs';

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

      if (Cypress.env('SMOKE')) {
        describe('ATI', () => {
          it('should have an amp-analytics tag with the ati url', () => {
            cy.hasAmpAnalyticsAtiUrl(envConfig.atiUrl);
          });
        });
      }
    }
    if (['storyPage', 'photoGalleryPage'].includes(pageType)) {
      describe('AMP Status', () => {
        it('should return a 200 response', () => {
          cy.testResponseCodeAndType(
            `${Cypress.env('currentPath')}.amp`,
            200,
            'text/html',
          );
        });
      });
      it('should render at least one amp image', () => {
        cy.get('figure')
          .first()
          .find('amp-img')
          .should('be.visible');
      });
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
