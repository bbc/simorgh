import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import { assertATIComponentClickEvent, assertATIComponentViewEvent } from '.';

const { LIVE_MEDIA } = COMPONENTS;

export const assertLiveMediaComponentView = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
}) => {
  it('should send a view event for the Live Media component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-testid="watch-now-close-button"]').scrollIntoView({
      duration: 1000,
    });

    assertATIComponentViewEvent({
      component: LIVE_MEDIA,
      pageIdentifier,
      contentType,
      useReverb,
    });
  });
};

export const assertLiveMediaComponentClick = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
}) => {
  it('should send a click event for the Live Media component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-testid="watch-now-close-button"]').scrollIntoView({
      duration: 1000,
    });

    cy.get('[data-testid="watch-now-close-button"]').click();

    assertATIComponentClickEvent({
      component: LIVE_MEDIA,
      pageIdentifier,
      contentType,
      useReverb,
    });
  });
};
