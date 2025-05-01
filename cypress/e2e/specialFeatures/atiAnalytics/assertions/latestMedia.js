import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import { assertATIComponentClickEvent, assertATIComponentViewEvent } from '.';

const { LATEST_MEDIA } = COMPONENTS;

export const assertLatestMediaComponentView = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
}) => {
  it('should send a view event for the Latest Media component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-testid="latest-media"]').scrollIntoView({ duration: 1000 });

    assertATIComponentViewEvent({
      component: LATEST_MEDIA,
      pageIdentifier,
      contentType,
      useReverb,
    });
  });
};

export const assertLatestMediaComponentClick = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
}) => {
  it('should send a click event for the Latest Media component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-testid="latest-media"]').scrollIntoView({
      duration: 1000,
    });

    // Click on first item
    cy.get('[data-testid="latest-media"]').find('a').first().click();

    assertATIComponentClickEvent({
      component: LATEST_MEDIA,
      pageIdentifier,
      contentType,
      useReverb,
    });
  });
};
