import envs from '../../config/envs';
import useAppToggles from '../useAppToggles';

export default () => {
  if (useAppToggles.chartbeatAnalytics.enabled && envs.chartbeatEnabled) {
    describe('Chartbeat', () => {
      it('should have a script with src value set to chartbeat source', () => {
        cy.hasScriptWithChartbeatSrc();
      });
      it('should have chartbeat config set to window object', () => {
        cy.hasGlobalChartbeatConfig();
      });
    });
  }
};
