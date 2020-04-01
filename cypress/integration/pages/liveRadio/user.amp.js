import appConfig from '../../../../src/server/utilities/serviceConfigs';
import config from '../../../support/config/services';
import envConfig from '../../../support/config/envs';
import getEmbedUrl from './helper';

export default ({ service, variant, canonicalPath }) => {
  describe('Audio Player', () => {
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

  describe('Chartbeat', () => {
    if (envConfig.chartbeatEnabled) {
      it('should have chartbeat config UID', () => {
        cy.hasAmpChartbeatConfigUid();
      });
    } else {
      it('is not enabled', () => {});
    }
  });
};
