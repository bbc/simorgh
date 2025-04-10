import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import { assertATIComponentClickEvent, assertATIComponentViewEvent } from '.';

const { SCROLLABLE_NAVIGATION, DROPDOWN_NAVIGATION } = COMPONENTS;

export const assertScrollableNavigationComponentView = ({
  pageIdentifier,
  contentType,
  componentTrackingContentType,
  useReverb,
  path,
}) => {
  it('should send a view event for the Scrollable Navigation component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-e2e="scrollable-nav"]').scrollIntoView({
      duration: 1000,
    });

    assertATIComponentViewEvent({
      component: SCROLLABLE_NAVIGATION,
      pageIdentifier,
      contentType: componentTrackingContentType || contentType,
      useReverb,
    });
  });
};

export const assertScrollableNavigationComponentClick = ({
  pageIdentifier,
  contentType,
  componentTrackingContentType,
  useReverb,
  path,
}) => {
  it('should send a click event for the Scrollable Navigation component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-e2e="scrollable-nav"]').scrollIntoView({
      duration: 1000,
    });

    // Click on first item & return to the original url
    cy.get('[data-e2e="scrollable-nav"]').find('a').last().click();

    assertATIComponentClickEvent({
      component: SCROLLABLE_NAVIGATION,
      pageIdentifier,
      contentType: componentTrackingContentType || contentType,
      useReverb,
    });
  });
};

// Assertions for nav bar at smaller breakpoints
export const assertDropdownNavigationComponentView = ({
  pageIdentifier,
  contentType,
  componentTrackingContentType,
  useReverb,
  path,
}) => {
  it('should send a view event for the Dropdown Navigation component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.viewport(320, 480);
    cy.get('nav button').click();

    assertATIComponentViewEvent({
      component: DROPDOWN_NAVIGATION,
      pageIdentifier,
      contentType: componentTrackingContentType || contentType,
      useReverb,
    });
  });
};

export const assertDropdownNavigationComponentClick = ({
  pageIdentifier,
  contentType,
  componentTrackingContentType,
  useReverb,
  path,
}) => {
  it('should send a click event for the Dropdown Navigation component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.viewport(320, 480);
    cy.get('nav button').click();

    // Click on first item, then return to the original page
    cy.get('[data-e2e="dropdown-nav"]').find('a').first().click();

    assertATIComponentClickEvent({
      component: DROPDOWN_NAVIGATION,
      pageIdentifier,
      contentType: componentTrackingContentType || contentType,
      useReverb,
    });
  });
};
