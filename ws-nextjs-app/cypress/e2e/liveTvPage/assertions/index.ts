import { ServiceParametersType } from '#nextjs/cypress/types';

export default ({ service, pageType }: ServiceParametersType) => {
  it(`should render the Live TV Page with a h1 containing Hello World for ${service}`, () => {
    const expectedHeading = `HELLO WORLD pageType: ${pageType} service: ${service}`;
    cy.get('h1').should('have.text', expectedHeading);
  });
};
