/* eslint-disable import/no-relative-packages */
import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import {
  assertATIComponentClickEvent,
  assertATIComponentViewEvent,
} from '../../../../../../cypress/e2e/specialFeatures/atiAnalytics/assertions';
import { AtiAssertionFnProps } from './type';

const { LATEST_MEDIA } = COMPONENTS;

export const assertLatestMediaComponentView = ({
  pageIdentifier,
  contentType,
  path,
  applicationType,
  siteId,
}: AtiAssertionFnProps) => {
  it('should send a view event for the Latest Media component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    // This duplicate line of code has been added intentionally to get cypress to scroll to the bottom.
    cy.get('[data-testid="latest-media"]').scrollIntoView({ duration: 1000 });
    cy.get('[data-testid="latest-media"]').scrollIntoView({ duration: 1000 });

    assertATIComponentViewEvent({
      component: LATEST_MEDIA,
      pageIdentifier,
      contentType,
      applicationType,
      siteId,
    });
  });
};

export const assertLatestMediaComponentClick = ({
  pageIdentifier,
  contentType,
  path,
  applicationType,
  siteId,
}: AtiAssertionFnProps) => {
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
      applicationType,
      siteId,
    });
  });
};
