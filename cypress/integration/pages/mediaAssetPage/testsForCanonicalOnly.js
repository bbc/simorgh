import envConfig from '../../../support/config/envs';
import config from '../../../support/config/services';
import appConfig from '../../../../src/server/utilities/serviceConfigs';
import { getEmbedUrl } from './helpers';

export default ({ service, variant }) => {
  describe('Media Player', () => {
    const language = appConfig[config[service].name][variant].lang;
    let embedUrl;

    before(() => {
      cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
        embedUrl = getEmbedUrl(body, language);
      });
    });

    it('embed URL should be reachable', () => {
      cy.testResponseCodeAndType(embedUrl, 200, 'text/html');
    });
  });

  describe('Chartbeat', () => {
    if (envConfig.chartbeatEnabled) {
      it('should have a script with src value set to chartbeat source', () => {
        cy.hasScriptWithChartbeatSrc();
      });

      it('should have chartbeat config set to window object', () => {
        cy.hasGlobalChartbeatConfig();
      });
    } else {
      it('not enabled', () => {});
    }
  });
};
