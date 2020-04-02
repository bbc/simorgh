import appConfig from '../../../../src/server/utilities/serviceConfigs';
import config from '../../../support/config/services';
import envConfig from '../../../support/config/envs';
import getEmbedUrl from './helper';

export default ({ service, variant, canonicalPath }) => {
  describe('Audio Player', () => {
    it('embed URL should be reachable', () => {
      cy.request(`${canonicalPath}.json`).then(({ body: jsonData }) => {
        const language = appConfig[config[service].name][variant].lang;
        const embedUrl = getEmbedUrl({ jsonData, language });

        cy.get(`iframe[src="${embedUrl}"]`).then(() => {
          cy.testResponseCodeAndType(embedUrl, 200, 'text/html');
        });
      });
    });
  });

  if (envConfig.chartbeatEnabled) {
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
