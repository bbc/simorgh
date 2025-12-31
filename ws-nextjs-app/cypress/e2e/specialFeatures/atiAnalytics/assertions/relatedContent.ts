/* eslint-disable import/no-relative-packages */
import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import {
  assertATIComponentClickEvent,
  assertATIComponentViewEvent,
} from '../../../../../../cypress/e2e/specialFeatures/atiAnalytics/assertions';
import { AtiAssertionFnProps } from './type';

const { RELATED_CONTENT } = COMPONENTS;

export const assertRelatedContentComponentView = ({
  pageIdentifier,
  contentType,
  path,
  applicationType,
  siteId,
}: AtiAssertionFnProps) => {
  it('should send a view event for the Related Content component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    // This duplicate line of code has been added intentionally to get cypress to scroll to the bottom.
    cy.get('[data-e2e="related-content-heading"]').scrollIntoView({
      duration: 1000,
    });
    cy.get('[data-e2e="related-content-heading"]').scrollIntoView({
      duration: 1000,
    });

    assertATIComponentViewEvent({
      component: RELATED_CONTENT,
      pageIdentifier,
      contentType,
      applicationType,
      siteId,
    });
  });
};

export const assertRelatedContentComponentClick = ({
  pageIdentifier,
  contentType,
  path,
  applicationType,
  siteId,
}: AtiAssertionFnProps) => {
  it('should send a click event for the Related Content component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-e2e="related-content-heading"]').scrollIntoView({
      duration: 1000,
    });

    // Click on first item
    cy.get('[data-e2e="related-content-heading"]').find('a').first().click();

    assertATIComponentClickEvent({
      component: RELATED_CONTENT,
      pageIdentifier,
      contentType,
      applicationType,
      siteId,
    });
  });
};
