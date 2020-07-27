/* eslint-disable consistent-return */
import {
  isExpired,
  dataEndpointOverride,
  getEmbedUrl,
  isBrand,
} from '../../../support/helpers/onDemandRadioTv';
import appConfig from '../../../../src/server/utilities/serviceConfigs';

export default ({ service, pageType, variant, isAmp }) => {
  describe(`Tests for ${service} ${pageType}`, () => {
    describe('Video Player', () => {
      it('should render an iframe with a valid URL', () => {
        cy.request(
          `${Cypress.env('currentPath')}.json${dataEndpointOverride()}`,
        ).then(({ body: jsonData }) => {
          const language = appConfig[service][variant].lang;
          const embedUrl = getEmbedUrl({ body: jsonData, language, isAmp });
          const isBrandPage = isBrand(jsonData);
          const isExpiredEpisode = isExpired(jsonData);

          if (isExpiredEpisode) {
            return cy.log(`Episode is expired: ${Cypress.env('currentPath')}`);
          }

          cy.get('iframe').then(iframe => {
            // If a brand, get the src of the iframe, otherwise, use the embed URL from the data
            const iframeURL = isBrandPage ? iframe.prop('src') : embedUrl;

            cy.get(`iframe[src*="${iframeURL}"]`).should('be.visible');
            cy.testResponseCodeAndType(iframeURL, 200, 'text/html');
          });
        });
      });
    });
  });
};
