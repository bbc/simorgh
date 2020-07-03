export default ({ service, pageType }) => {
  if (pageType === 'onDemandRadio') {
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
    });
  }
};
