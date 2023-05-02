import HOME_PAGE_CONFIG from '../../../../src/app/routes/homePage/getInitialData/page-config';

export default ({ service, pageType }) => {
  describe(`Running tests for ${service} ${pageType}`, () => {
    let articlesData;
    before(() => {
      const env = Cypress.env('APP_ENV');
      cy.getPageData({
        service,
        pageType: 'home',
        id: HOME_PAGE_CONFIG[service][env],
      }).then(({ body }) => {
        articlesData = body;
      });
    });

    it.skip(`should render a simple ${service} ${pageType} page`, () => {
      cy.log(articlesData);
      cy.get('[data-testid="home-page"]').should(
        'contain',
        'Hi, I am a Home Page component',
      );
    });
  });
};
