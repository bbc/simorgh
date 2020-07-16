import {
  isExpired,
  dataEndpointOverride,
} from '../../../support/helpers/onDemandRadioTv';

export default ({ service, pageType }) => {
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
