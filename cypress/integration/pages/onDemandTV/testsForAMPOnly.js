import appConfig from '../../../../src/server/utilities/serviceConfigs';
import { getEmbedUrl, isExpired, dataEndpointOverride } from './helpers';

export default ({ service, pageType, variant }) => {
  describe(`testsForAMPOnly for ${service} ${pageType}`, () => {
    describe('AV Player', () => {
      const { lang } = appConfig[service][variant];

      it('should render an iframe with a valid URL', () => {
        cy.request(
          `${Cypress.env('currentPath')}.json${dataEndpointOverride()}`,
        ).then(({ body: jsonData }) => {
          const embedUrl = getEmbedUrl(jsonData, lang);
          const isExpiredEpisode = isExpired(jsonData);

          if (!isExpiredEpisode) {
            cy.get(`amp-iframe[src*="${embedUrl}"]`).should('be.visible');
            cy.testResponseCodeAndType(embedUrl, 200, 'text/html');
          } else {
            cy.log(`Episode is expired: ${Cypress.env('currentPath')}`);
          }
        });
      });
    });
  });
};
