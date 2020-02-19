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

Then('the correct headline is displayed', () => {
  cy.get('@pageData').then(({ body }) => {
    hasHeadline(body.promo.headlines.headline);
  });
});

export default hasHeadline;
