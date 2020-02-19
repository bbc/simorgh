import { When, Then } from 'cypress-cucumber-preprocessor/steps';
import {
  assertMediaIsPlaying,
  playMedia,
  playMediaWithPlaceholder,
} from './media';

const playVideo = () => {
  playMedia('StyledVideoContainer', 'button.p_cta');
};

When('I click the play video button', () => {
  playVideo();
});

Then('the video plays', () => {
  assertMediaIsPlaying();
});

When('I click the video placeholder', () => {
  playMediaWithPlaceholder('StyledVideoContainer', 'button');
});

export default playVideo;
