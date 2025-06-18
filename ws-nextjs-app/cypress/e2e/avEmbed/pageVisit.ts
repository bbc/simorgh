export default ({ path }) => {
  describe('AVEmbed page visit', () => {
    it('visits page and passes', () => {
      cy.visit(path);
    });
  });
};
