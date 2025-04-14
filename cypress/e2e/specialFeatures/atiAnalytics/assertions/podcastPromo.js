import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import { assertATIComponentClickEvent, assertATIComponentViewEvent } from '.';

const { PODCAST_PROMO } = COMPONENTS;

export const assertPodcastPromoComponentView = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
}) => {
  it('should send a view event for the Podcast Promo component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-e2e="podcast-promo"]').scrollIntoView({
      duration: 1000,
    });

    assertATIComponentViewEvent({
      component: PODCAST_PROMO,
      pageIdentifier,
      contentType,
      useReverb,
    });
  });
};

export const assertPodcastPromoComponentClick = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
}) => {
  it('should send a click event for the Podcast Promo component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-e2e="podcast-promo"]').scrollIntoView({
      duration: 1000,
    });

    // Click on first item
    cy.get('[data-e2e="podcast-promo"]').find('a').last().click();

    assertATIComponentClickEvent({
      component: PODCAST_PROMO,
      pageIdentifier,
      contentType,
      useReverb,
    });
  });
};
