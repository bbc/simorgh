export default ({ path }) => {
  describe('Live page visit', () => {
    it('visits page and passes', () => {
      cy.visit(path);
    });
  });
};
