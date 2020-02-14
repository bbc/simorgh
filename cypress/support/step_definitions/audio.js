import { When, Then } from 'cypress-cucumber-preprocessor/steps';
import { assertMediaIsPlaying } from './media';
import playVideo from './video';

When('I click the play audio button', () => {
  playVideo();
});

Then('the audio plays', () => {
  assertMediaIsPlaying();
});
