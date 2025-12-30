import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import { assertATIComponentClickEvent, assertATIComponentViewEvent } from '.';

const { SCROLLABLE_PROMO } = COMPONENTS;

export const assertScrollablePromoComponentView = ({
  pageIdentifier,
  contentType,
  path,
  applicationType,
  siteId,
}) => {
  it('should send a view event for the Scrollable Promo component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-e2e="scrollable-promos"]').first().scrollIntoView({
      duration: 1000,
    });

    assertATIComponentViewEvent({
      component: SCROLLABLE_PROMO,
      pageIdentifier,
      contentType,
      applicationType,
      siteId,
    });
  });
};

export const assertScrollablePromoComponentClick = ({
  pageIdentifier,
  contentType,
  path,
  applicationType,
  siteId,
}) => {
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
      contentType,
      applicationType,
      siteId,
    });
  });
};
