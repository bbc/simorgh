export default ({ service, pageType }) => {
  it.skip(`should render a simple ${service} ${pageType} page`, () => {
    cy.get('[data-testid="home-page"]').should(
      'contain',
      'Hi, I am a Home Page component',
    );
  });
};
