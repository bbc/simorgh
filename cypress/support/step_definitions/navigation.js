import { Given } from 'cypress-cucumber-preprocessor/steps';

const envConfig = require('../config/envs');

Given('I navigate to {}', url => {
  const pageUrl = `${envConfig.baseUrl}/${url}`;
  const dataUrl = `${pageUrl.split('.amp')[0]}.json`;

  cy.request(dataUrl).then(dataFile => {
    cy.writeFile('cypress/fixtures/data.json', dataFile);
  });

  cy.visit(pageUrl);
});
