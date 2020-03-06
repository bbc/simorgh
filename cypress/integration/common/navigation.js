import Url from 'url-parse';
import { Given } from 'cypress-cucumber-preprocessor/steps';

Given('I navigate to {}', pageUrl => {
  const url = new Url(pageUrl);

  Cypress.env('url', url);
  Cypress.env('currentPath', url.pathname);
  Cypress.env('service', url.pathname.split('/')[0]);

  cy.visit(url.toString());
});
