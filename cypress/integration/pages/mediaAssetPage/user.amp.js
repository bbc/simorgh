import envConfig from '../../../support/config/envs';
import config from '../../../support/config/services';
import appConfig from '../../../../src/server/utilities/serviceConfigs';
import { getEmbedUrl } from './helpers';

export default ({ service, variant, canonicalPath }) => {
  describe('Media Player', () => {
    it('embed URL should be reachable', () => {
      cy.request(`${canonicalPath}.json`).then(({ body: jsonData }) => {
        const language = appConfig[config[service].name][variant].lang;
        const embedUrl = getEmbedUrl({ jsonData, language, isAmp: true });

        cy.get(`amp-iframe[src="${embedUrl}"]`).then(() => {
          cy.testResponseCodeAndType(embedUrl, 200, 'text/html');
        });
      });
    });
  });

  if (envConfig.chartbeatEnabled) {
    describe('Chartbeat', () => {
      it('should have correct config UID', () => {
        cy.hasAmpChartbeatConfigUid();
      });
    });
  }
};
