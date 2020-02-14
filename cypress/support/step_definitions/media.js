const iframeSelector = 'iframe';

export const assertMediaIsPlaying = () => {
  cy.get(iframeSelector).then($iframe => {
    cy.wrap($iframe.prop('contentWindow'), { timeout: 10000 })
      .its('embeddedMedia.playerInstances.mediaPlayer')
      .invoke('currentTime')
      .should('be.gt', 0);
  });
};

export const assertMediaPlayerIsReady = iframe => {
  cy.wrap(iframe.prop('contentWindow'), { timeout: 8000 })
    .its('embeddedMedia.playerInstances.mediaPlayer.ready')
    .should('eq', true);
};
