import { When } from 'cypress-cucumber-preprocessor/steps';
import { playMedia, playMediaWithPlaceholder } from '../../common/media';

When('I click the article play video button', () => {
  playMediaWithPlaceholder('StyledVideoContainer', 'button');
});

When('I click the article play audio button', () => {
  playMediaWithPlaceholder('StyledVideoContainer', 'button');
});

When('I click the play video button', () => {
  playMedia('StyledVideoContainer', 'button.p_cta');
});

When('I click the play audio button', () => {
  playMedia('StyledVideoContainer', 'button.p_cta');
});
