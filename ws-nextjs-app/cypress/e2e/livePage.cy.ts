describe('Live Page Spec', () => {
  if (Cypress.env('APP_ENV') === 'test') {
    it('passes', () => {
      cy.visit('/pidgin/new_live/c7p765ynk9qt');
    });
  }
});
