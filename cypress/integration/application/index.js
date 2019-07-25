import config from '../../../src/app/lib/config/services';
import { describeForLocalOnly } from '../../support/limitEnvRuns';

describeForLocalOnly('Application', () => {
  Object.keys(config)
    .filter(service => service !== 'default')
    .forEach(service => {
      if (service === 'default') {
        return;
      }
      // All services test sws
      it(`should return a 200 status code for ${service}'s service worker`, () => {
        cy.testResponseCodeAndType(
          `/${service}/sw.js`,
          200,
          'application/javascript',
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

  // Once all manifest are done this should be move into the object forEach above
  ['igbo', 'news/articles', 'pidgin', 'yoruba'].forEach(service => {
    it(`should return a 200 status code for ${service} manifest file`, () => {
      cy.testResponseCodeAndType(
        `/${service}/manifest.json`,
        200,
        'application/json',
      );
    });
  });
});
