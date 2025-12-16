/* eslint-disable import/no-relative-packages */
import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import { assertATIComponentClickEvent, assertATIComponentViewEvent } from '.';
import { AtiAssertionFnProps } from './type';

const { RECOMMENDATIONS } = COMPONENTS;

export const assertRecommendationsComponentView = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
  applicationType,
  siteId,
}: AtiAssertionFnProps) => {
  it('should send a view event for the Recommendations component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    // This duplicate line of code has been added intentionally to get cypress to scroll to the bottom.
    cy.get('[data-e2e="recommendations-heading"]').scrollIntoView({
      duration: 1000,
    });
    cy.get('[data-e2e="recommendations-heading"]').scrollIntoView({
      duration: 1000,
    });

    assertATIComponentViewEvent({
      component: RECOMMENDATIONS,
      pageIdentifier,
      contentType,
      useReverb,
      applicationType,
      siteId,
    });
  });
};

export const assertRecommendationsComponentClick = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
  applicationType,
  siteId,
}: AtiAssertionFnProps) => {
  it('should send a click event for the Recommendations component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-e2e="recommendations-heading"]').scrollIntoView({
      duration: 1000,
    });

    // Click on last item
    cy.get('[data-e2e="recommendations-heading"]')
      .find('a')
      .last()
      .click({ force: true });

    assertATIComponentClickEvent({
      component: RECOMMENDATIONS,
      pageIdentifier,
      contentType,
      useReverb,
      applicationType,
      siteId,
    });
  });
};
