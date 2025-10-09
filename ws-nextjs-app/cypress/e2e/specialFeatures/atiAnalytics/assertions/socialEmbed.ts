/* eslint-disable import/no-relative-packages */
import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import {
  assertATIComponentClickEvent,
  assertATIComponentViewEvent,
} from '../../../../../../cypress/e2e/specialFeatures/atiAnalytics/assertions';
import { AtiAssertionFnProps } from './type';

const { SOCIAL_EMBED } = COMPONENTS;

export const assertSocialEmbedComponentView = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
  applicationType,
  siteId,
}: AtiAssertionFnProps) => {
  it('should send a view event for the Social Embed component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    // This duplicate line of code has been added intentionally to get cypress to scroll to the bottom.
    cy.get('[data-testid="consentBanner"]').first().scrollIntoView({
      duration: 1000,
    });
    cy.get('[data-testid="consentBanner"]').first().scrollIntoView({
      duration: 1000,
    });

    assertATIComponentViewEvent({
      component: SOCIAL_EMBED,
      pageIdentifier,
      contentType,
      useReverb,
      applicationType,
      siteId,
    });
  });
};

export const assertSocialEmbedComponentClick = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
  applicationType,
  siteId,
}: AtiAssertionFnProps) => {
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
      applicationType,
      siteId,
    });
  });
};
