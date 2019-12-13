import { Then } from 'cypress-cucumber-preprocessor/steps';

Then("the paragraph '{}' is displayed", paragraph => {
  cy.get('p').contains(paragraph);
});
