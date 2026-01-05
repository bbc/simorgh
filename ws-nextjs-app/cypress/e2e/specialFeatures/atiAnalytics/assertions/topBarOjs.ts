/* eslint-disable import/no-relative-packages */
import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import { assertATIComponentClickEvent, assertATIComponentViewEvent } from '.';
import { AtiAssertionFnProps } from './type';

const { TOP_BAR_OJ } = COMPONENTS;

export const assertTopBarOJComponentView = ({
  pageIdentifier,
  contentType,
  path,
  siteId,
}: AtiAssertionFnProps) => {
  it('should send a view event for the Top Bar OJ component', () => {
    interceptATIAnalyticsBeacons();

    cy.visit(path);

    cy.get('[data-testid="top-bar-onward-journeys"]').scrollIntoView({
      duration: 1000,
    });

    assertATIComponentViewEvent({
      component: TOP_BAR_OJ,
      pageIdentifier,
      contentType,
      siteId,
    });
  });
};

export const assertTopBarOJComponentClick = ({
  pageIdentifier,
  contentType,
  path,
  siteId,
}: AtiAssertionFnProps) => {
  it('should send a click event for the Top Bar OJ component', () => {
    interceptATIAnalyticsBeacons();

    cy.visit(path);

    cy.get('[data-testid="top-bar-onward-journeys"]').scrollIntoView({
      duration: 1000,
    });

    cy.get('[data-testid="top-bar-onward-journeys"]').find('a').first().click();

    assertATIComponentClickEvent({
      component: TOP_BAR_OJ,
      pageIdentifier,
      contentType,
      siteId,
    });
  });
};
