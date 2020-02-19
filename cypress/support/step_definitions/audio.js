import { When, Then } from 'cypress-cucumber-preprocessor/steps';
import { assertMediaIsPlaying, playMedia } from './media';

When('I click the play audio button', () => {
  playMedia('StyledVideoContainer', 'button.p_cta');
});

Then('the audio plays', () => {
  assertMediaIsPlaying();
});
