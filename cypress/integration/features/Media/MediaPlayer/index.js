import { When } from 'cypress-cucumber-preprocessor/steps';
import { playMedia } from '../../../common/media';

When('I click the play video button', () => {
  playMedia('StyledVideoContainer', 'button.p_cta');
});

When('I click the play audio button', () => {
  playMedia('StyledVideoContainer', 'button.p_cta');
});
