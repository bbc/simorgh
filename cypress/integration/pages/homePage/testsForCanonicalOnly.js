import runAdsTests from '../../../support/helpers/adsTests/testsForCanonicalOnly';
import getAppEnv from '../../../support/helpers/getAppEnv';

export default ({ service }) => {
  if (getAppEnv() === 'local') {
    runAdsTests({ service });
  }

  describe(`Chartbeat analytics`, () => {
    it('should have a script with src value set to chartbeat source', () => {
      cy.hasScriptWithChartbeatSrc();
    });
    it('should have chartbeat config set to window object', () => {
      cy.hasGlobalChartbeatConfig();
    });
  });
};
