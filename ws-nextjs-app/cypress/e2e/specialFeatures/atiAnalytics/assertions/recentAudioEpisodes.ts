import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import { assertATIComponentClickEvent, assertATIComponentViewEvent } from '.';

const { RECENT_AUDIO_EPISODES } = COMPONENTS;

export const assertRecentAudioEpisodesComponentView = ({
  pageIdentifier,
  path,
  applicationType,
  siteId,
}) => {
  it('should send a view event for the Recent Audio Episodes component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-e2e="recent-episodes-list"]').scrollIntoView({
      duration: 1000,
    });

    assertATIComponentViewEvent({
      component: RECENT_AUDIO_EPISODES,
      pageIdentifier,
      applicationType,
      siteId,
    });
  });
};

export const assertRecentAudioEpisodesComponentClick = ({
  pageIdentifier,
  path,
  applicationType,
  siteId,
}) => {
  it('should send a click event for the Recent Audio Episodes component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-e2e="recent-episodes-list"]').scrollIntoView({
      duration: 1000,
    });

    // Click on first item
    cy.get('[data-e2e="recent-episodes-list"]').find('a').first().click();

    assertATIComponentClickEvent({
      component: RECENT_AUDIO_EPISODES,
      pageIdentifier,
      applicationType,
      siteId,
    });
  });
};
