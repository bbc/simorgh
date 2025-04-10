import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import { assertATIComponentClickEvent, assertATIComponentViewEvent } from '.';

const { RELATED_TOPICS } = COMPONENTS;

export const assertRelatedTopicsComponentView = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
}) => {
  it('should send a view event for the Related Topics component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-testid="related-topics"]').scrollIntoView({
      duration: 1000,
    });

    assertATIComponentViewEvent({
      component: RELATED_TOPICS,
      pageIdentifier,
      contentType,
      useReverb,
    });
  });
};

export const assertRelatedTopicsComponentClick = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
}) => {
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
      contentType,
      useReverb,
    });
  });
};
