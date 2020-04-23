import config from '../../../support/config/services';
import appConfig from '../../../../src/server/utilities/serviceConfigs';
import envConfig from '../../../support/config/envs';
import { getEmbedUrl, hasMedia } from './helpers';

export default ({ service, variant, canonicalPath }) => {
  describe('Media Player', () => {
    const language = appConfig[config[service].name][variant].lang;

    it('should be rendered', () => {
      cy.request(`${canonicalPath}.json`).then(({ body: jsonData }) => {
        if (hasMedia(jsonData)) {
          const embedUrl = getEmbedUrl({
            jsonData,
            language,
            isAmp: true,
          });
          cy.get(`amp-iframe[src*="${embedUrl}"]`).should('be.visible');
          cy.testResponseCodeAndType(embedUrl, 200, 'text/html');
        } else {
          cy.log('No media');
        }
      });
    });
  });

  if (envConfig.chartbeatEnabled) {
    describe('Chartbeat', () => {
      it('should have chartbeat config UID', () => {
        cy.hasAmpChartbeatConfigUid();
      });
    });
  }
};
