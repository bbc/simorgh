import { When } from 'cypress-cucumber-preprocessor/steps';
import { playMediaWithPlaceholder } from '../../../common/media';

When('I click the play video button', () => {
  playMediaWithPlaceholder('StyledVideoContainer', 'button');
});

When('I click the play audio button', () => {
  playMediaWithPlaceholder('StyledVideoContainer', 'button');
});
