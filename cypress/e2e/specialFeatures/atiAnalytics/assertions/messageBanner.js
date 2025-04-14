import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import { assertATIComponentClickEvent, assertATIComponentViewEvent } from '.';

const { MESSAGE_BANNER } = COMPONENTS;

export const assertMessageBannerComponentView = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
}) => {
  it('should send a view event for the Message Banner component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-testid="message-banner-1"]').scrollIntoView({
      duration: 1000,
    });

    assertATIComponentViewEvent({
      component: MESSAGE_BANNER,
      pageIdentifier,
      contentType,
      useReverb,
    });
  });
};

export const assertMessageBannerComponentClick = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
}) => {
  it('should send a click event for the Message Banner component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-testid="message-banner-1"]').scrollIntoView({
      duration: 1000,
    });

    // Click on first item
    cy.get('[data-testid="message-banner-1"]').find('a').first().click();

    assertATIComponentClickEvent({
      component: MESSAGE_BANNER,
      pageIdentifier,
      contentType,
      useReverb,
    });
  });
};
