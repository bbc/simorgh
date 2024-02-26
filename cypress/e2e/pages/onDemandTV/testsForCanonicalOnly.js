import envConfig from '../../../support/config/envs';

export default ({ service, pageType }) => {
  describe(`testsForCanonicalOnly for ${service} ${pageType}`, () => {
    describe('Chartbeat', () => {
      if (envConfig.chartbeatEnabled) {
        it('should have a script with src value set to chartbeat source', () => {
          cy.hasScriptWithChartbeatSrc();
        });
        it('should have chartbeat config set to window object', () => {
          cy.hasGlobalChartbeatConfig();
        });
      }
    });
  });
};
