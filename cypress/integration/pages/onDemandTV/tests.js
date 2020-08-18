/* eslint-disable consistent-return */
import {
  isAvailable,
  getEpisodeAvailability,
  getEmbedUrl,
  isBrand,
} from '../../../support/helpers/onDemandRadioTv';
import appConfig from '../../../../src/server/utilities/serviceConfigs';
// eslint-disable-next-line import/no-named-as-default
import dataEndpointOverride from '../../../support/helpers/visitPage';

export default ({ service, pageType, variant, isAmp }) => {
  describe(`Tests for ${service} ${pageType}`, () => {
    describe('Video Player', () => {
      it('Brand page should not display a future episode', () => {
        cy.request(
          `${Cypress.env('currentPath')}.json${dataEndpointOverride()}`,
        ).then(({ body: jsonData }) => {
          const episodeAvailability = getEpisodeAvailability(jsonData);
          if (episodeAvailability !== 'available') {
            if (episodeAvailability === 'future') {
              throw new Error('Episode is in the future');
            }
            return cy.log(
              `Episode is ${episodeAvailability}: ${Cypress.env(
                'currentPath',
              )}`,
            );
          }
        });
      });
      it('should render an iframe with a valid URL', () => {
        cy.request(
          `${Cypress.env('currentPath')}.json${dataEndpointOverride()}`,
        ).then(({ body: jsonData }) => {
          if (!isAvailable) {
            return cy.log(
              `Episode is not available: ${Cypress.env('currentPath')}`,
            );
          }

          const language = appConfig[service][variant].lang;
          const embedUrl = getEmbedUrl({ body: jsonData, language, isAmp });
          const isBrandPage = isBrand(jsonData);

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
