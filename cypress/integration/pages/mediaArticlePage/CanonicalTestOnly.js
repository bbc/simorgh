export default ({ service, pageType, variant }) => {
  describe(`Canonical only test for ${service} ${pageType}`, () => {
    let mediaArticleData;
    before(() => {
      cy.getPageData({ service, pageType: 'article', variant }).then(
        response => {
          mediaArticleData = response.body;
          // console.log(JSON.stringify(mediaArticleData));
        },
      );
    });
    describe(`Chartbeat analytics`, () => {
      it('should have a script with src value set to chartbeat source', () => {
        cy.hasScriptWithChartbeatSrc();
      });
      it('should have chartbeat config set to window object', () => {
        cy.hasGlobalChartbeatConfig();
      });
    });

    describe('Media Player: Canonical', () => {
      it('Media player is rendered on page', () => {
        cy.get('[data-e2e="media-player"]')
          .should('be.visible')
          .should('have.css', 'top', '0px')
          .within(() => {
            cy.get('img')
              .should('be.visible')
              .should('have.attr', 'src')
              .should('not.be.empty');
            cy.get('button')
              .should('be.visible')
              .within(() => {
                cy.get('svg').should('be.visible');
                cy.get('time')
                  .should('be.visible')
                  .should('have.attr', 'datetime');
                // .and('eq', durationISO8601);
              });
          });
      });

      it('media can be played', () => {
        cy.intercept('GET', 'https://open.test.bbc.co.uk/mediaselector').as(
          'mediaSelector',
        );
        cy.get('[data-e2e="media-player"]')
          .should('be.visible')
          .should('have.css', 'top', '0px')
          .within(() => {
            cy.get('button')
              .click()
              .then(() => {
                cy.get(`iframe`).should('be.visible');
              });
          });
      });
    });
  });
};
