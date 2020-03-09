import { When, Then } from 'cypress-cucumber-preprocessor/steps';
import { assertMediaIsPlaying, playMedia } from '../../../common/media';

When('I click the play radio button', () => {
  playMedia('StyledAudioContainer', 'button#p_audioui_playpause.audioButton');
});

Then('the radio plays', () => {
  assertMediaIsPlaying();
});
