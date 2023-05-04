import HOME_PAGE_CONFIG from '../../../../src/app/routes/homePage/getInitialData/page-config';

export default ({ service, pageType }) => {
  describe(`Running tests for ${service} ${pageType}`, () => {
    let homePageData;
    before(() => {
      const env = Cypress.env('APP_ENV');
      cy.getPageData({
        service,
        pageType: 'home',
        id: HOME_PAGE_CONFIG[service][env],
      }).then(({ body }) => {
        // eslint-disable-next-line no-unused-vars
        homePageData = body;
      });
    });

    it.skip(`should render a simple ${service} ${pageType} page`, () => {
      cy.get('[data-testid="home-page"]').should(
        'contain',
        'Hi, I am a Home Page component',
      );
    });
  });
};
