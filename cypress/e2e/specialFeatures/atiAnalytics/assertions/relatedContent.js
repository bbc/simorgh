import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import { assertATIComponentClickEvent, assertATIComponentViewEvent } from '.';

const { RELATED_CONTENT } = COMPONENTS;

export const assertRelatedContentComponentView = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
}) => {
  it('should send a view event for the Related Content component', () => {
    interceptATIAnalyticsBeacons();
    cy.visit(path);

    cy.get('[data-e2e="related-content-heading"]').scrollIntoView({
      duration: 1000,
    });

    assertATIComponentViewEvent({
      component: RELATED_CONTENT,
      pageIdentifier,
      contentType,
      useReverb,
    });
  });
};

export const assertRelatedContentComponentClick = ({
  pageIdentifier,
  contentType,
  useReverb,
  path,
}) => {
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
      useReverb,
    });
  });
};
