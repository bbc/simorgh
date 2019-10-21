// NOTES:
// window.embeddedMedia.players[0]
// testsForCanonicalOnly

// Cypress.Commands.add('iframeBody', { prevSubject: 'element' }, $iframe => {
//   return new Cypress.Promise(resolve => {
//     $iframe.on('load', () => {
//       resolve($iframe.contents().find('body'));
//     });
//   });
// });

describe('Media Player', () => {
  const audioVideoUrl = 'https://www.test.bbc.co.uk/news/articles/cn7k01xp8kxo';

  it('plays media when a user clicks play', () => {
    cy.visit(audioVideoUrl);
    cy.get('div[class^=StyledVideoContainer]').click();

    cy.get('iframe[class^="StyledIframe"]').then($simorghIframe => {
      $simorghIframe
        .find('iframe#smphtml5iframemediaPlayer')
        .then($smpIframeDoc => {
          cy.wrap($smpIframeDoc).window({ log: true });
        });
    });

    // cy.get('iframe[class^="StyledIframe"]')
    //   .iframeBody()
    //   .find('iframe#smphtml5iframemediaPlayer')
    //   .iframeBody().then($smpIframe => {
    //     cy.wrap($smpIframe)
    //       .contains('Contains strong language')
    //       .should('be.visible');

    //     cy.wrap($smpIframe)
    //       .contains('Ants and human societies', { timeout: 15000 })
    //       .should('be.visible');
    //   });
  });
});
