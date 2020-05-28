import appConfig from '../../../../src/server/utilities/serviceConfigs';
import envConfig from '../../../support/config/envs';
import getEmbedUrl from './helpers';

export default ({ service, pageType, variant }) => {
  describe(`testsForCanonicalOnly for ${service} ${pageType}`, () => {
    describe('Audio Player', () => {
      const { lang } = appConfig[service][variant];
      let embedUrl;
      let override;
      beforeEach(() => {
        if (Cypress.env('APP_ENV') === 'test') {
          override = '?renderer_env=live';
        } else {
          override = '';
        }
        cy.request(`${Cypress.env('currentPath')}.json${override}`).then(
          ({ body }) => {
            embedUrl = getEmbedUrl(body, lang);
          },
        );
      });

      it('should be rendered', () => {
        cy.get(`iframe[src*="${embedUrl}"]`).should('be.visible');
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
      }
    });
  });
};
