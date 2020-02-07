// import { After } from 'cypress-cucumber-preprocessor';
import { Given, Then, After } from 'cypress-cucumber-preprocessor/steps';

const envConfig = require('../config/envs');

Given('I navigate to {}', url => {
  const pageUrl = `${envConfig.baseUrl}/${url}`;
  const dataUrl = `${pageUrl.split('.amp')[0]}.json`;

  cy.request(dataUrl).then(dataFile => {
    Cypress.env('currentPath', url.split('.amp')[0]);
    cy.writeFile(
      `cypress/fixtures/${Cypress.env('currentPath')}.json`,
      dataFile,
    );
  });

  cy.visit(pageUrl);
});

Then('a page is displayed', () => {
  cy.log('Page displayed OK');
});

After(() => {
  const dataFile = `cypress/fixtures/${Cypress.env('currentPath')}.json`;
  try {
    cy.exec(`rm ${dataFile}`);
  } catch (error) {
    cy.log(error);
  }
});
