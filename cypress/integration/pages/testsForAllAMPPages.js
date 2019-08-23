const testsForAllAMPPages = pageType => {
  describe(`AMP Tests`, () => {
    if (pageType !== 'errorPage404') {
      it('should have an AMP attribute on the page', () => {
        cy.get('html').should('have.attr', 'amp');
      });
    }
  });
};

export default testsForAllAMPPages;
