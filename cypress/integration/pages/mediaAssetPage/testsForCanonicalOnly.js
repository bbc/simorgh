import config from '../../../support/config/services';
import appConfig from '../../../../src/server/utilities/serviceConfigs';
import { getEmbedUrl } from './helpers';
import appToggles from '../../../support/helpers/useAppToggles';
import envConfig from '../../../support/config/envs';

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRunForCanonicalOnly = () => {};

// For testing feastures that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForCanonicalOnly = ({
  service,
  pageType,
  variant,
}) => {
  describe(`testsThatFollowSmokeTestConfigForCanonicalOnly for ${service} ${pageType}`, () => {
    describe('Media Player', () => {
      const language = appConfig[config[service].name][variant].lang;

      it('should be rendered', () => {
        cy.request(`${Cypress.env('currentPath')}.json`).then(
          ({ body: jsonData }) => {
            const embedUrl = getEmbedUrl(jsonData, language);
            cy.get(`iframe[src="${embedUrl}"]`).should('be.visible');
            cy.testResponseCodeAndType(embedUrl, 200, 'text/html');

            // Ensure media player is ready
            cy.get('iframe').then($iframe => {
              cy.wrap($iframe.prop('contentWindow'), {
                timeout: 30000,
              })
                .its('embeddedMedia.playerInstances.mediaPlayer.ready')
                .should('eq', true);
            });
          },
        );
      });
    });

    if (appToggles.chartbeatAnalytics.enabled && envConfig.chartbeatEnabled) {
      describe('Chartbeat', () => {
        it('should have a script with correct src', () => {
          cy.hasScriptWithChartbeatSrc();
        });
        it('should have correct config', () => {
          cy.hasGlobalChartbeatConfig();
        });
      });
    }
  });
};

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForCanonicalOnly = () => {};
