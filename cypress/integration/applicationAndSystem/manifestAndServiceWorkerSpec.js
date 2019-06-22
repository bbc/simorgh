// NB must still configure to handle different envs!!!!!
// NB2 must also handle isUK for news

import config from '../../support/newConfig';

Object.keys(config.local.services).forEach(index => {
  const serviceConfig = config.local.services[index];
  const service = index;

  describe('Manifest.json files', () => {
    it(`should return a 200 status code and JSON file for ${service} unless it's undefined`, () => {
      if (serviceConfig.manifestPath !== undefined) {
        cy.testResponseCodeAndType(
          `/${serviceConfig.manifestPath}`,
          200,
          'application/json',
        );
      } else {
        cy.testResponseCodeAndType(
          `/${serviceConfig.manifestPath}`,
          404,
          'text/html',
        );
      }
    });
  });

  describe('sw.js files', () => {
    it(`should return a 200 status code and js file for ${service} unless it's undefined`, () => {
      if (serviceConfig.serviceWorkerPath !== undefined) {
        cy.testResponseCodeAndType(
          `/${serviceConfig.serviceWorkerPath}`,
          200,
          'application/javascript',
        );
      } else {
        cy.testResponseCodeAndType(
          `/${serviceConfig.serviceWorkerPath}`,
          404,
          'text/html',
        );
      }
    });
  });
});
