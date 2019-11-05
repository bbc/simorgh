import config from '../../support/config/services';
import appConfig from '../../../src/server/utilities/serviceConfigs';

const serviceHasPageType = (serviceName, pageType) =>
  config[serviceName].pageTypes[pageType].path !== undefined;

const servicesUsingArticlePaths = ['news', 'scotland'];

const services = Object.keys(config);

const serviceHasAtLeastOnePageType = service => {
  const pageTypes = Object.keys(config[service].pageTypes);

  return pageTypes.some(pageType => serviceHasPageType(service, pageType));
};

describe('Application', () => {
  services.filter(serviceHasAtLeastOnePageType).forEach(service => {
    const usesArticlePath = servicesUsingArticlePaths.includes(service);

    it(`should return a 200 status code for ${service}'s service worker`, () => {
      console.log(config[service].name);
      cy.testResponseCodeAndType(
        usesArticlePath
          ? `/${config[service].name}/articles/sw.js`
          : `/${config[service].name}/sw.js`,
        200,
        'application/javascript',
      );
    });

    it(`should return a 200 status code for ${service} manifest file`, () => {
      cy.testResponseCodeAndType(
        usesArticlePath
          ? `/${config[service].name}/articles/manifest.json`
          : `/${config[service].name}/manifest.json`,
        200,
        'application/json',
      );
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
        cy.testResponseCodeAndType(url, 404, 'text/html');
        cy.visit(url, { failOnStatusCode: false });
        const service = url.includes('igbo') ? 'igbo' : 'news';
        cy.get('h1').should(
          'contain',
          `${appConfig[config[service].name].default.translations.error[404].title}`,
        );
      });
    });
  }
});
