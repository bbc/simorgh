/* eslint-disable consistent-return */
import envConfig from '../../../support/config/envs';
import {
  isAvailable,
  dataEndpointOverride,
} from '../../../support/helpers/onDemandRadioTv';

export default ({ service, pageType }) => {
  describe(`testsForAMPOnly for ${service} ${pageType}`, () => {
    describe('Audio Player', () => {
      it('should render an image placeholder', () => {
        cy.request(
          `${Cypress.env('currentPath')}.json${dataEndpointOverride()}`,
        ).then(({ body: jsonData }) => {
          if (!isAvailable(jsonData)) {
            return cy.log(`Episode unavailable: ${Cypress.env('currentPath')}`);
          }

          cy.get(
            `amp-img[src="${envConfig.assetUrl}/images/amp_audio_placeholder.png"]`,
          ).should('exist');
        });
      });
    });
  });
};
