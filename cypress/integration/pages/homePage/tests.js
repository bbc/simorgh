export default ({ service, pageType }) => {
  describe(`Tests for ${pageType} page`, () => {
    it(`should render a ${service} home page`, () => {
      cy.get('[data-testid="home-page"]').should(
        'contain',
        'Hi, I am a Home Page component',
      );
    });
  });
};
