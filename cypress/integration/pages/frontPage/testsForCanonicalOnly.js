const tests = () =>
  describe(`Canonical Tests`, () => {
    it('should not have an AMP attribute', () => {
      cy.get('html').should('not.have.attr', 'amp');
    });
  });

export default tests;
