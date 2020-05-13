import config from '../../../support/config/services';
import appConfig from '../../../../src/server/utilities/serviceConfigs';
import { getEmbedUrl, hasMedia } from './helpers';
import appToggles from '../../../support/helpers/useAppToggles';
import envConfig from '../../../support/config/envs';

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRunForCanonicalOnly = ({ service, pageType }) => {
  describe(`No testsToAlwaysRunForCanonicalOnly to run for ${service} ${pageType}`, () => {});
};

// For testing feastures that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForCanonicalOnly = ({
  service,
  pageType,
  variant,
}) => {
  describe(`testsThatFollowSmokeTestConfigForCanonicalOnly for ${service} ${pageType}`, () => {
    describe('Media Player', () => {
      const language = appConfig[config[service].name][variant].lang;

      it('should render an iframe with a valid URL', () => {
        cy.request(`${Cypress.env('currentPath')}.json`).then(
          ({ body: jsonData }) => {
            if (hasMedia(jsonData)) {
              const embedUrl = getEmbedUrl(jsonData, language);

              cy.get(`iframe[src="${embedUrl}"]`).should('be.visible');
              cy.testResponseCodeAndType(embedUrl, 200, 'text/html');
            } else {
              cy.log(
                `No media on ${pageType} for ${Cypress.env('currentPath')}`,
              );
            }
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
export const testsThatNeverRunDuringSmokeTestingForCanonicalOnly = ({
  service,
  pageType,
}) => {
  describe(`No testsToNeverSmokeTestForCanonicalOnly to run for ${service} ${pageType}`, () => {});
};
