/* eslint-disable import/no-relative-packages */
import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import {
  assertATIComponentClickEvent,
  assertATIComponentViewEvent,
} from '../../../../../../cypress/e2e/specialFeatures/atiAnalytics/assertions';
import { AtiAssertionFnProps } from './type';

const { RELATED_TOPICS } = COMPONENTS;

export const assertRelatedTopicsComponentView = ({
  pageIdentifier,
  path,
  applicationType,
  siteId,
}: AtiAssertionFnProps) => {
  it('should send a view event for the Related Topics component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    // This duplicate line of code has been added intentionally to get cypress to scroll to the bottom.
    cy.get('[data-testid="related-topics"]').scrollIntoView({
      duration: 1000,
    });
    cy.get('[data-testid="related-topics"]').scrollIntoView({
      duration: 1000,
    });

    assertATIComponentViewEvent({
      component: RELATED_TOPICS,
      pageIdentifier,
      applicationType,
      siteId,
    });
  });
};

export const assertRelatedTopicsComponentClick = ({
  pageIdentifier,
  path,
  applicationType,
  siteId,
}: AtiAssertionFnProps) => {
  it('should send a click event for the Related Topics component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-testid="related-topics"]').scrollIntoView({
      duration: 1000,
    });

    // Click on first item
    cy.get('[data-testid="related-topics"]').find('a').first().click();

    assertATIComponentClickEvent({
      component: RELATED_TOPICS,
      pageIdentifier,
      applicationType,
      siteId,
    });
  });
};
