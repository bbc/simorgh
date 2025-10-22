import { PageTypes, Services } from '#app/models/types/global';
import liveTvFixture from '#data/dari/watch/bbc_afghan_tv/live.json';

type LiveTvPageParams = {
  service: Services;
  pageType: PageTypes;
};

// eslint-disable-next-line import/prefer-default-export
export const assertLiveTvPage = ({ service }: LiveTvPageParams) => {
  it(`should render the Live TV Page with the correct h1 for ${service}`, () => {
    const expectedHeading = liveTvFixture.data.title;
    cy.get('h1').should('have.text', expectedHeading);
  });
};
