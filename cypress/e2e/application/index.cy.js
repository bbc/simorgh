import loadableConfig from '#app/lib/config/services/loadableConfig';
import appConfig from '../../../src/server/utilities/serviceConfigs';

const PUBLIC_SERVICES = [
  'archive',
  'cymrufyw',
  'naidheachdan',
  'news',
  'newsround',
  'scotland',
  'sport',
  'ws',
];

const NOT_LIVE_SERVICES = ['magyarul'];

const servicesToIgnore = [...PUBLIC_SERVICES, ...NOT_LIVE_SERVICES];

describe('Application', () => {
  Object.keys(loadableConfig)
    .filter(service => !servicesToIgnore.includes(service))
    .forEach(service => {
      it(`should return a 200 status code for ${service}'s service worker`, () => {
        cy.testResponseCodeAndType({
          path: `/${service}/sw.js`,
          responseCode: 200,
          type: 'application/javascript',
        });
      });

      it(`should return a 200 status code for ${service} manifest file`, () => {
        cy.testResponseCodeAndType({
          path: `/${service}/manifest.json`,
          responseCode: 200,
          type: 'application/json',
        });
      });
    });
});

describe('Application unknown route error pages', () => {
  if (Cypress.env('APP_ENV') === 'local') {
    const unknownRoutes = [
      '/foobar',
      '/foobar.amp',
      '/igbo/foobar',
      'igbo/foobar.amp',
    ];
    unknownRoutes.forEach(url => {
      it('should display a news canonical error page', () => {
        cy.testResponseCodeAndType({
          path: url,
          responseCode: 404,
          type: 'text/html',
        });
        cy.visit(url, { failOnStatusCode: false });
        const service = url.includes('igbo') ? 'igbo' : 'news';
        cy.get('h1').should(
          'contain',
          `${appConfig[service].default.translations.error[404].title}`,
        );
      });
    });
  }
});
