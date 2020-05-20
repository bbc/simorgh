import appConfig from '../../../../src/server/utilities/serviceConfigs';
import envConfig from '../../../support/config/envs';
import {
  getEmbedUrl,
  hasMedia,
  getOnDemandRadioDataEndpoint,
} from './utilities';

export default ({ service, pageType, variant }) => {
  describe('Audio Player', () => {
    it('should render an iframe with a valid URL', () => {
      const { lang: language, service: serviceName } = appConfig[service][
        variant
      ];

      cy.request(getOnDemandRadioDataEndpoint()).then(({ body: jsonData }) => {
        if (hasMedia(jsonData)) {
          const embedUrl = `${getEmbedUrl({
            jsonData,
            service: serviceName,
            language,
          })}/amp`;

          cy.get(`amp-iframe[src*="${embedUrl}"]`).should('be.visible');
          cy.testResponseCodeAndType(embedUrl, 200, 'text/html');
        } else {
          cy.log(
            `No media present on ${pageType} for ${Cypress.env('currentPath')}`,
          );
        }
      });
    });

    it('should render an image placeholder', () => {
      cy.request(getOnDemandRadioDataEndpoint()).then(({ body: jsonData }) => {
        if (hasMedia(jsonData)) {
          cy.get(
            `amp-img[src="${envConfig.assetUrl}/images/amp_audio_placeholder.png"]`,
          ).should('exist');
        }
      });
    });
  });
};
