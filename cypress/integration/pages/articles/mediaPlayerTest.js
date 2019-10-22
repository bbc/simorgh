describe('Media Player', () => {
  // Note: This needs to be on the same origin as the iframe,
  // other we won't be able to access `contentWindow` properties.
  const audioVideoUrl = 'https://www.test.bbc.co.uk/news/articles/cn7k01xp8kxo';

  it('plays media when a user clicks play', () => {
    cy.visit(audioVideoUrl);
    cy.get('div[class^="StyledVideoContainer"]').click();

    cy.get('iframe[class^="StyledIframe"').then($iframe => {
      // We don't have to wait for $iframe's `load` event, because
      // `its()` retries until the `embeddedMedia` property appears on
      // the av-embed `window`. As soon as it appears, 'Bump' has
      // injected SMP into `div#mediaPlayer` and populated the
      // `window` with details we can used to assert it's playing.
      cy.wrap($iframe.get(0).contentWindow)
        .its('embeddedMedia')
        .then(embeddedMedia => {
          cy.wrap(embeddedMedia.players[0])
            .its('_playing') // We must wait for `_playing` also.
            .should('eq', true);
        });
    });
  });
});
