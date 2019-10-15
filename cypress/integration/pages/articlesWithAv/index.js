// Based on https://github.com/cypress-io/cypress/issues/136#issuecomment-342391119
// TODO benefits of consider alternate approaches on same issue
Cypress.Commands.add('iframeBody', { prevSubject: 'element' }, $iframe => {
  return new Cypress.Promise(resolve => {
    $iframe.on('load', () => {
      resolve($iframe.contents().find('body'));
    });
  });
});

describe('Audio/video playback', () => {
  const audioVideoUrl = 'https://www.test.bbc.co.uk/news/articles/cn7k01xp8kxo';

  it('includes guidance message and subtitles', () => {
    cy.visit(audioVideoUrl);
    cy.get('div[class^=StyledVideoContainer]').click();

    cy.get('iframe[class^="StyledIframe"]')
      .iframeBody()
      .find('iframe#smphtml5iframemediaPlayer')
      .iframeBody().then($smpIframe => {
        cy.wrap($smpIframe)
          .contains('Contains strong language')
          .should('be.visible');

        cy.wrap($smpIframe)
          .contains('Ants and human societies', { timeout: 15000 })
          .should('be.visible');
      });
  });
});
