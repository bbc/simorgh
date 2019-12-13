import { Then } from 'cypress-cucumber-preprocessor/steps';

Then("the headline is '{}'", headline => {
  cy.get('h1').contains(headline);
});

Then("the subheadline '{}' is displayed", subheadline => {
  cy.get('h2').contains(subheadline);
});
