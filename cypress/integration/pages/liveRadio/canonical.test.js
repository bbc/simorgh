// import { BBC_BLOCKS } from '@bbc/psammead-assets/svgs';
import config from '../../../support/config/services';
import envConfig from '../../../support/config/envs';

export default ({ service }) => {
  describe('Tests', () => {
    // will be addressed by https://github.com/bbc/simorgh/pull/2971
    xdescribe('ATI', () => {
      it('should have a noscript tag with an 1px image with the ati url', () => {
        cy.hasNoscriptImgAtiUrl(
          envConfig.atiUrl,
          config[service].isWorldService ? envConfig.atiAnalyticsWSBucket : '',
        );
      });
    });

    // TODO Chartbeat not yet implemented
    xdescribe('Chartbeat', () => {
      if (envConfig.chartbeatEnabled) {
        it('should have a script with src value set to chartbeat source', () => {
          cy.hasScriptWithChartbeatSrc();
        });
        it('should have chartbeat config set to window object', () => {
          cy.hasGlobalChartbeatConfig();
        });
      }
    });

    describe('Scripts', () => {
      it('should only have expected bundle script tags', () => {
        cy.hasExpectedJsBundles(envConfig.assetOrigin, service);
      });

      it('should have 1 bundle for its service', () => {
        cy.hasOneServiceBundle(service);
      });
    });
  });
};
