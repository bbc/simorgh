import { Then } from 'cypress-cucumber-preprocessor/steps';

const hasHeadline = headline => {
  cy.get('h1').contains(headline);
};

Then("the headline is '{}'", headline => {
  hasHeadline(headline);
});

Then("the subheadline '{}' is displayed", subheadline => {
  cy.get('h2').contains(subheadline);
});

export default hasHeadline;
