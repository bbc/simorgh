import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import { assertATIComponentClickEvent, assertATIComponentViewEvent } from '.';

const { FEATURES } = COMPONENTS;

export const assertFeaturesAnalysisComponentView = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
}) => {
  it('should send a view event for the Features & Analysis component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-testid="features"]').scrollIntoView({ duration: 1000 });

    assertATIComponentViewEvent({
      component: FEATURES,
      pageIdentifier,
      contentType,
      useReverb,
    });
  });
};

export const assertFeaturesAnalysisComponentClick = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
}) => {
  it('should send a click event for the Features & Analysis component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-testid="features"]').scrollIntoView({ duration: 1000 });

    // Click on first item
    cy.get('[data-testid="features"]').find('a').first().click({ force: true });

    assertATIComponentClickEvent({
      component: FEATURES,
      pageIdentifier,
      contentType,
      useReverb,
    });
  });
};
