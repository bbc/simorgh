import config from '../../../support/config/services';
import appConfig from '../../../../src/server/utilities/serviceConfigs';
import envConfig from '../../../support/config/envs';
import { getEmbedUrl, hasMedia } from './helpers';

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRunForAMPOnly = ({ service, pageType }) => {
  describe(`No testsToAlwaysRunForAMPOnly to run for ${service} ${pageType}`, () => {});
};

// For testing feastures that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForAMPOnly = ({
  service,
  pageType,
  variant,
}) => {
  describe(`testsThatFollowSmokeTestConfigForAMPOnly for ${service} ${pageType}`, () => {
    describe('Media Player', () => {
      const language = appConfig[config[service].name][variant].lang;

      it('should be rendered', () => {
        cy.request(`${Cypress.env('currentPath')}.json`).then(
          ({ body: jsonData }) => {
            if (hasMedia(jsonData)) {
              const embedUrl = getEmbedUrl(jsonData, language, true);

              cy.get(`amp-iframe[src*="${embedUrl}"]`).should('be.visible');
              cy.testResponseCodeAndType(embedUrl, 200, 'text/html');

              // Ensure media player is ready
              cy.get('iframe').then($iframe => {
                cy.wrap($iframe.prop('contentWindow'), {
                  timeout: 30000,
                })
                  .its('embeddedMedia.playerInstances.mediaPlayer.ready')
                  .should('eq', true);
              });
            } else {
              cy.log(`No media on ${pageType} for ${service}`);
            }
          },
        );
      });
    });

    describe('Chartbeat', () => {
      if (envConfig.chartbeatEnabled) {
        it('should have chartbeat config UID', () => {
          cy.hasAmpChartbeatConfigUid();
        });
      }
    });
  });
};

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForAMPOnly = ({
  service,
  pageType,
}) => {
  describe(`No testsToNeverSmokeTestForAMPOnly to run for ${service} ${pageType}`, () => {});
};
