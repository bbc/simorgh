export default ({ path }) => {
  describe('Send page visit', () => {
    it('visits page and passes', () => {
      cy.visit(path);
    });
  });
};
