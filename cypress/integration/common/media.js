import { Then } from 'cypress-cucumber-preprocessor/steps';
import serviceConfig from '../../../src/server/utilities/serviceConfigs';

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

export const playMedia = (outerIFrameClass, playButton) => {
  cy.get(
    `div[class^="${outerIFrameClass}"] iframe[class^="StyledIframe"]`,
  ).then($iframe => assertMediaPlayerIsReady($iframe));

  // Click the play button
  cy.get('iframe').then(iframe => {
    cy.wrap(iframe.contents().find('iframe'))
      .should(inner => expect(inner.contents().find(playButton)).to.exist)
      .then(inner => cy.wrap(inner.contents().find(playButton)).click());
  });
};

export const playMediaWithPlaceholder = (outerIFrameClass, playButton) => {
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

Then('the video clip plays', () => {
  assertMediaIsPlaying();
});

Then('the audio clip plays', () => {
  assertMediaIsPlaying();
});
