export const assertLiveTvPage = (
  { service }: { service: string },
  { pageType }: { pageType: string },
) => {
  it(`should render the Live TV Page with a h1 containing Hello World for ${service}`, () => {
    const expectedHeading = `HELLO WORLD pageType: ${pageType} service: ${service}`;
    cy.get('h1').should('contain.text', expectedHeading);
  });
};
