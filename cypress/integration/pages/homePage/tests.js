import HOME_PAGE_CONFIG from '../../../../src/app/routes/homePage/getInitialData/page-config';

export default ({ service, pageType }) => {
  describe(`Running home page tests for ${service} ${pageType}`, () => {
    // eslint-disable-next-line no-unused-vars
    let homePageData;
    before(() => {
      const env = Cypress.env('APP_ENV');
      cy.getPageData({
        service,
        pageType: 'home',
        id: HOME_PAGE_CONFIG[service][env],
      }).then(({ body }) => {
        homePageData = body;
      });
    });

    it.skip(`should render a simple ${service} ${pageType} page`, () => {
      cy.get('[data-testid="home-page"]').should(
        'contain',
        'Hi, I am a Home Page component',
      );
    });

    describe(`Chartbeat analytics`, () => {
      it('should have a script with src value set to chartbeat source', () => {
        cy.hasScriptWithChartbeatSrc();
      });
      it('should have chartbeat config set to window object', () => {
        cy.hasGlobalChartbeatConfig();
      });
    });
  });
};
