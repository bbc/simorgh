import appConfig from '../../../../src/server/utilities/serviceConfigs';
import envConfig from '../../../support/config/envs';
import { getEmbedUrl, isExpired, dataEndpointOverride } from './utilities';

export default ({ service, pageType, variant }) => {
  describe(`testsForAMPOnly for ${service} ${pageType}`, () => {
    describe('Audio Player', () => {
      const { lang: language, service: serviceName } = appConfig[service][
        variant
      ];

      it('should render an iframe with a valid URL', () => {
        cy.request(
          `${Cypress.env('currentPath')}.json${dataEndpointOverride()}`,
        ).then(({ body: jsonData }) => {
          const embedUrl = getEmbedUrl({
            jsonData,
            service: serviceName,
            language,
          });
          const isExpiredEpisode = isExpired(jsonData);

          if (!isExpiredEpisode) {
            cy.get(`amp-iframe[src*="${embedUrl}"]`).should('be.visible');
            cy.testResponseCodeAndType(embedUrl, 200, 'text/html');
          } else {
            cy.log(`Episode is expired: ${Cypress.env('currentPath')}`);
          }
        });
      });

      it('should render an image placeholder', () => {
        cy.request(
          `${Cypress.env('currentPath')}.json${dataEndpointOverride()}`,
        ).then(({ body: jsonData }) => {
          const isExpiredEpisode = isExpired(jsonData);

          if (!isExpiredEpisode) {
            cy.get(
              `amp-img[src="${envConfig.assetUrl}/images/amp_audio_placeholder.png"]`,
            ).should('exist');
          } else {
            cy.log(`Episode is expired: ${Cypress.env('currentPath')}`);
          }
        });
      });
    });
  });
};
