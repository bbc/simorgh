import config from '../../support/config/services';
import appConfig from '../../../src/server/utilities/serviceConfigs';
import serviceHasPageType from '../../support/helpers/serviceHasPageType';
import ampOnlyServices from '../../support/helpers/ampOnlyServices';
import envConfig from '../../support/config/envs';
import getPaths from '../../support/helpers/getPaths';
import { getTopicPagePath } from '../pages/topicPage/helpers';

describe('Application', () => {
  Object.keys(config)
    .filter(service =>
      Object.keys(config[service].pageTypes).some(pageType =>
        serviceHasPageType(service, pageType),
      ),
    )
    .forEach(service => {
      if (!ampOnlyServices.includes(service)) {
        it(`should return a 200 status code for ${service}'s service worker`, () => {
          cy.testResponseCodeAndType({
            path: `/${config[service].name}/sw.js`,
            responseCode: 200,
            type: 'application/javascript',
          });
        });

        it(`should return a 200 status code for ${service} manifest file`, () => {
          cy.testResponseCodeAndType({
            path: `/${config[service].name}/manifest.json`,
            responseCode: 200,
            type: 'application/json',
          });
        });

        it(`should awaken fresh data for pages for later tests`, () => {
          // Add more here if you want to awaken fresh data for other page types
          if (serviceHasPageType(service, 'topicPage')) {
            const paths = getPaths(service, 'topicPage');
            paths.forEach(currentPath => {
              const topicPagePath = getTopicPagePath(currentPath);
              const fullPath = `${envConfig.baseUrl}${topicPagePath}`;
              cy.log(fullPath);
              cy.visit(fullPath);
            });
          }
        });
      }
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
