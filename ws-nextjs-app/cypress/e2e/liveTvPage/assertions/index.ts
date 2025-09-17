export const assertLiveTvPage = ({ service }: { service: string }) => {
  it(`should render the Live TV Page with a h1 containing Hello World for ${service}`, () => {
    const expectedHeading = `HELLO WORLD`;
    cy.get('h1').should('have.text', expectedHeading);
  });
};
