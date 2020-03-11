import Url from 'url-parse';
import { Given } from 'cypress-cucumber-preprocessor/steps';
import envConfig from '../../support/config/envs';

Given('I navigate to {}', pageUrl => {
  const path = pageUrl.startsWith('http')
    ? pageUrl
    : `${envConfig.baseUrl}/${pageUrl}`;
  const url = new Url(path);

  Cypress.env('currentPath', url.pathname);
  Cypress.env('service', url.pathname.split('/')[0]);
  Cypress.env('isAmp', url.pathname.split('.amp').length > 1);

  cy.visit(url.toString());
});
