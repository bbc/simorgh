/* eslint-disable import/no-relative-packages */
import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import {
  assertATIComponentClickEvent,
  assertATIComponentViewEvent,
} from '../../../../../../cypress/e2e/specialFeatures/atiAnalytics/assertions';
import { AtiAssertionFnProps } from './type';

const { FEATURES } = COMPONENTS;

export const assertFeaturesAnalysisComponentView = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
  applicationType,
  siteId,
}: AtiAssertionFnProps) => {
  it('should send a view event for the Features & Analysis component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    // This duplicate line of code has been added intentionally to get cypress to scroll to the bottom.
    cy.get('[data-testid="features"]')
      .filter(':visible')
      .first()
      .scrollIntoView({ duration: 1000 });

    cy.get('[data-testid="features"]')
      .filter(':visible')
      .first()
      .scrollIntoView({ duration: 1000 });

    assertATIComponentViewEvent({
      component: FEATURES,
      pageIdentifier,
      contentType,
      useReverb,
      applicationType,
      siteId,
    });
  });
};

export const assertFeaturesAnalysisComponentClick = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
  applicationType,
  siteId,
}: AtiAssertionFnProps) => {
  it('should send a click event for the Features & Analysis component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-testid="features"]')
      .filter(':visible')
      .first()
      .scrollIntoView({ duration: 1000 });

    // Click on first item
    cy.get('[data-testid="features"]')
      .filter(':visible')
      .first()
      .find('a')
      .first()
      .click();

    assertATIComponentClickEvent({
      component: FEATURES,
      pageIdentifier,
      contentType,
      useReverb,
      applicationType,
      siteId,
    });
  });
};
