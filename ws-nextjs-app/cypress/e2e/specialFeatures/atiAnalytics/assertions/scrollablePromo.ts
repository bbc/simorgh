/* eslint-disable import/no-relative-packages */
import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import {
  assertATIComponentClickEvent,
  assertATIComponentViewEvent,
} from '../../../../../../cypress/e2e/specialFeatures/atiAnalytics/assertions';
import { AtiAssertionFnProps } from './type';

const { SCROLLABLE_PROMO } = COMPONENTS;

export const assertScrollablePromoComponentView = ({
  pageIdentifier,
  path,
  applicationType,
  siteId,
}: AtiAssertionFnProps) => {
  it('should send a view event for the Scrollable Promo component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    // This duplicate line of code has been added intentionally to get cypress to scroll to the bottom.
    cy.get('[data-e2e="scrollable-promos"]').first().scrollIntoView({
      duration: 1000,
    });
    cy.get('[data-e2e="scrollable-promos"]').first().scrollIntoView({
      duration: 1000,
    });

    assertATIComponentViewEvent({
      component: SCROLLABLE_PROMO,
      pageIdentifier,
      applicationType,
      siteId,
    });
  });
};

export const assertScrollablePromoComponentClick = ({
  pageIdentifier,
  path,
  applicationType,
  siteId,
}: AtiAssertionFnProps) => {
  it('should send a click event for the Scrollable Promo component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-e2e="scrollable-promos"]').first().scrollIntoView({
      duration: 1000,
    });

    // Click on first item
    cy.get('[data-e2e="scrollable-promos"]').find('a').first().click();

    assertATIComponentClickEvent({
      component: SCROLLABLE_PROMO,
      pageIdentifier,
      applicationType,
      siteId,
    });
  });
};
