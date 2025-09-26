import { PageTypes, Services } from '#app/models/types/global';

type LiveTvPageParams = {
  service: Services;
  pageType: PageTypes;
};

export const assertLiveTvPage = ({ service, pageType }: LiveTvPageParams) => {
  it(`should render the Live TV Page with a h1 containing Hello World for ${service}`, () => {
    const expectedHeading = `HELLO WORLD pageType: ${pageType} service: ${service}`;
    cy.get('h1').should('have.text', expectedHeading);
  });
};
