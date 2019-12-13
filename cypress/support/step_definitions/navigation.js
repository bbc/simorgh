import { Given } from 'cypress-cucumber-preprocessor/steps';

const envConfig = require('../config/envs');

Given('I navigate to {}', url => {
  cy.visit(`${envConfig.baseUrl}/${url}`);
});
