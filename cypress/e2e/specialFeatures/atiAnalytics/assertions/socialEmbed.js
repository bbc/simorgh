import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import { assertATIComponentClickEvent, assertATIComponentViewEvent } from '.';

const { SOCIAL_EMBED } = COMPONENTS;

export const assertSocialEmbedComponentView = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
}) => {
  it('should send a view event for the Social Embed component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-testid="consentBanner"]').first().scrollIntoView({
      duration: 1000,
    });

    assertATIComponentViewEvent({
      component: SOCIAL_EMBED,
      pageIdentifier,
      contentType,
      useReverb,
    });
  });
};

export const assertSocialEmbedComponentClick = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
}) => {
  it('should send a click event for the Social Embed component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-testid="consentBanner"]').first().scrollIntoView({
      duration: 1000,
    });

    // Click on accept and continue button
    cy.get('[data-testid="consentBanner"]').first().find('button').click();

    assertATIComponentClickEvent({
      component: SOCIAL_EMBED,
      pageIdentifier,
      contentType,
      useReverb,
    });
  });
};
