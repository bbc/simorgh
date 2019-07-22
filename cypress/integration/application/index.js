import { describeForLocalOnly } from '../../support/limitEnvRuns';

describe('Application', () => {
  it('Service worker files should return a 200 status code for news', () => {
    cy.testResponseCodeAndType(
      `/news/articles/sw.js`,
      200,
      'application/javascript',
    );
  });

  it('Manifest.json files should return a 200 status code for news', () => {
    cy.testResponseCodeAndType(
      `/news/articles/manifest.json`,
      200,
      'application/json',
    );
  });
});

describeForLocalOnly('Application - Local Env', () => {
  it('Local Env - Service worker files hould return a 200 status code for news', () => {
    cy.testResponseCodeAndType(
      `/news/articles/sw.js`,
      200,
      'application/javascript',
    );
  });

  it(`Local Env - Service worker files should return a 200 status code for igbo, pidgin and yoruba`, () => {
    ['igbo', 'pidgin', 'yoruba'].forEach(service => {
      it(`should return a 200 status code for ${service}`, () => {
        cy.testResponseCodeAndType(
          `/${service}/sw.js`,
          200,
          'application/javascript',
        );
      });
    });
  });

  it('Local Env - Manifest.json files should return a 200 status code for persian, igbo, pidgin and yoruba without /articles', () => {
    cy.testResponseCodeAndType(
      `/persian/articles/manifest.json`,
      200,
      'application/json',
    );

    ['igbo', 'pidgin', 'yoruba'].forEach(service => {
      it(`should return a 200 status code for ${service} without /articles`, () => {
        cy.testResponseCodeAndType(
          `/${service}/manifest.json`,
          200,
          'application/json',
        );
      });
    });
  });
});
