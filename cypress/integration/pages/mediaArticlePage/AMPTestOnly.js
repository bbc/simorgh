import appConfig from '../../../../src/server/utilities/serviceConfigs';
import {
  getBlockByType,
  getBlockData,
  getVideoEmbedUrl,
} from '../articles/helpers';

export default ({ service, pageType, variant }) => {
  describe(`AMP only test for ${service} ${pageType}`, () => {
    let articlesData;
    before(() => {
      cy.getPageData({ service, pageType: 'article', variant }).then(
        ({ body }) => {
          articlesData = body;
        },
      );
    });

    describe('Media Player: AMP', () => {
      it('Media player is rendered on page', () => {
        cy.get('[data-e2e="media-player"]').within(() => {
          cy.get('div').should('have.attr', 'data-e2e').should('not.be.empty');
        });
      });

      it('should render an iframe with a valid URL', () => {
        const media = getBlockData('video', articlesData);
        if (media && media.type === 'video') {
          const { lang } = appConfig[service][variant];
          const embedUrl = getVideoEmbedUrl(articlesData, lang, true);
          cy.get(`amp-iframe[src="${embedUrl}"]`).should('be.visible');
          cy.testResponseCodeAndTypeRetry({
            path: embedUrl,
            responseCode: 200,
            type: 'text/html',
            allowFallback: true,
          });
        }
      });
    });
  });
};
