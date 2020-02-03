import { When, Then } from 'cypress-cucumber-preprocessor/steps';
import { playMedia, assertMediaIsPlaying } from './media';

When('I click the play audio button', () => {
  playMedia();
});

When('I click the play radio button', () => {
  playMedia();
});

Then('the audio plays', () => {
  assertMediaIsPlaying();
});

Then('the radio plays', () => {
  assertMediaIsPlaying();
});
