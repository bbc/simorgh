/* eslint-disable consistent-return */
import envConfig from '../../../support/config/envs';
import {
  isExpired,
  dataEndpointOverride,
} from '../../../support/helpers/onDemandRadioTv';

export default ({ service, pageType }) => {
  describe(`testsForAMPOnly for ${service} ${pageType}`, () => {
    describe('Audio Player', () => {
      it('should render an image placeholder', () => {
        cy.request(
          `${Cypress.env('currentPath')}.json${dataEndpointOverride()}`,
        ).then(({ body: jsonData }) => {
          const isExpiredEpisode = isExpired(jsonData);

          if (isExpiredEpisode) {
            return cy.log(`Episode is expired: ${Cypress.env('currentPath')}`);
          }

          cy.get(
            `amp-img[src="${envConfig.assetUrl}/images/amp_audio_placeholder.png"]`,
          ).should('exist');
        });
      });
    });
  });
};
