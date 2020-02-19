import { When, Then } from 'cypress-cucumber-preprocessor/steps';
import { assertMediaIsPlaying, playMedia } from './media';
import hasHeadline from './headlines';
import hasParagraph from './paragraph';

When('I click the play radio button', () => {
  playMedia('StyledAudioContainer', 'button#p_audioui_playpause.audioButton');
});

Then('the radio plays', () => {
  assertMediaIsPlaying();
});

Then('the correct radio name is displayed', () => {
  cy.get('@pageData').then(({ body }) => {
    hasHeadline(body.promo.name);
  });
});

Then('the correct radio description is displayed', () => {
  cy.get('@pageData').then(({ body }) => {
    hasParagraph(body.promo.summary);
  });
});
