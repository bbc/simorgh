import config from '../../../support/config/services';
import appConfig from '../../../../src/server/utilities/serviceConfigs';
import { getEmbedUrl, hasMedia } from './helpers';

export default ({ service, variant, canonicalPath }) => {
  describe('Media Player', () => {
    const language = appConfig[config[service].name][variant].lang;

    it('should be rendered', () => {
      cy.request(`${canonicalPath}.json`).then(({ body: jsonData }) => {
        if (hasMedia(jsonData)) {
          const embedUrl = getEmbedUrl({ jsonData, language });
          cy.get(`iframe[src*="${embedUrl}"]`).should('be.visible');
          cy.testResponseCodeAndType(embedUrl, 200, 'text/html');
        } else {
          cy.log('No media');
        }
      });
    });
  });

  describe('Chartbeat', () => {
    it('should have a script with src value set to chartbeat source', () => {
      cy.hasScriptWithChartbeatSrc();
    });
    it('should have chartbeat config set to window object', () => {
      cy.hasGlobalChartbeatConfig();
    });
  });
};
