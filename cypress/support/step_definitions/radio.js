import { When, Then } from 'cypress-cucumber-preprocessor/steps';
import { assertMediaIsPlaying } from './media';

When('I click the play radio button', () => {
  cy.get('iframe').then(iframe => {
    cy.get(iframe.contents().find('iframe'))
      .should(inner => expect(inner.contents().find('audioButton')).to.exist)
      .then(inner => cy.wrap(inner.contents().find('audioButton')).click());
  });
});

Then('the radio plays', () => {
  assertMediaIsPlaying();
});
