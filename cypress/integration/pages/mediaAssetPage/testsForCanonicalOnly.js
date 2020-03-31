import envConfig from '../../../support/config/envs';

export default () =>
  it('should have correct chartbeat configuration', () => {
    if (envConfig.chartbeatEnabled) {
      it('should have a script with src value set to chartbeat source', () => {
        cy.hasScriptWithChartbeatSrc();
      });
      it('should have chartbeat config set to window object', () => {
        cy.hasGlobalChartbeatConfig();
      });
    } else {
      cy.log('Chartbeat not enabled');
    }
  });
