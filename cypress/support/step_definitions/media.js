export const playMedia = () => {
  // const iframeSelector =
  //   cy.location('pathname').indexOf('.amp') >= 0 ? 'amp-iframe' : 'iframe';
  const iframeSelector = 'iframe';

  cy.get(iframeSelector)
    .should(iframe => expect(iframe.to.exist))
    .should(iframe => expect(iframe.contents().to.exist))
    .then(iframe => {
      cy.wrap(iframe.contents().find('iframe'))
        .should(inner => expect(inner.to.exist))
        .should(inner => expect(inner.contents().to.exist))
        .should(inner => expect(inner.contents().find('button.p_cta')).to.exist)
        .then(inner => cy.wrap(inner.contents().find('button.p_cta')).click());
    });
};

export const assertMediaIsPlaying = () => {
  cy.get('iframe[class^="StyledIframe"]').then($iframe => {
    cy.wrap($iframe.prop('contentWindow'), {
      // `timeout` only applies to the methods chained below.
      // `its()` benefits from this, and will wait up to 8s
      // for the mediaPlayer instance to become available.
      timeout: 8000,
    })
      .its('embeddedMedia.playerInstances.mediaPlayer')
      .invoke('currentTime')
      .should('be.gt', 0);
  });
};
