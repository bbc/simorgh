/* eslint-disable consistent-return */
import {
  isAvailable,
  overrideRendererOnTest,
} from '../../../support/helpers/onDemandRadioTv';

export default ({ service, pageType }) => {
  describe(`testsForAMPOnly for ${service} ${pageType}`, () => {
    describe('Audio Player', () => {
      it('should render an image placeholder', () => {
        cy.request(
          `${Cypress.env('currentPath')}.json${overrideRendererOnTest()}`,
        ).then(({ body: jsonData }) => {
          if (!isAvailable(jsonData)) {
            return cy.log(`Episode unavailable: ${Cypress.env('currentPath')}`);
          }

          cy.get(`div[data-e2e="image-placeholder"][placeholder]`).should(
            'exist',
          );
        });
      });
    });
  });
};
