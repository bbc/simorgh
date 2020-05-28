import appConfig from '../../../../src/server/utilities/serviceConfigs';
import envConfig from '../../../support/config/envs';
import getEmbedUrl from './helpers';

export default ({ service, pageType, variant }) => {
  describe(`testsForAMPOnly for ${service} ${pageType}`, () => {
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
        cy.get(`amp-iframe[src*="${embedUrl}"]`).should('be.visible');
      });

      it('should render an image placeholder', () => {
        cy.get(
          `amp-img[src="${envConfig.assetUrl}/images/amp_audio_placeholder.png"]`,
        ).should('exist');
      });

      it('embed URL should be reachable', () => {
        cy.testResponseCodeAndType(embedUrl, 200, 'text/html');
      });
    });
  });
};
