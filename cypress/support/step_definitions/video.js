import { When, Then } from 'cypress-cucumber-preprocessor/steps';
import { playMedia, assertMediaIsPlaying } from './media';

When('I click the play video button', () => {
  playMedia();
});

Then('the video plays', () => {
  assertMediaIsPlaying();
});
