import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import { assertATIComponentClickEvent, assertATIComponentViewEvent } from '.';

const { SHARE } = COMPONENTS;

export const assertShareComponentView = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
  applicationType,
  siteId,
}) => {
  it('should send a view event for the Share component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-e2e="share"]').scrollIntoView({
      duration: 1000,
    });

    assertATIComponentViewEvent({
      component: SHARE,
      pageIdentifier,
      contentType,
      useReverb,
      applicationType,
      siteId,
    });
  });
};

export const assertShareComponentClick = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
  applicationType,
  siteId,
}) => {
  it('should send a click event for the Share component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-e2e="share"').first().scrollIntoView({
      duration: 1000,
    });

    // Click on first item
    cy.get('[data-e2e="share]').first().find('button').click();

    assertATIComponentClickEvent({
      component: SHARE,
      pageIdentifier,
      contentType,
      useReverb,
      applicationType,
      siteId,
    });
  });
};
