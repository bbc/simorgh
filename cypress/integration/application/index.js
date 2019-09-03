import config from '../../support/config/services';
import appConfig from '../../../src/app/lib/config/services';

const serviceHasPageType = (service, pageType) =>
  config[service].pageTypes[pageType].path !== undefined;

describe('Application', () => {
  Object.keys(config)
    .filter(service => service !== 'news')
    .filter(service =>
      Object.keys(config[service].pageTypes).some(pageType =>
        serviceHasPageType(service, pageType),
      ),
    )
    .forEach(service => {
      it(`should return a 200 status code for ${service}'s service worker`, () => {
        cy.testResponseCodeAndType(
          `/${service}/sw.js`,
          200,
          'application/javascript',
        );
      });

      it(`should return a 200 status code for ${service} manifest file`, () => {
        cy.testResponseCodeAndType(
          `/${service}/manifest.json`,
          200,
          'application/json',
        );
      });
    });
});

describe('Application', () => {
  it('should return a 200 status code for the news service worker', () => {
    cy.testResponseCodeAndType(
      '/news/articles/sw.js',
      200,
      'application/javascript',
    );
  });
});

describe('Application unknown route error pages', () => {
  if (Cypress.env('APP_ENV') === 'local') {
    var unknownRoutes = [
      '/foobar',
      '/foobar.amp',
      '/igbo/foobar',
      'igbo/foobar.amp',
    ];
    unknownRoutes.forEach(function(url) {
      it('should display a news canonical error page', () => {
        cy.visit(url, { failOnStatusCode: false });
        console.log(appConfig);
        cy.get('h1 span').should(
          'contain',
          `${appConfig['news'].translations.error[404].statusCode}`,
        );
        cy.get('h1').should(
          'contain',
          `${appConfig['news'].translations.error[404].title}`,
        );
      });
    });
  }
});
