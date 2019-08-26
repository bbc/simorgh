export const testsToAlwaysRunForAMPPages = () => {
  describe(`No testsToAlwaysRunForAMPPages to run`, () => {});
};

export const testsForAllAMPPages = pageType => {
  describe(`Running testsForAllAMPPages`, () => {
    if (pageType !== 'errorPage404') {
      it('should have an AMP attribute on the page', () => {
        cy.get('html').should('have.attr', 'amp');
      });
    }
  });
};

export const testsToNeverSmokeTestForAMPPages = () => {
  describe(`No testsToNeverSmokeTestForAMPPages to run`, () => {});
};
