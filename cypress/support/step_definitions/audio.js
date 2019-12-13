import { When, Then } from 'cypress-cucumber-preprocessor/steps';

const AUDIO_SELECTOR = 'div[class^="StyledVideoContainer"]';
When('I click the audio play button', () => {
  cy.get(AUDIO_SELECTOR).within(() => {
    cy.get('button').click();
  });
});

Then('the audio plays', () => {
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
});
