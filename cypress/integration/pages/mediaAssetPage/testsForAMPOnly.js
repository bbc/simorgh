import envConfig from '../../../support/config/envs';

export default () => {
  describe('Chartbeat', () => {
    if (envConfig.chartbeatEnabled) {
      it('should have correct config UID', () => {
        cy.hasAmpChartbeatConfigUid();
      });
    } else {
      it('Chartbeat not enabled', () => {});
    }
  });
};
