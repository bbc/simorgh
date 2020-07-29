/* eslint-disable consistent-return */
import {
  isAvailable,
  dataEndpointOverride,
  getEmbedUrl,
  isBrand,
} from '../../../support/helpers/onDemandRadioTv';
import appConfig from '../../../../src/server/utilities/serviceConfigs';

export default ({ service, pageType, variant, isAmp }) => {
  describe(`Tests for ${service} ${pageType}`, () => {
    describe('Brand image visible above 400px, not visible below 400px', () => {
      it(`Should display image on default viewport (1000x660))`, () => {
        cy.get('div[class^="ImageContainer"]').find('img');
      });

      it(`Should not display image on iphone-6 screen (375x667)`, () => {
        cy.viewport('iphone-6');

        cy.get('div[class^="ImageContainer"]')
          .find('img')
          .should('not.be.visible');
      });
    });

    describe('Audio Player', () => {
      it('should render an iframe with a valid URL', () => {
        cy.request(
          `${Cypress.env('currentPath')}.json${dataEndpointOverride()}`,
        ).then(({ body: jsonData }) => {
          if (!isAvailable(jsonData)) {
            return cy.log(`Episode unavailable: ${Cypress.env('currentPath')}`);
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
