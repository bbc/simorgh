import Url from 'url-parse';
import { Given } from 'cypress-cucumber-preprocessor/steps';

Given('I navigate to {}', pageUrl => {
  const url = new Url(pageUrl);

  Cypress.env('currentPath', url.pathname);
  Cypress.env('service', url.pathname.split('/')[0]);
  Cypress.env('isAmp', url.pathname.split('.amp').length > 1);

  cy.visit(url.toString());
});
