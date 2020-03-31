import envConfig from '../../../support/config/envs';

export default () =>
  it('should have correct chartbeat configuration', () => {
    if (envConfig.chartbeatEnabled) {
      it('should have chartbeat config UID', () => {
        cy.hasAmpChartbeatConfigUid();
      });
    } else {
      cy.log('Chartbeat not enabled');
    }
  });
