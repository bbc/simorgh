import config from '../../../support/config/services';
import envConfig from '../../../support/config/envs';

export const testsToAlwaysRunForCanonicalOnly = () => {
  describe(`No testsToAlwaysRunForCanonicalOnly to run`, () => {});
};

export const testsForCanonicalOnly = ({ service }) =>
  describe('Canonical Tests', () => {
    // will be addressed by https://github.com/bbc/simorgh/issues/3324
    describe('ATI', () => {
      it.skip('should have a noscript tag with an 1px image with the ati url', () => {
        cy.hasNoscriptImgAtiUrl(
          envConfig.atiUrl,
          config[service].isWorldService ? envConfig.atiAnalyticsWSBucket : '',
        );
      });
    });

    // TODO Chartbeat not yet implemented
    describe('Chartbeat', () => {
      if (envConfig.chartbeatEnabled) {
        it.skip('should have a script with src value set to chartbeat source', () => {
          cy.hasScriptWithChartbeatSrc();
        });
        it.skip('should have chartbeat config set to window object', () => {
          cy.hasGlobalChartbeatConfig();
        });
      }
    });
  });

export const testsToNeverSmokeTestForCanonicalOnly = () => {
  describe(`No testsToNeverSmokeTestForCanonicalOnly to run`, () => {});
};
