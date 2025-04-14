import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import { assertATIComponentClickEvent, assertATIComponentViewEvent } from '.';

const { RECOMMENDATIONS } = COMPONENTS;

export const assertRecommendationsComponentView = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
}) => {
  it('should send a view event for the Recommendations component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-e2e="recommendations-heading"]').scrollIntoView({
      duration: 1000,
    });

    assertATIComponentViewEvent({
      component: RECOMMENDATIONS,
      pageIdentifier,
      contentType,
      useReverb,
    });
  });
};

export const assertRecommendationsComponentClick = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
}) => {
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
    });
  });
};
