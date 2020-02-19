import { Then } from 'cypress-cucumber-preprocessor/steps';

const hasParagraph = paragraph => {
  cy.get('p').contains(paragraph);
};

Then("the paragraph '{}' is displayed", paragraph => {
  hasParagraph(paragraph);
});

Then('a paragraph with a <link> tag is rendered as an <a> tag', () => {
  cy.log('NotImplemented');
});

export default hasParagraph;
