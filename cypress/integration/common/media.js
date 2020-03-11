import { Then } from 'cypress-cucumber-preprocessor/steps';

const isAmp = () => {
  return Cypress.env('isAmp');
};

const iframeSelector = () => {
  return isAmp() ? 'amp-iframe iframe' : 'iframe';
};

export const assertMediaIsPlaying = () => {
  cy.get(iframeSelector()).then($iframe => {
    cy.wrap($iframe.prop('contentWindow'), { timeout: 20000 })
      .its('embeddedMedia.playerInstances.mediaPlayer')
      .invoke('currentTime')
      .should('be.gt', 0);
  });
};

export const assertMediaPlayerIsReady = iframe => {
  cy.wrap(iframe.prop('contentWindow'), { timeout: 20000 })
    .its('embeddedMedia.playerInstances.mediaPlayer.ready')
    .should('eq', true);
};

export const playMedia = (outerIFrameClass, playButton, options) => {
  cy.get(
    `div[class^="${outerIFrameClass}"] ${iframeSelector()}`,
  ).then($iframe => assertMediaPlayerIsReady($iframe));

  // Click the play button
  cy.get(iframeSelector()).then(iframe => {
    cy.wrap(iframe.contents().find('iframe'))
      .should(inner => expect(inner.contents().find(playButton)).to.exist)
      .then(inner => cy.wrap(inner.contents().find(playButton)).click(options));
  });
};

Then(/the (audio|video) clip plays/, () => {
  assertMediaIsPlaying();
});
