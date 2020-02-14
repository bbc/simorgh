import { When, Then } from 'cypress-cucumber-preprocessor/steps';
import { assertMediaIsPlaying, assertMediaPlayerIsReady } from './media';

const playVideo = () => {
  // Ensure the video player is ready
  cy.get(
    'div[class^="StyledVideoContainer"] iframe[class^="StyledIframe"]',
  ).then($iframe => assertMediaPlayerIsReady($iframe));

  // Click the play button
  cy.get('iframe').then(iframe => {
    cy.wrap(iframe.contents().find('iframe'))
      .should(inner => expect(inner.contents().find('button.p_cta')).to.exist)
      .then(inner => cy.wrap(inner.contents().find('button.p_cta')).click());
  });
};

When('I click the play video button', () => {
  playVideo();
});

Then('the video plays', () => {
  assertMediaIsPlaying();
});

export default playVideo;
