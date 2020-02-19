import { When, Then } from 'cypress-cucumber-preprocessor/steps';
import { assertMediaIsPlaying, assertMediaPlayerIsReady } from './media';
import hasHeadline from './headlines';
import hasParagraph from './paragraph';

When('I click the play radio button', () => {
  // Ensure the radio player is ready
  cy.get(
    'div[class^="StyledAudioContainer"] iframe[class^="StyledIframe"]',
  ).then($iframe => {
    assertMediaPlayerIsReady($iframe);

    // Click the play button
    cy.get($iframe.contents().find('iframe'))
      .should(
        inner =>
          expect(inner.contents().find('button.p_audioui_playpause')).to.exist,
      )
      .then(inner =>
        cy.wrap(inner.contents().find('button.p_audioui_playpause')).click(),
      );
  });
});

Then('the radio plays', () => {
  assertMediaIsPlaying();
});

Then('the correct radio name is displayed', () => {
  cy.get('@pageData').then(({ body }) => {
    hasHeadline(body.promo.name);
  });
});

Then('the correct radio description is displayed', () => {
  cy.get('@pageData').then(({ body }) => {
    hasParagraph(body.promo.summary);
  });
});
