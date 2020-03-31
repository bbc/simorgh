import envConfig from '../../../support/config/envs';

export default () => {
  describe('Chartbeat', () => {
    if (envConfig.chartbeatEnabled) {
      it('should have a script with src value set to chartbeat source', () => {
        cy.hasScriptWithChartbeatSrc();
      });

      it('should have chartbeat config set to window object', () => {
        cy.hasGlobalChartbeatConfig();
      });
    } else {
      it('Chartbeat not enabled', () => {});
    }
  });
};
