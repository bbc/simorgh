import config from '../../support/config/services';
import appConfig from '../../../src/testHelpers/serviceConfigs';

const resetDocument = () => {
  const doc = cy.state('document');
  doc.body.innerHTML = '';
};

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
        cy.get('h1 span').should(
          'contain',
          `${appConfig[service].default.translations.error[404].statusCode}`,
        );
        cy.get('h1').should(
          'contain',
          `${appConfig[service].default.translations.error[404].title}`,
        );
      });
    });
  }
});

describe('Application', () => {
  it('renders same application after hydration', () => {
    const win = cy.state('window');
    delete win.createReactClass;

    let pageHtml;
    cy.request('/news/')
      .its('body')
      .then(html => {
        pageHtml = html;
        cy.state('document').write(
          html.replace('<script src="/bundle.js"></script>', ''),
        );
      });

    cy.get('li').should('have.length', 53);

    let staticHTML;
    cy.get('#root')
      .invoke('html')
      .then(html => {
        staticHTML = html;
      })
      .then(resetDocument)
      .then(() => {
        cy.state('document').write(pageHtml);
      });

    cy.get('#root')
      .invoke('html')
      .then(html => {
        expect(html).to.equal(staticHTML);
      });
  });
});
