import { Then } from 'cypress-cucumber-preprocessor/steps';

const hasParagraph = paragraph => {
  cy.get('p').contains(paragraph);
};

Then("the paragraph '{}' is displayed", paragraph => {
  hasParagraph(paragraph);
});

Then('paragraph with <link> tag is rendered as <a> tag', () => {
  cy.log('NotImplemented');
});

export default hasParagraph;
