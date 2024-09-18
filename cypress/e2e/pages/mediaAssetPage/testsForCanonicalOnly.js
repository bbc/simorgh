/* eslint-disable import/prefer-default-export */
import appToggles from '../../../support/helpers/useAppToggles';
import envConfig from '../../../support/config/envs';

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForCanonicalOnly = ({
  service,
  pageType,
}) => {
  describe(`testsThatFollowSmokeTestConfigForCanonicalOnly for ${service} ${pageType}`, () => {
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
