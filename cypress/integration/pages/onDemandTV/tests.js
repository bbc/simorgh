import {
  isExpired,
  dataEndpointOverride,
} from '../../../support/helpers/onDemandRadioTv';

export default ({ service, pageType }) => {
  describe(`Tests for ${service} ${pageType}`, () => {
    describe('Video Player', () => {
      it('should render an iframe with a valid URL', () => {
        cy.request(
          `${Cypress.env('currentPath')}.json${dataEndpointOverride()}`,
        ).then(({ body: jsonData }) => {
          const isExpiredEpisode = isExpired(jsonData);

          if (!isExpiredEpisode) {
            cy.get('iframe').then(iframe => {
              cy.testResponseCodeAndType(iframe.prop('src'), 200, 'text/html');
            });
          } else {
            cy.log(`Episode is expired: ${Cypress.env('currentPath')}`);
          }
        });
      });
    });
  });
};
