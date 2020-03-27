import { When } from 'cypress-cucumber-preprocessor/steps';
import { playMedia } from '../../../common/media';

When(/I click the play (audio|video) button/, () => {
  playMedia('StyledVideoContainer', 'button.p_cta');
});
