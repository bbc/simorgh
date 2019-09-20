import envConfig from '../../support/config/envs';
import config from '../../support/config/services';

const serviceIsGNL = service => service === 'japanese';
const serviceIsWS = service => service === 'persian';
const serviceIsPS = service => service === 'news';
const serviceUsesDefault = service => service === 'scotland';

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
          it('should have an amp-analytics tag with the ati url smoke', () => {
            if (serviceIsGNL(service)) {
              cy.hasAmpAnalyticsAtiUrl(
                envConfig.atiUrl,
                23453464573456435634563456,
              );
            } else if (serviceIsWS(service)) {
              cy.hasAmpAnalyticsAtiUrl(
                envConfig.atiUrl,
                envConfig.atiAnalyticsWSBucket,
              );
            } else if (serviceIsPS(service)) {
              cy.hasAmpAnalyticsAtiUrl(envConfig.atiUrl, '');
            }
          });
        });
      } else if (serviceIsGNL(service)) {
        describe('ATI', () => {
          it('should have an amp-analytics tag with the ati url', () => {
            cy.hasAmpAnalyticsAtiUrl(
              envConfig.atiUrl,
              envConfig.atiAnalyticsGNLBucket,
            );
          });
        });
      } else if (config[service].isWorldService) {
        it('should have an amp-analytics tag with the ati url', () => {
          cy.hasAmpAnalyticsAtiUrl(
            envConfig.atiUrl,
            envConfig.atiAnalyticsWSBucket,
          );
        });
      } else if (serviceUsesDefault(service)) {
        describe('ATI', () => {
          it('should have an amp-analytics tag with the ati url', () => {
            cy.hasAmpAnalyticsAtiUrl(
              envConfig.atiUrl,
              envConfig.atiAnalyticsDefaultBucket,
            );
          });
        });
      } else {
        it('should have an amp-analytics tag with the ati url', () => {
          cy.hasAmpAnalyticsAtiUrl(envConfig.atiUrl, '');
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
