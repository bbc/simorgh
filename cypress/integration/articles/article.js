import { config } from '../../support';

Object.keys(config.services).forEach(index => {
  const serviceConfig = config.services[index];
  const service = index;

  describe('Article Tests', () => {
    if (
      serviceConfig.pageTypes.articles !== undefined &&
      serviceConfig.pageTypes.articles.basicAsset !== undefined
    ) {
      it(`should return a 200 status code and HTML file for ${service}`, () => {
        cy.testResponseCodeAndType(
          `${serviceConfig.pageTypes.articles.basicAsset}`,
          200,
          'text/html',
        );
      });

      // eslint-disable-next-line no-undef
      before(() => {
        cy.visit(`${serviceConfig.pageTypes.articles.basicAsset}`);
      });
      it('should render the BBC News branding', () => {
        cy.get('header a').should('contain', 'BBC News');
      });
    }
  });
});
