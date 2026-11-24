export default () => {
  describe('Key Points', () => {
    it('should render a key points summary', () => {
      cy.get('[data-e2e="key-points"]').should('exist');
    });
  });
};
