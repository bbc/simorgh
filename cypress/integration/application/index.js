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
  beforeEach(resetDocument);
  Object.keys(config)
    .filter(service => ['pidgin'].includes(service))
    .forEach(service => {
      it.skip(`${service} front page renders same application after hydration`, () => {
        const win = cy.state('window');
        delete win.createReactClass;

        let serverHtml;
        cy.request(`/${service}/`)
          .its('body')
          .then(html => {
            serverHtml = html;
          });

        let staticHTML;
        cy.get('body')
          .invoke('html')
          .then(html => {
            staticHTML = html;
          })
          .then(resetDocument)
          .then(() => {
            cy.state('document').write(serverHtml);
          });

        cy.get('body')
          .invoke('html')
          .then(html => {
            expect(html).to.equal(staticHTML);
          });
      });

      it.skip('renders same application after hydration', () => {
        // technical detail - removes any stubs from previous tests
        // since our application iframe does not get reset
        // (there is no "cy.visit" call to reset it)
        const win = cy.state('window');
        delete win.createReactClass;

        // Options for the observer (which mutations to observe)
        const obConfig = { attributes: true, childList: true, subtree: true };

        // Callback function to execute when mutations are observed
        const callback = (mutationsList, observer) => {
          for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
              cy.log('A child node has been added or removed.');
            } else if (mutation.type === 'attributes') {
              cy.log(
                'The ' + mutation.attributeName + ' attribute was modified.',
              );
            }
          }
        };

        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(callback);

        // Later, you can stop observing
        observer.disconnect();

        let SSRHtml;
        cy.request(`${config[service].pageTypes.articles.path}`)
          .its('body')
          .then(html => {
            SSRHtml = html;
            // remove bundle script to only have static HTML
            const scriptRegex = new RegExp(
              `<script crossorigin="anonymous" type="text\/javascript" src=".+?static.+?script>`,
              'gm',
            );
            cy.state('document').write(html.replace(scriptRegex, ''));
          });

        // cy.get('li').should('have.length', 4);
        // cy.get('button').should('be.disabled');

        let staticHTML;
        cy.get('#root')
          .invoke('html')

          .then(html => {
            staticHTML = html;
            // Start observing the target node for configured mutations
            // Select the node that will be observed for mutations
            const targetNode = win.document.getElementById('root');
            cy.log(observer.observe(targetNode, obConfig));
          })

          // now mount the full page and let it hydrate
          .then(resetDocument)
          .then(() => {
            cy.state('document').write(SSRHtml);
            // Select the node that will be observed for mutations
            const targetNode = win.document.getElementById('root');
            cy.log(observer.observe(targetNode, obConfig));
          })
          .debug();

        cy.get('#root')
          .invoke('html')
          .then(html => {
            expect(html).to.equal(staticHTML);
            // Select the node that will be observed for mutations
            const targetNode = win.document.getElementById('root');
            observer.observe(targetNode, obConfig);
          });
      });
    });
});
