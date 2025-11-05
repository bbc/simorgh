import { PageTypes, Services } from '#app/models/types/global';

type LiveTvPageParams = {
  service: Services;
  pageType: PageTypes;
  pageData: {
    title: string;
  };
};

// eslint-disable-next-line import/prefer-default-export
export const assertLiveTvPage = ({ service, pageData }: LiveTvPageParams) => {
  it(`should render the Live TV Page with the correct h1 for ${service}`, () => {
    const expectedHeading = pageData?.title || '';
    cy.get('h1').should('have.text', expectedHeading);
  });
};
