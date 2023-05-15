export default ({ service, pageType }) => {
  describe(`Running tests for ${service} ${pageType}`, () => {
    // eslint-disable-next-line no-unused-vars
    let livePageData;
    before(() => {
      const env = Cypress.env('APP_ENV');
      cy.getPageData({
        service,
        pageType: 'live',
        id: 'c7p765ynk9qt',
      }).then(({ body }) => {
        livePageData = body;
      });
    });

    it(`should render a simple ${service} ${pageType} page`, () => {
      cy.get('h1').should('contain', 'Test Next.JS Page');
    });
  });
};
