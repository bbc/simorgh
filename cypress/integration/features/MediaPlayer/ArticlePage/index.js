import { When } from 'cypress-cucumber-preprocessor/steps';
import { playMedia, assertMediaPlayerIsReady } from '../../../common/media';

const isAmp = () => {
  return Cypress.env('isAmp');
};

const playMediaWithPlaceholder = (outerIFrameClass, playButton) => {
  cy.get(`div[class^="${outerIFrameClass}"]`)
    .within(() => {
      cy.get(playButton);
    })
    .click()
    .should('not.exist')
    .then(() => {
      cy.get('iframe').then($iframe => {
        assertMediaPlayerIsReady($iframe);
      });
    });
};

When(/I click the play (audio|video) button/, () => {
  const iframeClass = 'StyledVideoContainer';
  if (isAmp()) {
    playMedia(iframeClass, 'button.p_button.p_cta.p_hasDuration', {
      force: true,
    });
  } else {
    playMediaWithPlaceholder(iframeClass, 'button');
  }
});
