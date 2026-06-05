/* eslint-disable import/no-relative-packages */
import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import { assertATIComponentClickEvent, assertATIComponentViewEvent } from '.';
import { AtiAssertionFnProps } from './type';
import interceptExternalLinks from '../../../../support/helpers/interceptExternalLinks';

const { PODCAST_PROMO } = COMPONENTS;

export const assertPodcastPromoComponentView = ({
  pageIdentifier,
  path,
  applicationType,
  siteId,
}: AtiAssertionFnProps) => {
  it('should send a view event for the Podcast Promo component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    // This duplicate line of code has been added intentionally to get cypress to scroll to the bottom.
    cy.get('[data-e2e="podcast-promo"]').scrollIntoView({
      duration: 1000,
    });
    cy.get('[data-e2e="podcast-promo"]').scrollIntoView({
      duration: 1000,
    });

    assertATIComponentViewEvent({
      component: PODCAST_PROMO,
      pageIdentifier,
      applicationType,
      siteId,
    });
  });
};

export const assertPodcastPromoComponentClick = ({
  pageIdentifier,
  path,
  applicationType,
  siteId,
}: AtiAssertionFnProps) => {
  it('should send a click event for the Podcast Promo component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);
    interceptExternalLinks({ httpCode: 200 });

    cy.get('[data-e2e="podcast-promo"]').scrollIntoView({
      duration: 1000,
    });

    // Click on first item
    cy.get('[data-e2e="podcast-promo"]').find('a').last().click();

    assertATIComponentClickEvent({
      component: PODCAST_PROMO,
      pageIdentifier,
      applicationType,
      siteId,
    });
  });
};
