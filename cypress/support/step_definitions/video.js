import { When, Then } from 'cypress-cucumber-preprocessor/steps';
import {
  assertMediaIsPlaying,
  playMedia,
  playMediaWithPlaceholder,
} from './media';

When('I click the play video button', () => {
  playMedia('StyledVideoContainer', 'button.p_cta');
});

Then('the video plays', () => {
  assertMediaIsPlaying();
});

When('I click the video placeholder', () => {
  playMediaWithPlaceholder('StyledVideoContainer', 'button');
});
