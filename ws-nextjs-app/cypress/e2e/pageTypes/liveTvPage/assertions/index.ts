import { PageTypes, Services } from '#app/models/types/global';

type LiveTvPageParams = {
  service: Services;
  pageType: PageTypes;
  pageData: {
    title: string;
  };
};

// eslint-disable-next-line import/prefer-default-export
export const assertLiveTvPage = ({ service }: LiveTvPageParams) => {
  it(`should render the Live TV Page with the correct h1 for ${service}`, () => {
    cy.getPageDataFromWindow().then(pageData => {
      const expectedHeading = (pageData as LiveTvPageParams['pageData'])?.title;
      cy.get('h1').should('have.text', expectedHeading);
    });
  });
};
