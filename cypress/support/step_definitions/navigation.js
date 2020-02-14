import { Given, After } from 'cypress-cucumber-preprocessor/steps';
import { downloadPageData, deletePageData } from './helpers/pageData';

const envConfig = require('../config/envs');

Given('I navigate to {}', url => {
  const path = url.split('.amp')[0];
  const pageUrl = `${envConfig.baseUrl}/${path}`;

  // Retrieve the page data file, so that it can used in later step definitions
  downloadPageData(path);
  cy.visit(pageUrl);
});

After(() => {
  deletePageData();
});
