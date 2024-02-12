describe('Live Page Spec', () => {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  let livePageData;
  before(() => {
    cy.getPageData({
      service: 'pidgin',
      pageType: 'live',
      id: 'c7p765ynk9qt',
    }).then(({ body }) => {
      livePageData = body;
    });
  });

  if (Cypress.env('APP_ENV') === 'test') {
    it('visits page and passes', () => {
      cy.visit('/pidgin/live/c7p765ynk9qt');
    });

    describe(`SEO Metadata`, () => {
      it('should include mainEntityOfPage in the LinkedData', () => {
        cy.visit('/pidgin/live/c7p765ynk9qt');

        cy.get('script[type="application/ld+json"]')
          .should('contain', 'mainEntityOfPage')
          .and('contain', 'author')
          .and('contain', 'headline')
          .and('contain', 'liveBlogPosting');
      });
    });
  }
});
