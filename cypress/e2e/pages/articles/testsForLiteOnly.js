import { liteEnabledServices } from '#app/components/LiteSiteCta/liteSiteConfig';

export default ({ service, pageType }) => {
  if (liteEnabledServices.includes(service)) {
    describe(`Running testsForLiteOnly for ${service} ${pageType}`, () => {
      describe('CTA: Lite', () => {
        it('Clicking the link to the main site should navigate to canonical site', () => {
          cy.get('[data-e2e="to-main-site"]').within(() => {
            cy.get('a')
              .should('have.attr', 'href')
              .then($href => {
                cy.get('a').click();
                cy.url().should('eq', $href).should('not.contain', '.lite');
              });
          });
          cy.go('back');
        });

        it('Clicking the link to the Information page should navigate to lite site', () => {
          cy.get('[data-e2e="information-page"]').within(() => {
            cy.get('a')
              .should('have.attr', 'href')
              .then($href => {
                cy.get('a').click();
                cy.url().should('eq', $href);
              })
              .and('contain', '.lite');
          });
          cy.go('back');
        });
      });
    });
  }
};
